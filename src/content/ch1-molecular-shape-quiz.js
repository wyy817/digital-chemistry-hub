export const ch13QuickCheck = {
  id: 'ch1-3-quick-check',
  lessonId: 'ch1-3-molecular-shape',
  title: 'Quick Check — Molecular Shape & Chirality',
  passingScore: 60,
  questions: [
    {
      id: 1,
      type: 'single',
      question: '甲烷（CH₄）中碳原子连接4个氢原子且没有孤对电子，根据 VSEPR 理论，其几何构型是？',
      options: [
        '线形（Linear，键角 180°）',
        '三角平面（Trigonal Planar，键角 120°）',
        '正四面体（Tetrahedral，键角 109.5°）',
        'V 形（Bent，键角 104.5°）',
      ],
      correct: 2,
      explanation:
        'CH₄ 中心碳有 4 个成键电子对、0 个孤对电子。4 对电子互相排斥到最远位置形成正四面体，键角为 109.5°。这也是大多数有机物 sp³ 碳的构型，如氨基酸的 α 碳。',
    },
    {
      id: 2,
      type: 'single',
      question: 'CO₂ 分子中 C=O 键是极性键，但整个 CO₂ 分子是非极性分子，原因是？',
      options: [
        'C 和 O 的电负性差异太小，可以忽略',
        'CO₂ 是线形结构，两个 C=O 键偶极矩方向相反、大小相等，完全抵消',
        'CO₂ 中只有 σ 键没有 π 键，所以不产生极性',
        'CO₂ 在水中会生成 H₂CO₃，变成了离子化合物',
      ],
      correct: 1,
      explanation:
        'CO₂ 是线形分子（O=C=O，键角 180°）。两个 C=O 键各有极性（O 吸引电子），但方向完全相反，偶极矩向量之和为零，因此整体非极性。H₂O 的 V 形结构（104.5°）导致两个 O-H 偶极矩不能抵消，整体极性。',
    },
    {
      id: 3,
      type: 'single',
      question: '以下关于手性中心（Chiral Center）的描述，哪条最准确？',
      options: [
        '连接两个相同基团的碳原子',
        '参与双键（C=C）的碳原子',
        '连接四个完全不同基团的碳原子，其分子与镜像不能重合',
        '位于苯环上的碳原子',
      ],
      correct: 2,
      explanation:
        '手性中心（不对称碳）是连接四个完全不同基团的碳原子。由于四面体的立体排列，这样的碳原子使分子具有手性——分子与其镜像（对映体）互不重合，就像左右手的关系。苯环上的碳连接在平面结构中，不能成为手性中心。',
    },
    {
      id: 4,
      type: 'single',
      question: '沙利度胺（Thalidomide）悲剧最重要的化学教训是什么？',
      options: [
        '所有有机药物都有毒，应该使用无机盐替代',
        '同一化学式的分子（同分异构体）活性一定相同',
        '对映体（Enantiomers）虽然化学式相同，但在生物体内可能有完全不同的药理活性和毒性',
        '外消旋体（Racemate）比纯对映体更安全，因为两种效果互相抵消',
      ],
      correct: 2,
      explanation:
        'R-沙利度胺有镇静止吐效果，S-沙利度胺却有强力致畸性。两者化学式完全相同，但三维空间排列不同，与体内手性受体/酶的相互作用完全不同。这正是现代药物开发要求分别评估每种对映体的原因。',
    },
    {
      id: 5,
      type: 'multi',
      question: '以下哪些分子是极性分子？（可多选）',
      options: [
        'H₂O（水，V形结构）',
        'CO₂（二氧化碳，线形结构）',
        'NH₃（氨，三角锥形）',
        'CH₄（甲烷，正四面体）',
        'HCl（氯化氢，双原子）',
      ],
      correct: [0, 2, 4],
      explanation:
        'H₂O（V形，偶极不对称）、NH₃（三角锥形，孤对电子使偶极矩不对称）和 HCl（两个不同原子的双原子分子，必然极性）是极性分子。CO₂（线形，偶极完全抵消）和 CH₄（正四面体，四个相同键的偶极完全抵消）是非极性分子。',
    },
  ],
}
