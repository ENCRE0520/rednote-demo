import imageTube from '../assets/bl-research-tube.webp'
import imageGrade from '../assets/bl-research-grade.webp'
import imageAi from '../assets/bl-research-ai.webp'
import imageEyes from '../assets/bl-research-eyes.webp'
import imageBake from '../assets/bl-research-bake.webp'
import imageSticker from '../assets/bl-research-sticker.webp'
import imageEevee from '../assets/bl-research-eevee.webp'
import imageLight from '../assets/bl-research-light.webp'
import imageGrease from '../assets/bl-research-grease.webp'
import avatarCgcookie from '../assets/avatar-bl-research-cgcookie.webp'
import avatarCartesian from '../assets/avatar-bl-research-cartesian.webp'
import avatarCgboost from '../assets/avatar-bl-research-cgboost.webp'
import avatarSlavo from '../assets/avatar-bl-research-slavo.webp'
import avatarRon from '../assets/avatar-bl-research-ron.webp'

const authors = {
  cgcookie: { name: 'CG COOKIE', handle: '@cgcookie', avatar: avatarCgcookie },
  cartesian: { name: 'Cartesian Caramel', handle: '@Cartesian_C', avatar: avatarCartesian },
  cgboost: { name: 'CG Boost', handle: '@cgboost', avatar: avatarCgboost },
  slavo: { name: 'SLAVO', handle: '@slavoartist', avatar: avatarSlavo },
  ron: { name: 'Ron', handle: '@ronedgecomb', avatar: avatarRon },
}

/* 演示评论：用户与内容均为虚构，围绕原帖内容编写。 */
const c = (user, text, time, location, likes) => ({ user, text, time, location, likes })

const demoComments = {
  'bl-research-tube': [
    c('机械臂', '分节弯曲的节奏很顺，动画看着很舒服', '03-27', '上海', '14'),
    c('节点控', '管节变形是跟着曲线做的吗？', '03-27', '深圳', '6'),
  ],
  'bl-research-grade': [
    c('调色台', '从示波器讲到色轮，思路很清楚', '04-22', '北京', '19'),
    c('阿岚', 'Power Grade 插件用起来重吗？', '04-22', '杭州', '5'),
  ],
  'bl-research-ai': [
    c('AI 建模', '用 MCP 驱动 Blender 这个流程挺有意思', '09-24', '上海', '23'),
    c('小周', '甜甜圈最后是 Cycles 渲染的吗？质感不错', '09-24', '成都', '7'),
  ],
  'bl-research-eyes': [
    c('建模笔记', '挤出后和原表面衔接这一点很容易忽略', '01-21', '广州', '12'),
    c('阿目', '眼部布线有更细的讲解吗？', '01-21', '北京', '4'),
  ],
  'bl-research-bake': [
    c('烘焙日常', '复杂节点烘焙成贴图，实际项目里很省时间', '05-08', '深圳', '17'),
    c('贴图工', '烘焙分辨率一般开到多少？', '05-08', '上海', '5'),
  ],
  'bl-research-sticker': [
    c('贴纸控', '用着色器做贴纸，细节比想象中丰富', '09-02', '杭州', '15'),
    c('小北', '不同贴纸方案的区别能再展开讲讲吗？', '09-02', '成都', '6'),
  ],
  'bl-research-eevee': [
    c('渲染观察', '开发版和正式版可能会有差别，这个提醒很重要', '04-19', '北京', '21'),
    c('光线追踪', '这几组场景的漏光对比很明显', '04-19', '上海', '7'),
  ],
  'bl-research-light': [
    c('灯光练习', '三点布光讲得很直接，照着摆就能用', '07-21', '深圳', '18'),
    c('阿光', '背景那盏灯需要单独控吗？', '07-21', '杭州', '5'),
  ],
  'bl-research-grease': [
    c('二维三维', 'Grease Pencil 放进三维场景这个思路很好', '02-11', '上海', '13'),
    c('手绘动画', '时间线以外的用法还能再举几个例子吗？', '02-11', '北京', '4'),
  ],
}

// 2026-10-18 核对 X 原帖；正文只概述原帖，不补写未验证的教程步骤。
export const blenderResearchPosts = [
  {
    id: 'bl-research-tube', image: imageTube, ratio: '720 / 720',
    title: "软管机械臂测试，用几何节点做出分节弯曲",
    author: authors.cartesian,
    body: ["软管机械臂动画测试：用 Blender 几何节点做分节弯曲，管节会跟着动作一起变形。", "完整效果在视频里。"],
    category: "几何节点", topics: ["几何节点", "动画"], kind: "作品分享",
    time: '03-26', publishedAt: '2026-03-25', tag: "#几何节点",
    source: { post: 'https://x.com/Cartesian_C/status/2036836455687848091' }, mediaNote: "原帖视频封面",
  },
  {
    id: 'bl-research-grade', image: imageGrade, ratio: '1200 / 675',
    title: "Blender 渲染后调色，从示波器一路讲到色轮和曲线",
    author: authors.slavo,
    body: ["这段 Blender 调色教程从示波器、色轮讲到 RGB 曲线和色相校正。", "演示用 Power Grade 插件处理渲染后的颜色和画面氛围。"],
    category: "渲染", topics: ["渲染"], kind: "技巧分享",
    time: '04-21', publishedAt: '2026-04-20', tag: "#渲染",
    source: { post: 'https://x.com/slavoartist/status/2046274704466464909' }, mediaNote: "原帖视频封面",
    conditions: "Power Grade 插件",
  },
  {
    id: 'bl-research-ai', image: imageAi, ratio: '1200 / 675',
    title: "这次用 Claude 和 Blender MCP 搭了套甜甜圈场景",
    author: authors.ron,
    body: ["这次用 Blender MCP 驱动 Blender 5.2，跟着甜甜圈教程搭场景，最后用 Cycles 渲染。", "把 AI 辅助建模的过程和最终画面放在一起了。"],
    category: "建模", topics: ["建模", "渲染"], kind: "AI 工作流",
    time: '09-23', publishedAt: '2026-09-23', tag: "#建模",
    source: { post: 'https://x.com/ronedgecomb/status/2102774360003998037' }, mediaNote: "原帖配图",
    conditions: "Blender 5.2",
  },
  {
    id: 'bl-research-eyes', image: imageEyes, ratio: '675 / 1200',
    title: "做眼部挤出时，留意模型表面的衔接",
    author: authors.cgcookie,
    body: ["EYES 课程里的眼部建模片段，重点是挤出后怎样和原来的表面接上。", "封面是 Blender 里的眼部模型。"],
    category: "建模", topics: ["建模"], kind: "技巧分享",
    time: '01-20', publishedAt: '2026-01-19', tag: "#建模",
    source: { post: 'https://x.com/cgcookie/status/2013312500285034600' }, mediaNote: "原帖视频封面",
  },
  {
    id: 'bl-research-bake', image: imageBake, ratio: '675 / 1200',
    title: "复杂的 Shader Nodes 效果，也能烘焙成贴图",
    author: authors.cgboost,
    body: ["把复杂的 Shader Nodes 效果烘焙成纹理贴图。", "这段内容来自 Blender 角色制作课程。"],
    category: "材质", topics: ["材质"], kind: "技巧分享",
    time: '05-07', publishedAt: '2026-05-07', tag: "#材质",
    source: { post: 'https://x.com/cgboost/status/2052331138480312727' }, mediaNote: "原帖视频封面",
  },
  {
    id: 'bl-research-sticker', image: imageSticker, ratio: '720 / 720',
    title: "Robot Planet 里的机器人贴纸，是用着色器做的",
    author: authors.cgboost,
    body: ["Robot Planet 课程里的机器人贴纸用了着色器，不同贴纸方案能带来明显的细节变化。", "视频封面就是这个机器人模型。"],
    category: "材质", topics: ["材质"], kind: "作品分享",
    time: '09-01', publishedAt: '2026-09-01', tag: "#材质",
    source: { post: 'https://x.com/cgboost/status/2094706277221863695' }, mediaNote: "原帖视频封面",
  },
  {
    id: 'bl-research-eevee', image: imageEevee, ratio: '720 / 720',
    title: "Blender 5.2 开发版里，Eevee 漏光有改善吗",
    author: authors.cartesian,
    body: ["用几组场景对比 Eevee 快速全局光照的变化，重点看漏光问题。", "这是 Blender 5.2 开发阶段的测试，和正式版表现可能不同。"],
    category: "灯光", topics: ["灯光", "渲染"], kind: "技巧分享",
    time: '04-18', publishedAt: '2026-04-17', tag: "#灯光",
    source: { post: 'https://x.com/Cartesian_C/status/2045182133182804064' }, mediaNote: "原帖视频封面",
    conditions: "Blender 5.2 开发版",
  },
  {
    id: 'bl-research-light', image: imageLight, ratio: '675 / 1200',
    title: "三点布光怎么摆，才能把模型交代清楚",
    author: authors.cgboost,
    body: ["三点布光教程：用 Blender 设置三盏灯，把 3D 模型的形体照清楚。", "封面是教程视频画面。"],
    category: "灯光", topics: ["灯光"], kind: "技巧分享",
    time: '07-20', publishedAt: '2026-07-20', tag: "#灯光",
    source: { post: 'https://x.com/cgboost/status/2079214771237245306' }, mediaNote: "原帖视频封面",
  },
  {
    id: 'bl-research-grease', image: imageGrease, ratio: '1200 / 675',
    title: "Grease Pencil 不只画画，也能放进三维场景做动画",
    author: authors.cgcookie,
    body: ["Grease Pencil 入门内容：在三维空间里绘画、做动画和搭场景。", "除了时间线动画，也可以用它试试另一种制作方式。"],
    category: "动画", topics: ["动画"], kind: "技巧分享",
    time: '02-10', publishedAt: '2026-02-10', tag: "#动画",
    source: { post: 'https://x.com/cgcookie/status/2021187846766252075' }, mediaNote: "原帖视频封面",
  },
].map(post => ({ contentType: '经验', location: '', likes: null, stars: null, ...post, comments: demoComments[post.id] ?? [] }))

// 「热门内容」：近一年发布、同一作者最多一条，作品 / 技巧 / AI 工作流各一条。
// 原型没有实时互动数据，这里写死选好的 3 条；接入真实数据后按收藏、评论、点赞重算。
export const blenderFeaturedPosts = blenderResearchPosts.slice(0, 3)
