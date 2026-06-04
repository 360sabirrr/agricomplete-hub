/* =============================================
 AgriComplete Hub - Main JavaScript
 ============================================= */

// ============ MULTI-LANGUAGE SUPPORT ============
const translations = {
 en: {
 hero_badge: "AI-Powered Agriculture Platform",
 hero_title: "AgriComplete Hub for Smarter Farming",
 hero_desc: "Empowering Indian farmers with AI-driven crop recommendations, real-time weather intelligence, plant disease detection, live mandi prices, and a direct marketplace - all in one platform.",
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
 step1_desc: "Sign up with your farm details - location, soil type, and crops you grow.",
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
 chat_title: "AgriMate",
 chat_subtitle: "Ask me anything about farming",
 chat_welcome: "Namaste! I'm AgriMate. I can help you with crop recommendations, disease identification, weather info, and market prices. How can I help you today?",
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
 dash_welcome: "Welcome back, Rajesh!",
 login_title: "Welcome Back!",
 login_subtitle: "Sign in to access your farm dashboard",
 register_title: "Create Account",
 register_subtitle: "Start your smart farming journey today",
 search_placeholder: "Search crops, tools...",
 crop_rec_title: "Crop Suggestions",
 crop_rec_desc: "Based on your soil, climate, and season",
 price_trend: "Crop Price Trends (Rs./quintal)",
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
 hero_desc: "भारतीय किसानों को AI-संचालित फसल सुझाव, रियल-टाइम मौसम, पौधों की बीमारी का पता लगाने, लाइव मंडी भाव, और सीधा बाजार - सब एक मंच पर।",
 get_started: "मुफ़्त शुरू करें",
 explore_features: "फीचर्स देखें",
 stat_farmers: "सक्रिय किसान",
 stat_crops: "समर्थित फसलें",
 stat_accuracy: "रोग पहचान सटीकता",
 stat_traded: "बाजार मूल्य",
 features_badge: "प्लेटफॉर्म फीचर्स",
 features_title: "किसान की हर ज़रूरत, एक जगह",
 features_desc: "AI रोग पहचान से लेकर लाइव मंडी भाव तक - AgriComplete Hub आपका खेती साथी है।",
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
 step1_desc: "अपने खेत का विवरण दें - स्थान, मिट्टी का प्रकार और फसलें।",
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
 chat_title: "AgriMate",
 chat_subtitle: "खेती के बारे में कुछ भी पूछें",
 chat_welcome: "नमस्ते! मैं आपका कृषि AI सहायक हूँ। फसल सुझाव, रोग पहचान, मौसम और बाज़ार भाव में मदद कर सकता हूँ।",
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
 dash_welcome: "वापस स्वागत है, राजेश! ",
 login_title: "वापस स्वागत है! ",
 login_subtitle: "अपने खेत डैशबोर्ड में साइन इन करें",
 register_title: "खाता बनाएं ",
 register_subtitle: "आज ही अपनी स्मार्ट खेती यात्रा शुरू करें",
 search_placeholder: "फसलें, उपकरण खोजें...",
 crop_rec_title: "फसल सुझाव",
 crop_rec_desc: "आपकी मिट्टी, जलवायु और मौसम के आधार पर",
 price_trend: "फसल मूल्य प्रवृत्ति (Rs./क्विंटल)",
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
 hero_desc: "भारतीय शेतकऱ्यांना AI-चालित पीक शिफारशी, रिअल-टाइम हवामान, वनस्पती रोग ओळख, लाइव्ह बाजारभाव आणि थेट बाजारपेठ - सर्व एकाच प्लॅटफॉर्मवर.",
 get_started: "मोफत सुरू करा",
 explore_features: "वैशिष्ट्ये पहा",
 stat_farmers: "सक्रिय शेतकरी",
 stat_crops: "समर्थित पिके",
 stat_accuracy: "रोग ओळख अचूकता",
 stat_traded: "बाजार मूल्य",
 features_badge: "प्लॅटफॉर्म वैशिष्ट्ये",
 features_title: "शेतकऱ्याच्या प्रत्येक गरजा, एकाच ठिकाणी",
 features_desc: "AI रोग ओळखीपासून लाइव्ह बाजारभावापर्यंत - AgriComplete Hub तुमचा शेती सोबती आहे.",
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
 step1_desc: "आपल्या शेताचा तपशील द्या - स्थान, मातीचा प्रकार आणि पिके.",
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
 chat_title: "AgriMate",
 chat_subtitle: "शेतीबद्दल काहीही विचारा",
 chat_welcome: "नमस्कार! मी तुमचा कृषी AI सहाय्यक आहे. पीक शिफारशी, रोग ओळख, हवामान आणि बाजारभाव यात मदत करू शकतो.",
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
 dash_welcome: "पुन्हा स्वागत, राजेश! ",
 login_title: "पुन्हा स्वागत! ",
 login_subtitle: "तुमच्या शेत डॅशबोर्डमध्ये साइन इन करा",
 register_title: "खाते तयार करा ",
 register_subtitle: "आजच तुमचा स्मार्ट शेती प्रवास सुरू करा",
 search_placeholder: "पिके, साधने शोधा...",
 crop_rec_title: "पीक सूचना",
 crop_rec_desc: "तुमच्या मातीवर, हवामानावर आणि हंगामावर आधारित",
 price_trend: "पीक किंमत कल (Rs./क्विंटल)",
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
 step1_desc: "ਆਪਣੇ ਖੇਤ ਦਾ ਵੇਰਵਾ ਦਿਓ - ਸਥਿਤੀ, ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਤੇ ਫ਼ਸਲਾਂ।",
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
 chat_title: "AgriMate",
 chat_welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ AI ਸਹਾਇਕ ਹਾਂ।",
 chat_placeholder: "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
 nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
 nav_disease: "ਰੋਗ ਪਛਾਣ",
 nav_market: "ਮੰਡੀ ਭਾਅ",
 nav_marketplace: "ਬਾਜ਼ਾਰ",
 nav_resources: "ਸੰਸਾਧਨ ਬਿਬਾਦ",
 dash_welcome: "ਵਾਪਸ ਸੁਆਗਤ, ਰਾਜੇਸ਼! "
 },
 ta: {
 hero_badge: "AI-இயக்கப்படும் விவசாய தளம்",
 hero_title: "ஸ்மார்ட் விவசாயம் எளிதாக",
 hero_desc: "இந்திய விவசாயிகளுக்கு AI-இயக்கப்படும் பயிர் பரிந்துரைகள், வானிலை, நோய் கண்டறிதல், சந்தை விலைகள்.",
 get_started: "இலவச தொடங்கு",
 explore_features: "அம்சங்களை பார்க்கவும்",
 stat_farmers: "செயல்படும் விவசாயிகள்",
 stat_crops: "ஆதரிக்கப்பட்ட பயிர்கள்",
 stat_accuracy: "நோய் கண்டறிதல் துல்லியம்",
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
 step1_desc: "உங்கள் பண்ணையின் விவரங்களை வழங்கவும் - இடம், மண்ணின் வகை மற்றும் பயிர்கள்.",
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
 chat_title: "AgriMate",
 chat_welcome: "வணக்கம்! நான் உங்கள் விவசாய AI உதவியாளர்.",
 chat_placeholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்...",
 nav_dashboard: "டாஷ்போர்ட்",
 nav_disease: "நோய் கண்டறிதல்",
 nav_market: "சந்தை விலைகள்",
 nav_resources: "ஆதார மேலாண்மை",
 dash_welcome: "மீண்டும் வரவேற்கிறேன், ராஜேஷ்! "
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
 f1_desc: "మీ మట్టి, ప్రదేశం మరియు సీజన్ ఆధారంగా సరైన పంట సిఫారసులను పొందండి.",
 f2_title: "వాతావరణ సమాచారం",
 f2_desc: "రియల్-టైమ్ వాతావరణ సూచనలు, తుఫాను హెచ్చరికలు మరియు సీజనల్ సూచనలు.",
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
 step1_desc: "మీ గుర్రం వివరాలను ఇవ్వండి - స్థానం, నేల రకం మరియు పంటలు.",
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
 chat_title: "AgriMate",
 chat_welcome: "నమస్తే! నేను మీ వ్యవసాయ AI సహాయకుడిని.",
 chat_placeholder: "మీ ప్రశ్న టైప్ చేయండి...",
 nav_dashboard: "డాష్‌బోర్డ్",
 nav_disease: "వ్యాధి గుర్తింపు",
 nav_market: "మార్కెట్ ధరలు",
 nav_resources: "వనరుల నిర్వహణ",
 dash_welcome: "తిరిగి స్వాగతం, రాజేష్! "
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

const translationOverrides = {
 en: {
 nav_features: "Features",
 nav_how_it_works: "How It Works",
 nav_stories: "Stories",
 nav_contact: "Contact",
 chart_market_note: "Pune APMC indicative mandi rates",
 chart_crop_label: "Crop",
 chart_current_price: "Current",
 chart_period_avg: "Average",
 chart_price_change: "Change",
 chart_avg_short: "Avg",
 chart_high: "High",
 chart_low: "Low",
 hero_stat_tools_text: "Farm tools in one dashboard",
 hero_stat_ai_text: "AI farming guidance",
 hero_stat_live_text: "Weather and mandi updates",
 float_weather_title: "Weather Alert",
 float_weather_text: "Rain expected tomorrow. Delay pesticide spray.",
 float_market_title: "Market Signal",
 float_market_text: "Wheat trend is up this week.",
 float_crop_title: "Crop Health",
 float_crop_text: "Leaf scan ready with treatment guidance.",
 testimonials_desc: "Built around practical field decisions: what to grow, when to irrigate, when to treat, and where to sell.",
 testimonial_1_quote: "Weather alerts helped me plan irrigation and avoid spraying before rain. The dashboard is simple enough to use on my phone.",
 testimonial_1_role: "Wheat farmer, Maharashtra",
 testimonial_2_quote: "I checked nearby mandi rates before selling onions and had better confidence while talking to buyers.",
 testimonial_2_role: "Vegetable grower, Punjab",
 testimonial_3_quote: "The disease photo flow gives quick next steps. It saves time when crop symptoms start spreading.",
 testimonial_3_role: "Paddy farmer, Tamil Nadu",
 cta_badge: "Farmer Support",
 contact_email: "support@agricomplete.example",
 contact_phone: "+91 90000 00000",
 contact_location: "Built for Indian farmers",
 footer_platform: "Platform",
 footer_resources: "Resources",
 footer_company: "Company",
 footer_stories: "Farmer Stories",
 footer_support: "Support",
 footer_about: "About",
 footer_privacy: "Privacy Policy",
 footer_terms: "Terms of Service",
 footer_privacy_short: "Privacy",
 footer_terms_short: "Terms",
 footer_copyright: "© 2026 AgriComplete Hub. Made for Indian farmers."
 },
 hi: {
 nav_features: "फीचर्स",
 nav_how_it_works: "कैसे काम करता है",
 nav_stories: "कहानियाँ",
 nav_contact: "संपर्क",
 chart_market_note: "पुणे APMC के संकेतक मंडी भाव",
 chart_crop_label: "फसल",
 chart_current_price: "वर्तमान",
 chart_period_avg: "औसत",
 chart_price_change: "बदलाव",
 chart_avg_short: "औसत",
 chart_high: "ऊपर",
 chart_low: "कम",
 hero_stat_tools_text: "एक डैशबोर्ड में खेती के टूल",
 hero_stat_ai_text: "AI खेती मार्गदर्शन",
 hero_stat_live_text: "मौसम और मंडी अपडेट",
 float_weather_title: "मौसम अलर्ट",
 float_weather_text: "कल बारिश की संभावना है। कीटनाशक छिड़काव रोकें।",
 float_market_title: "बाजार संकेत",
 float_market_text: "इस सप्ताह गेहूं का रुझान ऊपर है।",
 float_crop_title: "फसल स्वास्थ्य",
 float_crop_text: "पत्ती स्कैन उपचार सलाह के साथ तैयार है।",
 testimonials_desc: "व्यावहारिक खेत निर्णयों के लिए बनाया गया: क्या उगाना है, कब सिंचाई करनी है, कब उपचार करना है, और कहां बेचना है।",
 testimonial_1_quote: "मौसम अलर्ट से मुझे सिंचाई की योजना बनाने और बारिश से पहले छिड़काव रोकने में मदद मिली।",
 testimonial_1_role: "गेहूं किसान, महाराष्ट्र",
 testimonial_2_quote: "प्याज बेचने से पहले मैंने पास के मंडी भाव देखे और खरीदारों से बात करते समय बेहतर भरोसा मिला।",
 testimonial_2_role: "सब्जी उत्पादक, पंजाब",
 testimonial_3_quote: "रोग फोटो फ्लो तुरंत अगले कदम बताता है। लक्षण फैलने पर समय बचता है।",
 testimonial_3_role: "धान किसान, तमिलनाडु",
 cta_badge: "किसान सहायता",
 contact_email: "support@agricomplete.example",
 contact_phone: "+91 90000 00000",
 contact_location: "भारतीय किसानों के लिए बनाया गया",
 footer_platform: "प्लेटफॉर्म",
 footer_resources: "संसाधन",
 footer_company: "कंपनी",
 footer_stories: "किसान कहानियाँ",
 footer_support: "सहायता",
 footer_about: "हमारे बारे में",
 footer_privacy: "गोपनीयता नीति",
 footer_terms: "सेवा शर्तें",
 footer_privacy_short: "गोपनीयता",
 footer_terms_short: "शर्तें",
 footer_copyright: "© 2026 AgriComplete Hub. भारतीय किसानों के लिए बनाया गया।"
 },
 mr: {
 nav_features: "वैशिष्ट्ये",
 nav_how_it_works: "कसे काम करते",
 nav_stories: "कथा",
 nav_contact: "संपर्क",
 chart_market_note: "पुणे APMC सूचक बाजारभाव",
 chart_crop_label: "पीक",
 chart_current_price: "सध्याचा",
 chart_period_avg: "सरासरी",
 chart_price_change: "बदल",
 chart_avg_short: "सरासरी",
 chart_high: "जास्त",
 chart_low: "कमी",
 hero_stat_tools_text: "एका डॅशबोर्डमध्ये शेती साधने",
 hero_stat_ai_text: "AI शेती मार्गदर्शन",
 hero_stat_live_text: "हवामान आणि बाजार अपडेट",
 float_weather_title: "हवामान इशारा",
 float_weather_text: "उद्या पावसाची शक्यता आहे. कीटकनाशक फवारणी थांबवा.",
 float_market_title: "बाजार संकेत",
 float_market_text: "या आठवड्यात गव्हाचा कल वर आहे.",
 float_crop_title: "पीक आरोग्य",
 float_crop_text: "पान स्कॅन उपचार मार्गदर्शनासह तयार आहे.",
 testimonials_desc: "व्यावहारिक शेत निर्णयांसाठी तयार: काय पेरायचे, कधी पाणी द्यायचे, कधी उपचार करायचे आणि कुठे विकायचे.",
 testimonial_1_quote: "हवामान इशाऱ्यांमुळे सिंचनाचे नियोजन आणि पावसापूर्वी फवारणी टाळणे सोपे झाले.",
 testimonial_1_role: "गहू शेतकरी, महाराष्ट्र",
 testimonial_2_quote: "कांदा विकण्यापूर्वी जवळचे बाजारभाव पाहिले आणि खरेदीदारांशी बोलताना अधिक आत्मविश्वास मिळाला.",
 testimonial_2_role: "भाजीपाला उत्पादक, पंजाब",
 testimonial_3_quote: "रोग फोटो प्रक्रिया लगेच पुढचे उपाय दाखवते. लक्षणे पसरताना वेळ वाचतो.",
 testimonial_3_role: "भात शेतकरी, तामिळनाडू",
 cta_badge: "शेतकरी सहाय्य",
 contact_email: "support@agricomplete.example",
 contact_phone: "+91 90000 00000",
 contact_location: "भारतीय शेतकऱ्यांसाठी तयार",
 footer_platform: "प्लॅटफॉर्म",
 footer_resources: "संसाधने",
 footer_company: "कंपनी",
 footer_stories: "शेतकरी कथा",
 footer_support: "सहाय्य",
 footer_about: "आमच्याबद्दल",
 footer_privacy: "गोपनीयता धोरण",
 footer_terms: "सेवा अटी",
 footer_privacy_short: "गोपनीयता",
 footer_terms_short: "अटी",
 footer_copyright: "© 2026 AgriComplete Hub. भारतीय शेतकऱ्यांसाठी तयार."
 },
 pa: {
 nav_features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
 nav_how_it_works: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
 nav_stories: "ਕਹਾਣੀਆਂ",
 nav_contact: "ਸੰਪਰਕ",
 chart_market_note: "ਪੁਨੇ APMC ਦੇ ਸੰਕੇਤਕ ਮੰਡੀ ਭਾਅ",
 chart_crop_label: "ਫ਼ਸਲ",
 chart_current_price: "ਮੌਜੂਦਾ",
 chart_period_avg: "ਔਸਤ",
 chart_price_change: "ਬਦਲਾਅ",
 chart_avg_short: "ਔਸਤ",
 chart_high: "ਉੱਚ",
 chart_low: "ਘੱਟ",
 nav_resources: "ਸੰਸਾਧਨ ਪ੍ਰਬੰਧਨ",
 nav_profile: "ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ",
 nav_settings: "ਸੈਟਿੰਗਾਂ",
 nav_logout: "ਲੌਗਆਉਟ",
 nav_water: "ਪਾਣੀ ਪ੍ਰਬੰਧਨ",
 nav_fertilizer: "ਖਾਦ ਯੋਜਨਾ",
 chat_subtitle: "ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ",
 login_title: "ਵਾਪਸ ਸੁਆਗਤ ਹੈ!",
 login_subtitle: "ਆਪਣੇ ਖੇਤ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ",
 register_title: "ਖਾਤਾ ਬਣਾਓ",
 register_subtitle: "ਅੱਜ ਆਪਣੀ ਸਮਾਰਟ ਖੇਤੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ",
 search_placeholder: "ਫ਼ਸਲਾਂ, ਟੂਲ ਖੋਜੋ...",
 crop_rec_title: "ਫ਼ਸਲ ਸੁਝਾਅ",
 crop_rec_desc: "ਤੁਹਾਡੀ ਮਿੱਟੀ, ਮੌਸਮ ਅਤੇ ਸੀਜ਼ਨ ਦੇ ਅਧਾਰ ਤੇ",
 price_trend: "ਫ਼ਸਲ ਕੀਮਤ ਰੁਝਾਨ (Rs./ਕੁਇੰਟਲ)",
 recent_alerts: "ਤਾਜ਼ਾ ਅਲਰਟ",
 water_mgmt: "ਪਾਣੀ ਪ੍ਰਬੰਧਨ",
 fert_plan: "ਖਾਦ ਸਮਾਂ-ਸਾਰਣੀ",
 stat_active_crops: "ਸਕਿਰਿਆ ਫ਼ਸਲਾਂ",
 stat_water: "ਪਾਣੀ ਵਰਤੋਂ",
 stat_revenue: "ਅੰਦਾਜ਼ਿਤ ਆਮਦਨ",
 stat_alerts: "ਸਕਿਰਿਆ ਅਲਰਟ",
 hero_stat_tools_text: "ਇੱਕ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਖੇਤੀ ਟੂਲ",
 hero_stat_ai_text: "AI ਖੇਤੀ ਮਾਰਗਦਰਸ਼ਨ",
 hero_stat_live_text: "ਮੌਸਮ ਅਤੇ ਮੰਡੀ ਅਪਡੇਟ",
 float_weather_title: "ਮੌਸਮ ਅਲਰਟ",
 float_weather_text: "ਕੱਲ੍ਹ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਕੀਟਨਾਸ਼ਕ ਛਿੜਕਾਅ ਰੋਕੋ।",
 float_market_title: "ਬਾਜ਼ਾਰ ਸੰਕੇਤ",
 float_market_text: "ਇਸ ਹਫ਼ਤੇ ਗੇਂਹੂ ਦਾ ਰੁਝਾਨ ਉੱਪਰ ਹੈ।",
 float_crop_title: "ਫ਼ਸਲ ਸਿਹਤ",
 float_crop_text: "ਪੱਤੇ ਦੀ ਸਕੈਨ ਇਲਾਜ ਸਲਾਹ ਨਾਲ ਤਿਆਰ ਹੈ।",
 testimonials_desc: "ਖੇਤ ਦੇ ਅਸਲੀ ਫ਼ੈਸਲਿਆਂ ਲਈ ਬਣਾਇਆ ਗਿਆ: ਕੀ ਉਗਾਉਣਾ ਹੈ, ਕਦੋਂ ਸਿੰਚਾਈ ਕਰਨੀ ਹੈ, ਕਦੋਂ ਇਲਾਜ ਕਰਨਾ ਹੈ ਅਤੇ ਕਿੱਥੇ ਵੇਚਣਾ ਹੈ।",
 testimonial_1_quote: "ਮੌਸਮ ਅਲਰਟ ਨੇ ਸਿੰਚਾਈ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਅਤੇ ਮੀਂਹ ਤੋਂ ਪਹਿਲਾਂ ਛਿੜਕਾਅ ਰੋਕਣ ਵਿੱਚ ਮਦਦ ਕੀਤੀ।",
 testimonial_1_role: "ਗੇਂਹੂ ਕਿਸਾਨ, ਮਹਾਰਾਸ਼ਟਰ",
 testimonial_2_quote: "ਪਿਆਜ਼ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਮੈਂ ਨੇੜਲੇ ਮੰਡੀ ਭਾਅ ਵੇਖੇ ਅਤੇ ਖਰੀਦਾਰਾਂ ਨਾਲ ਗੱਲ ਕਰਦੇ ਸਮੇਂ ਵਧੇਰੇ ਭਰੋਸਾ ਮਿਲਿਆ।",
 testimonial_2_role: "ਸਬਜ਼ੀ ਉਗਾਉਣ ਵਾਲੀ, ਪੰਜਾਬ",
 testimonial_3_quote: "ਰੋਗ ਫੋਟੋ ਫਲੋ ਤੁਰੰਤ ਅਗਲੇ ਕਦਮ ਦਿੰਦਾ ਹੈ। ਲੱਛਣ ਫੈਲਣ ਤੇ ਸਮਾਂ ਬਚਦਾ ਹੈ।",
 testimonial_3_role: "ਧਾਨ ਕਿਸਾਨ, ਤਾਮਿਲਨਾਡੂ",
 cta_badge: "ਕਿਸਾਨ ਸਹਾਇਤਾ",
 contact_email: "support@agricomplete.example",
 contact_phone: "+91 90000 00000",
 contact_location: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ",
 footer_platform: "ਪਲੇਟਫਾਰਮ",
 footer_resources: "ਸੰਸਾਧਨ",
 footer_company: "ਕੰਪਨੀ",
 footer_stories: "ਕਿਸਾਨ ਕਹਾਣੀਆਂ",
 footer_support: "ਸਹਾਇਤਾ",
 footer_about: "ਸਾਡੇ ਬਾਰੇ",
 footer_privacy: "ਪਰਾਈਵੇਸੀ ਨੀਤੀ",
 footer_terms: "ਸੇਵਾ ਸ਼ਰਤਾਂ",
 footer_privacy_short: "ਪਰਾਈਵੇਸੀ",
 footer_terms_short: "ਸ਼ਰਤਾਂ",
 footer_copyright: "© 2026 AgriComplete Hub. ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ।"
 },
 ta: {
 nav_features: "அம்சங்கள்",
 nav_how_it_works: "இது எப்படி வேலை செய்கிறது",
 nav_stories: "கதைகள்",
 nav_contact: "தொடர்பு",
 chart_market_note: "புனே APMC குறியீட்டு சந்தை விலைகள்",
 chart_crop_label: "பயிர்",
 chart_current_price: "தற்போதைய",
 chart_period_avg: "சராசரி",
 chart_price_change: "மாற்றம்",
 chart_avg_short: "சராசரி",
 chart_high: "அதிகம்",
 chart_low: "குறைவு",
 nav_marketplace: "சந்தை",
 nav_profile: "என் சுயவிவரம்",
 nav_settings: "அமைப்புகள்",
 nav_logout: "வெளியேறு",
 nav_water: "நீர் மேலாண்மை",
 nav_fertilizer: "உர திட்டம்",
 chat_subtitle: "விவசாயம் பற்றி எதையும் கேளுங்கள்",
 login_title: "மீண்டும் வரவேற்கிறோம்!",
 login_subtitle: "உங்கள் பண்ணை டாஷ்போர்டில் உள்நுழையவும்",
 register_title: "கணக்கு உருவாக்கவும்",
 register_subtitle: "இன்றே உங்கள் ஸ்மார்ட் விவசாய பயணத்தை தொடங்குங்கள்",
 search_placeholder: "பயிர்கள், கருவிகள் தேடுங்கள்...",
 crop_rec_title: "பயிர் பரிந்துரைகள்",
 crop_rec_desc: "உங்கள் மண், காலநிலை மற்றும் பருவத்தை அடிப்படையாகக் கொண்டது",
 price_trend: "பயிர் விலை போக்கு (Rs./குவிண்டால்)",
 recent_alerts: "சமீபத்திய எச்சரிக்கைகள்",
 water_mgmt: "நீர் மேலாண்மை",
 fert_plan: "உர அட்டவணை",
 stat_active_crops: "செயலில் உள்ள பயிர்கள்",
 stat_water: "நீர் பயன்பாடு",
 stat_revenue: "மதிப்பிடப்பட்ட வருவாய்",
 stat_alerts: "செயலில் உள்ள எச்சரிக்கைகள்",
 stat_accuracy: "நோய் கண்டறிதல் துல்லியம்",
 hero_stat_tools_text: "ஒரே டாஷ்போர்டில் விவசாய கருவிகள்",
 hero_stat_ai_text: "AI விவசாய வழிகாட்டல்",
 hero_stat_live_text: "வானிலை மற்றும் சந்தை புதுப்பிப்புகள்",
 float_weather_title: "வானிலை எச்சரிக்கை",
 float_weather_text: "நாளை மழை வாய்ப்பு உள்ளது. பூச்சிக்கொல்லி தெளிப்பை தள்ளிவையுங்கள்.",
 float_market_title: "சந்தை சிக்னல்",
 float_market_text: "இந்த வாரம் கோதுமை விலை உயர்வில் உள்ளது.",
 float_crop_title: "பயிர் ஆரோக்கியம்",
 float_crop_text: "இலை ஸ்கேன் சிகிச்சை வழிகாட்டலுடன் தயாராக உள்ளது.",
 testimonials_desc: "என்ன வளர்ப்பது, எப்போது பாசனம் செய்வது, எப்போது சிகிச்சை செய்வது, எங்கு விற்குவது போன்ற நடைமுறை முடிவுகளுக்காக உருவாக்கப்பட்டது.",
 testimonial_1_quote: "வானிலை எச்சரிக்கைகள் பாசனத்தை திட்டமிடவும் மழைக்கு முன் தெளிப்பை தவிர்க்கவும் உதவின.",
 testimonial_1_role: "கோதுமை விவசாயி, மகாராஷ்டிரா",
 testimonial_2_quote: "வெங்காயம் விற்கும் முன் அருகிலுள்ள சந்தை விலைகளை பார்த்ததால் வாங்குபவர்களுடன் நம்பிக்கையாக பேச முடிந்தது.",
 testimonial_2_role: "காய்கறி உற்பத்தியாளர், பஞ்சாப்",
 testimonial_3_quote: "நோய் புகைப்பட செயல்முறை உடனடி அடுத்த படிகளை தருகிறது. அறிகுறிகள் பரவும்போது நேரம் சேமிக்கிறது.",
 testimonial_3_role: "நெல் விவசாயி, தமிழ்நாடு",
 cta_badge: "விவசாயி ஆதரவு",
 contact_email: "support@agricomplete.example",
 contact_phone: "+91 90000 00000",
 contact_location: "இந்திய விவசாயிகளுக்காக உருவாக்கப்பட்டது",
 footer_platform: "தளம்",
 footer_resources: "வளங்கள்",
 footer_company: "நிறுவனம்",
 footer_stories: "விவசாயி கதைகள்",
 footer_support: "ஆதரவு",
 footer_about: "எங்களை பற்றி",
 footer_privacy: "தனியுரிமை கொள்கை",
 footer_terms: "சேவை விதிமுறைகள்",
 footer_privacy_short: "தனியுரிமை",
 footer_terms_short: "விதிமுறைகள்",
 footer_copyright: "© 2026 AgriComplete Hub. இந்திய விவசாயிகளுக்காக உருவாக்கப்பட்டது."
 },
 te: {
 nav_features: "లక్షణాలు",
 nav_how_it_works: "ఇది ఎలా పనిచేస్తుంది",
 nav_stories: "కథలు",
 nav_contact: "సంప్రదించండి",
 chart_market_note: "పుణే APMC సూచనాత్మక మార్కెట్ ధరలు",
 chart_crop_label: "పంట",
 chart_current_price: "ప్రస్తుత",
 chart_period_avg: "సగటు",
 chart_price_change: "మార్పు",
 chart_avg_short: "సగటు",
 chart_high: "ఎక్కువ",
 chart_low: "తక్కువ",
 nav_marketplace: "మార్కెట్‌ప్లేస్",
 nav_profile: "నా ప్రొఫైల్",
 nav_settings: "సెట్టింగులు",
 nav_logout: "లాగ్ అవుట్",
 nav_water: "నీటి నిర్వహణ",
 nav_fertilizer: "ఎరువు ప్రణాళిక",
 chat_subtitle: "వ్యవసాయం గురించి ఏదైనా అడగండి",
 login_title: "మళ్లీ స్వాగతం!",
 login_subtitle: "మీ ఫార్మ్ డాష్‌బోర్డ్‌లోకి సైన్ ఇన్ చేయండి",
 register_title: "ఖాతా సృష్టించండి",
 register_subtitle: "ఈరోజే మీ స్మార్ట్ వ్యవసాయ ప్రయాణాన్ని ప్రారంభించండి",
 search_placeholder: "పంటలు, సాధనాలు వెతకండి...",
 crop_rec_title: "పంట సూచనలు",
 crop_rec_desc: "మీ నేల, వాతావరణం మరియు సీజన్ ఆధారంగా",
 price_trend: "పంట ధర ధోరణి (Rs./క్వింటాల్)",
 recent_alerts: "తాజా హెచ్చరికలు",
 water_mgmt: "నీటి నిర్వహణ",
 fert_plan: "ఎరువు షెడ్యూల్",
 stat_active_crops: "చురుకైన పంటలు",
 stat_water: "నీటి వినియోగం",
 stat_revenue: "అంచనా ఆదాయం",
 stat_alerts: "చురుకైన హెచ్చరికలు",
 f1_desc: "మీ మట్టి, ప్రదేశం మరియు సీజన్ ఆధారంగా సరైన పంట సిఫారసులను పొందండి.",
 f2_desc: "రియల్-టైమ్ వాతావరణ సూచనలు, తుఫాను హెచ్చరికలు మరియు సీజనల్ సూచనలు.",
 step1_desc: "మీ ఫార్మ్ వివరాలను ఇవ్వండి - స్థానం, నేల రకం మరియు పంటలు.",
 hero_stat_tools_text: "ఒకే డాష్‌బోర్డ్‌లో వ్యవసాయ సాధనాలు",
 hero_stat_ai_text: "AI వ్యవసాయ మార్గదర్శనం",
 hero_stat_live_text: "వాతావరణం మరియు మార్కెట్ అప్డేట్లు",
 float_weather_title: "వాతావరణ హెచ్చరిక",
 float_weather_text: "రేపు వర్షం వచ్చే అవకాశం ఉంది. పురుగుమందు స్ప్రేను వాయిదా వేయండి.",
 float_market_title: "మార్కెట్ సంకేతం",
 float_market_text: "ఈ వారం గోధుమ ధరలు పైకి ఉన్నాయి.",
 float_crop_title: "పంట ఆరోగ్యం",
 float_crop_text: "ఆకు స్కాన్ చికిత్స మార్గదర్శకంతో సిద్ధంగా ఉంది.",
 testimonials_desc: "ఏం పెంచాలి, ఎప్పుడు నీరు పెట్టాలి, ఎప్పుడు చికిత్స చేయాలి, ఎక్కడ అమ్మాలి వంటి ప్రాక్టికల్ నిర్ణయాల కోసం నిర్మించబడింది.",
 testimonial_1_quote: "వాతావరణ హెచ్చరికలు నీటి ప్రణాళికకు మరియు వర్షానికి ముందు స్ప్రేను నివారించడానికి సహాయపడ్డాయి.",
 testimonial_1_role: "గోధుమ రైతు, మహారాష్ట్ర",
 testimonial_2_quote: "ఉల్లిపాయలు అమ్మే ముందు దగ్గరలోని మార్కెట్ ధరలు చూసి కొనుగోలుదారులతో నమ్మకంగా మాట్లాడగలిగాను.",
 testimonial_2_role: "కూరగాయల సాగుదారు, పంజాబ్",
 testimonial_3_quote: "వ్యాధి ఫోటో ఫ్లో వెంటనే తదుపరి దశలను ఇస్తుంది. లక్షణాలు వ్యాపించినప్పుడు సమయం ఆదా అవుతుంది.",
 testimonial_3_role: "వరి రైతు, తమిళనాడు",
 cta_badge: "రైతు సహాయం",
 contact_email: "support@agricomplete.example",
 contact_phone: "+91 90000 00000",
 contact_location: "భారతీయ రైతుల కోసం నిర్మించబడింది",
 footer_platform: "వేదిక",
 footer_resources: "వనరులు",
 footer_company: "కంపెనీ",
 footer_stories: "రైతు కథలు",
 footer_support: "సహాయం",
 footer_about: "మా గురించి",
 footer_privacy: "గోప్యతా విధానం",
 footer_terms: "సేవా నిబంధనలు",
 footer_privacy_short: "గోప్యత",
 footer_terms_short: "నిబంధనలు",
 footer_copyright: "© 2026 AgriComplete Hub. భారతీయ రైతుల కోసం నిర్మించబడింది."
 }
};

function translateLabel(key) {
 const primary = translations[currentLang] || translations.en;
 const supplemental = supplementalTranslations[currentLang] || supplementalTranslations.en;
 const overrides = translationOverrides[currentLang] || {};
 return overrides[key]
 || primary[key]
 || supplemental[key]
 || translationOverrides.en[key]
 || translations.en[key]
 || supplementalTranslations.en[key]
 || '';
}

function setTextForSelector(selector, key, all = true) {
 const value = translateLabel(key);
 if (!value) return;
 const nodes = all? document.querySelectorAll(selector): [document.querySelector(selector)];
 nodes.forEach(node => {
 if (node) node.textContent = value;
 });
}

function setHeadingWithIcon(selector, iconClass, color, key) {
 const heading = document.querySelector(selector);
 const value = translateLabel(key);
 if (!heading ||!value) return;
 heading.innerHTML = `<i class="${iconClass}" style="color:${color};margin-right:8px;"></i> ${value}`;
}

function setButtonWithIcon(selector, iconClass, key) {
 const button = document.querySelector(selector);
 const value = translateLabel(key);
 if (!button ||!value) return;
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
 if (document.getElementById('priceTrendBars')) {
 updateChartData();
 }
 syncStoredUserUI();
 // Force update all selector values
 document.querySelectorAll('.lang-selector select').forEach(sel => {
 sel.value = lang;
 });
}

function applyTranslations() {
 document.documentElement.lang = currentLang;
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
 if (!selectEl ||!value) return;
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

 document.querySelectorAll('.profile-avatar,.sidebar-footer .user-avatar').forEach(el => {
 el.textContent = avatarText;
 });

 const dashWelcome = document.querySelector('[data-i18n="dash_welcome"]');
 if (dashWelcome) {
 dashWelcome.textContent = `${welcomePrefix}, ${displayName}!`;
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
 setInputValue('profileFarmArea', user.total_area || '');
 setInputValue('profileSoilType', user.soil_type || '');
 setInputValue('profileIrrigationSource', user.irrigation_source || '');
 setInputValue('profilePrimaryCrops', user.primary_crops || '');
 setInputValue('profileFarmingType', user.farming_type || '');

 const stateSelect = document.getElementById('profileState');
 if (stateSelect) {
 const stateValue = user.state || '';
 ensureSelectOption(stateSelect, stateValue);
 stateSelect.value = stateValue;
 }

 updateProfileDisplay(user);
 updateFarmDetailsSummary(user);
}

function updateFarmDetailsSummary(user) {
 if (!user) return;

 const formatValue = value => value? value: 'Not set';

 const setText = (id, value) => {
 const el = document.getElementById(id);
 if (el) el.textContent = value;
 };

 setText('farmAreaValue', formatValue(user.total_area));
 setText('farmSoilValue', formatValue(user.soil_type));
 setText('farmIrrigationValue', formatValue(user.irrigation_source));
 setText('farmCropsValue', formatValue(user.primary_crops));
 setText('farmTypeValue', formatValue(user.farming_type));
}

function toggleFarmDetailsEdit(show = true) {
 const summary = document.getElementById('farmDetailsSummary');
 const form = document.getElementById('farmDetailsForm');
 if (!summary ||!form) return;

 summary.style.display = show? 'none': 'flex';
 form.style.display = show? 'flex': 'none';

 if (show) {
 const savedUser = getStoredUser();
 if (savedUser) {
 fillProfileForm(savedUser);
 }
 }
}

function showToast(message, type = 'success') {
 const toast = document.getElementById('toastNotification');
 if (!toast) { alert(message); return; }

 const icon = toast.querySelector('.toast-icon');
 const msg = toast.querySelector('.toast-message');
 if (msg) msg.textContent = message;
 if (icon) icon.className = 'toast-icon fas ' + (type === 'error'? 'fa-exclamation-circle': 'fa-check-circle');
 toast.classList.remove('toast-hide', 'toast-error');
 if (type === 'error') toast.classList.add('toast-error');
 toast.style.display = 'block';

 // Force re-trigger animation
 toast.style.animation = 'none';
 toast.offsetHeight; // reflow
 toast.style.animation = '';

 clearTimeout(toast._hideTimer);
 toast._hideTimer = setTimeout(() => {
 toast.classList.add('toast-hide');
 setTimeout(() => { toast.style.display = 'none'; }, 400);
 }, 3000);
}

function saveFarmDetails() {
 // Update display immediately from form values for instant feedback
 const totalArea = document.getElementById('profileFarmArea')?.value || '';
 const soilType = document.getElementById('profileSoilType')?.value || '';
 const irrigationSource = document.getElementById('profileIrrigationSource')?.value || '';
 const primaryCrops = document.getElementById('profilePrimaryCrops')?.value || '';
 const farmingType = document.getElementById('profileFarmingType')?.value || '';

 const setText = (id, value) => {
 const el = document.getElementById(id);
 if (el) el.textContent = value || 'Not set';
 };

 setText('farmAreaValue', totalArea);
 setText('farmSoilValue', soilType);
 setText('farmIrrigationValue', irrigationSource);
 setText('farmCropsValue', primaryCrops);
 setText('farmTypeValue', farmingType);

 // Also update localStorage immediately so details persist on refresh
 const savedUser = getStoredUser() || {};
 savedUser.total_area = totalArea;
 savedUser.soil_type = soilType;
 savedUser.irrigation_source = irrigationSource;
 savedUser.primary_crops = primaryCrops;
 savedUser.farming_type = farmingType;
 localStorage.setItem('agri_user', JSON.stringify(savedUser));

 // Then save to backend and refresh
 return saveProfile({ _skipAlert: true }).then(() => {
 toggleFarmDetailsEdit(false);
 showToast('Farm details saved successfully!');
 }).catch(err => {
 showToast('Error saving farm details: ' + (err.msg || err.message || 'Unknown error'), 'error');
 });
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

 // Setup dynamic save button visibility
 const personalFields = [
 'profileFirstName', 'profileLastName', 'profileEmail',
 'profilePhone', 'profileState', 'profileDistrict', 'profileVillage'
 ];
 personalFields.forEach(id => {
 document.getElementById(id)?.addEventListener('input', () => showPersonalInfoSave());
 document.getElementById(id)?.addEventListener('change', () => showPersonalInfoSave());
 });
}

function showPersonalInfoSave() {
 const btn = document.getElementById('personalInfoSaveBtn');
 if (btn) btn.style.display = 'flex';
}

function saveProfile(options = {}) {
 const token = localStorage.getItem('agri_token');

 if (!token) {
 showToast('Please log in first to update your profile', 'error');
 window.location.href = 'auth.html';
 return Promise.reject(new Error('Not logged in'));
 }

 const firstName = document.getElementById('profileFirstName')?.value;
 const lastName = document.getElementById('profileLastName')?.value;
 const email = document.getElementById('profileEmail')?.value;
 const phone = document.getElementById('profilePhone')?.value;
 const state = document.getElementById('profileState')?.value;
 const district = document.getElementById('profileDistrict')?.value;
 const village = document.getElementById('profileVillage')?.value;
 const totalArea = document.getElementById('profileFarmArea')?.value;
 const soilType = document.getElementById('profileSoilType')?.value;
 const irrigationSource = document.getElementById('profileIrrigationSource')?.value;
 const primaryCrops = document.getElementById('profilePrimaryCrops')?.value;
 const farmingType = document.getElementById('profileFarmingType')?.value;

 if (!firstName ||!lastName ||!email) {
 showToast('Please fill in all required fields', 'error');
 return Promise.reject(new Error('Missing required fields'));
 }

 const profileData = {
 firstName,
 lastName,
 email,
 phone,
 state,
 district,
 village,
 totalArea,
 soilType,
 irrigationSource,
 primaryCrops,
 farmingType
 };

 return apiFetch('/user/profile', {
 method: 'PUT',
 body: JSON.stringify(profileData)
 }).then(data => {
 if (!options._skipAlert) {
 showToast('Profile updated successfully!');
 }
 if (data?.user) {
 fillProfileForm(data.user);
 updateFarmDetailsSummary(data.user);
 localStorage.setItem('agri_user', JSON.stringify(data.user));
 }
 // Hide save button after success
 const btn = document.getElementById('personalInfoSaveBtn');
 if (btn) btn.style.display = 'none';
 }).catch(err => {
 if (!options._skipAlert) {
 showToast('Error updating profile: ' + (err.msg || err.message || 'Unknown error'), 'error');
 }
 throw err;
 });
}

// ============ MARKETPLACE LISTINGS ============
function escapeHtml(value) {
 return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const MARKETPLACE_CATEGORIES = [
 'Grains & Cereals',
 'Pulses',
 'Vegetables',
 'Fruits',
 'Spices',
 'Oilseeds',
 'Cash Crops',
 'Other'
];

const MARKETPLACE_CATEGORY_RULES = [
 { category: 'Grains & Cereals', keywords: ['rice', 'paddy', 'wheat', 'maize', 'corn', 'jowar', 'bajra', 'sorghum', 'millet', 'ragi', 'barley'] },
 { category: 'Pulses', keywords: ['pulse', 'dal', 'chana', 'chickpea', 'gram', 'tur', 'toor', 'arhar', 'moong', 'urad', 'masoor', 'lentil', 'pea'] },
 { category: 'Vegetables', keywords: ['onion', 'potato', 'tomato', 'brinjal', 'eggplant', 'cabbage', 'cauliflower', 'carrot', 'okra', 'bhindi', 'vegetable'] },
 { category: 'Fruits', keywords: ['mango', 'banana', 'orange', 'grape', 'apple', 'pomegranate', 'guava', 'papaya', 'fruit'] },
 { category: 'Spices', keywords: ['chilli', 'chili', 'pepper', 'turmeric', 'haldi', 'coriander', 'jeera', 'cumin', 'spice'] },
 { category: 'Oilseeds', keywords: ['soy', 'soybean', 'groundnut', 'peanut', 'sunflower', 'mustard', 'sesame', 'til', 'oilseed'] },
 { category: 'Cash Crops', keywords: ['sugarcane', 'cotton', 'jute', 'tobacco'] }
];

function getListingIconClass(cropName) {
 const normalized = String(cropName || '').toLowerCase();
 if (normalized.includes('rice') || normalized.includes('wheat') || normalized.includes('maize')) return 'fas fa-wheat-awn';
 if (normalized.includes('chickpea') || normalized.includes('pulse') || normalized.includes('dal')) return 'fas fa-seedling';
 if (normalized.includes('onion') || normalized.includes('potato') || normalized.includes('vegetable') || normalized.includes('carrot')) return 'fas fa-carrot';
 if (normalized.includes('chilli') || normalized.includes('pepper') || normalized.includes('spice')) return 'fas fa-pepper-hot';
 if (normalized.includes('sunflower') || normalized.includes('mustard')) return 'fas fa-sun';
 if (normalized.includes('groundnut') || normalized.includes('peanut') || normalized.includes('soy')) return 'fas fa-leaf';
 if (normalized.includes('sugarcane') || normalized.includes('cotton')) return 'fas fa-industry';
 return 'fas fa-seedling';
}

function formatListingTime(createdAt) {
 let timestamp = String(createdAt || '');
 if (timestamp &&!/[zZ]|[+-]\d{2}:\d{2}$/.test(timestamp)) {
 timestamp = `${timestamp}Z`;
 }
 const now = Date.now();
 const diffMs = now - new Date(timestamp).getTime();
 const mins = Math.floor(diffMs / 60000);
 if (!Number.isFinite(mins) || mins < 1) return 'just now';
 if (mins < 60) return `${mins}m ago`;
 const hours = Math.floor(mins / 60);
 if (hours < 24) return `${hours}h ago`;
 const days = Math.floor(hours / 24);
 return `${days}d ago`;
}

function renderMarketplaceCountLegacy() {
 const countEl = document.getElementById('marketplaceCount');
 if (!countEl) return;

 const myCount = document.getElementById('myListingsGrid')?.querySelectorAll('[data-backend-listing="true"]').length || 0;
 const buyCount = document.getElementById('buyListingsGrid')?.querySelectorAll('[data-backend-listing="true"]').length || 0;
 countEl.textContent = `${myCount} listed by you · ${buyCount} available to buy`;
}

function compressListingImage(file) {
 return new Promise((resolve, reject) => {
 if (!file) {
 resolve('');
 return;
 }
 if (!file.type.startsWith('image/')) {
 reject(new Error('Please upload an image file.'));
 return;
 }

 const reader = new FileReader();
 reader.onload = () => {
 const img = new Image();
 img.onload = () => {
 const maxSize = 900;
 const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
 const width = Math.max(1, Math.round(img.width * scale));
 const height = Math.max(1, Math.round(img.height * scale));
 const canvas = document.createElement('canvas');
 canvas.width = width;
 canvas.height = height;
 const ctx = canvas.getContext('2d');
 ctx.drawImage(img, 0, 0, width, height);
 resolve(canvas.toDataURL('image/jpeg', 0.82));
 };
 img.onerror = () => reject(new Error('Could not read the uploaded image.'));
 img.src = reader.result;
 };
 reader.onerror = () => reject(new Error('Could not read the uploaded image.'));
 reader.readAsDataURL(file);
 });
}

function setListingImagePreview(imageData) {
 const preview = document.getElementById('listingImagePreview');
 if (!preview) return;

 if (!imageData) {
 preview.style.display = 'none';
 preview.innerHTML = '';
 return;
 }

 preview.style.display = 'block';
 preview.innerHTML = `<img src="${imageData}" alt="Listing photo preview" style="width:100%;height:100%;object-fit:cover;display:block;">`;
}

function getSafeListingImageData(value) {
 const imageData = String(value || '');
 return /^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(imageData)? imageData: '';
}

let marketplaceListingsById = new Map();
let marketplaceAllListings = [];

function normalizeMarketplaceText(value) {
 return String(value || '').trim().toLowerCase();
}

function normalizeMarketplaceCategory(value) {
 const text = String(value || '').trim();
 if (!text || normalizeMarketplaceText(text) === 'all' || normalizeMarketplaceText(text) === 'all categories') {
 return 'all';
 }

 return MARKETPLACE_CATEGORIES.find(category =>
 normalizeMarketplaceText(category) === normalizeMarketplaceText(text)
 ) || text;
}

function normalizeMarketplaceLocationFilterValue(value) {
 const text = String(value || '').trim();
 if (!text || normalizeMarketplaceText(text) === 'all' || normalizeMarketplaceText(text) === 'all locations') {
 return 'all';
 }
 return text;
}

function getListingCategory(listing) {
 const storedCategory = String(listing?.category || '').trim();
 if (MARKETPLACE_CATEGORIES.includes(storedCategory)) {
 return storedCategory;
 }

 const cropName = normalizeMarketplaceText(listing?.crop_name || listing?.cropName);
 const matchedRule = MARKETPLACE_CATEGORY_RULES.find(rule =>
 rule.keywords.some(keyword => cropName.includes(keyword))
 );
 return matchedRule? matchedRule.category: 'Other';
}

function normalizeMarketplaceListing(listing) {
 const normalized = {...listing };
 normalized.category = getListingCategory(listing);
 normalized.location = String(listing?.location || '').trim();
 return normalized;
}

function getListingTimestamp(listing) {
 let timestamp = String(listing?.created_at || listing?.createdAt || '');
 if (timestamp &&!/[zZ]|[+-]\d{2}:\d{2}$/.test(timestamp)) {
 timestamp = `${timestamp}Z`;
 }
 const parsed = new Date(timestamp).getTime();
 return Number.isFinite(parsed)? parsed: 0;
}

function getListingQuantityValue(listing) {
 const match = String(listing?.quantity || '').match(/-?\d+(\.\d+)?/);
 const value = match? Number(match[0]): 0;
 return Number.isFinite(value)? value: 0;
}

function getMarketplaceFilterState() {
 return {
 category: normalizeMarketplaceCategory(document.getElementById('marketCategoryFilter')?.value || 'all'),
 location: normalizeMarketplaceLocationFilterValue(document.getElementById('marketLocationFilter')?.value || 'all'),
 sort: document.getElementById('marketSortFilter')?.value || 'latest'
 };
}

function isMarketplaceFiltered() {
 const filters = getMarketplaceFilterState();
 return filters.category!== 'all' || filters.location!== 'all';
}

function populateMarketplaceLocationFilter(listings) {
 const select = document.getElementById('marketLocationFilter');
 if (!select) return;

 const currentValue = normalizeMarketplaceLocationFilterValue(select.value || 'all');
 const locations = Array.from(new Set(
 listings.map(listing => String(listing.location || '').trim()).filter(Boolean)
 )).sort((a, b) => a.localeCompare(b));

 select.innerHTML = '';
 select.add(new Option('All Locations', 'all'));
 locations.forEach(location => select.add(new Option(location, location)));
 select.value = currentValue === 'all' || locations.includes(currentValue)? currentValue: 'all';
}

function updateMarketplaceLocationOptions() {
 const filters = getMarketplaceFilterState();
 const categoryListings = filters.category === 'all'? marketplaceAllListings: marketplaceAllListings.filter(listing => getListingCategory(listing) === filters.category);
 populateMarketplaceLocationFilter(categoryListings);
}

function handleMarketplaceFilterChange(event) {
 if (event?.target?.id === 'marketCategoryFilter') {
 updateMarketplaceLocationOptions();
 }
 renderMarketplaceFilteredListings();
}

function getFilteredMarketplaceListings() {
 const filters = getMarketplaceFilterState();
 const filtered = marketplaceAllListings.filter(listing => {
 const matchesCategory = filters.category === 'all' || getListingCategory(listing) === filters.category;
 const matchesLocation = filters.location === 'all' || normalizeMarketplaceText(listing.location) === normalizeMarketplaceText(filters.location);
 return matchesCategory && matchesLocation;
 });

 return filtered.sort((a, b) => {
 const priceA = Number(a.price);
 const priceB = Number(b.price);
 const safePriceA = Number.isFinite(priceA)? priceA: 0;
 const safePriceB = Number.isFinite(priceB)? priceB: 0;

 if (filters.sort === 'price-low') return safePriceA - safePriceB;
 if (filters.sort === 'price-high') return safePriceB - safePriceA;
 if (filters.sort === 'quantity-high') return getListingQuantityValue(b) - getListingQuantityValue(a);
 return getListingTimestamp(b) - getListingTimestamp(a);
 });
}

function renderMarketplaceCount() {
 const countEl = document.getElementById('marketplaceCount');
 if (!countEl) return;

 const myCount = document.getElementById('myListingsGrid')?.querySelectorAll('[data-backend-listing="true"]').length || 0;
 const buyCount = document.getElementById('buyListingsGrid')?.querySelectorAll('[data-backend-listing="true"]').length || 0;
 const visibleCount = myCount + buyCount;
 const totalCount = marketplaceAllListings.length;
 const filteredText = isMarketplaceFiltered()? `${visibleCount} of ${totalCount} matching filters - `: '';
 countEl.textContent = `${filteredText}${myCount} listed by you - ${buyCount} available to buy`;
}

function decodeJwtPayload(token) {
 try {
 const payload = String(token || '').split('.')[1];
 if (!payload) return null;
 const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
 const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
 return JSON.parse(atob(padded));
 } catch (err) {
 return null;
 }
}

function getCurrentAuthUserIds() {
 const currentUser = getStoredUser();
 const tokenPayload = decodeJwtPayload(localStorage.getItem('agri_token'));
 return [
 currentUser?.id,
 currentUser?.user_id,
 tokenPayload?.sub,
 tokenPayload?.identity,
 tokenPayload?.user_id,
 tokenPayload?.id
 ].filter(value => value!== undefined && value!== null && value!== '').map(value => String(value));
}

function isListingOwnedByCurrentUser(listing) {
 if (!listing) return false;

 const currentUserIds = getCurrentAuthUserIds();
 const sellerIds = [listing.seller_id, listing.sellerId].filter(value => value!== undefined && value!== null).map(value => String(value));

 return currentUserIds.some(userId => sellerIds.includes(userId));
}

function createMarketplaceCardHtml(listing) {
 const cropName = escapeHtml(listing.crop_name || listing.cropName || 'Crop');
 const location = escapeHtml(listing.location || 'Unknown');
 const quantity = escapeHtml(listing.quantity || '0');
 const price = Number(listing.price);
 const safePrice = Number.isFinite(price)? price.toLocaleString('en-IN'): escapeHtml(listing.price || '0');
 const seller = escapeHtml(listing.seller_name || listing.seller || 'Farmer');
 const category = escapeHtml(getListingCategory(listing));
 const iconClass = getListingIconClass(cropName);
 const timeAgo = formatListingTime(listing.created_at || listing.createdAt || new Date().toISOString());
 const listingId = escapeHtml(listing.id);
 const isOwner = isListingOwnedByCurrentUser(listing);
 const imageData = getSafeListingImageData(listing.image_data || listing.imageData);
 const mediaHtml = imageData? `<img src="${imageData}" alt="${cropName}" style="width:100%;height:100%;object-fit:cover;display:block;">`: `<span class="crop-icon-badge"><i class="${iconClass}"></i></span>`;

 let actionsHtml = `
 <button type="button" onclick="openListingContact('${listingId}')" class="btn btn-primary btn-sm" style="flex:1;justify-content:center;"><i class="fas fa-phone"></i> Contact</button>
 <button type="button" onclick="chatListing('${listingId}')" class="btn btn-secondary btn-sm" style="flex:1;justify-content:center;"><i class="fas fa-comment"></i> Chat</button>
 `;

 let ownerTagHtml = '';

 if (isOwner) {
 ownerTagHtml = `<div class="product-tag" style="background:var(--color-secondary);right:12px;left:auto;font-size:0.65rem;">Your Listing</div>`;
 actionsHtml = `
 <button onclick="editListing('${listingId}')" class="btn btn-primary btn-sm" style="flex:1;justify-content:center;font-weight:700;"><i class="fas fa-edit"></i> Edit</button>
 <button onclick="deleteListing('${listingId}')" class="btn btn-secondary btn-sm" style="flex:1;justify-content:center;background:#DC3545;border-color:#DC3545;color:#fff;font-weight:700;"><i class="fas fa-trash"></i> Delete</button>
 `;
 }

 return `
 <div class="product-card" data-backend-listing="true" data-listing-id="${listingId}" ${isOwner? 'data-is-owner="true"': ''}>
 <div class="product-img" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);">
 ${mediaHtml}
 <div class="product-tag" style="background:var(--color-primary);">${category}</div>
 ${ownerTagHtml}
 </div>
 <div class="product-body">
 <h4>${cropName}</h4>
 <div class="product-meta">
 <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
 <span><i class="fas fa-weight-hanging"></i> ${quantity} qtl</span>
 </div>
 <div class="product-price">Rs.${safePrice}/q</div>
 <p class="product-seller">Listed by ${seller} - ${timeAgo}</p>
 <div class="product-actions">
 ${actionsHtml}
 </div>
 </div>
 </div>
 `;
}

async function renderMarketplaceListings() {
 const myGrid = document.getElementById('myListingsGrid');
 const buyGrid = document.getElementById('buyListingsGrid');
 if (!myGrid ||!buyGrid) return;

 myGrid.innerHTML = '';
 buyGrid.innerHTML = '';

 try {
 const listings = await apiFetch('/market/listings');
 const safeListings = Array.isArray(listings)? listings.map(normalizeMarketplaceListing): [];
 marketplaceAllListings = safeListings;
 marketplaceListingsById = new Map(safeListings.map(listing => [String(listing.id), listing]));
 updateMarketplaceLocationOptions();
 renderMarketplaceFilteredListings();
 } catch (err) {
 console.warn('Failed to load marketplace listings from backend:', err);
 marketplaceAllListings = [];
 marketplaceListingsById = new Map();
 populateMarketplaceLocationFilter([]);
 myGrid.innerHTML = '';
 buyGrid.innerHTML = '';
 updateMarketplaceSectionState(0, 0, true);
 renderMarketplaceCount();
 }
}

function renderMarketplaceFilteredListings() {
 const myGrid = document.getElementById('myListingsGrid');
 const buyGrid = document.getElementById('buyListingsGrid');
 if (!myGrid ||!buyGrid) return;

 const myListings = [];
 const buyListings = [];

 getFilteredMarketplaceListings().forEach(listing => {
 if (isListingOwnedByCurrentUser(listing)) {
 myListings.push(listing);
 } else {
 buyListings.push(listing);
 }
 });

 myGrid.innerHTML = myListings.map(createMarketplaceCardHtml).join('');
 buyGrid.innerHTML = buyListings.map(createMarketplaceCardHtml).join('');
 updateMarketplaceSectionState(myListings.length, buyListings.length);
 renderMarketplaceCount();
}

function updateMarketplaceSectionState(myCount, buyCount, hasError = false) {
 const myEmpty = document.getElementById('myListingsEmpty');
 const buyEmpty = document.getElementById('buyListingsEmpty');
 const myCountEl = document.getElementById('myListingsCount');
 const buyCountEl = document.getElementById('buyListingsCount');
 const filtered = isMarketplaceFiltered();

 if (myEmpty) {
 myEmpty.style.display = myCount? 'none': 'block';
 const heading = myEmpty.querySelector('h4');
 const text = myEmpty.querySelector('p');
 if (heading) {
 heading.textContent = hasError? 'Could not load your listings': filtered? 'No matching crops listed by you': 'No crops listed by you yet';
 }
 if (text) {
 text.textContent = hasError? 'Please refresh the page and try again.': filtered? 'Change the filters above or create a new matching listing.': 'Create your first listing so buyers can contact you.';
 }
 }
 if (buyEmpty) {
 buyEmpty.style.display = buyCount? 'none': 'block';
 const heading = buyEmpty.querySelector('h4');
 const text = buyEmpty.querySelector('p');
 if (heading) {
 heading.textContent = hasError? 'Could not load crops to buy': filtered? 'No matching crops to buy': 'No crops available to buy yet';
 }
 if (text) {
 text.textContent = hasError? 'Please refresh the page and try again.': filtered? 'No other farmer listings match the selected filters.': 'Other farmers have not listed crops yet.';
 }
 }
 if (myCountEl) myCountEl.textContent = `${myCount} listing${myCount === 1? '': 's'}`;
 if (buyCountEl) buyCountEl.textContent = `${buyCount} listing${buyCount === 1? '': 's'}`;
}

function normalizePhoneForChat(phone) {
 let digits = String(phone || '').replace(/\D+/g, '');
 if (!digits) return '';
 if (digits.length === 10) digits = `91${digits}`;
 if (digits.length === 11 && digits.startsWith('0')) digits = `91${digits.slice(1)}`;
 return digits;
}

function getListingInquiryMessage(listing) {
 const crop = listing.crop_name || listing.cropName || 'your crop';
 const quantity = listing.quantity? ` (${listing.quantity} qtl)`: '';
 const price = listing.price? ` at Rs.${Number(listing.price).toLocaleString('en-IN')}/q`: '';
 return `Hi, I am interested in your ${crop}${quantity}${price} listed on AgriComplete Hub. Is it available?`;
}

function openListingContact(id) {
 const listing = marketplaceListingsById.get(String(id));
 if (!listing) {
 alert('Listing details are not available. Please refresh and try again.');
 return;
 }

 const seller = escapeHtml(listing.seller_name || 'Farmer');
 const crop = escapeHtml(listing.crop_name || 'Crop');
 const phone = String(listing.seller_phone || '').trim();
 const email = String(listing.seller_email || '').trim();
 const cleanPhone = phone? escapeHtml(phone): '';
 const cleanEmail = email? escapeHtml(email): '';
 const chatPhone = normalizePhoneForChat(phone);
 const message = encodeURIComponent(getListingInquiryMessage(listing));
 const contactBody = document.getElementById('contactModalBody');
 const modal = document.getElementById('contactModal');

 if (!contactBody ||!modal) {
 alert(phone || email? `Contact ${seller}: ${phone || email}`: 'Seller contact details are not available.');
 return;
 }

 contactBody.innerHTML = `
 <div style="display:flex;flex-direction:column;gap:var(--space-md);">
 <div>
 <p style="font-size:.82rem;color:var(--text-muted);margin-bottom:4px;">Crop</p>
 <strong>${crop}</strong>
 </div>
 <div>
 <p style="font-size:.82rem;color:var(--text-muted);margin-bottom:4px;">Seller</p>
 <strong>${seller}</strong>
 </div>
 <div style="display:flex;flex-direction:column;gap:8px;">
 ${phone? `<a class="btn btn-primary btn-sm" href="tel:${cleanPhone}" style="justify-content:center;"><i class="fas fa-phone"></i> Call ${cleanPhone}</a>`: ''}
 ${chatPhone? `<a class="btn btn-secondary btn-sm" href="https://wa.me/${chatPhone}?text=${message}" target="_blank" rel="noopener" style="justify-content:center;"><i class="fas fa-comment"></i> WhatsApp Chat</a>`: ''}
 ${email? `<a class="btn btn-secondary btn-sm" href="mailto:${cleanEmail}?subject=${encodeURIComponent(`Inquiry for ${listing.crop_name || 'crop'}`)}&body=${message}" style="justify-content:center;"><i class="fas fa-envelope"></i> Email ${cleanEmail}</a>`: ''}
 ${!phone &&!email? '<p style="font-size:.9rem;color:var(--text-secondary);">Seller contact details are not available for this listing.</p>': ''}
 </div>
 </div>
 `;
 modal.style.display = 'flex';
}

function closeContactModal() {
 const modal = document.getElementById('contactModal');
 if (modal) modal.style.display = 'none';
}

function chatListing(id) {
 const listing = marketplaceListingsById.get(String(id));
 if (!listing) {
 alert('Listing details are not available. Please refresh and try again.');
 return;
 }

 const phone = normalizePhoneForChat(listing.seller_phone);
 const message = encodeURIComponent(getListingInquiryMessage(listing));
 if (phone) {
 window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener');
 return;
 }

 if (listing.seller_email) {
 window.location.href = `mailto:${listing.seller_email}?subject=${encodeURIComponent(`Inquiry for ${listing.crop_name || 'crop'}`)}&body=${message}`;
 return;
 }

 openListingContact(id);
}

let currentEditingListingId = null;
let currentEditingListingImageData = '';

function openListingModal() {
 if (!localStorage.getItem('agri_token')) {
 alert('Please log in first to list your crop.');
 window.location.href = 'auth.html';
 return;
 }

 currentEditingListingId = null;
 currentEditingListingImageData = '';
 const modal = document.getElementById('listingModal');
 const form = document.getElementById('listingForm');
 if (form) form.reset();
 setListingImagePreview('');
 
 if (modal) {
 const title = modal.querySelector('h3');
 const btn = modal.querySelector('button[type="submit"]');
 if (title) title.innerHTML = '<i class="fas fa-plus-circle" style="color:var(--color-primary);margin-right:8px;"></i>List Your Crop';
 if (btn) btn.innerHTML = '<i class="fas fa-check"></i> Submit Listing';
 modal.style.display = 'flex';
 }
}

function deleteListing(id) {
 if (!localStorage.getItem('agri_token')) {
 alert('Please log in first to delete your listing.');
 window.location.href = 'auth.html';
 return;
 }

 if (!confirm('Are you sure you want to delete this listing?')) return;
 apiFetch(`/market/listings/${id}`, { method: 'DELETE' }).then(() => {
 showToast('Listing deleted successfully!');
 renderMarketplaceListings();
 }).catch(err => {
 showToast('Failed to delete: ' + (err.msg || err.message), 'error');
 });
}

async function editListing(id) {
 if (!localStorage.getItem('agri_token')) {
 alert('Please log in first to edit your listing.');
 window.location.href = 'auth.html';
 return;
 }

 try {
 const listings = await apiFetch('/market/listings');
 const listing = listings.find(l => String(l.id) === String(id));
 if (!listing) return;
 if (!isListingOwnedByCurrentUser(listing)) {
 showToast('You can edit only your own listings.', 'error');
 return;
 }

 currentEditingListingId = id;
 currentEditingListingImageData = getSafeListingImageData(listing.image_data || listing.imageData);
 const modal = document.getElementById('listingModal');
 if (!modal) return;

 document.getElementById('listingCropName').value = listing.crop_name || '';
 document.getElementById('listingQuantity').value = listing.quantity || '';
 document.getElementById('listingPrice').value = listing.price || '';
 document.getElementById('listingLocation').value = listing.location || '';
 const categorySelect = document.getElementById('listingCategory');
 const listingCategory = getListingCategory(listing);
 if (categorySelect) {
 const hasCategoryOption = Array.from(categorySelect.options).some(option => option.value === listingCategory || option.textContent === listingCategory);
 categorySelect.value = hasCategoryOption? listingCategory: '';
 }
 const imageInput = document.getElementById('listingImage');
 if (imageInput) imageInput.value = '';
 setListingImagePreview(currentEditingListingImageData);

 const title = modal.querySelector('h3');
 const btn = modal.querySelector('button[type="submit"]');
 if (title) title.innerHTML = '<i class="fas fa-edit" style="color:var(--color-primary);margin-right:8px;"></i>Edit Your Crop';
 if (btn) btn.innerHTML = '<i class="fas fa-check"></i> Update Listing';

 modal.style.display = 'flex';
 } catch (err) {
 showToast('Error loading listing details', 'error');
 }
}

function closeListingModal() {
 const modal = document.getElementById('listingModal');
 if (modal) modal.style.display = 'none';
}

async function seedMarketplaceFromLocalStorageIfNeeded() {
 const legacyKey = 'agri_marketplace_custom_listings';
 const legacyRaw = localStorage.getItem(legacyKey);
 const token = localStorage.getItem('agri_token');
 if (!legacyRaw ||!token) return;

 try {
 const legacyListings = JSON.parse(legacyRaw);
 if (!Array.isArray(legacyListings) ||!legacyListings.length) {
 localStorage.removeItem(legacyKey);
 return;
 }

 for (const item of legacyListings) {
 if (!item?.cropName ||!item?.quantity ||!item?.price ||!item?.location) continue;
 try {
 await apiFetch('/market/listings', {
 method: 'POST',
 body: JSON.stringify({
 crop_name: item.cropName,
 quantity: item.quantity,
 price: Number(item.price),
 location: item.location,
 category: getListingCategory({ crop_name: item.cropName, category: item.category })
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
 if (!form ||!modal ||!document.getElementById('myListingsGrid') ||!document.getElementById('buyListingsGrid')) return;

 seedMarketplaceFromLocalStorageIfNeeded().finally(() => {
 renderMarketplaceListings();
 });

 ['marketCategoryFilter', 'marketLocationFilter', 'marketSortFilter'].forEach(id => {
 document.getElementById(id)?.addEventListener('change', handleMarketplaceFilterChange);
 });

 form.addEventListener('submit', async (event) => {
 event.preventDefault();

 const cropName = document.getElementById('listingCropName')?.value.trim();
 const quantity = document.getElementById('listingQuantity')?.value.trim();
 const price = document.getElementById('listingPrice')?.value.trim();
 const location = document.getElementById('listingLocation')?.value.trim();
 const category = document.getElementById('listingCategory')?.value.trim();
 const imageInput = document.getElementById('listingImage');
 const token = localStorage.getItem('agri_token');

 if (!token) {
 alert('Please log in first to create a marketplace listing.');
 window.location.href = 'auth.html';
 return;
 }

 if (!cropName ||!quantity ||!price ||!location ||!category) {
 alert('Please fill in all required listing fields.');
 return;
 }

 try {
 const url = currentEditingListingId? `/market/listings/${currentEditingListingId}`: '/market/listings';
 const method = currentEditingListingId? 'PUT': 'POST';
 let imageData = currentEditingListingImageData;
 if (imageInput?.files?.[0]) {
 imageData = await compressListingImage(imageInput.files[0]);
 }
 
 await apiFetch(url, {
 method,
 body: JSON.stringify({
 crop_name: cropName,
 quantity,
 price: Number(price),
 location,
 category,
 image_data: imageData
 })
 });

 await renderMarketplaceListings();
 form.reset();
 closeListingModal();
 showToast(currentEditingListingId? 'Listing updated successfully!': 'Listing submitted successfully!');
 currentEditingListingId = null;
 currentEditingListingImageData = '';
 setListingImagePreview('');
 } catch (err) {
 showToast('Failed to save listing: ' + (err.msg || err.message || 'Unknown error'), 'error');
 }
 });

 document.getElementById('listingImage')?.addEventListener('change', async (event) => {
 const file = event.target.files?.[0];
 if (!file) {
 setListingImagePreview(currentEditingListingImageData);
 return;
 }
 try {
 const imageData = await compressListingImage(file);
 setListingImagePreview(imageData);
 } catch (err) {
 event.target.value = '';
 showToast(err.message || 'Could not preview image', 'error');
 setListingImagePreview(currentEditingListingImageData);
 }
 });

 modal.addEventListener('click', (event) => {
 if (event.target === modal) {
 closeListingModal();
 }
 });

 document.getElementById('contactModal')?.addEventListener('click', (event) => {
 if (event.target.id === 'contactModal') {
 closeContactModal();
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

 const listHtml = notifications.length? notifications.map(n => `
 <div class="notification-item">
 <h5>${n.title}</h5>
 <p>${n.message}</p>
 <span>${n.time}</span>
 </div>
 `).join(''): '<div class="notification-empty">No new notifications</div>';

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
 document.querySelectorAll('.notification-btn.notif-dot').forEach(dot => {
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
 <button type="button" data-help-action="chat">Open AgriMate</button>
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
 
 document.querySelectorAll('.sidebar-nav.nav-item').forEach(item => {
 const href = item.getAttribute('href');
 if (href === currentPath) {
 item.classList.add('active');
 } else {
 item.classList.remove('active');
 }
 });
}



function getStoredUser() {
 try {
 const user = localStorage.getItem('agri_user');
 return user? JSON.parse(user): null;
 } catch (e) {
 return null;
 }
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
 links.classList.toggle('open');
 }
}

document.addEventListener('DOMContentLoaded', () => {
 const landingLinks = document.getElementById('navLinks');
 landingLinks?.querySelectorAll('a').forEach(link => {
 link.addEventListener('click', () => landingLinks.classList.remove('open'));
 });
});


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
 return cleanUrl.endsWith('/api')? cleanUrl: `${cleanUrl}/api`;
}

const API_URL = (() => {
 const configuredUrl =
 window.AGRICOMPLETE_API_URL ||
 document.querySelector('meta[name="api-url"]')?.content;
 if (configuredUrl) return normalizeApiUrl(configuredUrl);

 const localHosts = ['', 'localhost', '127.0.0.1', '::1'];
 if (localHosts.includes(window.location.hostname)) {
 return 'http://localhost:5000/api';
 }

 return 'https://agricomplete-backend.onrender.com/api';
})();

// API Helper
function isAuthExpiredMessage(message) {
 return /token has expired|expired token|signature has expired|missing authorization/i.test(String(message || ''));
}

function clearExpiredSession(message = 'Your session expired. Please log in again.') {
 localStorage.removeItem('agri_token');
 localStorage.removeItem('agri_user');
 alert(message);
 window.location.href = 'auth.html';
}

async function apiFetch(endpoint, options = {}) {
 const token = localStorage.getItem('agri_token');
 const headers = {
 'Content-Type': 'application/json',...(token && { 'Authorization': `Bearer ${token}` }),...options.headers
 };
 
 try {
 const res = await fetch(`${API_URL}${endpoint}`, {...options, headers });
 const contentType = res.headers.get('content-type') || '';
 const data = contentType.includes('application/json')? await res.json(): { msg: (await res.text()) || `API Error: ${res.status}` };
 
 if (!res.ok) {
 const errorMsg = data.msg || data.message || `API Error: ${res.status}`;
 console.error(`API Error (${endpoint}):`, res.status, data);
 if (res.status === 401 && isAuthExpiredMessage(errorMsg)) {
 clearExpiredSession();
 throw { msg: 'Session expired. Please log in again.', status: res.status, data };
 }
 throw { 
 msg: errorMsg,
 status: res.status,
 data: data
 };
 }
 return data;
 } catch (err) {
 console.error(`API Error (${endpoint}):`, err);
 if (err?.name === 'AbortError') {
 throw { msg: 'Request timed out. Please try again.', timeout: true };
 }
 if (err instanceof TypeError) {
 throw { msg: `Cannot connect to backend at ${API_URL}. Please ensure the server is running.` };
 }
 throw err;
 }
}

async function apiFetchWithTimeout(endpoint, options = {}, timeoutMs = 5000) {
 const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), timeoutMs);
 try {
 return await apiFetch(endpoint, { ...options, signal: controller.signal });
 } finally {
 clearTimeout(timeout);
 }
}

function setAuthSubmitState(form, isSubmitting, loadingHtml) {
 const button = form?.querySelector('button[type="submit"]');
 if (!button) return;

 if (isSubmitting) {
 button.dataset.originalHtml = button.innerHTML;
 button.disabled = true;
 button.innerHTML = loadingHtml;
 return;
 }

 button.disabled = false;
 if (button.dataset.originalHtml) {
 button.innerHTML = button.dataset.originalHtml;
 delete button.dataset.originalHtml;
 }
}

async function handleLogin(e) {
 e.preventDefault();
 setAuthSubmitState(e.target, true, '<i class="fas fa-spinner fa-spin"></i> Signing In...');
 const emailInput = e.target.querySelector('#loginEmail');
 const passwordInput = e.target.querySelector('#loginPassword');

 if (!emailInput ||!passwordInput) {
 console.error('Login form elements not found');
 alert('Login form is not configured correctly. Please refresh and try again.');
 setAuthSubmitState(e.target, false);
 return;
 }

 const email = emailInput.value.trim();
 const password = passwordInput.value;
 
 if (!email ||!password) {
 alert('Please enter both email and password');
 setAuthSubmitState(e.target, false);
 return;
 }
 
 try {
 localStorage.removeItem('agri_token');
 localStorage.removeItem('agri_user');
 const data = await apiFetch('/auth/login', {
 method: 'POST',
 body: JSON.stringify({ email, password })
 });

 if (!data.access_token ||!data.user) {
 throw { msg: 'Login response was incomplete. Please try again.' };
 }

 localStorage.setItem('agri_token', data.access_token);
 localStorage.setItem('agri_user', JSON.stringify(data.user));
 window.location.href = 'dashboard.html';
 } catch (err) {
 console.error('Login error:', err);
 const errorMsg = err.msg || err.message || 'Login failed. Please check your credentials and try again.';
 alert(errorMsg);
 setAuthSubmitState(e.target, false);
 }
}

async function handleRegister(e) {
 e.preventDefault();
 setAuthSubmitState(e.target, true, '<i class="fas fa-spinner fa-spin"></i> Creating Account...');
 const firstName = e.target.querySelector('#regFirstName')?.value.trim() || '';
 const lastName = e.target.querySelector('#regLastName')?.value.trim() || '';
 const phone = e.target.querySelector('#regPhone')?.value.trim() || '';
 const email = e.target.querySelector('#regEmail')?.value.trim() || '';
 const state = e.target.querySelector('#regState')?.value || '';
 const password = e.target.querySelector('#regPassword')?.value || '';
 
 if (!firstName ||!lastName ||!phone ||!email ||!state ||!password) {
 alert('Please fill in all registration fields');
 setAuthSubmitState(e.target, false);
 return;
 }
 
 if (password.length < 6) {
 alert('Password must be at least 6 characters long');
 setAuthSubmitState(e.target, false);
 return;
 }
 
 try {
 localStorage.removeItem('agri_token');
 localStorage.removeItem('agri_user');
 await apiFetch('/auth/register', {
 method: 'POST',
 body: JSON.stringify({ 
 email, 
 password, 
 state,
 first_name: firstName,
 last_name: lastName,
 phone
 })
 });
 alert('Registration successful! Please login.');
 e.target.reset();
 switchAuthTab('login');
 const loginEmail = document.getElementById('loginEmail');
 const loginPassword = document.getElementById('loginPassword');
 if (loginEmail) loginEmail.value = email;
 if (loginPassword) loginPassword.value = '';
 } catch (err) {
 console.error('Registration error:', err);
 const errorMsg = err.msg || err.message || 'Registration failed';
 alert(errorMsg);
 } finally {
 setAuthSubmitState(e.target, false);
 }
}


// ============ WEATHER API ============
async function fetchJson(url, options = {}) {
 const res = await fetch(url, options);
 const data = await res.json();
 if (!res.ok) {
 throw new Error(data?.msg || data?.message || data?.error?.message || 'Weather fetch failed');
 }
 return data;
}

async function fetchJsonWithTimeout(url, timeoutMs = 5000) {
 const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), timeoutMs);
 try {
 return await fetchJson(url, { signal: controller.signal });
 } finally {
 clearTimeout(timeout);
 }
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
 const city = cityInput? cityInput.value.trim(): 'Pune';
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
 if (humEl) humEl.textContent = `${weatherData.humidity?? '--'}%`;
 if (windEl) windEl.textContent = formatWeatherNumber(weatherData.wind_kph, 1, 'km/h');
 if (visEl) visEl.textContent = formatWeatherNumber(weatherData.visibility_km, 1, 'km');
 if (pressEl) pressEl.textContent = `${weatherData.pressure_mb?? '--'} mb`;
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
 const dayName = i === 0? 'Today': new Date(date).toLocaleDateString('en-IN', { weekday: 'short' });
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
 initChatbotAssistant();
 if (window.location.hash === '#weatherWidget') {
 window.setTimeout(focusDashboardWeatherWidget, 250);
 }

 document.querySelectorAll('.chart-filter').forEach(btn => {
 btn.addEventListener('click', function() {
 this.parentElement.querySelectorAll('.chart-filter').forEach(b => b.classList.remove('active'));
 this.classList.add('active');
 });
 });
 if (document.getElementById('priceTrendBars')) {
 updateChartData('1W');
 }

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
 fab.innerHTML = panel.classList.contains('open')? '<i class="fas fa-times"></i>': '<i class="fas fa-comment-dots"></i>';
 }
 }
}

const chatResponses = {
 // English
 'crop recommendation': "Based on your location (Pune, Maharashtra) and season, I recommend: Wheat, Chickpea, Potato, or Mustard. Wheat has the highest suitability score (95%) for your black cotton soil.",
 'disease': "I can help with disease detection! Upload a clear photo of the affected leaf on our Disease Detection page, and our AI will identify the disease with treatment recommendations. Common diseases include Late Blight, Powdery Mildew, and Leaf Rust.",
 'weather': "Current weather in Pune: Check the weather widget on your dashboard for live data. You can change the city anytime. Heavy rain is expected in the next 48 hours - consider securing harvested crops.",
 'market price': "Current prices at Pune APMC: Wheat Rs.2,450/q (up5.2%), Rice Rs.3,800/q (up2.1%), Soybean Rs.4,200/q (up12.5%). Visit the Market Prices page for detailed information.",
 'marketplace': "You can list your crops on the Marketplace page. Click 'List Your Crop' to create a listing with crop name, quantity, price, and location. Buyers can contact you directly!",
 'fertilizer': "Based on your crops, here's your fertilizer schedule: Wheat - Urea 50 kg/acre (due tomorrow), Chickpea - DAP 30 kg/acre (in 5 days), Potato - MOP 25 kg/acre (in 10 days).",
 'water': "Field B (Chickpea) needs irrigation within 24 hours! Soil moisture is at 42%. Field A (Wheat) is optimal at 78%. Schedule irrigation accordingly.",
 'hello': "Namaste! Welcome to AgriComplete Hub. How can I assist you today? You can ask about crop recommendations, weather, disease detection, market prices, or fertilizer planning.",
 'namaste': "Namaste! Welcome to AgriComplete Hub. How can I assist you today?",
 'help': "I can help you with:\n Crop recommendations\n Weather forecasts\n Disease detection\n Market prices\n Marketplace\n Water management\n Fertilizer planning\n\nJust type your question!",
 // Hindi
 'फसल': "आपके स्थान (पुणे, महाराष्ट्र) और मौसम के आधार पर, मैं सुझाव देता हूँ: गेहूँ (95%), चना (88%), आलू (82%), सरसों (76%)।",
 'मौसम': "पुणे का मौसम: डैशबोर्ड पर लाइव मौसम विजेट देखें। अगले 48 घंटों में भारी बारिश की संभावना है।",
 'भाव': "पुणे मंडी भाव: गेहूँ Rs.2,450/क्विंटल (up5.2%), चावल Rs.3,800/क्विंटल (up2.1%), सोयाबीन Rs.4,200/क्विंटल (up12.5%)।",
 'रोग': "पत्ती की फोटो अपलोड करें और AI तुरंत बीमारी पहचानेगा। रोग पहचान पेज पर जाएं।",
 'नमस्ते': "नमस्ते! AgriComplete Hub में स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?"
};

function sendChatLegacy() {
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
 response = "मुझे इस बारे में अभी पूरी जानकारी नहीं है। कृपया फसल, मौसम, रोग, या भाव के बारे में पूछें। ";
 } else if (currentLang === 'mr') {
 response = "मला या विषयी पूर्ण माहिती नाही. कृपया पीक, हवामान, रोग किंवा भाव बद्दल विचारा. ";
 } else {
 response = "I appreciate your question! For more specific help, try asking about: crop recommendations, weather, disease detection, market prices, marketplace, fertilizer, or water management. ";
 }
 }
 
 botDiv.textContent = response;
 body.appendChild(botDiv);
 body.scrollTop = body.scrollHeight;
 }, 800);
}

// ============ SMART CHATBOT UPGRADE ============
const assistantKnowledge = [
 {
 keys: ['hello', 'hi', 'hey', 'namaste', 'salam'],
 answer: 'Namaste! I am AgriMate. Ask me about crops, disease, weather, market prices, marketplace, profile, login, fertilizer, irrigation, soil, pests, or general farming questions.'
 },
 {
 keys: ['help', 'what can you do', 'how can you help'],
 answer: 'I can help with crop planning, disease symptoms, fertilizer schedule, irrigation timing, soil care, marketplace listings, buyer contact, account issues, and quick navigation commands. You can also tap the mic and speak your question.'
 },
 {
 keys: ['crop recommendation', 'which crop', 'best crop', 'what should i grow', 'suitable crop'],
 answer: 'For crop selection, check three things: season, soil, and water. In Maharashtra, wheat, chickpea, onion, vegetables, soybean, and sugarcane can work depending on irrigation. If water is limited, prefer chickpea, pulses, or oilseeds. If irrigation is strong, vegetables or sugarcane can earn more but need more management.'
 },
 {
 keys: ['disease', 'leaf', 'spots', 'yellow leaves', 'fungus', 'blight', 'rust', 'powdery'],
 answer: 'For disease issues, upload a clear leaf photo on the Disease Detection page. Until then: remove heavily infected leaves, avoid overhead watering, keep spacing for airflow, and use crop-specific treatment only after confirming symptoms. If leaves are yellowing, also check waterlogging, nitrogen deficiency, and pests.'
 },
 {
 keys: ['fertilizer', 'urea', 'dap', 'npk', 'mop', 'nutrient'],
 answer: 'Use fertilizer after soil testing whenever possible. General rule: apply organic compost before sowing, use DAP/NPK near sowing, split urea into 2-3 doses, and avoid heavy nitrogen during disease pressure. For fruiting crops, balance nitrogen with potash for better quality.'
 },
 {
 keys: ['water', 'irrigation', 'drip', 'moisture', 'watering'],
 answer: 'Irrigate early morning or evening. Avoid watering if rain is expected or soil is already wet 5-7 cm below the surface. Drip irrigation is best for vegetables, fruit crops, and sugarcane because it saves water and reduces leaf disease.'
 },
 {
 keys: ['soil', 'ph', 'black soil', 'red soil', 'compost', 'organic matter'],
 answer: 'Healthy soil should have good drainage, organic matter, and balanced pH. Add compost or farmyard manure before sowing, avoid repeated deep tillage, rotate crops, and test soil pH/NPK at least once a season.'
 },
 {
 keys: ['pest', 'insect', 'aphid', 'borer', 'whitefly', 'caterpillar'],
 answer: 'For pests, first identify the insect and damage pattern. Use yellow sticky traps for sucking pests, pheromone traps for borers, remove affected parts early, and spray only when pest count crosses the economic threshold.'
 },
 {
 keys: ['marketplace', 'sell crop', 'list crop', 'buyer', 'contact buyer'],
 answer: 'On Marketplace, use List Your Crop, add crop name, quantity, price, location, category, and photo. Your crops appear in My Listings. Crops from other farmers appear in Buy Crops, where buyers can call or chat with sellers.'
 },
 {
 keys: ['login', 'register', 'registration', 'token', 'password', 'account'],
 answer: 'For account issues, use a valid email, phone number, and password, then log in again after registration. If a page behaves strangely after updates, hard refresh once. Your app now uses non-expiring login tokens.'
 },
 {
 keys: ['profile', 'phone', 'email', 'farm details', 'village', 'district'],
 answer: 'Open Profile to update your name, phone, email, location, farm size, soil type, irrigation source, and primary crops. Keeping this updated helps the assistant give better farm-specific suggestions.'
 },
 {
 keys: ['government', 'scheme', 'subsidy', 'loan', 'insurance'],
 answer: 'For schemes, subsidy, crop insurance, or loans, confirm the latest rules from your local agriculture office or official government portal. I can help you prepare documents: Aadhaar, bank details, land record, crop details, and phone number.'
 },
 {
 keys: ['photosynthesis'],
 answer: 'Photosynthesis is how plants use sunlight, water, and carbon dioxide to make food. Good sunlight, healthy leaves, enough water, and balanced nutrients improve photosynthesis and crop growth.'
 },
 {
 keys: ['thank', 'thanks', 'ok', 'cool'],
 answer: 'You are welcome. Ask the next question or use the mic button for voice input.'
 }
];

const assistantQuickActions = [
 { label: 'Crop advice', prompt: 'Which crop should I grow this season?' },
 { label: 'Disease help', prompt: 'My crop leaves have spots. What should I do?' },
 { label: 'Market price', prompt: 'What price should I set for my crop?' },
 { label: 'Sell crop', prompt: 'Open marketplace to list my crop' }
];

const assistantOfflineTopicAnswers = [
 {
 keys: ['photosynthesis'],
 answer: 'Photosynthesis is the process plants use to make their own food. Leaves take sunlight, carbon dioxide from air, and water from roots, then produce glucose for growth and oxygen as a byproduct.'
 },
 {
 keys: ['crop rotation', 'rotation'],
 answer: 'Crop rotation means growing different crop families on the same land in different seasons. It improves soil health, reduces pest buildup, and balances nutrient use. A simple example is cereal crop, then pulse crop, then vegetable or oilseed.'
 },
 {
 keys: ['organic farming', 'organic'],
 answer: 'Organic farming avoids synthetic chemicals as much as possible and focuses on compost, farmyard manure, crop rotation, biological pest control, mulching, and soil health. It can improve long-term soil quality but needs careful pest and nutrient planning.'
 },
 {
 keys: ['drip irrigation', 'drip'],
 answer: 'Drip irrigation gives water slowly near the plant root zone through pipes and emitters. It saves water, reduces weeds, and keeps leaves dry, which helps lower disease risk in vegetables, fruit crops, and sugarcane.'
 },
 {
 keys: ['soil ph', 'ph value', 'ph'],
 answer: 'Soil pH shows whether soil is acidic, neutral, or alkaline. Most crops grow well around pH 6.0 to 7.5. If pH is too high or too low, nutrients may be present but unavailable to the crop, so soil testing is important.'
 },
 {
 keys: ['mulching', 'mulch'],
 answer: 'Mulching means covering soil with crop residue, straw, leaves, plastic mulch, or other material. It reduces water loss, controls weeds, protects soil from heat, and can improve crop growth when used correctly.'
 },
 {
 keys: ['compost', 'farmyard manure', 'fym'],
 answer: 'Compost and farmyard manure add organic matter to soil. They improve soil structure, water holding capacity, and microbial activity. Use well-decomposed material so it does not heat roots or carry weed seeds.'
 },
 {
 keys: ['crop price trend', 'price trend', 'market trend'],
 answer: 'Crop price trends show whether prices are rising, falling, or stable over a selected period. Use them with mandi demand, crop quality, moisture level, transport cost, and buyer urgency before deciding when to sell.'
 },
 {
 keys: ['artificial intelligence', 'ai'],
 answer: 'AI means software that can understand patterns, answer questions, classify images, or make predictions from data. In this app, AI is used for assistant replies, crop disease help, and farming recommendations.'
 },
 {
 keys: ['machine learning', 'ml'],
 answer: 'Machine learning is a type of AI where a model learns from examples instead of fixed rules. For farming, it can help predict disease, estimate crop suitability, or find patterns in weather and price data.'
 },
 {
 keys: ['api'],
 answer: 'An API is a way for one software system to request data or actions from another system. In this app, the frontend uses backend APIs for login, weather, marketplace listings, profile data, and AgriMate answers.'
 },
 {
 keys: ['agriculture', 'farming'],
 answer: 'Agriculture is the practice of growing crops, raising animals, and managing land to produce food, fiber, and income. Good farming depends on soil health, water, seeds, weather, pest control, and market timing.'
 },
 {
 keys: ['crop', 'crops'],
 answer: 'A crop is a plant grown by farmers for food, fodder, fiber, oil, or income. Crop success depends on choosing the right season, soil, seed variety, water supply, fertilizer plan, and pest management.'
 },
 {
 keys: ['farmer'],
 answer: 'A farmer is a person who grows crops, manages soil and water, raises animals, or produces agricultural goods. Farmers make decisions based on weather, land, input cost, labor, crop health, and market price.'
 },
 {
 keys: ['fertilizer', 'npk', 'nitrogen', 'phosphorus', 'potassium'],
 answer: 'Fertilizer supplies nutrients that crops need for growth. Nitrogen supports leafy growth, phosphorus supports roots and flowering, and potassium improves strength, quality, and stress tolerance. Use fertilizer based on crop stage and soil test when possible.'
 },
 {
 keys: ['urea'],
 answer: 'Urea is a nitrogen fertilizer. It helps leafy growth, but too much urea can make plants weak, increase pest/disease risk, and waste money. Apply it in split doses and avoid applying before heavy rain.'
 },
 {
 keys: ['dap'],
 answer: 'DAP is a fertilizer that supplies phosphorus and nitrogen. It is commonly used near sowing because phosphorus supports early root development. Avoid direct contact with seed if local guidance recommends spacing.'
 },
 {
 keys: ['pesticide', 'insecticide', 'fungicide'],
 answer: 'Pesticides control pests or diseases, but they should be used only after identifying the problem. Use the correct crop-specific product, follow the label dose, wear protection, and avoid spraying during strong wind or before rain.'
 },
 {
 keys: ['yellow leaves', 'leaf yellowing'],
 answer: 'Yellow leaves can happen due to nitrogen deficiency, waterlogging, drought stress, root damage, pests, disease, or natural aging. Check soil moisture first, then inspect roots and leaf undersides before applying fertilizer or spray.'
 },
 {
 keys: ['leaf spot', 'spots on leaves'],
 answer: 'Leaf spots are often caused by fungal or bacterial infection, but pests and nutrient issues can also look similar. Remove badly affected leaves, avoid overhead watering, improve airflow, and use the Disease Detection page with a clear leaf photo.'
 },
 {
 keys: ['waterlogging', 'standing water'],
 answer: 'Waterlogging means roots stay in too much water and cannot get enough oxygen. It can cause yellow leaves, root rot, weak growth, and disease. Improve drainage and avoid irrigation until the soil starts drying.'
 },
 {
 keys: ['mandi', 'market price'],
 answer: 'Mandi price is the crop trading rate in a market yard. It changes with supply, demand, crop quality, moisture, transport cost, season, and buyer competition. Compare nearby mandi rates before selling.'
 },
 {
 keys: ['profit', 'loss'],
 answer: 'Profit is income left after subtracting total cost. For crops, include seed, fertilizer, pesticide, labor, irrigation, transport, rent, and commission before deciding whether the selling price is good.'
 },
 {
 keys: ['wheat'],
 answer: 'Wheat is a cereal crop commonly grown in the rabi season. It needs cool weather during growth, timely irrigation, balanced nitrogen, and protection from rust and lodging for better yield.'
 },
 {
 keys: ['rice', 'paddy'],
 answer: 'Rice, also called paddy before milling, is a water-loving cereal crop. It needs suitable variety selection, nursery or direct seeding management, weed control, and careful water management.'
 },
 {
 keys: ['cotton'],
 answer: 'Cotton is a fiber crop that needs warm weather, good drainage, and careful pest monitoring. Sucking pests, bollworms, and nutrient stress can reduce yield, so regular field scouting is important.'
 },
 {
 keys: ['sugarcane'],
 answer: 'Sugarcane is a long-duration crop with high water and nutrient demand. Drip irrigation, trash mulching, timely earthing up, and balanced fertilizer help improve cane weight and sugar recovery.'
 },
 {
 keys: ['tomato'],
 answer: 'Tomato is a vegetable crop that needs good drainage, staking, balanced nutrients, and regular pest and disease checks. Leaf curl, blight, fruit borer, and calcium-related blossom end rot are common issues.'
 },
 {
 keys: ['onion'],
 answer: 'Onion needs well-drained soil, good nursery management, correct spacing, and careful irrigation. Too much water near maturity can reduce storage quality, while stress can affect bulb size.'
 },
 {
 keys: ['python'],
 answer: 'Python is a programming language used for websites, data analysis, automation, AI, and backend development. It is popular because the syntax is simple and many libraries are available.'
 },
 {
 keys: ['html'],
 answer: 'HTML is the structure of a web page. It defines headings, buttons, forms, links, images, and sections that the browser displays.'
 },
 {
 keys: ['css'],
 answer: 'CSS controls how a web page looks: colors, spacing, layout, fonts, responsiveness, animations, and visual states.'
 },
 {
 keys: ['javascript', 'js'],
 answer: 'JavaScript makes web pages interactive. It handles clicks, form validation, API calls, charts, chat behavior, language switching, and dynamic UI updates.'
 },
 {
 keys: ['flask'],
 answer: 'Flask is a Python web framework used to build backend APIs and serve web apps. In this project it handles login, profile, weather, marketplace, and assistant routes.'
 },
 {
 keys: ['database', 'sql'],
 answer: 'A database stores app information in an organized way. This project uses it for users, profiles, marketplace listings, and other backend data.'
 },
 {
 keys: ['capital of india', 'india capital'],
 answer: 'The capital of India is New Delhi.'
 },
 {
 keys: ['capital of maharashtra', 'maharashtra capital'],
 answer: 'The capital of Maharashtra is Mumbai.'
 }
];

let chatRecognition = null;
let chatIsListening = false;
let chatVoiceDraftText = '';
let chatVoiceFinalText = '';
let chatVoiceSubmitted = false;
let activeAssistantSpeechButton = null;
let activeAssistantSpeechText = '';
let assistantConversationHistory = [];
const ASSISTANT_WEATHER_INTENT_TIMEOUT_MS = 1800;
const ASSISTANT_WEATHER_TIMEOUT_MS = 6000;
const ASSISTANT_MARKET_TIMEOUT_MS = 3500;
const ASSISTANT_LLM_TIMEOUT_MS = 12000;

function initChatbotAssistant() {
 const panel = document.getElementById('chatbotPanel');
 const body = document.getElementById('chatbotBody');
 const inputWrap = panel?.querySelector('.chatbot-input');
 const input = document.getElementById('chatInput');
 if (!panel ||!body ||!inputWrap ||!input || panel.dataset.enhanced === 'true') return;

 panel.dataset.enhanced = 'true';
 input.setAttribute('autocomplete', 'off');

 const headerText = panel.querySelector('.chatbot-header span');
 if (headerText) headerText.textContent = 'Ask anything or use voice';
 enhanceExistingBotMessages();

 const tools = document.createElement('div');
 tools.className = 'chatbot-quick-actions';
 tools.innerHTML = assistantQuickActions.map(item => (
 `<button type="button" class="chat-suggestion" data-prompt="${escapeHtml(item.prompt)}">${escapeHtml(item.label)}</button>`
 )).join('');
 body.appendChild(tools);
 tools.querySelectorAll('.chat-suggestion').forEach(button => {
 button.addEventListener('click', () => askAssistant(button.dataset.prompt || button.textContent));
 });

 const sendButton = inputWrap.querySelector('button[onclick*="sendChat"]') || inputWrap.querySelector('button:last-child');
 if (sendButton) {
 sendButton.classList.add('chat-send-btn');
 sendButton.setAttribute('title', 'Send');
 }

 const micButton = document.createElement('button');
 micButton.type = 'button';
 micButton.className = 'chatbot-mic';
 micButton.id = 'chatVoiceBtn';
 micButton.title = 'Voice input';
 micButton.setAttribute('aria-label', 'Start voice input');
 micButton.innerHTML = '<i class="fas fa-microphone"></i>';
 micButton.addEventListener('click', toggleVoiceInput);
 inputWrap.insertBefore(micButton, sendButton || null);

 if (!getSpeechRecognitionConstructor()) {
 micButton.classList.add('is-disabled');
 micButton.disabled = true;
 micButton.title = 'Voice input is not supported in this browser';
 micButton.setAttribute('aria-label', 'Voice input is not supported in this browser');
 }
}

function askAssistant(prompt) {
 const input = document.getElementById('chatInput');
 if (!input) return;
 input.value = prompt;
 sendChat();
}

function appendChatMessage(text, role, extraClass = '') {
 const body = document.getElementById('chatbotBody');
 if (!body) return null;
 const message = document.createElement('div');
 message.className = `chat-msg ${role} ${extraClass}`.trim();
 if (role === 'bot' &&!extraClass.includes('chat-typing')) {
 renderBotMessageContent(message, text);
 } else {
 message.textContent = text;
 }
 body.appendChild(message);
 body.scrollTop = body.scrollHeight;
 return message;
}

function renderBotMessageContent(message, text) {
 const readableText = String(text || '').trim();
 const textSpan = document.createElement('span');
 textSpan.className = 'chat-msg-text';
 textSpan.textContent = readableText;

 message.textContent = '';
 message.appendChild(textSpan);

 const speechButton = document.createElement('button');
 speechButton.type = 'button';
 speechButton.className = 'chat-speak-btn';
 speechButton.title = 'Read answer aloud';
 speechButton.setAttribute('aria-label', 'Read answer aloud');
 speechButton.innerHTML = '<i class="fas fa-volume-up"></i>';
 speechButton.addEventListener('click', () => speakAssistantMessage(readableText, speechButton));
 message.appendChild(speechButton);
}

function enhanceExistingBotMessages() {
 document.querySelectorAll('.chat-msg.bot:not(.chat-typing)').forEach(message => {
 if (message.querySelector('.chat-speak-btn')) return;
 const text = message.textContent;
 renderBotMessageContent(message, text);
 });
}

function getAssistantSpeechVoice(lang) {
 const voices = window.speechSynthesis?.getVoices?.() || [];
 const language = String(lang || 'en-IN').toLowerCase();
 const baseLanguage = language.split('-')[0];
 return voices.find(voice => voice.lang.toLowerCase() === language)
 || voices.find(voice => voice.lang.toLowerCase().startsWith(`${baseLanguage}-`))
 || voices.find(voice => voice.lang.toLowerCase().startsWith('en-'))
 || voices[0]
 || null;
}

function cleanAssistantSpeechText(text) {
 return String(text || '').replace(/https?:\/\/\S+/g, ' ').replace(/[`*_#>~-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function detectAssistantSpeechLang(text) {
 const content = String(text || '');
 if (/[\u0A00-\u0A7F]/.test(content)) return 'pa-IN';
 if (/[\u0B80-\u0BFF]/.test(content)) return 'ta-IN';
 if (/[\u0C00-\u0C7F]/.test(content)) return 'te-IN';
 if (/[\u0900-\u097F]/.test(content)) return currentLang === 'mr'? 'mr-IN': 'hi-IN';
 return getAssistantVoiceLang();
}

function resetAssistantSpeechButton(button) {
 if (!button) return;
 button.classList.remove('speaking');
 button.title = 'Read answer aloud';
 button.setAttribute('aria-label', 'Read answer aloud');
 button.innerHTML = '<i class="fas fa-volume-up"></i>';
}

function resetActiveAssistantSpeech() {
 resetAssistantSpeechButton(activeAssistantSpeechButton);
 activeAssistantSpeechButton = null;
 activeAssistantSpeechText = '';
}

function speakAssistantMessage(text, button) {
 if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
 appendChatMessage('Speaker is not supported in this browser. Please use Chrome or Edge.', 'bot');
 return;
 }

 const speechText = cleanAssistantSpeechText(text);
 if (!speechText) return;

 if (activeAssistantSpeechButton === button && activeAssistantSpeechText === speechText && window.speechSynthesis.speaking) {
 window.speechSynthesis.cancel();
 resetActiveAssistantSpeech();
 return;
 }

 window.speechSynthesis.cancel();
 resetActiveAssistantSpeech();

 const utterance = new SpeechSynthesisUtterance(speechText);
 utterance.lang = detectAssistantSpeechLang(speechText);
 utterance.rate = 0.92;
 utterance.pitch = 1;
 const voice = getAssistantSpeechVoice(utterance.lang);
 if (voice) utterance.voice = voice;

 activeAssistantSpeechButton = button;
 activeAssistantSpeechText = speechText;
 button.classList.add('speaking');
 button.title = 'Stop reading';
 button.setAttribute('aria-label', 'Stop reading');
 button.innerHTML = '<i class="fas fa-stop"></i>';

 utterance.onend = resetActiveAssistantSpeech;
 utterance.onerror = resetActiveAssistantSpeech;
 window.speechSynthesis.speak(utterance);
}

function showAssistantTyping() {
 const body = document.getElementById('chatbotBody');
 if (!body) return null;
 const typing = document.createElement('div');
 typing.className = 'chat-msg bot chat-typing';
 typing.innerHTML = '<span></span><span></span><span></span>';
 body.appendChild(typing);
 body.scrollTop = body.scrollHeight;
 return typing;
}

function normalizeAssistantText(value) {
 return String(value || '').trim().toLowerCase();
}

function includesAny(text, words) {
 return words.some(word => text.includes(word));
}

const assistantWeatherKeywords = [
 'weather', 'forecast', 'temperature', 'temp', 'humidity', 'rain', 'raining', 'climate',
 'mausam', 'mosam', 'barish', 'baarish', 'varsha', 'tapman', 'taapman', 'garmi',
 'havaman', 'paus', 'pavs', 'pavus', 'meeh', 'mazhai', 'malai', 'varsham',
 'मौसम', 'बारिश', 'वर्षा', 'तापमान', 'हवा', 'नमी',
 'हवामान', 'पाऊस', 'पाउस', 'तापमान',
 'ਮੌਸਮ', 'ਮੀਂਹ', 'ਬਰਸਾਤ', 'ਤਾਪਮਾਨ', 'ਨਮੀ',
 'வானிலை', 'மழை', 'வெப்பநிலை', 'ஈரப்பதம்', 'காற்று',
 'వాతావరణం', 'వర్షం', 'ఉష్ణోగ్రత', 'తేమ', 'గాలి',
 'àª¹àªµàª¾àª®àª¾àª¨', 'àªµàª°àª¸àª¾àª¦', 'àª¤àª¾àªªàª®àª¾àª¨', 'àª­à«‡àªœ',
 'à²¹à²µà²¾à²®à²¾à²¨', 'à²®à²³à³†', 'à²¤à²¾à²ªà²®à²¾à²¨', 'à²†à²°à³à²¦à³à²°à²¤à³†',
 'à´•à´¾à´²à´¾à´µà´¸àµà´¥', 'à´®à´´', 'à´¤à´¾à´ªà´¨à´¿à´²', 'à´ˆàµ¼à´ªàµà´ªà´‚',
 'à¦†à¦¬à¦¹à¦¾à¦“à¦¯à¦¼à¦¾', 'à¦¬à§ƒà¦·à§à¦Ÿà¦¿', 'à¦¤à¦¾à¦ªà¦®à¦¾à¦¤à§à¦°à¦¾', 'à¦†à¦°à§à¦¦à§à¦°à¦¤à¦¾',
 'à¬ªà¬¾à¬£à¬¿à¬ªà¬¾à¬—', 'à¬¬à¬°à­à¬·à¬¾', 'à¬¤à¬¾à¬ªà¬®à¬¾à¬¤à­à¬°à¬¾',
 'Ù…ÙˆØ³Ù…', 'Ø¨Ø§Ø±Ø´', 'Ø¯Ø±Ø¬Û Ø­Ø±Ø§Ø±Øª', 'Ø§Ù„Ø·Ù‚Ø³', 'Ø¯Ø±Ø¬Ø© Ø§Ù„Ø­Ø±Ø§Ø±Ø©', 'Ø§Ù„Ù…Ø·Ø±', 'Ø§Ù„Ø±Ø·ÙˆØ¨Ø©',
 'å¤©æ°”', 'å¤©æ°£', 'å¤©æ°—', 'ë‚ ì”¨',
 'Ð¿Ð¾Ð³Ð¾Ð´Ð°', 'Ð´Ð¾Ð¶Ð´ÑŒ', 'Ñ‚ÐµÐ¼Ð¿ÐµÑ€Ð°Ñ‚ÑƒÑ€Ð°',
 'clima', 'tiempo', 'wetter', 'tempo', 'pogoda', 'cuaca', 'hava'
];

const assistantWeatherCityAliases = [
 { city: 'Pune', keys: ['pune', 'poona', 'पुणे', 'पुने', 'ਪੁਨੇ', 'புனே', 'పుణె'] },
 { city: 'Mumbai', keys: ['mumbai', 'bombay', 'मुंबई', 'ਮੁੰਬਈ', 'மும்பை', 'ముంబై'] },
 { city: 'Delhi', keys: ['delhi', 'नई दिल्ली', 'दिल्ली', 'ਦਿੱਲੀ', 'டெல்லி', 'ఢిల్లీ'] },
 { city: 'Nashik', keys: ['nashik', 'nasik', 'नाशिक', 'ਨਾਸਿਕ', 'நாசிக்', 'నాసిక్'] },
 { city: 'Nagpur', keys: ['nagpur', 'नागपुर', 'ਨਾਗਪੁਰ', 'நாக்பூர்', 'నాగ్‌పూర్'] },
 { city: 'Bengaluru', keys: ['bengaluru', 'bangalore', 'बेंगलुरु', 'बैंगलोर', 'ਬੈਂਗਲੁਰੂ', 'பெங்களூரு', 'బెంగళూరు'] },
 { city: 'Hyderabad', keys: ['hyderabad', 'हैदराबाद', 'ਹੈਦਰਾਬਾਦ', 'ஹைதராபாத்', 'హైదరాబాద్'] },
 { city: 'Chennai', keys: ['chennai', 'चेन्नई', 'ਚੇਨਈ', 'சென்னை', 'చెన్నై'] },
 { city: 'Kolkata', keys: ['kolkata', 'calcutta', 'कोलकाता', 'ਕੋਲਕਾਤਾ', 'கொல்கத்தா', 'కోల్‌కతా'] },
 { city: 'Solapur', keys: ['solapur', 'सोलापूर', 'सोलापुर', 'ਸੋਲਾਪੁਰ', 'சோலாப்பூர்', 'సోలాపూర్'] },
 { city: 'Kolhapur', keys: ['kolhapur', 'कोल्हापूर', 'कोल्हापुर', 'ਕੋਲਹਾਪੁਰ', 'கோலாப்பூர்', 'కొల్హాపూర్'] },
 { city: 'Satara', keys: ['satara', 'सातारा', 'ਸਤਾਰਾ', 'சதாரா', 'సతారా'] },
 { city: 'Sangli', keys: ['sangli', 'सांगली', 'ਸਾਂਗਲੀ', 'சாங்க்லி', 'సాంగ్లీ'] },
 { city: 'Ahmednagar', keys: ['ahmednagar', 'अहमदनगर', 'ਅਹਿਮਦਨਗਰ', 'அகமத்நகர்', 'అహ్మద్‌నగర్'] }
];

function isLocalWeatherPrompt(message) {
 const text = normalizeAssistantText(message);
 return includesAny(text, assistantWeatherKeywords);
}

function shouldUseLlmWeatherIntent(message) {
 const text = String(message || '').trim();
 if (!text || text.length > 260 || isLocalWeatherPrompt(text)) return false;
 return /[^\x00-\x7F]/.test(text) || includesAny(normalizeAssistantText(text), ['clima', 'tiempo', 'wetter', 'tempo', 'pogoda', 'cuaca', 'hava']);
}

async function detectAssistantWeatherIntent(message) {
 if (isLocalWeatherPrompt(message)) {
 return { isWeather: true, city: '', language: detectAssistantMessageLang(message), source: 'local' };
 }

 if (!shouldUseLlmWeatherIntent(message)) {
 return { isWeather: false, city: '', language: detectAssistantMessageLang(message), source: 'local' };
 }

 try {
 const data = await apiFetchWithTimeout('/assistant/weather-intent', {
 method: 'POST',
 body: JSON.stringify({ message })
 }, ASSISTANT_WEATHER_INTENT_TIMEOUT_MS);
 return {
 isWeather: Boolean(data?.is_weather && Number(data.confidence || 0) >= 0.45),
 city: String(data?.city || '').trim(),
 language: String(data?.language || '').trim() || detectAssistantMessageLang(message),
 source: data?.source || 'llm'
 };
 } catch (err) {
 console.warn('Weather intent detection failed:', err);
 return { isWeather: false, city: '', language: detectAssistantMessageLang(message), source: 'fallback' };
 }
}

function detectAssistantMessageLang(text) {
 const value = String(text || '');
 const lowered = value.toLowerCase();
 if (/[\u0A00-\u0A7F]/.test(value)) return 'pa';
 if (/[\u0B80-\u0BFF]/.test(value)) return 'ta';
 if (/[\u0C00-\u0C7F]/.test(value)) return 'te';
 if (/[\u0900-\u097F]/.test(value)) {
 return includesAny(lowered, ['हवामान', 'पाऊस', 'पाउस', 'मध्ये', 'आजचे']) || currentLang === 'mr'? 'mr': 'hi';
 }
 if (includesAny(lowered, ['havaman', 'paus', 'pavus'])) return 'mr';
 if (includesAny(lowered, ['mausam', 'mosam', 'barish', 'baarish', 'tapman'])) return 'hi';
 return currentLang || 'en';
}

function getSpeechRecognitionConstructor() {
 return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function getAssistantVoiceLang() {
 const langs = {
 hi: 'hi-IN',
 mr: 'mr-IN',
 pa: 'pa-IN',
 ta: 'ta-IN',
 te: 'te-IN',
 en: 'en-IN'
 };
 return langs[currentLang] || 'en-IN';
}

function setVoiceListeningState(isListening) {
 chatIsListening = isListening;
 const button = document.getElementById('chatVoiceBtn');
 const input = document.getElementById('chatInput');
 if (button) {
 button.classList.toggle('listening', isListening);
 button.innerHTML = isListening? '<i class="fas fa-stop"></i>': '<i class="fas fa-microphone"></i>';
 button.setAttribute('aria-label', isListening? 'Stop voice input': 'Start voice input');
 }
 if (input) {
 input.placeholder = isListening? 'Listening...': (input.dataset.originalPlaceholder || input.placeholder || 'Type your question...');
 }
}

function submitAssistantVoiceTranscript(rawTranscript) {
 const transcript = String(rawTranscript || '').replace(/\s+/g, ' ').trim();
 const input = document.getElementById('chatInput');
 if (!transcript ||!input || chatVoiceSubmitted) return;

 chatVoiceSubmitted = true;
 setVoiceListeningState(false);
 input.value = transcript;
 setTimeout(sendChat, 80);
}

function toggleVoiceInput() {
 const Recognition = getSpeechRecognitionConstructor();
 if (!Recognition) {
 appendChatMessage('Voice input is not supported in this browser. Use Chrome or Edge, or type your question.', 'bot');
 return;
 }

 if (chatRecognition && chatIsListening) {
 chatRecognition.stop();
 return;
 }

 const input = document.getElementById('chatInput');
 if (input &&!input.dataset.originalPlaceholder) {
 input.dataset.originalPlaceholder = input.placeholder || 'Type your question...';
 }

 chatVoiceDraftText = '';
 chatVoiceFinalText = '';
 chatVoiceSubmitted = false;
 chatRecognition = new Recognition();
 chatRecognition.lang = getAssistantVoiceLang();
 chatRecognition.interimResults = true;
 chatRecognition.continuous = false;

 chatRecognition.onstart = () => setVoiceListeningState(true);
 chatRecognition.onerror = event => {
 setVoiceListeningState(false);
 if (!chatVoiceDraftText.trim() &&!chatVoiceFinalText.trim()) {
 appendChatMessage(`Voice input stopped: ${event.error || 'could not hear clearly'}.`, 'bot');
 }
 };
 chatRecognition.onend = () => {
 setVoiceListeningState(false);
 if (!chatVoiceSubmitted) {
 submitAssistantVoiceTranscript(chatVoiceFinalText || chatVoiceDraftText);
 }
 chatRecognition = null;
 };
 chatRecognition.onresult = event => {
 let finalText = '';
 let interimText = '';
 for (let i = 0; i < event.results.length; i += 1) {
 const transcript = event.results[i][0].transcript;
 if (event.results[i].isFinal) finalText += `${transcript} `;
 else interimText += `${transcript} `;
 }
 chatVoiceFinalText = finalText.trim();
 chatVoiceDraftText = (chatVoiceFinalText || interimText).trim();
 if (input) input.value = chatVoiceDraftText;
 if (chatVoiceFinalText) {
 submitAssistantVoiceTranscript(chatVoiceFinalText);
 }
 };

 try {
 chatRecognition.start();
 } catch (err) {
 setVoiceListeningState(false);
 appendChatMessage('Voice input could not start. Please allow microphone permission and try again.', 'bot');
 }
}

function getAssistantCommand(message) {
 const text = normalizeAssistantText(message);
 const wantsNavigation = includesAny(text, ['open', 'go to', 'show', 'take me', 'navigate']);
 if (!wantsNavigation &&!includesAny(text, ['list crop', 'sell crop'])) return null;

 const commandMap = [
 { keys: ['marketplace', 'buy crop', 'sell crop', 'list crop'], page: 'marketplace.html', label: 'Marketplace' },
 { keys: ['disease', 'leaf scan', 'detect disease'], page: 'disease-detection.html', label: 'Disease Detection' },
 { keys: ['market price', 'prices', 'mandi'], page: 'market-prices.html', label: 'Market Prices' },
 { keys: ['resource', 'water', 'fertilizer', 'irrigation'], page: 'resource-management.html', label: 'Resource Management' },
 { keys: ['profile', 'account'], page: 'profile.html', label: 'Profile' },
 { keys: ['dashboard', 'home'], page: 'dashboard.html', label: 'Dashboard' }
 ];

 const matched = commandMap.find(item => includesAny(text, item.keys));
 if (!matched) return null;

 const action = () => {
 if (matched.page === 'marketplace.html' && includesAny(text, ['list crop', 'sell crop']) && typeof openListingModal === 'function' && location.pathname.endsWith('/marketplace.html')) {
 openListingModal();
 return;
 }
 window.location.href = matched.page;
 };

 return {
 text: `Opening ${matched.label}.`,
 action
 };
}

function isDashboardPage() {
 return (window.location.pathname.split('/').pop() || '').toLowerCase() === 'dashboard.html';
}

function focusDashboardWeatherWidget() {
 const widget = document.getElementById('weatherWidget');
 if (!widget) return;
 widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
 widget.classList.add('weather-widget-focus');
 window.setTimeout(() => widget.classList.remove('weather-widget-focus'), 2200);
 if (typeof fetchWeather === 'function') fetchWeather();
}

function trySolveSimpleMath(message) {
 let text = String(message || '').toLowerCase();
 text = text
 .replace(/\b(what is|calculate|solve|answer|equals|equal to|please|can you)\b/g, ' ')
 .replace(/\bplus\b/g, '+')
 .replace(/\bminus\b/g, '-')
 .replace(/\bmultiplied by\b/g, '*')
 .replace(/\btimes\b/g, '*')
 .replace(/\binto\b/g, '*')
 .replace(/\bdivided by\b/g, '/')
 .replace(/\bover\b/g, '/')
 .replace(/[=?]/g, ' ')
 .trim();
 const expressionMatch = text.match(/[-+]?[\d.]+(?:\s*(?:[+\-*/%])\s*[-+]?[\d.]+)+/);
 const expression = expressionMatch? expressionMatch[0]: text;
 if (!/[+\-*/%]/.test(expression) ||!/^[\d\s+\-*/().%]+$/.test(expression)) return null;
 try {
 const result = Function(`"use strict"; return (${expression});`)();
 return Number.isFinite(result)? `The answer is ${result}.`: null;
 } catch (err) {
 return null;
 }
}

function getStoredAssistantUserName() {
 const user = getStoredUser() || {};
 const firstName = user.first_name || user.firstName || '';
 const lastName = user.last_name || user.lastName || '';
 return `${firstName} ${lastName}`.trim() || user.username || '';
}

function buildPersonalAssistantAnswer(message) {
 const text = normalizeAssistantText(message);
 if (!includesAny(text, ['my name', 'who am i', 'profile name'])) return null;
 const name = getStoredAssistantUserName();
 return name? `Your name is ${name}.`: 'I cannot see your saved name yet. Please log in again or update your name on the Profile page.';
}

function extractKnownWeatherCity(message) {
 const text = normalizeAssistantText(message);
 const matched = assistantWeatherCityAliases.find(item =>
 item.keys.some(key => text.includes(key.toLowerCase()))
 );
 return matched?.city || '';
}

function cleanWeatherCityCandidate(value) {
 return String(value || '').replace(/\b(weather|forecast|temperature|temp|humidity|rain|raining|climate|today|todays|current|live|now|tomorrow|mausam|mosam|barish|baarish|varsha|tapman|taapman|havaman|paus|pavs|pavus)\b/gi, ' ').replace(/\b(in|for|at|of|ka|ki|ke|mein|me|please|show|tell|what|is|the|about)\b/gi, ' ').replace(/[?.!,;:]/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractWeatherCity(message, intent = {}) {
 if (intent?.city) return intent.city;

 const knownCity = extractKnownWeatherCity(message);
 if (knownCity) return knownCity;

 const text = String(message || '');
 const patterns = [
 /(?:weather|forecast|temperature|humidity|rain)\s+(?:in|for|at)\s+([a-zA-Z\s]+?)(?:\s+(?:today|now|current|live|tomorrow))?$/i,
 /(?:in|for|at)\s+([a-zA-Z\s]+?)\s+(?:weather|forecast|temperature|humidity|rain)/i,
 /([a-zA-Z\s]+?)\s+(?:weather|forecast|temperature|humidity|rain|mausam|mosam|barish|baarish|tapman|havaman|paus|pavus)$/i,
 /(?:mausam|mosam|barish|baarish|tapman|havaman|paus|pavus)\s+(?:in|for|at|ka|ki|ke|mein|me)?\s*([a-zA-Z\s]+)$/i
 ];
 for (const pattern of patterns) {
 const match = text.match(pattern);
 if (match) {
 const city = cleanWeatherCityCandidate(match[1]);
 if (city) return city;
 }
 }
 const cityInput = document.getElementById('weatherCityInput')?.value?.trim();
 const user = getStoredUser() || {};
 return cityInput || user.district || user.village || user.state || 'Pune';
}

function formatAssistantTemp(value) {
 const numberValue = Number(value);
 return Number.isFinite(numberValue)? `${Math.round(numberValue)} C`: '--';
}

function titleCaseWeather(text) {
 return String(text || 'Weather unavailable').replace(/\b\w/g, char => char.toUpperCase());
}

const weatherAnswerCopy = {
 en: {
 weatherFor: 'Weather for',
 temperature: 'Temperature',
 condition: 'Condition',
 humidity: 'Humidity',
 wind: 'Wind',
 visibility: 'Visibility',
 pressure: 'Pressure',
 aqi: 'AQI',
 forecast: '3-day forecast',
 today: 'Today',
 unavailable: 'Forecast unavailable',
 error: city => `I could not fetch live weather for ${city} right now. Try again in a minute or check the Dashboard weather widget.`,
 tips: {
 rain: 'Farm tip: Rain is expected/detected. Delay irrigation, avoid spraying, and protect harvested crops.',
 heat: 'Farm tip: High heat. Irrigate early morning/evening and check crop moisture stress.',
 humidity: 'Farm tip: High humidity can increase disease risk. Keep airflow good and inspect leaves.',
 normal: 'Farm tip: Conditions look manageable. Continue normal irrigation and monitor soil moisture.'
 }
 },
 hi: {
 weatherFor: 'मौसम',
 temperature: 'तापमान',
 condition: 'स्थिति',
 humidity: 'नमी',
 wind: 'हवा',
 visibility: 'दृश्यता',
 pressure: 'दबाव',
 aqi: 'AQI',
 forecast: '3 दिन का पूर्वानुमान',
 today: 'आज',
 unavailable: 'पूर्वानुमान उपलब्ध नहीं',
 error: city => `अभी ${city} का लाइव मौसम नहीं मिल पा रहा है। एक मिनट बाद दोबारा कोशिश करें या Dashboard weather widget देखें।`,
 tips: {
 rain: 'किसान सलाह: बारिश दिख रही है/संभावना है। सिंचाई रोकें, छिड़काव न करें और कटी फसल सुरक्षित रखें।',
 heat: 'किसान सलाह: गर्मी ज्यादा है। सुबह जल्दी या शाम को सिंचाई करें और फसल में पानी की कमी जांचें।',
 humidity: 'किसान सलाह: नमी ज्यादा है, रोग का खतरा बढ़ सकता है। पत्तियों की जांच करें और हवा का प्रवाह रखें।',
 normal: 'किसान सलाह: मौसम सामान्य है। नियमित सिंचाई जारी रखें और मिट्टी की नमी देखते रहें।'
 }
 },
 mr: {
 weatherFor: 'हवामान',
 temperature: 'तापमान',
 condition: 'स्थिती',
 humidity: 'आर्द्रता',
 wind: 'वारा',
 visibility: 'दृश्यता',
 pressure: 'दाब',
 aqi: 'AQI',
 forecast: '3 दिवसांचा अंदाज',
 today: 'आज',
 unavailable: 'अंदाज उपलब्ध नाही',
 error: city => `सध्या ${city} चे लाईव्ह हवामान मिळत नाही. थोड्या वेळाने पुन्हा प्रयत्न करा किंवा Dashboard weather widget पहा.`,
 tips: {
 rain: 'शेतकरी सल्ला: पाऊस दिसतो/शक्यता आहे. सिंचन थांबवा, फवारणी टाळा आणि काढलेले पीक सुरक्षित ठेवा.',
 heat: 'शेतकरी सल्ला: उष्णता जास्त आहे. सकाळी लवकर किंवा संध्याकाळी पाणी द्या आणि पिकातील ताण तपासा.',
 humidity: 'शेतकरी सल्ला: आर्द्रता जास्त असल्याने रोगाचा धोका वाढू शकतो. पाने तपासा आणि हवा खेळती ठेवा.',
 normal: 'शेतकरी सल्ला: हवामान ठीक आहे. नियमित सिंचन सुरू ठेवा आणि जमिनीतील ओलावा तपासा.'
 }
 },
 pa: {
 weatherFor: 'ਮੌਸਮ',
 temperature: 'ਤਾਪਮਾਨ',
 condition: 'ਹਾਲਤ',
 humidity: 'ਨਮੀ',
 wind: 'ਹਵਾ',
 visibility: 'ਦਿੱਖ',
 pressure: 'ਦਬਾਅ',
 aqi: 'AQI',
 forecast: '3 ਦਿਨਾਂ ਦੀ ਭਵਿੱਖਬਾਣੀ',
 today: 'ਅੱਜ',
 unavailable: 'ਭਵਿੱਖਬਾਣੀ ਉਪਲਬਧ ਨਹੀਂ',
 error: city => `ਇਸ ਵੇਲੇ ${city} ਦਾ ਲਾਈਵ ਮੌਸਮ ਨਹੀਂ ਮਿਲ ਰਿਹਾ। ਕੁਝ ਸਮੇਂ ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ ਜਾਂ Dashboard weather widget ਵੇਖੋ।`,
 tips: {
 rain: 'ਕਿਸਾਨ ਸਲਾਹ: ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ/ਮੀਂਹ ਹੈ। ਸਿੰਚਾਈ ਰੋਕੋ, ਛਿੜਕਾਅ ਤੋਂ ਬਚੋ ਅਤੇ ਕੱਟੀ ਫਸਲ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।',
 heat: 'ਕਿਸਾਨ ਸਲਾਹ: ਗਰਮੀ ਵੱਧ ਹੈ। ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਸਿੰਚਾਈ ਕਰੋ ਅਤੇ ਫਸਲ ਦੀ ਨਮੀ ਜਾਂਚੋ।',
 humidity: 'ਕਿਸਾਨ ਸਲਾਹ: ਨਮੀ ਵੱਧ ਹੈ, ਰੋਗ ਦਾ ਖਤਰਾ ਵੱਧ ਸਕਦਾ ਹੈ। ਪੱਤਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਹਵਾ ਆਉਣ ਦਿਓ।',
 normal: 'ਕਿਸਾਨ ਸਲਾਹ: ਹਾਲਾਤ ਠੀਕ ਹਨ। ਨਿਯਮਿਤ ਸਿੰਚਾਈ ਜਾਰੀ ਰੱਖੋ ਅਤੇ ਮਿੱਟੀ ਦੀ ਨਮੀ ਦੇਖੋ।'
 }
 },
 ta: {
 weatherFor: 'வானிலை',
 temperature: 'வெப்பநிலை',
 condition: 'நிலை',
 humidity: 'ஈரப்பதம்',
 wind: 'காற்று',
 visibility: 'தெளிவு',
 pressure: 'அழுத்தம்',
 aqi: 'AQI',
 forecast: '3 நாள் முன்னறிவிப்பு',
 today: 'இன்று',
 unavailable: 'முன்னறிவிப்பு கிடைக்கவில்லை',
 error: city => `${city}க்கான நேரடி வானிலை இப்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும் அல்லது Dashboard weather widget பார்க்கவும்.`,
 tips: {
 rain: 'விவசாய ஆலோசனை: மழை உள்ளது/வாய்ப்பு உள்ளது. பாசனத்தை நிறுத்தவும், தெளிப்பை தவிர்க்கவும், அறுவடை பயிரை பாதுகாக்கவும்.',
 heat: 'விவசாய ஆலோசனை: வெப்பம் அதிகம். அதிகாலை அல்லது மாலை பாசனம் செய்யவும், பயிர் ஈரப்பதத்தை பார்க்கவும்.',
 humidity: 'விவசாய ஆலோசனை: ஈரப்பதம் அதிகம்; நோய் அபாயம் அதிகரிக்கலாம். இலைகளை சரிபார்த்து காற்றோட்டம் வைத்திருக்கவும்.',
 normal: 'விவசாய ஆலோசனை: நிலைமை சரியாக உள்ளது. வழக்கமான பாசனத்தை தொடரவும், மண் ஈரப்பதத்தை கண்காணிக்கவும்.'
 }
 },
 te: {
 weatherFor: 'వాతావరణం',
 temperature: 'ఉష్ణోగ్రత',
 condition: 'స్థితి',
 humidity: 'తేమ',
 wind: 'గాలి',
 visibility: 'దృశ్యమానత',
 pressure: 'పీడనం',
 aqi: 'AQI',
 forecast: '3 రోజుల అంచనా',
 today: 'ఈ రోజు',
 unavailable: 'అంచనా అందుబాటులో లేదు',
 error: city => `ప్రస్తుతం ${city} లైవ్ వాతావరణం అందుబాటులో లేదు. కొద్దిసేపటి తర్వాత మళ్లీ ప్రయత్నించండి లేదా Dashboard weather widget చూడండి.`,
 tips: {
 rain: 'రైతు సూచన: వర్షం ఉంది/అవకాశం ఉంది. నీటిపారుదల వాయిదా వేయండి, పిచికారీ చేయొద్దు, కోసిన పంటను రక్షించండి.',
 heat: 'రైతు సూచన: వేడి ఎక్కువగా ఉంది. తెల్లవారుజామున లేదా సాయంత్రం నీరు పెట్టండి, పంట తేమను పరిశీలించండి.',
 humidity: 'రైతు సూచన: తేమ ఎక్కువగా ఉంది; వ్యాధి ప్రమాదం పెరగవచ్చు. ఆకులను పరిశీలించి గాలి ప్రసరణ ఉండేలా చూడండి.',
 normal: 'రైతు సూచన: పరిస్థితులు బాగున్నాయి. సాధారణ నీటిపారుదల కొనసాగించండి, నేల తేమను గమనించండి.'
 }
 }
};

function getWeatherCopy(lang) {
 const normalized = String(lang || '').toLowerCase().split('-')[0];
 return weatherAnswerCopy[normalized] || weatherAnswerCopy.en;
}

function getWeatherAdviceType(weatherData) {
 const condition = normalizeAssistantText(weatherData.condition);
 const temp = Number(weatherData.temperature);
 const humidity = Number(weatherData.humidity);

 if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) {
 return 'rain';
 }
 if (Number.isFinite(temp) && temp >= 34) {
 return 'heat';
 }
 if (Number.isFinite(humidity) && humidity >= 80) {
 return 'humidity';
 }
 return 'normal';
}

function buildWeatherFarmAdvice(weatherData, lang = 'en') {
 const copy = getWeatherCopy(lang);
 return copy.tips[getWeatherAdviceType(weatherData)] || weatherAnswerCopy.en.tips.normal;
}

function buildWeatherFacts(data, city) {
 const forecast = Array.isArray(data.forecast)? data.forecast.slice(0, 3): [];
 return {
 location: data.location || city,
 temperature_c: Number.isFinite(Number(data.temperature))? Math.round(Number(data.temperature)): null,
 condition: titleCaseWeather(data.condition),
 humidity_percent: data.humidity?? null,
 wind_kph: Number.isFinite(Number(data.wind_kph))? Number(Number(data.wind_kph).toFixed(1)): null,
 visibility_km: Number.isFinite(Number(data.visibility_km))? Number(Number(data.visibility_km).toFixed(1)): null,
 pressure_mb: data.pressure_mb?? null,
 aqi: getAqiLabel(data.aqi),
 forecast: forecast.map((item, index) => ({
 day: index === 0? 'Today': new Date(item.date || Date.now()).toLocaleDateString('en-IN', { weekday: 'short' }),
 temperature_c: Number.isFinite(Number(item.temp))? Math.round(Number(item.temp)): null,
 condition: titleCaseWeather(item.condition)
 })),
 advice_type: getWeatherAdviceType(data),
 farm_tip: buildWeatherFarmAdvice(data)
 };
}

function buildWeatherFallbackAnswer(facts, lang = 'en') {
 const copy = getWeatherCopy(lang);
 const forecastText = facts.forecast.length? facts.forecast.map(item => `${item.day === 'Today'? copy.today: item.day}: ${item.temperature_c?? '--'} C, ${item.condition}`).join('\n'): copy.unavailable;

 return [
 `${copy.weatherFor}: ${facts.location}`,
 `${copy.temperature}: ${facts.temperature_c?? '--'} C`,
 `${copy.condition}: ${facts.condition}`,
 `${copy.humidity}: ${facts.humidity_percent?? '--'}%`,
 `${copy.wind}: ${facts.wind_kph?? '--'} km/h`,
 `${copy.visibility}: ${facts.visibility_km?? '--'} km`,
 `${copy.pressure}: ${facts.pressure_mb?? '--'} mb`,
 `${copy.aqi}: ${facts.aqi}`,
 '',
 `${copy.forecast}:\n${forecastText}`,
 '',
 copy.tips[facts.advice_type] || facts.farm_tip
 ].join('\n');
}

async function localizeWeatherAnswer(message, facts, fallbackAnswer) {
 try {
 const prompt = [
 'The user asked this weather question:',
 message,
 '',
 'Use only these live weather facts:',
 JSON.stringify(facts, null, 2),
 '',
 'Reply in the same language and script as the user question. If the user uses romanized Hindi/Marathi/etc., reply in the same romanized style.',
 'Include temperature, condition, humidity, wind, visibility, pressure, AQI, 3-day forecast, and one short farming tip.',
 'Do not add facts that are not present. Keep it concise and easy for a farmer to understand.'
 ].join('\n');
 const localized = await buildLlmAssistantAnswer(prompt, []);
 return localized?.text || fallbackAnswer;
 } catch (err) {
 console.warn('Weather localization failed:', err);
 return fallbackAnswer;
 }
}

async function buildWeatherAnswer(message, intent = {}) {
 const city = extractWeatherCity(message, intent);
 const responseLang = intent?.language && intent.language!== 'unknown'? intent.language: detectAssistantMessageLang(message);
 try {
 const data = await fetchJsonWithTimeout(`${API_URL}/weather/current?city=${encodeURIComponent(city)}`, ASSISTANT_WEATHER_TIMEOUT_MS);
 const facts = buildWeatherFacts(data, city);
 const fallbackAnswer = buildWeatherFallbackAnswer(facts, responseLang);
 return localizeWeatherAnswer(message, facts, fallbackAnswer);
 } catch (err) {
 return getWeatherCopy(responseLang).error(city);
 }
}

async function buildMarketAnswer(message) {
 const text = normalizeAssistantText(message);
 try {
 const listings = await apiFetchWithTimeout('/market/listings', {}, ASSISTANT_MARKET_TIMEOUT_MS);
 const safeListings = Array.isArray(listings)? listings: [];
 const cropWords = text.split(/\s+/).filter(word => word.length > 2);
 const matched = safeListings.filter(listing =>
 cropWords.some(word => normalizeAssistantText(listing.crop_name).includes(word))
 );
 const source = matched.length? matched: safeListings;
 if (source.length) {
 const prices = source.map(item => Number(item.price)).filter(Number.isFinite);
 const avg = prices.length? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length): null;
 const crops = source.slice(0, 3).map(item => `${item.crop_name}: Rs.${Number(item.price).toLocaleString('en-IN')}/q at ${item.location || 'listed location'}`).join('\n');
 return `${matched.length? 'Matching marketplace listings': 'Recent marketplace listings'}:\n${crops}${avg? `\nAverage listed price: Rs.${avg.toLocaleString('en-IN')}/q.`: ''}\nUse Market Prices for mandi trends before final pricing.`;
 }
 } catch (err) {
 console.warn('Assistant market answer failed:', err);
 }
 return 'For pricing, compare nearby mandi price, crop grade, transport cost, moisture level, and buyer demand. In Marketplace, set a realistic per-quintal price and update it if buyers are not contacting you.';
}

function buildDateTimeAnswer(message) {
 const now = new Date();
 const text = normalizeAssistantText(message);
 const wantsDate = /\b(what'?s|what is|current|today'?s|tell me)\s+(the\s+)?date\b/.test(text)
 || /\bdate\s+(today|now)\b/.test(text);
 const wantsTime = /\b(what'?s|what is|current|tell me)\s+(the\s+)?time\b/.test(text)
 || /\btime\s+(now|right now)\b/.test(text)
 || /\bclock\b/.test(text);
 if (!wantsDate &&!wantsTime) return null;
 return `Current ${wantsDate && wantsTime? 'date and time': wantsDate? 'date': 'time'}: ${now.toLocaleString('en-IN')}.`;
}

function getAssistantOfflineTopicAnswer(text) {
 const normalized = normalizeAssistantText(text);
 const item = assistantOfflineTopicAnswers.find(topic =>
 topic.keys.some(key => assistantTopicKeyMatches(normalized, key))
 );
 return item?.answer || '';
}

function escapeAssistantRegex(value) {
 return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assistantTopicKeyMatches(text, key) {
 const normalizedKey = normalizeAssistantText(key);
 if (!normalizedKey) return false;
 if (/^[a-z0-9]{1,3}$/.test(normalizedKey)) {
 return new RegExp(`\\b${escapeAssistantRegex(normalizedKey)}\\b`).test(text);
 }
 return text.includes(normalizedKey);
}

function getAssistantQuestionTopic(message) {
 let topic = String(message || '').trim().replace(/[?!.\s]+$/g, '');
 const prefixes = [
 'can you explain ', 'please explain ', 'explain ', 'tell me about ', 'what is ', 'what are ',
 'who is ', 'who are ', 'define ', 'meaning of ', 'how to ', 'how do i ', 'how can i ',
 'why is ', 'why are ', 'why do ', 'why does ', 'give me ', 'show me '
 ];
 const lowered = topic.toLowerCase();
 const prefix = prefixes.find(item => lowered.startsWith(item));
 if (prefix) topic = topic.slice(prefix.length).trim();
 return topic || String(message || '').trim();
}

function buildPromptAwareFallbackAnswer(message) {
 const cleaned = String(message || '').trim();
 const text = normalizeAssistantText(cleaned);
 const topic = getAssistantQuestionTopic(cleaned);
 const topicAnswer = getAssistantOfflineTopicAnswer(text);
 if (topicAnswer) return topicAnswer;

 if (includesAny(text, ['compare', 'difference between', ' vs ', ' versus '])) {
 return `For "${topic}", compare them on purpose, cost, effort, risk, time, and expected result. The better choice depends on your goal and constraints. If this is farming-related, also compare water need, soil suitability, pest risk, and market demand.`;
 }

 if (text.startsWith('how ') || includesAny(text, ['how to', 'how can i', 'how do i'])) {
 return `To handle "${topic}", use this approach: first define the exact goal, then check what information or tools are needed, take one small action, and review the result. For farm work, add crop, location, soil, water availability, and current symptoms so I can make the steps more specific.`;
 }

 if (text.startsWith('why ') || includesAny(text, ['reason for', 'cause of', 'because of'])) {
 return `The likely answer for "${topic}" depends on the situation and evidence. Check the main causes first: environment, timing, inputs used, recent changes, and visible symptoms. If this is about crops, share photos or details like leaf color, spots, soil moisture, fertilizer used, and weather.`;
 }

 if (text.startsWith('what ') || text.startsWith('who ') || includesAny(text, ['define', 'meaning of', 'explain'])) {
 return `In simple terms, "${topic}" is the topic you are asking to understand. The useful answer is: what it means, why it matters, and how it is used. If it is related to farming or this app, connect it to soil, crop health, weather, market price, or the app workflow.`;
 }

 if (includesAny(text, ['write', 'draft', 'message', 'application', 'letter'])) {
 return `Here is a simple draft for "${topic}":\n\nHello, I need help with ${topic}. Please share the required details, next steps, and any documents or information needed. Thank you.`;
 }

 if (includesAny(text, ['best', 'should i', 'recommend', 'which one', 'choose'])) {
 return `For "${topic}", choose based on your goal, budget, time, risk, and available resources. If this is a farm decision, the most important factors are season, soil, water, crop duration, pest risk, and market price.`;
 }

 return `About "${topic}": focus on the exact goal, the current condition, and the next useful action. A practical answer should compare options by cost, time, risk, and expected result.`;
}

function buildGeneralAnswer(message) {
 const cleaned = String(message || '').trim();
 if (!cleaned) return 'Ask me anything about farming, the app, or a general question.';
 const text = normalizeAssistantText(cleaned);
 if (includesAny(text, ['who are you', 'your name', 'what is agrimate', 'what are you'])) {
 return 'I am AgriMate, the assistant inside AgriComplete Hub. I can answer general questions and farming questions, help with app navigation, and guide you on crops, weather, disease, prices, irrigation, and marketplace listings.';
 }
 if (includesAny(text, ['not responding', 'no response', 'not working', 'stuck'])) {
 return 'AgriMate is responding now. If an online AI answer is slow or unavailable, I will still give a local answer so the chat does not stay stuck.';
 }
 return buildPromptAwareFallbackAnswer(cleaned);
}

async function buildLlmAssistantAnswer(message, history = assistantConversationHistory.slice(-8)) {
 const data = await apiFetchWithTimeout('/assistant/chat', {
 method: 'POST',
 body: JSON.stringify({
 message,
 page: window.location.pathname.split('/').pop() || 'dashboard.html',
 history
 })
 }, ASSISTANT_LLM_TIMEOUT_MS);

 const answer = String(data?.answer || '').trim();
 if (data?.source === 'fallback') return null;
 return answer? { text: answer, source: data.source || 'llm' }: null;
}

async function generateAssistantResponse(message) {
 const command = getAssistantCommand(message);
 if (command) return command;

 const weatherIntent = await detectAssistantWeatherIntent(message);
 if (weatherIntent.isWeather) {
 return { text: await buildWeatherAnswer(message, weatherIntent), source: 'weather' };
 }

 const mathAnswer = trySolveSimpleMath(message);
 if (mathAnswer) return { text: mathAnswer, source: 'local' };

 const dateTimeAnswer = buildDateTimeAnswer(message);
 if (dateTimeAnswer) return { text: dateTimeAnswer, source: 'local' };

 const personalAnswer = buildPersonalAssistantAnswer(message);
 if (personalAnswer) return { text: personalAnswer, source: 'local' };

 const text = normalizeAssistantText(message);
 if (includesAny(text, ['not responding', 'no response', 'not working', 'stuck'])) {
 return { text: buildGeneralAnswer(message), source: 'local' };
 }

 if (includesAny(text, ['price', 'mandi', 'rate', 'market price', 'sell rate'])) {
 return { text: await buildMarketAnswer(message), source: 'local' };
 }

 const matched = assistantKnowledge.find(item =>
 item.keys.some(key => assistantTopicKeyMatches(text, key))
 );

 try {
 const llmAnswer = await buildLlmAssistantAnswer(message);
 if (llmAnswer) return llmAnswer;
 } catch (err) {
 console.warn('LLM assistant unavailable, using local fallback:', err);
 }

 if (matched) return { text: matched.answer, source: 'local' };
 const offlineTopicAnswer = getAssistantOfflineTopicAnswer(text);
 if (offlineTopicAnswer) return { text: offlineTopicAnswer, source: 'local' };
 return { text: buildGeneralAnswer(message), source: 'local' };
}

function rememberAssistantExchange(userMessage, assistantMessage) {
 assistantConversationHistory.push({ role: 'user', content: userMessage });
 assistantConversationHistory.push({ role: 'assistant', content: assistantMessage });
 assistantConversationHistory = assistantConversationHistory.slice(-12);
}

async function sendChat() {
 const input = document.getElementById('chatInput');
 const body = document.getElementById('chatbotBody');
 if (!input ||!body) return;

 const msg = input.value.trim();
 if (!msg) return;

 appendChatMessage(msg, 'user');
 input.value = '';

 const typing = showAssistantTyping();
 try {
 const response = await generateAssistantResponse(msg);
 if (typing) typing.remove();
 appendChatMessage(response.text, 'bot');
 rememberAssistantExchange(msg, response.text);
 if (typeof response.action === 'function') {
 setTimeout(response.action, 650);
 }
 } catch (err) {
 if (typing) typing.remove();
 const fallback = buildGeneralAnswer(msg);
 appendChatMessage(fallback, 'bot');
 rememberAssistantExchange(msg, fallback);
 }
}

window.sendChat = sendChat;

// ============ LOGOUT ============
window.handleLogout = function() {
 localStorage.removeItem('agri_token');
 localStorage.removeItem('agri_user');
 window.location.href = 'index.html';
};

const PRICE_TREND_DATA = {
 wheat: {
 label: 'Wheat',
 periods: {
 '1W': [
 { label: 'Mon', value: 2100 },
 { label: 'Tue', value: 2250 },
 { label: 'Wed', value: 1980 },
 { label: 'Thu', value: 2420 },
 { label: 'Fri', value: 2650 },
 { label: 'Sat', value: 2340 },
 { label: 'Sun', value: 2510 }
 ],
 '1M': [
 { label: 'Week 1', value: 2200 },
 { label: 'Week 2', value: 2150 },
 { label: 'Week 3', value: 2400 },
 { label: 'Week 4', value: 2550 }
 ],
 '3M': [
 { label: 'Mar', value: 2100 },
 { label: 'Apr', value: 2350 },
 { label: 'May', value: 2600 }
 ],
 '1Y': [
 { label: '23 Q1', value: 1950 },
 { label: '23 Q2', value: 2200 },
 { label: '23 Q3', value: 2500 },
 { label: '23 Q4', value: 2400 }
 ]
 }
 },
 rice: {
 label: 'Rice',
 periods: {
 '1W': [
 { label: 'Mon', value: 3450 },
 { label: 'Tue', value: 3520 },
 { label: 'Wed', value: 3490 },
 { label: 'Thu', value: 3610 },
 { label: 'Fri', value: 3750 },
 { label: 'Sat', value: 3680 },
 { label: 'Sun', value: 3725 }
 ],
 '1M': [
 { label: 'Week 1', value: 3420 },
 { label: 'Week 2', value: 3560 },
 { label: 'Week 3', value: 3650 },
 { label: 'Week 4', value: 3725 }
 ],
 '3M': [
 { label: 'Mar', value: 3320 },
 { label: 'Apr', value: 3540 },
 { label: 'May', value: 3725 }
 ],
 '1Y': [
 { label: '23 Q1', value: 3180 },
 { label: '23 Q2', value: 3420 },
 { label: '23 Q3', value: 3650 },
 { label: '23 Q4', value: 3580 }
 ]
 }
 },
 soybean: {
 label: 'Soybean',
 periods: {
 '1W': [
 { label: 'Mon', value: 3920 },
 { label: 'Tue', value: 4100 },
 { label: 'Wed', value: 4050 },
 { label: 'Thu', value: 4200 },
 { label: 'Fri', value: 4380 },
 { label: 'Sat', value: 4310 },
 { label: 'Sun', value: 4460 }
 ],
 '1M': [
 { label: 'Week 1', value: 3860 },
 { label: 'Week 2', value: 4050 },
 { label: 'Week 3', value: 4210 },
 { label: 'Week 4', value: 4460 }
 ],
 '3M': [
 { label: 'Mar', value: 3720 },
 { label: 'Apr', value: 4120 },
 { label: 'May', value: 4460 }
 ],
 '1Y': [
 { label: '23 Q1', value: 3600 },
 { label: '23 Q2', value: 3980 },
 { label: '23 Q3', value: 4410 },
 { label: '23 Q4', value: 4280 }
 ]
 }
 }
};

function formatTrendPrice(value) {
 return `Rs.${Math.round(value).toLocaleString('en-IN')}`;
}

window.updateChartData = function(period, crop) {
 const chartGroup = document.getElementById('priceTrendBars') || document.querySelector('.chart-bar-group');
 if (!chartGroup) return;

 const activeFilter = document.querySelector('.chart-filter.active');
 const selectedPeriod = period || activeFilter?.textContent?.trim() || '1W';
 const cropSelect = document.getElementById('priceTrendCrop');
 const selectedCrop = crop || cropSelect?.value || 'wheat';
 const cropData = PRICE_TREND_DATA[selectedCrop] || PRICE_TREND_DATA.wheat;
 const periodData = cropData.periods[selectedPeriod] || cropData.periods['1W'];
 if (!periodData?.length) return;

 if (cropSelect) cropSelect.value = selectedCrop;

 const values = periodData.map(item => Number(item.value)).filter(Number.isFinite);
 const min = Math.min(...values);
 const max = Math.max(...values);
 const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
 const first = values[0];
 const last = values[values.length - 1];
 const range = max - min || 1;
 const avgPosition = 28 + ((avg - min) / range) * 64;
 const change = first? ((last - first) / first) * 100: 0;

 chartGroup.innerHTML = periodData.map((item, idx) => {
 const height = 32 + ((Number(item.value) - min) / range) * 66;
 const stateClass = Number(item.value) === max? ' is-high': Number(item.value) === min? ' is-low': '';
 return `
 <div class="chart-bar${stateClass}" style="--bar-height:${height.toFixed(1)}%; animation: growUp 0.6s ease-out ${idx * 0.05}s both;" title="${escapeHtml(cropData.label)} ${escapeHtml(item.label)}: ${formatTrendPrice(item.value)}">
 <span class="bar-value">${formatTrendPrice(item.value)}</span>
 <span class="bar-label">${escapeHtml(item.label)}</span>
 </div>
 `;
 }).join('');

 const averageLine = document.getElementById('priceTrendAverageLine');
 if (averageLine) {
 averageLine.style.setProperty('--avg-position', `${avgPosition.toFixed(1)}%`);
 const label = averageLine.querySelector('span');
 if (label) label.textContent = `${translateLabel('chart_avg_short') || 'Avg'} ${formatTrendPrice(avg)}`;
 }

 const currentEl = document.getElementById('priceTrendCurrent');
 const averageEl = document.getElementById('priceTrendAverage');
 const changeEl = document.getElementById('priceTrendChange');
 const insightEl = document.getElementById('priceTrendInsight');
 if (currentEl) currentEl.textContent = formatTrendPrice(last);
 if (averageEl) averageEl.textContent = formatTrendPrice(avg);
 if (changeEl) {
 const trendClass = change > 0.3? 'trend-up': change < -0.3? 'trend-down': 'trend-flat';
 changeEl.className = trendClass;
 changeEl.textContent = `${change >= 0? '+': ''}${change.toFixed(1)}%`;
 }
 if (insightEl) {
 const direction = change > 0.3? 'up': change < -0.3? 'down': 'stable';
 const best = formatTrendPrice(max);
 insightEl.textContent = `${cropData.label} is ${direction} ${Math.abs(change).toFixed(1)}% for ${selectedPeriod}. Best observed rate: ${best}/q.`;
 }

 document.querySelectorAll('.chart-filter').forEach(btn => {
 btn.classList.toggle('active', btn.textContent.trim() === selectedPeriod);
 });
};
