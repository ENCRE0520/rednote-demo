import { blenderPosts, designFeaturedPosts } from './scenes.js'
import { blenderResearchPosts } from './blenderResearch.js'
import { designStyles } from './designStyles.js'
import { blenderKnowledge, blenderRoutes } from './communityPreview.js'
/* 三个主场景之外的社区（配色俱乐部等）用的是通用笔记池，来源也要能从这里取到 */
import { colorBalance, weekendExplore, visualWorks, gardeningUi, oilpaintingUi } from './posts.js'

/* AI 回答里挂的入口：直接指回社区里已有的结构（知识节点 / 学习路径），
   不是新造一层导航。找不到就退化为没有入口。 */
const communityLink = (kind, id, label) => {
  const target = kind === 'knowledge'
    ? blenderKnowledge.find(node => node.id === id)
    : blenderRoutes.find(route => route.id === id)
  return target ? { label, target } : null
}

const designStylePosts = designStyles.flatMap(style => style.posts)
const generalPosts = [colorBalance, weekendExplore, visualWorks, gardeningUi, oilpaintingUi]
const postById = new Map(
  [...designFeaturedPosts, ...designStylePosts, ...blenderPosts, ...blenderResearchPosts, ...generalPosts]
    .map(post => [post.id, post]),
)

const postSource = (id) => {
  const post = postById.get(id)
  if (!post) return null
  return {
    id: post.id,
    title: post.title,
    image: post.image,
    meta: post.author?.name ?? '社区笔记',
    /* 带上整篇笔记：点来源就能回到原帖，而不是停在一条引用上 */
    post,
  }
}

const pickSources = (...ids) => ids.map(postSource).filter(Boolean)

const shortDate = date => date.replace(/^\d{4}年/, '').replace('月', '-').replace('日', '')

const eventSources = (topic) => (topic.news ?? []).flatMap(group =>
  group.items.map(item => ({
    id: `news-${item.title}`,
    title: item.title,
    image: item.image,
    tag: item.cat ?? '来源',
    meta: `${item.sourceName ?? '公开报道'} · ${shortDate(group.date)}`,
  })),
)

const topicLabel = (topic) => {
  if (!topic.subtitle) return topic.title
  return /^[A-Za-z0-9]/.test(topic.title)
    ? `${topic.title} ${topic.subtitle}`
    : `${topic.title}${topic.subtitle}`
}

const design = {
  greeting: '我在看「设计灵感」社区里的作品、风格和制作笔记。你可以问我最近在关注什么风格，也可以让我帮你找相近的作品。',
  suggestions: [
    '社区最近在关注什么风格？',
    '半调图像适合用在哪里？',
    '这几篇作品为什么放在一起？',
  ],
  replies: [
    {
      match: /风格|趋势|最近|关注什么/,
      text: `## 社区里现在比较集中的三类
- **印刷质感**：网点、套色、纸张肌理。常出现在海报、杂志封面和服饰印花里。
- **ASCII 设计**：用可辨认的字符构成图像，把终端界面的秩序带进视觉设计。
- **柔性美学**：低饱和粉彩、晕染渐变、细颗粒和圆润的有机形态。

## 怎么看这个判断
这三类是按社区里收录的作品归纳的，不是全站热度。它们经常出现在海报、品牌和音乐视觉里，但同一类风格换到不同载体上，做法差别很大——比如半调在海报上是纹理，放到界面里就只是一层噪点。

## 想继续看
下面三篇分别是这三类里比较有代表性的作品，点开能看到作者具体是怎么做的。`,
      sources: pickSources('style-halftone-poster', 'style-ascii-shader', 'style-soft-wordmark'),
      sourceLabel: '相关作品',
    },
    {
      match: /半调|网点|halftone/i,
      text: `## 半调图像在做什么
把连续的明暗拆成疏密不同的网点：近看是点，远看还能认出形状。它处理的不是颜色，是明暗的过渡方式。

## 适合用在哪
- 音乐海报、杂志封面、服饰印花——需要一点旧印刷品质感的地方。
- 主视觉或者背景层；正文和关键操作不要放进去。

## 两个要注意的
- **缩小会丢细节**。网点一旦糊掉，画面就只剩一层灰，标题附近要留干净区域。
- **不要铺满整张图**。只给背景加网点、主体保留照片细节，前后景的层次反而更清楚。

下面两篇正好是这两种用法：一篇铺满，一篇只做背景，可以对照着看。`,
      sources: pickSources('style-halftone-poster', 'style-halftone-depth'),
      sourceLabel: '相关作品',
    },
    {
      match: /为什么|放在一起|关联|相似|一起/,
      text: `## 放在一起的依据
不是标题像，是都在做同一件事：**先用一个简单的结构把画面撑住，再用一种质感统一细节**。

## 拆开看
- 半调那组：先处理明暗关系，再叠网点纹理。结构在前，质感在后。
- 品牌那组：先定字形和网格，再换配色。骨架不变，表面在变。

## 怎么用这个思路
再看其他作品时，可以按这两层问：它的结构是什么（网格、字形、构图），它的质感是什么（纹理、颗粒、渐变）。两层都对得上，才算真的看懂了——这也是我判断「相近」的依据。`,
      sources: pickSources('style-halftone-poster', 'ins-cicely-brand', 'ins-cold-type'),
      sourceLabel: '相关作品',
    },
  ],
  fallback: '这个社区里我还没找到足够一致的答案。你可以问我某个风格的特征、适合的场景，或者让我找相近的作品。',
}

const blender = {
  greeting: '我在看「Blender 实战」社区里的教程和作品。你可以问我某个知识点怎么开始，也可以让我按你的目标找一条学习顺序。',
  suggestions: [
    '石头怎么随机撒在山坡上？',
    '几何节点应该从哪开始学？',
    '我想做程序化环境，先学什么？',
  ],
  replies: [
    {
      /* 具体到一件事的问题优先命中：先给做法，再把来源还给原作者 */
      match: /石头|山坡|撒|分布|随机|岩石|地形|种树|草地/,
      text: `## 先把这件事拆成两件
撒石头不是「放很多石头」，而是两件事：先在坡面上生成点，再把石头挂到点上。密度和范围的问题都发生在第一件，第二件只负责决定挂什么、怎么挂。

## 四步这样做
1. **在地形表面分布点**：给地形加 \`Distribute Points on Faces\`，用密度控制疏密。想让石头避开陡坡，可以先按坡度或法线筛一遍，再往下传。
2. **把石头挂到点上**：用 \`Instance on Points\` 把石头集合放上去。石头本身是另一个集合——后面改石头，整片一起变，不用重排。
3. **给每个实例加随机**：用 \`Random Value\` 驱动旋转和缩放。同一块石头重复出现时，这一步是唯一能救回来的地方。
4. **让石头贴住坡面**：用 \`Align Rotation to Vector\` 对齐法线，石头才不会悬空，也不会插进地里。

## 调的时候容易卡的地方
- 石头数量上不去，先回去看分布那一步的密度，不是实例那一步。
- 上高精度之前，先用一个低模代理跑一遍，确认分布范围是对的。
- 这套写法在 3.x 之后差别不大；2.9x 里实例化的节点名不同，照旧教程做要先对版本。

下面三篇分别对应「分布」「实例化」和「整片一起改」这三步，点开能看到作者具体怎么接。`,
      sources: pickSources('bl-research-tube', 'bl-env-rocks', 'bl-modular-city'),
      sourceLabel: '可以照着做的笔记',
      link: communityLink('knowledge', 'geometry', '去「几何节点」知识库'),
    },
    {
      match: /顺序|系统|路径|学完|接着|下一步|先学什么/,
      text: `## 社区里已经排好一条路径
你想知道的可能不是「这次怎么撒石头」，而是「几何节点这件事怎么学会」。那可以先走**搭一片几何节点环境**：

1. **地形与分布**：先做地形，再用节点控制树的分布和朝向，做到密度和范围随时能改。
2. **岩石与草地**：把零散的自然元素放进同一套节点里，做到近看有细节、远看有层次。
3. **模块化实例**：用实例组织重复元素，做到改一处规则，整片场景一起更新。

## 为什么是这个顺序
前两步解决「一片地上有东西」，第三步才解决「这些东西好改」。跳过前两步直接学实例，很容易做出一堆看着成立、但完全没法调的场景。

## 版本提醒
路径里引用的笔记标了适用版本（比如 2.92）。几何节点在 3.x 之后改过节点名和字段，照旧教程做的时候先看一眼版本——节点找不到通常是版本问题，不是你做错了。`,
      sources: pickSources('bl-env-rocks', 'bl-modular-city'),
      sourceLabel: '路径里的笔记',
      link: communityLink('route', 'environment-route', '看这条学习路径'),
    },
    {
      match: /几何节点|节点|从哪|入门/i,
      text: `## 先理解一条链
几何节点大部分组合都在做同一件事：**点 → 实例 → 变换**。先把这条链跑通，后面学的每个节点才有地方放。

## 从哪开始
1. **实例化 + 集合**：把点分布到一个面上，再用实例化把物体放上去。这一步做完，你就知道几何节点到底在改什么了。
2. **属性传递和场**：之后学的节点基本都在做这两件事——把信息从一处传到另一处，或者用场去描述一片区域。
3. **再做程序化的东西**：地形、植被、城市，都是前面两步的组合，不是新的一套东西。

## 一个提醒
几何节点在 3.x 之后改过节点名和字段。社区里有些笔记标的是 2.92，照着做之前先对一下版本。`,
      sources: pickSources('bl-research-tube', 'bl-env-rocks'),
      sourceLabel: '来源笔记',
    },
    {
      match: /材质|灯光|渲染|打光/i,
      text: `## 两个问题分开看
材质决定表面看起来是什么，灯光决定这些表面怎么被看见。混在一起调，很容易一直改材质、却觉得是光不对。

## 建议的顺序
1. **先用一张环境贴图把整体光定下来**：这一步决定画面基调，后面所有的灯都在这个基础上加。
2. **再补一盏主光看形体和阴影**：只加一盏，确认主体和背景分得开。
3. **最后才调材质**：粗糙度、金属度这类参数，要在光定下来之后判断才准。

## 容易踩的
- 不要一开始就堆很多灯。灯越多，越难判断是哪一盏在起作用。
- 材质看起来「脏」，先查粗糙度有没有变化——很多时候缺的就是一层划痕或指纹的层次。
- 噪点多别急着拉满采样：先用低采样确认构图和光，再提高采样清理噪点。`,
      sources: pickSources('bl-wireframe', 'bl-research-light'),
      sourceLabel: '来源笔记',
    },
    {
      match: /环境|程序化|城市|路线|目标/i,
      text: `## 如果你的目标是程序化环境
顺序是：几何节点基础 → 用点分布做岩石和草地 → 用实例做模块化城市。社区里「搭一片几何节点环境」就是按这个顺序排的。

## 每一步要拿到的东西
1. **几何节点基础**：能自己把点分布到面上，并把物体挂上去。
2. **岩石和草地**：能让一片地上出现有层次的自然元素，密度可控。
3. **模块化城市**：能把重复元素做成实例，改一处规则整片一起更新。

## 一句提醒
这个顺序不能倒：先会分布，才谈得上密度；先会实例，才谈得上复用。倒过来学，做出来的场景往往改不动。`,
      sources: pickSources('bl-env-rocks', 'bl-modular-city'),
      sourceLabel: '来源笔记',
    },
  ],
  fallback: '这个社区里我还没找到足够一致的答案。你可以问我某个知识点、某条学习路线，或者让我帮你找相关作品。',
}

const event = (topic) => {
  const sources = eventSources(topic)
  const byCat = cat => sources.find(source => source.tag === cat) ?? null
  return {
    greeting: '我在看「V800 事件」社区里的公开报道和官方通报。你可以问我现在确认了什么、各方说法差在哪，或者下一步该看什么。',
    suggestions: [
      '现在确认了什么？',
      '各方说法差在哪？',
      '下一步看什么？',
    ],
    replies: [
      {
        match: /确认|现在|进展|结论|到哪/,
        text: `## 截至 10 月 17 日，能确认的是这些
- **三部门已成立联合调查组**（10 月 15 日，工信部等），企业表示配合。
- **两件事不是同一工况**：企业公布的是第三方静态台架检测，媒体做的是 100km/h 连续紧急制动。两者不能直接互相否定。

## 还不能下结论的
- 调查结论尚未公布，断裂原因和责任都还没有官方说法。
- 企业的静态检测结果只说明它在那个条件下没坏，不覆盖连续制动的工况。

## 怎么看
时间线上每个节点都标了来源机构。想知道哪句是官方说的、哪句是谁的经验，点开节点看一眼就行，不用靠我一句话概括。`,
        sources: [byCat('监管'), byCat('企业回应'), byCat('媒体测试')].filter(Boolean),
        sourceLabel: '来源报道',
      },
      {
        match: /说法|各方|差|企业|媒体|官方|回应/,
        text: `## 三方在说三件不同的事
- **官方**：目前只确认成立联合调查组，没有公布结论。
- **企业**：公布的静态检测说，把静态纵向载荷加严至 3000N 未见裂纹或损坏。
- **媒体**：测试视频显示三辆车在连续紧急制动中断裂，并追问断裂原因与是否该召回。

## 为什么不能直接比
三方的测试对象、条件和目的都不一样：一个是静态台架，一个是实车连续制动，一个是程序性回应。把它们排在同一条线上，很容易读成「互相打脸」，实际上不是。

## 我的建议
在没有官方结论之前，这三类都当线索看，不要当结论用。`,
        sources: [byCat('监管'), byCat('企业检测'), byCat('媒体测试')].filter(Boolean),
        sourceLabel: '来源报道',
      },
      {
        match: /下一步|看什么|等什么|后续/,
        text: `## 下一步该盯什么
联合调查组的通报里，真正值得看的是这三件事：

1. **断裂原因**：会说明是材质、结构还是装配问题。
2. **测试条件怎么复现**：决定了后面所有测试能不能对得上。
3. **是否需要召回或升级**：这是唯一影响车主行动的部分。

## 在那之前
旧的检测结果和测试视频只能当线索。它们有价值，但都不构成结论——尤其是「已经确认」这类说法，需要官方通报背书才算。`,
        sources: [byCat('监管'), byCat('媒体追问')].filter(Boolean),
        sourceLabel: '来源报道',
      },
    ],
    fallback: '这个社区里我还没找到足够可靠的说法。涉及这件事，最好以官方通报和原文报道为准。',
  }
}

const color = {
  greeting: '我在看「配色俱乐部」里的色板和取色笔记。你可以问我某套配色适合什么场景，也可以让我解释两个颜色为什么放在一起。',
  suggestions: [
    '这几套配色分别适合什么？',
    '为什么这几套看起来不脏？',
    '深色模式下要注意什么？',
  ],
  replies: [
    {
      match: /哪套|分别|适合|场景|三套/,
      text: `## 三套各自的脾气
- **绿意与莓粉**：轻快，适合生活方式和活动页。高饱和的那支粉是主色，绿负责把它压住。
- **海盐蓝**：饱和度压得低，适合安静的阅读和工具界面。
- **落日杏橙**：偏暖，适合活动页和内容页。

## 判断依据不是「好看」
看的是底色和主色的关系：**底色定得很浅，主色只留一个高饱和，剩下两色只做点缀**。所以三套换着用，页面结构不用跟着改。

## 用小提醒
同一套色换到深色背景上，主色的饱和度通常要再降一点，否则会比浅色背景下更刺眼。`,
      sources: pickSources('color-balance', 'weekend-explore', 'visual-works'),
      sourceLabel: '相关笔记',
    },
    {
      match: /脏|灰|浑浊|打架|平衡|好看/,
      text: `## 不脏的原因
- **底色先定得很浅**，画面里大面积的都是它。
- **主色只留一个高饱和**，其余两色只做点缀，不抢主色。
- **饱和度分散在不同明度上**：颜色一多，就把它们放到不同明度，避免两个颜色争同一个位置。

## 反过来，会脏的通常是这三种
1. 两个中饱和的颜色挨在一起，谁也不让谁。
2. 底色不够浅，画面没有可以透气的空白。
3. 点缀色也开始承担信息层级——它本来只该负责节奏。

## 可以自己验证
把主色换成和点缀色相同的明度再看，如果立刻觉得「糊了」，说明原来靠的是明度差，不是色相差。`,
      sources: pickSources('color-balance', 'gardening-ui'),
      sourceLabel: '相关笔记',
    },
    {
      match: /深色|对比|可读|无障碍|暗/,
      text: `## 最容易出问题的是中间灰
它既不够亮也不够暗，正文和背景的对比度会掉到临界值以下。深色下真正的做法是：**把底色压到很低、文字提到接近白，中间灰只留给分隔线**。

## 具体要注意
1. **正文不要用「稍微浅一点的灰」**：要么接近白，要么明确标成次级信息。
2. **主色在深色上要降饱和**，否则会比浅色背景下更刺眼。
3. **阴影在深色里几乎不起作用**：层级靠明度和描边，不要靠投影。

## 怎么自查
把界面截成灰度图，如果三层信息还能分出来，对比度基本是够的。`,
      sources: pickSources('oilpainting-ui', 'color-balance'),
      sourceLabel: '相关笔记',
    },
  ],
  fallback: '这个社区里我还没找到足够一致的配色答案。你可以问我某套配色的适用场景，或者让我解释两个颜色为什么放在一起。',
}

export function buildTopicAssistant(topic) {
  if (!topic) return null
  const base = {
    title: topicLabel(topic),
    from: topic.from,
    to: topic.to,
  }
  if (topic.id === 'design-inspire') return { ...base, ...design }
  if (topic.id === 'blender') return { ...base, ...blender }
  if (topic.id === 'event-watch') return { ...base, ...event(topic) }
  if (topic.id === 't3') return { ...base, ...color }
  return null
}
