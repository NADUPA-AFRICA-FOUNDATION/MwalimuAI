// Low-bandwidth mode + audio lesson helpers

const LBW_KEY = 'mwalimu_low_bandwidth'

export function getLowBandwidth(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(LBW_KEY) === 'true'
}

export function setLowBandwidth(on: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LBW_KEY, on ? 'true' : 'false')
  // Dispatch a storage event so other tabs can react
  window.dispatchEvent(new Event('mwalimu-lbw-change'))
}

// ── Speech synthesis ──────────────────────────────────────────

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speak(text: string, lang: string, onEnd?: () => void): void {
  if (!canSpeak()) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  // Use Kenyan English or Swahili voices if available
  utt.lang  = lang === 'sw' ? 'sw-KE' : 'en-GB'
  utt.rate  = 0.9
  utt.pitch = 1
  if (onEnd) utt.onend = onEnd
  window.speechSynthesis.speak(utt)
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined') return false
  return window.speechSynthesis?.speaking ?? false
}
