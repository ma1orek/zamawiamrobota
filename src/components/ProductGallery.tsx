import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { theme } from '../theme'
import useIsMobile from '../hooks/useIsMobile'
import type { RobotProduct } from '../data/robotSpecs'

interface Props {
  robot: RobotProduct
}

export default function ProductGallery({ robot }: Props) {
  const m = useIsMobile()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const images = robot.images

  const prev = () => setSelectedIdx((i) => (i > 0 ? i - 1 : images.length - 1))
  const next = () => setSelectedIdx((i) => (i < images.length - 1 ? i + 1 : 0))

  return (
    <section
      style={{
        padding: m ? '64px 20px' : '100px 48px',
        background: theme.colors.bgSecondary,
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: m ? 28 : 40,
            fontWeight: 700,
            color: theme.colors.text,
            letterSpacing: '-0.02em',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Galeria
        </h2>
        <p
          style={{
            fontSize: 16,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginBottom: m ? 24 : 40,
          }}
        >
          Poznaj robota {robot.name} z bliska
        </p>

        {/* Main image with nav arrows */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                background: theme.colors.bg,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: m ? 320 : 480,
              }}
            >
              <img
                src={images[selectedIdx]}
                alt={`${robot.name} - ${selectedIdx + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  padding: 16,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  border: `1px solid ${theme.colors.border}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <ChevronLeft size={20} color={theme.colors.text} />
              </button>
              <button
                onClick={next}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  border: `1px solid ${theme.colors.border}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <ChevronRight size={20} color={theme.colors.text} />
              </button>
            </>
          )}

          {/* Counter */}
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 16,
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {selectedIdx + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail strip - horizontal scroll */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              style={{
                flexShrink: 0,
                width: m ? 56 : 72,
                height: m ? 56 : 72,
                borderRadius: theme.borderRadius.sm,
                border: idx === selectedIdx
                  ? `2px solid ${theme.colors.accent}`
                  : `1px solid ${theme.colors.border}`,
                background: theme.colors.bg,
                cursor: 'pointer',
                overflow: 'hidden',
                padding: 0,
                transition: 'border-color 0.2s, opacity 0.2s',
                opacity: idx === selectedIdx ? 1 : 0.7,
              }}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
