export const ch3DrugDiscoveryPipelineMeta = {
  id: 'ch3-2-drug-discovery-pipeline',
  title: 'Drug Discovery Pipeline',
  titleZh: '药物发现流程',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch3. Drug-like Properties',
  estimatedMinutes: 40,
  difficulty: '🔴 重点',
  prev: { id: 'ch3-1-molecular-properties', title: 'Molecular Properties & ADMET', path: '/learn/ch3-molecular-properties' },
  next: { id: 'ch3-3-reaction-mechanisms', title: 'Reaction Mechanisms & Retrosynthesis', path: '/learn/ch3-reaction-mechanisms' },
}

export function Ch3DrugDiscoveryPipelineContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">3.2.1 药物发现总览 / Overview of Drug Discovery</h2>
      <p>
        从一个最初的想法到一款上市药物，平均需要<strong>10–15 年</strong>时间和<strong>10–20 亿美元</strong>投入，
        且成功率极低。理解整个流程，是理解 AI 为何能在药物发现中产生价值的前提。
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>阶段</th><th>英文</th><th>主要任务</th><th>典型耗时</th><th>成功率</th></tr>
          </thead>
          <tbody>
            <tr><td>靶点发现</td><td>Target Identification</td><td>确定与疾病相关的蛋白靶标</td><td>1–3 年</td><td>—</td></tr>
            <tr><td>苗头化合物</td><td>Hit Discovery</td><td>从化合物库中找到初步有活性的分子</td><td>1–2 年</td><td>~5%</td></tr>
            <tr><td>先导化合物</td><td>Lead Optimization</td><td>优化活性、选择性、ADMET</td><td>2–3 年</td><td>~10%</td></tr>
            <tr><td>临床前研究</td><td>Preclinical</td><td>动物实验：安全性、药代动力学</td><td>1–2 年</td><td>~60%</td></tr>
            <tr><td>I 期临床</td><td>Phase I</td><td>健康志愿者：安全性、剂量爬坡</td><td>1–2 年</td><td>~65%</td></tr>
            <tr><td>II 期临床</td><td>Phase II</td><td>患者：初步疗效、剂量确认</td><td>2–3 年</td><td>~35%</td></tr>
            <tr><td>III 期临床</td><td>Phase III</td><td>大规模患者：疗效 vs 标准治疗</td><td>3–5 年</td><td>~65%</td></tr>
            <tr><td>上市审批</td><td>NDA/BLA</td><td>FDA/EMA 审批，上市销售</td><td>1–2 年</td><td>~85%</td></tr>
          </tbody>
        </table>
      </div>

      <div className="note-box">
        <strong>为什么失败率这么高？</strong>
        <br />
        进入 I 期临床的候选药物中，只有约 <strong>10%</strong> 最终上市。失败原因：
        <ul>
          <li>~40% — ADMET 问题（毒性、药代动力学差）</li>
          <li>~30% — 疗效不足（靶点选择错误或活性不够）</li>
          <li>~20% — 商业原因（市场规模、竞争）</li>
          <li>~10% — 安全性问题（临床毒性）</li>
        </ul>
        这解释了为什么 AI 在"早期阶段筛掉坏候选药物"上的价值如此巨大——
        越早发现问题，损失越小。
      </div>

      {/* Section 2 */}
      <h2 id="s2">3.2.2 靶点发现与验证 / Target Identification & Validation</h2>
      <p>
        <span className="term">药物靶标（Drug Target）</span>是药物发挥作用的生物分子，
        通常是蛋白质（酶、受体、离子通道、转运蛋白）。
        确认一个靶标与疾病的因果关系，是整个流程的起点。
      </p>

      <h3>主要靶标类型 / Target Classes</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>靶标类型</th><th>占批准药物比例</th><th>典型例子</th><th>小分子药物举例</th></tr>
          </thead>
          <tbody>
            <tr><td>GPCR（G蛋白偶联受体）</td><td>~35%</td><td>β₂-肾上腺素受体、多巴胺受体</td><td>沙丁胺醇、氯氮平</td></tr>
            <tr><td>激酶（Kinases）</td><td>~25%</td><td>BCR-ABL、EGFR、VEGFR</td><td>伊马替尼、吉非替尼</td></tr>
            <tr><td>离子通道（Ion Channels）</td><td>~15%</td><td>hERG、Nav1.7、CFTR</td><td>利多卡因、氨氯地平</td></tr>
            <tr><td>核受体（Nuclear Receptors）</td><td>~10%</td><td>雌激素受体、糖皮质激素受体</td><td>他莫昔芬、地塞米松</td></tr>
            <tr><td>蛋白酶（Proteases）</td><td>~5%</td><td>HIV蛋白酶、凝血酶</td><td>利托那韦、利伐沙班</td></tr>
          </tbody>
        </table>
      </div>

      <h3>靶点验证方法 / Target Validation</h3>
      <p>
        发现一个基因/蛋白与疾病相关还不够，还需要"验证"——证明干预这个靶点能改善疾病：
      </p>
      <ul>
        <li><strong>遗传学证据：</strong>GWAS（全基因组关联研究）显示该基因变异与疾病风险相关</li>
        <li><strong>基因敲除/沉默（KO/siRNA）：</strong>去掉这个基因，动物/细胞是否表现出类似疾病或对药物产生反应</li>
        <li><strong>患者样本：</strong>靶蛋白在患者组织中的表达/突变与疾病严重程度相关</li>
        <li><strong>临床验证（人类遗传学）：</strong>自然发生的功能缺失突变是最强的验证——例如 PCSK9 突变导致低 LDL，验证了 PCSK9 作为降脂靶点</li>
      </ul>

      <div className="note-box">
        <strong>AlphaFold 的颠覆性意义</strong>
        <br />
        靶点结构是虚拟筛选（Virtual Screening）和基于结构的药物设计（SBDD）的前提。
        2021 年，DeepMind 的 AlphaFold2 能以实验精度预测几乎所有蛋白质的三维结构，
        发布了超过 2 亿个蛋白结构数据库（AlphaFold DB）。
        这使得原来"没有晶体结构就无法做 SBDD"的瓶颈基本消除，
        是近十年 AI 在生命科学中最重大的突破之一。
      </div>

      {/* Section 3 */}
      <h2 id="s3">3.2.3 苗头化合物发现 / Hit Discovery</h2>
      <p>
        确定靶点后，需要在庞大的化学空间中找到能与靶点结合的分子——
        <span className="term">苗头化合物（Hit）</span>：在生物测定中表现出可重现活性的化合物。
      </p>

      <h3>高通量筛选 HTS / High-Throughput Screening</h3>
      <p>
        传统方法：机器人化自动化平台，将<strong>数十万至数百万</strong>个化合物（化合物库）
        与靶蛋白进行体外活性测定，筛选出活性化合物。
      </p>
      <ul>
        <li>优点：无需假设，全面覆盖化学多样性</li>
        <li>缺点：成本高（每次筛选数百万美元），命中率通常仅 0.01%–1%，存在大量假阳性（PAINS）</li>
      </ul>

      <h3>虚拟筛选 VS / Virtual Screening</h3>
      <p>
        用计算方法预筛化合物，只将"计算预测有活性"的子集送去实验验证，大幅降低成本：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>方式</th><th>原理</th><th>需要</th></tr>
          </thead>
          <tbody>
            <tr><td>基于配体（LBVS）</td><td>Tanimoto 相似度：与已知活性分子相似的化合物可能也有活性</td><td>已知活性化合物 SMILES</td></tr>
            <tr><td>基于结构（SBVS / Docking）</td><td>将分子放入靶蛋白结合口袋，计算结合能（打分函数）</td><td>靶蛋白 3D 结构（PDB/AlphaFold）</td></tr>
            <tr><td>AI 预测（QSAR/DL）</td><td>训练模型预测活性，对大型虚拟库打分</td><td>已知活性数据集（ChEMBL）</td></tr>
          </tbody>
        </table>
      </div>

      <h3>分子对接简介 / Molecular Docking</h3>
      <p>
        <span className="term">分子对接（Molecular Docking）</span>
        是虚拟筛选的核心工具：将配体（小分子）放入受体（蛋白）的结合口袋，
        搜索最低能量的结合姿态（Pose），并用打分函数评估结合亲和力。
      </p>
      <ul>
        <li><strong>常用软件：</strong>AutoDock Vina（开源）、Glide（Schrödinger，商业）、GOLD、rDock</li>
        <li><strong>打分函数：</strong>综合考虑静电、疏水、氢键、形状互补等能量项</li>
        <li><strong>局限性：</strong>传统对接不考虑蛋白柔性（"induced fit"问题）；打分函数不精确，假阳性率高</li>
      </ul>

      <h3>基于片段的药物设计 FBDD / Fragment-Based Drug Design</h3>
      <p>
        与 HTS 筛选大型类药分子不同，FBDD 筛选小型"片段"（MW ＜ 300，符合 Ro3）：
      </p>
      <ul>
        <li>片段库小（约 1000–5000 个分子），但覆盖化学空间效率高</li>
        <li>用高灵敏度技术（NMR、X射线晶体学、SPR）检测弱结合（mM 级别）</li>
        <li>把多个片段"拼接"或"生长"成完整先导化合物</li>
        <li>成功案例：维罗非尼（Vemurafenib，BRAF 抑制剂，黑色素瘤）</li>
      </ul>

      {/* Section 4 */}
      <h2 id="s4">3.2.4 先导化合物优化 / Lead Optimization</h2>
      <p>
        苗头化合物通常活性不够强、选择性不够好、ADMET 性质差。
        先导优化的目标是在保持活性的同时，改善所有其他性质。
        这是一个迭代的"设计–合成–测试"（Design-Make-Test-Analyze，DMTA）循环。
      </p>

      <h3>构效关系 SAR / Structure-Activity Relationship</h3>
      <p>
        <span className="term">SAR（Structure-Activity Relationship）</span>
        通过系统改变分子的化学基团，研究结构变化对活性的影响。
        例如：
      </p>
      <div className="note-box">
        基准分子（苯环连 –NH₂，IC₅₀ = 1 µM）：
        <ul>
          <li>将 –NH₂ 改为 –NHCH₃ → IC₅₀ = 0.3 µM（活性提升 3 倍，甲基化有利）</li>
          <li>将 –NH₂ 改为 –NO₂ → IC₅₀ = 50 µM（活性大幅下降）</li>
          <li>苯环邻位加 –F → IC₅₀ = 0.1 µM，logP 降低（氟取代改善活性和代谢稳定性）</li>
        </ul>
        通过 SAR，药物化学家逐步绘制出"活性地图"，指导下一轮合成。
      </div>

      <h3>生物等排体 / Bioisosteres</h3>
      <p>
        <span className="term">生物等排体（Bioisostere）</span>是指可以替换某个官能团，
        同时保持活性但改善其他性质（如代谢稳定性、溶解度）的结构单元：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>原始基团</th><th>等排体替换</th><th>改善目的</th></tr>
          </thead>
          <tbody>
            <tr><td>–COOH（羧酸）</td><td>–SO₂NH₂（磺酰胺）、–CONHOH</td><td>改善膜渗透性，降低极性</td></tr>
            <tr><td>苯环</td><td>吡啶、嘧啶、噻吩</td><td>改善溶解度，增加 H 键受体，规避代谢</td></tr>
            <tr><td>–NH₂（芳香胺）</td><td>–NHSO₂R、吡唑环</td><td>消除结构警报（致癌风险）</td></tr>
            <tr><td>酯键（–COO–）</td><td>酰胺（–CONH–）</td><td>防止酯酶水解，提高代谢稳定性</td></tr>
            <tr><td>H（苯环）</td><td>–F（氟）</td><td>封锁代谢热点，略微提升脂溶性</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        氟取代（–H → –F）是现代药物化学最常用的手段之一，
        约 20–25% 的上市药物含有至少一个氟原子。
      </p>

      <h3>多参数优化 MPO / Multi-Parameter Optimization</h3>
      <p>
        先导优化面临的核心挑战是同时优化多个目标（活性、选择性、logP、溶解度、hERG 安全性……），
        且它们往往相互冲突（提高亲脂性可以增强活性，但也增大 hERG 毒性风险）。
        <span className="term">MPO（Multi-Parameter Optimization）</span>
        将多个性质的期望值组合成综合评分，指导结构修饰方向。
        AI 分子生成和优化模型（如强化学习 + 多目标奖励）正是在自动化这个过程。
      </p>

      {/* Section 5 */}
      <h2 id="s5">3.2.5 临床前与临床研究 / Preclinical & Clinical Studies</h2>

      <h3>临床前研究 / Preclinical</h3>
      <p>
        候选药物（Drug Candidate）确定后，在人体试验前需完成：
      </p>
      <ul>
        <li><strong>体外（In vitro）：</strong>细胞毒性、CYP 抑制、hERG 测定、Ames 试验</li>
        <li><strong>体内（In vivo）：</strong>啮齿类动物（大鼠/小鼠）+ 非啮齿类（犬/猴）的急性/慢性毒性、PK 研究</li>
        <li><strong>IND 申请（Investigational New Drug）：</strong>向 FDA 提交申请，获批后才能进行人体试验</li>
      </ul>

      <h3>临床三期 / Clinical Phases</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>阶段</th><th>受试者</th><th>规模</th><th>主要目的</th></tr>
          </thead>
          <tbody>
            <tr><td>Phase I</td><td>健康志愿者</td><td>20–100 人</td><td>首次人体，安全性、耐受性、PK/PD</td></tr>
            <tr><td>Phase II</td><td>目标患者</td><td>100–500 人</td><td>初步疗效、剂量范围确认、不良反应</td></tr>
            <tr><td>Phase III</td><td>目标患者（多中心）</td><td>500–5000 人</td><td>大规模疗效确认 vs 标准治疗或安慰剂</td></tr>
            <tr><td>Phase IV</td><td>上市后监测</td><td>数万人</td><td>长期安全性、罕见不良反应、新适应症</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Phase III 是最昂贵、失败最贵的阶段。AI 的一个重要价值就是在 Phase I/II 之前
        通过更好的患者分层（生物标志物）预测哪些患者最可能受益，
        提高 Phase II/III 的成功率。
      </p>

      {/* Section 6 */}
      <h2 id="s6">3.2.6 AI 在药物发现中的应用 / AI in Drug Discovery</h2>
      <p>
        AI 正在改变药物发现的每一个阶段。以下是当前最成熟的 AI 应用，也是 IC 课程的核心内容：
      </p>

      <h3>各阶段 AI 应用地图</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>流程阶段</th><th>AI 应用</th><th>代表方法/工具</th></tr>
          </thead>
          <tbody>
            <tr><td>靶点发现</td><td>蛋白结构预测</td><td>AlphaFold2、RoseTTAFold</td></tr>
            <tr><td>苗头化合物</td><td>虚拟筛选、从头生成</td><td>AutoDock + GNN、DiffSBDD、RFDiffusion</td></tr>
            <tr><td>先导优化</td><td>性质预测（QSAR）、分子生成</td><td>ChemBERTa、REINVENT（强化学习）、多目标 BO</td></tr>
            <tr><td>ADMET 预测</td><td>吸收/毒性/代谢预测</td><td>ADMETlab、TDC、DeepPurpose</td></tr>
            <tr><td>临床设计</td><td>患者分层、生物标志物</td><td>机器学习 + 基因组学</td></tr>
            <tr><td>合成路线规划</td><td>逆合成分析</td><td>AiZynthFinder、ASKCOS、ChemPlanner</td></tr>
          </tbody>
        </table>
      </div>

      <h3>分子生成模型 / Generative Models for Molecules</h3>
      <p>
        传统药物发现从现有化合物库中"筛选"，而 AI 生成模型可以"设计"全新分子：
      </p>
      <ul>
        <li>
          <strong>VAE（变分自编码器）：</strong>将分子 SMILES 编码到连续潜在空间，
          在潜在空间中采样后解码为新分子（如 JT-VAE）
        </li>
        <li>
          <strong>强化学习（RL）：</strong>以活性预测、QED、ADMET 分数为奖励，
          训练生成器产生满足多目标的分子（如 REINVENT）
        </li>
        <li>
          <strong>扩散模型（Diffusion）：</strong>在 3D 空间中生成与靶点口袋形状互补的配体
          （如 DiffSBDD、DiffDock）
        </li>
        <li>
          <strong>大语言模型（LLM）：</strong>以 SMILES 为"化学语言"的 Transformer 预训练模型
          （如 MolGPT、ChemBERTa），用于性质预测和条件生成
        </li>
      </ul>

      <h3>成功案例 / Real-World AI Drug Discovery Cases</h3>
      <div className="note-box">
        <ul>
          <li>
            <strong>Insilico Medicine：</strong>2019 年用 AI（生成模型 + QSAR）设计 DDR1 激酶抑制剂，
            46 天从零完成 Hit 到先导化合物，2023 年进入 II 期临床（肺纤维化）
          </li>
          <li>
            <strong>Exscientia：</strong>AI 设计的 DSP-1181（OCD，5-HT1A 激动剂）仅用 12 个月（传统需 4–5 年）进入临床
          </li>
          <li>
            <strong>Halicin（MIT，2020）：</strong>用图神经网络对 6100 万个分子筛选抗菌活性，
            发现 Halicin——一种结构全新、对耐药菌有效的抗生素
          </li>
          <li>
            <strong>AlphaFold2（2021）：</strong>预测 2 亿个蛋白结构，彻底改变了靶点结构研究的门槛
          </li>
        </ul>
      </div>

      <h3>AI 的局限性 / Current Limitations</h3>
      <ul>
        <li><strong>数据质量：</strong>ChEMBL 中大量数据来自不同实验室、不同条件，噪音大</li>
        <li><strong>分布外泛化：</strong>模型在训练集之外（新颖化学骨架）的预测准确率大幅下降</li>
        <li><strong>可解释性：</strong>GNN/深度学习模型"黑盒"，药化学家难以从预测中获得设计洞见</li>
        <li><strong>合成可行性：</strong>生成的分子可能很难或无法合成（AI 不理解"化学反应能否发生"）</li>
        <li><strong>临床相关性：</strong>体外/计算预测与动物实验、人体临床结果之间仍有巨大鸿沟</li>
      </ul>

      <div className="note-box">
        <strong>本章总结 / Chapter Summary</strong>
        <ul>
          <li>药物发现从靶点发现到上市平均 10–15 年，约 90% 临床候选药物最终失败</li>
          <li>GPCR（35%）和激酶（25%）是最重要的两类药物靶标；AlphaFold 解决了靶点结构问题</li>
          <li>苗头化合物发现三大策略：HTS（暴力筛选）、虚拟筛选（计算预筛）、FBDD（片段拼接）</li>
          <li>先导优化通过 SAR、生物等排体替换和 MPO 评分同时改善活性与 ADMET</li>
          <li>临床三期依次验证安全性（I 期）、初步疗效（II 期）、大规模疗效（III 期）</li>
          <li>AI 正在改变靶点发现（AlphaFold）、分子生成（REINVENT、扩散模型）、ADMET 预测和逆合成规划等每个阶段</li>
        </ul>
      </div>

    </div>
  )
}
