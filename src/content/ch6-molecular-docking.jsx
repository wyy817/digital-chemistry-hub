export const ch6MolecularDockingMeta = {
  id: 'ch6-3-molecular-docking',
  title: 'Molecular Docking & Virtual Screening',
  titleZh: '分子对接与虚拟筛选',
  path: 'AI in Drug Discovery',
  chapter: 'Ch6. ADMET & Drug-likeness',
  estimatedMinutes: 55,
  difficulty: '🟡 入门',
  prev: { title: '6.2 Drug-likeness & Lead Opt.', path: '/learn/ch6-drug-likeness' },
  next: null,
}

export function Ch6MolecularDockingContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">6.3.1 分子对接的核心思想</h2>
      <p>
        <strong>分子对接（Molecular Docking）</strong>回答一个简单却至关重要的问题：
        小分子配体如何嵌入蛋白质靶点的结合口袋，以及结合有多紧密？
        它模拟的是真实生物过程——药物分子在体内与靶蛋白相互作用的第一步。
      </p>
      <p>
        对接由两个核心任务构成：<strong>搜索（Search）</strong>和<strong>评分（Scoring）</strong>。
        搜索算法在结合口袋中探索配体的各种位置和构象；评分函数则对每种构象打分，预测结合亲和力。
        得分最高的构象称为<strong>对接姿态（Pose）</strong>。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>核心概念</th><th>含义</th><th>类比</th></tr>
          </thead>
          <tbody>
            <tr><td>结合口袋（Binding Pocket）</td><td>蛋白质表面的三维凹槽，通常是活性位点</td><td>锁孔</td></tr>
            <tr><td>配体（Ligand）</td><td>待对接的小分子药物候选物</td><td>钥匙</td></tr>
            <tr><td>对接姿态（Pose）</td><td>配体在口袋中的特定位置+构象</td><td>钥匙插入锁的具体方式</td></tr>
            <tr><td>评分函数（Scoring Function）</td><td>预测结合强度的数学模型</td><td>判断钥匙是否合适的标准</td></tr>
            <tr><td>结合自由能（ΔG）</td><td>结合稳定性的热力学度量（越负越稳定）</td><td>锁与钥匙的契合度</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        现代对接的理论基础来自<strong>"诱导契合"（Induced Fit）</strong>模型：
        配体结合时，蛋白质口袋的构象会做出响应性调整，并非完全刚性。
        这比早期的"锁钥"模型更接近真实情况，也是对接软件不断进化的方向之一。
      </p>

      {/* Section 2 */}
      <h2 id="s2">6.3.2 对接软件与算法：AutoDock Vina 为例</h2>
      <p>
        <strong>AutoDock Vina</strong> 是学术界最广泛使用的开源对接软件之一，
        由 Trott 和 Olson 于 2010 年发布。其核心思路是将搜索和评分合并为一个优化问题，
        使用<strong>梯度优化 + 蒙特卡洛随机搜索</strong>的混合策略。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>软件</th><th>开发方</th><th>特点</th><th>适用场景</th></tr>
          </thead>
          <tbody>
            <tr><td>AutoDock Vina</td><td>Scripps Research</td><td>开源、速度快、精度适中</td><td>学术研究、虚拟筛选</td></tr>
            <tr><td>Glide（Schrödinger）</td><td>Schrödinger</td><td>精度高、商业软件</td><td>工业界先导优化</td></tr>
            <tr><td>GOLD</td><td>CCDC</td><td>处理柔性蛋白较好</td><td>工业研究</td></tr>
            <tr><td>rDock</td><td>开源</td><td>轻量、可定制</td><td>高通量筛选</td></tr>
            <tr><td>Gnina</td><td>学术开源</td><td>深度学习评分函数</td><td>AI 增强对接</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        用 AutoDock Vina 进行对接的基本流程：
      </p>
      <ol>
        <li><strong>准备受体（蛋白质）：</strong>从 PDB 下载结构，移除水分子，加氢，分配电荷，转换为 PDBQT 格式。</li>
        <li><strong>准备配体：</strong>生成三维结构，加氢，分配 Gasteiger 电荷，标记可旋转键，转为 PDBQT。</li>
        <li><strong>定义搜索盒子（Grid Box）：</strong>以结合口袋为中心定义搜索空间的三维范围（通常 20–30 Å 边长）。</li>
        <li><strong>运行对接：</strong>Vina 在搜索盒子内探索配体的位置和构象，输出多个对接姿态及评分。</li>
        <li><strong>分析结果：</strong>查看最优姿态，验证关键相互作用（氢键、疏水接触、静电等）。</li>
      </ol>
      <p>
        Vina 的评分函数采用<strong>经验式（Empirical）</strong>方法，包含以下项：
        高斯项（vdW 吸引力）、排斥项（空间冲突）、氢键项、疏水项和旋转熵惩罚。
        输出的分数单位是 kcal/mol，越低（越负）代表预测结合越强。
      </p>

      {/* Section 3 */}
      <h2 id="s3">6.3.3 评分函数的三大类型</h2>
      <p>
        评分函数是对接精度的核心瓶颈。目前主流的评分策略分为三大类：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>类型</th><th>原理</th><th>优点</th><th>局限</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>力场式（Force-field）</strong></td>
              <td>基于物理力场计算 vdW、静电、键角等能量项</td>
              <td>物理基础扎实</td>
              <td>忽略溶剂化熵，计算慢</td>
            </tr>
            <tr>
              <td><strong>经验式（Empirical）</strong></td>
              <td>对实验数据回归拟合多个能量项（氢键、疏水等）</td>
              <td>速度快、易扩展</td>
              <td>依赖训练数据，外推性差</td>
            </tr>
            <tr>
              <td><strong>知识式（Knowledge-based）</strong></td>
              <td>统计 PDB 中原子对接触频率，转化为势能</td>
              <td>不依赖物理参数</td>
              <td>依赖结构数据库质量</td>
            </tr>
            <tr>
              <td><strong>深度学习式（ML-based）</strong></td>
              <td>用神经网络学习蛋白-配体结合特征</td>
              <td>精度高，可捕捉复杂特征</td>
              <td>需大量训练数据，可解释性差</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        近年来，<strong>基于深度学习的评分函数</strong>（如 DeepDock、Gnina、DiffDock）
        在基准测试中显著超越传统方法。尤其是 <strong>DiffDock</strong>（MIT，2023）
        将扩散模型（Diffusion Model）引入对接，直接预测配体姿态分布，
        而非穷举搜索+打分，代表了对接范式的重大转变。
      </p>
      <p>
        然而，高评分≠高活性。评分函数的<strong>误差范围</strong>通常在 1–2 kcal/mol，
        而 10 倍活性差异对应约 1.4 kcal/mol——这意味着对接只能粗筛，
        不能精确预测活性排序。对接后的实验验证永远是必要的。
      </p>

      {/* Section 4 */}
      <h2 id="s4">6.3.4 虚拟筛选：从百万化合物到几十个候选</h2>
      <p>
        <strong>虚拟筛选（Virtual Screening，VS）</strong>是对接的大规模应用场景：
        将数十万到数百万的化合物库逐一对接到靶点口袋，
        根据评分排序，筛选出最有潜力的化合物进入实验验证。
        相比高通量实验筛选（HTS），虚拟筛选成本更低、速度更快、可覆盖更大化学空间。
      </p>
      <p>
        典型的虚拟筛选流程（漏斗式）：
      </p>
      <ol>
        <li><strong>化合物库准备：</strong>ZINC、Enamine REAL、ChemBridge 等（数百万~十亿分子）</li>
        <li><strong>2D 过滤：</strong>类药性过滤（Ro5/Veber）+ PAINS 去除，缩减至 10–20%</li>
        <li><strong>快速对接（Glide SP / Vina）：</strong>粗筛，保留前 1–5%</li>
        <li><strong>精准对接（Glide XP / Induced Fit）：</strong>精筛，保留前 0.1–0.5%</li>
        <li><strong>ADMET 预测：</strong>SwissADME / ADMETlab 进一步过滤</li>
        <li><strong>目视检查（Visual Inspection）：</strong>专家审查对接姿态，确认关键相互作用</li>
        <li><strong>购买/合成 + 实验验证：</strong>最终候选物（通常 20–100 个）</li>
      </ol>
      <p>
        商业化合物库如 <strong>Enamine REAL</strong> 已包含超过 60 亿可合成分子，
        而超大规模虚拟筛选（Ultra-Large Virtual Screening）配合 GPU 加速，
        已能在数天内完成数十亿分子的粗筛，代表性工作包括 Lyu et al.（Nature，2019）
        对 1.4 亿分子的 AmpC β-内酰胺酶虚拟筛选。
      </p>

      {/* Section 5 */}
      <h2 id="s5">6.3.5 AI 增强对接：DiffDock 与生成式对接</h2>
      <p>
        传统对接的搜索-评分范式存在根本性局限：搜索空间巨大，评分函数不准确。
        AI 方法从两个方向突破这一瓶颈。
      </p>
      <p>
        <strong>1. 深度学习评分函数：</strong>用图神经网络（GNN）或 Transformer
        直接从蛋白质-配体原子图预测结合亲和力（如 AtomNet、DeepDock、IGN）。
        这类方法在 CASF-2016 等基准上取得更好的排序精度（Pearson r 提升 0.1–0.2）。
      </p>
      <p>
        <strong>2. 端到端姿态预测：</strong><strong>DiffDock</strong>（Corso et al., 2023）
        将对接重建为<em>生成式问题</em>——使用<strong>扩散模型</strong>
        学习配体在蛋白口袋中的位置、方向和内部扭转角的联合分布，
        直接采样出合理姿态，完全跳过传统搜索步骤。
        在 PoseBusters 基准上，DiffDock 的成功率（RMSD &lt; 2 Å）达到 ~38%，
        超过 AutoDock Vina 的 ~20%（柔性配体）。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>方法</th><th>AI 技术</th><th>特点</th><th>代表工作</th></tr>
          </thead>
          <tbody>
            <tr><td>传统对接</td><td>无</td><td>搜索空间大，速度慢</td><td>AutoDock Vina</td></tr>
            <tr><td>DL 评分</td><td>GNN / Transformer</td><td>排序精度提升</td><td>IGN, DeepDock</td></tr>
            <tr><td>扩散模型对接</td><td>Diffusion Model</td><td>端到端生成姿态</td><td>DiffDock (2023)</td></tr>
            <tr><td>结合口袋预测</td><td>CNN / Transformer</td><td>自动识别结合位点</td><td>FPocket, SiteMap</td></tr>
            <tr><td>共价对接</td><td>物理模型 + ML</td><td>处理共价键形成</td><td>CovDock (Schrödinger)</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        AlphaFold2 的兴起为对接带来了新的可能——对于没有实验结构的靶点，
        可以先用 AlphaFold 预测蛋白质结构，再进行对接（<strong>Structure-based Drug Discovery against AF2 structures</strong>）。
        但需注意：AF2 结构的侧链和口袋构象精度有限，直接对接效果可能不如实验结构。
      </p>

      {/* Section 6 */}
      <h2 id="s6">6.3.6 综合案例：SARS-CoV-2 主蛋白酶抑制剂的发现</h2>
      <p>
        SARS-CoV-2 的<strong>主蛋白酶（Mpro，3CLpro）</strong>是抗新冠病毒药物开发的核心靶点之一。
        其活性位点有清晰的底物结合口袋，适合基于结构的药物设计。
        2020–2022 年间，多个团队利用虚拟筛选对这一靶点进行了大规模筛选，
        完美展示了现代 SBDD 工作流。
      </p>
      <p>
        <strong>Diamond Light Source 的 XChem 碎片筛选（2020）</strong>是其中的里程碑之一：
        团队对 Mpro 进行了结晶碎片筛选，发现了 71 个结合片段；
        随后社区科学家将这些片段作为起点进行虚拟对接和生长，
        在几周内生成了数千个候选分子——这一开放科学项目（COVID Moonshot）
        最终推动了口服抗病毒化合物进入临床前研究。
      </p>
      <p>
        与此同时，辉瑞的 <strong>Nirmatrelvir（奈玛特韦，Paxlovid 的核心成分）</strong>
        也是从 Mpro 结构出发，通过 SBDD 和对接迭代优化，
        在约 18 个月内从苗头化合物推进到临床批准——创造了历史上最快的药物发现纪录之一。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>阶段</th><th>方法</th><th>结果</th></tr>
          </thead>
          <tbody>
            <tr><td>靶点结构获取</td><td>X 射线晶体学（PDB: 6LU7）</td><td>Mpro 高分辨率结构（2.16 Å）</td></tr>
            <tr><td>碎片筛选</td><td>XChem 结晶碎片筛选</td><td>71 个结合碎片</td></tr>
            <tr><td>虚拟对接</td><td>AutoDock Vina + 自定义评分</td><td>千万分子粗筛→前 1000</td></tr>
            <tr><td>合成 + 测活</td><td>HTS 协作</td><td>确认苗头化合物</td></tr>
            <tr><td>先导优化</td><td>MMP + SBDD 迭代</td><td>Nirmatrelvir（辉瑞路线）</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        这一案例说明，对接并非单独使用——它是 SBDD 流程中的一个环节，
        需要与结晶学、计算化学、合成化学和药理学密切配合，
        才能将计算结果转化为真实的候选药物。
      </p>
    </div>
  )
}
