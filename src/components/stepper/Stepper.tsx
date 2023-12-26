import { StepperProps } from '../../types/types'

export default function Stepper(prop: StepperProps) {
  const getStatus = (index: number) => {
    if (index < prop.currentStep) {
      return 'completed'
    }
    if (index === prop.currentStep) {
      return prop.isPlaceOrderClicked ? 'in-progress' : 'pending'
    }
    return 'pending'
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between max-w-4xl mx-auto">
      {prop.steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`flex items-center text-${getStatus(index)}-500`}>
            {getStatus(index) === 'completed' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <circle cx={12} cy={12} r={10} />
            )}
            <div className="w-8 h-1 bg-green-500" />
          </div>
          <div className="text-sm font-medium text-gray-700 px-3">
            <div>{`STEP ${index + 1}`}</div>
            <div>{step}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
