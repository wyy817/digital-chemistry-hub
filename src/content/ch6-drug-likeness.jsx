export const ch6DrugLikenessMeta = {
  id: 'ch6-2-drug-likeness',
  title: 'Drug-likeness & Lead Optimization',
  titleZh: '类药性与先导化合物优化',
  path: 'AI in Drug Discovery',
  chapter: 'Ch6. ADMET & Drug-likeness',
  estimatedMinutes: 50,
  difficulty: '🟡 入门',
  prev: { title: '6.1 ADMET Deep Dive', path: '/learn/ch6-admet-deep-dive' },
  next: { title: '6.3 Molecular Docking & Virtual Screening', path: '/learn/ch6-molecular-docking' },
}

export function Ch6DrugLikenessContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">6.2.1 什么是"类药性"？Lipinski 之后的世界</h2>
      <p>
        药物不只是要有活性——它还必须"像药"。<strong>类药性（Drug-likeness）</strong>
        描述的是一个分子在结构和物理化学性质上与已知口服药物相似的程度。
        Lipinski 五规则是最著名的起点，但绝非终点。
      </p>
      <p>
        口服药物需要穿越肠壁进入血液，再到达靶点，整个旅程对分子提出了多维度要求。
        研究者在大量上市药物中发现了一系列<strong>统计规律</strong>，将这些规律编码为"规则"，
        用来快速筛掉注定失败的候选分子。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>规则</th><th>提出者</th><th>核心限制</th><th>适用场景</th></tr>
          </thead>
          <tbody>
            <tr><td>Lipinski Ro5</td><td>Pfizer, 1997</td><td>MW≤500, logP≤5, HBD≤5, HBA≤10</td><td>口服小分子药物</td></tr>
            <tr><td>Veber 规则</td><td>GSK, 2002</td><td>RotBonds≤10, PSA≤140 Å²</td><td>口服生物利用度</td></tr>
            <tr><td>Egan 规则</td><td>Pfizer, 2000</td><td>logP∈[−1,5.88], PSA≤131.6 Å²</td><td>肠道吸收预测</td></tr>
            <tr><td>Muegge 规则</td><td>Bayer, 2001</td><td>扩展版 Ro5 + 更多结构过滤</td><td>先导优化</td></tr>
            <tr><td>Ghose 过滤器</td><td>BMS, 1999</td><td>MW∈[160,480], logP∈[−0.4,5.6]</td><td>合理性过滤</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        这些规则并非绝对定律，而是<strong>统计倾向</strong>。例外总是存在——
        紫杉醇（Taxol）分子量超 800 Da，却是经典化疗药。
        规则的价值在于早期大规模筛选时高效过滤，而非指导单个分子的判断。
      </p>

      {/* Section 2 */}
      <h2 id="s2">6.2.2 极性表面积（PSA）与渗透性</h2>
      <p>
        <strong>极性表面积（Polar Surface Area, PSA）</strong>是分子表面中氧、氮及其连接氢所贡献的面积，
        单位 Å²（平方埃）。PSA 是预测膜渗透性最重要的单一描述符之一。
      </p>
      <p>
        细胞膜是一层脂双层——极性越高的分子，穿越疏水核心越困难。
        经验规律：
      </p>
      <ul>
        <li><strong>PSA &lt; 60 Å²</strong>：高 CNS 渗透（可穿越血脑屏障）</li>
        <li><strong>PSA &lt; 90 Å²</strong>：通常有良好肠道吸收</li>
        <li><strong>PSA &gt; 140 Å²</strong>：口服生物利用度显著下降</li>
      </ul>
      <p>
        RDKit 中可用 <code>rdMolDescriptors.CalcTPSA(mol)</code> 计算<strong>拓扑 PSA（TPSA）</strong>，
        这是一种高效的 2D 近似，与 3D PSA 高度相关，适合大规模筛选。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>分子</th><th>TPSA (Å²)</th><th>口服吸收</th><th>CNS 渗透</th></tr>
          </thead>
          <tbody>
            <tr><td>阿司匹林</td><td>63.6</td><td>优</td><td>中</td></tr>
            <tr><td>布洛芬</td><td>37.3</td><td>优</td><td>中</td></tr>
            <tr><td>阿托伐他汀（立普妥）</td><td>111.9</td><td>中</td><td>差</td></tr>
            <tr><td>二甲双胍</td><td>88.7</td><td>中</td><td>差</td></tr>
            <tr><td>多西他赛（紫杉醇类）</td><td>224.4</td><td>差（注射给药）</td><td>无</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 3 */}
      <h2 id="s3">6.2.3 结构警示（Structural Alerts）与 PAINS</h2>
      <p>
        某些化学官能团本身就是"红旗"——它们在生物测定中频繁产生虚假阳性，
        或具有内在毒性风险。这类片段被称为<strong>结构警示（Structural Alerts）</strong>，
        其中最著名的是 <strong>PAINS（Pan-Assay INterference compoundS）</strong>。
      </p>
      <p>
        PAINS 化合物会非特异性地"欺骗"多种生化测定，表现出泛靶点活性，
        实际上并非真正的选择性抑制剂。典型例子：
      </p>
      <ul>
        <li><strong>频繁氧化还原循环</strong>（醌类、硝基芳烃）：干扰基于荧光或酶的检测</li>
        <li><strong>共价修饰剂</strong>（迈克尔受体、醛类）：与蛋白质发生非选择性反应</li>
        <li><strong>聚集剂</strong>：在溶液中形成纳米聚集体，物理性捕获蛋白质</li>
        <li><strong>荧光化合物</strong>：干扰荧光读数测定</li>
      </ul>
      <p>
        RDKit 通过 <code>FilterCatalog</code> 模块支持 PAINS 过滤：
      </p>
      <div className="code-block"><pre>{`from rdkit import Chem
from rdkit.Chem.FilterCatalog import FilterCatalog, FilterCatalogParams

params = FilterCatalogParams()
params.AddCatalog(FilterCatalogParams.FilterCatalogs.PAINS)
catalog = FilterCatalog(params)

mol = Chem.MolFromSmiles('O=C1C=CC(=O)c2ccccc21')  # 蒽醌骨架
entry = catalog.GetFirstMatch(mol)
if entry:
    print(f"PAINS 警示: {entry.GetDescription()}")
else:
    print("无 PAINS 警示")`}</pre></div>
      <p>
        除 PAINS 外，常用过滤器还包括 Brenk 过滤器（毒性基团）、
        NIH 过滤器，以及针对具体靶点的自定义规则。
      </p>

      {/* Section 4 */}
      <h2 id="s4">6.2.4 先导优化策略：Matched Molecular Pairs</h2>
      <p>
        <strong>先导优化（Lead Optimization）</strong>是药物发现的核心阶段：
        已确认苗头化合物（Hit）后，通过系统性结构修改提升其成药性，
        同时保持或增强活性。
      </p>
      <p>
        <strong>匹配分子对（Matched Molecular Pairs, MMP）</strong>是先导优化最有力的工具之一。
        MMP 定义为一对仅在单个化学转化（single cut）上不同的分子，
        通过比较大量 MMP 的活性/性质变化，可以提炼出<strong>可迁移的 SAR 规律</strong>。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>常见转化</th><th>预期效果</th><th>代价</th></tr>
          </thead>
          <tbody>
            <tr><td>H → F（氟化）</td><td>↑代谢稳定性，↑脂溶性</td><td>成本增加</td></tr>
            <tr><td>苯环 → 吡啶</td><td>↓logP，改善溶解度</td><td>可能影响活性</td></tr>
            <tr><td>酰胺 → 磺酰胺</td><td>↓pKa，改善溶解度</td><td>影响氢键模式</td></tr>
            <tr><td>叔胺 → 酰胺（生物等排）</td><td>↓碱性，减少 hERG 结合风险</td><td>活性可能下降</td></tr>
            <tr><td>引入甲基（magic methyl）</td><td>有时 100× 活性提升</td><td>高度位置依赖</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        现代 MMP 分析通常结合<strong>机器学习模型</strong>（如随机森林、图神经网络），
        在已有数据的基础上预测特定结构修改对 ADMET 性质的影响，
        从而指导合成优先级。
      </p>

      {/* Section 5 */}
      <h2 id="s5">6.2.5 用 ML 预测 ADMET：工具与数据集</h2>
      <p>
        传统的 ADMET 评估依赖体外实验（Caco-2 渗透、微粒体稳定性、hERG 测定等），
        每个实验耗时数天、成本数百美元。
        <strong>机器学习模型</strong>可以在几毫秒内给出预测，成为早期筛选的"虚拟 ADMET 过滤器"。
      </p>
      <p>
        主流公开数据集：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>数据集</th><th>任务</th><th>规模</th><th>来源</th></tr>
          </thead>
          <tbody>
            <tr><td>Caco-2（Wang）</td><td>肠道渗透性</td><td>906 条</td><td>J. Chem. Inf. Model.</td></tr>
            <tr><td>BBBP</td><td>血脑屏障渗透</td><td>2,039 条</td><td>MoleculeNet</td></tr>
            <tr><td>hERG</td><td>心脏毒性（钾通道阻断）</td><td>648 条</td><td>ChEMBL</td></tr>
            <tr><td>Tox21</td><td>12 种毒性终点</td><td>7,831 条</td><td>NCATS</td></tr>
            <tr><td>ClinTox</td><td>临床毒性 vs. FDA 批准</td><td>1,478 条</td><td>MoleculeNet</td></tr>
            <tr><td>SIDER</td><td>药物副作用</td><td>1,427 条</td><td>SIDER 数据库</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        常用预测工具：
      </p>
      <ul>
        <li><strong>SwissADME</strong>（web）：快速 ADMET 全景分析，Boiled Egg 图可视化</li>
        <li><strong>pkCSM</strong>（web）：基于图签名的 ADMET 预测，覆盖 30+ 终点</li>
        <li><strong>DeepPurpose</strong>（Python 库）：深度学习 DTI/ADMET 预测框架</li>
        <li><strong>ADMET-AI</strong>（Chemprop 基础）：图神经网络 ADMET 预测，TDC 基准</li>
        <li><strong>RDKit + sklearn</strong>：基于分子描述符/指纹构建自定义回归/分类模型</li>
      </ul>

      {/* Section 6 */}
      <h2 id="s6">6.2.6 综合案例：从苗头到候选的多属性优化</h2>
      <p>
        先导优化的现代范式是<strong>多属性优化（Multi-Parameter Optimization, MPO）</strong>——
        不再针对单一属性（如最大活性），而是在效力、选择性、溶解度、渗透性、
        代谢稳定性和安全性之间找到最佳平衡点。
      </p>
      <p>
        以一个典型案例说明 MPO 的思路：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>属性</th><th>苗头化合物</th><th>优化目标</th><th>改造策略</th></tr>
          </thead>
          <tbody>
            <tr><td>IC₅₀（酶抑制）</td><td>850 nM</td><td>&lt; 10 nM</td><td>SAR 精修，引入关键氢键</td></tr>
            <tr><td>溶解度</td><td>&lt;5 μg/mL</td><td>&gt;50 μg/mL</td><td>引入极性基团，盐形式优化</td></tr>
            <tr><td>Caco-2 渗透（A→B）</td><td>3×10⁻⁶ cm/s</td><td>&gt;10×10⁻⁶ cm/s</td><td>降低 PSA，减少 HBD</td></tr>
            <tr><td>微粒体半衰期</td><td>15 min</td><td>&gt;60 min</td><td>封闭代谢热点（氟化）</td></tr>
            <tr><td>hERG IC₅₀</td><td>2 μM（风险）</td><td>&gt;30 μM</td><td>减少碱性氮，降低 clogP</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        MPO 评分将多个属性归一化后加权求和，使化学家能够一眼看出哪个候选分子
        在综合维度上最优。Pfizer 的 CNS MPO 评分是业界最著名的实例，
        综合了 clogP、clogD、MW、TPSA、HBD 数量和 pKa 六个属性。
      </p>
      <p>
        最终，先导优化的目标是找到一个在所有这些维度上<em>足够好</em>的分子，
        而不是在某一维度上<em>极致完美</em>的分子。这正是药物发现区别于纯化学的地方：
        它是一门<strong>妥协的艺术</strong>。
      </p>
    </div>
  )
}
