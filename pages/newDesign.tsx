import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { postStatus } from '../lib/helper'
import TDFMain from '../components/tdf/TDFMain'

export default function NewDesign(props) {
  // console.log("🚀 ~ file: newDesign.tsx:10 ~ NewDesign ~ props", props)
  const { user } = useUser()

  const defaultContent = {
    id: '',
    title: '',
    authorClerkId: user.id,
    status: postStatus.draft,
    DesignElement: props.designPhases.filter(dp => dp.parentPhaseId).map((dp) => {
        return { id: '', content: '', designPhaseId: dp.phaseId }      
    }),
  }

  return (
    <>
      <Layout>
        <TDFMain props={props} content={defaultContent} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetServerSideProps = async (context) => {
  const txCalls = []
  txCalls.push(
    prisma.post.findMany({
      where: { categories: { every: { label: 'defi' } } },
      take: 3,
    })
  )

  txCalls.push(prisma.designPhases.findMany({orderBy: {phaseOrder: 'asc'}}))

  txCalls.push(prisma.mechanismImpactFactors.findMany({}))

  const [posts, designPhases, mechanismImpactFactors] = await prisma.$transaction(txCalls)

  return {
    props: {
      posts: posts || null,
      designPhases: designPhases || null,
      mechanismImpactFactors: mechanismImpactFactors || null,
    },
  }
}
