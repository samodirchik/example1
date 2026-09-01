document.addEventListener('DOMContentLoaded', () => {
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
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const mobileOrderBtn = document.getElementById('mobile-order-btn');

    function toggleBurgerMenu() {
        if (!burgerBtn || !mobileDrawer) return;
        const isActive = burgerBtn.classList.contains('active');

        if (isActive) {
            burgerBtn.classList.remove('active');
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            burgerBtn.classList.add('active');
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleBurgerMenu);
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (burgerBtn && mobileDrawer) {
                burgerBtn.classList.remove('active');
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    if (mobileOrderBtn) {
        mobileOrderBtn.addEventListener('click', () => {
            if (burgerBtn && mobileDrawer) {
                burgerBtn.classList.remove('active');
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            }
            openModal('Комфорт 5 кВт');
        });
    }

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
            card: document.getElementById('room-boiler'),
            badge: document.getElementById('badge-boiler'),
            desc: document.getElementById('desc-boiler'),
            okText: '230V OK',
            okDesc: 'Котел и насосы (24°C)',
            offText: '0V СБОЙ',
            offDesc: 'Котел замерзает!'
        },
        kitchen: {
            card: document.getElementById('room-kitchen'),
            badge: document.getElementById('badge-kitchen'),
            desc: document.getElementById('desc-kitchen'),
            okText: '230V OK',
            okDesc: 'Холодильник OK',
            offText: '0V СБОЙ',
            offDesc: 'Еда портится!'
        },
        office: {
            card: document.getElementById('room-office'),
            badge: document.getElementById('badge-office'),
            desc: document.getElementById('desc-office'),
            okText: '230V OK',
            okDesc: 'Wi-Fi роутер & ПК',
            offText: '0V СБОЙ',
            offDesc: 'Связь потеряна!'
        },
        living: {
            card: document.getElementById('room-living'),
            badge: document.getElementById('badge-living'),
            desc: document.getElementById('desc-living'),
            okText: '230V OK',
            okDesc: 'Свет & ТВ',
            offText: '0V СБОЙ',
            offDesc: 'Полная темнота!'
        }
    };

    function setHouseMode(isRezerv) {
        if (isRezerv) {
            if (btnModeRezerv) btnModeRezerv.classList.add('active');
            if (btnModeBlackout) btnModeBlackout.classList.remove('active');

            if (houseStatusHud) {
                houseStatusHud.classList.remove('outage');
                if (houseStatusText) houseStatusText.textContent = 'Автозапуск 0 мс — Приборы OK';
            }

            Object.values(rooms).forEach(r => {
                if (!r.card) return;
                r.card.classList.remove('room-off');
                r.card.classList.add('active');
                if (r.badge) {
                    r.badge.className = 'room-badge badge-ok';
                    r.badge.textContent = r.okText;
                }
                if (r.desc) r.desc.textContent = r.okDesc;
            });
        } else {
            if (btnModeRezerv) btnModeRezerv.classList.remove('active');
            if (btnModeBlackout) btnModeBlackout.classList.add('active');

            if (houseStatusHud) {
                houseStatusHud.classList.add('outage');
                if (houseStatusText) houseStatusText.textContent = 'БЛЭКАУТ! Дом обесточен (0V)';
            }

            Object.values(rooms).forEach(r => {
                if (!r.card) return;
                r.card.classList.remove('active');
                r.card.classList.add('room-off');
                if (r.badge) {
                    r.badge.className = 'room-badge badge-off';
                    r.badge.textContent = r.offText;
                }
                if (r.desc) r.desc.textContent = r.offDesc;
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
    let bgParticles = [];
    let bgPulses = [];

    if (bgCanvas) {
        bgCtx = bgCanvas.getContext('2d');

        function resizeBgCanvas() {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        }
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);

        for (let i = 0; i < 50; i++) {
            bgParticles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2.2 + 1.2,
                color: Math.random() > 0.4 ? '#0284c7' : '#059669',
                alpha: Math.random() * 0.35 + 0.15
            });
        }

        function createPulse(x, y, color) {
            bgPulses.push({ x, y, radius: 10, maxRadius: 360, alpha: 0.6, color });
        }

        function animateBgCanvas() {
            if (!bgCtx) return;
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

            const cx = bgCanvas.width / 2;
            const cy = bgCanvas.height / 2;

            bgCtx.lineWidth = 1;
            bgCtx.strokeStyle = isOutage ? 'rgba(5, 150, 105, 0.08)' : 'rgba(2, 132, 199, 0.08)';
            
            for (let i = -4; i <= 4; i++) {
                bgCtx.beginPath();
                bgCtx.moveTo(0, cy + i * 150);
                bgCtx.quadraticCurveTo(cx + Math.sin(Date.now() * 0.0008 + i) * 100, cy, bgCanvas.width, cy + i * 150);
                bgCtx.stroke();
            }

            bgParticles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * 1.2;
                    p.y -= Math.sin(angle) * 1.2;
                }

                if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;

                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                bgCtx.fillStyle = isOutage ? '#059669' : p.color;
                bgCtx.globalAlpha = p.alpha;
                bgCtx.fill();
                bgCtx.globalAlpha = 1.0;
            });

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
                bgCtx.lineWidth = 2;
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
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getNodes() {
        const w = canvas.width;
        const h = canvas.height;

        return {
            grid: { x: w * 0.18, y: h * 0.22 },
            inverter: { x: w * 0.50, y: h * 0.50 },
            battery: { x: w * 0.22, y: h * 0.78 },
            home: { x: w * 0.82, y: h * 0.22 }
        };
    }

    let dashOffset = 0;
    let pulseR1 = 0;
    let pulseR2 = 22;

    class LaserComet {
        constructor(fromFn, toFn, color, speed = 0.003, offset = 0) {
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

            const curX = from.x + (to.x - from.x) * this.progress;
            const curY = from.y + (to.y - from.y) * this.progress;

            const tailProgress = Math.max(0, this.progress - 0.14);
            const tailX = from.x + (to.x - from.x) * tailProgress;
            const tailY = from.y + (to.y - from.y) * tailProgress;

            // Tail laser gradient
            const grad = ctx.createLinearGradient(tailX, tailY, curX, curY);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(1, this.color);

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(curX, curY);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Bright head node
            ctx.beginPath();
            ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
    }

    let comets = [];

    function initComets() {
        comets = [];
        const count = 5;

        if (!isOutage) {
            // Grid -> Inverter (Cyan)
            for (let i = 0; i < count; i++) {
                comets.push(new LaserComet('grid', 'inverter', '#0284c7', 0.0028, i / count));
            }
            // Inverter -> Home (Cyan)
            for (let i = 0; i < count; i++) {
                comets.push(new LaserComet('inverter', 'home', '#0284c7', 0.0028, i / count));
            }
            // Inverter -> Battery charging (Emerald)
            for (let i = 0; i < count; i++) {
                comets.push(new LaserComet('inverter', 'battery', '#059669', 0.0022, i / count));
            }
        } else {
            // Battery -> Inverter (Emerald)
            for (let i = 0; i < count * 1.4; i++) {
                comets.push(new LaserComet('battery', 'inverter', '#059669', 0.0035, i / (count * 1.4)));
            }
            // Inverter -> Home (Emerald)
            for (let i = 0; i < count * 1.4; i++) {
                comets.push(new LaserComet('inverter', 'home', '#059669', 0.0035, i / (count * 1.4)));
            }
        }
    }
    initComets();

    function drawArrow(from, to, color) {
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const headLen = 7;

        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(midX - headLen * Math.cos(angle - Math.PI / 6), midY - headLen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(midX, midY);
        ctx.lineTo(midX - headLen * Math.cos(angle + Math.PI / 6), midY - headLen * Math.sin(angle + Math.PI / 6));
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawCircuitTracks() {
        const nodes = getNodes();
        dashOffset += 0.35;

        // Track 1: Grid -> Inverter
        ctx.beginPath();
        ctx.moveTo(nodes.grid.x, nodes.grid.y);
        ctx.lineTo(nodes.inverter.x, nodes.inverter.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = isOutage ? 'rgba(220, 38, 38, 0.2)' : 'rgba(2, 132, 199, 0.25)';
        ctx.stroke();

        if (!isOutage) {
            ctx.beginPath();
            ctx.moveTo(nodes.grid.x, nodes.grid.y);
            ctx.lineTo(nodes.inverter.x, nodes.inverter.y);
            ctx.setLineDash([6, 10]);
            ctx.lineDashOffset = -dashOffset;
            ctx.strokeStyle = 'rgba(2, 132, 199, 0.6)';
            ctx.stroke();
            ctx.setLineDash([]);
            drawArrow(nodes.grid, nodes.inverter, 'rgba(2, 132, 199, 0.75)');
        }

        // Track 2: Battery -> Inverter
        ctx.beginPath();
        ctx.moveTo(nodes.battery.x, nodes.battery.y);
        ctx.lineTo(nodes.inverter.x, nodes.inverter.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(5, 150, 105, 0.25)';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(isOutage ? nodes.battery.x : nodes.inverter.x, isOutage ? nodes.battery.y : nodes.inverter.y);
        ctx.lineTo(isOutage ? nodes.inverter.x : nodes.battery.x, isOutage ? nodes.inverter.y : nodes.battery.y);
        ctx.setLineDash([6, 10]);
        ctx.lineDashOffset = -dashOffset;
        ctx.strokeStyle = 'rgba(5, 150, 105, 0.6)';
        ctx.stroke();
        ctx.setLineDash([]);
        drawArrow(isOutage ? nodes.battery : nodes.inverter, isOutage ? nodes.inverter : nodes.battery, 'rgba(5, 150, 105, 0.75)');

        // Track 3: Inverter -> Home
        ctx.beginPath();
        ctx.moveTo(nodes.inverter.x, nodes.inverter.y);
        ctx.lineTo(nodes.home.x, nodes.home.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = isOutage ? 'rgba(5, 150, 105, 0.3)' : 'rgba(2, 132, 199, 0.25)';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(nodes.inverter.x, nodes.inverter.y);
        ctx.lineTo(nodes.home.x, nodes.home.y);
        ctx.setLineDash([6, 10]);
        ctx.lineDashOffset = -dashOffset;
        ctx.strokeStyle = isOutage ? 'rgba(5, 150, 105, 0.7)' : 'rgba(2, 132, 199, 0.6)';
        ctx.stroke();
        ctx.setLineDash([]);
        drawArrow(nodes.inverter, nodes.home, isOutage ? 'rgba(5, 150, 105, 0.85)' : 'rgba(2, 132, 199, 0.75)');

        // Radar pulses around central Inverter
        pulseR1 = (pulseR1 + 0.25) % 40;
        pulseR2 = (pulseR2 + 0.25) % 40;

        const pColor = isOutage ? 'rgba(5, 150, 105,' : 'rgba(2, 132, 199,';

        ctx.beginPath();
        ctx.arc(nodes.inverter.x, nodes.inverter.y, pulseR1 + 25, 0, Math.PI * 2);
        ctx.strokeStyle = `${pColor} ${(1 - pulseR1 / 40) * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(nodes.inverter.x, nodes.inverter.y, pulseR2 + 25, 0, Math.PI * 2);
        ctx.strokeStyle = `${pColor} ${(1 - pulseR2 / 45) * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const nodes = getNodes();

        drawCircuitTracks();

        comets.forEach(c => {
            c.update();
            c.draw(nodes);
        });

        requestAnimationFrame(animate);
    }
    animate();

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

            if (isOutage) {
                outageBtn.classList.replace('btn-emerald', 'btn-primary');
                outageBtn.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>Восстановить городскую сеть</span>
                `;

                gridStatusText.textContent = 'Сеть 220V: БЛЭКАУТ';
                gridStatusText.classList.add('outage');
                if (globalStatusPill) {
                    globalStatusPill.classList.add('outage');
                    globalStatusPill.innerHTML = `<span class="status-dot"></span> Блэкаут (Резерв LiFePO4 100%)`;
                }
                if (cursorGlow) cursorGlow.classList.add('outage-mode');
                if (nodeGrid) nodeGrid.style.opacity = '0.35';

                showToast('Сбой сети! Резервная система LiFePO4 подхватила питание за 0 мс.');
            } else {
                outageBtn.classList.replace('btn-primary', 'btn-emerald');
                outageBtn.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                    <span>Симулировать отключение сети</span>
                `;

                gridStatusText.textContent = 'Сеть 220V: АКТИВНА';
                gridStatusText.classList.remove('outage');
                if (globalStatusPill) {
                    globalStatusPill.classList.remove('outage');
                    globalStatusPill.innerHTML = `<span class="status-dot"></span> Сеть: 230V 50Hz`;
                }
                if (cursorGlow) cursorGlow.classList.remove('outage-mode');
                if (nodeGrid) nodeGrid.style.opacity = '1';

                showToast('Сеть восстановлена. Инвертор перешел в режим автозарядки.');
            }

            initComets();
        });
    }

    // --- Appliance Runtime Calculator ---
    const applianceItems = document.querySelectorAll('.appliance-item');
    const totalWattsEl = document.getElementById('total-watts');
    const runtimeHoursEl = document.getElementById('runtime-hours');
    const recPackageTitle = document.getElementById('rec-package-title');

    const BATTERY_CAPACITY_WH = 5120;

    function updateCalculator() {
        let totalWatts = 0;

        applianceItems.forEach(item => {
            const checkbox = item.querySelector('.toggle-checkbox');
            const power = parseInt(item.getAttribute('data-power'), 10);

            if (checkbox && checkbox.checked) {
                item.classList.add('active');
                totalWatts += power;
            } else {
                item.classList.remove('active');
            }
        });

        if (totalWattsEl) totalWattsEl.textContent = totalWatts;

        if (runtimeHoursEl) {
            if (totalWatts === 0) {
                runtimeHoursEl.innerHTML = `&infin; <span class="unit">часов</span>`;
            } else {
                const hours = ((BATTERY_CAPACITY_WH * 0.9) / totalWatts).toFixed(1);
                runtimeHoursEl.innerHTML = `${hours} <span class="unit">часов</span>`;
            }
        }

        if (recPackageTitle) {
            if (totalWatts > 1500) {
                recPackageTitle.textContent = 'Комплект «Максимум 10 кВт» (Инвертор 10кВт + Батарея 10.24кВт·ч)';
            } else if (totalWatts > 500) {
                recPackageTitle.textContent = 'Комплект «Комфорт 5 кВт» (Инвертор 5.5кВт + Батарея 5.12кВт·ч)';
            } else {
                recPackageTitle.textContent = 'Комплект «Старт 3 кВт» (Инвертор 3.2кВт + Батарея 2.56кВт·ч)';
            }
        }
    }

    applianceItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const checkbox = item.querySelector('.toggle-checkbox');
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            updateCalculator();
        });
    });

    updateCalculator();

    // --- Modal & Toast ---
    const modal = document.getElementById('order-modal');
    const btnQuickOrder = document.getElementById('btn-quick-order');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const orderForm = document.getElementById('order-form');
    const formPackageInput = document.getElementById('form-package');
    const btnOrderRec = document.getElementById('btn-order-rec');
    const selectPackBtns = document.querySelectorAll('.select-pack-btn');

    function openModal(packageName = 'Комфорт 5 кВт') {
        if (formPackageInput) formPackageInput.value = packageName;
        if (modal) modal.classList.add('active');
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    if (btnQuickOrder) btnQuickOrder.addEventListener('click', () => openModal());
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (btnOrderRec) btnOrderRec.addEventListener('click', () => {
        const text = recPackageTitle ? recPackageTitle.textContent : 'Комфорт 5 кВт';
        openModal(text);
    });

    selectPackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const packName = btn.getAttribute('data-pack') || 'Комфорт 5 кВт';
            openModal(packName);
        });
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (orderForm) {
        orderForm.addEventListener('click', (e) => e.stopPropagation());
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            showToast('Заявка успешно отправлена! Менеджер перезвонит вам.');
            orderForm.reset();
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
});
