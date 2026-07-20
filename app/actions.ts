'use server'

interface LeadData {
  name: string
  contact: string
  product: string
  category: string
  needs: string[]
  timeline: string
}

export async function saveFormToAirtable(data: LeadData) {
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME
  const pat = process.env.AIRTABLE_PAT

  if (!baseId) {
    console.error('❌ AIRTABLE_BASE_ID is missing')
    return { success: false, error: 'Missing AIRTABLE_BASE_ID' }
  }

  if (!tableName) {
    console.error('❌ AIRTABLE_TABLE_NAME is missing')
    return { success: false, error: 'Missing AIRTABLE_TABLE_NAME' }
  }

  if (!pat) {
    console.error('❌ AIRTABLE_PAT is missing')
    return { success: false, error: 'Missing AIRTABLE_PAT' }
  }

  const body = {
    fields: {
      Name: data.name,
      'Contact Info': data.contact,
      Brand: data.product,
      Industry: data.category,

      // ✅ Multiple Select field
      Needs: data.needs,

      Timeline: data.timeline,
      Status: 'New',
    },
  }

  console.log('📤 Sending record to Airtable...')
  console.log(JSON.stringify(body, null, 2))

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      }
    )

    const json = await response.json()

    console.log('Airtable Status:', response.status)
    console.log(json)

    if (!response.ok) {
      return {
        success: false,
        error: json,
      }
    }

    return {
      success: true,
      record: json,
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: String(err),
    }
  }
}