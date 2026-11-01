import env from '../config/env.js'

/** Which AI provider will be used (gemini | openai | local). */
export function activeProvider() {
  const { provider, geminiKey, openaiKey } = env.ai
  if (provider === 'local') return 'local'
  if (provider === 'gemini') return geminiKey ? 'gemini' : 'local'
  if (provider === 'openai') return openaiKey ? 'openai' : 'local'
  if (geminiKey) return 'gemini'
  if (openaiKey) return 'openai'
  return 'local'
}

/** Pulls the first JSON object out of a model reply (handles ```json fences). */
export function parseJsonReply(text) {
  if (!text) throw new Error('Empty AI response')
  const cleaned = String(text).replace(/```(?:json)?/gi, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1))
    throw new Error('AI response was not valid JSON')
  }
}

async function callGemini(system, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${env.ai.geminiModel}:generateContent`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.ai.geminiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, responseMimeType: 'application/json' },
    }),
    signal: AbortSignal.timeout(60000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${data?.error?.message || 'request failed'}`)
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
  return parseJsonReply(text)
}

async function callOpenAI(system, prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.ai.openaiKey}` },
    body: JSON.stringify({
      model: env.ai.openaiModel,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
    }),
    signal: AbortSignal.timeout(60000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`OpenAI error ${res.status}: ${data?.error?.message || 'request failed'}`)
  return parseJsonReply(data?.choices?.[0]?.message?.content)
}

/**
 * Asks the configured model for JSON. Returns { data, provider } or
 * { data: null, provider: 'local', error } when no provider is available / it fails.
 */
export async function generateJson(system, prompt) {
  const provider = activeProvider()
  if (provider === 'local') return { data: null, provider: 'local' }
  try {
    const data = provider === 'gemini' ? await callGemini(system, prompt) : await callOpenAI(system, prompt)
    return { data, provider }
  } catch (error) {
    console.warn(`⚠️  AI (${provider}) failed, using built-in planner instead:`, error.message)
    return { data: null, provider: 'local', error: error.message }
  }
}
