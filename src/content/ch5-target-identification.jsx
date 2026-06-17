export const ch5TargetIdentificationMeta = {
  id: 'ch5-2-target-identification',
  title: 'Target Identification & Validation',
  titleZh: '靶点识别与验证',
  path: 'AI in Drug Discovery',
  chapter: 'Ch5. Drug Discovery Pipeline',
  estimatedMinutes: 45,
  difficulty: '🟡 入门',
  prev: { title: '5.1 Pipeline Overview', path: '/learn/ch5-drug-pipeline-overview' },
  next: { title: '5.3 Hit / Lead / Candidate', path: '/learn/ch5-hit-lead-candidate' },
}

export function Ch5TargetIdentificationContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">5.2.1 什么是靶点？/ What is a Drug Target?</h2>
      <p>
        <strong>药物靶点（Drug Target）</strong>是药物分子发挥治疗作用的生物大分子——
        通常是一个蛋白质（酶、受体、离子通道、转运体等），药物通过与其结合来改变其活性，从而影响疾病进程。
      </p>

      <h3>靶点的主要类别</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>类型</th><th>占比（已批准药物）</th><th>例子</th><th>作用方式</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>G 蛋白偶联受体 (GPCR)</strong></td>
              <td>~34%</td>
              <td>肾上腺素受体、多巴胺受体</td>
              <td>激动剂/拮抗剂调节信号转导</td>
            </tr>
            <tr>
              <td><strong>酶 (Enzyme)</strong></td>
              <td>~28%</td>
              <td>COX-2（布洛芬靶点）、ACE（降压药靶点）</td>
              <td>抑制剂阻断催化活性</td>
            </tr>
            <tr>
              <td><strong>离子通道 (Ion Channel)</strong></td>
              <td>~19%</td>
              <td>钠通道、钙通道</td>
              <td>阻断/调节离子流动</td>
            </tr>
            <tr>
              <td><strong>核受体 (Nuclear Receptor)</strong></td>
              <td>~16%</td>
              <td>雌激素受体（乳腺癌靶点）</td>
              <td>调节基因表达</td>
            </tr>
            <tr>
              <td><strong>转运体 (Transporter)</strong></td>
              <td>~3%</td>
              <td>血清素转运体（SSRI 靶点）</td>
              <td>抑制分子跨膜运输</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>不是所有蛋白质都适合做靶点：</strong>
        一个好靶点需要满足（1）与疾病因果相关（2）结构上能被小分子结合（即"可成药性"）
        （3）调节该靶点不会引起严重副作用（即"安全窗口"足够宽）。
      </div>

      {/* Section 2 */}
      <h2 id="s2">5.2.2 靶点识别的传统方法 / Traditional Target Identification</h2>
      <p>
        在 AI 出现之前，靶点识别依赖以下方法：
      </p>

      <h3>正向遗传学 / Forward Genetics</h3>
      <p>
        从表型出发：观察到某个突变/药物能改善疾病，然后反向追踪哪个基因/蛋白质被影响了。
        经典例子：青霉素被发现能杀菌 → 追踪发现靶点是细菌细胞壁合成酶（PBPs）。
      </p>

      <h3>反向遗传学 / Reverse Genetics</h3>
      <p>
        从基因组出发：先确定某个基因的功能（通过基因敲除/过表达），再验证它是否与疾病相关。
        CRISPR-Cas9 大幅加速了这一过程。
      </p>

      <h3>基因组关联研究 (GWAS)</h3>
      <p>
        分析数千名患者与健康人的基因组差异，找出与疾病强关联的基因变体（SNP）。
        GWAS 能帮助识别疾病相关基因，但通常需要进一步实验确认因果关系。
      </p>

      {/* Section 3 */}
      <h2 id="s3">5.2.3 AI 辅助靶点识别 / AI-Assisted Target Identification</h2>
      <p>
        AI 在靶点识别中的应用已经从辅助工具变成核心方法：
      </p>

      <h3>知识图谱与网络分析</h3>
      <p>
        将基因、蛋白质、疾病、药物之间的关系构建成<strong>知识图谱（Knowledge Graph）</strong>，
        用图神经网络（GNN）或嵌入方法预测未知的"疾病–蛋白质"关联。
      </p>
      <pre><code>{`# 示意性代码：知识图谱中的靶点预测思路
# 实际工具：OpenBioLink、Hetionet、BioKEEN

# 一个简化的知识图谱边类型示例：
edges = [
    ("Gene_TP53", "associated_with", "Disease_Cancer"),
    ("Drug_Imatinib", "targets", "Protein_BCR_ABL"),
    ("Protein_BCR_ABL", "encoded_by", "Gene_ABL1"),
    ("Gene_ABL1", "overexpressed_in", "Disease_CML"),
]

# GNN 训练后可预测：
# ("Protein_X", "potential_target_for", "Disease_Y") 的概率`}</code></pre>

      <h3>多组学数据融合</h3>
      <p>
        整合基因组学（Genomics）、转录组学（Transcriptomics）、蛋白质组学（Proteomics）
        和代谢组学（Metabolomics）数据，用机器学习识别在患者中异常的信号通路和关键节点蛋白质。
      </p>

      <h3>自然语言处理（NLP）文献挖掘</h3>
      <p>
        PubMed 数据库中有超过 3500 万篇论文，手动阅读是不可能的。
        NLP 模型（如 BioBERT、PubMedBERT）可以自动从文献中提取
        "疾病–基因–蛋白质"关联，发现尚未被广泛关注的潜在靶点。
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>AI 方法</th><th>输入数据</th><th>输出</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>知识图谱 + GNN</td>
              <td>基因/蛋白质/疾病/药物的关联网络</td>
              <td>新的疾病–靶点关联预测</td>
            </tr>
            <tr>
              <td>多组学整合</td>
              <td>患者基因表达谱、蛋白质丰度</td>
              <td>疾病相关的信号通路和关键蛋白</td>
            </tr>
            <tr>
              <td>NLP 文献挖掘</td>
              <td>数千万篇生物医学论文</td>
              <td>提取实体关系，发现冷门靶点</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4 */}
      <h2 id="s4">5.2.4 靶点验证 / Target Validation</h2>
      <p>
        识别出候选靶点后，还需要<strong>验证（Validation）</strong>：
        确认"调节这个靶点确实能改善疾病"，而不只是相关而非因果。
      </p>

      <h3>遗传学验证</h3>
      <p>
        使用 <strong>CRISPR-Cas9</strong> 基因编辑敲除或过表达目标基因，
        观察细胞或动物模型中的表型变化是否符合预期。
        这是目前最有力的靶点验证方法之一。
      </p>

      <h3>化学探针验证 (Chemical Probe)</h3>
      <p>
        设计一个能高选择性结合目标蛋白质的工具化合物（化学探针），
        用它来调节靶点活性，观察能否改变疾病相关表型。
        化学探针不需要是完美的药物，但必须足够选择性（不结合其他蛋白质）。
      </p>

      <h3>生物信息学验证</h3>
      <p>
        分析该靶点在患者与健康人中的表达差异、
        靶点突变与药物反应的关联（基因型–表型关联），
        以及与疾病相关的通路分析。
      </p>

      <div className="warning-box">
        <strong>⚠️ 靶点验证是药物发现失败的最大来源之一：</strong>
        估计约 50% 的药物在临床 II/III 期失败是因为靶点假设错误——
        即使化合物本身设计得很好，靶点没选对就是"打错了战场"。
        AI 在靶点验证上还处于早期阶段，实验验证仍然不可替代。
      </div>

      {/* Section 5 */}
      <h2 id="s5">5.2.5 可成药性分析 / Druggability Assessment</h2>
      <p>
        即使一个蛋白质与疾病因果相关，它不一定能被小分子药物干预——
        这取决于<strong>可成药性（Druggability）</strong>：
        蛋白质的三维结构上是否有合适的结合口袋（Binding Pocket）来容纳小分子。
      </p>

      <h3>结合口袋的要求</h3>
      <ul>
        <li><strong>几何形状合适</strong>：足够深和封闭（凹陷），而不是平面（如蛋白质-蛋白质相互作用界面）</li>
        <li><strong>体积合适</strong>：约 300–1000 Å³（类药小分子的大小范围）</li>
        <li><strong>疏水区域</strong>：能提供疏水相互作用来稳定结合</li>
      </ul>

      <h3>AI 预测可成药性</h3>
      <p>
        结合 AlphaFold 预测的蛋白质结构，AI 工具（如 SiteMap、fpocket、DoGSiteScorer）
        可以自动识别蛋白质表面的口袋，并打分评估其可成药性。
      </p>

      <pre><code>{`# 使用 fpocket 或类似工具分析口袋（概念代码）
# 实际使用需要安装 fpocket 或 SiteMap

# AlphaFold 结构下载后的口袋分析流程：
# 1. 从 AlphaFold DB 下载 PDB 文件
#    https://alphafold.ebi.ac.uk/

# 2. 用 fpocket 分析口袋
#    fpocket -f protein.pdb
#    输出：每个口袋的体积、疏水性、可成药性评分

# 3. 解读关键指标
pocket_metrics = {
    'volume': 650,          # Å³，>300 通常认为有希望
    'hydrophobicity': 0.72, # 0–1，>0.5 通常更好
    'druggability_score': 0.85,  # fpocket 打分，>0.5 有潜力
}`}</code></pre>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>蛋白质类型</th><th>可成药性</th><th>原因</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>酶（有底物结合口袋）</td>
              <td>✅ 高</td>
              <td>活性位点通常是深而封闭的口袋，天然适合小分子结合</td>
            </tr>
            <tr>
              <td>GPCR（跨膜受体）</td>
              <td>✅ 高</td>
              <td>跨膜螺旋围成的结合位点</td>
            </tr>
            <tr>
              <td>转录因子</td>
              <td>⚠️ 低–中</td>
              <td>DNA 结合域通常是平坦表面，缺少深口袋</td>
            </tr>
            <tr>
              <td>蛋白质–蛋白质相互作用（PPI）</td>
              <td>❌ 传统上极低</td>
              <td>接触面积大且平坦，但"热点残基（hot spot）"策略使部分 PPI 变得可成药</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 6 */}
      <h2 id="s6">5.2.6 案例：AlphaFold 如何改变靶点发现 / AlphaFold's Impact</h2>
      <p>
        在 AlphaFold 2（2020）出现之前，实验确定一个蛋白质结构（X 射线晶体学、冷冻电镜）
        需要数月到数年时间和高度专业技能。结构未知的蛋白质无法进行基于结构的虚拟筛选。
      </p>

      <h3>AlphaFold 的实际影响</h3>
      <ul>
        <li>
          <strong>孤儿靶点激活</strong>：数以千计与疾病相关但从未被实验解析过结构的蛋白质
          现在有了可用的预测结构，使它们首次能够进入基于结构的药物设计流程
        </li>
        <li>
          <strong>加速靶点验证</strong>：快速获得结构信息，了解蛋白质的活性位点和调控机制
        </li>
        <li>
          <strong>与分子对接结合</strong>：AlphaFold 结构 + 虚拟对接
          = 在蛋白质被实验解析之前就能开始虚拟筛选
        </li>
      </ul>

      <h3>AlphaFold 的局限性</h3>
      <ul>
        <li>预测的是<em>静态</em>结构，蛋白质在生理条件下是动态的（构象变化很重要）</li>
        <li>对无序区域（Intrinsically Disordered Regions）预测质量较低（pLDDT 分数低）</li>
        <li>蛋白质–配体复合物的预测需要 AlphaFold 3（2024）等更新版本</li>
      </ul>

      <div className="info-box">
        <strong>AlphaFold 3（2024）：</strong>
        Google DeepMind 发布的新版本可以预测蛋白质与小分子、DNA、RNA 的复合物结构，
        直接用于分子对接和药物设计，进一步压缩了靶点识别到虚拟筛选之间的时间。
      </div>

    </div>
  )
}
