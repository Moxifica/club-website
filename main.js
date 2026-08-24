/* ==================================================================
   SoLAcc IT Club -- shared behavior
   Used by: index.html, projects.html, events.html (and future pages)
   ================================================================== */

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer a.drawer-link').forEach(a => {
    const href = a.getAttribute('href');
    if(!href) return;
    if(href === path || (path === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });
})();

/* ============================================================
   MOBILE DRAWER
   ============================================================ */
(function(){
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const scrim = document.getElementById('drawerScrim');
  if(!toggle || !drawer || !scrim) return;
  function closeDrawer(){
    drawer.classList.remove('open'); scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }
  function openDrawer(){
    drawer.classList.add('open'); scrim.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
  }
  toggle.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  scrim.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
})();

/* ============================================================
   TERMINAL LIVE STATUS FEED (homepage hero only -- no-ops elsewhere)
   ============================================================ */
(function(){
  const body = document.getElementById('terminalBody');
  if(!body) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = [
    {p:'$ uptime', o:'homelab-01 up 47 days, load avg 0.42 0.38 0.31'},
    {p:'$ tail -f /var/log/club-activity.log', o:null},
    {p:null, o:'[OK] campus-mesh-vpn heartbeat received -- 6 nodes online', cls:'ok'},
    {p:null, o:'[OK] barcode-scanner v2.1 deployed by officer -- software/', cls:'ok'},
    {p:null, o:'[MEETING] Weekly sync checked in: 15 members present', cls:'dim'},
    {p:null, o:'[OK] pi-cluster-03 job queue cleared -- 0 pending', cls:'ok'},
    {p:'$ git log --oneline -3 solacc-room-finder', o:null},
    {p:null, o:'a3f9c1 fix: room availability race condition', cls:'dim'},
    {p:null, o:'8b21e0 feat: add Opelousas campus building map', cls:'dim'},
    {p:'$ status --club', o:null},
    {p:null, o:'[OK] All systems nominal. See you at the next meeting!', cls:'ok'},
  ];

  function renderStatic(){
    body.innerHTML = lines.map(l => {
      const text = l.p ? l.p : l.o;
      const cls = l.p ? 'prompt' : (l.cls || '');
      return `<span class="term-line" style="opacity:1;animation:none;"><span class="${cls}">${text}</span></span>`;
    }).join('') + '<span class="term-cursor"></span>';
  }

  if(reduced){ renderStatic(); return; }

  let i = 0;
  function typeNext(){
    if(i >= lines.length){
      const cursor = document.createElement('span');
      cursor.className = 'term-cursor';
      body.appendChild(cursor);
      return;
    }
    const l = lines[i];
    const el = document.createElement('span');
    el.className = 'term-line';
    const inner = document.createElement('span');
    inner.className = l.p ? 'prompt' : (l.cls || '');
    el.appendChild(inner);
    body.appendChild(el);
    const full = l.p ? l.p : l.o;
    let c = 0;
    const speed = l.p ? 28 : 10;
    const typer = setInterval(() => {
      inner.textContent = full.slice(0, c+1);
      c++;
      if(c >= full.length){
        clearInterval(typer);
        i++;
        setTimeout(typeNext, l.p ? 120 : 260);
      }
    }, speed);
  }
  typeNext();
})();

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message){
  let toast = document.getElementById('siteToast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast';
    toast.setAttribute('role','status');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ============================================================
   GENERIC FILTER PILLS
   Wires up a .filter-bar of .filter-pill buttons (data-filter="value")
   against a set of cards (data-domain / data-category on each card).
   ============================================================ */
function initFilterBar(barId, cardSelector, dataAttr, emptyStateId){
  const bar = document.getElementById(barId);
  if(!bar) return;
  const cards = Array.from(document.querySelectorAll(cardSelector));
  const empty = emptyStateId ? document.getElementById(emptyStateId) : null;
  const pills = Array.from(bar.querySelectorAll('.filter-pill'));

  function apply(value){
    let visible = 0;
    cards.forEach(card => {
      const match = value === 'all' || card.getAttribute(dataAttr) === value;
      card.classList.toggle('hidden', !match);
      if(match) visible++;
    });
    if(empty) empty.classList.toggle('show', visible === 0);
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.setAttribute('aria-pressed', 'false'));
      pill.setAttribute('aria-pressed', 'true');
      apply(pill.getAttribute('data-filter'));
    });
  });

  const initial = bar.querySelector('.filter-pill[aria-pressed="true"]');
  apply(initial ? initial.getAttribute('data-filter') : 'all');
}

/* ============================================================
   ICS CALENDAR GENERATION
   opts: { title, description, location, start: Date, end: Date }
   ============================================================ */
function downloadICS(opts){
  function fmt(d){
    return d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  }
  const uid = 'solacc-it-' + Date.now() + '@solacc-it-club';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SoLAcc IT Club//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:' + uid,
    'DTSTAMP:' + fmt(new Date()),
    'DTSTART:' + fmt(opts.start),
    'DTEND:' + fmt(opts.end),
    'SUMMARY:' + (opts.title || 'SoLAcc IT Club Event').replace(/\n/g,' '),
    'DESCRIPTION:' + (opts.description || '').replace(/\n/g,'\\n'),
    'LOCATION:' + (opts.location || '').replace(/\n/g,' '),
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  const blob = new Blob([lines.join('\r\n')], {type:'text/calendar;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (opts.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g,'-') + '.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Calendar file downloaded');
}

/* wire up any [data-ics] buttons declaratively, e.g. on event cards */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-ics]');
  if(!btn) return;
  downloadICS({
    title: btn.getAttribute('data-title'),
    description: btn.getAttribute('data-desc') || '',
    location: btn.getAttribute('data-location') || '',
    start: new Date(btn.getAttribute('data-start')),
    end: new Date(btn.getAttribute('data-end')),
  });
});

/* ============================================================
   JOIN CLUB MODAL
   ============================================================ */
(function(){
  const overlay = document.getElementById('joinModal');
  if(!overlay) return;
  const openers = document.querySelectorAll('.js-open-join');
  const closeBtn = overlay.querySelector('.modal-close');
  const steps = Array.from(overlay.querySelectorAll('.form-step'));
  const dots = Array.from(overlay.querySelectorAll('.step-dot'));
  const successPanel = overlay.querySelector('.success-panel');
  const modalBody = overlay.querySelector('.modal-body');
  const form = document.getElementById('joinForm');
  const modalFoot = overlay.querySelector('.modal-foot');
  const backBtn = overlay.querySelector('.btn-back');
  const nextBtn = overlay.querySelector('.btn-next');
  let current = 0;
  let lastFocused = null;

  function renderStep(){
    steps.forEach((s,i) => s.classList.toggle('active', i === current));
    dots.forEach((d,i) => {
      d.classList.toggle('active', i === current);
      d.classList.toggle('done', i < current);
    });
    backBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = current === steps.length - 1 ? 'Submit application' : 'Continue';
  }

  function openModal(){
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    current = 0;
    form.reset();
    form.style.display = '';
    modalFoot.style.display = '';
    successPanel.classList.remove('active');
    clearErrors();
    renderStep();
    const firstField = steps[0].querySelector('input, select');
    if(firstField) setTimeout(() => firstField.focus(), 60);
  }

  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  }

  function clearErrors(){
    overlay.querySelectorAll('.form-group.invalid').forEach(g => g.classList.remove('invalid'));
  }

  function validateStep(){
    clearErrors();
    const activeStep = steps[current];
    let valid = true;
    activeStep.querySelectorAll('[required]').forEach(field => {
      if(field.type === 'checkbox' || field.type === 'radio'){
        const name = field.name;
        const groupChecked = activeStep.querySelector(`input[name="${name}"]:checked`);
        if(!groupChecked){
          valid = false;
          const group = field.closest('.form-group');
          if(group) group.classList.add('invalid');
        }
      } else if(!field.value || (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value))){
        valid = false;
        const group = field.closest('.form-group');
        if(group) group.classList.add('invalid');
      }
    });
    return valid;
  }

  function buildReceipt(){
    const name = form.querySelector('#joinName').value || 'Student';
    const email = form.querySelector('#joinEmail').value || '';
    const concentration = form.querySelector('input[name="concentration"]:checked');
    const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(i => i.value);
    const receipt = overlay.querySelector('.receipt');
    receipt.innerHTML = [
      `applicant  : ${name}`,
      `email      : ${email}`,
      `track      : ${concentration ? concentration.value : 'n/a'}`,
      `interests  : ${interests.length ? interests.join(', ') : 'none selected'}`,
      `status     : PENDING OFFICER REVIEW`,
    ].join('<br>');
    overlay.querySelector('.success-panel h3 + p').textContent =
      `Thanks, ${name.split(' ')[0] || 'there'} -- your application is in. An officer will confirm your spot and send a Discord invite to ${email || 'your inbox'} within a couple days.`;
  }

  nextBtn.addEventListener('click', () => {
    if(!validateStep()) return;
    if(current < steps.length - 1){
      current++;
      renderStep();
    } else {
      buildReceipt();
      form.style.display = 'none';
      modalFoot.style.display = 'none';
      successPanel.classList.add('active');
    }
  });

  backBtn.addEventListener('click', () => {
    if(current > 0){ current--; renderStep(); }
  });

  openers.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
  const doneBtn = overlay.querySelector('.js-done');
  if(doneBtn) doneBtn.addEventListener('click', closeModal);
})();

// @SCRIPT_MARKER
