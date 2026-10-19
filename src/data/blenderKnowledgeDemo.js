import imageChair from '../assets/bl-demo-chair.webp'
import imageMetal from '../assets/bl-demo-metal.webp'
import imageLight from '../assets/bl-demo-light.webp'
import imageCamera from '../assets/bl-demo-camera.webp'
import imageTerrain from '../assets/bl-demo-terrain.webp'
import imageCycles from '../assets/bl-demo-cycles.webp'
import avMori from '../assets/avatar-demo-1.webp'
import avKai from '../assets/avatar-demo-2.webp'
import avYuna from '../assets/avatar-demo-3.webp'
import avLena from '../assets/avatar-demo-4.webp'
import avAda from '../assets/avatar-demo-5.webp'
import avSofia from '../assets/avatar-demo-6.webp'

/* 知识页瀑布流的演示笔记：帖子、作者与配图均为原型示意，不对应真实原帖。 */
export const blenderDemoTutorials = [
  {
    id: 'bl-demo-chair', demo: true, image: imageChair, ratio: '1024 / 693',
    title: '从一把旧椅子开始，练一遍低模结构',
    author: { name: 'Mori', handle: '@mori_lowpoly', avatar: avMori },
    body: ['先把大形用几个方块定下来，再处理椅背、扶手和腿的衔接。', '教程用的是很基础的挤出和环切，适合拿来熟悉编辑模式。'],
    category: '建模', topics: ['建模'], kind: '技巧分享',
    tag: '#建模', contentType: '经验', area: '3D',
    time: '10-08', location: '', likes: null, stars: null, comments: [],
  },
  {
    id: 'bl-demo-metal', demo: true, image: imageMetal, ratio: '768 / 1024',
    title: '金属上的划痕和指纹，用粗糙度变化就能做',
    author: { name: 'Kai', handle: '@kai_render', avatar: avKai },
    body: ['同一块金属，把粗糙度拉出高低变化，划痕和指纹就会自己显出来。', '演示只用了基础节点，没有贴图也能试。'],
    category: '材质', topics: ['材质'], kind: '技巧分享',
    tag: '#材质', contentType: '经验', area: '3D',
    time: '09-30', location: '', likes: null, stars: null, comments: [],
  },
  {
    id: 'bl-demo-light', demo: true, image: imageLight, ratio: '1024 / 768',
    title: '三盏灯加反光板，把产品边缘交代清楚',
    author: { name: 'Yuna', handle: '@yuna_light', avatar: avYuna },
    body: ['主光负责形体和明暗，两盏侧光把边缘提出来，再用反光板补暗部。', '场景很小，很适合照着摆一遍。'],
    category: '灯光', topics: ['灯光'], kind: '技巧分享',
    tag: '#灯光', contentType: '经验', area: '3D',
    time: '09-26', location: '', likes: null, stars: null, comments: [],
  },
  {
    id: 'bl-demo-camera', demo: true, image: imageCamera, ratio: '768 / 1024',
    title: '让相机沿曲线走，做一段产品展示动画',
    author: { name: 'Lena', handle: '@lena_motion', avatar: avLena },
    body: ['把相机绑到曲线上，调整关键帧的速度，就能得到一段平稳的环绕镜头。', '这篇把路径和关键帧的关系讲得很直白。'],
    category: '动画', topics: ['动画'], kind: '技巧分享',
    tag: '#动画', contentType: '经验', area: '3D',
    time: '09-22', location: '', likes: null, stars: null, comments: [],
  },
  {
    id: 'bl-demo-terrain', demo: true, image: imageTerrain, ratio: '1024 / 900',
    title: '用几何节点把树随机种到山坡上',
    author: { name: 'Ada', handle: '@ada_nodes', avatar: avAda },
    body: ['先做阶梯地形，再用几何节点控制树木的分布和朝向。', '密度和随机范围都能随时改，适合先摸清实例化的思路。'],
    category: '几何节点', topics: ['几何节点'], kind: '技巧分享',
    tag: '#几何节点', contentType: '经验', area: '3D',
    time: '09-18', location: '', likes: null, stars: null, comments: [],
  },
  {
    id: 'bl-demo-cycles', demo: true, image: imageCycles, ratio: '1024 / 693',
    title: 'Cycles 采样开到多少？拿这个玻璃瓶对比一下',
    author: { name: 'Sofia', handle: '@sofia_cycles', avatar: avSofia },
    body: ['同一张画面，分别用低采样和高采样渲染，噪点和玻璃折射的差别很直观。', '如果只是看大效果，低采样先跑一遍会快很多。'],
    category: '渲染', topics: ['渲染'], kind: '技巧分享',
    tag: '#渲染', contentType: '经验', area: '3D',
    time: '09-14', location: '', likes: null, stars: null, comments: [],
  },
]
