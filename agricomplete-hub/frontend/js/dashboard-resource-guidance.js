(function () {
  const DEFAULT_CITY = 'Pune';
  let lastWeather = null;

  const resourceTranslations = {
    hi: {
      'North Plot': 'उत्तर प्लॉट',
      'Central Plot': 'मध्य प्लॉट',
      'South Plot': 'दक्षिण प्लॉट',
      'East Plot': 'पूर्व प्लॉट',
      'Farm Plot': 'फार्म प्लॉट',
      'Balanced NPK': 'संतुलित NPK',
      'Active growth': 'सक्रिय वृद्धि',
      'Vegetative': 'वनस्पति अवस्था',
      'Flowering': 'फूल अवस्था',
      'Tuber formation': 'कंद बनना',
      'Branching': 'शाखा बनना',
      'Bulb development': 'बल्ब विकास',
      'Fruiting': 'फल अवस्था',
      'Grand growth': 'तेज वृद्धि',
      'Head formation': 'हेड बनना',
      'Root development': 'जड़ विकास',
      'Hold': 'रोकें',
      'Action': 'कार्यवाही',
      'Stable': 'स्थिर',
      'After rain stops': 'बारिश रुकने के बाद',
      'Delay 24h': '24 घंटे रोकें',
      'Evening only': 'केवल शाम',
      'Irrigate first': 'पहले सिंचाई',
      'Midday window': 'दोपहर समय',
      'Tomorrow morning': 'कल सुबह',
      'Delay irrigation. Rain or high humidity can increase soil moisture.': 'सिंचाई रोकें। बारिश या अधिक नमी से मिट्टी में नमी बढ़ सकती है।',
      'Irrigate early morning or evening to reduce evaporation loss.': 'पानी की बचत के लिए सुबह जल्दी या शाम को सिंचाई करें।',
      'Moisture is acceptable. Continue normal monitoring.': 'नमी सही है। सामान्य निगरानी जारी रखें।',
      'Apply only after rainfall stops and leaves/soil surface are not wet.': 'बारिश रुकने और पत्ते/मिट्टी की सतह सूखने के बाद ही डालें।',
      'High humidity is present. Delay application to reduce nutrient loss.': 'नमी अधिक है। पोषक तत्व नुकसान कम करने के लिए आवेदन रोकें।',
      'Heat stress risk. Apply in evening with light irrigation support.': 'गर्मी का जोखिम है। हल्की सिंचाई के साथ शाम को डालें।',
      'Soil is dry. Irrigate first, then apply fertilizer after moisture stabilizes.': 'मिट्टी सूखी है। पहले सिंचाई करें, फिर नमी स्थिर होने पर खाद डालें।',
      'Cool weather. Apply during a mild midday window for better uptake.': 'ठंडा मौसम है। बेहतर अवशोषण के लिए हल्की दोपहर में डालें।',
      'Weather is suitable for planned fertilizer application.': 'मौसम तय खाद आवेदन के लिए उपयुक्त है।',
    },
    mr: {
      'North Plot': 'उत्तर प्लॉट',
      'Central Plot': 'मध्य प्लॉट',
      'South Plot': 'दक्षिण प्लॉट',
      'East Plot': 'पूर्व प्लॉट',
      'Farm Plot': 'फार्म प्लॉट',
      'Balanced NPK': 'संतुलित NPK',
      'Active growth': 'सक्रिय वाढ',
      'Vegetative': 'वनस्पती अवस्था',
      'Flowering': 'फुलोरा',
      'Tuber formation': 'कंद निर्मिती',
      'Branching': 'फांद्या येणे',
      'Bulb development': 'कांदा वाढ',
      'Fruiting': 'फळधारणा',
      'Grand growth': 'जलद वाढ',
      'Head formation': 'हेड निर्मिती',
      'Root development': 'मुळांची वाढ',
      'Hold': 'थांबा',
      'Action': 'कार्यवाही',
      'Stable': 'स्थिर',
      'After rain stops': 'पाऊस थांबल्यानंतर',
      'Delay 24h': '24 तास थांबा',
      'Evening only': 'फक्त संध्याकाळी',
      'Irrigate first': 'आधी सिंचन',
      'Midday window': 'दुपारचा वेळ',
      'Tomorrow morning': 'उद्या सकाळी',
      'Delay irrigation. Rain or high humidity can increase soil moisture.': 'सिंचन थांबवा. पाऊस किंवा जास्त आर्द्रता मातीतील ओलावा वाढवू शकते.',
      'Irrigate early morning or evening to reduce evaporation loss.': 'बाष्पीभवन कमी करण्यासाठी सकाळी लवकर किंवा संध्याकाळी सिंचन करा.',
      'Moisture is acceptable. Continue normal monitoring.': 'ओलावा योग्य आहे. सामान्य निरीक्षण सुरू ठेवा.',
      'Apply only after rainfall stops and leaves/soil surface are not wet.': 'पाऊस थांबल्यावर आणि पाने/मातीची पृष्ठभाग ओलसर नसल्यावरच वापरा.',
      'High humidity is present. Delay application to reduce nutrient loss.': 'आर्द्रता जास्त आहे. पोषक घटकांचे नुकसान कमी करण्यासाठी वापर थांबवा.',
      'Heat stress risk. Apply in evening with light irrigation support.': 'उष्णतेचा धोका आहे. हलक्या सिंचनासह संध्याकाळी वापरा.',
      'Soil is dry. Irrigate first, then apply fertilizer after moisture stabilizes.': 'माती कोरडी आहे. आधी सिंचन करा, नंतर ओलावा स्थिर झाल्यावर खत द्या.',
      'Cool weather. Apply during a mild midday window for better uptake.': 'थंड हवामान आहे. चांगल्या शोषणासाठी दुपारच्या सौम्य वेळेत वापरा.',
      'Weather is suitable for planned fertilizer application.': 'नियोजित खत वापरासाठी हवामान योग्य आहे.',
    },
    pa: {
      'North Plot': 'ਉੱਤਰੀ ਪਲਾਟ',
      'Central Plot': 'ਮੱਧ ਪਲਾਟ',
      'South Plot': 'ਦੱਖਣੀ ਪਲਾਟ',
      'East Plot': 'ਪੂਰਬੀ ਪਲਾਟ',
      'Farm Plot': 'ਫਾਰਮ ਪਲਾਟ',
      'Balanced NPK': 'ਸੰਤੁਲਿਤ NPK',
      'Active growth': 'ਸਰਗਰਮ ਵਾਧਾ',
      'Vegetative': 'ਵੈਜੀਟੇਟਿਵ ਅਵਸਥਾ',
      'Flowering': 'ਫੁੱਲ ਆਉਣਾ',
      'Tuber formation': 'ਗੰਠ ਬਣਨਾ',
      'Branching': 'ਸ਼ਾਖਾਵਾਂ ਬਣਨਾ',
      'Bulb development': 'ਬਲਬ ਵਿਕਾਸ',
      'Fruiting': 'ਫਲ ਅਵਸਥਾ',
      'Grand growth': 'ਤੇਜ਼ ਵਾਧਾ',
      'Head formation': 'ਹੈੱਡ ਬਣਨਾ',
      'Root development': 'ਜੜ ਵਿਕਾਸ',
      'Hold': 'ਰੋਕੋ',
      'Action': 'ਕਾਰਵਾਈ',
      'Stable': 'ਸਥਿਰ',
      'After rain stops': 'ਮੀਂਹ ਰੁਕਣ ਤੋਂ ਬਾਅਦ',
      'Delay 24h': '24 ਘੰਟੇ ਰੋਕੋ',
      'Evening only': 'ਸਿਰਫ਼ ਸ਼ਾਮ',
      'Irrigate first': 'ਪਹਿਲਾਂ ਸਿੰਚਾਈ',
      'Midday window': 'ਦੁਪਹਿਰ ਸਮਾਂ',
      'Tomorrow morning': 'ਕੱਲ੍ਹ ਸਵੇਰੇ',
      'Delay irrigation. Rain or high humidity can increase soil moisture.': 'ਸਿੰਚਾਈ ਰੋਕੋ। ਮੀਂਹ ਜਾਂ ਵੱਧ ਨਮੀ ਮਿੱਟੀ ਦੀ ਨਮੀ ਵਧਾ ਸਕਦੀ ਹੈ।',
      'Irrigate early morning or evening to reduce evaporation loss.': 'ਪਾਣੀ ਦੀ ਬਚਤ ਲਈ ਸਵੇਰੇ ਜਲਦੀ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਸਿੰਚਾਈ ਕਰੋ।',
      'Moisture is acceptable. Continue normal monitoring.': 'ਨਮੀ ਠੀਕ ਹੈ। ਆਮ ਨਿਗਰਾਨੀ ਜਾਰੀ ਰੱਖੋ।',
      'Apply only after rainfall stops and leaves/soil surface are not wet.': 'ਮੀਂਹ ਰੁਕਣ ਅਤੇ ਪੱਤੇ/ਮਿੱਟੀ ਸੁੱਕਣ ਤੋਂ ਬਾਅਦ ਹੀ ਪਾਓ।',
      'High humidity is present. Delay application to reduce nutrient loss.': 'ਨਮੀ ਵੱਧ ਹੈ। ਪੋਸ਼ਕ ਨੁਕਸਾਨ ਘਟਾਉਣ ਲਈ ਵਰਤੋਂ ਰੋਕੋ।',
      'Heat stress risk. Apply in evening with light irrigation support.': 'ਗਰਮੀ ਦਾ ਖਤਰਾ ਹੈ। ਹਲਕੀ ਸਿੰਚਾਈ ਨਾਲ ਸ਼ਾਮ ਨੂੰ ਪਾਓ।',
      'Soil is dry. Irrigate first, then apply fertilizer after moisture stabilizes.': 'ਮਿੱਟੀ ਸੁੱਕੀ ਹੈ। ਪਹਿਲਾਂ ਸਿੰਚਾਈ ਕਰੋ, ਫਿਰ ਨਮੀ ਸਥਿਰ ਹੋਣ ਤੇ ਖਾਦ ਪਾਓ।',
      'Cool weather. Apply during a mild midday window for better uptake.': 'ਠੰਢਾ ਮੌਸਮ ਹੈ। ਚੰਗੀ ਲੈਣ ਲਈ ਦੁਪਹਿਰ ਦੇ ਹਲਕੇ ਸਮੇਂ ਵਿੱਚ ਪਾਓ।',
      'Weather is suitable for planned fertilizer application.': 'ਮੌਸਮ ਯੋਜਿਤ ਖਾਦ ਲਈ ਠੀਕ ਹੈ।',
    },
    ta: {
      'North Plot': 'வடக்கு பகுதி',
      'Central Plot': 'மத்திய பகுதி',
      'South Plot': 'தெற்கு பகுதி',
      'East Plot': 'கிழக்கு பகுதி',
      'Farm Plot': 'பண்ணை பகுதி',
      'Balanced NPK': 'சமநிலை NPK',
      'Active growth': 'செயலில் வளர்ச்சி',
      'Vegetative': 'தாவர வளர்ச்சி நிலை',
      'Flowering': 'பூக்கும் நிலை',
      'Tuber formation': 'கிழங்கு உருவாக்கம்',
      'Branching': 'கிளை வளர்ச்சி',
      'Bulb development': 'குமிழ் வளர்ச்சி',
      'Fruiting': 'காய் நிலை',
      'Grand growth': 'வேகமான வளர்ச்சி',
      'Head formation': 'தலை உருவாக்கம்',
      'Root development': 'வேர் வளர்ச்சி',
      'Hold': 'நிறுத்தவும்',
      'Action': 'செயல்',
      'Stable': 'நிலையாக',
      'After rain stops': 'மழை நின்ற பின்',
      'Delay 24h': '24 மணி தாமதம்',
      'Evening only': 'மாலை மட்டும்',
      'Irrigate first': 'முதலில் பாசனம்',
      'Midday window': 'மதிய நேரம்',
      'Tomorrow morning': 'நாளை காலை',
      'Delay irrigation. Rain or high humidity can increase soil moisture.': 'பாசனத்தை தாமதிக்கவும். மழை அல்லது அதிக ஈரப்பதம் மண் ஈரத்தை உயர்த்தலாம்.',
      'Irrigate early morning or evening to reduce evaporation loss.': 'ஆவியாதல் இழப்பை குறைக்க அதிகாலை அல்லது மாலையில் பாசனம் செய்யவும்.',
      'Moisture is acceptable. Continue normal monitoring.': 'ஈரப்பதம் ஏற்றது. சாதாரண கண்காணிப்பை தொடரவும்.',
      'Apply only after rainfall stops and leaves/soil surface are not wet.': 'மழை நின்று இலை/மண் மேற்பரப்பு ஈரமில்லாதபின் மட்டும் இடவும்.',
      'High humidity is present. Delay application to reduce nutrient loss.': 'ஈரப்பதம் அதிகம். ஊட்டச்சத்து இழப்பை குறைக்க இடுவதை தாமதிக்கவும்.',
      'Heat stress risk. Apply in evening with light irrigation support.': 'வெப்ப அழுத்த ஆபத்து. லேசான பாசனத்துடன் மாலையில் இடவும்.',
      'Soil is dry. Irrigate first, then apply fertilizer after moisture stabilizes.': 'மண் உலர்ந்துள்ளது. முதலில் பாசனம் செய்து, ஈரம் நிலையானபின் உரம் இடவும்.',
      'Cool weather. Apply during a mild midday window for better uptake.': 'குளிர்ந்த வானிலை. சிறந்த உறிஞ்சுதலுக்கு மிதமான மதிய நேரத்தில் இடவும்.',
      'Weather is suitable for planned fertilizer application.': 'திட்டமிட்ட உர பயன்பாட்டுக்கு வானிலை ஏற்றது.',
    },
    te: {
      'North Plot': 'ఉత్తర ప్లాట్',
      'Central Plot': 'మధ్య ప్లాట్',
      'South Plot': 'దక్షిణ ప్లాట్',
      'East Plot': 'తూర్పు ప్లాట్',
      'Farm Plot': 'ఫార్మ్ ప్లాట్',
      'Balanced NPK': 'సమతుల్య NPK',
      'Active growth': 'సక్రియ పెరుగుదల',
      'Vegetative': 'వెజిటేటివ్ దశ',
      'Flowering': 'పుష్పించే దశ',
      'Tuber formation': 'గడ్డల ఏర్పాటుదశ',
      'Branching': 'కొమ్మల దశ',
      'Bulb development': 'బల్బ్ అభివృద్ధి',
      'Fruiting': 'ఫల దశ',
      'Grand growth': 'వేగవంతమైన పెరుగుదల',
      'Head formation': 'హెడ్ ఏర్పాటుదశ',
      'Root development': 'వేరు అభివృద్ధి',
      'Hold': 'ఆపండి',
      'Action': 'చర్య',
      'Stable': 'స్థిరం',
      'After rain stops': 'వర్షం ఆగిన తర్వాత',
      'Delay 24h': '24 గంటలు ఆలస్యం',
      'Evening only': 'సాయంత్రం మాత్రమే',
      'Irrigate first': 'ముందు నీరు',
      'Midday window': 'మధ్యాహ్న సమయం',
      'Tomorrow morning': 'రేపు ఉదయం',
      'Delay irrigation. Rain or high humidity can increase soil moisture.': 'నీటిని ఆలస్యం చేయండి. వర్షం లేదా అధిక తేమ నేల తేమను పెంచవచ్చు.',
      'Irrigate early morning or evening to reduce evaporation loss.': 'ఆవిరి నష్టం తగ్గేందుకు ఉదయం త్వరగా లేదా సాయంత్రం నీరు పెట్టండి.',
      'Moisture is acceptable. Continue normal monitoring.': 'తేమ సరిపోతుంది. సాధారణ పర్యవేక్షణ కొనసాగించండి.',
      'Apply only after rainfall stops and leaves/soil surface are not wet.': 'వర్షం ఆగి ఆకులు/నేల ఉపరితలం తడిగా లేకపోయిన తర్వాత మాత్రమే వేయండి.',
      'High humidity is present. Delay application to reduce nutrient loss.': 'తేమ ఎక్కువగా ఉంది. పోషక నష్టం తగ్గించడానికి వేయడాన్ని ఆలస్యం చేయండి.',
      'Heat stress risk. Apply in evening with light irrigation support.': 'వేడి ఒత్తిడి ప్రమాదం. తేలికపాటి నీటితో సాయంత్రం వేయండి.',
      'Soil is dry. Irrigate first, then apply fertilizer after moisture stabilizes.': 'నేల పొడిగా ఉంది. ముందుగా నీరు పెట్టి, తేమ స్థిరపడిన తర్వాత ఎరువు వేయండి.',
      'Cool weather. Apply during a mild midday window for better uptake.': 'చల్లటి వాతావరణం. మంచి గ్రహణానికి మితమైన మధ్యాహ్న సమయంలో వేయండి.',
      'Weather is suitable for planned fertilizer application.': 'ప్రణాళిక చేసిన ఎరువు వేయడానికి వాతావరణం అనుకూలంగా ఉంది.',
    },
  };

  if (typeof registerStaticUiTranslations === 'function') {
    registerStaticUiTranslations(resourceTranslations);
  }
  const defaultPlots = [
    { plot: 'North Plot', crop: 'Wheat', baseMoisture: 68, stage: 'Vegetative' },
    { plot: 'Central Plot', crop: 'Chickpea', baseMoisture: 48, stage: 'Flowering' },
    { plot: 'South Plot', crop: 'Potato', baseMoisture: 58, stage: 'Tuber formation' },
  ];

  const plotNames = ['North Plot', 'Central Plot', 'South Plot', 'East Plot'];
  const cropGuidance = {
    wheat: { fertilizer: 'Urea (N)', qty: '45-50 kg/acre', stage: 'Vegetative', moisture: 68 },
    chickpea: { fertilizer: 'DAP (P)', qty: '25-30 kg/acre', stage: 'Flowering', moisture: 48 },
    gram: { fertilizer: 'DAP (P)', qty: '25-30 kg/acre', stage: 'Flowering', moisture: 48 },
    potato: { fertilizer: 'MOP (K)', qty: '20-25 kg/acre', stage: 'Tuber formation', moisture: 58 },
    mustard: { fertilizer: 'Sulphur', qty: '12-15 kg/acre', stage: 'Branching', moisture: 55 },
    onion: { fertilizer: 'NPK 19:19:19', qty: '18-22 kg/acre', stage: 'Bulb development', moisture: 62 },
    tomato: { fertilizer: 'Calcium nitrate', qty: '12-15 kg/acre', stage: 'Fruiting', moisture: 64 },
    sugarcane: { fertilizer: 'Urea + Potash', qty: '55-65 kg/acre', stage: 'Grand growth', moisture: 72 },
    cabbage: { fertilizer: 'NPK 12:32:16', qty: '25-30 kg/acre', stage: 'Head formation', moisture: 60 },
    carrot: { fertilizer: 'Potash', qty: '15-18 kg/acre', stage: 'Root development', moisture: 57 },
  };

  function element(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char]));
  }

  function t(source) {
    return typeof getStaticUiText === 'function' ? getStaticUiText(source) : source;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getStoredFarmCrops() {
    try {
      const user = typeof getStoredUser === 'function' ? getStoredUser() : JSON.parse(localStorage.getItem('user') || '{}');
      return String(user?.primary_crops || user?.primaryCrops || '')
        .split(',')
        .map(crop => crop.trim())
        .filter(Boolean)
        .slice(0, 4);
    } catch (error) {
      return [];
    }
  }

  function getCropRule(crop) {
    const key = String(crop || '').toLowerCase();
    return cropGuidance[key] || { fertilizer: 'Balanced NPK', qty: '20-25 kg/acre', stage: 'Active growth', moisture: 60 };
  }

  function getDashboardPlots() {
    const profileCrops = getStoredFarmCrops();
    const crops = profileCrops.length ? profileCrops : defaultPlots.map(plot => plot.crop);
    return crops.map((crop, index) => {
      const rule = getCropRule(crop);
      return {
        plot: profileCrops.length ? plotNames[index] : defaultPlots[index]?.plot || plotNames[index] || 'Farm Plot',
        crop,
        baseMoisture: rule.moisture,
        stage: rule.stage,
      };
    });
  }

  function getFertilizerRules() {
    return getDashboardPlots().map(plot => {
      const rule = getCropRule(plot.crop);
      return {
        crop: plot.crop,
        fertilizer: rule.fertilizer,
        qty: rule.qty,
        stage: rule.stage,
      };
    });
  }

  async function loadWeather() {
    const city = element('weatherCityInput')?.value?.trim() || DEFAULT_CITY;
    return apiFetch(`/weather/current?city=${encodeURIComponent(city)}`);
  }

  function weatherFactors(weather = {}) {
    const condition = String(weather.condition || '').toLowerCase();
    const temp = Number(weather.temperature);
    const humidity = Number(weather.humidity);
    const rainLike = condition.includes('rain') || condition.includes('drizzle') || condition.includes('storm');
    const hot = Number.isFinite(temp) && temp >= 33;
    const dry = Number.isFinite(humidity) && humidity < 38;
    const humid = Number.isFinite(humidity) && humidity >= 82;
    return { condition, temp, humidity, rainLike, hot, dry, humid };
  }

  function waterStatus(moisture, factors) {
    if (factors.rainLike || factors.humid) {
      return {
        value: clamp(moisture + 12, 0, 100),
        color: 'var(--color-primary)',
        message: 'Delay irrigation. Rain or high humidity can increase soil moisture.',
        badge: 'Hold',
      };
    }
    if (factors.hot || factors.dry || moisture < 48) {
      return {
        value: clamp(moisture - 10, 0, 100),
        color: '#E65100',
        message: 'Irrigate early morning or evening to reduce evaporation loss.',
        badge: 'Action',
      };
    }
    return {
      value: moisture,
      color: 'var(--color-primary)',
      message: 'Moisture is acceptable. Continue normal monitoring.',
      badge: 'Stable',
    };
  }

  function renderWater(weather) {
    const list = element('dashboardWaterList');
    if (!list) return;
    const factors = weatherFactors(weather);
    const plots = getDashboardPlots();
    list.innerHTML = plots.map(field => {
      const status = waterStatus(field.baseMoisture, factors);
      const fillStyle = `width:${status.value}%;background:${status.color === '#E65100' ? 'linear-gradient(90deg,#E65100,#FF8F00)' : 'linear-gradient(90deg,var(--color-primary-light),var(--color-primary))'};`;
      return `
        <div class="dashboard-resource-item">
          <div class="dashboard-resource-row">
            <span>${escapeHtml(t(field.plot))} - ${escapeHtml(t(field.crop))}</span>
            <strong style="color:${status.color};">${Math.round(status.value)}%</strong>
          </div>
          <div class="confidence-bar"><div class="confidence-fill" style="${fillStyle}"></div></div>
          <p><span class="badge ${status.badge === 'Action' ? 'badge-warning' : status.badge === 'Hold' ? 'badge-info' : ''}">${escapeHtml(t(status.badge))}</span> ${escapeHtml(t(status.message))}</p>
        </div>
      `;
    }).join('');
  }

  function fertilizerDue(rule, factors) {
    if (factors.rainLike) {
      return {
        label: 'After rain stops',
        badge: 'badge-info',
        note: 'Apply only after rainfall stops and leaves/soil surface are not wet.',
      };
    }
    if (factors.humid) {
      return {
        label: 'Delay 24h',
        badge: 'badge-info',
        note: 'High humidity is present. Delay application to reduce nutrient loss.',
      };
    }
    if (factors.hot) {
      return {
        label: 'Evening only',
        badge: 'badge-warning',
        note: 'Heat stress risk. Apply in evening with light irrigation support.',
      };
    }
    if (factors.dry) {
      return {
        label: 'Irrigate first',
        badge: 'badge-warning',
        note: 'Soil is dry. Irrigate first, then apply fertilizer after moisture stabilizes.',
      };
    }
    if (Number.isFinite(factors.temp) && factors.temp <= 16) {
      return {
        label: 'Midday window',
        badge: 'badge-info',
        note: 'Cool weather. Apply during a mild midday window for better uptake.',
      };
    }
    return {
      label: 'Tomorrow morning',
      badge: '',
      note: 'Weather is suitable for planned fertilizer application.',
    };
  }

  function renderFertilizer(weather) {
    const body = element('dashboardFertilizerBody');
    if (!body) return;
    const factors = weatherFactors(weather);
    const fertilizerRules = getFertilizerRules();
    body.innerHTML = fertilizerRules.map(rule => {
      const due = fertilizerDue(rule, factors);
      return `
        <tr>
          <td><i class="fas fa-seedling crop-row-icon"></i>${escapeHtml(t(rule.crop))}</td>
          <td>${escapeHtml(t(rule.fertilizer))}</td>
          <td>${escapeHtml(rule.qty)}</td>
          <td>
            <span class="badge ${due.badge}" title="${escapeHtml(t(due.note))}">${escapeHtml(t(due.label))}</span>
            <small class="fertilizer-weather-note">${escapeHtml(t(due.note))}</small>
          </td>
        </tr>
      `;
    }).join('');
  }

  async function loadDashboardResourceGuidance() {
    const waterList = element('dashboardWaterList');
    const fertBody = element('dashboardFertilizerBody');
    if (!waterList && !fertBody) return;
    try {
      const weather = await loadWeather();
      lastWeather = weather;
      renderWater(weather);
      renderFertilizer(weather);
    } catch (error) {
      renderWater({});
      renderFertilizer({});
    }
  }

  window.loadDashboardResourceGuidance = loadDashboardResourceGuidance;

  document.addEventListener('DOMContentLoaded', () => {
    loadDashboardResourceGuidance();
  });

  window.addEventListener('agri:languagechange', () => {
    renderWater(lastWeather || {});
    renderFertilizer(lastWeather || {});
  });
}());
