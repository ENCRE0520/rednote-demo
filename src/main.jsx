import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, MotionConfig, animate, motion, useDragControls, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import './style.css'

/* 内容数据：来自 Notion「🕊️ Twitter 点赞」数据库 */
import {
  followingAuthors,
  homeColumns,
  INITIAL_FOLLOW,
  notesForFollow,
  notesForTopic,
  peopleColumns,
  topicChips,
  topicForPost,
  topics,
} from './data/posts.js'

/* 要闻的来源笔记：按标题写死，不随机 */
import { sourcesForNews } from './data/newsSources.js'
import { designFeaturedPosts, scenePosts } from './data/scenes.js'
import { blenderFeaturedPosts } from './data/blenderResearch.js'
import { blenderKnowledge, blenderRoutes } from './data/communityPreview.js'
import { designStyles } from './data/designStyles.js'
import { buildTopicAssistant } from './data/topicAssistant.js'
import CommunityInsight from './community-insight.jsx'
import ColorClub from './color-club.jsx'
import AiChat from './ai-chat.jsx'
import { Avatar, PostInfoContent, commentColor } from './post-info.jsx'
import { initialPostNavigation, postNavigationReducer } from './post-navigation.js'
import { createTopicSheetScrollCoordinator } from './topic-sheet-scroll.js'

import iconStatusLevels from './assets/icon-status-levels.svg'
import iconTabLeft from './assets/icon-tab-left.svg'
import iconSearch from './assets/icon-search.svg'
import iconSearchChev from './assets/icon-search-chev.svg'
import iconPlus from './assets/icon-plus.svg'
import iconChevronLeft from './assets/icon-chevron-left.svg'
import iconShare from './assets/icon-share.svg'
import iconChevronSm from './assets/icon-chevron-sm.svg'
import iconDislike from './assets/icon-dislike.svg'
import iconEdit from './assets/icon-edit.svg'
import iconHeart from './assets/icon-heart.svg'
import iconHeartLg from './assets/icon-heart-lg.svg'
import iconStar from './assets/icon-star.svg'
import iconComment from './assets/icon-comment.svg'
import iconCommentLike from './assets/icon-comment-like.svg'
import iconMore from './assets/icon-more.svg'

/* ============================================================
   动效参数（animations skill：只动 transform / opacity）
   - 手势/可中断 → spring
   - 进出共用同一组曲线与时长 → 展开与收起严格对称
   ============================================================ */

/* 设计稿（内屏）尺寸 */
const PHONE_W = 402
const PHONE_H = 874
/* 外框尺寸 = 内屏 + 6px 边框 × 2 */
const FRAME_W = 414
const FRAME_H = 886
const PANE_W = 402

const EASE_OUT_QUINT = [0.23, 1, 0.32, 1]
const EASE_IN_OUT_CUBIC = [0.645, 0.045, 0.355, 1]

const TAB_SPRING = { type: 'spring', duration: 0.4, bounce: 0 }
const TAB_SETTLE_SPRING = { type: 'spring', duration: 0.3, bounce: 0 }
/* 次级 Tab（关注的人 / 关注的话题）：同族曲线，略快一点 */
const SUBTAB_SPRING = { type: 'spring', duration: 0.36, bounce: 0 }
/* 话题页 sheet：收起 top=350，下拖展开到 top=787，露出背后的每日要闻 */
const TOPIC_SHEET_TRAVEL = 437
/* 上拖到顶：top 118 = 顶部导航栏（62 状态栏 + 56 导航）下方，笔记 sheet 占满剩余屏幕 */
const TOPIC_SHEET_UP = -232
/* 收起后层时，列表在 sheet 上移的前 100px 内收回到顶部：
   否则已滚过的热门内容会一直顶在裁切边上，收起全程顶部都是断的 */
const TOPIC_NEWS_RESET_LEAD = 100
/* 后层列表上滑：社区大标题整行（含关注按钮）先原地淡出，完全归零后
   导航栏标题再淡入，两段不重叠，避免两行标题同时出现。
   大标题在卡片进入标题区前淡完；导航标题需在卡片顶到导航栏下沿
   （展开态约 72px 滚动）之前到 1。 */
const TOPIC_HEAD_FADE = [8, 40]
const TOPIC_NAV_FADE = [40, 64]
/* 上拉笔记 sheet 时同样先让大标题淡出（sheetY 为负），归零后导航标题再出现 */
const TOPIC_HEAD_SHEET_FADE = [-40, -140]
const TOPIC_NAV_SHEET_FADE = [-140, -215]
/* 设计稿态 sheet 高度：874 - 350；上移多少高度就补多少，可视高度恒等于滚动区高度 */
const TOPIC_SHEET_H = 524
const TOPIC_SHEET_SPRING = { type: 'spring', duration: 0.5, bounce: 0.08 }

/* 展开 / 收起：同一组参数，反向播放即对称 */
const FLIGHT = { duration: 0.4, ease: EASE_IN_OUT_CUBIC }
/* 卡片文字层：先跟卡片一起放大，再匀速淡出。200ms 就退干净，
   给详情页内容留出显形时间，避免两份文字在飞行末段叠在一起；
   收起时末段淡入（延迟 160ms + 240ms，正好在形变落位时收尾） */
const INFO_OUT = { duration: 0.16, delay: 0.04, ease: 'linear' }
const INFO_IN = { duration: 0.24, delay: 0.16, ease: EASE_OUT_QUINT }
/* 详情页内容不再等飞行结束才显形：飞行末段（280ms）就开始从白色里淡入，
   落位时正好完全可见。起点晚于文字层淡出结束，画面里始终只有一份文字。
   白壳此时已铺满屏幕，内容从卡片中心长出来的过程仍然连续。 */
const PAGE_FADE_LEAD = { duration: 0.12, delay: 0.28, ease: EASE_OUT_QUINT }
/* 无法提前显形的入口（社区页本身叠在帖子之上时，详情页还在它下面）：
   仍从落位那一刻开始淡入，但比原来更短 */
const PAGE_FADE_IN = { duration: 0.12, ease: EASE_OUT_QUINT }
const PAGE_FADE_OUT = { duration: 0.22, ease: EASE_OUT_QUINT }

/* 落地页内容跟随卡片一起放大：
   起点缩放 = 卡片宽 / 屏宽（约 0.47），阻尼系数用来减弱"冲出卡片"的溢出感，
   1 = 与外壳严格同比例，越小越克制。缩放中心 = 卡片中心，故内容是从卡片里长出来的。 */
const CONTENT_ZOOM_DAMP = 0.8
/* 其他元素变暗（status bar / home indicator 除外） */
const DIM_OPACITY = 0.6
const DIM = { duration: 0.4, ease: EASE_IN_OUT_CUBIC }
/* 顶部 Tab 指示条：两个 Tab 之间水平滑动 */
const INDICATOR = { duration: 0.25, ease: EASE_OUT_QUINT }

/* ---------- 关注闭环 ----------
   每个话题一份状态：只记录是否已关注（决定社区页按钮与话题条末尾的追加项）。
   页面上不做任何未读红点 / 圆点 / 角标提示。 */
const FOLLOW_TOAST_MS = 2600
const FOLLOW_TOAST_MOTION = { duration: 0.22, ease: EASE_OUT_QUINT }

/* 手机坐标换算：双图层 FLIP 的几何来源。
   已卸载 / 不可见（尺寸为 0）的元素直接返回 null，避免用全 0 的矩形
   算出左上角起点，让飞行动画从屏幕左上角错误地展开。 */
function localRect(el) {
  const phone = document.querySelector('.phone-ui')
  if (!el || !phone || !el.isConnected) return null
  const r = el.getBoundingClientRect()
  if (r.width < 1 || r.height < 1) return null
  const p = phone.getBoundingClientRect()
  const s = p.width / PHONE_W
  return { x: (r.x - p.x) / s, y: (r.y - p.y) / s, w: r.width / s, h: r.height / s }
}

/* 元素在 root 内的布局坐标（offsetLeft/offsetTop 不受 transform 影响，可在缩放动画中安全测量） */
function offsetWithin(el, root) {
  let x = 0
  let y = 0
  let node = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent
  }
  return { x, y }
}

function preloadImage(src) {
  if (!src) return Promise.resolve()
  const img = new Image()
  img.src = src
  return img.decode?.().catch(() => {}) ?? new Promise((resolve) => {
    img.onload = resolve
    img.onerror = resolve
    if (img.complete) resolve()
  })
}

/* ---------- 内容数据 ----------
   首页（发现）与关注页各自使用不重复的帖子，全部取自 Notion 点赞记录：
   卡片上的黑色文字 = title，详情页加粗标题 = title，下方正文 = body（仅点开可见）。 */

const discoverTabs = ['推荐', 'RED', '热点', '直播', '短剧', '求助']


/* ---------- 通用小组件 ---------- */

/* 全局唯一的状态栏：始终渲染在 phone-ui 最上层（z50），所有页面共享。
   自身背景透明，底色由各自页面（首页白底 / 话题页渐变 / 详情页白底）自然铺设，
   进出动画时不再有白底色块遮挡。 */
function StatusBar() {
  return (
    <div className="status-bar">
      <div className="status-time">9:41</div>
      <div className="dynamic-island" />
      <div className="status-levels">
        <img src={iconStatusLevels} alt="" />
      </div>
    </div>
  )
}

/* 顶部 Tab：常驻固定层，不随分页平移；只有红色指示条在两个 Tab 之间水平滑动
   指示器不使用 layoutId —— 共享布局投影会在祖先 scale 下被反复重测并累积漂移，
   导致点击帖子等非切换场景出现左右跳动。改为：始终挂载 + 按 active 显式驱动 x，
   只在 Tab 真正切换时才播放动画，首次挂载/状态更新直接落位。 */
function HomeTabBar({ active, onSelect, onOpenAssistant }) {
  const tabs = ['关注', '发现', '上海']
  const reduce = useReducedMotion()
  const listRef = useRef(null)
  const btnRefs = useRef([])
  const x = useMotionValue(0)
  const mounted = useRef(false)

  useLayoutEffect(() => {
    const list = listRef.current
    const btn = btnRefs.current[tabs.indexOf(active)]
    if (!list || !btn) return
    /* offsetLeft 是布局像素，不受手机画布 scale 影响，数值稳定 */
    const target = btn.offsetLeft + btn.offsetWidth / 2
    if (!mounted.current || reduce) {
      mounted.current = true
      x.set(target)
      return
    }
    const controls = animate(x, target, INDICATOR)
    return () => controls.stop()
  }, [active, reduce, x])

  return (
    <div className="home-tab-bar">
      <button type="button" className="home-tab-icon" onClick={() => onOpenAssistant()} aria-label="打开点点">
        <img src={iconTabLeft} alt="" />
      </button>
      <div className="home-tab-list" ref={listRef}>
        {tabs.map((tab, i) => {
          const clickable = tab === '关注' || tab === '发现'
          if (!clickable) {
            return (
              <span
                key={tab}
                ref={(el) => {
                  btnRefs.current[i] = el
                }}
                className={`home-tab${active === tab ? ' is-active' : ''}`}
              >
                {tab}
              </span>
            )
          }
          return (
            <button
              key={tab}
              ref={(el) => {
                btnRefs.current[i] = el
              }}
              type="button"
              className={`home-tab${active === tab ? ' is-active' : ''}`}
              onClick={() => onSelect(tab)}
            >
              {tab}
            </button>
          )
        })}
        <motion.span className="home-tab-indicator" style={{ x }} />
      </div>
      <span className="home-tab-icon">
        <img src={iconSearch} alt="" />
      </span>
    </div>
  )
}

function DiscoverTabs() {
  return (
    <div className="discover-tab-row">
      <div className="discover-tabs">
        {discoverTabs.map((tab) => (
          <span
            key={tab}
            className={`discover-tab${tab === '推荐' ? ' is-active' : ''}`}
          >
            {tab}
          </span>
        ))}
      </div>
      <span className="discover-search">
        <img src={iconSearchChev} alt="" />
      </span>
    </div>
  )
}

/* 二级 Tab：只保留两个标签本身，不加任何未读红点 */
function FollowSubTabs({ active, onSelect }) {
  const tabs = ['关注的人', '关注的话题']
  return (
    <div className="sub-tab-row">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`sub-tab${active === tab ? ' is-active' : ''}`}
          onClick={() => onSelect(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

function FollowingRow() {
  return (
    <div
      className="following-row"
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {followingAuthors.map((author, i) => (
        <div key={author.handle} className="profile">
          <Avatar className="profile-avatar" author={author} />
          {/* 红点 badge 挂在 .profile 上，不再放进头像：头像有 overflow:hidden + 圆形裁切，会把 badge 切掉 */}
          {i < 4 && <span className="profile-badge" />}
          <p className="profile-name">{author.name}</p>
        </div>
      ))}
    </div>
  )
}

/* 「关注的话题」条：按 Figma 设计稿（关注页/关注的话题 → Topics）1:1 还原，
   顺序、文案、渐变、括号样式都照设计稿来。
   - 带 topicId 的 chip 只在对应社区已关注时出现，取消关注后立即移除
   - 其余 chip 是设计稿里的静态装饰，不参与关注状态
   - 在别处新关注的社区追加在末尾，重进关注页仍能看到 */
/* 括号 = 场景类型（界面语言）：
   ( ) 事件追踪 / { } 主题社区。社区数据用 topic.bracket 声明，缺省为花括号。 */
const TOPIC_BRACKETS = { brace: ['{', '}'], square: ['{', '}'], paren: ['(', ')'], topic: ['{', '}'], event: ['(', ')'] }
const bracketsFor = (kind) => TOPIC_BRACKETS[kind] ?? TOPIC_BRACKETS.brace

function TopicsStrip({ onOpenTopic, followedIds }) {
  const chipTopicIds = new Set(topicChips.map((chip) => chip.topicId).filter(Boolean))
  const visibleChips = topicChips.filter((chip) => !chip.topicId || followedIds[chip.topicId])
  const extraTopics = topics.filter((t) => followedIds[t.id] && !chipTopicIds.has(t.id))

  const chipInner = (title, subtitle, narrow, bracket) => {
    const [open, close] = bracketsFor(bracket)
    /* 名字栏只有 36px（60 - 左右 4px padding - 两个 8px 括号），
       Latin 名（Blender）一行放不下，按内容自适应并略缩字号；
       中文名都在 3 字以内，走默认的 36px / 12px，尺寸与排布不变 */
    const long = [...title].length > 3 || (subtitle && [...subtitle].length > 3)
    return (
      <div className={`topic-label${narrow ? ' is-narrow' : ''}`}>
        <span className="topic-brace">{open}</span>
        <span className={`topic-name${long ? ' is-long' : ''}`}>
          <span>{title}</span>
          {subtitle ? <span>{subtitle}</span> : null}
        </span>
        <span className="topic-brace">{close}</span>
      </div>
    )
  }

  return (
    <div
      className="topics-strip"
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {visibleChips.map((chip) => {
        const style = {
          background: `linear-gradient(to bottom, ${chip.from}, ${chip.to})`,
          ...(chip.ink ? { color: chip.ink } : null),
        }
        const topic = chip.topicId ? topics.find((t) => t.id === chip.topicId) : null
        return topic ? (
          <button
            key={chip.id}
            type="button"
            className={`topic${chip.narrow ? ' is-narrow' : ''}`}
            style={style}
            onClick={() => onOpenTopic(chip.from && chip.to ? { ...topic, from: chip.from, to: chip.to } : topic)}
          >
            {chipInner(chip.title, chip.subtitle, chip.narrow, chip.bracket)}
          </button>
        ) : (
          <div key={chip.id} className={`topic is-static${chip.narrow ? ' is-narrow' : ''}`} style={style}>
            {chipInner(chip.title, chip.subtitle, chip.narrow, chip.bracket)}
          </div>
        )
      })}
      {extraTopics.map((topic) => (
        <button
          key={topic.id}
          type="button"
          className="topic"
          style={{ background: `linear-gradient(to bottom, ${topic.from}, ${topic.to})` }}
          onClick={() => onOpenTopic(topic)}
        >
          {chipInner(topic.title, topic.subtitle, false, topic.bracket)}
        </button>
      ))}
    </div>
  )
}

function BottomNav({ dimmed }) {
  return (
    <div className="bottom-nav">
      <motion.div
        className="bottom-nav-tabs"
        animate={{ opacity: dimmed ? DIM_OPACITY : 1 }}
        transition={DIM}
      >
        <button type="button" className="bottom-tab is-active">首页</button>
        <span className="bottom-tab">市集</span>
        <span className="bottom-plus">
          <img src={iconPlus} alt="" />
        </span>
        <span className="bottom-tab">消息</span>
        <span className="bottom-tab">我</span>
      </motion.div>
      <div className="home-indicator">
        <span />
      </div>
    </div>
  )
}

/* ---------- 动效 1：Tab 水平分页（两页同步位移） ---------- */

function Pager({ index, onIndexChange, children, dimmed }) {
  const reduce = useReducedMotion()
  const count = children.length
  const x = useMotionValue(-index * PANE_W)
  const dragging = useRef(false)
  const dragControls = useDragControls()

  useEffect(() => {
    if (dragging.current) return
    const controls = animate(x, -index * PANE_W, reduce ? { duration: 0 } : TAB_SPRING)
    return () => controls.stop()
  }, [index, reduce, x])

  const settle = useCallback(
    (target) => animate(x, -target * PANE_W, reduce ? { duration: 0 } : TAB_SETTLE_SPRING),
    [reduce, x],
  )

  return (
    <motion.div
      className="pager"
      animate={{ opacity: dimmed ? DIM_OPACITY : 1 }}
      transition={DIM}
    >
      <motion.div
        className={`pager-track${reduce ? '' : ' is-draggable'}`}
        style={{ x, width: PANE_W * count }}
        drag={reduce ? false : 'x'}
        dragListener={false}
        dragControls={dragControls}
        onPointerDown={(e) => {
          // 排除「关注的人」、「关注的话题」以及次级 Tab 区域，避免横滑作者/话题卡片时误触整页切换
          if (e.target instanceof Element && e.target.closest('.following-row, .topics-strip, .sub-tab-row, .pane-top')) {
            return
          }
          dragControls.start(e)
        }}
        dragConstraints={{ left: -PANE_W * (count - 1), right: 0 }}
        dragElastic={0.16}
        dragMomentum={false}
        onDragStart={() => {
          dragging.current = true
        }}
        onDragEnd={(_, info) => {
          dragging.current = false
          const fling = Math.abs(info.velocity.x) > 450
          const passed = Math.abs(info.offset.x) > PANE_W * 0.3
          let next = index
          if (fling || passed) {
            next = info.offset.x < 0 ? Math.min(index + 1, count - 1) : Math.max(index - 1, 0)
          }
          if (next !== index) onIndexChange(next)
          else settle(index)
        }}
      >
        {children.map((child, i) => (
          <div className="pane" key={i} aria-hidden={i !== index} inert={i !== index}>
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ---------- 动效：次级 Tab 横滑分页（关注的人 / 关注的话题） ----------
   与顶部 Tab 同一套模式：子 Tab 条固定，下方内容整体横移；
   两页常驻挂载，各自保留滚动位置，切换不做卸载重建。 */

function SubPager({ index, children }) {
  const reduce = useReducedMotion()
  const count = children.length
  const x = useMotionValue(-index * PHONE_W)

  useEffect(() => {
    const controls = animate(x, -index * PHONE_W, reduce ? { duration: 0 } : SUBTAB_SPRING)
    return () => controls.stop()
  }, [index, reduce, x])

  return (
    <div className="sub-pager">
      <motion.div className="sub-pager-track" style={{ x, width: PHONE_W * count }}>
        {children}
      </motion.div>
    </div>
  )
}

/* ---------- 信息流（纯 DOM，动画期间零位移） ---------- */

function PostCard({ post, onOpen, dimmed, showDate, showTopic, clickablePostId }) {
  return (
    <button
      type="button"
      className="post-card"
      disabled={Boolean(clickablePostId && post.id !== clickablePostId)}
      onClick={(e) => onOpen(post, showDate, showTopic, e.currentTarget)}
    >
      <div className="post-image" style={{ aspectRatio: post.ratio }}>
        {post.image ? <img src={post.image} alt="" /> : <span className="post-image-placeholder" />}
      </div>
      <div className={`post-info${dimmed ? ' is-dimmed' : ''}`}>
        <PostInfoContent post={post} showDate={showDate} showTopic={showTopic} />
      </div>
    </button>
  )
}

function Feed({ columns, onOpen, dimmedId, showDate, showTopic, clickablePostId }) {
  return (
    <div className="feed-flow">
      {columns.map((column, i) => (
        <div key={i} className="feed-column">
          {column.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpen={onOpen}
              dimmed={dimmedId === post.id}
              showDate={showDate}
              showTopic={showTopic}
              clickablePostId={clickablePostId}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const SUB_TABS = ['关注的人', '关注的话题']

function FollowPage({
  followTab,
  onFollowTabChange,
  onOpenPost,
  onOpenTopic,
  dimmedId,
  followedIds,
}) {
  const index = Math.max(0, SUB_TABS.indexOf(followTab))
  const topicColumns = useMemo(() => {
    const seen = new Set()
    const notes = []
    topics.forEach((topic) => {
      if (!followedIds[topic.id]) return
      notesForFollow(topic).forEach((post) => {
        if (seen.has(post.id)) return
        seen.add(post.id)
        notes.push(post)
      })
    })
    return [notes.filter((_, i) => i % 2 === 0), notes.filter((_, i) => i % 2 === 1)]
  }, [followedIds])
  const noteCount = topicColumns[0].length + topicColumns[1].length
  return (
    <>
      {/* 子 Tab 条固定不位移，只有下方内容横滑 */}
      <div className="pane-top">
        <FollowSubTabs active={followTab} onSelect={onFollowTabChange} />
      </div>
      <SubPager index={index}>
        {/* 不可见的子页加 inert：不会被 Tab 聚焦、不会被误触 */}
        <div className="sub-pane" key="people" aria-hidden={index !== 0} inert={index !== 0}>
          <div className="pane-top">
            <FollowingRow />
          </div>
          <div className="page-scroll">
            <Feed columns={peopleColumns} onOpen={onOpenPost} dimmedId={dimmedId} showDate />
          </div>
        </div>
        <div className="sub-pane" key="topics" aria-hidden={index !== 1} inert={index !== 1}>
          <div className="pane-top">
            <TopicsStrip onOpenTopic={onOpenTopic} followedIds={followedIds} />
          </div>
          <div className="page-scroll">
            {noteCount ? (
              <Feed columns={topicColumns} onOpen={onOpenPost} dimmedId={dimmedId} showTopic />
            ) : (
              <p className="follow-empty">还没有关注的话题。打开一篇笔记，从社区入口就能关注。</p>
            )}
          </div>
        </div>
      </SubPager>
    </>
  )
}

function DiscoverPage({ onOpenPost, dimmedId }) {
  return (
    <>
      <div className="pane-top">
        <DiscoverTabs />
      </div>
      <div className="page-scroll">
        <Feed columns={homeColumns} onOpen={onOpenPost} dimmedId={dimmedId} clickablePostId="color-balance" />
      </div>
    </>
  )
}

/* ---------- 动效 2/3/4：三图层 FLIP ----------
   图层 A：白底外壳，卡片矩形 → 全屏（非等比，只是白底，无可见形变）
   图层 B：图片，卡片图矩形 → 落地页图矩形（纯等比缩放，零裁切）
   图层 C：卡片文字（标题/作者/点赞），叠在外壳之上原地淡出 / 末段淡入——
           外壳 t=0 就严丝合缝盖住整张卡片，文字若只在外壳下面淡，
           用户看到的就是被瞬间盖住 / 瞬间放出，没有任何过渡。
   三者同曲线同时长同步播放；收起即反向播放。信息流里的卡片是普通 DOM，全程零位移。 */

/* 文字层终点：与图片同比例放大，并贴在放大后图片的下沿。
   只有「图在上、文字在下」的卡片走这条轨迹；缩略图在左、文字在右的
   要闻行保持原地淡出（否则文字会被放大数倍并压到图上）。 */
function flightInfoEnd(from, to) {
  if (!from?.info || !from?.img || !to) return { x: 0, y: 0, scale: 1 }
  const { info, img } = from
  const gap = info.y - (img.y + img.h)
  if (gap < -1) return { x: 0, y: 0, scale: 1 }
  const scale = PHONE_W / img.w
  return {
    x: (info.x - img.x) * scale - info.x,
    y: to.y + to.h + gap * scale - info.y,
    scale,
  }
}

function Flight({ flight, onReady, onOpened, onClosed, layer = 0 }) {
  const reduce = useReducedMotion()
  const { post, from, to, phase } = flight
  const imageRef = useRef(null)
  const closing = phase === 'closing'
  const opening = phase === 'opening' || phase === 'open'
  const ready = Boolean(to)

  useLayoutEffect(() => {
    const image = imageRef.current
    let cancelled = false
    let frame1
    let frame2
    /* 先让静止图层实际绘制一帧，再启动 FLIP，避免飞行图片首帧闪空。 */
    const paint = () => {
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          if (!cancelled) onReady()
        })
      })
    }
    if (image?.decode) image.decode().catch(() => {}).then(paint)
    else if (image?.complete) paint()
    else {
      image?.addEventListener('load', paint, { once: true })
      image?.addEventListener('error', paint, { once: true })
    }
    return () => {
      cancelled = true
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      image?.removeEventListener('load', paint)
      image?.removeEventListener('error', paint)
    }
  }, [onReady, post.image])

  const shellFrom = {
    x: from.card.x,
    y: from.card.y,
    scaleX: from.card.w / PHONE_W,
    scaleY: from.card.h / PHONE_H,
    borderRadius: 4,
  }
  const shellTo = { x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: 0 }

  /* 图片：最终布局位置 (0, to.y)，尺寸 402 × to.h；起点用等比缩放对齐卡片里的图 */
  const picFrom = ready
    ? { x: from.img.x, y: from.img.y - to.y, scale: from.img.w / PHONE_W }
    : null
  const picTo = { x: 0, y: 0, scale: 1 }

  const transition = reduce ? { duration: 0 } : FLIGHT
  const infoEnd = flightInfoEnd(from, to)
  const infoTransition = reduce
    ? { duration: 0 }
    : {
        duration: FLIGHT.duration,
        ease: FLIGHT.ease,
        opacity: closing ? INFO_IN : INFO_OUT,
      }

  return (
    <>
      {(opening || closing) && (
        <motion.div
          className="flight-shell"
          style={{ transformOrigin: '0 0', zIndex: layer ? layer : undefined }}
          initial={shellFrom}
          animate={closing ? shellFrom : shellTo}
          transition={transition}
          onAnimationComplete={() => closing && onClosed()}
        />
      )}
      {ready && (
        <motion.div
          className="flight-picture"
          style={{
            transformOrigin: '0 0',
            /* 收起时详情页要留在上面淡出，飞行图必须比页面层（48/47）更高 */
            zIndex: closing ? 49 : layer ? layer + 1 : undefined,
            top: to.y,
            height: to.h,
            aspectRatio: post.ratio,
          }}
          initial={picFrom}
          animate={closing || !opening ? picFrom : picTo}
          transition={transition}
          onAnimationComplete={() => opening && onOpened()}
        >
          <img ref={imageRef} src={post.image} alt="" />
        </motion.div>
      )}
      {/* 图层 C：卡片文字。展开时先随图片放大、贴住图片下沿，随后淡出；
         收起时反向缩回卡片位置，末段再淡入——外壳落位的瞬间文字正好完全显形 */}
      {(opening || closing) && from.info && (
        <motion.div
          className="flight-info"
          style={{
            transformOrigin: '0 0',
            zIndex: closing ? 49 : undefined,
            left: from.info.x,
            top: from.info.y,
            width: from.info.w,
            height: from.info.h,
          }}
          initial={{
            x: closing ? infoEnd.x : 0,
            y: closing ? infoEnd.y : 0,
            scale: closing ? infoEnd.scale : 1,
            opacity: closing ? 0 : 1,
          }}
          animate={{
            x: closing ? 0 : infoEnd.x,
            y: closing ? 0 : infoEnd.y,
            scale: closing ? 1 : infoEnd.scale,
            opacity: closing ? 1 : 0,
          }}
          transition={infoTransition}
        >
          <PostInfoContent post={post} showDate={flight.showDate} showTopic={flight.showTopic} />
        </motion.div>
      )}
    </>
  )
}

/* ---------- 帖子详情（落地页） ---------- */

/* 数字口径：≥1 万按「x.x 万」显示，与小红书的社区人数写法一致 */
function formatCount(n) {
  return n >= 10000 ? `${(n / 10000).toFixed(1)} 万` : `${n}`
}

/* 笔记页的社区入口卡片：可点击进入对应社区。
   说明文案给出「AI 关联了多少篇」与「多少人关注」，替代原来的占位句；
   已关注的社区在末尾标注，避免用户点进去才发现已经关注过。 */
function GroupCard({ topic, followed, onOpen }) {
  if (!topic) return null
  const [badgeOpen, badgeClose] = bracketsFor(topic.bracket)
  return (
    <button type="button" className="group-card" onClick={() => onOpen(topic)}>
      <div
        className="group-icon"
        style={topic.from && topic.to ? { background: `linear-gradient(to bottom, ${topic.from}, ${topic.to})` } : null}
      >
        <span className="group-badge">
          <span className="group-brace">{badgeOpen}</span>
          <span className="group-name">
            <span>{topic.title}</span>
            {topic.subtitle ? <span>{topic.subtitle}</span> : null}
          </span>
          <span className="group-brace">{badgeClose}</span>
        </span>
      </div>
      <div className="group-info">
        <div className="group-header">
          <p className="group-title">{topic.title}{topic.subtitle ?? ''}</p>
          <span className="group-action">
            进入社区
            <img src={iconChevronSm} alt="" />
          </span>
        </div>
        <p className="group-desc">关联了 {topic.noteCount.toLocaleString()} 篇相关笔记</p>
        <p className="group-meta">
          {formatCount(topic.members)}人关注{followed ? ' · 已关注' : ''}
        </p>
      </div>
    </button>
  )
}

function StatsRow({ time, location }) {
  return (
    <div className="stats-row">
      <div className="stats-content">
        <span className="stats-metadata">
          <span>{time}</span>
          <span>{location}</span>
        </span>
        <span className="stats-action">
          <img src={iconDislike} alt="" />
          不喜欢
        </span>
      </div>
    </div>
  )
}

function CommentItem({ comment }) {
  return (
    <div className={`comment${comment.sub ? ' is-sub' : ''}`}>
      <Avatar className="comment-avatar" author={{ name: comment.user, color: commentColor(comment.user) }} />
      <div className="comment-info">
        <p className="comment-user">{comment.user}</p>
        <div className="comment-content">
          <p className="comment-text">{comment.text}</p>
          <div className="comment-actions">
            <span className="comment-action-left">
              <span className="comment-metadata">
                <span>{comment.time}</span>
                <span>{comment.location}</span>
              </span>
              <span className="comment-reply">回复</span>
            </span>
            <span className="comment-action-right">
              <span className="comment-like">
                <img src={iconCommentLike} alt="" />
                <span>{comment.likes}</span>
              </span>
              <img className="comment-more" src={iconMore} alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- 落地页内容块：与外壳同步缩放 ----------
   只动 scale（不动 opacity，透明度由 .post-page 统一渐显/渐隐）。
   缩放中心 = 卡片中心换算到本元素自身坐标系 → 内容看起来是从卡片里被放大出来的。
   曲线/时长与 FLIGHT 完全一致，收起即反向播放。图片由 .flight-picture 单独飞行，
   不参与本缩放，避免中途出现两张位置不一致的图。 */
function ZoomLayer({ center, scale, active, closing, settled, as = 'div', className, children }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [origin, setOrigin] = useState(null)
  const MotionTag = motion[as] ?? motion.div

  useLayoutEffect(() => {
    const el = ref.current
    const root = el?.closest('.post-page')
    if (!el || !root || !center) return
    const p = offsetWithin(el, root)
    setOrigin(`${center.x - p.x}px ${center.y - p.y}px`)
  }, [center])

  const s = reduce || !center ? 1 : scale

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ transformOrigin: origin ?? '50% 50%', willChange: settled ? 'auto' : 'transform' }}
      initial={{ scale: s }}
      animate={{ scale: closing || !active ? s : 1 }}
      transition={{ duration: reduce ? 0 : FLIGHT.duration, ease: FLIGHT.ease }}
    >
      {children}
    </MotionTag>
  )
}

function PostDetail({ post, phase, from, slide = false, lead = true, onMeasured, onSlideClosed, onBack, onOpenCommunity, followedIds, layer = 48, inert = false }) {
  const reduce = useReducedMotion()
  const pictureRef = useRef(null)
  const closing = phase === 'closing'
  const landed = phase === 'open'
  /* 飞行末段提前显形：只有详情页能压在白色外壳之上时才成立。
     社区页本身叠在帖子上时（topicFromPost），详情页还在它下面，等落位再淡入。 */
  const leadIn = lead && phase === 'opening'

  /* 这条笔记所属的社区（按 tag 反查）：用于社区入口卡片 */
  const community = useMemo(() => topicForPost(post), [post])

  useLayoutEffect(() => {
    if (pictureRef.current && onMeasured) onMeasured(localRect(pictureRef.current))
  }, [onMeasured])

  /* 内容缩放的起点与中心：来自被点击卡片的矩形（手机坐标系） */
  const card = from?.card
  const zoomCenter = useMemo(
    () => (card ? { x: card.x + card.w / 2, y: card.y + card.h / 2 } : null),
    [card],
  )
  const zoomScale = useMemo(() => {
    if (!card?.w) return 1
    return 1 - (1 - card.w / PHONE_W) * CONTENT_ZOOM_DAMP
  }, [card])

  /* 整页 UI：飞行期间保持透明（本来就被外壳盖住），末段提前从白色里淡入；
     收起时先渐隐（0.22s）；从 AI 推荐内容进入时改为整页从右向左推入 / 退回 */
  const pageFade = slide
    ? reduce
      ? {
          initial: false,
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 1, x: PHONE_W },
          animate: { opacity: 1, x: closing ? PHONE_W : 0 },
          transition: { duration: 0.3, ease: EASE_OUT_QUINT },
          onAnimationComplete: () => {
            if (closing && !reduce) onSlideClosed?.()
          },
        }
    : reduce
      ? {
          initial: false,
          animate: { opacity: closing ? 0 : landed ? 1 : 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0 },
          animate: { opacity: closing ? 0 : landed || leadIn ? 1 : 0 },
          transition: closing ? PAGE_FADE_OUT : landed ? PAGE_FADE_IN : leadIn ? PAGE_FADE_LEAD : { duration: 0 },
        }

  /* 减少动态：不做位移动画，直接关闭飞行帧 */
  useEffect(() => {
    if (slide && reduce && closing) onSlideClosed?.()
  }, [slide, reduce, closing, onSlideClosed])

  return (
    <motion.div
      className="post-page"
      {...pageFade}
      inert={inert}
      style={{
        pointerEvents: landed && !inert ? 'auto' : 'none',
        /* 提前显形期间要压在白壳（z=45）之上、飞行图片（z=46）之下。
           收起时保持在页面层，让详情页内容整体淡出；飞行图片与文字
           同步升到 49（仍低于状态栏 50），不会被打回外壳下面。 */
        zIndex: closing ? (slide ? layer - 4 : layer) : landed ? layer : leadIn ? 45 : layer - 4,
        willChange: slide ? 'transform' : 'opacity',
      }}
    >
      {/* 状态栏由全局统一提供（始终在最上层），这里只保留等高占位，保证头部仍在 y=62 */}
      <div className="post-status-space" aria-hidden="true" />
      <ZoomLayer
        className="post-header"
        center={zoomCenter}
        scale={zoomScale}
        active={phase !== 'arming' && phase !== 'ready'}
        closing={closing}
        settled={landed}
      >
        <div className="post-author">
          <button type="button" className="post-back" onClick={onBack} aria-label="返回">
            <img src={iconChevronLeft} alt="" />
          </button>
          <div className="post-author-info">
            <Avatar className="post-author-avatar" author={post.author} />
            <span className="post-author-name">{post.author.name}</span>
          </div>
        </div>
        <div className="post-header-actions">
          <button type="button" className="post-follow">关注</button>
          <span className="post-share">
            <img src={iconShare} alt="" />
          </span>
        </div>
      </ZoomLayer>

      <div className="page-scroll post-scroll">
        {/* 飞行期间只显示 .flight-picture；落地后在相同尺寸与裁切下直接交接给详情图。
            收起瞬间再交回飞行图片：详情图与飞行图此刻完全重合，页面图隐藏后
            淡出过程中不会留下一张不缩小的残影。 */}
        <motion.div
          ref={pictureRef}
          className="post-picture"
          style={{ aspectRatio: post.ratio }}
          initial={{ opacity: slide ? 1 : 0 }}
          animate={{ opacity: slide || (landed && !closing) ? 1 : 0 }}
          transition={{ duration: 0 }}
        >
          <img src={post.image} alt="" />
        </motion.div>

        <ZoomLayer
          className="post-zoom"
          center={zoomCenter}
          scale={zoomScale}
          active={phase !== 'arming' && phase !== 'ready'}
          closing={closing}
          settled={landed}
        >
          <div className="post-info-block">
            {/* 加粗标题 = 卡片上的那行黑色文字 */}
            <h1 className="post-heading">{post.title}</h1>
            {/* 正文只在这里出现，卡片上不显示 */}
            <div className="post-body">
              {post.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <p className="post-tag">{post.tag}</p>
          </div>
          <GroupCard
            topic={community}
            followed={Boolean(community && followedIds?.[community.id])}
            onOpen={onOpenCommunity}
          />
          <StatsRow time={post.time} location={post.location} />
          <div className="post-comments">
            {post.comments.map((comment, i) => (
              <CommentItem key={i} comment={comment} />
            ))}
          </div>
        </ZoomLayer>
      </div>

      <ZoomLayer
        as="footer"
        className="post-toolbar"
        center={zoomCenter}
        scale={zoomScale}
        active={phase !== 'arming' && phase !== 'ready'}
        closing={closing}
        settled={landed}
      >
        <div className="post-toolbar-row">
          <div className="post-input">
            <img src={iconEdit} alt="" />
            <span>说点什么...</span>
          </div>
          <div className="post-toolbar-actions">
            <span className="post-toolbar-action">
              <img src={iconHeartLg} alt="" />
              <span>{post.likes ?? '赞'}</span>
            </span>
            <span className="post-toolbar-action">
              <img src={iconStar} alt="" />
              <span>{post.stars ?? '收藏'}</span>
            </span>
            <span className="post-toolbar-action">
              <img src={iconComment} alt="" />
              <span>评论</span>
            </span>
          </div>
        </div>
        <div className="home-indicator">
          <span />
        </div>
      </ZoomLayer>
    </motion.div>
  )
}

/* ---------- 话题页 + 每日要闻（sheet 三档位） ----------
   结构：渐变背景 → 头部（话题名/简介/标签）→ 每日要闻层 → 笔记 sheet。
   sheet 三个档位（y = 相对设计稿态 top=350 的位移）：
     0     设计稿态 —— 要闻层只露出第一张卡片
     +437  下拖到底（top 787）—— 每日要闻完整展开
     -232  上拖到顶（top 118）—— 顶到顶部导航栏下方，笔记占满屏幕
   两种手势都能到达最上档：① 拖把手 / 工具栏；② 在笔记列表上滑（内容到顶后
   sheet 继续跟着上移，到顶后才开始滚内容）。全程只动 transform / 高度，无跳变。 */

function TopicPage({ topic, onBack, onOpenPost, onOpenSlidePost, dimmedId, dimmed, followed, onToggleFollow, onOpenNews, onExplore, onOpenAssistant, inactive, layer = 35 }) {
  const reduce = useReducedMotion()
  const dragControls = useDragControls()
  const [clamped, setClamped] = useState(true)
  const [activeTab, setActiveTab] = useState('全部')
  const hasBackContent = hasBackSections(topic)
  /* 每个话题自己的类型划分；切话题时若当前 Tab 不在新话题的划分里则回落到第一个 */
  const tabs = TOPIC_TABS[topic.id] ?? FALLBACK_TABS
  const currentTab = tabs.includes(activeTab) ? activeTab : tabs[0]
  const categoryChevron = topic.id === 'design-inspire' || topic.id === 'blender'

  const sheetY = useMotionValue(0)
  const featuredTitle = useTransform(sheetY, (v) => v > 1 ? '热门内容' : '点点推荐')
  const scrollRef = useRef(null)
  const newsRef = useRef(null)
  const directScrollRef = useRef(null)
  /* 本次 sheet 手势开始时后层列表的滚动位置；只在上拉收起时使用 */
  const sheetNewsSync = useRef(null)
  /* 把手拖动超过阈值后浏览器仍会补发 click，用它避免拖拽结束又被当成点击切档 */
  const sheetDragMoved = useRef(false)
  /* 要闻列表的滚动位置：用来把头部（社区名/简介/标签）一起带着上移 */
  const newsScroll = useMotionValue(0)
  const directScroll = useMotionValue(0)
  const newsScrollCoordinator = useMemo(
    () => createTopicSheetScrollCoordinator({
      elementRef: newsRef,
      scrollValue: newsScroll,
      animateValue: animate,
      reducedMotion: reduce,
      spring: TOPIC_SHEET_SPRING,
    }),
    [newsScroll, reduce],
  )

  /* sheet 位移实时驱动：后层内容裁切线固定在导航栏下沿(118)，滚动可一直升到导航栏；
     顶部留白随 sheet 收放：收起时 190px（首卡落在默认态 y=308），展开后 72px（y=190） */
  const newsPad = useTransform(sheetY, [0, TOPIC_SHEET_TRAVEL], [190, 72])
  const descFade = useTransform(sheetY, [0, 240], [1, 0])
  const newsViewH = useTransform(sheetY, (v) => Math.max(0, 350 + v - 118))
  /* 大标题与关注：要闻上滑或 sheet 上拉都先原地淡出，归零后导航标题才出现 */
  const headOpacity = useTransform([newsScroll, sheetY], ([s, y]) => {
    const byScroll = Math.min(1, Math.max(0, (TOPIC_HEAD_FADE[1] - s) / (TOPIC_HEAD_FADE[1] - TOPIC_HEAD_FADE[0])))
    const bySheet = Math.min(1, Math.max(0, (TOPIC_HEAD_SHEET_FADE[1] - y) / (TOPIC_HEAD_SHEET_FADE[1] - TOPIC_HEAD_SHEET_FADE[0])))
    return Math.min(byScroll, bySheet)
  })
  /* 头部整层不挡滚动，只有可见的按钮恢复命中 */
  const headHit = useTransform(headOpacity, (v) => (v > 0.01 ? 'auto' : 'none'))
  const descHit = useTransform([headOpacity, descFade], ([h, d]) => (h > 0.01 && d > 0.01 ? 'auto' : 'none'))
  const sheetHeight = useTransform(sheetY, (v) => TOPIC_SHEET_H - v)

  /* 顶部导航栏标题：有新闻时随 sheet/要闻滚动淡入；无新闻时随页面直接滚动淡入 */
  const navTitleFade = useTransform([sheetY, newsScroll], ([y, s]) => {
    const bySheet = Math.min(1, Math.max(0, (y - TOPIC_NAV_SHEET_FADE[0]) / (TOPIC_NAV_SHEET_FADE[1] - TOPIC_NAV_SHEET_FADE[0])))
    const byScroll = Math.min(1, Math.max(0, (s - TOPIC_NAV_FADE[0]) / (TOPIC_NAV_FADE[1] - TOPIC_NAV_FADE[0])))
    return Math.max(bySheet, byScroll)
  })
  const directTitleFade = useTransform(directScroll, [20, 80], [0, 1], { clamp: true })

  /* 后层内容滚动 → 同步到 MotionValue */
  useEffect(() => {
    const el = newsRef.current
    if (!el || !hasBackContent) return
    let pointerStart = null
    const onScroll = () => {
      if (!newsScrollCoordinator.isAnimating()) newsScroll.set(el.scrollTop)
    }
    const onPointerDown = (event) => {
      if (event.button !== 0) return
      pointerStart = { x: event.clientX, y: event.clientY }
      newsScrollCoordinator.cancel()
    }
    const onPointerMove = (event) => {
      if (!pointerStart) return
      const dx = event.clientX - pointerStart.x
      const dy = event.clientY - pointerStart.y
      if (Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx)) {
        newsScrollCoordinator.cancel(true)
        pointerStart = null
      }
    }
    const onPointerEnd = () => { pointerStart = null }
    const onWheel = () => newsScrollCoordinator.cancel(true)
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerEnd)
    window.addEventListener('pointercancel', onPointerEnd)
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
    }
  }, [hasBackContent, newsScroll, newsScrollCoordinator])

  useEffect(() => () => newsScrollCoordinator.cancel(), [newsScrollCoordinator])

  /* 无后层内容的页面滚动 → 同步 directScroll */
  useEffect(() => {
    const el = directScrollRef.current
    if (!el || hasBackContent) return
    const onScroll = () => directScroll.set(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [hasBackContent, directScroll])

  /* 记录展开态下后层列表的滚动位置，供上拉收起时同步回顶 / 弹回时复位 */
  const beginSheetNewsSync = useCallback(() => {
    const element = newsRef.current
    if (!element) {
      sheetNewsSync.current = null
      return
    }
    sheetNewsSync.current = element.scrollTop > 0
      ? { scroll: element.scrollTop, sheet: sheetY.get() }
      : null
    if (sheetNewsSync.current) newsScrollCoordinator.cancel(true)
  }, [newsScrollCoordinator, sheetY])

  /* sheet 上移的前 TOPIC_NEWS_RESET_LEAD 内把列表带回顶部：
     内容顶边始终跟着容器顶边走，不再被裁切 */
  const followSheetNews = useCallback(() => {
    const sync = sheetNewsSync.current
    const element = newsRef.current
    if (!sync || !element) return
    const moved = sync.sheet - sheetY.get()
    if (moved <= 0) return
    const progress = Math.min(1, moved / TOPIC_NEWS_RESET_LEAD)
    const next = sync.scroll * (1 - progress)
    if (Math.abs(element.scrollTop - next) >= 0.5) newsScrollCoordinator.set(next)
  }, [newsScrollCoordinator, sheetY])

  const applySheet = useCallback(
    (target) => {
      const sync = sheetNewsSync.current
      sheetNewsSync.current = null
      if (target === TOPIC_SHEET_TRAVEL && sync) newsScrollCoordinator.restore(sync.scroll)
      else newsScrollCoordinator.settle(target)
      return animate(sheetY, target, reduce ? { duration: 0 } : TOPIC_SHEET_SPRING)
    },
    [newsScrollCoordinator, reduce, sheetY],
  )

  const snapSheet = useCallback((start, velocity = 0) => {
    const slotOf = (v) =>
      v > 1 ? (v > TOPIC_SHEET_TRAVEL / 2 ? 2 : 1) : v < -1 ? (-v > -TOPIC_SHEET_UP / 2 ? 0 : 1) : 1
    let slot
    if (velocity < -300) slot = Math.max(0, slotOf(start) - 1)
    else if (velocity > 300) slot = Math.min(2, slotOf(start) + 1)
    else slot = slotOf(sheetY.get())
    applySheet([TOPIC_SHEET_UP, 0, TOPIC_SHEET_TRAVEL][slot])
  }, [applySheet, sheetY])

  const onSheetDrag = useCallback((_, info) => {
    if (Math.abs(info.offset.y) > 4) sheetDragMoved.current = true
    followSheetNews()
  }, [followSheetNews])

  const onSheetDragEnd = useCallback((_, info) => {
    snapSheet(sheetY.get() - info.offset.y, info.velocity.y)
  }, [snapSheet, sheetY])

  /* 在笔记列表上滑手势（仅在有要闻层时需要与 sheet 联动） */
  useEffect(() => {
    const el = scrollRef.current
    if (!el || reduce || !hasBackContent) return
    let dragging = false
    let mode = 'sheet'
    let startY = 0
    let startSheet = 0
    let startScroll = 0
    let lastY = 0
    let lastT = 0
    let velocity = 0
    let wheelStart = null
    let wheelTimer = null

    const begin = (clientY) => {
      newsScrollCoordinator.cancel()
      beginSheetNewsSync()
      dragging = true
      startY = clientY
      lastY = clientY
      lastT = performance.now()
      velocity = 0
      startSheet = sheetY.get()
      startScroll = el.scrollTop
      mode = null
    }

    const decide = (dy) => {
      if (startScroll > 0) return 'content'
      if (dy < 0) return startSheet > TOPIC_SHEET_UP ? 'sheet' : 'content'
      if (dy > 0) return startSheet < 0 ? 'sheet' : 'content'
      return 'content'
    }

    const move = (clientY) => {
      if (!dragging) return
      const now = performance.now()
      if (now > lastT) velocity = ((clientY - lastY) / (now - lastT)) * 1000
      lastY = clientY
      lastT = now
      const dy = clientY - startY
      if (!mode) {
        mode = decide(dy)
        if (mode === 'content') startScroll = el.scrollTop
      }
      if (mode === 'sheet') {
        const next = Math.min(TOPIC_SHEET_TRAVEL, Math.max(TOPIC_SHEET_UP, startSheet + dy))
        sheetY.set(next)
        followSheetNews()
        if ((next === TOPIC_SHEET_UP && dy < 0) || (next === TOPIC_SHEET_TRAVEL && dy > 0)) {
          mode = 'content'
          startY = clientY
          startScroll = el.scrollTop
        }
      } else {
        el.scrollTop = startScroll - dy
      }
    }

    const end = () => {
      if (!dragging) return
      dragging = false
      if (mode === 'sheet') snapSheet(startSheet, velocity)
      else sheetNewsSync.current = null
    }

    const flushWheel = () => {
      wheelTimer = null
      if (!wheelStart) return
      const net = wheelStart.y - sheetY.get()
      if (net > 30) applySheet(wheelStart.sheet > 1 ? 0 : TOPIC_SHEET_UP)
      else if (net < -30) applySheet(wheelStart.sheet < -1 ? 0 : TOPIC_SHEET_TRAVEL)
      else applySheet(wheelStart.sheet)
      wheelStart = null
    }

    const onWheel = (e) => {
      const y = sheetY.get()
      const atTop = el.scrollTop <= 0
      const up = e.deltaY > 0 && atTop && y > TOPIC_SHEET_UP
      const down = e.deltaY < 0 && atTop && y < 0
      if (!up && !down) {
        if (wheelStart) flushWheel()
        return
      }
      e.preventDefault()
      newsScrollCoordinator.cancel()
      if (!wheelStart) wheelStart = { y, sheet: y, synced: false }
      if (up && !wheelStart.synced) {
        beginSheetNewsSync()
        wheelStart.synced = true
      }
      sheetY.set(Math.min(TOPIC_SHEET_TRAVEL, Math.max(TOPIC_SHEET_UP, y - e.deltaY)))
      if (up) followSheetNews()
      if (wheelTimer) clearTimeout(wheelTimer)
      wheelTimer = setTimeout(flushWheel, 180)
    }

    const onPointerDown = (e) => begin(e.clientY)
    const onPointerMove = (e) => {
      if (!dragging) return
      e.preventDefault()
      move(e.clientY)
    }
    const onPointerUp = () => end()

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      if (wheelTimer) clearTimeout(wheelTimer)
    }
  }, [applySheet, beginSheetNewsSync, followSheetNews, hasBackContent, newsScrollCoordinator, reduce, sheetY, snapSheet])

  const pageFade = reduce
    ? { initial: false, animate: { opacity: 1, x: 0 }, exit: { opacity: 1, x: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 1, x: PHONE_W },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: PHONE_W },
        transition: { duration: 0.3, ease: EASE_OUT_QUINT },
      }

  const rawNotes = useMemo(() => notesForTopic(topic), [topic])
  const notes = useMemo(() => {
    if (currentTab === '全部') return rawNotes
    return rawNotes.filter(
      (n) => n.category === currentTab || n.kind === currentTab || n.contentType === currentTab,
    )
  }, [rawNotes, currentTab])

  const columns = useMemo(
    () => [notes.filter((_, i) => i % 2 === 0), notes.filter((_, i) => i % 2 === 1)],
    [notes],
  )

  return (
    <motion.div className="topic-page" {...pageFade} inert={inactive || dimmed} style={{ zIndex: layer }}>
      <div
        className="topic-bg"
        style={{
          background: `linear-gradient(180deg, ${topic.from} 0%, ${topic.to} 350px, ${topic.to} 100%)`,
        }}
      />
      <div className="topic-status-space" aria-hidden="true" />
      <motion.div
        className="topic-dimmable"
        animate={{ opacity: dimmed ? DIM_OPACITY : 1 }}
        transition={DIM}
      >
        <div className="topic-nav">
          <div className="topic-nav-left">
            <button type="button" className="post-back" onClick={onBack} aria-label="返回">
              <img src={iconChevronLeft} alt="" />
            </button>
            <motion.span
              className="topic-nav-title"
              style={{ opacity: hasBackContent ? navTitleFade : directTitleFade }}
              aria-hidden="true"
            >
              {bracketsFor(topic.bracket)[0]}
              {topic.title}
              {topic.subtitle ?? ''}
              {bracketsFor(topic.bracket)[1]}
            </motion.span>
          </div>
          <div className="topic-nav-actions">
            {onOpenAssistant && (
              <button
                type="button"
                className="topic-ai"
                onClick={() => onOpenAssistant()}
                aria-label={`问点点：${topic.title}${topic.subtitle ?? ''}`}
              >
                <img src={iconTabLeft} alt="" />
              </button>
            )}
          </div>
        </div>

        {hasBackContent ? (
          /* ---------- 前层笔记 + 后层内容索引 / 事件脉络 ---------- */
          <>
            <motion.header className="topic-head" style={{ opacity: headOpacity }}>
              <div className="topic-hero">
                <span className="topic-hero-title">
                  <span className="topic-hero-brace">{bracketsFor(topic.bracket)[0]}</span>
                  <span className="topic-hero-name">
                    <span>{topic.title}</span>
                    {topic.subtitle ? <span>{topic.subtitle}</span> : null}
                  </span>
                  <span className="topic-hero-brace">{bracketsFor(topic.bracket)[1]}</span>
                </span>
                <motion.button
                  type="button"
                  className={`topic-follow${followed ? ' is-followed' : ''}`}
                  aria-pressed={followed}
                  style={{ pointerEvents: headHit }}
                  onClick={() => onToggleFollow(topic)}
                >
                  {followed ? '已关注' : '关注'}
                </motion.button>
              </div>
              <motion.div className="topic-desc" style={{ opacity: descFade }}>
                <p className={clamped ? 'topic-desc-text is-clamped' : 'topic-desc-text'}>{topic.desc}</p>
                <motion.button
                  type="button"
                  className="topic-desc-toggle"
                  style={{ pointerEvents: descHit }}
                  onClick={() => setClamped((v) => !v)}
                >
                  {clamped ? '展开' : '收起'}
                </motion.button>
                <div className="topic-tags">
                  {topic.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.header>

            <motion.div
              className="topic-news page-scroll"
              ref={newsRef}
              style={{ paddingTop: newsPad, height: newsViewH }}
              onClick={() => sheetY.get() < TOPIC_SHEET_TRAVEL / 2 && applySheet(TOPIC_SHEET_TRAVEL)}
            >
              <TopicBackSections topic={topic} sheetY={sheetY} featuredTitle={featuredTitle} onOpenPost={onOpenPost} onOpenSlidePost={onOpenSlidePost} onOpenNews={onOpenNews} onExplore={onExplore} />
            </motion.div>

            <motion.div
              className="topic-sheet"
              style={{ y: sheetY, height: sheetHeight }}
              drag={reduce ? false : 'y'}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: TOPIC_SHEET_UP, bottom: TOPIC_SHEET_TRAVEL }}
              dragElastic={{ top: 0.03, bottom: 0.1 }}
              dragMomentum={false}
              onDragStart={beginSheetNewsSync}
              onDrag={onSheetDrag}
              onDragEnd={onSheetDragEnd}
            >
              <button
                type="button"
                className="topic-sheet-handle"
                aria-label={sheetY.get() < -1 ? '收起笔记' : sheetY.get() > TOPIC_SHEET_TRAVEL / 2 ? '收起后层内容' : '展开后层内容'}
                onPointerDown={(e) => {
                  sheetDragMoved.current = false
                  newsScrollCoordinator.cancel()
                  dragControls.start(e)
                }}
                onClick={(e) => {
                  /* 键盘触发（detail 0）没有拖拽补发的 click，永远按点击处理 */
                  if (e.detail !== 0 && sheetDragMoved.current) {
                    sheetDragMoved.current = false
                    return
                  }
                  const y = sheetY.get()
                  applySheet(y < -1 || y > TOPIC_SHEET_TRAVEL / 2 ? 0 : TOPIC_SHEET_TRAVEL)
                }}
              />
              <div className="topic-sheet-toolbar" onPointerDown={(e) => {
                sheetDragMoved.current = false
                newsScrollCoordinator.cancel()
                dragControls.start(e)
              }}>
                <span className="topic-sheet-title">笔记</span>
                <img className="topic-sheet-search" src={iconSearch} alt="" />
              </div>
              {topic.id !== 'event-watch' && topic.id !== 't3' && <div className="topic-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`topic-tab${currentTab === tab ? ' is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <span className="topic-tabs-fade" aria-hidden="true">
                  <img className={categoryChevron ? 'topic-tabs-chevron' : undefined} src={categoryChevron ? iconSearchChev : iconSearch} alt="" />
                </span>
              </div>}
              <div className="page-scroll topic-sheet-scroll" ref={scrollRef}>
                {notes.length > 0 ? (
                  <Feed columns={columns} onOpen={onOpenPost} dimmedId={dimmedId} />
                ) : (
                  <p className="topic-empty">
                    {currentTab !== '全部'
                      ? `暂未收录「${currentTab}」相关笔记，试试其他分类。`
                      : (topic.notesEmpty ?? '暂无可用的笔记')}
                  </p>
                )}
              </div>
            </motion.div>
          </>
        ) : (
          /* ---------- 无后层内容时使用直接滚动 ---------- */
          <div className="page-scroll topic-direct-scroll" ref={directScrollRef}>
            <header className="topic-head topic-head-direct">
              <div className="topic-hero">
                <span className="topic-hero-title">
                  <span className="topic-hero-brace">{bracketsFor(topic.bracket)[0]}</span>
                  <span className="topic-hero-name">
                    <span>{topic.title}</span>
                    {topic.subtitle ? <span>{topic.subtitle}</span> : null}
                  </span>
                  <span className="topic-hero-brace">{bracketsFor(topic.bracket)[1]}</span>
                </span>
                <button
                  type="button"
                  className={`topic-follow${followed ? ' is-followed' : ''}`}
                  aria-pressed={followed}
                  onClick={() => onToggleFollow(topic)}
                >
                  {followed ? '已关注' : '关注'}
                </button>
              </div>
              <div className="topic-desc">
                <p className={clamped ? 'topic-desc-text is-clamped' : 'topic-desc-text'}>{topic.desc}</p>
                <button type="button" className="topic-desc-toggle" onClick={() => setClamped((v) => !v)}>
                  {clamped ? '展开' : '收起'}
                </button>
                <div className="topic-tags">
                  {topic.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </header>

            <div className="topic-content-body">
              {/* 轻量筛选：与 sheet 内 Tab 同一套类型划分 */}
              <div className="topic-filter-row">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`topic-filter-btn${currentTab === tab ? ' is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="topic-feed-wrap">
                {notes.length > 0 ? (
                  <Feed columns={columns} onOpen={onOpenPost} dimmedId={dimmedId} />
                ) : (
                  <div className="topic-empty-card">
                    <p className="topic-empty-title">
                      {currentTab !== '全部' ? `暂无「${currentTab}」相关笔记` : (topic.notesEmpty ?? '暂未收录相关笔记')}
                    </p>
                    <p className="topic-empty-desc">
                      {topic.id === 'blender'
                        ? '围绕 Blender 的作品展示、制作过程与问答讨论均在此汇聚。为保持真实性，不挪用非真实素材，待相关分享补充。'
                        : '作品分享、制作过程与问答交流均可在本主题社区浏览与发起。'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ---------- 话题页后层内容（sheet 下滑后露出） ----------
   按话题类型区分（设计稿 46:3020 / 74:14296 / 79:14640 三种示例）：
   - 事件追踪 → 事件概述 + 附来源的时间线
   - Blender 实战 → 热门内容 + 知识库 + 学习路径
   - 设计灵感 → 热门内容 + 热门风格
   - 配色俱乐部 → 可切换色板与应用预览
   - 其余带要闻的话题 → 每日要闻（按日期分组） */
/* sheet 内分类 Tab：按话题绑定类型划分，与笔记的 category / kind 字段对应；
   没有专属划分的话题退回「全部 / 作品 / 经验 / 问答」（按 contentType 过滤） */
const TOPIC_TABS = {
  'design-inspire': ['全部', '视觉', '字体', '品牌', '动效', '组件', '配色', '图标'],
  blender: ['全部', '作品分享', '技巧分享', '新闻', '问题求助'],
  'event-watch': ['全部'],
  t3: ['全部'],
}
const FALLBACK_TABS = ['全部', '作品', '经验', '问答']
function hasBackSections(topic) {
  if (topic.type === 'event') return Boolean(topic.news?.length)
  if (topic.id === 'blender' || topic.id === 'design-inspire' || topic.id === 't3') return true
  return Boolean(topic.news?.length)
}

function BackSection({ title, children, motionTitle }) {
  return (
    <section className="topic-back-card">
      <div className="topic-back-head">
        {motionTitle
          ? <motion.span className="topic-back-title">{motionTitle}</motion.span>
          : <span className="topic-back-title">{title}</span>}
      </div>
      {children}
    </section>
  )
}

/* 热门内容条目：一条社区笔记（点击直接进帖子详情） */
function HotPostRow({ post, onOpen }) {
  return (
    <button
      type="button"
      className="topic-news-item"
      onClick={(e) => {
        e.stopPropagation()
        onOpen(post, false, false, e.currentTarget)
      }}
    >
      <span className="topic-news-thumb">
        {post.image ? <img src={post.image} alt="" loading="lazy" decoding="async" /> : null}
      </span>
      <span className="topic-news-content">
        <span className="topic-news-itemtitle">{post.title}</span>
        <span className="topic-news-itemdesc">{post.body?.[0]}</span>
        {post.author ? (
          <span className="post-meta topic-news-meta">
            <span className="post-user">
              <Avatar className="post-avatar" author={post.author} />
              <span className="post-username">{post.author.name}</span>
            </span>
            {post.likes ? (
              <span className="post-like">
                <img src={iconHeart} alt="" />
                <span>{post.likes}</span>
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
    </button>
  )
}

/* 「2026年10月15日」→ 月「2026年10月」 + 日「15」（去掉前导零）；不匹配时原样回退 */
function splitDate(date) {
  const m = /^(\d{4}年\d+月)(\d+)日$/.exec(date)
  return m ? [m[1], String(Number(m[2]))] : [date, '']
}

function TopicBackSections({ topic, sheetY, featuredTitle, onOpenPost, onOpenSlidePost, onOpenNews, onExplore }) {
  if (topic.id === 't3') {
    return (
      <div className="topic-back-stack">
        <BackSection title="配色灵感"><ColorClub /></BackSection>
      </div>
    )
  }

  if (topic.type === 'event' && topic.news?.length) {
    /* 收起态只露第一张卡：用「点点跟进」交代 AI 把这件事整理到哪一步，
       展开后才看到事件背景与时间线，和设计/Blender 的「点点推荐」保持同一套读法 */
    const nodeCount = topic.news.reduce((n, group) => n + group.items.length, 0)
    const latest = topic.news[0].date.replace(/^\d{4}年/, '').replace('月', ' 月 ').replace('日', ' 日')
    return (
      <div className="topic-back-stack">
        <BackSection title="点点跟进">
          <p className="topic-back-desc">已按时间整理 {nodeCount} 个节点，最近更新 {latest}；官方、企业、媒体都在这条线上，调查结论尚未公布。</p>
        </BackSection>
        <BackSection title="事件背景">
          <p className="topic-event-bg">{topic.desc}</p>
        </BackSection>
        <BackSection title="事件时间线">
          <div className="topic-timeline">
            {topic.news.map((group) => {
              const [month, day] = splitDate(group.date)
              return (
                <div className="topic-timeline-group" key={group.date}>
                  <div className="topic-timeline-date">
                    <span className="topic-timeline-month">{month}</span>
                    <span className="topic-timeline-day">{day}</span>
                  </div>
                  <div className="topic-timeline-items">
                    {group.items.map((item) => (
                      <NewsRow key={item.title} item={item} date={group.date} sheetY={sheetY} onOpen={onOpenNews} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </BackSection>
      </div>
    )
  }

  if (topic.id === 'blender') {
    return (
      <div className="topic-back-stack">
        <BackSection title="热门内容" motionTitle={featuredTitle}>
          <div className="topic-hot-list">
            {blenderFeaturedPosts.map((post) => (
              <HotPostRow key={post.id} post={post} onOpen={onOpenSlidePost} />
            ))}
          </div>
        </BackSection>
        <BackSection title="知识库">
          <p className="topic-back-desc">点进方向，可以直接看社区里的教程笔记和做出来的作品。</p>
          <div className="topic-knowledge topic-blender-knowledge" aria-label="Blender 知识分类">
            {blenderKnowledge.map((tile) => (
              <button type="button" className="topic-knowledge-tile" key={tile.id} onClick={e => { e.stopPropagation(); onExplore(tile) }}>
                <span className="topic-knowledge-icon iconfont" aria-hidden="true">{tile.icon}</span>
                <span className="topic-knowledge-label">{tile.title}</span>
              </button>
            ))}
          </div>
        </BackSection>
        <BackSection title="学习路径">
          <p className="topic-back-desc">从一个目标出发，按阶段看对应的社区笔记。</p>
          {blenderRoutes.map(route => (
            <button type="button" className="topic-insight-row" key={route.id} onClick={e => { e.stopPropagation(); onExplore(route) }}>
              <strong>{route.title}<img className="topic-insight-arrow" src={iconChevronSm} alt="" aria-hidden="true" /></strong>
              <span>{route.summary}</span>
            </button>
          ))}
        </BackSection>
      </div>
    )
  }

  if (topic.id === 'design-inspire') {
    return (
      <div className="topic-back-stack">
        <BackSection title="热门内容" motionTitle={featuredTitle}>
          <div className="topic-news-group">
            <div className="topic-hot-list">
              {designFeaturedPosts.map((post) => (
                <HotPostRow key={post.id} post={post} onOpen={onOpenSlidePost} />
              ))}
            </div>
          </div>
        </BackSection>
        <BackSection title="热门风格">
          <div className="topic-trend-grid topic-style-grid" aria-label="热门风格">
            {designStyles.map(style => <button type="button" className="topic-trend-tile" key={style.id} aria-label={style.title} onClick={e => { e.stopPropagation(); onExplore(style) }}>
              <span className="topic-trend-thumb"><img src={style.posts[0].image} alt="" loading="lazy" decoding="async" /></span>
              <span className="topic-trend-body"><span className="topic-trend-name">{style.title}</span><span className="topic-style-summary">{style.caption}</span></span>
            </button>)}
          </div>
        </BackSection>
      </div>
    )
  }

  if (topic.news?.length) {
    return (
      <div className="topic-back-stack">
        <BackSection title="每日要闻">
          <div className="topic-news-list">
            {topic.news.map((group) => (
              <section className="topic-news-group" key={group.date}>
                <div className="topic-news-datehead"><span>{group.date}</span></div>
                {group.items.map((item) => (
                  <NewsRow key={item.title} item={item} date={group.date} sheetY={sheetY} onOpen={onOpenNews} />
                ))}
              </section>
            ))}
          </div>
        </BackSection>
      </div>
    )
  }

  return null
}

/* 要闻缩略图：没有真实配图时用「分类图卡」（渐变底 + 分类词）。
   比灰色占位更像一张图，也让整列缩略图保持统一的视觉语言。 */
const NEWS_TILE = {
  模型: '#7d8cff',
  算力: '#48b6d8',
  监管: '#6d7a86',
  研究: '#8b7fd8',
  产品: '#4fb3ae',
  应用: '#5aa9e6',
  具身: '#6fae4a',
  行业: '#8a97a8',
}

/* 要闻条目：整条可点开详情页（类似帖子页）。
   收起态下点击仍交给外层——即先展开要闻；展开态点击才进入新闻详情。 */
function NewsRow({ item, date, sheetY, onOpen }) {
  const tileColor = NEWS_TILE[item.cat] ?? '#8a97a8'
  return (
    <button
      type="button"
      className="topic-news-item"
      onClick={(e) => {
        if (sheetY.get() < TOPIC_SHEET_TRAVEL / 2) return
        e.stopPropagation()
        onOpen({ item, date })
      }}
    >
      <span className="topic-news-thumb">
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <span
            className="news-tile"
            style={{ backgroundColor: tileColor }}
          >
            {item.cat ?? 'AI'}
          </span>
        )}
      </span>
      <span className="topic-news-content">
        <span className="topic-news-itemtitle">{item.title}</span>
        {item.sourceName && <span className="topic-ai-caption">{item.cat} · {item.sourceName}</span>}
        <span className="topic-news-itemdesc">{item.desc}</span>
      </span>
    </button>
  )
}

/* 新闻详情页：像帖子页一样介绍这条要闻——日期 + 标题 + 导语 + 正文段落，
   底部补一张来源笔记卡片（笔记由 newsSources.js 按要闻标题写死）。
   底色用首页那种浅灰（#fafafa），正文是一张白底卡片。 */
function NewsDetail({ news, topic, onBack, onOpenSource, dimmedId, layer = 40, inactive = false }) {
  const reduce = useReducedMotion()
  const { item, date } = news
  const pageFade = reduce
    ? {
        initial: false,
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 1, x: PHONE_W },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: PHONE_W },
        transition: { duration: 0.3, ease: EASE_OUT_QUINT },
      }
  const body = item.detail ?? []
  /* 来源笔记：按要闻标题取预先写好的那几条，不随机、不错位 */
  const sources = useMemo(() => sourcesForNews(item.title), [item.title])

  const sourceColumns = useMemo(
    () => [
      sources.filter((_, i) => i % 2 === 0),
      sources.filter((_, i) => i % 2 === 1),
    ],
    [sources],
  )
  return (
    <motion.div className="news-page" {...pageFade} style={{ zIndex: layer }} inert={inactive}>
      <div className="post-status-space" aria-hidden="true" />
      <div className="topic-nav">
        <div className="topic-nav-left">
          <button type="button" className="post-back" onClick={onBack} aria-label="返回">
            <img src={iconChevronLeft} alt="" />
          </button>
        </div>
        <div className="topic-nav-actions">
          <span className="post-share">
            <img src={iconShare} alt="" />
          </span>
        </div>
      </div>
      <div className="page-scroll news-scroll">
        <article className="news-article">
          <p className="news-meta">
            <span>{date}</span>
            {item.sourceName ? <span className="news-meta-source">· 来源 {item.sourceName}</span> : null}
          </p>
          <h1 className="news-title">{item.title}</h1>
          <p className="news-lead">{item.desc}</p>
          {body.length > 0 && (
            <div className="news-body">
              {body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </article>

        {/* 来源：这条要闻整理自社区里的这些笔记（保持与首页双列瀑布卡形态一致） */}
        {sources.length > 0 && (
        <section className="news-sources">
          <div className="news-sources-header">
            <p className="news-sources-title">来自笔记</p>
          </div>
          <div className="news-sources-flow">
            {sourceColumns.map((col, colIdx) => (
              <div key={colIdx} className="news-sources-column">
                {col.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    className="post-card news-source-waterfall-card"
                    onClick={(e) => onOpenSource(post, e.currentTarget)}
                  >
                    <div className="post-image" style={{ aspectRatio: post.ratio }}>
                      {post.image ? (
                        <img src={post.image} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span className="post-image-placeholder" />
                      )}
                    </div>
                    <div className={`post-info${dimmedId === post.id ? ' is-dimmed' : ''}`}>
                      <PostInfoContent post={post} />
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>
        )}
      </div>
    </motion.div>
  )
}

/* ---------- 根组件 ---------- */

/* ---------- 自定义鼠标光标 ----------
   默认：黑色圆形；悬浮可点击元素：变红 + 放大到 1.6 倍；
   落在深色 / 纯黑图片上：提亮为浅色，避免黑点与画面融为一体；
   放大/缩小共用同一组 spring（对称弹动），颜色用短 tween 避免弹簧过冲出色域。
   原生光标由 CSS（html,body,.stage*{cursor:none!important}）整体隐藏；触屏不渲染。 */
const CURSOR_CLICKABLE = 'button, a, [role="button"], input, label, .topic, .topic-news'
const CURSOR_BASE = '#111111'
const CURSOR_HOVER = '#FF0036'
const CURSOR_LIGHT = '#F2F2F2'
/* 相对亮度低于该值的图片区域视为深色（纯黑画面为 0） */
const CURSOR_DARK_LUMINANCE = 0.12
const CURSOR_SAMPLE_SIZE = 32
/* 弹簧：轻微欠阻尼 → 放大/回落都有一次可感知但不夸张的回弹 */
const CURSOR_SPRING = { type: 'spring', stiffness: 520, damping: 22, mass: 1 }
const CURSOR_COLOR_TWEEN = { duration: 0.18, ease: EASE_IN_OUT_CUBIC }

function CustomCursor() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [hover, setHover] = useState(false)
  const [light, setLight] = useState(false)
  const [shown, setShown] = useState(false)
  const lightRef = useRef(false)
  const sampleCache = useRef(new WeakMap())

  useEffect(() => {
    let lastHover = null
    let lastPoint = null

    /* 取图片在指针处的相对亮度：按 object-fit: cover 的裁切映射到 32×32 缩略图，
       每张图只画一次并缓存像素，指针移动时只读缓存 */
    const imageLuminance = (img, clientX, clientY) => {
      if (!img.complete || !img.naturalWidth) return null
      const rect = img.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return null
      const u = (clientX - rect.left) / rect.width
      const v = (clientY - rect.top) / rect.height
      if (u < 0 || u > 1 || v < 0 || v > 1) return null
      const src = img.currentSrc || img.src
      const aspect = rect.width / rect.height
      let entry = sampleCache.current.get(img)
      if (!entry || entry.src !== src || Math.abs(entry.aspect - aspect) > 0.02) {
        const canvas = document.createElement('canvas')
        canvas.width = CURSOR_SAMPLE_SIZE
        canvas.height = CURSOR_SAMPLE_SIZE
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        const scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight)
        const sw = rect.width / scale
        const sh = rect.height / scale
        let data = null
        try {
          ctx.drawImage(
            img,
            (img.naturalWidth - sw) / 2,
            (img.naturalHeight - sh) / 2,
            sw,
            sh,
            0,
            0,
            CURSOR_SAMPLE_SIZE,
            CURSOR_SAMPLE_SIZE,
          )
          data = ctx.getImageData(0, 0, CURSOR_SAMPLE_SIZE, CURSOR_SAMPLE_SIZE).data
        } catch {
          /* 跨域图片会污染画布：无法采样时退回默认黑色指针 */
        }
        entry = { src, aspect, data }
        sampleCache.current.set(img, entry)
      }
      if (!entry.data) return null
      const tx = Math.round(u * (CURSOR_SAMPLE_SIZE - 1))
      const ty = Math.round(v * (CURSOR_SAMPLE_SIZE - 1))
      let r = 0
      let g = 0
      let b = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const px = Math.min(CURSOR_SAMPLE_SIZE - 1, Math.max(0, tx + dx))
          const py = Math.min(CURSOR_SAMPLE_SIZE - 1, Math.max(0, ty + dy))
          const i = (py * CURSOR_SAMPLE_SIZE + px) * 4
          r += entry.data[i]
          g += entry.data[i + 1]
          b += entry.data[i + 2]
        }
      }
      r /= 9 * 255
      g /= 9 * 255
      b /= 9 * 255
      const linear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
      return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
    }

    /* 命中结果同时驱动「可点击变红」与「深色图片提亮」；
       elementFromPoint 实时命中：对动态挂载的页面同样生效 */
    const syncHit = (clientX, clientY) => {
      const el = document.elementFromPoint(clientX, clientY)
      const nextHover = Boolean(el?.closest?.(CURSOR_CLICKABLE))
      if (nextHover !== lastHover) {
        lastHover = nextHover
        setHover(nextHover)
      }
      const img = el?.closest?.('img')
      const luminance = img ? imageLuminance(img, clientX, clientY) : null
      const nextLight = luminance !== null && luminance < CURSOR_DARK_LUMINANCE
      if (nextLight !== lightRef.current) {
        lightRef.current = nextLight
        setLight(nextLight)
      }
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') return // 触屏无自定义光标
      x.set(e.clientX)
      y.set(e.clientY)
      setShown(true)
      lastPoint = { x: e.clientX, y: e.clientY }
      syncHit(e.clientX, e.clientY)
    }
    const onLeave = () => setShown(false)
    /* 内容在指针下滚过时也要重算亮度（否则图片滑到静止的指针下会判断错） */
    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame || !lastPoint) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        if (lastPoint) syncHit(lastPoint.x, lastPoint.y)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll, { capture: true })
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
    }
  }, [x, y])

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y }}
      initial={false}
      animate={{
        scale: hover ? 1.6 : 1,
        backgroundColor: hover ? CURSOR_HOVER : light ? CURSOR_LIGHT : CURSOR_BASE,
        opacity: shown ? 1 : 0,
      }}
      transition={
        reduce
          ? { duration: 0 }
          : { scale: CURSOR_SPRING, backgroundColor: CURSOR_COLOR_TWEEN, opacity: { duration: 0.15 } }
      }
    />
  )
}

const TAB_ORDER = ['关注', '发现']

/* 关注/取关的一次性反馈：绝对定位贴在底部导航之上，不参与任何布局计算。
   detail 只说明去哪里能找到它，不承诺页面里没有的新内容提示。 */
function FollowToast({ toast }) {
  const reduce = useReducedMotion()
  const offset = reduce ? 0 : 8
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          className="follow-toast"
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={reduce ? { duration: 0 } : FOLLOW_TOAST_MOTION}
        >
          <span className="follow-toast-title">{toast.title}</span>
          {toast.detail && <span className="follow-toast-detail">{toast.detail}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [tab, setTab] = useState('发现')
  const [followTab, setFollowTab] = useState('关注的人')
  const [postNavigation, dispatchPostNavigation] = useReducer(postNavigationReducer, initialPostNavigation)
  const { topic, flight, postStack, topicFromPost } = postNavigation
  const opening = useRef(false)
  const postFrameSequence = useRef(0)

  /* ---------- 关注状态（内存态，刷新即回到初始） ---------- */
  const [followMap, setFollowMap] = useState(() => {
    const init = {}
    topics.forEach((t) => {
      init[t.id] = { followed: Boolean(INITIAL_FOLLOW[t.id]?.followed) }
    })
    return init
  })
  const [toast, setToast] = useState(null)
  const [insights, setInsights] = useState([])
  const openInsight = useCallback(item => setInsights(previous => [...previous, item]), [])
  const [news, setNews] = useState(null) // { item, date } → 要闻详情页
  /* 「点点」AI 对话页：从首页进入时是通用对话；从话题页进入时带上当前话题。 */
  const [aiChatOpen, setAiChatOpen] = useState(
    () => new URLSearchParams(window.location.search).get('view') === 'ai',
  )
  const [aiChatContext, setAiChatContext] = useState(null)
  const topicAssistant = useMemo(() => buildTopicAssistant(topic), [topic])
  const openAssistant = useCallback((context = null) => {
    setAiChatContext(context)
    setAiChatOpen(true)
  }, [])
  const openTopicAssistant = useCallback(() => {
    if (topicAssistant) openAssistant(topicAssistant)
  }, [openAssistant, topicAssistant])

  /* 点点的回答里挂的入口：聊天页落下，社区里已有的知识/路径页推上来。
     入口本身就是社区结构，不是另一层导航，所以复用 openInsight。 */
  const openInsightFromChat = useCallback((link) => {
    if (!link?.target) return
    setAiChatOpen(false)
    openInsight(link.target)
  }, [openInsight])

  const toastTimer = useRef(null)

  const showToast = useCallback((title, detail) => {
    setToast({ id: Date.now(), title, detail })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), FOLLOW_TOAST_MS)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const followedIds = useMemo(
    () => Object.fromEntries(topics.map((t) => [t.id, followMap[t.id].followed])),
    [followMap],
  )

  useDragScroll()

  const openTopic = useCallback((next) => {
    if (!next || flight || opening.current) return
    setNews(null)
    setInsights([])
    dispatchPostNavigation({ type: 'open-topic', topic: next })
  }, [flight])

  /* 要闻条目 → 新闻详情页（记录条目本身与它所在的日期分组） */
  const openNews = useCallback((payload) => setNews(payload), [])

  const closeTopic = useCallback(() => {
    setNews(null)
    setInsights([])
    dispatchPostNavigation({ type: 'close-topic' })
  }, [])

  const toggleFollow = useCallback((t) => {
    const wasFollowed = followMap[t.id].followed
    setFollowMap((prev) => ({ ...prev, [t.id]: { followed: !wasFollowed } }))
    if (wasFollowed) showToast(`已取消关注「${t.title}${t.subtitle ?? ''}」`, null)
    else showToast(`已关注「${t.title}${t.subtitle ?? ''}」`, '可以在「关注 - 关注的话题」里找到它')
  }, [followMap, showToast])

  /* 只以「实际被点击的卡片」为飞行起点：页面里同一篇笔记可能在多个
     常驻挂载的列表里各有一份，按 id 反查会拿到背后隐藏的副本，
     导致动画从屏幕别处（常见为左上角）展开、与点击位置脱节。 */
  const openPost = useCallback(async (post, showDate, showTopic, sourceNode, preservePost = false) => {
    if (opening.current || (flight && !preservePost)) return // 快速连续点击：忽略后续
    opening.current = true
    const node = sourceNode
    const card = localRect(node)
    const img = localRect(node?.querySelector('.post-image, .topic-news-thumb, .insight-note-thumb'))
    const info = localRect(node?.querySelector('.post-info, .topic-news-content, .insight-note-copy'))
    if (!card || !img) {
      opening.current = false
      return
    }
    dispatchPostNavigation({
      type: 'open-post',
      preservePost,
      flight: { frameKey: `${post.id}:${++postFrameSequence.current}`, post, showDate, showTopic, sourceNode: node, from: { card, img, info }, to: null, phase: 'arming' },
    })
    await preloadImage(post.image)
    dispatchPostNavigation({ type: 'update-flight', update: (f) => {
      if (!f || f.phase !== 'arming') return f
      return { ...f, phase: 'ready' }
    } })
    opening.current = false
  }, [flight, postStack.length, topicFromPost])

  /* AI 推荐内容里的卡片 → 帖子详情：不测量卡片、不做 FLIP，
     整页从右向左推入；返回时整页向右退回。
     若话题本身是叠在某个帖子上打开的，仍沿用 preservePost 把原帖压入栈。 */
  const openPostSlide = useCallback((post) => {
    const preservePost = topicFromPost && flight?.phase === 'open'
    if (opening.current || (flight && !preservePost)) return
    dispatchPostNavigation({
      type: 'open-post',
      preservePost,
      flight: {
        frameKey: `${post.id}:${++postFrameSequence.current}`,
        post,
        showDate: false,
        showTopic: false,
        sourceNode: null,
        from: null,
        to: null,
        phase: 'open',
        slide: true,
      },
    })
  }, [flight, topicFromPost])

  const onMeasured = useCallback((to) => {
    dispatchPostNavigation({ type: 'update-flight', update: (f) => (f && !f.to ? { ...f, to } : f) })
  }, [])

  const onFlightReady = useCallback(() => {
    dispatchPostNavigation({ type: 'update-flight', update: (f) => (f && f.phase === 'ready' ? { ...f, phase: 'opening' } : f) })
  }, [])

  const onOpened = useCallback(() => {
    dispatchPostNavigation({ type: 'update-flight', update: (f) => (f && f.phase === 'opening' ? { ...f, phase: 'open' } : f) })
  }, [])

  const onClosed = useCallback(() => dispatchPostNavigation({ type: 'close-flight' }), [])

  const closePost = useCallback(() => {
    dispatchPostNavigation({ type: 'update-flight', update: (f) => {
      if (!f) return f
      if (f.slide) return f.phase === 'closing' ? f : { ...f, phase: 'closing' }
      const node = f.sourceNode
      if (node) {
        const scroller = node.closest('.page-scroll')
        if (scroller) {
          const n = node.getBoundingClientRect()
          const b = scroller.getBoundingClientRect()
          if (n.bottom < b.top || n.top > b.bottom) {
            const target = node.offsetTop - scroller.clientHeight / 2 + node.offsetHeight / 2
            scroller.scrollTo({ top: Math.max(0, target), behavior: 'auto' })
          }
        }
      }
      // 滚动后就地重测，保证收起点是卡片当前真实位置（文字层同理）
      const card = localRect(node)
      const img = localRect(node?.querySelector('.post-image, .topic-news-thumb'))
      const info = localRect(node?.querySelector('.post-info, .topic-news-content'))
      return {
        ...f,
        from: { card: card || f.from.card, img: img || f.from.img, info: info || f.from.info },
        phase: 'closing',
      }
    } })
  }, [])

  /* 社区作为帖子上层页面进入，帖子节点与滚动位置留在原处。 */
  const openCommunityFromPost = useCallback((nextTopic) => {
    if (!nextTopic || !flight || flight.phase !== 'open') return
    setNews(null)
    setInsights([])
    dispatchPostNavigation({ type: 'open-community', topic: nextTopic })
  }, [flight])

  const openPostFromTopic = useCallback((post, showDate, showTopic, node) => {
    openPost(post, showDate, showTopic, node, topicFromPost && flight?.phase === 'open')
  }, [flight, openPost, topicFromPost])

  /* 详情页里的来源笔记 → 原地打开笔记详情（直接用当前点击的卡片节点，放大与收起严格对齐原地，返回时保持在新闻页） */
  const openSourcePost = useCallback((post, node) => {
    openPost(post, false, false, node, topicFromPost && flight?.phase === 'open')
  }, [flight, openPost, topicFromPost])

  /* 展开/停留期间：其他元素变暗（status bar 与 home indicator 常驻不变） */
  /* 整页推入的帖子自身是不透明页，底层不需要跟着变暗 */
  const dimmed = Boolean(flight && !flight.slide && ['opening', 'open'].includes(flight.phase))
  const postCoversTopic = topicFromPost && (!flight || postStack.length === 0)
  const topicLayer = topicFromPost ? (postCoversTopic ? 49 : 46) : 35
  const dimmedId = flight && !flight.slide && ['opening', 'open'].includes(flight.phase) ? flight.post.id : null

  const panes = useMemo(
    () => [
      <FollowPage
        key="follow"
        followTab={followTab}
        onFollowTabChange={setFollowTab}
        onOpenPost={openPost}
        onOpenTopic={openTopic}
        dimmedId={dimmedId}
        followedIds={followedIds}
      />,
      <DiscoverPage key="discover" onOpenPost={openPost} dimmedId={dimmedId} />,
    ],
    [followTab, openPost, openTopic, dimmedId, followedIds],
  )

  return (
    <>
      <CustomCursor />
      <main className="stage">
      <div className="phone-slot">
        <section className="phone-screen" aria-label="手机画布">
          <div className="phone-ui">
            <StatusBar />
            <div className="home-status-bg" aria-hidden="true" />
            <motion.div
              className="top-tab-slot"
              animate={{ opacity: dimmed ? DIM_OPACITY : 1 }}
              transition={DIM}
            >
              <HomeTabBar active={tab} onSelect={setTab} onOpenAssistant={openAssistant} />
            </motion.div>
            <MotionConfig reducedMotion="user">
              <Pager
                index={TAB_ORDER.indexOf(tab)}
                onIndexChange={(i) => setTab(TAB_ORDER[i])}
                dimmed={dimmed}
              >
                {panes}
              </Pager>

              <AnimatePresence>
                {topic && (
                  <TopicPage
                    key={topic.id}
                    topic={topic}
                    onBack={closeTopic}
                    onOpenPost={topicFromPost ? openPostFromTopic : openPost}
                    onOpenSlidePost={openPostSlide}
                    dimmedId={dimmedId}
                    dimmed={(!topicFromPost && dimmed) || (topicFromPost && !postCoversTopic) || Boolean(news)}
                    layer={topicLayer}
                    followed={Boolean(followMap[topic.id]?.followed)}
                    onToggleFollow={toggleFollow}
                    onExplore={openInsight}
                    onOpenAssistant={topicAssistant ? openTopicAssistant : undefined}
                    inactive={insights.length > 0 || (Boolean(flight?.slide) && !postCoversTopic)}
                    onOpenNews={openNews}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {insights.length > 0 && <CommunityInsight item={insights[insights.length - 1]} onBack={() => setInsights(previous => previous.slice(0, -1))} onSelect={openInsight} onOpenPost={openSourcePost} onOpenAssistant={topicAssistant ? openTopicAssistant : undefined} inactive={Boolean(flight) && !postCoversTopic} layer={topicFromPost ? Math.min(49, topicLayer + 1) : 41} />}
              </AnimatePresence>

              <AnimatePresence>
                {news && topic && (
                  <NewsDetail
                    key="news"
                    news={news}
                    topic={topic}
                    onBack={() => setNews(null)}
                    onOpenSource={openSourcePost}
                    dimmedId={dimmedId}
                    layer={topicFromPost ? Math.min(49, topicLayer + 1) : 40}
                    inactive={Boolean(flight) && !postCoversTopic}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {flight && !flight.slide && flight.phase !== 'arming' && (flight.phase !== 'ready' || flight.to) && (
                  <Flight key="flight" flight={flight} onReady={onFlightReady} onOpened={onOpened} onClosed={onClosed} layer={postStack.length ? 45 : 0} />
                )}
              </AnimatePresence>

              {[...postStack, ...(flight ? [flight] : [])].map((frame, index, frames) => {
                const active = index === frames.length - 1 && frame === flight
                const interactive = active && !postCoversTopic
                return (
                  <PostDetail
                    key={frame.frameKey}
                    post={frame.post}
                    phase={active ? frame.phase : 'open'}
                    from={frame.from}
                    slide={Boolean(frame.slide)}
                    lead={!topicFromPost}
                    onMeasured={active && !frame.slide ? onMeasured : undefined}
                    onSlideClosed={active && frame.slide ? onClosed : undefined}
                    onBack={interactive ? closePost : () => {}}
                    onOpenCommunity={openCommunityFromPost}
                    followedIds={followedIds}
                    layer={active ? (postStack.length ? 47 : 48) : 40}
                    inert={!interactive}
                  />
                )
              })}
            </MotionConfig>
            <BottomNav dimmed={dimmed} />
            <AnimatePresence>
              {aiChatOpen && (
                <AiChat
                  key="ai-chat"
                  onClose={() => setAiChatOpen(false)}
                  context={aiChatContext}
                  onOpenSource={openPostSlide}
                  onOpenLink={openInsightFromChat}
                  layer={topic ? Math.min(49, Math.max(46, topicLayer + 1)) : 46}
                />
              )}
            </AnimatePresence>
            <div className="global-home-indicator">
              <span />
            </div>
            <FollowToast toast={toast} />
          </div>
        </section>
      </div>
      </main>
    </>
  )
}

/* ---------- 画布自适应缩放 ---------- */

const GUTTER_X = 24
const SAFE_Y_MAX = 200
const SAFE_Y_MIN = 48
const SAFE_Y_RATIO = 0.25
/* 安全距离上限再收紧到视口高度的 40%：极端矮窗口下也要保证「可用高度 ≥ 画布缩放后高度」，
   画布永远完整落入视口（不会溢出被裁、也不会产生滚动） */
const SAFE_Y_VIEWPORT_RATIO = 0.4
/* 可用高度下限：仅用于避免负值，不设高下限——矮窗口就让画布更小，而不是裁切 */
const MIN_AVAIL_H = 48

function useFitPhone() {
  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const safeY = Math.min(
        Math.max(SAFE_Y_MIN, Math.min(SAFE_Y_MAX, Math.round(vh * SAFE_Y_RATIO))),
        Math.round(vh * SAFE_Y_VIEWPORT_RATIO),
      )
      /* 不设最小缩放兜底：任何窗口高度都先保证画布完整落入视口，
         画布永不溢出 → 页面永不产生滚动 → 画布固定在屏幕中心 */
      const availH = Math.max(MIN_AVAIL_H, vh - safeY * 2)
      const scale = Math.min(1, (vw - GUTTER_X * 2) / FRAME_W, availH / FRAME_H)
      const root = document.documentElement
      root.style.setProperty('--phone-scale', String(scale))
      root.style.setProperty('--stage-safe', `${safeY}px`)
    }

    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])
}

/* ---------- 滚轮之外：鼠标按住拖动滚动 ----------
   挂在 document 统一处理：mousedown 命中 .page-scroll 即开始跟随，
   位移超过阈值才真正滚动，并抑制拖拽结束后误触的 click（避免拖完弹开卡片）。
   展开/落地页存在时，只响应落地页自身的滚动区（背后的信息流不响应）。
   原生图片拖拽（dragstart）一并拦截，配合 user-select:none 彻底禁选。 */
function useDragScroll() {
  useEffect(() => {
    const THRESHOLD = 5
    let scroller = null
    let axis = 'y'
    let startPos = 0
    let startScroll = 0
    let distance = 0
    let suppressClick = false

    const onMouseDown = (e) => {
      suppressClick = false
      if (e.button !== 0) return
      const page = document.querySelector('.post-page')

      // 先检查关注页的横向滚动行（关注的人 / 关注的话题）
      const hRow = e.target instanceof Element ? e.target.closest('.following-row, .topics-strip') : null
      if (hRow) {
        if (hRow.scrollWidth > hRow.clientWidth + 1) {
          scroller = hRow
          axis = 'x'
          startPos = e.clientX
          startScroll = hRow.scrollLeft
          distance = 0
        }
        return
      }

      const el = e.target instanceof Element ? e.target.closest('.page-scroll') : null
      const aiChatPage = e.target instanceof Element && e.target.closest('.ai-chat-page')
      /* 笔记 sheet 有自己的「上滑顶起 sheet / 到顶再滚内容」手势，这里不再接管 */
      if (e.target instanceof Element && e.target.closest('.topic-sheet')) return
      /* 点点是独立盖层，允许滚动自己的消息区；其他盖层仍只认落地页内部 */
      if (page && !aiChatPage && (!el || !page.contains(el))) return
      if (!el || el.scrollHeight <= el.clientHeight + 1) return
      scroller = el
      axis = 'y'
      startPos = e.clientY
      startScroll = el.scrollTop
      distance = 0
    }

    const onMouseMove = (e) => {
      if (!scroller) return
      const current = axis === 'x' ? e.clientX : e.clientY
      const delta = current - startPos
      if (distance === 0 && Math.abs(delta) > THRESHOLD) {
        distance = Math.abs(delta)
        scroller.classList.add('is-dragging')
        document.body.classList.add('is-drag-scrolling')
      }
      if (distance > 0) {
        if (axis === 'x') {
          scroller.scrollLeft = startScroll - delta
        } else {
          scroller.scrollTop = startScroll - delta
        }
        e.preventDefault() // 阻止拖拽途中产生文本选择
      }
    }

    const finish = () => {
      if (scroller) scroller.classList.remove('is-dragging')
      document.body.classList.remove('is-drag-scrolling')
      if (distance > THRESHOLD) suppressClick = true
      scroller = null
      distance = 0
    }

    const onClickCapture = (e) => {
      if (!suppressClick) return
      suppressClick = false
      e.preventDefault()
      e.stopPropagation()
    }

    const onWheel = (e) => {
      const target = e.target instanceof Element ? e.target : null

      // 横向滚动行：将垂直滚轮转换为横向滚动
      const row = target ? target.closest('.following-row, .topics-strip') : null
      if (row && row.scrollWidth > row.clientWidth + 1) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
          row.scrollLeft += e.deltaY
          e.preventDefault()
          return
        }
      }

      // 话题页 sheet 的滚动及手势由其自身监听器接管
      if (target && target.closest('.topic-sheet')) {
        return
      }

      // 手机画布内的纵向滚动区（信息流、新闻详情、笔记详情等），允许内部正常滚动
      const scrollable = target ? target.closest('.page-scroll') : null
      if (scrollable) {
        return
      }

      // 空白位置（或手机内不可滚动区域，如边框、状态栏、固定 Tab 栏、底部工具栏等）：
      // 彻底阻止默认滚轮事件，防止 macOS 浏览器触发视口橡皮筋弹性回弹，
      // 确保手机画布始终坚固地固定在屏幕正中，光标也不会随之上下颠簸。
      e.preventDefault()
    }

    const onTouchMove = (e) => {
      const target = e.target instanceof Element ? e.target : null
      const scrollable = target ? target.closest('.page-scroll, .following-row, .topics-strip, .topic-sheet') : null
      if (!scrollable) {
        e.preventDefault()
      }
    }

    const onScroll = () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0)
      }
    }

    const onDragStart = (e) => {
      /* 手机画布内禁止原生拖拽（图片/文本） */
      if (e.target instanceof Element && e.target.closest('.phone-ui')) e.preventDefault()
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', finish)
    window.addEventListener('blur', finish)
    document.addEventListener('click', onClickCapture, true)
    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('dragstart', onDragStart)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', finish)
      window.removeEventListener('blur', finish)
      document.removeEventListener('click', onClickCapture, true)
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('dragstart', onDragStart)
    }
  }, [])
}

function AppShell() {
  useFitPhone()
  return <App />
}

const root = createRoot(document.getElementById('root'))
root.render(<AppShell />)
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount())
