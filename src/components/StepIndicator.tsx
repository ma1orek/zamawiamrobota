import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { PurchaseStep } from '../types'

interface StepIndicatorProps {
  currentStep: PurchaseStep
  onStepClick?: (step: PurchaseStep) => void
}

const steps = [
  { num: 1 as PurchaseStep, label: 'Płatność' },
  { num: 2 as PurchaseStep, label: 'Kalkulator' },
  { num: 3 as PurchaseStep, label: 'Wniosek' },
  { num: 4 as PurchaseStep, label: 'Oferty' },
  { num: 5 as PurchaseStep, label: 'Gotowe' },
]

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const m = useIsMobile()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: m ? 4 : 8,
        padding: m ? '20px 16px' : '28px 48px',
        maxWidth: 700,
        margin: '0 auto',
      }}
    >
      {steps.map((step, idx) => {
        const isActive = step.num === currentStep
        const isCompleted = step.num < currentStep
        const isClickable = isCompleted && onStepClick

        return (
          <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: m ? 4 : 8 }}>
            <button
              onClick={() => isClickable && onStepClick(step.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'none',
                border: 'none',
                cursor: isClickable ? 'pointer' : 'default',
                padding: 0,
              }}
            >
              <div
                style={{
                  width: m ? 28 : 32,
                  height: m ? 28 : 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  background: isCompleted
                    ? theme.colors.success
                    : isActive
                      ? theme.colors.accent
                      : theme.colors.bgSecondary,
                  color: isCompleted || isActive ? '#fff' : theme.colors.textMuted,
                  border: isActive
                    ? `2px solid ${theme.colors.accent}`
                    : isCompleted
                      ? 'none'
                      : `1px solid ${theme.colors.border}`,
                  transition: 'all 0.3s',
                }}
              >
                {isCompleted ? '✓' : step.num}
              </div>
              {!m && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? theme.colors.text : theme.colors.textMuted,
                    transition: 'all 0.3s',
                  }}
                >
                  {step.label}
                </span>
              )}
            </button>

            {idx < steps.length - 1 && (
              <div
                style={{
                  width: m ? 20 : 40,
                  height: 2,
                  background: isCompleted ? theme.colors.success : theme.colors.border,
                  transition: 'background 0.3s',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
