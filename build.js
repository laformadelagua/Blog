#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');

const data = yaml.load(fs.readFileSync('contenido.yml', 'utf8'));
const { blog, categorias } = data;

const PALETTE = [
  { bg: '#C4735A', light: '#FBF0EC', dark: '#7A3A22' },
  { bg: '#7A9E7E', light: '#EDF5EE', dark: '#3A5E3E' },
  { bg: '#D4A84B', light: '#FBF3E3', dark: '#7A5A1E' },
  { bg: '#C47A8A', light: '#FBF0F2', dark: '#7A3A4A' },
  { bg: '#5B8FA8', light: '#E8F2F8', dark: '#2A5A72' },
  { bg: '#9B7AC4', light: '#F2EEF8', dark: '#5A3A7A' },
];

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const docIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
const dlIcon  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

function fileLink(archivo) {
  return `<a href="${esc(archivo.enlace)}" class="file-link" target="_blank" rel="noopener noreferrer"><span class="fi">${docIcon}</span><span class="fn">${esc(archivo.titulo)}</span><span class="di">${dlIcon}</span></a>`;
}

const tabs = categorias.map((cat, i) => {
  const c = PALETTE[i % PALETTE.length];
  return `<button class="tab${i === 0 ? ' active' : ''}" onclick="show(${i})" style="--c:${c.bg};--cl:${c.light};--cd:${c.dark}">${esc(cat.nombre)}</button>`;
}).join('\n      ');

function renderSubcats(subcats, c, depth = 0) {
  if (!subcats || subcats.length === 0) return '';
  const indent = depth > 0 ? ' class="subcat subcat--nested"' : ' class="subcat"';
  return subcats.map(sub => `
    <details${indent}>
      <summary class="subcat-title" style="color:${c.bg};--sz:${depth === 0 ? '1.35rem' : '1.15rem'}">
        <span class="subcat-arrow" style="color:${c.bg}">▶</span>
        <span class="subcat-bar" style="background:${c.bg}"></span>
        ${esc(sub.nombre)}
      </summary>
      <div class="subcat-body">
        <div class="grid">${(sub.archivos || []).map(fileLink).join('')}</div>
        ${renderSubcats(sub.subcategorias, c, depth + 1)}
      </div>
    </details>`).join('');
}

const panels = categorias.map((cat, i) => {
  const c = PALETTE[i % PALETTE.length];

  const mainFiles = (cat.archivos || []).map(fileLink).join('');

  return `
  <section class="panel"${i !== 0 ? ' hidden' : ''} style="--c:${c.bg};--cl:${c.light};--cd:${c.dark}">
    <div class="panel-head"><h2>${esc(cat.nombre)}</h2></div>
    <div class="grid">${mainFiles}</div>
    ${renderSubcats(cat.subcategorias, c)}
  </section>`;
}).join('');

const css = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--cream:#FBF7F0;--dark:#2C1E14;--mid:#7A6352;--border:#DDD3C4}
    body{font-family:'Nunito',sans-serif;background:var(--cream);color:var(--dark);min-height:100vh}
    .wrap{max-width:860px;margin:0 auto;padding:0 1.5rem}

    header{padding:3rem 0 2.5rem}
    .header-inner{display:flex;align-items:center;gap:2rem}
    .logo-wrap{width:84px;height:84px;flex-shrink:0;display:grid;place-items:center}
    .logo{width:60px;height:60px;background:#fff;border:2.5px solid var(--dark);transform:rotate(45deg);display:grid;place-items:center;box-shadow:3px 3px 0 var(--dark);border-radius:4px}
    .logo span{transform:rotate(-45deg);font-size:1.75rem;line-height:1;display:block}
    .logo-img{width:84px;height:84px;border-radius:50%;object-fit:cover;border:2.5px solid var(--dark);box-shadow:3px 3px 0 var(--dark)}
    h1{font-family:'Caveat',cursive;font-size:clamp(1.7rem,4.5vw,2.7rem);font-weight:700;line-height:1.1}
    .desc{margin-top:.5rem;color:var(--mid);font-size:1rem;font-weight:500;line-height:1.5}

    .divider{height:2px;background:var(--border);margin-bottom:2rem}

    .tabs{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2rem}
    .tab{padding:.5rem 1.3rem;border:2px solid var(--c);border-radius:999px;background:#fff;color:var(--cd);font-family:'Nunito',sans-serif;font-size:.92rem;font-weight:700;cursor:pointer;transition:background .15s,color .15s;letter-spacing:.01em}
    .tab:hover{background:var(--cl)}
    .tab.active{background:var(--c);color:#fff}
    .tab:active{transform:scale(.97)}

    .panel{animation:up .2s ease}
    @keyframes up{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
    .panel-head{background:var(--cl);border-left:4px solid var(--c);padding:.9rem 1.25rem;margin-bottom:1.5rem;border-radius:0 8px 8px 0}
    .panel-head h2{font-family:'Caveat',cursive;font-size:1.8rem;font-weight:700;color:var(--cd)}

    .grid{display:grid;gap:.5rem}
    .file-link{display:flex;align-items:center;gap:.875rem;padding:.8rem 1.1rem;background:#fff;border:1.5px solid var(--border);border-left:3.5px solid var(--c);border-radius:10px;text-decoration:none;color:var(--dark);font-weight:600;font-size:.92rem;transition:background .15s,transform .15s}
    .file-link:hover{background:var(--cl);border-color:var(--c);transform:translateX(3px)}
    .fi{color:var(--c);flex-shrink:0;display:flex;align-items:center}
    .fn{flex:1}
    .di{color:var(--c);opacity:.6;flex-shrink:0;display:flex;align-items:center}

    .subcat{margin-top:1.5rem}
    .subcat--nested{margin-top:1rem}
    details.subcat>summary{list-style:none}
    details.subcat>summary::-webkit-details-marker{display:none}
    .subcat-title{font-family:'Caveat',cursive;font-size:var(--sz,1.35rem);font-weight:700;display:flex;align-items:center;gap:.625rem;padding:.4rem .5rem;border-radius:8px;cursor:pointer;transition:background .15s;user-select:none}
    .subcat-title:hover{background:var(--cl)}
    .subcat-arrow{font-size:.65em;transition:transform .2s;flex-shrink:0;line-height:1}
    details[open]>.subcat-title .subcat-arrow{transform:rotate(90deg)}
    .subcat-bar{display:block;width:20px;height:2.5px;border-radius:2px;flex-shrink:0}
    .subcat-body{margin-top:.5rem;padding-left:1.25rem;border-left:2px solid var(--cl)}

    footer{margin-top:4rem;padding:1.75rem 0;border-top:2px solid var(--border);text-align:center;color:var(--mid);font-size:.83rem}

    @media(max-width:600px){
      .header-inner{flex-direction:column;text-align:center;gap:1.25rem}
      .tab{font-size:.82rem;padding:.42rem .9rem}
      .file-link{font-size:.87rem;padding:.7rem .875rem}
    }`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(blog.titulo)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${css}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="header-inner">
        <div class="logo-wrap">
          ${blog.logo_imagen
            ? `<img class="logo-img" src="${esc(blog.logo_imagen)}" alt="Logo">`
            : `<div class="logo"><span>${esc(blog.logo_texto)}</span></div>`}
        </div>
        <div>
          <h1>${esc(blog.titulo)}</h1>
          <p class="desc">${esc(blog.descripcion)}</p>
        </div>
      </div>
    </header>

    <div class="divider"></div>

    <nav class="tabs">
      ${tabs}
    </nav>

    <main>${panels}
    </main>

    <footer>Hecho con mucho cariño 🌱</footer>
  </div>

  <script>
    function show(i) {
      document.querySelectorAll('.tab').forEach((t, j) => t.classList.toggle('active', i === j));
      document.querySelectorAll('.panel').forEach((p, j) => p.hidden = i !== j);
    }
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('✓ index.html generado correctamente');
