export const ch1QuickCheck = {
  id: 'ch1-1-quick-check',
  lessonId: 'ch1-1-atomic-structure',
  title: 'Quick Check — Atomic Structure',
  passingScore: 60,
  questions: [
    {
      id: 1,
      type: 'single',
      question: '原子序数（Atomic Number）代表的是什么？',
      options: [
        '质子数 + 中子数',
        '只有质子数',
        '只有中子数',
        '电子数 + 质子数',
      ],
      correct: 1,
      explanation:
        '原子序数 Z 等于原子核中质子的数量，是区分不同元素的唯一依据。质子数 + 中子数 = 质量数（Mass Number）。',
    },
    {
      id: 2,
      type: 'single',
      question: '中性碳原子（¹²C）有多少个电子？',
      options: ['4', '6', '8', '12'],
      correct: 1,
      explanation:
        '碳的原子序数为 6，即有 6 个质子。中性原子中，电子数 = 质子数 = 6。',
    },
    {
      id: 3,
      type: 'single',
      question: '以下哪种说法正确描述了同位素（Isotope）？',
      options: [
        '质子数不同，中子数相同',
        '质子数相同，中子数不同',
        '质子数和中子数都不同',
        '质子数和中子数都相同，电子数不同',
      ],
      correct: 1,
      explanation:
        '同位素是质子数相同（同种元素）但中子数不同的原子。例如 ¹²C（6质子6中子）和 ¹⁴C（6质子8中子）。',
    },
    {
      id: 4,
      type: 'single',
      question: '哪种亚原子粒子最直接决定了元素的化学性质？',
      options: ['质子（Proton）', '中子（Neutron）', '价电子（Valence Electron）', '原子核（Nucleus）'],
      correct: 2,
      explanation:
        '最外层电子（价电子）参与化学键的形成，直接决定了元素的化学反应性。这也是同族元素化学性质相似的原因。',
    },
    {
      id: 5,
      type: 'multi',
      question: '以下哪些元素属于 CHNOPS 元素？（可多选）',
      options: ['碳（Carbon, C）', '铁（Iron, Fe）', '氮（Nitrogen, N）', '氯（Chlorine, Cl）', '磷（Phosphorus, P）'],
      correct: [0, 2, 4],
      explanation:
        'CHNOPS 是指 C（碳）、H（氢）、N（氮）、O（氧）、P（磷）、S（硫）六种元素，构成了绝大多数药物和生物分子。铁和氯不在此列。',
    },
  ],
}
