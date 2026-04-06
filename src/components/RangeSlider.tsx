import { useCallback } from 'react'
import { theme } from '../theme'

interface RangeSliderProps {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  formatValue: (value: number) => string
  suffix?: string
}

export default function RangeSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  suffix,
}: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  const trackBackground = `linear-gradient(to right, ${theme.colors.accent} 0%, ${theme.colors.accent} ${percentage}%, ${theme.colors.border} ${percentage}%, ${theme.colors.border} 100%)`

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    },
    [onChange]
  )

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 14, color: theme.colors.textSecondary, fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text }}>
          {formatValue(value)}
          {suffix && (
            <span style={{ fontSize: 14, fontWeight: 500, color: theme.colors.textSecondary, marginLeft: 4 }}>
              {suffix}
            </span>
          )}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={{ background: trackBackground }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 6,
          fontSize: 12,
          color: theme.colors.textMuted,
        }}
      >
        <span>
          {formatValue(min)} {suffix}
        </span>
        <span>
          {formatValue(max)} {suffix}
        </span>
      </div>
    </div>
  )
}
