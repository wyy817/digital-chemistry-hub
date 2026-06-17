export const ch4QsarMeta = {
  id: 'ch4-3-qsar',
  title: 'QSAR Modeling with RDKit + scikit-learn',
  titleZh: 'QSAR 建模实战',
  path: 'Cheminformatics',
  chapter: 'Ch4. RDKit & Cheminformatics',
  estimatedMinutes: 55,
  difficulty: '🔴 重点',
  prev: { title: '4.2 Molecular Fingerprints', path: '/learn/ch4-fingerprints' },
  next: { title: '5.1 Pipeline Overview', path: '/learn/ch5-drug-pipeline-overview' },
}

export function Ch4QsarContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2 id="s1">4.3.1 什么是 QSAR？/ What is QSAR?</h2>
      <p>
        <strong>QSAR（Quantitative Structure-Activity Relationship，定量构效关系）</strong>是一种
        用数学/统计模型把分子结构特征与生物活性或物理化学性质联系起来的方法。
        核心思想是：<em>结构相似的分子往往具有相似的活性</em>。
      </p>
      <p>
        在药物发现中，QSAR 模型可以预测一个尚未合成的分子是否具有抑制某个靶点的活性、
        溶解度高不高、毒性大不大——从而在实验室合成之前就筛掉差的候选分子，大幅节省成本。
      </p>

      <div className="info-box">
        <strong>直觉类比：</strong>把 QSAR 想象成一个"分子评分系统"——
        输入分子的结构特征（指纹、描述符），输出一个预测分数（活性、pIC50、溶解度……）。
        它不知道为什么有活性，但它能从历史数据中学会"哪类结构的分子通常更好"。
      </div>

      <h3>QSAR 的三个核心要素</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>要素</th><th>含义</th><th>本章工具</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>分子表示</strong></td><td>把化学结构转为数值</td><td>RDKit 分子指纹 / 描述符</td></tr>
            <tr><td><strong>活性标签</strong></td><td>实验测定的目标值</td><td>pIC50、溶解度等</td></tr>
            <tr><td><strong>机器学习模型</strong></td><td>学习结构→活性的映射</td><td>Random Forest（scikit-learn）</td></tr>
          </tbody>
        </table>
      </div>

      <h3>QSAR vs QSPR</h3>
      <p>
        <strong>QSPR（Quantitative Structure-Property Relationship）</strong>与 QSAR 本质相同，
        区别只在于预测目标：QSAR 预测生物<em>活性</em>（Activity），QSPR 预测物理化学<em>性质</em>（Property，如 logP、沸点）。
        两者用的方法和工具完全一样。
      </p>

      {/* Section 2 */}
      <h2 id="s2">4.3.2 数据集准备：从 SMILES 到特征矩阵 / Dataset Preparation</h2>
      <p>
        QSAR 建模的第一步是把原始数据（SMILES + 活性值）转换为机器学习可以处理的特征矩阵 <code>X</code> 和标签向量 <code>y</code>。
      </p>

      <h3>典型数据集格式</h3>
      <p>
        最常见的格式是 CSV 文件，每行一个化合物，包含 SMILES 字符串和实验测定值。
        以下示例使用 <strong>pIC50</strong>（IC50 的负对数，值越大表示活性越强）作为预测目标：
      </p>

      <pre><code>{`import pandas as pd
from rdkit import Chem
from rdkit.Chem import AllChem, Descriptors
import numpy as np

# 示例数据（实际使用时替换为真实 CSV）
data = {
    'smiles': [
        'CC(=O)Oc1ccccc1C(=O)O',   # 阿司匹林
        'CC(C)Cc1ccc(cc1)C(C)C(=O)O',  # 布洛芬
        'CN1C=NC2=C1C(=O)N(C(=O)N2C)C', # 咖啡因
        'c1ccc2c(c1)cc1ccc3cccc4ccc2c1c34', # 芘
        'OC(=O)c1ccccc1',           # 苯甲酸
    ],
    'pIC50': [6.2, 7.1, 5.8, 4.3, 5.5]
}
df = pd.DataFrame(data)

# 转换为 RDKit Mol 对象，过滤无效 SMILES
df['mol'] = df['smiles'].apply(Chem.MolFromSmiles)
df = df.dropna(subset=['mol'])
print(f"有效分子数: {len(df)}")`}</code></pre>

      <h3>特征提取：Morgan 指纹</h3>
      <p>
        最常用的 QSAR 特征是 <strong>Morgan 指纹（ECFP）</strong>，将每个分子编码为固定长度的二进制向量：
      </p>

      <pre><code>{`def mol_to_fp(mol, radius=2, nBits=2048):
    """将 RDKit Mol 对象转为 Morgan 指纹 numpy 数组"""
    fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius=radius, nBits=nBits)
    return np.array(fp)

# 构建特征矩阵 X 和标签向量 y
X = np.array([mol_to_fp(mol) for mol in df['mol']])
y = df['pIC50'].values

print(f"特征矩阵形状: {X.shape}")  # (n_molecules, 2048)
print(f"标签向量形状: {y.shape}")  # (n_molecules,)`}</code></pre>

      <div className="warning-box">
        <strong>⚠️ 数据质量是 QSAR 的生命线：</strong>
        垃圾进，垃圾出（Garbage in, garbage out）。
        在建模前务必检查：SMILES 是否可解析、活性值是否有明显异常、数据集是否严重不均衡。
      </div>

      <h3>也可以用 RDKit 描述符</h3>
      <p>
        除指纹外，也可以用 RDKit 内置的 200+ 物理化学描述符作为特征：
      </p>

      <pre><code>{`def mol_to_descriptors(mol):
    """提取常用描述符（MW、logP、TPSA、HBD、HBA）"""
    return [
        Descriptors.MolWt(mol),
        Descriptors.MolLogP(mol),
        Descriptors.TPSA(mol),
        Descriptors.NumHDonors(mol),
        Descriptors.NumHAcceptors(mol),
    ]

X_desc = np.array([mol_to_descriptors(mol) for mol in df['mol']])
print(f"描述符矩阵形状: {X_desc.shape}")  # (n_molecules, 5)

# 实际项目中常把指纹 + 描述符拼接起来一起用
X_combined = np.hstack([X, X_desc])
print(f"合并后特征维度: {X_combined.shape}")`}</code></pre>

      {/* Section 3 */}
      <h2 id="s3">4.3.3 构建第一个 QSAR 模型：Random Forest / Building the First Model</h2>
      <p>
        <strong>Random Forest（随机森林）</strong>是 QSAR 建模中最常用的算法之一，原因如下：
      </p>
      <ul>
        <li>对高维稀疏特征（如 2048 位指纹）表现很好</li>
        <li>不需要特征缩放</li>
        <li>能给出特征重要性，有一定可解释性</li>
        <li>对过拟合有一定抵抗力（多棵树投票）</li>
      </ul>

      <h3>划分训练集与测试集</h3>
      <pre><code>{`from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,        # 20% 作为测试集
    random_state=42       # 固定随机种子，保证可复现
)

print(f"训练集: {X_train.shape[0]} 个分子")
print(f"测试集: {X_test.shape[0]} 个分子")`}</code></pre>

      <div className="info-box">
        <strong>为什么 random_state=42 很常见？</strong>
        纯粹是习惯——42 没有特殊含义（来自《银河系漫游指南》），
        重要的是设置任意固定值以保证实验可复现。
      </div>

      <h3>训练模型</h3>
      <pre><code>{`from sklearn.ensemble import RandomForestRegressor

# 创建随机森林回归器
rf_model = RandomForestRegressor(
    n_estimators=100,    # 100 棵决策树
    max_depth=None,      # 树的最大深度（None = 不限制）
    random_state=42,
    n_jobs=-1            # 使用所有 CPU 核心并行训练
)

# 训练
rf_model.fit(X_train, y_train)

# 在测试集上预测
y_pred = rf_model.predict(X_test)
print("预测完成！前5个预测值:", y_pred[:5])`}</code></pre>

      <h3>分类 vs 回归</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>任务类型</th><th>预测目标示例</th><th>对应 sklearn 类</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>回归</strong>（本节）</td><td>pIC50 连续值</td><td><code>RandomForestRegressor</code></td></tr>
            <tr><td><strong>分类</strong></td><td>活性/非活性（0/1）</td><td><code>RandomForestClassifier</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 4 */}
      <h2 id="s4">4.3.4 模型评估与交叉验证 / Model Evaluation & Cross-Validation</h2>
      <p>
        单次训练集/测试集划分结果受随机种子影响较大。
        <strong>交叉验证（Cross-Validation, CV）</strong>通过多次划分取平均值，得到更可靠的性能估计。
      </p>

      <h3>常用回归评价指标</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>指标</th><th>公式含义</th><th>理想值</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>R²</strong>（决定系数）</td><td>模型解释的方差比例</td><td>越接近 1 越好</td></tr>
            <tr><td><strong>RMSE</strong></td><td>预测误差的均方根</td><td>越小越好</td></tr>
            <tr><td><strong>MAE</strong></td><td>预测误差的平均绝对值</td><td>越小越好</td></tr>
          </tbody>
        </table>
      </div>

      <pre><code>{`from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from sklearn.model_selection import cross_val_score
import numpy as np

# 单次测试集评估
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)

print(f"测试集 R²:   {r2:.3f}")
print(f"测试集 RMSE: {rmse:.3f}")
print(f"测试集 MAE:  {mae:.3f}")

# 5 折交叉验证（更可靠）
cv_scores = cross_val_score(
    RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
    X, y,
    cv=5,               # 5 折
    scoring='r2',
    n_jobs=-1
)

print(f"\\n5-fold CV R²: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
print(f"各折 R²: {cv_scores.round(3)}")`}</code></pre>

      <h3>过拟合的识别</h3>
      <p>
        如果训练集 R² 接近 1.0，但测试集 R² 远低于训练集，说明模型过拟合（memorize 而非 generalize）。
      </p>

      <pre><code>{`# 对比训练集和测试集表现
y_train_pred = rf_model.predict(X_train)
train_r2 = r2_score(y_train, y_train_pred)
test_r2 = r2_score(y_test, y_pred)

print(f"训练集 R²: {train_r2:.3f}")
print(f"测试集 R²: {test_r2:.3f}")

if train_r2 - test_r2 > 0.2:
    print("⚠️  警告：训练集与测试集差距较大，可能存在过拟合！")
    print("    建议：减少 max_depth、增加 min_samples_leaf 或增大数据集")`}</code></pre>

      <div className="info-box">
        <strong>QSAR 建模的现实期望：</strong>在药物发现中，外部测试集 R² &gt; 0.6 通常被认为是好模型。
        达到 0.8+ 需要高质量数据集（数百到数千个化合物，活性范围宽）。
        小数据集（&lt;100 个分子）的 QSAR 模型很难真正可靠。
      </div>

      {/* Section 5 */}
      <h2 id="s5">4.3.5 模型解释性：特征重要性分析 / Feature Importance</h2>
      <p>
        随机森林提供内置的<strong>特征重要性（Feature Importance）</strong>，
        可以告诉我们哪些分子结构特征对预测结果贡献最大。
      </p>

      <h3>提取特征重要性</h3>
      <pre><code>{`import matplotlib.pyplot as plt

# 获取特征重要性
importances = rf_model.feature_importances_  # shape: (2048,)

# 找出最重要的前 20 个位（bit）
top_n = 20
top_indices = np.argsort(importances)[::-1][:top_n]
top_importances = importances[top_indices]

print(f"最重要的 {top_n} 个指纹位（索引）:")
for i, (idx, imp) in enumerate(zip(top_indices, top_importances)):
    print(f"  Top {i+1}: Bit {idx} (重要性: {imp:.4f})")

# 可视化
plt.figure(figsize=(10, 4))
plt.bar(range(top_n), top_importances, color='steelblue')
plt.xlabel('特征排名（前20位）')
plt.ylabel('重要性得分')
plt.title('Random Forest 特征重要性（Top 20 Morgan Fingerprint Bits）')
plt.tight_layout()
plt.show()`}</code></pre>

      <h3>从重要指纹位追溯结构片段</h3>
      <p>
        Morgan 指纹的每个 bit 对应一个特定的原子环境（子结构）。
        可以通过 RDKit 的 <code>GetMorganBitInfoDict</code> 来查看哪个 bit 对应什么结构：
      </p>

      <pre><code>{`from rdkit.Chem import Draw
from rdkit.Chem import AllChem

# 以第一个分子为例，查看 bit 对应的原子
mol_example = df['mol'].iloc[0]
bi = {}  # bit_info 字典
fp = AllChem.GetMorganFingerprintAsBitVect(
    mol_example, radius=2, nBits=2048, bitInfo=bi
)

# 查看最重要的 bit 对应哪个原子
important_bit = top_indices[0]
if important_bit in bi:
    atom_idx, radius_used = bi[important_bit][0]
    print(f"Bit {important_bit} 对应: 以原子 {atom_idx} 为中心，半径 {radius_used} 的子结构")
else:
    print(f"Bit {important_bit} 在该分子中未被激活")`}</code></pre>

      <div className="warning-box">
        <strong>⚠️ 特征重要性 ≠ 因果关系：</strong>
        随机森林的特征重要性只说明"这个结构特征与活性相关"，
        不能说明"这个特征导致了高活性"。化学直觉和实验验证仍然不可替代。
      </div>

      <h3>SHAP 值：更可靠的可解释性工具</h3>
      <p>
        在实际科研中，更推荐使用 <strong>SHAP（SHapley Additive exPlanations）</strong>来解释模型，
        它基于博弈论，给每个特征分配公平的贡献值：
      </p>

      <pre><code>{`# 安装: pip install shap
import shap

# 构建 SHAP 解释器（对随机森林有专用的 TreeExplainer，速度快）
explainer = shap.TreeExplainer(rf_model)
shap_values = explainer.shap_values(X_test)

# 可视化每个特征的 SHAP 值分布
shap.summary_plot(shap_values, X_test, max_display=20, plot_type='bar')`}</code></pre>

      {/* Section 6 */}
      <h2 id="s6">4.3.6 QSAR 的局限性与最佳实践 / Limitations & Best Practices</h2>

      <h3>主要局限性</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>局限性</th><th>具体问题</th><th>应对策略</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>适用域（Applicability Domain）</strong></td>
              <td>模型只在训练数据覆盖的化学空间内可靠，对结构差异大的化合物预测不可信</td>
              <td>计算预测化合物与训练集的 Tanimoto 相似性，低于阈值的预测需谨慎</td>
            </tr>
            <tr>
              <td><strong>数据质量</strong></td>
              <td>实验误差、不同实验室数据混合、单点活性值不稳定</td>
              <td>使用大型公开数据库（ChEMBL）、过滤可信度低的数据</td>
            </tr>
            <tr>
              <td><strong>小数据集</strong></td>
              <td>药物发现早期往往只有几十个化合物，过拟合风险极高</td>
              <td>考虑更简单的模型（线性回归）、更强的正则化、迁移学习</td>
            </tr>
            <tr>
              <td><strong>活性崖（Activity Cliff）</strong></td>
              <td>结构相似但活性差异巨大的化合物对，使模型难以学习</td>
              <td>活性崖分析、引入 3D 结构信息</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>最佳实践清单</h3>
      <pre><code>{`# ✅ QSAR 建模最佳实践 Checklist

# 1. 数据预处理
#    - 标准化 SMILES（Chem.MolToSmiles(Chem.MolFromSmiles(smi))）
#    - 去除重复化合物
#    - 检查并过滤无效 SMILES

# 2. 数据集划分
#    - 避免随机划分（train/test 结构可能很相似）
#    - 推荐 Scaffold Split（按骨架划分，评估真实泛化能力）
from rdkit.Chem.Scaffolds import MurckoScaffold

def get_scaffold(smi):
    mol = Chem.MolFromSmiles(smi)
    return MurckoScaffold.MurckoScaffoldSmiles(mol=mol)

# 3. 超参数调优
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_leaf': [1, 2, 5],
}
grid_search = GridSearchCV(
    RandomForestRegressor(random_state=42, n_jobs=-1),
    param_grid, cv=5, scoring='r2', n_jobs=-1
)
grid_search.fit(X_train, y_train)
best_model = grid_search.best_estimator_
print(f"最优参数: {grid_search.best_params_}")

# 4. 适用域检查
from sklearn.metrics.pairwise import cosine_similarity

def check_applicability_domain(X_train, X_query, threshold=0.3):
    """检查查询分子是否在训练集的适用域内"""
    sims = cosine_similarity(X_query, X_train).max(axis=1)
    in_domain = sims >= threshold
    return in_domain, sims`}</code></pre>

      <h3>完整的 QSAR 工作流程图</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>步骤</th><th>操作</th><th>工具</th></tr>
          </thead>
          <tbody>
            <tr><td>1. 数据收集</td><td>从 ChEMBL / PubChem 下载 SMILES + 活性数据</td><td>pandas, requests</td></tr>
            <tr><td>2. 数据清洗</td><td>标准化 SMILES，去重，过滤无效结构</td><td>RDKit</td></tr>
            <tr><td>3. 特征工程</td><td>计算 Morgan 指纹 / 描述符</td><td>RDKit</td></tr>
            <tr><td>4. 数据集划分</td><td>Scaffold Split 或随机划分</td><td>scikit-learn</td></tr>
            <tr><td>5. 模型训练</td><td>Random Forest / XGBoost / 神经网络</td><td>scikit-learn, XGBoost</td></tr>
            <tr><td>6. 模型评估</td><td>R², RMSE，5-fold CV</td><td>scikit-learn</td></tr>
            <tr><td>7. 模型解释</td><td>特征重要性 / SHAP</td><td>scikit-learn, SHAP</td></tr>
            <tr><td>8. 虚拟筛选</td><td>对新化合物库打分排序</td><td>RDKit + 训练好的模型</td></tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>QSAR 在 IC Digital Chemistry MSc 中的地位：</strong>
        QSAR 是 <em>AI in Chemistry: Drug Discovery</em> 和 <em>Data Analytics in Chemistry</em> 两门课的核心内容。
        掌握本章内容，你将具备从头构建一个完整药物活性预测模型的能力——这正是你入学后第一个月会接触到的技能。
      </div>

    </div>
  )
}
