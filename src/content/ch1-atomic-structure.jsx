export const ch1AtomicStructureMeta = {
  id: 'ch1-1-atomic-structure',
  title: 'Atomic Structure',
  titleZh: '原子结构',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch1. Atoms & Chemical Bonds',
  estimatedMinutes: 25,
  difficulty: '🟢 入门',
  prev: null,
  next: { id: 'ch1-2-chemical-bonds', title: 'Chemical Bonds', path: '/learn/ch1-chemical-bonds' },
}

export function Ch1AtomicStructureContent() {
  return (
    <div className="content-prose">
      {/* Section 1 */}
      <h2 id="s1">1.1.1 什么是原子 / What is an Atom?</h2>
      <p>
        <span className="term">原子（Atom）</span>是构成普通物质的最小单位，是化学变化中不可再分的基本微粒。
        你可以把原子想象成乐高积木——所有的物质，从水分子到 DNA，都是由不同种类的原子"拼"出来的。
      </p>
      <p>
        目前已知的原子种类共有 118 种，对应元素周期表中的 118 种
        <span className="term">元素（Element）</span>。每种元素都有独特的原子，
        比如碳原子（Carbon, C）、氧原子（Oxygen, O）、氢原子（Hydrogen, H）。
      </p>
      <div className="note-box">
        <strong>📌 对比类比：</strong>如果把原子类比为 Python 中的基本数据类型，
        那么 int、str、float 就像不同的元素，而各种数据结构（list、dict）就像由这些基本类型组合成的分子。
      </div>

      {/* Section 2 */}
      <h2 id="s2">1.1.2 亚原子粒子 / Subatomic Particles</h2>
      <p>
        原子虽小，但它内部还有更小的结构。原子由三种
        <span className="term">亚原子粒子（Subatomic Particles）</span>组成：
      </p>
      <div className="example-box">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>粒子</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>英文名</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>符号</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>位置</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>电荷</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#374151' }}>质量（相对）</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>质子</td>
              <td style={{ padding: '8px' }}>Proton</td>
              <td style={{ padding: '8px' }}>p⁺</td>
              <td style={{ padding: '8px' }}>原子核内</td>
              <td style={{ padding: '8px' }}>+1</td>
              <td style={{ padding: '8px' }}>1</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px' }}>中子</td>
              <td style={{ padding: '8px' }}>Neutron</td>
              <td style={{ padding: '8px' }}>n⁰</td>
              <td style={{ padding: '8px' }}>原子核内</td>
              <td style={{ padding: '8px' }}>0</td>
              <td style={{ padding: '8px' }}>1</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>电子</td>
              <td style={{ padding: '8px' }}>Electron</td>
              <td style={{ padding: '8px' }}>e⁻</td>
              <td style={{ padding: '8px' }}>核外轨道</td>
              <td style={{ padding: '8px' }}>−1</td>
              <td style={{ padding: '8px' }}>≈0（约1/1836）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        质子和中子紧密结合在<span className="term">原子核（Nucleus）</span>中，
        电子则在原子核外的特定区域（轨道）高速运动。
        整个原子大部分是"空"的——如果原子核有一个足球场那么大，电子就在几公里外的地方运动。
      </p>

      {/* Section 3 */}
      <h2 id="s3">1.1.3 原子序数与质量数 / Atomic Number & Mass Number</h2>
      <p>
        这两个数字是识别原子的关键指标：
      </p>
      <ul>
        <li>
          <strong>原子序数（Atomic Number, Z）</strong>：原子核中<strong>质子的数量</strong>。
          它唯一决定了这个原子属于哪种元素。例如，Z = 6 就一定是碳（Carbon）。
        </li>
        <li>
          <strong>质量数（Mass Number, A）</strong>：质子数 + 中子数（A = Z + N）。
          中性原子中，质子数 = 电子数。
        </li>
      </ul>
      <div className="example-box">
        <p><strong>🔢 例：碳-12（¹²C）</strong></p>
        <ul>
          <li>原子序数 Z = 6（6个质子）</li>
          <li>质量数 A = 12</li>
          <li>中子数 N = A − Z = 12 − 6 = 6</li>
          <li>电子数 = 6（与质子数相同，中性原子）</li>
        </ul>
      </div>
      <div className="note-box">
        <strong>⚡ 同位素（Isotope）</strong>：同一元素（质子数相同）但中子数不同的原子互称同位素。
        例如碳-12（¹²C）和碳-14（¹⁴C）都是碳，但¹⁴C含有8个中子，常用于考古中的
        <span className="term">放射性碳定年（Radiocarbon Dating）</span>。
      </div>

      {/* Section 4 */}
      <h2 id="s4">1.1.4 电子层与轨道 / Electron Shells & Orbitals</h2>
      <p>
        电子不是随机分布在原子核外的——它们按照特定规律排列在
        <span className="term">电子层（Electron Shells）</span>中，
        从内到外依次为第一层、第二层……（或用字母 K、L、M、N 表示）。
      </p>
      <p>
        每一层能容纳的最大电子数为 <strong>2n²</strong>（n 是层数）：
      </p>
      <ul>
        <li>第1层（K层）：最多 2 个电子</li>
        <li>第2层（L层）：最多 8 个电子</li>
        <li>第3层（M层）：最多 18 个电子</li>
      </ul>
      <div className="example-box">
        <p><strong>🔢 例：钠原子（Na，Z=11）的电子排布</strong></p>
        <p>11个电子 → 第1层2个 + 第2层8个 + 第3层1个</p>
        <p style={{ fontFamily: 'monospace', marginTop: '8px' }}>Na: [2, 8, 1] → 最外层1个电子</p>
      </div>
      <p>
        <strong>最外层电子（价电子，Valence Electrons）</strong>决定了元素的化学性质。
        这也是为什么同族元素（纵列）化学性质相似——它们的最外层电子数相同。
      </p>
      <p>
        在量子化学层面，轨道进一步分为
        <span className="term">s、p、d、f 轨道（Atomic Orbitals）</span>，
        每种轨道形状不同，但入学前只需理解电子层的概念即可。
      </p>

      {/* Section 5 */}
      <h2 id="s5">1.1.5 元素周期表入门 / Introduction to the Periodic Table</h2>
      <p>
        <span className="term">元素周期表（Periodic Table）</span>按原子序数从小到大排列所有元素，
        并将化学性质相似的元素排在同一列（族）。
      </p>
      <ul>
        <li><strong>横行（Period/周期）</strong>：同一周期的元素电子层数相同。第二周期有8个元素（Li→Ne）。</li>
        <li><strong>纵列（Group/族）</strong>：同一族元素最外层电子数相同，化学性质相似。</li>
        <li><strong>金属 vs 非金属</strong>：元素周期表左下方大多是金属，右上方是非金属，中间是类金属（Metalloids）。</li>
      </ul>
      <div className="note-box">
        <strong>🎯 Digital Chemistry 重点元素：</strong>在 AI in Chemistry 中，
        你最常接触的元素是 C（碳）、H（氢）、N（氮）、O（氧）、S（硫）、P（磷）——
        这6个元素构成了绝大多数药物分子，常称为
        <span className="term">CHNOPS 元素</span>。
      </div>

      {/* Resources */}
      <h2 id="s-resources">延伸资源 / Further Resources</h2>
      <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        <a
          href="https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:atomic-structure-and-properties"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🎬</div>
          <div>
            <div className="resource-title">Atomic Structure — Khan Academy</div>
            <div className="resource-source">Khan Academy · 视频系列</div>
            <div className="resource-desc">系统讲解原子结构、亚原子粒子和电子配置，英文视频配字幕，适合零基础</div>
          </div>
        </a>
        <a
          href="https://ptable.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon">🔧</div>
          <div>
            <div className="resource-title">Interactive Periodic Table — PTable</div>
            <div className="resource-source">ptable.com · 交互工具</div>
            <div className="resource-desc">交互式元素周期表，点击元素查看电子配置、性质、同位素等详细信息</div>
          </div>
        </a>
      </div>
    </div>
  )
}
