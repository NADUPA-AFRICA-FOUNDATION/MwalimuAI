import React from 'react'
import { Lightbulb, Sparkles, Users, ClipboardCheck } from 'lucide-react'

/**
 * Reading-content renderer for the lesson player.
 *
 * Block grammar (one construct per line):
 *   ## Heading            section heading with accent pip
 *   ### Subheading        minor heading
 *   - item                bullet list (consecutive lines group)
 *   1. item               numbered list
 *   | a | b |             table rows (a |---| line is treated as separator)
 *   >> KEY: text          callout card; continuation lines start with ">>"
 *   >> THINK: text          (KEY | THINK | CASE | TRY)
 *   anything else         paragraph
 *
 * Inline: **bold** and *italic*.
 */

/* ── Inline markdown ─────────────────────────────────────────── */
export function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return part
      })}
    </>
  )
}

/* ── Plain-text version for text-to-speech and share previews ── */
export function stripMd(text: string): string {
  return text
    .split('\n')
    .map(line => line
      .replace(/^#{2,3}\s+/, '')
      .replace(/^>>\s*(KEY|THINK|CASE|TRY):\s*/i, '')
      .replace(/^>>\s*/, '')
      .replace(/^[-*]\s+/, '')
      .replace(/^\d+\.\s+/, '')
      .replace(/\|/g, ' ')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1'))
    .filter(line => !/^[\s-]+$/.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/* ── Callout styling ─────────────────────────────────────────── */
const CALLOUTS = {
  KEY: {
    label: 'Key idea',
    icon: Sparkles,
    box: 'bg-primary/5 border-primary/20',
    accent: 'text-primary',
  },
  THINK: {
    label: 'Think deeper',
    icon: Lightbulb,
    box: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  CASE: {
    label: 'In a Kenyan classroom',
    icon: Users,
    box: 'bg-sky-50 border-sky-200 dark:bg-sky-950/20 dark:border-sky-900/40',
    accent: 'text-sky-600 dark:text-sky-400',
  },
  TRY: {
    label: 'Try this tomorrow',
    icon: ClipboardCheck,
    box: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40',
    accent: 'text-emerald-600 dark:text-emerald-400',
  },
} as const

type CalloutType = keyof typeof CALLOUTS

/* ── Block parser ────────────────────────────────────────────── */
type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'table'; rows: string[][]; hasHeader: boolean }
  | { kind: 'callout'; type: CalloutType; lines: string[] }

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = []
  const lines = text.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (line === '') { i++; continue }

    if (line.startsWith('### ')) { blocks.push({ kind: 'h3', text: line.slice(4) }); i++; continue }
    if (line.startsWith('## '))  { blocks.push({ kind: 'h2', text: line.slice(3) }); i++; continue }

    const calloutM = line.match(/^>>\s*(KEY|THINK|CASE|TRY):\s*(.*)$/i)
    if (calloutM) {
      const type = calloutM[1].toUpperCase() as CalloutType
      const body = [calloutM[2]]
      i++
      while (i < lines.length && lines[i].trim().startsWith('>>')) {
        body.push(lines[i].trim().replace(/^>>\s?/, ''))
        i++
      }
      blocks.push({ kind: 'callout', type, lines: body.filter(Boolean) })
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push({ kind: 'ul', items })
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i++
      }
      blocks.push({ kind: 'ol', items })
      continue
    }

    if (line.startsWith('|')) {
      const rawRows: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rawRows.push(lines[i].trim())
        i++
      }
      const hasHeader = rawRows.length > 1 && /^\|[\s:|-]+$/.test(rawRows[1])
      const rows = rawRows
        .filter(r => !/^\|[\s:|-]+$/.test(r))
        .map(r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim()))
      blocks.push({ kind: 'table', rows, hasHeader })
      continue
    }

    // paragraph: merge until blank line or structural marker
    const para: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(##|###|>>|\||[-*]\s|\d+\.\s)/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push({ kind: 'p', text: para.join(' ') })
  }

  return blocks
}

/* ── Block renderer ──────────────────────────────────────────── */
export function renderReading(text: string): React.ReactNode {
  const blocks = parseBlocks(text)

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <div key={i} className="flex items-center gap-2.5 pt-3">
                <span className="w-[3px] h-4 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <h3 className="font-bold text-[15px] tracking-tight text-foreground">{renderInline(block.text)}</h3>
              </div>
            )

          case 'h3':
            return (
              <h4 key={i} className="font-semibold text-sm text-foreground pt-1">{renderInline(block.text)}</h4>
            )

          case 'p':
            return (
              <p key={i} className="text-sm leading-[1.75] text-foreground/90">{renderInline(block.text)}</p>
            )

          case 'ul':
            return (
              <ul key={i} className="space-y-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[0.55em] shrink-0" aria-hidden="true" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i} className="space-y-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
                    <span className="font-semibold text-primary text-xs mt-[0.2em] min-w-[1.1rem] shrink-0">{j + 1}.</span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            )

          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-border/60">
                <table className="w-full text-sm border-collapse">
                  {block.hasHeader && block.rows.length > 0 && (
                    <thead>
                      <tr className="bg-primary/8">
                        {block.rows[0].map((cell, c) => (
                          <th key={c} className="text-left font-semibold text-xs uppercase tracking-wide text-primary px-3.5 py-2.5 border-b border-border/60">
                            {renderInline(cell)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {(block.hasHeader ? block.rows.slice(1) : block.rows).map((row, r) => (
                      <tr key={r} className="even:bg-muted/30">
                        {row.map((cell, c) => (
                          <td key={c} className="px-3.5 py-2.5 align-top text-foreground/90 border-b border-border/30">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'callout': {
            const cfg = CALLOUTS[block.type]
            const Icon = cfg.icon
            return (
              <aside key={i} className={`rounded-xl border p-4 ${cfg.box}`}>
                <p className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide mb-1.5 ${cfg.accent}`}>
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {cfg.label}
                </p>
                {block.lines.map((l, j) => (
                  <p key={j} className="text-sm leading-relaxed text-foreground/90 [&:not(:last-child)]:mb-1.5">{renderInline(l)}</p>
                ))}
              </aside>
            )
          }
        }
      })}
    </div>
  )
}
