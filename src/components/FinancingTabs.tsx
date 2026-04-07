import { motion } from 'framer-motion'
import { User, Building2, FileKey } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { LucideIcon } from 'lucide-react'

export type FinancingTabId = 'personal' | 'business' | 'leasing'

interface Props {
  onTabChange: (tab: FinancingTabId) => void
  activeTab: FinancingTabId
}

const tabs: { id: FinancingTabId; label: string; sublabel: string; Icon: LucideIcon }[] = [
  { id: 'personal', label: 'Kredyt osobisty', sublabel: 'Osoby fizyczne', Icon: User },
  { id: 'business', label: 'Kredyt firmowy', sublabel: 'Firmy i JDG', Icon: Building2 },
  { id: 'leasing', label: 'Leasing', sublabel: 'Dla firm', Icon: FileKey },
]

export default function FinancingTabs({ onTabChange, activeTab }: Props) {
  const m = useIsMobile()

  return (
    <div
      style={{
        display: 'flex',
        gap: m ? 8 : 12,
        marginBottom: m ? 24 : 40,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: m ? '12px 16px' : '14px 24px',
              background: isActive ? theme.colors.accentLight : theme.colors.bg,
              border: isActive ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.2s',
              flex: m ? '1 1 auto' : 'none',
              minWidth: m ? 'auto' : 180,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = theme.colors.accent
                e.currentTarget.style.background = theme.colors.accentLight
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.background = theme.colors.bg
              }
            }}
          >
            <tab.Icon
              size={20}
              color={isActive ? theme.colors.accent : theme.colors.textMuted}
            />
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? theme.colors.accent : theme.colors.text,
                }}
              >
                {tab.label}
              </div>
              {!m && (
                <div
                  style={{
                    fontSize: 11,
                    color: theme.colors.textMuted,
                    marginTop: 2,
                  }}
                >
                  {tab.sublabel}
                </div>
              )}
            </div>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: '20%',
                  right: '20%',
                  height: 3,
                  background: theme.colors.accent,
                  borderRadius: 2,
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
