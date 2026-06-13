function verificationEscape(value) {
 return String(value ?? '').replace(/[&<>"']/g, character => ({
 '&': '&amp;',
 '<': '&lt;',
 '>': '&gt;',
 '"': '&quot;',
 "'": '&#039;'
 })[character]);
}

function verificationApiBases() {
 const configured = document.querySelector('meta[name="api-url"]')?.content?.trim();
 const isLocal = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
 const bases = [];
 if (isLocal) {
 bases.push('http://localhost:5000/api', 'http://127.0.0.1:5000/api');
 } else {
 if (configured) bases.push(configured.replace(/\/$/, ''));
 if (location.protocol !== 'file:') bases.push(`${location.origin}/api`);
 }
 return [...new Set(bases)];
}

async function fetchVerification(reference) {
 let lastError = new Error('Verification service is unavailable.');
 for (const baseUrl of verificationApiBases()) {
 try {
 const response = await fetch(`${baseUrl}/cropshield/verify/${encodeURIComponent(reference)}`);
 const contentType = response.headers.get('content-type') || '';
 const data = contentType.includes('application/json')
 ? await response.json()
 : { msg: 'Verification service returned an invalid response.' };
 if (!response.ok) {
 const error = new Error(data.msg || 'CropShield report not found.');
 error.isFinal = response.status >= 400 && response.status < 500;
 throw error;
 }
 return data;
 } catch (error) {
 if (error.isFinal) throw error;
 lastError = error;
 }
 }
 throw lastError;
}

function renderVerification(data) {
 const state = document.getElementById('verificationState');
 state.className = 'cropshield-verify-state success';
 state.innerHTML = `
 <span class="cropshield-verify-icon"><i class="fas fa-circle-check"></i></span>
 <span class="cropshield-verify-kicker">Authentic CropShield record</span>
 <h1>Report verified</h1>
 <p>This reference and evidence fingerprint match a report stored by AgriComplete Hub.</p>
 <dl class="cropshield-verify-summary">
 <div><dt>Reference</dt><dd>${verificationEscape(data.reference)}</dd></div>
 <div><dt>Season</dt><dd>${verificationEscape([data.season, data.season_year].filter(Boolean).join(' ') || 'Not recorded')}</dd></div>
 <div><dt>Crop</dt><dd>${verificationEscape(data.crop_name)}</dd></div>
 <div><dt>District / village</dt><dd>${verificationEscape([data.district, data.village].filter(Boolean).join(' / ') || 'Not recorded')}</dd></div>
 <div><dt>Survey / Khasra</dt><dd>${verificationEscape(data.survey_number || 'Not recorded')}</dd></div>
 <div><dt>Insured area</dt><dd>${verificationEscape(data.field_area_acres)} acres</dd></div>
 <div><dt>Policy / application</dt><dd>${verificationEscape(data.policy_number || 'Not recorded')}</dd></div>
 <div><dt>Damage type</dt><dd>${verificationEscape(data.damage_type)}</dd></div>
 <div><dt>Reported damage</dt><dd>${verificationEscape(data.reported_damage_percent)}%</dd></div>
 <div><dt>Claim readiness</dt><dd>${verificationEscape(data.claim_score || 0)}/100 - ${verificationEscape(data.claim_status || 'Evidence incomplete')}</dd></div>
 <div><dt>Loss intimation</dt><dd>${verificationEscape(data.intimation_status || 'Not recorded')}</dd></div>
 <div><dt>Current status</dt><dd>${verificationEscape(data.status)}</dd></div>
 <div><dt>Assessment date</dt><dd>${verificationEscape(new Date(data.assessment_date).toLocaleDateString('en-IN'))}</dd></div>
 </dl>
 <div class="cropshield-verify-fingerprint">
 <span>Evidence fingerprint</span>
 <code>${verificationEscape(data.evidence_fingerprint)}</code>
 </div>
 <p class="cropshield-verify-note"><i class="fas fa-circle-info"></i><span>Verification proves that the record exists and identifies its evidence package. It does not represent government inspection or insurance approval.</span></p>
 <div class="cropshield-verify-actions"><a href="index.html"><i class="fas fa-house"></i> AgriComplete Hub</a></div>
 `;
}

function renderVerificationError(message) {
 const state = document.getElementById('verificationState');
 state.className = 'cropshield-verify-state error';
 state.innerHTML = `
 <span class="cropshield-verify-icon"><i class="fas fa-circle-xmark"></i></span>
 <span class="cropshield-verify-kicker">Verification unsuccessful</span>
 <h1>Report not verified</h1>
 <p>${verificationEscape(message)}</p>
 <div class="cropshield-verify-actions"><a href="index.html"><i class="fas fa-house"></i> Return home</a></div>
 `;
}

async function initCropShieldVerification() {
 const reference = new URLSearchParams(location.search).get('reference')?.trim();
 if (!reference) {
 renderVerificationError('The verification link does not contain a CropShield reference.');
 return;
 }
 if (!/^(?:CS-\d{8}-[A-F0-9]{6}|CS-\d{4}-\d{6})$/i.test(reference)) {
 renderVerificationError('The CropShield reference format is invalid.');
 return;
 }
 try {
 renderVerification(await fetchVerification(reference));
 } catch (error) {
 renderVerificationError(error.message || 'This CropShield reference could not be verified.');
 }
}

document.addEventListener('DOMContentLoaded', initCropShieldVerification);
