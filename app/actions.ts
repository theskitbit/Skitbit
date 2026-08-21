'use server'

interface LeadData {
  name: string
  contact: string
  product: string
  category: string
  needs: string[]
  timeline: string
}

const MAX_FIELD_LENGTH = 500
const MAX_NEEDS = 20

function cleanString(value: unknown, field: string) {
  if (typeof value !== 'string') throw new Error(`Invalid ${field}`)
  const result = value.trim()
  if (!result || result.length > MAX_FIELD_LENGTH) throw new Error(`Invalid ${field}`)
  return result
}

function validateLeadData(input: unknown): LeadData {
  if (!input || typeof input !== 'object') throw new Error('Invalid form data')
  const data = input as Partial<LeadData>
  if (!Array.isArray(data.needs) || data.needs.length > MAX_NEEDS) throw new Error('Invalid needs')
  const needs = data.needs.map((value) => cleanString(value, 'needs'))
  const contact = cleanString(data.contact, 'contact')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && contact.length < 7) throw new Error('Invalid contact')
  return {
    name: cleanString(data.name, 'name'),
    contact,
    product: cleanString(data.product, 'product'),
    category: cleanString(data.category, 'category'),
    needs,
    timeline: cleanString(data.timeline, 'timeline'),
  }
}

export async function saveFormToAirtable(input: LeadData) {
  let data: LeadData
  try {
    data = validateLeadData(input)
  } catch {
    return { success: false, error: 'Please check the submitted form fields.' }
  }

  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME
  const pat = process.env.AIRTABLE_PAT
  if (!baseId || !tableName || !pat) {
    console.error('[lead] Airtable configuration is incomplete')
    return { success: false, error: 'The form is temporarily unavailable.' }
  }

  const body = { fields: { Name: data.name, 'Contact Info': data.contact, Brand: data.product, Industry: data.category, Needs: data.needs, Timeline: data.timeline, Status: 'New' } }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, { method: 'POST', headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store' })
    if (!response.ok) {
      console.error('[lead] Airtable request failed', response.status)
      return { success: false, error: 'We could not submit your request. Please try again.' }
    }
    const json = await response.json()
    return { success: true, record: { id: json.id } }
  } catch (error) {
    console.error('[lead] Airtable request error', error instanceof Error ? error.message : 'unknown')
    return { success: false, error: 'We could not submit your request. Please try again.' }
  }
}
