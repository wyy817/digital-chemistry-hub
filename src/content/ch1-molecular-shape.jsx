export const ch1MolecularShapeMeta = {
  id: 'ch1-3-molecular-shape',
  title: 'Molecular Shape & Chirality',
  titleZh: '分子形状与手性',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch1. Atoms & Chemical Bonds',
  estimatedMinutes: 35,
  difficulty: '🟡 进阶',
  prev: { id: 'ch1-2-chemical-bonds', title: 'Chemical Bonds', path: '/learn/ch1-chemical-bonds' },
  next: null,
}

export function Ch1MolecularShapeContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2>1.3.1 分子为什么有形状 / Why Do Molecules Have Shape?</h2>
      <p>
        化学键告诉我们原子如何连接，但连接之后的三维排列是什么？
        同样由 1 个 C 和 4 个 H 组成的甲烷（CH₄），它的形状并不是"平"的，
        而是一个正四面体——氢在四个方向上对称分布。
      </p>
      <p>
        决定分子形状的核心规则是
        <span className="term">价层电子对互斥理论（VSEPR，Valence Shell Electron Pair Repulsion Theory）</span>：
        中心原子周围的所有电子对（成键电子对 + 孤对电子）会尽量相互远离，
        以最小化排斥能，从而决定分子的几何形状。
      </p>
      <div className="note-box">
        <strong>📌 类比：</strong>把电子对想象成气球，绑在同一个点上——它们会自然撑开到尽量远的位置。
        2 个气球 → 直线；3 个 → 三角形；4 个 → 四面体。
        孤对电子（未参与成键的电子对）"气球更大"，会压缩成键角。
      </div>

      {/* Section 2 */}
      <h2>1.3.2 常见几何构型 / Common Molecular Geometries</h2>
      <p>
        以下是最常见的分子几何构型，括号中的数字代表（成键电子对数 / 孤对电子数）：
      </p>
      <div className="example-box">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>构型名称</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>成键 / 孤对</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>键角</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>示例</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>药物相关</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>线形（Linear）</td>
              <td style={{ padding: '8px' }}>2 / 0</td>
              <td style={{ padding: '8px' }}>180°</td>
              <td style={{ padding: '8px' }}>CO₂、BeCl₂</td>
              <td style={{ padding: '8px' }}>炔键 C≡C（药物骨架）</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>三角平面（Trigonal Planar）</td>
              <td style={{ padding: '8px' }}>3 / 0</td>
              <td style={{ padding: '8px' }}>120°</td>
              <td style={{ padding: '8px' }}>BF₃、C═O</td>
              <td style={{ padding: '8px' }}>苯环、酰胺键（肽键）</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>四面体（Tetrahedral）</td>
              <td style={{ padding: '8px' }}>4 / 0</td>
              <td style={{ padding: '8px' }}>109.5°</td>
              <td style={{ padding: '8px' }}>CH₄、CCl₄</td>
              <td style={{ padding: '8px' }}>碳骨架（sp³ 碳）、<strong>手性中心</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>三角锥形（Trigonal Pyramidal）</td>
              <td style={{ padding: '8px' }}>3 / 1</td>
              <td style={{ padding: '8px' }}>107°</td>
              <td style={{ padding: '8px' }}>NH₃</td>
              <td style={{ padding: '8px' }}>含氮药物官能团（胺基）</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>V 形 / 角形（Bent）</td>
              <td style={{ padding: '8px' }}>2 / 2</td>
              <td style={{ padding: '8px' }}>104.5°</td>
              <td style={{ padding: '8px' }}>H₂O</td>
              <td style={{ padding: '8px' }}>醚键 C—O—C（药物常见结构）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="note-box">
        <strong>⚡ 孤对电子的"挤压效应"：</strong>孤对电子比成键电子对占据更多空间，
        会压缩其他键角。NH₃ 理论上应是 109.5°（四面体），但因为 1 对孤对电子的挤压，
        实际键角是 107°；H₂O 有 2 对孤对电子，进一步压缩到 104.5°。
      </div>

      {/* Section 3 */}
      <h2>1.3.3 分子极性 / Molecular Polarity</h2>
      <p>
        极性共价键（如 C—O、O—H）会产生偶极矩，但整个分子是否极性取决于
        <strong>所有键偶极矩的向量和</strong>——形状决定了这些向量是否相消。
      </p>
      <div className="example-box">
        <p><strong>🔢 经典对比：CO₂ vs H₂O</strong></p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>分子</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>形状</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>键极性</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>偶极矩相消？</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>结论</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>CO₂</td>
              <td style={{ padding: '8px' }}>线形（O=C=O）</td>
              <td style={{ padding: '8px' }}>两个极性 C=O</td>
              <td style={{ padding: '8px' }}>✅ 完全相消（方向相反）</td>
              <td style={{ padding: '8px' }}>非极性分子</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>H₂O</td>
              <td style={{ padding: '8px' }}>V 形（104.5°）</td>
              <td style={{ padding: '8px' }}>两个极性 O—H</td>
              <td style={{ padding: '8px' }}>❌ 未相消（方向不对称）</td>
              <td style={{ padding: '8px' }}>极性分子</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        分子极性影响其溶解性（"相似相溶"，Like dissolves like）：极性分子溶于水；
        非极性分子溶于有机溶剂（苯、乙醚等）。
        药物的水溶性与脂溶性平衡（<span className="term">LogP 值</span>）直接与分子极性相关，
        是 ADMET 预测的关键参数。
      </p>

      {/* Section 4 */}
      <h2>1.3.4 手性与对映体 / Chirality & Enantiomers</h2>
      <p>
        当一个碳原子连接着<strong>四个完全不同的基团</strong>时，这个碳就是
        <span className="term">手性中心（Chiral Center / Stereocenter）</span>，
        也称<span className="term">不对称碳（Asymmetric Carbon）</span>。
        含有手性中心的分子与其镜像不能重合——就像左手和右手的关系。
      </p>
      <p>
        这两种互为镜像的分子叫做<span className="term">对映体（Enantiomers）</span>。
        它们的物理性质（熔点、沸点、溶解度）几乎完全相同，
        但在生物体内却可能表现出<strong>截然不同的活性</strong>——因为酶和受体本身也有手性。
      </p>
      <div className="example-box">
        <p><strong>🔢 例：氨基酸的手性</strong></p>
        <p>
          氨基酸（除甘氨酸外）都有一个手性中心，产生 L- 和 D- 两种对映体。
          自然界中蛋白质只由 <strong>L-氨基酸</strong>构成——这是生命演化的"选择"。
          D-氨基酸的抗生素（如 D-Ala）能抵抗蛋白酶降解，因此被某些细菌利用对抗免疫系统。
        </p>
      </div>
      <p>
        对映体的命名常用 <span className="term">R/S 构型系统</span>（Cahn-Ingold-Prelog 规则）：
        根据手性中心四个取代基的优先级顺序，顺时针为 R（Rectus，右），逆时针为 S（Sinister，左）。
        在 SMILES 字符串中，手性用 <code>@</code>（逆时针）和 <code>@@</code>（顺时针）标注，
        例如 <code>[C@@H](N)(C)C(=O)O</code> 表示 L-丙氨酸。
      </p>

      {/* Section 5 */}
      <h2>1.3.5 手性在药物发现中的重要性 / Chirality in Drug Discovery</h2>
      <p>
        手性在制药行业的重要性不亚于分子本身的结构——错误的手性可能导致从无效到危险的后果。
      </p>

      {/* Thalidomide */}
      <div className="example-box" style={{ borderLeft: '4px solid #ef4444' }}>
        <p><strong>⚠️ 沙利度胺悲剧（Thalidomide Tragedy，1957–1961）</strong></p>
        <p>
          沙利度胺作为孕妇止吐药上市时，其外消旋体（R 和 S 对映体各 50% 的混合物）被当作无害药物使用。
        </p>
        <ul>
          <li><strong>R-(+)-沙利度胺：</strong>有效的镇静/止吐效果</li>
          <li><strong>S-(-)-沙利度胺：</strong>强力致畸剂，干扰胎儿肢体发育</li>
        </ul>
        <p>
          导致全球约 10,000 名婴儿因肢体缺陷出生（海豹肢症）。
          这一悲剧直接推动了全球药物立法改革，FDA 从此要求药物进行严格的对映体分别测试。
        </p>
        <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '8px' }}>
          注：即使分离纯 R 对映体给药，在体内也会因"外消旋化（Racemization）"而转化为 S 型，因此沙利度胺的安全使用需要非常严格的控制。
        </p>
      </div>

      <p>
        另一个著名例子是<span className="term">布洛芬（Ibuprofen）</span>：
      </p>
      <ul>
        <li><strong>S-(+)-布洛芬：</strong>有效的抗炎、镇痛活性成分</li>
        <li><strong>R-(-)-布洛芬：</strong>几乎无活性，但在体内可缓慢转化为 S 型</li>
      </ul>
      <p>
        目前市售布洛芬多为外消旋体，但高纯度的 S-布洛芬（右旋布洛芬，Dexibuprofen）起效更快，
        所需剂量更小，副作用更少。
      </p>
      <div className="note-box">
        <strong>🎯 AI in Drug Discovery 重点：</strong>现代 AI 分子生成模型（如 Diffusion-based 3D molecule generation）
        需要在生成结构时考虑手性——生成的 SMILES 或 3D 坐标必须指定正确的立体化学。
        RDKit 中的 <code>Chem.MolToSmiles(mol, isomericSmiles=True)</code> 就是用来保留手性信息的。
        当你学习分子对接（Molecular Docking）时，受体口袋的手性是决定哪种对映体能结合的关键。
      </div>

      {/* Resources */}
      <h2>延伸资源 / Further Resources</h2>
      <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        <a
          href="https://www.khanacademy.org/science/organic-chemistry/stereochemistry-topic"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🎬</div>
          <div>
            <div className="resource-title">Stereochemistry — Khan Academy</div>
            <div className="resource-source">Khan Academy · 视频系列</div>
            <div className="resource-desc">覆盖手性中心、R/S 命名、对映体与非对映体，有动画演示三维结构，直观易懂</div>
          </div>
        </a>
        <a
          href="https://www.youtube.com/watch?v=zOcHvfZiWbU"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🎬</div>
          <div>
            <div className="resource-title">Thalidomide — Periodic Videos</div>
            <div className="resource-source">YouTube · 科普视频</div>
            <div className="resource-desc">诺丁汉大学化学教授讲解沙利度胺的历史与手性悲剧，15分钟，英文字幕</div>
          </div>
        </a>
        <a
          href="https://molview.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🔧</div>
          <div>
            <div className="resource-title">MolView — 3D 分子可视化</div>
            <div className="resource-source">molview.org · 交互工具</div>
            <div className="resource-desc">在线输入 SMILES 或分子名称，即可查看 3D 立体结构，适合直观理解分子形状和手性</div>
          </div>
        </a>
      </div>
    </div>
  )
}
