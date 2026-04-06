import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X } from 'lucide-react'
import { theme } from '../theme'

export default function FloatingAgentButton() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 68,
              right: 0,
              width: 280,
              background: theme.colors.bg,
              borderRadius: theme.borderRadius.lg,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
              border: `1px solid ${theme.colors.border}`,
              padding: 24,
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 600, color: theme.colors.text, marginBottom: 4 }}>
              Masz pytania?
            </p>
            <p style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 16 }}>
              Nasz ekspert pomoże Ci dobrać najlepszą ofertę finansowania.
            </p>

            <a
              href="tel:+48XXXXXXXXX"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: theme.colors.cta,
                color: theme.colors.ctaText,
                padding: '12px 16px',
                borderRadius: theme.borderRadius.sm,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                cursor: 'pointer',
              }}
            >
              <Phone size={16} />
              +48 XXX XXX XXX
            </a>

            <button
              onClick={() => {
                setOpen(false)
                window.location.href = 'mailto:kontakt@zamawiamrobota.pl'
              }}
              style={{
                width: '100%',
                background: 'none',
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text,
                padding: '10px 16px',
                borderRadius: theme.borderRadius.sm,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Lub zadaj pytanie online
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: theme.colors.accent,
          color: theme.colors.accentText,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0, 102, 255, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 102, 255, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 102, 255, 0.3)'
        }}
      >
        {open ? (
          <X size={24} />
        ) : (
          <Phone size={24} />
        )}
      </button>
    </div>
  )
}
