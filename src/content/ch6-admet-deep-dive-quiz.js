export const ch61QuickCheck = [
  {
    id: 'ch6-q1',
    type: 'single',
    question: '临床药物开发失败中，约多大比例归因于不良 ADMET 性质？',
    options: ['约 10%', '约 25%', '约 40%', '约 70%'],
    answer: 2,
    explanation:
      '历史数据显示约 40% 的临床失败源于不良 ADMET 性质（尤其是 PK 问题），另约 30% 因疗效不足。这也是早期 ADMET 预测备受重视的原因。',
  },
  {
    id: 'ch6-q2',
    type: 'single',
    question: '根据 Lipinski 五规则，以下哪项参数的阈值为 ≤ 5？',
    options: ['分子量（MW）', '脂水分配系数（logP）', '氢键受体（HBA）', '可旋转键（RotBonds）'],
    answer: 1,
    explanation:
      'Lipinski Ro5：MW ≤ 500 Da，logP ≤ 5，HBD ≤ 5，HBA ≤ 10。logP 的阈值恰好是 5（"Rule of Five" 因所有数值均为 5 的倍数而得名）。',
  },
  {
    id: 'ch6-q3',
    type: 'single',
    question: '特非那定（Terfenadine）因与哪类药物发生相互作用而导致心律失常并撤市？',
    options: [
      'CYP2D6 诱导剂（如苯妥英）',
      'CYP3A4 抑制剂（如红霉素、酮康唑）',
      'CYP2C9 抑制剂（如氟康唑）',
      'P-gp 外排泵抑制剂',
    ],
    answer: 1,
    explanation:
      '特非那定是 CYP3A4 底物。红霉素和酮康唑均为 CYP3A4 强抑制剂，合用时抑制代谢，导致特非那定血药浓度骤升，阻断 hERG 钾通道，引发 QT 延长和致命性心律失常。',
  },
  {
    id: 'ch6-q4',
    type: 'multi',
    question: '以下哪些特征有助于药物穿越血脑屏障（BBB）？（多选）',
    options: [
      '分子量 < 450 Da',
      '极性表面积（PSA）< 90 Å²',
      '氢键供体（HBD）≤ 3',
      '分子量 > 800 Da',
      'logP 在 1–3 之间',
    ],
    answer: [0, 1, 2, 4],
    explanation:
      '穿越 BBB 需要分子小、极性低、氢键少（减少与水的相互作用）、适度脂溶性。分子量 >800 Da（选项 D）反而是不利因素。',
  },
  {
    id: 'ch6-q5',
    type: 'single',
    question: 'BCS IV 类药物面临的主要挑战是什么？',
    options: [
      '溶解度高但渗透性低',
      '溶解度低但渗透性高',
      '溶解度和渗透性均低',
      '代谢过快导致半衰期短',
    ],
    answer: 2,
    explanation:
      'BCS（生物药剂学分类系统）IV 类药物同时具有低溶解度和低渗透性，是口服吸收最难改善的类型，往往需要特殊制剂（如纳米粒、自乳化）或换用注射给药。',
  },
]
