document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            nav_home: 'Home',
            nav_report: 'Report Scam',
            nav_search: 'Search Database',
            nav_verified: 'Verified Profiles',
            nav_check: 'Check Message',
            hero_title: 'Sudan Anti-Scam Platform',
            hero_subtitle: 'Your first line of defense against scams in Sudan',
            hero_description: 'Protect yourself and others from scams in Sudan by reporting suspicious activities and verifying information through our trusted platform.',
            feature_title: 'Protect Yourself from Scams',
            report_scam_title: 'Report Scam',
            report_scam_desc: 'Report suspicious phone numbers, emails, or social media accounts',
            search_db_title: 'Search Database',
            search_db_desc: 'Check if a number or account has been reported before',
            verified_profiles_title: 'Verified Profiles',
            verified_profiles_desc: 'View official profiles of banks and companies',
            check_message_title: 'Check Message',
            check_message_desc: 'Analyze a suspicious message for scam patterns',
            latest_alerts_title: 'Latest Alerts',
            footer_text: '© 2025 SASP - Sudan Anti-Scam Platform. All rights reserved.',
            what_reporting: 'What are you reporting?',
            select_type: 'Select type',
            phone_number: 'Phone Number',
            email: 'Email',
            social_media: 'Social Media',
            identifier: 'Identifier',
            scam_type: 'Scam Type',
            select_scam_type: 'Select scam type',
            financial: 'Financial',
            impersonation: 'Impersonation',
            job_offer: 'Job Offer',
            phishing: 'Phishing',
            other: 'Other',
            description: 'Description',
            submit: 'Submit',
            search_placeholder: 'Enter phone, email, or social media account',
            search: 'Search',
            search_results: 'Search Results',
            no_results: 'No results found for the given query.',
            banks_financial: 'Banks & Financial Institutions',
            paste_message_desc: 'Paste a suspicious message to check for scam patterns',
            paste_message_placeholder: 'Paste the suspicious message here...',
            analyze_message: 'Analyze Message',
            disclaimer: 'Disclaimer: This tool provides a basic analysis and is not a guarantee of safety. Always be cautious.'
        },
        ar: {
            nav_home: 'الرئيسية',
            nav_report: 'الإبلاغ عن احتيال',
            nav_search: 'البحث في قاعدة البيانات',
            nav_verified: 'الملفات الموثقة',
            nav_check: 'فحص الرسائل',
            hero_title: 'منصة السودان لمكافحة الاحتيال',
            hero_subtitle: 'خط دفاعك الأول ضد الاحتيال في السودان',
            hero_description: 'احم نفسك والآخرين من عمليات الاحتيال في السودان من خلال الإبلاغ عن الأنشطة المشبوهة والتحقق من المعلومات من خلال منصتنا الموثوقة.',
            feature_title: 'احم نفسك من الاحتيال',
            report_scam_title: 'الإبلاغ عن احتيال',
            report_scam_desc: 'الإبلاغ عن أرقام هواتف أو بريد إلكتروني أو حسابات وسائط اجتماعية مشبوهة',
            search_db_title: 'البحث في قاعدة البيانات',
            search_db_desc: 'التحقق مما إذا كان قد تم الإبلاغ عن رقم أو حساب من قبل',
            verified_profiles_title: 'الملفات الموثقة',
            verified_profiles_desc: 'عرض الملفات الشخصية الرسمية للبنوك والشركات',
            check_message_title: 'فحص الرسائل',
            check_message_desc: 'تحليل الرسائل المشبوهة للكشف عن أنماط الاحتيال',
            latest_alerts_title: 'أحدث التحذيرات',
            footer_text: '© 2025 منصة السودان لمكافحة الاحتيال. جميع الحقوق محفوظة.',
            what_reporting: 'ما الذي تبلغ عنه؟',
            select_type: 'اختر النوع',
            phone_number: 'رقم الهاتف',
            email: 'البريد الإلكتروني',
            social_media: 'وسائل التواصل الاجتماعي',
            identifier: 'المعرّف',
            scam_type: 'نوع الاحتيال',
            select_scam_type: 'اختر نوع الاحتيال',
            financial: 'مالي',
            impersonation: 'انتحال شخصية',
            job_offer: 'عرض عمل',
            phishing: 'تصيد',
            other: 'آخر',
            description: 'الوصف',
            submit: 'إرسال',
            search_placeholder: 'أدخل رقم الهاتف أو البريد الإلكتروني أو حساب وسائل التواصل الاجتماعي',
            search: 'بحث',
            search_results: 'نتائج البحث',
            no_results: 'لم يتم العثور على نتائج للبحث.',
            banks_financial: 'البنوك والمؤسسات المالية',
            paste_message_desc: 'الصق رسالة مشبوهة للتحقق من أنماط الاحتيال',
            paste_message_placeholder: 'الصق الرسالة المشبوهة هنا...',
            analyze_message: 'تحليل الرسالة',
            disclaimer: 'إخلاء مسؤولية: هذه الأداة توفر تحليلًا أساسيًا وليست ضمانًا للسلامة. كن حذرًا دائمًا.'
        }
    };

    const scammerReports = [
        {
            id: 1,
            identifier: "0912345678",
            reportCount: 5,
            riskLevel: "high",
            scamTypes: ["financial", "impersonation"],
            descriptions: ["Pretended to be from the bank.", "Asked for my PIN."],
            dateReported: "2024-07-20",
        },
    ];

    const alertMessages = [
        {
            id: 1,
            title: "New Phishing Scam Alert",
            titleAr: "تنبيه من عملية تصيد جديدة",
            content: "A new phishing scam targeting Bank of Khartoum customers is circulating. Do not click on any suspicious links.",
            contentAr: "تنتشر عملية تصيد جديدة تستهدف عملاء بنك الخرطوم. لا تنقر على أي روابط مشبوهة.",
            source: "SASP Team",
            sourceAr: "فريق SASP",
            date: "2024-07-21",
            type: "alert",
        },
    ];

    const verifiedEntities = [
        {
            id: 1,
            name: "Bank of Khartoum",
            nameAr: "بنك الخرطوم",
            type: "bank",
            website: "https://bankofkhartoum.com/",
            customerService: "1913",
        },
    ];

    const suspiciousPhrases = ["urgent", "verify your account", "winner", "free prize"];
    const suspiciousPhrasesAr = ["عاجل", "تحقق من حسابك", "فائز", "جائزة مجانية"];

    let currentLanguage = localStorage.getItem('language') || 'en';

    const languageSwitcher = document.getElementById('language-switcher');

    function updateContent() {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });

        if (languageSwitcher) {
            languageSwitcher.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
        }

        if (currentLanguage === 'ar') {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }
    }

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
            localStorage.setItem('language', currentLanguage);
            updateContent();
            renderAlerts();
            renderVerifiedProfiles();
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = (link.getAttribute('href') || '').split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    if (document.querySelector('#report-scam-form')) {
        const form = document.querySelector('#report-scam-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your report!');
            form.reset();
        });
    }

    if (document.querySelector('#search-database-form')) {
        const form = document.querySelector('#search-database-form');
        const resultsContainer = document.querySelector('#search-results');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = form.querySelector('input').value.toLowerCase();
            const results = scammerReports.filter(report => report.identifier.toLowerCase().includes(query));

            let html = '';
            if (results.length > 0) {
                results.forEach(result => {
                    html += `<div class="border rounded-lg shadow-md bg-white p-6 mb-4">
                        <h3 class="text-xl font-bold">${result.identifier}</h3>
                        <p class="text-muted-foreground">Reported ${result.reportCount} times</p>
                        <p class="text-red-500 font-bold">Risk Level: ${result.riskLevel}</p>
                    </div>`;
                });
            } else {
                html = `<div class="border rounded-lg shadow-md bg-white p-6 text-center">
                    <p class="text-muted-foreground" data-key="no_results">No results found for the given query.</p>
                </div>`;
            }
            resultsContainer.innerHTML = html;
        });
    }

    if (document.querySelector('#check-message-form')) {
        const form = document.querySelector('#check-message-form');
        const resultsContainer = document.querySelector('#check-message-results');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = form.querySelector('textarea').value.toLowerCase();
            const phrases = currentLanguage === 'en' ? suspiciousPhrases : suspiciousPhrasesAr;
            const matches = phrases.filter(phrase => message.includes(phrase.toLowerCase()));

            let html = '';
            if (matches.length > 0) {
                html = `<div class="border rounded-lg shadow-md bg-white p-6">
                    <h3 class="text-xl font-bold text-red-500">Suspicious Message</h3>
                    <p>This message contains ${matches.length} suspicious patterns:</p>
                    <ul>${matches.map(match => `<li>${match}</li>`).join('')}</ul>
                </div>`;
            } else {
                html = `<div class="border rounded-lg shadow-md bg-white p-6">
                    <h3 class="text-xl font-bold text-green-500">No Suspicious Patterns Detected</h3>
                </div>`;
            }
            resultsContainer.innerHTML = html;
        });
    }

    function renderAlerts() {
        const alertsContainer = document.querySelector('#latest-alerts');
        if (alertsContainer) {
            let html = '';
            alertMessages.forEach(alert => {
                html += `<div class="border-l-4 border-red-500 p-4 mb-4 bg-red-50">
                    <h4 class="font-semibold">${currentLanguage === 'en' ? alert.title : alert.titleAr}</h4>
                    <p class="mt-1 text-sm">${currentLanguage === 'en' ? alert.content : alert.contentAr}</p>
                    <div class="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span><strong>Source:</strong> ${currentLanguage === 'en' ? alert.source : alert.sourceAr}</span>
                        <span>${alert.date}</span>
                    </div>
                </div>`;
            });
            alertsContainer.innerHTML = html;
        }
    }

    function renderVerifiedProfiles() {
        const container = document.querySelector('#verified-profiles-container');
        if(container){
            let html = '';
            verifiedEntities.forEach(entity => {
                html += `<div class="border-t-4 border-SASP-primary hover:shadow-lg transition-shadow rounded-lg bg-white p-6">
                    <h3 class="text-xl font-bold">${currentLanguage === 'en' ? entity.name : entity.nameAr}</h3>
                    <p class="text-muted-foreground">${entity.type}</p>
                    <a href="${entity.website}" target="_blank" class="text-SASP-primary hover:underline">Official Website</a>
                    <p>Customer Service: ${entity.customerService}</p>
                </div>`;
            });
            container.innerHTML = html;
        }
    }

    updateContent();
    renderAlerts();
    renderVerifiedProfiles();
});
