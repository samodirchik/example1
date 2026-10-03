function validateUkrainianPhone(phoneStr) {
    if (!phoneStr) return false;
    let digits = phoneStr.replace(/\D/g, '');

    if (digits.length === 9) {
        digits = '380' + digits;
    } else if (digits.length === 10 && digits.startsWith('0')) {
        digits = '380' + digits.substring(1);
    }

    if (digits.length !== 12 || !digits.startsWith('380')) {
        return false;
    }

    const mobileDigits = digits.substring(3);
    const opCode = mobileDigits.substring(0, 2);
    const validOpCodes = ['50', '63', '66', '67', '68', '73', '77', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
    
    if (!validOpCodes.includes(opCode)) {
        return false;
    }

    const fakePatterns = [
        '123456789', '987654321', '012345678', '876543210',
        '000000000', '111111111', '222222222', '333333333', '444444444',
        '555555555', '666666666', '777777777', '888888888', '999999999'
    ];
    if (fakePatterns.includes(mobileDigits)) {
        return false;
    }

    const subPart = mobileDigits.substring(2);
    if (/^(\d)\1{5,}/.test(subPart)) {
        return false;
    }

    return true;
}

function openModal(packageName = 'Комплект 6 кВт') {
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
            const powers = ['15', '12', '6', '10', '5', '3'];
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

window.validateUkrainianPhone = validateUkrainianPhone;
window.openModal = openModal;
window.closeModal = closeModal;

// --- Hero Showcase Interactive Power Switcher ---
window.heroShowcaseData = {
    '6': {
        img: 'assets/images/hero-kit-6kwt-trans.webp',
        title: { ua: '6 кВт·год', ru: '6 кВт·ч' },
        price: '55 000 ₴',
        sub: { ua: 'Ідеально для резерву квартири', ru: 'Идеально для резерва квартиры' },
        bullets: {
            ua: ['Квартира', 'Котел', 'Холодильник', 'Інтернет'],
            ru: ['Квартира', 'Котел', 'Холодильник', 'Интернет']
        }
    },
    '12': {
        img: 'assets/images/hero-kit-12kwt-trans.webp',
        title: { ua: '12 кВт·год', ru: '12 кВт·ч' },
        price: '96 000 ₴',
        sub: { ua: 'Квартира та невеликий будинок', ru: 'Квартира и небольшой дом' },
        bullets: {
            ua: ['Квартира', 'Невеликий будинок', 'Котел', 'Холодильник', 'Інтернет'],
            ru: ['Квартира', 'Небольшой дом', 'Котел', 'Холодильник', 'Интернет']
        }
    },
    '24': {
        img: 'assets/images/hero-kit-24kwt-trans.webp',
        title: { ua: '24 кВт·год', ru: '24 кВт·ч' },
        price: '168 300 ₴',
        sub: { ua: 'Масштабований резерв будинку', ru: 'Масштабируемый резерв дома' },
        bullets: {
            ua: ['Великий будинок', 'Тепловий насос', 'Кондиціонування', 'Критичні системи'],
            ru: ['Большой дом', 'Тепловой насос', 'Кондиционирование', 'Критические системы']
        }
    },
    '36': {
        img: 'assets/images/hero-kit-36kwt-trans.webp',
        title: { ua: '36 кВт·год', ru: '36 кВт·ч' },
        price: '247 500 ₴',
        sub: { ua: 'Рішення для бізнесу', ru: 'Решение для бизнеса' },
        bullets: {
            ua: ['Офіс', 'Комерційна будівля', 'Сервери', 'Підтримка бізнес-процесів'],
            ru: ['Офис', 'Коммерческое здание', 'Серверы', 'Поддержка бизнес-процессов']
        }
    }
};

window.currentHeroPower = '6';

window.selectHeroPower = function(p) {
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
    const lang = localStorage.getItem('svitlo24_lang') || document.documentElement.lang || 'ua';

    const imgEl = document.getElementById('hero-showcase-img');
    const titleEl = document.getElementById('hero-spec-title');
    const subEl = document.getElementById('hero-spec-sub');
    const priceEl = document.getElementById('hero-spec-price');
    const listEl = document.getElementById('hero-spec-list');

    if (imgEl) {
        imgEl.style.opacity = '0';
        imgEl.style.transform = 'scale(0.96)';
        setTimeout(() => {
            imgEl.src = data.img;
            imgEl.style.opacity = '1';
            imgEl.style.transform = 'scale(1)';
        }, 80);
    }

    if (titleEl) titleEl.textContent = typeof data.title === 'object' ? (data.title[lang] || data.title.ua) : data.title;
    if (subEl) subEl.textContent = typeof data.sub === 'object' ? (data.sub[lang] || data.sub.ua) : data.sub;
    if (priceEl) priceEl.textContent = data.price;

    if (listEl && data.bullets) {
        const bullets = data.bullets[lang] || data.bullets.ua || [];
        listEl.innerHTML = bullets.map(b => `
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
    // --- 0.0 i18n Localization Engine (UA / RU) ---
    const translations = {
        ua: {
            'nav.autonomy': 'Автономність',
            'nav.calculator': 'Калькулятор',
            'nav.packages': 'Комплекти',
            'header.grid_status': 'Мережа: 230V 50Hz',
            'header.btn_order': 'Замовити розрахунок',
            'hero.badge': 'Резервне живлення під ключ з гарантією',
            'hero.title_1': 'Автономна енергосистема.',
            'hero.title_2': 'Забудьте про відключення світла',
                        'hero.metric_1_val': '< 4 мс',
            'hero.metric_1_lbl': 'Миттєве перемикання',
            'hero.metric_2_val': '1 день',
            'hero.metric_2_lbl': 'Швидка доставка',
            'hero.metric_3_val': '15+ років',
            'hero.metric_3_lbl': 'Термін служби',
            'hero.visual_title': 'Схема потоків енергії',
            'hero.grid_active': 'Мережа 220V: АКТИВНА',
            'hero.grid_blackout': 'Мережа 220V: АВАРІЯ (БЛЕКАУТ)',
            'hero.node_grid': 'Мережа 220V',
            'hero.node_inverter': 'Інвертор 6кВт',
            'hero.node_battery': 'LiFePO4 5.12кВт·год',
            'hero.node_home': 'Навантаження дому',
            'hero.btn_outage': 'Симулювати відключення мережі',
            'hero.btn_restore': 'Відновити мережу 220V',
            'hero.tag_hit': '🔥 ХІТ ПРОДАЖІВ',
            'hero.tag_warranty': '🛡️ Гарантія 5 років',
            'hero.card_title': 'Комплект «Комфорт 6 кВт»',
            'hero.card_sub': 'Інвертор 6 кВт + Акумулятор LiFePO4 5.12 кВт·год',
            'hero.pill_1': 'Автономність',
            'hero.pill_2': 'Перемикання',
            'hero.pill_3': 'Циклів LiFePO4',
            'hero.bullet_1': 'Живить котел, холодильник, Wi-Fi, світло та ТВ',
            'hero.bullet_2': 'Безкоштовна консультація',
            'hero.bullet_3': 'Безкоштовна доставка',
            'hero.btn_callback': 'Отримати консультацію',
            'hero.btn_other_packages': 'Інші комплекти',
            'hero.microtext': '🔒 Консультація та підбір під ваш бюджет — безкоштовно',
            'house.title': 'Як працює автономність у вашому будинку',
            'house.subtitle': 'Перемикайте режим нижче, щоб побачити захист кімнат при збої мережі.',
            'house.mode_rezerv': 'Режим: Резерв 230V',
            'house.mode_blackout': 'Режим: Блекаут 0V',
            'calc.title': 'Калькулятор часу автономності',
            'calc.subtitle': 'Оберіть прилади, які мають працювати під час відключення світла, щоб розрахувати необхідний запас енергії.',
            'calc.appliances_title': 'Ваші пріоритетні прилади:',
            'calc.appliance_1': 'Двокамерний холодильник',
            'calc.appliance_2': 'Газовий котел + Насос опалення',
            'calc.appliance_3': 'Інтернет-роутер + Освітлення (LED)',
            'calc.appliance_4': 'Робочий ПК + 2 Монитори',
            'calc.appliance_5': 'Кондиціонер / Клімат-контроль',
            'calc.total_load': 'Сумарне навантаження:',
            'calc.autonomy_time': 'Очікуваний час автономності:',
            'calc.battery_base': 'на базі акумулятора LiFePO4 5.12 кВт·год (48V 100Ah)',
            'calc.rec_title': 'Рекомендований комплект:',
            'calc.btn_order': 'Замовити цей комплект',
            'pkg.title': 'Готові комплекти автономності',
            'pkg.subtitle': 'Підібрані рішення для квартир, котеджів та бізнесу з гарантією 5 років та оперативною доставкою.',
            'pkg.badge_featured': 'Хіт продажів',
            'pkg.badge_1': 'Квартира / Офіс',
            'pkg.badge_2': 'Будинок / Котедж',
            'pkg.badge_3': 'Заміський будинок / Бізнес',
            'pkg.photo_slot': 'Місце під фото комплекту',
            'pkg.spec_power': 'Потужність',
            'pkg.spec_cap': 'Ємність LiFePO4',
            'pkg.spec_time': 'Час роботи',
            'pkg.save_1': '-15% Економія 26 000 ₴',
            'pkg.save_2': '-14% Економія 40 000 ₴',
            'pkg.save_3': '-14% Економія 50 000 ₴',
            'pkg.name_1': 'Комфорт 6 кВт',
            'pkg.name_2': 'Оптима 12 кВт',
            'pkg.name_3': 'Максимум 15 кВт',
            'pkg.p1_f1': 'Гібридний Інвертор 6 кВт (Чистий синус)',
            'pkg.p1_f2': 'Батарея LiFePO4 5.12 кВт·год (100Ah 48V)',
            'pkg.p1_f3': 'До 5–8 годин повної автономності',
            'pkg.p2_f1': 'Гібридний Інвертор 12 кВт',
            'pkg.p2_f2': 'Батарея LiFePO4 10.24 кВт·год',
            'pkg.p2_f3': 'До 12–24+ годин живлення дому',
            'pkg.p3_f1': 'Трифазний Інвертор 15 кВт',
            'pkg.p3_f2': '3x Батареї LiFePO4 (15.36 кВт·год)',
            'pkg.p3_f3': 'До 48 годин автономної роботи',
            'pkg.btn_order_discount': 'Замовити зі знижкою',
            'pkg.swipe_hint': '👉 Свайпайте ліворуч / праворуч для вибору',
            'modal.label_name': 'Ваше імʼя',
            'modal.ph_name': 'Іван',
            'modal.label_phone': 'Телефон для звʼязку',
            'modal.label_package': 'Обраний комплект',
            'modal.btn_submit': 'Отримати розрахунок',
            'callback.badge': 'Безкоштовна консультація інженера',
            'callback.title': 'Отримайте індивідуальний розрахунок автономності',
            'callback.desc': 'Залиште номер — наш інженер безкоштовно підбере комплект інвертора та LiFePO4 акумулятора під ваші прилади та бюджет.',
            'callback.pill_1': '⚡ Швидка доставка по Україні',
            'callback.pill_2': '📞 Підбір та консультація 0 грн',
            'callback.pill_3': '🛡️ Гарантія 5 років',
            'callback.ph_name': 'Ваше імʼя',
            'callback.btn_submit': 'Отримати безкоштовну консультацію',
            'callback.privacy': '🔒 Ваші дані захищені. Без спаму та нав\'язливих дзвінків.',
            'callback.seo_title': 'Надійна автономність та резервне живлення для вашого будинку',
            'callback.seo_text': 'Компанія SVITLO24 є офіційним постачальником готових комплектів резервного живлення: гібридних інверторів (6 кВт, 12 кВт, 15 кВт) та надійних LiFePO4 акумуляторів з ресурсом понад 6000 циклів. Ми надаємо професійну технічну консультацію, точно підбираємо обладнання під навантаження вашого будинку та забезпечуємо оперативну доставку та офіційну гарантію по всій Україні.',
            'footer.coverage': 'Працюємо по всій Україні 🇺🇦',
            'footer.copyright': '© 2026 SVITLO24. Всі права захищені.',
            'drawer.sub_1': 'Симуляція живлення приладів',
            'drawer.sub_2': 'Розрахунок часу автономії',
            'drawer.sub_3': 'Готові інвертори + акумулятори',
            'drawer.phone_lbl': '📞 Натисніть для безкоштовного дзвінка',
            'pm.acc_title': '📦 Входить до комплектації:',
            'pm.sel_pkg': 'Лінійка систем:',
            'pm.sel_model': 'Модельний ряд:',
            'pm.kpi_power': 'Потужність',
            'pm.kpi_capacity': 'Ємність',
            'pm.kpi_cycles': 'Ресурс',
            'pm.sec_electrical': '⚡ Електричні параметри',
            'pm.lbl_voltage': 'Номінальна напруга:',
            'pm.lbl_energy': 'Номінальна енергія:',
            'pm.lbl_capacity': 'Ємність батареї:',
            'pm.lbl_current': 'Струм (Номін. / Заряд / Розряд):',
            'pm.sec_performance': '🔋 Акумулятор та надійність',
            'pm.lbl_cycles': 'Життєвий цикл:',
            'pm.lbl_scaling': 'Масштабованість / PV вхід:',
            'pm.lbl_temp': 'Робоча температура:',
            'pm.sec_physical': '📐 Конструкція та стандарти',
            'pm.lbl_dim': 'Розміри виробу (ШхВхГ):',
            'pm.lbl_weight': 'Вага комплекту:',
            'pm.lbl_ports': 'Порти зв\'язку & BMS:',
            'pm.lbl_certs': 'Сертифікація:',
            'pm.lbl_montage': 'Монтаж & Ступінь захисту:',
            'pm.price_lbl': 'Офіційна ціна:',
            'pm.btn_order': 'Замовити розрахунок'
        },
        ru: {
            'nav.autonomy': 'Автономия',
            'nav.calculator': 'Калькулятор',
            'nav.packages': 'Комплекты',
            'header.grid_status': 'Сеть: 230V 50Hz',
            'header.btn_order': 'Заказать расчет',
            'hero.badge': 'Резервное питание под ключ с гарантией',
            'hero.title_1': 'Автономная энергосистема.',
            'hero.title_2': 'Забудьте об отключениях света',
            'hero.description': 'Готовые комплекты «инвертор + аккумулятор» с доставкой. Автоматически питает технику, защищает от скачков напряжения и работает бесшумно.',
            'hero.metric_1_val': '< 4 мс',
            'hero.metric_1_lbl': 'Мгновенное переключение',
            'hero.metric_2_val': '1 день',
            'hero.metric_2_lbl': 'Быстрая доставка',
            'hero.metric_3_val': '15+ лет',
            'hero.metric_3_lbl': 'Срок службы',
            'hero.visual_title': 'Схема потоков энергии',
            'hero.grid_active': 'Сеть 220V: АКТИВНА',
            'hero.grid_blackout': 'Сеть 220V: АВАРИЯ (БЛЭКАУТ)',
            'hero.node_grid': 'Сеть 220V',
            'hero.node_inverter': 'Инвертор 6кВт',
            'hero.node_battery': 'LiFePO4 5.12кВт·ч',
            'hero.node_home': 'Нагрузка дома',
            'hero.btn_outage': 'Симулировать отключение сети',
            'hero.btn_restore': 'Восстановить сеть 220V',
            'hero.tag_hit': '🔥 ХИТ ПРОДАЖ',
            'hero.tag_warranty': '🛡️ Гарантия 5 лет',
            'hero.card_title': 'Комплект «Комфорт 6 кВт»',
            'hero.card_sub': 'Инвертор 6 кВт + Аккумулятор LiFePO4 5.12 кВт·ч',
            'hero.pill_1': 'Автономия',
            'hero.pill_2': 'Переключение',
            'hero.pill_3': 'Циклов LiFePO4',
            'hero.bullet_1': 'Питает котел, холодильник, Wi-Fi, свет и ТВ',
            'hero.bullet_2': 'Бесплатная консультация',
            'hero.bullet_3': 'Бесплатная доставка',
            'hero.btn_callback': 'Получить консультацию',
            'hero.btn_other_packages': 'Другие комплекты',
            'hero.microtext': '🔒 Консультация и подбор под ваш бюджет — бесплатно',
            'house.title': 'Как работает автономия в вашем доме',
            'house.subtitle': 'Переключите режим ниже, чтобы увидеть защиту комнат при сбое сети.',
            'house.mode_rezerv': 'Режим: Резерв 230V',
            'house.mode_blackout': 'Режим: Блэкаут 0V',
            'calc.title': 'Калькулятор времени автономии',
            'calc.subtitle': 'Выберите приборы, которые должны работать во время отключения света, чтобы рассчитать необходимый запас энергии.',
            'calc.appliances_title': 'Ваши приоритетные приборы:',
            'calc.appliance_1': 'Двухкамерный холодильник',
            'calc.appliance_2': 'Газовый котел + Насос отопления',
            'calc.appliance_3': 'Интернет-роутер + Освещение (LED)',
            'calc.appliance_4': 'Рабочий ПК + 2 Монитора',
            'calc.appliance_5': 'Кондиционер / Климат-контроль',
            'calc.total_load': 'Суммарная нагрузка:',
            'calc.autonomy_time': 'Ожидаемое время автономии:',
            'calc.battery_base': 'на базе аккумулятора LiFePO4 5.12 кВт·ч (48V 100Ah)',
            'calc.rec_title': 'Рекомендуемый комплект:',
            'calc.btn_order': 'Заказать этот комплект',
            'pkg.title': 'Готовые комплекты автономии',
            'pkg.subtitle': 'Подобранные решения для квартир, коттеджей и бизнеса с гарантией 5 лет и оперативной доставкой.',
            'pkg.badge_featured': 'Хит продаж',
            'pkg.badge_1': 'Квартира / Офис',
            'pkg.badge_2': 'Дом / Коттедж',
            'pkg.badge_3': 'Загородный дом / Бизнес',
            'pkg.photo_slot': 'Место под фото комплекта',
            'pkg.spec_power': 'Мощность',
            'pkg.spec_cap': 'Емкость LiFePO4',
            'pkg.spec_time': 'Время работы',
            'pkg.save_1': '-15% Экономия 26 000 ₴',
            'pkg.save_2': '-14% Экономия 40 000 ₴',
            'pkg.save_3': '-14% Экономия 50 000 ₴',
            'pkg.name_1': 'Комфорт 6 кВт',
            'pkg.name_2': 'Оптима 12 кВт',
            'pkg.name_3': 'Максимум 15 кВт',
            'pkg.p1_f1': 'Гибридный Инвертор 6 кВт (Чистый синус)',
            'pkg.p1_f2': 'Батарея LiFePO4 5.12 кВт·ч (100Ah 48V)',
            'pkg.p1_f3': 'До 5–8 часов полной автономии',
            'pkg.p2_f1': 'Гибридный Инвертор 12 кВт',
            'pkg.p2_f2': 'Батарея LiFePO4 10.24 кВт·ч',
            'pkg.p2_f3': 'До 12–24+ часов питания дома',
            'pkg.p3_f1': 'Трехфазный Инвертор 15 кВт',
            'pkg.p3_f2': '3x Батареи LiFePO4 (15.36 кВт·ч)',
            'pkg.p3_f3': 'До 48 часов автономной работы',
            'pkg.btn_order_discount': 'Заказать со скидкой',
            'pkg.swipe_hint': '👉 Свайпайте влево / вправо для выбора',
            'modal.title': 'Расчет автономной системы',
            'modal.subtitle': 'Оставьте контакты, и наш инженер подберет оптимальный инвертор и батарею под ваши приборы.',
            'modal.label_name': 'Ваше имя',
            'modal.ph_name': 'Иван',
            'modal.label_phone': 'Телефон для связи',
            'modal.label_package': 'Выбранный комплект',
            'modal.btn_submit': 'Получить расчет',
            'callback.badge': 'Бесплатная консультация инженера',
            'callback.title': 'Получите индивидуальный расчет автономии',
            'callback.desc': 'Оставьте номер — инженер бесплатно подберет комплект инвертора и LiFePO4 аккумулятора под ваши приборы и бюджет.',
            'callback.pill_1': '⚡ Быстрая доставка по Украине',
            'callback.pill_2': '📞 Подбор и консультация 0 грн',
            'callback.pill_3': '🛡️ Гарантия 5 лет',
            'callback.ph_name': 'Ваше имя',
            'callback.btn_submit': 'Получить бесплатную консультацию',
            'callback.privacy': '🔒 Ваши данные защищены. Без спама и навязчивых звонков.',
            'callback.seo_title': 'Надежная автономия и резервное питание для вашего дома',
            'callback.seo_text': 'Компания SVITLO24 является официальным поставщиком готовых комплектов резервного питания: гибридных инверторов (6 кВт, 12 кВт, 15 кВт) и надежных LiFePO4 аккумуляторов с ресурсом более 6000 циклов. Мы предоставляем профессиональную техническую консультацию, точно подбираем оборудование под нагрузку вашего дома и обеспечиваем оперативную доставку и официальную гарантию по всей Украине.',
            'footer.coverage': 'Работаем по всей Украине 🇺🇦',
            'footer.copyright': '© 2026 SVITLO24. Все права защищены.',
            'drawer.sub_1': 'Симуляция питания приборов',
            'drawer.sub_2': 'Расчет времени автономии',
            'drawer.sub_3': 'Готовые инверторы + аккумуляторы',
            'drawer.phone_lbl': '📞 Нажмите для бесплатного звонка',
            'pm.acc_title': '📦 Входит в комплектацию:',
            'pm.sel_pkg': 'Линейка систем:',
            'pm.sel_model': 'Модельный ряд:',
            'pm.kpi_power': 'Мощность',
            'pm.kpi_capacity': 'Емкость',
            'pm.kpi_cycles': 'Ресурс',
            'pm.sec_electrical': '⚡ Электрические параметры',
            'pm.lbl_voltage': 'Номинальное напряжение:',
            'pm.lbl_energy': 'Номинальная энергия:',
            'pm.lbl_capacity': 'Емкость батареи:',
            'pm.lbl_current': 'Ток (Номин. / Заряд / Разряд):',
            'pm.sec_performance': '🔋 Аккумулятор и надежность',
            'pm.lbl_cycles': 'Жизненный цикл:',
            'pm.lbl_scaling': 'Масштабируемость / PV вход:',
            'pm.lbl_temp': 'Рабочая температура:',
            'pm.sec_physical': '📐 Конструкция и стандарты',
            'pm.lbl_dim': 'Размеры изделия (ШхВхГ):',
            'pm.lbl_weight': 'Вес комплекта:',
            'pm.lbl_ports': 'Порты связи & BMS:',
            'pm.lbl_certs': 'Сертификация:',
            'pm.lbl_montage': 'Монтаж & Степень защиты:',
            'pm.price_lbl': 'Официальная цена:',
            'pm.btn_order': 'Заказать расчет'
        }
    };

    let currentLang = localStorage.getItem('svitlo24_lang') || 'ua';

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('svitlo24_lang', lang);
        document.documentElement.lang = (lang === 'ua' || lang === 'uk') ? 'uk' : lang;

        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

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
    };

    document.addEventListener('click', (e) => {
        const langBtn = e.target.closest('.lang-btn');
        if (langBtn) {
            e.preventDefault();
            const lang = langBtn.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
            }
        }
    });

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

            // Ignore language switcher buttons inside drawer if any
            if (linkOrBtn.classList.contains('lang-btn')) return;

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
            const time = Date.now() * 0.0007;

            // 1. Bright 3D undulating energy ribbon waves across the screen
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

            // 2. Plexus Network Connections between nearby particles
            for (let i = 0; i < bgParticles.length; i++) {
                const p1 = bgParticles[i];
                for (let j = i + 1; j < bgParticles.length; j++) {
                    const p2 = bgParticles[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 120) {
                        const connAlpha = (1 - dist / 120) * 0.28;
                        bgCtx.beginPath();
                        bgCtx.moveTo(p1.x, p1.y);
                        bgCtx.lineTo(p2.x, p2.y);
                        bgCtx.strokeStyle = isOutage 
                            ? `rgba(16, 185, 129, ${connAlpha})` 
                            : `rgba(2, 132, 199, ${connAlpha})`;
                        bgCtx.lineWidth = 1.1;
                        bgCtx.stroke();
                    }
                }
            }

            // 3. Floating Light Particles with subtle interactive avoidance
            bgParticles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * 1.4;
                    p.y -= Math.sin(angle) * 1.4;
                }

                if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;

                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                bgCtx.fillStyle = isOutage ? '#059669' : p.color;
                bgCtx.globalAlpha = Math.min(1, p.alpha * 1.6);
                bgCtx.fill();
                bgCtx.globalAlpha = 1.0;
            });

            // 4. Ripple energy pulses
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
    let initComets = () => {};

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

        initComets = function() {
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

            const restoreText = currentLang === 'ua' ? 'Відновити міську мережу 220V' : 'Восстановить городскую сеть';
            const outageText = currentLang === 'ua' ? 'Симулювати відключення мережі' : 'Симулировать отключение сети';

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
                    gridStatusText.textContent = currentLang === 'ua' ? 'Мережа 220V: АВАРІЯ (БЛЕКАУТ)' : 'Сеть 220V: БЛЭКАУТ';
                    gridStatusText.classList.add('outage');
                }
                if (globalStatusPill) {
                    globalStatusPill.classList.add('outage');
                    globalStatusPill.innerHTML = `<span class="status-dot"></span> Блэкаут (Резерв LiFePO4 100%)`;
                }
                if (cursorGlow) cursorGlow.classList.add('outage-mode');
                if (nodeGrid) nodeGrid.style.opacity = '0.35';

                // Update House Room Cards to Blackout Protection state
                const resBadgeText = currentLang === 'ua' ? 'LiFePO4 0мс' : 'LiFePO4 0мс';
                if (badgeBoiler) badgeBoiler.textContent = resBadgeText;
                if (badgeKitchen) badgeKitchen.textContent = resBadgeText;
                if (badgeOffice) badgeOffice.textContent = resBadgeText;
                if (badgeLiving) badgeLiving.textContent = resBadgeText;

                if (descBoiler) descBoiler.textContent = currentLang === 'ua' ? 'Котел під захистом' : 'Котел под защитой';
                if (descKitchen) descKitchen.textContent = currentLang === 'ua' ? 'Морозилка працює' : 'Морозилка работает';
                if (descOffice) descOffice.textContent = currentLang === 'ua' ? 'Wi-Fi 100% ONLINE' : 'Wi-Fi 100% ONLINE';
                if (descLiving) descLiving.textContent = currentLang === 'ua' ? 'Автономне світло' : 'Автономный свет';

                const toastMsg = currentLang === 'ua' ? 'Сбій мережі! Резервна система LiFePO4 підхопила живлення за 0 мс.' : 'Сбой сети! Резервная система LiFePO4 подхватила питание за 0 мс.';
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
                    gridStatusText.textContent = currentLang === 'ua' ? 'Мережа 220V: АКТИВНА' : 'Сеть 220V: АКТИВНА';
                    gridStatusText.classList.remove('outage');
                }
                if (globalStatusPill) {
                    globalStatusPill.classList.remove('outage');
                    globalStatusPill.innerHTML = `<span class="status-dot"></span> Сеть: 230V 50Hz`;
                }
                if (cursorGlow) cursorGlow.classList.remove('outage-mode');
                if (nodeGrid) nodeGrid.style.opacity = '1';

                // Restore House Room Cards to Normal Grid state
                const okBadgeText = '230V OK';
                if (badgeBoiler) badgeBoiler.textContent = okBadgeText;
                if (badgeKitchen) badgeKitchen.textContent = okBadgeText;
                if (badgeOffice) badgeOffice.textContent = okBadgeText;
                if (badgeLiving) badgeLiving.textContent = okBadgeText;

                if (descBoiler) descBoiler.textContent = currentLang === 'ua' ? 'Котел і насоси (24°C)' : 'Котел и насосы (24°C)';
                if (descKitchen) descKitchen.textContent = currentLang === 'ua' ? 'Холодильник OK' : 'Холодильник OK';
                if (descOffice) descOffice.textContent = currentLang === 'ua' ? 'Wi-Fi роутер & ПК' : 'Wi-Fi роутер & ПК';
                if (descLiving) descLiving.textContent = currentLang === 'ua' ? 'Світло & ТВ' : 'Свет & ТВ';

                const toastMsg = currentLang === 'ua' ? 'Мережу відновлено. Інвертор перейшов у режим автозарядки.' : 'Сеть восстановлена. Инвертор перешел в режим автозарядки.';
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

        if (totalWattsEl) totalWattsEl.textContent = totalWatts;

        // Select suitable package from the 3 models on sale (6 kW, 12 kW, 15 kW)
        let batteryWh = 5120;
        let selectedPackageCode = 'Комплект 6 кВт';
        let recTitleText = '';
        let subtextText = '';

        if (totalWatts > 1500) {
            batteryWh = 15360;
            selectedPackageCode = 'Комплект 15 кВт';
            recTitleText = currentLang === 'ua'
                ? 'Комплект «Максимум 15 кВт» (Трифазний Інвертор 15кВт + 3x Батареї 15.36кВт·год)'
                : 'Комплект «Максимум 15 кВт» (Трехфазный Инвертор 15кВт + 3x Батареи 15.36кВт·ч)';
            subtextText = currentLang === 'ua'
                ? 'на базі 3x акумуляторів LiFePO4 (15.36 кВт·год)'
                : 'на базе 3x аккумуляторов LiFePO4 (15.36 кВт·ч)';
        } else if (totalWatts > 600) {
            batteryWh = 10240;
            selectedPackageCode = 'Комплект 12 кВт';
            recTitleText = currentLang === 'ua'
                ? 'Комплект «Оптима 12 кВт» (Гібридний Інвертор 12кВт + Батарея 10.24кВт·год)'
                : 'Комплект «Оптима 12 кВт» (Гибридный Инвертор 12кВт + Батарея 10.24кВт·ч)';
            subtextText = currentLang === 'ua'
                ? 'на базі 2x акумуляторів LiFePO4 (10.24 кВт·год)'
                : 'на базе 2x аккумуляторов LiFePO4 (10.24 кВт·ч)';
        } else {
            batteryWh = 5120;
            selectedPackageCode = 'Комплект 6 кВт';
            recTitleText = currentLang === 'ua'
                ? 'Комплект «Комфорт 6 кВт» (Гібридний Інвертор 6кВт + Батарея 5.12кВт·год)'
                : 'Комплект «Комфорт 6 кВт» (Гибридный Инвертор 6кВт + Батарея 5.12кВт·ч)';
            subtextText = currentLang === 'ua'
                ? 'на базі акумулятора LiFePO4 5.12 кВт·год (48V 100Ah)'
                : 'на базе аккумулятора LiFePO4 5.12 кВт·ч (48V 100Ah)';
        }

        const unitText = currentLang === 'ua' ? 'годин' : 'часов';
        if (runtimeHoursEl) {
            if (totalWatts === 0) {
                runtimeHoursEl.innerHTML = `&infin; <span class="unit">${unitText}</span>`;
            } else {
                const hours = ((batteryWh * 0.9) / totalWatts).toFixed(1);
                runtimeHoursEl.innerHTML = `${hours} <span class="unit">${unitText}</span>`;
            }
        }

        if (batterySubtextEl) {
            batterySubtextEl.textContent = subtextText;
        }

        if (recPackageTitle) {
            recPackageTitle.textContent = recTitleText;
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

    function openModal(packageName = 'Комплект 6 кВт') {
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
                const powers = ['15', '12', '6', '10', '5', '3'];
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

    window.openModal = openModal;
    window.closeModal = closeModal;

    // Formatting phone input numbers inside phone-input-group (e.g., 67 632 34 44)
    function attachPhoneFormatter(inputEl) {
        if (!inputEl) return;

        const group = inputEl.closest('.phone-input-group');

        const formatValue = () => {
            if (group) group.classList.remove('is-invalid');
            inputEl.classList.remove('is-invalid');

            let raw = inputEl.value;
            let digits = raw.replace(/\D/g, '');

            if (digits.startsWith('380')) {
                digits = digits.substring(3);
            } else if (digits.startsWith('0')) {
                digits = digits.substring(1);
            }
            digits = digits.substring(0, 9);

            let formatted = '';
            if (digits.length > 0) formatted += digits.substring(0, 2);
            if (digits.length >= 3) formatted += ' ' + digits.substring(2, 5);
            if (digits.length >= 6) formatted += ' ' + digits.substring(5, 7);
            if (digits.length >= 8) formatted += ' ' + digits.substring(7, 9);

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
            const packName = orderBtn.getAttribute('data-pack') || (recPackageTitle ? recPackageTitle.textContent : 'Комфорт 5 кВт');
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
        const telNumber = cleanDigits.startsWith('380') ? '+' + cleanDigits : (cleanDigits.startsWith('0') ? '+38' + cleanDigits : '+380' + cleanDigits);
        return `<a href="tel:${telNumber}">${phoneStr}</a>`;
    }

    async function sendToTelegram(messageText) {
        const config = window.SVITLO24_TELEGRAM_CONFIG || {};
        const botToken = config.botToken || '';
        const chatId = config.chatId || '';

        if (!botToken || botToken === 'YOUR_TELEGRAM_BOT_TOKEN' || !chatId || chatId === 'YOUR_TELEGRAM_CHAT_ID') {
            console.log('[Telegram Bot Payload (Mock Mode)]', messageText);
            return true;
        }
        try {
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText,
                    parse_mode: 'HTML'
                })
            });
            return res.ok;
        } catch (err) {
            console.error('[Telegram Bot Error]', err);
            return false;
        }
    }

    // Anti-Spam Cooldown & Honeypot Protection
    const SPAM_COOLDOWN_MS = 30000;

    function checkSpamRateLimit() {
        const lastSubmit = localStorage.getItem('svitlo24_last_submit');
        const now = Date.now();
        if (lastSubmit && (now - parseInt(lastSubmit, 10)) < SPAM_COOLDOWN_MS) {
            const remainingSec = Math.ceil((SPAM_COOLDOWN_MS - (now - parseInt(lastSubmit, 10))) / 1000);
            return remainingSec;
        }
        return 0;
    }

    function recordSubmitTime() {
        localStorage.setItem('svitlo24_last_submit', Date.now().toString());
    }

    function validateUkrainianPhone(phoneStr) {
        const cleanDigits = phoneStr.replace(/\D/g, '');
        return cleanDigits.length === 12 && cleanDigits.startsWith('380');
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
                const msg = currentLang === 'ua'
                    ? `Зачекайте ${cooldownSec} сек. перед повторною відправкою заявки.`
                    : `Подождите ${cooldownSec} сек. перед повторной отправкой заявки.`;
                showToast(msg);
                return;
            }

            const phoneInput = document.getElementById('form-phone');
            const nameInput = document.getElementById('form-name');
            const packageInput = document.getElementById('form-package');

            const rawDigits = phoneInput ? phoneInput.value : '';
            const fullPhone = '+380 ' + rawDigits;
            const nameVal = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Не вказано';
            const packageVal = packageInput ? packageInput.value : 'Комплект 6 кВт';

            const phoneGroup = phoneInput ? phoneInput.closest('.phone-input-group') : null;

            if (!validateUkrainianPhone(fullPhone)) {
                if (phoneGroup) phoneGroup.classList.add('is-invalid');
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const errMsg = currentLang === 'ua'
                    ? 'Введіть реальний номер телефону України'
                    : 'Введите реальный номер телефона Украины';
                showToast(errMsg);
                return;
            }

            if (phoneGroup) phoneGroup.classList.remove('is-invalid');
            if (phoneInput) phoneInput.classList.remove('is-invalid');
            closeModal();
            recordSubmitTime();

            const msgText = `⚡ <b>Нова заявка на розрахунок!</b>\n\n` +
                `👤 <b>Ім'я:</b> ${nameVal}\n` +
                `📞 <b>Телефон:</b> ${fullPhone}\n` +
                `📦 <b>Обраний комплект:</b> ${packageVal}`;

            sendToTelegram(msgText);

            const msg = currentLang === 'ua' 
                ? 'Заявку успішно надіслано! Менеджер зателефонує вам протягом 5 хвилин.' 
                : 'Заявка успешно отправлена! Менеджер перезвонит вам в течение 5 минут.';
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
                const msg = currentLang === 'ua'
                    ? `Зачекайте ${cooldownSec} сек. перед повторною відправкою заявки.`
                    : `Подождите ${cooldownSec} сек. перед повторной отправкой заявки.`;
                showToast(msg);
                return;
            }

            const phoneInput = document.getElementById('cb-phone');
            const nameInput = document.getElementById('cb-name');

            const rawDigits = phoneInput ? phoneInput.value : '';
            const fullPhone = '+380 ' + rawDigits;
            const nameVal = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Не вказано';

            const phoneGroup = phoneInput ? phoneInput.closest('.phone-input-group') : null;

            if (!validateUkrainianPhone(fullPhone)) {
                if (phoneGroup) phoneGroup.classList.add('is-invalid');
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const errMsg = currentLang === 'ua'
                    ? 'Введіть реальний номер телефону України'
                    : 'Введите реальный номер телефона Украины';
                showToast(errMsg);
                return;
            }

            if (phoneGroup) phoneGroup.classList.remove('is-invalid');
            if (phoneInput) phoneInput.classList.remove('is-invalid');
            recordSubmitTime();

            const msgText = `📞 <b>Заявка на звонок інженера!</b>\n\n` +
                `👤 <b>Ім'я:</b> ${nameVal}\n` +
                `📞 <b>Телефон:</b> ${fullPhone}`;

            sendToTelegram(msgText);

            const msg = currentLang === 'ua'
                ? 'Дякуємо! Інженер зателефонує вам протягом 5 хвилин.'
                : 'Спасибо! Инженер перезвонит вам в течение 5 минут.';
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
            const fullPhone = '+380 ' + rawDigits;
            const phoneGroup = phoneInput ? phoneInput.closest('.phone-input-group') : null;

            if (!validateUkrainianPhone(fullPhone)) {
                if (phoneGroup) phoneGroup.classList.add('is-invalid');
                if (phoneInput) {
                    phoneInput.classList.add('is-invalid');
                    phoneInput.focus();
                }
                const errMsg = currentLang === 'ua'
                    ? 'Введіть реальний номер телефону України'
                    : 'Введите реальный номер телефона Украины';
                showToast(errMsg);
                return;
            }

            if (phoneGroup) phoneGroup.classList.remove('is-invalid');
            if (phoneInput) phoneInput.classList.remove('is-invalid');
            recordSubmitTime();

            const msgText = `🔥 <b>Нова заявка на консультацію (Хіт 6 кВт)!</b>\n\n` +
                `📞 <b>Телефон:</b> ${fullPhone}`;

            sendToTelegram(msgText);

            const msg = currentLang === 'ua'
                ? 'Заявку прийнято! Інженер зателефонує вам протягом 5 хвилин.'
                : 'Заявка принята! Инженер перезвонит вам в течение 5 минут.';
            showToast(msg);
            heroQuickForm.reset();
        });
    }

    const heroOtherPkgsBtn = document.getElementById('hero-other-pkgs-btn');
    if (heroOtherPkgsBtn) {
        heroOtherPkgsBtn.addEventListener('click', (e) => {
            const phoneInput = document.getElementById('hero-phone-field');
            const rawDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

            // If user filled in a phone number before clicking "Other Packages"
            if (rawDigits.length >= 3) {
                const fullPhone = '+380 ' + (phoneInput ? phoneInput.value : '');
                const msgText = `🔍 <b>Клієнт переглянув інші комплекти (зі збереженням контакту)!</b>\n\n` +
                    `📞 <b>Залишений телефон:</b> ${fullPhone}`;
                
                sendToTelegram(msgText);
                const toastMsg = currentLang === 'ua'
                    ? 'Дякуємо! Контакт збережено, дивіться інші комплекти.'
                    : 'Спасибо! Контакт сохранен, смотрите другие комплекты.';
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

    // --- 16.0 Mobile Packages Carousel Sync ---
    const pkgGrid = document.querySelector('.packages-grid');
    const pkgPrevBtn = document.getElementById('pkg-prev-btn');
    const pkgNextBtn = document.getElementById('pkg-next-btn');
    const pkgDots = document.querySelectorAll('.pkg-dot');

    if (pkgGrid) {
        const cards = pkgGrid.querySelectorAll('.package-card');
        
        const updateDots = () => {
            if (!cards.length) return;
            const scrollLeft = pkgGrid.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 16;
            const activeIdx = Math.min(cards.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
            pkgDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIdx);
            });
        };

        pkgGrid.addEventListener('scroll', updateDots, { passive: true });

        if (pkgPrevBtn) {
            pkgPrevBtn.addEventListener('click', () => {
                pkgGrid.scrollBy({ left: -(pkgGrid.offsetWidth * 0.85), behavior: 'smooth' });
            });
        }

        if (pkgNextBtn) {
            pkgNextBtn.addEventListener('click', () => {
                pkgGrid.scrollBy({ left: pkgGrid.offsetWidth * 0.85, behavior: 'smooth' });
            });
        }

        pkgDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                if (cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        });
    }

    // --- 17.0 Unified Product Details Modal Engine (Kits & Tadiran) ---
    const PRODUCT_DATA = {
        'pkg-6kw': {
            id: 'pkg-6kw',
            gallery: ['assets/images/hero-kit-6kwt-trans.webp'],
            ua: {
                title: 'Комплект «6 кВт·год»',
                subtitle: 'Літій-іонна батарея 6 кВт·год + інвертор EASUN 3.2kW',
                badge: 'Базовий резерв',
                kpiPower: '3.2 кВт',
                kpiCap: '6 кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '230 В AC / 24 В DC',
                capacity: '250 А·год (6 кВт·год)',
                energy: '6 кВт·год',
                current: '3.2 кВт (номінал 3200 VA) | MPPT до 100 A | AC до 80 A',
                cycles: '6000 циклів (понад 15 років)',
                scaling: 'Підтримка сонячних панелей: MPPT 60–500 В DC, до 4.0 кВт',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: 'Компактний настінний інвертор + модульний АКБ',
                weight: '~62 кг (комплект)',
                ports: 'USB / RS232 / RS485 / Wi-Fi моніторинг / LCD-дисплей',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Настінний / Внутрішній',
                price: '55 000 ₴',
                packName: 'Комплект 6 кВт·год (55 000 ₴)',
                accessories: [
                    'Гібридний інвертор EASUN ISolar-SMG-II-3.2KW-24V',
                    'Літій-іонна батарея 6 кВт·год (24V 250Ah)',
                    'Кабелі підключення та захисна комутація',
                    'Офіційна гарантія'
                ]
            },
            ru: {
                title: 'Комплект «6 кВт·ч»',
                subtitle: 'Литий-ионная батарея 6 кВт·ч + инвертор EASUN 3.2kW',
                badge: 'Базовый резерв',
                kpiPower: '3.2 кВт',
                kpiCap: '6 кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '230 В AC / 24 В DC',
                capacity: '250 А·ч (6 кВт·ч)',
                energy: '6 кВт·ч',
                current: '3.2 кВт (номинал 3200 VA) | MPPT до 100 A | AC до 80 A',
                cycles: '6000 циклов (более 15 лет)',
                scaling: 'Поддержка солнечных панелей: MPPT 60–500 В DC, до 4.0 кВт',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: 'Компактный настенный инвертор + модульный АКБ',
                weight: '~62 кг (комплект)',
                ports: 'USB / RS232 / RS485 / Wi-Fi мониторинг / LCD-дисплей',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Настенный / Внутренний',
                price: '55 000 ₴',
                packName: 'Комплект 6 кВт·ч (55 000 ₴)',
                accessories: [
                    'Гибридный инвертор EASUN ISolar-SMG-II-3.2KW-24V',
                    'Литий-ионная батарея 6 кВт·ч (24V 250Ah)',
                    'Кабели подключения и защитная коммутация',
                    'Официальная гарантия'
                ]
            }
        },
        'pkg-12kw': {
            id: 'pkg-12kw',
            gallery: ['assets/images/hero-kit-12kwt-trans.webp'],
            ua: {
                title: 'Комплект «12 кВт·год»',
                subtitle: 'Літій-іонна батарея 12 кВт·год + інвертор EASUN 6.2kW',
                badge: 'Хіт продажів',
                kpiPower: '6.2 кВт',
                kpiCap: '12 кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '230 В AC / 48 В DC',
                capacity: '250 А·год (12 кВт·год)',
                energy: '12 кВт·год',
                current: '6.2 кВт (пікова 12400 VA) | MPPT до 120 A | AC до 100 A',
                cycles: '6000 циклів (понад 15 років)',
                scaling: 'MPPT 60–500 В DC (до 6.5 кВт сонячних панелей)',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: 'Настінний інвертор + модульний блок акумулятора 48V',
                weight: '~110 кг (комплект)',
                ports: 'Wi-Fi моніторинг / RS485 / CAN / USB / LCD',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Настінний / Підлоговий',
                price: '99 000 ₴',
                packName: 'Комплект 12 кВт·год (99 000 ₴)',
                accessories: [
                    'Гібридний інвертор EASUN ISolar-SMG-II-6.2KW-48V',
                    'Літій-іонна батарея 12 кВт·год (48V 250Ah)',
                    'Кабелі підключення з наконечниками',
                    'Офіційна гарантія'
                ]
            },
            ru: {
                title: 'Комплект «12 кВт·ч»',
                subtitle: 'Литий-ионная батарея 12 кВт·ч + инвертор EASUN 6.2kW',
                badge: 'Хит продаж',
                kpiPower: '6.2 кВт',
                kpiCap: '12 кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '230 В AC / 48 В DC',
                capacity: '250 А·ч (12 кВт·ч)',
                energy: '12 кВт·ч',
                current: '6.2 кВт (пиковая 12400 VA) | MPPT до 120 A | AC до 100 A',
                cycles: '6000 циклов (более 15 лет)',
                scaling: 'MPPT 60–500 В DC (до 6.5 кВт солнечных панелей)',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: 'Настенный инвертор + модульный блок аккумулятора 48V',
                weight: '~110 кг (комплект)',
                ports: 'Wi-Fi мониторинг / RS485 / CAN / USB / LCD',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Настенный / Напольный',
                price: '99 000 ₴',
                packName: 'Комплект 12 кВт·ч (99 000 ₴)',
                accessories: [
                    'Гибридный инвертор EASUN ISolar-SMG-II-6.2KW-48V',
                    'Литий-ионная батарея 12 кВт·ч (48V 250Ah)',
                    'Кабели подключения с наконечниками',
                    'Официальная гарантия'
                ]
            }
        },
        'pkg-24kw': {
            id: 'pkg-24kw',
            gallery: ['assets/images/hero-kit-24kwt-trans.webp'],
            ua: {
                title: 'Комплект «24 кВт·год»',
                subtitle: 'Літій-іонна батарея 24 кВт·год (2×12 кВт·год) + 1–2 інвертори EASUN 6.2kW',
                badge: 'Для бізнесу',
                kpiPower: '6.2–12.4 кВт',
                kpiCap: '24 кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '230 В AC / 48 В DC',
                capacity: '500 А·год (24 кВт·год)',
                energy: '24 кВт·год (2×12 кВт·год)',
                current: '6.2–12.4 кВт (1–2 інвертори EASUN 6.2kW)',
                cycles: '6000 циклів (понад 15 років)',
                scaling: 'Паралельне з’єднання батарей і можливість додавання сонячних панелей',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: 'Стійковий / Підлоговий монтаж у техприміщенні',
                weight: '~215 кг (комплект)',
                ports: 'Wi-Fi / CAN / RS485 / Подвійний BMS моніторинг',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Підлоговий у техприміщенні',
                price: '168 300 ₴',
                packName: 'Комплект 24 кВт·год (168 300 ₴)',
                accessories: [
                    '1–2 гібридні інвертори EASUN 6.2kW',
                    'Акумуляторний блок 24 кВт·год (2×12 кВт·год)',
                    'Модулі паралельного з’єднання та захисна автоматика',
                    'Офіційна гарантія'
                ]
            },
            ru: {
                title: 'Комплект «24 кВт·ч»',
                subtitle: 'Литий-ионная батарея 24 кВт·ч (2×12 кВт·ч) + 1–2 инвертора EASUN 6.2kW',
                badge: 'Для бизнеса',
                kpiPower: '6.2–12.4 кВт',
                kpiCap: '24 кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '230 В AC / 48 В DC',
                capacity: '500 А·ч (24 кВт·ч)',
                energy: '24 кВт·ч (2×12 кВт·ч)',
                current: '6.2–12.4 кВт (1–2 инвертора EASUN 6.2kW)',
                cycles: '6000 циклов (более 15 лет)',
                scaling: 'Параллельное соединение батарей и возможность добавления солнечных панелей',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: 'Стоечный / Напольный монтаж в техпомещении',
                weight: '~215 кг (комплект)',
                ports: 'Wi-Fi / CAN / RS485 / Двойной BMS мониторинг',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Напольный в техпомещении',
                price: '168 300 ₴',
                packName: 'Комплект 24 кВт·ч (168 300 ₴)',
                accessories: [
                    '1–2 гибридных инвертора EASUN 6.2kW',
                    'Аккумуляторный блок 24 кВт·ч (2×12 кВт·ч)',
                    'Модули параллельного соединения и защитная автоматика',
                    'Официальная гарантия'
                ]
            }
        },
        'pkg-36kw': {
            id: 'pkg-36kw',
            gallery: ['assets/images/hero-kit-36kwt-trans.webp'],
            ua: {
                title: 'Комплект «36 кВт·год»',
                subtitle: 'Масштабована система: 36+ кВт·год (3×12 кВт·год) + 1–3 інвертори EASUN 6.2kW',
                badge: 'Масштабування',
                kpiPower: 'до 18.6 кВт',
                kpiCap: '36+ кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '230 В / 380 В AC / 48 В DC',
                capacity: '750 А·год (36+ кВт·год)',
                energy: '36+ кВт·год (3×12 кВт·год)',
                current: 'до 18.6 кВт (до 3-х інверторів EASUN 6.2kW)',
                cycles: '6000 циклів (понад 15 років)',
                scaling: 'Промислове паралельне масштабування та сонячні масиви',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: 'Промислова стійка / шафа для 3 акумуляторних блоків',
                weight: '~320 кг (комплект)',
                ports: 'Ethernet / Wi-Fi / RS485 / CAN / BMS моніторинг',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Серверна / Електрощитова',
                price: '247 500 ₴',
                packName: 'Комплект 36 кВт·год (247 500 ₴)',
                accessories: [
                    '1–3 гібридні інвертори EASUN 6.2kW',
                    'Стійка акумуляторів 36+ кВт·год (3×12 кВт·год)',
                    'Комутаційна шина та захисна автоматика',
                    'Офіційна гарантія'
                ]
            },
            ru: {
                title: 'Комплект «36 кВт·ч»',
                subtitle: 'Масштабируемая система: 36+ кВт·ч (3×12 кВт·ч) + 1–3 инвертора EASUN 6.2kW',
                badge: 'Масштабирование',
                kpiPower: 'до 18.6 кВт',
                kpiCap: '36+ кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '230 В / 380 В AC / 48 В DC',
                capacity: '750 А·ч (36+ кВт·ч)',
                energy: '36+ кВт·ч (3×12 кВт·ч)',
                current: 'до 18.6 кВт (до 3-х инверторов EASUN 6.2kW)',
                cycles: '6000 циклов (более 15 лет)',
                scaling: 'Промышленное параллельное масштабирование и солнечные массивы',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: 'Промышленная стойка / шкаф для 3 аккумуляторных блоков',
                weight: '~320 кг (комплект)',
                ports: 'Ethernet / Wi-Fi / RS485 / CAN / BMS мониторинг',
                certs: 'CE, RoHS, UN38.3',
                montage: 'Серверная / Электрощитовая',
                price: '247 500 ₴',
                packName: 'Комплект 36 кВт·ч (247 500 ₴)',
                accessories: [
                    '1–3 гибридных инвертора EASUN 6.2kW',
                    'Стойка аккумуляторов 36+ кВт·ч (3×12 кВт·ч)',
                    'Коммутационная шина и защитная автоматика',
                    'Официальная гарантия'
                ]
            }
        },
        '314ah': {
            id: '314ah',
            gallery: [
                'assets/images/tadiran-314ah-1.webp',
                'assets/images/tadiran-314ah-2.webp',
                'assets/images/tadiran-314ah-3.webp'
            ],
            ua: {
                title: 'Tadiran LFP 51.2V 314Ah',
                subtitle: 'Низьковольтна підлогова LiFePO4 акумуляторна батарея 51,2 В, 314 А',
                badge: 'Флагман / 8000 циклів',
                kpiPower: '51.2 В (BMS 200A)',
                kpiCap: '16.08 кВт·год',
                kpiCycles: '8000 циклів',
                voltage: '51.2 В',
                capacity: '314 А·год',
                energy: '16.08 кВт·год',
                current: '100А (Номін.) / 200А (Заряд) / 200А (Розряд)',
                cycles: '8000 циклів (при 80% DoD, 0.5C)',
                scaling: '1–15 модулів (до 241.2 кВт·год)',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: '807 × 520 × 252 мм (упаковка: 865 × 580 × 415 мм)',
                weight: '130 кг (Нетто) / 144 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP Моніторинг)',
                certs: 'MSDS, UN38.3, CE-EMC, IEC62619',
                montage: 'Підлоговий на роликах (IP30)',
                price: 'від 185 000 ₴',
                packName: 'Tadiran LFP-51.2V 314Ah (16.08 кВт·год)',
                accessories: ['Комплект батареї x1', 'Кабель для інвертора x2', 'Кабель зв’язку x1', 'Інструкція x1']
            },
            ru: {
                title: 'Tadiran LFP 51.2V 314Ah',
                subtitle: 'Низковольтная напольная LiFePO4 аккумуляторная батарея 51,2 В, 314 А',
                badge: 'Флагман / 8000 циклов',
                kpiPower: '51.2 В (BMS 200A)',
                kpiCap: '16.08 кВт·ч',
                kpiCycles: '8000 циклов',
                voltage: '51.2 В',
                capacity: '314 А·ч',
                energy: '16.08 кВт·ч',
                current: '100А (Номин.) / 200А (Заряд) / 200А (Разряд)',
                cycles: '8000 циклов (при 80% DoD, 0.5C)',
                scaling: '1–15 модулей (до 241.2 кВт·ч)',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: '807 × 520 × 252 мм (упаковка: 865 × 580 × 415 мм)',
                weight: '130 кг (Нетто) / 144 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP Мониторинг)',
                certs: 'MSDS, UN38.3, CE-EMC, IEC62619',
                montage: 'Напольный на роликах (IP30)',
                price: 'от 185 000 ₴',
                packName: 'Tadiran LFP-51.2V 314Ah (16.08 кВт·ч)',
                accessories: ['Комплект батареи x1', 'Кабель для инвертора x2', 'Кабель связи x1', 'Инструкция x1']
            }
        },
        '200ah': {
            id: '200ah',
            gallery: [
                'assets/images/tadiran-200ah-1.webp',
                'assets/images/tadiran-200ah-2.webp',
                'assets/images/tadiran-200ah-3.webp'
            ],
            ua: {
                title: 'Tadiran LFP 51.2V 200Ah',
                subtitle: 'Низьковольтна підлогова LiFePO4 акумуляторна батарея для котеджів',
                badge: 'Популярний вибір',
                kpiPower: '51.2 В (BMS 100A)',
                kpiCap: '10.24 кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '51.2 В',
                capacity: '200 А·год',
                energy: '10.24 кВт·год',
                current: '100А (Номін.) / 200А (Заряд) / 200А (Розряд)',
                cycles: '6000 циклів (при 80% DoD, 0.5C)',
                scaling: '1–15 модулів (до 153.6 кВт·год)',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: '628 × 490 × 250 мм (упаковка: 710 × 570 × 475 мм)',
                weight: '100 кг (Нетто) / 110 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP)',
                certs: 'MSDS, UN38.3, CE-EMC, IEC62619',
                montage: 'Підлоговий (IP30)',
                price: 'від 125 000 ₴',
                packName: 'Tadiran LFP-51.2V 200Ah (10.24 кВт·год)',
                accessories: ['Комплект батареї x1', 'Кабель парал. підключення x2', 'Кабель зв’язку x1', 'Інструкція x1']
            },
            ru: {
                title: 'Tadiran LFP 51.2V 200Ah',
                subtitle: 'Низковольтная напольная LiFePO4 аккумуляторная батарея для коттеджей',
                badge: 'Популярный выбор',
                kpiPower: '51.2 В (BMS 100A)',
                kpiCap: '10.24 кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '51.2 В',
                capacity: '200 А·ч',
                energy: '10.24 кВт·ч',
                current: '100А (Номин.) / 200А (Заряд) / 200А (Разряд)',
                cycles: '6000 циклов (при 80% DoD, 0.5C)',
                scaling: '1–15 модулей (до 153.6 кВт·ч)',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: '628 × 490 × 250 мм (упаковка: 710 × 570 × 475 мм)',
                weight: '100 кг (Нетто) / 110 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP)',
                certs: 'MSDS, UN38.3, CE-EMC, IEC62619',
                montage: 'Напольный (IP30)',
                price: 'от 125 000 ₴',
                packName: 'Tadiran LFP-51.2V 200Ah (10.24 кВт·ч)',
                accessories: ['Комплект батареи x1', 'Кабель парал. подключения x2', 'Кабель связи x1', 'Инструкция x1']
            }
        },
        '100ah-wm': {
            id: '100ah-wm',
            gallery: [
                'assets/images/tadiran-100ah-wm-1.webp',
                'assets/images/tadiran-100ah-wm-2.webp',
                'assets/images/tadiran-100ah-wm-3.webp'
            ],
            ua: {
                title: 'Tadiran LFP 51.2V 100Ah-WM',
                subtitle: 'Низьковольтна настінна LiFePO4 акумуляторна батарея 51,2 В, 100 А',
                badge: 'Настінний монтаж',
                kpiPower: '51.2 В (Настінний)',
                kpiCap: '5.12 кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '51.2 В',
                capacity: '100 А·год',
                energy: '5.12 кВт·год',
                current: '50А (Номін.) / 100А (Заряд) / 100А (Розряд)',
                cycles: '6000 циклів (при 80% DoD, 0.5C)',
                scaling: '1–15 модулів (до 76.8 кВт·год)',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: '450 × 580 × 210 мм (упаковка: 672 × 522 × 305 мм)',
                weight: '53 кг (Нетто) / 56 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP)',
                certs: 'MSDS, UN38.3, CE-EMC, IEC62619',
                montage: 'Настінний (IP30)',
                price: 'від 65 000 ₴',
                packName: 'Tadiran LFP-51.2V 100Ah-WM (5.12 кВт·год)',
                accessories: ['Батарея x1', 'Кабель парал. підключення x2', 'Кабель зв’язку x1', 'Інструкція x1']
            },
            ru: {
                title: 'Tadiran LFP 51.2V 100Ah-WM',
                subtitle: 'Низковольтная настенная LiFePO4 аккумуляторная батарея 51,2 В, 100 А',
                badge: 'Настенный монтаж',
                kpiPower: '51.2 В (Настенный)',
                kpiCap: '5.12 кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '51.2 В',
                capacity: '100 А·ч',
                energy: '5.12 кВт·ч',
                current: '50А (Номин.) / 100А (Заряд) / 100А (Разряд)',
                cycles: '6000 циклов (при 80% DoD, 0.5C)',
                scaling: '1–15 модулей (до 76.8 кВт·ч)',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: '450 × 580 × 210 мм (упаковка: 672 × 522 × 305 мм)',
                weight: '53 кг (Нетто) / 56 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP)',
                certs: 'MSDS, UN38.3, CE-EMC, IEC62619',
                montage: 'Настенный (IP30)',
                price: 'от 65 000 ₴',
                packName: 'Tadiran LFP-51.2V 100Ah-WM (5.12 кВт·ч)',
                accessories: ['Батарея x1', 'Кабель парал. подключения x2', 'Кабель связи x1', 'Инструкция x1']
            }
        },
        '100ah-s': {
            id: '100ah-s',
            gallery: [
                'assets/images/tadiran-100ah-s-1.webp',
                'assets/images/tadiran-100ah-s-2.webp',
                'assets/images/tadiran-100ah-s-3.webp'
            ],
            ua: {
                title: 'Tadiran LFP 51.2V 100Ah-S',
                subtitle: 'Низьковольтна LiFePO4 акумуляторна батарея для 19" серверної стійки',
                badge: 'Для 19" Стійки (до 32 шт)',
                kpiPower: '51.2 В (19" Стійка)',
                kpiCap: '5.12 кВт·год',
                kpiCycles: '6000 циклів',
                voltage: '51.2 В',
                capacity: '100 А·год',
                energy: '5.12 кВт·год',
                current: '50А (Номін.) / 100А (Заряд) / 100А (Розряд)',
                cycles: '6000 циклів (при 80% DoD, 0.2C)',
                scaling: '1–32 модулів (до 163.84 кВт·год)',
                temp: 'Заряд: 0…+55 °C | Розряд: -20…+60 °C',
                dim: '550 × 483 × 180 мм (упаковка: 647 × 537 × 265 мм)',
                weight: '47 кг (Нетто) / 52 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP)',
                certs: 'MSDS, UN38.3, CE-EMC, UL9540A, UL1973, UL9540',
                montage: 'Підлоговий / Штабельований 19" (IP30)',
                price: 'від 62 000 ₴',
                packName: 'Tadiran LFP-51.2V 100Ah-S (5.12 кВт·год)',
                accessories: ['Батарея x1', 'Стійки x4', 'Кабель заземлення x1', 'Кабель парал. x2', 'Кабель зв’язку x1', 'Інструкція x1']
            },
            ru: {
                title: 'Tadiran LFP 51.2V 100Ah-S',
                subtitle: 'Низковольтная LiFePO4 аккумуляторная батарея для 19" серверной стойки',
                badge: 'Для 19" Стойки (до 32 шт)',
                kpiPower: '51.2 В (19" Стойка)',
                kpiCap: '5.12 кВт·ч',
                kpiCycles: '6000 циклов',
                voltage: '51.2 В',
                capacity: '100 А·ч',
                energy: '5.12 кВт·ч',
                current: '50А (Номин.) / 100А (Заряд) / 100А (Разряд)',
                cycles: '6000 циклов (при 80% DoD, 0.2C)',
                scaling: '1–32 модулей (до 163.84 кВт·ч)',
                temp: 'Заряд: 0…+55 °C | Разряд: -20…+60 °C',
                dim: '550 × 483 × 180 мм (упаковка: 647 × 537 × 265 мм)',
                weight: '47 кг (Нетто) / 52 кг (Брутто)',
                ports: 'CAN / RS485 / RS232 (JBD APP)',
                certs: 'MSDS, UN38.3, CE-EMC, UL9540A, UL1973, UL9540',
                montage: 'Напольный / Штабелируемый 19" (IP30)',
                price: 'от 62 000 ₴',
                packName: 'Tadiran LFP-51.2V 100Ah-S (5.12 кВт·ч)',
                accessories: ['Батарея x1', 'Стойки x4', 'Кабель заземления x1', 'Кабель парал. x2', 'Кабель связи x1', 'Инструкция x1']
            }
        }
    };

    let activeModalTadId = '314ah';

    function renderTadiranModal(tadId) {
        if (tadId) activeModalTadId = tadId;
        const prod = PRODUCT_DATA[activeModalTadId] || PRODUCT_DATA['314ah'];
        const lang = currentLang || 'ua';
        const data = (prod[lang] || prod.ua || prod);

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
            const mainImg = galleryArr.length ? galleryArr[0] : (data.img || 'assets/images/tadiran-314ah.webp');
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
        // Handles both Ready-made packages ('pkg-') and Tadiran batteries
        const modelWrap = document.querySelector('.model-selector-wrap');
        const modelSelLbl = document.getElementById('pm-model-sel-lbl');
        const modelTabsContainer = document.getElementById('pm-model-tabs');

        if (modelWrap && modelTabsContainer) {
            modelWrap.style.display = 'flex';
            const isPkg = activeModalTadId.startsWith('pkg-');
            if (modelSelLbl) {
                modelSelLbl.textContent = isPkg
                    ? (translations[lang]['pm.sel_pkg'] || (lang === 'ru' ? 'Линейка систем:' : 'Лінійка систем:'))
                    : (translations[lang]['pm.sel_model'] || (lang === 'ru' ? 'Модельный ряд:' : 'Модельний ряд:'));
            }

            const tabsList = isPkg ? [
                { id: 'pkg-6kw', label: lang === 'ru' ? '6 кВт·ч' : '6 кВт·год' },
                { id: 'pkg-12kw', label: lang === 'ru' ? '12 кВт·ч' : '12 кВт·год' },
                { id: 'pkg-24kw', label: lang === 'ru' ? '24 кВт·ч' : '24 кВт·год' },
                { id: 'pkg-36kw', label: lang === 'ru' ? '36 кВт·ч' : '36 кВт·год' }
            ] : [
                { id: '314ah', label: '314Ah' },
                { id: '200ah', label: '200Ah' },
                { id: '100ah-wm', label: '100Ah-WM' },
                { id: '100ah-s', label: '100Ah-S' }
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
            const tadId = viewBtn.getAttribute('data-tadiran-id') || viewBtn.getAttribute('data-pack-id') || '314ah';
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
