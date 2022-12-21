
import prisma from '../../../lib/prisma';
import {  Prisma } from '@prisma/client'

export default async function handle(req, res) {
  const { values } = req.body;
  const inputFields = values

  // console.log("type " + typeof inputFields.breakdown)
  // console.log("stringify " + JSON.stringify(inputFields.breakdown))
  // console.log("raw " + inputFields.breakdown)
  
  var breakdown = inputFields.breakdown
  if (typeof inputFields.breakdown === 'object'){
    breakdown = JSON.stringify(inputFields.breakdown)
  }
  // if (typeof inputFields.breakdown === 'string'){
  //   const breakdown = inputFields.breakdown
  // }

  const timeLine = inputFields?.protocolTimeLine?.map(tl => {
    return {
      // ...tl,
      title: tl.title,
      date: new Date(tl.date),
      description: tl.description,
    }
  })

  const resource = inputFields?.ProtocolResources?.map(tl => {
    return {
      title: tl.title,
      url: tl.url,
      internal: tl.internal,
    }
  })

  var response = {}

  const txCalls = []

  txCalls.push(prisma.protocolTimeLine.deleteMany({
    where: {
      postId: inputFields?.id,
    }
  }))
  txCalls.push(prisma.protocolResources.deleteMany({
    where: {
      postId: inputFields?.id,
    }
  }))
  txCalls.push(prisma.post.update({
    where: {
      id: inputFields?.id,
    },
    data: {
      title: inputFields.title,
      slug: inputFields.slug,
      shortDescription: inputFields.shortDescription,
      breakdown: breakdown,
      // ourTake: JSON.stringify(ourTake),
      // published: false,
      publishedAt: new Date(),
      mainImageUrl: inputFields.mainImageUrl,
      tokenUtility: inputFields.tokenUtility,
      tokenUtilityStrength: inputFields.tokenUtilityStrength,
      businessModel: inputFields.businessModel,
      businessModelStrength: inputFields.businessModelStrength,
      valueCreation: inputFields.valueCreation,
      valueCreationStrength: inputFields.valueCreationStrength,
      valueCapture: inputFields.valueCapture,
      valueCaptureStrength: inputFields.valueCaptureStrength,
      demandDrivers: inputFields.demandDrivers,
      demandDriversStrength: inputFields.demandDriversStrength,
      tokenStrength: inputFields.tokenStrength,
      threeMonthHorizon: inputFields.threeMonthHorizon,
      oneYearHorizon: inputFields.oneYearHorizon,
      upside: inputFields.upside,
      downside: inputFields.downside,
      horizon: inputFields.horizon,
      metrics: inputFields.metrics,
      diagramUrl: inputFields.diagramUrl,
      strongPoints: inputFields.strongPoints,
      weakPoints: inputFields.weakPoints,
      problemSolution: inputFields.problemSolution,
      parent: inputFields.parent,
      // author: {
      //   connect: {
      //     email: 'f.strauf@gmail.com',
      //   }
      // },
      categories: {
        connect: inputFields.categories.map(cat => { return { value: cat.value } })
      },
      tags: {
        connect: inputFields.tags.map(tag => { return { value: tag.value } })
      },
      ProtocolResources: {
        createMany: {
          data: resource,
        }
      },
      protocolTimeLine: {
        createMany: {
          data: timeLine
        }
      }
    },
  }))

  try {
    response = await prisma.$transaction(
      txCalls
    )

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        // res.statusText = 'Unique Constraint. Slug might already exist!'
        return res.status(500).send({ error: 'Slug might already exist!' })
        // console.log(
        //   'There is a unique constraint violation, a new user cannot be created with this email'
        // )
      }
    }
    throw e
  }

  res.json(response);
}