'use server'

interface FormSubmissionData {
  fullName: string
  phone: string
  brandName: string
  productCategory: string
  categoryOther: string
  needs: string[]
  timeline: string
  brandLink: string
  runningAds: string
  adSpend: string
  biggestProblem: string
  workingBudget: string
}

export async function saveFormToAirtable(data: FormSubmissionData) {
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME
  const airtablePat = process.env.AIRTABLE_PAT

  if (!baseId || !tableName || !airtablePat) {
    console.error('Missing Airtable environment variables')
    return { success: false, error: 'Missing configuration' }
  }

  try {
    const airtableRecord = {
      fields: {
        Name: data.fullName,
        'Contact Info': data.phone,
        Brand: data.brandName,
        Industry: data.productCategory === 'Other' ? data.categoryOther : data.productCategory,
        Needs: data.needs.join(', '),
        Timeline: data.timeline,
        'Brand Link': data.brandLink || '',
        'Running Ads': data.runningAds || '',
        'Ad Spend': data.adSpend || '',
        'Biggest Problem': data.biggestProblem || '',
        'Working Budget': data.workingBudget || '',
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

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Airtable API error:', errorData)
      return { success: false, error: errorData.error?.message || 'Failed to save to Airtable' }
    }

    const result = await response.json()
    return { success: true, recordId: result.id }
  } catch (error) {
    console.error('Error saving to Airtable:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
