import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { designDirections } from './data/communityPreview.js'
import { Avatar, PostInfoContent } from './post-info.jsx'
import iconChevronLeft from './assets/icon-chevron-left.svg'
import iconTabLeft from './assets/icon-tab-left.svg'

const uniquePosts = posts => [...new Map(posts.map(post => [post.id, post])).values()]
const isWorkPost = post => post.contentType === '作品' || Boolean(post.kind?.includes('作品'))

function SectionHead({ title }) {
  return (
    <div className="insight-section-head">
      <h2>{title}</h2>
    </div>
  )
}

function InsightNote({ post, onOpen, compact = false }) {
  return (
    <button type="button" className={`insight-note${compact ? ' is-compact' : ''}`} onClick={e => onOpen(post, e.currentTarget)}>
      <span className="insight-note-thumb"><img src={post.image} alt="" loading="lazy" /></span>
      <span className="insight-note-copy">
        <strong className="insight-note-title">{post.title}</strong>
        {!compact && post.body?.[0] ? <span className="insight-note-desc">{post.body[0]}</span> : null}
        <span className="insight-note-meta">
          <span className="post-user">
            <Avatar className="post-avatar" author={post.author} />
            <span className="post-username">{post.author?.name}</span>
          </span>
          {post.conditions ? <span className="insight-note-cond">{post.conditions}</span> : null}
        </span>
      </span>
    </button>
  )
}

// 两个原型入口共用知识与灵感详情，来源笔记继续使用各自原有的详情页。
export default function CommunityInsight({ item, onBack, onSelect, onOpenPost, onOpenAssistant, inactive, layer = 41 }) {
  const heading = useRef(null)
  const scroller = useRef(null)
  const sourceButton = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const previous = document.activeElement
    scroller.current?.scrollTo(0, 0)
    heading.current?.focus({ preventScroll: true })
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }) }
  }, [item.id])
  useEffect(() => {
    if (!inactive && sourceButton.current?.isConnected) sourceButton.current.focus({ preventScroll: true })
  }, [inactive])

  const related = item.kind === 'knowledge' || item.kind === 'style'
    ? []
    : (item.related ?? []).map(id => designDirections.find(direction => direction.id === id))
  const isKnowledge = item.kind === 'knowledge'
  const isRoute = Boolean(item.steps)
  const routeNotes = isRoute ? uniquePosts(item.steps.flatMap(step => step.posts)) : []
  const works = isKnowledge ? item.posts.filter(isWorkPost) : []
  const tutorials = isKnowledge ? item.posts.filter(post => !isWorkPost(post)) : []
  const tutorialColumns = tutorials.length > 1 ? [0, 1] : [0]
  const navTitle = isKnowledge ? 'Blender 知识库' : isRoute ? '学习路径' : item.kind === 'style' ? '热门风格' : '灵感关联'
  const openSource = (post, node) => {
    sourceButton.current = node
    onOpenPost(post, node)
  }
  /* 单篇笔记不拆两栏，否则卡片会被挤在左半边 */
  const renderDesignPosts = posts => {
    const columns = posts.length > 1 ? [0, 1] : [0]
    return (
      <div className="news-sources-flow">
        {columns.map(column => <div className="news-sources-column" key={column}>
          {posts.filter((_, index) => index % 2 === column).map(post => (
            <button type="button" className="post-card insight-source" key={post.id} onClick={e => { sourceButton.current = e.currentTarget; onOpenPost(post, e.currentTarget) }}>
              <span className="post-image" style={{ aspectRatio: post.ratio }}><img src={post.image} alt="" loading="lazy" /></span>
              <div className="post-info"><PostInfoContent post={post} />{post.conditions && <span className="insight-version">{post.conditions}</span>}</div>
            </button>
          ))}
        </div>)}
      </div>
    )
  }

  return (
    <motion.div className={`news-page community-insight${isKnowledge ? ' insight-knowledge' : ''}${item.kind === 'style' ? ' insight-style' : ''}`} style={{ zIndex: layer }} role="dialog" aria-modal="true" aria-labelledby="community-insight-title" inert={inactive}
      initial={reduce ? false : { x: 402 }} animate={{ x: 0 }} exit={reduce ? undefined : { x: 402 }} transition={{ duration: reduce ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}
      onKeyDown={e => {
        if (e.key === 'Escape') { e.stopPropagation(); onBack() }
        if (e.key !== 'Tab') return
        const controls = [...e.currentTarget.querySelectorAll('button, a[href]')]
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }}>
      <div className="post-status-space" aria-hidden="true" />
      <div className="topic-nav">
        <div className="topic-nav-left">
          <button type="button" className="post-back" onClick={onBack} aria-label="返回上一级"><img src={iconChevronLeft} alt="" /></button>
          <span className="topic-nav-title">{navTitle}</span>
        </div>
        {onOpenAssistant && (
          <div className="topic-nav-actions">
            <button type="button" className="topic-ai" onClick={() => onOpenAssistant()} aria-label={`问点点：${navTitle}`}>
              <img src={iconTabLeft} alt="" />
            </button>
          </div>
        )}
      </div>
      <div className="page-scroll news-scroll insight-scroll" ref={scroller}>
        {isKnowledge ? (
          <>
            <article className="news-article insight-detail-head">
              <div className="insight-title-row">
                <span className="insight-knowledge-icon iconfont" aria-hidden="true">{item.icon}</span>
                <h1 className="news-title" id="community-insight-title" ref={heading} tabIndex={-1}>{item.title}</h1>
              </div>
              <p className="news-lead">{item.summary}</p>
            </article>

            {tutorials.length > 0 && (
              <section className="insight-tutorials">
                <SectionHead title="教程与经验" />
                <div className={`insight-waterfall${tutorials.length === 1 ? ' is-single' : ''}`}>
                  {tutorialColumns.map(column => (
                    <div className="insight-waterfall-column" key={column}>
                      {tutorials.filter((_, index) => index % 2 === column).map(post => (
                        <button type="button" className="post-card insight-waterfall-card" key={post.id} onClick={e => openSource(post, e.currentTarget)}>
                          <span className="post-image" style={{ aspectRatio: post.ratio }}>
                            <img src={post.image} alt="" loading="lazy" />
                          </span>
                          <div className="post-info">
                            <PostInfoContent post={post} />
                            {post.conditions && <span className="insight-waterfall-cond">{post.conditions}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {works.length > 0 && (
              <section className="insight-section">
                <SectionHead title="社区作品" />
                <div className="insight-note-list">
                  {works.map(post => <InsightNote key={post.id} post={post} onOpen={openSource} />)}
                </div>
              </section>
            )}

          </>
        ) : isRoute ? (
          <>
            <article className="news-article insight-detail-head">
              <div className="insight-badges">
                <span className="insight-badge">AI 整理</span>
                <span>{item.level}</span>
                <span>{routeNotes.length} 篇笔记</span>
              </div>
              <h1 className="news-title" id="community-insight-title" ref={heading} tabIndex={-1}>{item.title}</h1>
              <p className="news-lead">{item.goal}</p>
            </article>

            <section className="insight-section">
              <SectionHead title="学习顺序" />
              <ol className="insight-stage-list">
                {item.steps.map((step, index) => (
                  <li className="insight-stage" key={step.title}>
                    <span className="insight-stage-num" aria-hidden="true">{index + 1}</span>
                    <div className="insight-stage-body">
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                      {step.posts.length > 0 && (
                        <div className="insight-note-list">
                          {step.posts.map(post => <InsightNote key={post.id} post={post} onOpen={openSource} compact />)}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {item.outcome && (
              <section className="insight-section">
                <SectionHead title="学完之后" />
                <p className="insight-outcome">{item.outcome}</p>
              </section>
            )}
          </>
        ) : (
          <>
            <article className="news-article">
              <h1 className="news-title" id="community-insight-title" ref={heading} tabIndex={-1}>{item.title}</h1>
              <p className="news-lead">{item.summary}</p>
              {item.kind === 'style' && <div className="news-body insight-style-copy"><h2>风格特征</h2><p>{item.features}</p><h2>适用场景</h2><p>{item.usage}</p></div>}
              {item.source && <a className="news-source-link" href={item.source.url} target="_blank" rel="noreferrer">{item.source.label} ↗</a>}
              {related.length > 0 && <section className="insight-related"><h2>继续探索</h2><div>{related.map(node => <button type="button" key={node.id} onClick={() => onSelect(node)}>{node.title}<span aria-hidden="true">↗</span></button>)}</div></section>}
            </article>
            <section className="news-sources">
              <div className="news-sources-header"><h2 className="news-sources-title">代表作品</h2></div>
              {item.posts.length ? renderDesignPosts(item.posts) : <p className="insight-empty">暂未收录相关笔记。</p>}
            </section>
          </>
        )}
      </div>
    </motion.div>
  )
}
