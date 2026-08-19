/* ============================================================
   WORKS データ — ここを編集して作品を追加
   image    : サムネ画像パス（推奨 1200×675px, 16:9）
   youtube  : YouTube動画ID（例: 'dQw4w9WgXcQ'）imageより優先
   github   : 作品リポジトリURL
   ============================================================ */
const WORKS = [
  {
    badge: 'Python',
    title: '月次レポート自動化ツール',
    date: '2025年04月',
    image: '',
    youtube: '',
    flow: ['Excelデータ読込','データ集計・加工','PDFレポート生成','メール自動送信'],
    desc: '毎月手作業で行っていたExcelデータの集計・PDF化・メール送信をPythonで完全自動化。作業時間を月5時間→15分に短縮。定型フォーマットへの対応、複数部署への自動配信も実現した。',
    tags: ['Python','openpyxl','reportlab','smtplib'],
    github: 'https://github.com/（ユーザー名）/work-report'
  },
  {
    badge: 'VBA',
    title: 'Excel請求書一括作成マクロ',
    date: '2025年02月',
    image: '',
    youtube: 'dQw4w9WgXcQ',
    flow: ['顧客リスト読込','テンプレ複製','データ差込','PDF保存・出力'],
    desc: '顧客マスタとテンプレートから請求書を一括生成するVBAマクロ。月30件の請求書作成が約3分で完了。ファイル名の自動命名・フォルダ振り分けも対応し、ヒューマンエラーをゼロにした。',
    tags: ['VBA','Excel','PDF出力'],
    github: 'https://github.com/（ユーザー名）/work-invoice'
  },
  {
    badge: 'GAS',
    title: 'Googleフォーム自動集計システム',
    date: '2024年12月',
    image: '',
    youtube: '',
    flow: ['フォーム回答受信','スプレッドシート集計','グラフ自動更新','Slack通知送信'],
    desc: 'アンケートフォームの回答を自動集計し、グラフ付きのサマリーをSlackへ通知するGASシステム。集計の手作業をゼロにし、リアルタイムで結果を共有できる体制を構築した。',
    tags: ['GAS','Googleフォーム','スプレッドシート','Slack'],
    github: 'https://github.com/（ユーザー名）/work-gas'
  },
  /* ---- 作品4以降をここに追加 ---- */
];

/* ---- ここから下は編集不要 ---- */

// ヒーロー背景の透明度調整
(function(){
  const overlay = document.getElementById('hero-overlay');
  const slider  = document.getElementById('opacity-slider');
  const label   = document.getElementById('opacity-label');
  if(!overlay || !slider) return;
  slider.addEventListener('input', function(){
    const v = parseFloat(this.value);
    overlay.style.background = 'rgba(10,20,50,' + v + ')';
    label.textContent = Math.round(v * 100) + '%';
  });
})();

// 作品カードの描画
const grid = document.getElementById('works-grid');

function thumbHTML(w, small){
  const h = small ? '160px' : '220px';
  if(w.youtube){
    if(small){
      return '<div class="work-thumb-placeholder" style="height:'+h+';background:#000;position:relative">'
        + '<img src="https://img.youtube.com/vi/'+w.youtube+'/mqdefault.jpg" style="width:100%;height:100%;object-fit:cover;opacity:.8">'
        + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">'
        + '<div style="width:40px;height:40px;background:rgba(255,0,0,.85);border-radius:50%;display:flex;align-items:center;justify-content:center">'
        + '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div></div></div>';
    }
    return '<iframe src="https://www.youtube.com/embed/'+w.youtube+'?rel=0" allowfullscreen allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"></iframe>';
  }
  if(w.image){
    return small
      ? '<img src="'+w.image+'" alt="'+w.title+'">'
      : '<img src="'+w.image+'" alt="'+w.title+'" style="width:100%;height:'+h+';object-fit:cover;display:block">';
  }
  return '<div class="'+(small?'work-thumb-placeholder':'modal-media-placeholder')+'" style="height:'+h+'">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>';
}

function renderWorks(cat){
  grid.innerHTML = '';
  WORKS.filter(w => cat === 'all' || w.badge === cat).forEach(function(w, i){
    const a = document.createElement('a');
    a.className = 'work-card';
    a.href = '#';
    a.setAttribute('data-index', WORKS.indexOf(w));
    a.onclick = function(e){ e.preventDefault(); openModal(WORKS.indexOf(w)); };
    a.innerHTML =
      '<div class="work-thumb">'+thumbHTML(w, true)+'</div>'
      +'<div class="work-info">'
      +'<div class="work-badge">'+w.badge+'</div>'
      +'<div class="work-title">'+w.title+'</div>'
      +'<div class="work-desc">'+w.desc+'</div>'
      +'<div class="work-tags">'+w.tags.map(function(t){return '<span class="work-tag">'+t+'</span>';}).join('')+'</div>'
      +'</div>';
    grid.appendChild(a);
  });
}

function filter(cat, btn){
  document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  renderWorks(cat);
}

// モーダル
function openModal(i){
  const w = WORKS[i];
  document.getElementById('m-badge').textContent = w.badge;
  document.getElementById('m-title').textContent = w.title;
  document.getElementById('m-date').textContent  = w.date;
  document.getElementById('m-desc').textContent  = w.desc;
  document.getElementById('m-media').innerHTML   = thumbHTML(w, false);
  document.getElementById('m-flow').innerHTML    = w.flow.map(function(s, idx){
    return '<span class="flow-step">'+s+'</span>'+(idx < w.flow.length-1 ? '<span class="flow-arrow">→</span>' : '');
  }).join('');
  document.getElementById('m-tags').innerHTML = w.tags.map(function(t){
    return '<span class="modal-tag">'+t+'</span>';
  }).join('');
  const link = document.getElementById('m-link');
  if(w.github){ link.href = w.github; link.style.display = 'inline-flex'; }
  else { link.style.display = 'none'; }
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e){
  if(e && e.target !== document.getElementById('modal-overlay')) return;
  closeModalBtn();
}
function closeModalBtn(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  // YouTube自動停止
  const iframe = document.querySelector('#m-media iframe');
  if(iframe){ iframe.src = iframe.src; }
}
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModalBtn(); });

// ハンバーガーメニュー
function toggleMenu(){
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

renderWorks('all');
