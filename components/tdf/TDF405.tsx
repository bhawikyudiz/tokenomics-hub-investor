import { Field, useFormikContext } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTablePivot'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCard from '../form/FormCard'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { useEffect } from 'react'

export default function TDF405({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase?.name}
        </h5>
        <ResourceSection content={designPhase.Resources} />
      </div>
      <Field
        name={`DesignElement.${values?.DesignElement?.findIndex(
          (de) => de.designPhaseId === 405
        )}.content`}
        component={FormCard}
        placeholder="Select categories"
        phaseId={designPhase.phaseId}
        // mechanismImpactFactors={props.mechanismImpactFactors}
      />
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          References
        </h5>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          Incentive Summary
        </h5>
        <Field
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhaseId === 405
          )}.content`}
          users={values?.PostUser || []}
          component={FormTable}
          placeholder="Select categories"
          phaseId={designPhase.phaseId}
        />
        {props.posts.map((post) => (
          <div>
            <div key={post.id}>{post.title}</div>
            <BreakdownBox
              value={post?.businessModel}
              strength={post?.businessModelStrength}
              title="Business Model:"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
