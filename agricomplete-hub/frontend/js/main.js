/* =============================================
   AgriComplete Hub — Main JavaScript
   ============================================= */

// ============ MULTI-LANGUAGE SUPPORT ============
const translations = {
  en: {
    hero_badge: "AI-Powered Agriculture Platform",
    hero_title: "Smart Farming Made Simple",
    hero_desc: "Empowering Indian farmers with AI-driven crop recommendations, real-time weather intelligence, plant disease detection, live mandi prices, and a direct marketplace — all in one platform.",
    get_started: "Get Started Free",
    explore_features: "Explore Features",
    stat_farmers: "Active Farmers",
    stat_crops: "Crops Supported",
    stat_accuracy: "Disease Detection Accuracy",
    stat_traded: "Market Value Traded",
    features_badge: "Platform Features",
    features_title: "Everything a Farmer Needs, In One Place",
    features_desc: "From AI-powered disease detection to live market prices, AgriComplete Hub is your complete farming companion.",
    f1_title: "Crop Recommendation",
    f1_desc: "Get AI-based suggestions for the best crops based on your soil type, location, and season.",
    f2_title: "Weather Intelligence",
    f2_desc: "Real-time weather forecasts, storm alerts, and seasonal predictions for your farm location.",
    f3_title: "Disease Detection",
    f3_desc: "Upload a leaf photo and our AI identifies diseases instantly with treatment recommendations.",
    f4_title: "Live Mandi Prices",
    f4_desc: "Track real-time commodity prices from mandis across India. Never sell below market rate.",
    f5_title: "Farmer Marketplace",
    f5_desc: "Sell directly to buyers. Skip middlemen and get fair prices for your produce.",
    f6_title: "AI Farming Assistant",
    f6_desc: "Chat with our AI bot in your language for instant farming advice, tips, and guidance.",
    hiw_badge: "How It Works",
    hiw_title: "Start Farming Smarter in 3 Steps",
    hiw_desc: "Getting started is as easy as planting a seed.",
    step1_title: "Create Your Profile",
    step1_desc: "Sign up with your farm details — location, soil type, and crops you grow.",
    step2_title: "Get Smart Insights",
    step2_desc: "Receive AI-powered crop recommendations, weather alerts, and disease analysis.",
    step3_title: "Grow & Sell",
    step3_desc: "Maximize your yield and sell directly to buyers at the best prices.",
    test_badge: "Farmer Stories",
    test_title: "Trusted by Farmers Across India",
    cta_title: "Ready to Transform Your Farming?",
    cta_desc: "Join thousands of Indian farmers who are already using AgriComplete Hub to grow smarter, earn better, and farm sustainably.",
    cta_btn1: "Create Free Account",
    cta_btn2: "View Demo Dashboard",
    footer_desc: "Empowering Indian farmers with AI-driven insights, weather intelligence, and direct market access. Built for the future of agriculture.",
    chat_title: "Krishi AI Assistant",
    chat_subtitle: "Ask me anything about farming",
    chat_welcome: "Namaste! 🙏 I'm your Krishi AI assistant. I can help you with crop recommendations, disease identification, weather info, and market prices. How can I help you today?",
    chat_placeholder: "Type your question...",
    nav_dashboard: "Dashboard",
    nav_disease: "Disease Detection",
    nav_market: "Market Prices",
    nav_marketplace: "Marketplace",
    nav_crop_rec: "Crop Recommendation",
    nav_water: "Water Management",
    nav_fertilizer: "Fertilizer Planner",
    nav_resources: "Resource Management",
    nav_profile: "My Profile",
    nav_settings: "Settings",
    nav_logout: "Logout",
    dash_welcome: "Welcome back, Rajesh! 👋",
    login_title: "Welcome Back! 👋",
    login_subtitle: "Sign in to access your farm dashboard",
    register_title: "Create Account 🌱",
    register_subtitle: "Start your smart farming journey today",
    search_placeholder: "Search crops, tools...",
    crop_rec_title: "Crop Suggestions",
    crop_rec_desc: "Based on your soil, climate, and season",
    price_trend: "Crop Price Trends (₹/quintal)",
    recent_alerts: "Recent Alerts",
    water_mgmt: "Water Management",
    fert_plan: "Fertilizer Schedule",
    stat_active_crops: "Active Crops",
    stat_water: "Water Usage",
    stat_revenue: "Est. Revenue",
    stat_alerts: "Active Alerts"
  },
  hi: {
    hero_badge: "AI-संचालित कृषि प्लेटफॉर्म",
    hero_title: "स्मार्ट खेती, आसान बनाई",
    hero_desc: "भारतीय किसानों को AI-संचालित फसल सुझाव, रियल-टाइम मौसम, पौधों की बीमारी का पता लगाने, लाइव मंडी भाव, और सीधा बाजार — सब एक मंच पर।",
    get_started: "मुफ़्त शुरू करें",
    explore_features: "फीचर्स देखें",
    stat_farmers: "सक्रिय किसान",
    stat_crops: "समर्थित फसलें",
    stat_accuracy: "रोग पहचान सटीकता",
    stat_traded: "बाजार मूल्य",
    features_badge: "प्लेटफॉर्म फीचर्स",
    features_title: "किसान की हर ज़रूरत, एक जगह",
    features_desc: "AI रोग पहचान से लेकर लाइव मंडी भाव तक — AgriComplete Hub आपका खेती साथी है।",
    f1_title: "फसल सुझाव",
    f1_desc: "AI से अपनी मिट्टी, स्थान और मौसम के आधार पर सर्वोत्तम फसल सुझाव प्राप्त करें।",
    f2_title: "मौसम जानकारी",
    f2_desc: "रियल-टाइम मौसम पूर्वानुमान, तूफान चेतावनी और मौसमी भविष्यवाणियाँ।",
    f3_title: "रोग पहचान",
    f3_desc: "पत्ती की फोटो अपलोड करें और AI तुरंत बीमारी और उपचार बताएगा।",
    f4_title: "लाइव मंडी भाव",
    f4_desc: "भारत भर की मंडियों से रियल-टाइम भाव ट्रैक करें। कभी कम दाम पर न बेचें।",
    f5_title: "किसान बाजार",
    f5_desc: "सीधे खरीदारों को बेचें। बिचौलियों को छोड़ें और उचित मूल्य पाएं।",
    f6_title: "AI कृषि सहायक",
    f6_desc: "अपनी भाषा में कृषि सलाह, टिप्स और मार्गदर्शन के लिए AI बॉट से चैट करें।",
    hiw_badge: "कैसे काम करता है",
    hiw_title: "3 आसान कदमों में स्मार्ट खेती शुरू करें",
    hiw_desc: "शुरू करना बीज बोने जितना आसान है।",
    step1_title: "प्रोफ़ाइल बनाएं",
    step1_desc: "अपने खेत का विवरण दें — स्थान, मिट्टी का प्रकार और फसलें।",
    step2_title: "स्मार्ट जानकारी पाएं",
    step2_desc: "AI-संचालित फसल सुझाव, मौसम अलर्ट और रोग विश्लेषण प्राप्त करें।",
    step3_title: "उगाएं और बेचें",
    step3_desc: "अपनी उपज बढ़ाएं और सर्वोत्तम मूल्य पर सीधे खरीदारों को बेचें।",
    test_badge: "किसान कहानियाँ",
    test_title: "भारत भर के किसानों का भरोसा",
    cta_title: "अपनी खेती बदलने के लिए तैयार?",
    cta_desc: "हजारों भारतीय किसानों से जुड़ें जो पहले से AgriComplete Hub का उपयोग कर रहे हैं।",
    cta_btn1: "मुफ़्त खाता बनाएं",
    cta_btn2: "डेमो डैशबोर्ड देखें",
    footer_desc: "भारतीय किसानों को AI जानकारी, मौसम और बाजार पहुंच प्रदान करना। कृषि के भविष्य के लिए बनाया गया।",
    chat_title: "कृषि AI सहायक",
    chat_subtitle: "खेती के बारे में कुछ भी पूछें",
    chat_welcome: "नमस्ते! 🙏 मैं आपका कृषि AI सहायक हूँ। फसल सुझाव, रोग पहचान, मौसम और बाज़ार भाव में मदद कर सकता हूँ।",
    chat_placeholder: "अपना सवाल टाइप करें...",
    nav_dashboard: "डैशबोर्ड",
    nav_disease: "रोग पहचान",
    nav_market: "मंडी भाव",
    nav_marketplace: "बाजार",
    nav_crop_rec: "फसल सुझाव",
    nav_water: "जल प्रबंधन",
    nav_fertilizer: "खाद योजना",
    nav_resources: "संसाधन प्रबंधन",
    nav_profile: "मेरी प्रोफ़ाइल",
    nav_settings: "सेटिंग्स",
    nav_logout: "लॉगआउट",
    dash_welcome: "वापस स्वागत है, राजेश! 👋",
    login_title: "वापस स्वागत है! 👋",
    login_subtitle: "अपने खेत डैशबोर्ड में साइन इन करें",
    register_title: "खाता बनाएं 🌱",
    register_subtitle: "आज ही अपनी स्मार्ट खेती यात्रा शुरू करें",
    search_placeholder: "फसलें, उपकरण खोजें...",
    crop_rec_title: "फसल सुझाव",
    crop_rec_desc: "आपकी मिट्टी, जलवायु और मौसम के आधार पर",
    price_trend: "फसल मूल्य प्रवृत्ति (₹/क्विंटल)",
    recent_alerts: "हाल के अलर्ट",
    water_mgmt: "जल प्रबंधन",
    fert_plan: "खाद कार्यक्रम",
    stat_active_crops: "सक्रिय फसलें",
    stat_water: "जल उपयोग",
    stat_revenue: "अनु. राजस्व",
    stat_alerts: "सक्रिय अलर्ट"
  },
  mr: {
    hero_badge: "AI-संचालित कृषी प्लॅटफॉर्म",
    hero_title: "स्मार्ट शेती सोपी केली",
    hero_desc: "भारतीय शेतकऱ्यांना AI-चालित पीक शिफारशी, रिअल-टाइम हवामान, वनस्पती रोग ओळख, लाइव्ह बाजारभाव आणि थेट बाजारपेठ — सर्व एकाच प्लॅटफॉर्मवर.",
    get_started: "मोफत सुरू करा",
    explore_features: "वैशिष्ट्ये पहा",
    stat_farmers: "सक्रिय शेतकरी",
    stat_crops: "समर्थित पिके",
    stat_accuracy: "रोग ओळख अचूकता",
    stat_traded: "बाजार मूल्य",
    features_badge: "प्लॅटफॉर्म वैशिष्ट्ये",
    features_title: "शेतकऱ्याच्या प्रत्येक गरजा, एकाच ठिकाणी",
    features_desc: "AI रोग ओळखीपासून लाइव्ह बाजारभावापर्यंत — AgriComplete Hub तुमचा शेती सोबती आहे.",
    f1_title: "पीक शिफारस",
    f1_desc: "AI वापरून तुमच्या मातीचा प्रकार, ठिकाण आणि हंगामानुसार सर्वोत्तम पिकांच्या शिफारशी मिळवा.",
    f2_title: "हवामान माहिती",
    f2_desc: "रिअल-टाइम हवामान अंदाज, वादळ इशारे आणि हंगामी भाकीत.",
    f3_title: "रोग ओळख",
    f3_desc: "पानाचा फोटो अपलोड करा आणि AI तत्काळ रोग आणि उपचार सांगेल.",
    f4_title: "लाइव्ह बाजारभाव",
    f4_desc: "भारतभरातील मंडयांचे रिअल-टाइम भाव ट्रॅक करा.",
    f5_title: "शेतकरी बाजार",
    f5_desc: "थेट खरेदीदारांना विका. दलालांना टाळा.",
    f6_title: "AI शेती सहाय्यक",
    f6_desc: "तुमच्या भाषेत शेती सल्ला आणि मार्गदर्शनासाठी AI बॉटशी चॅट करा.",
    hiw_badge: "कसे काम करते",
    hiw_title: "3 सोप्या पायरीतून स्मार्ट शेती शुरू करा",
    hiw_desc: "शुरू करणे बीज बोवण्या इतके सोपे आहे.",
    step1_title: "आपली प्रोफाइल तयार करा",
    step1_desc: "आपल्या शेताचा तपशील द्या — स्थान, मातीचा प्रकार आणि पिके.",
    step2_title: "स्मार्ट अंतर्दृष्टी मिळवा",
    step2_desc: "AI-चालित पीक शिफारशी, हवामान अलर्ट आणि रोग विश्लेषण मिळवा.",
    step3_title: "उगवा आणि विका",
    step3_desc: "आपली उपज वाढवा आणि सर्वोत्तम किमतीत सरासरी खरेदीदारांना विका.",
    test_badge: "शेतकरी कहाणी",
    test_title: "भारत भरातील शेतकऱ्यांचा विश्वास",
    cta_title: "आपली शेती बदलण्यास तयार?",
    cta_desc: "हजारो भारतीय शेतकऱ्यांसोबत सामील व्हा जे आधीच AgriComplete Hub वापरत आहेत.",
    cta_btn1: "मुक्त खाते तयार करा",
    cta_btn2: "डेमो डॅशबोर्ड पहा",
    footer_desc: "भारतीय शेतकऱ्यांना AI अंतर्दृष्टी, हवामान आणि बाजार पहुंच प्रदान करणे. कृषीच्या भविष्यासाठी बनविले गेले.",
    chat_title: "कृषी AI सहाय्यक",
    chat_subtitle: "शेतीबद्दल काहीही विचारा",
    chat_welcome: "नमस्कार! 🙏 मी तुमचा कृषी AI सहाय्यक आहे. पीक शिफारशी, रोग ओळख, हवामान आणि बाजारभाव यात मदत करू शकतो.",
    chat_placeholder: "तुमचा प्रश्न टाइप करा...",
    nav_dashboard: "डॅशबोर्ड",
    nav_disease: "रोग ओळख",
    nav_market: "बाजारभाव",
    nav_marketplace: "बाजारपेठ",
    nav_crop_rec: "पीक शिफारस",
    nav_water: "जल व्यवस्थापन",
    nav_fertilizer: "खत नियोजक",
    nav_resources: "संसाधन व्यवस्थापन",
    nav_profile: "माझी प्रोफाइल",
    nav_settings: "सेटिंग्ज",
    nav_logout: "लॉगआउट",
    dash_welcome: "पुन्हा स्वागत, राजेश! 👋",
    login_title: "पुन्हा स्वागत! 👋",
    login_subtitle: "तुमच्या शेत डॅशबोर्डमध्ये साइन इन करा",
    register_title: "खाते तयार करा 🌱",
    register_subtitle: "आजच तुमचा स्मार्ट शेती प्रवास सुरू करा",
    search_placeholder: "पिके, साधने शोधा...",
    crop_rec_title: "पीक सूचना",
    crop_rec_desc: "तुमच्या मातीवर, हवामानावर आणि हंगामावर आधारित",
    price_trend: "पीक किंमत कल (₹/क्विंटल)",
    recent_alerts: "अलीकडील सूचना",
    water_mgmt: "जल व्यवस्थापन",
    fert_plan: "खत वेळापत्रक",
    stat_active_crops: "सक्रिय पिके",
    stat_water: "जल वापर",
    stat_revenue: "अंदाजे उत्पन्न",
    stat_alerts: "सक्रिय सूचना"
  },
  pa: {
    hero_badge: "AI-ਸੰਚਾਲਿਤ ਖੇਤੀ ਪਲੇਟਫ਼ਾਰਮ",
    hero_title: "ਸਮਾਰਟ ਖੇਤੀ ਸੌਖੀ ਬਣਾਈ",
    hero_desc: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ AI-ਸੰਚਾਲਿਤ ਫ਼ਸਲ ਸੁਝਾਅ, ਮੌਸਮ, ਰੋਗ ਪਛਾਣ, ਮੰਡੀ ਭਾਅ ਅਤੇ ਸਿੱਧੀ ਮੰਡੀ।",
    get_started: "ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ",
    explore_features: "ਫ਼ੀਚਰ ਵੇਖੋ",
    stat_farmers: "ਸਕਿਰਿਆ ਕਿਸਾਨ",
    stat_crops: "ਸਮਰਥਿਤ ਖੇਤੀਪ",
    stat_accuracy: "ਰੋਗ ਪਛਾਣ ਸ਼ੁੱਧਤਾ",
    stat_traded: "ਮਾਰਕੀਟ ਮੁੱਲ",
    features_badge: "ਪਲੇਟਫ਼ਾਰਮ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    features_title: "ਕਿਸਾਨ ਦੀ ਹਰ ਜਰੂਰਤ, ਇੱਕ ਜਗਾ",
    features_desc: "AI ਰੋਗ ਪਛਾਣ ਤੋਂ ਲੈ ਕੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਤੱਕ",
    f1_title: "ਫ਼ਸਲ ਸੁਝਾਅ",
    f1_desc: "AI ਨਾਲ ਆਪਣੀ ਮਿੱਟੀ, ਸਥਿਤੀ ਅਤੇ ਮੌਸਮ ਦੇ ਅਧਾਰ ਤੇ ਸਰਬੋਤਮ ਫ਼ਸਲਾਂ ਦੇ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।",
    f2_title: "ਮੌਸਮ ਜਾਣਕਾਰੀ",
    f2_desc: "ਰਿਅਲ-ਟਾਈਮ ਮੌਸਮ ਪੂਰਵਾਨੁਮਾਨ, ਤੁਫਾਨ ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਮੌਸਮੀ ਭਵਿਸ਼ਵਾਣੀਆਂ।",
    f3_title: "ਰੋਗ ਪਛਾਣ",
    f3_desc: "ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਅਪਲੋਡ ਕਰੋ ਅਤੇ AI ਤੁਰੰਤ ਰੋਗ ਅਤੇ ਇਲਾਜ ਦੱਸੇਗਾ।",
    f4_title: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
    f4_desc: "ਭਾਰਤ ਭਰ ਦੀਆਂ ਮੰਡੀਆਂ ਤੋਂ ਰਿਅਲ-ਟਾਈਮ ਭਾਅ ਟ੍ਰੈਕ ਕਰੋ।",
    f5_title: "ਕਿਸਾਨ ਬਾਜ਼ਾਰ",
    f5_desc: "ਸਿੱਧੇ ਖਰੀਦਾਰਾਂ ਕੋਲ ਵੇਚੋ। ਵਿਚੌਲਿਆਂ ਨੂੰ ਛੱਡੋ।",
    f6_title: "AI ਖੇਤੀ ਸਹਾਇਕ",
    f6_desc: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਖੇਤੀ ਸਲਾਹ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ ਲਈ AI ਬੋਟ ਨਾਲ ਚੈਟ ਕਰੋ।",
    hiw_badge: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    hiw_title: "3 ਸਧਾਰਨ ਕਦਮਾਂ ਵਿੱਚ ਸਮਾਰਟ ਖੇਤੀ ਸ਼ੁਰੂ ਕਰੋ",
    hiw_desc: "ਸ਼ੁਰੂ ਕਰਨਾ ਬਿਆਜ ਬੀਜਣੇ ਜਿੰਨਾ ਆਸਾਨ ਹੈ।",
    step1_title: "ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ",
    step1_desc: "ਆਪਣੇ ਖੇਤ ਦਾ ਵੇਰਵਾ ਦਿਓ — ਸਥਿਤੀ, ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਤੇ ਫ਼ਸਲਾਂ।",
    step2_title: "ਸਮਾਰਟ ਸੂਝ ਪ੍ਰਾਪਤ ਕਰੋ",
    step2_desc: "AI-ਪ੍ਰੇਰਿਤ ਫ਼ਸਲਾਂ ਦੇ ਸੁਝਾਅ, ਮੌਸਮ ਤਨਬੀਹੀਆਂ ਅਤੇ ਰੋਗ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ।",
    step3_title: "ਉਗਾਓ ਅਤੇ ਵੇਚੋ",
    step3_desc: "ਆਪਣੀ ਪਦਾਵਲੀ ਵਧਾਓ ਅਤੇ ਸਰਬੋਤਮ ਕੀਮਤਾਂ ਤੇ ਸਿੱਧੇ ਖਰੀਦਾਰਾਂ ਕੋਲ ਵੇਚੋ।",
    test_badge: "ਕਿਸਾਨ ਕਹਾਣੀਆਂ",
    test_title: "ਭਾਰਤ ਭਰ ਦੇ ਕਿਸਾਨਾਂ ਦਾ ਵਿਸ਼ਵਾਸ",
    cta_title: "ਆਪਣੀ ਖੇਤੀ ਬਦਲਣ ਲਈ ਤਿਆਰ?",
    cta_desc: "ਹਜ਼ਾਰਾਂ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਦੇ ਨਾਲ ਜੁੜੋ ਜੋ ਪਹਿਲਾਂ ਤੋਂ AgriComplete Hub ਵਰਤ ਰਹੇ ਹਨ।",
    cta_btn1: "ਮੁਫ਼ਤ ਖਾਤਾ ਬਣਾਓ",
    cta_btn2: "ਡੇਮੋ ਡੈਸ਼ਬੋਰਡ ਵੇਖੋ",
    footer_desc: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ AI ਤੇ ਬਾਜ਼ਾਰ ਪਹੁੰਚ ਫ਼ਰਾਹਮ ਕਰਨਾ। ਖੇਤੀ ਦੇ ਭਵਿਸ਼ਯਤ ਲਈ ਬਣਾਇਆ ਗਿਆ।",
    chat_title: "ਕ੍ਰਿਸ਼ੀ AI ਸਹਾਇਕ",
    chat_welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 🙏 ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ AI ਸਹਾਇਕ ਹਾਂ।",
    chat_placeholder: "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
    nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
    nav_disease: "ਰੋਗ ਪਛਾਣ",
    nav_market: "ਮੰਡੀ ਭਾਅ",
    nav_marketplace: "ਬਾਜ਼ਾਰ",
    nav_resources: "ਸੰਸਾਧਨ ਬਿਬਾਦ",
    dash_welcome: "ਵਾਪਸ ਸੁਆਗਤ, ਰਾਜੇਸ਼! 👋"
  },
  ta: {
    hero_badge: "AI-இயக்கப்படும் விவசாய தளம்",
    hero_title: "ஸ்மார்ட் விவசாயம் எளிதாக",
    hero_desc: "இந்திய விவசாயிகளுக்கு AI-இயக்கப்படும் பயிர் பரிந்துரைகள், வானிலை, நோய் கண்டறிதல், சந்தை விலைகள்.",
    get_started: "இலவச தொடங்கு",
    explore_features: "அம்சங்களை பார்க்கவும்",
    stat_farmers: "செயல்படும் விவசாயிகள்",
    stat_crops: "ஆதரிக்கப்பட்ட பயிர்கள்",
    stat_accuracy: "நோய் கண்டறிதল் துல்லியம்",
    stat_traded: "சந்தை மதிப்பு",
    features_badge: "தளம் அம்சங்கள்",
    features_title: "விவசாயி எவர் தேவை, ஒரு இடத்தில்",
    features_desc: "AI நோய் கண்டறிதலிருந்து நேரடி சந்தை விலைகளுக்கு",
    f1_title: "பயிர் பரிந்துரை",
    f1_desc: "உங்கள் மண், இடம் மற்றும் பருவத்தின் அடிப்படையில் சிறந்த பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
    f2_title: "வானிலை குறிப்பு",
    f2_desc: "நேரடி வானிலை முன்னறிவிப்புகள், புயல் எச்சரிக்கைகள் மற்றும் பருவகாலக் கணிப்புகள்.",
    f3_title: "நோய் கண்டறிதல்",
    f3_desc: "இலை புகைப்படம் பதிவேற்றவும் மற்றும் AI உடனடியாக நோய் மற்றும் சிகிச்சை சொல்லும்.",
    f4_title: "நேரடி சந்தை விலைகள்",
    f4_desc: "இந்தியா முழுவதும் மாண்டிகளிலிருந்து நேரடி விலைகளைக் கண்காணிக்கவும்.",
    f5_title: "விவசாயி சந்தை",
    f5_desc: "நேரடி கொள்வனவுதாரர்களுக்கு விற்கவும்। இடைமனிதர்களை தவிர்க்கவும்.",
    f6_title: "AI விவசாய உதவி",
    f6_desc: "உங்கள் மொழியில் விவசாய ஆலோசனை மற்றும் வழிகாட்டலுக்கு AI பாட்டுடன் சேட் செய்யவும்.",
    hiw_badge: "இது எப்படி வேலை செய்கிறது",
    hiw_title: "3 சுலபமான படிகளில் ஸ்மார்ட் விவசாயம் தொடங்கவும்",
    hiw_desc: "தொடங்குவது விதை விதைப்பது போல் சுலபம்.",
    step1_title: "உங்கள் சுயவிவரம் உருவாக்கவும்",
    step1_desc: "உங்கள் பண்ணையின் விவரங்களை வழங்கவும் — இடம், மண்ணின் வகை மற்றும் பயிர்கள்.",
    step2_title: "ஸ்மார்ட் நுண்ணறிவுகள் பெறவும்",
    step2_desc: "AI-இயக்கப்படும் பயிர் பரிந்துரைகள், வானிலை எச்சரிக்கைகள் மற்றும் நோய் பகுப்பாய்வு பெறுங்கள்.",
    step3_title: "வளர்க்க மற்றும் விற்க",
    step3_desc: "உங்கள் விளைச்சலை அதிகரிக்கவும் மற்றும் சிறந்த விலைகளில் நேரடி கொள்வனவுதாரர்களுக்கு விற்கவும்.",
    test_badge: "விவசாயி கதைகள்",
    test_title: "இந்தியா முழுவதும் விவசாயிகளின் நம்பிக்கை",
    cta_title: "உங்கள் விவசாயத்தை மாற்றத் தயாரா?",
    cta_desc: "ஆயிரக்கணக்கான இந்திய விவசாயிகளுடன் சேரவும், அவர்கள் ஏற்கனவே AgriComplete Hub ஐ பயன்படுத்தி வருகிறார்கள்.",
    cta_btn1: "இலவச கணக்கு உருவாக்கவும்",
    cta_btn2: "டெமோ டாஷ்போர்டு பார்க்கவும்",
    footer_desc: "இந்திய விவசாயிகளுக்கு AI அடிப்படையிலான நுண்ணறிவு, வானிலை மற்றும் சந்தை அணுகலை வழங்குதல். விவசாயத்தின் எதிர்காலத்திற்கு கட்டப்பட்டது.",
    chat_title: "கிருஷி AI உதவியாளர்",
    chat_welcome: "வணக்கம்! 🙏 நான் உங்கள் விவசாய AI உதவியாளர்.",
    chat_placeholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்...",
    nav_dashboard: "டாஷ்போர்ட்",
    nav_disease: "நோய் கண்டறிதல்",
    nav_market: "சந்தை விலைகள்",
    nav_resources: "ஆதார மேலாண்மை",
    dash_welcome: "மீண்டும் வரவேற்கிறேன், ராஜேஷ்! 👋"
  },
  te: {
    hero_badge: "AI-ఆధారిత వ్యవసాయ వేదిక",
    hero_title: "స్మార్ట్ వ్యవసాయం సులభంగా",
    hero_desc: "భారతీయ రైతులకు AI-ఆధారిత పంట సూచనలు, వాతావరణం, వ్యాధి గుర్తింపు, మార్కెట్ ధరలు.",
    get_started: "ఉచితంగా ప్రారంభించండి",
    explore_features: "లక్షణాలను అన్వేషించండి",
    stat_farmers: "చేతన రైతులు",
    stat_crops: "సమర్థించిన పంటలు",
    stat_accuracy: "వ్యాధి గుర్తింపు ఖచ్చితత్వం",
    stat_traded: "మార్కెట్ విలువ",
    features_badge: "వేదిక లక్షణాలు",
    features_title: "రైతు యొక్క ప్రతి అవసరం, ఒక చోట",
    features_desc: "AI వ్యాధి గుర్తింపు నుండి లైవ్ మార్కెట్ ధరల వరకు",
    f1_title: "పంట సిఫారసు",
    f1_desc: "మీ మట్టి, ప్రదేశం మరియు season季节 ఆధారంగా సరైన పంట సిఫారసులను పొందండి.",
    f2_title: "వాతావరణ సమాచారం",
    f2_desc: "రియల్-టైమ్ వాతావరణ సూచనలు, తుఫాను హెచ్చరికలు మరియు seasonal సూచనలు.",
    f3_title: "వ్యాధి గుర్తింపు",
    f3_desc: "ఆకు ఫోటోను అప్‌లోడ్ చేసి AI తక్షణమే వ్యాధి మరియు చికిత్సను చెబుతుంది.",
    f4_title: "లైవ్ మార్కెట్ ధరలు",
    f4_desc: "భారతం అంతటా మండిల నుండి రియల్-టైమ్ ధరలను ట్రాక్ చేయండి.",
    f5_title: "రైతు మార్కెట్‌ప్లేస్",
    f5_desc: "ఖరీదుదారులకు నేరుగా విక్రయించండి. మధ్యస్థులను నివారించండి.",
    f6_title: "AI వ్యవసాయ సహాయకుడు",
    f6_desc: "మీ భాషలో కృషి సలహా మరియు మార్గదర్శన కోసం AI బాట్‌తో చాట్ చేయండి.",
    hiw_badge: "ఇది ఎలా పనిచేస్తుంది",
    hiw_title: "3 సులభమైన దశల్లో స్మార్ట్ వ్యవసాయం ప్రారంభించండి",
    hiw_desc: "ప్రారంభించడం విత్తనాన్ని నాటడం లాంటిది సులభం.",
    step1_title: "మీ ప్రొఫైల్ సృష్టించండి",
    step1_desc: "మీ గుర్రం వివరాలను ఇవ్వండి — స్థానం, నేల రకం మరియు పంటలు.",
    step2_title: "స్మార్ట్ అంతర్దృష్టిని పొందండి",
    step2_desc: "AI-శక్తితో ఉండిన పంట సిఫారసులు, వాతావరణ హెచ్చరికలు మరియు వ్యాధి విశ్లేషణ పొందండి.",
    step3_title: "పెరగండి మరియు విక్రయించండి",
    step3_desc: "మీ పంట దిగుబడిని పెంచుకోండి మరియు ఉత్తమ ధరలకు ఖరీదుదారులకు నేరుగా విక్రయించండి.",
    test_badge: "రైతు కథలు",
    test_title: "భారతం అంతటా రైతుల నమ్మకం",
    cta_title: "మీ వ్యవసాయాన్ని రూపాంతరం చేయడానికి సిద్ధమైనారా?",
    cta_desc: "AgriComplete Hub ఉపయోగిస్తున్న వేల మంది భారతీయ రైతుల కూడా చేరండి.",
    cta_btn1: "ఉచిత ఖాతాను సృష్టించండి",
    cta_btn2: "డెమో డాష్‌బోర్డ్‌ను చూడండి",
    footer_desc: "భారతీయ రైతులకు AI-ఆధారిత అంతర్దృష్టి, వాతావరణం మరియు మార్కెట్ ప్రాప్యతను శక్తివంతం చేయడం. వ్యవసాయం యొక్క భవిష్యత్తం కోసం నిర్మితం.",
    chat_title: "కృషి AI సహాయకుడు",
    chat_welcome: "నమస్తే! 🙏 నేను మీ వ్యవసాయ AI సహాయకుడిని.",
    chat_placeholder: "మీ ప్రశ్న టైప్ చేయండి...",
    nav_dashboard: "డాష్‌బోర్డ్",
    nav_disease: "వ్యాధి గుర్తింపు",
    nav_market: "మార్కెట్ ధరలు",
    nav_resources: "వనరుల నిర్వహణ",
    dash_welcome: "తిరిగి స్వాగతం, రాజేష్! 👋"
  }
};

let currentLang = localStorage.getItem('agri_lang') || 'en';

// Additional labels for pages that still use static text without data-i18n attributes.
const supplementalTranslations = {
  en: {
    smart_farming_platform: "Smart Farming Platform",
    menu_main: "Main Menu",
    menu_tools: "Tools",
    menu_account: "Account",
    nav_live: "Live",
    login_tab: "Login",
    register_tab: "Register",
    disease_page_title: "Plant Disease Detection",
    disease_page_subtitle: "Upload a leaf image for AI-powered diagnosis",
    market_page_title: "Live Market Prices",
    market_page_subtitle: "Real-time mandi rates from across India",
    marketplace_page_title: "Farmer Marketplace",
    marketplace_page_subtitle: "Buy & sell directly - no middlemen",
    list_crop_btn: "List Your Crop",
    resource_page_title: "Resource Management Guide",
    resource_page_subtitle: "Optimize water, fertilizer, and pesticide usage",
    profile_page_title: "My Profile",
    profile_page_subtitle: "Manage your account and farm details"
  },
  hi: {
    smart_farming_platform: "स्मार्ट खेती प्लेटफॉर्म",
    menu_main: "मुख्य मेन्यू",
    menu_tools: "टूल्स",
    menu_account: "खाता",
    nav_live: "लाइव",
    login_tab: "लॉगिन",
    register_tab: "रजिस्टर",
    disease_page_title: "पौधा रोग पहचान",
    disease_page_subtitle: "AI आधारित पहचान के लिए पत्ते की फोटो अपलोड करें",
    market_page_title: "लाइव मंडी भाव",
    market_page_subtitle: "भारत भर की मंडियों से रियल-टाइम दरें",
    marketplace_page_title: "किसान बाज़ार",
    marketplace_page_subtitle: "सीधे खरीदें और बेचें - बिना बिचौलियों के",
    list_crop_btn: "अपनी फसल सूचीबद्ध करें",
    resource_page_title: "संसाधन प्रबंधन गाइड",
    resource_page_subtitle: "पानी, खाद और कीटनाशक का बेहतर उपयोग करें",
    profile_page_title: "मेरी प्रोफ़ाइल",
    profile_page_subtitle: "अपना खाता और खेत विवरण प्रबंधित करें"
  },
  mr: {
    smart_farming_platform: "स्मार्ट शेती प्लॅटफॉर्म",
    menu_main: "मुख्य मेन्यू",
    menu_tools: "साधने",
    menu_account: "खाते",
    nav_live: "लाईव्ह",
    login_tab: "लॉगिन",
    register_tab: "नोंदणी",
    disease_page_title: "वनस्पती रोग ओळख",
    disease_page_subtitle: "AI निदानासाठी पानाचा फोटो अपलोड करा",
    market_page_title: "लाईव्ह बाजारभाव",
    market_page_subtitle: "भारतभरातील मंड्यांमधील रिअल-टाइम दर",
    marketplace_page_title: "शेतकरी बाजारपेठ",
    marketplace_page_subtitle: "थेट खरेदी-विक्री - मध्यस्थांशिवाय",
    list_crop_btn: "तुमचे पीक सूचीबद्ध करा",
    resource_page_title: "संसाधन व्यवस्थापन मार्गदर्शक",
    resource_page_subtitle: "पाणी, खत आणि कीटकनाशकाचा प्रभावी वापर करा",
    profile_page_title: "माझी प्रोफाइल",
    profile_page_subtitle: "तुमचे खाते आणि शेत तपशील व्यवस्थापित करा"
  }
};

function translateLabel(key) {
  const primary = translations[currentLang] || translations.en;
  const supplemental = supplementalTranslations[currentLang] || supplementalTranslations.en;
  return primary[key]
    || supplemental[key]
    || translations.en[key]
    || supplementalTranslations.en[key]
    || '';
}

function setTextForSelector(selector, key, all = true) {
  const value = translateLabel(key);
  if (!value) return;
  const nodes = all ? document.querySelectorAll(selector) : [document.querySelector(selector)];
  nodes.forEach(node => {
    if (node) node.textContent = value;
  });
}

function setHeadingWithIcon(selector, iconClass, color, key) {
  const heading = document.querySelector(selector);
  const value = translateLabel(key);
  if (!heading || !value) return;
  heading.innerHTML = `<i class="${iconClass}" style="color:${color};margin-right:8px;"></i> ${value}`;
}

function setButtonWithIcon(selector, iconClass, key) {
  const button = document.querySelector(selector);
  const value = translateLabel(key);
  if (!button || !value) return;
  button.innerHTML = `<i class="${iconClass}"></i> ${value}`;
}

function applyStaticPageTranslations() {
  // Shared sidebar labels
  setTextForSelector('.sidebar-brand p', 'smart_farming_platform');

  const sectionTitles = document.querySelectorAll('.sidebar-nav .nav-section-title');
  if (sectionTitles[0]) sectionTitles[0].textContent = translateLabel('menu_main');
  if (sectionTitles[1]) sectionTitles[1].textContent = translateLabel('menu_tools');
  if (sectionTitles[2]) sectionTitles[2].textContent = translateLabel('menu_account');

  setTextForSelector('a[href="dashboard.html"] span', 'nav_dashboard');
  setTextForSelector('a[href="disease-detection.html"] span', 'nav_disease');
  setTextForSelector('a[href="market-prices.html"] span', 'nav_market');
  setTextForSelector('a[href="marketplace.html"] span', 'nav_marketplace');
  setTextForSelector('a[href="resource-management.html"] span', 'nav_resources');
  setTextForSelector('a[href="profile.html"] span', 'nav_profile');
  setTextForSelector('a[onclick*="handleLogout"] span', 'nav_logout');
  document.querySelectorAll('.sidebar-nav a .fa-cog').forEach(icon => {
    const label = icon.parentElement?.querySelector('span');
    if (label) label.textContent = translateLabel('nav_settings');
  });
  setTextForSelector('.nav-badge', 'nav_live');
  setTextForSelector('#loginTab', 'login_tab', false);
  setTextForSelector('#registerTab', 'register_tab', false);

  const fileName = (window.location.pathname.split('/').pop() || '').toLowerCase();

  if (fileName === 'disease-detection.html') {
    setHeadingWithIcon('.topbar-left h3', 'fas fa-leaf', 'var(--color-primary)', 'disease_page_title');
    setTextForSelector('.topbar-left p', 'disease_page_subtitle', false);
  }

  if (fileName === 'market-prices.html') {
    setHeadingWithIcon('.topbar-left h3', 'fas fa-chart-bar', 'var(--color-primary)', 'market_page_title');
    setTextForSelector('.topbar-left p', 'market_page_subtitle', false);
  }

  if (fileName === 'marketplace.html') {
    setHeadingWithIcon('.topbar-left h3', 'fas fa-store', 'var(--color-primary)', 'marketplace_page_title');
    setTextForSelector('.topbar-left p', 'marketplace_page_subtitle', false);
    setButtonWithIcon('.topbar-right .btn.btn-primary.btn-sm', 'fas fa-plus', 'list_crop_btn');
  }

  if (fileName === 'resource-management.html') {
    setHeadingWithIcon('.topbar-left h3', 'fas fa-recycle', 'var(--color-primary)', 'resource_page_title');
    setTextForSelector('.topbar-left p', 'resource_page_subtitle', false);
  }

  if (fileName === 'profile.html') {
    setHeadingWithIcon('.topbar-left h3', 'fas fa-user-circle', 'var(--color-primary)', 'profile_page_title');
    setTextForSelector('.topbar-left p', 'profile_page_subtitle', false);
  }
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('agri_lang', lang);
  applyTranslations();
  syncStoredUserUI();
  // Force update all selector values
  document.querySelectorAll('.lang-selector select').forEach(sel => {
    sel.value = lang;
  });
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translateLabel(key);
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = translateLabel(key);
    if (value) el.placeholder = value;
  });
  applyStaticPageTranslations();
  // Sync all language selectors
  document.querySelectorAll('.lang-selector select').forEach(sel => {
    sel.value = currentLang;
  });
}

function getStoredUser() {
  const raw = localStorage.getItem('agri_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored user:', err);
    return null;
  }
}

function syncStoredUserUI() {
  const user = getStoredUser();
  if (!user) return;
  updateProfileDisplay(user);
}


// ============ PROFILE ============
function setInputValue(id, value) {
  const el = document.getElementById(id);
  if (!el || value === undefined || value === null) return;
  el.value = String(value);
}

function ensureSelectOption(selectEl, value) {
  if (!selectEl || !value) return;
  const exists = Array.from(selectEl.options).some(opt => opt.value === value || opt.text === value);
  if (!exists) {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    selectEl.appendChild(option);
  }
}

function updateProfileDisplay(user) {
  if (!user) return;

  const firstName = user.first_name || user.firstName || '';
  const lastName = user.last_name || user.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim() || user.username || 'Farmer';
  const displayName = firstName || fullName;
  const welcomePrefixByLang = {
    en: 'Welcome back',
    hi: 'वापस स्वागत है',
    mr: 'पुन्हा स्वागत'
  };
  const welcomePrefix = welcomePrefixByLang[currentLang] || 'Welcome back';

  document.querySelectorAll('.profile-details h2').forEach(el => {
    el.textContent = fullName;
  });

  document.querySelectorAll('.sidebar-footer .user-info h4').forEach(el => {
    el.textContent = fullName;
  });

  const initials = (firstName?.[0] || user.username?.[0] || 'F').toUpperCase() +
    (lastName?.[0] || '').toUpperCase();
  const avatarText = initials || 'F';

  document.querySelectorAll('.profile-avatar, .sidebar-footer .user-avatar').forEach(el => {
    el.textContent = avatarText;
  });

  const dashWelcome = document.querySelector('[data-i18n="dash_welcome"]');
  if (dashWelcome) {
    dashWelcome.textContent = `${welcomePrefix}, ${displayName}! 👋`;
  }
}

function fillProfileForm(user) {
  if (!user) return;

  setInputValue('profileFirstName', user.first_name || user.firstName || '');
  setInputValue('profileLastName', user.last_name || user.lastName || '');
  setInputValue('profileEmail', user.email || '');
  setInputValue('profilePhone', user.phone || '');
  setInputValue('profileDistrict', user.district || '');
  setInputValue('profileVillage', user.village || '');

  const stateSelect = document.getElementById('profileState');
  if (stateSelect) {
    const stateValue = user.state || '';
    ensureSelectOption(stateSelect, stateValue);
    stateSelect.value = stateValue;
  }

  updateProfileDisplay(user);
}

async function loadProfileData() {
  if (!document.getElementById('profileFirstName')) return;

  const savedUserRaw = localStorage.getItem('agri_user');
  if (savedUserRaw) {
    try {
      const savedUser = JSON.parse(savedUserRaw);
      fillProfileForm(savedUser);
    } catch (err) {
      console.warn('Failed to parse saved user profile:', err);
    }
  }

  const token = localStorage.getItem('agri_token');
  if (!token) return;

  try {
    const data = await apiFetch('/user/profile');
    if (data?.user) {
      fillProfileForm(data.user);
      localStorage.setItem('agri_user', JSON.stringify(data.user));
    }
  } catch (err) {
    console.warn('Failed to load profile from API:', err);
  }
}

function saveProfile() {
  const token = localStorage.getItem('agri_token');

  if (!token) {
    alert('Please log in first to update your profile');
    window.location.href = 'auth.html';
    return;
  }

  const firstName = document.getElementById('profileFirstName')?.value;
  const lastName = document.getElementById('profileLastName')?.value;
  const email = document.getElementById('profileEmail')?.value;
  const phone = document.getElementById('profilePhone')?.value;
  const state = document.getElementById('profileState')?.value;
  const district = document.getElementById('profileDistrict')?.value;
  const village = document.getElementById('profileVillage')?.value;

  if (!firstName || !lastName || !email) {
    alert('Please fill in all required fields');
    return;
  }

  const profileData = {
    firstName,
    lastName,
    email,
    phone,
    state,
    district,
    village
  };

  apiFetch('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  })
  .then(data => {
    alert('Profile updated successfully!');
    if (data?.user) {
      fillProfileForm(data.user);
      localStorage.setItem('agri_user', JSON.stringify(data.user));
    }
  })
  .catch(err => {
    alert('Error updating profile: ' + (err.msg || err.message || 'Unknown error'));
  });
}

// ============ MARKETPLACE LISTINGS ============
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getListingEmoji(cropName) {
  const normalized = String(cropName || '').toLowerCase();
  if (normalized.includes('rice') || normalized.includes('wheat') || normalized.includes('maize')) return '??';
  if (normalized.includes('chickpea') || normalized.includes('pulse') || normalized.includes('dal')) return '??';
  if (normalized.includes('onion') || normalized.includes('potato') || normalized.includes('vegetable')) return '??';
  if (normalized.includes('chilli') || normalized.includes('pepper') || normalized.includes('spice')) return '???';
  if (normalized.includes('sunflower') || normalized.includes('groundnut') || normalized.includes('soy')) return '??';
  return '??';
}

function formatListingTime(createdAt) {
  const now = Date.now();
  const diffMs = now - new Date(createdAt).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (!Number.isFinite(mins) || mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function renderMarketplaceCount() {
  const productGrid = document.getElementById('productGrid');
  const countEl = document.getElementById('marketplaceCount');
  if (!productGrid || !countEl) return;

  const baseCount = Number(productGrid.getAttribute('data-base-count') || 0);
  const backendCount = productGrid.querySelectorAll('[data-backend-listing="true"]').length;
  countEl.textContent = `Showing ${baseCount + backendCount} listings`;
}

function createMarketplaceCardHtml(listing) {
  const cropName = escapeHtml(listing.crop_name || listing.cropName || 'Crop');
  const location = escapeHtml(listing.location || 'Unknown');
  const quantity = escapeHtml(listing.quantity || '0');
  const price = Number(listing.price);
  const safePrice = Number.isFinite(price) ? price.toLocaleString('en-IN') : escapeHtml(listing.price || '0');
  const seller = escapeHtml(listing.seller_name || listing.seller || 'Farmer');
  const emoji = getListingEmoji(cropName);
  const timeAgo = formatListingTime(listing.created_at || listing.createdAt || new Date().toISOString());

  return `
    <div class="product-card" data-backend-listing="true" data-listing-id="${escapeHtml(listing.id)}">
      <div class="product-img" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);">
        <span style="font-size:4rem;">${emoji}</span>
        <div class="product-tag" style="background:var(--color-primary);">New</div>
      </div>
      <div class="product-body">
        <h4>${cropName}</h4>
        <div class="product-meta">
          <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
          <span><i class="fas fa-weight-hanging"></i> ${quantity} qtl</span>
        </div>
        <div class="product-price">?${safePrice}/q</div>
        <p style="font-size:.78rem;margin-top:4px;">Listed by ${seller} - ${timeAgo}</p>
        <div class="product-actions">
          <a href="#" class="btn btn-primary btn-sm" style="flex:1;justify-content:center;"><i class="fas fa-phone"></i> Contact</a>
          <a href="#" class="btn btn-secondary btn-sm" style="flex:1;justify-content:center;"><i class="fas fa-comment"></i> Chat</a>
        </div>
      </div>
    </div>
  `;
}

async function renderMarketplaceListings() {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  productGrid.querySelectorAll('[data-backend-listing="true"]').forEach(node => node.remove());

  try {
    const listings = await apiFetch('/market/listings');
    const safeListings = Array.isArray(listings) ? listings : [];
    safeListings.forEach(listing => {
      productGrid.insertAdjacentHTML('afterbegin', createMarketplaceCardHtml(listing));
    });
  } catch (err) {
    console.warn('Failed to load marketplace listings from backend:', err);
  } finally {
    renderMarketplaceCount();
  }
}

function openListingModal() {
  const modal = document.getElementById('listingModal');
  if (modal) modal.style.display = 'flex';
}

function closeListingModal() {
  const modal = document.getElementById('listingModal');
  if (modal) modal.style.display = 'none';
}

async function seedMarketplaceFromLocalStorageIfNeeded() {
  const legacyKey = 'agri_marketplace_custom_listings';
  const legacyRaw = localStorage.getItem(legacyKey);
  const token = localStorage.getItem('agri_token');
  if (!legacyRaw || !token) return;

  try {
    const legacyListings = JSON.parse(legacyRaw);
    if (!Array.isArray(legacyListings) || !legacyListings.length) {
      localStorage.removeItem(legacyKey);
      return;
    }

    for (const item of legacyListings) {
      if (!item?.cropName || !item?.quantity || !item?.price || !item?.location) continue;
      try {
        await apiFetch('/market/listings', {
          method: 'POST',
          body: JSON.stringify({
            crop_name: item.cropName,
            quantity: item.quantity,
            price: Number(item.price),
            location: item.location
          })
        });
      } catch (err) {
        console.warn('Skipping legacy listing import item:', err);
      }
    }

    localStorage.removeItem(legacyKey);
  } catch (err) {
    console.warn('Failed to import legacy listings:', err);
  }
}

function initMarketplaceListingFlow() {
  const form = document.getElementById('listingForm');
  const modal = document.getElementById('listingModal');
  if (!form || !modal || !document.getElementById('productGrid')) return;

  seedMarketplaceFromLocalStorageIfNeeded().finally(() => {
    renderMarketplaceListings();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cropName = document.getElementById('listingCropName')?.value.trim();
    const quantity = document.getElementById('listingQuantity')?.value.trim();
    const price = document.getElementById('listingPrice')?.value.trim();
    const location = document.getElementById('listingLocation')?.value.trim();
    const token = localStorage.getItem('agri_token');

    if (!token) {
      alert('Please log in first to create a marketplace listing.');
      window.location.href = 'auth.html';
      return;
    }

    if (!cropName || !quantity || !price || !location) {
      alert('Please fill in all required listing fields.');
      return;
    }

    try {
      await apiFetch('/market/listings', {
        method: 'POST',
        body: JSON.stringify({
          crop_name: cropName,
          quantity,
          price: Number(price),
          location
        })
      });

      await renderMarketplaceListings();
      form.reset();
      closeListingModal();
      alert('Listing submitted successfully!');
    } catch (err) {
      alert('Failed to save listing in backend: ' + (err.msg || err.message || 'Unknown error'));
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeListingModal();
    }
  });
}
// ============ NOTIFICATIONS ============
const defaultNotifications = [
  { id: 'n1', title: 'Weather alert', message: 'Heavy rain expected in next 24 hours.', time: '2h ago' },
  { id: 'n2', title: 'Market update', message: 'Wheat price increased by 5.2% in Pune mandi.', time: '5h ago' },
  { id: 'n3', title: 'Irrigation reminder', message: 'Field B moisture is low. Check irrigation schedule.', time: '1d ago' }
];

function createNotificationMenu(notifications) {
  const menu = document.createElement('div');
  menu.className = 'notification-menu';
  menu.setAttribute('aria-hidden', 'true');

  const listHtml = notifications.length
    ? notifications.map(n => `
      <div class="notification-item">
        <h5>${n.title}</h5>
        <p>${n.message}</p>
        <span>${n.time}</span>
      </div>
    `).join('')
    : '<div class="notification-empty">No new notifications</div>';

  menu.innerHTML = `
    <div class="notification-header">
      <h4>Notifications</h4>
      <button type="button" class="mark-read-btn">Mark all read</button>
    </div>
    <div class="notification-list">${listHtml}</div>
  `;

  return menu;
}

function initNotifications() {
  const bellButtons = Array.from(document.querySelectorAll('.notification-btn'));
  if (!bellButtons.length) return;

  const savedRead = localStorage.getItem('agri_notifications_read') === 'true';
  const notifications = defaultNotifications;
  const menuByButton = new Map();

  bellButtons.forEach(button => {
    const container = button.parentElement;
    if (!container) return;

    const menu = createNotificationMenu(notifications);
    container.style.position = 'relative';
    container.appendChild(menu);
    menuByButton.set(button, menu);

    if (savedRead) {
      const dot = button.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';
    }

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.contains('open');

      menuByButton.forEach((otherMenu) => {
        otherMenu.classList.remove('open');
        otherMenu.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
      }
    });

    const markReadBtn = menu.querySelector('.mark-read-btn');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.setItem('agri_notifications_read', 'true');
        document.querySelectorAll('.notification-btn .notif-dot').forEach(dot => {
          dot.style.display = 'none';
        });
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
      });
    }
  });

  document.addEventListener('click', () => {
    menuByButton.forEach((menu) => {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

// ============ HELP MENU ============
function createHelpMenu() {
  const menu = document.createElement('div');
  menu.className = 'help-menu';
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML = `
    <h4>Quick Help</h4>
    <p>Need support? Choose an option below.</p>
    <div class="help-links">
      <button type="button" data-help-action="chat">Open AI Assistant</button>
      <a href="disease-detection.html">Disease Detection Guide</a>
      <a href="market-prices.html">View Live Mandi Prices</a>
    </div>
  `;
  return menu;
}

function initHelpMenu() {
  const helpButtons = Array.from(document.querySelectorAll('.btn-icon')).filter(btn =>
    btn.querySelector('.fa-question-circle')
  );
  if (!helpButtons.length) return;

  const menus = [];

  helpButtons.forEach(button => {
    const container = button.parentElement;
    if (!container) return;

    const menu = createHelpMenu();
    container.style.position = 'relative';
    container.appendChild(menu);
    menus.push(menu);

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.contains('open');
      menus.forEach(m => {
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
      });
      if (!isOpen) {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
      }
    });

    const chatBtn = menu.querySelector('[data-help-action="chat"]');
    if (chatBtn) {
      chatBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        if (typeof toggleChatbot === 'function' && document.getElementById('chatbotPanel')) {
          toggleChatbot();
        } else {
          alert('Chat assistant is available on the current page footer.');
        }
      });
    }
  });

  document.addEventListener('click', () => {
    menus.forEach(menu => {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

// Auto-set active sidebar item based on current URL
function setActiveSidebar() {
  const currentPath = window.location.pathname.split('/').pop();
  if (!currentPath) return;
  
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}


// ============ LANDING NAV SCROLL ============
window.addEventListener('scroll', () => {
  const nav = document.getElementById('landingNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
});


// ============ MOBILE MENU ============
function toggleMobileMenu() {
  const links = document.getElementById('navLinks');
  if (links) {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '60px';
    links.style.right = '16px';
    links.style.background = '#fff';
    links.style.padding = '16px';
    links.style.borderRadius = '12px';
    links.style.boxShadow = '0 8px 30px rgba(0,0,0,.15)';
  }
}


// ============ AUTH ============
function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  
  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

function normalizeApiUrl(url) {
  const cleanUrl = String(url || '').replace(/\/+$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
}

const API_URL = (() => {
  const configuredUrl =
    window.AGRICOMPLETE_API_URL ||
    document.querySelector('meta[name="api-url"]')?.content;
  if (configuredUrl) return normalizeApiUrl(configuredUrl);

  const localHosts = ['', 'localhost', '127.0.0.1'];
  if (localHosts.includes(window.location.hostname)) {
    return 'http://localhost:5000/api';
  }

  return 'https://agricomplete-backend.onrender.com/api';
})();

// API Helper
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('agri_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }
    return await res.json();
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const emailInput =
    e.target.querySelector('#loginEmail') ||
    e.target.querySelector('input[type="email"]') ||
    e.target.querySelector('input[type="text"]');
  const passwordInput =
    e.target.querySelector('#loginPassword') ||
    e.target.querySelector('input[type="password"]');

  if (!emailInput || !passwordInput) {
    alert('Login form is not configured correctly. Please refresh and try again.');
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('agri_token', data.access_token);
    localStorage.setItem('agri_user', JSON.stringify(data.user));
    window.location.href = 'dashboard.html';
  } catch (err) {
    alert(err.msg || 'Login failed');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;
  const state = e.target.querySelector('select')?.value || '';
  
  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, state })
    });
    alert('Registration successful! Please login.');
    location.reload();
  } catch (err) {
    alert(err.msg || 'Registration failed');
  }
}


// ============ WEATHER API ============
async function fetchJson(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.msg || data?.message || data?.error?.message || 'Weather fetch failed');
  }
  return data;
}

function getWeatherIconClass(text) {
  const condText = String(text || '').toLowerCase();
  if (condText.includes('clear') || condText.includes('sun')) return 'fas fa-sun';
  if (condText.includes('rain') || condText.includes('drizzle')) return 'fas fa-cloud-rain';
  if (condText.includes('cloud') || condText.includes('overcast')) return 'fas fa-cloud';
  if (condText.includes('thunder') || condText.includes('storm')) return 'fas fa-bolt';
  if (condText.includes('snow')) return 'fas fa-snowflake';
  if (condText.includes('fog') || condText.includes('mist') || condText.includes('haze')) return 'fas fa-smog';
  return 'fas fa-cloud-sun';
}

function getAqiLabel(aqiValue) {
  if (!aqiValue) return 'N/A';
  if (aqiValue === 1) return 'Good';
  if (aqiValue === 2) return 'Fair';
  if (aqiValue === 3) return 'Bad';
  return 'Dangerous';
}

function formatWeatherNumber(value, decimals, suffix) {
  if (value === null || value === undefined || value === '') return '--';
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return '--';
  return `${numberValue.toFixed(decimals)} ${suffix}`;
}

async function fetchWeather() {
  const cityInput = document.getElementById('weatherCityInput');
  const city = cityInput ? cityInput.value.trim() : 'Pune';
  if (!city) return;

  try {
    const backendData = await fetchJson(`${API_URL}/weather/current?city=${encodeURIComponent(city)}`);
    const weatherData = {
      provider: backendData.provider,
      location: backendData.location || city,
      temperature: backendData.temperature,
      condition: backendData.condition || 'Weather unavailable',
      humidity: backendData.humidity,
      wind_kph: backendData.wind_kph,
      visibility_km: backendData.visibility_km,
      pressure_mb: backendData.pressure_mb,
      aqiText: getAqiLabel(backendData.aqi),
      forecast: backendData.forecast || []
    };

    const conditionText = weatherData.condition;
    const tempC = Number(weatherData.temperature);

    const tempEl = document.getElementById('weatherTemp');
    const descEl = document.getElementById('weatherDesc');
    const locEl = document.getElementById('weatherLocation');
    const humEl = document.getElementById('wHumidity');
    const windEl = document.getElementById('wWind');
    const visEl = document.getElementById('wVisibility');
    const pressEl = document.getElementById('wPressure');
    const iconEl = document.getElementById('weatherIcon');

    if (tempEl) tempEl.textContent = `${Math.round(tempC)}\u00B0C`;
    if (descEl) descEl.textContent = conditionText.replace(/\b\w/g, c => c.toUpperCase());
    if (locEl) locEl.textContent = weatherData.location;
    if (humEl) humEl.textContent = `${weatherData.humidity ?? '--'}%`;
    if (windEl) windEl.textContent = formatWeatherNumber(weatherData.wind_kph, 1, 'km/h');
    if (visEl) visEl.textContent = formatWeatherNumber(weatherData.visibility_km, 1, 'km');
    if (pressEl) pressEl.textContent = `${weatherData.pressure_mb ?? '--'} mb`;
    if (iconEl) iconEl.innerHTML = `<i class="${getWeatherIconClass(conditionText)}"></i>`;

    const aqiEl = document.getElementById('wAQI');
    if (aqiEl) aqiEl.textContent = weatherData.aqiText || 'N/A';

    const adviceEl = document.getElementById('irrigationAdvice');
    const adviceHintEl = document.getElementById('irrigationWeatherHint');
    const condText = conditionText.toLowerCase();
    if (adviceEl && adviceHintEl) {
      if (condText.includes('rain') || condText.includes('drizzle')) {
        adviceHintEl.textContent = 'High Humidity / Rain';
        adviceHintEl.className = 'badge badge-info';
        adviceEl.textContent = 'Rain is detected or expected. Postpone irrigation to save resources and prevent over-saturation.';
      } else if (tempC > 32) {
        adviceHintEl.textContent = 'High Heat Alert';
        adviceHintEl.className = 'badge badge-danger';
        adviceEl.textContent = 'High evaporation risk. Water heavily in early morning and check soil moisture for heat stress.';
      } else {
        adviceHintEl.textContent = 'Optimal Conditions';
        adviceHintEl.className = 'badge';
        adviceEl.textContent = 'Standard irrigation cycles recommended. Monitor soil moisture for specific crop needs.';
      }
    }

    const forecastEl = document.getElementById('weatherForecast');
    if (forecastEl && weatherData.forecast.length) {
      forecastEl.innerHTML = weatherData.forecast.map((item, i) => {
        const date = item.date || new Date().toISOString();
        const dayName = i === 0 ? 'Today' : new Date(date).toLocaleDateString('en-IN', { weekday: 'short' });
        return `
          <div class="forecast-day">
            <div class="day">${dayName}</div>
            <i class="${getWeatherIconClass(item.condition)}"></i>
            <div class="temp">${Math.round(item.temp)}\u00B0C</div>
          </div>
        `;
      }).join('');
    }
  } catch (err) {
    console.error('Weather error:', err);
    const tempEl = document.getElementById('weatherTemp');
    const descEl = document.getElementById('weatherDesc');
    const humEl = document.getElementById('wHumidity');
    const windEl = document.getElementById('wWind');
    const visEl = document.getElementById('wVisibility');
    const pressEl = document.getElementById('wPressure');
    const aqiEl = document.getElementById('wAQI');
    const forecastEl = document.getElementById('weatherForecast');
    if (tempEl) tempEl.textContent = 'N/A';
    if (descEl) descEl.textContent = err.message || 'Weather data unavailable';
    if (humEl) humEl.textContent = '--';
    if (windEl) windEl.textContent = '--';
    if (visEl) visEl.textContent = '--';
    if (pressEl) pressEl.textContent = '--';
    if (aqiEl) aqiEl.textContent = '--';
    if (forecastEl) forecastEl.innerHTML = '';
  }
}

// ============ DISEASE DETECTION ============
function previewLeafImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById('uploadPreview');
    const zone = document.getElementById('uploadZone');
    const img = document.getElementById('leafPreviewImg');
    
    if (img) img.src = e.target.result;
    if (zone) zone.style.display = 'none';
    if (preview) { preview.style.display = 'flex'; preview.classList.add('show'); }
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  const preview = document.getElementById('uploadPreview');
  const zone = document.getElementById('uploadZone');
  const input = document.getElementById('leafInput');
  
  if (preview) { preview.style.display = 'none'; preview.classList.remove('show'); }
  if (zone) zone.style.display = '';
  if (input) input.value = '';
  
  const result = document.getElementById('diagnosisResult');
  const placeholder = document.getElementById('diagnosisPlaceholder');
  if (result) result.style.display = 'none';
  if (placeholder) placeholder.style.display = 'block';
}

function renderDiseaseResult(disease) {
  const result = document.getElementById('diagnosisResult');
  const placeholder = document.getElementById('diagnosisPlaceholder');
  const info = document.getElementById('diseaseInfo');
  const badge = document.getElementById('resultBadge');

  if (placeholder) placeholder.style.display = 'none';
  if (result) result.style.display = 'block';
  if (badge) {
    badge.className = `badge ${disease.badgeClass || 'badge-info'}`;
    badge.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${disease.severity} Severity`;
  }
  
  if (info) {
    info.innerHTML = `
      <h3 style="margin-bottom:var(--space-sm);color:var(--text-primary);">${disease.name}</h3>
      <div style="margin-bottom:var(--space-md);">
        <div style="display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:4px;">
          <span>Confidence Score</span>
          <strong style="color:var(--color-primary);">${disease.confidence}%</strong>
        </div>
        <div class="confidence-bar">
          <div class="confidence-fill" style="width:${disease.confidence}%;"></div>
        </div>
      </div>
      <p style="font-size:.88rem;margin-bottom:var(--space-md);">${disease.description}</p>
      
      <h4 style="font-size:.9rem;margin-bottom:var(--space-sm);"><i class="fas fa-exclamation-circle" style="color:#C62828;margin-right:6px;"></i>Symptoms</h4>
      <ul style="font-size:.85rem;color:var(--text-secondary);margin-bottom:var(--space-md);padding-left:16px;">
        ${disease.symptoms.map(s => `<li style="margin-bottom:4px;list-style:disc;">${s}</li>`).join('')}
      </ul>
      
      <h4 style="font-size:.9rem;margin-bottom:var(--space-sm);"><i class="fas fa-prescription-bottle-alt" style="color:var(--color-primary);margin-right:6px;"></i>Treatment</h4>
      <ul style="font-size:.85rem;color:var(--text-secondary);margin-bottom:var(--space-md);padding-left:16px;">
        ${disease.treatment.map(t => `<li style="margin-bottom:4px;list-style:disc;">${t}</li>`).join('')}
      </ul>
      
      <h4 style="font-size:.9rem;margin-bottom:var(--space-sm);"><i class="fas fa-shield-alt" style="color:var(--color-accent);margin-right:6px;"></i>Prevention</h4>
      <ul style="font-size:.85rem;color:var(--text-secondary);padding-left:16px;">
        ${disease.prevention.map(p => `<li style="margin-bottom:4px;list-style:disc;">${p}</li>`).join('')}
      </ul>
    `;
  }
}

async function analyzeDisease() {
  const input = document.getElementById('leafInput');
  const result = document.getElementById('diagnosisResult');
  const placeholder = document.getElementById('diagnosisPlaceholder');
  const info = document.getElementById('diseaseInfo');
  const badge = document.getElementById('resultBadge');

  if (!input?.files?.length) {
    alert('Please upload a leaf image first.');
    return;
  }

  if (placeholder) placeholder.style.display = 'none';
  if (result) result.style.display = 'block';
  if (badge) {
    badge.className = 'badge badge-info';
    badge.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking model';
  }
  if (info) {
    info.innerHTML = '<p style="font-size:.9rem;">Uploading image to disease prediction API...</p>';
  }

  const formData = new FormData();
  formData.append('image', input.files[0]);

  try {
    const res = await fetch(`${API_URL}/disease/predict`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || 'Disease prediction failed');
    }

    renderDiseaseResult({
      name: data.name || data.disease || 'Detected Disease',
      confidence: data.confidence || 0,
      severity: data.severity || 'Unknown',
      badgeClass: data.badgeClass || 'badge-info',
      description: data.description || 'The model returned a prediction without detailed notes.',
      symptoms: data.symptoms || [],
      treatment: data.treatment || [],
      prevention: data.prevention || []
    });
  } catch (err) {
    if (badge) {
      badge.className = 'badge badge-warning';
      badge.innerHTML = '<i class="fas fa-info-circle"></i> Model Not Ready';
    }
    if (info) {
      info.innerHTML = `
        <h3 style="margin-bottom:var(--space-sm);color:var(--text-primary);">Disease model is not deployed yet</h3>
        <p style="font-size:.9rem;margin-bottom:var(--space-md);">
          ${escapeHtml(err.message || 'Train and deploy the crop disease model before using real predictions.')}
        </p>
        <p style="font-size:.85rem;color:var(--text-secondary);">
          After training, connect the exported model inside the backend <code>/api/disease/predict</code> route.
        </p>
      `;
    }
  }
}

// Drag and drop
document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('uploadZone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const input = document.getElementById('leafInput');
        input.files = files;
        previewLeafImage({ target: input });
      }
    });
  }

  // Apply saved language and sidebar state
  applyTranslations();
  syncStoredUserUI();
  setActiveSidebar();
  loadProfileData();
  initMarketplaceListingFlow();
  initNotifications();
  initHelpMenu();

  document.querySelectorAll('.chart-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.chart-filter').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Intersection observer for fade-in
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});


// ============ CHATBOT ============


// ============ CHATBOT ============
function toggleChatbot() {
  const panel = document.getElementById('chatbotPanel');
  const fab = document.getElementById('chatbotFab');
  if (panel) {
    panel.classList.toggle('open');
    if (fab) {
      fab.innerHTML = panel.classList.contains('open')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-comment-dots"></i>';
    }
  }
}

const chatResponses = {
  // English
  'crop recommendation': "Based on your location (Pune, Maharashtra) and season, I recommend: 🌾 Wheat, 🌿 Chickpea, 🥔 Potato, or 🌻 Mustard. Wheat has the highest suitability score (95%) for your black cotton soil.",
  'disease': "I can help with disease detection! Upload a clear photo of the affected leaf on our Disease Detection page, and our AI will identify the disease with treatment recommendations. Common diseases include Late Blight, Powdery Mildew, and Leaf Rust.",
  'weather': "Current weather in Pune: Check the weather widget on your dashboard for live data. You can change the city anytime. Heavy rain is expected in the next 48 hours — consider securing harvested crops.",
  'market price': "Current prices at Pune APMC: 🌾 Wheat ₹2,450/q (↑5.2%), 🌾 Rice ₹3,800/q (↑2.1%), 🫘 Soybean ₹4,200/q (↑12.5%). Visit the Market Prices page for detailed information.",
  'marketplace': "You can list your crops on the Marketplace page. Click 'List Your Crop' to create a listing with crop name, quantity, price, and location. Buyers can contact you directly!",
  'fertilizer': "Based on your crops, here's your fertilizer schedule: Wheat — Urea 50 kg/acre (due tomorrow), Chickpea — DAP 30 kg/acre (in 5 days), Potato — MOP 25 kg/acre (in 10 days).",
  'water': "Field B (Chickpea) needs irrigation within 24 hours! Soil moisture is at 42%. Field A (Wheat) is optimal at 78%. Schedule irrigation accordingly.",
  'hello': "Namaste! 🙏 Welcome to AgriComplete Hub. How can I assist you today? You can ask about crop recommendations, weather, disease detection, market prices, or fertilizer planning.",
  'namaste': "Namaste! 🙏 Welcome to AgriComplete Hub. How can I assist you today?",
  'help': "I can help you with:\n🌾 Crop recommendations\n🌧️ Weather forecasts\n🍃 Disease detection\n📊 Market prices\n🏪 Marketplace\n💧 Water management\n🧪 Fertilizer planning\n\nJust type your question!",
  // Hindi
  'फसल': "आपके स्थान (पुणे, महाराष्ट्र) और मौसम के आधार पर, मैं सुझाव देता हूँ: 🌾 गेहूँ (95%), 🌿 चना (88%), 🥔 आलू (82%), 🌻 सरसों (76%)।",
  'मौसम': "पुणे का मौसम: डैशबोर्ड पर लाइव मौसम विजेट देखें। अगले 48 घंटों में भारी बारिश की संभावना है।",
  'भाव': "पुणे मंडी भाव: 🌾 गेहूँ ₹2,450/क्विंटल (↑5.2%), 🌾 चावल ₹3,800/क्विंटल (↑2.1%), 🫘 सोयाबीन ₹4,200/क्विंटल (↑12.5%)।",
  'रोग': "पत्ती की फोटो अपलोड करें और AI तुरंत बीमारी पहचानेगा। रोग पहचान पेज पर जाएं।",
  'नमस्ते': "नमस्ते! 🙏 AgriComplete Hub में स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?"
};

function sendChat() {
  const input = document.getElementById('chatInput');
  const body = document.getElementById('chatbotBody');
  const msg = input.value.trim();
  if (!msg) return;

  // Add user message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.textContent = msg;
  body.appendChild(userDiv);
  input.value = '';
  body.scrollTop = body.scrollHeight;

  // Simulate typing delay
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot';
    
    // Find matching response
    const lowerMsg = msg.toLowerCase();
    let response = null;
    for (const [key, val] of Object.entries(chatResponses)) {
      if (lowerMsg.includes(key.toLowerCase())) {
        response = val;
        break;
      }
    }
    if (!response) {
      const t = translations[currentLang] || translations.en;
      if (currentLang === 'hi') {
        response = "मुझे इस बारे में अभी पूरी जानकारी नहीं है। कृपया फसल, मौसम, रोग, या भाव के बारे में पूछें। 🌱";
      } else if (currentLang === 'mr') {
        response = "मला या विषयी पूर्ण माहिती नाही. कृपया पीक, हवामान, रोग किंवा भाव बद्दल विचारा. 🌱";
      } else {
        response = "I appreciate your question! For more specific help, try asking about: crop recommendations, weather, disease detection, market prices, marketplace, fertilizer, or water management. 🌱";
      }
    }
    
    botDiv.textContent = response;
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 800);
}

// ============ LOGOUT ============
window.handleLogout = function() {
  localStorage.removeItem('agri_token');
  localStorage.removeItem('agri_user');
  window.location.href = 'index.html';
};
