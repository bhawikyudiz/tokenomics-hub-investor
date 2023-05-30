// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
type Data = {
  data: Array<object>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id, url } = req.body
    let spreadSheetId = url.toString().split('/')[5]

    const sMechanismId = await prisma.mechanism.findFirst({
      where: {
        id: id,
        isTemplate: true,
      },
    })

    if (!sMechanismId) {
      return res.status(400).json({
        data: [{ message: 'Invalid Template' }],
      })
    }
    console.log('mechanism data = ', sMechanismId)
    const { GoogleSpreadsheet } = require('google-spreadsheet')

    const doc = new GoogleSpreadsheet(spreadSheetId)
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    const temDoc = new GoogleSpreadsheet(
      sMechanismId.templateSheet.toString().split('/')[5]
    )
    await temDoc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    let aRows = await sheet.getRows()

    await temDoc.loadInfo()
    const tempSheet = temDoc.sheetsByIndex[1]
    let aTempRows = await tempSheet.getRows()

    console.log('sheet ========', aRows[1])
    console.log('sheet 2 ========', aTempRows[1])
    if (aRows[1]._rawData[5] !=  aTempRows[1]._rawData[5]) {
      return res.status(403).json({
        data: [{ message: 'Invalid Template' }],
      })
    }
    let allRow = []
    for (let row of aRows) {
      allRow.push({
        Months: row._rawData[0],
        'Circulating supply': row._rawData[1],
        'Expected Token Demand': row._rawData[2],
        'Month Count': row._rawData[3],
        'Rewards Type': row._rawData[4],
        'Template Type': row._rawData[5],
      })
    }

    return res.status(200).json({ data: allRow })
  } catch (error) {
    console.log('error = ', error)
    return res.status(403).json({
      data: [{ message: error.message }],
    })
  }
}