export const ch2FunctionalGroupsMeta = {
  id: 'ch2-1-functional-groups',
  title: 'Functional Groups',
  titleZh: '官能团',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch2. Organic Chemistry Basics',
  estimatedMinutes: 35,
  difficulty: '🟡 进阶',
  prev: { id: 'ch1-3-molecular-shape', title: 'Molecular Shape & Chirality', path: '/learn/ch1-molecular-shape' },
  next: { id: 'ch2-2-smiles', title: 'SMILES & Molecular Representation', path: '/learn/ch2-smiles' },
}

export function Ch2FunctionalGroupsContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">2.1.1 什么是官能团 / What Are Functional Groups?</h2>
      <p>
        有机分子可以很复杂——阿司匹林、青霉素、瑞德西韦……它们看起来各不相同，
        但它们都由少数几类"原子组合"构成，这些原子组合决定了分子的化学反应性和物理性质。
        这就是<span className="term">官能团（Functional Group）</span>：
        有机分子中具有特定化学性质的原子或原子团。
      </p>
      <p>
        把有机分子想象成一栋建筑：碳骨架（烷基链）是钢筋混凝土框架，官能团是门、窗、插座——
        它们决定这栋楼能做什么。同一个框架安上不同"配件"，性质截然不同。
      </p>
      <div className="note-box">
        <strong>为什么药物化学家关注官能团？</strong>
        <ul>
          <li>官能团决定分子能否与靶标蛋白结合（氢键、静电相互作用）</li>
          <li>官能团决定 ADMET 性质——溶解性、细胞膜穿透性、代谢稳定性</li>
          <li>在 SMILES 和分子指纹中，官能团是关键的结构特征</li>
          <li>修改官能团是药物优化（lead optimization）的核心手段</li>
        </ul>
      </div>
      <p>
        本章将系统介绍最重要的官能团类别，重点放在药物发现和数字化学中最常见的结构。
        每种官能团，我们会看：<strong>结构→性质→药物实例→数字化学应用</strong>。
      </p>

      {/* Section 2 */}
      <h2 id="s2">2.1.2 含氧官能团 / Oxygen-Containing Groups</h2>
      <p>
        氧原子在有机分子中出现频率极高，因为它的电负性强，能形成氢键，
        对分子的亲水性（hydrophilicity）和反应性影响巨大。
      </p>

      <h3>羟基 Hydroxyl (–OH)</h3>
      <p>
        <span className="term">羟基（–OH）</span>是最常见的官能团之一，既是氢键供体，也是氢键受体。
        含羟基的化合物称为<strong>醇（alcohol）</strong>（如乙醇 CH₃CH₂OH）；
        当羟基连在苯环上时，称为<strong>酚（phenol）</strong>（如对乙酰氨基酚/扑热息痛）。
      </p>
      <p>
        羟基的关键作用：增加水溶性（与水分子形成氢键）、可被酶代谢（CYP450 氧化）、
        可进一步反应生成酯或醚。
      </p>

      <h3>羰基 Carbonyl (C=O)</h3>
      <p>
        <span className="term">羰基（C=O）</span>是碳氧双键，根据连接方式不同，分为：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>结构</th>
              <th>命名</th>
              <th>代表药物/化合物</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>醛 Aldehyde</td>
              <td>R–CHO</td>
              <td>末端 C=O，H 连在羰基碳</td>
              <td>葡萄糖（开链式）</td>
            </tr>
            <tr>
              <td>酮 Ketone</td>
              <td>R–CO–R'</td>
              <td>C=O 两侧均为碳</td>
              <td>布洛芬代谢产物</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        羰基是氢键受体（O 接受 H-bond），影响分子极性和沸点。
        在质谱（MS）中，羰基化合物有特征碎裂模式，是结构鉴定的重要依据。
      </p>

      <h3>羧基 Carboxyl (–COOH)</h3>
      <p>
        <span className="term">羧基（–COOH）</span>= 羰基 + 羟基的组合，具有酸性（pKa ≈ 4–5），
        生理 pH 下通常以去质子化的羧酸根（–COO⁻）形式存在。
      </p>
      <p>
        含羧基的药物举例：阿司匹林（乙酰水杨酸）、布洛芬、萘普生（都是 NSAIDs）。
        羧基使这些药物具有酸性，影响其在胃肠道的吸收和分布。
      </p>

      <h3>酯 Ester (–COO–) 与醚 Ether (–O–)</h3>
      <p>
        <span className="term">酯（–COO–）</span>由羧酸和醇缩合而成，在体内可被酯酶水解释放活性成分——
        这是<strong>前药（prodrug）</strong>策略的基础。例如奥司他韦（达菲）就是一个酯型前药，
        口服后水解为活性羧酸形式。
      </p>
      <p>
        <span className="term">醚（R–O–R'）</span>化学性质相对稳定，代谢慢，
        常用于提高药物的代谢稳定性。四氢呋喃（THF）和聚乙二醇（PEG）均含醚键，
        PEG 修饰是延长蛋白质药物半衰期的常用手段（PEGylation）。
      </p>

      {/* Section 3 */}
      <h2 id="s3">2.1.3 含氮官能团 / Nitrogen-Containing Groups</h2>
      <p>
        氮是药物分子中出现频率第二高的杂原子（仅次于氧）。
        约 75% 的 FDA 批准小分子药物含有至少一个氮原子。
        氮的<strong>孤对电子</strong>使其具有碱性，能在生理 pH 下质子化，影响药物的溶解性和膜渗透性。
      </p>

      <h3>胺 Amine (–NH₂ / –NHR / –NR₂)</h3>
      <p>
        <span className="term">胺（amine）</span>按氮上连接的碳数分为伯胺、仲胺、叔胺：
      </p>
      <div className="note-box">
        <strong>胺的分类：</strong>
        <ul>
          <li><strong>伯胺（Primary, –NH₂）：</strong>如苯丙胺（amphetamine）的氨基</li>
          <li><strong>仲胺（Secondary, –NHR）：</strong>如美托洛尔（β受体阻断剂）</li>
          <li><strong>叔胺（Tertiary, –NR₂）：</strong>如阿托品、奎宁；亲脂性强，穿透 BBB 能力更好</li>
          <li><strong>季铵盐（Quaternary, –NR₃⁺）：</strong>永久正电荷，不穿透 BBB，如溴化新斯的明</li>
        </ul>
      </div>
      <p>
        胺的 pKa 约 8–10，生理 pH（7.4）下大部分质子化，带正电。
        这一性质使胺基药物能与带负电的 DNA 或蛋白质表面结合，
        也是 Lipinski 规则中计算<strong>氢键供体（H-bond donors）</strong>的来源之一（–NH 计入）。
      </p>

      <h3>酰胺 Amide (–CONH–)</h3>
      <p>
        <span className="term">酰胺键（amide bond, –CO–NH–）</span>是肽键（peptide bond）的化学本质，
        也是许多药物中最稳定的官能团之一。
        由于 N 的孤对电子与 C=O 形成共振，酰胺的碱性极弱（pKa ≈ 0），在生理 pH 下不质子化。
      </p>
      <p>
        酰胺键的关键性质：化学稳定、可形成氢键（既是供体 N–H，又是受体 C=O）、
        是蛋白质结构的骨架。大量药物含酰胺：利多卡因、对乙酰氨基酚（–NHCOCH₃ 即 N-取代酰胺）。
      </p>

      <h3>腈 Nitrile (–C≡N)</h3>
      <p>
        <span className="term">腈（nitrile, –C≡N）</span>含碳氮三键，极性强，
        常作为一种紧凑的极性官能团替代羧基（bioisostere）以改善膜渗透性。
        维格列汀（vildagliptin，DPP-4 抑制剂）含腈基作为共价结合"弹头"，
        与靶标酶的丝氨酸/半胱氨酸形成可逆共价键。
      </p>

      {/* Section 4 */}
      <h2 id="s4">2.1.4 含硫与卤素官能团 / Sulfur & Halogen Groups</h2>

      <h3>巯基 Thiol (–SH) 与二硫键 Disulfide (–S–S–)</h3>
      <p>
        <span className="term">巯基（thiol, –SH）</span>是硫的类氢氧基形式，
        pKa ≈ 8，在生理 pH 下部分去质子化为硫醇阴离子（–S⁻），
        是强亲核试剂（nucleophile）。
      </p>
      <p>
        半胱氨酸（cysteine）的侧链含巯基，可与另一个 Cys 形成<strong>二硫键（–S–S–）</strong>，
        对蛋白质三维结构的稳定至关重要（如胰岛素的三对二硫键）。
        靶向 Cys 残基的共价抑制剂（covalent inhibitors）是近年来药物研发的热点，
        代表药物：奥希替尼（osimertinib，靶向 EGFR C797S）。
      </p>

      <h3>卤素 Halogens (–F, –Cl, –Br, –I)</h3>
      <p>
        卤素取代在药物设计中被大量使用，尤其是<strong>氟（F）</strong>——
        约 20–25% 的 FDA 批准药物含氟。
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>卤素</th>
              <th>主要用途</th>
              <th>代表药物</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F（氟）</td>
              <td>阻断 CYP450 代谢位点，提高代谢稳定性；增强靶点结合（F 的偶极/卤键）</td>
              <td>氟西汀（Prozac）、阿托伐他汀</td>
            </tr>
            <tr>
              <td>Cl（氯）</td>
              <td>增加亲脂性，调节 logP</td>
              <td>氯丙嗪、地西泮</td>
            </tr>
            <tr>
              <td>Br（溴）</td>
              <td>卤键结合（halogen bonding），研究工具化合物</td>
              <td>溴莫尼定（降眼压药）</td>
            </tr>
            <tr>
              <td>I（碘）</td>
              <td>放射性标记（¹²⁵I, ¹³¹I）用于诊断和治疗</td>
              <td>甲状腺癌 ¹³¹I 治疗</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <span className="term">卤键（halogen bonding）</span>：卤素原子表面存在正电荷区域（σ空穴），
        能与电子供体（Lewis 碱）形成定向非共价相互作用，类似氢键，
        在结构基础药物设计（SBDD）中被用来优化结合亲和力。
      </p>

      {/* Section 5 */}
      <h2 id="s5">2.1.5 芳香环与杂环 / Aromatic Rings & Heterocycles</h2>
      <p>
        <span className="term">芳香环（aromatic ring）</span>含有交替单双键（实为离域 π 键），
        最简单的是苯环（benzene, C₆H₆）。约 60% 的 FDA 批准药物含苯环或杂环。
      </p>

      <h3>苯环 Phenyl Ring</h3>
      <p>
        苯环是平面刚性结构，提供<strong>π–π 堆叠（pi stacking）</strong>相互作用——
        两个芳环平行或交叉叠加，对药物与蛋白质结合的贡献可达 2–4 kcal/mol。
        苯环亲脂性高（logP 贡献 +1.5–2.0），常与 Lipinski 的 MW 超重问题相关。
      </p>

      <h3>杂环 Heterocycles</h3>
      <p>
        <span className="term">杂环（heterocycle）</span>是环中含有除碳外的杂原子（N、O、S）的芳香环，
        在药物分子中极其常见。以下是最重要的几类：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>杂环</th>
              <th>杂原子</th>
              <th>特性</th>
              <th>代表药物</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>吡啶 Pyridine</td>
              <td>1 N（6元环）</td>
              <td>碱性弱（pKa ≈ 5.3），可形成 H-bond，代谢位点少</td>
              <td>伊马替尼（Gleevec）</td>
            </tr>
            <tr>
              <td>嘧啶 Pyrimidine</td>
              <td>2 N（6元环）</td>
              <td>DNA 碱基（胞嘧啶 C、胸腺嘧啶 T、尿嘧啶 U）的骨架</td>
              <td>甲氨蝶呤</td>
            </tr>
            <tr>
              <td>咪唑 Imidazole</td>
              <td>2 N（5元环）</td>
              <td>两性：一个 N 是碱（pKa ≈ 7），另一个是酸；组氨酸侧链</td>
              <td>甲硝唑、奥美拉唑</td>
            </tr>
            <tr>
              <td>噻吩 Thiophene</td>
              <td>1 S（5元环）</td>
              <td>苯环的生物等排体（bioisostere），更亲脂</td>
              <td>氯吡格雷</td>
            </tr>
            <tr>
              <td>吲哚 Indole</td>
              <td>1 N（苯并吡咯）</td>
              <td>色氨酸（Trp）侧链；强 π–π 堆叠</td>
              <td>舒马曲坦（偏头痛药）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="note-box">
        <strong>生物等排体（Bioisostere）</strong>
        <p style={{ margin: '0.5rem 0 0' }}>
          两个具有相似大小、形状和电性分布、但结构不同的基团互为生物等排体。
          经典例子：苯环 ↔ 噻吩；羧基（–COOH）↔ 磺酰胺（–SO₂NH₂）↔ 四唑（tetrazole）。
          在药物优化中，用生物等排体替换原基团，可在不改变活性的前提下改善代谢稳定性、溶解性或选择性。
        </p>
      </div>

      {/* Section 6 */}
      <h2 id="s6">2.1.6 官能团与药物性质 / Functional Groups & Drug Properties</h2>
      <p>
        理解官能团的最终目的是预测和设计分子性质。下面以 Lipinski 规则为框架，
        将官能团与 ADMET 性质联系起来。
      </p>

      <h3>氢键供体与受体 H-Bond Donors & Acceptors</h3>
      <p>
        Lipinski 规则要求：<strong>H-bond donors ≤ 5，H-bond acceptors ≤ 10</strong>。
      </p>
      <div className="note-box">
        <strong>如何数氢键供体/受体：</strong>
        <ul>
          <li><strong>供体（Donors, HBD）：</strong>含 N–H 或 O–H 的基团：羟基（–OH）、伯胺/仲胺（–NH₂/–NH）、酰胺（–CONH）、羧基（–COOH）</li>
          <li><strong>受体（Acceptors, HBA）：</strong>含孤对电子的 N 或 O：所有氧原子、伯/仲/叔胺的 N、芳香杂环中碱性 N（如吡啶 N）</li>
        </ul>
        RDKit 计算示例：<code>rdMolDescriptors.CalcNumHBD(mol)</code> 和 <code>CalcNumHBA(mol)</code>
      </div>

      <h3>亲脂性 logP 与官能团</h3>
      <p>
        <span className="term">logP</span>（辛醇/水分配系数）衡量分子亲脂性，Lipinski 要求 logP ≤ 5。
        官能团对 logP 的贡献（Crippen 片段加和法，AlogP 中用到）：
      </p>
      <ul>
        <li>苯环/芳环：+1.5–2.0（亲脂，增大 logP）</li>
        <li>羟基、羧基：−1 ~ −2（亲水，降低 logP）</li>
        <li>卤素：F 几乎不变，Cl/Br/I 升高 logP</li>
        <li>胺类：–NH₂ 降低 logP；叔胺亲脂性更强</li>
      </ul>

      <h3>代谢软点 Metabolic Soft Spots</h3>
      <p>
        某些官能团是 CYP450 酶的优先氧化位点（称为<span className="term">代谢软点，metabolic soft spots</span>）：
      </p>
      <ul>
        <li>甲基（–CH₃）连在苯环上 → 易被氧化为 –CH₂OH，再氧化为 –COOH</li>
        <li>未取代的芳环位点 → CYP1A2/3A4 芳香羟化</li>
        <li>酯键（–COO–）→ 血浆酯酶快速水解</li>
      </ul>
      <p>
        优化策略：用 F 替换代谢位点的 H（代谢阻断），或用生物等排体替换软点官能团。
        这也是为什么含氟药物占比如此之高。
      </p>

      <h3>官能团与 SMILES</h3>
      <p>
        在 Ch2.2 我们将学习 SMILES 表示法，届时会看到每种官能团的 SMILES 写法：
        羟基 <code>O</code>、胺 <code>N</code>、羰基 <code>C=O</code>、芳环 <code>c1ccccc1</code>……
        理解官能团，是读懂 SMILES 和分子指纹的基础。
      </p>

      <div className="note-box">
        <strong>本章总结 / Chapter Summary</strong>
        <ul>
          <li>官能团决定有机分子的化学行为和物理性质</li>
          <li>含氧官能团（–OH, C=O, –COOH, –COO–）影响氢键和亲水性</li>
          <li>含氮官能团（胺、酰胺）广泛存在于药物中，影响 pKa 和结合模式</li>
          <li>卤素（尤其是 F）是药物代谢优化的重要工具</li>
          <li>芳香杂环是药物骨架的主力，提供 π–π 堆叠和选择性结合</li>
          <li>Lipinski 规则通过 HBD/HBA/logP/MW 量化官能团对口服成药性的影响</li>
        </ul>
      </div>

    </div>
  )
}
