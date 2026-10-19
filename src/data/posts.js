/* ------------------------------------------------------------------
   设计内容来自 Notion「🕊️ Twitter 点赞」数据库；事件追踪帖来自公开报道与官方通报
   设计类帖子使用 Notion 收藏素材；事件记录使用有来源链接的公开报道与官方通报。
   ------------------------------------------------------------------ */

/* 三个代表性场景的内容统一放在 scenes.js，与设计类内容分开维护。
   原 ai.js（两个 AI 场景）已不再引用，仅作历史备份。 */
import { blenderPosts, eventPosts, sceneColumns, scenePosts, sceneTopics } from './scenes.js'

import imgFluidHover from '../assets/img-fluid-hover.webp'
import imgMinimalUi from '../assets/img-minimal-ui.webp'
import imgPortfolioKeys from '../assets/img-portfolio-keys.webp'
import imgBendyDesktop from '../assets/img-bendy-desktop.webp'
import imgBlindEmboss from '../assets/img-blind-emboss.webp'
import imgColorBalance from '../assets/img-color-balance.webp'
import imgUiEras from '../assets/img-ui-eras.webp'
import imgFaideBrand from '../assets/img-faide-brand.webp'
import imgHealthtechBrand from '../assets/img-healthtech-brand.webp'
import imgUiPocket from '../assets/img-ui-pocket.webp'
import imgAlembicDropcaps from '../assets/img-alembic-dropcaps.webp'
import imgIos6Skeuo from '../assets/img-ios6-skeuo.webp'
import imgGardeningUi from '../assets/img-gardening-ui.webp'
import imgOilpaintingUi from '../assets/img-oilpainting-ui.webp'
import imgVisualWorks from '../assets/img-visual-works.webp'
import imgOtpClaw from '../assets/img-otp-claw.webp'
import imgNickpylSite from '../assets/img-nickpyl-site.webp'
import imgWeekendExplore from '../assets/img-weekend-explore.webp'
import imgHardwareUi from '../assets/img-hardware-ui.webp'
import imgIconSet from '../assets/img-icon-set.webp'
import imgComponentGallery from '../assets/img-component-gallery.webp'

/* 作者头像：按 X handle 从 unavatar.io 拉取的真实头像（已下载到 assets，200×200）
   没有头像的作者会自动回退到「首字 + 渐变底」的旧方案 */
import avAarzooAly from '../assets/avatar-aarzooaly.webp'
import avAdrianAbelarde from '../assets/avatar-adrianabelarde.webp'
import avAyushSoni from '../assets/avatar-ayushsoni_io.webp'
import avBarrellTech from '../assets/avatar-barrelltech.webp'
import avBasitDesigns from '../assets/avatar-basit_designs.webp'
import avChunxiangai from '../assets/avatar-chunxiangai.webp'
import avFoodOfTheGods from '../assets/avatar-foodofthegods3.webp'
import avHeedee from '../assets/avatar-heedee_.webp'
import avHelloAkriti from '../assets/avatar-helloakriti.webp'
import avIndurajAditya from '../assets/avatar-indurajaditya.webp'
import avJasonVinhson from '../assets/avatar-jasonvinhson.webp'
import avJyotsnaVenk from '../assets/avatar-jyotsnavenk.webp'
import avKawaiDesign from '../assets/avatar-kawai_design.webp'
import avKuxshl from '../assets/avatar-kuxshl.webp'
import avMasumParvej from '../assets/avatar-masumparvej_.webp'
import avMickaDesign from '../assets/avatar-micka_design.webp'
import avNickPyl from '../assets/avatar-nickpyl.webp'
import avNitzukai from '../assets/avatar-nitzukai.webp'
import avNomanDesign from '../assets/avatar-nomandsign.webp'
import avStudioBakers from '../assets/avatar-studiobakers.webp'
import avTheAppleDesign from '../assets/avatar-theappledesign.webp'

const AV = {
  '@AarzooAly': avAarzooAly,
  '@adrianabelarde': avAdrianAbelarde,
  '@ayushsoni_io': avAyushSoni,
  '@barrelltech': avBarrellTech,
  '@basit_designs': avBasitDesigns,
  '@chunxiangai': avChunxiangai,
  '@foodofthegods3': avFoodOfTheGods,
  '@heedee_': avHeedee,
  '@helloakriti': avHelloAkriti,
  '@indurajaditya': avIndurajAditya,
  '@jasonvinhson': avJasonVinhson,
  '@jyotsnavenk': avJyotsnaVenk,
  '@kawai_design': avKawaiDesign,
  '@kuxshl': avKuxshl,
  '@masumparvej_': avMasumParvej,
  '@micka_design': avMickaDesign,
  '@nickpyl': avNickPyl,
  '@nitzukai': avNitzukai,
  '@Nomandsign': avNomanDesign,
  '@studiobakers': avStudioBakers,
  '@TheAppleDesign': avTheAppleDesign,
}

/* 头像底色：给每位作者一个稳定的渐变，替代占位灰块 */
const T = {
  blue: ['#8ec5ff', '#4a7bd5'],
  amber: ['#ffd28e', '#f08a5d'],
  mint: ['#c7f0d8', '#5cc98a'],
  rose: ['#ffb3c7', '#e0567f'],
  gray: ['#dedede', '#8a8a8a'],
  gold: ['#ffe08a', '#f2b544'],
  sky: ['#b8e1ff', '#5aa9e6'],
  violet: ['#e3d5ff', '#8f6bd8'],
  teal: ['#b9f0ef', '#4fb3ae'],
  pink: ['#ffd6e0', '#f2799a'],
  sand: ['#ece2cd', '#a8916a'],
  slate: ['#d3dae8', '#7b8794'],
  leaf: ['#cdebb0', '#6fae4a'],
  clay: ['#f7c9a1', '#c9772e'],
}

/* ---------- 首页 / 发现页 ---------- */

export const fluidHover = {
  id: 'fluid-hover',
  image: imgFluidHover,
  ratio: '1199 / 643',
  title: '鼠标移到上面，悬停效果会跟着光标走',
  author: { name: 'Micka', handle: '@micka_design', avatar: AV['@micka_design'], tint: T.blue },
  body: [
    '大多数悬停效果一直是固定的，这套 fluid hover 会跟着光标的位置变化。',
    '把光标也当成交互的一部分，手感一下就不一样了。',
    'fluidfunctionalism.com/docs/fluid-hover',
  ],
  tag: '#动效/动画',
  category: '动效',
  area: 'UI/视觉',
  time: '09-09',
  location: '上海',
  likes: '1248',
  stars: '326',
  comments: [
    { user: '小红薯', text: '这个跟手感太好了，光标像被吸住一样', time: '3小时前', location: '上海', likes: '12' },
    { user: '设计民工', text: '静态 hover 停了十五年没人动过，确实该重新想想了', time: '5小时前', location: '杭州', likes: '4', sub: true },
  ],
}

export const minimalUi = {
  id: 'minimal-ui',
  image: imgMinimalUi,
  ratio: '1200 / 888',
  title: '这组设计把留白和质感都收得很克制',
  author: { name: 'Basit A. Khan', handle: '@basit_designs', avatar: AV['@basit_designs'], tint: T.amber },
  body: ['最近在做的设计方向，想把东西再减一点，让画面更安静。', '现在这个质感和留白的比例挺喜欢的。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-09',
  location: '深圳',
  likes: '892',
  stars: '204',
  comments: [
    { user: '阿吉', text: '越克制越难做，留白控制得好舒服', time: '昨天 21:40', location: '深圳', likes: '7' },
    { user: 'momo', text: '这套字重和间距能发一下规范吗', time: '昨天 22:05', location: '北京', likes: '2', sub: true },
  ],
}

export const portfolioKeys = {
  id: 'portfolio-keys',
  image: imgPortfolioKeys,
  ratio: '1199 / 748',
  title: '给作品集加了数字键导航，按 1 到 5 就能切页',
  author: { name: 'Jyotsna ⏾', handle: '@jyotsnavenk', avatar: AV['@jyotsnavenk'], tint: T.mint },
  body: [
    '刚给个人作品集做了次更新，现在按数字键 1 到 5 就能切换页面。',
    '开声音看会更完整：jyotsnavenk.com',
  ],
  tag: '#作品集',
  category: '作品集',
  area: 'UI/视觉',
  time: '09-10',
  location: '成都',
  likes: null,
  stars: '88',
  comments: [
    { user: '橙子不加冰', text: '数字键导航这个点子有点酷，键盘党狂喜', time: '2天前', location: '成都', likes: '23' },
    { user: '桐桐', text: '开声音看完，交互和音效是配套的', time: '2天前', location: '上海', likes: '9', sub: true },
  ],
}

export const bendyDesktop = {
  id: 'bendy-desktop',
  image: imgBendyDesktop,
  ratio: '1200 / 675',
  title: '合上 MacBook，桌面也跟着弯了一下',
  author: { name: 'adrian (adi)', handle: '@adrianabelarde', avatar: AV['@adrianabelarde'], tint: T.rose },
  body: [
    '把 iPhone Duo 的感觉搬到 MacBook 上试试。',
    'Bendy 上线了：合上电脑盖时，桌面会跟着弯一下。记得开声音：trybendy.app',
  ],
  tag: '#组件/交互',
  category: '组件',
  area: 'UI/视觉',
  time: '09-10',
  location: '广州',
  likes: '1573',
  stars: '412',
  comments: [
    { user: '一只鹿', text: '合盖弯曲太可爱了，想立刻装一个', time: '6小时前', location: '广州', likes: '31' },
    { user: '林间有风', text: '这属于没什么用但就是想一直玩的交互哈哈哈', time: '8小时前', location: '南京', likes: '15', sub: true },
  ],
}

export const blindEmboss = {
  id: 'blind-emboss',
  image: imgBlindEmboss,
  ratio: '1200 / 616',
  title: '盲压凸印，没有油墨也能把纸面做出层次',
  author: { name: 'jason', handle: '@jasonvinhson', avatar: AV['@jasonvinhson'], tint: T.gray },
  body: ['盲压凸印。', '不加油墨，只靠压力把纸面压出凹凸，光线扫过去才看得清，摸起来更明显。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-11',
  location: '上海',
  likes: '486',
  stars: '131',
  comments: [
    { user: '南屿', text: '盲压凸印的质感真的只能上手摸', time: '昨天 10:12', location: '上海', likes: '6' },
    { user: '半糖去冰', text: '不上墨只靠压力，印厂那边应该不便宜', time: '昨天 11:03', location: '苏州', likes: '3', sub: true },
  ],
}

export const colorBalance = {
  id: 'color-balance',
  image: imgColorBalance,
  ratio: '720 / 900',
  title: '颜色这么多却不打架，难的是把它们平衡好',
  author: { name: 'Heedong', handle: '@heedee_', avatar: AV['@heedee_'], tint: T.gold },
  body: [
    '这组造型本身很简单，绿、橙、粉、灰放在一起却一点也不乱。',
    '颜色用得多不算难，难的是让性格不同的颜色互相衬得起来。',
  ],
  tag: '#配色',
  category: '配色',
  area: 'UI/视觉',
  time: '09-11',
  location: '上海',
  likes: '2041',
  stars: '688',
  comments: [
    { user: 'Yuki', text: '颜色用得多不难，难的是让它们不打架', time: '3天前', location: '上海', likes: '48' },
    { user: '老张', text: '绿橙粉灰放一起还这么和谐，服气', time: '3天前', location: '武汉', likes: '11', sub: true },
  ],
}

export const uiEras = {
  id: 'ui-eras',
  image: imgUiEras,
  ratio: '1200 / 1200',
  title: '把几个年代的 UI 放一起看，审美变化挺有意思',
  author: { name: 'nitzu', handle: '@nitzukai', avatar: AV['@nitzukai'], tint: T.sky },
  body: ['把不同时代的 UI 放在一起看，从拟物、扁平到新拟态，变化还挺明显。', '每种风格都和当时的屏幕、交互方式有关。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-17',
  location: '西安',
  likes: '3120',
  stars: '1024',
  comments: [
    { user: '小红薯', text: '从拟物到扁平再到新拟态，一代人有一代人的审美', time: '4天前', location: '西安', likes: '76' },
    { user: '设计民工', text: '最怀念的还是 iOS 6 那会儿', time: '4天前', location: '上海', likes: '20', sub: true },
  ],
}

/* ---------- 关注页 ---------- */

export const faideBrand = {
  id: 'faide-brand',
  image: imgFaideBrand,
  ratio: '1200 / 831',
  title: 'Faide 这组品牌方向，先定气质再收字体和留白',
  author: { name: 'Akriti', handle: '@helloakriti', avatar: AV['@helloakriti'], tint: T.violet },
  body: ['Faide 的品牌方向探索。', '先把整体气质找准，再往下定字体和留白，画面就有了主心骨。'],
  tag: '#品牌',
  category: '品牌',
  area: 'UI/视觉',
  time: '09-09',
  location: '杭州',
  likes: '758',
  stars: '196',
  comments: [
    { user: '阿吉', text: '先定气质再定形，这个流程学到了', time: '5天前', location: '杭州', likes: '14' },
    { user: 'momo', text: '字体选得克制，留白把整个品牌撑住了', time: '5天前', location: '上海', likes: '5', sub: true },
  ],
}

export const healthtechBrand = {
  id: 'healthtech-brand',
  image: imgHealthtechBrand,
  ratio: '1200 / 675',
  title: '健康科技项目没选上的品牌方向，也放出来看看',
  author: { name: 'kushal', handle: '@kuxshl', avatar: AV['@kuxshl'], tint: T.teal },
  body: ['一个健康科技项目里没被选中的品牌方向。', '项目名称暂时不能公开。'],
  tag: '#品牌',
  category: '品牌',
  area: 'UI/视觉',
  time: '09-09',
  location: '北京',
  likes: null,
  stars: '77',
  comments: [
    { user: '林间有风', text: '没选上的方向反而更好看，很真实', time: '5天前', location: '北京', likes: '18' },
    { user: '橙子不加冰', text: '健康科技很容易做得太冷，这套稍微暖一点', time: '5天前', location: '成都', likes: '7', sub: true },
  ],
}

export const uiPocket = {
  id: 'ui-pocket',
  image: imgUiPocket,
  ratio: '1199 / 795',
  title: '想看 App 界面可以逛逛 UI Pocket，不用登录',
  author: { name: 'KAWAI', handle: '@kawai_design', avatar: AV['@kawai_design'], tint: T.pink },
  body: [
    '想集中看 App 界面的话，可以逛逛 UI Pocket。',
    '不用安装或登录就能看，注册、登录、首页这些页面也都收得到。',
  ],
  tag: '#素材/站点',
  category: '素材',
  area: '工具/资源',
  time: '09-09',
  location: '上海',
  likes: '1866',
  stars: '903',
  comments: [
    { user: '桐桐', text: '不用登录就能翻，太适合日常抄作业了', time: '6天前', location: '上海', likes: '52' },
    { user: '一只鹿', text: '连 onboarding 都有收录，这个细节加分', time: '6天前', location: '广州', likes: '21', sub: true },
  ],
}

export const alembicDropcaps = {
  id: 'alembic-dropcaps',
  image: imgAlembicDropcaps,
  ratio: '958 / 720',
  title: 'Alembic 收了四套古典首字母，都是从旧书里描出来的',
  author: { name: '無事人', handle: '@foodofthegods3', avatar: AV['@foodofthegods3'], tint: T.sand },
  body: [
    'Alembic 编辑器里现在有四套装饰性首字母，都是从 1510 到 1900 年左右的旧书里矢量化出来的。',
    'alembic.space/editor',
  ],
  tag: '#字体/排版',
  category: '字体',
  area: 'UI/视觉',
  time: '09-15',
  location: '苏州',
  likes: null,
  stars: '145',
  comments: [
    { user: '半糖去冰', text: '从 1510 年的书里直接矢量化，这个工作量不敢想', time: '7天前', location: '苏州', likes: '33' },
    { user: '南屿', text: '首字母下沉用在正文里会很有味道', time: '7天前', location: '上海', likes: '12', sub: true },
  ],
}

export const ios6Skeuo = {
  id: 'ios6-skeuo',
  image: imgIos6Skeuo,
  ratio: '800 / 1200',
  title: '现在回头看，iOS 6 的拟物细节还是很耐看',
  author: { name: 'Apple Design', handle: '@TheAppleDesign', avatar: AV['@TheAppleDesign'], tint: T.slate },
  body: ['iOS 6 的拟物细节现在看还是很有味道。', '刻度、缝线和皮革质感都做得很认真，放到今天也不显得粗糙。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-15',
  location: '武汉',
  likes: '4260',
  stars: '1580',
  comments: [
    { user: '老张', text: '拟物不是过时，是没人愿意花那个心思了', time: '8天前', location: '武汉', likes: '94' },
    { user: 'Yuki', text: '皮革缝线那几个控件放现在依然精致', time: '8天前', location: '上海', likes: '37', sub: true },
  ],
}

export const gardeningUi = {
  id: 'gardening-ui',
  image: imgGardeningUi,
  ratio: '1200 / 1200',
  title: '把园艺的层次感搬进 UI，画面一下安静了',
  author: { name: 'Ayush Soni', handle: '@ayushsoni_io', avatar: AV['@ayushsoni_io'], tint: T.leaf },
  body: ['园艺和 UI 放在一起试试。', '用植物的层次做画面结构，颜色往泥土和叶子靠，整体会安静很多。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-12',
  location: '上海',
  likes: '695',
  stars: '233',
  comments: [
    { user: '小红薯', text: '园艺的层次感搬到界面里居然这么合适', time: '9天前', location: '上海', likes: '27' },
    { user: '设计民工', text: '配色往泥土和叶子靠，一下就安静了', time: '9天前', location: '杭州', likes: '10', sub: true },
  ],
}

export const oilpaintingUi = {
  id: 'oilpainting-ui',
  image: imgOilpaintingUi,
  ratio: '849 / 1200',
  title: '油画笔触放进 UI，界面多了点手作感',
  author: { name: 'Bakers Studio', handle: '@studiobakers', avatar: AV['@studiobakers'], tint: T.clay },
  body: ['试着把油画笔触和 UI 放在一起。', '把笔触当成肌理用，原本很规整的界面也多了点手作感。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-16',
  location: '深圳',
  likes: '1104',
  stars: '372',
  comments: [
    { user: '阿吉', text: '笔触当肌理用，界面一下子有手作感了', time: '9天前', location: '深圳', likes: '41' },
    { user: 'momo', text: '想知道笔刷是画的还是滤镜做的', time: '9天前', location: '北京', likes: '14', sub: true },
  ],
}

/* ---------- 关注的话题：与「关注的人」完全不同的另外 7 条 ---------- */

export const visualWorks = {
  id: 'visual-works',
  image: imgVisualWorks,
  ratio: '877 / 1200',
  title: '最近做的一组视觉练习，先把氛围找对',
  author: { name: 'Aarzoo', handle: '@AarzooAly', avatar: AV['@AarzooAly'], tint: T.rose },
  body: ['最近在做一组视觉练习，先把整体氛围和颜色找对，细节再慢慢收。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-15',
  location: '上海',
  likes: '533',
  stars: '147',
  comments: [
    { user: '小红薯', text: '氛围感拉满，配色克制但很抓人', time: '3天前', location: '上海', likes: '19' },
    { user: '设计民工', text: '这种质感一般怎么做后期？', time: '3天前', location: '杭州', likes: '6', sub: true },
  ],
}

export const otpClaw = {
  id: 'otp-claw',
  image: imgOtpClaw,
  ratio: '1200 / 846',
  title: '把 OTP 验证做成抓娃娃机，输错爪子就松开',
  author: { name: 'Noman', handle: '@Nomandsign', avatar: AV['@Nomandsign'], tint: T.mint },
  body: ['做了个抓娃娃机版 OTP。', '输入验证码时，输错一次爪子就松一下。', 'iamnoman.com/experiments/otp'],
  tag: '#组件/交互',
  category: '组件',
  area: 'UI/视觉',
  time: '09-14',
  location: '深圳',
  likes: '1287',
  stars: '402',
  comments: [
    { user: '一只鹿', text: '输错就掉下来，这个惩罚机制太有意思了', time: '4天前', location: '广州', likes: '44' },
    { user: '南屿', text: '抓娃娃机做 OTP，脑洞可以', time: '4天前', location: '上海', likes: '13', sub: true },
  ],
}

export const nickpylSite = {
  id: 'nickpyl-site',
  image: imgNickpylSite,
  ratio: '1200 / 900',
  title: '把作品和摄影放在同一个个人网站里',
  author: { name: 'Nick Pyl', handle: '@nickpyl', avatar: AV['@nickpyl'], tint: T.gray },
  body: [
    '终于把个人网站整理好了，把作品和摄影放在一起。',
    '之后也想把这里当成试验场，慢慢加些新东西。',
    'nickpyl.space',
  ],
  tag: '#作品集',
  category: '作品集',
  area: 'UI/视觉',
  time: '09-14',
  location: '北京',
  likes: '764',
  stars: '218',
  comments: [
    { user: '桐桐', text: '摄影和作品放一起，比纯作品集耐看多了', time: '4天前', location: '北京', likes: '26' },
    { user: 'momo', text: '想抄一下这个排版结构', time: '4天前', location: '上海', likes: '8', sub: true },
  ],
}

export const weekendExplore = {
  id: 'weekend-explore',
  image: imgWeekendExplore,
  ratio: '1200 / 938',
  title: '周末随手试了几个方向，想用点更跳的颜色',
  author: { name: 'Aditya Induraj', handle: '@indurajaditya', avatar: AV['@indurajaditya'], tint: T.gold },
  body: ['周末做的几个小尝试。', '这次主要想试试更跳一点的配色，先把不同方向都跑一遍。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-14',
  location: '成都',
  likes: '612',
  stars: '176',
  comments: [
    { user: '阿吉', text: '周末作业能做成这样已经很可以了', time: '5天前', location: '深圳', likes: '21' },
    { user: 'Yuki', text: '第二张的渐变好看', time: '5天前', location: '上海', likes: '9', sub: true },
  ],
}

export const hardwareUi = {
  id: 'hardware-ui',
  image: imgHardwareUi,
  ratio: '1000 / 1200',
  title: '把旋钮和开关的感觉，翻译成界面里的控件',
  author: { name: 'Masum', handle: '@masumparvej_', avatar: AV['@masumparvej_'], tint: T.slate },
  body: ['硬件元素放进 UI 里试试。', '把旋钮、开关这些实体控件转成界面语言，重点是把操作感也留下来。'],
  tag: '#组件/交互',
  category: '组件',
  area: 'UI/视觉',
  time: '09-21',
  location: '南京',
  likes: '948',
  stars: '265',
  comments: [
    { user: '老张', text: '硬件的阻尼感用动效表达，思路对了', time: '昨天 09:20', location: '武汉', likes: '35' },
    { user: '林间有风', text: '这种概念稿很适合拿去做提案', time: '昨天 09:48', location: '南京', likes: '12', sub: true },
  ],
}

export const iconSet = {
  id: 'icon-set',
  image: imgIconSet,
  ratio: '1199 / 426',
  title: '这组图标开始有统一的样子了',
  author: { name: 'Benjamin Barrell', handle: '@barrelltech', avatar: AV['@barrelltech'], tint: T.teal },
  body: ['图标集慢慢有点样子了，最近在 Figma 里补了不少细节。', '做成一套以后才发现，统一比单独画好一个更费心。'],
  tag: '#视觉风格',
  category: '视觉',
  area: 'UI/视觉',
  time: '09-21',
  location: '苏州',
  likes: '1102',
  stars: '388',
  comments: [
    { user: '半糖去冰', text: '成体系之后质感一下就上来了', time: '昨天 14:02', location: '苏州', likes: '31' },
    { user: '橙子不加冰', text: '描边和圆角统一了才耐看', time: '昨天 14:36', location: '成都', likes: '11', sub: true },
  ],
}

export const componentGallery = {
  id: 'component-gallery',
  image: imgComponentGallery,
  ratio: '1123 / 970',
  title: '做 UI 时总叫不准组件名，可以看看 component.gallery',
  author: { name: '赵纯想', handle: '@chunxiangai', avatar: AV['@chunxiangai'], tint: T.violet },
  body: [
    '和 AI 对 UI 时，组件名称尽量说准确一点。比如弹窗、下拉菜单、加载状态，叫法对上了沟通会顺很多。',
    'component.gallery',
  ],
  tag: '#组件/交互',
  category: '组件',
  area: 'UI/视觉',
  time: '09-15',
  location: '杭州',
  likes: '2350',
  stars: '910',
  comments: [
    { user: '小红薯', text: '命名这件事真的太影响沟通效率了', time: '6天前', location: '西安', likes: '58' },
    { user: '设计民工', text: '收藏了，下次跟 AI 对齐术语用', time: '6天前', location: '上海', likes: '24', sub: true },
  ],
}

/* ---------- 列表装配：三个页面互不重复 ---------- */

/* 首页（发现）：两列瀑布流，按图片比例大致配平列高 */
export const homeColumns = [
  [colorBalance, bendyDesktop, uiEras],
  [fluidHover, minimalUi, portfolioKeys, blindEmboss],
]

/* 关注的人：与首页完全不同的 7 条 */
export const peopleColumns = [
  [faideBrand, healthtechBrand, alembicDropcaps, gardeningUi],
  [uiPocket, ios6Skeuo, oilpaintingUi],
]

/* 关注的话题：三个代表性场景中「设计灵感与创作」的笔记流，见 scenes.js */
export const topicColumns = sceneColumns

/* 关注页按已关注社区取笔记：
   设计灵感先按原设计稿的两列顺序交错，再拆回两列，首屏排布与设计稿一致；
   Blender / 事件直接用自己的笔记池，其余话题走轮转规则。 */
const interleaveColumns = (columns) =>
  columns[0].flatMap((post, i) => (columns[1][i] ? [post, columns[1][i]] : [post]))

export function notesForFollow(topic) {
  if (!topic || topic.empty) return []
  if (topic.id === 'design-inspire') return interleaveColumns(sceneColumns)
  return notesForTopic(topic)
}

export const peoplePosts = [...peopleColumns[0], ...peopleColumns[1]]

/* 关注页顶部「关注的人」：直接取自关注流里的作者 */
export const followingAuthors = peoplePosts.map((post) => post.author)

/* ---------- 话题：详情页所需的话题简介 / 标签 / 每日要闻 ----------
   顺序 = 关注页「关注的话题」条里的顺序：AI 两个社区排在最前（当前重点），
   设计类社区保留但不再默认关注（可以在笔记里按需关注）。 */

const designTopics = [
  {
    id: 't1', title: 'UI', subtitle: '视觉', seed: 0, noteTags: ['#视觉风格'],
    from: 'rgba(210,255,146,0.5)', to: 'rgba(207,248,253,0.5)',
    desc: '汇集界面与视觉方向的日常灵感，从版式、质感到的风格演变都会在这里沉淀。',
    tags: ['#UI', '#视觉', '#版式', '#质感', '#灵感'],
    news: [
      { date: '2026年10月15日', items: [
        { title: 'iOS 27 给 Liquid Glass 加了透明度滑块', desc: 'iOS 27 在设置里提供从超透明到完全着色的连续调节，并改善复杂背景下的可读性。' },
        { title: 'Windows 11 26H2 开始推送', desc: '26H2 从 9 月底开始推送，24H2 于 10 月 13 日停止支持；2026 年没有 Windows 12 的发布计划。' },
        { title: 'Figma Grid 正式开放', desc: '支持拖动调整行列顺序、自动补位和按内容增减行，复杂版式少一层嵌套。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: 'Figma Config 2026 加入 Motion 时间轴', desc: '关键帧、缓动和弹簧做进画布，动效可以直接在 Figma 文件里完成。' },
        { title: 'Material 3 Expressive 仍是 Android 16 的视觉基线', desc: '更弹的动效、更大的字形与形状系统，已随 Android 16 QPR1 推送到 Pixel。' },
        { title: 'Dribbble 年度视觉趋势', desc: '粗衬线与酸性渐变退热，手绘质感和实用主义排版回潮。' },
      ] },
    ],
  },
  {
    id: 't2', title: '动效', subtitle: '动画', seed: 1, noteTags: ['#动效/动画'],
    from: 'rgba(233,255,106,0.5)', to: 'rgba(249,253,207,0.5)',
    desc: '关注交互动效的曲线、节奏与实现方式，收藏值得反复研究的案例。',
    tags: ['#动效', '#交互', '#缓动', '#微交互', '#实现'],
    news: [
      { date: '2026年10月15日', items: [
        { title: 'View Transitions 全面对齐', desc: 'Safari 与 Chrome 同步支持同文档视图过渡，跨页面动效进入实用期。' },
        { title: 'Motion 14 发布', desc: 'Motion（原 Framer Motion）继续沿用弹簧和手势 API，React 项目升级成本不高。' },
        { title: 'Lottie 仍是动效交付的通用格式', desc: '设计师和开发之间传动画，Lottie 仍是兼容性最稳的选择之一。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: '弹簧动画成为交互默认', desc: '可中断的弹簧比固定时长曲线更接近真实手感，系统级交互里越来越常见。' },
        { title: 'CSS @starting-style 普及', desc: '三大浏览器全部支持声明式入场动画，pop-in 闪烁成为历史。' },
        { title: 'View Transitions 在更多站点落地', desc: '页面切换不再需要手写两套进出场，浏览器原生过渡开始覆盖常见场景。' },
      ] },
    ],
  },
  {
    id: 't3', title: '配色', subtitle: '俱乐部', seed: 2, noteTags: ['#配色'],
    from: 'rgba(244,172,255,0.5)', to: 'rgba(207,253,210,0.5)',
    desc: '讨论配色的平衡与体系化，记录好看的组合与它们背后的取色思路。',
    tags: ['#配色', '#色板', '#渐变', '#对比度', '#取色'],
    news: [
      { date: '2026年10月15日', items: [
        { title: 'Pantone 2026 年度色：云上舞白', desc: '11-4201 Cloud Dancer，潘通历史上第一次把白色选为年度色。' },
        { title: 'OKLCH 渐变工具更新', desc: '新版本支持感知均匀的插值预览，灰色断层问题肉眼可见地消失。' },
        { title: '动态取色扩展到更多场景', desc: '取色算法适配更多壁纸与材质，第三方应用接入门槛降低。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: '深色模式对比度新规', desc: '新文档明确深色下的最低对比阈值，纯灰文字方案面临调整。' },
        { title: 'ColorOS 16 配色系统', desc: '全局色彩 token 化，第三方主题商店开始适配语义色。' },
        { title: 'Adobe 色板云同步', desc: '色板支持跨端实时同步，团队协作不再靠截图对色。' },
      ] },
    ],
  },
  {
    id: 't4', title: '字体', subtitle: '排印', seed: 3, noteTags: ['#字体/排版'],
    from: 'rgba(255,182,221,0.5)', to: 'rgba(207,232,253,0.5)',
    desc: '字体与排印的观测站，从字重选择到标点规则都在关注范围里。',
    tags: ['#字体', '#排印', '#字重', '#标点', '#可变字体'],
    news: [
      { date: '2026年10月15日', items: [
        { title: '思源黑体更新到 2.005', desc: 'Adobe 在 2025 年 6 月发布 2.005；Google 的 Noto Sans CJK 仍停在 2.004，两版更新节奏已经分开。' },
        { title: 'Google Fonts 继续扩充可变字体', desc: '越来越多热门字体提供可变字重，静态字重包更多作为兼容用途保留。' },
        { title: 'Noto Sans Mono CJK 提供中文等宽字形', desc: '覆盖常用汉字与拉丁字符，代码和表格混排时更整齐。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: '思源黑体可变版支持 250–900 连续字重', desc: '2.003 起可以在可变字体支持的软件里连续调字重，不用再为中间粗细单独打包。' },
        { title: '中文排印更强调标点悬挂与行距', desc: '移动端阅读场景里，标点挤压和行距规则开始被单独拿出来讨论。' },
        { title: '人文无衬线回潮', desc: 'Fedra 一类的字风在品牌视觉中回归，多家工作室发布同类新作。' },
      ] },
    ],
  },
  {
    id: 't5', title: '作品', subtitle: '集', seed: 4, noteTags: ['#作品集'],
    from: 'rgba(255,203,106,0.5)', to: 'rgba(207,232,253,0.5)',
    desc: '收集值得学习的个人网站与作品集，看别人如何组织与呈现作品。',
    tags: ['#作品集', '#个人网站', '#案例', '#呈现', '#职业'],
    news: [
      { date: '2026年10月15日', items: [
        { title: '作品集首页更强调项目叙事', desc: '比起只铺图片，越来越多作品集先讲项目背景、过程和结果。' },
        { title: '设计师建站工具继续合并设计与发布', desc: 'Figma Sites、Cargo 这类工具都把排版、域名和发布放进同一条流程。' },
        { title: '一页式主页聚合工具走红', desc: '简历、作品与社交账号聚合为一页链接，设计师率先迁移。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: '作品集微交互指南', desc: '社区整理 30 个作品集动效示例，从悬停到页面过渡全覆盖。' },
        { title: 'Figma Sites 支持绑定自定义域名', desc: '原型可以直接当官网用，省掉从设计稿到建站工具的搬运。' },
        { title: 'PDF 作品集回潮', desc: '招聘方反馈 PDF 仍是最稳的投递格式，印刷版作品集回温。' },
      ] },
    ],
  },
  {
    id: 't6', title: '品牌', subtitle: '方向', seed: 5, noteTags: ['#品牌'],
    from: 'rgba(210,255,146,0.5)', to: 'rgba(207,248,253,0.5)',
    desc: '品牌方向的探索记录，从字标气质到落地物料的一致性。',
    tags: ['#品牌', '#VI', '#字标', '#方向', '#落地'],
    news: [
      { date: '2026年10月15日', items: [
        { title: 'AI 公司品牌焕新潮', desc: '多家模型公司更新字标与版式，衬线组合首次成体系公开。' },
        { title: '钛金属质感成新品关键词', desc: '硬件品牌新品视觉统一采用钛色与拉丝纹理，强调工艺感。' },
        { title: '动态标识规范指南', desc: '动效品牌书开始标配响应曲线与最小尺寸规范。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: '国货美妆换新包装', desc: '一批国货品牌集体升级视觉，插画与字标更强调手作感。' },
        { title: '字体授权打包进品牌服务', desc: '更多工作室把字体授权并入品牌交付，减少后期纠纷。' },
        { title: '品牌项目更早把字体授权算进预算', desc: '字体授权从交付后补票，变成品牌报价里提前列明的一项。' },
      ] },
    ],
  },
  {
    id: 't7', title: '素材', subtitle: '站点', seed: 6, noteTags: ['#素材/站点', '#组件/交互'],
    from: 'rgba(233,255,106,0.5)', to: 'rgba(249,253,207,0.5)',
    desc: '好用的设计素材与工具站点，按用途整理，随取随用。',
    tags: ['#素材', '#工具', '#图库', '#图标', '#效率'],
    news: [
      { date: '2026年10月15日', items: [
        { title: '组件命名参考库继续扩充', desc: 'component.gallery 按组件类型整理命名，适合在搭设计系统前快速对齐叫法。' },
        { title: 'UI Pocket 更新', desc: '免登录的 App UI 图库补充 2026 界面截图，支持按平台筛选。' },
        { title: 'unDraw 仍是免费 SVG 插画的主要来源', desc: '2000 多套统一风格插画，可在线改主色后直接导出 SVG 或 PNG。' },
      ] },
      { date: '2026年10月14日', items: [
        { title: 'Iconify 图标破 20 万', desc: '聚合 150 多个开源图标集，统一语法调用，也能接入 Figma。' },
        { title: '界面灵感库更强调按流程收藏', desc: 'Mobbin 这类工具不再只按页面分类，开始按注册、搜索、结算等流程整理。' },
        { title: '免费素材站仍是设计师的默认起点', desc: '社区常用的素材站里，免费工具仍占大多数。' },
      ] },
    ],
  },
]

/* 全部社区：三个代表性场景在最前，设计类社区随后 */
export const topics = [...sceneTopics, ...designTopics]

/* ---------- 「关注的话题」条 ----------
   bracket = 场景类型，界面语言统一为：{ } 主题社区 / ( ) 事件追踪。
   指向三个场景：主题社区「设计灵感」、主题社区「Blender」、事件追踪「V800 事件」，
   名字都压在 6 字以内。占位项也均为主题社区，统一 { }。 */
export const topicChips = [
  {
    id: 'chip-scene-1', title: '设计', subtitle: '灵感', topicId: 'design-inspire', bracket: 'brace',
    from: 'rgba(106,185,255,0.5)', to: 'rgba(253,237,207,0.5)',
  },
  {
    id: 'chip-scene-2', title: 'Blender', subtitle: '实战', topicId: 'blender', bracket: 'brace',
    from: 'rgba(178,242,255,0.5)', to: 'rgba(214,255,203,0.5)',
  },
  {
    id: 'chip-scene-3', title: 'V800', subtitle: '事件', topicId: 'event-watch', bracket: 'paren', ink: '#000',
    from: 'rgba(233,255,106,0.5)', to: 'rgba(249,253,207,0.5)',
  },
  {
    id: 'chip-car', title: '车友', subtitle: '俱乐部', bracket: 'brace',
    from: 'rgba(210,255,146,0.5)', to: 'rgba(207,248,253,0.5)',
  },
  {
    id: 'chip-listen', title: '一起听', subtitle: '播客', bracket: 'brace',
    from: 'rgba(244,172,255,0.5)', to: 'rgba(207,253,210,0.5)',
  },
  {
    id: 'chip-hearth', title: '炉石', subtitle: '杂谈', narrow: true, bracket: 'brace',
    from: 'rgba(255,203,106,0.5)', to: 'rgba(207,232,253,0.5)',
  },
]

/* ---------- 关注闭环所需的话题元信息 ----------
   members / noteCount：社区规模，用于笔记页的社区入口卡片说明。
   这些字段与 topics 本身分开维护，避免污染设计稿还原用的原始字段。 */
const TOPIC_META = {
  'design-inspire': { members: 18642, noteCount: 1284 },
  /* Blender 计入实际收录的 8 条 X 原帖教程与经验；事件追踪按当前来源帖计数。 */
  blender: { members: 9630, noteCount: 8 },
  'event-watch': { members: 2150, noteCount: eventPosts.length },
  t1: { members: 12483, noteCount: 1842 },
  t2: { members: 8621, noteCount: 1204 },
  t3: { members: 6450, noteCount: 968 },
  t4: { members: 4312, noteCount: 715 },
  t5: { members: 9876, noteCount: 1533 },
  t6: { members: 5217, noteCount: 806 },
  t7: { members: 7394, noteCount: 1128 },
}

topics.forEach((topic) => Object.assign(topic, TOPIC_META[topic.id]))

/* ---------- 关注状态 ----------
   「关注的话题」条只显示已关注的社区；设计稿里的静态装饰 chip 除外。
   三个场景默认已关注，保证首屏和原来一致；取消关注后对应 chip 会消失，
   重新关注后回到原位置。其余社区默认未关注，关注后追加到话题条末尾。 */
export const INITIAL_FOLLOW = {
  'design-inspire': { followed: true },
  blender: { followed: true },
  'event-watch': { followed: true },
  t1: { followed: false },
  t2: { followed: false },
  t3: { followed: false },
  t4: { followed: false },
  t5: { followed: false },
  t6: { followed: false },
  t7: { followed: false },
}

/* ---------- 笔记 → 社区：只给做过适配的社区挂入口 ----------
   关注页话题条默认关注的 3 个场景（设计灵感 / Blender / V800 事件）保留入口；
   发现页额外保留「配色俱乐部」，从首页那条配色笔记进入，社区页已有配色灵感模块。
   其余社区暂不做单独适配，笔记详情不显示社区卡片，避免点进去只有空壳。
   实际命中：关注话题流全部有入口；发现页仅 color-balance 一条；关注的人不挂。 */
const POST_COMMUNITY = {
  /* 主题社区「设计灵感」的 10 条笔记（话题流每张卡片都能标出来源） */
  'ins-cicely-brand': 'design-inspire',
  'ins-cold-type': 'design-inspire',
  'ins-timeline-pinch': 'design-inspire',
  'ins-time-widget': 'design-inspire',
  'ins-stupido-theme': 'design-inspire',
  'ins-movie-color': 'design-inspire',
  'ins-travel-pictograms': 'design-inspire',
  'ins-stamp-halftone': 'design-inspire',
  'ins-starwars-1977': 'design-inspire',
  'ins-kurppa-signage': 'design-inspire',

  /* 主题社区「Blender」的 8 条笔记 */
  'bl-fracturing': 'blender',
  'bl-slinky': 'blender',
  'bl-nodes-tsl': 'blender',
  'bl-geonodes-web': 'blender',
  'bl-env-rocks': 'blender',
  'bl-points-curve': 'blender',
  'bl-modular-city': 'blender',
  'bl-wireframe': 'blender',

  /* 事件追踪「V800」的 4 条笔记 */
  'event-zunjie-investigation': 'event-watch',
  'event-zunjie-response': 'event-watch',
  'event-zunjie-inspection': 'event-watch',
  'event-zunjie-test': 'event-watch',

  /* 发现页唯一保留的社区入口：配色俱乐部（t3） */
  'color-balance': 't3',
}

/* 笔记 → 社区：先查白名单，查不到就不挂卡片（返回 null，由调用方隐藏入口） */
export function topicForPost(post) {
  if (!post) return null
  const id = POST_COMMUNITY[post.id]
  return id ? topics.find((topic) => topic.id === id) ?? null : null
}

/* 话题页的笔记：优先取同分类的帖子，其余按话题序号轮转补齐，页内不重复 */
const ALL_NOTES = [
  ...scenePosts,
  fluidHover, minimalUi, portfolioKeys, bendyDesktop, blindEmboss, colorBalance, uiEras,
  faideBrand, healthtechBrand, uiPocket, alembicDropcaps, ios6Skeuo, gardeningUi, oilpaintingUi,
  visualWorks, otpClaw, nickpylSite, weekendExplore, hardwareUi, iconSet, componentGallery,
]

/* 有独立真实素材的场景直接用自己的帖子池：
   设计灵感 = 10 条作品与经验分享；Blender = 8 条 X 原帖教程与经验；
   事件追踪按现有来源记录展示。
   不参与轮转补齐，避免把无关笔记混进这些社区。 */
const SCENE_NOTES = {
  'design-inspire': scenePosts,
  blender: blenderPosts,
  'event-watch': eventPosts,
}

/* 主题没有可用素材时不轮转补齐：宁可空着，也不拿无关内容凑数 */
export function notesForTopic(topic) {
  if (!topic || topic.empty) return []
  const own = SCENE_NOTES[topic.id]
  if (own) return own
  if (!topic.noteTags.length) return []
  const matched = ALL_NOTES.filter((post) => topic.noteTags.includes(post.tag))
  const rest = ALL_NOTES.filter((post) => !matched.includes(post))
  const shift = topic.seed % Math.max(1, rest.length)
  const rotated = [...rest.slice(shift), ...rest.slice(0, shift)]
  return [...matched, ...rotated].slice(0, 8)
}
