// import Layout from '../components/layout'
import React, { useEffect, useState } from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { getMergedInitialCalcValues, postStatus, postType, upDateFirstTimeVisit } from '../lib/helper'
import TDFMain from '../components/tdf/TDFMain'
import { getAuth } from '@clerk/nextjs/dist/server/getAuth'
import GenericPopover from '../components/generic/GenericPopover'
// import ReportIntro from '../components/tdf/ReportIntro'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { AuthData } from '@clerk/nextjs/dist/server/types'
import DesignIntro from '../components/tdf/DesignIntro'

export default function NewDesign(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const introComplete = user?.publicMetadata.designIntroDone || false

  useEffect(() => {
    if (!introComplete) {
      setIsOpen(true)
      upDateFirstTimeVisit(user?.id, 'designIntroDone', true)
    }
  }, [introComplete])
  return (
    <>
      <GenericPopover isOpen={isOpen} setIsOpen={setIsOpen}>
        {/* <ReportIntro />
         */}
         <DesignIntro />
      </GenericPopover>
      <TDFMain props={props} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId }: AuthData = getAuth(context.req)

  const txCalls = []

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  txCalls.push(
    prisma.calculation.findMany({
      where: {
        authorClerkId: userId,
      },
    })
  )

  txCalls.push(
    prisma.mechanism.findMany({
      where: {
        isTemplate: true,
      },
    })
  )

  txCalls.push(
    prisma.postUser.findMany({
      where: {},
    })
  )

  txCalls.push(
    prisma.category.findMany({
      where: {},
    })
  )

  txCalls.push(
    prisma.tag.findMany({
      where: {},
    })
  )
  txCalls.push(prisma.subscriptions.findUnique({where:{authorClerkId: userId}}))

  const [designPhases, userCalcs, mechanismTemplates, PostUser, Category, Tag, Subscription] =
    await prisma.$transaction(txCalls)

  const defaultContent = {
    id: '',
    title: '',
    authorClerkId: userId,
    status: postStatus.draft,
    ticker: '',
    DesignElement: designPhases
      .filter((dp) => dp.parentPhaseId)
      .map((dp) => {
        return {
          id: '',
          content: '',
          designPhasesId: String(dp.phaseId),
          designElementStatus: '',
        }
      }),
    Calculation: {
      id: '',
      title: '',
      authorClerkId: '',
      months: 60,
      totalSupply: 100000000,
      startDate: new Date().toLocaleDateString('en-CA'),
      areaData: [],
      calculationRows: [],
    },
    Mechanism: [],
    mechanismTemplates: mechanismTemplates || [],
    PostUser: [],
    slug: '',
    shortDescription: '',
    categories: [],
    tags: [],
    protocolTimeLine: [],
    publishedAt: new Date().toLocaleDateString('en-CA'),
    breakdown: '',
    mainImageUrl: '',
    tokenUtility: '',
    tokenUtilityStrength: 0,
    businessModel: '',
    businessModelStrength: 0,
    valueCreation: '',
    valueCreationStrength: 0,
    valueCapture: '',
    valueCaptureStrength: 0,
    demandDrivers: '',
    demandDriversStrength: 0,
    totalTokenStrength: 0,
    threeMonthHorizon: '',
    oneYearHorizon: '',
    upside: '',
    postType: postType.design,
    downside: '',
    horizon: '',
    metrics: '',
    diagramUrl: '',
    ProtocolResources: [],
    strongPoints: '',
    weakPoints: '',
    problemSolution: '',
    parent: '',
  }

  return {
    props: {
      post: defaultContent,
      designPhases: designPhases || null,
      preloadInitialCalcValues:
        getMergedInitialCalcValues(userCalcs, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
      PostUser: PostUser || null,
      Category: Category || null,
      Tag: Tag || null,
      Subscription: Subscription || null,
    },
  }
}
