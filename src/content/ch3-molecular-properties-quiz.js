export const ch31QuickCheck = [
  {
    id: 'ch31-q1',
    type: 'single',
    question: 'Lipinski Ro5 中，哪个描述符的阈值是 ≤ 5？',
    options: [
      'MW（分子量）',
      'HBA（氢键受体数）',
      'HBD（氢键供体数）',
      'PSA（极性表面积）',
    ],
    correct: 2,
    explanation:
      'Lipinski Ro5：MW ≤ 500，logP ≤ 5，HBD ≤ 5，HBA ≤ 10。"五规则"名称来自所有阈值都是 5 的倍数。HBD（–OH 和 –NH 数）的阈值正是 ≤ 5，而 HBA（N 和 O 原子数）的阈值是 ≤ 10。',
  },
  {
    id: 'ch31-q2',
    type: 'single',
    question: '下列关于 logP 与药物吸收的描述，哪项正确？',
    options: [
      'logP 越高越好，亲脂性强的分子口服吸收一定更好',
      'logP 最佳范围约为 1–3，过高或过低都不利于口服吸收',
      'logP 与口服吸收无关，只影响分布',
      'logP < 0 的分子无法被人体吸收',
    ],
    correct: 1,
    explanation:
      'logP 过低（< 0）时分子太亲水，难以穿越肠道脂质双层；logP 过高（> 5）时溶解度差，在肠液中无法充分溶解。口服吸收的最佳 logP 范围约为 1–3，这也是 Lipinski Ro5 设置 logP ≤ 5 上限的原因。',
  },
  {
    id: 'ch31-q3',
    type: 'single',
    question: '关于 CYP450 酶系，下列说法错误的是？',
    options: [
      'CYP3A4 负责约 50% 的药物代谢',
      'CYP450 主要分布在肝脏',
      'CYP450 可以将亲脂性药物转化为更亲水的代谢产物',
      'CYP450 被抑制后会导致底物药物浓度降低',
    ],
    correct: 3,
    explanation:
      'CYP450 被抑制后，对应底物的代谢减慢，导致血药浓度升高（而非降低），可能达到毒性水平。这就是药物相互作用（DDI）最常见的机制之一。',
  },
  {
    id: 'ch31-q4',
    type: 'multi',
    question: '以下哪些因素有利于药物穿越血脑屏障（BBB）？（多选）',
    options: [
      'PSA < 90 Å²',
      'MW < 450 Da',
      'HBD ≤ 3',
      'logP > 5（高亲脂性）',
      'MW > 700 Da',
    ],
    correct: [0, 1, 2],
    explanation:
      '穿越 BBB 的分子通常需要：PSA < 90 Å²（低极性）、MW < 450 Da（小分子）、HBD ≤ 3（少氢键供体），以及 logP 1–3（适中亲脂性）。logP > 5 虽然亲脂，但溶解度差且可能引发毒性；MW > 700 Da 过大，无法通过紧密连接的 BBB 内皮细胞。',
  },
  {
    id: 'ch31-q5',
    type: 'multi',
    question: 'QSAR 建模时，分子的输入特征可以是哪些形式？（多选）',
    options: [
      '物化描述符（如 logP、MW、PSA 等数值）',
      '分子指纹（如 ECFP4 比特向量）',
      '分子图（原子为节点、键为边，用于 GNN）',
      'SMILES 字符串（用于 Transformer 模型）',
      '分子的气味描述',
    ],
    correct: [0, 1, 2, 3],
    explanation:
      'QSAR 建模中常用的特征表示包括：物化描述符（可解释性好）、分子指纹（ECFP4/MACCS，适合随机森林/SVM）、分子图（端到端 GNN）、SMILES 字符串（Transformer / ChemBERTa）。气味描述不是结构化特征，无法直接用于 QSAR 建模。',
  },
]
