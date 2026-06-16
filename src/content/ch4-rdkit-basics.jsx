export const ch4RdkitBasicsMeta = {
  id: 'ch4-1-rdkit-basics',
  title: 'RDKit Basics',
  titleZh: 'RDKit 实操入门',
  path: 'Cheminformatics',
  chapter: 'Ch4. RDKit & Cheminformatics',
  estimatedMinutes: 50,
  difficulty: '🔴 重点',
  prev: null,
  next: { title: '4.2 Molecular Fingerprints & Similarity', path: '/learn/ch4-fingerprints' },
}

export function Ch4RdkitBasicsContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2>4.1.1 什么是 RDKit？/ What is RDKit?</h2>
      <p>
        <strong>RDKit</strong> 是化学信息学领域最广泛使用的开源 Python 库，
        由 Greg Landrum 开发并持续维护。它提供了从分子读取、属性计算、可视化到机器学习特征提取的完整工具链，
        是 Data Analytics in Chemistry 课程的核心工具。
      </p>

      <h3>RDKit 能做什么？</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>功能类别</th><th>典型用途</th><th>对应 IC 课程</th></tr>
          </thead>
          <tbody>
            <tr><td>分子读取与转换</td><td>SMILES → 分子对象，分子 → SMILES/InChI</td><td>Data Analytics</td></tr>
            <tr><td>分子可视化</td><td>生成 2D 结构图，子结构高亮</td><td>Data Analytics</td></tr>
            <tr><td>属性计算</td><td>分子量、LogP、TPSA、HBD/HBA、QED</td><td>AI: Drug Discovery</td></tr>
            <tr><td>子结构搜索</td><td>SMARTS 模式匹配，官能团识别</td><td>Data Analytics</td></tr>
            <tr><td>分子指纹</td><td>Morgan / ECFP、MACCS 键，相似性计算</td><td>AI: Drug Discovery</td></tr>
            <tr><td>反应处理</td><td>反应 SMARTS，虚拟化学转换</td><td>Automation</td></tr>
          </tbody>
        </table>
      </div>

      <h3>安装</h3>
      <pre><code>{`# 推荐使用 conda（避免编译依赖问题）
conda install -c conda-forge rdkit

# 或使用 pip（RDKit 2022.09 起支持）
pip install rdkit`}</code></pre>

      <div className="info-box">
        <strong>环境建议：</strong>建议在 Jupyter Notebook 或 JupyterLab 中使用 RDKit，
        可以直接内联显示分子结构图。IC 的 Data Analytics in Chemistry 课程也会在 Jupyter 环境中进行。
      </div>

      {/* Section 2 */}
      <h2>4.1.2 分子读取与基本操作 / Loading Molecules</h2>
      <p>
        RDKit 的核心数据结构是 <code>Mol</code> 对象，代表一个分子。
        最常见的输入方式是从 <strong>SMILES 字符串</strong>读取。
      </p>

      <h3>从 SMILES 创建分子</h3>
      <pre><code>{`from rdkit import Chem

# 从 SMILES 读取分子
mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')  # 阿司匹林

# 如果 SMILES 无效，返回 None（需要检查！）
if mol is None:
    print("无效的 SMILES")
else:
    print("分子读取成功")

# 输出规范化 SMILES（Canonical SMILES）
canonical_smiles = Chem.MolToSmiles(mol)
print(canonical_smiles)
# 输出: CC(=O)Oc1ccccc1C(=O)O`}</code></pre>

      <h3>分子清洗与验证（Sanitization）</h3>
      <p>
        <code>MolFromSmiles()</code> 会自动调用 <code>SanitizeMol()</code>，
        执行以下操作：推断氢原子、计算环系统、检查化合价合理性、计算芳香性。
        若需手动控制：
      </p>
      <pre><code>{`mol = Chem.MolFromSmiles('c1ccccc1', sanitize=False)
try:
    Chem.SanitizeMol(mol)
    print("验证通过")
except Exception as e:
    print(f"验证失败: {e}")`}</code></pre>

      <h3>其他输入格式</h3>
      <pre><code>{`# 从 SMARTS 读取（用于子结构搜索）
pattern = Chem.MolFromSmarts('[OH]')

# 从 InChI 读取
from rdkit.Chem.inchi import MolFromInchi
mol = MolFromInchi('InChI=1S/C9H8O4/...')

# 从 SDF 文件读取多个分子
suppl = Chem.SDMolSupplier('molecules.sdf')
mols = [m for m in suppl if m is not None]
print(f"读取了 {len(mols)} 个分子")`}</code></pre>

      {/* Section 3 */}
      <h2>4.1.3 分子可视化 / Molecular Visualization</h2>
      <p>
        RDKit 可以生成分子的 2D 结构图，支持 PNG/SVG 格式输出，
        在 Jupyter Notebook 中可直接内联渲染。
      </p>

      <pre><code>{`from rdkit.Chem import Draw
from rdkit import Chem

# 单个分子图像
mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')
img = Draw.MolToImage(mol, size=(300, 200))
img.save('aspirin.png')

# 在 Jupyter Notebook 中直接显示
from IPython.display import display
display(mol)  # 或直接在 cell 最后一行写 mol

# 多个分子网格图
smiles_list = [
    'CC(=O)Oc1ccccc1C(=O)O',   # 阿司匹林
    'CC12CCC3C(C1CCC2O)CCC4=CC(=O)CCC34C',  # 睾酮
    'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',  # 咖啡因
]
mols = [Chem.MolFromSmiles(s) for s in smiles_list]
labels = ['Aspirin', 'Testosterone', 'Caffeine']

grid_img = Draw.MolsToGridImage(mols, molsPerRow=3, subImgSize=(300, 200), legends=labels)
grid_img.save('molecules_grid.png')`}</code></pre>

      <h3>子结构高亮</h3>
      <pre><code>{`from rdkit.Chem import Draw
from rdkit import Chem

mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')
pattern = Chem.MolFromSmarts('C(=O)O')  # 羧酸/酯基

# 找到匹配的原子索引
match = mol.GetSubstructMatch(pattern)

# 高亮显示匹配部分
img = Draw.MolToImage(mol, size=(300, 200), highlightAtoms=list(match))
display(img)`}</code></pre>

      <div className="info-box">
        <strong>提示：</strong>RDKit 的 2D 坐标生成（<code>Compute2DCoords</code>）会自动调用，
        无需手动设置。如果需要自定义布局，可以使用 <code>AllChem.Compute2DCoords(mol)</code>。
      </div>

      {/* Section 4 */}
      <h2>4.1.4 提取分子基本信息 / Basic Molecular Information</h2>
      <p>
        RDKit 提供了直接访问分子中原子、键、环系统等结构信息的接口。
      </p>

      <pre><code>{`from rdkit import Chem

mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')  # 阿司匹林

# 原子与键的数量（不含隐式氢）
print(mol.GetNumAtoms())   # 13（重原子数）
print(mol.GetNumBonds())   # 13

# 遍历原子
for atom in mol.GetAtoms():
    print(f"原子 {atom.GetIdx()}: {atom.GetSymbol()}, "
          f"原子序数={atom.GetAtomicNum()}, "
          f"芳香性={atom.GetIsAromatic()}, "
          f"形式电荷={atom.GetFormalCharge()}")

# 遍历键
for bond in mol.GetBonds():
    print(f"键 {bond.GetBeginAtomIdx()}-{bond.GetEndAtomIdx()}: "
          f"类型={bond.GetBondTypeAsDouble()}, "
          f"芳香性={bond.GetIsAromatic()}")

# 环信息
ring_info = mol.GetRingInfo()
print(f"环的数量: {ring_info.NumRings()}")
print(f"各环的原子索引: {ring_info.AtomRings()}")`}</code></pre>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>常用方法</th><th>返回值</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td><code>atom.GetSymbol()</code></td><td>str</td><td>元素符号，如 "C", "N", "O"</td></tr>
            <tr><td><code>atom.GetAtomicNum()</code></td><td>int</td><td>原子序数，如 C=6, N=7</td></tr>
            <tr><td><code>atom.GetIsAromatic()</code></td><td>bool</td><td>是否为芳香原子</td></tr>
            <tr><td><code>atom.GetTotalDegree()</code></td><td>int</td><td>总键数（含隐式氢）</td></tr>
            <tr><td><code>bond.GetBondTypeAsDouble()</code></td><td>float</td><td>1.0=单键, 2.0=双键, 1.5=芳香键</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 5 */}
      <h2>4.1.5 计算分子描述符 / Calculating Molecular Descriptors</h2>
      <p>
        这是 RDKit 在药物发现中最核心的应用场景之一，直接承接 Ch3.1 的 ADMET 与 Lipinski Ro5 知识。
      </p>

      <h3>Lipinski Ro5 描述符计算</h3>
      <pre><code>{`from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')  # 阿司匹林

# Lipinski Ro5 四项
mw = Descriptors.MolWt(mol)                        # 分子量
logp = Descriptors.MolLogP(mol)                    # 亲脂性
hbd = rdMolDescriptors.CalcNumHBD(mol)             # 氢键供体数
hba = rdMolDescriptors.CalcNumHBA(mol)             # 氢键受体数
tpsa = rdMolDescriptors.CalcTPSA(mol)              # 极性表面积

print(f"MW:   {mw:.2f}   (<= 500)")
print(f"LogP: {logp:.2f}  (<= 5)")
print(f"HBD:  {hbd}      (<= 5)")
print(f"HBA:  {hba}      (<= 10)")
print(f"TPSA: {tpsa:.2f}  (<= 140 nm²)")

# 判断是否满足 Ro5
ro5_pass = mw <= 500 and logp <= 5 and hbd <= 5 and hba <= 10
print(f"\\nRo5 通过: {ro5_pass}")`}</code></pre>

      <h3>更多常用描述符</h3>
      <pre><code>{`from rdkit.Chem import QED, Descriptors, rdMolDescriptors

# QED（药物相似性综合评分，0~1，越高越好）
qed_score = QED.qed(mol)
print(f"QED: {qed_score:.3f}")

# 可旋转键数（影响口服生物利用度）
rot_bonds = rdMolDescriptors.CalcNumRotatableBonds(mol)

# 环数与芳香环数
num_rings = rdMolDescriptors.CalcNumRings(mol)
num_arom_rings = rdMolDescriptors.CalcNumAromaticRings(mol)

# 重原子数
heavy_atoms = mol.GetNumAtoms()

print(f"可旋转键: {rot_bonds}")
print(f"总环数: {num_rings}, 芳香环数: {num_arom_rings}")
print(f"重原子数: {heavy_atoms}")`}</code></pre>

      <h3>批量处理分子库</h3>
      <pre><code>{`import pandas as pd
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

smiles_list = [
    ('Aspirin',    'CC(=O)Oc1ccccc1C(=O)O'),
    ('Ibuprofen',  'CC(C)Cc1ccc(cc1)C(C)C(=O)O'),
    ('Caffeine',   'CN1C=NC2=C1C(=O)N(C(=O)N2C)C'),
    ('Paracetamol','CC(=O)Nc1ccc(O)cc1'),
]

rows = []
for name, smi in smiles_list:
    mol = Chem.MolFromSmiles(smi)
    if mol:
        rows.append({
            'Name': name,
            'MW': round(Descriptors.MolWt(mol), 2),
            'LogP': round(Descriptors.MolLogP(mol), 2),
            'HBD': rdMolDescriptors.CalcNumHBD(mol),
            'HBA': rdMolDescriptors.CalcNumHBA(mol),
            'TPSA': round(rdMolDescriptors.CalcTPSA(mol), 2),
        })

df = pd.DataFrame(rows)
print(df.to_string(index=False))`}</code></pre>

      {/* Section 6 */}
      <h2>4.1.6 子结构搜索 / Substructure Search with SMARTS</h2>
      <p>
        子结构搜索是化学信息学数据库检索的核心操作。
        RDKit 使用 <strong>SMARTS</strong>（Ch2.2 介绍过）定义搜索模式，
        可以精确匹配官能团、药效团或特定原子环境。
      </p>

      <h3>基本子结构匹配</h3>
      <pre><code>{`from rdkit import Chem

mol = Chem.MolFromSmiles('CC(=O)Oc1ccccc1C(=O)O')  # 阿司匹林

# HasSubstructMatch：是否包含该子结构（返回 bool）
carboxylic_acid = Chem.MolFromSmarts('C(=O)[OH]')
ester = Chem.MolFromSmarts('C(=O)O[C,c]')
aromatic_ring = Chem.MolFromSmarts('c1ccccc1')

print(f"含羧基: {mol.HasSubstructMatch(carboxylic_acid)}")   # True
print(f"含酯基: {mol.HasSubstructMatch(ester)}")             # True
print(f"含苯环: {mol.HasSubstructMatch(aromatic_ring)}")     # True

# GetSubstructMatches：返回所有匹配的原子索引元组
matches = mol.GetSubstructMatches(carboxylic_acid)
print(f"羧基匹配位置: {matches}")`}</code></pre>

      <h3>批量筛选含特定官能团的分子</h3>
      <pre><code>{`from rdkit import Chem

# 常用官能团 SMARTS
FUNCTIONAL_GROUPS = {
    'Carboxylic Acid': 'C(=O)[OH]',
    'Ester':           'C(=O)O[C,c]',
    'Amide':           'C(=O)[NH]',
    'Amine':           '[NH2]',
    'Alcohol':         '[OH][C;!$(C=O)]',
    'Aromatic Ring':   'c1ccccc1',
    'Halide':          '[F,Cl,Br,I]',
}

smiles_list = [
    'CC(=O)Oc1ccccc1C(=O)O',   # 阿司匹林
    'CC(C)Cc1ccc(cc1)C(C)C(=O)O',  # 布洛芬
    'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',  # 咖啡因
]

for smi in smiles_list:
    mol = Chem.MolFromSmiles(smi)
    if mol is None:
        continue
    hits = []
    for name, smarts in FUNCTIONAL_GROUPS.items():
        patt = Chem.MolFromSmarts(smarts)
        if mol.HasSubstructMatch(patt):
            hits.append(name)
    print(f"{Chem.MolToSmiles(mol)[:30]}... → {', '.join(hits)}")`}</code></pre>

      <h3>SMARTS 常用语法速查</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>SMARTS</th><th>匹配含义</th></tr>
          </thead>
          <tbody>
            <tr><td><code>[C;H1]</code></td><td>连接 1 个氢的脂肪碳</td></tr>
            <tr><td><code>[c;r6]</code></td><td>六元芳香环中的碳</td></tr>
            <tr><td><code>[#6;!$([#6]~[#7,#8])]</code></td><td>不与 N 或 O 相连的碳</td></tr>
            <tr><td><code>[F,Cl,Br,I]</code></td><td>任意卤素原子</td></tr>
            <tr><td><code>C(=O)[OH]</code></td><td>羧酸（COOH）</td></tr>
            <tr><td><code>[NH2]c</code></td><td>连接芳香碳的伯胺</td></tr>
            <tr><td><code>[$([CX3]=[OX1]),$([CX3+]-[OX1-])]</code></td><td>羰基（包含共振结构）</td></tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <strong>与 Cheminformatics 数据库的联系：</strong>ChEMBL、PubChem 等大型分子数据库都支持基于 SMARTS 的子结构搜索。
        在 Data Analytics in Chemistry 课程中，你将用 RDKit 从这些数据库下载的分子集合中进行筛选和分析，
        子结构搜索是核心工具之一。
      </div>

    </div>
  )
}
