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
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads'
  const airtablePat = process.env.AIRTABLE_PAT

  if (!baseId || !airtablePat) {
    console.error('Missing Airtable env variables')
    return { success: false, error: 'Config missing' }
  }

  try {
    const airtableRecord = {
      fields: {
        'Name': data.name,
        'Contact Info': data.contact,
        'Brand': data.product,
        'Industry': data.category,
        'Needs': data.needs.join(', '),
        'Timeline': data.timeline,
        'Status': 'New'
      },
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtablePat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableRecord),
      }
    )

    return { success: response.ok }
  } catch (error) {
    console.error('Error saving to Airtable:', error)
    return { success: false }
  }
}