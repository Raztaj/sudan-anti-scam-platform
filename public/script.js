document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const languageText = document.getElementById('language-text');
    let currentLanguage = 'en';

    const translations = {
        en: {
            appName: 'SASP',
            tagline: 'Your Shield Against Scams in Sudan',
            protectionInfo: 'Protect yourself and others from scams in Sudan by reporting suspicious activities and verifying information through our trusted platform.',
            reportScam: 'Report Scam',
            searchDatabase: 'Search Database',
            protectYourself: 'Protect Yourself from Scams',
            reportScamDescription: 'Report suspicious phone numbers, emails, or social media accounts',
            searchDatabaseDescription: 'Check if a number or account has been reported before',
            verifiedProfiles: 'Verified Profiles',
            verifiedProfilesDescription: 'View official profiles of banks and companies',
            checkMessage: 'Check Message',
            checkMessageDescription: 'Analyze a suspicious message for scam patterns',
            latestAlerts: 'Latest Alerts',
            footerText: '© 2025 SASP - Sudan Anti-Scam Platform. All rights reserved.',
            language: 'العربية'
        },
        ar: {
            appName: 'منصة السودان لمكافحة الاحتيال',
            tagline: 'درعك الواقي ضد الاحتيال في السودان',
            protectionInfo: 'احم نفسك والآخرين من عمليات الاحتيال في السودان من خلال الإبلاغ عن الأنشطة المشبوهة والتحقق من المعلومات من خلال منصتنا الموثوقة.',
            reportScam: 'الإبلاغ عن احتيال',
            searchDatabase: 'البحث في قاعدة البيانات',
            protectYourself: 'احم نفسك من الاحتيال',
            reportScamDescription: 'الإبلاغ عن أرقام هواتف أو بريد إلكتروني أو حسابات وسائط اجتماعية مشبوهة',
            searchDatabaseDescription: 'التحقق مما إذا كان قد تم الإبلاغ عن رقم أو حساب من قبل',
            verifiedProfiles: 'الملفات الموثقة',
            verifiedProfilesDescription: 'عرض الملفات الشخصية الرسمية للبنوك والشركات',
            checkMessage: 'فحص الرسائل',
            checkMessageDescription: 'تحليل الرسائل المشبوهة للكشف عن أنماط الاحتيال',
            latestAlerts: 'آخر التنبيهات',
            footerText: '© 2025 منصة السودان لمكافحة الاحتيال. جميع الحقوق محفوظة.',
            language: 'English'
        }
    };

    const updateText = () => {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[currentLanguage][key]) {
                el.textContent = translations[currentLanguage][key];
            }
        });
        languageText.textContent = translations[currentLanguage].language;
        if (currentLanguage === 'ar') {
            document.documentElement.lang = 'ar';
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.documentElement.lang = 'en';
            document.body.classList.add('ltr');
            document.body.classList.remove('rtl');
        }
    };

    languageSwitcher.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
        updateText();
    });

    updateText();
});
