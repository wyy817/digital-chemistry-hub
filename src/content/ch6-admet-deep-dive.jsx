export const ch6AdmetDeepDiveMeta = {
  id: 'ch6-1-admet-deep-dive',
  title: 'ADMET Deep Dive',
  titleZh: 'ADMET 深入解析：从分子到患者',
  path: 'AI in Drug Discovery',
  chapter: 'Ch6. ADMET & Drug-likeness',
  estimatedMinutes: 55,
  difficulty: '🟡 入门',
  prev: { title: '5.3 Hit / Lead / Candidate', path: '/learn/ch5-hit-lead-candidate' },
  next: null,
}

export function Ch6AdmetDeepDiveContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">6.1.1 ADMET 全景：为什么 90% 的药物候选失败？</h2>
      <p>
        一个分子即使能在体外（in vitro）强效抑制靶点，也可能在人体内毫无效果——
        因为它根本无法到达靶点，或者在途中就被分解掉了。
        这正是 ADMET 研究的核心问题：<strong>药物在体内如何运动与命运如何</strong>。
      </p>
      <p>
        ADMET 代表五个关键过程：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>字母</th><th>英文</th><th>中文</th><th>核心问题</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>A</strong></td><td>Absorption</td><td>吸收</td><td>药物能否进入血液循环？</td></tr>
            <tr><td><strong>D</strong></td><td>Distribution</td><td>分布</td><td>药物能否到达靶器官/靶细胞？</td></tr>
            <tr><td><strong>M</strong></td><td>Metabolism</td><td>代谢</td><td>药物在体内如何被分解转化？</td></tr>
            <tr><td><strong>E</strong></td><td>Excretion</td><td>排泄</td><td>药物及其代谢物如何被清除？</td></tr>
            <tr><td><strong>T</strong></td><td>Toxicity</td><td>毒性</td><td>药物对正常组织有无损害？</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        历史数据显示，临床失败的药物中约 <strong>40%</strong> 归因于不良的 ADMET 性质（另有约 30% 因疗效不足）。
        早期预测 ADMET 能大幅降低后期淘汰成本——这正是 AI 在该领域大展身手的原因。
      </p>

      <blockquote>
        <strong>类比：</strong>把药物想象成快递包裹，靶点是收件地址。
        即使包裹装对了东西（高活性），如果地址不对（无法分布到靶点）、
        路上被拆包（代谢过快）、或包裹有毒气（毒性），最终都是失败。
        ADMET 研究的就是这段"快递旅程"。
      </blockquote>

      {/* Section 2 */}
      <h2 id="s2">6.1.2 Absorption：吸收与生物利用度</h2>
      <p>
        口服是最方便的给药方式。药物吞下后，需要穿越胃肠道上皮细胞才能进入血液。
        <strong>生物利用度（Bioavailability, F%）</strong>描述口服剂量中实际进入系统循环的比例。
      </p>
      <p>口服吸收受两个主要屏障影响：</p>
      <ul>
        <li><strong>溶解度（Solubility）</strong>：药物必须先在肠液中溶解，才能被吸收。脂溶性过高的分子往往溶解度差。</li>
        <li><strong>渗透性（Permeability）</strong>：溶解后的分子需穿过肠壁细胞膜（脂质双分子层），进入毛细血管。</li>
      </ul>
      <p>
        Biopharmaceutics Classification System（BCS）将药物分为四类：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>BCS 类别</th><th>溶解度</th><th>渗透性</th><th>挑战</th></tr>
          </thead>
          <tbody>
            <tr><td>I（理想）</td><td>高</td><td>高</td><td>基本无，吸收良好</td></tr>
            <tr><td>II</td><td>低</td><td>高</td><td>需提高溶解度（纳米制剂、共晶）</td></tr>
            <tr><td>III</td><td>高</td><td>低</td><td>需提高膜渗透性</td></tr>
            <tr><td>IV（最差）</td><td>低</td><td>低</td><td>双重问题，极难口服</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        另一个影响生物利用度的因素是<strong>首过效应（First-pass Effect）</strong>：
        药物从肠道吸收后先经门静脉到达肝脏，部分在进入体循环前就被代谢掉。
        例如硝酸甘油（nitroglycerin）的首过效应极强，必须舌下含服才能有效。
      </p>
      <p>
        <strong>AI 预测工具：</strong>
        SwissADME、ADMETlab 等在线工具可预测 logS（水溶性）、Caco-2 渗透性（模拟肠壁细胞）、
        以及口服生物利用度。RDKit 可计算 logP（脂水分配系数），与溶解度强相关（logP 越高溶解度越低）。
      </p>

      {/* Section 3 */}
      <h2 id="s3">6.1.3 Distribution：分布、蛋白结合与血脑屏障</h2>
      <p>
        药物进入血液后，并非均匀分布全身——它会在不同组织间分配，受到蛋白结合、
        脂溶性和特殊屏障的影响。
      </p>
      <p>
        <strong>分布容积（Volume of Distribution, Vd）</strong>是描述分布程度的参数：
      </p>
      <ul>
        <li>Vd 小（接近血容量 5 L）→ 药物主要留在血液中，不易进入组织</li>
        <li>Vd 大（100 L 以上）→ 药物大量分布至组织，血药浓度低</li>
      </ul>
      <p>
        <strong>血浆蛋白结合（Plasma Protein Binding, PPB）：</strong>
        血浆中的白蛋白（albumin）会与许多药物结合。只有<em>游离型</em>药物（unbound）
        才能透过毛细血管壁发挥作用。PPB 过高（&gt;99%）意味着游离药物极少，疗效降低，
        且被其他药物竞争结合时可能导致游离药量骤增（药物-药物相互作用）。
      </p>
      <p>
        <strong>血脑屏障（Blood-Brain Barrier, BBB）：</strong>
        大脑毛细血管内皮细胞紧密连接，形成高度选择性屏障。
        对于神经系统疾病（阿尔茨海默病、帕金森、抑郁症），药物必须穿越 BBB；
        而对于外周疾病，CNS 渗透反而是毒性来源（如引起精神副作用）。
      </p>
      <p>
        穿越 BBB 的分子特征：分子量小（&lt;450 Da）、脂溶性适中（logP 1–3）、
        氢键供体少（≤3）、极性表面积（PSA）小（&lt;90 Å²）。
      </p>

      {/* Section 4 */}
      <h2 id="s4">6.1.4 Metabolism：CYP 酶与代谢稳定性</h2>
      <p>
        药物代谢主要发生在肝脏，由<strong>细胞色素 P450（CYP）酶</strong>家族主导。
        CYP 酶通过氧化、还原、水解等反应将药物转化为更易排泄的极性代谢物。
      </p>
      <p>最重要的五种 CYP 酶负责约 90% 的药物代谢：</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>CYP 酶</th><th>代谢比例</th><th>典型底物</th><th>常见抑制剂</th></tr>
          </thead>
          <tbody>
            <tr><td>CYP3A4</td><td>~50%</td><td>他汀类、苯二氮䓬类</td><td>葡萄柚汁（呋喃香豆素）</td></tr>
            <tr><td>CYP2D6</td><td>~25%</td><td>β 受体阻滞剂、抗抑郁药</td><td>氟西汀（fluoxetine）</td></tr>
            <tr><td>CYP2C9</td><td>~10%</td><td>华法林、布洛芬</td><td>磺胺甲噁唑</td></tr>
            <tr><td>CYP2C19</td><td>~5%</td><td>奥美拉唑、氯吡格雷</td><td>奥美拉唑自身</td></tr>
            <tr><td>CYP1A2</td><td>~5%</td><td>咖啡因、茶碱</td><td>氟伏沙明</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        代谢研究中两个核心关注点：
      </p>
      <ul>
        <li>
          <strong>代谢稳定性（Metabolic Stability）：</strong>
          用微粒体孵育实验（in vitro）测定药物的半衰期（t½）。
          代谢太快 → 体内暴露量低，需频繁给药；代谢太慢 → 蓄积风险。
          AI 可从结构预测代谢位点（Metabolite Site of Metabolism, SoM）。
        </li>
        <li>
          <strong>药物-药物相互作用（DDI）：</strong>
          若新药是 CYP3A4 的强效抑制剂，可能使同时服用的其他药物（CYP3A4 底物）
          血药浓度骤升，引发严重副作用。FDA 要求临床前必须评估 DDI 风险。
        </li>
      </ul>
      <blockquote>
        <strong>案例：特非那定（Terfenadine）撤市</strong>
        1990 年代的热门抗过敏药特非那定，当与红霉素或酮康唑（均为 CYP3A4 抑制剂）同服时，
        血药浓度异常升高，导致致命性心律失常（QT 延长）。1997 年被 FDA 撤市，
        成为 DDI 历史上最重要的案例之一。
      </blockquote>

      {/* Section 5 */}
      <h2 id="s5">6.1.5 Excretion & Toxicity：排泄途径与毒性预测</h2>
      <p>
        <strong>排泄（Excretion）：</strong>
        药物及其代谢物主要通过两条途径排出体外：
      </p>
      <ul>
        <li><strong>肾脏排泄：</strong>极性代谢物经肾小球滤过，随尿液排出。肾功能不全患者需调整剂量。</li>
        <li><strong>胆汁排泄：</strong>大分子药物（MW &gt;500 Da）通过胆汁进入肠道，可能被重新吸收（肠肝循环），延长半衰期。</li>
      </ul>
      <p>
        <strong>半衰期（t½）</strong>决定给药频率：t½ 为 6–12 小时的药物通常每日两次；
        t½ 超过 24 小时可每日一次（例如阿托伐他汀 t½ ≈ 14 h，但代谢物更长）。
      </p>
      <p>
        <strong>毒性（Toxicity）的主要类型：</strong>
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>毒性类型</th><th>机制</th><th>预测方法</th></tr>
          </thead>
          <tbody>
            <tr><td>肝毒性（DILI）</td><td>反应性代谢物损伤肝细胞</td><td>结构警戒基团（structural alerts）</td></tr>
            <tr><td>心脏毒性（hERG）</td><td>阻断心脏钾离子通道 hERG</td><td>AI 模型预测 hERG 抑制</td></tr>
            <tr><td>遗传毒性</td><td>DNA 损伤/突变</td><td>Ames 试验；in silico Derek Nexus</td></tr>
            <tr><td>肾毒性</td><td>损伤近端肾小管细胞</td><td>in vitro 肾细胞毒性测试</td></tr>
            <tr><td>免疫毒性</td><td>半抗原化引发免疫反应</td><td>结构警戒基团（反应性官能团）</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>结构警戒基团（Structural Alerts）</strong>是已知与毒性相关的特定化学基团，
        例如：醌（quinone）、环氧化物（epoxide）、活性卤素（activated halogen）。
        RDKit 的 <code>FilterCatalog</code> 模块内置了 PAINS、Brenk 等过滤集，
        可一键标记分子中的警戒基团。
      </p>

      {/* Section 6 */}
      <h2 id="s6">6.1.6 Lipinski 五规则与 RDKit 类药性筛选</h2>
      <p>
        1997 年，辉瑞（Pfizer）药物化学家 Christopher Lipinski 分析了数千个口服药物的结构，
        总结出<strong>Lipinski 五规则（Rule of Five, Ro5）</strong>——口服类药性的经验黄金标准：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>规则</th><th>参数</th><th>阈值</th><th>原理</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>分子量（MW）</td><td>≤ 500 Da</td><td>分子太大难以透过细胞膜</td></tr>
            <tr><td>2</td><td>脂水分配系数（logP）</td><td>≤ 5</td><td>过高疏水导致溶解度差</td></tr>
            <tr><td>3</td><td>氢键供体（HBD）</td><td>≤ 5</td><td>过多 HBD 降低膜渗透性</td></tr>
            <tr><td>4</td><td>氢键受体（HBA）</td><td>≤ 10</td><td>过多 HBA 同样降低渗透性</td></tr>
            <tr><td>5</td><td>（可旋转键 RotBonds）</td><td>≤ 10（扩展版）</td><td>构象灵活性影响吸收</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        注意：Ro5 是<em>统计经验规则</em>，不是绝对定律。
        部分经典口服药物违反了其中一条（如阿托伐他汀 MW = 558 Da，违反规则 1）。
        此外，天然产物和大环化合物常因特殊构象而绕过 Ro5 限制。
      </p>
      <p>
        <strong>RDKit 计算 Lipinski 参数示例：</strong>
      </p>
      <pre><code>{`from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

# 阿司匹林 SMILES
mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')

mw  = Descriptors.ExactMolWt(mol)          # 分子量
logp = Descriptors.MolLogP(mol)            # 脂水分配系数
hbd = rdMolDescriptors.CalcNumHBD(mol)     # 氢键供体
hba = rdMolDescriptors.CalcNumHBA(mol)     # 氢键受体
rotb = rdMolDescriptors.CalcNumRotatableBonds(mol)
tpsa = Descriptors.TPSA(mol)              # 拓扑极性表面积

print(f"MW={mw:.1f}, logP={logp:.2f}, HBD={hbd}, HBA={hba}")
print(f"RotBonds={rotb}, TPSA={tpsa:.1f}")

# Lipinski 检查
lipinski = all([mw <= 500, logp <= 5, hbd <= 5, hba <= 10])
print(f"Lipinski Ro5: {'通过 ✓' if lipinski else '不通过 ✗'}")`}</code></pre>
      <p>
        除 Ro5 外，现代药物化学还常用以下衍生规则：
      </p>
      <ul>
        <li>
          <strong>Veber 规则（2002）：</strong>
          RotBonds ≤ 10 且 TPSA ≤ 140 Å²，用于预测口服生物利用度（大鼠模型）。
        </li>
        <li>
          <strong>类片段规则（Fragment-like, Ro3）：</strong>
          MW ≤ 300, logP ≤ 3, HBD ≤ 3, HBA ≤ 3——用于基于片段的药物发现（FBDD）初始片段筛选。
        </li>
        <li>
          <strong>类先导物规则（Lead-like）：</strong>
          介于片段与候选药物之间，MW 200–350, logP ≤ 3.5。
        </li>
      </ul>
      <p>
        <strong>AI 在 ADMET 预测中的角色（小结）：</strong>
        传统 ADMET 测试昂贵且耗时（体外实验 + 动物实验）。
        现代 AI 模型（如图神经网络 GNN、Transformer）可在毫秒内预测数十个 ADMET 端点，
        实现虚拟筛选中的早期"ADMET 过滤"，将优质候选分子优先级提前。
        代表性平台：ADMETlab 3.0、pkCSM、SwissADME、DeepPurpose。
      </p>
    </div>
  )
}
