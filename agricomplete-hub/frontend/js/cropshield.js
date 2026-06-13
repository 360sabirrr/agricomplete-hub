const CROP_SHIELD_DRAFT_KEY = 'agri_cropshield_draft';
const CROP_SHIELD_MAX_SOURCE_BYTES = 15 * 1024 * 1024;
const CROP_SHIELD_MAX_IMAGE_BYTES = 1_050_000;
const CROP_SHIELD_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const CROP_SHIELD_DRAFT_FIELDS = [
 'csSeason', 'csSeasonYear', 'csFarmerName', 'csPolicyNumber', 'csContactNumber',
 'csState', 'csDistrict', 'csTehsil', 'csBlock', 'csGramPanchayat', 'csVillage',
 'csSurveyDate', 'csGpsLatitude', 'csGpsLongitude', 'csSurveyNumber',
 'csCropPattern', 'csCropName', 'csAreaAcres',
 'csSowingDate', 'csExpectedHarvestDate', 'csYieldAcre', 'csCurrentYield',
 'csPrice', 'csDamageType', 'csDamageOccurredAt',
 'csLossIntimatedAt', 'csDamagePercent', 'csNotes'
];

const cropShieldState = {
 evidence: { damage: null, map: null, ai: null },
 cases: [],
 currentCase: null,
 weather: null,
 weatherLocation: '',
 signature: { dataUrl: '', method: '' },
 signaturePendingMethod: 'Uploaded signature',
 claim: {
  diseaseEvidence: false,
  diseaseScanName: '',
  diseaseScan: null,
 },
};

function cropShieldElement(id) {
 return document.getElementById(id);
}

async function cropShieldRequireCurrentBackend() {
 try {
  const capabilities = await apiFetch('/cropshield/version');
  if (capabilities?.evidence_mode !== 'damage_only') {
   throw new Error('Unsupported CropShield evidence mode');
  }
 } catch (error) {
  const compatibilityError = new Error(
   'CropShield backend is not up to date. Restart the local backend or deploy the latest backend code, then try again.'
  );
  compatibilityError.cause = error;
  throw compatibilityError;
 }
}

function cropShieldMoney(value) {
 return `INR ${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;
}

function cropShieldNumber(value, fallback = 0) {
 const number = Number(value);
 return Number.isFinite(number) ? number : fallback;
}

function cropShieldStatusClass(status) {
 return `status-${String(status || '').toLowerCase().replace(/\s+/g, '-')}`;
}

function cropShieldVerificationUrl(reference) {
 return `${window.location.origin}/cropshield-verify.html?reference=${encodeURIComponent(reference)}`;
}

function cropShieldLocalDateTime(date) {
 const offset = date.getTimezoneOffset() * 60000;
 return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function cropShieldUtcDateTime(value) {
 if (!value) return '';
 const parsed = new Date(value);
 return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
}

function cropShieldFormatDateTime(value) {
 if (!value) return 'Not recorded';
 const parsed = new Date(value);
 if (Number.isNaN(parsed.getTime())) return String(value);
 return new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
 }).format(parsed);
}

function cropShieldLocalDate(date) {
 const offset = date.getTimezoneOffset() * 60000;
 return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function cropShieldLocation() {
 const location = [
  cropShieldElement('csVillage')?.value,
  cropShieldElement('csGramPanchayat')?.value,
  cropShieldElement('csTehsil')?.value,
  cropShieldElement('csDistrict')?.value,
  cropShieldElement('csState')?.value,
 ].map(value => String(value || '').trim()).filter(Boolean).join(', ');
 if (cropShieldElement('csLocation')) cropShieldElement('csLocation').value = location;
 return location;
}

function cropShieldUpdateIntimation() {
 const panel = cropShieldElement('csIntimationStatus');
 const occurrenceValue = cropShieldElement('csDamageOccurredAt')?.value;
 const intimationValue = cropShieldElement('csLossIntimatedAt')?.value;
 panel.classList.remove('compliant', 'late', 'invalid');

 if (!occurrenceValue || !intimationValue) {
  panel.innerHTML = '<i class="fas fa-clock"></i><div><strong>72-hour intimation check</strong><span>Enter occurrence and intimation times.</span></div>';
  return null;
 }

 const occurrence = new Date(occurrenceValue);
 const intimation = new Date(intimationValue);
 const hours = (intimation - occurrence) / 3600000;
 if (!Number.isFinite(hours) || hours < 0) {
  panel.classList.add('invalid');
  panel.innerHTML = '<i class="fas fa-circle-exclamation"></i><div><strong>Invalid chronology</strong><span>Loss intimation cannot be earlier than the damage occurrence.</span></div>';
  return null;
 }

 const roundedHours = Math.round(hours * 10) / 10;
 if (hours <= 72) {
  panel.classList.add('compliant');
  panel.innerHTML = `<i class="fas fa-circle-check"></i><div><strong>Reported within 72 hours</strong><span>${roundedHours} hours after the recorded damage occurrence.</span></div>`;
 } else {
  panel.classList.add('late');
  panel.innerHTML = `<i class="fas fa-triangle-exclamation"></i><div><strong>Reported beyond 72 hours</strong><span>${roundedHours} hours after occurrence. The final report will flag this delay.</span></div>`;
 }
 return hours;
}

function cropShieldUpdateEstimate() {
 const area = cropShieldNumber(cropShieldElement('csAreaAcres')?.value);
 const yieldPerAcre = cropShieldNumber(cropShieldElement('csYieldAcre')?.value);
 const price = cropShieldNumber(cropShieldElement('csPrice')?.value);
 const damage = cropShieldNumber(cropShieldElement('csDamagePercent')?.value);
 const production = area * yieldPerAcre;
 const enteredCurrentYield = cropShieldElement('csCurrentYield')?.value;
 const currentYield = enteredCurrentYield === ''
  ? production * (1 - damage / 100)
  : Math.min(production, cropShieldNumber(enteredCurrentYield));
 const yieldLoss = Math.max(0, production - currentYield);
 const revenue = production * price;
 const loss = yieldLoss * price;

 cropShieldElement('csDamageValue').textContent = `${damage}%`;
 cropShieldElement('csLiveProduction').textContent = `${Math.round(production).toLocaleString('en-IN')} kg`;
 cropShieldElement('csLiveRevenue').textContent = cropShieldMoney(revenue);
 cropShieldElement('csLiveLoss').textContent = cropShieldMoney(loss);
 cropShieldElement('csLiveSalvage').textContent = cropShieldMoney(Math.max(0, revenue - loss));
}

function cropShieldGroupComplete(ids) {
 return ids.every(id => String(cropShieldElement(id)?.value || '').trim());
}

function cropShieldSetCheck(id, complete) {
 const item = cropShieldElement(id);
 if (!item) return;
 item.classList.toggle('complete', complete);
 const icon = item.querySelector('i');
 icon.className = complete ? 'fas fa-circle-check' : 'far fa-circle';
}

function cropShieldUpdateCompletion() {
 const farmComplete = cropShieldGroupComplete([
  'csSeason', 'csSeasonYear', 'csFarmerName', 'csPolicyNumber',
  'csContactNumber', 'csState', 'csDistrict', 'csTehsil', 'csBlock',
  'csGramPanchayat', 'csVillage', 'csSurveyDate'
 ]);
 const lossComplete = cropShieldGroupComplete([
  'csSurveyNumber', 'csCropPattern', 'csCropName', 'csAreaAcres',
  'csSowingDate', 'csExpectedHarvestDate', 'csYieldAcre', 'csPrice', 'csDamageType',
  'csDamageOccurredAt', 'csLossIntimatedAt'
 ]);
 const evidenceComplete = Boolean(cropShieldState.evidence.damage);
 const declarationComplete = Boolean(
  cropShieldElement('csDeclaration')?.checked
  && cropShieldState.signature.dataUrl
 );
 const completed = [farmComplete, lossComplete, evidenceComplete, declarationComplete].filter(Boolean).length;
 const percent = completed * 25;

 cropShieldSetCheck('csCheckFarm', farmComplete);
 cropShieldSetCheck('csCheckLoss', lossComplete);
 cropShieldSetCheck('csCheckEvidence', evidenceComplete);
 cropShieldSetCheck('csCheckDeclaration', declarationComplete);
 cropShieldElement('csCompletionBar').style.width = `${percent}%`;
 cropShieldElement('csCompletionText').textContent = `${percent}% complete`;
}

function cropShieldClaimStatuses() {
 const statuses = {
  aadhaar: Boolean(cropShieldElement('csAadhaarAvailable')?.checked),
  landRecord: Boolean(cropShieldElement('csLandRecordAvailable')?.checked),
  damagePhoto: Boolean(cropShieldState.evidence.damage),
  bankDetails: Boolean(cropShieldElement('csBankDetailsAvailable')?.checked),
 };
 if (cropShieldElement('csDamageType')?.value === 'Disease') {
  statuses.diseaseEvidence = Boolean(cropShieldState.claim.diseaseEvidence);
 }
 return statuses;
}

function cropShieldUpdateClaimChecklist() {
 const statuses = cropShieldClaimStatuses();
 const values = Object.values(statuses);
 const completed = values.filter(Boolean).length;
 const total = values.length;
 cropShieldElement('csClaimReadiness').textContent = `${completed} of ${total} ready`;
 cropShieldElement('csClaimProgress').style.width = `${Math.round(completed / total * 100)}%`;
 cropShieldElement('csAadhaarAvailable').closest('.cropshield-claim-item').classList.toggle(
  'complete',
  statuses.aadhaar
 );
 cropShieldElement('csLandRecordItem').classList.toggle('complete', statuses.landRecord);
 cropShieldElement('csCropPhotosCheck').classList.toggle('complete', statuses.damagePhoto);
 cropShieldElement('csCropPhotosCheckbox').checked = statuses.damagePhoto;
 const diseaseItem = cropShieldElement('csDiseaseEvidenceCheck');
 const isDisease = Object.hasOwn(statuses, 'diseaseEvidence');
 diseaseItem.hidden = !isDisease;
 diseaseItem.classList.toggle('complete', isDisease && statuses.diseaseEvidence);
 cropShieldElement('csDiseaseEvidenceCheckbox').checked = Boolean(statuses.diseaseEvidence);
 cropShieldElement('csBankDetailsAvailable').closest('.cropshield-claim-item').classList.toggle(
  'complete',
  statuses.bankDetails
 );
}

function cropShieldReadFileAsDataUrl(file) {
 return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(new Error('Could not read the selected file.'));
  reader.onload = () => resolve(String(reader.result || ''));
  reader.readAsDataURL(file);
 });
}

async function cropShieldLoadDiseaseEvidence() {
 try {
  const data = await apiFetch('/disease/scans?limit=1');
  const scan = (data.scans || [])[0];
  cropShieldState.claim.diseaseEvidence = Boolean(scan);
  cropShieldState.claim.diseaseScanName = scan?.name || '';
  cropShieldState.claim.diseaseScan = scan || null;
  cropShieldElement('csDiseaseEvidenceMeta').textContent = scan
   ? `${scan.name} - ${scan.confidence}% confidence`
   : 'No saved diagnosis yet. Run Disease Detection to complete this item.';
  cropShieldElement('csAiSummary').innerHTML = scan
   ? `<i class="fas fa-circle-check"></i><div><strong>${escapeHtml(scan.name)}</strong><span>${scan.confidence}% confidence - ${escapeHtml(scan.severity)} severity - AgriComplete LiteRT model</span></div>`
   : '<i class="fas fa-microscope"></i><div><strong>No saved diagnosis found</strong><span>Run Disease Detection before generating a disease claim.</span></div>';
 } catch (error) {
  cropShieldState.claim.diseaseEvidence = false;
  cropShieldState.claim.diseaseScan = null;
  cropShieldElement('csDiseaseEvidenceMeta').textContent = 'Could not check saved disease evidence.';
 } finally {
  cropShieldUpdateClaimChecklist();
 }
}

function cropShieldToggleAiEvidence() {
 const isDisease = cropShieldElement('csDamageType')?.value === 'Disease';
 cropShieldElement('csAiEvidenceFieldset').hidden = !isDisease;
 cropShieldElement('csDiseaseEvidenceCheck').hidden = !isDisease;
 cropShieldUpdateClaimChecklist();
}

function cropShieldSaveDraft() {
 const draft = {};
 CROP_SHIELD_DRAFT_FIELDS.forEach(id => {
 draft[id] = cropShieldElement(id)?.value || '';
 });
 draft.csAadhaarAvailable = Boolean(cropShieldElement('csAadhaarAvailable')?.checked);
 draft.csLandRecordAvailable = Boolean(cropShieldElement('csLandRecordAvailable')?.checked);
 draft.csBankDetailsAvailable = Boolean(cropShieldElement('csBankDetailsAvailable')?.checked);
 localStorage.setItem(CROP_SHIELD_DRAFT_KEY, JSON.stringify(draft));
}

function cropShieldRestoreDraft() {
 try {
 const draft = JSON.parse(localStorage.getItem(CROP_SHIELD_DRAFT_KEY) || '{}');
 CROP_SHIELD_DRAFT_FIELDS.forEach(id => {
 if (draft[id] !== undefined && cropShieldElement(id)) {
 cropShieldElement(id).value = draft[id];
 }
 });
 if (draft.csAadhaarAvailable !== undefined) {
  cropShieldElement('csAadhaarAvailable').checked = Boolean(draft.csAadhaarAvailable);
 }
 if (draft.csLandRecordAvailable !== undefined) {
  cropShieldElement('csLandRecordAvailable').checked = Boolean(draft.csLandRecordAvailable);
 }
 if (draft.csBankDetailsAvailable !== undefined) {
  cropShieldElement('csBankDetailsAvailable').checked = Boolean(draft.csBankDetailsAvailable);
 }
 } catch (error) {
 localStorage.removeItem(CROP_SHIELD_DRAFT_KEY);
 }
}

function cropShieldLoadImage(file) {
 return new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.onerror = () => reject(new Error('Could not read the selected image.'));
 reader.onload = () => {
 const image = new Image();
 image.onerror = () => reject(new Error('The selected file is not a valid image.'));
 image.onload = () => resolve(image);
 image.src = reader.result;
 };
 reader.readAsDataURL(file);
 });
}

function cropShieldDataBytes(dataUrl) {
 const encoded = String(dataUrl).split(',')[1] || '';
 return Math.ceil(encoded.length * 3 / 4);
}

async function cropShieldCompressImage(
 file,
 minimum = { width: 320, height: 240 },
 outputMinimum = minimum
) {
 if (!CROP_SHIELD_IMAGE_TYPES.has(file.type)) {
 throw new Error('Please choose a JPG, PNG, or WEBP image.');
 }
 if (file.size > CROP_SHIELD_MAX_SOURCE_BYTES) {
 throw new Error('The selected image is too large. Choose an image below 15 MB.');
 }

 const image = await cropShieldLoadImage(file);
 if (image.naturalWidth < minimum.width || image.naturalHeight < minimum.height) {
 throw new Error(
  `Use an image at least ${minimum.width} x ${minimum.height} pixels for reliable evidence.`
 );
 }

 const maxWidth = 1280;
 const maxHeight = 960;
 const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
 const scaledWidth = Math.max(1, Math.round(image.naturalWidth * scale));
 const scaledHeight = Math.max(1, Math.round(image.naturalHeight * scale));
 const canvas = document.createElement('canvas');
 canvas.width = Math.max(outputMinimum.width, scaledWidth);
 canvas.height = Math.max(outputMinimum.height, scaledHeight);
 const context = canvas.getContext('2d', { alpha: false });
 context.fillStyle = '#FFFFFF';
 context.fillRect(0, 0, canvas.width, canvas.height);
 const renderScale = Math.min(
  canvas.width / image.naturalWidth,
  canvas.height / image.naturalHeight
 );
 const renderWidth = Math.round(image.naturalWidth * renderScale);
 const renderHeight = Math.round(image.naturalHeight * renderScale);
 context.drawImage(
  image,
  Math.round((canvas.width - renderWidth) / 2),
  Math.round((canvas.height - renderHeight) / 2),
  renderWidth,
  renderHeight
 );

 let quality = 0.82;
 let dataUrl = canvas.toDataURL('image/jpeg', quality);
 while (cropShieldDataBytes(dataUrl) > CROP_SHIELD_MAX_IMAGE_BYTES && quality > 0.46) {
 quality -= 0.08;
 dataUrl = canvas.toDataURL('image/jpeg', quality);
 }
 if (cropShieldDataBytes(dataUrl) > CROP_SHIELD_MAX_IMAGE_BYTES) {
 throw new Error('This image could not be compressed enough. Try a smaller photo.');
 }

 return {
 dataUrl,
 width: canvas.width,
 height: canvas.height,
 bytes: cropShieldDataBytes(dataUrl),
 name: file.name,
 capturedAt: new Date().toISOString(),
 };
}

function cropShieldUpdateSignatureStatus() {
 const status = cropShieldElement('csSignatureStatus');
 const ready = Boolean(cropShieldState.signature.dataUrl);
 status.classList.toggle('ready', ready);
 status.innerHTML = ready
  ? `<i class="fas fa-circle-check"></i> ${escapeHtml(cropShieldState.signature.method)} added`
  : '<i class="far fa-circle"></i> Not added';
 cropShieldElement('csSignatureMethod').value = cropShieldState.signature.method;
 cropShieldUpdateCompletion();
}

function cropShieldSetSignature(dataUrl, method) {
 cropShieldState.signature = { dataUrl, method };
 cropShieldUpdateSignatureStatus();
}

function cropShieldResetSignatureCanvas() {
 const canvas = cropShieldElement('csSignatureCanvas');
 const context = canvas.getContext('2d');
 context.clearRect(0, 0, canvas.width, canvas.height);
 context.fillStyle = '#FFFFFF';
 context.fillRect(0, 0, canvas.width, canvas.height);
 context.strokeStyle = '#172A1C';
 context.lineWidth = 4;
 context.lineCap = 'round';
 context.lineJoin = 'round';
}

function cropShieldShowSignatureMode(mode) {
 const drawMode = mode === 'draw';
 cropShieldElement('csSignatureDrawPanel').hidden = !drawMode;
 cropShieldElement('csSignatureUploadPanel').hidden = drawMode;
 cropShieldElement('csDrawSignatureBtn').classList.toggle('active', drawMode);
 cropShieldElement('csUploadSignatureBtn').classList.toggle(
  'active',
  !drawMode && cropShieldState.signaturePendingMethod === 'Uploaded signature'
 );
 cropShieldElement('csUploadThumbBtn').classList.toggle(
  'active',
  !drawMode && cropShieldState.signaturePendingMethod === 'Thumb impression'
 );
}

function cropShieldClearSignature() {
 cropShieldState.signature = { dataUrl: '', method: '' };
 cropShieldElement('csSignatureFile').value = '';
 cropShieldElement('csSignaturePreview').removeAttribute('src');
 cropShieldElement('csSignatureUploadPanel').classList.remove('has-image');
 cropShieldResetSignatureCanvas();
 cropShieldShowSignatureMode('draw');
 cropShieldUpdateSignatureStatus();
}

async function cropShieldPrepareSignature(file) {
 if (!file) return;
 if (!CROP_SHIELD_IMAGE_TYPES.has(file.type)) {
  showToast('Choose a JPG, PNG, or WEBP signature image.', 'warning');
  return;
 }
 if (file.size > 5 * 1024 * 1024) {
  showToast('Signature image must be below 5 MB.', 'warning');
  return;
 }

 try {
  const image = await cropShieldLoadImage(file);
  if (image.naturalWidth < 80 || image.naturalHeight < 40) {
   throw new Error('Use a signature image at least 80 x 40 pixels.');
  }
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 260;
  const context = canvas.getContext('2d', { alpha: false });
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const scale = Math.min(
   (canvas.width - 40) / image.naturalWidth,
   (canvas.height - 40) / image.naturalHeight
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
  if (cropShieldDataBytes(dataUrl) > 600000) {
   throw new Error('Signature image could not be compressed below 600 KB.');
  }
  cropShieldElement('csSignaturePreview').src = dataUrl;
  cropShieldElement('csSignatureUploadPanel').classList.add('has-image');
  cropShieldSetSignature(dataUrl, cropShieldState.signaturePendingMethod);
  showToast(`${cropShieldState.signaturePendingMethod} added.`, 'success');
 } catch (error) {
  cropShieldElement('csSignatureFile').value = '';
  showToast(error.message || 'Could not prepare the signature image.', 'error');
 }
}

function cropShieldBindSignatureCapture() {
 const canvas = cropShieldElement('csSignatureCanvas');
 const context = canvas.getContext('2d');
 let drawing = false;

 cropShieldResetSignatureCanvas();
 const point = event => {
  const bounds = canvas.getBoundingClientRect();
  return {
   x: (event.clientX - bounds.left) * canvas.width / bounds.width,
   y: (event.clientY - bounds.top) * canvas.height / bounds.height,
  };
 };
 canvas.addEventListener('pointerdown', event => {
  event.preventDefault();
  drawing = true;
  canvas.setPointerCapture(event.pointerId);
  const position = point(event);
  context.beginPath();
  context.moveTo(position.x, position.y);
  context.lineTo(position.x + 0.1, position.y + 0.1);
  context.stroke();
 });
 canvas.addEventListener('pointermove', event => {
  if (!drawing) return;
  event.preventDefault();
  const position = point(event);
  context.lineTo(position.x, position.y);
  context.stroke();
 });
 const finishDrawing = event => {
  if (!drawing) return;
  drawing = false;
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  cropShieldSetSignature(canvas.toDataURL('image/png'), 'Drawn signature');
 };
 canvas.addEventListener('pointerup', finishDrawing);
 canvas.addEventListener('pointercancel', finishDrawing);

 cropShieldElement('csDrawSignatureBtn').addEventListener('click', () => {
  cropShieldShowSignatureMode('draw');
 });
 const chooseUpload = method => {
  cropShieldState.signaturePendingMethod = method;
  cropShieldElement('csSignatureUploadTitle').textContent = (
   method === 'Thumb impression' ? 'Choose thumb impression image' : 'Choose signature image'
  );
  cropShieldShowSignatureMode('upload');
  cropShieldElement('csSignatureFile').click();
 };
 cropShieldElement('csUploadSignatureBtn').addEventListener(
  'click',
  () => chooseUpload('Uploaded signature')
 );
 cropShieldElement('csUploadThumbBtn').addEventListener(
  'click',
  () => chooseUpload('Thumb impression')
 );
 cropShieldElement('csSignatureFile').addEventListener(
  'change',
  event => cropShieldPrepareSignature(event.target.files?.[0])
 );
 cropShieldElement('csClearSignatureBtn').addEventListener('click', cropShieldClearSignature);
 cropShieldUpdateSignatureStatus();
}

function cropShieldRenderEvidence(type, evidence) {
 const controls = {
  damage: ['csDamagePreview', 'csDamageZone', 'csDamageMeta'],
  map: ['csMapPreview', 'csMapZone', 'csMapMeta'],
  ai: ['csAiPreview', 'csAiZone', 'csAiMeta'],
 };
 const [previewId, zoneId, metaId] = controls[type] || controls.damage;
 const preview = cropShieldElement(previewId);
 const zone = cropShieldElement(zoneId);
 const meta = cropShieldElement(metaId);
 preview.src = evidence.dataUrl;
 zone.classList.add('has-image');
 meta.textContent = `${evidence.width} x ${evidence.height} - ${Math.ceil(evidence.bytes / 1024)} KB`;
}

async function cropShieldPrepareImage(file, type, input = null) {
 if (!file) return;
 try {
 const minimum = type === 'ai'
  ? { width: 128, height: 128 }
  : { width: 320, height: 240 };
 const outputMinimum = type === 'ai'
  ? { width: 320, height: 240 }
  : minimum;
 const evidence = await cropShieldCompressImage(file, minimum, outputMinimum);
 cropShieldState.evidence[type] = evidence;
 cropShieldRenderEvidence(type, evidence);
 cropShieldUpdateCompletion();
 cropShieldUpdateClaimChecklist();
 const labels = {
  damage: 'Damage evidence',
  map: 'Map snapshot',
  ai: 'AI diagnosis image',
 };
 showToast(`${labels[type] || 'Image'} is ready.`, 'success');
 } catch (error) {
 if (input) input.value = '';
 cropShieldState.evidence[type] = null;
 cropShieldUpdateCompletion();
 cropShieldUpdateClaimChecklist();
 showToast(error.message || 'Could not prepare the image.', 'error');
 }
}

function cropShieldBindDropZone(type, zoneId, inputId) {
 const zone = cropShieldElement(zoneId);
 const input = cropShieldElement(inputId);
 input.addEventListener('change', event => cropShieldPrepareImage(event.target.files?.[0], type, input));
 ['dragenter', 'dragover'].forEach(eventName => {
 zone.addEventListener(eventName, event => {
 event.preventDefault();
 zone.classList.add('dragging');
 });
 });
 ['dragleave', 'drop'].forEach(eventName => {
 zone.addEventListener(eventName, event => {
 event.preventDefault();
 zone.classList.remove('dragging');
 });
 });
 zone.addEventListener('drop', event => cropShieldPrepareImage(event.dataTransfer?.files?.[0], type));
}

function cropShieldCaptureLocation() {
 const button = cropShieldElement('csLocateBtn');
 if (!navigator.geolocation) {
  showToast('Location access is not supported by this browser.', 'warning');
  return;
 }
 const original = button.innerHTML;
 button.disabled = true;
 button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
 navigator.geolocation.getCurrentPosition(
  position => {
   cropShieldElement('csGpsLatitude').value = position.coords.latitude.toFixed(6);
   cropShieldElement('csGpsLongitude').value = position.coords.longitude.toFixed(6);
   cropShieldSaveDraft();
   cropShieldUpdateCompletion();
   showToast('GPS coordinates captured.', 'success');
   button.disabled = false;
   button.innerHTML = original;
  },
  error => {
   showToast(
    error.code === 1
     ? 'Location permission was denied. You can enter coordinates manually.'
     : 'Could not capture the current location.',
    'warning'
   );
   button.disabled = false;
   button.innerHTML = original;
  },
  { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
 );
}

async function cropShieldWeatherSnapshot(location, force = false) {
 const normalizedLocation = String(location || '').trim();
 const weatherBox = cropShieldElement('csWeatherBox');
 if (!normalizedLocation) return {};
 if (!force && cropShieldState.weather && cropShieldState.weatherLocation === normalizedLocation) {
 return cropShieldState.weather;
 }

 weatherBox.classList.add('loading');
 weatherBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i><div><strong>Capturing weather context</strong><span>This optional check times out automatically after a few seconds.</span></div>';
 cropShieldElement('csWeatherImpact').innerHTML = '<div class="cropshield-weather-impact-head"><i class="fas fa-spinner fa-spin"></i><div><strong>Analyzing historical weather</strong><span>Calculating rainfall, temperature extremes, and humidity.</span></div></div>';
 try {
 const [currentResult, impactResult] = await Promise.allSettled([
  apiFetchWithTimeout(
   `/weather/current?city=${encodeURIComponent(normalizedLocation)}`,
   {},
   4000
  ),
  apiFetchWithTimeout(
   `/weather/impact?city=${encodeURIComponent(normalizedLocation)}`,
   {},
   9000
  ),
 ]);
 const data = currentResult.status === 'fulfilled' ? currentResult.value : {};
 const impact = impactResult.status === 'fulfilled' ? impactResult.value : null;
 if (!Object.keys(data).length && !impact) {
  throw new Error('Weather services are unavailable.');
 }
 const snapshot = {
 location: data.location || normalizedLocation,
 condition: data.condition || '',
 temperature_c: data.temperature,
 humidity: data.humidity,
 rain_mm: data.rain_mm,
 captured_at: new Date().toISOString(),
 impact,
 };
 cropShieldState.weather = snapshot;
 cropShieldState.weatherLocation = normalizedLocation;
 weatherBox.innerHTML = `<i class="fas fa-cloud-sun"></i><div><strong>${escapeHtml(snapshot.location)}</strong><span>${escapeHtml(snapshot.condition || 'Current weather')} - ${snapshot.temperature_c ?? '--'} C - Humidity ${snapshot.humidity ?? '--'}%</span></div>`;
 cropShieldRenderWeatherImpact(impact);
 return snapshot;
 } catch (error) {
 cropShieldState.weather = null;
 cropShieldState.weatherLocation = '';
 weatherBox.innerHTML = '<i class="fas fa-cloud"></i><div><strong>Weather context unavailable</strong><span>The evidence report can still be generated normally.</span></div>';
 cropShieldRenderWeatherImpact(null);
 return {};
 } finally {
 weatherBox.classList.remove('loading');
 }
}

function cropShieldRenderWeatherImpact(impact) {
 const panel = cropShieldElement('csWeatherImpact');
 if (!impact?.windows) {
  panel.innerHTML = '<div class="cropshield-weather-impact-head"><i class="fas fa-cloud"></i><div><strong>Historical weather unavailable</strong><span>The report can still be generated without this optional analysis.</span></div></div>';
  return;
 }
 const windowHtml = [
  ['7_days', 'Last 7 days'],
  ['15_days', 'Last 15 days'],
  ['30_days', 'Last 30 days'],
 ].map(([key, label]) => {
  const item = impact.windows[key] || {};
  return `<article class="cropshield-weather-window">
   <strong>${label}</strong>
   <dl>
    <div><dt>Rainfall</dt><dd>${item.rainfall_mm ?? '--'} mm</dd></div>
    <div><dt>Temperature</dt><dd>${item.min_temperature_c ?? '--'} to ${item.max_temperature_c ?? '--'} C</dd></div>
    <div><dt>Avg. humidity</dt><dd>${item.average_humidity_percent ?? '--'}%</dd></div>
   </dl>
  </article>`;
 }).join('');
 panel.innerHTML = `
  <div class="cropshield-weather-impact-head"><i class="fas fa-chart-line"></i><div><strong>Weather impact analysis</strong><span>${escapeHtml(impact.location || '')} - ${escapeHtml(impact.period_start || '')} to ${escapeHtml(impact.period_end || '')}</span></div></div>
  <div class="cropshield-weather-windows">${windowHtml}</div>
 `;
}

function cropShieldPayload(weather) {
 const isDisease = cropShieldElement('csDamageType').value === 'Disease';
 const damagePercent = cropShieldNumber(cropShieldElement('csDamagePercent').value);
 return {
 report_format: 'insurance_v1',
 season: cropShieldElement('csSeason').value,
 season_year: cropShieldElement('csSeasonYear').value,
 farmer_name: cropShieldElement('csFarmerName').value.trim(),
 policy_number: cropShieldElement('csPolicyNumber').value.trim(),
 contact_number: cropShieldElement('csContactNumber').value.trim(),
 state: cropShieldElement('csState').value.trim(),
 district: cropShieldElement('csDistrict').value.trim(),
 tehsil: cropShieldElement('csTehsil').value.trim(),
 block: cropShieldElement('csBlock').value.trim(),
 gram_panchayat: cropShieldElement('csGramPanchayat').value.trim(),
 village: cropShieldElement('csVillage').value.trim(),
 survey_date: cropShieldElement('csSurveyDate').value,
 gps_latitude: cropShieldElement('csGpsLatitude').value,
 gps_longitude: cropShieldElement('csGpsLongitude').value,
 map_snapshot_data: cropShieldState.evidence.map?.dataUrl || '',
 survey_number: cropShieldElement('csSurveyNumber').value.trim(),
 crop_pattern: cropShieldElement('csCropPattern').value,
 crop_name: cropShieldElement('csCropName').value.trim(),
 // Compatibility values for older deployed API versions. These are not
 // collected from users or displayed in the report.
 crop_variety: 'Not specified',
 field_area_acres: cropShieldElement('csAreaAcres').value,
 sowing_date: cropShieldElement('csSowingDate').value,
 expected_harvest_date: cropShieldElement('csExpectedHarvestDate').value,
 location: cropShieldLocation(),
 expected_yield_per_acre_kg: cropShieldElement('csYieldAcre').value,
 current_yield_estimate_kg: cropShieldElement('csCurrentYield').value,
 market_price_per_kg: cropShieldElement('csPrice').value,
 damage_type: cropShieldElement('csDamageType').value,
 severity_level: damagePercent >= 75
  ? 'Critical'
  : damagePercent >= 50
   ? 'High'
   : damagePercent >= 25
    ? 'Moderate'
    : 'Low',
 damage_occurred_at: cropShieldUtcDateTime(
  cropShieldElement('csDamageOccurredAt').value
 ),
 loss_intimated_at: cropShieldUtcDateTime(
  cropShieldElement('csLossIntimatedAt').value
 ),
 damage_date: cropShieldElement('csDamageOccurredAt').value.slice(0, 10),
 reported_damage_percent: cropShieldElement('csDamagePercent').value,
 notes: cropShieldElement('csNotes').value.trim(),
 farmer_declaration: cropShieldElement('csDeclaration').checked,
 farmer_signature_data: cropShieldState.signature.dataUrl,
 farmer_signature_method: cropShieldState.signature.method,
 aadhaar_available: cropShieldElement('csAadhaarAvailable').checked,
 land_record_available: cropShieldElement('csLandRecordAvailable').checked,
 bank_details_available: cropShieldElement('csBankDetailsAvailable').checked,
 damage_image_data: cropShieldState.evidence.damage.dataUrl,
 damage_captured_at: cropShieldState.evidence.damage.capturedAt,
 ai_evidence_image_data: isDisease ? cropShieldState.evidence.ai?.dataUrl || '' : '',
 ai_disease_name: isDisease ? cropShieldState.claim.diseaseScan?.name || '' : '',
 ai_confidence: isDisease ? cropShieldState.claim.diseaseScan?.confidence ?? '' : '',
 ai_model_name: isDisease && cropShieldState.claim.diseaseScan
  ? 'AgriComplete LiteRT Crop Disease Model'
  : '',
 ai_detection_at: isDisease ? cropShieldState.claim.diseaseScan?.created_at || '' : '',
 weather
 };
}

function cropShieldTimeline(events = []) {
 const timeline = cropShieldElement('csTimeline');
 timeline.innerHTML = events.map(event => `
 <article>
 <i class="fas fa-circle-check"></i>
 <strong>${escapeHtml(event.status)}</strong>
 <span>${cropShieldFormatDateTime(event.created_at)}</span>
 </article>
 `).join('');
}

function cropShieldRenderCase(caseData, scroll = true) {
 cropShieldState.currentCase = caseData;
 const result = cropShieldElement('csResult');
 result.hidden = false;
 cropShieldElement('csResultReference').textContent = caseData.reference;
 const season = [caseData.season, caseData.season_year].filter(Boolean).join(' ');
 cropShieldElement('csResultMeta').textContent = [
  season,
  caseData.crop_name,
  `${caseData.field_area_acres} acres`,
  `Survey ${caseData.survey_number}`,
  caseData.location
 ].filter(Boolean).join(' - ');
 cropShieldElement('csResultMetrics').innerHTML = `
 <article><span>Reported damage</span><strong>${caseData.reported_damage_percent}%</strong></article>
 <article><span>Visual change indicator</span><strong>${caseData.visual_change_percent}%</strong></article>
 <article><span>Estimated loss</span><strong>${cropShieldMoney(caseData.estimated_loss)}</strong></article>
 <article><span>Estimated yield loss</span><strong>${Math.round(caseData.estimated_yield_loss_kg || 0).toLocaleString('en-IN')} kg</strong></article>
 <article><span>Claim readiness</span><strong>${caseData.claim_score ?? 0}/100</strong></article>
 `;
 const factors = caseData.claim_score_factors || {};
 cropShieldElement('csScoreResult').innerHTML = `
 <div class="cropshield-score-ring"><strong>${caseData.claim_score ?? 0}</strong><span>/100</span></div>
 <div><span>CropShield Claim Score</span><h3>${escapeHtml(caseData.claim_status || 'Evidence Incomplete')}</h3><p>${escapeHtml(caseData.ai_recommendation || '')}</p></div>
 <dl>
  <div><dt>Photos</dt><dd>${factors.photo_evidence ?? 0}/20</dd></div>
  <div><dt>Location</dt><dd>${factors.location_verification ?? 0}/20</dd></div>
  <div><dt>AI evidence</dt><dd>${factors.disease_detection_confidence ?? 0}/20</dd></div>
  <div><dt>Weather</dt><dd>${factors.weather_correlation ?? 0}/20</dd></div>
  <div><dt>Documents</dt><dd>${factors.document_completeness ?? 0}/20</dd></div>
 </dl>`;

 const images = cropShieldElement('csResultImages');
 if (caseData.damage_image_data) {
 images.innerHTML = `
 <figure><img src="${caseData.damage_image_data}" alt="Damaged crop evidence"><figcaption><span>Damage evidence</span><i class="fas fa-circle-check"></i></figcaption></figure>
 `;
 } else {
 images.innerHTML = '<div class="cropshield-empty"><i class="fas fa-image"></i><strong>Damage evidence protected</strong><span>Open this case to load its damage photo.</span></div>';
 }

 cropShieldElement('csVerificationDetails').innerHTML = `
 <div><dt>Status</dt><dd><span class="cropshield-status ${cropShieldStatusClass(caseData.status)}">${escapeHtml(caseData.status)}</span></dd></div>
 <div><dt>Policy / application</dt><dd>${escapeHtml(caseData.policy_number || 'Not recorded')}</dd></div>
 <div><dt>Survey / Khasra</dt><dd>${escapeHtml(caseData.survey_number || 'Not recorded')}</dd></div>
 <div><dt>Loss intimation</dt><dd>${escapeHtml(caseData.intimation_status || 'Not recorded')}</dd></div>
 <div><dt>Claim documents</dt><dd>${caseData.claim_checklist?.completed ?? 0} of ${caseData.claim_checklist?.total ?? 5} ready</dd></div>
 <div><dt>Damage type</dt><dd>${escapeHtml(caseData.damage_type)}</dd></div>
 <div><dt>Expected crop value</dt><dd>${cropShieldMoney(caseData.expected_revenue)}</dd></div>
 <div><dt>Potential salvage</dt><dd>${cropShieldMoney(caseData.estimated_salvage_value)}</dd></div>
 `;
 cropShieldElement('csFingerprint').textContent = caseData.evidence_fingerprint;
 cropShieldElement('csDownloadBtn').onclick = () => cropShieldDownloadReport(caseData.id, caseData.reference);
 cropShieldElement('csCopyVerifyBtn').onclick = () => cropShieldCopyVerification(caseData.reference);
 cropShieldElement('csShareBtn').onclick = () => cropShieldShareCase(caseData);

 const statusButton = cropShieldElement('csStatusBtn');
 statusButton.hidden = caseData.status !== 'Report Ready';
 statusButton.onclick = () => cropShieldUpdateStatus(caseData.id, 'Submitted');
 cropShieldTimeline(caseData.status_events || []);
 if (scroll) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cropShieldUpdateOverview(cases) {
 cropShieldElement('csTotalCases').textContent = cases.length.toLocaleString('en-IN');
 cropShieldElement('csSubmittedCases').textContent = cases.filter(item => item.status !== 'Report Ready').length.toLocaleString('en-IN');
 const exposure = cases.reduce((sum, item) => sum + cropShieldNumber(item.estimated_loss), 0);
 cropShieldElement('csTotalExposure').textContent = cropShieldMoney(exposure);
}

function cropShieldFilteredCases() {
 const query = cropShieldElement('csCaseSearch').value.trim().toLowerCase();
 const status = cropShieldElement('csStatusFilter').value;
 return cropShieldState.cases.filter(item => {
 const matchesQuery = !query || [
  item.reference, item.crop_name, item.location, item.policy_number,
  item.survey_number, item.season, item.season_year
 ]
 .some(value => String(value || '').toLowerCase().includes(query));
 return matchesQuery && (!status || item.status === status);
 });
}

function cropShieldRenderCases(cases = cropShieldFilteredCases()) {
 const list = cropShieldElement('csCaseList');
 if (!cases.length) {
 const hasFilters = cropShieldElement('csCaseSearch').value || cropShieldElement('csStatusFilter').value;
 list.innerHTML = `<div class="cropshield-empty"><i class="fas fa-file-shield"></i><strong>${hasFilters ? 'No matching reports' : 'No reports yet'}</strong><span>${hasFilters ? 'Try a different crop, reference, or status.' : 'Your generated evidence reports will appear here.'}</span></div>`;
 return;
 }

 list.innerHTML = cases.map(item => `
 <article class="cropshield-case-card">
 <header><div><span>${escapeHtml(item.reference)}</span><h3>${escapeHtml(item.crop_name)}</h3><small>${escapeHtml([item.season, item.season_year].filter(Boolean).join(' ') || 'Season not recorded')}</small></div><span class="cropshield-status ${cropShieldStatusClass(item.status)}">${escapeHtml(item.status)}</span></header>
 <dl>
 <div><dt>Survey / Khasra</dt><dd>${escapeHtml(item.survey_number || 'Not recorded')}</dd></div>
 <div><dt>Insured area</dt><dd>${item.field_area_acres} acres</dd></div>
 <div><dt>Intimation</dt><dd>${escapeHtml(item.intimation_status || 'Not recorded')}</dd></div>
 <div><dt>Estimated loss</dt><dd>${cropShieldMoney(item.estimated_loss)}</dd></div>
 <div><dt>Created</dt><dd>${cropShieldFormatDateTime(item.created_at)}</dd></div>
 </dl>
 <footer>
 <button class="btn btn-secondary btn-sm" type="button" data-cs-action="view" data-case-id="${item.id}"><i class="fas fa-eye"></i> View</button>
 <button class="btn btn-primary btn-sm" type="button" data-cs-action="pdf" data-case-id="${item.id}" data-reference="${escapeHtml(item.reference)}"><i class="fas fa-file-pdf"></i> PDF</button>
 <button class="btn btn-danger btn-sm cropshield-delete-btn" type="button" data-cs-action="delete" data-case-id="${item.id}" data-reference="${escapeHtml(item.reference)}" title="Delete report" aria-label="Delete report ${escapeHtml(item.reference)}"><i class="fas fa-trash-alt"></i></button>
 </footer>
 </article>
 `).join('');
}

async function cropShieldLoadCases() {
 if (!localStorage.getItem('agri_token')) return;
 const list = cropShieldElement('csCaseList');
 list.innerHTML = '<div class="cropshield-empty"><i class="fas fa-spinner fa-spin"></i><strong>Loading reports</strong><span>Fetching your protected evidence history.</span></div>';
 try {
 const data = await apiFetch('/cropshield/cases');
 cropShieldState.cases = data.cases || [];
 cropShieldUpdateOverview(cropShieldState.cases);
 cropShieldRenderCases();
 } catch (error) {
 list.innerHTML = `<div class="cropshield-empty"><i class="fas fa-circle-exclamation"></i><strong>Could not load reports</strong><span>${escapeHtml(error.msg || error.message || 'Please try again.')}</span></div>`;
 }
}

async function cropShieldOpenCase(caseId) {
 try {
 const data = await apiFetch(`/cropshield/cases/${caseId}`);
 cropShieldRenderCase(data.case);
 } catch (error) {
 showToast(error.msg || 'Could not open the CropShield report.', 'error');
 }
}

async function cropShieldDeleteCase(caseId, reference, button) {
 if (!window.confirm(`Delete report ${reference}? This action cannot be undone.`)) return;

 const original = button.innerHTML;
 button.disabled = true;
 button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
 try {
  await apiFetch(`/cropshield/cases/${caseId}`, { method: 'DELETE' });
  cropShieldState.cases = cropShieldState.cases.filter(item => item.id !== caseId);
  cropShieldUpdateOverview(cropShieldState.cases);
  cropShieldRenderCases();
  if (cropShieldState.currentCase?.id === caseId) {
   cropShieldState.currentCase = null;
   cropShieldElement('csResult').hidden = true;
  }
  showToast(`Report ${reference} deleted.`, 'success', 'Report deleted');
 } catch (error) {
  button.disabled = false;
  button.innerHTML = original;
  showToast(error.msg || 'Could not delete the CropShield report.', 'error');
 }
}

async function cropShieldUpdateStatus(caseId, status) {
 const button = cropShieldElement('csStatusBtn');
 const original = button.innerHTML;
 button.disabled = true;
 button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
 try {
 const data = await apiFetch(`/cropshield/cases/${caseId}/status`, {
 method: 'PATCH',
 body: JSON.stringify({ status, note: 'Marked by the farmer as submitted for follow-up.' })
 });
 const mergedCase = { ...cropShieldState.currentCase, ...data.case };
 cropShieldRenderCase(mergedCase, false);
 await cropShieldLoadCases();
 showToast('Case marked as submitted.', 'success', 'Status updated');
 } catch (error) {
 showToast(error.msg || 'Could not update case status.', 'error');
 } finally {
 button.disabled = false;
 button.innerHTML = original;
 }
}

async function cropShieldCopyVerification(reference) {
 const link = cropShieldVerificationUrl(reference);
 try {
 await navigator.clipboard.writeText(link);
 showToast('Verification link copied.', 'success', 'Ready to share');
 } catch (error) {
 showToast(`Verification link: ${link}`, 'info', 'Copy this link');
 }
}

async function cropShieldShareCase(caseData) {
 const url = cropShieldVerificationUrl(caseData.reference);
 const shareData = {
  title: `CropShield report ${caseData.reference}`,
  text: `${caseData.crop_name} claim evidence - score ${caseData.claim_score}/100 - estimated loss ${cropShieldMoney(caseData.estimated_loss)}`,
  url,
 };
 try {
  if (navigator.share) {
   await navigator.share(shareData);
   showToast('Report shared with the insurance agent.', 'success');
  } else {
   await navigator.clipboard.writeText(`${shareData.text}\n${url}`);
   showToast('Share details copied. Paste them into email or WhatsApp.', 'success');
  }
 } catch (error) {
  if (error.name !== 'AbortError') {
   showToast('Could not open sharing. The verification link is still available.', 'warning');
  }
 }
}

async function cropShieldDownloadReport(caseId, reference) {
 const token = localStorage.getItem('agri_token');
 const button = cropShieldElement('csDownloadBtn');
 const original = button?.innerHTML;
 const language = cropShieldElement('csReportLanguage')?.value || 'en';
 if (button && cropShieldState.currentCase?.id === caseId) {
 button.disabled = true;
 button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing PDF...';
 }

 let lastError = null;
 try {
 for (const baseUrl of API_BASE_URLS) {
 try {
 const response = await fetch(`${baseUrl}/cropshield/cases/${caseId}/report?lang=${encodeURIComponent(language)}`, {
 headers: { Authorization: `Bearer ${token}` }
 });
 if (!response.ok) {
 const error = await response.json().catch(() => ({ msg: 'Could not generate PDF report.' }));
 throw new Error(error.msg || 'Could not generate PDF report.');
 }
 const blob = await response.blob();
 const url = URL.createObjectURL(blob);
 const anchor = document.createElement('a');
 anchor.href = url;
 anchor.download = `${reference}-crop-loss-report-${language}.pdf`;
 document.body.appendChild(anchor);
 anchor.click();
 anchor.remove();
 window.setTimeout(() => URL.revokeObjectURL(url), 1500);
 showToast('CropShield PDF downloaded.', 'success', 'Report ready');
 return;
 } catch (error) {
 lastError = error;
 }
 }
 showToast(lastError?.message || 'Could not download the report.', 'error');
 } finally {
 if (button && cropShieldState.currentCase?.id === caseId) {
 button.disabled = false;
 button.innerHTML = original;
 }
 }
}

function cropShieldValidate() {
 const form = cropShieldElement('cropShieldForm');
 if (!form.reportValidity()) return false;
 if (cropShieldUpdateIntimation() === null) {
 showToast('Check the damage occurrence and loss intimation times.', 'warning');
 return false;
 }
 if (!cropShieldState.evidence.damage) {
 showToast('Upload the damage evidence photo.', 'warning');
 return false;
 }
 const latitude = cropShieldElement('csGpsLatitude').value;
 const longitude = cropShieldElement('csGpsLongitude').value;
 if (Boolean(latitude) !== Boolean(longitude)) {
  showToast('Enter both GPS latitude and longitude, or leave both blank.', 'warning');
  return false;
 }
 const production = (
  cropShieldNumber(cropShieldElement('csAreaAcres').value)
  * cropShieldNumber(cropShieldElement('csYieldAcre').value)
 );
 const currentYield = cropShieldElement('csCurrentYield').value;
 if (currentYield !== '' && cropShieldNumber(currentYield) > production) {
  showToast('Current yield estimate cannot exceed expected production.', 'warning');
  return false;
 }
 if (cropShieldElement('csDamageType').value === 'Disease') {
  if (!cropShieldState.claim.diseaseScan) {
   showToast('Run Disease Detection first to attach a saved diagnosis.', 'warning');
   return false;
  }
  if (!cropShieldState.evidence.ai) {
   showToast('Upload the crop image used for AI disease detection.', 'warning');
   return false;
  }
 }
 if (!cropShieldState.signature.dataUrl) {
 showToast('Draw or upload the farmer signature or thumb impression.', 'warning');
 return false;
 }
 return true;
}

async function cropShieldSubmit(event) {
 event.preventDefault();
 if (!cropShieldValidate()) return;

 const button = cropShieldElement('csGenerateBtn');
 const original = button.innerHTML;
 button.disabled = true;
 button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing evidence report...';
 try {
 await cropShieldRequireCurrentBackend();
 const location = cropShieldLocation();
 const weather = await cropShieldWeatherSnapshot(location);
 const data = await apiFetch('/cropshield/cases', {
 method: 'POST',
 body: JSON.stringify(cropShieldPayload(weather))
 });
 localStorage.removeItem(CROP_SHIELD_DRAFT_KEY);
 cropShieldRenderCase(data.case);
 await cropShieldLoadCases();
 showToast('Evidence report and financial estimate generated.', 'success', 'CropShield ready');
 } catch (error) {
 showToast(error.msg || error.message || 'Could not generate CropShield report.', 'error');
 } finally {
 button.disabled = false;
 button.innerHTML = original;
 }
}

function cropShieldResetForm() {
 const form = cropShieldElement('cropShieldForm');
 form.reset();
 cropShieldState.evidence = { damage: null, map: null, ai: null };
 cropShieldClearSignature();
 cropShieldState.weather = null;
 cropShieldState.weatherLocation = '';
 ['Damage'].forEach(type => {
 cropShieldElement(`cs${type}Zone`).classList.remove('has-image');
 cropShieldElement(`cs${type}Preview`).removeAttribute('src');
 cropShieldElement(`cs${type}Meta`).textContent = 'JPG, PNG or WEBP';
 });
 ['Map', 'Ai'].forEach(type => {
  cropShieldElement(`cs${type}Zone`).classList.remove('has-image');
  cropShieldElement(`cs${type}Preview`).removeAttribute('src');
 });
 cropShieldElement('csMapMeta').textContent = 'Upload a map screenshot if available.';
 cropShieldElement('csAiMeta').textContent = 'Upload the image analyzed by the disease model.';
 const now = new Date();
 const today = cropShieldLocalDate(now);
 cropShieldElement('csSeasonYear').value = now.getFullYear();
 cropShieldElement('csSurveyDate').value = today;
 cropShieldElement('csDamageOccurredAt').value = cropShieldLocalDateTime(new Date(now.getTime() - 3600000));
 cropShieldElement('csLossIntimatedAt').value = cropShieldLocalDateTime(now);
 cropShieldElement('csDamagePercent').value = 30;
 const user = getStoredUser();
 const farmerName = [
  user?.first_name || user?.firstName,
  user?.last_name || user?.lastName
 ].filter(Boolean).join(' ') || user?.username || '';
 cropShieldElement('csFarmerName').value = farmerName;
 cropShieldElement('csContactNumber').value = user?.phone || '';
 cropShieldElement('csState').value = user?.state || '';
 cropShieldElement('csDistrict').value = user?.district || '';
 cropShieldElement('csVillage').value = user?.village || '';
 cropShieldLocation();
 cropShieldElement('csWeatherBox').innerHTML = '<i class="fas fa-cloud-sun"></i><div><strong>Weather context</strong><span>Captured automatically from the field location when available.</span></div>';
 localStorage.removeItem(CROP_SHIELD_DRAFT_KEY);
 cropShieldUpdateEstimate();
 cropShieldUpdateIntimation();
 cropShieldUpdateCompletion();
 cropShieldUpdateClaimChecklist();
 cropShieldToggleAiEvidence();
 showToast('Assessment form cleared.', 'info');
}

function cropShieldBindHistoryActions() {
 cropShieldElement('csCaseList').addEventListener('click', event => {
 const button = event.target.closest('[data-cs-action]');
 if (!button) return;
 const caseId = Number(button.dataset.caseId);
 if (button.dataset.csAction === 'view') cropShieldOpenCase(caseId);
 if (button.dataset.csAction === 'pdf') cropShieldDownloadReport(caseId, button.dataset.reference);
 if (button.dataset.csAction === 'delete') {
  cropShieldDeleteCase(caseId, button.dataset.reference, button);
 }
 });
 cropShieldElement('csCaseSearch').addEventListener('input', () => cropShieldRenderCases());
 cropShieldElement('csStatusFilter').addEventListener('change', () => cropShieldRenderCases());
}

function initCropShield() {
 const form = cropShieldElement('cropShieldForm');
 if (!form) return;
 if (!localStorage.getItem('agri_token')) {
 window.location.href = 'auth.html';
 return;
 }

 const now = new Date();
 const today = cropShieldLocalDate(now);
 const currentLocalDateTime = cropShieldLocalDateTime(now);
 cropShieldElement('csDamageOccurredAt').max = currentLocalDateTime;
 cropShieldElement('csLossIntimatedAt').max = currentLocalDateTime;
 cropShieldElement('csSowingDate').max = today;
 cropShieldElement('csSurveyDate').max = today;
 cropShieldElement('csSeasonYear').max = now.getFullYear() + 1;
 cropShieldRestoreDraft();
 if (!cropShieldElement('csSeasonYear').value) cropShieldElement('csSeasonYear').value = now.getFullYear();
 if (!cropShieldElement('csSurveyDate').value) cropShieldElement('csSurveyDate').value = today;
 if (!cropShieldElement('csDamageOccurredAt').value) {
 cropShieldElement('csDamageOccurredAt').value = cropShieldLocalDateTime(new Date(now.getTime() - 3600000));
 }
 if (!cropShieldElement('csLossIntimatedAt').value) {
 cropShieldElement('csLossIntimatedAt').value = currentLocalDateTime;
 }

 const user = getStoredUser();
 const farmerName = [
  user?.first_name || user?.firstName,
  user?.last_name || user?.lastName
 ].filter(Boolean).join(' ') || user?.username || '';
 if (!cropShieldElement('csFarmerName').value) cropShieldElement('csFarmerName').value = farmerName;
 if (!cropShieldElement('csContactNumber').value) cropShieldElement('csContactNumber').value = user?.phone || '';
 if (!cropShieldElement('csState').value) cropShieldElement('csState').value = user?.state || '';
 if (!cropShieldElement('csDistrict').value) cropShieldElement('csDistrict').value = user?.district || '';
 if (!cropShieldElement('csVillage').value) cropShieldElement('csVillage').value = user?.village || '';
 cropShieldLocation();

 CROP_SHIELD_DRAFT_FIELDS.forEach(id => {
 const input = cropShieldElement(id);
 if (!input) return;
 input.addEventListener('input', () => {
 cropShieldLocation();
 cropShieldUpdateEstimate();
 cropShieldUpdateIntimation();
 cropShieldUpdateCompletion();
 cropShieldSaveDraft();
 });
 cropShieldElement('csSowingDate').addEventListener('change', () => {
  cropShieldElement('csExpectedHarvestDate').min = cropShieldElement('csSowingDate').value;
 });
 cropShieldElement('csDamageType').addEventListener('change', cropShieldToggleAiEvidence);
 input.addEventListener('change', cropShieldSaveDraft);
 });
 cropShieldElement('csDeclaration').addEventListener('change', cropShieldUpdateCompletion);
 cropShieldElement('csAadhaarAvailable').addEventListener('change', cropShieldUpdateClaimChecklist);
 cropShieldElement('csLandRecordAvailable').addEventListener('change', cropShieldUpdateClaimChecklist);
 cropShieldElement('csBankDetailsAvailable').addEventListener('change', cropShieldUpdateClaimChecklist);
 cropShieldElement('csVillage').addEventListener('blur', () => cropShieldWeatherSnapshot(cropShieldLocation()));
 cropShieldElement('csLocateBtn').addEventListener('click', cropShieldCaptureLocation);
 cropShieldElement('csResetBtn').addEventListener('click', cropShieldResetForm);
 cropShieldElement('csRefreshCases').addEventListener('click', cropShieldLoadCases);
 form.addEventListener('submit', cropShieldSubmit);

 cropShieldBindDropZone('damage', 'csDamageZone', 'csDamageInput');
 cropShieldBindDropZone('map', 'csMapZone', 'csMapInput');
 cropShieldBindDropZone('ai', 'csAiZone', 'csAiInput');
 cropShieldBindSignatureCapture();
 cropShieldBindHistoryActions();
 cropShieldUpdateEstimate();
 cropShieldUpdateIntimation();
 cropShieldUpdateCompletion();
 cropShieldUpdateClaimChecklist();
 cropShieldToggleAiEvidence();
 cropShieldLoadDiseaseEvidence();
 cropShieldLoadCases();

 const caseId = new URLSearchParams(window.location.search).get('case');
 if (/^\d+$/.test(caseId || '')) cropShieldOpenCase(Number(caseId));
}

document.addEventListener('DOMContentLoaded', initCropShield);
