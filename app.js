// Govinda Das Portfolio - Main Application Script
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. NAVIGATION & SCROLLSPY
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  // Mobile Menu Toggle
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIcon) menuIcon.textContent = 'close';
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.textContent = 'menu';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.textContent = 'menu';
      });
    });
  }

  // Scrollspy Handler
  window.addEventListener('scroll', () => {
    let current = 'hero';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-primary', 'font-semibold', 'active');
      link.classList.add('text-on-surface-variant');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('text-primary', 'font-semibold', 'active');
        link.classList.remove('text-on-surface-variant');
      }
    });

    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.remove('text-primary', 'font-semibold', 'active');
      link.classList.add('text-on-surface-variant');
      if (href === current) {
        link.classList.add('text-primary', 'font-semibold', 'active');
        link.classList.remove('text-on-surface-variant');
      }
    });
  });

  /* ==========================================================================
     2. INTERACTIVE PIPELINE TERMINAL (HERO)
     ========================================================================== */
  const traceNode = document.getElementById('trace-id');
  const inspectorMsg = document.getElementById('trace-inspector-msg');
  const telemetryStatus = document.getElementById('hero-telemetry-status');
  const pipelineNodes = document.querySelectorAll('.pipeline-node');

  const sampleTraces = ['trc_9a4f21', 'trc_3c8e9b', 'trc_77f0a4', 'trc_b12d90', 'trc_45e3aa'];
  let traceIdx = 0;

  setInterval(() => {
    traceIdx = (traceIdx + 1) % sampleTraces.length;
    if (traceNode) {
      traceNode.textContent = sampleTraces[traceIdx];
    }
  }, 3500);

  pipelineNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const desc = node.getAttribute('data-node');
      node.classList.add('active-node');
      if (inspectorMsg) {
        inspectorMsg.textContent = `inspecting: ${desc}`;
        inspectorMsg.classList.add('text-primary');
      }
    });

    node.addEventListener('mouseleave', () => {
      node.classList.remove('active-node');
      if (inspectorMsg) {
        inspectorMsg.textContent = 'status: nominal';
        inspectorMsg.classList.remove('text-primary');
      }
    });

    node.addEventListener('click', () => {
      const desc = node.getAttribute('data-node');
      if (telemetryStatus) {
        telemetryStatus.textContent = `SELECTED: ${desc.split(' ')[0]} • OK`;
        telemetryStatus.classList.add('text-secondary');
        setTimeout(() => {
          telemetryStatus.textContent = '200 OK • ACTIVE';
          telemetryStatus.classList.remove('text-secondary');
        }, 2000);
      }
    });
  });

  /* ==========================================================================
     3. BLUEPRINT SPEC VISUALIZER (SKILLS)
     ========================================================================== */
  const bpNodes = document.querySelectorAll('.blueprint-node');
  const flowLabel = document.getElementById('active-flow-label');
  const bpLatency = document.getElementById('bp-latency');
  const bpSerialization = document.getElementById('bp-serialization');

  const bpData = {
    'bp-node-python': { label: 'REACT.JS FRONTEND SPA', latency: 'MERN Stack', serialization: 'React.js Client' },
    'bp-node-django': { label: 'EXPRESS.JS REST ROUTER', latency: 'RESTful API', serialization: 'Express.js' },
    'bp-node-drf': { label: 'AUTOMATED WEB INSPECTOR', latency: 'Python Tooling', serialization: 'Python Inspector' },
    'bp-node-postgres': { label: 'MONGODB DATABASE STORE', latency: 'NoSQL Database', serialization: 'MongoDB Store' },
    'bp-node-app': { label: 'PRODUCTION WEB EGRESS', latency: 'Cloud Hosting', serialization: 'MERN Deploy' }
  };

  bpNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const id = node.getAttribute('id');
      const data = bpData[id];
      node.classList.add('active-bp');
      if (data && flowLabel) {
        flowLabel.textContent = data.label;
        flowLabel.classList.add('text-primary');
      }
      if (data && bpLatency) bpLatency.textContent = data.latency;
      if (data && bpSerialization) bpSerialization.textContent = data.serialization;
    });

    node.addEventListener('mouseleave', () => {
      node.classList.remove('active-bp');
      if (flowLabel) {
        flowLabel.textContent = 'MERN & WEB DEV PIPELINE';
        flowLabel.classList.remove('text-primary');
      }
      if (bpLatency) bpLatency.textContent = 'MERN Stack';
      if (bpSerialization) bpSerialization.textContent = 'MERN (Mongo, Express, React, Node)';
    });
  });

  /* ==========================================================================
     4. RESUME MODAL CONTROLLER
     ========================================================================== */
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeTrigger = document.getElementById('hero-resume-trigger');
  const profileAvatarBtn = document.getElementById('profile-avatar-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeTrigger) heroResumeTrigger.addEventListener('click', openResume);
  if (profileAvatarBtn) profileAvatarBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  /* ==========================================================================
     5. CASE STUDY DEEP DIVE MODAL CONTROLLER
     ========================================================================== */
  const csModal = document.getElementById('case-study-modal');
  const csModalContent = document.getElementById('cs-modal-content');
  const csModalTag = document.getElementById('cs-modal-tag');
  const closeCsBtn = document.getElementById('close-case-study-btn');
  const openCsBtns = document.querySelectorAll('.open-case-study-btn');

  const caseStudies = {
    scanner: `
      <div class="space-y-space-md">
        <div class="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
          <div>
            <span class="font-mono-sm text-mono-sm text-secondary font-bold">CASE STUDY 01 // PYTHON TOOLING</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface font-bold">Web Application Inspector & Automated Request Analyzer</h2>
            <p class="font-body-md text-secondary">Automated HTTP Request Testing, Response Parsing & Code Inspection Engine</p>
          </div>
          <span class="px-space-sm py-space-xs bg-secondary/10 text-secondary font-mono-sm rounded">WEB TOOLING</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">CORE ENGINE</span>
            <span class="font-headline-sm text-on-surface font-semibold">Python + Requests + BeautifulSoup</span>
          </div>
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">KEY FEATURES</span>
            <span class="font-headline-sm text-on-surface font-semibold">DOM Inspection, Status Audit, Headers</span>
          </div>
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">REPORT OUTPUT</span>
            <span class="font-headline-sm text-primary font-semibold">Diagnostic Report & Audit PDF</span>
          </div>
        </div>

        <div class="space-y-space-sm">
          <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">1. Project Overview & Intent</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed">
            Engineered an automated web request analyzer and DOM inspector tool written in Python. The application crawls target web endpoints, validates response status codes, checks required HTTP security headers, and parses DOM elements to help developers ensure website health, performance, and structure.
          </p>
        </div>

        <div class="space-y-space-sm">
          <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">2. Analysis Capabilities & Pipeline</h3>
          <ul class="list-disc list-inside font-body-md text-on-surface-variant space-y-space-xs">
            <li><strong>Automated Request Testing:</strong> Programmatic payload transmission to test query parameter handling and status response reliability.</li>
            <li><strong>DOM Node & Link Extraction:</strong> Recursive link parsing and HTML tree structure validation using BeautifulSoup.</li>
            <li><strong>Header Verification & Audits:</strong> Automated validation of essential HTTP headers, content types, and server response metrics.</li>
          </ul>
        </div>

        <div class="bg-surface-container-lowest p-space-md rounded border border-outline-variant/30">
          <div class="flex justify-between font-mono-sm text-on-surface-variant mb-space-xs">
            <span>scanner/core/inspector_engine.py</span>
            <span class="text-secondary font-mono">AUTOMATED RESPONSE TEST</span>
          </div>
          <pre class="font-label-code text-label-code text-on-surface"><code><span class="text-primary">def</span> <span class="text-on-surface font-semibold">evaluate_endpoint_health</span>(target_url, params):
    test_params = params.copy()
    test_params[<span class="text-secondary">'test_mode'</span>] = <span class="text-secondary">'audit'</span>
    
    response = requests.get(target_url, params=test_params)
    <span class="text-primary">if</span> response.status_code == 200:
        <span class="text-primary">return</span> InspectionReport(
            status=<span class="text-secondary">'HEALTHY'</span>,
            response_time=response.elapsed.total_seconds(),
            content_type=response.headers.get(<span class="text-secondary">'Content-Type'</span>)
        )</code></pre>
        </div>
      </div>
    `,
    rentaluxe: `
      <div class="space-y-space-md">
        <div class="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
          <div>
            <span class="font-mono-sm text-mono-sm text-primary font-bold">CASE STUDY 02 // MERN FULL-STACK</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface font-bold">RENTaLUXE</h2>
            <p class="font-body-md text-secondary">MERN Full-Stack Rental Web Application</p>
          </div>
          <span class="px-space-sm py-space-xs bg-primary/10 text-primary font-mono-sm rounded">MERN STACK</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">PRIMARY TECH</span>
            <span class="font-headline-sm text-on-surface font-semibold">React.js + Node.js</span>
          </div>
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">BACKEND & STORAGE</span>
            <span class="font-headline-sm text-on-surface font-semibold">Express.js + MongoDB</span>
          </div>
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">ARCHITECTURE</span>
            <span class="font-headline-sm text-primary font-semibold">RESTful API Design</span>
          </div>
        </div>

        <div class="space-y-space-sm">
          <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">1. System Concept & Problem Solved</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed">
            RENTaLUXE is a full-stack property rental marketplace application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides property managers and tenants with a streamlined, responsive interface for property discovery, listing creation, and rental management.
          </p>
        </div>

        <div class="space-y-space-sm">
          <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">2. Technical Execution & Features</h3>
          <ul class="list-disc list-inside font-body-md text-on-surface-variant space-y-space-xs">
            <li><strong>React Frontend:</strong> Modular components with state management for property filtering, search, and responsive layout.</li>
            <li><strong>Express & Node Backend:</strong> Scalable RESTful API architecture handling routing, data validation, and authentication.</li>
            <li><strong>MongoDB Persistence:</strong> Document-oriented data modeling for rental listings, user profiles, and rental reservations.</li>
          </ul>
        </div>

        <div class="flex flex-wrap items-center gap-space-md pt-space-xs">
          <a href="https://rentaluxe-mern-website.onrender.com/" target="_blank" rel="noopener" class="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary font-mono-md text-mono-md font-semibold rounded hover:bg-primary-fixed transition-colors shadow-md">
            <span>Live Demo</span>
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
          <a href="https://github.com/govinduu-ui/RENTaLUXE-MERN-Website-.git" target="_blank" rel="noopener" class="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container text-on-surface font-mono-md text-mono-md rounded hover:bg-surface-container-high transition-colors">
            <span>GitHub Source</span>
            <span class="material-symbols-outlined text-[16px]">code</span>
          </a>
        </div>
      </div>
    `,
    myship: `
      <div class="space-y-space-md">
        <div class="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
          <div>
            <span class="font-mono-sm text-mono-sm text-secondary font-bold">CASE STUDY 03 // FRONTEND WEB</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface font-bold">MYSHIP App Website</h2>
            <p class="font-body-md text-secondary">Responsive Application Landing Page & Mobile Store Downloads</p>
          </div>
          <span class="px-space-sm py-space-xs bg-secondary/10 text-secondary font-mono-sm rounded">LANDING PAGE</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">CORE TECH</span>
            <span class="font-headline-sm text-on-surface font-semibold">HTML5 + CSS3 + JS</span>
          </div>
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">TARGET PLATFORM</span>
            <span class="font-headline-sm text-on-surface font-semibold">Google Play Store</span>
          </div>
          <div class="bg-surface-container p-space-md rounded">
            <span class="font-mono-sm text-on-surface-variant block">DESIGN GOAL</span>
            <span class="font-headline-sm text-primary font-semibold">Mobile-First Responsive</span>
          </div>
        </div>

        <div class="space-y-space-sm">
          <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">1. Purpose & Scope</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed">
            The MYSHIP App Website serves as the official responsive landing page for the MYSHIP mobile application. It presents feature highlights and provides users with a direct download link to the Google Play Store.
          </p>
        </div>

        <div class="space-y-space-sm">
          <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">2. Key Features & Implementation</h3>
          <ul class="list-disc list-inside font-body-md text-on-surface-variant space-y-space-xs">
            <li><strong>Responsive Layouts:</strong> Optimized for mobile viewports, tablets, and large desktop screens.</li>
            <li><strong>Google Play Store Integration:</strong> Clear call-to-action button linking directly to the Google Play Store application package.</li>
            <li><strong>Clean Performance:</strong> Zero unnecessary dependencies ensuring instant page load times and high lighthouse scores.</li>
          </ul>
        </div>

        <div class="pt-space-xs">
          <a href="https://play.google.com/store/apps/details?id=com.marinesite.app&hl=en_IN" target="_blank" rel="noopener" class="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary font-mono-md text-mono-md font-semibold rounded hover:bg-primary-fixed transition-colors shadow-md">
            <span>Get it on Google Play</span>
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    `
  };

  function openCaseStudy(key) {
    if (csModal && csModalContent && caseStudies[key]) {
      csModalContent.innerHTML = caseStudies[key];
      if (csModalTag) csModalTag.textContent = `CASE_STUDY // ${key.toUpperCase()}`;
      csModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }

  function closeCaseStudy() {
    if (csModal) {
      csModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  openCsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const caseKey = btn.getAttribute('data-case');
      openCaseStudy(caseKey);
    });
  });

  if (closeCsBtn) closeCsBtn.addEventListener('click', closeCaseStudy);
  if (csModal) {
    csModal.addEventListener('click', (e) => {
      if (e.target === csModal) closeCaseStudy();
    });
  }

  /* ==========================================================================
     6. CERTIFICATION VERIFICATION MODAL CONTROLLER
     ========================================================================== */
  const certModal = document.getElementById('cert-modal');
  const certModalName = document.getElementById('cert-modal-name');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalDate = document.getElementById('cert-modal-date');
  const certModalHash = document.getElementById('cert-modal-hash');
  const certModalStudent = document.getElementById('cert-modal-student');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalUrl = document.getElementById('cert-modal-url');
  const certImgContainer = document.getElementById('cert-img-container');
  const closeCertBtn = document.getElementById('close-cert-btn');
  const dismissCertBtn = document.getElementById('dismiss-cert-btn');
  const verifyCertBtns = document.querySelectorAll('.verify-cert-btn');

  function openCertModal(data) {
    if (certModal) {
      if (certModalName) certModalName.textContent = data.name || 'MERN Full Stack Certification Program';
      if (certModalIssuer) certModalIssuer.textContent = data.issuer || 'Ethnus';
      if (certModalDate) certModalDate.textContent = data.date || 'July 15, 2026';
      if (certModalHash) certModalHash.textContent = data.id || 'GVT2JHWG';
      if (certModalStudent) certModalStudent.textContent = `Govinda Das (${data.regNo || '24BCY10282'})`;

      if (data.img && certModalImg) {
        certModalImg.src = data.img;
        if (certImgContainer) certImgContainer.classList.remove('hidden');
      } else if (certImgContainer) {
        certImgContainer.classList.add('hidden');
      }

      if (data.url && certModalUrl) {
        certModalUrl.href = data.url;
        certModalUrl.classList.remove('hidden');
      } else if (certModalUrl) {
        certModalUrl.classList.add('hidden');
      }

      certModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  verifyCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        name: btn.getAttribute('data-cert-name'),
        issuer: btn.getAttribute('data-issuer'),
        date: btn.getAttribute('data-date'),
        id: btn.getAttribute('data-cert-id'),
        regNo: btn.getAttribute('data-reg-no'),
        img: btn.getAttribute('data-cert-img'),
        url: btn.getAttribute('data-verify-url')
      };
      openCertModal(data);
    });
  });

  if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
  if (dismissCertBtn) dismissCertBtn.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  /* ==========================================================================
     7. CONTACT FORM SUBMISSION HANDLER
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatusMsg = document.getElementById('form-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        if (formStatusMsg) {
          formStatusMsg.textContent = '❌ Please complete all required fields before dispatching.';
          formStatusMsg.classList.add('text-error');
        }
        return;
      }

      // Simulated Loading State
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `
          <span class="inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
          <span>Sending Message...</span>
        `;
      }
      if (formStatusMsg) {
        formStatusMsg.textContent = 'Transmitting your message securely...';
        formStatusMsg.classList.remove('text-error');
        formStatusMsg.classList.add('text-secondary');
      }

      setTimeout(() => {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = `
            <span>Message Sent!</span>
            <span class="material-symbols-outlined text-[16px]">check_circle</span>
          `;
          formSubmitBtn.classList.remove('bg-primary');
          formSubmitBtn.classList.add('bg-primary-container');
        }

        if (formStatusMsg) {
          formStatusMsg.textContent = '✅ Message received! Govinda Das will respond within 24 hours.';
          formStatusMsg.classList.remove('text-secondary');
          formStatusMsg.classList.add('text-primary', 'font-semibold');
        }

        contactForm.reset();

        setTimeout(() => {
          if (formSubmitBtn) {
            formSubmitBtn.innerHTML = `
              <span>Send Message</span>
              <span class="material-symbols-outlined text-[16px]">send</span>
            `;
            formSubmitBtn.classList.remove('bg-primary-container');
            formSubmitBtn.classList.add('bg-primary');
          }
          if (formStatusMsg) {
            formStatusMsg.textContent = 'Required fields are marked with *';
            formStatusMsg.classList.remove('text-primary', 'font-semibold');
          }
        }, 5000);
      }, 1200);
    });
  }

});
