import { createClient } from '@/lib/supabase/client'
import { trackWrite } from '@/lib/write-queue'

export interface ToolOutput {
  id:        string
  toolId:    string
  title:     string
  input:     Record<string, unknown>
  output:    string
  createdAt: string
}

/**
 * Persist a successful tool generation so the teacher can review or
 * restore it on any device. Fire-and-forget — never throws.
 * Returns the client-generated id so the caller can optimistically
 * prepend the entry to its history list.
 */
export function saveToolOutput(
  userId: string,
  toolId: string,
  title: string,
  input: Record<string, unknown>,
  output: string,
): string {
  const id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)

  const supabase = createClient()
  trackWrite(supabase.from('tool_outputs').insert({
    id,
    user_id:    userId,
    tool_id:    toolId,
    title,
    input,
    output,
  }))
  return id
}

export async function loadToolHistory(userId: string, toolId: string, limit = 25): Promise<ToolOutput[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('tool_outputs')
      .select('id, tool_id, title, input, output, created_at')
      .eq('user_id', userId)
      .eq('tool_id', toolId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (!data) { console.error('[mwalimu] loadToolHistory: no data returned'); return [] }
    return data.map(r => ({
      id:        r.id as string,
      toolId:    r.tool_id as string,
      title:     (r.title as string) ?? '',
      input:     (r.input as Record<string, unknown>) ?? {},
      output:    (r.output as string) ?? '',
      createdAt: r.created_at as string,
    }))
  } catch (err) {
    console.error('[mwalimu] loadToolHistory error:', err)
    return []
  }
}

export async function deleteToolOutput(id: string): Promise<void> {
  try {
    const supabase = createClient()
    await supabase.from('tool_outputs').delete().eq('id', id)
  } catch {}
}
