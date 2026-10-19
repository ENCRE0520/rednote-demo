import halftonePoster from '../assets/style-v2-halftone-poster.webp'
import halftoneDepth from '../assets/style-v2-halftone-depth.webp'
import asciiInterface from '../assets/style-v2-ascii-interface.webp'
import asciiShader from '../assets/style-v2-ascii-shader.webp'
import softWordmark from '../assets/style-v2-soft-wordmark.webp'
import softPalette from '../assets/style-v2-soft-palette.webp'
import arcWorld from '../assets/style-v2-arc-world.webp'
import arcIdentity from '../assets/style-v2-arc-identity.webp'
import avatarNexGrid from '../assets/avatar-style-v2-halftone-poster.webp'
import avatarSagar from '../assets/avatar-style-v2-halftone-depth.webp'
import avatarUiStudio from '../assets/avatar-style-v2-ascii-interface.webp'
import avatarAbdullah from '../assets/avatar-style-v2-ascii-shader.webp'
import avatarTypeLabo from '../assets/avatar-style-v2-soft-wordmark.webp'
import avatarTahir from '../assets/avatar-style-v2-tahir.webp'
import avatarArc from '../assets/avatar-style-v2-arc.webp'

// 图片与署名按公开原帖核对；完整出处见 .workbuddy/research/design-styles-v2-2026/。
export const designStylePosts = [
  {
    id: 'style-halftone-poster', publishedAt: '2026-10-16', image: halftonePoster, ratio: '1200 / 800',
    title: '这层半调网点，很适合拿来做海报',
    author: { name: 'NexGridCo', handle: '@nexgridco', avatar: avatarNexGrid },
    body: ['最近很喜欢这种带磨损感的半调纹理。网点有疏有密，深浅交界也没有切得太干净，叠在照片或大色块上就有旧印刷品的感觉。', '做海报时可以让纹理集中在背景和画面边缘，标题附近留出干净的位置。想要的是粗粝的质感，信息还是得一眼看清。'],
    tag: '#半调图像', category: '视觉', time: '10-16',
    source: { post: 'https://x.com/nexgridco/status/2111208060702093365' },
  },
  {
    id: 'style-halftone-depth', publishedAt: '2026-10-17', image: halftoneDepth, ratio: '1200 / 464',
    title: '只给背景加网点，主体反而更突出了',
    author: { name: 'Sagar Tanur', handle: '@Sagarvd01', avatar: avatarSagar },
    body: ['这次在 Layerize 里把狮子的照片按前后景拆开，只把背景转成漫画网点，主体继续保留照片细节。对比放在一起，层次一下就出来了。', '很适合试在封面和海报上。网点不一定要铺满整张图，让它负责拉开前后景就够了。'],
    tag: '#半调图像', category: '视觉', time: '10-17',
    source: { post: 'https://x.com/Sagarvd01/status/2111519254684348743' },
  },
  {
    id: 'style-ascii-shader', publishedAt: '2026-02-15', image: asciiShader, ratio: '1200 / 675',
    title: 'ASCII 选对字符，轮廓真的会清楚很多',
    author: { name: 'abdullah', handle: '@verse_', avatar: avatarAbdullah },
    body: ['左边是普通 ASCII 渲染，右边会根据图像的形状选择字符。仔细看边缘，右边的符号方向更贴合轮廓，细节也更容易辨认。', '这个版本改自 Alex Harri 的方法，用 WebGPU 计算并比较形状向量。做字符图像时，除了明暗，还可以让字符本身的形状参与匹配。'],
    tag: '#ASCII设计', category: '视觉', time: '02-15', mediaNote: '原帖视频封面',
    source: { post: 'https://x.com/verse_/status/2022823327748812911' },
  },
  {
    id: 'style-ascii-interface', publishedAt: '2026-10-14', image: asciiInterface, ratio: '1449 / 2048',
    title: '把 ASCII 留在背景里，界面也能很好读',
    author: { name: 'UI Design Studio', handle: '@uidesign_studio', avatar: avatarUiStudio },
    body: ['存一个 Branch 的仓库选择界面，设计来自 Studio Bakers。模糊的蓝橙背景里藏了一层 ASCII 字符，前面只放两张很大的仓库卡片。', '我喜欢它的分工：字符负责气氛，卡片负责选择。想给开发者工具加一点实验感，可以参考这种做法，标签和操作按钮仍然用正常文字。'],
    tag: '#ASCII设计', category: '组件', time: '10-14',
    source: { post: 'https://x.com/uidesign_studio/status/2110309885258936517' },
  },
  {
    id: 'style-soft-wordmark', publishedAt: '2025-12-31', image: softWordmark, ratio: '736 / 735',
    title: '字标像水波一样化开了',
    author: { name: 'Type Labo', handle: '@typelabo', avatar: avatarTypeLabo },
    body: ['很喜欢这张 WILD 字标：上半截还能读出字母，往下就慢慢变成流动的波纹。紫蓝渐变落在浅粉背景上，再加一点颗粒，整个画面很柔和。', '想做音乐封面或情绪海报时，这种流动字形比单纯叠一个渐变更有记忆点。要传达的字不多，才有空间让它慢慢展开。'],
    tag: '#柔性美学', category: '字体', time: '12-31',
    source: { post: 'https://x.com/typelabo/status/2006154654808248634' },
  },
  {
    id: 'style-soft-palette', publishedAt: '2026-02-20', image: softPalette, ratio: '675 / 1200',
    title: '存一组有春天气息的柔和配色',
    author: { name: 'Type Labo', handle: '@typelabo', avatar: avatarTypeLabo },
    body: ['奶油黄、嫩绿、珊瑚色和雾紫放在一起，还挺舒服的。几何形状很简单，靠轻微的渐变和颗粒把边界软化，画面就有了温度。', '想用在生活方式品牌、活动物料或者插画背景里。大面积颜色可以轻一点，正文和按钮还是要留足对比，别一起变得看不清。'],
    tag: '#柔性美学', category: '配色', time: '02-20',
    source: { post: 'https://x.com/typelabo/status/2024855183935578342' },
  },
  {
    id: 'style-arc-world', publishedAt: null, image: arcWorld, ratio: '1920 / 1080',
    title: 'ARC Raiders 早期概念里的巨大遗迹',
    author: { name: 'Tahir Tanis', handle: 'ArtStation', avatar: avatarTahir },
    body: ['ARC Raiders 在 2019–2020 年的一组早期世界探索。废弃的巨型建筑、电缆和旧设施占据了画面，人被放得很小，尺度感也就立住了。', '那时探索的方向包括粗野主义建筑、被自然重新占据的人造空间，以及历史层层堆叠的环境。这些是早期概念，不等同于现在的实机地图。'],
    tag: '#磁带未来主义', category: '视觉', time: '早期概念', conditions: '2019–2020 年早期概念',
    source: { post: 'https://tahirtanis.artstation.com/projects/OvrgXg' },
  },
  {
    id: 'style-arc-identity', publishedAt: '2026-10-16', image: arcIdentity, ratio: '1200 / 675',
    title: '旧未来的感觉，藏在这些条纹和设备里',
    author: { name: 'ARC Raiders', handle: '@ARCRaidersGame', avatar: avatarArc },
    body: ['存一张 ARC Raiders 的官方视觉。偏米白的字标、几道鲜艳条纹，加上厚重的设备和拼接服装，很像过去的人想象中的未来。', '这张图原本用于 PvE 测试公告，这里更想看它的视觉组合：规整的标识系统配上有使用痕迹的物件。做科技主题海报时，可以从这种反差里找一点方向。'],
    tag: '#磁带未来主义', category: '品牌', time: '10-16',
    source: { post: 'https://x.com/ARCRaidersGame/status/2111079720435765667' },
  },
].map(post => ({ contentType: '作品', location: '', likes: null, stars: null, comments: [], mediaNote: '原帖配图', ...post }))

const postById = new Map(designStylePosts.map(post => [post.id, post]))

export const designStyles = [
  {
    id: 'halftone', title: '半调图像', caption: '网点、套色与印刷颗粒',
    summary: '把连续的明暗拆成疏密、大小不同的网点，让照片带上印刷品和漫画的颗粒感。',
    features: '近看是点，远看仍能辨认明暗和轮廓。常见做法有黑白高对比、双色套印和轻微错位；网点可以只覆盖背景，让主体保持清晰。',
    usage: '适合音乐海报、杂志封面、服饰印花和社交媒体配图。缩小后容易丢细节或出现摩尔纹，标题附近要留出干净区域。',
    posts: ['style-halftone-poster', 'style-halftone-depth'],
  },
  {
    id: 'ascii', title: 'ASCII 设计', caption: '用字符重新组织图像',
    summary: '用可辨认的字母、数字和符号构成图像，把终端界面的秩序带进视觉设计。',
    features: '以等宽网格承载字符，通过字符密度、明暗和形状表现轮廓。可以是黑白字符画，也可以叠在彩色图像上；与单纯的像素点阵有所区别。',
    usage: '适合开发者工具、创意编程作品、音乐视觉和实验网站。字符效果放在主视觉或背景中，正文和关键操作仍需保持正常字号与可读性。',
    posts: ['style-ascii-shader', 'style-ascii-interface'],
  },
  {
    id: 'soft', title: '柔性美学', caption: '柔和配色与流动形态',
    summary: 'Soft Aesthetics 用柔和的色彩、边缘和材质营造轻松的感受。这里选的是平面视觉中的渐变、颗粒与流动字形。',
    features: '常见低饱和粉彩、晕染渐变、细颗粒和圆润有机形态。画面的柔和来自色彩过渡与形状关系，不只是把所有元素模糊。',
    usage: '适合生活方式品牌、音乐封面、身心健康主题和轻量情绪表达。大面积背景可以轻柔，文字和按钮要保留足够对比。',
    posts: ['style-soft-wordmark', 'style-soft-palette'],
  },
  {
    id: 'cassette', title: '磁带未来主义', caption: 'ARC Raiders 式科技废土',
    summary: '以 ARC Raiders 为参考：在废土环境里保留模拟设备、工业标识和复古色带，呈现一种仍能触摸、修理的旧未来。',
    features: '厚重机壳、实体按钮、线缆、编号和警示标识，搭配粗野主义巨构与使用痕迹。米白、褪色暖色和功能性色带，形成与冷峻设施的对照。',
    usage: '适合科幻世界观、游戏界面、科技展览和概念海报。先建立可信的设备结构与信息层级，再加磨损；不要把噪点当成全部风格。',
    posts: ['style-arc-world', 'style-arc-identity'],
  },
].map(style => ({ ...style, kind: 'style', posts: style.posts.map(id => postById.get(id)) }))
