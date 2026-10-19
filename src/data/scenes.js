/* ------------------------------------------------------------------
   三个代表性场景的内容数据（替换原 ai.js 里的两个 AI 场景）

   设计灵感帖来自 Notion「🕊️ Twitter 点赞」库；事件记录来自公开报道与官方通报
   （https://app.notion.com/p/3d0c9cd18f1f441f8c01ceb585b2c7b1）
   - 设计帖与事件笔记保留原发布者、正文、图片和原帖链接
   - 事件记录使用报道或官方通报的发布主体、摘要和原文链接
   - likes / stars / location 多为空：原始素材没有这些数据；
     「设计灵感 - 热门内容」三条的点赞数是原型演示值
   - 评论是原型演示用的虚拟内容，集中写在文件末尾的 demoComments 里

   场景规划：
     1. design-inspire｜主题社区｜「设计灵感」——有素材（10 条作品与经验分享）
     2. blender       ｜主题社区｜「Blender」——8 条教程与制作经验（X 原帖，含配图）
     3. event-watch   ｜事件追踪｜「事件追踪」——尊界 V800 制动踏板支架断裂
   ------------------------------------------------------------------ */

import imgCicelyBrand from '../assets/s-cicely-brand.webp'
import imgColdType from '../assets/s-cold-type.webp'
/* 事件配图使用对应报道原图；个人笔记封面、演示头像为本地原创 SVG。 */
import imgEvPFront from '../assets/ev-p-front.webp'
import imgEvPresale from '../assets/ev-news-presale.webp'
import imgEvResponse from '../assets/ev-news-response.webp'
import imgEvInspection from '../assets/ev-news-inspection.webp'
import imgEvStatement from '../assets/ev-news-statement.webp'
import imgEvTest from '../assets/ev-news-test.webp'
import imgEvNoteInvestigation from '../assets/ev-note-investigation.svg'
import imgEvNoteResponse from '../assets/ev-note-response.svg'
import imgEvNoteInspection from '../assets/ev-note-inspection.svg'
import imgEvNoteTest from '../assets/ev-note-test.svg'
import avatarEvLin from '../assets/avatar-event-lin.svg'
import avatarEvZhe from '../assets/avatar-event-zhe.svg'
import avatarEvOrange from '../assets/avatar-event-orange.svg'
import avatarEvChen from '../assets/avatar-event-chen.svg'
import imgTimelinePinch from '../assets/s-timeline-pinch.webp'
import imgTimeWidget from '../assets/s-time-widget.webp'
import imgStupidoTheme from '../assets/s-stupido-type.webp'
import imgMovieColor from '../assets/s-movie-color.webp'
import imgTravelPictograms from '../assets/s-travel-pictograms.webp'
import imgStampHalftone from '../assets/s-stamp-halftone.webp'
import imgStarwars1977 from '../assets/s-starwars-1977.webp'
import imgKurppaSignage from '../assets/s-kurppa-signage.webp'
/* 设计灵感第二批（Notion「 Twitter 点赞」库，原帖静态配图） */
import imgGenerativeCovers from '../assets/s-generative-covers.webp'
import imgBloomingSeason from '../assets/s-blooming.webp'
import imgTypography from '../assets/s-typography.webp'
import imgTripJournal from '../assets/s-trip-journal.webp'
import imgJckhlry from '../assets/s-jckhlry.webp'
import imgPhotoCard from '../assets/s-photo-card.webp'
import imgNucleoIso from '../assets/s-nucleo-iso.webp'
import imgBrandGuidelines from '../assets/s-brand-guidelines.webp'
import avAyushSoni from '../assets/avatar-ayushsoni_io.webp'
import avStudioBakers from '../assets/avatar-studiobakers.webp'
import avFallback1 from '../assets/avatar-fallback-1.webp'
import avFallback2 from '../assets/avatar-fallback-2.webp'
import avFallback3 from '../assets/avatar-fallback-3.webp'

import avSwarnima from '../assets/avatar-swarnima_otw.webp'
import avMichaelMicasso from '../assets/avatar-michaelmicasso.webp'
import avNatkoHasic from '../assets/avatar-natkohasic.webp'
import avTweetByLokki from '../assets/avatar-tweetbylokki.webp'
import avSharifElkomi from '../assets/avatar-sharifelkomi.webp'
import avXinPai from '../assets/avatar-xin_pai88825.webp'
import avMeJahanvi from '../assets/avatar-me_Jahanvi.webp'
import avRoktim from '../assets/avatar-roktim___.webp'
import avSciFiArchives from '../assets/avatar-SciFiArchives.webp'
import avSearchSystem from '../assets/avatar-searchsystem_.webp'

/* Blender 场景：8 条来自 X 的教程与制作经验（原帖配图 + 原作者头像） */
import imgBlEnvRocks from '../assets/bl-env-rocks.webp'
import imgBlModularCity from '../assets/bl-modular-city.webp'
import imgBlPointsCurve from '../assets/bl-points-curve.webp'
import imgBlWireframe from '../assets/bl-wireframe.webp'
import imgBlFracturing from '../assets/bl-fracturing.webp'
import imgBlSlinky from '../assets/bl-slinky.webp'
import imgBlGeoNodesWeb from '../assets/bl-geonodes-web.webp'
import imgBlNodesTsl from '../assets/bl-nodes-tsl.webp'

import avCgcookie from '../assets/avatar-bl-env-rocks.webp'
import avDimitar from '../assets/avatar-bl-modular-city.webp'
import avRyoMizuta from '../assets/avatar-bl-points-curve.webp'
import avCelestialmaze from '../assets/avatar-bl-wireframe.webp'
import avJolanHuijskes from '../assets/avatar-bl-fracturing.webp'
import av80Level from '../assets/avatar-bl-slinky.webp'
import avXianyaoWei from '../assets/avatar-bl-geonodes-web.webp'
import avAndrewWoan from '../assets/avatar-bl-nodes-tsl.webp'

/* 头像底色：真实头像加载前的占位渐变（沿用 posts.js 的取色习惯） */
const T = {
  blue: ['#8ec5ff', '#4a7bd5'],
  amber: ['#ffd28e', '#f08a5d'],
  mint: ['#c7f0d8', '#5cc98a'],
  rose: ['#ffb3c7', '#e0567f'],
  gold: ['#ffe08a', '#f2b544'],
  sky: ['#b8e1ff', '#5aa9e6'],
  violet: ['#e3d5ff', '#8f6bd8'],
  teal: ['#b9f0ef', '#4fb3ae'],
  pink: ['#ffd6e0', '#f2799a'],
  slate: ['#d3dae8', '#7b8794'],
}

/* ---------- 主题社区：设计灵感（18 条，来自 Notion「 Twitter 点赞」库） ---------- */

export const InsCicelyBrand = {
  id: 'ins-cicely-brand',
  image: imgCicelyBrand,
  ratio: '1640 / 2048',
  title: 'Cicely 这套品牌识别，想做得更年轻也更有触感',
  author: { name: 'Swarnima', handle: '@swarnima_otw', avatar: avSwarnima, tint: T.rose },
  body: [
    '这次给 Cicely 做品牌识别，想把年轻、亲和和触感放在一起。颜色和图形都往更轻快的方向走。',
  ],
  tag: '#品牌',
  category: '品牌',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-01',
  location: '',
  likes: '1248',
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/Cicely-3d5bd994f33d81ba8807e914688f33bc',
    post: 'https://x.com/swarnima_otw/status/2094679145771160055',
  },
}

export const InsColdType = {
  id: 'ins-cold-type',
  image: imgColdType,
  ratio: '1800 / 1928',
  title: '冷一点的字体，也可以配很温暖的体验',
  author: { name: 'MEK.txt', handle: '@michaelmicasso', avatar: avMichaelMicasso, tint: T.slate },
  body: [
    '最近在试一种反差：字体保持冷静，整个体验却做得柔和一点。',
  ],
  tag: '#字体/排版',
  category: '字体',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-17',
  location: '',
  likes: '963',
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/3fabd994f33d81abb4a4d0bc5f9fe83b',
    post: 'https://x.com/michaelmicasso/status/2100592793291026665',
  },
}

export const InsTimelinePinch = {
  id: 'ins-timeline-pinch',
  image: imgTimelinePinch,
  ratio: '960 / 1200',
  title: '把时间线做成可以像照片一样捏合缩放',
  author: { name: 'Natko Hasic', handle: '@natkohasic', avatar: avNatkoHasic, tint: T.sky },
  body: [
    '我们做了点特别的东西：一条实时时间线，文字可以像照片一样捏合缩放，每放大一级就展开更多细节。',
    '原生实现，文字能像照片一样缩放，每放大一级就多显示一些记录。现在还在 beta。',
  ],
  tag: '#动效/动画',
  category: '动效',
  contentType: '经验',
  area: 'UI/视觉',
  time: '09-25',
  location: '',
  likes: '2317',
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/3fabd994f33d81ed958cd53b5258f025',
    post: 'https://x.com/natkohasic/status/2103440361716629785',
  },
}

export const InsTimeWidget = {
  id: 'ins-time-widget',
  image: imgTimeWidget,
  ratio: '1500 / 1875',
  title: '主屏上的时间，也可以只是一个安静的锚点',
  author: { name: 'Lokki', handle: '@tweetbylokki', avatar: avTweetByLokki, tint: T.gold },
  body: ['想把时间做成主屏上一个安静的锚点，不需要一直提醒你什么。'],
  tag: '#组件/交互',
  category: '组件',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-27',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/3fabd994f33d81179da1c34b078b6e9a',
    post: 'https://x.com/tweetbylokki/status/2104270096851939804',
  },
}

export const InsStupidoTheme = {
  id: 'ins-stupido-theme',
  image: imgStupidoTheme,
  ratio: '942 / 2048',
  title: '最近在做 Stupido 主题，越做越喜欢',
  author: { name: 'Sharif', handle: '@sharifelkomi', avatar: avSharifElkomi, tint: T.amber },
  body: ['真的很喜欢在 Stupido 主题上工作！'],
  tag: '#视觉风格',
  category: '视觉',
  contentType: '经验',
  area: 'UI/视觉',
  time: '08-28',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/Stupido-3cdbd994f33d81499926e3857135596c',
    post: 'https://x.com/sharifelkomi/status/2093445332948455540',
  },
}

export const InsMovieColor = {
  id: 'ins-movie-color',
  image: imgMovieColor,
  ratio: '1681 / 2048',
  title: '这个网站按颜色整理电影画面，翻起来很有意思',
  author: { name: 'Paidax', handle: '@xin_pai88825', avatar: avXinPai, tint: T.mint },
  body: [
    '按颜色找电影画面，点进去还能看电影信息和配色。想找某种氛围时挺好用的。',
  ],
  tag: '#配色',
  category: '配色',
  contentType: '经验',
  area: 'UI/视觉',
  time: '06-29',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/3cdbd994f33d819fb728e9baff1faa78',
    post: 'https://x.com/xin_pai88825/status/2071450664379781169',
  },
}

export const InsTravelPictograms = {
  id: 'ins-travel-pictograms',
  image: imgTravelPictograms,
  ratio: '2045 / 2048',
  title: '给一个小实验画了 50 多个旅行图标',
  author: { name: 'Jahanvi Singh', handle: '@me_Jahanvi', avatar: avMeJahanvi, tint: T.teal },
  body: [
    '最近给一个还没公开的小实验画了 50 多个旅行象形图标，先挑几张喜欢的放出来。',
  ],
  tag: '#图标',
  category: '图标',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-01',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/3d5bd994f33d819abb23e16496eb9b55',
    post: 'https://x.com/me_Jahanvi/status/2094853338752041320',
  },
}

export const InsStampHalftone = {
  id: 'ins-stamp-halftone',
  image: imgStampHalftone,
  ratio: '2048 / 1367',
  title: '邮票齿孔、半调网点和等宽字放在一起',
  author: { name: 'Roktim', handle: '@roktim___', avatar: avRoktim, tint: T.violet },
  body: [
    '这组视觉把邮票齿孔、半调图像和等宽字放在一起，复古里还带点技术感。',
  ],
  tag: '#视觉风格',
  category: '视觉',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-04',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/3d5bd994f33d815bbf43e0b8f6c073c3',
    post: 'https://x.com/roktim___/status/2095950250917945508',
  },
}

export const InsStarwars1977 = {
  id: 'ins-starwars-1977',
  image: imgStarwars1977,
  ratio: '1200 / 501',
  title: '翻到《星球大战》（1977）里的这些界面',
  author: { name: 'Sci-Fi Archives', handle: '@SciFiArchives', avatar: avSciFiArchives, tint: T.blue },
  body: ['重看《星球大战》（1977），里面的界面细节现在看还是很有味道。'],
  tag: '#视觉风格',
  category: '视觉',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-23',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/1977-3fabd994f33d81aba9ddccf557de13da',
    post: 'https://x.com/SciFiArchives/status/2102710063626371250',
  },
}

export const InsKurppaSignage = {
  id: 'ins-kurppa-signage',
  image: imgKurppaSignage,
  ratio: '640 / 360',
  title: '存一下 Kurppa Hosk 给 XXL 做的导视系统',
  author: { name: 'SearchSystem™', handle: '@searchsystem_', avatar: avSearchSystem, tint: T.slate },
  body: ['Kurppa Hosk 为 XXL 做的 2021 年导视系统。先存着，之后找导视案例时再翻。'],
  tag: '#品牌',
  category: '品牌',
  contentType: '经验',
  area: 'UI/视觉',
  time: '08-21',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: {
    notion: 'https://app.notion.com/p/Kurppa-Hosk-2021-3cdbd994f33d8160b858dc08438314c3',
    post: 'https://x.com/searchsystem_/status/2090712104001036629',
  },
}

/* ---------- 主题社区：设计灵感（新增 8 条，来自 Notion「 Twitter 点赞」库） ---------- */

export const InsGenerativeCovers = {
  id: 'ins-generative-covers',
  image: imgGenerativeCovers,
  ratio: '900 / 1272',
  title: 'Bakers Studio 这组生成式封面挺耐看',
  author: { name: 'Bakers Studio', handle: '@studiobakers', avatar: avStudioBakers },
  body: ['看到 Bakers Studio 这组生成式封面，图形变化挺多，放在一起又能看出统一的节奏。'],
  tag: '#视觉风格',
  category: '视觉',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-11',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/studiobakers/status/2098329431798620246' },
  mediaNote: '原帖配图',
}

export const InsBloomingSeason = {
  id: 'ins-blooming-season',
  image: imgBloomingSeason,
  ratio: '900 / 1273',
  title: 'blooming season 这组花期视觉很轻盈',
  author: { name: 'Ayush Soni', handle: '@ayushsoni_io', avatar: avAyushSoni, tint: T.mint },
  body: ['这组 blooming season 用花期做主题，颜色和画面都很轻，先存下来。'],
  tag: '#视觉风格',
  category: '视觉',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-18',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/ayushsoni_io/status/2100807302148497901' },
  mediaNote: '原帖配图',
}

export const InsTypographyNow = {
  id: 'ins-typography-now',
  image: imgTypography,
  ratio: '1 / 1',
  title: '最近看到一组当代字体排印练习',
  author: { name: 'Ayush Soni', handle: '@ayushsoni_io', avatar: avAyushSoni, tint: T.violet },
  body: ['这组当代字体排印把字形和版面关系处理得很直接，适合慢慢看细节。'],
  tag: '#字体/排版',
  category: '字体',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-18',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/ayushsoni_io/status/2100807302148497901' },
  mediaNote: '原帖配图',
}

export const InsTripJournal = {
  id: 'ins-trip-journal',
  image: imgTripJournal,
  ratio: '900 / 955',
  title: '这款旅行日记的排版看着很舒服',
  author: { name: 'Olabode', handle: '@Olabodedesigns', avatar: avFallback3 },
  body: ['旅行日记的界面排得很干净，照片和文字各有空间，记一下这个版式。'],
  tag: '#组件/交互',
  category: '组件',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-16',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/Olabodedesigns/status/2100137477805588614' },
  mediaNote: '原帖配图',
}

export const InsJckhlrySite = {
  id: 'ins-jckhlry-site',
  image: imgJckhlry,
  ratio: '900 / 508',
  title: 'Jack Hillery 的个人网站，逛起来很安静',
  author: { name: 'Ian (伊恩)', handle: '@ianneo_ai', avatar: avFallback1 },
  body: [
    '翻到英国创意总监 Jack Hillery 的个人网站，页面很克制，能安静地看作品。',
  ],
  tag: '#作品集',
  category: '视觉',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-11',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/ianneo_ai/status/2098403665652695244' },
  mediaNote: '原帖配图',
}

export const InsPhotoCardMotion = {
  id: 'ins-photo-card-motion',
  image: imgPhotoCard,
  ratio: '900 / 1956',
  title: '移动端照片卡片叠起来之后的动效',
  author: { name: 'Finn Taylor', handle: '@FinnoTaylor', avatar: avFallback2 },
  body: ['这组移动端照片卡片做了堆叠动画，切换时有种把照片一张张放上去的感觉。'],
  tag: '#动效/动画',
  category: '动效',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-29',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/FinnoTaylor/status/2104731442928615929' },
  mediaNote: '原帖配图',
}

export const InsNucleoIsometric = {
  id: 'ins-nucleo-isometric',
  image: imgNucleoIso,
  ratio: '1 / 1',
  title: 'Nucleo 这套等距图标有 120 个，还能免费用',
  author: { name: 'Nucleo Icons', handle: '@nucleoicons', avatar: imgNucleoIso },
  body: ['Nucleo Isometric 收了 120 个等距图标，细节处理得挺完整，做素材参考可以看看。'],
  tag: '#图标',
  category: '图标',
  contentType: '作品',
  area: 'UI/视觉',
  time: '03-25',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/nucleoicons/status/2036824678116057458' },
  mediaNote: '原帖配图',
}

export const InsWhatMattersGuidelines = {
  id: 'ins-what-matters-guidelines',
  image: imgBrandGuidelines,
  ratio: '900 / 514',
  title: 'What Matters Agency 的品牌指南，先存一份',
  author: { name: 'Swarnima', handle: '@swarnima_otw', avatar: avSwarnima, tint: T.pink },
  body: ['What Matters Agency 给酒店业做的品牌设计指南，里面的视觉规范和应用方式值得参考。'],
  tag: '#品牌',
  category: '品牌',
  contentType: '作品',
  area: 'UI/视觉',
  time: '09-02',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/swarnima_otw/status/2095044935640842572' },
  mediaNote: '原帖配图',
}

/* ---------- 主题社区：Blender（8 条，来自 X 原帖） ----------
   收录口径：正文或配图能明确确认使用 Blender 的教程 / 制作经验；
   原帖为视频的，封面用该视频的预览图（静态图），观看入口指向原帖。
   正文只做忠实翻译与概述，不替作者补写步骤、效果或创作动机。
   likes / stars / location / comments 一律留空：原帖没有这些数据，不编造。 */

export const BlEnvRocks = {
  id: 'bl-env-rocks',
  image: imgBlEnvRocks,
  ratio: '1200 / 675',
  title: '用几何节点搭岩石和草地环境',
  author: { name: 'CG COOKIE', handle: '@cgcookie', avatar: avCgcookie, tint: T.amber },
  body: [
    '想练几何节点环境搭建的话，可以从岩石和草地这类基础场景开始。这段教程的完整视频在 CG Cookie 的 YouTube 频道。',
    '封面标注的版本是 Blender 2.92，照着做时记得留意版本差异。',
  ],
  kind: '技巧分享',
  tag: '#几何节点',
  category: '几何节点',
  contentType: '经验',
  area: '3D',
  time: '03-24',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/cgcookie/status/1374551806110531584' },
  conditions: 'Blender 2.92',
  mediaNote: '原帖配图（教程封面）',
}

export const BlModularCity = {
  id: 'bl-modular-city',
  image: imgBlModularCity,
  ratio: '675 / 1200',
  title: '几何节点配合实例，做一座模块化城市',
  author: { name: 'Dimitar Pouchnikov', handle: '@dimitarsp', avatar: avDimitar, tint: T.mint },
  body: [
    '这套模块化城市流程用 Blender 几何节点和实例来搭，场景能复用模块，也不用把每个对象都做成独立几何体。',
    '原帖有完整演示视频，适合看看实例化是怎么串进流程里的。',
  ],
  kind: '作品分享',
  tag: '#几何节点',
  category: '几何节点',
  contentType: '经验',
  area: '3D',
  time: '03-02',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/dimitarsp/status/1631196376460566530' },
  mediaNote: '原帖视频封面',
}

export const BlPointsCurve = {
  id: 'bl-points-curve',
  image: imgBlPointsCurve,
  ratio: '1200 / 675',
  title: 'Points to Curves 可以拿来做水凝胶里的聚合物链',
  author: { name: 'Ryo Mizuta Graphics', handle: '@Ryo_M_Graphics', avatar: avRyoMizuta, tint: T.teal },
  body: [
    '看到一个挺特别的 Points to Curves 用法：在水凝胶内部填充弯曲的聚合物链。',
    '原帖写的是 Blender 4.0，作者还提到会在新教程里演示具体做法。',
  ],
  kind: '技巧分享',
  tag: '#几何节点',
  category: '几何节点',
  contentType: '经验',
  area: '3D',
  time: '01-19',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/Ryo_M_Graphics/status/1748391228826059146' },
  conditions: 'Blender 4.0',
  mediaNote: '原帖视频封面',
}

export const BlWireframe = {
  id: 'bl-wireframe',
  image: imgBlWireframe,
  ratio: '1200 / 675',
  title: '线框效果的快速做法，记下来',
  author: { name: 'celestialmaze', handle: '@cmzw_', avatar: avCelestialmaze, tint: T.violet },
  body: ['想做简单线框效果时可以参考这段快速教程，步骤不多，适合先试一遍。'],
  kind: '技巧分享',
  tag: '#材质',
  category: '材质',
  contentType: '经验',
  area: '3D',
  time: '03-15',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/cmzw_/status/1503728170373042179' },
  mediaNote: '原帖视频封面',
}

export const BlFracturing = {
  id: 'bl-fracturing',
  image: imgBlFracturing,
  ratio: '878 / 720',
  title: '这个几何节点破碎方案之后会开源',
  author: { name: 'Jolan Huijskes', handle: '@jolanhuijskes', avatar: avJolanHuijskes, tint: T.rose },
  body: [
    '看到这组 Blender 几何节点破碎效果，作者说它是为接下来的项目准备的，之后会把节点免费放出来。',
  ],
  kind: '技巧分享',
  tag: '#几何节点',
  category: '几何节点',
  contentType: '作品',
  area: '3D',
  time: '07-15',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/jolanhuijskes/status/2077332397603872787' },
  mediaNote: '原帖视频封面',
}

export const BlSlinky = {
  id: 'bl-slinky',
  image: imgBlSlinky,
  ratio: '1200 / 675',
  title: '几何节点加子弹物理，弹簧玩具动起来了',
  author: { name: '80 LEVEL', handle: '@80Level', avatar: av80Level, tint: T.blue },
  body: [
    '这个 Slinky 弹簧玩具模拟是 @seanterelle 用 Blender 几何节点和 Bullet Physics 做的，弹簧压缩、回弹的状态很直观。',
  ],
  kind: '作品分享',
  tag: '#动画',
  category: '动画',
  contentType: '作品',
  area: '3D',
  time: '07-22',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/80Level/status/1947680538325586075' },
  mediaNote: '原帖视频封面',
}

export const BlGeoNodesWeb = {
  id: 'bl-geonodes-web',
  image: imgBlGeoNodesWeb,
  ratio: '960 / 720',
  title: '用 Three.js 把 Blender 几何节点搬到网页里',
  author: { name: 'Xianyao Wei', handle: '@BeachSad2', avatar: avXianyaoWei, tint: T.gold },
  body: [
    '把 Blender 几何节点转成网页里的效果，这个方向挺有意思。原帖提到灵感来自 @ito3am 和 @threejs，也附了 demo 与代码。',
  ],
  kind: '技巧分享',
  tag: '#几何节点',
  category: '几何节点',
  contentType: '经验',
  area: '3D',
  time: '04-18',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/BeachSad2/status/2045515423072788924' },
  mediaNote: '原帖视频封面',
}

export const BlNodesTsl = {
  id: 'bl-nodes-tsl',
  image: imgBlNodesTsl,
  ratio: '1200 / 675',
  title: 'Blender 节点转成 TSL，还配了资产准备插件',
  author: { name: 'Andrew Woan', handle: '@andrewwoan', avatar: avAndrewWoan, tint: T.sky },
  body: [
    '这段视频聊 Blender MCP，以及怎么把几何节点和着色器节点转成 TSL，思路来自 @alvarosabu。',
    '作者还做了个 Blender 插件，可以一键跑 gltfjsx、gltf-transform 并添加 UV，整理资产时少几步手动操作。',
  ],
  kind: '技巧分享',
  tag: '#材质',
  category: '材质',
  contentType: '经验',
  area: '3D',
  time: '04-19',
  location: '',
  likes: null,
  stars: null,
  comments: [],
  source: { label: '查看原帖', post: 'https://x.com/andrewwoan/status/2045994547549802521' },
  mediaNote: '原帖视频封面',
}

/* ---------- 事件追踪：尊界 V800 制动踏板支架断裂 ---------- */

const zunjieTestReport = 'https://www.thepaper.cn/newsDetail_forward_34212782'
const zunjieBrandStatement = 'https://www.thepaper.cn/newsDetail_forward_34216872'
const zunjieInvestigation = 'https://wap.miit.gov.cn/xwfb/gxdt/art/2026/art_32a5683624bc474fb015963c00d4e998.html'
const zunjieInvestigationResponse = 'https://www.thepaper.cn/newsDetail_forward_34258801'
const zunjieInspectionReport = 'https://www.ithome.com/1/012/175.htm'
/* 追问与背景报道（2026-10 检索补充） */
const zunjieFollowup = 'https://m.thepaper.cn/newsDetail_forward_34216478'
const v800Presale = 'https://www.toutiao.com/article/7665684007794917942'
const v800Debut = 'https://www.autohome.com.cn/news/202606/1314824.html'

/* 个人昵称与头像为原型演示；正文及 source.publisher 保留新闻出处。 */
const eventPostItems = [
  {
    id: 'event-zunjie-investigation', image: imgEvNoteInvestigation, ratio: '4 / 5',
    title: '看到三部门成立联合调查组，后续还得等核查结果',
    author: { name: '小林在路上', handle: '路上随手记', avatar: avatarEvLin, tint: T.slate },
    body: [
      '翻了工信部通报：10 月 15 日，工信部、中央网信办和市场监管总局成立联合调查组，核查尊界 V800 制动踏板支架断裂问题。',
      '目前还没有调查结论，断裂原因和后续处置都要等核查结果。',
    ],
    kind: '官方通报',
    tag: '#尊界刹车事件', category: '事件追踪', area: '汽车安全', time: '10-15', location: '', likes: null, stars: null, comments: [],
    source: { label: '查看工信部通报', post: zunjieInvestigation, publisher: '工业和信息化部' },
  },
  {
    id: 'event-zunjie-response', image: imgEvNoteResponse, ratio: '4 / 5',
    title: '尊界回应会配合调查，先等后续通报',
    author: { name: '阿哲的车库', handle: '日常看车', avatar: avatarEvZhe, tint: T.blue },
    body: [
      '看到澎湃新闻的报道：10 月 15 日晚，尊界汽车表示会积极响应并配合联合调查组。现在这只是企业表态，调查结论还没出来。',
    ],
    kind: '企业回应',
    tag: '#尊界刹车事件', category: '事件追踪', area: '汽车安全', time: '10-15', location: '', likes: null, stars: null, comments: [],
    source: { label: '查看报道原文', post: zunjieInvestigationResponse, publisher: '澎湃新闻' },
  },
  {
    id: 'event-zunjie-inspection', image: imgEvNoteInspection, ratio: '4 / 5',
    title: '尊界公布静态检测结果，和媒体测试工况不同',
    author: { name: '橙子做功课', handle: '看车做功课', avatar: avatarEvOrange, tint: T.amber },
    body: [
      'IT之家提到，尊界提供给车主的检测说明显示：10 月 11 日，第三方机构按 QC/T 788-2018 检验踏板总成，静态纵向载荷加严到 3000N 后未见裂纹或损坏。',
      '这是企业公布的静态台架结果，和 10 月 8 日的连续紧急制动测试不是同一工况，仍要等联合调查核查。',
    ],
    kind: '检测结果',
    tag: '#尊界刹车事件', category: '事件追踪', area: '汽车安全', time: '10-13', location: '', likes: null, stars: null, comments: [],
    source: { label: '查看报道原文', post: zunjieInspectionReport, publisher: 'IT之家' },
  },
  {
    id: 'event-zunjie-test', image: imgEvNoteTest, ratio: '4 / 5',
    title: '懂车帝测试视频里的三辆 V800，踏板支架都断了',
    author: { name: '周末看车的小陈', handle: '周末看车记', avatar: avatarEvChen, tint: T.blue },
    body: [
      '澎湃新闻报道提到，10 月 8 日懂车帝发布测试视频：三台全新尊界 V800 在 100km/h 至静止的连续紧急制动测试中，制动踏板支架相继断裂。',
      '这是媒体测试视频呈现的情况，原因和责任仍要等监管部门调查。',
    ],
    kind: '媒体测试',
    tag: '#尊界刹车事件', category: '事件追踪', area: '汽车安全', time: '10-08', location: '', likes: null, stars: null, comments: [],
    source: { label: '查看报道原文', post: zunjieTestReport, publisher: '澎湃新闻' },
  },
]

/* ---------- 演示评论 ----------
   三个关注话题里的帖子在原型里都带评论。用户是虚构的，内容是围绕帖子写的
   演示文字，不代表原帖作者或真实用户。 */
const demoComment = (user, text, time, location, likes) => ({
  user, text, time, location, likes,
})

const demoComments = {
  'ins-cicely-brand': [
    demoComment('橘子汽水', '这个粉色和字体的搭配很轻，logo 缩小之后也认得出', '09-02', '上海', '36'),
    demoComment('阿布', '辅助图形是手绘的还是矢量做的？质感很舒服', '09-03', '杭州', '12'),
  ],
  'ins-cold-type': [
    demoComment('半糖去冰', '字体冷静、界面温暖，这个反差拿捏得很好', '09-18', '北京', '41'),
    demoComment('卷耳', '第三张的间距看得很舒服，已收藏', '09-19', '成都', '9'),
  ],
  'ins-timeline-pinch': [
    demoComment('南风', '捏合的时候文字跟着变层级，这个细节太妙了', '09-26', '深圳', '58'),
    demoComment('岛民小陈', 'beta 在哪能试？想研究一下实现方式', '09-26', '厦门', '14'),
  ],
  'ins-time-widget': [
    demoComment('一只眠羊', '时间不抢注意力，这个方向很适合做主屏', '09-28', '南京', '27'),
    demoComment('木木', '如果能自定义字体和颜色就更好了', '09-28', '武汉', '6'),
  ],
  'ins-stupido-theme': [
    demoComment('甜筒不加糖', '字形有点怪，但看久了很上头', '08-29', '北京', '33'),
    demoComment('小满', '颜色很跳，整套看下来居然很统一', '08-30', '广州', '11'),
  ],
  'ins-movie-color': [
    demoComment('电影罐头', '找参考图的时候太需要这种站了', '06-30', '上海', '49'),
    demoComment('阿茶', '已经存了几个配色，做海报时能直接翻', '07-01', '杭州', '16'),
  ],
  'ins-travel-pictograms': [
    demoComment('纸飞机', '线条很统一，缩小之后也不糊', '09-02', '成都', '22'),
    demoComment('鱼丸', '50 多个还能保持同一套手感，工作量不小', '09-02', '重庆', '8'),
  ],
  'ins-stamp-halftone': [
    demoComment('旧报纸', '半调和齿孔放在一起很妙，像旧印刷品', '09-05', '北京', '31'),
    demoComment('迟到大王', '等宽字选得刚好，没有抢掉图形的戏', '09-05', '苏州', '7'),
  ],
  'ins-starwars-1977': [
    demoComment('银幕考古', '老片的界面现在看还是很有想象力', '09-24', '上海', '44'),
    demoComment('小陈', '这种手绘感是现在做不出来的味道', '09-24', '广州', '13'),
  ],
  'ins-kurppa-signage': [
    demoComment('路牌收集者', '导视系统的字距和箭头处理都很稳', '08-22', '深圳', '25'),
    demoComment('阿岚', '存了，做空间项目时可以翻出来参考', '08-22', '杭州', '9'),
  ],
  'ins-generative-covers': [
    demoComment('随机种子', '每张都不一样，但放在一起很成体系', '09-12', '北京', '28'),
    demoComment('果核', '生成规则是怎么定的？想听听思路', '09-12', '上海', '10'),
  ],
  'ins-blooming-season': [
    demoComment('春天来信', '颜色轻得像春天，看着很舒服', '09-19', '杭州', '23'),
    demoComment('阿桃', '这个留白比例可以记一下', '09-19', '成都', '6'),
  ],
  'ins-typography-now': [
    demoComment('字里行间', '字和版面的关系处理得很直接，耐看', '09-19', '上海', '19'),
    demoComment('小楷', '第二张的字重对比很喜欢', '09-20', '南京', '5'),
  ],
  'ins-trip-journal': [
    demoComment('出门走走', '照片和文字各有呼吸，版式很舒服', '09-17', '广州', '18'),
    demoComment('阿梨', '这个排版适合做成模板', '09-17', '武汉', '4'),
  ],
  'ins-jckhlry-site': [
    demoComment('白噪音', '页面真的很安静，作品自己会说话', '09-12', '北京', '21'),
    demoComment('小林', '导航藏得刚好，不会打断看作品', '09-12', '上海', '8'),
  ],
  'ins-photo-card-motion': [
    demoComment('动效日记', '堆叠切换的节奏很舒服，想看看真机效果', '09-30', '深圳', '26'),
    demoComment('小苏', '卡片边缘的阴影处理得很轻，赞', '09-30', '杭州', '7'),
  ],
  'ins-nucleo-isometric': [
    demoComment('图标仓库', '等距图标还能免费用，太实用了', '03-26', '北京', '35'),
    demoComment('阿怪', '细节很完整，连小物件都有', '03-26', '上海', '12'),
  ],
  'ins-what-matters-guidelines': [
    demoComment('品牌课代表', '指南里的应用示例很全，适合学结构', '09-03', '杭州', '20'),
    demoComment('木子', '颜色和字体的层级写得很清楚', '09-03', '成都', '6'),
  ],
  'bl-env-rocks': [
    demoComment('节点练习生', '2.92 的教程现在看还能跑，节点思路不过时', '03-25', '上海', '18'),
    demoComment('石头记', '岩石分布是用噪波控制吗？想跟着练一遍', '03-26', '成都', '7'),
  ],
  'bl-modular-city': [
    demoComment('城市场景', '用实例复用的思路很适合做城市，电脑压力也小', '03-03', '深圳', '24'),
    demoComment('阿筑', '想看完整流程，模块是怎么切分的？', '03-03', '北京', '9'),
  ],
  'bl-points-curve': [
    demoComment('聚合物', '这个用法第一次见，水凝胶的质感一下就出来了', '01-20', '上海', '16'),
    demoComment('曲线控', '4.0 的 Points to Curves 确实好用，做曲线填充省事', '01-20', '杭州', '6'),
  ],
  'bl-wireframe': [
    demoComment('线框党', '步骤少这一点很关键，赶图的时候能直接用', '03-16', '广州', '14'),
    demoComment('小目', '线框粗细是跟着相机距离调的吗？', '03-16', '北京', '5'),
  ],
  'bl-fracturing': [
    demoComment('破碎研究', '等开源，破碎的细节看起来很自然', '07-16', '上海', '29'),
    demoComment('节点新手', '希望能出个节点讲解，想学一下思路', '07-16', '深圳', '11'),
  ],
  'bl-slinky': [
    demoComment('弹簧玩具', '回弹的节奏很像真的，物理参数调得好', '07-23', '北京', '22'),
    demoComment('阿物', '几何节点加 Bullet 这个组合还能做别的玩具', '07-23', '成都', '8'),
  ],
  'bl-geonodes-web': [
    demoComment('网页三维', '把节点搬到网页里，加载速度怎么样？', '04-19', '杭州', '17'),
    demoComment('前端小周', '这个方向很适合做产品展示，收藏了', '04-19', '上海', '6'),
  ],
  'bl-nodes-tsl': [
    demoComment('资产整理', '一键处理 glTF 和 UV 很省事，插件在哪能下？', '04-20', '深圳', '13'),
    demoComment('着色器', 'TSL 这段没太看懂，回头再刷一遍', '04-20', '北京', '5'),
  ],
  'event-zunjie-investigation': [
    demoComment('等通报', '等调查结论，别急着下判断', '10-16', '上海', '42'),
    demoComment('小北', '希望后续能把检测过程和标准说清楚', '10-16', '北京', '18'),
  ],
  'event-zunjie-response': [
    demoComment('看车不买车', '配合调查是应该的，关键还是看结果', '10-16', '广州', '27'),
    demoComment('阿哲', '企业表态先记下，等官方通报', '10-16', '深圳', '9'),
  ],
  'event-zunjie-inspection': [
    demoComment('工况不同', '静态测试和连续制动不是一回事，这个区别很重要', '10-14', '上海', '33'),
    demoComment('数据党', '3000N 加严后没坏，但工况还是要对齐看', '10-14', '杭州', '12'),
  ],
  'event-zunjie-test': [
    demoComment('周末看车', '三辆车都断在类似位置，这个一致性值得关注', '10-09', '成都', '38'),
    demoComment('慢一点', '等监管调查，媒体测试只能作为参考', '10-09', '北京', '15'),
  ],
}

const withComments = (post) => (
  demoComments[post.id] ? { ...post, comments: demoComments[post.id] } : post
)

export const eventPosts = eventPostItems.map(withComments)

/* ---------- 场景（社区）配置 ----------
   bracket = 场景类型（界面语言）：
     brace { } = 主题社区（设计灵感、Blender 等均统一为主题社区）
     paren ( ) = 事件追踪
   名字控制在 6 字以内，完整范围写在简介里。
   主题社区以作品、经验与交流为主体，无要闻内容时不渲染要闻模块；
   事件追踪展示来源明确的公开报道与脉络进展。
   empty:true 的场景不参与笔记轮转，由页面渲染真实空状态。 */

export const sceneTopics = [
  {
    id: 'design-inspire',
    type: 'topic',
    title: '设计',
    subtitle: '灵感',
    bracket: 'brace',
    seed: 7,
    noteTags: ['#视觉风格', '#字体/排版', '#品牌', '#组件/交互', '#动效/动画', '#配色', '#图标'],
    from: 'rgba(106,185,255,0.5)',
    to: 'rgba(253,237,207,0.5)',
    desc: '主题社区。围绕视觉、交互、排版与品牌的作品分享、制作经验与日常交流。收录来自原作者的公开发布，保留原帖与署名。',
    tags: ['#视觉设计', '#交互设计', '#平面设计', '#字体排版', '#品牌', '#动效'],
    news: [],
  },
  {
    id: 'blender',
    type: 'topic',
    title: 'Blender',
    subtitle: '实战',
    bracket: 'brace',
    seed: 8,
    noteTags: ['#几何节点', '#材质', '#动画'],
    from: 'rgba(178,242,255,0.5)',
    to: 'rgba(214,255,203,0.5)',
    desc: '分享 Blender 作品、制作技巧与 AI 辅助工作流。保留作者署名，按知识主题整理实践笔记。',
    tags: ['#建模', '#材质', '#灯光', '#动画', '#几何节点'],
    news: [],
  },
  {
    id: 'event-watch',
    type: 'event',
    title: 'V800',
    subtitle: '事件',
    bracket: 'paren',
    seed: 9,
    noteTags: ['#尊界刹车事件'],
    from: 'rgba(255,203,106,0.5)',
    to: 'rgba(207,232,253,0.5)',
    desc: '追踪尊界 V800 制动踏板支架断裂事件：懂车帝测试视频显示三台全新车在 100km/h 连续紧急制动中支架相继断裂；尊界回应将优化设计并提供免费升级；工信部等三部门已成立联合调查组，截至 2026 年 10 月 17 日调查结论尚未公布。',
    tags: ['#尊界V800', '#制动踏板', '#联合调查', '#检测报告', '#汽车安全', '#事件追踪'],
    news: [
      { date: '2026年10月15日', items: [
        {
          title: '工信部等三部门成立联合调查组',
          desc: '三部门将核查尊界 V800 制动踏板支架断裂问题，后续情况将及时公布。',
          cat: '监管', image: null, sourceName: '工业和信息化部', sourceUrl: zunjieInvestigation,
          detail: ['10 月 15 日，工业和信息化部、中央网信办、市场监管总局在前期调查基础上成立联合调查组。', '截至 2026 年 10 月 17 日，调查结论尚未公布。'],
        },
        {
          title: '尊界汽车称将全力配合联合调查',
          desc: '尊界汽车表示将积极响应并配合调查组工作。',
          cat: '企业回应', image: imgEvResponse, sourceName: '澎湃新闻', sourceUrl: zunjieInvestigationResponse,
          detail: ['尊界汽车 10 月 15 日晚发布声明，称将积极响应、完全服从并全力配合联合调查组。'],
        },
      ] },
      { date: '2026年10月13日', items: [
        {
          title: '尊界公布踏板检测结果：静态加严至 3000N 未见损坏',
          desc: '尊界向车主提供的检测说明称，第三方静态台架检测未见裂纹或损坏。',
          cat: '企业检测', image: imgEvInspection, sourceName: 'IT之家', sourceUrl: zunjieInspectionReport,
          detail: ['尊界向车主提供的检测说明称，10 月 11 日第三方机构按 QC/T 788-2018 检验踏板总成，并将静态纵向载荷加严至 3000N，未见裂纹或损坏。', '这份企业公布的静态检测结果与连续紧急制动测试工况不同，原因仍待联合调查核查。'],
        },
      ] },
      { date: '2026年10月09日', items: [
        {
          title: '澎湃新闻追问：踏板为何会被踩断？是否该召回？',
          desc: '报道追问断裂原因、开发验证与后续处置；相关判断仍待监管调查确认。',
          cat: '媒体追问', image: null, sourceName: '澎湃新闻', sourceUrl: zunjieFollowup,
          detail: ['澎湃新闻梳理各方质疑：懂车帝拆解显示三车断口与断裂位置完全一致。', '声明未说明踏板支架的材质与结构设计，也未解释为何在约 1612 牛踏板力下断裂；是否召回仍待联合调查结论。'],
        },
        {
          title: '尊界回应踏板断裂：将优化设计并提供免费升级',
          desc: '尊界称实际用户场景尚未发生同类故障，同时表示将优化相关部件。',
          cat: '企业声明', image: imgEvStatement, sourceName: '澎湃新闻', sourceUrl: zunjieBrandStatement,
          detail: ['尊界汽车 10 月 8 日声明称，用户实际使用场景中未发生制动踏板支架底座断裂故障，并将进一步优化部件设计，为已交付用户提供免费升级选择。', '这是企业声明中的说法，并非监管调查结论。'],
        },
      ] },
      { date: '2026年10月08日', items: [
        {
          title: '懂车帝测试视频显示三辆尊界 V800 踏板支架断裂',
          desc: '报道说，三台全新车在 100km/h 至静止的连续紧急制动测试中出现支架断裂。',
          cat: '媒体测试', image: imgEvTest, sourceName: '澎湃新闻', sourceUrl: zunjieTestReport,
          detail: ['澎湃新闻 10 月 8 日报道，懂车帝发布的测试视频显示，三台全新尊界 V800 在 100km/h 至静止的连续紧急制动测试中，制动踏板支架相继发生断裂。', '断裂原因与责任尚未有监管部门结论。'],
        },
      ] },
      { date: '2026年07月22日', items: [
        {
          title: '尊界 V800 实车图曝光，预售 23 天订单破万',
          desc: '「凌云墨白」实车图流出；V800、V680 预售 23 天订单突破 1 万台，V800 占比约 80%。',
          cat: '产品', image: imgEvPresale, sourceName: '全民舆车', sourceUrl: v800Presale,
          detail: ['7 月 22 日，博主@一针见车 分享尊界 V800「凌云墨白」实车图，延续家族灰白双拼设计。', '7 月 17 日余承东宣布，尊界 V800、V680 开启预售 23 天订单突破 1 万台，其中 V800 占比约 80%。'],
        },
      ] },
      { date: '2026年06月08日', items: [
        {
          title: '尊界 V800 官图发布：定位大型旗舰 MPV',
          desc: '搭载 1.5T 增程系统，车长 5495mm、轴距 3430mm，三排七座布局。',
          cat: '产品', image: imgEvPFront, sourceName: '汽车之家', sourceUrl: v800Debut,
          detail: ['6 月 8 日，尊界发布首款 MPV 车型 V800 官图，已完成工信部申报。', '动力为 1.5T 增程 + 前后双电机四驱，WLTC 纯电续航 275km。'],
        },
      ] },
    ],
    newsEmpty: '暂无更多可核实的进展',
  },
]

/* 关注页「关注的话题」信息流：主题社区「设计灵感」的 10 条笔记（两列等宽） */
export const sceneColumns = [
  [InsCicelyBrand, InsColdType, InsTimelinePinch, InsTimeWidget, InsStupidoTheme].map(withComments),
  [InsMovieColor, InsTravelPictograms, InsStampHalftone, InsStarwars1977, InsKurppaSignage].map(withComments),
]

/* 「热门内容」的选法：近一年发布、同一作者最多一条、尽量覆盖不同内容类型，
   再按收藏 ×3 + 评论 ×2 + 点赞排序。原型没有实时互动数据，这里写死选好的 3 条；
   接入真实数据后换成同一公式重新算即可。 */
export const designFeaturedPosts = [InsCicelyBrand, InsColdType, InsTimelinePinch].map(withComments)

/* 主题社区「Blender」的 8 条笔记：按原帖发布时间倒序，两列瀑布流 */
export const blenderPosts = [
  BlFracturing,
  BlSlinky,
  BlNodesTsl,
  BlGeoNodesWeb,
  BlEnvRocks,
  BlPointsCurve,
  BlModularCity,
  BlWireframe,
].map(withComments)

export const blenderColumns = [
  blenderPosts.filter((_, i) => i % 2 === 0),
  blenderPosts.filter((_, i) => i % 2 === 1),
]

/* 供 posts.js 装配：帖子池 / 社区
   scenePosts 只含「设计灵感」的笔记：关注页信息流与 t1–t7 社区的轮转池都取自这里，
   Blender 的 8 条只经 blenderPosts 供给自己的社区页，不进入其他社区的轮转池。 */
export const scenePosts = [
  InsCicelyBrand, InsColdType, InsTimelinePinch, InsTimeWidget, InsStupidoTheme,
  InsMovieColor, InsTravelPictograms, InsStampHalftone, InsStarwars1977, InsKurppaSignage,
  InsGenerativeCovers, InsBloomingSeason, InsTypographyNow, InsTripJournal,
  InsJckhlrySite, InsPhotoCardMotion, InsNucleoIsometric, InsWhatMattersGuidelines,
].map(withComments)
