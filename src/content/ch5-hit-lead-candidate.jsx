export const ch5HitLeadCandidateMeta = {
  id: 'ch5-3-hit-lead-candidate',
  title: 'Hit / Lead / Drug Candidate',
  titleZh: 'Hit → Lead → Candidate：从苗头到候选药物',
  path: 'AI in Drug Discovery',
  chapter: 'Ch5. Drug Discovery Pipeline',
  estimatedMinutes: 50,
  difficulty: '🟡 入门',
  prev: { title: '5.2 Target Identification', path: '/learn/ch5-target-identification' },
  next: { title: '6.1 ADMET Deep Dive', path: '/learn/ch6-admet-deep-dive' },
}

export function Ch5HitLeadCandidateContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">5.3.1 三个阶段的定义 / Defining Hit, Lead, and Candidate</h2>
      <p>
        当确定靶点后，药物化学家需要经历三个逐步深化的优化阶段，
        才能把一个"能绑定靶点的分子"变成"适合进入临床的候选药物"。
        这三个阶段有严格的标准，不是随意命名的。
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>阶段</th><th>定义</th><th>典型标准</th><th>数量</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>苗头化合物 (Hit)</strong></td>
              <td>在初步筛选中被确认能与靶点结合的化合物</td>
              <td>IC₅₀ &lt; 10 µM（微摩尔级活性），选择性初步确认</td>
              <td>~100–1000 个</td>
            </tr>
            <tr>
              <td><strong>先导化合物 (Lead)</strong></td>
              <td>经过优化，具有更好活性、选择性和初步 ADMET 性质的化合物</td>
              <td>IC₅₀ &lt; 1 µM，Lipinski 五规则通过，无明显毒性标志</td>
              <td>~5–20 个</td>
            </tr>
            <tr>
              <td><strong>候选药物 (Drug Candidate)</strong></td>
              <td>满足进入临床前研究所有标准的化合物</td>
              <td>IC₅₀ &lt; 100 nM（纳摩尔级），ADMET 全面通过，合成路线确定，稳定性合格</td>
              <td>1–3 个</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>IC₅₀ 是什么？</strong>
        IC₅₀（Half-maximal Inhibitory Concentration）是使靶点活性降低 50% 所需的化合物浓度。
        IC₅₀ 越小，说明化合物活性越强、越少的量就能起作用。
        1 nM = 0.001 µM = 10⁻⁹ mol/L（极低浓度即有效）。
      </div>

      {/* Section 2 */}
      <h2 id="s2">5.3.2 苗头化合物发现：高通量筛选 / Hit Discovery: HTS</h2>
      <p>
        发现苗头化合物的传统方法是<strong>高通量筛选（High-Throughput Screening, HTS）</strong>：
        在自动化机械手和微量化学实验室中，快速测试大量化合物与靶点的结合能力。
      </p>

      <h3>HTS 的工作流程</h3>
      <ul>
        <li><strong>化合物库</strong>：大型药企通常有 100 万–1000 万个化合物的库</li>
        <li><strong>自动化平台</strong>：384/1536 孔板，每天可筛选 10 万–100 万个化合物</li>
        <li><strong>活性测定</strong>：荧光、发光或放射性标记的生化实验</li>
        <li><strong>命中率</strong>：通常 0.01%–1%（即每 1000 个分子只有 0–10 个真正有活性）</li>
      </ul>

      <h3>AI 辅助的虚拟筛选（Virtual Screening）</h3>
      <p>
        在 HTS 之前先进行<strong>虚拟筛选</strong>，用计算方法预测哪些分子值得实验测试，
        从而大幅减少需要实际合成和测试的分子数量。
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>虚拟筛选方法</th><th>原理</th><th>优势</th><th>局限</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>分子对接 (Docking)</strong></td>
              <td>模拟小分子在靶点口袋中的结合方式和能量</td>
              <td>直接利用结构信息，有物理意义</td>
              <td>计算速度慢（每个分子需数秒到分钟）</td>
            </tr>
            <tr>
              <td><strong>QSAR 模型</strong></td>
              <td>用已知活性数据训练预测模型</td>
              <td>速度极快（毫秒级），可筛选亿级库</td>
              <td>依赖训练数据质量，适用域有限</td>
            </tr>
            <tr>
              <td><strong>深度学习（GNN）</strong></td>
              <td>图神经网络学习分子图结构与活性的关系</td>
              <td>能捕获复杂结构–活性关系</td>
              <td>需要大量训练数据</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre><code>{`# 虚拟筛选的典型工作流（伪代码）
from rdkit import Chem
from rdkit.Chem import AllChem
import numpy as np

# 步骤 1：加载化合物库（数百万个 SMILES）
compound_library = load_smiles_from_file('chembl_1M.smi')  # 100 万个化合物

# 步骤 2：初筛——Lipinski 规则过滤
def passes_lipinski(mol):
    from rdkit.Chem import Descriptors
    return (
        Descriptors.MolWt(mol) <= 500 and
        Descriptors.MolLogP(mol) <= 5 and
        Descriptors.NumHDonors(mol) <= 5 and
        Descriptors.NumHAcceptors(mol) <= 10
    )

filtered = [smi for smi in compound_library
            if (m := Chem.MolFromSmiles(smi)) and passes_lipinski(m)]
# 100 万 → 约 30–50 万

# 步骤 3：QSAR 模型预测活性
# （假设已训练好 model）
fps = [AllChem.GetMorganFingerprintAsBitVect(
           Chem.MolFromSmiles(smi), 2, 2048)
       for smi in filtered]
X = np.array(fps)
predicted_activity = model.predict_proba(X)[:, 1]  # 活性概率

# 步骤 4：取 top 1000 进行实验验证
top_candidates = sorted(zip(filtered, predicted_activity),
                        key=lambda x: -x[1])[:1000]
print(f"从 {len(compound_library)} 筛选到 {len(top_candidates)} 个候选")`}</code></pre>

      {/* Section 3 */}
      <h2 id="s3">5.3.3 苗头化合物到先导化合物（H2L）/ Hit-to-Lead Optimization</h2>
      <p>
        苗头化合物通常活性较弱（IC₅₀ ~ µM 级），选择性差，ADMET 性质不明。
        H2L 阶段的目标是确认苗头化合物的<strong>构效关系（SAR, Structure-Activity Relationship）</strong>，
        并通过结构修饰提升其质量。
      </p>

      <h3>SAR 探索：系统性修饰</h3>
      <p>
        H2L 阶段通常需要合成数十到数百个类似物（Analogue），每次只改变一个位置，
        观察活性如何变化，建立 SAR 图谱。
      </p>

      <pre><code>{`# SAR 探索的思路：逐位修饰（概念示例）
# 苗头化合物：c1ccccc1NC(=O)c2ccccc2  (苯甲酰苯胺)
# 活性：IC₅₀ = 5.2 µM

# 修饰方案 A：苯环 para 位加甲基
# → c1ccc(C)cc1NC(=O)c2ccccc2
# 测试结果：IC₅₀ = 1.8 µM（活性提升 3x）

# 修饰方案 B：苯环 para 位加氯
# → c1ccc(Cl)cc1NC(=O)c2ccccc2
# 测试结果：IC₅₀ = 0.42 µM（活性提升 12x）

# 修饰方案 C：苯环 para 位加氟
# → c1ccc(F)cc1NC(=O)c2ccccc2
# 测试结果：IC₅₀ = 0.61 µM（活性提升 8x）

# 结论：para 位取代有利 → 继续探索 para 位不同取代基`}</code></pre>

      <h3>常见的苗头化合物问题与解决策略</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>问题</th><th>常见原因</th><th>化学策略</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>活性弱（IC₅₀ &gt; 1 µM）</td>
              <td>与靶点结合界面小</td>
              <td>引入额外氢键 donor/acceptor、增加疏水接触面积</td>
            </tr>
            <tr>
              <td>选择性差（脱靶结合）</td>
              <td>结合的是保守结构域</td>
              <td>利用靶点特有的口袋特征设计选择性基团</td>
            </tr>
            <tr>
              <td>溶解性差</td>
              <td>分子过于疏水</td>
              <td>加入极性基团、盐形成（salt formation）</td>
            </tr>
            <tr>
              <td>代谢不稳定</td>
              <td>代谢位点被 CYP450 酶氧化</td>
              <td>氟代替代谢位点（代谢阻断策略）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4 */}
      <h2 id="s4">5.3.4 先导化合物优化（LO）/ Lead Optimization</h2>
      <p>
        LO 是药物发现中耗时最长、迭代次数最多的阶段。
        目标是将先导化合物改造成满足所有进入临床前标准的候选药物。
        这里的挑战是需要<em>同时优化</em>多个相互制约的参数。
      </p>

      <h3>LO 阶段需要同时优化的参数</h3>
      <ul>
        <li><strong>活性</strong>：靶点结合亲和力（IC₅₀/Kd）达到纳摩尔级</li>
        <li><strong>选择性</strong>：对靶点的结合力远强于其他蛋白质（通常 &gt;100 倍）</li>
        <li><strong>ADMET</strong>：吸收（口服生物利用度）、代谢稳定性、血脑屏障通透性、毒性…</li>
        <li><strong>合成可行性</strong>：能在药厂规模合成，成本可接受</li>
        <li><strong>物理化学性质</strong>：溶解度、稳定性、晶型</li>
      </ul>

      <div className="warning-box">
        <strong>⚠️ 典型的 LO 两难困境：</strong>
        提高活性往往需要增加疏水基团 → 但这会降低溶解度 → 溶解度低 → 吸收差 → 口服无效。
        这种多参数间的权衡（tradeoff）是 LO 阶段最核心的挑战。
      </div>

      {/* Section 5 */}
      <h2 id="s5">5.3.5 AI 加速优化：主动学习与生成式设计 / AI in Optimization</h2>
      <p>
        传统 LO 阶段：化学家根据经验设计下一批化合物 → 合成测试 → 更新 SAR → 再设计，
        每轮迭代需要数周。AI 通过以下方式加速这个循环：
      </p>

      <h3>方法一：贝叶斯优化（Bayesian Optimization）</h3>
      <p>
        把化学优化问题转化为数学优化问题——
        用高斯过程预测未测试分子的活性及不确定性，
        优先合成"预测活性高且不确定性大"的分子（探索–开发权衡）。
      </p>

      <pre><code>{`# 贝叶斯优化加速 SAR（概念代码）
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import Tanimoto  # 化学专用核函数

# 历史数据：已测试的分子（指纹 + IC₅₀）
X_tested = fingerprint_matrix   # shape: (n_tested, 2048)
y_tested = pIC50_values         # shape: (n_tested,)

# 训练高斯过程
gp = GaussianProcessRegressor(kernel=Tanimoto())
gp.fit(X_tested, y_tested)

# 对未测试候选分子预测均值和不确定性
X_candidates = candidate_fingerprints
mu, sigma = gp.predict(X_candidates, return_std=True)

# 采集函数：上界置信度（UCB）= mu + κ * sigma
kappa = 2.0  # 控制探索程度
acquisition = mu + kappa * sigma

# 下一批合成优先级：acquisition 最高的分子
next_batch = candidates[acquisition.argsort()[::-1][:10]]`}</code></pre>

      <h3>方法二：生成式分子设计（De Novo Design）</h3>
      <p>
        不是从已有分子库中选，而是用生成模型直接"创造"满足条件的全新分子。
        我们将在 Ch8 深入学习 VAE、GAN 和扩散模型用于分子生成。
      </p>

      <h3>方法三：迁移学习加速 SAR</h3>
      <p>
        在大型公开数据集（如 ChEMBL，含 200 万个化合物–活性数据对）上预训练模型，
        然后用少量该靶点的数据（如 200–500 个）微调，
        在小数据条件下也能获得较好的预测性能。
      </p>

      {/* Section 6 */}
      <h2 id="s6">5.3.6 多参数优化（MPO）/ Multi-Parameter Optimization</h2>
      <p>
        <strong>多参数优化（Multi-Parameter Optimization, MPO）</strong>是 LO 阶段的核心方法论——
        把多个优化目标整合成一个综合评分，帮助化学家在权衡中做出决策。
      </p>

      <h3>MPO 评分示例（辉瑞 CNS MPO）</h3>
      <p>
        辉瑞公司为中枢神经系统（CNS）药物开发了 CNS MPO 评分，
        综合 6 个参数，每个参数打 0–1 分，总分 0–6：
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>参数</th><th>目标范围</th><th>化学意义</th></tr>
          </thead>
          <tbody>
            <tr><td>cLogP</td><td>≤5</td><td>亲脂性控制（溶解度/毒性）</td></tr>
            <tr><td>cLogD (pH 7.4)</td><td>≤4</td><td>生理 pH 下的分配系数</td></tr>
            <tr><td>分子量 (MW)</td><td>≤360 Da</td><td>血脑屏障穿透</td></tr>
            <tr><td>拓扑极性表面积 (TPSA)</td><td>≤90 Å²</td><td>血脑屏障穿透的关键指标</td></tr>
            <tr><td>氢键供体 (HBD)</td><td>≤3</td><td>跨膜能力</td></tr>
            <tr><td>pKa（最强碱基）</td><td>≤8</td><td>避免 hERG 结合（心脏毒性）</td></tr>
          </tbody>
        </table>
      </div>

      <pre><code>{`from rdkit.Chem import Descriptors, Crippen
from rdkit import Chem

def cns_mpo_score(smiles):
    """计算 CNS MPO 评分（辉瑞方案，0–6分）"""
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None

    mw = Descriptors.MolWt(mol)
    clogp = Crippen.MolLogP(mol)
    tpsa = Descriptors.TPSA(mol)
    hbd = Descriptors.NumHDonors(mol)

    # 各参数打分（满足则 1 分，不满足则 0 分；边界区间线性插值）
    score = 0
    score += 1 if mw <= 360 else (max(0, (500 - mw) / 140) if mw <= 500 else 0)
    score += 1 if clogp <= 5 else (max(0, (6 - clogp)) if clogp <= 6 else 0)
    score += 1 if tpsa <= 90 else (max(0, (120 - tpsa) / 30) if tpsa <= 120 else 0)
    score += 1 if hbd <= 3 else (max(0, (4 - hbd)) if hbd <= 4 else 0)
    # cLogD 和 pKa 需要额外工具（如 ACD/Labs），这里省略

    return round(score, 2)

# 示例
aspirin = 'CC(=O)Oc1ccccc1C(=O)O'
print(f"阿司匹林 CNS MPO: {cns_mpo_score(aspirin)}/4 (部分参数)")
# CNS MPO ≥ 4 通常认为 CNS 穿透性良好`}</code></pre>

      <div className="info-box">
        <strong>MPO 在 AI 药物设计中的应用：</strong>
        MPO 评分可以直接作为生成式分子设计的<em>奖励函数（Reward Function）</em>，
        指导强化学习（Reinforcement Learning）生成满足多参数要求的分子。
        例如：奖励 = 0.5 × 活性预测 + 0.3 × CNS MPO + 0.2 × 合成可及性评分（SA Score）。
        这是 Ch8 学习生成模型时的核心思路。
      </div>

    </div>
  )
}
