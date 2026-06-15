export const ch21QuickCheck = [
  {
    id: 'q1',
    type: 'single',
    question: '肽键（peptide bond）的化学本质是以下哪种官能团？',
    options: [
      { id: 'a', text: '酯键（–COO–）' },
      { id: 'b', text: '酰胺键（–CONH–）' },
      { id: 'c', text: '醚键（–O–）' },
      { id: 'd', text: '亚胺键（–CH=N–）' },
    ],
    correctIds: ['b'],
    explanation:
      '肽键是氨基酸的羧基（–COOH）与另一氨基酸的氨基（–NH₂）缩合脱水形成的酰胺键（–CO–NH–）。酰胺键化学稳定、可形成氢键，是蛋白质骨架的化学基础。',
  },
  {
    id: 'q2',
    type: 'multi',
    question: '以下哪些官能团可以作为氢键供体（H-bond donor）？（多选）',
    options: [
      { id: 'a', text: '羟基 –OH' },
      { id: 'b', text: '醚键 –O–（如 R–O–R）' },
      { id: 'c', text: '伯胺 –NH₂' },
      { id: 'd', text: '羧基 –COOH' },
      { id: 'e', text: '腈基 –C≡N' },
    ],
    correctIds: ['a', 'c', 'd'],
    explanation:
      '氢键供体必须含有直接连接在 N 或 O 上的 H（N–H 或 O–H）。羟基（O–H）、伯胺（N–H₂）和羧基（O–H 部分）均符合条件。醚键的 O 无 H，只能作受体；腈基 C≡N 也无 N–H，只能作受体。',
  },
  {
    id: 'q3',
    type: 'single',
    question: '药物分子中引入氟（F）原子最主要的目的是？',
    options: [
      { id: 'a', text: '增加分子量以改善口服吸收' },
      { id: 'b', text: '阻断 CYP450 代谢位点，提高代谢稳定性' },
      { id: 'c', text: '使药物能穿透血脑屏障' },
      { id: 'd', text: '降低分子亲脂性（logP）使其更亲水' },
    ],
    correctIds: ['b'],
    explanation:
      'C–F 键能（约 130 kcal/mol）远高于 C–H 键（99 kcal/mol），CYP450 难以氧化含 F 位点，因此引入 F 是经典的代谢阻断策略。氟也可微调 logP 和结合构象，但核心用途是代谢稳定性。约 20–25% 的 FDA 批准药物含氟。',
  },
  {
    id: 'q4',
    type: 'single',
    question: '以下哪个杂环是 DNA 中嘧啶碱基（胞嘧啶、胸腺嘧啶）的骨架？',
    options: [
      { id: 'a', text: '咪唑（Imidazole）' },
      { id: 'b', text: '噻吩（Thiophene）' },
      { id: 'c', text: '嘧啶（Pyrimidine）' },
      { id: 'd', text: '吲哚（Indole）' },
    ],
    correctIds: ['c'],
    explanation:
      '嘧啶（pyrimidine）是含 2 个 N 的 6 元芳香杂环，是胞嘧啶（C）、胸腺嘧啶（T）、尿嘧啶（U）的母核。咪唑（组氨酸侧链）、噻吩（含 S 5元环）、吲哚（色氨酸侧链）均为不同杂环。',
  },
  {
    id: 'q5',
    type: 'multi',
    question: '根据 Lipinski 规则，以下哪些基团会被计入氢键供体（HBD）的数量？（多选）',
    options: [
      { id: 'a', text: '苯环上的 C–H' },
      { id: 'b', text: '醇的 O–H（如 –CH₂OH）' },
      { id: 'c', text: '酰胺的 N–H（–CONH–）' },
      { id: 'd', text: '叔胺（–NR₃，N 上无 H）' },
      { id: 'e', text: '苯酚的酚羟基 O–H' },
    ],
    correctIds: ['b', 'c', 'e'],
    explanation:
      'Lipinski 规则中 HBD = "N–H 和 O–H 的数量之和"。醇 O–H、酰胺 N–H 和酚 O–H 均含可供体的 H。C–H 不是 HBD（C 电负性不足以形成典型氢键）；叔胺 N 上没有 H，只能作受体（HBA）而非供体。',
  },
]
