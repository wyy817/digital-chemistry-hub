export const ch1ChemicalBondsMeta = {
  id: 'ch1-2-chemical-bonds',
  title: 'Chemical Bonds',
  titleZh: '化学键',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch1. Atoms & Chemical Bonds',
  estimatedMinutes: 30,
  difficulty: '🟢 入门',
  prev: { id: 'ch1-1-atomic-structure', title: 'Atomic Structure', path: '/learn/ch1-atomic-structure' },
  next: { id: 'ch1-3-molecular-shape', title: 'Molecular Shape & Chirality', path: '/learn/ch1-molecular-shape' },
}

export function Ch1ChemicalBondsContent() {
  return (
    <div className="content-prose">
      {/* Section 1 */}
      <h2 id="s1">1.2.1 为什么原子会键合 / Why Do Atoms Bond?</h2>
      <p>
        原子之所以会相互结合，是因为"单独存在"的状态通常不稳定。
        大多数原子的最外层电子层（价电子层）并未被填满，而自然界倾向于让系统达到能量最低、最稳定的状态。
      </p>
      <p>
        化学中有一条核心规律——<span className="term">八隅体规则（Octet Rule）</span>：
        大多数主族元素的原子在化学反应中会通过共享、获得或失去电子，
        使最外层拥有 <strong>8 个电子</strong>，达到像惰性气体（如 Ne、Ar）一样的稳定构型。
      </p>
      <div className="note-box">
        <strong>📌 类比：</strong>你可以把原子想象成需要"凑齐 8 张扑克"才能打出的牌局——
        有的原子自己有 7 张（缺 1 张，例如氟 F），
        有的有 1 张（多余 1 张，例如钠 Na）。
        化学键就是它们之间的"交换协议"。
      </div>
      <p>
        根据电子的转移或共享方式，化学键主要分为三大类：
        <strong>共价键（Covalent Bond）</strong>、
        <strong>离子键（Ionic Bond）</strong>，
        以及相对较弱的<strong>氢键（Hydrogen Bond）</strong>和<strong>范德华力（Van der Waals Forces）</strong>。
      </p>

      {/* Bond overview table */}
      <div className="example-box">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>键类型</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>形成方式</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>典型强度</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>共价键</td>
              <td style={{ padding: '8px' }}>共享电子对</td>
              <td style={{ padding: '8px' }}>强（150–950 kJ/mol）</td>
              <td style={{ padding: '8px' }}>H₂、H₂O、有机分子</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>离子键</td>
              <td style={{ padding: '8px' }}>电子转移（正+负离子吸引）</td>
              <td style={{ padding: '8px' }}>强（400–4000 kJ/mol）</td>
              <td style={{ padding: '8px' }}>NaCl、KBr</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>氢键</td>
              <td style={{ padding: '8px' }}>H 与 N/O/F 的静电吸引</td>
              <td style={{ padding: '8px' }}>中等（10–40 kJ/mol）</td>
              <td style={{ padding: '8px' }}>水、DNA 双链、蛋白质</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>范德华力</td>
              <td style={{ padding: '8px' }}>瞬时偶极 / 诱导偶极</td>
              <td style={{ padding: '8px' }}>弱（0.1–10 kJ/mol）</td>
              <td style={{ padding: '8px' }}>稀有气体液化、疏水相互作用</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2 */}
      <h2 id="s2">1.2.2 共价键 / Covalent Bond</h2>
      <p>
        当两个原子都"需要"电子时，它们选择<strong>共享</strong>而非转让——
        这就是<span className="term">共价键（Covalent Bond）</span>。
        共享的电子对同时属于两个原子，从而让双方都满足八隅体规则。
      </p>
      <p>
        根据共享电子对的数量，共价键分为：
      </p>
      <ul>
        <li><strong>单键（Single Bond, —）</strong>：共享 1 对电子，例如 H—H（氢气 H₂）</li>
        <li><strong>双键（Double Bond, ═）</strong>：共享 2 对电子，例如 O═O（氧气 O₂）、C═C</li>
        <li><strong>三键（Triple Bond, ≡）</strong>：共享 3 对电子，例如 N≡N（氮气 N₂）</li>
      </ul>
      <div className="example-box">
        <p><strong>🔢 例：水分子（H₂O）的共价键</strong></p>
        <p>
          氧原子（O，6个价电子）与两个氢原子（H，各1个价电子）各自共享1对电子，
          形成两个 O—H 单键。每个 H 获得 2 个电子（满足氢的"2电子"稳定构型），
          O 获得 8 个电子（满足八隅体规则）。
        </p>
        <p style={{ fontFamily: 'monospace', marginTop: '8px' }}>H—O—H（键角约 104.5°）</p>
      </div>
      <p>
        共价键还分为<strong>极性共价键（Polar Covalent Bond）</strong>和
        <strong>非极性共价键（Nonpolar Covalent Bond）</strong>：
      </p>
      <ul>
        <li>
          <strong>非极性：</strong>两个原子对电子的吸引力相同（如 H—H、C—C），电子均匀分布。
        </li>
        <li>
          <strong>极性：</strong>两个原子的<span className="term">电负性（Electronegativity）</span>不同，
          电子偏向电负性更强的原子（如 O—H 中电子偏向 O），
          产生<span className="term">偶极矩（Dipole Moment）</span>，形成"δ+/δ−"部分电荷。
        </li>
      </ul>
      <div className="note-box">
        <strong>🎯 Digital Chemistry 重点：</strong>药物分子中绝大多数键都是共价键（C-C、C-H、C-N、C-O）。
        用于描述分子结构的 <span className="term">SMILES 字符串</span>（如 <code>CC(=O)O</code> 代表乙酸）
        本质上就是在编码共价键的连接方式——这是后续学习化学信息学的基础。
      </div>

      {/* Section 3 */}
      <h2 id="s3">1.2.3 离子键 / Ionic Bond</h2>
      <p>
        当两个原子的电负性差异非常大时（通常是金属与非金属之间），
        电子不再被"共享"，而是从电负性弱的原子直接<strong>转移</strong>到电负性强的原子。
        结果是一方失去电子成为<span className="term">阳离子（Cation, 正离子）</span>，
        另一方得到电子成为<span className="term">阴离子（Anion, 负离子）</span>，
        两者通过静电吸引力结合——这就是<span className="term">离子键（Ionic Bond）</span>。
      </p>
      <div className="example-box">
        <p><strong>🔢 例：氯化钠（NaCl，食盐）</strong></p>
        <ul>
          <li>钠（Na）：11个电子，最外层 1 个（容易失去）→ 失去 1 个电子 → Na⁺</li>
          <li>氯（Cl）：17个电子，最外层 7 个（容易得到）→ 得到 1 个电子 → Cl⁻</li>
          <li>Na⁺ 与 Cl⁻ 之间的静电吸引力 → 离子键 → NaCl 晶体</li>
        </ul>
      </div>
      <p>
        离子化合物通常具有高熔点和高沸点（因为离子键很强），在水中溶解后会解离成自由离子（导电）。
      </p>
      <div className="note-box">
        <strong>⚡ 注意：</strong>单独的离子键很强，但与共价键不同，
        离子键在水溶液中会被水分子"屏蔽"（溶剂化效应），
        因此药物分子中离子键的贡献比在晶体中小得多。
      </div>

      {/* Section 4 */}
      <h2 id="s4">1.2.4 氢键 / Hydrogen Bond</h2>
      <p>
        <span className="term">氢键（Hydrogen Bond）</span>严格来说不是一种"键"（不涉及共享或转移电子），
        而是一种<strong>分子间（或分子内）的静电吸引力</strong>。
        它发生在当氢原子（H）共价键合到电负性很强的原子（<strong>N、O 或 F</strong>）上时，
        H 带有部分正电荷（δ+），会被附近另一个 N/O/F 上的孤对电子（带δ−）吸引。
      </p>
      <div className="example-box">
        <p><strong>🔢 例：水分子之间的氢键</strong></p>
        <p>
          每个水分子有 2 个 O—H 键（H 带 δ+）和 2 对孤对电子（O 带 δ−）。
          一个水分子的 H 可以与相邻水分子的 O 形成氢键（O—H···O）。
          正是这些氢键网络使水的沸点高达 100°C（同等大小的非极性分子 H₂S 沸点为 −60°C）。
        </p>
      </div>
      <p>
        氢键在生物大分子中极其重要：
      </p>
      <ul>
        <li><strong>DNA 双螺旋：</strong>两条链之间的碱基配对（A-T 之间 2 个氢键，G-C 之间 3 个氢键）完全靠氢键维持。</li>
        <li><strong>蛋白质折叠：</strong>α-螺旋和 β-折叠的二级结构依赖骨架氢键（C═O···H—N）。</li>
        <li><strong>药物-靶标结合：</strong>大多数药物通过与靶蛋白形成氢键获得结合选择性——氢键供体（H-Bond Donor）和受体（H-Bond Acceptor）是药物设计的关键参数。</li>
      </ul>
      <div className="note-box">
        <strong>🎯 Drug Discovery 重点：</strong><span className="term">Lipinski 五规则（Rule of Five）</span>
        中有两条直接与氢键有关：H 键供体 ≤ 5，H 键受体 ≤ 10。
        这是评估药物口服生物利用度的经典规则，你在后续 AI in Drug Discovery 模块中会深入学习。
      </div>

      {/* Section 5 */}
      <h2 id="s5">1.2.5 范德华力 / Van der Waals Forces</h2>
      <p>
        <span className="term">范德华力（Van der Waals Forces）</span>是所有分子之间都存在的最弱相互作用，
        由分子中电子云的<strong>瞬时不均匀分布</strong>产生的临时偶极引起。
        主要包括：
      </p>
      <ul>
        <li><strong>色散力（London Dispersion Forces）</strong>：存在于所有分子间，分子越大、极化度越高，力越强。</li>
        <li><strong>偶极-偶极相互作用（Dipole-Dipole）</strong>：发生在极性分子之间（已有永久偶极矩）。</li>
      </ul>
      <div className="example-box">
        <p><strong>🦎 壁虎的秘密：</strong>壁虎能爬墙并非靠吸盘，而是脚垫上数百万根纳米级刚毛与墙面之间
        形成的大量范德华力——单根刚毛极弱，但叠加后足以支撑体重。
        这完美说明：范德华力单个很弱，但数量多时总效果可观。</p>
      </div>
      <p>
        在生物化学中，<strong>疏水相互作用（Hydrophobic Interaction）</strong>常与范德华力一起讨论——
        非极性基团在水中会聚集以减少与水的接触，这种聚集本质上也靠范德华力维持。
        药物分子的疏水区域插入蛋白质疏水口袋时，就是这种力在起作用。
      </p>

      {/* Section 6 */}
      <h2 id="s6">1.2.6 化学键与药物发现 / Bonds in Drug Discovery</h2>
      <p>
        理解化学键对于 AI in Chemistry 的学习至关重要，因为药物与靶标蛋白之间的
        <span className="term">分子识别（Molecular Recognition）</span>本质上是各种化学键的综合作用。
      </p>
      <div className="example-box">
        <p><strong>💊 例：阿司匹林（Aspirin）如何抑制 COX 酶</strong></p>
        <ul>
          <li>阿司匹林的乙酰基与 COX-1/COX-2 活性位点的丝氨酸（Ser530）形成<strong>不可逆共价键</strong>，永久阻断酶活性。</li>
          <li>分子的羧基（—COOH）与酶口袋的精氨酸（Arg120）形成<strong>离子/氢键相互作用</strong>，辅助定位。</li>
          <li>苯环插入疏水口袋，靠<strong>范德华力</strong>稳定结合。</li>
        </ul>
        <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#6b7280' }}>
          一个小分子的结合涉及多种键类型的协同——这正是分子对接（Molecular Docking）算法要计算的。
        </p>
      </div>
      <p>
        后续学习中，你将通过 RDKit 等化学信息学工具用代码分析这些键的特征，
        用机器学习模型预测分子的结合亲和力——这些都建立在对化学键的理解上。
      </p>

      {/* Resources */}
      <h2 id="s-resources">延伸资源 / Further Resources</h2>
      <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        <a
          href="https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:molecular-and-ionic-compound-structure-and-properties"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🎬</div>
          <div>
            <div className="resource-title">Chemical Bonds — Khan Academy</div>
            <div className="resource-source">Khan Academy · 视频系列</div>
            <div className="resource-desc">系统讲解共价键、离子键、分子间作用力，英文视频配字幕，适合零基础入门</div>
          </div>
        </a>
        <a
          href="https://www.chemguide.co.uk/atoms/bonding/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">📖</div>
          <div>
            <div className="resource-title">Bonding — Chemguide</div>
            <div className="resource-source">chemguide.co.uk · 图文教程</div>
            <div className="resource-desc">英国高中化学经典参考网站，图文并茂，覆盖各类化学键和分子间力</div>
          </div>
        </a>
        <a
          href="https://www.rcsb.org/3d-view/1TTT"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🔧</div>
          <div>
            <div className="resource-title">RCSB PDB — Aspirin-COX Structure</div>
            <div className="resource-source">rcsb.org · 3D 蛋白结构</div>
            <div className="resource-desc">阿司匹林与 COX-1 结合的真实晶体结构，可在线 3D 交互查看化学键的分子级细节</div>
          </div>
        </a>
      </div>
    </div>
  )
}
