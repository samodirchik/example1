function validatePhoneNumber(phoneStr) {
    if (!phoneStr) return false;
    const digits = phoneStr.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
}

function openModal(packageName = '6 kWh Kit ($3,450)') {
    const modalEl = document.getElementById('order-modal');
    const formPackageInputEl = document.getElementById('form-package');
    if (formPackageInputEl) {
        let matched = false;
        for (let i = 0; i < formPackageInputEl.options.length; i++) {
            const optVal = formPackageInputEl.options[i].value;
            if (optVal === packageName || packageName.includes(optVal) || optVal.includes(packageName)) {
                formPackageInputEl.selectedIndex = i;
                matched = true;
                break;
            }
        }
        if (!matched) {
            const powers = ['36', '24', '12', '6', '314', '200', '100'];
            for (const p of powers) {
                if (packageName.includes(p)) {
                    for (let i = 0; i < formPackageInputEl.options.length; i++) {
                        if (formPackageInputEl.options[i].value.includes(p)) {
                            formPackageInputEl.selectedIndex = i;
                            matched = true;
                            break;
                        }
                    }
                    if (matched) break;
                }
            }
        }
    }
    if (modalEl) {
        modalEl.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalEl = document.getElementById('order-modal');
    if (modalEl) {
        modalEl.classList.remove('active');
    }
    document.body.style.overflow = '';
}

window.validateUkrainianPhone = validatePhoneNumber;
window.validatePhoneNumber = validatePhoneNumber;
window.openModal = openModal;
window.closeModal = closeModal;

// --- Hero Showcase Interactive Power Switcher ---
window.heroShowcaseData = {
    '6': {
        img: 'assets/images/hero-kit-6kwt-trans.webp',
        mobileImg: 'assets/images/hero-kit-6kwt-trans-mobile.webp',
        title: '6 kWh',
        price: '$3,450',
        sub: 'Ideal apartment backup',
        bullets: ['Apartment', 'Boiler', 'Refrigerator', 'Internet']
    },
    '12': {
        img: 'assets/images/hero-kit-12kwt-trans.webp',
        title: '12 kWh',
        price: '$5,950',
        sub: 'Apartment and cottage',
        bullets: ['Apartment', 'Small cottage', 'Boiler', 'Refrigerator', 'Internet']
    },
    '24': {
        img: 'assets/images/hero-kit-24kwt-trans.webp',
        title: '24 kWh',
        price: '$10,850',
        sub: 'Scalable residential backup',
        bullets: ['Large house', 'Heat pump', 'Air conditioning', 'Critical loads']
    },
    '36': {
        img: 'assets/images/hero-kit-36kwt-trans.webp',
        title: '36 kWh',
        price: '$15,900',
        sub: 'Commercial business solution',
        bullets: ['Office', 'Commercial facility', 'Servers', '24/7 business continuity']
    }
};

window.currentHeroPower = '6';

window.selectHeroPower = function (p) {
    if (!window.heroShowcaseData[p]) return;
    window.currentHeroPower = String(p);

    document.querySelectorAll('.hero-power-pill').forEach(btn => {
        if (btn.getAttribute('data-power') === String(p)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const data = window.heroShowcaseData[p];
    const imgEl = document.getElementById('hero-showcase-img');
    const sourceEl = document.getElementById('hero-showcase-source') || document.querySelector('.hero-showcase-stage source');
    const titleEl = document.getElementById('hero-spec-title');
    const subEl = document.getElementById('hero-spec-sub');
    const priceEl = document.getElementById('hero-spec-price');
    const listEl = document.getElementById('hero-spec-list');

    if (imgEl) {
        imgEl.style.opacity = '0';
        imgEl.style.transform = 'scale(0.96)';
        setTimeout(() => {
            const mobileSrc = data.mobileImg || data.img;
            if (sourceEl) {
                sourceEl.srcset = mobileSrc;
            }
            imgEl.src = data.img;
            imgEl.style.opacity = '1';
            imgEl.style.transform = 'scale(1)';
        }, 80);
    }

    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.sub;
    if (priceEl) priceEl.textContent = data.price;

    if (listEl && data.bullets) {
        listEl.innerHTML = data.bullets.map(b => `
            <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${b}</span>
            </li>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // --- 0.0 English-Only i18n Engine ---
    const defaultLocale = 'en';
    const supportedLocales = ['en'];
    const fallbackLng = 'en';

    const translations = {
        en: {
            'nav.autonomy': 'Autonomy',
            'nav.calculator': 'Calculator',
            'nav.packages': 'Kits',
            'nav.contacts': 'Contacts',
            'header.grid_status': 'Power Grid: 230V 50Hz',
            'header.btn_order': 'Order a Quote',
            'hero.badge': 'Turnkey backup power with warranty',
            'hero.title_1': 'Autonomous power system',
            'hero.title_2': 'Forget about power outages',
            'hero.description': 'Turnkey inverter + battery kits with delivery. Automatically powers household appliances, shields against voltage spikes, and runs silently.',
            'hero.metric_1_val': '< 4 ms',
            'hero.metric_1_lbl': 'Instant switchover',
            'hero.metric_2_val': '1 day',
            'hero.metric_2_lbl': 'Installation & launch',
            'hero.metric_3_val': '15+ years',
            'hero.metric_3_lbl': 'Service life',
            'hero.visual_title': 'Energy Flow Diagram',
            'hero.grid_active': 'Power Grid 220V: ACTIVE',
            'hero.grid_blackout': 'Power Grid 220V: OUTAGE (BLACKOUT)',
            'hero.node_grid': 'Power Grid 220V',
            'hero.node_inverter': 'Inverter 6kW',
            'hero.node_battery': 'LiFePO4 5.12kWh',
            'hero.node_home': 'Home Power Supply',
            'hero.btn_outage': 'Simulate power outage',
            'hero.btn_restore': 'Restore 220V Power Grid',
            'hero.tag_hit': '🔥 BESTSELLER',
            'hero.tag_warranty': '🛡️ 5-Year Warranty',
            'hero.card_title': 'Comfort 6 kW Kit',
            'hero.card_sub': '6 kW Inverter + LiFePO4 5.12 kWh Battery',
            'hero.pill_1': 'Autonomy',
            'hero.pill_2': 'Switchover',
            'hero.pill_3': 'LiFePO4 Cycles',
            'hero.bullet_1': 'Powers boiler, refrigerator, Wi-Fi, lights, and TV',
            'hero.bullet_2': 'Free Technical Consultation',
            'hero.bullet_3': 'Free delivery',
            'hero.btn_callback': 'Get a Consultation',
            'hero.btn_other_packages': 'Other Kits',
            'hero.microtext': '🔒 Free consultation and budget-tailored sizing',
            'house.title': 'How autonomous power keeps your home running',
            'house.subtitle': 'Click the button below to simulate a blackout and check appliance protection.',
            'house.mode_rezerv': 'Mode: Backup 230V',
            'house.mode_blackout': 'Mode: Blackout 0V',
            'house.room_boiler': 'Boiler room',
            'house.desc_boiler': 'Boiler & pumps (24°C)',
            'house.room_kitchen': 'Kitchen',
            'house.desc_kitchen': 'Refrigerator OK',
            'house.room_office': 'Home office',
            'house.desc_office': 'WiFi & Electronic devices',
            'house.room_living': 'Living room',
            'house.desc_living': 'Lighting & TV',
            'calc.title': 'Backup Runtime Calculator',
            'calc.subtitle': 'Select the appliances you need during an outage to calculate required energy storage.',
            'calc.appliances_title': 'Your priority appliances:',
            'calc.appliance_1': 'Double-door refrigerator',
            'calc.appliance_2': 'Gas boiler + circulation pump',
            'calc.appliance_3': 'Wi-Fi router + LED lighting',
            'calc.appliance_4': 'Workstation PC + 2 monitors',
            'calc.appliance_5': 'Air conditioner / Climate control',
            'calc.appliance_6': 'Water heater / Electric stove / Pump',
            'calc.appliance_7': 'Commercial equipment',
            'calc.total_load': 'Total continuous load:',
            'calc.autonomy_time': 'Estimated backup runtime:',
            'calc.battery_base': 'based on LiFePO4 5.12–6 kWh battery',
            'calc.rec_title': 'Recommended solution:',
            'calc.btn_order': 'Order this solution',
            'pkg.title': 'Turnkey Kits & Batteries',
            'pkg.subtitle': 'Tailored solutions for apartments, private houses, and businesses with a 5-year warranty and fast delivery.',
            'pkg.cat_pkgs_badge': 'Turnkey solutions',
            'pkg.cat_pkgs_title': '⚡ Inverter + LiFePO4 Battery Power Systems',
            'pkg.cat_pkgs_desc': 'Fully assembled and pre-configured stations for apartment, house, or business with 5-year warranty.',
            'pkg.badge_featured': 'Bestseller',
            'pkg.badge_1': 'Apartment / Office',
            'pkg.badge_2': 'Apartment / House',
            'pkg.badge_3': 'Large House',
            'pkg.badge_4': 'Business Solution',
            'pkg.photo_slot': 'Kit photo placeholder',
            'pkg.spec_power': 'Output',
            'pkg.spec_cap': 'LiFePO4 Capacity',
            'pkg.spec_time': 'Runtime',
            'pkg.save_1': '-10% Save $400',
            'pkg.save_2': '-10% Save $650',
            'pkg.save_3': '-10% Save $1,150',
            'pkg.save_4': '-10% Save $1,750',
            'pkg.name_1': '6 kWh Kit',
            'pkg.name_2': '12 kWh Kit',
            'pkg.name_3': '24 kWh Kit',
            'pkg.name_4': '36 kWh Kit',
            'pkg.p1_cap_val': '6 kWh',
            'pkg.p1_time_val': '5–8 hrs',
            'pkg.p1_f1': 'EASUN 3.2 kW inverter + 6 kWh battery (24 V)',
            'pkg.p1_f2': 'For apartment: boiler, refrigerator, internet, lighting',
            'pkg.p1_f3': 'Up to 5–8 hours of complete autonomy',
            'pkg.p2_cap_val': '12 kWh',
            'pkg.p2_time_val': '12–24 hrs',
            'pkg.p2_f1': 'EASUN 6.2 kW inverter + 12 kWh battery (48 V)',
            'pkg.p2_f2': 'For house, core appliances, solar panel support',
            'pkg.p2_f3': 'Up to 12–24+ hours of home backup',
            'pkg.p3_cap_val': '24 kWh',
            'pkg.p3_time_val': '24–48 hrs',
            'pkg.p3_f1': '1–2 EASUN 6.2 kW inverters + 24 kWh battery',
            'pkg.p3_f2': 'For business, office, POS terminals, servers & high loads',
            'pkg.p3_f3': 'Up to 48 hours of autonomous operation',
            'pkg.p4_cap_val': '36+ kWh',
            'pkg.p4_time_val': '48+ hrs',
            'pkg.p4_f1': '1–3 EASUN 6.2 kW inverters + 36+ kWh rack',
            'pkg.p4_f2': 'Scalable system for estates and 24/7 commercial operations',
            'pkg.btn_details': 'Model Details',
            'pkg.btn_order': 'Order',
            'pkg.btn_order_discount': 'Order with Discount',
            'pkg.swipe_hint': '👉 Swipe left / right to navigate',
            'modal.title': 'Autonomous System Sizing',
            'modal.subtitle': 'Leave your contact details, and our engineer will select the optimal inverter and battery for your appliances.',
            'modal.label_name': 'Your name',
            'modal.ph_name': 'Alex',
            'modal.label_phone': 'Contact phone',
            'modal.ph_phone': '(800) 555-0199',
            'modal.label_package': 'Selected kit',
            'modal.btn_submit': 'Get Quote',
            'callback.badge': 'Free Technical Consultation',
            'callback.title': 'Get a Custom Backup Power Calculation',
            'callback.desc': 'Leave your number — our engineer will size the optimal inverter and LiFePO4 battery kit for your appliances and budget free of charge.',
            'callback.pill_1': '⚡ Fast insured delivery',
            'callback.pill_2': '📞 Design & Consultation',
            'callback.pill_3': '🛡️ 5-year warranty',
            'callback.ph_name': 'Your name',
            'callback.btn_submit': 'Get Free Consultation',
            'callback.privacy': '🔒 Your data is protected. No spam or unsolicited calls.',
            'callback.seo_title': 'Reliable Autonomous and Backup Power for Your Home',
            'callback.seo_text': 'VoltGrid is an official supplier of turnkey backup power systems: EASUN hybrid inverters (3.2–18.6 kW) and dependable LiFePO4 battery storage (6–36 kWh) engineered for over 6,000 cycles. We deliver professional engineering consultations, accurate load-based sizing, prompt delivery, and official warranty support.',
            'footer.copyright': '© 2026 VoltGrid. All rights reserved.',
            'drawer.sub_1': 'Device runtime simulation',
            'drawer.sub_2': 'Calculate backup runtime',
            'drawer.sub_3': 'Inverter + battery turnkey kits',
            'drawer.sub_4': 'Get in touch with an engineer',
            'drawer.phone_lbl': '📞 Tap to call toll-free',
            'pm.acc_title': '📦 Included in kit:',
            'pm.sel_pkg': 'System line:',
            'pm.sel_model': 'Model range:',
            'pm.kpi_power': 'Output',
            'pm.kpi_capacity': 'Capacity',
            'pm.kpi_cycles': 'Lifespan',
            'pm.sec_electrical': '⚡ Electrical Specifications',
            'pm.lbl_voltage': 'Rated voltage:',
            'pm.lbl_energy': 'Rated energy:',
            'pm.lbl_capacity': 'Battery capacity:',
            'pm.lbl_current': 'Current (Rated / Charge / Discharge):',
            'pm.sec_performance': '🔋 Battery & Reliability',
            'pm.lbl_cycles': 'Cycle life:',
            'pm.lbl_scaling': 'Scalability / PV input:',
            'pm.lbl_temp': 'Operating temperature:',
            'pm.sec_physical': '📐 Design & Standards',
            'pm.lbl_dim': 'Dimensions (WxHxD):',
            'pm.lbl_weight': 'Kit weight:',
            'pm.lbl_ports': 'Communication ports & BMS:',
            'pm.lbl_certs': 'Certifications:',
            'pm.lbl_montage': 'Mounting & Ingress protection:',
            'pm.price_lbl': 'Official price:',
            'pm.btn_order': 'Request a Quote'
        }
    };

    let currentLang = 'en';

    function setLanguage(lang = 'en') {
        if (!supportedLocales.includes(lang)) lang = fallbackLng;
        currentLang = lang;
        document.documentElement.lang = 'en';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        if (typeof updateCalculator === 'function') {
            updateCalculator();
        }

        if (typeof window.selectHeroPower === 'function') {
            window.selectHeroPower(window.currentHeroPower || '6');
        }

        const prodModalEl = document.getElementById('product-modal');
        if (prodModalEl && prodModalEl.classList.contains('active') && typeof renderTadiranModal === 'function') {
            renderTadiranModal();
        }

        const btnBlackout = document.getElementById('btn-mode-blackout');
        if (typeof setHouseMode === 'function' && btnBlackout) {
            setHouseMode(!btnBlackout.classList.contains('active'));
        }
    }

    setLanguage(currentLang);

    // --- 0. Brand Logo Neon Ignition Spark ---
    const brandLogo = document.getElementById('brand-logo');
    if (brandLogo) {
        brandLogo.addEventListener('click', (e) => {
            const bolt = brandLogo.querySelector('.logo-bolt');
            if (bolt) {
                bolt.style.animation = 'none';
                void bolt.offsetHeight; // trigger reflow
                bolt.style.animation = 'electricIgnition 1.2s ease-out forwards';
            }
        });
    }

    // --- 0.1 Burger Menu & Mobile Drawer Logic ---
    const burgerBtn = document.getElementById('burger-btn');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');

    function closeMobileDrawer() {
        if (burgerBtn) burgerBtn.classList.remove('active');
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
    }
    window.closeMobileDrawer = closeMobileDrawer;

    function toggleBurgerMenu() {
        if (!burgerBtn || !mobileDrawer) return;
        const isActive = burgerBtn.classList.contains('active');

        if (isActive) {
            closeMobileDrawer();
        } else {
            burgerBtn.classList.add('active');
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleBurgerMenu);
    }

    // Attach click listener to ALL links & buttons inside mobileDrawer for auto-close + smooth scroll
    if (mobileDrawer) {
        mobileDrawer.addEventListener('click', (e) => {
            const linkOrBtn = e.target.closest('a, button');
            if (!linkOrBtn) return;

            // Close mobile drawer immediately
            closeMobileDrawer();

            // Handle smooth scroll for anchor links
            const href = linkOrBtn.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    e.preventDefault();
                    setTimeout(() => {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 60);
                }
            }
        });
    }

    // --- 0.2 Hero Power Switcher Click Delegation ---
    document.addEventListener('click', (e) => {
        const pill = e.target.closest('.hero-power-pill');
        if (pill) {
            const power = pill.getAttribute('data-power');
            if (power && typeof window.selectHeroPower === 'function') {
                window.selectHeroPower(power);
            }
        }
    });

    // --- 1. 3D Tilt Card Interaction ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 767) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // --- 2. Interactive House Autonomy Visualizer (Single Screen Mobile 2x2 Grid) ---
    const btnModeRezerv = document.getElementById('btn-mode-rezerv');
    const btnModeBlackout = document.getElementById('btn-mode-blackout');
    const houseStatusHud = document.getElementById('house-status-hud');
    const houseStatusText = document.getElementById('house-status-text');

    const rooms = {
        boiler: {
            id: 'room-boiler',
            card: document.getElementById('room-boiler'),
            badge: document.getElementById('badge-boiler'),
            desc: document.getElementById('desc-boiler')
        },
        kitchen: {
            id: 'room-kitchen',
            card: document.getElementById('room-kitchen'),
            badge: document.getElementById('badge-kitchen'),
            desc: document.getElementById('desc-kitchen')
        },
        office: {
            id: 'room-office',
            card: document.getElementById('room-office'),
            badge: document.getElementById('badge-office'),
            desc: document.getElementById('desc-office')
        },
        living: {
            id: 'room-living',
            card: document.getElementById('room-living'),
            badge: document.getElementById('badge-living'),
            desc: document.getElementById('desc-living')
        }
    };

    function setHouseMode(isRezerv) {
        if (isRezerv) {
            if (btnModeRezerv) btnModeRezerv.classList.add('active');
            if (btnModeBlackout) btnModeBlackout.classList.remove('active');

            if (houseStatusHud) {
                houseStatusHud.classList.remove('outage');
                if (houseStatusText) houseStatusText.textContent = 'Auto-start 0 ms — Appliances OK';
            }

            Object.values(rooms).forEach(r => {
                if (!r.card) return;
                r.card.classList.remove('room-off');
                r.card.classList.add('active');
                if (r.badge) {
                    r.badge.className = 'room-badge badge-ok';
                    r.badge.textContent = '230V OK';
                }
                if (r.desc) {
                    const key = r.desc.getAttribute('data-i18n');
                    if (key && translations[currentLang] && translations[currentLang][key]) {
                        r.desc.textContent = translations[currentLang][key];
                    }
                }
            });
        } else {
            if (btnModeRezerv) btnModeRezerv.classList.remove('active');
            if (btnModeBlackout) btnModeBlackout.classList.add('active');

            if (houseStatusHud) {
                houseStatusHud.classList.add('outage');
                if (houseStatusText) houseStatusText.textContent = 'BLACKOUT! Power grid lost (0V)';
            }

            const offDescMap = {
                'room-boiler': 'Boiler freezing!',
                'room-kitchen': 'Food spoiling!',
                'room-office': 'Connection lost!',
                'room-living': 'Total darkness!'
            };

            Object.values(rooms).forEach(r => {
                if (!r.card) return;
                r.card.classList.remove('active');
                r.card.classList.add('room-off');
                if (r.badge) {
                    r.badge.className = 'room-badge badge-off';
                    r.badge.textContent = '0V OUTAGE';
                }
                if (r.desc && r.id) {
                    r.desc.textContent = offDescMap[r.id] || '';
                }
            });
        }
    }

    if (btnModeRezerv) btnModeRezerv.addEventListener('click', () => setHouseMode(true));
    if (btnModeBlackout) btnModeBlackout.addEventListener('click', () => setHouseMode(false));

    // --- 3. 16 BMS Battery Cells Interactive Matrix ---
    const cellsContainer = document.getElementById('cells-container');
    const cellIdVal = document.getElementById('cell-id-val');
    const cellVoltVal = document.getElementById('cell-volt-val');
    const cellTempVal = document.getElementById('cell-temp-val');

    if (cellsContainer) {
        for (let i = 1; i <= 16; i++) {
            const cell = document.createElement('div');
            cell.className = `cell-item ${i === 1 ? 'selected' : ''}`;
            cell.setAttribute('data-id', i);

            const baseVolt = (3.200 + Math.random() * 0.015).toFixed(3);
            cell.setAttribute('data-volt', baseVolt);
            cell.setAttribute('data-temp', (23.5 + Math.random() * 1.5).toFixed(1));

            cell.innerHTML = `
                <span class="cell-num">#${i < 10 ? '0' + i : i}</span>
                <span class="cell-v">${baseVolt}V</span>
            `;

            cell.addEventListener('click', () => {
                document.querySelectorAll('.cell-item').forEach(c => c.classList.remove('selected'));
                cell.classList.add('selected');

                if (cellIdVal) cellIdVal.textContent = `#${i < 10 ? '0' + i : i}`;
                if (cellVoltVal) cellVoltVal.textContent = `${cell.getAttribute('data-volt')} V`;
                if (cellTempVal) cellTempVal.textContent = `${cell.getAttribute('data-temp')} °C`;
            });

            cellsContainer.appendChild(cell);
        }
    }

    // --- 4. Light Background Canvas Particles ---
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorGlow = document.getElementById('cursor-glow');

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (cursorGlow) {
            cursorGlow.style.left = `${mouse.x}px`;
            cursorGlow.style.top = `${mouse.y}px`;
        }
    });

    let isOutage = false;

    const bgCanvas = document.getElementById('bg-canvas');
    let bgCtx = null;
    let bgPulses = [];

    if (bgCanvas) {
        bgCtx = bgCanvas.getContext('2d');

        function resizeBgCanvas() {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        }
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);

        function createPulse(x, y, color) {
            bgPulses.push({ x, y, radius: 10, maxRadius: 360, alpha: 0.6, color });
        }

        function animateBgCanvas() {
            if (!bgCtx) return;
            if (document.hidden) {
                requestAnimationFrame(animateBgCanvas);
                return;
            }
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

            const cx = bgCanvas.width / 2;
            const cy = bgCanvas.height / 2;
            const time = Date.now() * 0.0007;

            // 1. Bright 3D undulating energy ribbon waves across the screen (pure sine energy waves)
            const waveCount = 5;
            for (let i = -waveCount; i <= waveCount; i++) {
                const yBase = cy + i * 130;
                const distCenter = Math.abs(i) / waveCount;
                const alpha = (0.24 - distCenter * 0.08);

                const grad = bgCtx.createLinearGradient(0, 0, bgCanvas.width, 0);
                if (isOutage) {
                    grad.addColorStop(0, `rgba(16, 185, 129, ${alpha * 0.4})`);
                    grad.addColorStop(0.5, `rgba(5, 150, 105, ${alpha * 1.3})`);
                    grad.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.4})`);
                } else {
                    grad.addColorStop(0, `rgba(2, 132, 199, ${alpha * 0.4})`);
                    grad.addColorStop(0.5, `rgba(14, 165, 233, ${alpha * 1.3})`);
                    grad.addColorStop(1, `rgba(2, 132, 199, ${alpha * 0.4})`);
                }

                bgCtx.beginPath();
                bgCtx.moveTo(0, yBase + Math.sin(time + i * 0.5) * 50);
                bgCtx.bezierCurveTo(
                    cx * 0.45, yBase + Math.cos(time * 0.9 + i * 0.4) * 85,
                    cx * 1.45, yBase + Math.sin(time * 0.8 - i * 0.4) * 85,
                    bgCanvas.width, yBase + Math.sin(time * 1.1 + i * 0.5) * 50
                );
                bgCtx.strokeStyle = grad;
                bgCtx.lineWidth = 1.6;
                bgCtx.stroke();
            }

            // 2. Ripple energy pulses
            bgPulses.forEach((pulse, index) => {
                pulse.radius += 4;
                pulse.alpha -= 0.008;

                if (pulse.alpha <= 0 || pulse.radius >= pulse.maxRadius) {
                    bgPulses.splice(index, 1);
                    return;
                }

                bgCtx.beginPath();
                bgCtx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
                bgCtx.strokeStyle = pulse.color;
                bgCtx.lineWidth = 2.5;
                bgCtx.globalAlpha = pulse.alpha;
                bgCtx.stroke();
                bgCtx.globalAlpha = 1.0;
            });

            requestAnimationFrame(animateBgCanvas);
        }
        animateBgCanvas();
        window.triggerBgPulse = (x, y, color) => createPulse(x, y, color);
    }

    // --- 5. Hero Energy Diagram Canvas (Tesla / Apple Energy Aesthetics) ---
    const canvas = document.getElementById('energy-canvas');
    let initComets = () => { };

    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            const w = Math.floor(rect.width || parent.clientWidth || 600);
            const h = Math.floor(rect.height || parent.clientHeight || 380);
            if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
                canvas.width = w;
                canvas.height = h;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function getNodes() {
            const parent = canvas.parentElement;
            if (!parent) return null;
            const pRect = parent.getBoundingClientRect();
            const w = canvas.width || 600;
            const h = canvas.height || 380;

            const getCenter = (id, defaultX, defaultY) => {
                const el = document.getElementById(id);
                if (!el) return { x: w * defaultX, y: h * defaultY };
                const eRect = el.getBoundingClientRect();
                if (eRect.width === 0 || eRect.height === 0 || pRect.width === 0) {
                    return { x: w * defaultX, y: h * defaultY };
                }
                return {
                    x: (eRect.left + eRect.width / 2) - pRect.left,
                    y: (eRect.top + eRect.height / 2) - pRect.top
                };
            };

            return {
                grid: getCenter('node-grid', 0.18, 0.22),
                inverter: getCenter('node-inverter', 0.50, 0.50),
                battery: getCenter('node-battery', 0.22, 0.78),
                home: getCenter('node-home', 0.82, 0.22)
            };
        }

        let dashOffset = 0;
        let pulseR1 = 0;
        let pulseR2 = 22;

        class LaserComet {
            constructor(fromFn, toFn, color, speed = 0.0035, offset = 0) {
                this.fromFn = fromFn;
                this.toFn = toFn;
                this.progress = offset;
                this.speed = speed;
                this.color = color;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.progress = 0;
                }
            }

            draw(nodes) {
                const from = nodes[this.fromFn];
                const to = nodes[this.toFn];
                if (!from || !to) return;

                const curX = from.x + (to.x - from.x) * this.progress;
                const curY = from.y + (to.y - from.y) * this.progress;

                const tailProgress = Math.max(0, this.progress - 0.18);
                const tailX = from.x + (to.x - from.x) * tailProgress;
                const tailY = from.y + (to.y - from.y) * tailProgress;

                // Tail laser gradient
                const grad = ctx.createLinearGradient(tailX, tailY, curX, curY);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                grad.addColorStop(0.5, this.color);
                grad.addColorStop(1, '#ffffff');

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(curX, curY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Bright head node
                ctx.beginPath();
                ctx.arc(curX, curY, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        let comets = [];

        initComets = function () {
            comets = [];
            const count = 5;

            if (!isOutage) {
                // Grid -> Inverter (Cyan)
                for (let i = 0; i < count; i++) {
                    comets.push(new LaserComet('grid', 'inverter', '#0284c7', 0.0035, i / count));
                }
                // Inverter -> Home (Cyan)
                for (let i = 0; i < count; i++) {
                    comets.push(new LaserComet('inverter', 'home', '#0284c7', 0.0035, i / count));
                }
                // Inverter -> Battery charging (Emerald)
                for (let i = 0; i < count; i++) {
                    comets.push(new LaserComet('inverter', 'battery', '#059669', 0.003, i / count));
                }
            } else {
                // Battery -> Inverter (Emerald)
                for (let i = 0; i < count * 1.4; i++) {
                    comets.push(new LaserComet('battery', 'inverter', '#10B981', 0.0045, i / (count * 1.4)));
                }
                // Inverter -> Home (Emerald)
                for (let i = 0; i < count * 1.4; i++) {
                    comets.push(new LaserComet('inverter', 'home', '#10B981', 0.0045, i / (count * 1.4)));
                }
            }
        };
        initComets();

        function drawArrow(from, to, color) {
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            const headLen = 9;

            ctx.beginPath();
            ctx.moveTo(midX, midY);
            ctx.lineTo(midX - headLen * Math.cos(angle - Math.PI / 6), midY - headLen * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(midX, midY);
            ctx.lineTo(midX - headLen * Math.cos(angle + Math.PI / 6), midY - headLen * Math.sin(angle + Math.PI / 6));
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.stroke();
        }

        function drawCircuitTracks() {
            const nodes = getNodes();
            if (!nodes) return;
            dashOffset += 0.45;

            // Track 1: Grid -> Inverter
            ctx.beginPath();
            ctx.moveTo(nodes.grid.x, nodes.grid.y);
            ctx.lineTo(nodes.inverter.x, nodes.inverter.y);
            ctx.lineWidth = 4;
            ctx.strokeStyle = isOutage ? 'rgba(239, 68, 68, 0.25)' : 'rgba(2, 132, 199, 0.3)';
            ctx.stroke();

            if (!isOutage) {
                ctx.beginPath();
                ctx.moveTo(nodes.grid.x, nodes.grid.y);
                ctx.lineTo(nodes.inverter.x, nodes.inverter.y);
                ctx.lineWidth = 2.5;
                ctx.setLineDash([8, 8]);
                ctx.lineDashOffset = -dashOffset;
                ctx.strokeStyle = '#0284c7';
                ctx.stroke();
                ctx.setLineDash([]);
                drawArrow(nodes.grid, nodes.inverter, '#0284c7');
            }

            // Track 2: Battery -> Inverter
            ctx.beginPath();
            ctx.moveTo(nodes.battery.x, nodes.battery.y);
            ctx.lineTo(nodes.inverter.x, nodes.inverter.y);
            ctx.lineWidth = 4;
            ctx.strokeStyle = isOutage ? 'rgba(16, 185, 129, 0.35)' : 'rgba(5, 150, 105, 0.3)';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(isOutage ? nodes.battery.x : nodes.inverter.x, isOutage ? nodes.battery.y : nodes.inverter.y);
            ctx.lineTo(isOutage ? nodes.inverter.x : nodes.battery.x, isOutage ? nodes.inverter.y : nodes.battery.y);
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 8]);
            ctx.lineDashOffset = -dashOffset;
            ctx.strokeStyle = isOutage ? '#10B981' : '#059669';
            ctx.stroke();
            ctx.setLineDash([]);
            drawArrow(isOutage ? nodes.battery : nodes.inverter, isOutage ? nodes.inverter : nodes.battery, isOutage ? '#10B981' : '#059669');

            // Track 3: Inverter -> Home
            ctx.beginPath();
            ctx.moveTo(nodes.inverter.x, nodes.inverter.y);
            ctx.lineTo(nodes.home.x, nodes.home.y);
            ctx.lineWidth = 4;
            ctx.strokeStyle = isOutage ? 'rgba(16, 185, 129, 0.35)' : 'rgba(2, 132, 199, 0.3)';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(nodes.inverter.x, nodes.inverter.y);
            ctx.lineTo(nodes.home.x, nodes.home.y);
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 8]);
            ctx.lineDashOffset = -dashOffset;
            ctx.strokeStyle = isOutage ? '#10B981' : '#0284c7';
            ctx.stroke();
            ctx.setLineDash([]);
            drawArrow(nodes.inverter, nodes.home, isOutage ? '#10B981' : '#0284c7');

            // Radar pulses around central Inverter
            pulseR1 = (pulseR1 + 0.3) % 40;
            pulseR2 = (pulseR2 + 0.3) % 40;

            const pColor = isOutage ? '16, 185, 129' : '2, 132, 199';

            ctx.beginPath();
            ctx.arc(nodes.inverter.x, nodes.inverter.y, pulseR1 + 25, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${pColor}, ${(1 - pulseR1 / 40) * 0.4})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(nodes.inverter.x, nodes.inverter.y, pulseR2 + 25, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${pColor}, ${(1 - pulseR2 / 45) * 0.4})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const nodes = getNodes();

            if (nodes) {
                drawCircuitTracks();
                comets.forEach(c => {
                    c.update();
                    c.draw(nodes);
                });
            }

            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Outage Trigger Simulator ---
    const outageBtn = document.getElementById('trigger-outage-btn');
    const gridStatusText = document.getElementById('grid-status-text');
    const globalStatusPill = document.getElementById('global-status-pill');
    const nodeGrid = document.getElementById('node-grid');

    if (outageBtn) {
        outageBtn.addEventListener('click', (e) => {
            isOutage = !isOutage;

            if (window.triggerBgPulse) {
                window.triggerBgPulse(e.clientX, e.clientY, isOutage ? '#dc2626' : '#059669');
            }

            const restoreText = 'Restore Power Grid (220V)';
            const outageText = 'Simulate power outage';

            const badgeBoiler = document.getElementById('badge-boiler');
            const badgeKitchen = document.getElementById('badge-kitchen');
            const badgeOffice = document.getElementById('badge-office');
            const badgeLiving = document.getElementById('badge-living');

            const descBoiler = document.getElementById('desc-boiler');
            const descKitchen = document.getElementById('desc-kitchen');
            const descOffice = document.getElementById('desc-office');
            const descLiving = document.getElementById('desc-living');

            if (isOutage) {
                outageBtn.classList.remove('btn-emerald');
                outageBtn.classList.add('btn-primary');
                outageBtn.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>${restoreText}</span>
                `;

                if (gridStatusText) {
                    gridStatusText.textContent = 'Power Grid 220V: OUTAGE (BLACKOUT)';
                    gridStatusText.classList.add('outage');
                }
                if (globalStatusPill) {
                    globalStatusPill.classList.add('outage');
                    const pillText = 'Blackout (LiFePO4 Backup 100%)';
                    globalStatusPill.innerHTML = `<span class="status-dot"></span> ${pillText}`;
                }
                if (cursorGlow) cursorGlow.classList.add('outage-mode');
                if (nodeGrid) nodeGrid.style.opacity = '0.35';

                // Update House Room Cards to Blackout Protection state
                const resBadgeText = 'LiFePO4 0ms';
                if (badgeBoiler) badgeBoiler.textContent = resBadgeText;
                if (badgeKitchen) badgeKitchen.textContent = resBadgeText;
                if (badgeOffice) badgeOffice.textContent = resBadgeText;
                if (badgeLiving) badgeLiving.textContent = resBadgeText;

                if (descBoiler) descBoiler.textContent = 'Boiler protected';
                if (descKitchen) descKitchen.textContent = 'Freezer running';
                if (descOffice) descOffice.textContent = 'Wi-Fi 100% ONLINE';
                if (descLiving) descLiving.textContent = 'Backup lighting';

                const toastMsg = 'Power grid outage! LiFePO4 backup system took over in 0 ms.';
                showToast(toastMsg);
            } else {
                outageBtn.classList.remove('btn-primary');
                outageBtn.classList.add('btn-emerald');
                outageBtn.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                    <span>${outageText}</span>
                `;

                if (gridStatusText) {
                    gridStatusText.textContent = 'Power Grid 220V: ACTIVE';
                    gridStatusText.classList.remove('outage');
                }
                if (globalStatusPill) {
                    globalStatusPill.classList.remove('outage');
                    const pillText = 'Power Grid: 230V 50Hz';
                    globalStatusPill.innerHTML = `<span class="status-dot"></span> ${pillText}`;
                }
                if (cursorGlow) cursorGlow.classList.remove('outage-mode');
                if (nodeGrid) nodeGrid.style.opacity = '1';

                // Restore House Room Cards to Normal Grid state
                const okBadgeText = '230V OK';
                if (badgeBoiler) badgeBoiler.textContent = okBadgeText;
                if (badgeKitchen) badgeKitchen.textContent = okBadgeText;
                if (badgeOffice) badgeOffice.textContent = okBadgeText;
                if (badgeLiving) badgeLiving.textContent = okBadgeText;

                if (descBoiler) descBoiler.textContent = 'Boiler & pumps (24°C)';
                if (descKitchen) descKitchen.textContent = 'Refrigerator OK';
                if (descOffice) descOffice.textContent = 'WiFi & Electronic devices';
                if (descLiving) descLiving.textContent = 'Lighting & TV';

                const toastMsg = 'Power grid restored. Inverter switched to auto-recharge.';
                showToast(toastMsg);
            }

            initComets();
        });
    }

    // --- Appliance Runtime Calculator ---
    function updateCalculator() {
        const applianceItems = document.querySelectorAll('.appliance-item');
        const totalWattsEl = document.getElementById('total-watts');
        const runtimeHoursEl = document.getElementById('runtime-hours');
        const batterySubtextEl = document.getElementById('battery-subtext');
        const recPackageTitle = document.getElementById('rec-package-title');
        const btnOrderRec = document.getElementById('btn-order-rec');

        let totalWatts = 0;

        applianceItems.forEach(item => {
            const checkbox = item.querySelector('.toggle-checkbox');
            const power = parseInt(item.getAttribute('data-power'), 10) || 0;

            if (checkbox && checkbox.checked) {
                item.classList.add('active');
                totalWatts += power;
            } else {
                item.classList.remove('active');
            }
        });

        if (totalWattsEl) {
            totalWattsEl.innerHTML = `${totalWatts.toLocaleString('en-US')} <span class="unit">W</span>`;
        }

        let batteryWh = 5120;
        let selectedPackageCode = '6 kWh Kit ($3,450)';
        let recTitleText = '';
        let subtextText = '';

        if (totalWatts > 4500) {
            // High power / Business loads (e.g. 5000 W business equipment)
            batteryWh = 36000;
            selectedPackageCode = '36 kWh Kit ($15,900)';
            recTitleText = '36 kWh Kit / Deye 15kW (3-Ph) or 2× SAKO 6kW';
            subtextText = 'based on commercial LiFePO4 36 kWh system or Deye 15kW';
        } else if (totalWatts > 2000) {
            // Heavy residential loads (boiler 2000 W + appliances = 2580 W)
            batteryWh = 24000;
            selectedPackageCode = '24 kWh Kit ($10,850)';
            recTitleText = '24 kWh Kit / Deye 8–10kW or SAKO 6kW';
            subtextText = 'based on Deye 8–10kW / SAKO 6kW or 16–24 kWh storage';
        } else if (totalWatts > 700) {
            // Medium loads (climate 1200 W alone or with appliances = 1780 W)
            batteryWh = 12000;
            selectedPackageCode = '12 kWh Kit ($5,950)';
            recTitleText = '12 kWh Kit or SAKO 3kW ESS';
            subtextText = 'based on 10.24–12 kWh battery or SAKO 3kW/5.12kWh station';
        } else if (totalWatts > 350) {
            // Basic residential load (up to 700 W: fridge, boiler, router, PC = 580 W)
            batteryWh = 5120;
            selectedPackageCode = '6 kWh Kit ($3,450)';
            recTitleText = '6 kWh Kit or SAKO 3kW ESS';
            subtextText = 'based on LiFePO4 5.12–6 kWh battery or SAKO station';
        } else {
            // Light load (up to 350 W)
            batteryWh = 2000;
            selectedPackageCode = 'SAKO Alpha 1000W ESS ($1,450)';
            recTitleText = 'SAKO Alpha 1000W ESS (2 kWh LiFePO4)';
            subtextText = 'compact portable solution for apartments and home office';
        }

        const unitText = 'hours';
        if (runtimeHoursEl) {
            if (totalWatts === 0) {
                runtimeHoursEl.innerHTML = `&infin; <span class="unit">${unitText}</span>`;
            } else {
                const hours = ((batteryWh * 0.9) / totalWatts).toFixed(1);
                runtimeHoursEl.innerHTML = `${hours} <span class="unit">${unitText}</span>`;
            }
        }

        if (batterySubtextEl) {
            batterySubtextEl.textContent = totalWatts === 0 ? 'select appliances to calculate' : subtextText;
        }

        if (recPackageTitle) {
            recPackageTitle.textContent = totalWatts === 0 ? 'Select appliances to calculate' : recTitleText;
        }

        if (btnOrderRec) {
            btnOrderRec.setAttribute('data-pack', selectedPackageCode);
        }
    }

    const applianceItems = document.querySelectorAll('.appliance-item');
    applianceItems.forEach(item => {
        const checkbox = item.querySelector('.toggle-checkbox');

        item.addEventListener('click', (e) => {
            if (checkbox && e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                updateCalculator();
            }
        });

        if (checkbox) {
            checkbox.addEventListener('change', () => {
                updateCalculator();
            });
        }
    });

    updateCalculator();

    // --- Modal & Toast Engine ---
    const modal = document.getElementById('order-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const orderForm = document.getElementById('order-form');
    const formPackageInput = document.getElementById('form-package');
    const mainCallbackForm = document.getElementById('main-callback-form');

    function attachPhoneFormatter(inputEl) {
        if (!inputEl) return;

        const group = inputEl.closest('.phone-input-group');

        const formatValue = () => {
            if (group) group.classList.remove('is-invalid');
            inputEl.classList.remove('is-invalid');

            let raw = inputEl.value;
            let digits = raw.replace(/\D/g, '');

            if (digits.startsWith('1')) {
                digits = digits.substring(1);
            }
            digits = digits.substring(0, 10);

            let formatted = '';
            if (digits.length > 0) {
                if (digits.length <= 3) {
                    formatted = '(' + digits;
                } else if (digits.length <= 6) {
                    formatted = '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
                } else {
                    formatted = '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6, 10);
                }
            }

            inputEl.value = formatted;
        };

        inputEl.addEventListener('input', formatValue);
    }

    const formPhoneEl = document.getElementById('form-phone');
    const cbPhoneEl = document.getElementById('cb-phone');
    const heroPhoneEl = document.getElementById('hero-phone-field');
    attachPhoneFormatter(formPhoneEl);
    attachPhoneFormatter(cbPhoneEl);
    attachPhoneFormatter(heroPhoneEl);

    // Global Event Delegation for ALL Order / Calculation buttons
    document.addEventListener('click', (e) => {
        const orderBtn = e.target.closest('#btn-quick-order, .header-order-btn, #mobile-order-btn, #btn-order-rec, .select-pack-btn, [data-open-modal]');
        if (orderBtn) {
            e.preventDefault();
            const packName = orderBtn.getAttribute('data-pack') || (recPackageTitle ? recPackageTitle.textContent : '6 kWh Kit ($3,450)');
            openModal(packName);
        }
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- Telegram Bot Integration ---
    function formatPhoneLink(phoneStr) {
        const cleanDigits = phoneStr.replace(/\D/g, '');
        const telNumber = cleanDigits.startsWith('1') ? '+' + cleanDigits : '+1' + cleanDigits;
        return `<a href="tel:${telNumber}">${phoneStr}</a>`;
    }

    async function sendToTelegram(messageText) {
        console.log('[Form Submission Received]', messageText);
        return true;
    }

    // Anti-Spam Cooldown & Honeypot Protection
    const SPAM_COOLDOWN_MS = 30000;

    function checkSpamRateLimit() {
        const lastSubmit = localStorage.getItem('voltgrid_last_submit');
        const now = Date.now();
        if (lastSubmit && (now - parseInt(lastSubmit, 10)) < SPAM_COOLDOWN_MS) {
            const remainingSec = Math.ceil((SPAM_COOLDOWN_MS - (now - parseInt(lastSubmit, 10))) / 1000);
            return remainingSec;
        }
        return 0;
    }

    function recordSubmitTime() {
        localStorage.setItem('voltgrid_last_submit', Date.now().toString());
    }

    if (orderForm) {
        orderForm.addEventListener('click', (e) => e.stopPropagation());
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot check
            const hpInput = document.getElementById('form-hp');
            if (hpInput && hpInput.value.trim() !== '') {
                return;
            }

            // Cooldown check
            const cooldownSec = checkSpamRateLimit();
            if (cooldownSec > 0) {
                const msg = `Please wait ${cooldownSec} sec before resubmitting.`;
                showToast(msg);
                return;
            }

            const phoneInput = document.getElementById('form-phone');
            const nameInput = document.getElementById('form-name');
            const packageInput = document.getElementById('form-package');

            const rawDigits = phoneInput ? phoneInput.value : '';
            const fullPhone = '+1 ' + rawDigits;
            const nameVal = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Not specified';
            const packageVal = packageInput ? packageInput.value : '6 kWh Kit ($3,450)';

            const phoneGroup = phoneInput ? phoneInput.closest('.phone-input-group') : null;

            if (!validatePhoneNumber(fullPhone)) {
                if (phoneGroup) phoneGroup.classList.add('is-invalid');
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const errMsg = 'Please enter a valid phone number';
                showToast(errMsg);
                return;
            }

            if (phoneGroup) phoneGroup.classList.remove('is-invalid');
            if (phoneInput) phoneInput.classList.remove('is-invalid');
            closeModal();
            recordSubmitTime();

            const msgText = `⚡ <b>New Backup Power Quote Request!</b>\n\n` +
                `👤 <b>Name:</b> ${nameVal}\n` +
                `📞 <b>Phone:</b> ${fullPhone}\n` +
                `📦 <b>Selected Kit:</b> ${packageVal}`;

            sendToTelegram(msgText);

            const msg = 'Quote request submitted! Our engineer will call you within 5 minutes.';
            showToast(msg);
            orderForm.reset();
        });
    }

    if (mainCallbackForm) {
        mainCallbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot check
            const hpInput = document.getElementById('cb-hp');
            if (hpInput && hpInput.value.trim() !== '') {
                return;
            }

            // Cooldown check
            const cooldownSec = checkSpamRateLimit();
            if (cooldownSec > 0) {
                const msg = `Please wait ${cooldownSec} sec before resubmitting.`;
                showToast(msg);
                return;
            }

            const phoneInput = document.getElementById('cb-phone');
            const nameInput = document.getElementById('cb-name');

            const rawDigits = phoneInput ? phoneInput.value : '';
            const fullPhone = '+1 ' + rawDigits;
            const nameVal = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Not specified';

            const phoneGroup = phoneInput ? phoneInput.closest('.phone-input-group') : null;

            if (!validatePhoneNumber(fullPhone)) {
                if (phoneGroup) phoneGroup.classList.add('is-invalid');
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const errMsg = 'Please enter a valid phone number';
                showToast(errMsg);
                return;
            }

            if (phoneGroup) phoneGroup.classList.remove('is-invalid');
            if (phoneInput) phoneInput.classList.remove('is-invalid');
            recordSubmitTime();

            const msgText = `📞 <b>Engineer Callback Request!</b>\n\n` +
                `👤 <b>Name:</b> ${nameVal}\n` +
                `📞 <b>Phone:</b> ${fullPhone}`;

            sendToTelegram(msgText);

            const msg = 'Thank you! An engineer will call you within 5 minutes.';
            showToast(msg);
            mainCallbackForm.reset();
        });
    }

    // --- Hero Quick Lead Form Submission & Other Packages Handling ---
    const heroQuickForm = document.getElementById('hero-quick-lead-form');
    if (heroQuickForm) {
        heroQuickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('hero-phone-field');
            const rawDigits = phoneInput ? phoneInput.value : '';
            const fullPhone = '+1 ' + rawDigits;
            const phoneGroup = phoneInput ? phoneInput.closest('.phone-input-group') : null;

            if (!validatePhoneNumber(fullPhone)) {
                if (phoneGroup) phoneGroup.classList.add('is-invalid');
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const errMsg = 'Please enter a valid phone number';
                showToast(errMsg);
                return;
            }

            if (phoneGroup) phoneGroup.classList.remove('is-invalid');
            if (phoneInput) phoneInput.classList.remove('is-invalid');
            recordSubmitTime();

            const msgText = `🔥 <b>Consultation Request (6 kWh Bestseller)!</b>\n\n` +
                `📞 <b>Phone:</b> ${fullPhone}`;

            sendToTelegram(msgText);

            const msg = 'Request received! An engineer will call you within 5 minutes.';
            showToast(msg);
            heroQuickForm.reset();
        });
    }

    const heroOtherPkgsBtn = document.getElementById('hero-other-pkgs-btn');
    if (heroOtherPkgsBtn) {
        heroOtherPkgsBtn.addEventListener('click', (e) => {
            const phoneInput = document.getElementById('hero-phone-field');
            const rawDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

            // If user filled in a phone number before clicking "Other Kits"
            if (rawDigits.length >= 3) {
                const fullPhone = '+1 ' + (phoneInput ? phoneInput.value : '');
                const msgText = `🔍 <b>Customer viewed other kits (contact saved)!</b>\n\n` +
                    `📞 <b>Phone:</b> ${fullPhone}`;

                sendToTelegram(msgText);
                const toastMsg = 'Thank you! Contact saved, browsing other kits.';
                showToast(toastMsg);
            }
        });
    }

    function showToast(msg) {
        const toast = document.getElementById('toast-notify');
        const toastMsg = document.getElementById('toast-msg');
        if (!toast || !toastMsg) return;

        toastMsg.textContent = msg;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // --- 16.0 Mobile Packages & Tadiran Carousel Sync ---
    function setupMobileCarousel(gridSelector, prevBtnId, nextBtnId, dotsSelector) {
        const grid = document.querySelector(gridSelector);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dots = document.querySelectorAll(dotsSelector);

        if (!grid) return;
        const cards = grid.querySelectorAll('.package-card');
        if (!cards.length) return;

        const updateDots = () => {
            const scrollLeft = grid.scrollLeft;
            const cardWidth = (cards[0] ? cards[0].offsetWidth : 280) + 16;
            const activeIdx = Math.min(cards.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIdx);
            });
        };

        grid.addEventListener('scroll', updateDots, { passive: true });

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                grid.scrollBy({ left: -(grid.offsetWidth * 0.85), behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                grid.scrollBy({ left: grid.offsetWidth * 0.85, behavior: 'smooth' });
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                if (cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        });
    }

    // 1. Carousel for Ready-made Packages
    setupMobileCarousel('#tab-packages .packages-grid', 'pkgs-prev-btn', 'pkgs-next-btn', '#pkgs-dots .pkg-dot');

    // 2. Carousel for SAKO ESS Power Stations
    setupMobileCarousel('#tab-sako .packages-grid', 'sako-prev-btn', 'sako-next-btn', '#sako-dots .pkg-dot');

    // 3. Carousel for Deye Hybrid Inverters
    setupMobileCarousel('#tab-deye .packages-grid', 'deye-prev-btn', 'deye-next-btn', '#deye-dots .pkg-dot');

    // --- 17.0 Unified Product Details Modal Engine (Kits, SAKO & Deye) ---
    const PRODUCT_DATA = {
        'pkg-6kw': {
            id: 'pkg-6kw',
            gallery: ['assets/images/hero-kit-6kwt-trans.webp'],
            en: {
                title: '6 kWh Kit',
                subtitle: '6 kWh lithium-ion battery + EASUN 3.2kW inverter',
                badge: 'Essential Backup',
                kpiPower: '3.2 kW',
                kpiCap: '6 kWh',
                kpiCycles: '6,000 cycles',
                voltage: '230 V AC / 24 V DC',
                capacity: '250 Ah (6 kWh)',
                energy: '6 kWh',
                current: '3.2 kW (rated 3200 VA) | MPPT up to 100 A | AC up to 80 A',
                cycles: '6,000 cycles (over 15 years)',
                scaling: 'Solar panel support: MPPT 60–500 V DC, up to 4.0 kW',
                temp: 'Charge: 0…+55 °C | Discharge: -20…+60 °C',
                dim: 'Compact wall-mount inverter + modular battery',
                weight: '~62 kg (kit)',
                ports: 'USB / RS232 / RS485 / Wi-Fi monitoring / LCD display',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Wall-mount / Indoor',
                price: '$3,450',
                packName: '6 kWh Kit ($3,450)',
                accessories: [
                    'EASUN ISolar-SMG-II-3.2KW-24V hybrid inverter',
                    '6 kWh lithium-ion battery (24V 250Ah)',
                    'Connection cables and protective switchgear',
                    'Official 5-year warranty'
                ]
            }
        },
        'pkg-12kw': {
            id: 'pkg-12kw',
            gallery: ['assets/images/hero-kit-12kwt-trans.webp'],
            en: {
                title: '12 kWh Kit',
                subtitle: '12 kWh lithium-ion battery + EASUN 6.2kW inverter',
                badge: 'Bestseller',
                kpiPower: '6.2 kW',
                kpiCap: '12 kWh',
                kpiCycles: '6,000 cycles',
                voltage: '230 V AC / 48 V DC',
                capacity: '250 Ah (12 kWh)',
                energy: '12 kWh',
                current: '6.2 kW (peak 12400 VA) | MPPT up to 120 A | AC up to 100 A',
                cycles: '6,000 cycles (over 15 years)',
                scaling: 'MPPT 60–500 V DC (up to 6.5 kW solar panels)',
                temp: 'Charge: 0…+55 °C | Discharge: -20…+60 °C',
                dim: 'Wall-mount inverter + 48V modular battery pack',
                weight: '~110 kg (kit)',
                ports: 'Wi-Fi monitoring / RS485 / CAN / USB / LCD',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Wall-mount / Floor-standing',
                price: '$5,950',
                packName: '12 kWh Kit ($5,950)',
                accessories: [
                    'EASUN ISolar-SMG-II-6.2KW-48V hybrid inverter',
                    '12 kWh lithium-ion battery (48V 250Ah)',
                    'Heavy-duty connection cables with lugs',
                    'Official 5-year warranty'
                ]
            }
        },
        'pkg-24kw': {
            id: 'pkg-24kw',
            gallery: ['assets/images/hero-kit-24kwt-trans.webp'],
            en: {
                title: '24 kWh Kit',
                subtitle: '24 kWh lithium-ion battery (2×12 kWh) + 1–2 EASUN 6.2kW inverters',
                badge: 'For Business & Large Homes',
                kpiPower: '6.2–12.4 kW',
                kpiCap: '24 kWh',
                kpiCycles: '6,000 cycles',
                voltage: '230 V AC / 48 V DC',
                capacity: '500 Ah (24 kWh)',
                energy: '24 kWh (2×12 kWh)',
                current: '6.2–12.4 kW (1–2 EASUN 6.2kW inverters)',
                cycles: '6,000 cycles (over 15 years)',
                scaling: 'Parallel battery expansion and solar panel array support',
                temp: 'Charge: 0…+55 °C | Discharge: -20…+60 °C',
                dim: 'Rack / Floor installation in technical utility room',
                weight: '~215 kg (kit)',
                ports: 'Wi-Fi / CAN / RS485 / Dual BMS monitoring',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Floor-standing / Utility room',
                price: '$10,850',
                packName: '24 kWh Kit ($10,850)',
                accessories: [
                    '1–2 EASUN 6.2kW hybrid inverters',
                    '24 kWh battery pack (2×12 kWh)',
                    'Parallel interconnection modules and safety switchgear',
                    'Official 5-year warranty'
                ]
            }
        },
        'pkg-36kw': {
            id: 'pkg-36kw',
            gallery: ['assets/images/hero-kit-36kwt-trans.webp'],
            en: {
                title: '36 kWh Kit',
                subtitle: 'Scalable system: 36+ kWh (3×12 kWh) + 1–3 EASUN 6.2kW inverters',
                badge: 'Enterprise Scalability',
                kpiPower: 'up to 18.6 kW',
                kpiCap: '36+ kWh',
                kpiCycles: '6,000 cycles',
                voltage: '230 V / 380 V AC / 48 V DC',
                capacity: '750 Ah (36+ kWh)',
                energy: '36+ kWh (3×12 kWh)',
                current: 'up to 18.6 kW (up to 3 EASUN 6.2kW inverters)',
                cycles: '6,000 cycles (over 15 years)',
                scaling: 'Industrial parallel scaling and high-capacity solar arrays',
                temp: 'Charge: 0…+55 °C | Discharge: -20…+60 °C',
                dim: 'Industrial rack / cabinet for 3 battery units',
                weight: '~320 kg (kit)',
                ports: 'Ethernet / Wi-Fi / RS485 / CAN / BMS monitoring',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Server room / Electrical distribution room',
                price: '$15,900',
                packName: '36 kWh Kit ($15,900)',
                accessories: [
                    '1–3 EASUN 6.2kW hybrid inverters',
                    '36+ kWh battery rack system (3×12 kWh)',
                    'Heavy-duty DC busbars and industrial circuit breakers',
                    'Official 5-year warranty'
                ]
            }
        },
        'sako-500w': {
            id: 'sako-500w',
            gallery: [
                'assets/images/sako-500w.webp',
                'assets/images/sako-500w-2.webp',
                'assets/images/sako-500w-3.webp'
            ],
            en: {
                title: 'SAKO Alpha ESS 500W / 1000Wh',
                subtitle: 'All-in-One Portable Power Station with Pure Sine Wave Inverter & 1000Wh LiFePO4',
                badge: 'Apartment / Office',
                kpiPower: '500W (Peak 1,000W)',
                kpiCap: '1,000Wh (1 kWh)',
                kpiCycles: '6,000+ cycles',
                voltage: '12.8V (LiFePO4)',
                capacity: '78 Ah (1000Wh)',
                energy: '1,000Wh (1 kWh)',
                current: 'AC 120V Charge: 15A (~2.5–3 hrs) | Solar MPPT: 30A (up to 400W)',
                cycles: '≥6,000 cycles (DOD 80%, 10+ year service life)',
                scaling: 'Instant UPS transfer (≤10 ms) seamless power backup',
                temp: 'Charge: 32°F to 113°F (0…+45 °C) | Discharge: 14°F to 131°F (-10…+55 °C)',
                dim: '15.3 × 8.7 × 12.2 in (390 × 220 × 310 mm)',
                weight: '32 lbs (14.5 kg)',
                ports: '2× 120V NEMA pure sine, 4× USB 2.4A, 1× Type-C PD 45W, 2× DC 12V 5A, 1× Car 12V 10A',
                certs: 'UL1973, CE, RoHS, UN38.3, MSDS',
                montage: 'Portable / Desktop (built-in ergonomic handle)',
                price: '$850',
                packName: 'SAKO Alpha 500W ESS ($850)',
                accessories: ['SAKO 500W/1000Wh Power Station x1', 'AC 120V Power Cable x1', 'MC4 Solar Connection Cable x1', 'User Manual x1']
            }
        },
        'sako-1000w': {
            id: 'sako-1000w',
            gallery: [
                'assets/images/sako-1000w.webp',
                'assets/images/sako-1000w-2.webp',
                'assets/images/sako-1000w-3.webp'
            ],
            en: {
                title: 'SAKO Alpha ESS 1000W / 2000Wh',
                subtitle: 'High-Capacity All-in-One 1kW ESS with 2000Wh LiFePO4 Battery',
                badge: 'Top Seller',
                kpiPower: '1,000W (Peak 2,000W)',
                kpiCap: '2,000Wh (2 kWh)',
                kpiCycles: '6,000+ cycles',
                voltage: '25.6V (LiFePO4)',
                capacity: '78 Ah (2000Wh)',
                energy: '2,000Wh (2 kWh)',
                current: 'AC 120V Charge: 20A (~3.5–4 hrs) | Solar MPPT: 30A (up to 600W)',
                cycles: '≥6,000 cycles (DOD 80%, 10+ year service life)',
                scaling: 'Instant UPS transfer (≤10 ms) for sensitive electronics & heaters',
                temp: 'Charge: 32°F to 113°F (0…+45 °C) | Discharge: 14°F to 131°F (-10…+55 °C)',
                dim: '18.1 × 10.2 × 14.2 in (460 × 260 × 360 mm)',
                weight: '51.8 lbs (23.5 kg)',
                ports: '3× 120V NEMA pure sine, 4× USB 2.4A, 2× Type-C PD 100W, 1× Car 12V 10A',
                certs: 'UL1973, CE, RoHS, UN38.3, MSDS',
                montage: 'Portable / Floor-standing on anti-slip feet with handles',
                price: '$1,450',
                packName: 'SAKO Alpha 1000W ESS ($1,450)',
                accessories: ['SAKO 1000W/2000Wh Power Station x1', 'AC 120V Power Cable x1', 'MC4 Solar Connection Cable x1', 'User Manual x1']
            }
        },
        'sako-3kw': {
            id: 'sako-3kw',
            gallery: [
                'assets/images/sako-3kw.webp',
                'assets/images/sako-3kw-2.webp',
                'assets/images/sako-3kw-3.webp'
            ],
            en: {
                title: 'SAKO Alpha ESS 3kW / 5.12kWh',
                subtitle: 'Whole-Home Monoblock Storage 3kW with 5.12kWh LiFePO4 Battery Module',
                badge: 'Home & Cabin',
                kpiPower: '3,000W (Peak 6,000W)',
                kpiCap: '5.12 kWh',
                kpiCycles: '6,000+ cycles',
                voltage: '51.2V (LiFePO4)',
                capacity: '100 Ah (5,120 Wh)',
                energy: '5.12 kWh',
                current: 'AC Charge: up to 60A | Solar MPPT Inverter: 80A (up to 4,000W)',
                cycles: '≥6,000 cycles (DOD 80%, 15+ year lifespan)',
                scaling: 'Direct connection to subpanel or distribution board',
                temp: 'Charge: 32°F to 122°F (0…+50 °C) | Discharge: 5°F to 140°F (-15…+60 °C)',
                dim: '23.6 × 16.5 × 32.3 in (600 × 420 × 820 mm)',
                weight: '150 lbs (68 kg)',
                ports: 'AC 120/240V terminal blocks, Wi-Fi module, RS485/CAN, PV solar inputs',
                certs: 'UL9540A, CE, IEC62109, UN38.3, MSDS',
                montage: 'Floor-standing monoblock on locking industrial casters',
                price: '$2,850',
                packName: 'SAKO Alpha 3kW ESS ($2,850)',
                accessories: ['SAKO 3kW/5.12kWh Power Station x1', 'Integrated Wi-Fi Cloud Monitoring Module x1', 'Grounding & Terminal Connection Kit x1', 'User Manual x1']
            }
        },
        'sako-6kw': {
            id: 'sako-6kw',
            gallery: [
                'assets/images/sako-6kw.webp',
                'assets/images/sako-6kw-2.webp',
                'assets/images/sako-6kw-3.webp'
            ],
            en: {
                title: 'SAKO Alpha ESS 6kW / 10.24kWh',
                subtitle: 'Flagship Off-Grid & Hybrid Power Station 6kW with 10.24kWh LiFePO4',
                badge: 'Maximum Autonomy',
                kpiPower: '6,000W (Peak 12,000W)',
                kpiCap: '10.24 kWh',
                kpiCycles: '6,000+ cycles',
                voltage: '51.2V (LiFePO4)',
                capacity: '200 Ah (10,240 Wh)',
                energy: '10.24 kWh',
                current: 'Rapid AC Charge: up to 100A (~2–2.5 hrs) | Dual MPPT: 120A (up to 6,000W)',
                cycles: '≥6,000 cycles (DOD 80%, 15+ year lifespan)',
                scaling: 'Full grid replacement for estates, farms, and small commercial',
                temp: 'Charge: 32°F to 122°F (0…+50 °C) | Discharge: 5°F to 140°F (-15…+60 °C)',
                dim: '25.6 × 18.1 × 45.3 in (650 × 460 × 1150 mm)',
                weight: '253 lbs (115 kg)',
                ports: 'Heavy-duty AC terminal blocks, Wi-Fi/4G, RS485/CAN, Dual PV MPPT inputs',
                certs: 'UL9540A, UL1973, CE, IEC62109, IEC62619, UN38.3',
                montage: 'Heavy-duty floor monoblock with reinforced industrial wheels',
                price: '$4,950',
                packName: 'SAKO Alpha 6kW ESS ($4,950)',
                accessories: ['SAKO 6kW/10.24kWh Flagship Station x1', 'Wi-Fi/Cloud Monitoring Module x1', 'Heavy-Duty Power Hookup Cable Kit x1', 'Installation & Operation Manual x1']
            }
        },
        'deye-6kw': {
            id: 'deye-6kw',
            gallery: [
                'assets/images/deye-6kw.webp',
                'assets/images/deye-6kw-2.webp',
                'assets/images/deye-6kw-3.webp'
            ],
            en: {
                title: 'Deye SUN-6K-SG04LP1-EU',
                subtitle: 'Single-Phase 48V Hybrid Solar Inverter 6kW (Pure Sine Wave, UPS ≤4ms)',
                badge: '1-Phase / 120-240V',
                kpiPower: '6,000W (Peak 12,000W)',
                kpiCap: '48V LiFePO4',
                kpiCycles: '97.6% Max Efficiency',
                voltage: '120/240V Split-Phase / 48V Battery (40–60V)',
                capacity: 'Compatible with all 48V LiFePO4 batteries (50–1,000 Ah)',
                energy: 'Max PV Input: 7,800W (Dual MPPT trackers)',
                current: 'Max Charge/Discharge Current: 135A',
                cycles: 'Parallel connection up to 16 inverters',
                scaling: 'Generator autostart, zero-export, AC coupling, microgrid ready',
                temp: '-40°F to 140°F (-40…+60 °C) intelligent active fan cooling',
                dim: '22.8 × 13.0 × 9.1 in (580 × 330 × 232 mm)',
                weight: '52.9 lbs (24 kg)',
                ports: 'Wi-Fi / LAN, RS485, CAN, DRM, dedicated generator input',
                certs: 'UL1741, IEEE1547, CE, IEC62109, IP65',
                montage: 'Wall-mounted vertical installation (bracket included)',
                price: '$1,950',
                packName: 'Deye SUN-6K-SG04LP1-EU ($1,950)',
                accessories: ['Deye 6kW Hybrid Inverter x1', 'Deye Wi-Fi Monitoring Stick x1', 'Current Transformer (CT Sensor) x1', 'Wall-Mount Bracket & Hardware x1', 'Manual & Warranty Card x1']
            }
        },
        'deye-8kw': {
            id: 'deye-8kw',
            gallery: [
                'assets/images/deye-8kw.webp',
                'assets/images/deye-8kw-2.webp',
                'assets/images/deye-8kw-3.webp'
            ],
            en: {
                title: 'Deye SUN-8K-SG05LP1-EU',
                subtitle: 'Single-Phase 48V Hybrid Solar Inverter 8kW (190A Current, Dual MPPT)',
                badge: 'Top Seller',
                kpiPower: '8,000W (Peak 16,000W)',
                kpiCap: '48V LiFePO4',
                kpiCycles: '97.6% Max Efficiency',
                voltage: '120/240V Split-Phase / 48V Battery (40–60V)',
                capacity: 'Compatible with all 48V LiFePO4 batteries (100–2,000 Ah)',
                energy: 'Max PV Input: 10,400W (Dual MPPT trackers)',
                current: 'Max Charge/Discharge Current: 190A',
                cycles: 'Parallel connection up to 16 units on single or 3-phase systems',
                scaling: 'Smart Load, AC coupling, auto generator start, remote monitoring',
                temp: '-40°F to 140°F (-40…+60 °C), ultra-quiet cooling (≤30 dB)',
                dim: '22.8 × 13.0 × 9.1 in (580 × 330 × 232 mm)',
                weight: '52.9 lbs (24 kg)',
                ports: 'Wi-Fi / LAN, RS485, CAN, DRM, dedicated generator input',
                certs: 'UL1741, IEEE1547, CE, IEC62109, IP65',
                montage: 'Wall-mounted vertical installation',
                price: '$2,550',
                packName: 'Deye SUN-8K-SG05LP1-EU ($2,550)',
                accessories: ['Deye 8kW Hybrid Inverter x1', 'Wi-Fi/Cloud Monitoring Dongle x1', 'CT Sensor Kit x1', 'Wall-Mount Bracket & Anchor Kit x1', 'User Manual & Warranty Certificate x1']
            }
        },
        'deye-10kw': {
            id: 'deye-10kw',
            gallery: [
                'assets/images/deye-10kw.webp',
                'assets/images/deye-10kw-2.webp',
                'assets/images/deye-10kw-3.webp'
            ],
            en: {
                title: 'Deye SUN-10K-SG04LP3-EU',
                subtitle: 'High-Power Hybrid Inverter 10kW / 48V (220A Current, Triple MPPT)',
                badge: 'High Power 10kW',
                kpiPower: '10,000W (Peak 20,000W)',
                kpiCap: '48V LiFePO4',
                kpiCycles: '97.6% Max Efficiency',
                voltage: '120/240V or 208V 3-Phase / 48V Battery (40–60V)',
                capacity: 'Compatible with all 48V LiFePO4 blocks (200–3,000 Ah)',
                energy: 'Max PV Input: 13,000W (3 independent MPPT trackers)',
                current: 'Max Charge/Discharge Current: 220A',
                cycles: '3 independent MPPT strings for multi-pitch roof designs',
                scaling: 'Whole-house microgrid, excess solar clipping, peak shaving',
                temp: '-40°F to 140°F (-40…+60 °C) intelligent active cooling',
                dim: '26.4 × 16.5 × 9.2 in (670 × 420 × 233 mm)',
                weight: '78.5 lbs (35.6 kg)',
                ports: 'Wi-Fi / LAN, RS232, RS485, CAN, generator input',
                certs: 'UL1741, IEEE1547, CE, IEC62109, IP65',
                montage: 'Wall-mounted vertical installation',
                price: '$3,250',
                packName: 'Deye SUN-10K-SG04LP3-EU ($3,250)',
                accessories: ['Deye 10kW Hybrid Inverter x1', 'Wi-Fi/Cloud Monitoring Module x1', 'Current Transformer (CT Sensor) x1', 'Full Set of MC4 Connectors & Mounts x1', 'User Manual & Official Warranty x1']
            }
        },
        'deye-15kw': {
            id: 'deye-15kw',
            gallery: [
                'assets/images/deye-15kw.webp',
                'assets/images/deye-15kw-2.webp',
                'assets/images/deye-15kw-3.webp'
            ],
            en: {
                title: 'Deye SUN-15K-SG01HP3-EU-BM3',
                subtitle: '3-Phase Commercial & Estate Hybrid Inverter 15kW with 48V Low-Voltage Battery Support',
                badge: '3-Phase / 480V/208V',
                kpiPower: '15,000W (Peak 30,000W)',
                kpiCap: '48V LiFePO4',
                kpiCycles: '97.6% Max Efficiency',
                voltage: '3-Phase 208V/480V + N / 48V Battery (40–60V)',
                capacity: 'Compatible with 48V LiFePO4 modules (200–5,000 Ah)',
                energy: 'Max PV Input: 22,500W (Dual high-current MPPTs)',
                current: 'Max Charge/Discharge Current: 280A',
                cycles: '100% unbalanced phase output (up to 50% rated power per phase)',
                scaling: 'Parallel connection up to 10 units with smart generator integration',
                temp: '-40°F to 140°F (-40…+60 °C) intelligent fan cooling',
                dim: '29.5 × 18.0 × 10.6 in (750 × 456 × 268 mm)',
                weight: '111.5 lbs (50.6 kg)',
                ports: 'Wi-Fi / LAN, RS485, CAN, DRM, dedicated generator input',
                certs: 'UL1741, IEEE1547, CE, IEC62109, IP65',
                montage: 'Wall-mounted vertical installation',
                price: '$4,250',
                packName: 'Deye SUN-15K-SG01HP3-EU-BM3 ($4,250)',
                accessories: ['Deye 15kW 3-Phase Inverter x1', 'Wi-Fi/Cloud Monitoring Module x1', '3-Phase CT Sensor Trio x1', 'Heavy-Duty Wall Mounting Kit x1', 'Operation Manual & Warranty Card x1']
            }
        }
    };

    let activeModalTadId = 'pkg-6kw';

    function renderTadiranModal(tadId) {
        if (tadId) activeModalTadId = tadId;
        const prod = PRODUCT_DATA[activeModalTadId] || PRODUCT_DATA['pkg-6kw'];
        const data = (prod.en || prod);

        const pmTitle = document.getElementById('pm-title');
        const pmSubtitle = document.getElementById('pm-subtitle');
        const pmBadge = document.getElementById('pm-badge');
        const pmVolt = document.getElementById('pm-voltage');
        const pmCapacity = document.getElementById('pm-capacity');
        const pmEnergy = document.getElementById('pm-energy');
        const pmCurrent = document.getElementById('pm-current');
        const pmCycles = document.getElementById('pm-cycles');
        const pmScaling = document.getElementById('pm-scaling');
        const pmTemp = document.getElementById('pm-temp');
        const pmDim = document.getElementById('pm-dim');
        const pmWeight = document.getElementById('pm-weight');
        const pmPorts = document.getElementById('pm-ports');
        const pmCerts = document.getElementById('pm-certs');
        const pmMontage = document.getElementById('pm-montage');
        const pmPrice = document.getElementById('pm-price');

        // KPI metrics
        const pmKpiPower = document.getElementById('pm-kpi-power');
        const pmKpiCap = document.getElementById('pm-kpi-cap');
        const pmKpiCycles = document.getElementById('pm-kpi-cycles');

        if (pmTitle) pmTitle.textContent = data.title;
        if (pmSubtitle) pmSubtitle.textContent = data.subtitle;
        if (pmBadge) pmBadge.textContent = data.badge;
        if (pmVolt) pmVolt.textContent = data.voltage;
        if (pmCapacity) pmCapacity.textContent = data.capacity;
        if (pmEnergy) pmEnergy.textContent = data.energy;
        if (pmCurrent) pmCurrent.textContent = data.current;
        if (pmCycles) pmCycles.textContent = data.cycles;
        if (pmScaling) pmScaling.textContent = data.scaling;
        if (pmTemp) pmTemp.textContent = data.temp;
        if (pmDim) pmDim.textContent = data.dim;
        if (pmWeight) pmWeight.textContent = data.weight;
        if (pmPorts) pmPorts.textContent = data.ports;
        if (pmCerts) pmCerts.textContent = data.certs;
        if (pmMontage) pmMontage.textContent = data.montage;
        if (pmPrice) pmPrice.textContent = data.price;

        if (pmKpiPower) pmKpiPower.textContent = data.kpiPower || '-';
        if (pmKpiCap) pmKpiCap.textContent = data.kpiCap || data.energy || '-';
        if (pmKpiCycles) pmKpiCycles.textContent = data.kpiCycles || data.cycles || '-';

        const visualBox = document.getElementById('pm-visual-box');
        if (visualBox) {
            const galleryArr = prod.gallery || data.gallery || [];
            const mainImg = galleryArr.length ? galleryArr[0] : (data.img || 'assets/images/hero-kit-6kwt-trans.webp');
            visualBox.innerHTML = `<img src="${mainImg}" alt="${data.title}" class="pm-visual-img" id="pm-active-img" style="max-width: 100%; max-height: 230px; object-fit: contain; filter: drop-shadow(0 14px 28px rgba(15,23,42,0.14));">`;
        }

        const galleryThumbs = document.getElementById('pm-gallery-thumbs');
        if (galleryThumbs) {
            const galleryArr = prod.gallery || data.gallery || [];
            if (galleryArr.length > 1) {
                galleryThumbs.style.display = 'flex';
                galleryThumbs.innerHTML = galleryArr.map((imgSrc, idx) => `
                    <img src="${imgSrc}" alt="${data.title} view ${idx + 1}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-gallery-src="${imgSrc}">
                `).join('');
            } else {
                galleryThumbs.style.display = 'none';
                galleryThumbs.innerHTML = '';
            }
        }

        const accGrid = document.getElementById('pm-acc-grid');
        if (accGrid && data.accessories) {
            accGrid.innerHTML = data.accessories.map(acc => `
                <div class="acc-card">
                    <span class="acc-check">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </span>
                    <span class="acc-text">${acc}</span>
                </div>
            `).join('');
        }

        const pmOrderBtn = document.getElementById('pm-order-btn');
        if (pmOrderBtn) {
            pmOrderBtn.setAttribute('data-pack', data.packName);
        }

        // Dynamic model switcher tabs inside modal:
        // Handles Kits, SAKO ESS, and Deye Inverters
        const modelWrap = document.querySelector('.model-selector-wrap');
        const modelSelLbl = document.getElementById('pm-model-sel-lbl');
        const modelTabsContainer = document.getElementById('pm-model-tabs');

        if (modelWrap && modelTabsContainer) {
            modelWrap.style.display = 'flex';
            const isPkg = activeModalTadId.startsWith('pkg-');
            const isSako = activeModalTadId.startsWith('sako-');
            const isDeye = activeModalTadId.startsWith('deye-');

            if (modelSelLbl) {
                modelSelLbl.textContent = isSako ? 'SAKO ESS Models:' : isDeye ? 'Deye Inverters:' : 'System line:';
            }

            const tabsList = isSako ? [
                { id: 'sako-500w', label: '500W / 1kWh' },
                { id: 'sako-1000w', label: '1000W / 2kWh' },
                { id: 'sako-3kw', label: '3kW / 5.12kWh' },
                { id: 'sako-6kw', label: '6kW / 10kWh' }
            ] : isDeye ? [
                { id: 'deye-6kw', label: '6 kW (1-Ph)' },
                { id: 'deye-8kw', label: '8 kW (1-Ph)' },
                { id: 'deye-10kw', label: '10 kW (1-Ph)' },
                { id: 'deye-15kw', label: '15 kW (3-Ph)' }
            ] : [
                { id: 'pkg-6kw', label: '6 kWh' },
                { id: 'pkg-12kw', label: '12 kWh' },
                { id: 'pkg-24kw', label: '24 kWh' },
                { id: 'pkg-36kw', label: '36 kWh' }
            ];

            modelTabsContainer.innerHTML = tabsList.map(t => `
                <button type="button" class="model-tab ${t.id === activeModalTadId ? 'active' : ''}" data-tadiran-tab="${t.id}">${t.label}</button>
            `).join('');
        }
    }

    function openProductModal(tadId) {
        renderTadiranModal(tadId);
        const prodModalEl = document.getElementById('product-modal');
        if (prodModalEl) {
            prodModalEl.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        const prodModalEl = document.getElementById('product-modal');
        if (prodModalEl) {
            prodModalEl.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
        const galThumb = e.target.closest('.gallery-thumb');
        if (galThumb) {
            e.preventDefault();
            const src = galThumb.getAttribute('data-gallery-src');
            const mainImg = document.getElementById('pm-active-img');
            if (mainImg && src) {
                mainImg.src = src;
                document.querySelectorAll('.gallery-thumb').forEach(t => {
                    t.classList.toggle('active', t === galThumb);
                });
            }
            return;
        }

        const catTabBtn = e.target.closest('.catalog-tab-btn');
        if (catTabBtn) {
            e.preventDefault();
            const targetId = catTabBtn.getAttribute('data-tab-target');
            if (targetId) {
                document.querySelectorAll('.catalog-tab-btn').forEach(b => {
                    b.classList.toggle('active', b === catTabBtn);
                });
                document.querySelectorAll('.catalog-tab-pane').forEach(pane => {
                    pane.classList.toggle('active', pane.id === targetId);
                });
            }
            return;
        }

        const viewBtn = e.target.closest('.view-tadiran-btn, .view-details-btn');
        if (viewBtn) {
            e.preventDefault();
            e.stopPropagation();
            const tadId = viewBtn.getAttribute('data-tadiran-id') || viewBtn.getAttribute('data-pack-id') || 'pkg-6kw';
            openProductModal(tadId);
            return;
        }

        const tabBtn = e.target.closest('.model-tab');
        if (tabBtn) {
            e.preventDefault();
            const tadId = tabBtn.getAttribute('data-tadiran-tab');
            if (tadId) renderTadiranModal(tadId);
            return;
        }

        const pmOrderBtn = e.target.closest('#pm-order-btn');
        if (pmOrderBtn) {
            e.preventDefault();
            const packName = pmOrderBtn.getAttribute('data-pack');
            closeProductModal();
            openModal(packName);
            return;
        }

        const closeBtn = e.target.closest('#prod-modal-close-btn');
        if (closeBtn) {
            e.preventDefault();
            closeProductModal();
            return;
        }

        const prodModalEl = document.getElementById('product-modal');
        if (prodModalEl && e.target === prodModalEl) {
            closeProductModal();
        }
    });

    window.openProductModal = openProductModal;
    window.closeProductModal = closeProductModal;
    window.renderTadiranModal = renderTadiranModal;

    const urlParams = new URLSearchParams(window.location.search);
    const modalParam = urlParams.get('modal');
    if (modalParam) {
        openProductModal(modalParam);
    }
});
