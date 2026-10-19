import { topicForPost } from './data/posts.js'
import iconHeart from './assets/icon-heart.svg'
import fallback1 from './assets/avatar-fallback-1.webp'
import fallback2 from './assets/avatar-fallback-2.webp'
import fallback3 from './assets/avatar-fallback-3.webp'
import fallback4 from './assets/avatar-fallback-4.webp'
import fallback5 from './assets/avatar-fallback-5.webp'
import fallback6 from './assets/avatar-fallback-6.webp'

const FALLBACK_AVATARS = [fallback1, fallback2, fallback3, fallback4, fallback5, fallback6]

/* 评论头像按用户名稳定取纯色，保证同一个人在各处颜色一致。
   色值与白字的对比度均 ≥ 4.5:1。 */
const COMMENT_COLORS = [
  '#3b6bc4', '#ad601a', '#2b8155', '#c43f66', '#737373', '#916807', '#2b77ad',
  '#6e4cb8', '#2b7d79', '#bb4a70', '#7f6a47', '#626f7c', '#4a7d2c', '#a35b27',
]

export function commentColor(name) {
  let hash = 0
  for (const ch of name ?? '') hash = (hash * 131 + ch.codePointAt(0)) >>> 0
  return COMMENT_COLORS[hash % COMMENT_COLORS.length]
}

const nameHash = (name) => {
  let hash = 0
  for (const ch of name ?? '') hash = (hash * 131 + ch.codePointAt(0)) >>> 0
  return hash
}

/* 头像：笔记作者优先用真实头像；数据缺失时按名字稳定取一张人物图兜底，
   不把「文字首字」用在笔记上。评论仍然用纯色 + 首字。 */
export function Avatar({ author, className, children }) {
  const name = author?.name ?? ''
  const isComment = Boolean(author?.color)
  const src = author?.avatar ?? (isComment ? null : FALLBACK_AVATARS[nameHash(name) % FALLBACK_AVATARS.length])
  const initial = [...name][0] ?? '?'
  const background = author?.color
    ? { backgroundColor: author.color }
    : { backgroundColor: '#ece9e4' }
  return (
    <span className={className} style={background}>
      {src ? (
        <img className="avatar-img" src={src} alt="" loading="lazy" decoding="async" />
      ) : (
        initial
      )}
      {children}
    </span>
  )
}

/* 卡片文字区内容：信息流卡片与飞行文字层共用同一份标记，
   保证展开/收起时文字层的文字与卡片原地文字完全一致。
   showDate：关注的人信息流在用户名下方带发帖日期（10px / 60% 黑 / 与名字间距 0）。
   showTopic：关注的话题信息流在名字下方带「来自 ××」（同一层级、同样式）。 */
export function PostInfoContent({ post, showDate, showTopic }) {
  const topic = showTopic ? topicForPost(post) : null
  return (
    <>
      <p className="post-title">{post.title}</p>
      <div className="post-meta">
        <span className="post-user">
          <Avatar className="post-avatar" author={post.author} />
          <span className="post-user-text">
            <span className="post-username">{post.author.name}</span>
            {showDate && <span className="post-date">{post.time}</span>}
            {topic && (
              <span className="post-topic">
                来自 {topic.title}
                {topic.subtitle ?? ''}
              </span>
            )}
          </span>
        </span>
        {post.likes && (
          <span className="post-like">
            <img src={iconHeart} alt="" />
            <span>{post.likes}</span>
          </span>
        )}
      </div>
    </>
  )
}

