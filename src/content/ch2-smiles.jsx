export const ch2SmilesMeta = {
  id: 'ch2-2-smiles',
  title: 'SMILES & Molecular Representation',
  titleZh: 'SMILES 与分子表示法',
  path: 'Chemistry Fundamentals',
  chapter: 'Ch2. Organic Chemistry Basics',
  estimatedMinutes: 40,
  difficulty: '🔴 重点',
  prev: { id: 'ch2-1-functional-groups', title: 'Functional Groups', path: '/learn/ch2-functional-groups' },
  next: null,
}

export function Ch2SmilesContent() {
  return (
    <div className="content-prose">

      {/* Section 1 */}
      <h2>2.2.1 从结构到字符串 / From Structure to String</h2>
      <p>
        化学家画分子时用的是键线式或结构式，但计算机只认识数字和文本。
        如何把一个三维分子"压缩"成一串可以存储、传输、检索的字符？
        这正是<span className="term">分子表示法（Molecular Representation）</span>要解决的问题。
      </p>
      <p>
        一个好的分子表示法需要满足：
      </p>
      <ul>
        <li><strong>唯一性（Uniqueness）：</strong>同一个分子只有一种写法（或能转换为唯一的规范形式）</li>
        <li><strong>可解析性（Parsability）：</strong>计算机能快速读取并还原结构</li>
        <li><strong>人类可读性（Human-readability）：</strong>化学家能直接理解（至少能猜）</li>
      </ul>
      <div className="note-box">
        <strong>主流分子表示法一览：</strong>
        <ul>
          <li><strong>SMILES</strong>：最常用，紧凑，支持子结构搜索，RDKit/Python 生态核心格式</li>
          <li><strong>InChI / InChIKey</strong>：IUPAC 标准，适合数据库去重和跨平台检索</li>
          <li><strong>MOL/SDF 文件</strong>：包含 2D 坐标，药物数据库（如 ChEMBL、PubChem）常用</li>
          <li><strong>分子图（Molecular Graph）</strong>：图神经网络（GNN）的输入格式，原子为节点、键为边</li>
          <li><strong>3D 坐标（XYZ/PDB）</strong>：DFT 计算、蛋白-配体对接的输入</li>
        </ul>
      </div>
      <p>
        本章重点是 SMILES——在 Python 化学信息学中，
        几乎所有分子都以 SMILES 字符串的形式进入和离开你的程序。
      </p>

      {/* Section 2 */}
      <h2>2.2.2 SMILES 基础语法 / SMILES Basic Syntax</h2>
      <p>
        <span className="term">SMILES（Simplified Molecular Input Line Entry System）</span>
        由 David Weininger 在 1988 年设计，核心思想是用深度优先遍历（DFS）分子图，
        把原子和键依次写成字符串。
      </p>

      <h3>原子符号 / Atoms</h3>
      <p>
        有机子集中常见元素可以直接写，无需方括号：
        <code>B C N O P S F Cl Br I</code>（大写 = 脂肪族）。
        其他元素、带电荷、同位素、氢数必须用方括号：
        <code>[Fe]</code>、<code>[NH4+]</code>、<code>[13C]</code>、<code>[OH-]</code>。
      </p>
      <p>
        <strong>芳香原子用小写：</strong>
        <code>c n o s p</code>——这是 SMILES 中判断芳香性最常见的方式。
      </p>

      <h3>化学键 / Bonds</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>键符号</th><th>含义</th><th>示例</th></tr>
          </thead>
          <tbody>
            <tr><td>（无符号）或 <code>-</code></td><td>单键</td><td><code>CC</code>（乙烷）</td></tr>
            <tr><td><code>=</code></td><td>双键</td><td><code>C=O</code>（醛/酮羰基）</td></tr>
            <tr><td><code>#</code></td><td>三键</td><td><code>C#N</code>（腈基）</td></tr>
            <tr><td><code>:</code></td><td>芳香键（少用，用小写字母替代更常见）</td><td><code>c1:c:c:c:c:c:1</code></td></tr>
            <tr><td><code>/</code> <code>\</code></td><td>双键立体化学（E/Z）</td><td><code>F/C=C/F</code>（反式）</td></tr>
          </tbody>
        </table>
      </div>

      <h3>分支 / Branches</h3>
      <p>
        用圆括号表示分支，括号内的原子链从上一个主链原子出发：
      </p>
      <div className="note-box">
        <code>CC(C)C</code> = 异丁烷（isobutane）：中心 C 连了两个 CH₃ 和一个 CH₃（主链）
        <br />
        <code>CC(=O)O</code> = 乙酸（acetic acid）：C–C(=O)–O，即 CH₃COOH
        <br />
        <code>CC(=O)N</code> = 乙酰胺（acetamide）：CH₃CONH₂
      </div>

      <h3>环 / Rings</h3>
      <p>
        环用<strong>数字标记</strong>来闭合：在开环原子和闭环原子后各写同一个数字。
      </p>
      <div className="note-box">
        <code>C1CCCCC1</code> = 环己烷（cyclohexane）：C1 开环，末尾 C1 闭环，形成 6 元环
        <br />
        <code>c1ccccc1</code> = 苯（benzene）：小写 c 表示芳香碳
        <br />
        <code>c1ccncc1</code> = 吡啶（pyridine）：把苯环中一个 c 换成 n
        <br />
        <code>c1ccc2ccccc2n1</code> = 喹啉（quinoline）：稠环，数字 1 和 2 各自独立闭合
      </div>

      <h3>常用分子 SMILES 速查 / Quick Reference</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>分子</th><th>SMILES</th><th>结构要点</th></tr>
          </thead>
          <tbody>
            <tr><td>水 Water</td><td><code>O</code></td><td>O = H₂O（H 隐式补全）</td></tr>
            <tr><td>甲醇 Methanol</td><td><code>CO</code></td><td>C–O，即 CH₃OH</td></tr>
            <tr><td>乙醇 Ethanol</td><td><code>CCO</code></td><td>C–C–O，即 CH₃CH₂OH</td></tr>
            <tr><td>乙酸 Acetic acid</td><td><code>CC(=O)O</code></td><td>CH₃–C(=O)–OH</td></tr>
            <tr><td>苯 Benzene</td><td><code>c1ccccc1</code></td><td>6 个芳香碳成环</td></tr>
            <tr><td>苯胺 Aniline</td><td><code>Nc1ccccc1</code></td><td>苯环连 –NH₂</td></tr>
            <tr><td>苯甲酸 Benzoic acid</td><td><code>OC(=O)c1ccccc1</code></td><td>苯环连 –COOH</td></tr>
            <tr><td>咖啡因 Caffeine</td><td><code>Cn1cnc2c1c(=O)n(C)c(=O)n2C</code></td><td>嘌呤骨架，3 个 N-甲基</td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 3 */}
      <h2>2.2.3 立体化学与规范 SMILES / Stereochemistry & Canonical SMILES</h2>

      <h3>双键立体化学（E/Z）</h3>
      <p>
        用 <code>/</code> 和 <code>\</code> 表示双键两侧取代基的相对方向：
      </p>
      <div className="note-box">
        <code>F/C=C/F</code> → (E)-1,2-二氟乙烯（反式，两 F 在双键对角线方向）
        <br />
        <code>F/C=C\F</code> → (Z)-1,2-二氟乙烯（顺式，两 F 在双键同侧）
      </div>

      <h3>四面体手性（@/@@ ）</h3>
      <p>
        在手性中心原子的方括号内用 <code>@</code>（逆时针）或 <code>@@</code>（顺时针）指定构型：
      </p>
      <div className="note-box">
        <code>[C@@H](F)(Cl)Br</code> → R 构型（从 H 方向看，F→Cl→Br 为顺时针）
        <br />
        <code>[C@H](F)(Cl)Br</code> → S 构型（逆时针）
        <br />
        阿莫西林的 SMILES 包含两个 <code>@</code> 标记，对应其两个手性中心。
      </div>

      <h3>规范 SMILES / Canonical SMILES</h3>
      <p>
        同一个分子可以写出多种 SMILES（从不同原子出发遍历），例如乙醇既可写 <code>CCO</code> 也可写 <code>OCC</code>。
        <span className="term">规范 SMILES（Canonical SMILES）</span>是通过算法（Morgan 算法）确定唯一写法，
        用于数据库存储和去重。
      </p>
      <p>
        RDKit 生成规范 SMILES：
      </p>
      <div className="note-box">
        <code>from rdkit import Chem</code>
        <br />
        <code>mol = Chem.MolFromSmiles('OCC')</code>
        <br />
        <code>Chem.MolToSmiles(mol)  # → 'CCO'</code>
      </div>

      {/* Section 4 */}
      <h2>2.2.4 SMARTS：子结构搜索 / SMARTS: Substructure Searching</h2>
      <p>
        <span className="term">SMARTS（SMILES ARbitrary Target Specification）</span>是 SMILES 的扩展，
        专门用于定义子结构模式（pattern）——就像正则表达式之于文本，SMARTS 之于分子。
      </p>

      <h3>SMARTS 扩展语法</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>符号</th><th>含义</th><th>示例</th></tr>
          </thead>
          <tbody>
            <tr><td><code>[#6]</code></td><td>任意碳（包括脂肪族和芳香族）</td><td>匹配所有含碳结构</td></tr>
            <tr><td><code>[#7,#8]</code></td><td>氮或氧（逗号 = OR）</td><td>匹配杂原子位置</td></tr>
            <tr><td><code>[!N]</code></td><td>非氮原子</td><td>排除氮</td></tr>
            <tr><td><code>[NH2]</code></td><td>连了 2 个 H 的氮（伯胺）</td><td>–NH₂ 官能团</td></tr>
            <tr><td><code>[$(C=O)]</code></td><td>递归 SMARTS：连在 C=O 上的原子</td><td>羰基邻近位点</td></tr>
            <tr><td><code>~</code></td><td>任意键（单/双/三/芳香）</td><td>模糊键匹配</td></tr>
          </tbody>
        </table>
      </div>

      <h3>RDKit 子结构搜索</h3>
      <div className="note-box">
        <code>from rdkit import Chem</code>
        <br />
        <code>mol = Chem.MolFromSmiles('CC(=O)Nc1ccc(O)cc1')  # 对乙酰氨基酚</code>
        <br />
        <code>amide = Chem.MolFromSmarts('[NX3][CX3](=O)')</code>
        <br />
        <code>mol.HasSubstructMatch(amide)  # → True</code>
        <br />
        <br />
        <code>hydroxyl = Chem.MolFromSmarts('[OX2H]')</code>
        <br />
        <code>mol.GetSubstructMatches(hydroxyl)  # → ((8,),) 返回原子索引</code>
      </div>

      <h3>常用过滤 SMARTS</h3>
      <div className="note-box">
        <strong>PAINS（Pan-Assay Interference Compounds）过滤：</strong>
        某些官能团（如醌、迈克尔受体）会在高通量筛选中产生假阳性，
        RDKit 内置 PAINS 过滤器：
        <br />
        <code>from rdkit.Chem.FilterCatalog import FilterCatalog, FilterCatalogParams</code>
        <br />
        <code>params = FilterCatalogParams()</code>
        <br />
        <code>params.AddCatalog(FilterCatalogParams.FilterCatalogs.PAINS)</code>
        <br />
        这在药物发现的苗头化合物（hit）筛选阶段是标准步骤。
      </div>

      {/* Section 5 */}
      <h2>2.2.5 InChI 与 InChIKey / InChI & InChIKey</h2>
      <p>
        <span className="term">InChI（IUPAC International Chemical Identifier）</span>
        是 IUPAC 官方标准化的分子标识符，结构为层级式：
      </p>
      <div className="note-box">
        苯甲酸的 InChI：
        <br />
        <code>InChI=1S/C7H6O2/c8-7(9)6-4-2-1-3-5-6/h1-5H,(H,8,9)</code>
        <br /><br />
        各层含义：
        <ul>
          <li><code>1S</code> — 标准 InChI 版本 1</li>
          <li><code>C7H6O2</code> — 分子式层（formula layer）</li>
          <li><code>c...</code> — 连接层（connection layer），描述原子连接</li>
          <li><code>h...</code> — 氢层（hydrogen layer）</li>
          <li>（还有电荷层 q、立体层 b/t/m/s 等，按需添加）</li>
        </ul>
      </div>
      <p>
        <span className="term">InChIKey</span> 是 InChI 的 SHA-256 哈希，压缩为 27 个字符：
      </p>
      <div className="note-box">
        苯甲酸的 InChIKey：<code>WPYMKLBDIGXBTP-UHFFFAOYSA-N</code>
        <br /><br />
        格式：<code>XXXXXXXXXXXXXX-YYYYYYYYYY-Z</code>
        <ul>
          <li>前 14 字符：连接层哈希（分子骨架）</li>
          <li>中间 10 字符：其余层哈希（立体/同位素/电荷）</li>
          <li>最后 1 字符：InChI 版本标志</li>
        </ul>
      </div>
      <p>
        InChIKey 的主要用途：<strong>数据库精确检索和跨平台去重</strong>。
        在 PubChem、ChEMBL 中直接用 InChIKey 查询即可找到该化合物的所有数据。
        注意：InChIKey 是单向哈希，无法反推回原始结构，需与 SMILES/InChI 同时保存。
      </p>

      {/* Section 6 */}
      <h2>2.2.6 分子指纹 / Molecular Fingerprints</h2>
      <p>
        分子指纹是将分子"编码"为定长<strong>比特向量（bit vector）</strong>或整数数组的方法，
        使分子可以直接输入机器学习模型，或用于相似性计算。
      </p>

      <h3>Morgan 指纹 / ECFP</h3>
      <p>
        <span className="term">Morgan 算法</span>（1965）和其现代版本
        <span className="term">ECFP（Extended Connectivity Fingerprint）</span>
        是最主流的分子指纹。
      </p>
      <p>
        核心思想：以每个原子为中心，向外"扩散"若干层邻居，
        将每个原子的局部化学环境哈希为一个整数，最终汇聚成一个位向量。
        ECFP4 = 半径 2（覆盖到原子周围 4 键内的邻居）；ECFP6 = 半径 3。
      </p>
      <div className="note-box">
        <code>from rdkit.Chem import AllChem</code>
        <br />
        <code>mol = Chem.MolFromSmiles('c1ccccc1')  # 苯</code>
        <br />
        <code>fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius=2, nBits=2048)</code>
        <br />
        <code>list(fp)[:10]  # 前 10 位：[0, 0, 1, 0, 0, 1, ...]</code>
      </div>

      <h3>MACCS Keys</h3>
      <p>
        <span className="term">MACCS Keys</span> 是 166 位的固定结构键，
        每一位对应一个预定义的子结构（如"是否含环"、"是否含 N–H"）。
        可解释性强，但信息密度低于 ECFP。
      </p>
      <div className="note-box">
        <code>from rdkit.Chem import MACCSkeys</code>
        <br />
        <code>fp_maccs = MACCSkeys.GenMACCSKeys(mol)</code>
        <br />
        <code>len(fp_maccs)  # → 167（0 位未使用，实际 166 位有效）</code>
      </div>

      <h3>Tanimoto 相似度 / Tanimoto Similarity</h3>
      <p>
        <span className="term">Tanimoto 系数（Jaccard 系数）</span>是比较两个分子指纹最常用的相似性度量：
      </p>
      <p style={{ textAlign: 'center', fontFamily: 'monospace', background: 'var(--color-surface)', padding: '0.5rem 1rem', borderRadius: '6px', display: 'inline-block', margin: '0.5rem 0' }}>
        Tanimoto(A, B) = |A ∩ B| / |A ∪ B|
      </p>
      <p>
        即：两个指纹中同时为 1 的位数，除以至少有一个为 1 的位数。结果范围 [0, 1]，
        1 = 完全相同，0 = 没有共同特征。
        药物发现中通常认为 Tanimoto ≥ 0.85 为"相似化合物"。
      </p>
      <div className="note-box">
        <code>from rdkit import DataStructs</code>
        <br />
        <code>mol1 = Chem.MolFromSmiles('c1ccccc1')   # 苯</code>
        <br />
        <code>mol2 = Chem.MolFromSmiles('c1ccncc1')   # 吡啶</code>
        <br />
        <code>fp1 = AllChem.GetMorganFingerprintAsBitVect(mol1, 2)</code>
        <br />
        <code>fp2 = AllChem.GetMorganFingerprintAsBitVect(mol2, 2)</code>
        <br />
        <code>DataStructs.TanimotoSimilarity(fp1, fp2)  # → ~0.6</code>
      </div>

      <h3>指纹的应用场景</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>应用</th><th>常用指纹</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td>相似性搜索（Similarity Search）</td><td>ECFP4/6</td><td>在化合物库中找相似苗头</td></tr>
            <tr><td>多样性分析（Diversity Analysis）</td><td>ECFP4 + Tanimoto</td><td>化合物库去冗余，保持结构多样</td></tr>
            <tr><td>机器学习特征（ML Features）</td><td>ECFP4, MACCS</td><td>直接作为随机森林/神经网络输入</td></tr>
            <tr><td>QSAR 建模</td><td>MACCS + RDKit 描述符</td><td>预测 logP、溶解性、活性等</td></tr>
            <tr><td>化学空间可视化</td><td>ECFP4 + t-SNE/UMAP</td><td>降维后绘制化合物分布图</td></tr>
          </tbody>
        </table>
      </div>

      <div className="note-box">
        <strong>本章总结 / Chapter Summary</strong>
        <ul>
          <li>SMILES 用原子符号 + 键符号 + 括号 + 环数字，将分子编码为字符串</li>
          <li>大写 = 脂肪族，小写 = 芳香族；<code>/\</code> 表示 E/Z，<code>@</code> 表示手性</li>
          <li>规范 SMILES 通过 Morgan 算法保证唯一性，RDKit 自动生成</li>
          <li>SMARTS 是分子正则表达式，用于子结构搜索、过滤和 PAINS 筛查</li>
          <li>InChIKey 是 27 字符哈希，适合数据库精确检索，但不可逆</li>
          <li>分子指纹（ECFP/MACCS）将分子编码为定长向量，支持 Tanimoto 相似度计算和 ML 特征</li>
        </ul>
      </div>

    </div>
  )
}
