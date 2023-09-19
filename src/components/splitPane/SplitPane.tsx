import { useEffect, useState, ReactNode } from 'react'
import './style.css'

interface SplitPaneProps {
  children: ReactNode[]
}

const SplitPane: React.FC<SplitPaneProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [width, setWidth] = useState<string>('25%')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const newWidth = `${((e.clientX / window.innerWidth) * 100).toFixed(2)}%`
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleDividerMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsDragging(true)
  }

  return (
    <div className="split-pane-container">
      <div className="split-pane-left" style={{ width }}>
        {children[0]}
      </div>
      <div
        className={`split-pane-divider ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleDividerMouseDown}
      />
      <div className="split-pane-right">{children[1]}</div>
    </div>
  )
}

export default SplitPane
