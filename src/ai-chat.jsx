import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import iconClose from './assets/icon-chat-close.svg'
import iconMore from './assets/icon-chat-more.svg'
import iconVoice from './assets/icon-chat-voice.svg'
import iconCamera from './assets/icon-chat-camera.svg'
import iconPlus from './assets/icon-chat-plus.svg'
import iconCopy from './assets/icon-chat-copy.svg'
import iconStar from './assets/icon-chat-star.svg'
import iconShare from './assets/icon-chat-share.svg'
import iconDislike from './assets/icon-chat-dislike.svg'
import iconRefresh from './assets/icon-chat-refresh.svg'
import iconDot from './assets/icon-chat-dot.svg'
import iconChevronLeft from './assets/icon-chevron-left.svg'
import './ai-chat.css'

/* ---------- 动效参数 ----------
   页面从屏幕底部升起；气泡从底部微微抬起 + 轻微放大，
   文字比气泡晚 60ms 淡入，操作条最后出现 —— 读起来像「回答正在成形」。 */
const EASE_OUT = [0.23, 1, 0.32, 1]
const SHEET_IN = { duration: 0.38, ease: EASE_OUT }
const SHEET_OUT = { duration: 0.26, ease: [0.4, 0, 1, 1] }
const BUBBLE_IN = { duration: 0.28, ease: EASE_OUT }
const TEXT_IN = { duration: 0.26, ease: EASE_OUT }
const ACTIONS_IN = { duration: 0.22, ease: EASE_OUT }
const COMPOSER_IN = { duration: 0.32, ease: EASE_OUT }

const GREETING = '你回来了，真好！有什么我可以帮你的吗，不管什么问题随时问我'

/* 建议问：点一下直接发出去 */
const SUGGESTIONS = [
  '腾讯VXG设计岗9级薪资能到多少？',
  '小红书上大家怎么准备大厂设计岗面试？',
  'Blender 几何节点应该从哪开始学？',
]

/* 演示用回答：按关键词给三条，其余走兜底。
   设计稿里这里是 lorem 占位，换成中文示例方便演示，随时可以替换。 */
const REPLIES = [
  {
    match: /薪资|工资|几级|9级|级别|待遇/,
    text: '社区里聊这个的笔记不多，能确认的只有区间：同一级别在不同城市、不同业务线之间，差距可能到三成。多数笔记只写结果，不写级别和城市，单独一个数字参考价值有限。你如果有具体的城市和业务线，我可以再把范围缩小一点。',
  },
  {
    match: /面试|简历|作品集|offer|求职/i,
    text: '近一年讲面试的笔记里，反复出现的是三件事：作品集要能讲清一个完整项目，而不只是好看的图；面试官更在意你如何取舍，而不是工具熟练度；被问到不会的，直接说不确定比硬答更加分。这些是个人经验，不是官方口径。',
  },
  {
    match: /blender|几何节点|建模|渲染/i,
    text: '几何节点从「实例化 + 集合」这组开始最省力：先把点分布到一个面上，再用实例化把物体放上去，理解「点 → 实例 → 变换」这条链。之后再学属性传递和场，因为大部分节点组合都在做这两件事。社区里有三条入门路径，可以先跟着走一遍。',
  },
]

const FALLBACK_REPLY = '这个我在社区里没找到足够一致的答案。能确认的是：不同人的情况差别很大，多数笔记只给结论、不给判断依据。你补充一下具体场景，比如现在的状况和目标，我再把相关的几篇笔记找出来对照着看。'

/* ---------- 极简 Markdown ----------
   方案里只用到几种写法：`## 小标题`、`1. 编号`、`- 列表`、
   `**加粗**` 和 `` `节点名` ``。够用就不引第三方库。 */
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`)/g

function renderInline(text) {
  return text.split(INLINE).filter(Boolean).map((part, i) => {
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    return <span key={i}>{part}</span>
  })
}

function Markdown({ text }) {
  const blocks = []
  let list = null
  text.split('\n').forEach((raw) => {
    const line = raw.trim()
    if (!line) { list = null; return }
    if (line.startsWith('## ')) { list = null; blocks.push({ type: 'h', value: line.slice(3) }); return }
    const ordered = /^(\d+)\.\s+(.*)$/.exec(line)
    const bullet = /^[-•]\s+(.*)$/.exec(line)
    if (ordered || bullet) {
      const type = ordered ? 'ol' : 'ul'
      if (!list || list.type !== type) {
        list = { type, items: [] }
        blocks.push(list)
      }
      list.items.push(ordered ? ordered[2] : bullet[1])
      return
    }
    list = null
    blocks.push({ type: 'p', value: line })
  })
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'h') return <h3 className="ai-chat-md-h" key={i}>{block.value}</h3>
        if (block.type === 'ol' || block.type === 'ul') {
          const Tag = block.type
          return (
            <Tag className={block.type === 'ol' ? 'ai-chat-md-ol' : 'ai-chat-md-ul'} key={i}>
              {block.items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
            </Tag>
          )
        }
        return <p className="ai-chat-md-p" key={i}>{renderInline(block.value)}</p>
      })}
    </>
  )
}

const replyFor = (text, context) => {
  const topicReply = context?.replies?.find(({ match }) => match.test(text))
  if (topicReply) return topicReply
  const genericReply = REPLIES.find(({ match }) => match.test(text))
  if (genericReply) return genericReply
  return { text: context?.fallback ?? FALLBACK_REPLY }
}

/* 「点点」AI 对话页（按设计稿还原）。
   进入时整页从屏幕底部升起，关闭时原路落下；由外层 AnimatePresence 负责退场。
   从话题页进入时，context 带着当前话题的开场白、建议问题和来源。 */
export default function AiChat({ onClose, context = null, onOpenSource, onOpenLink, layer = 46 }) {
  const input = useRef(null)
  const page = useRef(null)
  const scroller = useRef(null)
  const sequence = useRef(0)
  const replyTimer = useRef(null)
  const contextKey = useRef(context?.title ?? '')
  const reduce = useReducedMotion()
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(() => [{ id: 'greeting', from: 'ai', text: context?.greeting ?? GREETING }])

  /* 进入时把焦点移进页面容器（不是按钮，避免一进来就出现聚焦框），
     退出时还给原元素，键盘用户不会丢位置 */
  useEffect(() => {
    const previous = document.activeElement
    page.current?.focus({ preventScroll: true })
    return () => {
      clearTimeout(replyTimer.current)
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [])

  /* 话题变了就换一套开场白和问题，避免停留在上一个社区的对话里 */
  useEffect(() => {
    const key = context?.title ?? ''
    if (contextKey.current === key) return
    contextKey.current = key
    clearTimeout(replyTimer.current)
    setDraft('')
    setMessages([{ id: 'greeting', from: 'ai', text: context?.greeting ?? GREETING }])
  }, [context])

  /* 新消息进来滚到底 */
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const send = (raw) => {
    const text = (raw ?? draft).trim()
    if (!text) return
    const reply = replyFor(text, context)
    setDraft('')
    setMessages((list) => [...list, { id: `u${++sequence.current}`, from: 'user', text }])
    clearTimeout(replyTimer.current)
    replyTimer.current = setTimeout(() => {
      setMessages((list) => [
        ...list,
        {
          id: `a${++sequence.current}`,
          from: 'ai',
          text: reply.text,
          sources: reply.sources ?? [],
          sourceLabel: reply.sourceLabel,
          link: reply.link ?? null,
          actions: true,
        },
      ])
    }, 520)
  }

  const copy = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {})
  }

  const suggestions = context?.suggestions ?? SUGGESTIONS

  return (
    <motion.div
      className="ai-chat-page"
      ref={page}
      tabIndex={-1}
      style={{ zIndex: layer }}
      role="dialog"
      aria-modal="true"
      aria-label={context ? `点点，正在聊${context.title}` : '点点'}
      initial={reduce ? false : { y: '100%' }}
      animate={{ y: 0 }}
      exit={reduce ? { y: 0, transition: { duration: 0 } } : { y: '100%', transition: SHEET_OUT }}
      transition={reduce ? { duration: 0 } : SHEET_IN}
      onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }}
    >
      <div className="ai-chat-status-space" aria-hidden="true" />

      <header className="ai-chat-header">
        <button type="button" className="ai-chat-icon-btn" onClick={onClose} aria-label="关闭">
          <img src={iconClose} alt="" />
        </button>
        <div className="ai-chat-title">
          <img className="ai-chat-avatar" src={iconDot} alt="" aria-hidden="true" />
          <span className="ai-chat-name">点点</span>
        </div>
        <button type="button" className="ai-chat-icon-btn" aria-label="更多">
          <img src={iconMore} alt="" />
        </button>
      </header>

      <div className="page-scroll ai-chat-scroll" ref={scroller} role="log" aria-live="polite">
        <div className="ai-chat-flow">
          {messages.map((message) => (
            <motion.div
              className={`ai-chat-bubble${message.from === 'user' ? ' is-user' : ''}${message.id === 'greeting' ? ' is-greeting' : ''}${message.actions ? ' has-actions' : ''}`}
              key={message.id}
              initial={reduce ? false : { opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { ...BUBBLE_IN, delay: message.id === 'greeting' ? 0.06 : 0 }
              }
            >
              <motion.div
                className="ai-chat-text"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { ...TEXT_IN, delay: message.id === 'greeting' ? 0.1 : 0.06 }}
              >
                <Markdown text={message.text} />
              </motion.div>
              {message.sources?.length > 0 && (
                <div className="ai-chat-sources">
                  <span className="ai-chat-sources-label">{message.sourceLabel ?? '来源笔记'}</span>
                  {message.sources.map((source) => {
                    /* 有原帖就整条可点：回答里的每一句都能回到作者那篇笔记 */
                    const clickable = Boolean(onOpenSource && source.post)
                    const Row = clickable ? 'button' : 'div'
                    return (
                      <Row
                        className={`ai-chat-source${clickable ? ' is-link' : ''}`}
                        key={source.id}
                        type={clickable ? 'button' : undefined}
                        onClick={clickable ? () => onOpenSource(source.post) : undefined}
                      >
                        {source.image ? (
                          <img src={source.image} alt="" loading="lazy" />
                        ) : (
                          <span className="ai-chat-source-tile">{source.tag?.slice(0, 2) ?? '来源'}</span>
                        )}
                        <span className="ai-chat-source-copy">
                          <span className="ai-chat-source-title">{source.title}</span>
                          <span className="ai-chat-source-meta">{source.meta}</span>
                        </span>
                        {clickable ? <img className="ai-chat-chevron" src={iconChevronLeft} alt="" aria-hidden="true" /> : null}
                      </Row>
                    )
                  })}
                </div>
              )}
              {/* 答完之后还能去哪：入口指回社区里已有的结构，不新造一层导航 */}
              {message.link && onOpenLink && (
                <button type="button" className="ai-chat-link" onClick={() => onOpenLink(message.link)}>
                  <span>{message.link.label}</span>
                  <img className="ai-chat-chevron" src={iconChevronLeft} alt="" aria-hidden="true" />
                </button>
              )}
              {message.actions && (
                <motion.div
                  className="ai-chat-actions"
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { ...ACTIONS_IN, delay: 0.16 }}
                >
                  <div className="ai-chat-action-group">
                    <motion.button type="button" className="ai-chat-action" aria-label="复制" whileTap={reduce ? undefined : { scale: 0.9 }} onClick={() => copy(message.text)}>
                      <img src={iconCopy} alt="" />
                    </motion.button>
                    <motion.button type="button" className="ai-chat-action" aria-label="收藏" whileTap={reduce ? undefined : { scale: 0.9 }}>
                      <img src={iconStar} alt="" />
                    </motion.button>
                    <motion.button type="button" className="ai-chat-action" aria-label="分享" whileTap={reduce ? undefined : { scale: 0.9 }}>
                      <img src={iconShare} alt="" />
                    </motion.button>
                  </div>
                  <div className="ai-chat-action-group">
                    <motion.button type="button" className="ai-chat-action" aria-label="不喜欢" whileTap={reduce ? undefined : { scale: 0.9 }}>
                      <img src={iconDislike} alt="" />
                    </motion.button>
                    <motion.button type="button" className="ai-chat-action" aria-label="重新生成" whileTap={reduce ? undefined : { scale: 0.9 }}>
                      <img src={iconRefresh} alt="" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          {messages.length === 1 && (
            <div className="ai-chat-suggestions">
              {suggestions.map((text, index) => (
                <motion.button
                  type="button"
                  className="ai-chat-chip"
                  key={text}
                  onClick={() => send(text)}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { ...TEXT_IN, delay: 0.12 + index * 0.05 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  {text}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      <motion.footer
        className="ai-chat-composer-wrap"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { ...COMPOSER_IN, delay: 0.08 }}
      >
        <div className="ai-chat-composer">
          <div className="ai-chat-composer-main">
            <img src={iconVoice} alt="" aria-hidden="true" />
            <input
              ref={input}
              className="ai-chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="发消息或按住说话..."
              aria-label="发消息或按住说话..."
            />
          </div>
          <div className="ai-chat-composer-actions">
            <img src={iconCamera} alt="" aria-hidden="true" />
            <img src={iconPlus} alt="" aria-hidden="true" />
          </div>
        </div>
        <p className="ai-chat-disclaimer">内容由AI生成</p>
      </motion.footer>
    </motion.div>
  )
}
