import { useEffect, useRef, useState } from 'react'
import iconCopy from './assets/icon-chat-copy.svg'

// 色值标签便于记录，界面渲染使用 OKLCH；顺序为底色、文字、主色与两种点缀色。
export const colorPalettes = [
  {
    id: 'berry', title: '绿意与莓粉', description: '轻快的生活方式配色',
    colors: [
      { hex: '#F5F5ED', value: 'oklch(0.968 0.011 106.595)' },
      { hex: '#202522', value: 'oklch(0.258 0.009 159.400)' },
      { hex: '#C7EEA1', value: 'oklch(0.903 0.109 130.160)' },
      { hex: '#EB9ED0', value: 'oklch(0.790 0.111 340.739)' },
      { hex: '#6D8BFF', value: 'oklch(0.670 0.174 270.234)' },
    ],
  },
  {
    id: 'sea', title: '海盐蓝', description: '安静的阅读与工具界面',
    colors: [
      { hex: '#F2F6F6', value: 'oklch(0.970 0.004 197.086)' },
      { hex: '#243E49', value: 'oklch(0.348 0.037 226.812)' },
      { hex: '#AED5E5', value: 'oklch(0.850 0.047 224.734)' },
      { hex: '#F2A18B', value: 'oklch(0.784 0.102 35.884)' },
      { hex: '#BCCAC8', value: 'oklch(0.828 0.016 186.614)' },
    ],
  },
  {
    id: 'sunset', title: '落日杏橙', description: '温暖的活动与内容页面',
    colors: [
      { hex: '#FFF4E5', value: 'oklch(0.972 0.023 75.863)' },
      { hex: '#4A332B', value: 'oklch(0.345 0.036 39.994)' },
      { hex: '#F3AC66', value: 'oklch(0.798 0.120 64.203)' },
      { hex: '#CDBBDD', value: 'oklch(0.818 0.051 309.007)' },
      { hex: '#F2D57E', value: 'oklch(0.879 0.112 91.535)' },
    ],
  },
]

export default function ColorClub() {
  const [activeId, setActiveId] = useState(colorPalettes[0].id)
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(null)
  const palette = colorPalettes.find(item => item.id === activeId)
  const [background, ink, primary, secondary, accent] = palette.colors
  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const copyColors = async () => {
    try {
      await navigator.clipboard.writeText(palette.colors.map(color => color.hex).join('\n'))
      setCopied(true)
      clearTimeout(copiedTimer.current)
      copiedTimer.current = setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="color-club">
      <div className="color-preview-heading"><span>应用预览</span><span aria-live="polite">{palette.title}</span></div>
      <div className="color-demo" role="img" aria-label={`${palette.title}配色的生活方式界面预览`}
        style={{ '--palette-bg': background.value, '--palette-ink': ink.value, '--palette-primary': primary.value, '--palette-secondary': secondary.value, '--palette-accent': accent.value }}>
        <div className="color-demo-top"><span>色彩手记</span><span>VOL. 01</span></div>
        <div className="color-demo-main">
          <div className="color-demo-copy"><strong>给日常<br />一点颜色。</strong><span>散步、看展，收集小灵感。</span><span className="color-demo-pill">周末灵感 ↗</span></div>
          <div className="color-demo-art" aria-hidden="true"><i /><i /><i /></div>
        </div>
      </div>
      <div className="color-swatches" aria-label="当前方案色值">
        {palette.colors.map(color => <div key={color.hex}><span className="color-swatch" style={{ background: color.value }} /><span>{color.hex}</span></div>)}
      </div>
      <div className="color-actions" role="group" aria-label="配色操作">
        <button type="button" className="color-action color-action-random" onClick={e => {
          e.stopPropagation()
          setActiveId(colorPalettes[Math.floor(Math.random() * colorPalettes.length)].id)
        }}>随机颜色</button>
        <button type="button" className="color-action color-action-copy" aria-label={copied ? '已复制颜色' : '复制颜色'} title={copied ? '已复制颜色' : '复制颜色'} onClick={e => {
          e.stopPropagation()
          copyColors()
        }}>{copied ? <span className="color-action-check" aria-hidden="true">✓</span> : <img src={iconCopy} alt="" aria-hidden="true" />}</button>
      </div>
    </div>
  )
}
