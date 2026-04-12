/**
 * presentation.js
 * 발표 셸 로직 — manifest 기반 navigation 및 state 관리.
 *
 * presentation-manifest.js가 먼저 로드되어 전역 presentationManifest를 제공한다.
 */

// ── State ──
let currentIndex = 0;
const total = presentationManifest.length;

// ── Section display names ──
const sectionNames = {
  designPattern: 'Design Patterns',
  programming: 'Programming Paradigms',
};

// ── DOM references ──
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Build agenda ──
function buildAgenda() {
  const list = $('.sidebar-list');
  if (!list) return;

  // Group by section, preserving order
  let lastSection = null;
  let sectionEl = null;

  presentationManifest.forEach((topic, idx) => {
    // New section?
    if (topic.section !== lastSection) {
      sectionEl = document.createElement('div');
      sectionEl.className = 'agenda-section';

      const label = document.createElement('div');
      label.className = 'section-label';
      label.dataset.section = topic.section;
      label.textContent = sectionNames[topic.section] || topic.section;
      sectionEl.appendChild(label);

      list.appendChild(sectionEl);
      lastSection = topic.section;
    }

    const item = document.createElement('div');
    item.className = 'agenda-item';
    item.dataset.index = idx;

    const indexSpan = document.createElement('span');
    indexSpan.className = 'agenda-index';
    indexSpan.textContent = String(idx + 1).padStart(2, '0');

    const titleSpan = document.createElement('span');
    titleSpan.className = 'agenda-title';
    titleSpan.textContent = topic.title;

    item.appendChild(indexSpan);
    item.appendChild(titleSpan);

    item.addEventListener('click', () => goTo(idx));
    sectionEl.appendChild(item);
  });
}

// ── Build progress dots ──
function buildDots() {
  const container = $('.nav-dots');
  if (!container) return;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = 'nav-dot';
    dot.dataset.index = i;
    container.appendChild(dot);
  }
}

// ── Navigation ──
function goTo(idx) {
  if (idx < 0 || idx >= total) return;
  currentIndex = idx;
  syncUI();
}

function goPrev() {
  goTo(currentIndex - 1);
}

function goNext() {
  goTo(currentIndex + 1);
}

// ── Sync all UI with current state ──
function syncUI() {
  const topic = presentationManifest[currentIndex];
  if (!topic) return;

  // 1. iframe src
  const iframe = $('.stage-iframe');
  if (iframe) {
    // adapterPath is relative to project root; iframe is loaded from index.html at root
    const newSrc = topic.adapterPath;
    if (iframe.getAttribute('src') !== newSrc) {
      iframe.src = newSrc;
    }
  }

  // 2. Stage header
  const titleEl = $('.stage-topic-title');
  if (titleEl) titleEl.textContent = topic.title;

  const badge = $('.stage-section-badge');
  if (badge) {
    badge.dataset.section = topic.section;
    badge.textContent = sectionNames[topic.section] || topic.section;
  }

  const progress = $('.stage-progress');
  if (progress) progress.textContent = `${currentIndex + 1} / ${total}`;

  // 3. Agenda highlight
  $$('.agenda-item').forEach((item) => {
    const idx = Number(item.dataset.index);
    item.classList.toggle('active', idx === currentIndex);
  });

  // Scroll active agenda item into view
  const activeItem = $(`.agenda-item[data-index="${currentIndex}"]`);
  if (activeItem) {
    activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // 4. Nav buttons
  const prevBtn = $('#btn-prev');
  const nextBtn = $('#btn-next');
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === total - 1;

  // 5. Progress dots
  $$('.nav-dot').forEach((dot) => {
    const idx = Number(dot.dataset.index);
    dot.classList.toggle('active', idx === currentIndex);
    dot.classList.toggle('visited', idx < currentIndex);
  });
}

// ── Keyboard navigation ──
function handleKeydown(e) {
  // Ignore if user is typing in an input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    goPrev();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    goNext();
  }
}

// ── Init ──
function init() {
  buildAgenda();
  buildDots();

  // Button listeners
  const prevBtn = $('#btn-prev');
  const nextBtn = $('#btn-next');
  if (prevBtn) prevBtn.addEventListener('click', goPrev);
  if (nextBtn) nextBtn.addEventListener('click', goNext);

  // Keyboard
  document.addEventListener('keydown', handleKeydown);

  // Initial render: topic 0 (Singleton)
  syncUI();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
