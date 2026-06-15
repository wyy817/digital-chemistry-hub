export const ch22QuickCheck = [
  {
    id: 'q1',
    type: 'single',
    question: 'SMILES 中小写字母 c（如 c1ccccc1）代表什么？',
    options: [
      { id: 'a', text: '碳同位素（¹²C）' },
      { id: 'b', text: '芳香碳（aromatic carbon）' },
      { id: 'c', text: '带负电荷的碳（carbanion）' },
      { id: 'd', text: '手性碳中心' },
    ],
    correctIds: ['b'],
    explanation:
      'SMILES 中大写元素符号（C、N、O…）代表脂肪族原子，小写（c、n、o…）代表芳香族原子。c1ccccc1 是苯的 SMILES，6 个芳香碳形成环。RDKit 解析时会自动根据芳香性判断键型。',
  },
  {
    id: 'q2',
    type: 'single',
    question: '以下哪个 SMILES 表示乙酸（CH₃COOH，acetic acid）？',
    options: [
      { id: 'a', text: 'CCO' },
      { id: 'b', text: 'CC=O' },
      { id: 'c', text: 'CC(=O)O' },
      { id: 'd', text: 'CC(O)=O' },
    ],
    correctIds: ['c'],
    explanation:
      'CCO 是乙醇（ethanol）；CC=O 是乙醛（acetaldehyde，只有 C=O 没有额外 OH）；CC(=O)O 是乙酸：主链 C–C，分支 C=O（羰基）和 O（羟基），合起来就是 CH₃–C(=O)–OH = 乙酸。CC(O)=O 也是乙酸的另一种合法写法（两种写法均正确，但 CC(=O)O 更规范）。',
  },
  {
    id: 'q3',
    type: 'multi',
    question: '以下哪些是分子指纹（molecular fingerprint）的合法应用场景？（多选）',
    options: [
      { id: 'a', text: '计算两个分子的 Tanimoto 相似度' },
      { id: 'b', text: '作为机器学习模型（如随机森林）的输入特征' },
      { id: 'c', text: '从指纹直接还原分子的完整 3D 坐标' },
      { id: 'd', text: '在化合物库中进行相似性搜索' },
      { id: 'e', text: '用 t-SNE/UMAP 可视化化学空间' },
    ],
    correctIds: ['a', 'b', 'd', 'e'],
    explanation:
      '分子指纹是定长比特向量，适合相似度计算（Tanimoto）、ML 特征输入、相似性搜索和化学空间可视化。但指纹是单向的哈希压缩，无法反推回完整的原子坐标或 3D 结构——还原 3D 坐标需要原始 SMILES 加上构象生成算法（如 RDKit 的 EmbedMolecule）。',
  },
  {
    id: 'q4',
    type: 'single',
    question: 'SMARTS 表达式 [NH2] 匹配的是哪类原子？',
    options: [
      { id: 'a', text: '任意氮原子' },
      { id: 'b', text: '连接了恰好 2 个 H 的氮原子（伯胺 –NH₂）' },
      { id: 'c', text: '带正电荷的铵根（NH₄⁺）' },
      { id: 'd', text: '氮氢双键（=NH）' },
    ],
    correctIds: ['b'],
    explanation:
      '[NH2] 是 SMARTS 原子原语：方括号内 N = 氮，H2 = 恰好连 2 个氢，即伯胺（–NH₂）。若要匹配任意氮用 [#7] 或 N；铵根需写 [NH4+]；=NH 双键亚胺写 [NH]=C。SMARTS 的方括号语法让你可以精确指定原子的化学环境。',
  },
  {
    id: 'q5',
    type: 'single',
    question: 'InChIKey 相比完整 InChI 的最主要优势是？',
    options: [
      { id: 'a', text: '可以直接从 InChIKey 还原分子结构' },
      { id: 'b', text: '包含更完整的立体化学信息' },
      { id: 'c', text: '固定 27 字符，便于数据库索引和精确检索' },
      { id: 'd', text: '比 InChI 更适合子结构搜索' },
    ],
    correctIds: ['c'],
    explanation:
      'InChIKey 是 InChI 的 SHA-256 哈希，压缩为固定 27 字符（如 WPYMKLBDIGXBTP-UHFFFAOYSA-N），非常适合数据库字段索引和 URL 参数传递。缺点：它是单向哈希，无法反推原始结构；立体信息编码在中间段但损失了细节。InChI/SMILES 才支持子结构搜索，InChIKey 只能做精确匹配。',
  },
]
