export const ch3ReactionMechanismsMeta = {
  id: 'ch3-3-reaction-mechanisms',
  title: 'Reaction Mechanisms & Retrosynthesis',
  titleZh: '反应机理与逆合成分析',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch3. Drug-like Properties',
  estimatedMinutes: 45,
  difficulty: '🔴 重点',
  prev: { id: 'ch3-2-drug-discovery-pipeline', title: 'Drug Discovery Pipeline', path: '/learn/ch3-drug-discovery-pipeline' },
  next: null,
}

export function Ch3ReactionMechanismsContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">3.3.1 有机反应的四大类型 / Four Types of Organic Reactions</h2>
      <p>
        有机化学中的反应看似繁杂，但核心上只有四大类型。掌握分类逻辑，是理解所有具体反应机理的前提。
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>类型</th><th>英文</th><th>本质</th><th>典型例子</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>加成反应</td>
              <td>Addition</td>
              <td>两个分子合并，π 键断裂生成新 σ 键</td>
              <td>烯烃 + HBr → 溴代烷</td>
            </tr>
            <tr>
              <td>消除反应</td>
              <td>Elimination</td>
              <td>失去小分子（如 HX 或 H₂O），生成 π 键</td>
              <td>卤代烷 + 碱 → 烯烃</td>
            </tr>
            <tr>
              <td>取代反应</td>
              <td>Substitution</td>
              <td>一个原子/基团被另一个取代</td>
              <td>CH₃Br + OH⁻ → CH₃OH</td>
            </tr>
            <tr>
              <td>重排反应</td>
              <td>Rearrangement</td>
              <td>原子骨架重组，不增减原子</td>
              <td>碳正离子 1,2-迁移</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        此外，反应还可以按<strong>试剂性质</strong>分类：
      </p>
      <ul>
        <li><strong>亲核反应（Nucleophilic）</strong>：试剂提供电子对，攻击缺电子中心（如碳正离子）</li>
        <li><strong>亲电反应（Electrophilic）</strong>：试剂接受电子对，攻击富电子位点（如苯环π电子云）</li>
        <li><strong>自由基反应（Radical）</strong>：均裂产生单电子，常见于光引发的卤代反应</li>
      </ul>

      <div className="info-box">
        <strong>为什么药物化学家需要了解这些？</strong><br />
        药物分子的合成路线设计依赖于对反应类型的准确判断。选错反应类型会导致副产物增多、选择性下降，直接影响合成效率。
      </div>

      {/* Section 2 */}
      <h2 id="s2">3.3.2 箭推法：读懂反应机理的语言 / Arrow Pushing</h2>
      <p>
        <strong>箭推法（Arrow Pushing / Electron Pushing）</strong>是表示电子流向的符号体系，是有机化学机理的"通用语言"。
      </p>

      <h3>两种箭头</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>箭头类型</th><th>含义</th><th>使用场合</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>弯箭头（双线）↷</td>
              <td>表示<strong>一对</strong>电子的移动</td>
              <td>离子型反应（极性机理）</td>
            </tr>
            <tr>
              <td>鱼钩箭头（单线）⇀</td>
              <td>表示<strong>一个</strong>电子的移动</td>
              <td>自由基机理</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>共价键断裂的两种方式</h3>
      <ul>
        <li>
          <strong>异裂（Heterolysis）</strong>：两个电子全归一方，形成离子。例如：<br />
          A–B → A⁺ + B⁻（B 获得了两个电子）<br />
          常见于极性溶剂中的 SN1、E1 反应。
        </li>
        <li>
          <strong>均裂（Homolysis）</strong>：两个电子各归一方，形成两个自由基。<br />
          A–B → A• + B•<br />
          常见于光引发的自由基链反应。
        </li>
      </ul>

      <h3>反应中间体（Intermediates）</h3>
      <p>
        有机反应中经常生成短暂存在的中间体，理解其稳定性是预测反应方向的关键：
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>中间体</th><th>英文</th><th>特征</th><th>稳定性规律</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>碳正离子</td>
              <td>Carbocation</td>
              <td>缺电子，带正电</td>
              <td>叔 &gt; 仲 &gt; 伯（超共轭/烷基供电子）；苯甲位尤其稳定（共振）</td>
            </tr>
            <tr>
              <td>碳负离子</td>
              <td>Carbanion</td>
              <td>富电子，带负电</td>
              <td>稳定性相反；吸电子基团可稳定</td>
            </tr>
            <tr>
              <td>碳自由基</td>
              <td>Carbon Radical</td>
              <td>单电子，中性</td>
              <td>叔 &gt; 仲 &gt; 伯（与碳正离子类似）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>与药物设计的联系：</strong>代谢稳定性分析时，药物化学家需要判断代谢酶（如 CYP450）攻击分子的哪个位点，这本质上是在预测亲电/亲核反应发生的位置。
      </div>

      {/* Section 3 */}
      <h2 id="s3">3.3.3 亲核取代反应：SN1 vs SN2 / Nucleophilic Substitution</h2>
      <p>
        亲核取代是药物合成中最常见的反应类型之一，常用于构建 C–N、C–O、C–S 键——这些正是大多数药效团的核心键型。
      </p>

      <h3>SN2 反应（双分子亲核取代）</h3>
      <p>
        <strong>机理</strong>：亲核试剂从离去基团的<strong>背面</strong>一步进攻，过渡态中碳呈五配位"伞状"，
        产物构型<strong>完全翻转（Walden inversion）</strong>。
      </p>
      <ul>
        <li>速率 = k × [底物] × [亲核试剂]（二级动力学）</li>
        <li>偏好：<strong>伯（primary）</strong>卤代烷，空间位阻小</li>
        <li>偏好强亲核试剂（如 I⁻、HS⁻、NH₃）</li>
        <li>极性非质子溶剂（DMSO、DMF）有利于 SN2</li>
      </ul>

      <h3>SN1 反应（单分子亲核取代）</h3>
      <p>
        <strong>机理</strong>：分两步——先慢速生成碳正离子，再快速被亲核试剂捕获。产物为<strong>外消旋混合物</strong>（两面均可进攻）。
      </p>
      <ul>
        <li>速率 = k × [底物]（一级动力学，与亲核试剂浓度无关）</li>
        <li>偏好：<strong>叔（tertiary）</strong>卤代烷，碳正离子最稳定</li>
        <li>极性质子溶剂（EtOH、H₂O）有利于 SN1（可溶剂化离子）</li>
      </ul>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>比较项</th><th>SN2</th><th>SN1</th></tr>
          </thead>
          <tbody>
            <tr><td>步骤数</td><td>1步（协同）</td><td>2步（分步）</td></tr>
            <tr><td>速率决定步</td><td>进攻步</td><td>离子化步</td></tr>
            <tr><td>立体化学</td><td>构型翻转</td><td>外消旋化</td></tr>
            <tr><td>底物偏好</td><td>伯卤代烷</td><td>叔卤代烷</td></tr>
            <tr><td>亲核试剂</td><td>强亲核试剂</td><td>弱/中等亲核试剂</td></tr>
            <tr><td>溶剂</td><td>极性非质子</td><td>极性质子</td></tr>
            <tr><td>中间体</td><td>无（过渡态）</td><td>碳正离子</td></tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>手性药物的关键：</strong>SN2 的构型翻转在手性药物合成中极为有用——通过手性底物的 SN2 反应，可以精确控制产物的立体化学。若 SN1 产生外消旋体，则两种对映体的生物活性往往差异巨大（见 Ch1.3 沙利度胺案例）。
      </div>

      {/* Section 4 */}
      <h2 id="s4">3.3.4 消除反应：E1 与 E2 / Elimination Reactions</h2>
      <p>
        消除反应与亲核取代存在竞争关系。当底物是叔卤代烷，且使用强碱时，消除产物（烯烃）往往占优。
        理解这种竞争对设计高选择性反应至关重要。
      </p>

      <h3>E2 反应（双分子消除）</h3>
      <ul>
        <li><strong>机理</strong>：碱从 β 碳夺取 H，同时离去基团离开，<strong>协同进行</strong></li>
        <li>需要反式消除（anti-periplanar 构型，即 H 和 LG 反式）</li>
        <li>速率 = k × [底物] × [碱]</li>
        <li>强碱（t-BuOK、NaOEt）+ 叔卤代烷 = 优先 E2</li>
      </ul>

      <h3>E1 反应（单分子消除）</h3>
      <ul>
        <li><strong>机理</strong>：先生成碳正离子，再失去 β-H 形成烯烃（两步）</li>
        <li>速率 = k × [底物]（一级）</li>
        <li>常与 SN1 竞争，提高温度有利于 E1</li>
      </ul>

      <h3>Zaitsev 规则（扎依采夫规则）</h3>
      <p>
        当有多个 β-H 可以被消除时，<strong>优先生成取代基最多（最稳定）的烯烃</strong>，即 Zaitsev 产物。
        例外：大体积碱（t-BuOK）因空间原因偏好 Hofmann 产物（取代基少的烯烃）。
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>条件</th><th>优先反应</th></tr>
          </thead>
          <tbody>
            <tr><td>伯卤代烷 + 强亲核试剂（弱碱）</td><td>SN2</td></tr>
            <tr><td>叔卤代烷 + 强碱（非质子）</td><td>E2</td></tr>
            <tr><td>叔卤代烷 + 弱亲核试剂（质子溶剂）</td><td>SN1 / E1 混合</td></tr>
            <tr><td>仲卤代烷</td><td>取决于碱强度和温度</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 5 */}
      <h2 id="s5">3.3.5 逆合成分析 / Retrosynthetic Analysis</h2>
      <p>
        <strong>逆合成分析（Retrosynthetic Analysis）</strong>由诺贝尔化学奖得主 E. J. Corey 系统化，
        是合成化学的核心思维工具：<em>从目标分子（Target Molecule, TM）出发，向后推导所需的原料和合成步骤</em>。
      </p>

      <h3>核心概念</h3>
      <ul>
        <li>
          <strong>切断（Disconnection / ⟹ 符号）</strong>：将目标分子中的一根键"想象性断开"，
          逆向分解为两个更简单的片段。符号 ⟹ 表示"可以由…合成"（与正向箭头 → 方向相反）。
        </li>
        <li>
          <strong>合成子（Synthon）</strong>：切断后得到的理论片段，可能是碳正离子或碳负离子的等效体。
          每个合成子对应真实试剂中的<strong>合成等效体（Synthetic Equivalent）</strong>。
        </li>
        <li>
          <strong>官能团互变（FGI, Functional Group Interconversion）</strong>：
          在逆合成中将某官能团替换为更易合成的官能团，以简化路线。
        </li>
      </ul>

      <h3>逆合成分析示例</h3>
      <p>目标分子：苯乙醚（Ph–O–CH₂CH₃）</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>步骤</th><th>操作</th><th>结果</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>切断 C–O 键</td>
              <td>Ph–O⁻ + ⁺CH₂CH₃</td>
              <td>合成子：苯酚负离子 + 碳正离子等效体</td>
            </tr>
            <tr>
              <td>合成等效体</td>
              <td>苯酚（PhOH）+ 碘乙烷（EtI）</td>
              <td>实际可购买试剂</td>
            </tr>
            <tr>
              <td>正向合成</td>
              <td>PhONa + EtI → Ph–O–Et（SN2）</td>
              <td>Williamson 醚合成法</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>逆合成分析的策略层次</h3>
      <ol>
        <li><strong>官能团切断</strong>：优先在官能团附近切断（如 C=O 旁的 α-C、醚的 C–O 键）</li>
        <li><strong>环合成策略</strong>：含环结构时考虑关环反应（如 Diels-Alder、环化关环）</li>
        <li><strong>对称性利用</strong>：对称分子可从单一前体构建，减少步骤</li>
        <li><strong>汇聚合成（Convergent Synthesis）</strong>：并行合成两个片段再偶联，比线性合成更高效</li>
      </ol>

      {/* Section 6 */}
      <h2 id="s6">3.3.6 AI 辅助合成路线规划 / AI-Assisted Retrosynthesis</h2>
      <p>
        逆合成分析曾完全依赖化学家的经验积累。现在，AI 模型已能<strong>自动生成多步合成路线</strong>，
        这正是 Data Analytics in Chemistry 和 Automation 课程的核心技术场景之一。
      </p>

      <h3>代表性工具</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>工具</th><th>机构</th><th>方法</th><th>特点</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>AiZynthFinder</strong></td>
              <td>AstraZeneca</td>
              <td>蒙特卡洛树搜索 + 神经网络</td>
              <td>开源，可本地部署，工业级应用</td>
            </tr>
            <tr>
              <td><strong>ASKCOS</strong></td>
              <td>MIT</td>
              <td>模板匹配 + 深度学习</td>
              <td>Web 界面，支持正/逆合成预测</td>
            </tr>
            <tr>
              <td><strong>Syntheseus</strong></td>
              <td>Microsoft Research</td>
              <td>模型无关评估框架</td>
              <td>用于对比不同逆合成模型</td>
            </tr>
            <tr>
              <td><strong>IBM RXN</strong></td>
              <td>IBM</td>
              <td>Transformer 模型（Mol2Mol）</td>
              <td>正向反应预测，云端 API</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>AI 逆合成的核心挑战</h3>
      <ul>
        <li>
          <strong>反应模板覆盖</strong>：大多数工具依赖从文献中提取的反应模板（SMARTS 规则），
          未见过的新型反应难以预测。
        </li>
        <li>
          <strong>可行性 vs 可购买性</strong>：AI 生成的路线需要验证中间体是否可商业购得、
          试剂是否安全、成本是否可接受。
        </li>
        <li>
          <strong>立体化学控制</strong>：多步合成中手性中心的精确控制，目前仍是 AI 的薄弱环节。
        </li>
        <li>
          <strong>原子经济性（Atom Economy）</strong>：绿色化学要求最小化副产物，
          AI 路线需同时优化产率和原子利用率。
        </li>
      </ul>

      <h3>与 Drug Discovery Pipeline 的联系</h3>
      <p>
        在先导化合物优化（Lead Optimization）阶段，化学家每周需要合成数十到数百个类似物用于 SAR 分析。
        AI 逆合成工具可以：
      </p>
      <ol>
        <li>快速评估哪些修饰在合成上可行</li>
        <li>预先筛选出原料可购买的候选路线</li>
        <li>与自动化合成平台（如 Chemspeed、Automator）对接，实现端到端"设计-合成-测试"闭环</li>
      </ol>

      <div className="info-box">
        <strong>IC 课程联系：</strong>Automation in Chemistry 课程中会涉及自动化合成平台与 AI 路线规划的集成；
        AI in Chemistry: Drug Discovery 课程则会深入探讨 AiZynthFinder 等工具的实际应用案例。
        掌握本章内容有助于你在那些课程中快速建立背景知识。
      </div>

    </div>
  )
}
