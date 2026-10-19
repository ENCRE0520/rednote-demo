import { scenePosts, blenderPosts, sceneTopics } from './scenes.js'
import { blenderResearchPosts } from './blenderResearch.js'
import { blenderDemoTutorials } from './blenderKnowledgeDemo.js'

const blenderKnowledgeSources = [...blenderResearchPosts, ...blenderDemoTutorials]

const postsById = new Map([...scenePosts, ...blenderPosts, ...blenderKnowledgeSources].map(post => [post.id, post]))
const selectPosts = ids => ids.map(id => postsById.get(id)).filter(Boolean)

// shortcut: 尚无近期热度数据，先展示有来源的方向样本，接入真实热度后再排序。
export const designDirections = [
  { id: 'tactile', title: '印刷质感', description: '用纸张肌理、齿孔与网点传达质感。', related: ['type'], posts: selectPosts(['ins-cicely-brand', 'ins-stamp-halftone']) },
  { id: 'time', title: '时间交互', description: '对比时间线的缩放探索与组件的快速查看。', related: ['motion'], posts: selectPosts(['ins-timeline-pinch', 'ins-time-widget']) },
  { id: 'type', title: '字体排版', description: '通过字形与编排建立视觉识别。', related: ['tactile', 'color'], posts: selectPosts(['ins-cold-type', 'ins-kurppa-signage', 'ins-typography-now']) },
  { id: 'motion', title: '卡片动效', description: '用连续动效解释内容与状态的变化。', related: ['time'], posts: selectPosts(['ins-photo-card-motion', 'ins-timeline-pinch']) },
  { id: 'color', title: '影像配色', description: '从电影与历史界面提取色彩关系。', related: ['type'], posts: selectPosts(['ins-movie-color', 'ins-starwars-1977']) },
  { id: 'systems', title: '品牌系统', description: '观察系列作品中固定与变化的视觉元素。', related: ['type', 'tactile'], posts: selectPosts(['ins-generative-covers', 'ins-what-matters-guidelines']) },
].map(item => ({ ...item, kind: 'design', summary: item.description }))

export const blenderDirections = [
  { id: 'environments', title: '程序化环境与城市', description: '用几何节点探索自然环境与模块化城市。', posts: selectPosts(['bl-env-rocks', 'bl-modular-city']) },
  { id: 'simulation', title: '形态与动态模拟', description: '破碎效果与弹簧玩具模拟，连接技术尝试和作品表达。', posts: selectPosts(['bl-fracturing', 'bl-slinky']) },
  { id: 'web', title: '从节点到网页', description: '把 Blender 的节点实践连接到网页端与资产工作流。', posts: selectPosts(['bl-geonodes-web', 'bl-nodes-tsl']) },
]

export const blenderKnowledge = [
  { id: 'modeling', title: '建模', icon: '\ue9c4', summary: '建立物体的形状与结构，为材质、动画和渲染提供基础。', category: '建模' },
  { id: 'materials', title: '材质', icon: '\ue752', summary: '用材质描述表面的颜色、质感，以及它如何与光相互作用。', category: '材质' },
  { id: 'lighting', title: '灯光', icon: '\ueb14', summary: '通过光源与环境光呈现形体、明暗和材质的细节。', category: '灯光' },
  { id: 'animation', title: '动画', icon: '\ueb2c', summary: '让物体的位置、形态或其他属性随时间变化。', category: '动画' },
  { id: 'geometry', title: '几何节点', icon: '\ue8e4', summary: '通过节点处理几何，生成形体、环境与重复元素。', category: '几何节点' },
  { id: 'rendering', title: '渲染', icon: '\ue716', summary: '把三维场景转成可展示的图像或动画，连接相机、灯光与材质。', category: '渲染' },
].map(item => ({
  ...item,
  kind: 'knowledge',
  posts: [
    ...blenderKnowledgeSources.filter(post => post.topics.includes(item.category)),
    ...blenderPosts.filter(post => post.category === item.category),
  ],
}))

// shortcut: 路径按现有资料预设，接入目标理解能力后再支持个人学习目标。
export const blenderRoutes = [
  {
    id: 'still-route', kind: 'route', title: '做出第一张静帧', summary: '从建模、材质到布光和渲染，做出第一张静帧。', level: '入门',
    goal: '拿一个简单模型，走完建模、材质、布光和渲染，做出自己的第一张完整静帧。',
    outcome: '能独立完成一张有形体、材质和光影的静帧，知道每个环节分别在解决什么问题。',
    steps: [
      { title: '建出简单形体', knowledge: 'modeling', text: '先用方块定大形，再处理椅背、扶手和腿的衔接。做到轮廓干净、比例站得住。', posts: selectPosts(['bl-demo-chair']) },
      { title: '做出表面质感', knowledge: 'materials', text: '只调粗糙度的变化，做出金属上的划痕和指纹。做到同一块表面能看出磨损的层次。', posts: selectPosts(['bl-demo-metal']) },
      { title: '把形体照亮', knowledge: 'lighting', text: '主光定明暗，两盏侧光提边缘，再用反光板补暗部。做到主体和背景分得开。', posts: selectPosts(['bl-demo-light']) },
      { title: '渲染并检查画面', knowledge: 'rendering', text: '同一张画面先用低采样跑一遍，再提高采样清理噪点。做到知道什么效果需要多少采样。', posts: selectPosts(['bl-demo-cycles']) },
    ],
  },
  {
    id: 'product-route', kind: 'route', title: '给产品做一段展示动画', summary: '布光、相机运动和调色，做一段展示镜头。', level: '进阶',
    goal: '把模型放进镜头里：先检查细节和布光，再安排相机运动，最后统一颜色。',
    outcome: '能围绕一个模型布光、安排镜头运动并完成调色，做出一段完整的展示动画。',
    steps: [
      { title: '检查模型细节', knowledge: 'modeling', text: '看模型转折处的面是否连续，避免镜头靠近时出现折痕。先把要入镜的部分整理干净。', posts: selectPosts(['bl-research-eyes']) },
      { title: '布一组产品光', knowledge: 'lighting', text: '用三点布光把模型交代清楚，注意主体、背景和边缘的明暗关系。', posts: selectPosts(['bl-research-light']) },
      { title: '让相机沿曲线走', knowledge: 'animation', text: '把相机绑到曲线上，调整关键帧的速度。做到起停不急，镜头运动平稳。', posts: selectPosts(['bl-demo-camera']) },
      { title: '出片前调色', knowledge: 'rendering', text: '用示波器看明暗，再用色轮和曲线统一颜色。做到产品颜色和背景都干净。', posts: selectPosts(['bl-research-grade']) },
    ],
  },
  {
    id: 'environment-route', kind: 'route', title: '搭一片几何节点环境', summary: '用地形、植被和实例，搭一块可复用的场景。', level: '进阶',
    goal: '用几何节点做地形、种树，再用实例把城市模块铺开，搭出一块完整的场景。',
    outcome: '能搭出一块有地形、植被和建筑模块的场景，知道怎样用实例控制重复元素。',
    steps: [
      { title: '地形与分布', knowledge: 'geometry', text: '先做阶梯地形，再用节点控制树的分布和朝向。做到密度和范围都能随时改。', posts: selectPosts(['bl-demo-terrain']) },
      { title: '岩石与草地', knowledge: 'geometry', text: '参考岩石和草地的分布方式，把零散元素放进同一套节点里。做到近看有细节、远看有层次。', posts: selectPosts(['bl-env-rocks']) },
      { title: '模块化实例', knowledge: 'geometry', text: '用实例组织重复的城市元素。做到改一处规则，整片场景一起更新。', posts: selectPosts(['bl-modular-city']) },
    ],
  },
  {
    id: 'web-route', kind: 'route', title: '把节点效果搬进网页', summary: '把 Blender 效果搬到浏览器里展示。', level: '进阶',
    goal: '把 Blender 里的几何与材质效果搬到网页里展示，并在导出前整理好资产。',
    outcome: '能区分形体和表面，把节点思路对应到网页工具，并在导出前整理好资产。',
    steps: [
      { title: '先做出效果', knowledge: 'materials', text: '用线框或节点材质做一个容易辨认的效果。做到只看画面就知道要搬什么。', posts: selectPosts(['bl-wireframe']) },
      { title: '搬进网页', knowledge: 'geometry', text: '参考 Three.js 的做法，把节点逻辑换成网页里的几何与材质。做到能在浏览器里转动查看。', posts: selectPosts(['bl-geonodes-web']) },
      { title: '转成 TSL 并整理资产', knowledge: 'materials', text: '把节点材质对应到 TSL，同时整理要用的贴图和模型。做到打开页面就能看到完整效果。', posts: selectPosts(['bl-nodes-tsl']) },
    ],
  },
]

const eventTopic = sceneTopics.find(topic => topic.id === 'event-watch')
export const eventEvidence = [
  { title: '监管核查', date: '2026年10月15日', text: '三部门已成立联合调查组，结论待公布。', item: eventTopic.news[0].items[0] },
  { title: '企业回应', date: '2026年10月15日', text: '企业声明将配合联合调查。', item: eventTopic.news[0].items[1] },
  { title: '检测条件', date: '2026年10月13日', text: '静态台架检测，与连续紧急制动工况不同。', item: eventTopic.news.find(group => group.date === '2026年10月13日').items[0] },
]

export const eventOpenQuestions = ['连续制动工况下的断裂原因。', '测试条件与实际使用场景的差异。', '监管调查结论与责任认定。']
