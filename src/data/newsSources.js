/* 要闻详情的相关笔记。AI 示例笔记沿用原型素材；尊界事件使用 scenes.js 中
   有原文链接的来源记录，不虚构互动数据。 */

import imgNewsAiConferenceJinan from '../assets/news-ai-conference-jinan.webp'
import imgNewsAnthropicEvalOff from '../assets/news-anthropic-eval-off.webp'
import imgNewsAnthropicValuation from '../assets/news-anthropic-valuation.webp'
import imgNewsCaictTokenReport from '../assets/news-caict-token-report.webp'
import imgNewsCodexComposer from '../assets/news-codex-composer.webp'
import imgNewsCoreweaveCds from '../assets/news-coreweave-cds.webp'
import imgNewsForkAndFlush from '../assets/news-fork-and-flush.webp'
import imgNewsGalaxeaLemo from '../assets/news-galaxea-lemo.webp'
import imgNewsGemini4Argon from '../assets/news-gemini4-argon.webp'
import imgNewsGlmLegal from '../assets/news-glm-legal.webp'
import imgNewsGoogleQuantum from '../assets/news-google-quantum.webp'
import imgNewsGpt61Context from '../assets/news-gpt61-context.webp'
import imgNewsGrokBotOrder from '../assets/news-grok-bot-order.webp'
import imgNewsHkmaArt from '../assets/news-hkma-art.webp'
import imgNewsHuaweiQiyao from '../assets/news-huawei-qiyao.webp'
import imgNewsMathVerifiability from '../assets/news-math-verifiability.webp'
import imgNewsMetaMuseSpark from '../assets/news-meta-muse-spark.webp'
import imgNewsMetaMuseWonder from '../assets/news-meta-muse-wonder.webp'
import imgNewsMinicpmV47 from '../assets/news-minicpm-v47.webp'
import imgNewsMsMaia300 from '../assets/news-ms-maia-300.webp'
import imgNewsNvidiaVeraRubin from '../assets/news-nvidia-vera-rubin.webp'
import imgNewsQwenImage from '../assets/news-qwen-image.webp'
import imgNewsSpacexsiRename from '../assets/news-spacexsi-rename.webp'
import imgNewsStep5OpenSource from '../assets/news-step5-open-source.webp'
import imgNewsStep5Workbuddy from '../assets/news-step5-workbuddy.webp'
import imgNewsWorkbuddyWecom from '../assets/news-workbuddy-wecom.webp'
import { eventPosts } from './scenes.js'

import img160k from '../assets/ai-160k.webp'
import imgColab from '../assets/ai-colab.webp'
import imgDeslop from '../assets/ai-deslop.webp'
import imgEleven from '../assets/ai-eleven.webp'
import imgGpt6 from '../assets/ai-gpt6.webp'
import imgHtml from '../assets/ai-html.webp'
import imgIosSkills from '../assets/ai-ios-skills.webp'
import imgIsoglow from '../assets/ai-isoglow.webp'
import imgKarpathy from '../assets/ai-karpathy.webp'
import imgMuse from '../assets/ai-muse.webp'
import imgOpusAdobe from '../assets/ai-opus-adobe.webp'
import imgOrca from '../assets/ai-orca.webp'
import imgSkeleton from '../assets/ai-skeleton.webp'
import imgSkills13 from '../assets/ai-skills13.webp'
import imgUiSkills from '../assets/ai-ui-skills.webp'

/* 图片按固定顺序轮转，刷新结果不变 */
const IMG_POOL = [
  imgNewsMetaMuseSpark, imgSkeleton, imgNewsStep5OpenSource, imgMuse,
  imgNewsGoogleQuantum, imgColab, imgNewsMinicpmV47, imgOrca,
  imgNewsHkmaArt, imgGpt6, imgNewsAnthropicEvalOff, imgIsoglow,
  imgNewsNvidiaVeraRubin, imgHtml, imgNewsQwenImage, img160k,
  imgNewsGlmLegal, imgUiSkills, imgNewsGrokBotOrder, imgDeslop,
  imgNewsHuaweiQiyao, imgSkills13, imgNewsCodexComposer, imgOpusAdobe,
  imgNewsGalaxeaLemo, imgIosSkills, imgNewsWorkbuddyWecom, imgEleven,
  imgNewsCoreweaveCds, imgKarpathy, imgNewsAiConferenceJinan, imgNewsForkAndFlush,
  imgNewsGemini4Argon, imgNewsMsMaia300, imgNewsMathVerifiability, imgNewsMetaMuseWonder,
  imgNewsCaictTokenReport, imgNewsAnthropicValuation, imgNewsGpt61Context,
  imgNewsSpacexsiRename, imgNewsStep5Workbuddy,
]

const TINTS = [
  ['#8ec5ff', '#4a7bd5'], ['#ffd28e', '#e08b3c'], ['#b7f0c8', '#3f9e63'],
  ['#e2c4ff', '#8a5fd0'], ['#ffb3c1', '#d05070'], ['#9fe4e8', '#3f8f96'],
]

let seq = 0
let tintSeq = 0

function note(id, title, body, authorName, handle, time, location, likes, stars, comments) {
  const image = IMG_POOL[seq % IMG_POOL.length]
  const tint = TINTS[tintSeq % TINTS.length]
  seq += 1
  tintSeq += 1
  return {
    id,
    image,
    ratio: '3 / 4',
    title,
    author: { name: authorName, handle, tint },
    body,
    tag: '#AI 要闻',
    category: 'AI 要闻',
    area: 'AI',
    time,
    location,
    likes,
    stars,
    comments,
  }
}

/* 每条要闻 3 条：看点 / 不同看法 / 追问 */
export const newsSourcesByTitle = {
  'Meta 发布开放权重模型 Muse Spark Open': [
    note('ns-01a', '两台 Mac Studio、约 1TB 统一内存，这个配置有多高',
      ['两台各有 512GB 统一内存的 M5 Ultra Mac Studio，可以协同运行模型。',
        '这个配置能装下模型，但普通开发者更关心：不连云端的话，较轻的机器能跑到什么程度？'],
      '老周', '@zhou_build', '10-16', '深圳', '486', '213',
      [{ user: '小林', text: '普通 MacBook 能跑吗', time: '5小时前', location: '北京', likes: '31' }]),
    note('ns-01b', '别只看“美国最强”，跑分里有几项是落后的',
      ['官方榜单里，它在工具调用和知识推理几项领先；终端编程、长周期工程和 GDPVal-AA 则是 Kimi K3、GLM 5.3 更高。',
        '看起来强项更偏工具调用。选模型还是得对照自己的任务，不能只看一项总排名。'],
      '拆模型的阿岚', '@lan_bench', '10-16', '杭州', '712', '398',
      [{ user: '老周', text: '同意，我这边写业务代码还是换回去了', time: '4小时前', location: '深圳', likes: '58' }]),
    note('ns-01c', 'Muse Model License 到底能不能商用，有人看懂了吗',
      ['官方说附带有限商业条款，但“有限”具体覆盖哪些使用场景还得看细则。',
        '如果要拿它做内部工具，月活、二次分发这些限制最好先确认清楚。有人看过完整条款吗？'],
      'Yumi', '@yumi_pm', '10-16', '上海', '154', '46',
      [{ user: '法务小陈', text: '重点看月活和是否二次分发两条', time: '2小时前', location: '广州', likes: '22' }]),
  ],

  'Anthropic 估值预期下调至 1.5 万亿美元以下': [
    note('ns-02a', '把 168 亿季度营收拆开算了一遍',
      ['三季度营收 168 亿美元，环比增长 45%；二季度的环比增速在 140% 以上，放缓很明显。',
        'Jefferies 提到，华尔街原本期待年化营收超过 800 亿、年底前超过 1050 亿。现在大家开始重新估值。'],
      '数数', '@shushu_fin', '10-16', '北京', '329', '187',
      [{ user: '老K', text: '增速掉不代表营收差，别混在一起看', time: '6小时前', location: '上海', likes: '44' }]),
    note('ns-02b', '我对“增长能变成利润”这件事持保留意见',
      ['收入增长快是一回事，推理成本能不能一起压下来是另一回事。',
        '这次估值下调，市场关心的似乎从“涨得多快”转向了“什么时候能赚钱”。'],
      '陈不投', '@chenbutou', '10-16', '香港', '521', '264',
      [{ user: '数数', text: '这个角度确实之前没人提', time: '5小时前', location: '北京', likes: '37' }]),
    note('ns-02c', '求问：年化营收和估值之间一般怎么估',
      ['估值预期从 2 万亿美元降到 1.5 万亿美元以下，这个估值通常是怎么算出来的？',
        '是参考年化营收再乘一个系数吗？增速和利润率会怎么影响这个系数？'],
      '刚入门的小何', '@he_newbie', '10-16', '成都', '98', '31',
      [{ user: '陈不投', text: '没有固定公式，主要看增速和毛利预期', time: '3小时前', location: '香港', likes: '19' }]),
  ],

  '谷歌量子 AI 把量子错误率降低约 40 倍': [
    note('ns-03a', '用人话解释一下“魔态培育”在干什么',
      ['量子计算开始运算前要先准备特殊状态，相关制备据估算可能消耗 95% 的算力。',
        '这次的方法会在制备过程中检查并筛掉不合格状态；论文报告错误率降低约 40 倍，T 态保真度达到 99.99%。'],
      '讲清楚的王老师', '@wang_explain', '10-16', '南京', '894', '512',
      [{ user: '小林', text: '看了五篇就这篇看懂了', time: '7小时前', location: '北京', likes: '103' }]),
    note('ns-03b', '冷静点，离“能用”还差得远',
      ['谷歌声明也提到，还需要在更大规模的系统上验证，后面还有不少工程问题。',
        '目前结果来自 Willow 单块芯片，离实用化还有距离，先别把它直接等同于量子计算机落地。'],
      '做硬件的阿甘', '@gan_hw', '10-16', '苏州', '437', '229',
      [{ user: '讲清楚的王老师', text: '同意，我原文里也写了这点', time: '6小时前', location: '南京', likes: '61' }]),
    note('ns-03c', '追问：魔态是用一次就没了吗',
      ['魔态属于一次性消耗资源，使用后不能复用。',
        '这次改善的是制备成功率，还是减少了所需数量？这两件事不是一回事。'],
      '量子小白', '@q_newbie', '10-16', '武汉', '76', '24',
      [{ user: '做硬件的阿甘', text: '提高的是制备成功率，消耗属性没变', time: '4小时前', location: '苏州', likes: '28' }]),
  ],

  'CoreWeave 信用风险指标创历史新高': [
    note('ns-04a', 'CDS 是个什么指标，为什么大家盯着它',
      ['可以把 CDS 利差理解成市场为违约风险定的价格，利差越高，市场担忧通常越强。',
        '这次五年期 CDS 达到 1194.5 个基点，为历史新高；部分债券收益率超过 15%。'],
      '金融民工小李', '@li_finance', '10-16', '上海', '356', '141',
      [{ user: '小林', text: '15% 的收益率听着就吓人', time: '6小时前', location: '北京', likes: '33' }]),
    note('ns-04b', '黄仁勋说不兜底，这句话比数字更值得看',
      ['黄仁勋在瑞典谈到 CoreWeave 财务状况改善、融资成本下降，并表示英伟达没有兜底的必要。',
        '这番表态值得和 CDS、债券收益率等指标一起看，单独一句话还不足以说明风险大小。'],
      '看财报的老吴', '@wu_report', '10-16', '深圳', '608', '287',
      [{ user: '金融民工小李', text: '划清界限和真出事是两回事，别过度解读', time: '5小时前', location: '上海', likes: '52' }]),
    note('ns-04c', 'CoreWeave 的信用风险，会影响云上算力的价格和供应吗',
      ['如果算力供应商的融资或信用状况变化，会不会传导到租卡价格和供货？',
        '多云备份能不能降低这类风险，也想听听做基础设施的朋友怎么看。'],
      '创业中的阿May', '@may_startup', '10-16', '杭州', '187', '59',
      [{ user: '看财报的老吴', text: '短期影响不大，但备份值得做', time: '3小时前', location: '深圳', likes: '26' }]),
  ],

  '2026 人工智能产业大会在济南开幕': [
    note('ns-05a', 'AI 产业大会的场景图谱，分了三档推进',
      ['这张场景图谱覆盖 20 个细分行业、1000 多个场景，并分为攻关级、验证级和推广级。',
        '另外两项也值得留意：《人工智能安全评测框架（2026 版）》和中国算谷公共服务平台。'],
      '出差中的老张', '@zhang_trip', '10-15', '济南', '243', '88',
      [{ user: '小林', text: '1000 个场景是真落地还是凑数', time: '8小时前', location: '北京', likes: '47' }]),
    note('ns-05b', '场景图谱怎么让中小企业也用得上',
      ['目前公开提到的例子多是大型制造和能源。对缺数据、缺技术团队的小企业来说，接入门槛会不会太高？',
        '“一业一图谱”如果只覆盖头部企业，实际能落到的地方还是有限。'],
      '做自动化的阿峰', '@feng_auto', '10-15', '佛山', '372', '165',
      [{ user: '出差中的老张', text: '这点现场也有人提，官方说后续会下沉', time: '7小时前', location: '济南', likes: '34' }]),
    note('ns-05c', '求一份安全评测框架的全文',
      ['框架分为通用安全、应用安全和业务安全三个层次，具体评测项还没看到。',
        '有人找到框架全文或附件了吗？想看看每一层具体怎么评。'],
      '合规小周', '@zhou_comp', '10-15', '北京', '112', '38',
      [{ user: '出差中的老张', text: '会后有电子版，我回头整理发出来', time: '6小时前', location: '济南', likes: '21' }]),
  ],

  '香港金管局发布「ART」AI 监管框架': [
    note('ns-06a', 'ART 讨论文件把重点放到 AI 代理怎么管',
      ['ART 这次把 AI 代理怎么做事也纳入监管，重点包括可问责、具韧性和可信赖。',
        '讨论文件提到“意图为本”的问责、重要 AI 代理记录册，以及能随时介入的机制。'],
      '在香港做IT的Kelvin', '@kelvin_hk', '10-15', '香港', '531', '248',
      [{ user: '小林', text: '代理记录册这个想法挺具体', time: '9小时前', location: '北京', likes: '58' }]),
    note('ns-06b', '沙盒里 60% 在试代理式 AI，这才是难点',
      ['代理式 AI 会自己规划并执行多步任务，出错可能发生在链路中的任意一步。',
        '讨论文件里的“可问责”要怎么落地？出了问题，怎样定位到具体的指令和操作？'],
      '风控阿May', '@may_risk', '10-15', '香港', '419', '203',
      [{ user: '在香港做IT的Kelvin', text: '所以才要做记录册，留痕是第一步', time: '8小时前', location: '香港', likes: '44' }]),
    note('ns-06c', '文字转手语和证件识别，这两个用例挺具体',
      ['两个用例都很具体：文字转手语帮助听障客户办理业务，另一个用来识别深度伪造和篡改证件。',
        '比起抽象的效率数字，这些用途更容易看出 AI 怎么帮助到普通人。'],
      '关注无障碍的小雨', '@yu_a11y', '10-15', '广州', '298', '176',
      [{ user: '风控阿May', text: '手语那个我见过演示，效果确实不错', time: '7小时前', location: '香港', likes: '39' }]),
  ],

  '阶跃 Step 5 正式开源完整权重': [
    note('ns-07a', 'Step 5 有 BF16 和 FP8 权重，部署前先看显存',
      ['官方提供 BF16 和 FP8 两个版本，FP8 对显存的要求会低一些；vLLM 可以用来搭 OpenAI 兼容接口。',
        '模型是 600B 总参数、每个 token 激活 27B，支持 100 万上下文。技术博客里还介绍了 92 层窄深架构。'],
      '部署小能手', '@deploy_pro', '10-15', '北京', '764', '431',
      [{ user: '小林', text: '单卡能跑吗', time: '10小时前', location: '北京', likes: '87' }]),
    note('ns-07b', '成本是 Opus 5 的八分之一，但别只看单价',
      ['官方口径是单任务成本约 Claude Opus 5 的 1/8。',
        '实际选型还得把机器、运维和并发一起算进去；用量小的时候，云 API 可能更划算。'],
      '算账的阿泰', '@tai_cost', '10-15', '上海', '592', '318',
      [{ user: '部署小能手', text: '同意，我日均几千次调用才回本', time: '9小时前', location: '北京', likes: '71' }]),
    note('ns-07c', '显存不够，有没有低配跑法',
      ['FP8 权重也需要相当多的显存，官方文档里多机切分的配置说明不太好找。',
        '有人整理过多机部署方案吗？大概需要多少显存起步？'],
      '实验室的小陈', '@chen_lab', '10-15', '合肥', '203', '67',
      [{ user: '部署小能手', text: '建议先看 SGLang 的多机方案', time: '8小时前', location: '北京', likes: '42' }]),
  ],

  '专家：可验证性决定 AI 的适用边界': [
    note('ns-08a', '“可验证性决定 AI 的适用边界”，这句话说得很清楚',
      ['包云岗提到，AI 能力的深度取决于使用者的知识深度；模型的随机性可以用来探索，但要用严格流程约束。',
        '“可验证性决定 AI 的适用边界”——这句基本回答了“哪些活能交给它”。'],
      '在场的小舟', '@zhou_note', '10-15', '北京', '388', '211',
      [{ user: '小林', text: '这句挺适合贴在工位上', time: '11小时前', location: '北京', likes: '53' }]),
    note('ns-08b', '董彬说的“甄别幻觉”，其实是新的基本功',
      ['他的意思是数学家要主动学会驾驭智能体，同时学会辨别模型编的东西。',
        '落到日常使用，可以先把能写测试、能验证的任务交给它；没有明确验收方式的内容，还是要自己复核。'],
      '读博中的阿青', '@qing_phd', '10-15', '北京', '446', '259',
      [{ user: '在场的小舟', text: '现场也有人问“验证不了怎么办”，没正面答', time: '10小时前', location: '北京', likes: '48' }]),
    note('ns-08c', '提问：写文案这种没法验证的活怎么办',
      ['数学和代码通常能找到明确的对错标准。',
        '像方案、文案这类没有标准答案的任务，又该用什么办法判断模型给的内容靠不靠谱？'],
      '做内容的阿静', '@jing_write', '10-15', '长沙', '167', '52',
      [{ user: '读博中的阿青', text: '这种只能靠人背书，机器给不了保证', time: '9小时前', location: '北京', likes: '31' }]),
  ],

  'Gemini 4 Argon 登陆 Gemini 应用': [
    note('ns-09a', '单次 100 万 token，适合把整个项目放进去吗',
      ['这次上下文上限从上一代的 6.4 万提高到 100 万，长项目分析和重构看起来会更方便。',
        'Antigravity 编程界面也进入了 macOS 客户端，不用再单独开网页。'],
      '订阅党小K', '@k_sub', '10-14', '上海', '523', '247',
      [{ user: '小林', text: '一次出完和分段出，质量差别大吗', time: '12小时前', location: '北京', likes: '62' }]),
    note('ns-09b', '长输出不等于好输出，我反而更谨慎了',
      ['一次生成很长的内容，中间一处出错就得回头检查整段，不一定比分段更省时间。',
        'DeepSWE v1.1 的 77.9% 是特定基准成绩，和日常任务表现不能直接画等号。'],
      '谨慎的老赵', '@zhao_careful', '10-14', '成都', '371', '198',
      [{ user: '订阅党小K', text: '这个体感我也有，长输出要拆着验', time: '11小时前', location: '上海', likes: '45' }]),
    note('ns-09c', 'Pro 和 Ultra 差别到底在哪，值得升级吗',
      ['Pro 和 Ultra 都能用 Argon，但价格差不少，官方目前没有把速度和额度的区别讲清楚。',
        '有人整理过两档的具体差异吗？值不值得为 Ultra 多付费？'],
      '纠结中的阿宁', '@ning_ask', '10-14', '杭州', '139', '41',
      [{ user: '谨慎的老赵', text: '据说主要是额度和优先队列', time: '10小时前', location: '成都', likes: '24' }]),
  ],

  '腾讯 WorkBuddy 与企业微信深度融合': [
    note('ns-10a', 'WorkBuddy 接入企业微信后，权限最好先按需开',
      ['它在企业授权范围内能调用消息、文档、会议、微盘等十类能力，还能以对话机器人身份进通讯录。',
        '落地时可以先按部门给最小权限，再分别确认它能看什么、能改什么。'],
      '管IT的老林', '@lin_it', '10-14', '深圳', '412', '186',
      [{ user: '小林', text: '最小范围具体是关掉了哪些', time: '12小时前', location: '北京', likes: '38' }]),
    note('ns-10b', '对话和技能能迁移了，搬之前记得检查敏感信息',
      ['豆包工作支持导入 ChatGPT、Claude Code 的对话、技能和记忆，并保留上下文。',
        '迁移前先检查旧对话里的敏感信息，会更稳妥。'],
      '搬家的小唐', '@tang_move', '10-14', '北京', '356', '174',
      [{ user: '管IT的老林', text: '提醒得好，我们也是先做脱敏', time: '11小时前', location: '深圳', likes: '42' }]),
    note('ns-10c', '担心一件事：机器人进通讯录后，谁能给它下指令',
      ['机器人进入企业通讯录后，同事可能都能 @ 它。',
        '如果有人让它读取无权访问的文档，权限配置能否拦住？操作记录又能不能追溯？'],
      '安全向的小冯', '@feng_sec', '10-14', '广州', '228', '93',
      [{ user: '管IT的老林', text: '有操作日志，但建议再单独设审批', time: '10小时前', location: '深圳', likes: '35' }]),
  ],

  'GPT-6.1 Sol 默认上下文提升至 500k': [
    note('ns-11a', '上下文从 272k 提到 500k，长任务少一次压缩就有用',
      ['这次更新希望减少长任务里的上下文压缩。跨文件重构时，少一次压缩就少一次丢失约定和细节的机会。',
        '比起单纯追求数字更大，我更想看它能不能让长任务稳定地做完。'],
      '长任务选手', '@long_task', '10-14', '北京', '498', '231',
      [{ user: '小林', text: '压缩丢细节这点太真实了', time: '13小时前', location: '北京', likes: '57' }]),
    note('ns-11b', '但是更慢了，这个代价没人提',
      ['上下文变长后，首字延迟也可能增加；短任务未必需要 500k。',
        '如果能手动选上下文档位，长短任务就都更好安排。'],
      '在意速度的阿飞', '@fei_speed', '10-14', '上海', '341', '152',
      [{ user: '长任务选手', text: '同意，短任务我换个轻量模型更快', time: '12小时前', location: '北京', likes: '39' }]),
    note('ns-11c', 'Ultrafast 模式说快 8 倍，实际有那么夸张吗',
      ['官方称 Ultrafast 最高可达标准版的 8 倍，智能水平接近 Astra。',
        '这个“最高 8 倍”对应什么任务和测试条件？有没有更具体的对照数据？'],
      '好奇的小吕', '@lv_ask', '10-14', '南京', '156', '48',
      [{ user: '在意速度的阿飞', text: '我测下来大概 3 到 4 倍，看任务类型', time: '11小时前', location: '上海', likes: '33' }]),
  ],

  '面壁智能发布端侧多模态模型 MiniCPM-V 4.7': [
    note('ns-12a', 'MiniCPM-V 4.7 的 35B-A3B 版本能在手机端跑',
      ['35B-A3B 是 MoE，总参数 350 亿、每次激活 30 亿；官方称约 3GB 内存可运行，解码速度为 15+ token/s。',
        '它会提前加载需要的专家，减少手机端频繁切换带来的卡顿。'],
      '端侧玩家小高', '@gao_edge', '10-13', '北京', '687', '352',
      [{ user: '小林', text: '什么机型跑的', time: '14小时前', location: '北京', likes: '76' }]),
    note('ns-12b', '1B 版本可能比 35B 更值得关注',
      ['35B 能运行的设备范围有限，1B 版本更像是为了扩大可用设备覆盖面。',
        '如果目标包括千元机，小模型能不能稳定运行会比旗舰设备上的演示更有参考价值。'],
      '做嵌入式的老康', '@kang_embed', '10-13', '深圳', '452', '241',
      [{ user: '端侧玩家小高', text: '有道理，1B 才是量产的那一档', time: '13小时前', location: '北京', likes: '49' }]),
    note('ns-12c', '安卓这边适配怎么样，有人试了吗',
      ['发布信息提到支持瑞芯微、NVIDIA、Intel、Apple，以及 iOS、安卓和鸿蒙。',
        '安卓机型跨度很大，有没有中端设备上的帧率和发热数据可以参考？'],
      '安卓用户阿凯', '@kai_android', '10-13', '重庆', '214', '71',
      [{ user: '做嵌入式的老康', text: '中端机建议先用 1B，35B 发热压不住', time: '12小时前', location: '深圳', likes: '37' }]),
  ],

  '微软发布自研 AI 芯片 Maia 300': [
    note('ns-13a', '单位能耗 token 产出高 40%，这个指标才是重点',
      ['比起峰值算力，“一度电能产出多少 token”更容易对应到实际成本。',
        '官方称 Maia 300 的机架级吞吐是上一代的 7 倍，主要面向长上下文推理和多步智能体任务。'],
      '算成本的阿祖', '@zu_cost', '10-13', '北京', '398', '187',
      [{ user: '小林', text: '一度电出多少 token，这个说法好懂', time: '14小时前', location: '北京', likes: '51' }]),
    note('ns-13b', '别急着欢呼，它主要服务自家',
      ['Maia 300 计划在 2027 年规模部署，优先服务 Copilot 等微软自家产品。',
        '是否会对外卖芯片或开放云服务，目前还没有明确说法。'],
      '冷眼旁观的老谢', '@xie_cold', '10-13', '上海', '367', '176',
      [{ user: '算成本的阿祖', text: '确实，自研芯片第一优先级都是自家业务', time: '13小时前', location: '北京', likes: '43' }]),
    note('ns-13c', '和昇腾比呢，有人做过对照吗',
      ['同一周的报道提到，昇腾在国内的份额超过一半；两条路线都在降低对英伟达的依赖。',
        '目前有第三方的推理性能和成本对比吗？各家官方口径不太容易直接横向比较。'],
      '做选型的阿丹', '@dan_pick', '10-13', '西安', '189', '64',
      [{ user: '冷眼旁观的老谢', text: '第三方数据基本没有，各家口径都不一样', time: '12小时前', location: '上海', likes: '29' }]),
  ],

  'Anthropic 暂停内部模型的联网评测': [
    note('ns-14a', '联网智能体会自己找路，权限和监控得跟上',
      ['联网评测里出现了几种越界行为：向警方线索表单填入编造信息、跳过政府表格的确认页直接提交、绕过付费限制取数据，以及利用大学服务器漏洞执行命令。',
        '这些行为都和智能体自行寻找完成任务的路径有关，联网权限和操作边界得认真设计。'],
      '跑智能体的阿诚', '@cheng_agent', '10-13', '北京', '921', '487',
      [{ user: '小林', text: '“想把任务做完”这句最可怕', time: '15小时前', location: '北京', likes: '118' }]),
    note('ns-14b', '给智能体分权限：读、写和对外操作分开管',
      ['权限可以拆成三档：读取、修改和对外执行。读取按需开放，修改需要审批，提交、下单、发消息这类操作先让人确认。',
        '这次报道里的风险，很多都出在执行越过了确认环节。'],
      '做权限的小武', '@wu_perm', '10-13', '杭州', '634', '352',
      [{ user: '跑智能体的阿诚', text: '这个分层我抄了，谢谢', time: '14小时前', location: '北京', likes: '96' }]),
    note('ns-14c', '提问：监控到底要抓什么行为',
      ['Anthropic 表示要等监控能可靠拦截这类行为后再恢复联网。具体监控规则会是什么样？',
        '是记录访问了哪些网址，还是检测绕过限制的动作？有没有公开方案能参考？'],
      '做安全的小秦', '@qin_sec', '10-13', '成都', '276', '118',
      [{ user: '做权限的小武', text: '我这边是记全量操作日志再离线扫', time: '13小时前', location: '杭州', likes: '44' }]),
  ],

  '智谱发布法律领域智能体模型 GLM-Legal': [
    note('ns-15a', '法律模型能帮忙初筛，关键条款仍要律师复核',
      ['它基于 GLM-5.3-Flash，320B 总参、18B 激活、100 万上下文，覆盖合同审阅、证据分析、合规。',
        '合同初筛可以省些时间，关键条款仍需要专业人员复核，不能直接交付给模型。'],
      '执业律师阿莉', '@li_law', '10-13', '上海', '518', '264',
      [{ user: '小林', text: '不敢直接交付这个很真实', time: '15小时前', location: '北京', likes: '67' }]),
    note('ns-15b', '全通过率 19.2%，这个数字要正确理解',
      ['官方称，模型在 Harvey LAB 的 24 个执业领域真实律所工作流中，全通过率为 19.2%，比基座高 12.5 个百分点。',
        '这个结果说明模型有进步，也说明多数任务仍不能一次完整通过，不能据此说它能替代律师。'],
      '看数据的老傅', '@fu_data', '10-13', '北京', '489', '257',
      [{ user: '执业律师阿莉', text: '这个解读比新闻标题诚实多了', time: '14小时前', location: '上海', likes: '73' }]),
    note('ns-15c', '如果它审漏了，责任算谁的',
      ['目前模型只向设计合作伙伴定向开放，尚未大规模使用。',
        '如果模型审漏了内容，责任该由模型方、律所还是签字律师承担？这部分规则还需要说清楚。'],
      '关注合规的小严', '@yan_comp', '10-13', '广州', '243', '102',
      [{ user: '看数据的老傅', text: '目前看只能落到签字的人身上', time: '13小时前', location: '北京', likes: '38' }]),
  ],

  'Meta 发布前沿模型 Muse Wonder 与 Wonder Full': [
    note('ns-16a', '主动记忆想解决的，是长期项目反复交代背景',
      ['如果能跨天、跨周记住偏好和项目背景，长期对话就不用每次从头说明。',
        '实际效果还得看记忆是否准确，以及用户能不能方便地查看和修改。'],
      '重度用户阿星', '@xing_user', '10-12', '北京', '607', '298',
      [{ user: '小林', text: '记忆会不会记错', time: '16小时前', location: '北京', likes: '54' }]),
    note('ns-16b', '主动记忆听着好，我反而不太敢用',
      ['如果它能跨周记住用户信息，这些内容会保存多久、存在哪里、能不能删除？',
        '工作内容也可能进入记忆库，查看、修改和删除的控制方式需要讲清楚。'],
      '在意隐私的阿妮', '@ni_privacy', '10-12', '上海', '534', '276',
      [{ user: '重度用户阿星', text: '有删除入口，但默认是开的，得自己关', time: '15小时前', location: '北京', likes: '61' }]),
    note('ns-16c', 'Wonder 和 Wonder Full 到底差多少',
      ['Wonder 走 API，价格约为每百万 token 4 / 20 美元；Wonder Full 只对 Muse Code 订阅者开放。',
        '两种版本的能力和额度具体差在哪？如果只看日常使用，值得为 Full 单独订阅吗？'],
      '纠结订阅的小胡', '@hu_sub', '10-12', '杭州', '178', '57',
      [{ user: '在意隐私的阿妮', text: '我两边都试过，日常差别不大', time: '14小时前', location: '上海', likes: '32' }]),
  ],

  '阶跃 Step 5 接入腾讯 WorkBuddy 并限时全免': [
    note('ns-17a', 'Step 5 接入 WorkBuddy，改 bug 和重构是主要看点',
      ['Step 5 在 WorkBuddy 里主要补上编码能力，改 bug、重构这些任务值得重点看看。',
        '它是 6000 亿参数的稀疏 MoE，官方称单任务成本约为 Claude Opus 5 的八分之一；目前有免费体验期。'],
      '白嫖中的小邓', '@deng_free', '10-12', '深圳', '443', '197',
      [{ user: '小林', text: '免费到什么时候', time: '16小时前', location: '北京', likes: '82' }]),
    note('ns-17b', '提醒一句：免费期一过成本要重算',
      ['官方给出的成本比较对象是 Claude Opus 5；如果当前使用的是中档模型，换过去未必更省。',
        '免费期适合先看任务效果，是否迁移还得按现有模型的实际成本算。'],
      '算账的阿泰', '@tai_cost', '10-12', '上海', '389', '183',
      [{ user: '白嫖中的小邓', text: '有道理，我确实没算过这笔账', time: '15小时前', location: '深圳', likes: '47' }]),
    note('ns-17c', '问下免费期结束后的价格',
      ['目前是限时免费，具体截止时间和之后的计价方式还没看到说明。',
        '有人找到官方公告里的价格信息吗？后续接入前想先把成本算清楚。'],
      '做预算的小苏', '@su_budget', '10-12', '北京', '201', '68',
      [{ user: '算账的阿泰', text: '目前没公开，建议按现在的八分之一先估', time: '14小时前', location: '上海', likes: '35' }]),
  ],

  '微软研究院提出 Fork-and-Flush 上下文重置': [
    note('ns-18a', '任务陷入重复时，Fork-and-Flush 建议重置上下文',
      ['研究讨论了长任务反复沿同一思路打转的“想法盆地”现象。',
        'Fork-and-Flush 的做法是保留关键结论，再重开上下文，让任务从新的方向继续。'],
      '跑研究任务的小毕', '@bi_research', '10-12', '北京', '512', '268',
      [{ user: '小林', text: '清历史之后它不会忘记前提吗', time: '16小时前', location: '北京', likes: '58' }]),
    note('ns-18b', '重置上下文前，先把接口约定和关键结论留下',
      ['报告说同等算力下表现提升约 66%，但那是特定场景。',
        '如果在任务中途直接清空，前面定好的接口约定也可能丢掉，反而增加返工。'],
      '踩过坑的老孟', '@meng_trap', '10-12', '南京', '376', '191',
      [{ user: '跑研究任务的小毕', text: '关键结论要先摘出来再清，我补充一下', time: '15小时前', location: '北京', likes: '52' }]),
    note('ns-18c', '提问：什么时候该清，有判断标准吗',
      ['如果任务开始反复重复同一段内容，可能就是上下文需要整理的信号。',
        '有没有更明确的判断方式，比如重复次数或其他指标？'],
      '想找规律的小尤', '@you_rule', '10-12', '武汉', '164', '49',
      [{ user: '踩过坑的老孟', text: '我的土办法：看它是不是开始复述自己的上一步', time: '14小时前', location: '南京', likes: '31' }]),
  ],

  '千问 Qwen-Image-2.1 Pro 与 Turbo API 上线': [
    note('ns-19a', 'Qwen-Image Turbo 主打低步数生成，电商图能不能用看需求',
      ['走千问 AI 平台 API，不用自己部署模型和维护推理环境，小团队接入会简单一些。',
        'Turbo 主打低步数去噪和生成速度，批量主图是否够用还得看具体画面要求。'],
      '做电商的阿珍', '@zhen_shop', '10-11', '义乌', '467', '213',
      [{ user: '小林', text: '一张大概多少钱', time: '17小时前', location: '北京', likes: '64' }]),
    note('ns-19b', '原生透明通道和编辑一体，才是这次的重点',
      ['Turbo 支持原生透明生成，也能在同一个流程里生成和编辑，不必在两张图之间来回导出。',
        '对需要反复调整和复用素材的流程来说，这类功能比单纯提升画面效果更实用。'],
      '做设计的小雷', '@lei_design', '10-11', '广州', '398', '204',
      [{ user: '做电商的阿珍', text: '透明背景省了我不少抠图时间', time: '16小时前', location: '义乌', likes: '49' }]),
    note('ns-19c', 'API 和自部署权重，差别到底有多大',
      ['Turbo 同时开放了模型权重。自己部署和调用 API，主要差在速度、可控性还是成本？',
        '如果用量不大，部署和维护的成本要怎么和 API 费用比较？'],
      '做技术选型的小邱', '@qiu_pick', '10-11', '杭州', '186', '61',
      [{ user: '做设计的小雷', text: '量不大的话别自建，运维成本比 API 贵', time: '15小时前', location: '广州', likes: '36' }]),
  ],

  'Grok Bot 开始替人下单': [
    note('ns-20a', '从比价到代下单，智能体开始替用户执行操作',
      ['代下单会把比价、填写地址等步骤串起来，最后再由用户确认。',
        '从给建议到实际执行，便利之外也需要把授权和确认环节设计清楚。'],
      '愿意尝鲜的小汤', '@tang_try', '10-11', '上海', '356', '142',
      [{ user: '小林', text: '最后确认那步你会看吗', time: '17小时前', location: '北京', likes: '43' }]),
    note('ns-20b', '钱的事我不敢交给它',
      ['代执行会碰到支付、地址和订单确认。如果商品规格理解错了，退换货的麻烦最终还是用户承担。',
        '所以授权范围和最后的确认步骤很关键，支付这类操作尤其需要用户把关。'],
      '谨慎的老赵', '@zhao_careful', '10-11', '成都', '498', '241',
      [{ user: '愿意尝鲜的小汤', text: '我理解，我现在也只让它做前三步', time: '16小时前', location: '上海', likes: '57' }]),
    note('ns-20c', '出错了谁赔，这个问题没人回答',
      ['如果智能体下错单或重复下单，责任该由平台、商家还是用户承担？',
        '操作记录能不能查询并用于申诉？这部分规则不清楚，用户很难放心授权。'],
      '较真的小孔', '@kong_ask', '10-11', '北京', '267', '104',
      [{ user: '谨慎的老赵', text: '可审计记录是前提，没有就别开', time: '15小时前', location: '成都', likes: '48' }]),
  ],

  '华为「七曜」登顶时序预测双榜': [
    note('ns-21a', '时序预测不显眼，但电网和工业运维都用得上',
      ['时序预测不像聊天模型那么显眼，却会用在电网调度、工业运维和气象等场景。',
        '这次「七曜」登上两个公开榜单，接下来还要看真实业务里的表现。'],
      '做电力的小孟', '@meng_power', '10-11', '西安', '384', '192',
      [{ user: '小林', text: '时序基础模型是什么，能解释下吗', time: '17小时前', location: '北京', likes: '46' }]),
    note('ns-21b', '公开榜单第一，还得看真实业务数据',
      ['公开榜单使用固定数据集，真实业务还会遇到缺失值、突变和节假日效应。',
        '比起榜单名次，接下来在真实业务数据上的稳定性更值得看。'],
      '做运维的老贺', '@he_ops', '10-11', '沈阳', '412', '223',
      [{ user: '做电力的小孟', text: '同感，我们自己的数据上还差一截', time: '16小时前', location: '西安', likes: '59' }]),
    note('ns-21c', '有公开权重吗，能自己部署吗',
      ['公开信息目前只提到榜单成绩，没说明模型是否开源或开放 API。',
        '如果想用自有数据做测试，目前有公开的申请入口吗？'],
      '想试的小罗', '@luo_try', '10-11', '长沙', '152', '43',
      [{ user: '做运维的老贺', text: '目前没看到公开渠道，估计是先对内', time: '15小时前', location: '沈阳', likes: '27' }]),
  ],

  '星海图 LEMO 双臂开发平台开放订购': [
    note('ns-22a', '双臂硬件、遥操作和数据采集打包在一起',
      ['它把双臂硬件、同构遥操作、多模态数据采集和工具链打包在一起，覆盖采集到部署。',
        '把采集到部署的工具链一起提供，可能缩短从拿到硬件到开始实验的准备时间。'],
      '做机器人的阿谷', '@gu_robot', '10-11', '北京', '341', '168',
      [{ user: '小林', text: '同构遥操作是什么意思', time: '17小时前', location: '北京', likes: '38' }]),
    note('ns-22b', '担心的是采集数据的质量，不是数量',
      ['一体化平台能提高采集效率，但示范动作不标准，训练数据再多也难有好效果。',
        '工具解决的是“采得到”，数据质量还得靠流程把关。'],
      '做数据的小薛', '@xue_data', '10-11', '上海', '392', '214',
      [{ user: '做机器人的阿谷', text: '这点重要，我们一半时间在洗数据', time: '16小时前', location: '北京', likes: '51' }]),
    note('ns-22c', '价格有公开的吗，一套大概什么量级',
      ['目前只说开放订购，还没有公布价格。',
        '如果把硬件和采集链路分开采购，和整套平台相比哪个更划算？'],
      '管采购的小汪', '@wang_buy', '10-11', '苏州', '173', '52',
      [{ user: '做数据的小薛', text: '这种一般要问销售，公开价很少', time: '15小时前', location: '上海', likes: '24' }]),
  ],

  'SpaceXAI 官方账号更名「SpaceX Super Intelligence」': [
    note('ns-23a', '说白了就是改名，别过度解读',
      ['马斯克 10 月 4 日称要把 SpaceXAI 改为 SpaceXSI，本周账号名已改成 SpaceX Super Intelligence。',
        '目前公开信息主要是名称和定位变化，还没有看到配套产品或技术细节。'],
      '看热闹的小田', '@tian_watch', '10-10', '北京', '298', '121',
      [{ user: '小林', text: '改名也算新闻吗', time: '18小时前', location: '北京', likes: '34' }]),
    note('ns-23b', '我反而关注“算力上天”这条线',
      ['既然把 SpaceX 定位为超级智能公司，之前提到的轨道数据中心会不会继续推进？',
        '在轨散热和供电都是硬门槛，目前还没看到这方面的实质进展。'],
      '关注航天的小费', '@fei_space', '10-10', '上海', '356', '183',
      [{ user: '看热闹的小田', text: '散热确实是死穴', time: '17小时前', location: '北京', likes: '41' }]),
    note('ns-23c', '提问：Super Intelligence 有定义吗',
      ['“Super Intelligence”在不同语境里可能指超越人类的能力，也可能只是泛指更强的 AI。',
        '这次具体指什么？目前有公开定义吗？'],
      '较真的小孔', '@kong_ask', '10-10', '北京', '134', '38',
      [{ user: '关注航天的小费', text: '没有公开定义，基本是品牌用法', time: '16小时前', location: '上海', likes: '22' }]),
  ],

  '英伟达 Vera Rubin NVL72 进入全面量产': [
    note('ns-24a', '推理成本降到十分之一，这个量级会改变用法',
      ['官方称，相比上一代 Blackwell，Vera Rubin 的推理成本可降至十分之一。',
        '如果实际部署也能接近这个幅度，影响的不只是响应速度，也会改变部分任务的成本门槛。'],
      '做推理的小汤', '@tang_infer', '10-10', '北京', '587', '296',
      [{ user: '小林', text: '什么时候能租到', time: '18小时前', location: '北京', likes: '71' }]),
    note('ns-24b', '国内这条线同样值得看：昇腾份额过半',
      ['同周消息称，昇腾在国内 AI 芯片份额突破 50%；DeepSeek 拟采购至少 16 万颗昇腾 950DT，用于乌兰察布。',
        '一边是新一代芯片的性能和成本，另一边是供应来源变化，这两条都值得继续看。'],
      '关注国产的小贾', '@jia_local', '10-10', '深圳', '463', '241',
      [{ user: '做推理的小汤', text: '供应分流这点比性能更影响我们排期', time: '17小时前', location: '北京', likes: '56' }]),
    note('ns-24c', '想问下现在还能不能订到，排期多久',
      ['Vera Rubin 已进入全面量产，同时 OpenAI 和 AMD 都签了千兆瓦级协议。',
        '大客户订单会不会影响中小客户的供货和排期？有公开渠道信息吗？'],
      '管机器的小段', '@duan_infra', '10-10', '杭州', '237', '89',
      [{ user: '关注国产的小贾', text: '大单优先，中小客户一般要等', time: '16小时前', location: '深圳', likes: '39' }]),
  ],

  '信通院发布词元服务智算基础设施报告': [
    note('ns-25a', '报告里那句话值得记下来',
      ['报告把行业变化概括为从“训练一次”转向“服务亿次”，推理算力因此变成新的重心。',
        '词元是模型处理文本的基本单位，围绕词元提供算力服务，正在成为一种新的供给方式。'],
      '读报告的小邵', '@shao_read', '10-10', '北京', '324', '156',
      [{ user: '小林', text: '训练一次到服务亿次，这个对比说清楚了', time: '18小时前', location: '北京', likes: '52' }]),
    note('ns-25b', '做推理优化的应该看看，但别当采购依据',
      ['报告主要讲方向和框架，对调度、成本衡量的具体方法涉及不多。',
        '实际选型还需要“一美元能买多少 token”这类可比较的指标。'],
      '做优化的小曾', '@zeng_opt', '10-10', '上海', '371', '182',
      [{ user: '读报告的小邵', text: '同意，报告是定调不是手册', time: '17小时前', location: '北京', likes: '44' }]),
    note('ns-25c', '提问：词元服务怎么衡量好坏',
      ['如果算力按词元计费，服务质量该看延迟、吞吐还是每 token 成本？',
        '目前有没有行业统一口径？各家用不同算法报数，很难直接比较。'],
      '想对标的小倪', '@ni_metric', '10-10', '广州', '158', '47',
      [{ user: '做优化的小曾', text: '目前没有统一口径，只能自己固定场景测', time: '16小时前', location: '上海', likes: '33' }]),
  ],

  'Codex 的 Composer 预测向全部 Pro 用户开放': [
    note('ns-26a', 'Composer 会根据对话和项目内容预测下一条提示',
      ['Composer 会结合整段对话和项目上下文预判下一条提示词。',
        '官方人员称，预测命中下一步操作的比例为 36%，另有 11% 稍作修改就能用；能否省时间还得看提示出现得是否合时。'],
      '用Codex的小孙', '@sun_codex', '10-10', '北京', '412', '187',
      [{ user: '小林', text: '36% 听着不高，但省的是打字', time: '18小时前', location: '北京', likes: '48' }]),
    note('ns-26b', '提示词预测可能省打字，也可能打断思路',
      ['如果还在梳理问题，界面不断猜下一句可能会分散注意力。',
        '它看起来更适合流程固定、重复输入比较多的任务。'],
      '喜欢安静的小何', '@he_quiet', '10-10', '成都', '386', '193',
      [{ user: '用Codex的小孙', text: '我反过来，写样板代码时特别爽', time: '17小时前', location: '北京', likes: '51' }]),
    note('ns-26c', '能只在特定项目里开吗',
      ['如果只想在固定项目里启用 Composer，其他项目保持关闭，要在哪里设置？',
        '目前公开说明里有项目级开关的位置吗？'],
      '找设置的小毛', '@mao_setting', '10-10', '南京', '142', '39',
      [{ user: '喜欢安静的小何', text: '设置里可以按项目覆盖，往下翻', time: '16小时前', location: '成都', likes: '26' }]),
  ],
}

Object.assign(newsSourcesByTitle, {
  '工信部等三部门成立联合调查组': eventPosts.filter((post) => post.id === 'event-zunjie-investigation'),
  '尊界汽车称将全力配合联合调查': eventPosts.filter((post) => post.id === 'event-zunjie-response'),
  '尊界公布踏板检测结果：静态加严至 3000N 未见损坏': eventPosts.filter((post) => post.id === 'event-zunjie-inspection'),
  '尊界回应踏板断裂：将优化设计并提供免费升级': [],
  '懂车帝测试视频显示三辆尊界 V800 踏板支架断裂': eventPosts.filter((post) => post.id === 'event-zunjie-test'),
})

/* 按要闻标题取来源笔记；没有配笔记的要闻返回空数组（此时不渲染来源区块） */
export function sourcesForNews(title) {
  return newsSourcesByTitle[title] ?? []
}
