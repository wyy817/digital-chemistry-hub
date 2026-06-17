export const ch4FingerprintsMeta = {
  id: 'ch4-2-fingerprints',
  title: 'Molecular Fingerprints & Similarity',
  titleZh: '分子指纹与相似性搜索',
  path: 'Cheminformatics',
  chapter: 'Ch4. RDKit & Cheminformatics',
  estimatedMinutes: 45,
  difficulty: '🔴 重点',
  prev: { title: '4.1 RDKit Basics', path: '/learn/ch4-rdkit-basics' },
  next: { title: '4.3 QSAR Modeling', path: '/learn/ch4-qsar' },
}

export function Ch4FingerprintsContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2>4.2.1 什么是分子指纹？/ What are Molecular Fingerprints?</h2>
      <p>
        <strong>分子指纹（Molecular Fingerprint）</strong>是将分子结构编码为固定长度<strong>二进制位向量（bit vector）</strong>
        或整数计数向量的一种表示方法。每一位（bit）代表某种结构特征是否存在——存在为 1，不存在为 0。
      </p>
      <p>
        机器学习算法无法直接处理 SMILES 字符串或分子图，但可以处理数值向量。
        分子指纹正是这座从化学结构到数学空间的桥梁，是 QSAR 建模、虚拟筛选、相似性搜索的核心工具。
      </p>

      <div className="info-box">
        <strong>直觉类比：</strong>把分子指纹想象成一张"分子身份证"——
        它不记录原子的确切坐标，而是勾选分子是否包含苯环、羟基、酰胺键等特征，
        用一串 0/1 代替复杂的三维结构。
      </div>

      <h3>为什么需要指纹？</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>问题</th><th>指纹的解决方案</th></tr>
          </thead>
          <tbody>
            <tr><td>分子大小不一，无法直接比较</td><td>统一编码为等长向量（如 2048 bits）</td></tr>
            <tr><td>ML 需要数值输入</td><td>将结构特征转为 0/1 数组</td></tr>
            <tr><td>相似性无法直接量化</td><td>向量内积/Tanimoto 系数给出数值相似度</td></tr>
            <tr><td>大规模数据库筛选</td><td>位运算极快，可秒级扫描百万分子</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 2 */}
      <h2>4.2.2 常见指纹类型 / Types of Molecular Fingerprints</h2>
      <p>不同指纹类型的设计思路不同，适用场景也有差异。以下是最常用的三类：</p>

      <h3>① MACCS Keys（结构键）</h3>
      <p>
        由 MDL（现 Dassault Systèmes）定义的 <strong>166 个固定结构键</strong>，
        每个键对应一条预设的 SMARTS 规则（如"是否含有酮基"）。
        向量长度恒为 166 bits，可解释性强，但覆盖范围有限。
      </p>
      <pre><code>{`from rdkit import Chem
from rdkit.Chem import MACCSkeys

mol = Chem.MolFromSmiles('CC(=O)Nc1ccc(O)cc1')  # 对乙酰氨基酚
fp = MACCSkeys.GenMACCSKeys(mol)
print(fp.GetNumBits())   # 167（位 0 保留不用，实际 166 位有效）
print(fp.ToBitString())  # 一串 0/1`}</code></pre>

      <h3>② Morgan / ECFP（扩展连接指纹）</h3>
      <p>
        <strong>Morgan 算法</strong>从每个原子出发，以半径 r 扩展邻域，
        收集所有子结构的哈希值并折叠到指定长度（通常 2048 bits）。
        这类指纹也称 <strong>ECFP（Extended Connectivity FingerPrints）</strong>。
      </p>
      <div className="info-box">
        <strong>命名规则：</strong>ECFP<em>n</em> 中 n 是<strong>直径</strong>（= 2 × 半径）。
        ECFP4 = 半径 2；ECFP6 = 半径 3。半径越大捕获的结构上下文越多，
        但也引入更多"噪音"。药物发现中最常用 <strong>ECFP4（radius=2）</strong>。
      </div>
      <pre><code>{`from rdkit.Chem import AllChem

mol = Chem.MolFromSmiles('CC(=O)Nc1ccc(O)cc1')

# ECFP4 = Morgan radius=2, 2048 bits
fp_ecfp4 = AllChem.GetMorganFingerprintAsBitVect(mol, radius=2, nBits=2048)

# ECFP6 = Morgan radius=3
fp_ecfp6 = AllChem.GetMorganFingerprintAsBitVect(mol, radius=3, nBits=2048)

# 也可获取计数向量（非折叠）
fp_count = AllChem.GetMorganFingerprint(mol, radius=2)  # UIntSparseIntVect`}</code></pre>

      <h3>③ RDKit 拓扑指纹（Path-based）</h3>
      <p>
        RDKit 内置的<strong>路径指纹</strong>枚举分子中长度为 1–7 的所有原子路径，
        哈希后折叠到 2048 bits。与 ECFP 的圆形邻域不同，它关注的是线性路径。
      </p>
      <pre><code>{`from rdkit.Chem import RDKFingerprint

fp_rdk = RDKFingerprint(mol)
print(fp_rdk.GetNumBits())  # 2048`}</code></pre>

      <h3>四种指纹对比</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>指纹类型</th><th>长度</th><th>原理</th><th>优点</th><th>常见用途</th></tr>
          </thead>
          <tbody>
            <tr><td>MACCS Keys</td><td>166 bits</td><td>预定义 SMARTS 规则</td><td>可解释性强</td><td>分类、子结构检索</td></tr>
            <tr><td>Morgan / ECFP</td><td>可变（通常 2048）</td><td>圆形邻域哈希折叠</td><td>信息丰富，ML 首选</td><td>QSAR、虚拟筛选</td></tr>
            <tr><td>RDKit Topological</td><td>2048 bits</td><td>原子路径哈希</td><td>开源免费，可再现</td><td>相似性搜索</td></tr>
            <tr><td>Atom Pairs</td><td>可变</td><td>成对原子 + 距离</td><td>捕获远程关系</td><td>3D 构效关系</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 3 */}
      <h2>4.2.3 RDKit 批量生成指纹 / Batch Fingerprint Generation</h2>
      <p>
        实际项目中需要对一个分子数据集批量生成指纹，并转换为 NumPy 数组供机器学习使用。
      </p>
      <pre><code>{`import numpy as np
from rdkit import Chem
from rdkit.Chem import AllChem

smiles_list = [
    'CC(=O)Nc1ccc(O)cc1',    # 对乙酰氨基酚
    'CC(=O)Oc1ccccc1C(=O)O', # 阿司匹林
    'c1ccc2ccccc2c1',         # 萘
    'CC12CCC3C(C1CCC2O)CCC4=CC(=O)CCC34C',  # 睾酮
]

def smiles_to_morgan(smiles_list, radius=2, n_bits=2048):
    fps = []
    valid_idx = []
    for i, smi in enumerate(smiles_list):
        mol = Chem.MolFromSmiles(smi)
        if mol is not None:
            fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=n_bits)
            fps.append(np.array(fp))
            valid_idx.append(i)
    return np.array(fps), valid_idx

X, idx = smiles_to_morgan(smiles_list)
print(X.shape)  # (4, 2048)  ← 每行一个分子，每列一个 bit`}</code></pre>

      <div className="info-box">
        <strong>注意：</strong>RDKit 的 <code>GetMorganFingerprintAsBitVect()</code> 返回
        <code>ExplicitBitVect</code> 对象，需用 <code>np.array(fp)</code> 或
        <code>list(fp)</code> 转为数组后才能传入 sklearn。
      </div>

      {/* Section 4 */}
      <h2>4.2.4 Tanimoto 相似性系数 / Tanimoto Similarity</h2>
      <p>
        衡量两个分子指纹相似程度最常用的指标是 <strong>Tanimoto 系数（也叫 Jaccard 系数）</strong>，
        定义为两个集合的交集大小除以并集大小：
      </p>

      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', margin: '1rem 0', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.05rem' }}>
        T(A, B) = |A ∩ B| / |A ∪ B| = c / (a + b - c)
      </div>

      <p>其中：</p>
      <ul>
        <li><strong>a</strong>：指纹 A 中为 1 的 bit 数</li>
        <li><strong>b</strong>：指纹 B 中为 1 的 bit 数</li>
        <li><strong>c</strong>：A 和 B 中同时为 1 的 bit 数（共同子结构）</li>
      </ul>

      <h3>Tanimoto 值的经验解读</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Tanimoto 值</th><th>解读（ECFP4 语境下）</th></tr>
          </thead>
          <tbody>
            <tr><td>1.0</td><td>指纹完全相同（结构极可能相同）</td></tr>
            <tr><td>≥ 0.85</td><td>非常相似，常视为同一骨架的类似物</td></tr>
            <tr><td>0.5 – 0.85</td><td>中等相似，可能有共同药效团</td></tr>
            <tr><td>{'< 0.3'}</td><td>结构差异大，可视为不相似</td></tr>
            <tr><td>0.0</td><td>无任何共同子结构</td></tr>
          </tbody>
        </table>
      </div>

      <pre><code>{`from rdkit import DataStructs
from rdkit.Chem import AllChem
from rdkit import Chem

def get_fp(smiles, radius=2, n_bits=2048):
    mol = Chem.MolFromSmiles(smiles)
    return AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=n_bits)

aspirin   = get_fp('CC(=O)Oc1ccccc1C(=O)O')
ibuprofen = get_fp('CC(C)Cc1ccc(cc1)C(C)C(=O)O')
paracetamol = get_fp('CC(=O)Nc1ccc(O)cc1')

# Tanimoto 相似性
t1 = DataStructs.TanimotoSimilarity(aspirin, ibuprofen)
t2 = DataStructs.TanimotoSimilarity(aspirin, paracetamol)
t3 = DataStructs.TanimotoSimilarity(aspirin, aspirin)  # 自身相似 = 1.0

print(f"Aspirin vs Ibuprofen:   {t1:.3f}")
print(f"Aspirin vs Paracetamol: {t2:.3f}")
print(f"Aspirin vs Aspirin:     {t3:.3f}")

# 批量计算（一个分子 vs. 列表）
fps_all = [aspirin, ibuprofen, paracetamol]
sims = DataStructs.BulkTanimotoSimilarity(aspirin, fps_all)
print(sims)  # [1.0, 0.xxx, 0.xxx]`}</code></pre>

      {/* Section 5 */}
      <h2>4.2.5 虚拟筛选与相似性搜索 / Virtual Screening</h2>
      <p>
        给定一个<strong>查询分子（query molecule）</strong>，在化合物库中找出最相似的分子，
        这个过程称为<strong>相似性搜索（similarity search）</strong>或<strong>配体相似虚拟筛选</strong>。
        它基于"相似分子具有相似活性"的<strong>相似性原理（Similarity Principle）</strong>。
      </p>

      <pre><code>{`import pandas as pd
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem

# 示例：从小型化合物库中找最相似分子
library_smiles = {
    'Aspirin':       'CC(=O)Oc1ccccc1C(=O)O',
    'Ibuprofen':     'CC(C)Cc1ccc(cc1)C(C)C(=O)O',
    'Paracetamol':   'CC(=O)Nc1ccc(O)cc1',
    'Caffeine':      'Cn1cnc2c1c(=O)n(c(=O)n2C)C',
    'Naproxen':      'CC(C(=O)O)c1ccc2cc(OC)ccc2c1',
    'Diclofenac':    'OC(=O)Cc1ccccc1Nc1c(Cl)cccc1Cl',
}

query_smi = 'CC(C)Cc1ccc(cc1)C(C)C(=O)O'  # 查询：布洛芬

def get_fp(smi):
    mol = Chem.MolFromSmiles(smi)
    if mol: return AllChem.GetMorganFingerprintAsBitVect(mol, 2, 2048)

query_fp = get_fp(query_smi)

results = []
for name, smi in library_smiles.items():
    fp = get_fp(smi)
    if fp:
        sim = DataStructs.TanimotoSimilarity(query_fp, fp)
        results.append({'Name': name, 'SMILES': smi, 'Tanimoto': round(sim, 4)})

df = pd.DataFrame(results).sort_values('Tanimoto', ascending=False)
print(df.to_string(index=False))`}</code></pre>

      <h3>Scaffold Hopping（骨架跃迁）</h3>
      <p>
        骨架跃迁是指找到<strong>生物活性相似但化学骨架不同</strong>的分子。
        基于 ECFP 的相似性搜索有时会遗漏骨架跃迁化合物（因为骨架差异大），
        此时可以切换到<strong>药效团指纹</strong>或<strong>形状相似性</strong>方法。
      </p>

      <div className="info-box">
        <strong>实际应用案例：</strong>在 Drug Discovery 课程中，
        你会使用相似性搜索对已知活性分子进行"苗头化合物扩展（hit expansion）"——
        从一个 HTS 苗头出发，在虚拟库中找出 Tanimoto ≥ 0.7 的类似物，
        大幅缩小需要实际合成测试的化合物数量。
      </div>

      {/* Section 6 */}
      <h2>4.2.6 指纹的局限性与选择建议 / Limitations & Guidance</h2>

      <h3>主要局限性</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>局限</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td>信息损失</td><td>哈希折叠会导致不同子结构映射到同一 bit（位碰撞），2048 bits 时碰撞率较低但不为零</td></tr>
            <tr><td>忽略 3D 信息</td><td>标准 ECFP 基于拓扑结构，不考虑构象、立体化学对活性的影响</td></tr>
            <tr><td>相似性悖论</td><td>Tanimoto 高不代表活性相同（Activity Cliff），低也不代表活性不同</td></tr>
            <tr><td>任务依赖性</td><td>没有"最优"指纹，QSAR 建模推荐 ECFP4，子结构检索推荐 MACCS Keys</td></tr>
          </tbody>
        </table>
      </div>

      <h3>选择建议</h3>
      <ul>
        <li><strong>QSAR / ML 分类回归</strong> → ECFP4（Morgan radius=2, 2048 bits）首选</li>
        <li><strong>相似性搜索 / 化合物聚类</strong> → ECFP4 或 RDKit Topological</li>
        <li><strong>可解释性要求高</strong> → MACCS Keys（166 bits，每位有化学含义）</li>
        <li><strong>计数而非二值化</strong> → <code>GetMorganFingerprint()</code>（保留子结构出现次数）</li>
      </ul>

      <h3>完整工作流示例</h3>
      <pre><code>{`# 完整流程：SMILES → 指纹 → 相似性矩阵 → 热图
import numpy as np
import pandas as pd
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem

smiles = {
    'Aspirin':     'CC(=O)Oc1ccccc1C(=O)O',
    'Ibuprofen':   'CC(C)Cc1ccc(cc1)C(C)C(=O)O',
    'Paracetamol': 'CC(=O)Nc1ccc(O)cc1',
    'Naproxen':    'CC(C(=O)O)c1ccc2cc(OC)ccc2c1',
    'Diclofenac':  'OC(=O)Cc1ccccc1Nc1c(Cl)cccc1Cl',
}

fps = {name: AllChem.GetMorganFingerprintAsBitVect(
           Chem.MolFromSmiles(smi), 2, 2048)
       for name, smi in smiles.items()}

names = list(fps.keys())
n = len(names)
sim_matrix = np.zeros((n, n))

for i in range(n):
    for j in range(n):
        sim_matrix[i, j] = DataStructs.TanimotoSimilarity(fps[names[i]], fps[names[j]])

df_sim = pd.DataFrame(sim_matrix, index=names, columns=names)
print(df_sim.round(3))

# 若在 Jupyter 中可用 seaborn 画热图：
# import seaborn as sns, matplotlib.pyplot as plt
# sns.heatmap(df_sim, annot=True, fmt=".2f", cmap="YlOrRd")
# plt.title("Tanimoto Similarity Matrix (ECFP4)")
# plt.show()`}</code></pre>

      <div className="info-box">
        <strong>IC 课程连接：</strong>分子指纹是 Data Analytics in Chemistry 和
        AI in Chemistry: Drug Discovery 两门课程的核心技术——前者用于描述符计算与聚类分析，
        后者用于 QSAR 模型的特征输入。掌握本章后，你已具备动手完成这两门课程主要实操项目的基础。
      </div>

    </div>
  )
}
