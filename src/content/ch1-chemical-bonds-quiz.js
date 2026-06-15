export const ch12QuickCheck = {
  id: 'ch1-2-quick-check',
  lessonId: 'ch1-2-chemical-bonds',
  title: 'Quick Check — Chemical Bonds',
  passingScore: 60,
  questions: [
    {
      id: 1,
      type: 'single',
      question: '共价键（Covalent Bond）的本质是什么？',
      options: [
        '一个原子将电子完全转移给另一个原子',
        '两个原子共享一对或多对电子',
        '质子与中子之间的强核力',
        '带相反电荷的离子之间的静电吸引',
      ],
      correct: 1,
      explanation:
        '共价键通过两个原子共享电子对形成，使双方都能满足八隅体规则。电子完全转移是离子键；带相反电荷离子之间的静电吸引也是离子键。',
    },
    {
      id: 2,
      type: 'single',
      question: '以下关于氢键（Hydrogen Bond）的描述，哪一条最准确？',
      options: [
        '氢键是最强的化学键，强度超过共价键',
        '氢键是共价键的一种，存在于 H₂ 分子内部',
        '氢键是 H 与 N/O/F 之间的静电吸引力，属于分子间作用力',
        '氢键只存在于水分子之间，不存在于生物大分子中',
      ],
      correct: 2,
      explanation:
        '氢键不是真正的"键"（无电子共享或转移），而是当 H 共价键合到电负性强的 N/O/F 上后，H 带部分正电荷（δ+），被临近 N/O/F 的孤对电子吸引形成的静电相互作用。它比共价键弱很多，但在 DNA、蛋白质、药物-靶标结合中至关重要。',
    },
    {
      id: 3,
      type: 'single',
      question: '氯化钠（NaCl）中的 Na 和 Cl 之间形成的是哪种键？',
      options: [
        '非极性共价键，因为两者都需要电子',
        '极性共价键，因为 Cl 电负性比 Na 强',
        '离子键，Na 失去电子变成 Na⁺，Cl 得到电子变成 Cl⁻',
        '氢键，因为 Na 和 Cl 之间存在偶极相互作用',
      ],
      correct: 2,
      explanation:
        'Na（金属）电负性很低，Cl（非金属）电负性很高，差值大于 1.7，因此发生电子完全转移而非共享：Na → Na⁺（失1e⁻），Cl → Cl⁻（得1e⁻），两者靠静电吸引形成离子键。',
    },
    {
      id: 4,
      type: 'single',
      question: '药物设计中，Lipinski 五规则（Rule of Five）限制氢键供体（H-Bond Donor）≤ 5，主要是因为：',
      options: [
        '氢键供体越多，分子越容易形成共价键，毒性增大',
        '过多的氢键供体使分子极性太强，难以穿越细胞膜脂质双分子层（影响吸收）',
        '氢键供体增多会使分子质量超过 500 Da 的限制',
        '氢键供体与离子键竞争，导致药物在血液中不稳定',
      ],
      correct: 1,
      explanation:
        '细胞膜由磷脂双分子层构成，中间是疏水区域。口服药物需穿越此屏障。H 键供体过多意味着分子极性/亲水性过强，难以进入疏水脂质层，导致口服生物利用度低。这是 Lipinski 规则背后的物理化学逻辑。',
    },
    {
      id: 5,
      type: 'multi',
      question: '药物分子与靶蛋白之间的非共价相互作用通常包括哪些？（可多选）',
      options: [
        '氢键（H-Bond）',
        '核裂变（Nuclear Fission）',
        '疏水相互作用 / 范德华力（Hydrophobic / Van der Waals）',
        '离子相互作用（Ionic Interaction）',
        'π-π 堆积（π-π Stacking，芳环之间）',
      ],
      correct: [0, 2, 3, 4],
      explanation:
        '药物-靶标结合是多种非共价相互作用的叠加：氢键提供选择性，疏水/范德华力提供疏水口袋的形状互补，离子相互作用发生在带电基团之间，π-π 堆积存在于含苯环的药物与芳香氨基酸（如 Phe、Tyr、Trp）之间。核裂变是核物理现象，与化学键无关。',
    },
  ],
}
