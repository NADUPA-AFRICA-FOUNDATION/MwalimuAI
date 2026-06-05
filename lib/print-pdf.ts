/**
 * Mwalimu AI — PDF Generator
 * Generates a real PDF file using html2canvas + jsPDF.
 * No browser print dialog → no URL/date/page-number artifacts.
 */

export type PDFType = 'lesson-plan' | 'feedback' | 'policy' | 'research' | 'default'

export interface PrintOptions {
  title:     string
  subtitle?: string
  meta?:     string
  content:   string
  type?:     PDFType
}

interface TypeCfg {
  bg: string; bgDeep: string; bgLight: string; bgMid: string
  ink: string; amber: string; label: string
}

const BRAND_TEAL  = '#0c9a7b'
const BRAND_DEEP  = '#0a7d64'
const BRAND_LIGHT = '#edfaf6'
const BRAND_MID   = '#b6eed8'
const BRAND_INK   = '#0a7d64'
const BRAND_AMBER = '#c98900'

const TYPE_CFG: Record<PDFType, TypeCfg> = {
  'lesson-plan': { bg: BRAND_TEAL, bgDeep: BRAND_DEEP, bgLight: BRAND_LIGHT, bgMid: BRAND_MID, ink: BRAND_INK, amber: BRAND_AMBER, label: 'Lesson Plan' },
  'feedback':    { bg: '#059669',  bgDeep: '#047857',  bgLight: '#f0fdf4',  bgMid: '#bbf7d0', ink: '#047857', amber: '#d97706',  label: 'CBC Feedback' },
  'policy':      { bg: '#d97706',  bgDeep: '#b45309',  bgLight: '#fffbeb',  bgMid: '#fde68a', ink: '#b45309', amber: BRAND_TEAL, label: 'Policy Brief' },
  'research':    { bg: '#6d28d9',  bgDeep: '#5b21b6',  bgLight: '#f5f3ff',  bgMid: '#ddd6fe', ink: '#5b21b6', amber: BRAND_AMBER, label: 'Action Research' },
  'default':     { bg: BRAND_TEAL, bgDeep: BRAND_DEEP, bgLight: BRAND_LIGHT, bgMid: BRAND_MID, ink: BRAND_INK, amber: BRAND_AMBER, label: 'Document' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export — async, downloads a true PDF file with no browser artifacts
// ─────────────────────────────────────────────────────────────────────────────
export async function printPDF({ title, subtitle, meta, content, type = 'default' }: PrintOptions): Promise<void> {
  const cfg  = TYPE_CFG[type]
  const date = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  const body = mdToHtml(content, cfg)

  // ── 1. Build hidden off-screen container ──────────────────────────────────
  // Must use position:absolute with positive coordinates — html2canvas crops
  // using getBoundingClientRect(), and Canvas APIs silently return blank pixels
  // for negative coordinates (position:fixed left:-9999px was producing blank PDFs).
  const container = document.createElement('div')
  container.setAttribute('aria-hidden', 'true')
  const docBottom = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    window.scrollY + window.innerHeight,
  ) + 50
  Object.assign(container.style, {
    position:      'absolute',
    top:           `${docBottom}px`,
    left:          '0',
    width:         '820px',
    background:    '#ffffff',
    zIndex:        '-1',
    pointerEvents: 'none',
    overflow:      'visible',
  })

  // Inject print CSS (no @media print block — html2canvas uses screen rendering)
  const styleEl = document.createElement('style')
  styleEl.textContent = buildCSS(cfg)
  container.appendChild(styleEl)

  // Inject document HTML
  const docEl = document.createElement('div')
  docEl.innerHTML = buildHTML(cfg, title, subtitle, date, meta, body)
  container.appendChild(docEl)

  document.body.appendChild(container)

  try {
    // ── 2. Ensure fonts are loaded before capture ─────────────────────────
    await document.fonts.ready

    // ── 3. Capture with html2canvas ───────────────────────────────────────
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(docEl, {
      scale:           2,          // 2× pixel ratio for crisp output
      useCORS:         true,
      logging:         false,
      backgroundColor: '#ffffff',
      windowWidth:     820,
      // html2canvas windowBounds uses scrollX/scrollY as positive offsets
      // matching window.pageXOffset / pageYOffset (the defaults). Passing them
      // explicitly prevents the library from reading a stale value during the
      // async clone phase.
      scrollX:         window.scrollX,
      scrollY:         window.scrollY,
    })

    // ── 4. Slice canvas into A4 pages and build PDF ───────────────────────
    const { jsPDF } = await import('jspdf')

    const A4_W_MM = 210   // A4 width in mm
    const A4_H_MM = 297   // A4 height in mm

    // How many canvas pixels correspond to one A4 page height
    const pageHeightPx = Math.floor(canvas.width * (A4_H_MM / A4_W_MM))
    const totalPages   = Math.ceil(canvas.height / pageHeightPx)

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage()

      // Slice this page out of the full canvas
      const srcY     = i * pageHeightPx
      const sliceH   = Math.min(pageHeightPx, canvas.height - srcY)

      const pageCanvas       = document.createElement('canvas')
      pageCanvas.width       = canvas.width
      pageCanvas.height      = pageHeightPx
      const ctx              = pageCanvas.getContext('2d')!
      ctx.fillStyle          = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, pageHeightPx)
      ctx.drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH)

      pdf.addImage(
        pageCanvas.toDataURL('image/jpeg', 0.94),
        'JPEG',
        0, 0,
        A4_W_MM, A4_H_MM,
      )
    }

    // ── 5. Trigger download ───────────────────────────────────────────────
    const filename = title
      .replace(/[^a-z0-9 ·–\-]/gi, '')
      .replace(/\s+/g, '_')
      .slice(0, 80)
    pdf.save(`${filename || 'Mwalimu_AI'}.pdf`)

  } finally {
    // Always remove the temp container
    if (container.parentNode) container.parentNode.removeChild(container)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS for the document (screen-only, no @media print needed)
// ─────────────────────────────────────────────────────────────────────────────
function buildCSS(cfg: TypeCfg): string {
  return `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

body,div{font-family:Georgia,Charter,'Palatino Linotype','Book Antiqua',serif;font-size:12.5px;line-height:1.8;color:#1e2d3d;background:#fff;}

/* ── HEADER ── */
.hdr{background-color:${cfg.bg};color:#fff;display:flex;align-items:stretch;position:relative;overflow:hidden;}
.hdr-deco1{position:absolute;width:260px;height:260px;background-color:rgba(255,255,255,0.07);border-radius:50%;top:-90px;right:80px;pointer-events:none;}
.hdr-deco2{position:absolute;width:180px;height:180px;background-color:rgba(255,255,255,0.05);border-radius:50%;bottom:-70px;left:40px;pointer-events:none;}
.hdr-main{flex:1;padding:28px 44px 26px;position:relative;z-index:1;}
.hdr-type{width:86px;background-color:${cfg.bgDeep};display:flex;align-items:center;justify-content:center;padding:20px 10px;flex-shrink:0;position:relative;z-index:1;}
.hdr-type-text{writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:10px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.88);font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.brand-row{display:flex;align-items:center;gap:11px;margin-bottom:16px;}
.brand-logo{width:38px;height:38px;background-color:rgba(255,255,255,0.18);border:2px solid rgba(255,255,255,0.35);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#fff;flex-shrink:0;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.brand-name{font-size:14px;font-weight:700;line-height:1.2;color:rgba(255,255,255,0.95);font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.brand-tagline{font-size:10.5px;color:rgba(255,255,255,0.6);margin-top:2px;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.hdr-sep{width:40px;height:2px;background-color:rgba(255,255,255,0.28);border-radius:2px;margin-bottom:12px;}
.doc-title{font-size:23px;font-weight:800;letter-spacing:-0.4px;line-height:1.2;color:#fff;margin-bottom:4px;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.doc-sub{font-size:12px;color:rgba(255,255,255,0.72);font-family:-apple-system,'Segoe UI',Arial,sans-serif;}

/* ── META RIBBON ── */
.meta-ribbon{background-color:${cfg.bgLight};border-bottom:2px solid ${cfg.bgMid};padding:10px 44px;display:flex;align-items:center;flex-wrap:wrap;gap:5px 12px;font-size:11px;color:${cfg.ink};font-weight:500;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.meta-chip{background-color:${cfg.bg};color:#fff;border-radius:5px;padding:3px 10px;font-size:9.5px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.meta-dot{color:${cfg.bgMid};font-size:14px;line-height:1;}

/* ── CONTENT ── */
.content{padding:0 44px 48px;}

/* ── SECTION HEADERS ── */
.sh{font-family:-apple-system,'Segoe UI',Arial,sans-serif;font-size:10.5px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;color:${cfg.bg};padding:0 0 8px 0;margin:32px 0 16px;border-bottom:2px solid ${cfg.bg};}
.sh-sub{font-family:-apple-system,'Segoe UI',Arial,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:${cfg.ink};padding:0 0 0 11px;margin:22px 0 11px;border-left:3px solid ${cfg.bg};line-height:1.5;}

/* ── ACTIVITY CARDS ── */
.act-hdr{display:flex;align-items:center;gap:10px;margin:20px 0 10px;background-color:${cfg.bgLight};border:1px solid ${cfg.bgMid};border-left:4px solid ${cfg.bg};border-radius:0 8px 8px 0;padding:10px 14px;}
.act-num{min-width:28px;height:28px;background-color:${cfg.bg};color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.act-title{font-size:13px;font-weight:700;color:#1a2530;flex:1;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.act-time{background-color:${cfg.amber};color:#fff;border-radius:5px;padding:3px 9px;font-size:10px;font-weight:700;white-space:nowrap;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}

/* ── META GRID ── */
.meta-grid{display:grid;grid-template-columns:1fr 1fr;margin:10px 0 16px;border:1px solid ${cfg.bgMid};border-radius:8px;overflow:hidden;}
.meta-kv{padding:10px 14px;border-bottom:1px solid ${cfg.bgMid};border-right:1px solid ${cfg.bgMid};}
.meta-kv:nth-child(2n){border-right:none;}
.meta-kv:nth-last-child(-n+2){border-bottom:none;}
.meta-key{font-family:-apple-system,'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${cfg.ink};margin-bottom:3px;}
.meta-val{font-size:13px;color:#1a2530;font-weight:500;font-family:Georgia,serif;line-height:1.4;}

/* ── TYPOGRAPHY ── */
p{margin-bottom:9px;line-height:1.8;color:#2a3a4a;}
ul{list-style:none;padding-left:0;margin:6px 0 13px;}
ul li{position:relative;padding:2px 0 2px 20px;color:#2a3a4a;line-height:1.72;margin-bottom:3px;}
ul li::before{content:'•';position:absolute;left:4px;top:1px;color:${cfg.bg};font-size:14px;line-height:1.72;}
ul.sub{margin:3px 0 6px 18px;}
ul.sub>li::before{content:'–';color:#7a8fa0;font-size:13px;}
ol{list-style:none;padding-left:0;margin:6px 0 13px;counter-reset:ol-c;}
ol li{position:relative;padding:2px 0 2px 26px;counter-increment:ol-c;color:#2a3a4a;line-height:1.72;margin-bottom:4px;}
ol li::before{content:counter(ol-c)'.';position:absolute;left:0;top:2px;font-size:11.5px;font-weight:700;color:${cfg.bg};font-family:-apple-system,'Segoe UI',Arial,sans-serif;min-width:20px;}
ol.sub{margin-left:18px;}
ol.sub>li::before{color:#7a8fa0;font-weight:600;}
strong{font-weight:700;color:#111e29;}
em{font-style:italic;}
code{background-color:${cfg.bgLight};color:${cfg.ink};padding:2px 5px;border-radius:4px;font-family:'Consolas','Courier New',monospace;font-size:11px;border:1px solid ${cfg.bgMid};}
pre{background:#f6f8fa;border:1px solid #dce2e9;border-left:3px solid ${cfg.bg};border-radius:0 6px 6px 0;padding:12px 16px;margin:10px 0 14px;font-family:'Consolas','Courier New',monospace;font-size:11px;line-height:1.6;}
pre code{background:none;border:none;padding:0;}
blockquote{border-left:3px solid ${cfg.bg};padding:10px 16px;margin:12px 0;background-color:${cfg.bgLight};border-radius:0 7px 7px 0;color:#445566;font-style:italic;}
hr{border:none;height:1px;background:${cfg.bgMid};opacity:0.7;margin:24px 0;}
table{width:100%;border-collapse:collapse;margin:12px 0 16px;font-size:12px;}
thead tr{background-color:${cfg.bg};}
th{color:#fff;font-weight:700;text-align:left;padding:8px 12px;font-size:10.5px;letter-spacing:0.04em;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
td{padding:7px 12px;border-bottom:1px solid #e5e9ed;color:#2a3a4a;vertical-align:top;}
tbody tr:nth-child(even) td{background-color:#f9fafb;}

/* ── FOOTER ── */
.footer{background-color:${cfg.bgDeep};color:rgba(255,255,255,0.85);padding:11px 44px;margin-top:48px;display:flex;justify-content:space-between;align-items:center;font-size:10.5px;font-family:-apple-system,'Segoe UI',Arial,sans-serif;}
.footer-brand{font-weight:800;font-size:12px;color:#fff;}
.footer-mid{font-size:10px;opacity:0.78;}
.footer-url{font-size:10px;opacity:0.68;}
`
}

// ─────────────────────────────────────────────────────────────────────────────
// Document HTML wrapper
// ─────────────────────────────────────────────────────────────────────────────
function buildHTML(
  cfg:      TypeCfg,
  title:    string,
  subtitle: string | undefined,
  date:     string,
  meta:     string | undefined,
  body:     string,
): string {
  return `
<header class="hdr">
  <div class="hdr-deco1"></div>
  <div class="hdr-deco2"></div>
  <div class="hdr-main">
    <div class="brand-row">
      <div class="brand-logo">M</div>
      <div>
        <div class="brand-name">Mwalimu AI</div>
        <div class="brand-tagline">CBC Professional Development Platform</div>
      </div>
    </div>
    <div class="hdr-sep"></div>
    <div class="doc-title">${esc(title)}</div>
    ${subtitle ? `<div class="doc-sub">${esc(subtitle)}</div>` : ''}
  </div>
  <div class="hdr-type"><div class="hdr-type-text">${esc(cfg.label)}</div></div>
</header>

<div class="meta-ribbon">
  <span class="meta-chip">Mwalimu AI</span>
  <span class="meta-dot">·</span>
  <span>${esc(date)}</span>
  ${meta ? `<span class="meta-dot">·</span><span>${esc(meta)}</span>` : ''}
  <span class="meta-dot">·</span>
  <span>CBC-Aligned&nbsp;·&nbsp;Kenya</span>
</div>

<div class="content">${body}</div>

<footer class="footer">
  <span class="footer-brand">Mwalimu AI</span>
  <span class="footer-mid">KICD / TSC / KEMI Aligned Professional Development</span>
  <span class="footer-url">mwalimuai.co.ke</span>
</footer>
`
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown → HTML
// ─────────────────────────────────────────────────────────────────────────────
function mdToHtml(md: string, cfg: TypeCfg): string {
  const lines = md.split('\n')
  const out: string[] = []

  let listStack: Array<{ type: 'ul' | 'ol'; indent: number }> = []
  let kvBuffer: string[] = []

  const closeAllLists = () => {
    while (listStack.length > 0) out.push(`</${listStack.pop()!.type}>`)
  }

  const ensureList = (type: 'ul' | 'ol', indent: number) => {
    while (listStack.length > 0 && listStack[listStack.length - 1].indent > indent) {
      out.push(`</${listStack.pop()!.type}>`)
    }
    const top = listStack[listStack.length - 1]
    if (top && top.type === type && top.indent === indent) return
    if (top && top.indent === indent) out.push(`</${listStack.pop()!.type}>`)
    const subClass = indent > 0 ? ` class="sub"` : ''
    out.push(`<${type}${subClass}>`)
    listStack.push({ type, indent })
  }

  const flushKV = () => {
    if (kvBuffer.length === 0) return
    if (kvBuffer.length >= 2) {
      out.push('<div class="meta-grid">')
      for (const line of kvBuffer) {
        const ci = line.indexOf(':')
        if (ci > 0) {
          const k = line.slice(0, ci).trim()
          const v = line.slice(ci + 1).trim()
          out.push(`<div class="meta-kv"><div class="meta-key">${esc(k)}</div><div class="meta-val">${v ? inline(v) : '&mdash;'}</div></div>`)
        } else {
          out.push(`<p>${inline(line)}</p>`)
        }
      }
      out.push('</div>')
    } else {
      out.push(`<p>${inline(kvBuffer[0])}</p>`)
    }
    kvBuffer = []
  }

  const ACT_RE = /^Activity\s+(\d+)\s*[–\-]\s*(.+?)(?:\s*\((\d+)\s*min(?:utes?)?\))?$/i

  for (const raw of lines) {
    const line    = raw.trimEnd()
    const trimmed = line.trim()

    if (trimmed.startsWith('### ')) {
      closeAllLists(); flushKV()
      out.push(`<div class="sh-sub">${inline(trimmed.slice(4))}</div>`)
      continue
    }
    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      closeAllLists(); flushKV()
      const text = trimmed.startsWith('## ') ? trimmed.slice(3) : trimmed.slice(2)
      out.push(`<div class="sh">${inline(text)}</div>`)
      continue
    }
    if (trimmed.startsWith('> ')) {
      closeAllLists(); flushKV()
      out.push(`<blockquote>${inline(trimmed.slice(2))}</blockquote>`)
      continue
    }
    if (/^[-*_]{3,}$/.test(trimmed)) {
      closeAllLists(); flushKV()
      out.push('<hr>')
      continue
    }

    const ulM = line.match(/^(\s*)[-*+] (.*)$/)
    if (ulM) {
      flushKV()
      ensureList('ul', ulM[1].length)
      out.push(`<li>${inline(ulM[2])}</li>`)
      continue
    }

    const olM = line.match(/^(\s*)\d+[.)]\s+(.*)$/)
    if (olM) {
      flushKV()
      ensureList('ol', olM[1].length)
      out.push(`<li>${inline(olM[2])}</li>`)
      continue
    }

    if (trimmed === '') {
      closeAllLists(); flushKV()
      continue
    }

    const am = trimmed.match(ACT_RE)
    if (am) {
      closeAllLists(); flushKV()
      const [, num, actTitle, time] = am
      out.push(`<div class="act-hdr"><div class="act-num">${num}</div><div class="act-title">${esc(actTitle.trim())}</div>${time ? `<div class="act-time">${esc(time)}&thinsp;min</div>` : ''}</div>`)
      continue
    }

    if (listStack.length === 0) {
      const kvM = trimmed.match(/^([A-Z][A-Za-z &/]{1,24})\s*:\s*(.{0,55})$/)
      if (kvM) { kvBuffer.push(trimmed); continue }
    }

    closeAllLists(); flushKV()
    if (trimmed) out.push(`<p>${inline(trimmed)}</p>`)
  }

  closeAllLists()
  flushKV()
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function inline(t: string): string {
  return t
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>')
    .replace(/___(.+?)___/g,       '<strong><em>$1</em></strong>')
    .replace(/__(.+?)__/g,         '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,         '<em>$1</em>')
    .replace(/_([^_\s][^_]*)_/g,   '<em>$1</em>')
    .replace(/`(.+?)`/g,           '<code>$1</code>')
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
