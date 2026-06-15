export const ch32QuickCheck = [
  {
    id: 'ch32-q1',
    type: 'single',
    question: '进入 I 期临床的候选药物中，最终成功上市的比例大约是多少？',
    options: [
      '约 50%',
      '约 30%',
      '约 10%',
      '约 1%',
    ],
    correct: 2,
    explanation:
      '进入 I 期临床的候选药物中，只有约 10% 最终上市。失败原因主要是 ADMET 问题（~40%）、疗效不足（~30%）和安全性问题。这也是为什么 AI 早期预测 ADMET 和活性的价值极大——越早失败，损失越小。',
  },
  {
    id: 'ch32-q2',
    type: 'single',
    question: '下列关于 AlphaFold2 的描述，哪项正确？',
    options: [
      'AlphaFold2 是一种分子对接软件，用于预测配体结合姿态',
      'AlphaFold2 能以实验精度预测蛋白质三维结构，发布了超过 2 亿个结构',
      'AlphaFold2 是一种 QSAR 模型，用于预测分子活性',
      'AlphaFold2 只能预测已有晶体结构的蛋白',
    ],
    correct: 1,
    explanation:
      'AlphaFold2（DeepMind，2021）是蛋白质结构预测模型，能以接近实验（X射线晶体学）的精度预测蛋白三维结构，并发布了超过 2 亿个物种蛋白的结构数据库。它彻底降低了靶点结构研究的门槛，使"无结构就无法做基于结构药物设计"的瓶颈基本消除。',
  },
  {
    id: 'ch32-q3',
    type: 'single',
    question: '基于片段的药物设计（FBDD）中，片段库分子通常符合哪个规则？',
    options: [
      'Lipinski Ro5（MW ≤ 500）',
      'Ro3（MW ≤ 300，logP ≤ 3，HBD ≤ 3）',
      'Veber 规则（PSA ≤ 140 Å²）',
      '没有特定规则限制',
    ],
    correct: 1,
    explanation:
      'FBDD 筛选的是小型"片段"，这些片段符合 Rule of Three（Ro3）：MW ≤ 300，logP ≤ 3，HBD ≤ 3。片段比完整类药分子小得多，虽然活性弱（mM 级），但通过后续"生长"或"拼接"可以发展成高活性先导化合物。',
  },
  {
    id: 'ch32-q4',
    type: 'multi',
    question: '在先导化合物优化中，使用氟取代（–H → –F）的目的可以是哪些？（多选）',
    options: [
      '封锁代谢热点，提高代谢稳定性',
      '略微降低 logP，改善水溶性',
      '增大分子量，提高 BBB 穿透性',
      '提高化合物活性（改善与靶点的结合）',
      '消除结构警报，降低致癌风险',
    ],
    correct: [0, 3],
    explanation:
      '氟取代最主要的作用是：①封锁 CYP450 代谢热点（含氟的 C–H 键更难被氧化），提高代谢稳定性；②改变电子效应和结合几何，通常能提升与靶点的结合亲和力。氟取代会略微增加 logP（而非降低），且 MW 增加很小（F=19），不显著影响 BBB。约 20–25% 的上市药物含氟。',
  },
  {
    id: 'ch32-q5',
    type: 'multi',
    question: '以下哪些是当前 AI 在药物发现中已有成熟应用或重大突破的领域？（多选）',
    options: [
      '蛋白质三维结构预测（如 AlphaFold2）',
      '基于强化学习的分子生成与优化（如 REINVENT）',
      '完全自动化替代 Phase III 临床试验',
      'ADMET 性质预测（如 ADMETlab、pkCSM）',
      '逆合成路线规划（如 AiZynthFinder）',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'AI 在蛋白结构预测、分子生成、ADMET 预测和逆合成规划等方面均已有重大突破和实际应用。但"完全自动化替代 Phase III 临床试验"目前不可能——临床试验涉及人体安全性和伦理，必须在人体中进行验证，AI 无法替代真实临床数据。',
  },
]
