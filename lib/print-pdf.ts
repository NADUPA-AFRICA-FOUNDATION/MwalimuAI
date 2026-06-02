/**
 * Mwalimu AI — PDF/Print Generator
 * Brand colours:
 *   Primary teal  #0c9a7b  (headers, borders, accents)
 *   Accent amber  #c98900  (time badges, highlights)
 */

export type PDFType = 'lesson-plan' | 'feedback' | 'policy' | 'research' | 'default'

interface PrintOptions {
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
  'feedback':    { bg: '#059669',  bgDeep: '#047857',   bgLight: '#f0fdf4',   bgMid: '#bbf7d0',   ink: '#047857',  amber: '#d97706',  label: 'CBC Feedback' },
  'policy':      { bg: '#d97706',  bgDeep: '#b45309',   bgLight: '#fffbeb',   bgMid: '#fde68a',   ink: '#b45309',  amber: BRAND_TEAL, label: 'Policy Brief' },
  'research':    { bg: '#6d28d9',  bgDeep: '#5b21b6',   bgLight: '#f5f3ff',   bgMid: '#ddd6fe',   ink: '#5b21b6',  amber: BRAND_AMBER, label: 'Action Research' },
  'default':     { bg: BRAND_TEAL, bgDeep: BRAND_DEEP, bgLight: BRAND_LIGHT, bgMid: BRAND_MID, ink: BRAND_INK, amber: BRAND_AMBER, label: 'Document' },
}

// ─────────────────────────────────────────────────────────────────────────────
export function printPDF({ title, subtitle, meta, content, type = 'default' }: PrintOptions): void {
  const cfg  = TYPE_CFG[type]
  const date = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  const body = mdToHtml(content, cfg)

  const win = window.open('', '_blank', 'width=960,height=820')
  if (!win) return

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} — Mwalimu AI</title>
<style>

/* ── Force all backgrounds to print ──────────────────────────────── */
html {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust:         exact !important;
  color-adjust:               exact !important;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Georgia, Charter, 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: 12.5px;
  line-height: 1.8;
  color: #1e2d3d;
  background: #fff;
  max-width: 820px;
  margin: 0 auto;
}

/* ── PRE-PRINT GUIDE (screen only, hidden when printing) ──────────── */
#print-guide {
  position: fixed;
  inset: 0;
  background: rgba(5, 20, 35, 0.75);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
#pg-card {
  background: #fff;
  border-radius: 16px;
  padding: 36px 40px 28px;
  max-width: 430px;
  width: 100%;
  box-shadow: 0 28px 72px rgba(0,0,0,0.38);
}
#pg-card h2 {
  font-size: 20px;
  font-weight: 800;
  color: ${cfg.bg};
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}
#pg-card .pg-sub {
  font-size: 13px;
  color: #4a5a6a;
  margin-bottom: 22px;
  line-height: 1.5;
}
#pg-steps {
  list-style: none;
  padding: 0;
  margin: 0 0 26px;
  counter-reset: step;
}
#pg-steps li {
  counter-increment: step;
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 9px 0;
  border-bottom: 1px solid #edf0f3;
  font-size: 13px;
  color: #1e2d3d;
  line-height: 1.5;
}
#pg-steps li:last-child { border-bottom: none; }
#pg-steps li::before {
  content: counter(step);
  min-width: 24px;
  height: 24px;
  background: ${cfg.bg};
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 1px;
}
#pg-steps strong { font-weight: 700; color: #111; }
#print-btn {
  width: 100%;
  padding: 13px 24px;
  background: ${cfg.bg};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: -0.2px;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
#print-btn:hover { background: ${cfg.bgDeep}; }
#view-btn {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  color: #6b7f8f;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
  text-decoration: underline;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}

/* ── HEADER ───────────────────────────────────────────────────────── */
.hdr {
  background-color: ${cfg.bg};
  color: #fff;
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: hidden;
}
.hdr-deco1 {
  position: absolute; width: 260px; height: 260px;
  background-color: rgba(255,255,255,0.07); border-radius: 50%;
  top: -90px; right: 80px; pointer-events: none;
}
.hdr-deco2 {
  position: absolute; width: 180px; height: 180px;
  background-color: rgba(255,255,255,0.05); border-radius: 50%;
  bottom: -70px; left: 40px; pointer-events: none;
}
.hdr-main {
  flex: 1;
  padding: 28px 44px 26px;
  position: relative;
  z-index: 1;
}
.hdr-type {
  width: 86px;
  background-color: ${cfg.bgDeep};
  display: flex; align-items: center; justify-content: center;
  padding: 20px 10px; flex-shrink: 0; position: relative; z-index: 1;
}
.hdr-type-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.brand-row {
  display: flex; align-items: center; gap: 11px; margin-bottom: 16px;
}
.brand-logo {
  width: 38px; height: 38px;
  background-color: rgba(255,255,255,0.18);
  border: 2px solid rgba(255,255,255,0.35);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 900; color: #fff; flex-shrink: 0;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.brand-name {
  font-size: 14px; font-weight: 700; line-height: 1.2;
  color: rgba(255,255,255,0.95);
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.brand-tagline {
  font-size: 10.5px; color: rgba(255,255,255,0.6); margin-top: 2px;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.hdr-sep {
  width: 40px; height: 2px;
  background-color: rgba(255,255,255,0.28);
  border-radius: 2px; margin-bottom: 12px;
}
.doc-title {
  font-size: 23px; font-weight: 800; letter-spacing: -0.4px;
  line-height: 1.2; color: #fff; margin-bottom: 4px;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.doc-sub {
  font-size: 12px; color: rgba(255,255,255,0.72);
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}

/* ── META RIBBON ──────────────────────────────────────────────────── */
.meta-ribbon {
  background-color: ${cfg.bgLight};
  border-bottom: 2px solid ${cfg.bgMid};
  padding: 10px 44px;
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 5px 12px;
  font-size: 11px; color: ${cfg.ink}; font-weight: 500;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.meta-chip {
  background-color: ${cfg.bg}; color: #fff; border-radius: 5px;
  padding: 3px 10px; font-size: 9.5px; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.meta-dot { color: ${cfg.bgMid}; font-size: 14px; line-height: 1; }

/* ── CONTENT WRAPPER ──────────────────────────────────────────────── */
.content { padding: 0 44px 48px; }

/* ── SECTION HEADERS — clean editorial style ──────────────────────── */
.sh {
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${cfg.bg};
  padding: 0 0 8px 0;
  margin: 32px 0 16px;
  border-bottom: 2px solid ${cfg.bg};
  page-break-after: avoid;
  break-after: avoid;
}

.sh-sub {
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${cfg.ink};
  padding: 0 0 0 11px;
  margin: 22px 0 11px;
  border-left: 3px solid ${cfg.bg};
  line-height: 1.5;
  page-break-after: avoid;
  break-after: avoid;
}

/* ── ACTIVITY CARD HEADERS ────────────────────────────────────────── */
.act-hdr {
  display: flex; align-items: center; gap: 10px;
  margin: 20px 0 10px;
  background-color: ${cfg.bgLight};
  border: 1px solid ${cfg.bgMid};
  border-left: 4px solid ${cfg.bg};
  border-radius: 0 8px 8px 0;
  padding: 10px 14px;
  page-break-after: avoid; break-after: avoid;
  page-break-inside: avoid; break-inside: avoid;
}
.act-num {
  min-width: 28px; height: 28px;
  background-color: ${cfg.bg}; color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; flex-shrink: 0;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.act-title {
  font-size: 13px; font-weight: 700; color: #1a2530; flex: 1;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.act-time {
  background-color: ${cfg.amber}; color: #fff; border-radius: 5px;
  padding: 3px 9px; font-size: 10px; font-weight: 700; white-space: nowrap;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}

/* ── METADATA GRID ────────────────────────────────────────────────── */
.meta-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  margin: 10px 0 16px;
  border: 1px solid ${cfg.bgMid};
  border-radius: 8px; overflow: hidden;
  break-inside: avoid; page-break-inside: avoid;
}
.meta-kv {
  padding: 10px 14px;
  border-bottom: 1px solid ${cfg.bgMid};
  border-right: 1px solid ${cfg.bgMid};
}
.meta-kv:nth-child(2n) { border-right: none; }
.meta-kv:nth-last-child(-n+2) { border-bottom: none; }
.meta-key {
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
  font-size: 9px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: ${cfg.ink}; margin-bottom: 3px;
}
.meta-val {
  font-size: 13px; color: #1a2530; font-weight: 500;
  font-family: Georgia, serif; line-height: 1.4;
}

/* ── TYPOGRAPHY ───────────────────────────────────────────────────── */
p { margin-bottom: 9px; line-height: 1.8; color: #2a3a4a; }
p:last-child { margin-bottom: 0; }

/* Unordered list */
ul { list-style: none; padding-left: 0; margin: 6px 0 13px; }
ul li {
  position: relative;
  padding: 2px 0 2px 20px;
  color: #2a3a4a;
  line-height: 1.72;
  margin-bottom: 3px;
  break-inside: avoid;
  page-break-inside: avoid;
}
ul li::before {
  content: '•';
  position: absolute; left: 4px; top: 1px;
  color: ${cfg.bg}; font-size: 14px; line-height: 1.72;
}

/* Sub-list (indented bullet) */
ul.sub {
  margin: 3px 0 6px 18px;
}
ul.sub > li::before {
  content: '–';
  color: #7a8fa0;
  font-size: 13px;
}

/* Ordered list */
ol {
  list-style: none; padding-left: 0; margin: 6px 0 13px;
  counter-reset: ol-c;
}
ol li {
  position: relative;
  padding: 2px 0 2px 26px;
  counter-increment: ol-c;
  color: #2a3a4a; line-height: 1.72; margin-bottom: 4px;
  break-inside: avoid; page-break-inside: avoid;
}
ol li::before {
  content: counter(ol-c) '.';
  position: absolute; left: 0; top: 2px;
  font-size: 11.5px; font-weight: 700; color: ${cfg.bg};
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
  min-width: 20px;
}

/* Sub-ordered list */
ol.sub { margin-left: 18px; }
ol.sub > li::before { color: #7a8fa0; font-weight: 600; }

strong { font-weight: 700; color: #111e29; }
em     { font-style: italic; }

code {
  background-color: ${cfg.bgLight}; color: ${cfg.ink};
  padding: 2px 5px; border-radius: 4px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 11px; border: 1px solid ${cfg.bgMid};
}

pre {
  background: #f6f8fa; border: 1px solid #dce2e9;
  border-left: 3px solid ${cfg.bg}; border-radius: 0 6px 6px 0;
  padding: 12px 16px; margin: 10px 0 14px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 11px; line-height: 1.6;
  break-inside: avoid; page-break-inside: avoid;
}
pre code { background: none; border: none; padding: 0; }

blockquote {
  border-left: 3px solid ${cfg.bg};
  padding: 10px 16px; margin: 12px 0;
  background-color: ${cfg.bgLight}; border-radius: 0 7px 7px 0;
  color: #445566; font-style: italic;
  break-inside: avoid; page-break-inside: avoid;
}

hr {
  border: none; height: 1px;
  background: ${cfg.bgMid}; opacity: 0.7;
  margin: 24px 0;
}

table {
  width: 100%; border-collapse: collapse; margin: 12px 0 16px;
  font-size: 12px;
  break-inside: avoid; page-break-inside: avoid;
}
thead tr { background-color: ${cfg.bg}; }
th {
  color: #fff; font-weight: 700; text-align: left; padding: 8px 12px;
  font-size: 10.5px; letter-spacing: 0.04em;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
td {
  padding: 7px 12px; border-bottom: 1px solid #e5e9ed;
  color: #2a3a4a; vertical-align: top;
}
tbody tr:nth-child(even) td { background-color: #f9fafb; }

/* ── FOOTER ───────────────────────────────────────────────────────── */
.footer {
  background-color: ${cfg.bgDeep};
  color: rgba(255,255,255,0.85);
  padding: 11px 44px; margin-top: 48px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10.5px;
  font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
}
.footer-brand { font-weight: 800; font-size: 12px; color: #fff; }
.footer-mid   { font-size: 10px; opacity: 0.78; }
.footer-url   { font-size: 10px; opacity: 0.68; }

/* ── PRINT RULES ──────────────────────────────────────────────────── */
@media print {
  #print-guide { display: none !important; }
  body { max-width: 100%; }
  .content      { padding: 0 28px 28px; }
  .meta-ribbon  { padding-left: 28px; padding-right: 28px; }
  .hdr-main     { padding-left: 28px; padding-right: 28px; }
  .footer       { padding-left: 28px; padding-right: 28px; margin-top: 32px; }
  @page { size: A4; margin: 12mm 10mm 16mm; }
  .sh     { page-break-after: avoid; break-after: avoid; }
  .sh-sub { page-break-after: avoid; break-after: avoid; }
  .act-hdr  { page-break-inside: avoid; break-inside: avoid; page-break-after: avoid; break-after: avoid; }
  .meta-grid, blockquote, pre, table { page-break-inside: avoid; break-inside: avoid; }
  ul li, ol li { page-break-inside: avoid; break-inside: avoid; }
  .hdr   { page-break-inside: avoid; break-inside: avoid; }
  .footer { page-break-before: avoid; break-before: avoid; }
}

</style>
</head>
<body>

<!-- ── PRE-PRINT GUIDE ── -->
<div id="print-guide">
  <div id="pg-card">
    <h2>Ready to Print</h2>
    <p class="pg-sub">For a clean, professional PDF — do these three things in the print dialog that opens:</p>
    <ol id="pg-steps">
      <li><strong>Destination:</strong> "Save as PDF" or select your printer</li>
      <li><strong>Uncheck "Headers and footers"</strong> — removes the URL and timestamp bar</li>
      <li><strong>Enable "Background graphics"</strong> — so the header colours print correctly</li>
    </ol>
    <button id="print-btn" onclick="document.getElementById('print-guide').style.display='none'; window.print()">
      Print / Save as PDF
    </button>
    <button id="view-btn" onclick="document.getElementById('print-guide').style.display='none'">
      View document first
    </button>
  </div>
</div>

<!-- ── HEADER ── -->
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
  <div class="hdr-type">
    <div class="hdr-type-text">${esc(cfg.label)}</div>
  </div>
</header>

<!-- ── META RIBBON ── -->
<div class="meta-ribbon">
  <span class="meta-chip">Mwalimu AI</span>
  <span class="meta-dot">·</span>
  <span>${esc(date)}</span>
  ${meta ? `<span class="meta-dot">·</span><span>${esc(meta)}</span>` : ''}
  <span class="meta-dot">·</span>
  <span>CBC-Aligned&nbsp;·&nbsp;Kenya</span>
</div>

<!-- ── CONTENT ── -->
<div class="content">
${body}
</div>

<!-- ── FOOTER ── -->
<footer class="footer">
  <span class="footer-brand">Mwalimu AI</span>
  <span class="footer-mid">KICD / TSC / KEMI Aligned Professional Development</span>
  <span class="footer-url">mwalimuai.co.ke</span>
</footer>

</body>
</html>`)

  win.document.close()
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown → HTML  (with smart structure detection)
// ─────────────────────────────────────────────────────────────────────────────

function mdToHtml(md: string, cfg: TypeCfg): string {
  const lines = md.split('\n')
  const out: string[] = []

  // List stack: {type, indent} — supports nested lists
  let listStack: Array<{ type: 'ul' | 'ol'; indent: number }> = []
  let kvBuffer: string[] = []

  const closeAllLists = () => {
    while (listStack.length > 0) {
      out.push(`</${listStack.pop()!.type}>`)
    }
  }

  const ensureList = (type: 'ul' | 'ol', indent: number) => {
    // Close lists deeper than current indent
    while (listStack.length > 0 && listStack[listStack.length - 1].indent > indent) {
      out.push(`</${listStack.pop()!.type}>`)
    }
    const top = listStack[listStack.length - 1]
    // If top matches exactly, we're good
    if (top && top.type === type && top.indent === indent) return
    // Close top if different type at same indent
    if (top && top.indent === indent) {
      out.push(`</${listStack.pop()!.type}>`)
    }
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
          out.push(`<div class="meta-kv">
  <div class="meta-key">${esc(k)}</div>
  <div class="meta-val">${v ? inline(v) : '&mdash;'}</div>
</div>`)
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

  // Activity header: "Activity 1 – Title (15 minutes)"
  const ACT_RE = /^Activity\s+(\d+)\s*[–\-]\s*(.+?)(?:\s*\((\d+)\s*min(?:utes?)?\))?$/i

  for (const raw of lines) {
    const line = raw.trimEnd()
    const trimmed = line.trim()

    // ── Headings ──
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

    // ── Blockquote ──
    if (trimmed.startsWith('> ')) {
      closeAllLists(); flushKV()
      out.push(`<blockquote>${inline(trimmed.slice(2))}</blockquote>`)
      continue
    }

    // ── HR ──
    if (/^[-*_]{3,}$/.test(trimmed)) {
      closeAllLists(); flushKV()
      out.push('<hr>')
      continue
    }

    // ── Unordered list (handles indented sub-lists) ──
    const ulM = line.match(/^(\s*)[-*+] (.*)$/)
    if (ulM) {
      flushKV()
      const indent = ulM[1].length
      ensureList('ul', indent)
      out.push(`<li>${inline(ulM[2])}</li>`)
      continue
    }

    // ── Ordered list (handles indented sub-lists) ──
    const olM = line.match(/^(\s*)\d+[.)]\s+(.*)$/)
    if (olM) {
      flushKV()
      const indent = olM[1].length
      ensureList('ol', indent)
      out.push(`<li>${inline(olM[2])}</li>`)
      continue
    }

    // ── Empty line ──
    if (trimmed === '') {
      closeAllLists(); flushKV()
      continue
    }

    // ── Activity header ──
    const am = trimmed.match(ACT_RE)
    if (am) {
      closeAllLists(); flushKV()
      const [, num, actTitle, time] = am
      out.push(`<div class="act-hdr">
  <div class="act-num">${num}</div>
  <div class="act-title">${esc(actTitle.trim())}</div>
  ${time ? `<div class="act-time">${esc(time)}&thinsp;min</div>` : ''}
</div>`)
      continue
    }

    // ── KV metadata detection (short values only — not vocabulary definitions) ──
    // Only when NOT inside a list, and value ≤ 55 chars (distinguishes metadata from definitions)
    if (listStack.length === 0) {
      const kvM = trimmed.match(/^([A-Z][A-Za-z &/]{1,24})\s*:\s*(.{0,55})$/)
      if (kvM) {
        kvBuffer.push(trimmed)
        continue
      }
    }

    // ── Regular paragraph ──
    closeAllLists(); flushKV()
    if (trimmed) out.push(`<p>${inline(trimmed)}</p>`)
  }

  closeAllLists()
  flushKV()

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline markdown: bold, italic, code
// ─────────────────────────────────────────────────────────────────────────────
function inline(t: string): string {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
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
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
