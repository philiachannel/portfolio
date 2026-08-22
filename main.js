/* ============================================================
   main.js — config.js の定数を読み込んでページを構築する
   作品データ・個人情報の編集は config.js のみでOK
   ============================================================ */

const GH_BASE = 'https://github.com/' + CONFIG.githubUser + '/';

/* ---- キャラクターアニメーション ---- */
(function(){
  /* 髪アニメ: 1→2→3→2→1→2→3... のシーケンス */
  var hairSeq = [1, 2, 3, 2]; // 1始まり、末尾の2から次ループの1へ繋がる
  var hairIdx = 0;
  var hairB = document.getElementById('char-hair-b');
  var hairF = document.getElementById('char-hair-f');

  if(hairB && hairF){
    setInterval(function(){
      hairIdx = (hairIdx + 1) % hairSeq.length;
      var n = hairSeq[hairIdx];
      hairB.src = 'images/character/char-hair-b' + n + '.png';
      hairF.src = 'images/character/char-hair-f' + n + '.png';
    }, CONFIG.charAnim.hairInterval);
  }

  /* 瞬きアニメ */
  var eyeOpen  = document.getElementById('char-eye-open');
  var eyeClose = document.getElementById('char-eye-close');

  if(eyeOpen && eyeClose){
    setInterval(function(){
      eyeOpen.style.opacity  = '0';
      eyeClose.style.opacity = '1';
      setTimeout(function(){
        eyeOpen.style.opacity  = '1';
        eyeClose.style.opacity = '0';
      }, CONFIG.charAnim.blinkDuration);
    }, CONFIG.charAnim.blinkInterval);
  }
})();

/* ---- ナビゲーション ---- */
(function(){
  const nav    = document.getElementById('nav-links');
  const mobile = document.getElementById('mobile-menu');
  CONFIG.navItems.forEach(function(item){
    const li = document.createElement('li');
    li.innerHTML = '<a href="'+item.href+'">'+item.label+'</a>';
    nav.appendChild(li);
    const a = document.createElement('a');
    a.href = item.href; a.textContent = item.label;
    a.onclick = closeMenu;
    mobile.appendChild(a);
  });
})();

/* ---- ヒーロー背景の透明度調整 ---- */
(function(){
  const overlay = document.getElementById('hero-overlay');
  const slider  = document.getElementById('opacity-slider');
  const label   = document.getElementById('opacity-label');
  if(!overlay || !slider) return;
  slider.value = CONFIG.heroOverlay;
  label.textContent = Math.round(CONFIG.heroOverlay * 100) + '%';
  overlay.style.background = 'rgba(10,20,50,' + CONFIG.heroOverlay + ')';
  slider.addEventListener('input', function(){
    const v = parseFloat(this.value);
    overlay.style.background = 'rgba(10,20,50,' + v + ')';
    label.textContent = Math.round(v * 100) + '%';
  });
})();

/* ---- 事業内容描画（PC: 横並びホバー拡大 / スマホ: スワイプ式） ---- */
(function(){
  var track = document.getElementById('svc-track');
  var dotsEl = document.getElementById('svc-dots');
  if(!track || !CONFIG.services || CONFIG.services.length === 0) return;

  /* 画像カード生成 */
  CONFIG.services.forEach(function(svc, i){
    var div = document.createElement('div');
    div.className = 'svc-item';
    var img = document.createElement('img');
    img.src = svc.src;
    img.alt = svc.alt;
    div.appendChild(img);
    track.appendChild(div);

    /* スマホ用ドット */
    var dot = document.createElement('span');
    dot.className = 'svc-dot' + (i === 0 ? ' active' : '');
    dot.onclick = function(){ svcGoTo(i); };
    dotsEl.appendChild(dot);
  });

  /* スマホ用スワイプ */
  var curIdx  = 0;
  var startX  = 0;
  var isDrag  = false;

  function svcGoTo(idx){
    var items  = track.querySelectorAll('.svc-item');
    var dots   = dotsEl.querySelectorAll('.svc-dot');
    if(idx < 0) idx = 0;
    if(idx >= items.length) idx = items.length - 1;
    curIdx = idx;
    var itemW  = items[0].offsetWidth + 20; /* gap=1.25rem≈20px */
    track.style.transform = 'translateX(-' + (itemW * curIdx) + 'px)';
    dots.forEach(function(d, i){ d.classList.toggle('active', i === curIdx); });
  }

  /* タッチスワイプ */
  track.addEventListener('touchstart', function(e){
    startX = e.touches[0].clientX;
    isDrag = true;
  }, {passive:true});
  track.addEventListener('touchend', function(e){
    if(!isDrag) return;
    var diff = startX - e.changedTouches[0].clientX;
    if(Math.abs(diff) > 40) svcGoTo(curIdx + (diff > 0 ? 1 : -1));
    isDrag = false;
  }, {passive:true});

  /* マウスドラッグ（PCでもドラッグ可） */
  var mouseStartX = 0;
  track.parentElement.addEventListener('mousedown', function(e){
    mouseStartX = e.clientX; isDrag = true;
  });
  window.addEventListener('mouseup', function(e){
    if(!isDrag) return;
    var diff = mouseStartX - e.clientX;
    if(Math.abs(diff) > 40) svcGoTo(curIdx + (diff > 0 ? 1 : -1));
    isDrag = false;
  });
})();

/* ---- プロフィール描画 ---- */
(function(){
  const svgGH   = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>';
  const svgZenn = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.205 0-.41.117-.527.294l-6.655 10.672c-.176.264.029.586.351.586h4.982c.264 0 .499-.147.47-.41z"/></svg>';
  const svgX    = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>';
  document.getElementById('profile-content').innerHTML =
    '<div class="profile-grid">'
    + '<div><img src="images/profile.png" alt="プロフィール写真" class="profile-img" onerror="this.style.display=\'none\'"></div>'
    + '<div>'
    + '<div class="profile-name">'+CONFIG.name+'</div>'
    + '<div class="profile-en">'+CONFIG.nameEn+'</div>'
    + '<p class="profile-bio">'+CONFIG.bio+'</p>'
    + '<div class="profile-links">'
    + '<a href="https://github.com/'+CONFIG.githubUser+'" class="profile-link" target="_blank">'+svgGH+'GitHub</a>'
    + '<a href="https://zenn.dev/'+CONFIG.zennUser+'" class="profile-link" target="_blank">'+svgZenn+'Zenn</a>'
    + '<a href="https://x.com/'+CONFIG.xUser+'" class="profile-link" target="_blank">'+svgX+'X</a>'
    + '</div></div></div>';
})();

/* ---- スキル描画 ---- */
function stars(level){
  var s = '';
  for(var i=1;i<=5;i++) s += '<span class="star'+(i<=level?' on':'')+'">★</span>';
  return s;
}
function renderSkill(cat){
  var items = CONFIG.skills[cat];
  var html = '<div class="skill-table">';
  items.forEach(function(item){
    html += '<div class="skill-row">'
      + '<div class="skill-row-name">'+item.name+'</div>'
      + '<div class="skill-row-years">'+item.years+'年</div>'
      + '<div class="skill-row-stars">'+stars(item.level)+'</div>'
      + '</div>';
  });
  html += '</div>';
  document.getElementById('skill-content').innerHTML = html;
}
function switchSkillTab(cat, btn){
  document.querySelectorAll('.skill-tab').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  renderSkill(cat);
}
renderSkill('languages');

/* ---- 特技・趣味 描画 ---- */
(function(){
  document.getElementById('strengths-content').innerHTML =
    '<ul class="sh-list">' + CONFIG.strengths.map(function(s){
      return '<li><span class="sh-dot">✦</span>'+s+'</li>';
    }).join('') + '</ul>';
  document.getElementById('hobbies-content').innerHTML =
    '<ul class="sh-list">' + CONFIG.hobbies.map(function(h){
      return '<li><span class="sh-dot">✦</span>'+h+'</li>';
    }).join('') + '</ul>';
})();

/* ---- ヒストリー描画 ---- */
(function(){
  var html = '<div class="timeline">';
  CONFIG.history.forEach(function(item, idx){
    html += '<div class="tl-item'+(idx===CONFIG.history.length-1?' last':'')+'">'
      + '<div class="tl-date">'+item.date+'</div>'
      + '<div class="tl-line"><div class="tl-dot"></div></div>'
      + '<div class="tl-body"><div class="tl-title">'+item.title+'</div><div class="tl-desc">'+item.desc+'</div></div>'
      + '</div>';
  });
  html += '</div>';
  document.getElementById('history-content').innerHTML = html;
})();

/* ---- 作品フィルターボタン生成 ---- */
(function(){
  // badges配列の全バッジを重複なく収集
  var allBadges = [];
  CONFIG.works.forEach(function(w){
    (w.badges || (w.badge ? [w.badge] : [])).forEach(function(b){
      if(allBadges.indexOf(b) === -1) allBadges.push(b);
    });
  });
  var html = '<button class="filter-btn active" onclick="filter(\'all\',this)">すべて</button>';
  allBadges.forEach(function(b){
    html += '<button class="filter-btn" onclick="filter(\''+b+'\',this)">'+b+'</button>';
  });
  document.getElementById('works-filter').innerHTML = html;
})();

/* ============================================================
   メディアヘルパー
   media配列: [{type:'image',src:'...'},{type:'youtube',src:'ID'}]
   small=true : カードサムネ用（先頭1件のみ表示）
   small=false: モーダル用（全件スライダー）
   ============================================================ */
function buildSlider(items, title){
  if(items.length === 0){
    return '<div class="modal-media-placeholder">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">'
      + '<rect x="3" y="3" width="18" height="18" rx="2"/>'
      + '<circle cx="8.5" cy="8.5" r="1.5"/>'
      + '<path d="M21 15l-5-5L5 21"/></svg></div>';
  }
  if(items.length === 1) return buildSlideItem(items[0], title, false);

  var slides = items.map(function(m, i){
    return '<div class="slide'+(i===0?' active':'')+'" data-idx="'+i+'">'
      + buildSlideItem(m, title, false)
      + '</div>';
  }).join('');
  var dots = items.map(function(_, i){
    return '<span class="sl-dot'+(i===0?' active':'')+'" onclick="slideTo('+i+')"></span>';
  }).join('');
  return '<div class="slider" id="modal-slider">'
    + '<div class="slides">'+slides+'</div>'
    + '<button class="sl-prev" onclick="slideStep(-1)">&#8249;</button>'
    + '<button class="sl-next" onclick="slideStep(1)">&#8250;</button>'
    + '<div class="sl-dots">'+dots+'</div>'
    + '</div>';
}

function buildSlideItem(m, title, small){
  if(m.type === 'youtube'){
    if(small){
      // カードサムネ：YouTubeサムネ画像＋再生アイコン
      return '<div class="work-thumb-placeholder" style="background:#000;position:relative;height:100%">'
        + '<img src="https://img.youtube.com/vi/'+m.src+'/mqdefault.jpg"'
        + ' style="width:100%;height:100%;object-fit:cover;opacity:.8">'
        + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">'
        + '<div style="width:40px;height:40px;background:rgba(255,0,0,.85);border-radius:50%;display:flex;align-items:center;justify-content:center">'
        + '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>'
        + '</div></div></div>';
    }
    return '<iframe src="https://www.youtube.com/embed/'+m.src+'?rel=0" allowfullscreen'
      + ' allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"></iframe>';
  }
  // image
  if(small) return '<img src="'+m.src+'" alt="'+title+'">';
  return '<img src="'+m.src+'" alt="'+title+'" style="width:100%;display:block">';
}

function getThumbItem(w){
  // カードサムネ用に先頭メディアを返す
  var media = w.media || [];
  // 旧形式互換
  if(media.length === 0){
    if(w.images && w.images.length > 0) media = w.images.map(function(s){ return {type:'image',src:s}; });
    else if(w.youtube) media = [{type:'youtube',src:w.youtube}];
  }
  return media;
}

/* ---- スライダー操作 ---- */
function slideTo(idx){
  var slider = document.getElementById('modal-slider');
  if(!slider) return;
  // スライド内のiframeを停止（YouTube自動停止）
  slider.querySelectorAll('iframe').forEach(function(f){ f.src = f.src; });
  var slides = slider.querySelectorAll('.slide');
  var dots   = slider.querySelectorAll('.sl-dot');
  slides.forEach(function(s,i){ s.classList.toggle('active', i===idx); });
  dots.forEach(function(d,i){ d.classList.toggle('active', i===idx); });
}
function slideStep(dir){
  var slider = document.getElementById('modal-slider');
  if(!slider) return;
  var slides = slider.querySelectorAll('.slide');
  var cur = 0;
  slides.forEach(function(s,i){ if(s.classList.contains('active')) cur=i; });
  slideTo((cur+dir+slides.length)%slides.length);
}

/* ---- 作品カード描画 ---- */
const grid = document.getElementById('works-grid');

function renderWorks(cat){
  grid.innerHTML = '';
  CONFIG.works.filter(function(w){
    if(cat === 'all') return true;
    var badges = w.badges || (w.badge ? [w.badge] : []);
    return badges.indexOf(cat) !== -1;
  }).forEach(function(w){
    var idx = CONFIG.works.indexOf(w);
    var a = document.createElement('a');
    a.className = 'work-card';
    a.href = '#';
    a.onclick = function(e){ e.preventDefault(); openModal(idx); };

    var media = getThumbItem(w);
    var thumb = media.length > 0
      ? buildSlideItem(media[0], w.title, true)
      : '<div class="work-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>';

    var badges = w.badges || (w.badge ? [w.badge] : []);
    var badgeHTML = badges.map(function(b){
      return '<span class="work-badge">'+b+'</span>';
    }).join('');

    a.innerHTML = '<div class="work-thumb">'+thumb+'</div>'
      +'<div class="work-info">'
      +'<div class="work-badge-wrap">'+badgeHTML+'</div>'
      +'<div class="work-title">'+w.title+'</div>'
      +'<div class="work-desc">'+w.desc+'</div>'
      +'<div class="work-tags">'+w.tags.map(function(t){ return '<span class="work-tag">'+t+'</span>'; }).join('')+'</div>'
      +'</div>';
    grid.appendChild(a);
  });
}

function filter(cat, btn){
  document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  renderWorks(cat);
}

/* ---- モーダル ---- */
function openModal(i){
  var w = CONFIG.works[i];
  var badges = w.badges || (w.badge ? [w.badge] : []);
  document.getElementById('m-badge').innerHTML = badges.map(function(b){
    return '<span class="work-badge" style="margin-right:4px">'+b+'</span>';
  }).join('');
  document.getElementById('m-title').textContent = w.title;
  document.getElementById('m-date').textContent  = w.date;
  document.getElementById('m-desc').innerHTML = w.desc.replace(/\n/g, '<br>');

  // media配列を構築（旧形式互換）
  var media = w.media || [];
  if(media.length === 0){
    if(w.images && w.images.length > 0) media = w.images.map(function(s){ return {type:'image',src:s}; });
    else if(w.youtube) media = [{type:'youtube',src:w.youtube}];
  }
  document.getElementById('m-media').innerHTML = buildSlider(media, w.title);

  document.getElementById('m-flow').innerHTML = w.flow.map(function(s,idx){
    return '<span class="flow-step">'+s+'</span>'+(idx<w.flow.length-1?'<span class="flow-arrow">→</span>':'');
  }).join('');
  document.getElementById('m-tags').innerHTML = w.tags.map(function(t){
    return '<span class="modal-tag">'+t+'</span>';
  }).join('');
  var link = document.getElementById('m-link');
  if(w.github){ link.href = GH_BASE+w.github; link.style.display='inline-flex'; }
  else{ link.style.display='none'; }
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e){
  if(e && e.target!==document.getElementById('modal-overlay')) return;
  closeModalBtn();
}
function closeModalBtn(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  // モーダル内の全iframeを停止
  document.querySelectorAll('#m-media iframe').forEach(function(f){ f.src = f.src; });
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModalBtn(); });

/* ---- コンタクト描画 ---- */
(function(){
  var svgMail = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>';
  var svgWork = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>';
  var svgCoco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>';
  document.getElementById('contact-content').innerHTML =
    '<div class="contact-card">'
    + '<p style="font-size:14px;color:var(--text2)">業務自動化・ツール開発のご相談はお気軽にどうぞ！</p>'
    + '<div class="contact-items">'
    + '<a href="mailto:'+CONFIG.email+'" class="contact-item"><div class="contact-icon">'+svgMail+'</div>'+CONFIG.email+'</a>'
    + '<a href="https://crowdworks.jp/public/employees/'+CONFIG.crowdworksId+'" class="contact-item" target="_blank"><div class="contact-icon">'+svgWork+'</div>クラウドワークス</a>'
    + '<a href="https://coconala.com/users/'+CONFIG.coconalaId+'" class="contact-item" target="_blank"><div class="contact-icon">'+svgCoco+'</div>ココナラ</a>'
    + '</div></div>';
})();

/* ---- フッター描画 ---- */
document.getElementById('footer-content').innerHTML =
  '<p>&copy; '+CONFIG.copyYear+' '+CONFIG.nameEn+'. All rights reserved.</p>';

/* ---- ハンバーガーメニュー ---- */
function toggleMenu(){
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ---- 画像保護 ---- */
document.addEventListener('contextmenu', function(e){ if(e.target.tagName==='IMG') e.preventDefault(); });
document.addEventListener('dragstart',   function(e){ if(e.target.tagName==='IMG') e.preventDefault(); });
(function(){
  var s = document.createElement('style');
  s.textContent = 'img{-webkit-user-drag:none;user-drag:none;-webkit-touch-callout:none;pointer-events:none}'
    + ' .work-card,.modal-media,a,.sl-prev,.sl-next,.sl-dot{pointer-events:auto}';
  document.head.appendChild(s);
})();

renderWorks('all');
