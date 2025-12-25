// Supabase client setup
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Component HTML ---

const navbarHTML = `
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a href="index.html" class="btn btn-ghost normal-case text-xl">Salamah</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="index.html">Home</a></li>
        <li><a href="report.html">Submit a Report</a></li>
        <li><a href="browse.html">Browse Reports</a></li>
        <li><a href="verified.html">Verified List</a></li>
      </ul>
    </div>
  </nav>
`;

const footerHTML = `
  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>Copyright © 2024 - All right reserved by Salamah Org</p>
      <a href="mailto:feedback@salamah.org" class="link link-hover">Provide Feedback</a>
    </div>
  </footer>
`;

const reportFormHTML = `
  <form id="report-form" class="space-y-4">
    <p id="form-message"></p>
    <div>
      <label class="label"><span class="label-text">Report Type</span></label>
      <select id="report-type" class="select select-bordered w-full">
        <option>Phone Number</option>
        <option>Email</option>
        <option>Social Media</option>
      </select>
    </div>
    <div>
      <label class="label"><span class="label-text">Identifier (Phone, Email, URL)</span></label>
      <input type="text" id="identifier" placeholder="Enter the identifier" class="input input-bordered w-full" required />
    </div>
    <div>
      <label class="label"><span class="label-text">Description</span></label>
      <textarea id="description" class="textarea textarea-bordered w-full" placeholder="Describe the scam" required></textarea>
    </div>
    <div>
      <label class="label"><span class="label-text">Category</span></label>
      <select id="category" class="select select-bordered w-full">
        <option>Financial</option>
        <option>Impersonation</option>
        <option>Unrealistic Offers</option>
        <option>Action Triggers</option>
      </select>
    </div>
    <button type="submit" id="submit-btn" class="btn btn-primary">Submit Report</button>
  </form>
`;

const reportListHTML = `
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Type</th>
          <th>Identifier</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody id="reports-tbody">
        <!-- Reports will be inserted here -->
      </tbody>
    </table>
  </div>
`;

const verifiedListHTML = `
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Official Contact</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody id="verified-tbody">
        <!-- Verified companies will be inserted here -->
      </tbody>
    </table>
  </div>
`;

const searchBarHTML = `
  <form id="search-form" class="join">
    <input type="text" id="search-query" placeholder="Search by identifier..." class="input input-bordered join-item" />
    <button type="submit" class="btn join-item">Search</button>
  </form>
`;

const scamAnalyzerHTML = `
  <div class="space-y-4">
    <textarea id="analyzer-text" class="textarea textarea-bordered w-full h-32" placeholder="Paste a message to analyze for scam keywords..."></textarea>
    <button id="analyze-btn" class="btn btn-primary">Analyze</button>
    <p id="analyzer-result"></p>
  </div>
`;
// --- Application Logic ---

async function fetchReports(query = '') {
  const tbody = document.getElementById('reports-tbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  let supabaseQuery = supabaseClient.from('reports').select('*');
  if (query) {
    supabaseQuery = supabaseQuery.ilike('identifier', `%${query}%`);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    console.error('Error fetching reports:', error);
    tbody.innerHTML = '<tr><td colspan="4">Could not fetch reports.</td></tr>';
  } else {
    tbody.innerHTML = data.map(report => `
      <tr>
        <td>${report.report_type}</td>
        <td>${report.identifier}</td>
        <td>${report.description}</td>
        <td>${report.category}</td>
      </tr>
    `).join('');
  }
}

async function fetchVerifiedCompanies() {
  const tbody = document.getElementById('verified-tbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="3">Loading...</td></tr>';

  const { data, error } = await supabaseClient.from('verified_companies').select('*');

  if (error) {
    console.error('Error fetching verified companies:', error);
    tbody.innerHTML = '<tr><td colspan="3">Could not fetch verified companies.</td></tr>';
  } else {
    tbody.innerHTML = data.map(company => `
      <tr>
        <td>${company.name}</td>
        <td>${company.official_contact}</td>
        <td>${company.category}</td>
      </tr>
    `).join('');
  }
}


function handleReportSubmission(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('#submit-btn');
  const messageEl = form.querySelector('#form-message');

  const reportType = form.querySelector('#report-type').value;
  const identifier = form.querySelector('#identifier').value;
  const description = form.querySelector('#description').value;
  const category = form.querySelector('#category').value;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  messageEl.textContent = '';

  supabaseClient.from('reports').insert([
    { report_type: reportType, identifier, description, category }
  ]).then(({ error }) => {
    if (error) {
      console.error('Error submitting report:', error);
      messageEl.textContent = 'Could not submit report.';
    } else {
      messageEl.textContent = 'Report submitted successfully!';
      form.reset();
    }
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Report';
  });
}

function handleSearch(e) {
  e.preventDefault();
  const query = document.getElementById('search-query').value;
  fetchReports(query);
}

function analyzeScamText() {
  const text = document.getElementById('analyzer-text').value;
  const resultEl = document.getElementById('analyzer-result');

  const keywords = {
    Urgency: ['urgent', 'immediately', 'final warning', 'account locked', 'suspended', 'expired', 'act now', 'for a limited time', 'عاجل', 'فورًا', 'تحذير نهائي', 'حسابك مقفل', 'تم تعليق', 'انتهت صلاحية', 'تصرف الآن', 'لفترة محدودة'],
    Financial: ['prize', 'congratulations', 'winner', 'refund', 'payment', 'invoice', 'transfer', 'free money', 'cash prize', 'lottery', 'جائزة', 'مبروك', 'فائز', 'ربحت', 'استرداد', 'دفعة', 'فاتورة', 'تحويل', 'أموال مجانية', 'كاش', 'يانصيب'],
    Impersonation: ['bank', 'police', 'government', 'customs', 'your bank', 'official', 'verify', 'validation', 'account security', 'بنك', 'شرطة', 'حكومة', 'جمارك', 'البنك الخاص بك', 'رسمي', 'تحقق من', 'تفعيل', 'تأكيد', 'أمان الحساب'],
    UnrealisticOffers: ['guaranteed', 'risk-free', 'secret method', 'get rich', 'huge profit', 'exclusive offer', 'investment', 'مضمون', 'بدون مخاطر', 'طريقة سرية', 'الثراء السريع', 'ربح هائل', 'عرض حصري', 'استثمار'],
    ActionTriggers: ['click this link', 'download the file', 'update your information', 'log in here', 'call this number', 'اضغط على الرابط', 'قم بتحميل الملف', 'حدث بياناتك', 'سجل الدخول هنا', 'اتصل على هذا الرقم'],
  };

  const foundKeywords = [];
  for (const category in keywords) {
    for (const keyword of keywords[category]) {
      if (text.toLowerCase().includes(keyword)) {
        foundKeywords.push(keyword);
      }
    }
  }

  if (foundKeywords.length > 0) {
    resultEl.textContent = `Warning: Suspicious keywords found: ${foundKeywords.join(', ')}`;
  } else {
    resultEl.textContent = 'No suspicious keywords found.';
  }
}

// --- Component Injection & Event Listeners ---

function injectHTML(selector, html) {
  const container = document.querySelector(selector);
  if (container) {
    container.innerHTML = html;
  }
}

document..addEventListener('DOMContentLoaded', () => {
  // Inject components
  injectHTML('#navbar-container', navbarHTML);
  injectHTML('#footer-container', footerHTML);
  injectHTML('#report-form-container', reportFormHTML);
  injectHTML('#report-list-container', reportListHTML);
  injectHTML('#verified-list-container', verifiedListHTML);
  injectHTML('#search-bar-container', searchBarHTML);
  injectHTML('#scam-analyzer-container', scamAnalyzerHTML);

  // Add event listeners
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', handleReportSubmission);
  }

  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  const analyzeBtn = document.getElementById('analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', analyzeScamText);
  }

  // Fetch data on relevant pages
  if (window.location.pathname.endsWith('browse.html')) {
    fetchReports();
  }
  if (window.location.pathname.endsWith('verified.html')) {
    fetchVerifiedCompanies();
  }
});
