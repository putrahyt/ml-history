const matches = [
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '13:26', mvp: 'ssy.rl', kda: '6/0/6' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '14:23', mvp: 'ssy.rl', kda: '11/1/3' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '21:33', mvp: 'ssy.rl', kda: '15/2/4' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '11:51', mvp: 'ssy.rl', kda: '10/2/7' },
  { result: 'win', hero: 'Minotaur', mode: 'Ranked', duration: '14:31', mvp: 'ERAYA',  kda: '2/2/14' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '12:42', mvp: 'PHP ARTISAN SERVE',  kda: '8/0/7' },
  { result: 'lose', hero: 'Minotaur', mode: 'Ranked', duration: '13:55', mvp: 'ERAYA',  kda: '3/5/4' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '16:12', mvp: 'PHP ARTISAN SERVE',  kda: '14/2/2' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '10:52', mvp: 'PHP ARTISAN SERVE',  kda: '12/0/3' },
  { result: 'lose', hero: 'Claude', mode: 'Ranked', duration: '15:19', mvp: 'KykhrlazZ 969',  kda: '13/5/3' },
  { result: 'lose', hero: 'Julian', mode: 'Ranked', duration: '14:03', mvp: 'PHP ARTISAN SERVE',  kda: '11/2/2' },
  { result: 'lose', hero: 'Julian', mode: 'Ranked', duration: '25:55', mvp: 'PHP ARTISAN SERVE',  kda: '17/3/2' },
  { result: 'lose', hero: 'Julian', mode: 'Ranked', duration: '11:37', mvp: 'PHP ARTISAN SERVE',  kda: '5/2/3' },
  { result: 'win', hero: 'Minotaur', mode: 'Ranked', duration: '14:26', mvp: 'PHP ARTISAN SERVE',  kda: '3/1/14' },
  { result: 'lose', hero: 'Julian', mode: 'Ranked', duration: '20:53', mvp: 'ssy.rl',  kda: '10/6/3' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '15:08', mvp: 'ssy.rl',  kda: '13/2/8' },
  { result: 'lose', hero: 'Vexana', mode: 'Ranked', duration: '21:13', mvp: 'PHP ARTISAN SERVE',  kda: '5/3/17' },
  { result: 'lose', hero: 'Julian', mode: 'Ranked', duration: '20:25', mvp: 'ssy.rl',  kda: '14/5/11' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '19:13', mvp: 'ssy.rl',  kda: '13/3/6' },
  { result: 'lose', hero: 'Minotaur', mode: 'Ranked', duration: '16:04', mvp: 'ERAYA',  kda: '1/5/12' },
  { result: 'win', hero: 'Minotaur', mode: 'Ranked', duration: '11:38', mvp: 'ERAYA',  kda: '1/0/12' },
  { result: 'lose', hero: 'Julian', mode: 'Ranked', duration: '18:11', mvp: 'ssy.rl',  kda: '15/4/4' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '13:29', mvp: 'ssy.rl',  kda: '7/1/16' },
  { result: 'win', hero: 'Julian', mode: 'Ranked', duration: '14:05', mvp: 'ssy.rl',  kda: '10/0/9' },
  { result: 'lose', hero: 'Chou', mode: 'Ranked', duration: '16:58', mvp: 'Joko Widodo',  kda: '13/7/4' },
  { result: 'win', hero: 'Minotaur', mode: 'Ranked', duration: '17:05', mvp: 'PHP ARTISAN SERVE',  kda: '1/1/27' },
  { result: 'win', hero: 'Minotaur', mode: 'Ranked', duration: '17:05', mvp: 'PHP ARTISAN SERVE',  kda: '1/1/27' },
  { result: 'win', hero: 'Suyou', mode: 'Ranked', duration: '12:32', mvp: 'ssy.rl',  kda: '5/0/10' },
  { result: 'win', hero: 'Minotaur', mode: 'Ranked', duration: '16:51', mvp: 'ERAYA',  kda: '2/3/17' },
];

let activeFilter = 'all';
let currentPage  = 1;
let perPage      = 5;
let filteredData = [];

function getInitials(n) { return n.slice(0,2).toUpperCase(); }
function durationToSec(d) { const [m,s]=d.split(':').map(Number); return m*60+s; }

function setFilter(f, btn) {
  activeFilter = f;
  currentPage  = 1;
  document.querySelectorAll('.filter-btn').forEach(b => { b.className = 'filter-btn'; });
  btn.classList.add('active-' + f);
  renderList();
}

function changePerPage() {
  perPage      = parseInt(document.getElementById('perPageSelect').value);
  currentPage  = 1;
  renderList();
}

function goToPage(p) {
  currentPage = p;
  renderList();
  document.querySelector('.matches-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderStats(data) {
  const wins  = data.filter(m => m.result === 'win').length;
  const loses = data.filter(m => m.result === 'lose').length;
  const total = wins + loses;
  const wr    = total ? Math.round((wins / total) * 100) : 0;
  document.getElementById('totalWin').textContent   = wins;
  document.getElementById('totalLose').textContent  = loses;
  document.getElementById('winRate').textContent    = wr + '%';
  document.getElementById('barWinPct').textContent  = wr + '%';
  document.getElementById('barLosePct').textContent = (100 - wr) + '%';
  document.getElementById('barFill').style.width    = wr + '%';
}

function renderPagination(total) {
  const totalPages = Math.ceil(total / perPage);
  const start      = (currentPage - 1) * perPage + 1;
  const end        = Math.min(currentPage * perPage, total);

  document.getElementById('pageInfo').innerHTML =
    total === 0 ? '' : `Match <span>${start}–${end}</span> dari <span>${total}</span>`;

  const wrap = document.getElementById('paginationWrap');
  wrap.style.display = total === 0 ? 'none' : 'flex';

  if (totalPages <= 1) {
    document.getElementById('pageBtns').innerHTML = '';
    return;
  }

  let pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage-1); i <= Math.min(totalPages-1, currentPage+1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const btns = pages.map(p => {
    if (p === '...') return `<span class="page-ellipsis">…</span>`;
    return `<button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goToPage(${p})">${p}</button>`;
  }).join('');

  document.getElementById('pageBtns').innerHTML =
    `<button class="page-btn arrow" onclick="goToPage(${currentPage-1})" ${currentPage===1?'disabled':''}>‹</button>` +
    btns +
    `<button class="page-btn arrow" onclick="goToPage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>›</button>`;
}

function renderList() {
  const query = (document.getElementById('searchInput').value || '').toLowerCase().trim();
  const sort  = document.getElementById('sortSelect').value;

  filteredData = matches.filter(m => {
    const okResult = activeFilter === 'all' || m.result === activeFilter;
    const okQuery  = !query || m.hero.toLowerCase().includes(query) || m.mvp.toLowerCase().includes(query);
    return okResult && okQuery;
  });

  if (sort === 'win-first')       filteredData = [...filteredData].sort((a,b) => a.result==='win'?-1:1);
  else if (sort === 'lose-first') filteredData = [...filteredData].sort((a,b) => a.result==='lose'?-1:1);
  else if (sort === 'hero-az')    filteredData = [...filteredData].sort((a,b) => a.hero.localeCompare(b.hero));
  else if (sort === 'duration-asc')  filteredData = [...filteredData].sort((a,b) => durationToSec(a.duration)-durationToSec(b.duration));
  else if (sort === 'duration-desc') filteredData = [...filteredData].sort((a,b) => durationToSec(b.duration)-durationToSec(a.duration));

  renderStats(filteredData);

  const total = filteredData.length;
  const countEl = document.getElementById('matchCount');
  countEl.innerHTML = `Menampilkan <span>${total}</span> dari <span>${matches.length}</span> pertandingan`;

  const totalPages = Math.ceil(total / perPage);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  renderPagination(total);

  const list = document.getElementById('matchList');
  if (total === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🔎</div>Tidak ada pertandingan yang sesuai filter.</div>`;
    return;
  }

  const start  = (currentPage - 1) * perPage;
  const paged  = filteredData.slice(start, start + perPage);

  list.innerHTML = paged.map((m, i) => `
    <div class="match-card ${m.result==='win'?'win-match':'lose-match'}">
      <div class="match-no">${start + i + 1}</div>
      <span class="result-badge ${m.result==='win'?'badge-win':'badge-lose'}">
        ${m.result==='win'?'WIN':'LOSE'}
      </span>
      <div class="match-info">
        <div class="match-hero">🗡️ ${m.hero}</div>
        <div class="match-meta">${m.mode} &nbsp;·&nbsp; ⏱ ${m.duration} &nbsp;·&nbsp; KDA ${m.kda}</div>
      </div>
      <div class="mvp-section">
        <div class="mvp-avatar">${getInitials(m.mvp)}</div>
        <div class="mvp-info">
          <div class="mvp-name">${m.mvp}</div>
          <div class="mvp-label">⭐ MVP</div>
        </div>
      </div>
    </div>
  `).join('');
}

setTimeout(() => renderList(), 200);
