export const ch3MolecularPropertiesMeta = {
  id: 'ch3-1-molecular-properties',
  title: 'Molecular Properties & ADMET',
  titleZh: '分子性质与 ADMET',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch3. Drug-like Properties',
  estimatedMinutes: 45,
  difficulty: '🔴 重点',
  prev: { id: 'ch2-2-smiles', title: 'SMILES & Molecular Representation', path: '/learn/ch2-smiles' },
  next: { id: 'ch3-2-drug-discovery-pipeline', title: 'Drug Discovery Pipeline', path: '/learn/ch3-drug-discovery-pipeline' },
}

export function Ch3MolecularPropertiesContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">3.1.1 分子描述符 / Molecular Descriptors</h2>
      <p>
        在机器学习预测分子性质之前，我们需要把分子"翻译"成数字。
        <span className="term">分子描述符（Molecular Descriptor）</span>就是从分子结构计算出来的数值特征，
        描述分子的大小、极性、柔性、氢键能力等物理化学性质。
      </p>
      <p>
        描述符可以分为三类：
      </p>
      <ul>
        <li><strong>一维（1D）：</strong>分子式层面，如分子量、原子数、分子式</li>
        <li><strong>二维（2D）：</strong>基于拓扑结构，如 logP、HBD、HBA、PSA、可旋转键数——不依赖 3D 构象，计算快</li>
        <li><strong>三维（3D）：</strong>基于 3D 坐标，如分子体积、表面积、偶极矩——需要先做构象搜索，计算慢但信息更丰富</li>
      </ul>

      <h3>核心 2D 描述符 / Key 2D Descriptors</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>描述符</th><th>全称</th><th>含义</th><th>典型范围（类药分子）</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>MW</strong></td><td>Molecular Weight</td><td>分子量（g/mol）</td><td>≤ 500</td></tr>
            <tr><td><strong>logP</strong></td><td>Octanol-Water Partition Coeff.</td><td>脂溶性指标，值越大越亲脂</td><td>≤ 5（理想 1–3）</td></tr>
            <tr><td><strong>HBD</strong></td><td>H-Bond Donors</td><td>氢键供体数（–OH、–NH 数）</td><td>≤ 5</td></tr>
            <tr><td><strong>HBA</strong></td><td>H-Bond Acceptors</td><td>氢键受体数（N、O 原子数）</td><td>≤ 10</td></tr>
            <tr><td><strong>PSA</strong></td><td>Polar Surface Area</td><td>极性表面积（Å²），N/O 相关</td><td>≤ 140 Å²（口服吸收）</td></tr>
            <tr><td><strong>RotBonds</strong></td><td>Rotatable Bonds</td><td>可旋转键数，反映柔性</td><td>≤ 10</td></tr>
            <tr><td><strong>Rings</strong></td><td>Ring Count</td><td>环数，芳香环占比</td><td>—</td></tr>
          </tbody>
        </table>
      </div>

      <h3>用 RDKit 计算描述符</h3>
      <div className="note-box">
        <code>from rdkit import Chem</code>
        <br />
        <code>from rdkit.Chem import Descriptors, rdMolDescriptors</code>
        <br /><br />
        <code>mol = Chem.MolFromSmiles('CC(=O)Nc1ccc(O)cc1')  # 对乙酰氨基酚 (paracetamol)</code>
        <br /><br />
        <code>mw  = Descriptors.MolWt(mol)              # → 151.16</code>
        <br />
        <code>logp = Descriptors.MolLogP(mol)           # → 0.91</code>
        <br />
        <code>hbd = rdMolDescriptors.CalcNumHBD(mol)    # → 2</code>
        <br />
        <code>hba = rdMolDescriptors.CalcNumHBA(mol)    # → 2</code>
        <br />
        <code>psa = Descriptors.TPSA(mol)               # → 49.33</code>
        <br />
        <code>rb  = rdMolDescriptors.CalcNumRotatableBonds(mol)  # → 2</code>
      </div>
      <p>
        RDKit 内置超过 200 个描述符（<code>Descriptors.descList</code> 查看全部），
        但在实际 QSAR 建模中通常先从这 6 个核心描述符入手，再按需扩展。
      </p>

      {/* Section 2 */}
      <h2 id="s2">3.1.2 Lipinski Ro5 与类药性 / Lipinski Ro5 & Drug-likeness</h2>
      <p>
        在 Ch2.1 中我们简介了 Lipinski 规则。现在从 ADMET 角度深入理解它的来源和意义。
      </p>
      <p>
        1997 年，辉瑞（Pfizer）的 Christopher Lipinski 分析了超过 2000 个口服药物后，
        总结出口服生物利用度良好的分子通常满足的规律——"五规则"（Rule of Five，Ro5）：
      </p>
      <div className="note-box">
        <strong>Lipinski 五规则（Ro5）</strong>
        <ul>
          <li>分子量 MW ≤ 500 Da</li>
          <li>脂溶性 logP ≤ 5</li>
          <li>氢键供体 HBD ≤ 5（–OH 和 –NH 数量）</li>
          <li>氢键受体 HBA ≤ 10（N 和 O 原子数量）</li>
        </ul>
        违反其中 2 条或以上，口服吸收通常较差。
        <br />
        <strong>例外：</strong>天然产物、抗生素、肽类药物可以违反 Ro5 但仍有活性（依赖主动转运）。
      </div>

      <h3>类药性评分 QED / Quantitative Estimate of Drug-likeness</h3>
      <p>
        <span className="term">QED（Quantitative Estimate of Drug-likeness）</span>
        是 2012 年提出的综合评分（0–1），整合了 8 个描述符（MW、logP、HBD、HBA、PSA、RotBonds、ArRings、Alerts），
        值越接近 1 越像已上市口服药物。
      </p>
      <div className="note-box">
        <code>from rdkit.Chem import QED</code>
        <br />
        <code>mol = Chem.MolFromSmiles('CC(=O)Nc1ccc(O)cc1')  # 对乙酰氨基酚</code>
        <br />
        <code>QED.qed(mol)  # → 0.77（较好的类药性）</code>
        <br /><br />
        <code>aspirin = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')</code>
        <br />
        <code>QED.qed(aspirin)  # → 0.55</code>
      </div>
      <p>
        在 AI 药物设计（生成模型、分子优化）中，QED 经常作为奖励函数的一部分，
        引导模型生成更具成药性的分子。
      </p>

      <h3>片段规则 / Fragment-like Rules</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>规则</th><th>MW</th><th>logP</th><th>HBD</th><th>HBA</th><th>用途</th></tr>
          </thead>
          <tbody>
            <tr><td>Lipinski Ro5</td><td>≤ 500</td><td>≤ 5</td><td>≤ 5</td><td>≤ 10</td><td>口服类药筛选</td></tr>
            <tr><td>Ro3（片段筛选）</td><td>≤ 300</td><td>≤ 3</td><td>≤ 3</td><td>≤ 3</td><td>FBDD（基于片段的药物设计）</td></tr>
            <tr><td>Veber 规则</td><td>—</td><td>—</td><td>—</td><td>—</td><td>PSA ≤ 140 Å² 且 RotBonds ≤ 10（口服生物利用度）</td></tr>
            <tr><td>Egan 规则</td><td>—</td><td>≤ 5.88</td><td>—</td><td>—</td><td>PSA ≤ 131.6 Å²（被动吸收模型）</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 3 */}
      <h2 id="s3">3.1.3 ADMET 概述 / ADMET Overview</h2>
      <p>
        一个化合物在体外实验中活性很强，不一定能成为药物。
        <span className="term">ADMET</span> 是评估候选药物能否在体内发挥作用的核心框架：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>字母</th><th>英文</th><th>中文</th><th>核心问题</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>A</strong></td><td>Absorption</td><td>吸收</td><td>药物能到达血液吗？口服后肠道能吸收多少？</td></tr>
            <tr><td><strong>D</strong></td><td>Distribution</td><td>分布</td><td>药物能到达靶器官吗？会积累在哪些组织？</td></tr>
            <tr><td><strong>M</strong></td><td>Metabolism</td><td>代谢</td><td>药物被肝脏分解成什么？代谢产物有毒吗？</td></tr>
            <tr><td><strong>E</strong></td><td>Excretion</td><td>排泄</td><td>药物如何从体内清除？半衰期是多少？</td></tr>
            <tr><td><strong>T</strong></td><td>Toxicity</td><td>毒性</td><td>有无心脏毒性、肝毒性、致突变性？</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>为什么 ADMET 比活性更重要？</strong>
        根据 FDA 统计，超过 90% 进入临床的候选药物最终失败，
        其中约 40% 是因为 ADMET 问题（而非缺乏活性）。
        这也是为什么当代 AI 药物发现中，ADMET 预测模型（如 ADMETlab、pkCSM）是标配工具。
      </p>
      <div className="note-box">
        <strong>ADMET 预测与分子描述符的关系</strong>
        <br />
        每个 ADMET 属性都与特定描述符强相关：
        <ul>
          <li><strong>吸收（A）：</strong>logP ↓、PSA ↓、HBD ↓ → 有利于被动吸收</li>
          <li><strong>分布（D）：</strong>logP ↑ → 更容易穿透细胞膜、血脑屏障</li>
          <li><strong>代谢（M）：</strong>分子中特定官能团（如酯键、胺类）易被 CYP450 代谢</li>
          <li><strong>排泄（E）：</strong>MW ↓ → 肾脏过滤效率高，半衰期短</li>
          <li><strong>毒性（T）：</strong>某些结构警报（structural alerts）与 hERG 阻断、肝毒性相关</li>
        </ul>
      </div>

      {/* Section 4 */}
      <h2 id="s4">3.1.4 吸收与分布 / Absorption & Distribution</h2>

      <h3>口服吸收 / Oral Absorption</h3>
      <p>
        药物口服后，需要穿过小肠上皮细胞进入血液，主要通过<strong>被动扩散（passive diffusion）</strong>。
        被动扩散的效率取决于：
      </p>
      <ul>
        <li><strong>脂溶性（logP）：</strong>logP 太低（＜0），分子太亲水，难以穿越脂质双层；logP 太高（＞5），分子太亲脂，溶解度差，也难以吸收。最佳范围约 1–3。</li>
        <li><strong>极性表面积（PSA）：</strong>PSA ＞ 140 Å² 时，肠道吸收通常 ＜ 10%；PSA ＜ 60 Å² 时，吸收通常良好。</li>
        <li><strong>分子大小（MW）：</strong>MW ＞ 500 Da 的分子通过被动扩散的速度大幅下降。</li>
      </ul>
      <p>
        <span className="term">生物利用度（Bioavailability，F%）</span>是衡量口服吸收的综合指标：
        口服剂量中最终进入体循环的比例。理想口服药物 F% ≥ 20%（实际越高越好）。
      </p>

      <h3>血脑屏障 / Blood-Brain Barrier (BBB)</h3>
      <p>
        大脑有特殊保护——血脑屏障（BBB），由紧密连接的内皮细胞构成，极大限制了分子的通过。
        能穿越 BBB 的分子通常需要：
      </p>
      <ul>
        <li>MW ＜ 450 Da（更小更好）</li>
        <li>logP 1–3（一定脂溶性）</li>
        <li>PSA ＜ 90 Å²（低极性）</li>
        <li>HBD ≤ 3</li>
      </ul>
      <div className="note-box">
        <strong>药物设计含义：</strong>
        <ul>
          <li>CNS（中枢神经系统）药物（如抗抑郁药、镇痛药）需要 BBB 穿透 → 设计时要控制 PSA 和 MW</li>
          <li>抗癌药、抗生素通常<strong>不希望</strong>进入大脑 → BBB 穿透性低反而是优点</li>
          <li>同一个靶标，CNS 适应症 vs 外周适应症的药物描述符设计截然不同</li>
        </ul>
      </div>

      <h3>蛋白结合率 / Plasma Protein Binding (PPB)</h3>
      <p>
        进入血液的药物大部分会与血浆蛋白（主要是白蛋白）结合，
        只有<strong>游离态（free fraction）</strong>才能发挥药效。
        高 PPB（＞ 99%）意味着实际游离浓度极低，可能影响疗效，
        也意味着药物相互作用（竞争结合位点）的风险更高。
        亲脂性强（高 logP）的分子通常 PPB 更高。
      </p>

      {/* Section 5 */}
      <h2 id="s5">3.1.5 代谢、排泄与毒性 / Metabolism, Excretion & Toxicity</h2>

      <h3>CYP450 酶系 / CYP450 Enzymes</h3>
      <p>
        肝脏是药物代谢的主要场所，核心是<span className="term">细胞色素 P450（CYP450）</span>酶系。
        这类酶通过氧化、还原、水解等反应将疏水性药物转化为更亲水的代谢产物，便于排泄。
      </p>
      <p>
        CYP450 家族有超过 50 种亚型，与药物代谢最相关的是：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>亚型</th><th>负责药物比例</th><th>典型底物</th></tr>
          </thead>
          <tbody>
            <tr><td>CYP3A4</td><td>~50%</td><td>辛伐他汀、地西泮、红霉素</td></tr>
            <tr><td>CYP2D6</td><td>~25%</td><td>可待因、他莫昔芬、β受体阻滞剂</td></tr>
            <tr><td>CYP2C9</td><td>~15%</td><td>华法林、布洛芬、甲苯磺丁脲</td></tr>
            <tr><td>CYP2C19</td><td>~10%</td><td>奥美拉唑、氯吡格雷</td></tr>
            <tr><td>CYP1A2</td><td>~10%</td><td>咖啡因、茶碱、氯氮平</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        药物代谢有两个潜在问题：
      </p>
      <ul>
        <li><strong>代谢产物毒性（Reactive Metabolites）：</strong>某些代谢产物本身有毒，如对乙酰氨基酚过量时产生的 NAPQI，会造成肝损伤。</li>
        <li><strong>药物相互作用（DDI）：</strong>一种药物抑制了某 CYP 酶，另一种由同一酶代谢的药物浓度就会升高，可能达到毒性水平。</li>
      </ul>

      <h3>排泄半衰期 / Excretion & Half-life</h3>
      <p>
        药物主要通过<strong>肾脏（尿液）</strong>或<strong>胆汁（粪便）</strong>排泄。
        <span className="term">半衰期（t₁/₂）</span>是血药浓度下降一半所需的时间，
        决定给药频率（每天 1 次 vs 每 8 小时 1 次）。
      </p>
      <ul>
        <li>MW 小、亲水性强 → 肾脏清除快 → 半衰期短 → 需要频繁给药</li>
        <li>高 PPB、亲脂性强 → 清除慢 → 半衰期长 → 每日一次甚至更少</li>
        <li><strong>前药（Prodrug）策略：</strong>将活性药物做成无活性前体，在体内被酶激活，可改善 ADMET（如氯吡格雷需 CYP2C19 激活）</li>
      </ul>

      <h3>主要毒性类型 / Key Toxicity Flags</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>毒性类型</th><th>机制</th><th>检测方法</th><th>关键描述符/结构</th></tr>
          </thead>
          <tbody>
            <tr><td>hERG 心脏毒性</td><td>阻断心脏钾通道 hERG，引发 QT 延长、心律失常</td><td>膜片钳实验（patch clamp）</td><td>高碱性 N、高 logP、高 MW</td></tr>
            <tr><td>肝毒性（DILI）</td><td>直接损伤肝细胞或活性代谢产物</td><td>细胞毒实验、ALT/AST 指标</td><td>含酯键、胺类、芳香胺</td></tr>
            <tr><td>致突变性（Ames）</td><td>损伤 DNA，致癌风险</td><td>Ames 试验（细菌突变）</td><td>亲电性官能团、硝基芳烃</td></tr>
            <tr><td>皮肤致敏</td><td>半抗原化，引发免疫反应</td><td>LLNA 动物试验</td><td>迈克尔受体、醛类</td></tr>
          </tbody>
        </table>
      </div>
      <div className="note-box">
        <strong>结构警报（Structural Alerts）</strong>是已知与毒性相关的化学官能团，例如：
        <ul>
          <li><strong>亚硝胺（–N–N=O）：</strong>强致癌物，近年污染沙坦类药物引发召回</li>
          <li><strong>醌/苯醌（quinone）：</strong>亲电性强，PAINS 之一</li>
          <li><strong>游离芳香胺（–NH₂ on aromatic ring）：</strong>代谢后可形成羟胺，潜在致癌</li>
          <li><strong>Michael acceptors（如 α,β-不饱和羰基）：</strong>与蛋白质共价结合</li>
        </ul>
        RDKit 的 <code>rdkit.Chem.FilterCatalog</code> 可用于批量过滤这些警报。
      </div>

      {/* Section 6 */}
      <h2 id="s6">3.1.6 QSAR 简介 / Introduction to QSAR</h2>
      <p>
        <span className="term">QSAR（Quantitative Structure-Activity Relationship，定量构效关系）</span>
        是利用分子描述符建立数学模型，预测分子活性或性质的方法。
        它是计算药物化学最核心的范式之一，也是现代 AI 药物发现的理论基础。
      </p>

      <h3>QSAR 建模流程</h3>
      <div className="note-box">
        <strong>典型 QSAR 流程（以预测 logS 水溶解度为例）</strong>
        <ol>
          <li><strong>数据收集：</strong>从 ChEMBL / PubChem 获取化合物的实测 logS 数据（SMILES + 数值）</li>
          <li><strong>特征计算：</strong>用 RDKit 计算每个分子的描述符向量（如 200 维 2D 描述符）</li>
          <li><strong>数据清洗：</strong>处理缺失值、去除冗余特征、标准化</li>
          <li><strong>模型训练：</strong>随机森林 / 梯度提升 / 神经网络（SMILES → GNN）</li>
          <li><strong>模型评估：</strong>R²、RMSE、交叉验证（防止过拟合）</li>
          <li><strong>适用域（Applicability Domain）：</strong>模型只在训练集覆盖的化学空间可靠</li>
        </ol>
      </div>

      <h3>描述符 vs 指纹 vs 图表示 / Descriptors vs Fingerprints vs Graphs</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>输入类型</th><th>代表方法</th><th>优点</th><th>缺点</th></tr>
          </thead>
          <tbody>
            <tr><td>物化描述符（Descriptors）</td><td>Lipinski 6 个 + RDKit 全量</td><td>可解释、计算快</td><td>信息损失大，依赖专家特征选择</td></tr>
            <tr><td>分子指纹（Fingerprints）</td><td>ECFP4、MACCS</td><td>通用、适合随机森林/SVM</td><td>高维稀疏，部分位不可解释</td></tr>
            <tr><td>分子图（Graph）</td><td>GNN（如 Attentive FP、MPNN）</td><td>端到端，自动提取特征</td><td>需要大数据量，训练慢，可解释性差</td></tr>
            <tr><td>SMILES 字符串</td><td>Transformer（如 ChemBERTa）</td><td>易集成大语言模型框架</td><td>不如图表示保留结构信息完整</td></tr>
          </tbody>
        </table>
      </div>

      <h3>重要 QSAR 数据集 / Key QSAR Datasets</h3>
      <div className="note-box">
        <ul>
          <li><strong>ESOL：</strong>1128 个分子的水溶解度（logS），最常用 QSAR benchmark</li>
          <li><strong>BBBP：</strong>血脑屏障穿透性（二分类，2000+ 化合物）</li>
          <li><strong>Tox21：</strong>7831 个化合物 × 12 项毒性检测（多标签分类）</li>
          <li><strong>MoleculeNet：</strong>整合多个 benchmark 的统一平台，配套 DeepChem 库</li>
          <li><strong>ChEMBL：</strong>超过 200 万活性测量数据，真实药物发现数据</li>
        </ul>
      </div>

      <h3>AI 在 ADMET 预测中的应用 / AI for ADMET</h3>
      <p>
        当前主流的 AI ADMET 预测工具：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>工具 / 模型</th><th>预测内容</th><th>访问方式</th></tr>
          </thead>
          <tbody>
            <tr><td>ADMETlab 2.0</td><td>全套 ADMET（88 项端点）</td><td>网页 / API</td></tr>
            <tr><td>SwissADME</td><td>口服吸收、BBB、CYP 抑制、类药性</td><td>网页（免费）</td></tr>
            <tr><td>pkCSM</td><td>药代动力学全套 + 毒性</td><td>网页</td></tr>
            <tr><td>DeepPurpose</td><td>DTI（药物-靶标相互作用）预测</td><td>Python 库</td></tr>
            <tr><td>TDC（Therapeutic Data Commons）</td><td>统一 ADMET benchmark + 基准模型</td><td>Python 库</td></tr>
          </tbody>
        </table>
      </div>

      <div className="note-box">
        <strong>本章总结 / Chapter Summary</strong>
        <ul>
          <li>分子描述符（MW、logP、HBD、HBA、PSA 等）将分子性质数值化，是 QSAR 建模的基础特征</li>
          <li>Lipinski Ro5 从口服药物数据中归纳出类药性阈值；QED 提供 0–1 综合评分</li>
          <li>ADMET 五个维度（吸收/分布/代谢/排泄/毒性）是候选药物进入临床的核心关卡</li>
          <li>CYP450 酶代谢和 hERG 心脏毒性是药物失败最常见的两大 ADMET 问题</li>
          <li>QSAR 模型通过描述符/指纹/图等特征输入，训练回归或分类模型预测活性与性质</li>
          <li>AI ADMET 预测工具（ADMETlab、SwissADME）已成为现代药物发现的标准工作流</li>
        </ul>
      </div>

    </div>
  )
}
