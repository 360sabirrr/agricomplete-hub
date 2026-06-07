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
const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr', 'pa', 'ta', 'te'];
const LANGUAGE_LABELS = {
 en: 'English',
 hi: 'हिन्दी',
 mr: 'मराठी',
 pa: 'ਪੰਜਾਬੀ',
 ta: 'தமிழ்',
 te: 'తెలుగు'
};

function normalizeLanguage(lang) {
 return SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
}

let currentLang = normalizeLanguage(localStorage.getItem('agri_lang') || 'en');

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

const staticUiTranslations = {
 hi: {
 "Smart Farming Platform": "स्मार्ट खेती प्लेटफॉर्म",
 "Main Menu": "मुख्य मेन्यू",
 "Tools": "टूल्स",
 "Account": "खाता",
 "Dashboard": "डैशबोर्ड",
 "Disease Detection": "रोग पहचान",
 "Market Prices": "मंडी भाव",
 "Marketplace": "बाजार",
 "Resource Management": "संसाधन प्रबंधन",
 "My Profile": "मेरी प्रोफ़ाइल",
 "Settings": "सेटिंग्स",
 "Logout": "लॉगआउट",
 "Live": "लाइव",
 "Weather": "मौसम",
 "Update": "अपडेट",
 "Loading weather...": "मौसम लोड हो रहा है...",
 "Humidity:": "नमी:",
 "Wind:": "हवा:",
 "Visibility:": "दृश्यता:",
 "Pressure:": "दबाव:",
 "AQI:": "AQI:",
 "Crop": "फसल",
 "Fertilizer": "खाद",
 "Qty": "मात्रा",
 "Due": "देय",
 "Current": "वर्तमान",
 "Average": "औसत",
 "Change": "बदलाव",
 "High": "ऊपर",
 "Low": "कम",
 "Recent Alerts": "हाल के अलर्ट",
 "Disease": "रोग",
 "Market": "बाजार",
 "Water": "पानी",
 "Water Management": "जल प्रबंधन",
 "Fertilizer Schedule": "खाद कार्यक्रम",
 "Field A - Wheat": "खेत A - गेहूं",
 "Field B - Chickpea": "खेत B - चना",
 "Field C - Potato": "खेत C - आलू",
 "Soil moisture: Optimal level": "मिट्टी की नमी: सही स्तर",
 "Warning Needs irrigation within 24h": "चेतावनी 24 घंटे में सिंचाई चाहिए",
 "Adequate level. Next irrigation: 3 days": "पर्याप्त स्तर। अगली सिंचाई: 3 दिन",
 "Crop Price Trends (Rs./quintal)": "फसल मूल्य प्रवृत्ति (Rs./क्विंटल)",
 "Pune APMC indicative mandi rates": "पुणे APMC के संकेतक मंडी भाव",
 "Heavy rain expected in Pune district for the next 48 hours. Secure harvested crops.": "अगले 48 घंटों में पुणे जिले में भारी बारिश की संभावना है। कटी फसल सुरक्षित रखें।",
 "Leaf blight detected in nearby farms. Consider preventive spraying for your wheat crop.": "पास के खेतों में पत्ती झुलसा रोग मिला है। गेहूं के लिए रोकथाम छिड़काव पर विचार करें।",
 "Wheat prices rose by 5% at Pune Mandi. Good time to consider selling.": "पुणे मंडी में गेहूं के भाव 5% बढ़े। बेचने पर विचार करने का अच्छा समय है।",
 "Soil moisture is below optimal. Schedule irrigation for Field B within 24 hours.": "मिट्टी की नमी कम है। खेत B में 24 घंटे के भीतर सिंचाई करें।",
 "Disease Detection": "रोग पहचान",
 "Scan your crop leaves now": "अभी अपनी फसल की पत्तियां स्कैन करें",
 "Live mandi rates": "लाइव मंडी भाव",
 "Sell your produce": "अपनी उपज बेचें",
 "Ask anything or use voice": "कुछ भी पूछें या आवाज़ इस्तेमाल करें",
 "Ask me anything about farming": "खेती के बारे में कुछ भी पूछें",
 "Namaste! I'm AgriMate. How can I help you today?": "नमस्ते! मैं AgriMate हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
 "Type your question...": "अपना सवाल टाइप करें...",
 "Email or Phone": "ईमेल या फोन",
 "Password": "पासवर्ड",
 "Remember me": "मुझे याद रखें",
 "Forgot password?": "पासवर्ड भूल गए?",
 "Sign In": "साइन इन",
 "First Name": "पहला नाम",
 "Last Name": "अंतिम नाम",
 "Phone Number": "फोन नंबर",
 "Email": "ईमेल",
 "State": "राज्य",
 "Create Account": "खाता बनाएं",
 "up 3 new this season": "इस सीजन 3 नए बढ़े",
 "down 12% vs last week": "पिछले सप्ताह से 12% कम",
 "up 8% growth": "8% वृद्धि",
 "Warning 1 urgent": "चेतावनी 1 जरूरी",
 "Wheat": "गेहूं",
 "Rice": "चावल",
 "Soybean": "सोयाबीन",
 "Chickpea": "चना",
 "Potato": "आलू",
 "Mustard": "सरसों",
 "Tomorrow": "कल",
 "In 5 days": "5 दिनों में",
 "In 10 days": "10 दिनों में",
 "In 14 days": "14 दिनों में"
 },
 mr: {
 "Smart Farming Platform": "स्मार्ट शेती प्लॅटफॉर्म",
 "Main Menu": "मुख्य मेन्यू",
 "Tools": "साधने",
 "Account": "खाते",
 "Dashboard": "डॅशबोर्ड",
 "Disease Detection": "रोग ओळख",
 "Market Prices": "बाजारभाव",
 "Marketplace": "बाजारपेठ",
 "Resource Management": "संसाधन व्यवस्थापन",
 "My Profile": "माझी प्रोफाइल",
 "Settings": "सेटिंग्ज",
 "Logout": "लॉगआउट",
 "Live": "लाईव्ह",
 "Weather": "हवामान",
 "Update": "अपडेट",
 "Loading weather...": "हवामान लोड होत आहे...",
 "Humidity:": "आर्द्रता:",
 "Wind:": "वारा:",
 "Visibility:": "दृश्यता:",
 "Pressure:": "दाब:",
 "AQI:": "AQI:",
 "Crop": "पीक",
 "Fertilizer": "खत",
 "Qty": "प्रमाण",
 "Due": "देय",
 "Current": "सध्याचा",
 "Average": "सरासरी",
 "Change": "बदल",
 "High": "जास्त",
 "Low": "कमी",
 "Recent Alerts": "अलीकडील सूचना",
 "Disease": "रोग",
 "Market": "बाजार",
 "Water": "पाणी",
 "Water Management": "जल व्यवस्थापन",
 "Fertilizer Schedule": "खत वेळापत्रक",
 "Field A - Wheat": "शेत A - गहू",
 "Field B - Chickpea": "शेत B - हरभरा",
 "Field C - Potato": "शेत C - बटाटा",
 "Soil moisture: Optimal level": "मातीतील ओलावा: योग्य स्तर",
 "Warning Needs irrigation within 24h": "इशारा 24 तासांत सिंचन आवश्यक",
 "Adequate level. Next irrigation: 3 days": "पुरेसा स्तर. पुढील सिंचन: 3 दिवस",
 "Crop Price Trends (Rs./quintal)": "पीक किंमत कल (Rs./क्विंटल)",
 "Pune APMC indicative mandi rates": "पुणे APMC सूचक बाजारभाव",
 "Heavy rain expected in Pune district for the next 48 hours. Secure harvested crops.": "पुढील 48 तासांत पुणे जिल्ह्यात मुसळधार पावसाची शक्यता. कापलेली पिके सुरक्षित ठेवा.",
 "Leaf blight detected in nearby farms. Consider preventive spraying for your wheat crop.": "जवळच्या शेतात पान करपा आढळला. गव्हासाठी प्रतिबंधक फवारणीचा विचार करा.",
 "Wheat prices rose by 5% at Pune Mandi. Good time to consider selling.": "पुणे मंडीत गव्हाचे भाव 5% वाढले. विक्रीचा विचार करण्यासाठी चांगला वेळ.",
 "Soil moisture is below optimal. Schedule irrigation for Field B within 24 hours.": "मातीतील ओलावा कमी आहे. शेत B साठी 24 तासांत सिंचन करा.",
 "Scan your crop leaves now": "आता पिकांची पाने स्कॅन करा",
 "Live mandi rates": "लाईव्ह बाजारभाव",
 "Sell your produce": "तुमचे उत्पादन विका",
 "Ask anything or use voice": "काहीही विचारा किंवा आवाज वापरा",
 "Ask me anything about farming": "शेतीबद्दल काहीही विचारा",
 "Namaste! I'm AgriMate. How can I help you today?": "नमस्कार! मी AgriMate आहे. आज मी कशी मदत करू?",
 "Type your question...": "तुमचा प्रश्न टाइप करा...",
 "Email or Phone": "ईमेल किंवा फोन",
 "Password": "पासवर्ड",
 "Remember me": "मला लक्षात ठेवा",
 "Forgot password?": "पासवर्ड विसरलात?",
 "Sign In": "साइन इन",
 "First Name": "पहिले नाव",
 "Last Name": "आडनाव",
 "Phone Number": "फोन नंबर",
 "Email": "ईमेल",
 "State": "राज्य",
 "Create Account": "खाते तयार करा",
 "up 3 new this season": "या हंगामात 3 नवीन वाढले",
 "down 12% vs last week": "मागील आठवड्यापेक्षा 12% कमी",
 "up 8% growth": "8% वाढ",
 "Warning 1 urgent": "इशारा 1 तातडीचे",
 "Wheat": "गहू",
 "Rice": "तांदूळ",
 "Soybean": "सोयाबीन",
 "Chickpea": "हरभरा",
 "Potato": "बटाटा",
 "Mustard": "मोहरी",
 "Tomorrow": "उद्या",
 "In 5 days": "5 दिवसांत",
 "In 10 days": "10 दिवसांत",
 "In 14 days": "14 दिवसांत"
 },
 pa: {
 "Smart Farming Platform": "ਸਮਾਰਟ ਖੇਤੀ ਪਲੇਟਫਾਰਮ",
 "Main Menu": "ਮੁੱਖ ਮੀਨੂ",
 "Tools": "ਟੂਲ",
 "Account": "ਖਾਤਾ",
 "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
 "Disease Detection": "ਰੋਗ ਪਛਾਣ",
 "Market Prices": "ਮੰਡੀ ਭਾਅ",
 "Marketplace": "ਬਾਜ਼ਾਰ",
 "Resource Management": "ਸੰਸਾਧਨ ਪ੍ਰਬੰਧਨ",
 "My Profile": "ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ",
 "Settings": "ਸੈਟਿੰਗਾਂ",
 "Logout": "ਲੌਗਆਉਟ",
 "Live": "ਲਾਈਵ",
 "Weather": "ਮੌਸਮ",
 "Update": "ਅਪਡੇਟ",
 "Loading weather...": "ਮੌਸਮ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
 "Humidity:": "ਨਮੀ:",
 "Wind:": "ਹਵਾ:",
 "Visibility:": "ਦਿੱਖ:",
 "Pressure:": "ਦਬਾਅ:",
 "AQI:": "AQI:",
 "Crop": "ਫ਼ਸਲ",
 "Fertilizer": "ਖਾਦ",
 "Qty": "ਮਾਤਰਾ",
 "Due": "ਬਾਕੀ",
 "Current": "ਮੌਜੂਦਾ",
 "Average": "ਔਸਤ",
 "Change": "ਬਦਲਾਅ",
 "High": "ਉੱਚ",
 "Low": "ਘੱਟ",
 "Recent Alerts": "ਤਾਜ਼ਾ ਅਲਰਟ",
 "Disease": "ਰੋਗ",
 "Market": "ਬਾਜ਼ਾਰ",
 "Water": "ਪਾਣੀ",
 "Water Management": "ਪਾਣੀ ਪ੍ਰਬੰਧਨ",
 "Fertilizer Schedule": "ਖਾਦ ਸਮਾਂ-ਸਾਰਣੀ",
 "Field A - Wheat": "ਖੇਤ A - ਗੇਂਹੂ",
 "Field B - Chickpea": "ਖੇਤ B - ਚਣਾ",
 "Field C - Potato": "ਖੇਤ C - ਆਲੂ",
 "Soil moisture: Optimal level": "ਮਿੱਟੀ ਨਮੀ: ਠੀਕ ਪੱਧਰ",
 "Warning Needs irrigation within 24h": "ਚੇਤਾਵਨੀ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਸਿੰਚਾਈ ਚਾਹੀਦੀ ਹੈ",
 "Adequate level. Next irrigation: 3 days": "ਕਾਫੀ ਪੱਧਰ। ਅਗਲੀ ਸਿੰਚਾਈ: 3 ਦਿਨ",
 "Crop Price Trends (Rs./quintal)": "ਫ਼ਸਲ ਕੀਮਤ ਰੁਝਾਨ (Rs./ਕੁਇੰਟਲ)",
 "Pune APMC indicative mandi rates": "ਪੁਨੇ APMC ਦੇ ਸੰਕੇਤਕ ਮੰਡੀ ਭਾਅ",
 "Heavy rain expected in Pune district for the next 48 hours. Secure harvested crops.": "ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਪੁਨੇ ਜ਼ਿਲ੍ਹੇ ਵਿੱਚ ਭਾਰੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ। ਕੱਟੀ ਫ਼ਸਲ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।",
 "Leaf blight detected in nearby farms. Consider preventive spraying for your wheat crop.": "ਨੇੜਲੇ ਖੇਤਾਂ ਵਿੱਚ ਪੱਤਾ ਝੁਲਸਾ ਮਿਲਿਆ। ਗੇਂਹੂ ਲਈ ਰੋਕਥਾਮ ਛਿੜਕਾਅ ਸੋਚੋ।",
 "Wheat prices rose by 5% at Pune Mandi. Good time to consider selling.": "ਪੁਨੇ ਮੰਡੀ ਵਿੱਚ ਗੇਂਹੂ ਭਾਅ 5% ਵਧੇ। ਵੇਚਣ ਲਈ ਚੰਗਾ ਸਮਾਂ।",
 "Soil moisture is below optimal. Schedule irrigation for Field B within 24 hours.": "ਮਿੱਟੀ ਨਮੀ ਘੱਟ ਹੈ। ਖੇਤ B ਲਈ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਸਿੰਚਾਈ ਕਰੋ।",
 "Scan your crop leaves now": "ਹੁਣ ਆਪਣੀ ਫ਼ਸਲ ਦੇ ਪੱਤੇ ਸਕੈਨ ਕਰੋ",
 "Live mandi rates": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
 "Sell your produce": "ਆਪਣੀ ਉਪਜ ਵੇਚੋ",
 "Ask anything or use voice": "ਕੁਝ ਵੀ ਪੁੱਛੋ ਜਾਂ ਆਵਾਜ਼ ਵਰਤੋ",
 "Ask me anything about farming": "ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ",
 "Namaste! I'm AgriMate. How can I help you today?": "ਨਮਸਤੇ! ਮੈਂ AgriMate ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
 "Type your question...": "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
 "Email or Phone": "ਈਮੇਲ ਜਾਂ ਫੋਨ",
 "Password": "ਪਾਸਵਰਡ",
 "Remember me": "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ",
 "Forgot password?": "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
 "Sign In": "ਸਾਈਨ ਇਨ",
 "First Name": "ਪਹਿਲਾ ਨਾਮ",
 "Last Name": "ਆਖਰੀ ਨਾਮ",
 "Phone Number": "ਫੋਨ ਨੰਬਰ",
 "Email": "ਈਮੇਲ",
 "State": "ਰਾਜ",
 "Create Account": "ਖਾਤਾ ਬਣਾਓ",
 "up 3 new this season": "ਇਸ ਸੀਜ਼ਨ 3 ਨਵੇਂ ਵਧੇ",
 "down 12% vs last week": "ਪਿਛਲੇ ਹਫ਼ਤੇ ਤੋਂ 12% ਘੱਟ",
 "up 8% growth": "8% ਵਾਧਾ",
 "Warning 1 urgent": "ਚੇਤਾਵਨੀ 1 ਜ਼ਰੂਰੀ",
 "Wheat": "ਗੇਂਹੂ",
 "Rice": "ਚੌਲ",
 "Soybean": "ਸੋਯਾਬੀਨ",
 "Chickpea": "ਚਣਾ",
 "Potato": "ਆਲੂ",
 "Mustard": "ਸਰੋਂ",
 "Tomorrow": "ਕੱਲ੍ਹ",
 "In 5 days": "5 ਦਿਨਾਂ ਵਿੱਚ",
 "In 10 days": "10 ਦਿਨਾਂ ਵਿੱਚ",
 "In 14 days": "14 ਦਿਨਾਂ ਵਿੱਚ"
 },
 ta: {
 "Smart Farming Platform": "ஸ்மார்ட் விவசாய தளம்",
 "Main Menu": "முக்கிய மெனு",
 "Tools": "கருவிகள்",
 "Account": "கணக்கு",
 "Dashboard": "டாஷ்போர்டு",
 "Disease Detection": "நோய் கண்டறிதல்",
 "Market Prices": "சந்தை விலைகள்",
 "Marketplace": "சந்தை",
 "Resource Management": "வள மேலாண்மை",
 "My Profile": "என் சுயவிவரம்",
 "Settings": "அமைப்புகள்",
 "Logout": "வெளியேறு",
 "Live": "நேரலை",
 "Weather": "வானிலை",
 "Update": "புதுப்பி",
 "Loading weather...": "வானிலை ஏற்றப்படுகிறது...",
 "Humidity:": "ஈரப்பதம்:",
 "Wind:": "காற்று:",
 "Visibility:": "தெளிவு:",
 "Pressure:": "அழுத்தம்:",
 "AQI:": "AQI:",
 "Crop": "பயிர்",
 "Fertilizer": "உரம்",
 "Qty": "அளவு",
 "Due": "காலம்",
 "Current": "தற்போதைய",
 "Average": "சராசரி",
 "Change": "மாற்றம்",
 "High": "அதிகம்",
 "Low": "குறைவு",
 "Recent Alerts": "சமீபத்திய எச்சரிக்கைகள்",
 "Disease": "நோய்",
 "Market": "சந்தை",
 "Water": "நீர்",
 "Water Management": "நீர் மேலாண்மை",
 "Fertilizer Schedule": "உர அட்டவணை",
 "Field A - Wheat": "வயல் A - கோதுமை",
 "Field B - Chickpea": "வயல் B - கொண்டைக்கடலை",
 "Field C - Potato": "வயல் C - உருளைக்கிழங்கு",
 "Soil moisture: Optimal level": "மண் ஈரப்பதம்: சரியான நிலை",
 "Warning Needs irrigation within 24h": "எச்சரிக்கை 24 மணி நேரத்தில் பாசனம் தேவை",
 "Adequate level. Next irrigation: 3 days": "போதுமான நிலை. அடுத்த பாசனம்: 3 நாட்கள்",
 "Crop Price Trends (Rs./quintal)": "பயிர் விலை போக்கு (Rs./குவிண்டால்)",
 "Pune APMC indicative mandi rates": "புனே APMC குறியீட்டு சந்தை விலைகள்",
 "Heavy rain expected in Pune district for the next 48 hours. Secure harvested crops.": "அடுத்த 48 மணி நேரத்தில் புனே மாவட்டத்தில் கனமழை எதிர்பார்க்கப்படுகிறது. அறுவடை பயிர்களை பாதுகாக்கவும்.",
 "Leaf blight detected in nearby farms. Consider preventive spraying for your wheat crop.": "அருகிலுள்ள வயல்களில் இலை கருகல் கண்டறியப்பட்டது. கோதுமைக்கு தடுப்பு தெளிப்பை பரிசீலிக்கவும்.",
 "Wheat prices rose by 5% at Pune Mandi. Good time to consider selling.": "புனே சந்தையில் கோதுமை விலை 5% உயர்ந்தது. விற்பனைக்கு நல்ல நேரம்.",
 "Soil moisture is below optimal. Schedule irrigation for Field B within 24 hours.": "மண் ஈரப்பதம் குறைவாக உள்ளது. வயல் Bக்கு 24 மணி நேரத்தில் பாசனம் செய்யவும்.",
 "Scan your crop leaves now": "இப்போது உங்கள் பயிர் இலைகளை ஸ்கேன் செய்யுங்கள்",
 "Live mandi rates": "நேரடி சந்தை விலைகள்",
 "Sell your produce": "உங்கள் விளைபொருளை விற்கவும்",
 "Ask anything or use voice": "எதையும் கேளுங்கள் அல்லது குரல் பயன்படுத்துங்கள்",
 "Ask me anything about farming": "விவசாயம் பற்றி எதையும் கேளுங்கள்",
 "Namaste! I'm AgriMate. How can I help you today?": "வணக்கம்! நான் AgriMate. இன்று எப்படி உதவலாம்?",
 "Type your question...": "உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...",
 "Email or Phone": "மின்னஞ்சல் அல்லது தொலைபேசி",
 "Password": "கடவுச்சொல்",
 "Remember me": "என்னை நினைவில் கொள்ளவும்",
 "Forgot password?": "கடவுச்சொல் மறந்துவிட்டதா?",
 "Sign In": "உள்நுழை",
 "First Name": "முதல் பெயர்",
 "Last Name": "கடைசி பெயர்",
 "Phone Number": "தொலைபேசி எண்",
 "Email": "மின்னஞ்சல்",
 "State": "மாநிலம்",
 "Create Account": "கணக்கு உருவாக்கவும்",
 "up 3 new this season": "இந்த பருவத்தில் 3 புதியவை",
 "down 12% vs last week": "கடந்த வாரத்தை விட 12% குறைவு",
 "up 8% growth": "8% வளர்ச்சி",
 "Warning 1 urgent": "எச்சரிக்கை 1 அவசரம்",
 "Wheat": "கோதுமை",
 "Rice": "அரிசி",
 "Soybean": "சோயாபீன்",
 "Chickpea": "கொண்டைக்கடலை",
 "Potato": "உருளைக்கிழங்கு",
 "Mustard": "கடுகு",
 "Tomorrow": "நாளை",
 "In 5 days": "5 நாட்களில்",
 "In 10 days": "10 நாட்களில்",
 "In 14 days": "14 நாட்களில்"
 },
 te: {
 "Smart Farming Platform": "స్మార్ట్ వ్యవసాయ వేదిక",
 "Main Menu": "ప్రధాన మెనూ",
 "Tools": "సాధనాలు",
 "Account": "ఖాతా",
 "Dashboard": "డాష్‌బోర్డ్",
 "Disease Detection": "వ్యాధి గుర్తింపు",
 "Market Prices": "మార్కెట్ ధరలు",
 "Marketplace": "మార్కెట్‌ప్లేస్",
 "Resource Management": "వనరుల నిర్వహణ",
 "My Profile": "నా ప్రొఫైల్",
 "Settings": "సెట్టింగులు",
 "Logout": "లాగ్ అవుట్",
 "Live": "లైవ్",
 "Weather": "వాతావరణం",
 "Update": "అప్డేట్",
 "Loading weather...": "వాతావరణం లోడ్ అవుతోంది...",
 "Humidity:": "తేమ:",
 "Wind:": "గాలి:",
 "Visibility:": "దృశ్యమానత:",
 "Pressure:": "పీడనం:",
 "AQI:": "AQI:",
 "Crop": "పంట",
 "Fertilizer": "ఎరువు",
 "Qty": "పరిమాణం",
 "Due": "గడువు",
 "Current": "ప్రస్తుత",
 "Average": "సగటు",
 "Change": "మార్పు",
 "High": "ఎక్కువ",
 "Low": "తక్కువ",
 "Recent Alerts": "తాజా హెచ్చరికలు",
 "Disease": "వ్యాధి",
 "Market": "మార్కెట్",
 "Water": "నీరు",
 "Water Management": "నీటి నిర్వహణ",
 "Fertilizer Schedule": "ఎరువు షెడ్యూల్",
 "Field A - Wheat": "పొలం A - గోధుమ",
 "Field B - Chickpea": "పొలం B - శనగ",
 "Field C - Potato": "పొలం C - బంగాళాదుంప",
 "Soil moisture: Optimal level": "నేల తేమ: సరైన స్థాయి",
 "Warning Needs irrigation within 24h": "హెచ్చరిక 24 గంటల్లో నీరు అవసరం",
 "Adequate level. Next irrigation: 3 days": "తగిన స్థాయి. తదుపరి నీరు: 3 రోజులు",
 "Crop Price Trends (Rs./quintal)": "పంట ధర ధోరణి (Rs./క్వింటాల్)",
 "Pune APMC indicative mandi rates": "పుణే APMC సూచనాత్మక మార్కెట్ ధరలు",
 "Heavy rain expected in Pune district for the next 48 hours. Secure harvested crops.": "తదుపరి 48 గంటల్లో పుణే జిల్లాలో భారీ వర్షం అవకాశం. కోసిన పంటలను రక్షించండి.",
 "Leaf blight detected in nearby farms. Consider preventive spraying for your wheat crop.": "దగ్గరలోని పొలాల్లో ఆకుమచ్చ వ్యాధి గుర్తించారు. గోధుమకు నివారణ పిచికారీ పరిగణించండి.",
 "Wheat prices rose by 5% at Pune Mandi. Good time to consider selling.": "పుణే మార్కెట్లో గోధుమ ధరలు 5% పెరిగాయి. అమ్మడానికి మంచి సమయం.",
 "Soil moisture is below optimal. Schedule irrigation for Field B within 24 hours.": "నేల తేమ తక్కువగా ఉంది. పొలం Bకి 24 గంటల్లో నీరు పెట్టండి.",
 "Scan your crop leaves now": "ఇప్పుడే మీ పంట ఆకులను స్కాన్ చేయండి",
 "Live mandi rates": "లైవ్ మార్కెట్ ధరలు",
 "Sell your produce": "మీ ఉత్పత్తిని అమ్మండి",
 "Ask anything or use voice": "ఏదైనా అడగండి లేదా వాయిస్ ఉపయోగించండి",
 "Ask me anything about farming": "వ్యవసాయం గురించి ఏదైనా అడగండి",
 "Namaste! I'm AgriMate. How can I help you today?": "నమస్తే! నేను AgriMate. ఈ రోజు ఎలా సహాయం చేయగలను?",
 "Type your question...": "మీ ప్రశ్న టైప్ చేయండి...",
 "Email or Phone": "ఇమెయిల్ లేదా ఫోన్",
 "Password": "పాస్‌వర్డ్",
 "Remember me": "నన్ను గుర్తుంచుకోండి",
 "Forgot password?": "పాస్‌వర్డ్ మర్చిపోయారా?",
 "Sign In": "సైన్ ఇన్",
 "First Name": "మొదటి పేరు",
 "Last Name": "చివరి పేరు",
 "Phone Number": "ఫోన్ నంబర్",
 "Email": "ఇమెయిల్",
 "State": "రాష్ట్రం",
 "Create Account": "ఖాతా సృష్టించండి",
 "up 3 new this season": "ఈ సీజన్‌లో 3 కొత్తవి",
 "down 12% vs last week": "గత వారంతో పోలిస్తే 12% తగ్గింది",
 "up 8% growth": "8% వృద్ధి",
 "Warning 1 urgent": "హెచ్చరిక 1 అత్యవసరం",
 "Wheat": "గోధుమ",
 "Rice": "బియ్యం",
 "Soybean": "సోయాబీన్",
 "Chickpea": "శనగ",
 "Potato": "బంగాళాదుంప",
 "Mustard": "ఆవాలు",
 "Tomorrow": "రేపు",
 "In 5 days": "5 రోజుల్లో",
 "In 10 days": "10 రోజుల్లో",
 "In 14 days": "14 రోజుల్లో"
 }
};

const pageStaticUiTranslations = {
 hi: {
 "Plant Disease Detection": "पौधा रोग पहचान",
 "Upload a leaf image for AI-powered diagnosis": "AI आधारित पहचान के लिए पत्ते की फोटो अपलोड करें",
 "Upload Leaf Image": "पत्ते की फोटो अपलोड करें",
 "Drag & Drop or Click to Upload": "खींचकर छोड़ें या अपलोड करने के लिए क्लिक करें",
 "Supports JPG, PNG, WEBP - Max 10MB": "JPG, PNG, WEBP सपोर्ट - अधिकतम 10MB",
 "Analyze Disease": "रोग जांचें",
 "Upload New Image": "नई फोटो अपलोड करें",
 "Tips for Best Results": "बेहतर परिणाम के सुझाव",
 "Take a clear, close-up photo of the affected leaf": "प्रभावित पत्ते की साफ और नजदीकी फोटो लें",
 "Ensure good natural lighting": "अच्छी प्राकृतिक रोशनी रखें",
 "Include both healthy and affected parts of the leaf": "पत्ते के स्वस्थ और प्रभावित दोनों हिस्से दिखाएं",
 "Hold the camera steady and avoid blurriness": "कैमरा स्थिर रखें और धुंधली फोटो से बचें",
 "Diagnosis Result": "जांच परिणाम",
 "AI Analysis": "AI विश्लेषण",
 "No Analysis Yet": "अभी कोई विश्लेषण नहीं",
 "Upload a leaf photo to get instant AI diagnosis": "तुरंत AI जांच के लिए पत्ते की फोटो अपलोड करें",
 "Recent Scans": "हाल के स्कैन",
 "Common Crop Diseases": "आम फसल रोग",
 "Late Blight": "लेट ब्लाइट",
 "Late Blight - Tomato": "लेट ब्लाइट - टमाटर",
 "Rust Disease": "रस्ट रोग",
 "Powdery Mildew": "पाउडरी मिल्ड्यू",
 "Powdery Mildew - Wheat": "पाउडरी मिल्ड्यू - गेहूं",
 "Healthy - Rice": "स्वस्थ - चावल",
 "Affects tomatoes and potatoes. Causes dark, water-soaked lesions on leaves. Spreads rapidly in humid conditions.": "टमाटर और आलू को प्रभावित करता है। पत्तियों पर गहरे पानी जैसे धब्बे बनते हैं और नमी में तेजी से फैलता है।",
 "Common in wheat and barley. Orange-brown pustules appear on leaves. Reduces grain yield significantly.": "गेहूं और जौ में आम है। पत्तियों पर नारंगी-भूरे दाने आते हैं और उपज घटती है।",
 "White powdery coating on leaves. Affects a wide range of crops including peas, wheat, and cucurbits.": "पत्तियों पर सफेद पाउडर जैसी परत बनती है। मटर, गेहूं और बेलदार फसलों सहित कई फसलों को प्रभावित करता है।",
 "High Risk": "अधिक जोखिम",
 "Medium Risk": "मध्यम जोखिम",
 "Low-Med Risk": "कम-मध्यम जोखिम",
 "Critical": "गंभीर",
 "Moderate": "मध्यम",
 "Healthy": "स्वस्थ",
 "Ask me about plant diseases": "पौधों के रोगों के बारे में पूछें",
 "Ask about diseases...": "रोगों के बारे में पूछें...",
 "Namaste! Upload a leaf photo or ask me about any crop disease.": "नमस्ते! पत्ते की फोटो अपलोड करें या किसी भी फसल रोग के बारे में पूछें।",
 "Live Market Prices": "लाइव मंडी भाव",
 "Real-time mandi rates from across India": "भारत भर की मंडियों से रियल-टाइम दरें",
 "Most Gained": "सबसे ज्यादा बढ़ा",
 "Most Declined": "सबसे ज्यादा गिरा",
 "Total Mandis": "कुल मंडियां",
 "Last Updated": "अंतिम अपडेट",
 "Tracked live": "लाइव ट्रैक",
 "Auto-refresh": "ऑटो-रिफ्रेश",
 "Price Trends - Wheat": "मूल्य रुझान - गेहूं",
 "Crop Comparison": "फसल तुलना",
 "Live Mandi Prices": "लाइव मंडी भाव",
 "All States": "सभी राज्य",
 "All Crops": "सभी फसलें",
 "Mandi": "मंडी",
 "Min Price": "न्यूनतम भाव",
 "Max Price": "अधिकतम भाव",
 "Modal Price": "मॉडल भाव",
 "Nearby Buyers": "नजदीकी खरीदार",
 "Ask about market prices": "मंडी भाव के बारे में पूछें",
 "Ask about prices...": "भाव के बारे में पूछें...",
 "Namaste! Ask me about current crop prices or market trends.": "नमस्ते! मौजूदा फसल भाव या बाजार रुझान के बारे में पूछें।",
 "Farmer Marketplace": "किसान बाज़ार",
 "Buy & sell directly - no middlemen": "सीधे खरीदें और बेचें - बिना बिचौलियों के",
 "Direct farmer trade": "सीधा किसान व्यापार",
 "Find crops faster, manage yours easily": "फसलें जल्दी खोजें, अपनी फसलें आसानी से संभालें",
 "Loading listings...": "लिस्टिंग लोड हो रही हैं...",
 "Category": "श्रेणी",
 "All Categories": "सभी श्रेणियां",
 "Grains & Cereals": "अनाज और धान्य",
 "Pulses": "दालें",
 "Vegetables": "सब्जियां",
 "Fruits": "फल",
 "Spices": "मसाले",
 "Oilseeds": "तिलहन",
 "Cash Crops": "नकदी फसलें",
 "Other": "अन्य",
 "Location": "स्थान",
 "All Locations": "सभी स्थान",
 "Sort": "क्रम",
 "Sort: Latest": "क्रम: नवीनतम",
 "Price: Low to High": "भाव: कम से अधिक",
 "Price: High to Low": "भाव: अधिक से कम",
 "Quantity: High to Low": "मात्रा: अधिक से कम",
 "Seller mode": "विक्रेता मोड",
 "My Listings": "मेरी लिस्टिंग",
 "Crops you have listed for sale": "आपकी बिक्री के लिए सूचीबद्ध फसलें",
 "No matching crops listed by you": "आपकी कोई मिलती-जुलती फसल सूचीबद्ध नहीं",
 "No crops listed by you yet": "आपने अभी कोई फसल सूचीबद्ध नहीं की",
 "You can create a new listing or change the filters above.": "आप नई लिस्टिंग बना सकते हैं या ऊपर के फिल्टर बदल सकते हैं।",
 "Change the filters above or create a new matching listing.": "ऊपर के फिल्टर बदलें या नई मिलती-जुलती लिस्टिंग बनाएं।",
 "Create your first listing so buyers can contact you.": "पहली लिस्टिंग बनाएं ताकि खरीदार आपसे संपर्क कर सकें।",
 "Buyer mode": "खरीदार मोड",
 "Buy Crops": "फसलें खरीदें",
 "Crops listed by other farmers": "अन्य किसानों द्वारा सूचीबद्ध फसलें",
 "No matching crops to buy": "खरीदने के लिए मिलती-जुलती फसल नहीं",
 "No crops available to buy yet": "अभी खरीदने के लिए कोई फसल उपलब्ध नहीं",
 "No other farmer listings match the selected filters.": "चुने गए फिल्टर से कोई अन्य किसान लिस्टिंग नहीं मिलती।",
 "Other farmers have not listed crops yet.": "अन्य किसानों ने अभी फसलें सूचीबद्ध नहीं की हैं।",
 "Could not load your listings": "आपकी लिस्टिंग लोड नहीं हो सकीं",
 "Could not load crops to buy": "खरीदने वाली फसलें लोड नहीं हो सकीं",
 "Please refresh the page and try again.": "कृपया पेज रिफ्रेश करके फिर कोशिश करें।",
 "Crop Name": "फसल का नाम",
 "Quantity (quintals)": "मात्रा (क्विंटल)",
 "Price (Rs./quintal)": "भाव (Rs./क्विंटल)",
 "Description (optional)": "विवरण (वैकल्पिक)",
 "Upload Photo (optional)": "फोटो अपलोड करें (वैकल्पिक)",
 "First photo will appear on your crop listing.": "पहली फोटो आपकी फसल लिस्टिंग पर दिखेगी।",
 "Submit Listing": "लिस्टिंग जमा करें",
 "Seller Contact": "विक्रेता संपर्क",
 "Marketplace help": "बाज़ार सहायता",
 "Ask about marketplace...": "बाज़ार के बारे में पूछें...",
 "Namaste! Need help listing crops or finding buyers? Ask me!": "नमस्ते! फसल सूचीबद्ध करने या खरीदार खोजने में मदद चाहिए? पूछें!",
 "Contact": "संपर्क",
 "Chat": "चैट",
 "Your Listing": "आपकी लिस्टिंग",
 "Edit": "संपादित करें",
 "Delete": "हटाएं",
 "Listed by": "सूचीबद्ध किया",
 "listed by you": "आपकी सूचीबद्ध",
 "available to buy": "खरीदने के लिए उपलब्ध",
 "matching filters": "फिल्टर से मेल खाते",
 "of": "में से",
 "Resource Management Guide": "संसाधन प्रबंधन गाइड",
 "Optimize water, fertilizer, and pesticide usage": "पानी, खाद और कीटनाशक का बेहतर उपयोग करें",
 "Smart Irrigation": "स्मार्ट सिंचाई",
 "Current Weather Status": "मौजूदा मौसम स्थिति",
 "Fetching...": "लोड हो रहा है...",
 "Loading live weather-based advice...": "लाइव मौसम आधारित सलाह लोड हो रही है...",
 "High Humidity / Rain": "अधिक नमी / बारिश",
 "High Heat Alert": "अधिक गर्मी अलर्ट",
 "Optimal Conditions": "उत्तम स्थिति",
 "Rain is detected or expected. Postpone irrigation to save resources and prevent over-saturation.": "बारिश हो रही है या संभावना है। संसाधन बचाने और अधिक नमी से बचने के लिए सिंचाई रोकें।",
 "High evaporation risk. Water heavily in early morning and check soil moisture for heat stress.": "वाष्पीकरण जोखिम अधिक है। सुबह जल्दी पर्याप्त पानी दें और गर्मी तनाव के लिए मिट्टी की नमी जांचें।",
 "Standard irrigation cycles recommended. Monitor soil moisture for specific crop needs.": "सामान्य सिंचाई चक्र सुझाया गया है। फसल की जरूरत के अनुसार मिट्टी की नमी देखें।",
 "Best Time": "सर्वश्रेष्ठ समय",
 "Irrigate during early morning (4 AM - 8 AM) or late evening to minimize evaporation losses.": "वाष्पीकरण कम करने के लिए सुबह जल्दी (4 AM - 8 AM) या शाम को सिंचाई करें।",
 "Rainfall Guard": "वर्षा सुरक्षा",
 "If rain is expected within 24 hours, postpone irrigation to save water and prevent soil leaching.": "यदि 24 घंटे में बारिश की संभावना है, तो पानी बचाने और पोषक तत्व बहने से रोकने के लिए सिंचाई टालें।",
 "Fertilizer Optimization": "खाद अनुकूलन",
 "Seasonal Nutrients": "मौसमी पोषक तत्व",
 "Currently in Rabi season. Focusing on Nitrogen and Phosphorus for wheat/mustard growth.": "अभी रबी मौसम है। गेहूं/सरसों की वृद्धि के लिए नाइट्रोजन और फॉस्फोरस पर ध्यान दें।",
 "N-P-K Balancing": "N-P-K संतुलन",
 "Use soil test results to apply exact amounts of Nitrogen, Phosphorus, and Potassium. Avoid over-application.": "मिट्टी जांच के आधार पर नाइट्रोजन, फॉस्फोरस और पोटाश की सही मात्रा दें। अधिक उपयोग से बचें।",
 "Avoid Windy Days": "तेज हवा वाले दिन बचें",
 "Don't use top-dressing or spray fertilizers when wind speed exceeds 15 km/h to prevent drift.": "हवा 15 km/h से अधिक हो तो टॉप-ड्रेसिंग या स्प्रे खाद न करें।",
 "Pesticide & Safety Guide": "कीटनाशक और सुरक्षा गाइड",
 "Weather Condition": "मौसम स्थिति",
 "Avoid spraying if temperatures are above 30 C or humidity is below 40% as it can cause crop burn.": "तापमान 30 C से अधिक या नमी 40% से कम हो तो छिड़काव न करें, इससे फसल जल सकती है।",
 "Personal Safety": "व्यक्तिगत सुरक्षा",
 "Always wear protective gear (mask, gloves, boots) and spray in the direction of the wind, never against it.": "हमेशा सुरक्षा उपकरण (मास्क, दस्ताने, बूट) पहनें और हवा की दिशा में छिड़काव करें।",
 "Dosage Control": "खुराक नियंत्रण",
 "Follow the recommended dosage on the label. High concentrations do NOT mean better results.": "लेबल पर दी गई खुराक का पालन करें। अधिक सांद्रता बेहतर परिणाम नहीं देती।",
 "Resource Saving Estimator": "संसाधन बचत अनुमानक",
 "AI Assisted": "AI सहायता",
 "Water Saved": "पानी बचत",
 "Fertilizer Saved": "खाद बचत",
 "Avg. Savings / Acre": "औसत बचत / एकड़",
 "using weather sensors": "मौसम सेंसर से",
 "using split application": "विभाजित उपयोग से",
 "per growing season": "प्रति फसल मौसम",
 "Resource Expert": "संसाधन विशेषज्ञ",
 "Ask about farming resources...": "खेती संसाधनों के बारे में पूछें...",
 "My Profile": "मेरी प्रोफ़ाइल",
 "Manage your account and farm details": "अपना खाता और खेत विवरण प्रबंधित करें",
 "Wheat & Vegetable Farmer - Pune, Maharashtra": "गेहूं और सब्जी किसान - पुणे, महाराष्ट्र",
 "Verified Farmer": "सत्यापित किसान",
 "Joined Jan 2025": "जनवरी 2025 में जुड़े",
 "Edit Profile": "प्रोफ़ाइल संपादित करें",
 "Total Trades": "कुल व्यापार",
 "Revenue": "आय",
 "Rating": "रेटिंग",
 "Personal Information": "व्यक्तिगत जानकारी",
 "Phone": "फोन",
 "District": "जिला",
 "Village / Area": "गांव / क्षेत्र",
 "Save Changes": "बदलाव सेव करें",
 "Farm Details": "खेत विवरण",
 "Edit Farm Details": "खेत विवरण संपादित करें",
 "Total Farm Area": "कुल खेत क्षेत्र",
 "Soil Type": "मिट्टी का प्रकार",
 "Irrigation Source": "सिंचाई स्रोत",
 "Primary Crops": "मुख्य फसलें",
 "Farming Type": "खेती का प्रकार",
 "Not set": "सेट नहीं",
 "Save Farm Details": "खेत विवरण सेव करें",
 "Cancel": "रद्द करें",
 "Recent Activity": "हाल की गतिविधि",
 "Disease scan - Tomato leaf": "रोग स्कैन - टमाटर पत्ता",
 "Listed 50 qtl Wheat on Marketplace": "बाज़ार में 50 क्विंटल गेहूं सूचीबद्ध",
 "Checked wheat prices at Pune mandi": "पुणे मंडी में गेहूं भाव जांचे",
 "Contacted buyer - Anand Traders": "खरीदार से संपर्क - आनंद ट्रेडर्स",
 "Account help": "खाता सहायता",
 "Ask about your account...": "अपने खाते के बारे में पूछें...",
 "Namaste! Need help with your profile? Ask me!": "नमस्ते! प्रोफ़ाइल में मदद चाहिए? पूछें!",
 "Welcome to": "स्वागत है",
 "The smartest way to manage your farm. AI-powered insights, market access, and weather intelligence — all in one place.": "अपने खेत को संभालने का स्मार्ट तरीका। AI जानकारी, बाजार पहुंच और मौसम बुद्धिमत्ता - सब एक जगह।",
 "AI Disease Detection in Seconds": "सेकंडों में AI रोग पहचान",
 "Live Mandi Prices from 500+ Markets": "500+ बाजारों से लाइव मंडी भाव",
 "Hyper-local Weather Forecasts": "हाइपर-लोकल मौसम पूर्वानुमान",
 "Direct Farmer-to-Buyer Marketplace": "सीधा किसान-से-खरीदार बाज़ार",
 "AI Chatbot in Your Language": "आपकी भाषा में AI चैटबॉट",
 "Login": "लॉगिन",
 "Register": "रजिस्टर",
 "Welcome Back!": "वापस स्वागत है!",
 "Sign in to access your farm dashboard": "अपने खेत डैशबोर्ड में जाने के लिए साइन इन करें",
 "Enter your email or phone": "अपना ईमेल या फोन दर्ज करें",
 "Enter your password": "अपना पासवर्ड दर्ज करें",
 "First name": "पहला नाम",
 "Last name": "अंतिम नाम",
 "Select your state": "अपना राज्य चुनें",
 "Create a strong password": "मजबूत पासवर्ड बनाएं",
 "Terms of Service": "सेवा शर्तें",
 "Privacy Policy": "गोपनीयता नीति"
 },
 mr: {
 "Plant Disease Detection": "वनस्पती रोग ओळख",
 "Upload a leaf image for AI-powered diagnosis": "AI निदानासाठी पानाचा फोटो अपलोड करा",
 "Upload Leaf Image": "पानाचा फोटो अपलोड करा",
 "Drag & Drop or Click to Upload": "ड्रॅग-ड्रॉप करा किंवा अपलोडसाठी क्लिक करा",
 "Supports JPG, PNG, WEBP - Max 10MB": "JPG, PNG, WEBP समर्थित - कमाल 10MB",
 "Analyze Disease": "रोग तपासा",
 "Upload New Image": "नवा फोटो अपलोड करा",
 "Tips for Best Results": "चांगल्या परिणामांसाठी सूचना",
 "Take a clear, close-up photo of the affected leaf": "प्रभावित पानाचा स्पष्ट जवळचा फोटो घ्या",
 "Ensure good natural lighting": "चांगला नैसर्गिक प्रकाश ठेवा",
 "Include both healthy and affected parts of the leaf": "पानाचे निरोगी आणि प्रभावित भाग दोन्ही दाखवा",
 "Hold the camera steady and avoid blurriness": "कॅमेरा स्थिर ठेवा आणि धूसर फोटो टाळा",
 "Diagnosis Result": "निदान परिणाम",
 "AI Analysis": "AI विश्लेषण",
 "No Analysis Yet": "अजून विश्लेषण नाही",
 "Upload a leaf photo to get instant AI diagnosis": "तत्काळ AI निदानासाठी पानाचा फोटो अपलोड करा",
 "Recent Scans": "अलीकडील स्कॅन",
 "Common Crop Diseases": "सामान्य पीक रोग",
 "Late Blight": "लेट ब्लाइट",
 "Late Blight - Tomato": "लेट ब्लाइट - टोमॅटो",
 "Rust Disease": "तांबेरा रोग",
 "Powdery Mildew": "पावडरी मिल्ड्यू",
 "Powdery Mildew - Wheat": "पावडरी मिल्ड्यू - गहू",
 "Healthy - Rice": "निरोगी - तांदूळ",
 "Affects tomatoes and potatoes. Causes dark, water-soaked lesions on leaves. Spreads rapidly in humid conditions.": "टोमॅटो आणि बटाट्यावर परिणाम करतो. पानांवर गडद पाण्यासारखे डाग येतात आणि दमट हवेत वेगाने पसरतो.",
 "Common in wheat and barley. Orange-brown pustules appear on leaves. Reduces grain yield significantly.": "गहू आणि जौमध्ये सामान्य. पानांवर केशरी-तपकिरी डाग येतात आणि उत्पादन कमी होते.",
 "White powdery coating on leaves. Affects a wide range of crops including peas, wheat, and cucurbits.": "पानांवर पांढरी पावडरी थर येतो. वाटाणा, गहू आणि वेलवर्गीय पिकांसह अनेक पिकांवर परिणाम होतो.",
 "High Risk": "जास्त धोका",
 "Medium Risk": "मध्यम धोका",
 "Low-Med Risk": "कमी-मध्यम धोका",
 "Critical": "गंभीर",
 "Moderate": "मध्यम",
 "Healthy": "निरोगी",
 "Ask me about plant diseases": "वनस्पती रोगांबद्दल विचारा",
 "Ask about diseases...": "रोगांबद्दल विचारा...",
 "Namaste! Upload a leaf photo or ask me about any crop disease.": "नमस्कार! पानाचा फोटो अपलोड करा किंवा कोणत्याही पीक रोगाबद्दल विचारा.",
 "Live Market Prices": "लाईव्ह बाजारभाव",
 "Real-time mandi rates from across India": "भारतभरातील मंड्यांमधील रिअल-टाइम दर",
 "Most Gained": "सर्वाधिक वाढ",
 "Most Declined": "सर्वाधिक घसरण",
 "Total Mandis": "एकूण मंड्या",
 "Last Updated": "शेवटचे अपडेट",
 "Tracked live": "लाईव्ह ट्रॅक",
 "Auto-refresh": "ऑटो-रिफ्रेश",
 "Price Trends - Wheat": "किंमत कल - गहू",
 "Crop Comparison": "पीक तुलना",
 "Live Mandi Prices": "लाईव्ह बाजारभाव",
 "All States": "सर्व राज्ये",
 "All Crops": "सर्व पिके",
 "Mandi": "मंडी",
 "Min Price": "किमान भाव",
 "Max Price": "कमाल भाव",
 "Modal Price": "मॉडल भाव",
 "Nearby Buyers": "जवळचे खरेदीदार",
 "Ask about market prices": "बाजारभावांबद्दल विचारा",
 "Ask about prices...": "भावांबद्दल विचारा...",
 "Namaste! Ask me about current crop prices or market trends.": "नमस्कार! सध्याचे पीक भाव किंवा बाजार कलाबद्दल विचारा.",
 "Farmer Marketplace": "शेतकरी बाजारपेठ",
 "Buy & sell directly - no middlemen": "थेट खरेदी-विक्री - मध्यस्थांशिवाय",
 "Direct farmer trade": "थेट शेतकरी व्यापार",
 "Find crops faster, manage yours easily": "पिके लवकर शोधा, तुमची पिके सहज व्यवस्थापित करा",
 "Loading listings...": "लिस्टिंग लोड होत आहेत...",
 "Category": "श्रेणी",
 "All Categories": "सर्व श्रेणी",
 "Grains & Cereals": "धान्ये आणि कडधान्ये",
 "Pulses": "डाळी",
 "Vegetables": "भाज्या",
 "Fruits": "फळे",
 "Spices": "मसाले",
 "Oilseeds": "तेलबिया",
 "Cash Crops": "नगदी पिके",
 "Other": "इतर",
 "Location": "स्थान",
 "All Locations": "सर्व ठिकाणे",
 "Sort": "क्रम",
 "Sort: Latest": "क्रम: नवीनतम",
 "Price: Low to High": "भाव: कमी ते जास्त",
 "Price: High to Low": "भाव: जास्त ते कमी",
 "Quantity: High to Low": "प्रमाण: जास्त ते कमी",
 "Seller mode": "विक्रेता मोड",
 "My Listings": "माझ्या लिस्टिंग",
 "Crops you have listed for sale": "विक्रीसाठी तुम्ही सूचीबद्ध केलेली पिके",
 "No matching crops listed by you": "तुमची जुळणारी पिके सूचीबद्ध नाहीत",
 "No crops listed by you yet": "तुम्ही अजून पिके सूचीबद्ध केलेली नाहीत",
 "You can create a new listing or change the filters above.": "नवी लिस्टिंग तयार करा किंवा वरचे फिल्टर बदला.",
 "Change the filters above or create a new matching listing.": "वरचे फिल्टर बदला किंवा नवी जुळणारी लिस्टिंग तयार करा.",
 "Create your first listing so buyers can contact you.": "खरेदीदार संपर्क करू शकतील अशी पहिली लिस्टिंग तयार करा.",
 "Buyer mode": "खरेदीदार मोड",
 "Buy Crops": "पिके खरेदी करा",
 "Crops listed by other farmers": "इतर शेतकऱ्यांनी सूचीबद्ध केलेली पिके",
 "No matching crops to buy": "खरेदीसाठी जुळणारी पिके नाहीत",
 "No crops available to buy yet": "अजून खरेदीसाठी पिके उपलब्ध नाहीत",
 "No other farmer listings match the selected filters.": "निवडलेल्या फिल्टरशी इतर शेतकऱ्यांच्या लिस्टिंग जुळत नाहीत.",
 "Other farmers have not listed crops yet.": "इतर शेतकऱ्यांनी अजून पिके सूचीबद्ध केलेली नाहीत.",
 "Could not load your listings": "तुमच्या लिस्टिंग लोड झाल्या नाहीत",
 "Could not load crops to buy": "खरेदीची पिके लोड झाली नाहीत",
 "Please refresh the page and try again.": "कृपया पेज रिफ्रेश करून पुन्हा प्रयत्न करा.",
 "Crop Name": "पीक नाव",
 "Quantity (quintals)": "प्रमाण (क्विंटल)",
 "Price (Rs./quintal)": "भाव (Rs./क्विंटल)",
 "Description (optional)": "वर्णन (पर्यायी)",
 "Upload Photo (optional)": "फोटो अपलोड करा (पर्यायी)",
 "First photo will appear on your crop listing.": "पहिला फोटो तुमच्या पीक लिस्टिंगवर दिसेल.",
 "Submit Listing": "लिस्टिंग जमा करा",
 "Seller Contact": "विक्रेता संपर्क",
 "Marketplace help": "बाजारपेठ मदत",
 "Ask about marketplace...": "बाजारपेठेबद्दल विचारा...",
 "Namaste! Need help listing crops or finding buyers? Ask me!": "नमस्कार! पिके सूचीबद्ध करायला किंवा खरेदीदार शोधायला मदत हवी? विचारा!",
 "Contact": "संपर्क",
 "Chat": "चॅट",
 "Your Listing": "तुमची लिस्टिंग",
 "Edit": "संपादित करा",
 "Delete": "हटवा",
 "Listed by": "सूचीबद्ध केले",
 "listed by you": "तुमची सूचीबद्ध",
 "available to buy": "खरेदीसाठी उपलब्ध",
 "matching filters": "फिल्टरशी जुळणारे",
 "of": "पैकी",
 "Resource Management Guide": "संसाधन व्यवस्थापन मार्गदर्शक",
 "Optimize water, fertilizer, and pesticide usage": "पाणी, खत आणि कीटकनाशकाचा प्रभावी वापर करा",
 "Smart Irrigation": "स्मार्ट सिंचन",
 "Current Weather Status": "सध्याची हवामान स्थिती",
 "Fetching...": "लोड होत आहे...",
 "Loading live weather-based advice...": "लाईव्ह हवामानावर आधारित सल्ला लोड होत आहे...",
 "High Humidity / Rain": "जास्त आर्द्रता / पाऊस",
 "High Heat Alert": "जास्त उष्णता इशारा",
 "Optimal Conditions": "योग्य परिस्थिती",
 "Rain is detected or expected. Postpone irrigation to save resources and prevent over-saturation.": "पाऊस आहे किंवा अपेक्षित आहे. संसाधने वाचवण्यासाठी आणि जास्त ओलावा टाळण्यासाठी सिंचन पुढे ढकला.",
 "High evaporation risk. Water heavily in early morning and check soil moisture for heat stress.": "बाष्पीभवनाचा धोका जास्त आहे. पहाटे पाणी द्या आणि उष्णतेसाठी मातीतील ओलावा तपासा.",
 "Standard irrigation cycles recommended. Monitor soil moisture for specific crop needs.": "सामान्य सिंचन चक्र सुचवले आहे. पिकाच्या गरजेनुसार मातीतील ओलावा पहा.",
 "Best Time": "सर्वोत्तम वेळ",
 "Irrigate during early morning (4 AM - 8 AM) or late evening to minimize evaporation losses.": "बाष्पीभवन कमी करण्यासाठी पहाटे (4 AM - 8 AM) किंवा संध्याकाळी सिंचन करा.",
 "Rainfall Guard": "पावसापासून बचाव",
 "If rain is expected within 24 hours, postpone irrigation to save water and prevent soil leaching.": "24 तासांत पावसाची शक्यता असल्यास पाणी वाचवण्यासाठी सिंचन पुढे ढकला.",
 "Fertilizer Optimization": "खत अनुकूलन",
 "Seasonal Nutrients": "हंगामी पोषकद्रव्ये",
 "Currently in Rabi season. Focusing on Nitrogen and Phosphorus for wheat/mustard growth.": "सध्या रबी हंगाम आहे. गहू/मोहरी वाढीसाठी नायट्रोजन आणि फॉस्फरसवर भर द्या.",
 "N-P-K Balancing": "N-P-K संतुलन",
 "Use soil test results to apply exact amounts of Nitrogen, Phosphorus, and Potassium. Avoid over-application.": "माती चाचणीवरून नायट्रोजन, फॉस्फरस आणि पोटॅशियम योग्य प्रमाणात द्या.",
 "Avoid Windy Days": "वाऱ्याचे दिवस टाळा",
 "Don't use top-dressing or spray fertilizers when wind speed exceeds 15 km/h to prevent drift.": "वारा 15 km/h पेक्षा जास्त असल्यास टॉप-ड्रेसिंग किंवा स्प्रे खत वापरू नका.",
 "Pesticide & Safety Guide": "कीटकनाशक आणि सुरक्षा मार्गदर्शक",
 "Weather Condition": "हवामान स्थिती",
 "Avoid spraying if temperatures are above 30 C or humidity is below 40% as it can cause crop burn.": "तापमान 30 C पेक्षा जास्त किंवा आर्द्रता 40% पेक्षा कमी असल्यास फवारणी टाळा.",
 "Personal Safety": "वैयक्तिक सुरक्षा",
 "Always wear protective gear (mask, gloves, boots) and spray in the direction of the wind, never against it.": "सुरक्षा साधने घाला आणि वाऱ्याच्या दिशेने फवारणी करा.",
 "Dosage Control": "डोस नियंत्रण",
 "Follow the recommended dosage on the label. High concentrations do NOT mean better results.": "लेबलवरील शिफारस केलेला डोस पाळा. जास्त प्रमाण म्हणजे चांगले परिणाम नाहीत.",
 "Resource Saving Estimator": "संसाधन बचत अंदाजक",
 "AI Assisted": "AI सहाय्य",
 "Water Saved": "पाणी बचत",
 "Fertilizer Saved": "खत बचत",
 "Avg. Savings / Acre": "सरासरी बचत / एकर",
 "using weather sensors": "हवामान सेन्सर वापरून",
 "using split application": "विभाजित वापर करून",
 "per growing season": "प्रति वाढीचा हंगाम",
 "Resource Expert": "संसाधन तज्ञ",
 "Ask about farming resources...": "शेती संसाधनांबद्दल विचारा...",
 "My Profile": "माझी प्रोफाइल",
 "Manage your account and farm details": "तुमचे खाते आणि शेत तपशील व्यवस्थापित करा",
 "Wheat & Vegetable Farmer - Pune, Maharashtra": "गहू आणि भाजीपाला शेतकरी - पुणे, महाराष्ट्र",
 "Verified Farmer": "सत्यापित शेतकरी",
 "Joined Jan 2025": "जानेवारी 2025 पासून",
 "Edit Profile": "प्रोफाइल संपादित करा",
 "Total Trades": "एकूण व्यवहार",
 "Revenue": "उत्पन्न",
 "Rating": "रेटिंग",
 "Personal Information": "वैयक्तिक माहिती",
 "Phone": "फोन",
 "District": "जिल्हा",
 "Village / Area": "गाव / क्षेत्र",
 "Save Changes": "बदल सेव्ह करा",
 "Farm Details": "शेत तपशील",
 "Edit Farm Details": "शेत तपशील संपादित करा",
 "Total Farm Area": "एकूण शेत क्षेत्र",
 "Soil Type": "माती प्रकार",
 "Irrigation Source": "सिंचन स्रोत",
 "Primary Crops": "मुख्य पिके",
 "Farming Type": "शेती प्रकार",
 "Not set": "सेट नाही",
 "Save Farm Details": "शेत तपशील सेव्ह करा",
 "Cancel": "रद्द करा",
 "Recent Activity": "अलीकडील क्रिया",
 "Disease scan - Tomato leaf": "रोग स्कॅन - टोमॅटो पान",
 "Listed 50 qtl Wheat on Marketplace": "बाजारपेठेत 50 क्विंटल गहू सूचीबद्ध",
 "Checked wheat prices at Pune mandi": "पुणे मंडीत गव्हाचे भाव तपासले",
 "Contacted buyer - Anand Traders": "खरेदीदाराशी संपर्क - आनंद ट्रेडर्स",
 "Account help": "खाते मदत",
 "Ask about your account...": "तुमच्या खात्याबद्दल विचारा...",
 "Namaste! Need help with your profile? Ask me!": "नमस्कार! प्रोफाइलमध्ये मदत हवी? विचारा!",
 "Welcome to": "स्वागत आहे",
 "The smartest way to manage your farm. AI-powered insights, market access, and weather intelligence — all in one place.": "तुमचे शेत व्यवस्थापित करण्याचा स्मार्ट मार्ग. AI माहिती, बाजार प्रवेश आणि हवामान माहिती - सर्व एकाच ठिकाणी.",
 "AI Disease Detection in Seconds": "सेकंदात AI रोग ओळख",
 "Live Mandi Prices from 500+ Markets": "500+ बाजारातून लाईव्ह बाजारभाव",
 "Hyper-local Weather Forecasts": "हायपर-लोकल हवामान अंदाज",
 "Direct Farmer-to-Buyer Marketplace": "थेट शेतकरी-ते-खरेदीदार बाजारपेठ",
 "AI Chatbot in Your Language": "तुमच्या भाषेत AI चॅटबॉट",
 "Login": "लॉगिन",
 "Register": "नोंदणी",
 "Welcome Back!": "पुन्हा स्वागत!",
 "Sign in to access your farm dashboard": "तुमच्या शेत डॅशबोर्डसाठी साइन इन करा",
 "Enter your email or phone": "तुमचा ईमेल किंवा फोन द्या",
 "Enter your password": "तुमचा पासवर्ड द्या",
 "First name": "पहिले नाव",
 "Last name": "आडनाव",
 "Select your state": "तुमचे राज्य निवडा",
 "Create a strong password": "मजबूत पासवर्ड तयार करा",
 "Terms of Service": "सेवा अटी",
 "Privacy Policy": "गोपनीयता धोरण"
 },
 pa: {
 "Plant Disease Detection": "ਪੌਧਾ ਰੋਗ ਪਛਾਣ",
 "Upload a leaf image for AI-powered diagnosis": "AI ਪਛਾਣ ਲਈ ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
 "Upload Leaf Image": "ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
 "Drag & Drop or Click to Upload": "ਡ੍ਰੈਗ-ਡ੍ਰਾਪ ਕਰੋ ਜਾਂ ਅਪਲੋਡ ਲਈ ਕਲਿੱਕ ਕਰੋ",
 "Supports JPG, PNG, WEBP - Max 10MB": "JPG, PNG, WEBP ਸਮਰਥਿਤ - ਵੱਧ ਤੋਂ ਵੱਧ 10MB",
 "Analyze Disease": "ਰੋਗ ਜਾਂਚੋ",
 "Upload New Image": "ਨਵੀਂ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
 "Tips for Best Results": "ਚੰਗੇ ਨਤੀਜਿਆਂ ਲਈ ਸੁਝਾਅ",
 "Take a clear, close-up photo of the affected leaf": "ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਨੇੜਲੀ ਤਸਵੀਰ ਲਓ",
 "Ensure good natural lighting": "ਚੰਗੀ ਕੁਦਰਤੀ ਰੌਸ਼ਨੀ ਰੱਖੋ",
 "Include both healthy and affected parts of the leaf": "ਪੱਤੇ ਦੇ ਸਿਹਤਮੰਦ ਅਤੇ ਪ੍ਰਭਾਵਿਤ ਦੋਵੇਂ ਹਿੱਸੇ ਦਿਖਾਓ",
 "Hold the camera steady and avoid blurriness": "ਕੈਮਰਾ ਸਥਿਰ ਰੱਖੋ ਅਤੇ ਧੁੰਦਲੀ ਤਸਵੀਰ ਤੋਂ ਬਚੋ",
 "Diagnosis Result": "ਜਾਂਚ ਨਤੀਜਾ",
 "AI Analysis": "AI ਵਿਸ਼ਲੇਸ਼ਣ",
 "No Analysis Yet": "ਅਜੇ ਕੋਈ ਵਿਸ਼ਲੇਸ਼ਣ ਨਹੀਂ",
 "Upload a leaf photo to get instant AI diagnosis": "ਤੁਰੰਤ AI ਜਾਂਚ ਲਈ ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
 "Recent Scans": "ਤਾਜ਼ਾ ਸਕੈਨ",
 "Common Crop Diseases": "ਆਮ ਫ਼ਸਲ ਰੋਗ",
 "Late Blight": "ਲੇਟ ਬਲਾਈਟ",
 "Late Blight - Tomato": "ਲੇਟ ਬਲਾਈਟ - ਟਮਾਟਰ",
 "Rust Disease": "ਰਸਟ ਰੋਗ",
 "Powdery Mildew": "ਪਾਊਡਰੀ ਮਿਲਡਿਊ",
 "Powdery Mildew - Wheat": "ਪਾਊਡਰੀ ਮਿਲਡਿਊ - ਗੇਂਹੂ",
 "Healthy - Rice": "ਸਿਹਤਮੰਦ - ਚੌਲ",
 "Affects tomatoes and potatoes. Causes dark, water-soaked lesions on leaves. Spreads rapidly in humid conditions.": "ਟਮਾਟਰ ਅਤੇ ਆਲੂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦਾ ਹੈ। ਪੱਤਿਆਂ ਤੇ ਗੂੜ੍ਹੇ ਪਾਣੀ ਵਰਗੇ ਧੱਬੇ ਬਣਦੇ ਹਨ ਅਤੇ ਨਮੀ ਵਿੱਚ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲਦਾ ਹੈ।",
 "Common in wheat and barley. Orange-brown pustules appear on leaves. Reduces grain yield significantly.": "ਗੇਂਹੂ ਅਤੇ ਜੌ ਵਿੱਚ ਆਮ। ਪੱਤਿਆਂ ਤੇ ਸੰਤਰੀ-ਭੂਰੇ ਦਾਣੇ ਆਉਂਦੇ ਹਨ ਅਤੇ ਪੈਦਾਵਾਰ ਘਟਦੀ ਹੈ।",
 "White powdery coating on leaves. Affects a wide range of crops including peas, wheat, and cucurbits.": "ਪੱਤਿਆਂ ਤੇ ਚਿੱਟੀ ਪਾਊਡਰ ਵਰਗੀ ਪਰਤ। ਮਟਰ, ਗੇਂਹੂ ਅਤੇ ਬੇਲਦਾਰ ਫ਼ਸਲਾਂ ਸਮੇਤ ਕਈ ਫ਼ਸਲਾਂ ਤੇ ਪ੍ਰਭਾਵ।",
 "High Risk": "ਉੱਚ ਜੋਖਮ",
 "Medium Risk": "ਮੱਧਮ ਜੋਖਮ",
 "Low-Med Risk": "ਘੱਟ-ਮੱਧਮ ਜੋਖਮ",
 "Critical": "ਗੰਭੀਰ",
 "Moderate": "ਮੱਧਮ",
 "Healthy": "ਸਿਹਤਮੰਦ",
 "Ask me about plant diseases": "ਪੌਧੇ ਦੇ ਰੋਗਾਂ ਬਾਰੇ ਪੁੱਛੋ",
 "Ask about diseases...": "ਰੋਗਾਂ ਬਾਰੇ ਪੁੱਛੋ...",
 "Namaste! Upload a leaf photo or ask me about any crop disease.": "ਨਮਸਤੇ! ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਜਾਂ ਕਿਸੇ ਵੀ ਫ਼ਸਲ ਰੋਗ ਬਾਰੇ ਪੁੱਛੋ।",
 "Live Market Prices": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
 "Real-time mandi rates from across India": "ਭਾਰਤ ਭਰ ਦੀਆਂ ਮੰਡੀਆਂ ਤੋਂ ਰੀਅਲ-ਟਾਈਮ ਦਰਾਂ",
 "Most Gained": "ਸਭ ਤੋਂ ਵੱਧ ਵਾਧਾ",
 "Most Declined": "ਸਭ ਤੋਂ ਵੱਧ ਘਾਟਾ",
 "Total Mandis": "ਕੁੱਲ ਮੰਡੀਆਂ",
 "Last Updated": "ਆਖਰੀ ਅਪਡੇਟ",
 "Tracked live": "ਲਾਈਵ ਟ੍ਰੈਕ",
 "Auto-refresh": "ਆਟੋ-ਰਿਫਰੈਸ਼",
 "Price Trends - Wheat": "ਕੀਮਤ ਰੁਝਾਨ - ਗੇਂਹੂ",
 "Crop Comparison": "ਫ਼ਸਲ ਤੁਲਨਾ",
 "Live Mandi Prices": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
 "All States": "ਸਾਰੇ ਰਾਜ",
 "All Crops": "ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ",
 "Mandi": "ਮੰਡੀ",
 "Min Price": "ਘੱਟੋ-ਘੱਟ ਭਾਅ",
 "Max Price": "ਵੱਧ ਤੋਂ ਵੱਧ ਭਾਅ",
 "Modal Price": "ਮੋਡਲ ਭਾਅ",
 "Nearby Buyers": "ਨੇੜਲੇ ਖਰੀਦਦਾਰ",
 "Ask about market prices": "ਮੰਡੀ ਭਾਅ ਬਾਰੇ ਪੁੱਛੋ",
 "Ask about prices...": "ਭਾਅ ਬਾਰੇ ਪੁੱਛੋ...",
 "Namaste! Ask me about current crop prices or market trends.": "ਨਮਸਤੇ! ਮੌਜੂਦਾ ਫ਼ਸਲ ਭਾਅ ਜਾਂ ਬਾਜ਼ਾਰ ਰੁਝਾਨ ਬਾਰੇ ਪੁੱਛੋ।",
 "Farmer Marketplace": "ਕਿਸਾਨ ਬਾਜ਼ਾਰ",
 "Buy & sell directly - no middlemen": "ਸਿੱਧਾ ਖਰੀਦੋ ਤੇ ਵੇਚੋ - ਬਿਚੌਲਿਆਂ ਤੋਂ ਬਿਨਾਂ",
 "Direct farmer trade": "ਸਿੱਧਾ ਕਿਸਾਨ ਵਪਾਰ",
 "Find crops faster, manage yours easily": "ਫ਼ਸਲਾਂ ਜਲਦੀ ਲੱਭੋ, ਆਪਣੀਆਂ ਆਸਾਨੀ ਨਾਲ ਸੰਭਾਲੋ",
 "Loading listings...": "ਲਿਸਟਿੰਗ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...",
 "Category": "ਸ਼੍ਰੇਣੀ",
 "All Categories": "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ",
 "Grains & Cereals": "ਅਨਾਜ",
 "Pulses": "ਦਾਲਾਂ",
 "Vegetables": "ਸਬਜ਼ੀਆਂ",
 "Fruits": "ਫਲ",
 "Spices": "ਮਸਾਲੇ",
 "Oilseeds": "ਤੇਲ ਬੀਜ",
 "Cash Crops": "ਨਕਦੀ ਫ਼ਸਲਾਂ",
 "Other": "ਹੋਰ",
 "Location": "ਸਥਾਨ",
 "All Locations": "ਸਾਰੇ ਸਥਾਨ",
 "Sort": "ਕ੍ਰਮ",
 "Sort: Latest": "ਕ੍ਰਮ: ਨਵਾਂ",
 "Price: Low to High": "ਭਾਅ: ਘੱਟ ਤੋਂ ਵੱਧ",
 "Price: High to Low": "ਭਾਅ: ਵੱਧ ਤੋਂ ਘੱਟ",
 "Quantity: High to Low": "ਮਾਤਰਾ: ਵੱਧ ਤੋਂ ਘੱਟ",
 "Seller mode": "ਵਿਕਰੇਤਾ ਮੋਡ",
 "My Listings": "ਮੇਰੀਆਂ ਲਿਸਟਿੰਗਾਂ",
 "Crops you have listed for sale": "ਤੁਹਾਡੀਆਂ ਵਿਕਰੀ ਲਈ ਲਿਸਟ ਕੀਤੀਆਂ ਫ਼ਸਲਾਂ",
 "No matching crops listed by you": "ਤੁਹਾਡੇ ਵੱਲੋਂ ਕੋਈ ਮਿਲਦੀ ਫ਼ਸਲ ਲਿਸਟ ਨਹੀਂ",
 "No crops listed by you yet": "ਤੁਸੀਂ ਅਜੇ ਕੋਈ ਫ਼ਸਲ ਲਿਸਟ ਨਹੀਂ ਕੀਤੀ",
 "You can create a new listing or change the filters above.": "ਨਵੀਂ ਲਿਸਟਿੰਗ ਬਣਾਓ ਜਾਂ ਉੱਪਰਲੇ ਫਿਲਟਰ ਬਦਲੋ।",
 "Change the filters above or create a new matching listing.": "ਉੱਪਰਲੇ ਫਿਲਟਰ ਬਦਲੋ ਜਾਂ ਨਵੀਂ ਮਿਲਦੀ ਲਿਸਟਿੰਗ ਬਣਾਓ।",
 "Create your first listing so buyers can contact you.": "ਪਹਿਲੀ ਲਿਸਟਿੰਗ ਬਣਾਓ ਤਾਂ ਜੋ ਖਰੀਦਦਾਰ ਸੰਪਰਕ ਕਰ ਸਕਣ।",
 "Buyer mode": "ਖਰੀਦਦਾਰ ਮੋਡ",
 "Buy Crops": "ਫ਼ਸਲਾਂ ਖਰੀਦੋ",
 "Crops listed by other farmers": "ਹੋਰ ਕਿਸਾਨਾਂ ਵੱਲੋਂ ਲਿਸਟ ਕੀਤੀਆਂ ਫ਼ਸਲਾਂ",
 "No matching crops to buy": "ਖਰੀਦਣ ਲਈ ਮਿਲਦੀ ਫ਼ਸਲ ਨਹੀਂ",
 "No crops available to buy yet": "ਅਜੇ ਖਰੀਦਣ ਲਈ ਫ਼ਸਲਾਂ ਉਪਲਬਧ ਨਹੀਂ",
 "No other farmer listings match the selected filters.": "ਚੁਣੇ ਫਿਲਟਰਾਂ ਨਾਲ ਹੋਰ ਕਿਸਾਨ ਲਿਸਟਿੰਗ ਨਹੀਂ ਮਿਲਦੀ।",
 "Other farmers have not listed crops yet.": "ਹੋਰ ਕਿਸਾਨਾਂ ਨੇ ਅਜੇ ਫ਼ਸਲਾਂ ਲਿਸਟ ਨਹੀਂ ਕੀਤੀਆਂ।",
 "Could not load your listings": "ਤੁਹਾਡੀਆਂ ਲਿਸਟਿੰਗਾਂ ਲੋਡ ਨਹੀਂ ਹੋਈਆਂ",
 "Could not load crops to buy": "ਖਰੀਦਣ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ ਲੋਡ ਨਹੀਂ ਹੋਈਆਂ",
 "Please refresh the page and try again.": "ਕਿਰਪਾ ਕਰਕੇ ਪੇਜ ਰਿਫਰੈਸ਼ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
 "Crop Name": "ਫ਼ਸਲ ਦਾ ਨਾਮ",
 "Quantity (quintals)": "ਮਾਤਰਾ (ਕੁਇੰਟਲ)",
 "Price (Rs./quintal)": "ਭਾਅ (Rs./ਕੁਇੰਟਲ)",
 "Description (optional)": "ਵੇਰਵਾ (ਵਿਕਲਪਿਕ)",
 "Upload Photo (optional)": "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ (ਵਿਕਲਪਿਕ)",
 "First photo will appear on your crop listing.": "ਪਹਿਲੀ ਫੋਟੋ ਤੁਹਾਡੀ ਫ਼ਸਲ ਲਿਸਟਿੰਗ ਤੇ ਦਿਖੇਗੀ।",
 "Submit Listing": "ਲਿਸਟਿੰਗ ਜਮ੍ਹਾਂ ਕਰੋ",
 "Seller Contact": "ਵਿਕਰੇਤਾ ਸੰਪਰਕ",
 "Marketplace help": "ਬਾਜ਼ਾਰ ਮਦਦ",
 "Ask about marketplace...": "ਬਾਜ਼ਾਰ ਬਾਰੇ ਪੁੱਛੋ...",
 "Namaste! Need help listing crops or finding buyers? Ask me!": "ਨਮਸਤੇ! ਫ਼ਸਲ ਲਿਸਟ ਕਰਨ ਜਾਂ ਖਰੀਦਦਾਰ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ? ਪੁੱਛੋ!",
 "Contact": "ਸੰਪਰਕ",
 "Chat": "ਚੈਟ",
 "Your Listing": "ਤੁਹਾਡੀ ਲਿਸਟਿੰਗ",
 "Edit": "ਸੋਧੋ",
 "Delete": "ਹਟਾਓ",
 "Listed by": "ਲਿਸਟ ਕੀਤਾ",
 "listed by you": "ਤੁਹਾਡੀ ਲਿਸਟ",
 "available to buy": "ਖਰੀਦਣ ਲਈ ਉਪਲਬਧ",
 "matching filters": "ਫਿਲਟਰ ਨਾਲ ਮਿਲਦੇ",
 "of": "ਵਿੱਚੋਂ",
 "Resource Management Guide": "ਸੰਸਾਧਨ ਪ੍ਰਬੰਧਨ ਗਾਈਡ",
 "Optimize water, fertilizer, and pesticide usage": "ਪਾਣੀ, ਖਾਦ ਅਤੇ ਕੀਟਨਾਸ਼ਕ ਦੀ ਵਰਤੋਂ ਸੁਧਾਰੋ",
 "Smart Irrigation": "ਸਮਾਰਟ ਸਿੰਚਾਈ",
 "Current Weather Status": "ਮੌਜੂਦਾ ਮੌਸਮ ਸਥਿਤੀ",
 "Fetching...": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
 "Loading live weather-based advice...": "ਲਾਈਵ ਮੌਸਮ-ਅਧਾਰਿਤ ਸਲਾਹ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
 "High Humidity / Rain": "ਵੱਧ ਨਮੀ / ਮੀਂਹ",
 "High Heat Alert": "ਵੱਧ ਗਰਮੀ ਅਲਰਟ",
 "Optimal Conditions": "ਉਚਿਤ ਹਾਲਾਤ",
 "Rain is detected or expected. Postpone irrigation to save resources and prevent over-saturation.": "ਮੀਂਹ ਹੈ ਜਾਂ ਸੰਭਾਵਨਾ ਹੈ। ਪਾਣੀ ਬਚਾਉਣ ਲਈ ਸਿੰਚਾਈ ਰੋਕੋ।",
 "High evaporation risk. Water heavily in early morning and check soil moisture for heat stress.": "ਬਾਫ਼ ਬਣਨ ਦਾ ਜੋਖਮ ਵੱਧ ਹੈ। ਸਵੇਰੇ ਜਲਦੀ ਪਾਣੀ ਦਿਓ ਅਤੇ ਮਿੱਟੀ ਨਮੀ ਜਾਂਚੋ।",
 "Standard irrigation cycles recommended. Monitor soil moisture for specific crop needs.": "ਆਮ ਸਿੰਚਾਈ ਚੱਕਰ ਸਿਫਾਰਸ਼ੀ। ਫ਼ਸਲ ਦੀ ਲੋੜ ਮੁਤਾਬਕ ਮਿੱਟੀ ਨਮੀ ਵੇਖੋ।",
 "Best Time": "ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ",
 "Irrigate during early morning (4 AM - 8 AM) or late evening to minimize evaporation losses.": "ਬਾਫ਼ ਘਟਾਉਣ ਲਈ ਸਵੇਰੇ (4 AM - 8 AM) ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਸਿੰਚਾਈ ਕਰੋ।",
 "Rainfall Guard": "ਮੀਂਹ ਸੁਰੱਖਿਆ",
 "If rain is expected within 24 hours, postpone irrigation to save water and prevent soil leaching.": "24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਹੋਵੇ ਤਾਂ ਪਾਣੀ ਬਚਾਉਣ ਲਈ ਸਿੰਚਾਈ ਟਾਲੋ।",
 "Fertilizer Optimization": "ਖਾਦ ਅਨੁਕੂਲਤਾ",
 "Seasonal Nutrients": "ਮੌਸਮੀ ਪੋਸ਼ਕ",
 "Currently in Rabi season. Focusing on Nitrogen and Phosphorus for wheat/mustard growth.": "ਇਸ ਵੇਲੇ ਰਬੀ ਸੀਜ਼ਨ ਹੈ। ਗੇਂਹੂ/ਸਰੋਂ ਲਈ ਨਾਈਟਰੋਜਨ ਅਤੇ ਫਾਸਫੋਰਸ ਤੇ ਧਿਆਨ ਦਿਓ।",
 "N-P-K Balancing": "N-P-K ਸੰਤੁਲਨ",
 "Use soil test results to apply exact amounts of Nitrogen, Phosphorus, and Potassium. Avoid over-application.": "ਮਿੱਟੀ ਟੈਸਟ ਅਨੁਸਾਰ ਨਾਈਟਰੋਜਨ, ਫਾਸਫੋਰਸ ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ਦੀ ਸਹੀ ਮਾਤਰਾ ਦਿਓ।",
 "Avoid Windy Days": "ਤੇਜ਼ ਹਵਾ ਵਾਲੇ ਦਿਨ ਬਚੋ",
 "Don't use top-dressing or spray fertilizers when wind speed exceeds 15 km/h to prevent drift.": "ਹਵਾ 15 km/h ਤੋਂ ਵੱਧ ਹੋਵੇ ਤਾਂ ਟਾਪ-ਡ੍ਰੈਸਿੰਗ ਜਾਂ ਸਪ੍ਰੇ ਖਾਦ ਨਾ ਕਰੋ।",
 "Pesticide & Safety Guide": "ਕੀਟਨਾਸ਼ਕ ਅਤੇ ਸੁਰੱਖਿਆ ਗਾਈਡ",
 "Weather Condition": "ਮੌਸਮ ਸਥਿਤੀ",
 "Avoid spraying if temperatures are above 30 C or humidity is below 40% as it can cause crop burn.": "ਤਾਪਮਾਨ 30 C ਤੋਂ ਵੱਧ ਜਾਂ ਨਮੀ 40% ਤੋਂ ਘੱਟ ਹੋਵੇ ਤਾਂ ਛਿੜਕਾਅ ਤੋਂ ਬਚੋ।",
 "Personal Safety": "ਨਿੱਜੀ ਸੁਰੱਖਿਆ",
 "Always wear protective gear (mask, gloves, boots) and spray in the direction of the wind, never against it.": "ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਆ ਸਾਮਾਨ ਪਾਓ ਅਤੇ ਹਵਾ ਦੀ ਦਿਸ਼ਾ ਵਿੱਚ ਛਿੜਕਾਅ ਕਰੋ।",
 "Dosage Control": "ਡੋਜ਼ ਕੰਟਰੋਲ",
 "Follow the recommended dosage on the label. High concentrations do NOT mean better results.": "ਲੇਬਲ ਤੇ ਦਿੱਤੀ ਮਾਤਰਾ ਮੰਨੋ। ਵੱਧ ਗਾੜ੍ਹਾਪਣ ਚੰਗਾ ਨਤੀਜਾ ਨਹੀਂ ਦਿੰਦਾ।",
 "Resource Saving Estimator": "ਸੰਸਾਧਨ ਬਚਤ ਅਨੁਮਾਨ",
 "AI Assisted": "AI ਸਹਾਇਤਾ",
 "Water Saved": "ਪਾਣੀ ਬਚਤ",
 "Fertilizer Saved": "ਖਾਦ ਬਚਤ",
 "Avg. Savings / Acre": "ਔਸਤ ਬਚਤ / ਏਕੜ",
 "using weather sensors": "ਮੌਸਮ ਸੈਂਸਰ ਨਾਲ",
 "using split application": "ਵੰਡੇ ਹੋਏ ਵਰਤੋਂ ਨਾਲ",
 "per growing season": "ਪ੍ਰਤੀ ਫ਼ਸਲ ਸੀਜ਼ਨ",
 "Resource Expert": "ਸੰਸਾਧਨ ਮਾਹਿਰ",
 "Ask about farming resources...": "ਖੇਤੀ ਸੰਸਾਧਨਾਂ ਬਾਰੇ ਪੁੱਛੋ...",
 "My Profile": "ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ",
 "Manage your account and farm details": "ਆਪਣਾ ਖਾਤਾ ਅਤੇ ਖੇਤ ਵੇਰਵੇ ਸੰਭਾਲੋ",
 "Wheat & Vegetable Farmer - Pune, Maharashtra": "ਗੇਂਹੂ ਅਤੇ ਸਬਜ਼ੀ ਕਿਸਾਨ - ਪੁਨੇ, ਮਹਾਰਾਸ਼ਟਰ",
 "Verified Farmer": "ਤਸਦੀਕਸ਼ੁਦਾ ਕਿਸਾਨ",
 "Joined Jan 2025": "ਜਨਵਰੀ 2025 ਵਿੱਚ ਜੁੜੇ",
 "Edit Profile": "ਪ੍ਰੋਫਾਈਲ ਸੋਧੋ",
 "Total Trades": "ਕੁੱਲ ਵਪਾਰ",
 "Revenue": "ਆਮਦਨ",
 "Rating": "ਰੇਟਿੰਗ",
 "Personal Information": "ਨਿੱਜੀ ਜਾਣਕਾਰੀ",
 "Phone": "ਫੋਨ",
 "District": "ਜ਼ਿਲ੍ਹਾ",
 "Village / Area": "ਪਿੰਡ / ਖੇਤਰ",
 "Save Changes": "ਬਦਲਾਅ ਸੇਵ ਕਰੋ",
 "Farm Details": "ਖੇਤ ਵੇਰਵੇ",
 "Edit Farm Details": "ਖੇਤ ਵੇਰਵੇ ਸੋਧੋ",
 "Total Farm Area": "ਕੁੱਲ ਖੇਤ ਖੇਤਰ",
 "Soil Type": "ਮਿੱਟੀ ਕਿਸਮ",
 "Irrigation Source": "ਸਿੰਚਾਈ ਸਰੋਤ",
 "Primary Crops": "ਮੁੱਖ ਫ਼ਸਲਾਂ",
 "Farming Type": "ਖੇਤੀ ਕਿਸਮ",
 "Not set": "ਸੈੱਟ ਨਹੀਂ",
 "Save Farm Details": "ਖੇਤ ਵੇਰਵੇ ਸੇਵ ਕਰੋ",
 "Cancel": "ਰੱਦ ਕਰੋ",
 "Recent Activity": "ਤਾਜ਼ਾ ਗਤੀਵਿਧੀ",
 "Disease scan - Tomato leaf": "ਰੋਗ ਸਕੈਨ - ਟਮਾਟਰ ਪੱਤਾ",
 "Listed 50 qtl Wheat on Marketplace": "ਬਾਜ਼ਾਰ ਵਿੱਚ 50 ਕੁਇੰਟਲ ਗੇਂਹੂ ਲਿਸਟ ਕੀਤਾ",
 "Checked wheat prices at Pune mandi": "ਪੁਨੇ ਮੰਡੀ ਵਿੱਚ ਗੇਂਹੂ ਭਾਅ ਵੇਖੇ",
 "Contacted buyer - Anand Traders": "ਖਰੀਦਦਾਰ ਨਾਲ ਸੰਪਰਕ - ਆਨੰਦ ਟ੍ਰੇਡਰਜ਼",
 "Account help": "ਖਾਤਾ ਮਦਦ",
 "Ask about your account...": "ਆਪਣੇ ਖਾਤੇ ਬਾਰੇ ਪੁੱਛੋ...",
 "Namaste! Need help with your profile? Ask me!": "ਨਮਸਤੇ! ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ? ਪੁੱਛੋ!",
 "Welcome to": "ਸੁਆਗਤ ਹੈ",
 "The smartest way to manage your farm. AI-powered insights, market access, and weather intelligence — all in one place.": "ਆਪਣਾ ਖੇਤ ਸੰਭਾਲਣ ਦਾ ਸਮਾਰਟ ਤਰੀਕਾ। AI ਜਾਣਕਾਰੀ, ਬਾਜ਼ਾਰ ਪਹੁੰਚ ਅਤੇ ਮੌਸਮ ਜਾਣਕਾਰੀ - ਸਭ ਇੱਕ ਥਾਂ।",
 "AI Disease Detection in Seconds": "ਸੈਕਿੰਡਾਂ ਵਿੱਚ AI ਰੋਗ ਪਛਾਣ",
 "Live Mandi Prices from 500+ Markets": "500+ ਬਾਜ਼ਾਰਾਂ ਤੋਂ ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
 "Hyper-local Weather Forecasts": "ਹਾਈਪਰ-ਲੋਕਲ ਮੌਸਮ ਅਨੁਮਾਨ",
 "Direct Farmer-to-Buyer Marketplace": "ਸਿੱਧਾ ਕਿਸਾਨ-ਤੋਂ-ਖਰੀਦਦਾਰ ਬਾਜ਼ਾਰ",
 "AI Chatbot in Your Language": "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ AI ਚੈਟਬੋਟ",
 "Login": "ਲਾਗਇਨ",
 "Register": "ਰਜਿਸਟਰ",
 "Welcome Back!": "ਵਾਪਸ ਸੁਆਗਤ!",
 "Sign in to access your farm dashboard": "ਆਪਣੇ ਖੇਤ ਡੈਸ਼ਬੋਰਡ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ",
 "Enter your email or phone": "ਆਪਣਾ ਈਮੇਲ ਜਾਂ ਫੋਨ ਦਿਓ",
 "Enter your password": "ਆਪਣਾ ਪਾਸਵਰਡ ਦਿਓ",
 "First name": "ਪਹਿਲਾ ਨਾਮ",
 "Last name": "ਆਖਰੀ ਨਾਮ",
 "Select your state": "ਆਪਣਾ ਰਾਜ ਚੁਣੋ",
 "Create a strong password": "ਮਜ਼ਬੂਤ ਪਾਸਵਰਡ ਬਣਾਓ",
 "Terms of Service": "ਸੇਵਾ ਸ਼ਰਤਾਂ",
 "Privacy Policy": "ਪਰਾਈਵੇਸੀ ਨੀਤੀ"
 },
 ta: {
 "Plant Disease Detection": "தாவர நோய் கண்டறிதல்",
 "Upload a leaf image for AI-powered diagnosis": "AI நோயறிதலுக்கு இலை படத்தை பதிவேற்றவும்",
 "Upload Leaf Image": "இலை படத்தை பதிவேற்றவும்",
 "Drag & Drop or Click to Upload": "இழுத்து விடவும் அல்லது பதிவேற்ற கிளிக் செய்யவும்",
 "Supports JPG, PNG, WEBP - Max 10MB": "JPG, PNG, WEBP ஆதரவு - அதிகபட்சம் 10MB",
 "Analyze Disease": "நோய் பகுப்பாய்வு",
 "Upload New Image": "புதிய படத்தை பதிவேற்றவும்",
 "Tips for Best Results": "சிறந்த முடிவுக்கான குறிப்புகள்",
 "Take a clear, close-up photo of the affected leaf": "பாதிக்கப்பட்ட இலையின் தெளிவான நெருக்கப் படம் எடுக்கவும்",
 "Ensure good natural lighting": "நல்ல இயற்கை வெளிச்சம் இருக்கட்டும்",
 "Include both healthy and affected parts of the leaf": "இலையின் ஆரோக்கிய மற்றும் பாதிக்கப்பட்ட பகுதிகளை சேர்க்கவும்",
 "Hold the camera steady and avoid blurriness": "கேமராவை நிலையாக வைத்து மங்கலானதை தவிர்க்கவும்",
 "Diagnosis Result": "நோயறிதல் முடிவு",
 "AI Analysis": "AI பகுப்பாய்வு",
 "No Analysis Yet": "இன்னும் பகுப்பாய்வு இல்லை",
 "Upload a leaf photo to get instant AI diagnosis": "உடனடி AI நோயறிதலுக்கு இலை படத்தை பதிவேற்றவும்",
 "Recent Scans": "சமீபத்திய ஸ்கான்கள்",
 "Common Crop Diseases": "பொதுவான பயிர் நோய்கள்",
 "Late Blight": "லேட் பிளைட்",
 "Late Blight - Tomato": "லேட் பிளைட் - தக்காளி",
 "Rust Disease": "ரஸ்ட் நோய்",
 "Powdery Mildew": "பவுடரி மில்ட்யூ",
 "Powdery Mildew - Wheat": "பவுடரி மில்ட்யூ - கோதுமை",
 "Healthy - Rice": "ஆரோக்கியம் - அரிசி",
 "Affects tomatoes and potatoes. Causes dark, water-soaked lesions on leaves. Spreads rapidly in humid conditions.": "தக்காளி மற்றும் உருளைக்கிழங்கை பாதிக்கும். இலைகளில் கருமையான நீர் ஊறிய புள்ளிகள் உருவாகும்; ஈரத்தில் வேகமாக பரவும்.",
 "Common in wheat and barley. Orange-brown pustules appear on leaves. Reduces grain yield significantly.": "கோதுமை மற்றும் பார்லியில் பொதுவானது. இலைகளில் ஆரஞ்சு-பழுப்பு புள்ளிகள் தோன்றி மகசூல் குறையும்.",
 "White powdery coating on leaves. Affects a wide range of crops including peas, wheat, and cucurbits.": "இலைகளில் வெள்ளை தூள் படலம். பட்டாணி, கோதுமை மற்றும் கொடிவகை பயிர்கள் உட்பட பல பயிர்களை பாதிக்கும்.",
 "High Risk": "அதிக ஆபத்து",
 "Medium Risk": "மிதமான ஆபத்து",
 "Low-Med Risk": "குறைவு-மிதமான ஆபத்து",
 "Critical": "கடுமை",
 "Moderate": "மிதமான",
 "Healthy": "ஆரோக்கியம்",
 "Ask me about plant diseases": "தாவர நோய்களைப் பற்றி கேளுங்கள்",
 "Ask about diseases...": "நோய்கள் பற்றி கேளுங்கள்...",
 "Namaste! Upload a leaf photo or ask me about any crop disease.": "வணக்கம்! இலை படத்தை பதிவேற்றவும் அல்லது எந்த பயிர் நோயையும் கேளுங்கள்.",
 "Live Market Prices": "நேரடி சந்தை விலைகள்",
 "Real-time mandi rates from across India": "இந்தியா முழுவதும் மண்டிகளிலிருந்து நேரடி விலைகள்",
 "Most Gained": "அதிகம் உயர்ந்தது",
 "Most Declined": "அதிகம் குறைந்தது",
 "Total Mandis": "மொத்த மண்டிகள்",
 "Last Updated": "கடைசி புதுப்பிப்பு",
 "Tracked live": "நேரலையில் கண்காணிப்பு",
 "Auto-refresh": "தானியங்கி புதுப்பிப்பு",
 "Price Trends - Wheat": "விலை போக்கு - கோதுமை",
 "Crop Comparison": "பயிர் ஒப்பீடு",
 "Live Mandi Prices": "நேரடி மண்டி விலைகள்",
 "All States": "அனைத்து மாநிலங்கள்",
 "All Crops": "அனைத்து பயிர்கள்",
 "Mandi": "மண்டி",
 "Min Price": "குறைந்த விலை",
 "Max Price": "அதிக விலை",
 "Modal Price": "மோடல் விலை",
 "Nearby Buyers": "அருகிலுள்ள வாங்குபவர்கள்",
 "Ask about market prices": "சந்தை விலைகள் பற்றி கேளுங்கள்",
 "Ask about prices...": "விலைகள் பற்றி கேளுங்கள்...",
 "Namaste! Ask me about current crop prices or market trends.": "வணக்கம்! தற்போதைய பயிர் விலைகள் அல்லது சந்தை போக்குகள் பற்றி கேளுங்கள்.",
 "Farmer Marketplace": "விவசாயி சந்தை",
 "Buy & sell directly - no middlemen": "நேரடியாக வாங்கவும் விற்கவும் - நடுவிலாளர்கள் இல்லை",
 "Direct farmer trade": "நேரடி விவசாயி வர்த்தகம்",
 "Find crops faster, manage yours easily": "பயிர்களை வேகமாக கண்டுபிடித்து, உங்களுடையதை எளிதாக நிர்வகிக்கவும்",
 "Loading listings...": "பட்டியல்கள் ஏற்றப்படுகின்றன...",
 "Category": "வகை",
 "All Categories": "அனைத்து வகைகள்",
 "Grains & Cereals": "தானியங்கள்",
 "Pulses": "பருப்புகள்",
 "Vegetables": "காய்கறிகள்",
 "Fruits": "பழங்கள்",
 "Spices": "மசாலா",
 "Oilseeds": "எண்ணெய் விதைகள்",
 "Cash Crops": "பணப் பயிர்கள்",
 "Other": "மற்றவை",
 "Location": "இடம்",
 "All Locations": "அனைத்து இடங்கள்",
 "Sort": "வரிசை",
 "Sort: Latest": "வரிசை: சமீபத்திய",
 "Price: Low to High": "விலை: குறைவிலிருந்து அதிகம்",
 "Price: High to Low": "விலை: அதிகத்திலிருந்து குறைவு",
 "Quantity: High to Low": "அளவு: அதிகத்திலிருந்து குறைவு",
 "Seller mode": "விற்பவர் முறை",
 "My Listings": "என் பட்டியல்கள்",
 "Crops you have listed for sale": "விற்பனைக்கு நீங்கள் பட்டியலிட்ட பயிர்கள்",
 "No matching crops listed by you": "நீங்கள் பட்டியலிட்ட பொருந்தும் பயிர்கள் இல்லை",
 "No crops listed by you yet": "நீங்கள் இன்னும் பயிர்கள் பட்டியலிடவில்லை",
 "You can create a new listing or change the filters above.": "புதிய பட்டியல் உருவாக்கலாம் அல்லது மேலே உள்ள வடிகட்டிகளை மாற்றலாம்.",
 "Change the filters above or create a new matching listing.": "மேல் வடிகட்டிகளை மாற்றவும் அல்லது புதிய பொருந்தும் பட்டியல் உருவாக்கவும்.",
 "Create your first listing so buyers can contact you.": "வாங்குபவர்கள் தொடர்பு கொள்ள முதல் பட்டியலை உருவாக்கவும்.",
 "Buyer mode": "வாங்குபவர் முறை",
 "Buy Crops": "பயிர்கள் வாங்குங்கள்",
 "Crops listed by other farmers": "மற்ற விவசாயிகள் பட்டியலிட்ட பயிர்கள்",
 "No matching crops to buy": "வாங்க பொருந்தும் பயிர்கள் இல்லை",
 "No crops available to buy yet": "இன்னும் வாங்க பயிர்கள் இல்லை",
 "No other farmer listings match the selected filters.": "தேர்ந்தெடுத்த வடிகட்டிகளுக்கு மற்ற விவசாயி பட்டியல்கள் பொருந்தவில்லை.",
 "Other farmers have not listed crops yet.": "மற்ற விவசாயிகள் இன்னும் பயிர்களை பட்டியலிடவில்லை.",
 "Could not load your listings": "உங்கள் பட்டியல்கள் ஏற்றப்படவில்லை",
 "Could not load crops to buy": "வாங்கும் பயிர்கள் ஏற்றப்படவில்லை",
 "Please refresh the page and try again.": "பக்கத்தை புதுப்பித்து மீண்டும் முயற்சிக்கவும்.",
 "Crop Name": "பயிர் பெயர்",
 "Quantity (quintals)": "அளவு (குவிண்டால்)",
 "Price (Rs./quintal)": "விலை (Rs./குவிண்டால்)",
 "Description (optional)": "விளக்கம் (விருப்பம்)",
 "Upload Photo (optional)": "படம் பதிவேற்றவும் (விருப்பம்)",
 "First photo will appear on your crop listing.": "முதல் படம் உங்கள் பயிர் பட்டியலில் தோன்றும்.",
 "Submit Listing": "பட்டியலை சமர்ப்பிக்கவும்",
 "Seller Contact": "விற்பவர் தொடர்பு",
 "Marketplace help": "சந்தை உதவி",
 "Ask about marketplace...": "சந்தை பற்றி கேளுங்கள்...",
 "Namaste! Need help listing crops or finding buyers? Ask me!": "வணக்கம்! பயிர்களை பட்டியலிட அல்லது வாங்குபவர்களை கண்டுபிடிக்க உதவி வேண்டுமா? கேளுங்கள்!",
 "Contact": "தொடர்பு",
 "Chat": "அரட்டை",
 "Your Listing": "உங்கள் பட்டியல்",
 "Edit": "திருத்து",
 "Delete": "நீக்கு",
 "Listed by": "பட்டியலிட்டவர்",
 "listed by you": "நீங்கள் பட்டியலிட்டது",
 "available to buy": "வாங்க கிடைக்கும்",
 "matching filters": "வடிகட்டிகளுடன் பொருந்தும்",
 "of": "இல்",
 "Resource Management Guide": "வள மேலாண்மை வழிகாட்டி",
 "Optimize water, fertilizer, and pesticide usage": "நீர், உரம் மற்றும் பூச்சிக்கொல்லி பயன்பாட்டை மேம்படுத்தவும்",
 "Smart Irrigation": "ஸ்மார்ட் பாசனம்",
 "Current Weather Status": "தற்போதைய வானிலை நிலை",
 "Fetching...": "ஏற்றப்படுகிறது...",
 "Loading live weather-based advice...": "நேரடி வானிலை அடிப்படையிலான ஆலோசனை ஏற்றப்படுகிறது...",
 "High Humidity / Rain": "அதிக ஈரப்பதம் / மழை",
 "High Heat Alert": "அதிக வெப்ப எச்சரிக்கை",
 "Optimal Conditions": "சிறந்த நிலை",
 "Rain is detected or expected. Postpone irrigation to save resources and prevent over-saturation.": "மழை உள்ளது அல்லது எதிர்பார்க்கப்படுகிறது. வளங்களை சேமிக்க பாசனத்தை தள்ளிவையுங்கள்.",
 "High evaporation risk. Water heavily in early morning and check soil moisture for heat stress.": "ஆவியாகும் அபாயம் அதிகம். அதிகாலையில் நீர் பாய்ச்சவும், மண் ஈரப்பதம் பார்க்கவும்.",
 "Standard irrigation cycles recommended. Monitor soil moisture for specific crop needs.": "சாதாரண பாசன சுழற்சி பரிந்துரைக்கப்படுகிறது. பயிர் தேவைக்கு மண் ஈரப்பதம் கண்காணிக்கவும்.",
 "Best Time": "சிறந்த நேரம்",
 "Irrigate during early morning (4 AM - 8 AM) or late evening to minimize evaporation losses.": "ஆவியாகும் இழப்பை குறைக்க அதிகாலை (4 AM - 8 AM) அல்லது மாலை பாசனம் செய்யவும்.",
 "Rainfall Guard": "மழை பாதுகாப்பு",
 "If rain is expected within 24 hours, postpone irrigation to save water and prevent soil leaching.": "24 மணி நேரத்தில் மழை எதிர்பார்க்கப்பட்டால் நீர் சேமிக்க பாசனத்தை தள்ளிவையுங்கள்.",
 "Fertilizer Optimization": "உர மேம்பாடு",
 "Seasonal Nutrients": "பருவ ஊட்டச்சத்துகள்",
 "Currently in Rabi season. Focusing on Nitrogen and Phosphorus for wheat/mustard growth.": "தற்போது ரபி பருவம். கோதுமை/கடுகு வளர்ச்சிக்கு நைட்ரஜன் மற்றும் பாஸ்பரஸ் மீது கவனம்.",
 "N-P-K Balancing": "N-P-K சமநிலை",
 "Use soil test results to apply exact amounts of Nitrogen, Phosphorus, and Potassium. Avoid over-application.": "மண் பரிசோதனை அடிப்படையில் நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம் சரியான அளவில் பயன்படுத்தவும்.",
 "Avoid Windy Days": "காற்றான நாட்களை தவிர்க்கவும்",
 "Don't use top-dressing or spray fertilizers when wind speed exceeds 15 km/h to prevent drift.": "காற்று 15 km/h மீறினால் டாப்-டிரெஸ்ஸிங் அல்லது உர தெளிப்பு செய்ய வேண்டாம்.",
 "Pesticide & Safety Guide": "பூச்சிக்கொல்லி மற்றும் பாதுகாப்பு வழிகாட்டி",
 "Weather Condition": "வானிலை நிலை",
 "Avoid spraying if temperatures are above 30 C or humidity is below 40% as it can cause crop burn.": "வெப்பநிலை 30 C மேல் அல்லது ஈரப்பதம் 40% கீழ் இருந்தால் தெளிப்பை தவிர்க்கவும்.",
 "Personal Safety": "தனிப்பட்ட பாதுகாப்பு",
 "Always wear protective gear (mask, gloves, boots) and spray in the direction of the wind, never against it.": "பாதுகாப்பு உபகரணங்கள் அணிந்து காற்றின் திசையில் தெளிக்கவும்.",
 "Dosage Control": "அளவு கட்டுப்பாடு",
 "Follow the recommended dosage on the label. High concentrations do NOT mean better results.": "லேபிளில் உள்ள பரிந்துரைத்த அளவை பின்பற்றவும். அதிக செறிவு நல்ல முடிவு அல்ல.",
 "Resource Saving Estimator": "வள சேமிப்பு மதிப்பீடு",
 "AI Assisted": "AI உதவி",
 "Water Saved": "நீர் சேமிப்பு",
 "Fertilizer Saved": "உரம் சேமிப்பு",
 "Avg. Savings / Acre": "சராசரி சேமிப்பு / ஏக்கர்",
 "using weather sensors": "வானிலை சென்சர்கள் மூலம்",
 "using split application": "பிரித்து பயன்பாட்டால்",
 "per growing season": "ஒவ்வொரு வளர்ச்சி பருவத்துக்கும்",
 "Resource Expert": "வள நிபுணர்",
 "Ask about farming resources...": "விவசாய வளங்கள் பற்றி கேளுங்கள்...",
 "My Profile": "என் சுயவிவரம்",
 "Manage your account and farm details": "உங்கள் கணக்கு மற்றும் பண்ணை விவரங்களை நிர்வகிக்கவும்",
 "Wheat & Vegetable Farmer - Pune, Maharashtra": "கோதுமை மற்றும் காய்கறி விவசாயி - புனே, மகாராஷ்டிரா",
 "Verified Farmer": "சரிபார்க்கப்பட்ட விவசாயி",
 "Joined Jan 2025": "ஜனவரி 2025 சேர்ந்தார்",
 "Edit Profile": "சுயவிவரம் திருத்து",
 "Total Trades": "மொத்த வர்த்தகம்",
 "Revenue": "வருவாய்",
 "Rating": "மதிப்பீடு",
 "Personal Information": "தனிப்பட்ட தகவல்",
 "Phone": "தொலைபேசி",
 "District": "மாவட்டம்",
 "Village / Area": "கிராமம் / பகுதி",
 "Save Changes": "மாற்றங்களை சேமி",
 "Farm Details": "பண்ணை விவரங்கள்",
 "Edit Farm Details": "பண்ணை விவரங்களை திருத்து",
 "Total Farm Area": "மொத்த பண்ணை பரப்பு",
 "Soil Type": "மண் வகை",
 "Irrigation Source": "பாசன மூலாதாரம்",
 "Primary Crops": "முக்கிய பயிர்கள்",
 "Farming Type": "விவசாய வகை",
 "Not set": "அமைக்கப்படவில்லை",
 "Save Farm Details": "பண்ணை விவரங்களை சேமி",
 "Cancel": "ரத்து",
 "Recent Activity": "சமீபத்திய செயல்பாடு",
 "Disease scan - Tomato leaf": "நோய் ஸ்கேன் - தக்காளி இலை",
 "Listed 50 qtl Wheat on Marketplace": "சந்தையில் 50 குவிண்டால் கோதுமை பட்டியலிட்டது",
 "Checked wheat prices at Pune mandi": "புனே மண்டியில் கோதுமை விலைகள் பார்த்தது",
 "Contacted buyer - Anand Traders": "வாங்குபவரை தொடர்பு கொண்டது - ஆனந்த் டிரேடர்ஸ்",
 "Account help": "கணக்கு உதவி",
 "Ask about your account...": "உங்கள் கணக்கு பற்றி கேளுங்கள்...",
 "Namaste! Need help with your profile? Ask me!": "வணக்கம்! சுயவிவர உதவி வேண்டுமா? கேளுங்கள்!",
 "Welcome to": "வரவேற்கிறோம்",
 "The smartest way to manage your farm. AI-powered insights, market access, and weather intelligence — all in one place.": "உங்கள் பண்ணையை நிர்வகிக்க ஸ்மார்ட் வழி. AI தகவல், சந்தை அணுகல், வானிலை அறிவு - அனைத்தும் ஒரே இடத்தில்.",
 "AI Disease Detection in Seconds": "வினாடிகளில் AI நோய் கண்டறிதல்",
 "Live Mandi Prices from 500+ Markets": "500+ சந்தைகளிலிருந்து நேரடி மண்டி விலைகள்",
 "Hyper-local Weather Forecasts": "மிக உள்ளூர் வானிலை முன்னறிவிப்பு",
 "Direct Farmer-to-Buyer Marketplace": "நேரடி விவசாயி-வாங்குபவர் சந்தை",
 "AI Chatbot in Your Language": "உங்கள் மொழியில் AI அரட்டை",
 "Login": "உள்நுழை",
 "Register": "பதிவு",
 "Welcome Back!": "மீண்டும் வரவேற்கிறோம்!",
 "Sign in to access your farm dashboard": "உங்கள் பண்ணை டாஷ்போர்டுக்கு உள்நுழையவும்",
 "Enter your email or phone": "உங்கள் மின்னஞ்சல் அல்லது தொலைபேசியை உள்ளிடவும்",
 "Enter your password": "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
 "First name": "முதல் பெயர்",
 "Last name": "கடைசி பெயர்",
 "Select your state": "உங்கள் மாநிலத்தை தேர்வு செய்யவும்",
 "Create a strong password": "வலுவான கடவுச்சொல் உருவாக்கவும்",
 "Terms of Service": "சேவை விதிமுறைகள்",
 "Privacy Policy": "தனியுரிமை கொள்கை"
 },
 te: {
 "Plant Disease Detection": "మొక్కల వ్యాధి గుర్తింపు",
 "Upload a leaf image for AI-powered diagnosis": "AI నిర్ధారణ కోసం ఆకు చిత్రాన్ని అప్లోడ్ చేయండి",
 "Upload Leaf Image": "ఆకు చిత్రాన్ని అప్లోడ్ చేయండి",
 "Drag & Drop or Click to Upload": "డ్రాగ్ చేసి వదలండి లేదా అప్లోడ్ కోసం క్లిక్ చేయండి",
 "Supports JPG, PNG, WEBP - Max 10MB": "JPG, PNG, WEBP మద్దతు - గరిష్ఠం 10MB",
 "Analyze Disease": "వ్యాధి విశ్లేషించండి",
 "Upload New Image": "కొత్త చిత్రం అప్లోడ్ చేయండి",
 "Tips for Best Results": "మంచి ఫలితాలకు సూచనలు",
 "Take a clear, close-up photo of the affected leaf": "ప్రభావిత ఆకుకు స్పష్టమైన దగ్గరి ఫోటో తీసుకోండి",
 "Ensure good natural lighting": "మంచి సహజ కాంతి ఉండేలా చూడండి",
 "Include both healthy and affected parts of the leaf": "ఆకులో ఆరోగ్యకరమైన మరియు ప్రభావిత భాగాలు రెండూ చూపండి",
 "Hold the camera steady and avoid blurriness": "కెమెరాను స్థిరంగా ఉంచి బ్లర్ కాకుండా చూడండి",
 "Diagnosis Result": "నిర్ధారణ ఫలితం",
 "AI Analysis": "AI విశ్లేషణ",
 "No Analysis Yet": "ఇంకా విశ్లేషణ లేదు",
 "Upload a leaf photo to get instant AI diagnosis": "తక్షణ AI నిర్ధారణకు ఆకు ఫోటో అప్లోడ్ చేయండి",
 "Recent Scans": "తాజా స్కాన్లు",
 "Common Crop Diseases": "సాధారణ పంట వ్యాధులు",
 "Late Blight": "లేట్ బ్లైట్",
 "Late Blight - Tomato": "లేట్ బ్లైట్ - టమాటా",
 "Rust Disease": "రస్ట్ వ్యాధి",
 "Powdery Mildew": "పౌడరీ మిల్డ్యూ",
 "Powdery Mildew - Wheat": "పౌడరీ మిల్డ్యూ - గోధుమ",
 "Healthy - Rice": "ఆరోగ్యంగా - బియ్యం",
 "Affects tomatoes and potatoes. Causes dark, water-soaked lesions on leaves. Spreads rapidly in humid conditions.": "టమాటా, బంగాళాదుంపలను ప్రభావితం చేస్తుంది. ఆకులపై ముదురు నీటి మచ్చలు ఏర్పడి తేమలో వేగంగా వ్యాపిస్తుంది.",
 "Common in wheat and barley. Orange-brown pustules appear on leaves. Reduces grain yield significantly.": "గోధుమ, బార్లీలో సాధారణం. ఆకులపై నారింజ-గోధుమ మచ్చలు వచ్చి దిగుబడి తగ్గిస్తుంది.",
 "White powdery coating on leaves. Affects a wide range of crops including peas, wheat, and cucurbits.": "ఆకులపై తెల్లటి పొడి పొర. బఠాణీ, గోధుమ, దోసకాయ వర్గ పంటలు సహా అనేక పంటలను ప్రభావితం చేస్తుంది.",
 "High Risk": "అధిక ప్రమాదం",
 "Medium Risk": "మధ్యస్థ ప్రమాదం",
 "Low-Med Risk": "తక్కువ-మధ్యస్థ ప్రమాదం",
 "Critical": "తీవ్రం",
 "Moderate": "మధ్యస్థం",
 "Healthy": "ఆరోగ్యంగా",
 "Ask me about plant diseases": "మొక్కల వ్యాధుల గురించి అడగండి",
 "Ask about diseases...": "వ్యాధుల గురించి అడగండి...",
 "Namaste! Upload a leaf photo or ask me about any crop disease.": "నమస్తే! ఆకు ఫోటో అప్లోడ్ చేయండి లేదా ఏ పంట వ్యాధి గురించైనా అడగండి.",
 "Live Market Prices": "లైవ్ మార్కెట్ ధరలు",
 "Real-time mandi rates from across India": "భారతదేశం అంతటా మండీల నుంచి రియల్-టైమ్ ధరలు",
 "Most Gained": "ఎక్కువగా పెరిగింది",
 "Most Declined": "ఎక్కువగా తగ్గింది",
 "Total Mandis": "మొత్తం మండీలు",
 "Last Updated": "చివరి అప్డేట్",
 "Tracked live": "లైవ్ ట్రాక్",
 "Auto-refresh": "ఆటో-రిఫ్రెష్",
 "Price Trends - Wheat": "ధర ధోరణి - గోధుమ",
 "Crop Comparison": "పంట పోలిక",
 "Live Mandi Prices": "లైవ్ మండీ ధరలు",
 "All States": "అన్ని రాష్ట్రాలు",
 "All Crops": "అన్ని పంటలు",
 "Mandi": "మండీ",
 "Min Price": "కనిష్ఠ ధర",
 "Max Price": "గరిష్ఠ ధర",
 "Modal Price": "మోడల్ ధర",
 "Nearby Buyers": "దగ్గరలోని కొనుగోలుదారులు",
 "Ask about market prices": "మార్కెట్ ధరల గురించి అడగండి",
 "Ask about prices...": "ధరల గురించి అడగండి...",
 "Namaste! Ask me about current crop prices or market trends.": "నమస్తే! ప్రస్తుత పంట ధరలు లేదా మార్కెట్ ధోరణుల గురించి అడగండి.",
 "Farmer Marketplace": "రైతు మార్కెట్‌ప్లేస్",
 "Buy & sell directly - no middlemen": "నేరుగా కొనండి మరియు అమ్మండి - మధ్యవర్తులు లేరు",
 "Direct farmer trade": "నేరుగా రైతు వ్యాపారం",
 "Find crops faster, manage yours easily": "పంటలను త్వరగా కనుగొని, మీవాటిని సులభంగా నిర్వహించండి",
 "Loading listings...": "లిస్టింగులు లోడ్ అవుతున్నాయి...",
 "Category": "వర్గం",
 "All Categories": "అన్ని వర్గాలు",
 "Grains & Cereals": "ధాన్యాలు",
 "Pulses": "పప్పులు",
 "Vegetables": "కూరగాయలు",
 "Fruits": "పండ్లు",
 "Spices": "మసాలాలు",
 "Oilseeds": "నూనె గింజలు",
 "Cash Crops": "నగదు పంటలు",
 "Other": "ఇతర",
 "Location": "ప్రాంతం",
 "All Locations": "అన్ని ప్రాంతాలు",
 "Sort": "క్రమం",
 "Sort: Latest": "క్రమం: తాజా",
 "Price: Low to High": "ధర: తక్కువ నుండి ఎక్కువ",
 "Price: High to Low": "ధర: ఎక్కువ నుండి తక్కువ",
 "Quantity: High to Low": "పరిమాణం: ఎక్కువ నుండి తక్కువ",
 "Seller mode": "అమ్మకందారు మోడ్",
 "My Listings": "నా లిస్టింగులు",
 "Crops you have listed for sale": "మీరు అమ్మకానికి పెట్టిన పంటలు",
 "No matching crops listed by you": "మీరు పెట్టిన సరిపోలే పంటలు లేవు",
 "No crops listed by you yet": "మీరు ఇంకా పంటలు లిస్ట్ చేయలేదు",
 "You can create a new listing or change the filters above.": "కొత్త లిస్టింగ్ సృష్టించండి లేదా పై ఫిల్టర్లు మార్చండి.",
 "Change the filters above or create a new matching listing.": "పై ఫిల్టర్లు మార్చండి లేదా కొత్త సరిపోలే లిస్టింగ్ సృష్టించండి.",
 "Create your first listing so buyers can contact you.": "కొనుగోలుదారులు సంప్రదించేందుకు మీ మొదటి లిస్టింగ్ సృష్టించండి.",
 "Buyer mode": "కొనుగోలుదారు మోడ్",
 "Buy Crops": "పంటలు కొనండి",
 "Crops listed by other farmers": "ఇతర రైతులు లిస్ట్ చేసిన పంటలు",
 "No matching crops to buy": "కొనడానికి సరిపోలే పంటలు లేవు",
 "No crops available to buy yet": "ఇంకా కొనడానికి పంటలు అందుబాటులో లేవు",
 "No other farmer listings match the selected filters.": "ఎంచుకున్న ఫిల్టర్లకు ఇతర రైతుల లిస్టింగులు సరిపోలలేదు.",
 "Other farmers have not listed crops yet.": "ఇతర రైతులు ఇంకా పంటలు లిస్ట్ చేయలేదు.",
 "Could not load your listings": "మీ లిస్టింగులు లోడ్ కాలేదు",
 "Could not load crops to buy": "కొనడానికి పంటలు లోడ్ కాలేదు",
 "Please refresh the page and try again.": "పేజీ రిఫ్రెష్ చేసి మళ్లీ ప్రయత్నించండి.",
 "Crop Name": "పంట పేరు",
 "Quantity (quintals)": "పరిమాణం (క్వింటాళ్లు)",
 "Price (Rs./quintal)": "ధర (Rs./క్వింటాల్)",
 "Description (optional)": "వివరణ (ఐచ్చికం)",
 "Upload Photo (optional)": "ఫోటో అప్లోడ్ (ఐచ్చికం)",
 "First photo will appear on your crop listing.": "మొదటి ఫోటో మీ పంట లిస్టింగులో కనిపిస్తుంది.",
 "Submit Listing": "లిస్టింగ్ సమర్పించండి",
 "Seller Contact": "అమ్మకందారు సంప్రదింపు",
 "Marketplace help": "మార్కెట్‌ప్లేస్ సహాయం",
 "Ask about marketplace...": "మార్కెట్‌ప్లేస్ గురించి అడగండి...",
 "Namaste! Need help listing crops or finding buyers? Ask me!": "నమస్తే! పంటలు లిస్ట్ చేయడంలో లేదా కొనుగోలుదారులను కనుగొనడంలో సహాయం కావాలా? అడగండి!",
 "Contact": "సంప్రదించండి",
 "Chat": "చాట్",
 "Your Listing": "మీ లిస్టింగ్",
 "Edit": "సవరించండి",
 "Delete": "తొలగించండి",
 "Listed by": "లిస్ట్ చేసినది",
 "listed by you": "మీరు లిస్ట్ చేసినవి",
 "available to buy": "కొనడానికి అందుబాటులో",
 "matching filters": "ఫిల్టర్లకు సరిపోలే",
 "of": "లో",
 "Resource Management Guide": "వనరుల నిర్వహణ గైడ్",
 "Optimize water, fertilizer, and pesticide usage": "నీరు, ఎరువు, పురుగుమందు వినియోగాన్ని మెరుగుపరచండి",
 "Smart Irrigation": "స్మార్ట్ నీటిపారుదల",
 "Current Weather Status": "ప్రస్తుత వాతావరణ స్థితి",
 "Fetching...": "లోడ్ అవుతోంది...",
 "Loading live weather-based advice...": "లైవ్ వాతావరణ ఆధారిత సలహా లోడ్ అవుతోంది...",
 "High Humidity / Rain": "అధిక తేమ / వర్షం",
 "High Heat Alert": "అధిక వేడి హెచ్చరిక",
 "Optimal Conditions": "అనుకూల పరిస్థితులు",
 "Rain is detected or expected. Postpone irrigation to save resources and prevent over-saturation.": "వర్షం ఉంది లేదా అవకాశం ఉంది. వనరులు ఆదా చేయడానికి నీటిపారుదల వాయిదా వేయండి.",
 "High evaporation risk. Water heavily in early morning and check soil moisture for heat stress.": "ఆవిరి ప్రమాదం ఎక్కువ. ఉదయం త్వరగా నీరు పెట్టి నేల తేమను తనిఖీ చేయండి.",
 "Standard irrigation cycles recommended. Monitor soil moisture for specific crop needs.": "సాధారణ నీటిపారుదల చక్రాలు సిఫార్సు. పంట అవసరానికి నేల తేమ గమనించండి.",
 "Best Time": "ఉత్తమ సమయం",
 "Irrigate during early morning (4 AM - 8 AM) or late evening to minimize evaporation losses.": "ఆవిరి నష్టం తగ్గించడానికి ఉదయం (4 AM - 8 AM) లేదా సాయంత్రం నీరు పెట్టండి.",
 "Rainfall Guard": "వర్ష రక్షణ",
 "If rain is expected within 24 hours, postpone irrigation to save water and prevent soil leaching.": "24 గంటల్లో వర్షం ఉంటే నీరు ఆదా కోసం నీటిపారుదల వాయిదా వేయండి.",
 "Fertilizer Optimization": "ఎరువు ఆప్టిమైజేషన్",
 "Seasonal Nutrients": "సీజనల్ పోషకాలు",
 "Currently in Rabi season. Focusing on Nitrogen and Phosphorus for wheat/mustard growth.": "ప్రస్తుతం రబీ సీజన్. గోధుమ/ఆవాల వృద్ధికి నైట్రోజన్ మరియు ఫాస్ఫరస్ పై దృష్టి.",
 "N-P-K Balancing": "N-P-K సమతుల్యం",
 "Use soil test results to apply exact amounts of Nitrogen, Phosphorus, and Potassium. Avoid over-application.": "నేల పరీక్ష ఆధారంగా నైట్రోజన్, ఫాస్ఫరస్, పొటాషియం సరైన మోతాదులో వాడండి.",
 "Avoid Windy Days": "గాలివాన రోజులు నివారించండి",
 "Don't use top-dressing or spray fertilizers when wind speed exceeds 15 km/h to prevent drift.": "గాలి 15 km/h దాటితే టాప్-డ్రెసింగ్ లేదా స్ప్రే ఎరువులు వాడొద్దు.",
 "Pesticide & Safety Guide": "పురుగుమందు మరియు భద్రత గైడ్",
 "Weather Condition": "వాతావరణ పరిస్థితి",
 "Avoid spraying if temperatures are above 30 C or humidity is below 40% as it can cause crop burn.": "ఉష్ణోగ్రత 30 C పైగా లేదా తేమ 40% కంటే తక్కువ అయితే స్ప్రే చేయవద్దు.",
 "Personal Safety": "వ్యక్తిగత భద్రత",
 "Always wear protective gear (mask, gloves, boots) and spray in the direction of the wind, never against it.": "ఎల్లప్పుడూ రక్షణ సామగ్రి ధరించి గాలి దిశలోనే స్ప్రే చేయండి.",
 "Dosage Control": "మోతాదు నియంత్రణ",
 "Follow the recommended dosage on the label. High concentrations do NOT mean better results.": "లేబుల్ పై సూచించిన మోతాదును పాటించండి. ఎక్కువ సాంద్రత మంచి ఫలితం కాదు.",
 "Resource Saving Estimator": "వనరుల ఆదా అంచనా",
 "AI Assisted": "AI సహాయం",
 "Water Saved": "నీరు ఆదా",
 "Fertilizer Saved": "ఎరువు ఆదా",
 "Avg. Savings / Acre": "సగటు ఆదా / ఎకరం",
 "using weather sensors": "వాతావరణ సెన్సర్లతో",
 "using split application": "విభజిత వినియోగంతో",
 "per growing season": "ప్రతి పెరుగుదల సీజన్",
 "Resource Expert": "వనరుల నిపుణుడు",
 "Ask about farming resources...": "వ్యవసాయ వనరుల గురించి అడగండి...",
 "My Profile": "నా ప్రొఫైల్",
 "Manage your account and farm details": "మీ ఖాతా మరియు ఫార్మ్ వివరాలను నిర్వహించండి",
 "Wheat & Vegetable Farmer - Pune, Maharashtra": "గోధుమ మరియు కూరగాయల రైతు - పుణే, మహారాష్ట్ర",
 "Verified Farmer": "ధృవీకరించబడిన రైతు",
 "Joined Jan 2025": "జనవరి 2025లో చేరారు",
 "Edit Profile": "ప్రొఫైల్ సవరించండి",
 "Total Trades": "మొత్తం వ్యాపారాలు",
 "Revenue": "ఆదాయం",
 "Rating": "రేటింగ్",
 "Personal Information": "వ్యక్తిగత సమాచారం",
 "Phone": "ఫోన్",
 "District": "జిల్లా",
 "Village / Area": "గ్రామం / ప్రాంతం",
 "Save Changes": "మార్పులు సేవ్ చేయండి",
 "Farm Details": "ఫార్మ్ వివరాలు",
 "Edit Farm Details": "ఫార్మ్ వివరాలు సవరించండి",
 "Total Farm Area": "మొత్తం ఫార్మ్ విస్తీర్ణం",
 "Soil Type": "నేల రకం",
 "Irrigation Source": "నీటిపారుదల మూలం",
 "Primary Crops": "ప్రధాన పంటలు",
 "Farming Type": "వ్యవసాయ రకం",
 "Not set": "సెట్ కాలేదు",
 "Save Farm Details": "ఫార్మ్ వివరాలు సేవ్ చేయండి",
 "Cancel": "రద్దు",
 "Recent Activity": "తాజా కార్యకలాపం",
 "Disease scan - Tomato leaf": "వ్యాధి స్కాన్ - టమాటా ఆకు",
 "Listed 50 qtl Wheat on Marketplace": "మార్కెట్‌ప్లేస్‌లో 50 క్వింటాళ్లు గోధుమ లిస్ట్ చేశారు",
 "Checked wheat prices at Pune mandi": "పుణే మండీలో గోధుమ ధరలు చూశారు",
 "Contacted buyer - Anand Traders": "కొనుగోలుదారుని సంప్రదించారు - ఆనంద్ ట్రేడర్స్",
 "Account help": "ఖాతా సహాయం",
 "Ask about your account...": "మీ ఖాతా గురించి అడగండి...",
 "Namaste! Need help with your profile? Ask me!": "నమస్తే! ప్రొఫైల్‌కు సహాయం కావాలా? అడగండి!",
 "Welcome to": "స్వాగతం",
 "The smartest way to manage your farm. AI-powered insights, market access, and weather intelligence — all in one place.": "మీ ఫార్మ్ నిర్వహణకు స్మార్ట్ మార్గం. AI సమాచారం, మార్కెట్ యాక్సెస్, వాతావరణ తెలివి - అన్నీ ఒకేచోట.",
 "AI Disease Detection in Seconds": "సెకన్లలో AI వ్యాధి గుర్తింపు",
 "Live Mandi Prices from 500+ Markets": "500+ మార్కెట్ల నుంచి లైవ్ మండీ ధరలు",
 "Hyper-local Weather Forecasts": "హైపర్-లోకల్ వాతావరణ సూచనలు",
 "Direct Farmer-to-Buyer Marketplace": "నేరుగా రైతు-కొనుగోలుదారు మార్కెట్‌ప్లేస్",
 "AI Chatbot in Your Language": "మీ భాషలో AI చాట్‌బాట్",
 "Login": "లాగిన్",
 "Register": "రిజిస్టర్",
 "Welcome Back!": "మళ్లీ స్వాగతం!",
 "Sign in to access your farm dashboard": "మీ ఫార్మ్ డాష్‌బోర్డ్ కోసం సైన్ ఇన్ చేయండి",
 "Enter your email or phone": "మీ ఇమెయిల్ లేదా ఫోన్ నమోదు చేయండి",
 "Enter your password": "మీ పాస్‌వర్డ్ నమోదు చేయండి",
 "First name": "మొదటి పేరు",
 "Last name": "చివరి పేరు",
 "Select your state": "మీ రాష్ట్రం ఎంచుకోండి",
 "Create a strong password": "బలమైన పాస్‌వర్డ్ సృష్టించండి",
 "Terms of Service": "సేవా నిబంధనలు",
 "Privacy Policy": "గోప్యతా విధానం"
 }
};

Object.keys(pageStaticUiTranslations).forEach(lang => {
 staticUiTranslations[lang] = {
 ...(staticUiTranslations[lang] || {}),
 ...pageStaticUiTranslations[lang]
 };
});

const dynamicStaticUiTranslations = {
 hi: {
 "listing": "लिस्टिंग",
 "listings": "लिस्टिंग",
 "Seller": "विक्रेता",
 "Call": "कॉल",
 "WhatsApp Chat": "WhatsApp चैट",
 "Update Listing": "लिस्टिंग अपडेट करें",
 "Edit Your Crop": "अपनी फसल संपादित करें",
 "Crop advice": "फसल सलाह",
 "Disease help": "रोग सहायता",
 "Market price": "बाजार भाव",
 "Sell crop": "फसल बेचें",
 "Onion": "प्याज",
 "Cotton": "कपास",
 "Turmeric": "हल्दी",
 "Mon": "सोम",
 "Tue": "मंगल",
 "Wed": "बुध",
 "Thu": "गुरु",
 "Fri": "शुक्र",
 "Sat": "शनि",
 "Sun": "रवि"
 },
 mr: {
 "listing": "लिस्टिंग",
 "listings": "लिस्टिंग",
 "Seller": "विक्रेता",
 "Call": "कॉल",
 "WhatsApp Chat": "WhatsApp चॅट",
 "Update Listing": "लिस्टिंग अपडेट करा",
 "Edit Your Crop": "तुमचे पीक संपादित करा",
 "Crop advice": "पीक सल्ला",
 "Disease help": "रोग मदत",
 "Market price": "बाजारभाव",
 "Sell crop": "पीक विका",
 "Onion": "कांदा",
 "Cotton": "कापूस",
 "Turmeric": "हळद",
 "Mon": "सोम",
 "Tue": "मंगळ",
 "Wed": "बुध",
 "Thu": "गुरु",
 "Fri": "शुक्र",
 "Sat": "शनि",
 "Sun": "रवि"
 },
 pa: {
 "listing": "ਲਿਸਟਿੰਗ",
 "listings": "ਲਿਸਟਿੰਗਾਂ",
 "Seller": "ਵਿਕਰੇਤਾ",
 "Call": "ਕਾਲ",
 "WhatsApp Chat": "WhatsApp ਚੈਟ",
 "Update Listing": "ਲਿਸਟਿੰਗ ਅਪਡੇਟ ਕਰੋ",
 "Edit Your Crop": "ਆਪਣੀ ਫ਼ਸਲ ਸੋਧੋ",
 "Crop advice": "ਫ਼ਸਲ ਸਲਾਹ",
 "Disease help": "ਰੋਗ ਮਦਦ",
 "Market price": "ਬਾਜ਼ਾਰ ਭਾਅ",
 "Sell crop": "ਫ਼ਸਲ ਵੇਚੋ",
 "Onion": "ਪਿਆਜ਼",
 "Cotton": "ਕਪਾਹ",
 "Turmeric": "ਹਲਦੀ",
 "Mon": "ਸੋਮ",
 "Tue": "ਮੰਗਲ",
 "Wed": "ਬੁੱਧ",
 "Thu": "ਵੀਰ",
 "Fri": "ਸ਼ੁੱਕਰ",
 "Sat": "ਸ਼ਨੀ",
 "Sun": "ਐਤ"
 },
 ta: {
 "listing": "பட்டியல்",
 "listings": "பட்டியல்கள்",
 "Seller": "விற்பவர்",
 "Call": "அழை",
 "WhatsApp Chat": "WhatsApp அரட்டை",
 "Update Listing": "பட்டியலை புதுப்பி",
 "Edit Your Crop": "உங்கள் பயிரை திருத்து",
 "Crop advice": "பயிர் ஆலோசனை",
 "Disease help": "நோய் உதவி",
 "Market price": "சந்தை விலை",
 "Sell crop": "பயிர் விற்க",
 "Onion": "வெங்காயம்",
 "Cotton": "பருத்தி",
 "Turmeric": "மஞ்சள்",
 "Mon": "தி",
 "Tue": "செ",
 "Wed": "பு",
 "Thu": "வி",
 "Fri": "வெ",
 "Sat": "சனி",
 "Sun": "ஞா"
 },
 te: {
 "listing": "లిస్టింగ్",
 "listings": "లిస్టింగులు",
 "Seller": "అమ్మకందారు",
 "Call": "కాల్",
 "WhatsApp Chat": "WhatsApp చాట్",
 "Update Listing": "లిస్టింగ్ అప్డేట్ చేయండి",
 "Edit Your Crop": "మీ పంటను సవరించండి",
 "Crop advice": "పంట సలహా",
 "Disease help": "వ్యాధి సహాయం",
 "Market price": "మార్కెట్ ధర",
 "Sell crop": "పంట అమ్మండి",
 "Onion": "ఉల్లిపాయ",
 "Cotton": "పత్తి",
 "Turmeric": "పసుపు",
 "Mon": "సోమ",
 "Tue": "మంగళ",
 "Wed": "బుధ",
 "Thu": "గురు",
 "Fri": "శుక్ర",
 "Sat": "శని",
 "Sun": "ఆది"
 }
};

Object.keys(dynamicStaticUiTranslations).forEach(lang => {
 staticUiTranslations[lang] = {
 ...(staticUiTranslations[lang] || {}),
 ...dynamicStaticUiTranslations[lang]
 };
});

const staticTextNodeSources = new WeakMap();
const translatableStaticTexts = new Set(Object.keys(staticUiTranslations.hi || {}));

function getStaticUiText(source) {
 if (!source) return '';
 if (currentLang === 'en') return source;
 return staticUiTranslations[currentLang]?.[source] || source;
}

function translateStaticTextNodes(root = document.body) {
 if (!root) return;
 const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
 acceptNode(node) {
 const parent = node.parentElement;
 if (!parent || parent.closest('script,style,noscript,.chatbot-body')) return NodeFilter.FILTER_REJECT;
 const text = node.textContent.trim();
 return text? NodeFilter.FILTER_ACCEPT: NodeFilter.FILTER_REJECT;
 }
 });

 const nodes = [];
 while (walker.nextNode()) nodes.push(walker.currentNode);

 nodes.forEach(node => {
 const trimmed = node.textContent.trim();
 const source = staticTextNodeSources.get(node) || trimmed;
 if (!translatableStaticTexts.has(source)) return;
 staticTextNodeSources.set(node, source);
 const translated = getStaticUiText(source);
 node.textContent = node.textContent.replace(trimmed, translated);
 });
}

function translateStaticAttributes() {
 document.querySelectorAll('[placeholder]').forEach(el => {
 const source = el.dataset.i18nSourcePlaceholder || el.getAttribute('placeholder') || '';
 if (!translatableStaticTexts.has(source)) return;
 el.dataset.i18nSourcePlaceholder = source;
 el.setAttribute('placeholder', getStaticUiText(source));
 });

 document.querySelectorAll('option').forEach(option => {
 const source = option.dataset.i18nSourceText || option.textContent.trim();
 if (!translatableStaticTexts.has(source)) return;
 option.dataset.i18nSourceText = source;
 option.textContent = getStaticUiText(source);
 });
}

function applyStaticUiTranslations() {
 translateStaticTextNodes();
 translateStaticAttributes();
}

function syncLanguageSelectors() {
 document.querySelectorAll('.lang-selector select').forEach(select => {
 if (select.dataset.languageEnhanced !== 'true') {
 select.innerHTML = SUPPORTED_LANGUAGES.map(code => `<option value="${code}">${LANGUAGE_LABELS[code]}</option>`).join('');
 select.dataset.languageEnhanced = 'true';
 }
 select.value = currentLang;
 select.setAttribute('aria-label', 'Select language');
 });
}

function updateDocumentLanguageState() {
 document.documentElement.lang = currentLang;
 document.documentElement.dir = 'ltr';
 document.body?.setAttribute('data-lang', currentLang);
}

function notifyLanguageChanged() {
 window.dispatchEvent(new CustomEvent('agri:languagechange', { detail: { lang: currentLang } }));
}

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
 const nextLang = normalizeLanguage(lang);
 if (nextLang === currentLang) {
 syncLanguageSelectors();
 return;
 }
 currentLang = nextLang;
 localStorage.setItem('agri_lang', currentLang);
 applyTranslations();
 if (document.getElementById('priceTrendBars')) {
 updateChartData();
 }
 syncStoredUserUI();
 notifyLanguageChanged();
}

function applyTranslations() {
 currentLang = normalizeLanguage(currentLang);
 updateDocumentLanguageState();
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
 if (document.getElementById('marketplaceCount')) {
 window.setTimeout(() => {
 renderMarketplaceCount();
 applyStaticUiTranslations();
 }, 0);
 }
 applyStaticUiTranslations();
 applyChatbotStaticTranslations();
 syncLanguageSelectors();
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
 applyStaticUiTranslations();
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
 let toast = document.getElementById('toastNotification');
 if (!toast) {
 toast = document.createElement('div');
 toast.id = 'toastNotification';
 toast.className = 'toast-notification app-toast';
 toast.style.display = 'none';
 toast.innerHTML = `
 <div class="toast-content">
 <i class="toast-icon fas fa-check-circle"></i>
 <span class="toast-message"></span>
 </div>
 `;
 document.body.appendChild(toast);
 }

 const icon = toast.querySelector('.toast-icon');
 const msg = toast.querySelector('.toast-message');
 if (msg) msg.textContent = message;
 const iconClass = type === 'error'? 'fa-exclamation-circle': type === 'warning'? 'fa-triangle-exclamation': type === 'info'? 'fa-circle-info': 'fa-check-circle';
 if (icon) icon.className = `toast-icon fas ${iconClass}`;
 toast.classList.remove('toast-hide', 'toast-error', 'toast-warning', 'toast-info');
 if (type === 'error') toast.classList.add('toast-error');
 if (type === 'warning') toast.classList.add('toast-warning');
 if (type === 'info') toast.classList.add('toast-info');
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
 applyStaticUiTranslations();

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

function escapeJsString(value) {
 return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
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
 countEl.textContent = `${myCount} ${getStaticUiText('listed by you')} - ${buyCount} ${getStaticUiText('available to buy')}`;
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
const MARKETPLACE_SAVED_KEY = 'agri_marketplace_saved_listings';
const MARKETPLACE_REPORTED_KEY = 'agri_marketplace_reported_listings';

function getMarketplaceStoredIds(key) {
 try {
 const value = JSON.parse(localStorage.getItem(key) || '[]');
 return Array.isArray(value)? value.map(id => String(id)): [];
 } catch (err) {
 return [];
 }
}

function setMarketplaceStoredIds(key, ids) {
 localStorage.setItem(key, JSON.stringify(Array.from(new Set(ids.map(id => String(id))))));
}

function getSavedMarketplaceListingIds() {
 return getMarketplaceStoredIds(MARKETPLACE_SAVED_KEY);
}

function getReportedMarketplaceListingIds() {
 return getMarketplaceStoredIds(MARKETPLACE_REPORTED_KEY);
}

function getMarketplaceReportDetails() {
 try {
 const stored = JSON.parse(localStorage.getItem(`${MARKETPLACE_REPORTED_KEY}_details`) || '{}');
 return stored && typeof stored === 'object' && !Array.isArray(stored)? stored: {};
 } catch (err) {
 return {};
 }
}

function setMarketplaceReportDetail(id, detail) {
 const reports = getMarketplaceReportDetails();
 reports[String(id)] = detail;
 localStorage.setItem(`${MARKETPLACE_REPORTED_KEY}_details`, JSON.stringify(reports));
}

function isListingSaved(id) {
 return getSavedMarketplaceListingIds().includes(String(id));
}

function isListingReported(id) {
 return getReportedMarketplaceListingIds().includes(String(id));
}

function getListingSafetyStatus(listing) {
 const reasons = [];
 const price = Number(listing?.price);
 const quantity = getListingQuantityValue(listing);
 const cropName = String(listing?.crop_name || listing?.cropName || '').trim();
 const location = String(listing?.location || '').trim();

 if (isListingReported(listing?.id)) reasons.push('reported by you');
 if (!cropName) reasons.push('missing crop name');
 if (!location) reasons.push('missing location');
 if (!Number.isFinite(price) || price <= 0) reasons.push('invalid price');
 if (quantity <= 0) reasons.push('invalid quantity');

 return {
 suspicious: reasons.length > 0,
 reported: isListingReported(listing?.id),
 reasons
 };
}

function shouldHideMarketplaceListing(listing) {
 const status = getListingSafetyStatus(listing);
 return status.suspicious && !isListingOwnedByCurrentUser(listing);
}

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
 const listedText = getStaticUiText('listed by you');
 const availableText = getStaticUiText('available to buy');
 const filteredText = isMarketplaceFiltered()? `${visibleCount} ${getStaticUiText('of')} ${totalCount} ${getStaticUiText('matching filters')} - `: '';
 countEl.textContent = `${filteredText}${myCount} ${listedText} - ${buyCount} ${availableText}`;
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
 const rawListingId = String(listing.id);
 const listingId = escapeHtml(rawListingId);
 const listingIdArg = escapeJsString(rawListingId);
 const isOwner = isListingOwnedByCurrentUser(listing);
 const isSaved = isListingSaved(rawListingId);
 const safetyStatus = getListingSafetyStatus(listing);
 const imageData = getSafeListingImageData(listing.image_data || listing.imageData);
 const mediaHtml = imageData? `<img src="${imageData}" alt="${cropName}" style="width:100%;height:100%;object-fit:cover;display:block;">`: `<span class="crop-icon-badge"><i class="${iconClass}"></i></span>`;
 const safetyWarningHtml = safetyStatus.suspicious && isOwner? `
 <div class="product-safety-warning">
 <i class="fas fa-triangle-exclamation"></i>
 <span>Needs review: ${escapeHtml(safetyStatus.reasons.join(', '))}</span>
 </div>
 `: '';

 let actionsHtml = `
 <button type="button" onclick="openListingContact('${listingIdArg}')" class="btn btn-primary btn-sm" style="flex:1;justify-content:center;"><i class="fas fa-phone"></i> Contact</button>
 <button type="button" onclick="chatListing('${listingIdArg}')" class="btn btn-secondary btn-sm" style="flex:1;justify-content:center;"><i class="fas fa-comment"></i> Chat</button>
 <button type="button" onclick="toggleSavedListing('${listingIdArg}')" class="btn btn-secondary btn-sm product-save-btn ${isSaved? 'saved': ''}" style="flex:1;justify-content:center;"><i class="${isSaved? 'fas': 'far'} fa-bookmark"></i> ${isSaved? 'Saved': 'Save'}</button>
 <button type="button" onclick="reportListing('${listingIdArg}')" class="btn btn-secondary btn-sm product-report-btn" style="flex:1;justify-content:center;"><i class="fas fa-flag"></i> Report</button>
 `;

 let ownerTagHtml = '';

 if (isOwner) {
 ownerTagHtml = `<div class="product-tag" style="background:var(--color-secondary);right:12px;left:auto;font-size:0.65rem;">Your Listing</div>`;
 actionsHtml = `
 <button onclick="editListing('${listingIdArg}')" class="btn btn-primary btn-sm" style="flex:1;justify-content:center;font-weight:700;"><i class="fas fa-edit"></i> Edit</button>
 <button onclick="deleteListing('${listingIdArg}')" class="btn btn-secondary btn-sm" style="flex:1;justify-content:center;background:#DC3545;border-color:#DC3545;color:#fff;font-weight:700;"><i class="fas fa-trash"></i> Delete</button>
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
 <p class="product-seller"><span>Listed by</span> ${seller} - ${timeAgo}</p>
 ${safetyWarningHtml}
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
 renderSavedMarketplaceListings([]);
 renderMarketplaceCount();
 }
}

function renderSavedComparePanel(savedListings) {
 const panel = document.getElementById('savedComparePanel');
 if (!panel) return;

 if (!savedListings.length) {
 panel.style.display = 'none';
 panel.innerHTML = '';
 return;
 }

 const rows = savedListings.map(listing => {
 const price = Number(listing.price);
 const safePrice = Number.isFinite(price)? `Rs.${price.toLocaleString('en-IN')}/q`: 'Ask seller';
 return `
 <tr>
 <td><strong>${escapeHtml(listing.crop_name || listing.cropName || 'Crop')}</strong></td>
 <td>${escapeHtml(getListingCategory(listing))}</td>
 <td>${safePrice}</td>
 <td>${escapeHtml(listing.quantity || '0')} qtl</td>
 <td>${escapeHtml(listing.location || 'Unknown')}</td>
 </tr>
 `;
 }).join('');

 panel.style.display = 'block';
 panel.innerHTML = `
 <div class="market-compare-head">
 <div>
 <span><i class="fas fa-scale-balanced"></i> Compare saved crops</span>
 <p>Quickly compare price, quantity and pickup location before contacting sellers.</p>
 </div>
 <button type="button" class="btn btn-secondary btn-sm" onclick="clearSavedListings()"><i class="fas fa-trash"></i> Clear saved</button>
 </div>
 <div class="market-compare-table">
 <table>
 <thead>
 <tr><th>Crop</th><th>Category</th><th>Price</th><th>Quantity</th><th>Location</th></tr>
 </thead>
 <tbody>${rows}</tbody>
 </table>
 </div>
 `;
}

function renderSavedMarketplaceListings(visibleBuyListings = null) {
 const savedPanel = document.getElementById('savedListingsPanel');
 const savedGrid = document.getElementById('savedListingsGrid');
 const savedEmpty = document.getElementById('savedListingsEmpty');
 const savedCountEl = document.getElementById('savedListingsCount');
 const savedToggleText = document.getElementById('savedListingsToggleText');
 if (!savedGrid && !savedEmpty && !savedCountEl && !savedToggleText) return;

 const savedIds = getSavedMarketplaceListingIds();
 const sourceListings = Array.isArray(visibleBuyListings)? visibleBuyListings: marketplaceAllListings.filter(listing => !isListingOwnedByCurrentUser(listing) && !shouldHideMarketplaceListing(listing));
 const savedListings = sourceListings.filter(listing => savedIds.includes(String(listing.id)));
 const isPanelOpen = savedPanel?.style.display !== 'none';

 if (savedCountEl) savedCountEl.textContent = String(savedListings.length);
 if (savedToggleText) savedToggleText.textContent = isPanelOpen? 'Hide Saved Listings': 'View Saved Listings';

 if (!isPanelOpen) {
 if (savedGrid) savedGrid.innerHTML = '';
 if (savedEmpty) savedEmpty.style.display = 'none';
 renderSavedComparePanel([]);
 return;
 }

 if (savedGrid) savedGrid.innerHTML = savedListings.map(createMarketplaceCardHtml).join('');
 if (savedEmpty) savedEmpty.style.display = savedListings.length? 'none': 'block';
 renderSavedComparePanel(savedListings);
}

function toggleSavedListingsPanel() {
 const savedPanel = document.getElementById('savedListingsPanel');
 if (!savedPanel) return;

 const shouldOpen = savedPanel.style.display === 'none';
 savedPanel.style.display = shouldOpen? 'block': 'none';
 renderSavedMarketplaceListings();
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
 } else if (!shouldHideMarketplaceListing(listing)) {
 buyListings.push(listing);
 }
 });

 myGrid.innerHTML = myListings.map(createMarketplaceCardHtml).join('');
 buyGrid.innerHTML = buyListings.map(createMarketplaceCardHtml).join('');
 renderSavedMarketplaceListings(buyListings);
 updateMarketplaceSectionState(myListings.length, buyListings.length);
 renderMarketplaceCount();
 applyStaticUiTranslations();
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
 const formatListingCount = count => `${count} ${getStaticUiText(count === 1? 'listing': 'listings')}`;
 if (myCountEl) myCountEl.textContent = formatListingCount(myCount);
 if (buyCountEl) buyCountEl.textContent = formatListingCount(buyCount);
 applyStaticUiTranslations();
}

function toggleSavedListing(id) {
 const listingId = String(id);
 const savedIds = getSavedMarketplaceListingIds();
 const nextIds = savedIds.includes(listingId)? savedIds.filter(savedId => savedId !== listingId): [...savedIds, listingId];
 setMarketplaceStoredIds(MARKETPLACE_SAVED_KEY, nextIds);
 renderMarketplaceFilteredListings();
 showToast(savedIds.includes(listingId)? 'Removed from saved listings.': 'Saved for later comparison.', savedIds.includes(listingId)? 'info': 'success');
}

function clearSavedListings() {
 setMarketplaceStoredIds(MARKETPLACE_SAVED_KEY, []);
 renderMarketplaceFilteredListings();
 showToast('Saved listings cleared.', 'info');
}

function reportListing(id) {
 const listingId = String(id);
 const listing = marketplaceListingsById.get(listingId);
 const cropName = listing?.crop_name || listing?.cropName || 'this listing';
 const modal = document.getElementById('reportListingModal');
 const form = document.getElementById('reportListingForm');
 const idInput = document.getElementById('reportListingId');
 const subtitle = document.getElementById('reportListingSubtitle');
 const note = document.getElementById('reportListingNote');

 if (!modal || !form || !idInput) {
 alert(`Report ${cropName}: Please select a reason in the report dialog.`);
 return;
 }

 idInput.value = listingId;
 if (subtitle) subtitle.textContent = `Why do you want to report ${cropName}?`;
 if (note) note.value = '';
 form.querySelectorAll('input[name="reportReason"]').forEach(input => { input.checked = false; });
 modal.style.display = 'flex';
}

function closeReportListingModal() {
 const modal = document.getElementById('reportListingModal');
 if (modal) modal.style.display = 'none';
}

async function submitListingReport(event) {
 event.preventDefault();
 const form = event.currentTarget;
 const listingId = String(document.getElementById('reportListingId')?.value || '');
 const selectedReason = form.querySelector('input[name="reportReason"]:checked')?.value || '';
 const note = document.getElementById('reportListingNote')?.value?.trim() || '';
 const listing = marketplaceListingsById.get(listingId);
 const cropName = listing?.crop_name || listing?.cropName || 'this listing';

 if (!listingId || !selectedReason) {
 showToast('Please select a report reason.', 'error');
 return;
 }

 if (!localStorage.getItem('agri_token')) {
 showToast('Please log in to report a listing.', 'error');
 return;
 }

 const reportDetail = {
 reason: selectedReason,
 note,
 reportedAt: new Date().toISOString()
 };

 try {
 await apiFetch(`/market/listings/${encodeURIComponent(listingId)}/reports`, {
 method: 'POST',
 body: JSON.stringify({
 reason: selectedReason,
 note
 })
 });
 } catch (err) {
 showToast(err.msg || 'Could not submit the report. Please try again.', 'error');
 return;
 }

 const reportedIds = getReportedMarketplaceListingIds();
 if (!reportedIds.includes(listingId)) {
 setMarketplaceStoredIds(MARKETPLACE_REPORTED_KEY, [...reportedIds, listingId]);
 }
 setMarketplaceReportDetail(listingId, {
 ...reportDetail,
 cropName,
 listingId
 });

 const savedIds = getSavedMarketplaceListingIds().filter(savedId => savedId !== listingId);
 setMarketplaceStoredIds(MARKETPLACE_SAVED_KEY, savedIds);
 closeReportListingModal();
 renderMarketplaceFilteredListings();
 showToast('Report submitted. The seller has been notified to review this crop listing.', 'warning');
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
 ${phone? `<a class="btn btn-primary btn-sm" href="tel:${cleanPhone}" style="justify-content:center;"><i class="fas fa-phone"></i> <span>Call</span> ${cleanPhone}</a>`: ''}
 ${chatPhone? `<a class="btn btn-secondary btn-sm" href="https://wa.me/${chatPhone}?text=${message}" target="_blank" rel="noopener" style="justify-content:center;"><i class="fas fa-comment"></i> WhatsApp Chat</a>`: ''}
 ${email? `<a class="btn btn-secondary btn-sm" href="mailto:${cleanEmail}?subject=${encodeURIComponent(`Inquiry for ${listing.crop_name || 'crop'}`)}&body=${message}" style="justify-content:center;"><i class="fas fa-envelope"></i> <span>Email</span> ${cleanEmail}</a>`: ''}
 ${!phone &&!email? '<p style="font-size:.9rem;color:var(--text-secondary);">Seller contact details are not available for this listing.</p>': ''}
 </div>
 </div>
 `;
 modal.style.display = 'flex';
 applyStaticUiTranslations();
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
 applyStaticUiTranslations();
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
 applyStaticUiTranslations();
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
 const reportForm = document.getElementById('reportListingForm');
 if (!form ||!modal ||!document.getElementById('myListingsGrid') ||!document.getElementById('buyListingsGrid')) return;

 if (reportForm && reportForm.dataset.bound !== 'true') {
 reportForm.addEventListener('submit', submitListingReport);
 reportForm.dataset.bound = 'true';
 }

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

function normalizeNotification(alert) {
 return {
 id: String(alert?.id || `notification-${Date.now()}`),
 title: String(alert?.title || 'Notification'),
 message: String(alert?.message || ''),
 time: alert?.time || formatListingTime(alert?.created_at || new Date().toISOString()),
 isRead: Boolean(alert?.is_read)
 };
}

function notificationListHtml(notifications) {
 return notifications.length? notifications.map(n => `
 <div class="notification-item ${n.isRead? 'is-read': 'is-unread'}">
 <h5>${escapeHtml(n.title)}</h5>
 <p>${escapeHtml(n.message)}</p>
 <span>${escapeHtml(n.time)}</span>
 </div>
 `).join(''): '<div class="notification-empty">No new notifications</div>';
}

function setNotificationDot(button, unreadCount) {
 const dot = button.querySelector('.notif-dot');
 if (dot) dot.style.display = unreadCount > 0? 'block': 'none';
}

function updateNotificationMenu(menu, notifications) {
 const list = menu.querySelector('.notification-list');
 if (list) list.innerHTML = notificationListHtml(notifications);
}

async function fetchUserNotifications() {
 if (!localStorage.getItem('agri_token')) {
 const savedRead = localStorage.getItem('agri_notifications_read') === 'true';
 return {
 notifications: defaultNotifications.map(item => ({ ...item, isRead: savedRead })),
 unreadCount: savedRead? 0: defaultNotifications.length
 };
 }

 const data = await apiFetch('/user/alerts');
 const alerts = Array.isArray(data?.alerts)? data.alerts: [];
 return {
 notifications: alerts.map(normalizeNotification),
 unreadCount: Number(data?.unread_count) || 0
 };
}

function createNotificationMenu(notifications) {
 const menu = document.createElement('div');
 menu.className = 'notification-menu';
 menu.setAttribute('aria-hidden', 'true');

 menu.innerHTML = `
 <div class="notification-header">
 <h4>Notifications</h4>
 <button type="button" class="mark-read-btn">Mark all read</button>
 </div>
 <div class="notification-list">${notificationListHtml(notifications)}</div>
 `;

 return menu;
}

function initNotifications() {
 const bellButtons = Array.from(document.querySelectorAll('.notification-btn'));
 if (!bellButtons.length) return;

 let notifications = [];
 let unreadCount = 0;
 const menuByButton = new Map();

 bellButtons.forEach(button => {
 const container = button.parentElement;
 if (!container) return;

 const menu = createNotificationMenu(notifications);
 container.style.position = 'relative';
 container.appendChild(menu);
 menuByButton.set(button, menu);
 setNotificationDot(button, unreadCount);

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
 markReadBtn.addEventListener('click', async (event) => {
 event.stopPropagation();
 try {
 if (localStorage.getItem('agri_token')) {
 await apiFetch('/user/alerts/read', { method: 'POST' });
 }
 localStorage.setItem('agri_notifications_read', 'true');
 notifications = notifications.map(item => ({ ...item, isRead: true }));
 unreadCount = 0;
 menuByButton.forEach((notificationMenu) => updateNotificationMenu(notificationMenu, notifications));
 bellButtons.forEach(button => setNotificationDot(button, unreadCount));
 } catch (err) {
 showToast(err.msg || 'Could not mark notifications as read.', 'error');
 }
 menu.classList.remove('open');
 menu.setAttribute('aria-hidden', 'true');
 });
 }
 });

 fetchUserNotifications().then(result => {
 notifications = result.notifications;
 unreadCount = result.unreadCount;
 menuByButton.forEach((menu) => updateNotificationMenu(menu, notifications));
 bellButtons.forEach(button => setNotificationDot(button, unreadCount));
 }).catch(err => {
 console.warn('Failed to load notifications:', err);
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
 const isMobile = window.matchMedia('(max-width: 768px)').matches;

 if (isMobile) {
 if (sidebar) sidebar.classList.toggle('open');
 if (overlay) overlay.classList.toggle('show');
 return;
 }

 document.body.classList.toggle('sidebar-collapsed');
 localStorage.setItem('agri_sidebar_collapsed', document.body.classList.contains('sidebar-collapsed')? 'true': 'false');
 updateSidebarToggleState();
}

function closeSidebarMenu() {
 const sidebar = document.getElementById('sidebar');
 const overlay = document.getElementById('sidebarOverlay');
 sidebar?.classList.remove('open');
 overlay?.classList.remove('show');
}

function updateSidebarToggleState() {
 const isCollapsed = document.body.classList.contains('sidebar-collapsed');
 document.querySelectorAll('[data-sidebar-toggle]').forEach(button => {
 button.setAttribute('aria-expanded', String(!isCollapsed));
 button.classList.toggle('is-collapsed', isCollapsed);
 });
}

function initSidebarToggleMenu() {
 const topbarLeft = document.querySelector('.topbar-left');
 const sidebar = document.getElementById('sidebar');
 if (!topbarLeft || !sidebar) return;

 if (!document.querySelector('.topbar-menu-toggle')) {
 const button = document.createElement('button');
 button.type = 'button';
 button.className = 'topbar-menu-toggle';
 button.setAttribute('data-sidebar-toggle', 'true');
 button.setAttribute('aria-label', 'Toggle navigation menu');
 button.setAttribute('aria-expanded', 'true');
 button.innerHTML = '<i class="fas fa-bars"></i>';
 button.addEventListener('click', toggleSidebar);
 topbarLeft.prepend(button);
 }

 document.getElementById('sidebarToggle')?.setAttribute('data-sidebar-toggle', 'true');

 if (localStorage.getItem('agri_sidebar_collapsed') === 'true' && !window.matchMedia('(max-width: 768px)').matches) {
 document.body.classList.add('sidebar-collapsed');
 }

 sidebar.querySelectorAll('a').forEach(link => {
 link.addEventListener('click', () => {
 if (window.matchMedia('(max-width: 768px)').matches) closeSidebarMenu();
 });
 });

 window.addEventListener('resize', () => {
 if (!window.matchMedia('(max-width: 768px)').matches) closeSidebarMenu();
 updateSidebarToggleState();
 });

 document.addEventListener('keydown', event => {
 if (event.key === 'Escape') closeSidebarMenu();
 });

 updateSidebarToggleState();
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

const LOCAL_API_HOSTS = ['', 'localhost', '127.0.0.1', '::1'];

const API_URL = (() => {
 const configuredUrl =
 window.AGRICOMPLETE_API_URL ||
 document.querySelector('meta[name="api-url"]')?.content;
 if (configuredUrl) return normalizeApiUrl(configuredUrl);

 if (LOCAL_API_HOSTS.includes(window.location.hostname)) {
 return 'http://localhost:5000/api';
 }

 return `${window.location.origin}/api`;
})();

const API_BASE_URLS = (() => {
 return [API_URL];
})();

// API Helper
function isAuthExpiredMessage(message) {
 return /token has expired|expired token|signature has expired|missing authorization/i.test(String(message || ''));
}

function isLikelyHtmlResponse(contentType, data) {
 const body = String(data?.msg || '');
 return contentType.includes('text/html') || /^\s*(<!doctype html|<html)/i.test(body);
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

 let lastError = null;
 for (let index = 0; index < API_BASE_URLS.length; index += 1) {
 const baseUrl = API_BASE_URLS[index];
 try {
 const res = await fetch(`${baseUrl}${endpoint}`, {...options, headers });
 const contentType = res.headers.get('content-type') || '';
 const data = contentType.includes('application/json')? await res.json(): { msg: (await res.text()) || `API Error: ${res.status}` };

 if (index < API_BASE_URLS.length - 1 && isLikelyHtmlResponse(contentType, data)) {
 console.warn(`API response from ${baseUrl} was HTML, retrying backend fallback.`);
 continue;
 }

 if (!res.ok) {
 const errorMsg = data.msg || data.message || `API Error: ${res.status}`;
 console.error(`API Error (${endpoint}):`, res.status, data);
 if (index < API_BASE_URLS.length - 1 && (res.status === 404 || isLikelyHtmlResponse(contentType, data))) {
 continue;
 }
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
 lastError = err;
 if (err instanceof TypeError && index < API_BASE_URLS.length - 1) {
 continue;
 }
 if (err instanceof TypeError) {
 throw { msg: `Cannot connect to backend at ${baseUrl}. Please ensure the server is running.` };
 }
 throw err;
 }
 }

 throw lastError || { msg: 'API request failed. Please try again.' };
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

async function apiFetchFormData(endpoint, formData, options = {}) {
 const token = localStorage.getItem('agri_token');
 const headers = {
 ...(token && { 'Authorization': `Bearer ${token}` }),
 ...options.headers
 };

 let lastError = null;
 for (let index = 0; index < API_BASE_URLS.length; index += 1) {
 const baseUrl = API_BASE_URLS[index];
 try {
 const res = await fetch(`${baseUrl}${endpoint}`, {
 ...options,
 method: options.method || 'POST',
 headers,
 body: formData
 });
 const contentType = res.headers.get('content-type') || '';
 const data = contentType.includes('application/json')? await res.json(): { msg: (await res.text()) || `API Error: ${res.status}` };

 if (index < API_BASE_URLS.length - 1 && isLikelyHtmlResponse(contentType, data)) {
 console.warn(`API response from ${baseUrl} was HTML, retrying backend fallback.`);
 continue;
 }

 if (!res.ok) {
 const errorMsg = data.msg || data.message || `API Error: ${res.status}`;
 if (index < API_BASE_URLS.length - 1 && (res.status === 404 || isLikelyHtmlResponse(contentType, data))) {
 continue;
 }
 if (res.status === 401 && isAuthExpiredMessage(errorMsg)) {
 clearExpiredSession();
 throw { msg: 'Session expired. Please log in again.', status: res.status, data };
 }
 throw { msg: errorMsg, status: res.status, data };
 }
 return data;
 } catch (err) {
 console.error(`API Error (${endpoint}):`, err);
 lastError = err;
 if (err instanceof TypeError && index < API_BASE_URLS.length - 1) {
 continue;
 }
 if (err instanceof TypeError) {
 throw { msg: `Cannot connect to backend at ${baseUrl}. Please ensure the server is running.` };
 }
 throw err;
 }
 }

 throw lastError || { msg: 'API request failed. Please try again.' };
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
 const accessToken = data?.access_token || data?.accessToken || data?.token;
 const user = data?.user || data?.profile || data?.account;

 if (!accessToken ||!user) {
 console.warn('Incomplete login response:', data);
 throw { msg: data?.msg || data?.message || 'Login response was incomplete. Please try again.' };
 }

 localStorage.setItem('agri_token', accessToken);
 localStorage.setItem('agri_user', JSON.stringify(user));
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
 applyStaticUiTranslations();
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
 applyStaticUiTranslations();
 }
}

// ============ DISEASE DETECTION ============
const DISEASE_LOCAL_SCANS_KEY = 'agri_recent_disease_scans';
let diseaseRecentScans = [];
let diseaseScansRefreshTimer = null;

function normalizeDiseaseScan(scan = {}) {
 return {
 id: scan.id || `${scan.name || scan.disease || 'scan'}-${scan.created_at || Date.now()}`,
 name: scan.name || scan.display_name || scan.disease || scan.class_name || 'Detected Disease',
 confidence: Math.max(0, Math.min(100, Number(scan.confidence) || 0)),
 severity: scan.severity || 'Unknown',
 badgeClass: scan.badgeClass || scan.badge_class || 'badge-info',
 created_at: scan.created_at || new Date().toISOString()
 };
}

function getLocalDiseaseScans() {
 try {
 const scans = JSON.parse(localStorage.getItem(DISEASE_LOCAL_SCANS_KEY) || '[]');
 return Array.isArray(scans)? scans.map(normalizeDiseaseScan).slice(0, 8): [];
 } catch (err) {
 return [];
 }
}

function saveLocalDiseaseScan(scan) {
 const normalized = normalizeDiseaseScan(scan);
 const scans = [
 normalized,
 ...getLocalDiseaseScans().filter(item => item.id !== normalized.id)
 ].slice(0, 8);
 localStorage.setItem(DISEASE_LOCAL_SCANS_KEY, JSON.stringify(scans));
 return scans;
}

function diseaseScanTone(scan) {
 const text = `${scan.name} ${scan.severity}`.toLowerCase();
 if (text.includes('healthy')) return { bg: '#E8F5E9', color: 'var(--color-primary)', badge: 'badge' };
 if (text.includes('high') || text.includes('critical')) return { bg: '#FFEBEE', color: '#C62828', badge: 'badge-danger' };
 if (text.includes('moderate') || text.includes('medium')) return { bg: '#FFF8E1', color: '#F57F17', badge: 'badge-warning' };
 return { bg: '#E3F2FD', color: '#1565C0', badge: 'badge-info' };
}

function diseaseScanStatusText(scan) {
 const name = String(scan.name || '').toLowerCase();
 if (name.includes('healthy')) return 'Healthy';
 if (scan.severity === 'High') return 'Critical';
 return scan.severity || 'Unknown';
}

function setRecentScansStatus(text, className = 'badge badge-info') {
 const status = document.getElementById('recentScansStatus');
 if (!status) return;
 status.className = className;
 status.textContent = text;
}

function recentScansMessageHtml(message) {
 return `<div style="padding:10px;background:var(--bg-body);border-radius:var(--radius-sm);font-size:.82rem;color:var(--text-secondary);">${escapeHtml(message)}</div>`;
}

function renderRecentDiseaseScans(scans, emptyMessage = 'No recent scans yet.') {
 const list = document.getElementById('recentScansList');
 if (!list) return;

 diseaseRecentScans = (Array.isArray(scans)? scans: []).map(normalizeDiseaseScan).slice(0, 8);
 if (!diseaseRecentScans.length) {
 list.innerHTML = recentScansMessageHtml(emptyMessage);
 return;
 }

 list.innerHTML = diseaseRecentScans.map(scan => {
 const tone = diseaseScanTone(scan);
 const badgeClass = tone.badge || scan.badgeClass || 'badge-info';
 return `
 <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg-body);border-radius:var(--radius-sm);">
 <div style="width:40px;height:40px;background:${tone.bg};border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex:0 0 40px;"><i class="fas fa-leaf" style="color:${tone.color};"></i></div>
 <div style="flex:1;min-width:0;">
 <strong style="font-size:.88rem;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(scan.name)}</strong>
 <p style="font-size:.75rem;">Confidence: ${Math.round(scan.confidence)}% - ${escapeHtml(formatListingTime(scan.created_at))}</p>
 </div>
 <span class="badge ${escapeHtml(badgeClass)}">${escapeHtml(diseaseScanStatusText(scan))}</span>
 </div>
 `;
 }).join('');
}

async function loadRecentDiseaseScans(options = {}) {
 const list = document.getElementById('recentScansList');
 if (!list) return;

 if (!options.silent) {
 list.innerHTML = recentScansMessageHtml('Loading recent scans...');
 }

 if (!localStorage.getItem('agri_token')) {
 setRecentScansStatus('Local', 'badge badge-warning');
 renderRecentDiseaseScans(getLocalDiseaseScans(), 'Analyze a leaf photo to see recent scans here.');
 return;
 }

 try {
 const data = await apiFetch('/disease/scans?limit=8');
 const scans = Array.isArray(data?.scans)? data.scans: [];
 setRecentScansStatus('Live', 'badge badge-info');
 renderRecentDiseaseScans(scans);
 } catch (err) {
 console.warn('Failed to load recent disease scans:', err);
 const localScans = getLocalDiseaseScans();
 setRecentScansStatus('Offline', 'badge badge-warning');
 renderRecentDiseaseScans(localScans, err.msg || 'Recent scans are unavailable right now.');
 }
}

function prependRecentDiseaseScan(scan) {
 const normalized = normalizeDiseaseScan(scan);
 const scans = [
 normalized,
 ...diseaseRecentScans.filter(item => item.id !== normalized.id)
 ].slice(0, 8);
 renderRecentDiseaseScans(scans);

 if (!localStorage.getItem('agri_token')) {
 setRecentScansStatus('Local', 'badge badge-warning');
 saveLocalDiseaseScan(normalized);
 }
}

function startRecentDiseaseScansLiveRefresh() {
 if (!document.getElementById('recentScansList') || diseaseScansRefreshTimer) return;
 loadRecentDiseaseScans();
 diseaseScansRefreshTimer = window.setInterval(() => {
 loadRecentDiseaseScans({ silent: true });
 }, 20000);
}

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
 const confidence = Math.max(0, Math.min(100, Number(disease.confidence) || 0));
 const symptoms = Array.isArray(disease.symptoms)? disease.symptoms: [];
 const treatment = Array.isArray(disease.treatment)? disease.treatment: [];
 const prevention = Array.isArray(disease.prevention)? disease.prevention: [];

 if (placeholder) placeholder.style.display = 'none';
 if (result) result.style.display = 'block';
 if (badge) {
 badge.className = `badge ${disease.badgeClass || 'badge-info'}`;
 badge.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${escapeHtml(disease.severity || 'Unknown')} Severity`;
 }
 
 if (info) {
 info.innerHTML = `
 <h3 style="margin-bottom:var(--space-sm);color:var(--text-primary);">${escapeHtml(disease.name || 'Detected Disease')}</h3>
 <div style="margin-bottom:var(--space-md);">
 <div style="display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:4px;">
 <span>Confidence Score</span>
 <strong style="color:var(--color-primary);">${confidence}%</strong>
 </div>
 <div class="confidence-bar">
 <div class="confidence-fill" style="width:${confidence}%;"></div>
 </div>
 </div>
 <p style="font-size:.88rem;margin-bottom:var(--space-md);">${escapeHtml(disease.description || 'The model returned a prediction without detailed notes.')}</p>
 
 <h4 style="font-size:.9rem;margin-bottom:var(--space-sm);"><i class="fas fa-exclamation-circle" style="color:#C62828;margin-right:6px;"></i>Symptoms</h4>
 <ul style="font-size:.85rem;color:var(--text-secondary);margin-bottom:var(--space-md);padding-left:16px;">
 ${symptoms.map(s => `<li style="margin-bottom:4px;list-style:disc;">${escapeHtml(s)}</li>`).join('')}
 </ul>
 
 <h4 style="font-size:.9rem;margin-bottom:var(--space-sm);"><i class="fas fa-prescription-bottle-alt" style="color:var(--color-primary);margin-right:6px;"></i>Treatment</h4>
 <ul style="font-size:.85rem;color:var(--text-secondary);margin-bottom:var(--space-md);padding-left:16px;">
 ${treatment.map(t => `<li style="margin-bottom:4px;list-style:disc;">${escapeHtml(t)}</li>`).join('')}
 </ul>
 
 <h4 style="font-size:.9rem;margin-bottom:var(--space-sm);"><i class="fas fa-shield-alt" style="color:var(--color-accent);margin-right:6px;"></i>Prevention</h4>
 <ul style="font-size:.85rem;color:var(--text-secondary);padding-left:16px;">
 ${prevention.map(p => `<li style="margin-bottom:4px;list-style:disc;">${escapeHtml(p)}</li>`).join('')}
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
 const data = await apiFetchFormData('/disease/predict', formData);
 const diseaseResult = {
 name: data.name || data.disease || 'Detected Disease',
 confidence: data.confidence || 0,
 severity: data.severity || 'Unknown',
 badgeClass: data.badgeClass || 'badge-info',
 description: data.description || 'The model returned a prediction without detailed notes.',
 symptoms: data.symptoms || [],
 treatment: data.treatment || [],
 prevention: data.prevention || []
 };

 renderDiseaseResult(diseaseResult);
 const scan = data.scan || { ...diseaseResult, created_at: new Date().toISOString() };
 prependRecentDiseaseScan(scan);
 if (!data.scan) {
 saveLocalDiseaseScan(scan);
 } else if (localStorage.getItem('agri_token')) {
 window.setTimeout(() => loadRecentDiseaseScans({ silent: true }), 500);
 }
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
 initSidebarToggleMenu();
 setActiveSidebar();
 loadProfileData();
 initMarketplaceListingFlow();
 initNotifications();
 startRecentDiseaseScansLiveRefresh();
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
 },
 {
 keys: ['pune', 'poona'],
 answer: 'Pune is a major city in Maharashtra known for education, IT, manufacturing, culture, and history. It is often called the Oxford of the East because of its strong education sector. Pune is also famous for Shaniwar Wada, Aga Khan Palace, nearby forts, pleasant weather, food culture, startups, and the automobile industry.'
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
const ASSISTANT_LLM_TIMEOUT_MS = 28000;

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

 applyStaticUiTranslations();
 applyChatbotStaticTranslations();
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
 const source = message.dataset.i18nSourceText || message.textContent.trim();
 if (translatableStaticTexts.has(source)) {
 message.dataset.i18nSourceText = source;
 renderBotMessageContent(message, getStaticUiText(source));
 return;
 }
 renderBotMessageContent(message, source);
 });
}

function applyChatbotStaticTranslations() {
 document.querySelectorAll('.chat-msg.bot[data-i18n-source-text]').forEach(message => {
 const source = message.dataset.i18nSourceText;
 if (source) {
 renderBotMessageContent(message, getStaticUiText(source));
 message.dataset.i18nSourceText = source;
 }
 });

 document.querySelectorAll('.chat-suggestion').forEach(button => {
 const source = button.dataset.i18nSourceText || button.textContent.trim();
 if (!translatableStaticTexts.has(source)) return;
 button.dataset.i18nSourceText = source;
 button.textContent = getStaticUiText(source);
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
 let topic = String(message || '').replace(/\s+/g, ' ').trim().replace(/[?!.\s]+$/g, '');
 const prefixes = [
 'can you explain me about ', 'can you explain about ', 'can you explain ',
 'please explain me about ', 'please explain about ', 'please explain ',
 'explain me about ', 'explain about ', 'explain ',
 'tell me about ', 'what is ', 'what are ',
 'who is ', 'who are ', 'define ', 'meaning of ', 'how to ', 'how do i ', 'how can i ',
 'why is ', 'why are ', 'why do ', 'why does ', 'give me ', 'show me '
 ];
 const lowered = topic.toLowerCase();
 const prefix = prefixes.find(item => lowered.startsWith(item));
 if (prefix) topic = topic.slice(prefix.length).trim();
 topic = topic
 .replace(/\b(please\s+)?(do not|don't|dont)\s+give me\b.*$/i, '')
 .replace(/\b(famous\s+){2,}/gi, 'famous ')
 .replace(/\b(explain me|explain)\b\s*$/i, '')
 .trim()
 .replace(/[?!.\s]+$/g, '');
 return topic || String(message || '').trim();
}

function buildPromptAwareFallbackAnswer(message) {
 const cleaned = String(message || '').trim();
 const text = normalizeAssistantText(cleaned);
 const topic = getAssistantQuestionTopic(cleaned);
 const topicAnswer = getAssistantOfflineTopicAnswer(text);
 if (topicAnswer) return topicAnswer;

 if (includesAny(text, ['what crop', 'which crop', 'crop should', 'plant in my farm', 'seed in my farm', 'sow in my farm', 'grow in my farm', 'recommend crop'])) {
 return [
 'For a safe general crop choice, match the crop to your season and water supply:',
 '- Rainy/kharif season: soybean, maize, cotton, pigeon pea, or paddy if you have plenty of water.',
 '- Winter/rabi season: wheat, gram/chickpea, mustard, onion, or garlic with irrigation.',
 '- Low-water farms: gram, pigeon pea, millet, sorghum, sesame, or groundnut are usually safer than paddy.',
 'For a more exact recommendation, share your location, soil type, water source, and current season.'
 ].join('\n');
 }

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
 return `${topic}: Here is the most useful way to understand it: what it is, the main facts or features, why it matters, and one practical example. Ask a more specific question to get a deeper answer.`;
 }

 if (includesAny(text, ['write', 'draft', 'message', 'application', 'letter'])) {
 return `Here is a simple draft for "${topic}":\n\nHello, I need help with ${topic}. Please share the required details, next steps, and any documents or information needed. Thank you.`;
 }

 if (includesAny(text, ['best', 'should i', 'recommend', 'which one', 'choose'])) {
 return `For "${topic}", choose based on your goal, budget, time, risk, and available resources. If this is a farm decision, the most important factors are season, soil, water, crop duration, pest risk, and market price.`;
 }

 return `${topic}: I can help with a concise explanation, comparison, or next-step guidance. Share the exact detail you want, such as meaning, importance, examples, advantages, disadvantages, or practical use.`;
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

function buildSimpleAssistantAnswer(message) {
 const text = normalizeAssistantText(message).replace(/[.,!?;:-]+$/g, '').replace(/\s+/g, ' ');
 const greetings = ['hi', 'hii', 'hello', 'hey', 'hey there', 'good morning', 'good afternoon', 'good evening', 'namaste', 'namaskar', 'नमस्ते', 'नमस्कार'];
 const thanks = ['thanks', 'thank you', 'ok thanks', 'okay thanks', 'धन्यवाद'];
 const goodbyes = ['bye', 'goodbye', 'see you', 'see you later'];

 if (greetings.includes(text)) {
 return 'Hi! I am AgriMate. Ask me anything about farming, crops, weather planning, marketplace, or any general question.';
 }
 if (thanks.includes(text)) {
 return 'You are welcome. Ask me anytime if you need help with farming or the app.';
 }
 if (goodbyes.includes(text)) {
 return 'Goodbye. Come back anytime when you need farming or app help.';
 }
 return '';
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
 if (data?.source === 'rate_limited' || answer.toLowerCase().includes('rate limit')) {
 return { text: buildGeneralAnswer(message), source: 'local' };
 }
 return answer? { text: answer, source: data.source || 'llm' }: null;
}

async function generateAssistantResponse(message) {
 const command = getAssistantCommand(message);
 if (command) return command;

 const simpleAnswer = buildSimpleAssistantAnswer(message);
 if (simpleAnswer) return { text: simpleAnswer, source: 'local' };

 try {
 const llmAnswer = await buildLlmAssistantAnswer(message);
 if (llmAnswer) return llmAnswer;
 } catch (err) {
 console.warn('Online assistant unavailable, using local fallback:', err);
 }

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
 { label: 'Q1', value: 1950 },
 { label: 'Q2', value: 2200 },
 { label: 'Q3', value: 2500 },
 { label: 'Q4', value: 2400 }
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
 { label: 'Q1', value: 3180 },
 { label: 'Q2', value: 3420 },
 { label: 'Q3', value: 3650 },
 { label: 'Q4', value: 3580 }
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
 { label: 'Q1', value: 3600 },
 { label: 'Q2', value: 3980 },
 { label: 'Q3', value: 4410 },
 { label: 'Q4', value: 4280 }
 ]
 }
 },
 onion: {
 label: 'Onion',
 periods: {
 '1W': [
 { label: 'Mon', value: 1320 },
 { label: 'Tue', value: 1280 },
 { label: 'Wed', value: 1210 },
 { label: 'Thu', value: 1180 },
 { label: 'Fri', value: 1240 },
 { label: 'Sat', value: 1190 },
 { label: 'Sun', value: 1160 }
 ],
 '1M': [
 { label: 'Week 1', value: 1390 },
 { label: 'Week 2', value: 1320 },
 { label: 'Week 3', value: 1240 },
 { label: 'Week 4', value: 1160 }
 ],
 '3M': [
 { label: 'Mar', value: 1510 },
 { label: 'Apr', value: 1370 },
 { label: 'May', value: 1160 }
 ],
 '1Y': [
 { label: 'Q1', value: 1180 },
 { label: 'Q2', value: 1420 },
 { label: 'Q3', value: 1680 },
 { label: 'Q4', value: 1260 }
 ]
 }
 },
 potato: {
 label: 'Potato',
 periods: {
 '1W': [
 { label: 'Mon', value: 1040 },
 { label: 'Tue', value: 1010 },
 { label: 'Wed', value: 990 },
 { label: 'Thu', value: 960 },
 { label: 'Fri', value: 980 },
 { label: 'Sat', value: 940 },
 { label: 'Sun', value: 930 }
 ],
 '1M': [
 { label: 'Week 1', value: 1080 },
 { label: 'Week 2', value: 1020 },
 { label: 'Week 3', value: 980 },
 { label: 'Week 4', value: 930 }
 ],
 '3M': [
 { label: 'Mar', value: 1120 },
 { label: 'Apr', value: 1030 },
 { label: 'May', value: 930 }
 ],
 '1Y': [
 { label: 'Q1', value: 890 },
 { label: 'Q2', value: 1060 },
 { label: 'Q3', value: 1210 },
 { label: 'Q4', value: 980 }
 ]
 }
 },
 cotton: {
 label: 'Cotton',
 periods: {
 '1W': [
 { label: 'Mon', value: 6620 },
 { label: 'Tue', value: 6710 },
 { label: 'Wed', value: 6680 },
 { label: 'Thu', value: 6840 },
 { label: 'Fri', value: 6910 },
 { label: 'Sat', value: 6980 },
 { label: 'Sun', value: 7040 }
 ],
 '1M': [
 { label: 'Week 1', value: 6410 },
 { label: 'Week 2', value: 6620 },
 { label: 'Week 3', value: 6840 },
 { label: 'Week 4', value: 7040 }
 ],
 '3M': [
 { label: 'Mar', value: 6210 },
 { label: 'Apr', value: 6640 },
 { label: 'May', value: 7040 }
 ],
 '1Y': [
 { label: 'Q1', value: 6020 },
 { label: 'Q2', value: 6380 },
 { label: 'Q3', value: 6910 },
 { label: 'Q4', value: 6720 }
 ]
 }
 },
 chickpea: {
 label: 'Chickpea',
 periods: {
 '1W': [
 { label: 'Mon', value: 4860 },
 { label: 'Tue', value: 4920 },
 { label: 'Wed', value: 5010 },
 { label: 'Thu', value: 5060 },
 { label: 'Fri', value: 5120 },
 { label: 'Sat', value: 5090 },
 { label: 'Sun', value: 5180 }
 ],
 '1M': [
 { label: 'Week 1', value: 4750 },
 { label: 'Week 2', value: 4890 },
 { label: 'Week 3', value: 5030 },
 { label: 'Week 4', value: 5180 }
 ],
 '3M': [
 { label: 'Mar', value: 4620 },
 { label: 'Apr', value: 4940 },
 { label: 'May', value: 5180 }
 ],
 '1Y': [
 { label: 'Q1', value: 4480 },
 { label: 'Q2', value: 4710 },
 { label: 'Q3', value: 5140 },
 { label: 'Q4', value: 5020 }
 ]
 }
 },
 mustard: {
 label: 'Mustard',
 periods: {
 '1W': [
 { label: 'Mon', value: 5290 },
 { label: 'Tue', value: 5360 },
 { label: 'Wed', value: 5410 },
 { label: 'Thu', value: 5480 },
 { label: 'Fri', value: 5520 },
 { label: 'Sat', value: 5490 },
 { label: 'Sun', value: 5570 }
 ],
 '1M': [
 { label: 'Week 1', value: 5160 },
 { label: 'Week 2', value: 5310 },
 { label: 'Week 3', value: 5450 },
 { label: 'Week 4', value: 5570 }
 ],
 '3M': [
 { label: 'Mar', value: 5040 },
 { label: 'Apr', value: 5320 },
 { label: 'May', value: 5570 }
 ],
 '1Y': [
 { label: 'Q1', value: 4920 },
 { label: 'Q2', value: 5180 },
 { label: 'Q3', value: 5560 },
 { label: 'Q4', value: 5410 }
 ]
 }
 },
 turmeric: {
 label: 'Turmeric',
 periods: {
 '1W': [
 { label: 'Mon', value: 7240 },
 { label: 'Tue', value: 7310 },
 { label: 'Wed', value: 7480 },
 { label: 'Thu', value: 7560 },
 { label: 'Fri', value: 7680 },
 { label: 'Sat', value: 7620 },
 { label: 'Sun', value: 7790 }
 ],
 '1M': [
 { label: 'Week 1', value: 7040 },
 { label: 'Week 2', value: 7280 },
 { label: 'Week 3', value: 7520 },
 { label: 'Week 4', value: 7790 }
 ],
 '3M': [
 { label: 'Mar', value: 6820 },
 { label: 'Apr', value: 7310 },
 { label: 'May', value: 7790 }
 ],
 '1Y': [
 { label: 'Q1', value: 6540 },
 { label: 'Q2', value: 7010 },
 { label: 'Q3', value: 7720 },
 { label: 'Q4', value: 7460 }
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

 const chartCard = chartGroup.closest('.chart-container') || document;
 const activeFilter = chartCard.querySelector('.chart-filter.active');
 const selectedPeriod = period || activeFilter?.textContent?.trim() || '1W';
 const cropSelect = document.getElementById('priceTrendCrop');
 const selectedCrop = crop || cropSelect?.value || 'wheat';
 const cropData = PRICE_TREND_DATA[selectedCrop] || PRICE_TREND_DATA.wheat;
 const cropLabel = getStaticUiText(cropData.label);
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
 <div class="chart-bar${stateClass}" style="--bar-height:${height.toFixed(1)}%; animation: growUp 0.6s ease-out ${idx * 0.05}s both;" title="${escapeHtml(cropLabel)} ${escapeHtml(item.label)}: ${formatTrendPrice(item.value)}">
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
 insightEl.textContent = `${cropLabel} is ${direction} ${Math.abs(change).toFixed(1)}% for ${selectedPeriod}. Best observed rate: ${best}/q.`;
 }

 chartCard.querySelectorAll('.chart-filter').forEach(btn => {
 btn.classList.toggle('active', btn.textContent.trim() === selectedPeriod);
 });
 applyStaticUiTranslations();
};
