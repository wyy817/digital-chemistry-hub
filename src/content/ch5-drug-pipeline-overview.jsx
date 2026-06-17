export const ch5DrugPipelineOverviewMeta = {
  id: 'ch5-1-drug-pipeline-overview',
  title: 'AI Drug Discovery Pipeline Overview',
  titleZh: '从靶点到上市：AI 药物发现流程概览',
  path: 'AI in Drug Discovery',
  chapter: 'Ch5. Drug Discovery Pipeline',
  estimatedMinutes: 40,
  difficulty: '🟡 入门',
  prev: { title: '4.3 QSAR Modeling', path: '/learn/ch4-qsar' },
  next: { title: '5.2 Target Identification', path: '/learn/ch5-target-identification' },
}

export function Ch5DrugPipelineOverviewContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">5.1.1 传统药物发现的困境 / The Challenge of Drug Discovery</h2>
      <p>
        开发一款新药平均耗时 <strong>10–15 年</strong>，花费超过 <strong>26 亿美元</strong>（Tufts CSDD 2014 估算），
        而最终能获批上市的概率不到 <strong>1‰</strong>——每 10,000 个候选化合物中只有不到 10 个能进入临床，
        最终只有约 1 个获批。
      </p>
      <p>
        失败的主要原因不是"不知道该合成什么分子"，而是：
      </p>
      <ul>
        <li><strong>靶点错误</strong>：选择的蛋白质靶点与疾病关联不够强</li>
        <li><strong>ADMET 失败</strong>：分子在体内代谢异常、毒性超标</li>
        <li><strong>临床疗效不足</strong>：动物模型与人体反应差异巨大</li>
        <li><strong>化学空间太大</strong>：可合成的类药分子约 10⁶⁰，传统高通量筛选只能触碰冰山一角</li>
      </ul>

      <div className="info-box">
        <strong>AI 的价值在哪里？</strong>
        AI 不能"凭空发明"新药，但它能在海量候选空间中<em>更快、更准地找到值得合成和测试的分子</em>。
        在 10⁶⁰ 的化学空间里，传统方法是随机抽签，AI 方法是有方向地搜索。
      </div>

      {/* Section 2 */}
      <h2 id="s2">5.1.2 药物发现的完整流程 / The Full Drug Discovery Pipeline</h2>
      <p>
        一款小分子药物从概念到上市，需要经历以下阶段：
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>阶段</th><th>英文名</th><th>主要工作</th><th>典型时长</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>靶点识别与验证</strong></td>
              <td>Target ID & Validation</td>
              <td>确定与疾病相关的蛋白质靶点，验证抑制/激活该靶点是否有治疗效果</td>
              <td>1–3 年</td>
            </tr>
            <tr>
              <td><strong>苗头化合物发现</strong></td>
              <td>Hit Discovery</td>
              <td>从化合物库中筛选出能与靶点结合的初始化合物（Hits）</td>
              <td>6–12 月</td>
            </tr>
            <tr>
              <td><strong>苗头到先导化合物</strong></td>
              <td>Hit-to-Lead (H2L)</td>
              <td>优化苗头化合物，提高活性、选择性，得到先导化合物（Lead）</td>
              <td>6–12 月</td>
            </tr>
            <tr>
              <td><strong>先导化合物优化</strong></td>
              <td>Lead Optimization (LO)</td>
              <td>全面优化先导化合物的活性、ADMET、合成可行性，得到候选药物（Candidate）</td>
              <td>1–2 年</td>
            </tr>
            <tr>
              <td><strong>临床前研究</strong></td>
              <td>Preclinical</td>
              <td>动物实验验证安全性和有效性，准备 IND 申请</td>
              <td>1–3 年</td>
            </tr>
            <tr>
              <td><strong>临床试验</strong></td>
              <td>Clinical Trials (Phase I–III)</td>
              <td>人体安全性（I期）、有效性（II期）、大规模验证（III期）</td>
              <td>5–8 年</td>
            </tr>
            <tr>
              <td><strong>监管审批</strong></td>
              <td>Regulatory Approval</td>
              <td>向 FDA/EMA 提交新药申请（NDA/MAA），等待审批</td>
              <td>1–2 年</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="warning-box">
        <strong>⚠️ AI 目前主要改变的是前半段（靶点 → 候选药物）：</strong>
        临床试验涉及人体安全性，是 AI 目前无法"替代"的环节。
        但 AI 能大幅提高进入临床的候选药物质量，降低临床失败率。
      </div>

      {/* Section 3 */}
      <h2 id="s3">5.1.3 AI 在各阶段的切入点 / AI's Role at Each Stage</h2>
      <p>
        AI 并不是只在某一个环节有用——它渗透在整个流程的每一步：
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>流程阶段</th><th>AI 应用</th><th>代表工具/方法</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>靶点识别</td>
              <td>从基因组数据中预测致病蛋白；蛋白质结构预测</td>
              <td>AlphaFold 2/3、知识图谱</td>
            </tr>
            <tr>
              <td>虚拟筛选</td>
              <td>从千万级化合物库中预测哪些分子可能有活性</td>
              <td>分子对接、QSAR 模型、GNN</td>
            </tr>
            <tr>
              <td>分子生成</td>
              <td>从零开始设计具有目标性质的全新分子</td>
              <td>VAE、GAN、扩散模型、REINFORCE</td>
            </tr>
            <tr>
              <td>ADMET 预测</td>
              <td>提前预测分子的吸收、代谢、毒性</td>
              <td>深度学习描述符、图神经网络</td>
            </tr>
            <tr>
              <td>合成路线规划</td>
              <td>预测如何合成目标分子</td>
              <td>逆合成 AI（AiZynthFinder、ASKCOS）</td>
            </tr>
            <tr>
              <td>临床试验优化</td>
              <td>患者分层、生物标志物发现</td>
              <td>自然语言处理、多组学分析</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4 */}
      <h2 id="s4">5.1.4 从 10⁶⁰ 到 1：化学空间的挑战 / Chemical Space Challenge</h2>
      <p>
        <strong>类药化学空间（Drug-like Chemical Space）</strong>的大小估计约为 10⁶⁰ 个分子——
        这个数字远超宇宙中的原子数（约 10⁸⁰，但绝大多数都是氢）。
        即使以每秒 10 亿次的速度筛选，穷举整个化学空间需要比宇宙年龄还长的时间。
      </p>

      <h3>为什么 AI 能改变局面？</h3>
      <ul>
        <li>
          <strong>学习活性规律</strong>：从已有的实验数据中学习"哪类结构有活性"，
          把未来的搜索方向限定在高价值区域
        </li>
        <li>
          <strong>生成而非筛选</strong>：不是从现有分子库中找，而是直接生成满足条件的全新分子
        </li>
        <li>
          <strong>主动学习（Active Learning）</strong>：每次实验后更新模型，让下一批要合成的分子更有价值
        </li>
      </ul>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>方法</th><th>搜索策略</th><th>化学空间覆盖</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>传统高通量筛选 (HTS)</strong></td>
              <td>随机测试大型化合物库</td>
              <td>~10⁶–10⁷ 个分子（穷举的极限）</td>
            </tr>
            <tr>
              <td><strong>基于结构的虚拟筛选</strong></td>
              <td>分子对接打分，优先测试高分分子</td>
              <td>~10⁸–10⁹ 个分子（计算筛选）</td>
            </tr>
            <tr>
              <td><strong>AI 生成式设计</strong></td>
              <td>直接生成满足条件的分子</td>
              <td>理论上无限，且集中在高价值区域</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 5 */}
      <h2 id="s5">5.1.5 AI 药物发现的里程碑案例 / Landmark Cases</h2>

      <h3>Halicin：AI 发现的全新抗生素（2020）</h3>
      <p>
        MIT 研究团队使用深度学习模型，在 6100 万个分子的库中筛选出 <strong>Halicin</strong>——
        一个结构全新的广谱抗生素，能杀死包括耐药结核杆菌在内的多种细菌。
        整个筛选过程仅用了几天，而传统方法可能需要数年。
      </p>

      <h3>Insilico Medicine：首个完全由 AI 设计进入临床的分子（2021）</h3>
      <p>
        Insilico Medicine 使用生成式 AI 在 18 个月内发现了 ISM001-055，
        一个用于治疗特发性肺纤维化（IPF）的候选药物，并于 2021 年进入 Phase I 临床试验。
        传统类似项目通常需要 4–5 年。
      </p>

      <h3>AlphaFold 2：蛋白质折叠问题的革命（2020）</h3>
      <p>
        DeepMind 的 AlphaFold 2 以原子级精度预测蛋白质三维结构，
        解决了困扰生物学界 50 年的"蛋白质折叠问题"。
        它已预测了超过 2 亿个蛋白质结构（几乎覆盖所有已知蛋白质），
        为靶点识别和分子对接提供了前所未有的结构信息。
      </p>

      <div className="info-box">
        <strong>IC MSc 课程关联：</strong>
        这些案例正是 <em>AI in Chemistry: Drug Discovery</em> 课程的核心内容。
        你将在 Halicin 类模型（深度学习+分子筛选）和 AlphaFold（蛋白质结构预测）上亲手操作。
      </div>

      {/* Section 6 */}
      <h2 id="s6">5.1.6 本路径的学习地图 / Roadmap of This Learning Path</h2>
      <p>
        接下来的 AI in Drug Discovery 路径将按照药物发现的实际流程展开，
        每章聚焦一个核心主题：
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>章节</th><th>主题</th><th>你将掌握</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ch5.1</strong>（本章）</td>
              <td>Pipeline 全貌</td>
              <td>整体框架，AI 改变了哪些环节</td>
            </tr>
            <tr>
              <td><strong>Ch5.2</strong></td>
              <td>靶点识别</td>
              <td>靶点发现方法、AlphaFold 应用、可成药性分析</td>
            </tr>
            <tr>
              <td><strong>Ch5.3</strong></td>
              <td>Hit/Lead/Candidate</td>
              <td>三个阶段的定义、优化策略、多参数优化（MPO）</td>
            </tr>
            <tr>
              <td><strong>Ch6.1–6.3</strong></td>
              <td>药物性质评估</td>
              <td>ADMET 深入、Lipinski 五规则、RDKit 实操筛选</td>
            </tr>
            <tr>
              <td><strong>Ch7.1–7.3</strong></td>
              <td>QSAR 进阶</td>
              <td>特征工程、模型选择、Lab 构建预测模型</td>
            </tr>
            <tr>
              <td><strong>Ch8.1–8.4</strong></td>
              <td>深度学习与分子生成</td>
              <td>GNN、VAE/GAN、主动学习、DeepChem 实操</td>
            </tr>
            <tr>
              <td><strong>Ch9.1–9.2</strong></td>
              <td>分子对接</td>
              <td>对接原理、打分函数、结构导向的药物设计</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>前置知识检查：</strong>在继续之前，建议你已完成
        Chemistry Fundamentals 路径（Ch1–3）了解基础化学概念，
        以及 Cheminformatics 路径（Ch4.1–4.3）掌握 RDKit 和 QSAR 基础。
        本路径假设你已熟悉 Python 和机器学习基础。
      </div>

    </div>
  )
}
