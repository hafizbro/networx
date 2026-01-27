
// Initialize Lucide Icons
lucide.createIcons();

// --- 1. Reveal Animation on Scroll (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


// --- 2. Mobile Navigation ---
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeMenuFunc() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (closeMenu) closeMenu.addEventListener('click', closeMenuFunc);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenuFunc);
});


// --- 3. ROI Calculator Logic ---
const teamInput = document.getElementById('team-size');
const rateInput = document.getElementById('hourly-rate');
const hoursInput = document.getElementById('manual-hours');
const teamVal = document.getElementById('team-val');
const rateVal = document.getElementById('rate-val');
const hoursVal = document.getElementById('hours-val');
const savingsDisplay = document.getElementById('savings-display');

function calculateROI() {
    const team = parseInt(teamInput.value);
    const rate = parseInt(rateInput.value);
    const hours = parseInt(hoursInput.value);

    if (teamVal) teamVal.innerText = team;
    if (rateVal) rateVal.innerText = rate;
    if (hoursVal) hoursVal.innerText = hours;

    // Annual Savings = Team * Rate * Hours * 52 (weeks) * 0.5 (50% efficiency gain estimate)
    const annualSavings = Math.round(team * rate * hours * 52 * 0.5);
    if (savingsDisplay) savingsDisplay.innerText = '$' + annualSavings.toLocaleString();
}

if (teamInput) {
    [teamInput, rateInput, hoursInput].forEach(input => {
        input.addEventListener('input', calculateROI);
    });
    calculateROI(); // Initial calc
}


// --- 4. Audit Form Submission ---
const auditForm = document.getElementById('auditForm');
const formFields = document.getElementById('formFields');
const formSuccess = document.getElementById('formSuccess');

if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button loading state
        const btn = auditForm.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="animate-spin"></i> Analyzing...`;
        lucide.createIcons();

        // Simulate API
        setTimeout(() => {
            if (formFields) formFields.classList.add('hidden');
            if (formSuccess) formSuccess.classList.remove('hidden');
        }, 1500);
    });
}

// --- 5. Maintenance Mode Logic ---
const overlay = document.getElementById('maintenance-overlay');
const authInput = document.getElementById('auth-password');
const authBtn = document.getElementById('auth-submit');

// Check if already unlocked
if (sessionStorage.getItem('admin_access') === 'true') {
    if (overlay) overlay.classList.add('hidden-auth');
}

if (authBtn) {
    authBtn.addEventListener('click', () => {
        if (authInput.value === '123456') {
            sessionStorage.setItem('admin_access', 'true');
            if (overlay) overlay.classList.add('hidden-auth');
        } else {
            authInput.style.borderColor = '#ef4444';
            authInput.value = '';
            authInput.placeholder = 'Wrong Password';
            setTimeout(() => {
                authInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                authInput.placeholder = '••••••';
            }, 2000);
        }
    });

    // Allow 'Enter' key
    authInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') authBtn.click();
    });
}
