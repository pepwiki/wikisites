---
document_id: KI-CONCEPTS-001
title: "Cross-Lingual Knowledge Integration — Concept Mappings"
version: "1.0.0"
date: "2026-06-07"
status: APPROVED
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1.25 Cross-Lingual Knowledge Integration"
source_papers:
  - YP-CHEM-OLIGO-001
  - YP-BIO-OLIGO-001
  - YP-EDU-CONTENT-001
  - YP-WEB-TECH-001
---

# Cross-Lingual Knowledge Integration — Concept Mappings

**Document ID:** KI-CONCEPTS-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** APPROVED

---

## Table of Contents

1. [Overview](#1-overview)
2. [Amino Acid Concepts](#2-amino-acid-concepts)
3. [Peptide Bond and Structural Concepts](#3-peptide-bond-and-structural-concepts)
4. [Receptor and Binding Concepts](#4-receptor-and-binding-concepts)
5. [Pharmacokinetic Concepts](#5-pharmacokinetic-concepts)
6. [Biosynthesis Concepts](#6-biosynthesis-concepts)
7. [Educational Framework Concepts](#7-educational-framework-concepts)
8. [Technology Concepts](#8-technology-technology-concepts)
9. [Concept Dependency Graph](#9-concept-dependency-graph)
10. [Implementation Notes](#10-implementation-notes)

---

## 1. Overview

This document provides a detailed concept mapping table for 53+ oligopeptide-related concepts across six languages (EN, ZH, RU, DE, FR, JP). Each entry includes:

- **Concept ID**: Unique identifier for cross-referencing
- **Canonical English term**: Authoritative English definition
- **Translations**: Verified translations in all six languages
- **Confidence**: 1-5 score based on source verification
- **Source**: Primary authoritative source(s)
- **Invariant elements**: Whether the concept includes language-invariant elements

---

## 2. Amino Acid Concepts

| Concept ID | EN                     | ZH                | RU                             | DE                      | FR                        | JP                        | Confidence | Source           |
| ---------- | ---------------------- | ----------------- | ------------------------------ | ----------------------- | ------------------------- | ------------------------- | ---------- | ---------------- |
| AA-001     | Glycine (G, Gly)       | 甘氨酸 (G, Gly)   | Глицин (G, Gly)                | Glycin (G, Gly)         | Glycine (G, Gly)          | グリシン (G, Gly)         | 5          | IUPAC-IUB (1991) |
| AA-002     | Alanine (A, Ala)       | 丙氨酸 (A, Ala)   | Аланин (A, Ala)                | Alanin (A, Ala)         | Alanine (A, Ala)          | アラニン (A, Ala)         | 5          | IUPAC-IUB (1991) |
| AA-003     | Valine (V, Val)        | 缬氨酸 (V, Val)   | Валин (V, Val)                 | Valin (V, Val)          | Valine (V, Val)           | バリン (V, Val)           | 5          | IUPAC-IUB (1991) |
| AA-004     | Leucine (L, Leu)       | 亮氨酸 (L, Leu)   | Лейцин (L, Leu)                | Leucin (L, Leu)         | Leucine (L, Leu)          | ロイシン (L, Leu)         | 5          | IUPAC-IUB (1991) |
| AA-005     | Isoleucine (I, Ile)    | 异亮氨酸 (I, Ile) | Изолейцин (I, Ile)             | Isoleucin (I, Ile)      | Isoleucine (I, Ile)       | イソロイシン (I, Ile)     | 5          | IUPAC-IUB (1991) |
| AA-006     | Proline (P, Pro)       | 脯氨酸 (P, Pro)   | Пролин (P, Pro)                | Prolin (P, Pro)         | Proline (P, Pro)          | プロリン (P, Pro)         | 5          | IUPAC-IUB (1991) |
| AA-007     | Phenylalanine (F, Phe) | 苯丙氨酸 (F, Phe) | Фенилаланин (F, Phe)           | Phenylalanin (F, Phe)   | Phénylalanine (F, Phe)    | フェニルアラニン (F, Phe) | 5          | IUPAC-IUB (1991) |
| AA-008     | Tryptophan (W, Trp)    | 色氨酸 (W, Trp)   | Триптофан (W, Trp)             | Tryptophan (W, Trp)     | Tryptophane (W, Trp)      | トリプトファン (W, Trp)   | 5          | IUPAC-IUB (1991) |
| AA-009     | Methionine (M, Met)    | 蛋氨酸 (M, Met)   | Метионин (M, Met)              | Methionin (M, Met)      | Méthionine (M, Met)       | メチオニン (M, Met)       | 5          | IUPAC-IUB (1991) |
| AA-010     | Serine (S, Ser)        | 丝氨酸 (S, Ser)   | Серин (S, Ser)                 | Serin (S, Ser)          | Sérine (S, Ser)           | セリン (S, Ser)           | 5          | IUPAC-IUB (1991) |
| AA-011     | Threonine (T, Thr)     | 苏氨酸 (T, Thr)   | Треонин (T, Thr)               | Threonin (T, Thr)       | Thréonine (T, Thr)        | スレオニン (T, Thr)       | 5          | IUPAC-IUB (1991) |
| AA-012     | Cysteine (C, Cys)      | 半胱氨酸 (C, Cys) | Цистеин (C, Cys)               | Cystein (C, Cys)        | Cystéine (C, Cys)         | システイン (C, Cys)       | 5          | IUPAC-IUB (1991) |
| AA-013     | Tyrosine (Y, Tyr)      | 酪氨酸 (Y, Tyr)   | Тирозин (Y, Tyr)               | Tyrosin (Y, Tyr)        | Tyrosine (Y, Tyr)         | チロシン (Y, Tyr)         | 5          | IUPAC-IUB (1991) |
| AA-014     | Histidine (H, His)     | 组氨酸 (H, His)   | Гистидин (H, His)              | Histidin (H, His)       | Histidine (H, His)        | ヒスチジン (H, His)       | 5          | IUPAC-IUB (1991) |
| AA-015     | Aspartic acid (D, Asp) | 天冬氨酸 (D, Asp) | Аспарагиновая кислота (D, Asp) | Asparaginsäure (D, Asp) | Acide aspartique (D, Asp) | アスパラギン酸 (D, Asp)   | 5          | IUPAC-IUB (1991) |
| AA-016     | Glutamic acid (E, Glu) | 谷氨酸 (E, Glu)   | Глутаминовая кислота (E, Glu)  | Glutaminsäure (E, Glu)  | Acide glutamique (E, Glu) | グルタミン酸 (E, Glu)     | 5          | IUPAC-IUB (1991) |
| AA-017     | Asparagine (N, Asn)    | 天冬酰胺 (N, Asn) | Аспарагин (N, Asn)             | Asparagin (N, Asn)      | Asparagine (N, Asn)       | アスパラギン (N, Asn)     | 5          | IUPAC-IUB (1991) |
| AA-018     | Glutamine (Q, Gln)     | 谷氨酰胺 (Q, Gln) | Глутамин (Q, Gln)              | Glutamin (Q, Gln)       | Glutamine (Q, Gln)        | グルタミン (Q, Gln)       | 5          | IUPAC-IUB (1991) |
| AA-019     | Lysine (K, Lys)        | 赖氨酸 (K, Lys)   | Лизин (K, Lys)                 | Lysin (K, Lys)          | Lysine (K, Lys)           | リシン (K, Lys)           | 5          | IUPAC-IUB (1991) |
| AA-020     | Arginine (R, Arg)      | 精氨酸 (R, Arg)   | Аргинин (R, Arg)               | Arginin (R, Arg)        | Arginine (R, Arg)         | アルギニン (R, Arg)       | 5          | IUPAC-IUB (1991) |

---

## 3. Peptide Bond and Structural Concepts

| Concept ID | EN                        | ZH             | RU                             | DE                           | FR                              | JP                           | Confidence | Source                                  |
| ---------- | ------------------------- | -------------- | ------------------------------ | ---------------------------- | ------------------------------- | ---------------------------- | ---------- | --------------------------------------- |
| PB-001     | Peptide bond              | 肽键           | пептидная связь                | Peptidbindung                | Liaison peptidique              | ペプチド結合                 | 5          | IUPAC-IUB (1991), Lehmann & Palm (1986) |
| PB-002     | Peptide bond resonance    | 肽键共振       | резонанс пептидной связи       | Peptidbindungsresonanz       | Résonance de liaison peptidique | ペプチド結合共鳴             | 5          | Standard chemistry                      |
| PB-003     | Trans peptide bond        | 反式肽键       | транс-пептидная связь          | trans-Peptidbindung          | Liaison peptidique trans        | トランスペプチド結合         | 5          | Standard chemistry                      |
| PB-004     | Cis peptide bond          | 顺式肽键       | цис-пептидная связь            | cis-Peptidbindung            | Liaison peptidique cis          | シスペプチド結合             | 5          | Standard chemistry                      |
| PB-005     | Peptide bond formation    | 肽键形成       | образование пептидной связи    | Peptidbindungsbildung        | Formation de liaison peptidique | ペプチド結合形成             | 5          | Standard chemistry                      |
| PB-006     | Condensation reaction     | 缩合反应       | реакция конденсации            | Kondensationsreaktion        | Réaction de condensation        | コンデンセーション反応       | 5          | Standard chemistry                      |
| PB-007     | Water molecule release    | 水分子释放     | высвобождение молекулы воды    | Wassermolekül-Freisetzung    | Libération de molécule d'eau    | 水分子放出                   | 5          | Standard chemistry                      |
| PB-008     | Backbone structure        | 骨架结构       | структура основы               | Grundgerüststruktur          | Structure de squelette          | バックボーン構造             | 5          | Standard chemistry                      |
| PB-009     | N-terminus                | N-末端         | N-конец                        | N-Terminus                   | Extrémité N                     | N末端                        | 5          | IUPAC-IUB (1991) — Invariant            |
| PB-010     | C-terminus                | C-末端         | C-конец                        | C-Terminus                   | Extrémité C                     | C末端                        | 5          | IUPAC-IUB (1991) — Invariant            |
| PB-011     | Alpha carbon              | α-碳           | α-углерод                      | α-Kohlenstoff                | Carbone α                       | α-炭素                       | 5          | IUPAC-IUB (1991)                        |
| PB-012     | Side chain                | 侧链           | боковая цепь                   | Seitenkette                  | Chaîne latérale                 | 側鎖                         | 5          | Standard chemistry                      |
| PB-013     | Primary structure         | 一级结构       | первичная структура            | Primärstruktur               | Structure primaire              | プライマリーストラクチャー   | 5          | Standard chemistry                      |
| PB-014     | Secondary structure       | 二级结构       | вторичная структура            | Sekundärstruktur             | Structure secondaire            | セカンダリーストラクチャー   | 5          | Standard chemistry                      |
| PB-015     | Tertiary structure        | 三级结构       | третичная структура            | Tertiärstruktur              | Structure tertiaire             | テルティアリーストラクチャー | 5          | Standard chemistry                      |
| PB-016     | Alpha helix               | α-螺旋         | α-спираль                      | α-Helix                      | Hélice α                        | α-ヘリックス                 | 5          | Pauling & Corey (1951)                  |
| PB-017     | Beta sheet                | β-折叠         | β-лист                         | β-Faltblatt                  | Feuillet β                      | β-シート                     | 5          | Pauling & Corey (1951)                  |
| PB-018     | Beta turn                 | β-转角         | β-оборот                       | β-Kehre                      | Tour β                          | β-ターン                     | 5          | Chou & Fasman (1974)                    |
| PB-019     | Hydrogen bond             | 氢键           | водородная связь               | Wasserstoffbrückbindung      | Liaison hydrogène               | 水素結合                     | 5          | Standard chemistry                      |
| PB-020     | Hydrophobic effect        | 疏水效应       | гидрофобный эффект             | Hydrophobischer Effekt       | Effet hydrophobe                | 疏水効果                     | 5          | Tanford (1980)                          |
| PB-021     | Disulfide bond            | 二硫键         | дисульфидная связь             | Disulfidbrücke               | Pont disulfure                  | ジスルフィド結合             | 5          | Standard chemistry                      |
| PB-022     | Ramachandran plot         | 拉氏图         | график Рамачандрана            | Ramachandran-Diagramm        | Diagramme de Ramachandran       | ラマチャンドランプロット     | 5          | Ramachandran et al. (1963)              |
| PB-023     | Van der Waals interaction | 范德华相互作用 | взаимодействие Ван-дер-Ваальса | Van-der-Waals-Wechselwirkung | Interaction de Van der Waals    | ファンデルワールス相互作用   | 5          | Standard chemistry                      |
| PB-024     | Salt bridge               | 盐桥           | солевой мост                   | Salzbrücke                   | Pont salin                      | 塩橋                         | 5          | Standard chemistry                      |
| PB-025     | Molecular weight          | 分子量         | молекулярная масса             | Molekulargewicht             | Poids moléculaire               | 分子量                       | 5          | IUPAC                                   |
| PB-026     | Monoisotopic mass         | 单同位素质量   | моноизотопная масса            | Monoisotopische Masse        | Masse monoisotopique            | 単同位体質量                 | 5          | Standard MS                             |
| PB-027     | Average mass              | 平均质量       | средняя масса                  | Durchschnittliche masse      | Masse moyenne                   | 平均質量                     | 5          | Standard MS                             |
| PB-028     | Isoelectric point         | 等电点         | изоэлектрическая точка         | Isoelektrischer Punkt        | Point isoélectrique             | 等電点                       | 5          | Bjellqvist et al. (1994)                |
| PB-029     | Net charge                | 净电荷         | заряд                          | Nettoladung                  | Charge nette                    | 正味電荷                     | 5          | Standard chemistry                      |
| PB-030     | Extinction coefficient    | 消光系数       | коэффициент экстинкции         | Extinktionskoeffizient       | Coefficient d'extinction        | 消光係数                     | 5          | Pace et al. (1995)                      |
| PB-031     | Hydrophobicity index      | 疏水指数       | гидрофобный индекс             | Hydrophobitätsindex          | Indice d'hydrophobicité         | 疏水性指数                   | 5          | Kyte & Doolittle (1982)                 |
| PB-032     | Dipeptide                 | 二肽           | дипептид                       | Dipeptid                     | Dipeptide                       | 二ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-033     | Tripeptide                | 三肽           | трипептид                      | Tripeptid                    | Tripeptide                      | 三ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-034     | Tetrapeptide              | 四肽           | тетрапептид                    | Tetrapeptid                  | Tétrapeptide                    | 四ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-035     | Pentapeptide              | 五肽           | пентапептид                    | Pentapeptid                  | Pentapeptide                    | 五ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-036     | Hexapeptide               | 六肽           | гексапептид                    | Hexapeptid                   | Hexapeptide                     | 六ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-037     | Heptapeptide              | 七肽           | гептапептид                    | Heptapeptid                  | Heptapeptide                    | 七ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-038     | Octapeptide               | 八肽           | октапептид                     | Octapeptid                   | Octapeptide                     | 八ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-039     | Nonapeptide               | 九肽           | нонапептид                     | Nonapeptid                   | Nonapeptide                     | 九ペプチド                   | 5          | IUPAC-IUB (1991)                        |
| PB-040     | Decapeptide               | 十肽           | декапептид                     | Decapeptid                   | Décapeptide                     | 十ペプチド                   | 5          | IUPAC-IUB (1991)                        |

---

## 4. Receptor and Binding Concepts

| Concept ID | EN                                    | ZH              | RU                              | DE                                   | FR                                       | JP                     | Confidence | Source                     |
| ---------- | ------------------------------------- | --------------- | ------------------------------- | ------------------------------------ | ---------------------------------------- | ---------------------- | ---------- | -------------------------- |
| RB-001     | Receptor                              | 受体            | рецептор                        | Rezeptor                             | Récepteur                                | 受容体                 | 5          | IUPHAR                     |
| RB-002     | Ligand                                | 配体            | лиганд                          | Ligand                               | Ligand                                   | リガンド               | 5          | IUPHAR                     |
| RB-003     | Receptor-ligand complex               | 受体-配体复合物 | комплекс рецептор-лиганд        | Rezeptor-Ligand-Komplex              | Complexe récepteur-ligand                | 受容体-リガンド複合体  | 5          | IUPHAR                     |
| RB-004     | Binding affinity                      | 结合亲和力      | сродство связывания             | Bindungsaffinität                    | Affinité de liaison                      | 結合親和性             | 5          | Kenakin (2018)             |
| RB-005     | Dissociation constant                 | 解离常数        | константа диссоциации           | Dissoziationskonstante               | Constante de dissociation                | 解離定数               | 5          | Standard                   |
| RB-006     | Association constant                  | 结合常数        | константа ассоциации            | Assoziationskonstante                | Constante d'association                  | 結合定数               | 5          | Standard                   |
| RB-007     | Inhibition constant                   | 抑制常数        | константа торможения            | Inhibitionskonstante                 | Constante d'inhibition                   | 阻害定数               | 5          | Standard                   |
| RB-008     | Half-maximal inhibitory concentration | 半数抑制浓度    | IC₅₀                            | Halbmaximale Hemmkonzentration       | Concentration inhibitrice médiane (CI₅₀) | 半数阻害濃度 (IC₅₀)    | 5          | Standard — Invariant: IC₅₀ |
| RB-009     | Half-maximal effective concentration  | 半数有效浓度    | EC₅₀                            | Halbmaximale effektive Konzentration | Concentration efficace médiane (CE₅₀)    | 半数効果濃度 (EC₅₀)    | 5          | Standard — Invariant: EC₅₀ |
| RB-010     | Maximum binding capacity              | 最大结合容量    | максимальная ёмкость связывания | Maximale Bindungskapazität           | Capacité de liaison maximale             | 最大結合容量           | 5          | Standard                   |
| RB-011     | G-protein coupled receptor            | G蛋白偶联受体   | G-белок-связанный рецептор      | G-Protein-gekoppelter Rezeptor       | Récepteur couplé aux protéines G         | Gタンパク質共役受容体  | 5          | IUPHAR                     |
| RB-012     | Receptor tyrosine kinase              | 受体酪氨酸激酶  | рецепторная тирозинкиназа       | Rezeptor-Tyrosinkinase               | Récepteur tyrosine kinase                | チロシンキナーゼ受容体 | 5          | IUPHAR                     |
| RB-013     | Ion channel                           | 离子通道        | ионный канал                    | Ionenkanal                           | Canal ionique                            | イオンチャネル         | 5          | Standard                   |
| RB-014     | Selectivity                           | 选择性          | избирательность                 | Selektivität                         | Sélectivité                              | 選択性                 | 5          | Kenakin (2018)             |
| RB-015     | Specificity                           | 特异性          | специфичность                   | Spezifität                           | Spécificité                              | 特異性                 | 5          | Kenakin (2018)             |
| RB-016     | Cross-reactivity                      | 交叉反应        | перекрёстная реактивность       | Kreuzreaktivität                     | Réactivité croisée                       | 交差反応               | 5          | Standard                   |
| RB-017     | Therapeutic window                    | 治疗窗          | терапевтическое окно            | Therapeutisches Fenster              | Fenêtre thérapeutique                    | 治療ウィンドウ         | 5          | Standard                   |
| RB-018     | Cooperativity                         | 协同性          | кооперативность                 | Kooperativität                       | Coopérativité                            | 協同性                 | 5          | Standard                   |
| RB-019     | Hill coefficient                      | 希尔系数        | коэффициент Хилла               | Hill-Koeffizient                     | Coefficient de Hill                      | ヒル係数               | 5          | Hill (1910)                |
| RB-020     | Law of mass action                    | 质量作用定律    | закон массового действия        | Massenwirkungsgesetz                 | Loi d'action de masse                    | 質量作用の法則         | 5          | Standard                   |

---

## 5. Pharmacokinetic Concepts

| Concept ID | EN                            | ZH            | RU                                 | DE                           | FR                                 | JP               | Confidence | Source                 |
| ---------- | ----------------------------- | ------------- | ---------------------------------- | ---------------------------- | ---------------------------------- | ---------------- | ---------- | ---------------------- |
| PK-001     | Pharmacokinetics              | 药代动力学    | фармакокинетика                    | Pharmakokinetik              | Pharmacocinétique                  | 薬物動態学       | 5          | Rowland & Tozer (2011) |
| PK-002     | Pharmacodynamics              | 药效学        | фармакодинамика                    | Pharmakodynamik              | Pharmacodynamie                    | 薬力学           | 5          | Rowland & Tozer (2011) |
| PK-003     | Absorption                    | 吸收          | абсорбция                          | Absorption                   | Absorption                         | 吸収             | 5          | Standard               |
| PK-004     | Distribution                  | 分布          | распределение                      | Distribution                 | Distribution                       | 分布             | 5          | Standard               |
| PK-005     | Metabolism                    | 代谢          | метаболизм                         | Metabolismus                 | Métabolisme                        | 代謝             | 5          | Standard               |
| PK-006     | Excretion                     | 排泄          | экскреция                          | Elimination                  | Excrétion                          | 排泄             | 5          | Standard               |
| PK-007     | Bioavailability               | 生物利用度    | биодоступность                     | Bioverfügbarkeit             | Biodisponibilité                   | 生物利用能       | 5          | Standard               |
| PK-008     | Half-life                     | 半衰期        | период полураспада                 | Halbwertszeit                | Demi-vie                           | 半減期           | 5          | Standard               |
| PK-009     | Clearance                     | 清除率        | клиренс                            | Clearance                    | Clearance                          | クリアランス     | 5          | Standard — Loanword    |
| PK-010     | Volume of distribution        | 分布容积      | объём распределения                | Verteilungsvolumen           | Volume de distribution             | 分布容積         | 5          | Standard               |
| PK-011     | Maximum plasma concentration  | 最大血浆浓度  | максимальная концентрация в плазме | Maximale Plasmakonzentration | Concentration plasmatique maximale | 最大血中濃度     | 5          | Standard               |
| PK-012     | Time to maximum concentration | 达峰时间      | время достижения Cmax              | Zeit bis zur Cmax            | Temps pour atteindre Cmax          | ピーク到達時間   | 5          | Standard               |
| PK-013     | Area under the curve          | 曲线下面积    | площадь под кривой                 | Fläche unter der Kurve       | Aire sous la courbe                | 曲線下面積       | 5          | Standard               |
| PK-014     | Steady-state concentration    | 稳态浓度      | равновесная концентрация           | Gleichgewichtskonzentration  | Concentration à l'état d'équilibre | 定常状態濃度     | 4          | Standard               |
| PK-015     | Protein binding               | 蛋白结合      | связывание с белками               | Proteinbindung               | Liaison aux protéines              | タンパク質結合   | 5          | Standard               |
| PK-016     | First-pass metabolism         | 首过效应      | эффект первого прохождения         | First-Pass-Effekt            | Effet de premier passage           | 首過効果         | 5          | Standard               |
| PK-017     | Renal clearance               | 肾清除率      | почечный клиренс                   | Nieren-Clearance             | Clearance rénal                    | 腎クリアランス   | 5          | Standard               |
| PK-018     | Blood-brain barrier           | 血脑屏障      | гематоэнцефалический барьер        | Blut-Hirn-Schranke           | Barrière hémato-encéphalique       | 血液脳関門       | 5          | Standard               |
| PK-019     | Therapeutic index             | 治疗指数      | терапевтический индекс             | Therapeutischer Index        | Index thérapeutique                | 治療指数         | 5          | Standard               |
| PK-020     | Dose-response relationship    | 剂量-反应关系 | зависимость доза-эффект            | Dosis-Wirkungs-Beziehung     | Relation dose-effet                | 用量-反応関係    | 5          | Tallarida (2001)       |
| PK-021     | Hill equation                 | 希尔方程      | уравнение Хилла                    | Hill-Gleichung               | Équation de Hill                   | ヒルの方程式     | 5          | Hill (1910)            |
| PK-022     | Maximum effect                | 最大效应      | максимальный эффект                | Maximaler Effekt             | Effet maximal                      | 最大効果         | 5          | Standard               |
| PK-023     | Baseline effect               | 基线效应      | базовый эффект                     | Basiseffekt                  | Effet de base                      | ベースライン効果 | 5          | Standard               |
| PK-024     | Toxic dose 50%                | 半数中毒剂量  | токсическая доза 50%               | Toxische Dose 50%            | Dose toxique médiane (DT₅₀)        | 半数中毒用量     | 5          | Standard               |
| PK-025     | Effective dose 50%            | 半数有效剂量  | эффективная доза 50%               | Effektive Dose 50%           | Dose efficace médiane (DE₅₀)       | 半数有効用量     | 5          | Standard               |
| PK-026     | Enterohepatic circulation     | 肠肝循环      | энтерогепатическая цirkulation     | Enterohepatischer Kreislauf  | Circulation entérohépatique        | 腸肝循環         | 5          | Standard               |
| PK-027     | PEGylation                    | PEG化         | пегилирование                      | PEGylierung                  | Pégélation                         | PEG化            | 5          | Standard — Invariant   |
| PK-028     | Half-life extension           | 延长半衰期    | удлинение периода полураспада      | Halbwertszeitverlängerung    | Prolongation de la demi-vie        | 半減期延長       | 5          | Standard               |

---

## 6. Biosynthesis Concepts

| Concept ID | EN                                                                | ZH                       | RU                                                                    | DE                                                     | FR                                                                       | JP                               | Confidence | Source                 |
| ---------- | ----------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ | -------------------------------- | ---------- | ---------------------- |
| BS-001     | Biosynthesis                                                      | 生物合成                 | биосинтез                                                             | Biosynthese                                            | Biosynthèse                                                              | 生物合成                         | 5          | Standard               |
| BS-002     | Ribosomal synthesis                                               | 核糖体合成               | рибосомальный синтез                                                  | Ribosomale Synthese                                    | Synthèse ribosomale                                                      | リボソーム合成                   | 5          | Arnison et al. (2013)  |
| BS-003     | Non-ribosomal peptide synthesis                                   | 非核糖体肽合成           | нерибосомальный пептидный синтез                                      | Nicht-ribosomale Peptidsynthese                        | Synthèse peptidique non ribosomale                                       | 非リボソームペプチド合成         | 4          | Marahiel et al. (1997) |
| BS-004     | Transcription                                                     | 转录                     | транскрипция                                                          | Transkription                                          | Transcription                                                            | 転錄                             | 5          | Standard               |
| BS-005     | Translation                                                       | 翻译                     | трансляция                                                            | Translation                                            | Traduction                                                               | 翻訳                             | 5          | Standard               |
| BS-006     | Post-translational modification                                   | 翻译后修饰               | посттрансляционная модификация                                        | Posttranslationale Modifikation                        | Modification post-traductionnelle                                        | 翻訳後修飾                       | 5          | Standard               |
| BS-007     | Signal peptide                                                    | 信号肽                   | сигнальный пептид                                                     | Signalpeptid                                           | Peptide signal                                                           | シグナルペプチド                 | 5          | Standard               |
| BS-008     | Propeptide                                                        | 前肽                     | пропептид                                                             | Propeptid                                              | Propeptide                                                               | プロペプチド                     | 5          | Standard               |
| BS-009     | Mature peptide                                                    | 成熟肽                   | зрелый пептид                                                         | Reifes Peptid                                          | Peptide mature                                                           | 成熟ペプチド                     | 5          | Standard               |
| BS-010     | Precursor peptide                                                 | 前体肽                   | прекурсорный пептид                                                   | Vorläuferpeptid                                        | Peptide précurseur                                                       | 前駆ペプチド                     | 5          | Standard               |
| BS-011     | Adenylation domain                                                | 腺苷化结构域             | аденилационный домен                                                  | Adenylierungsdomäne                                    | Domaine d'adénylation                                                    | アデニル化ドメイン               | 4          | Marahiel et al. (1997) |
| BS-012     | Thiolation domain                                                 | 硫醇化结构域             | тиолационный домен                                                    | Thiolierungsdomäne                                     | Domaine de thiolation                                                    | チオール化ドメイン               | 4          | Marahiel et al. (1997) |
| BS-013     | Condensation domain                                               | 缩合结构域               | конденсационный домен                                                 | Kondensationsdomäne                                    | Domaine de condensation                                                  | コンデンセーションドメイン       | 4          | Marahiel et al. (1997) |
| BS-014     | Phosphorylation                                                   | 磷酸化                   | фосфорилирование                                                      | Phosphorylierung                                       | Phosphorylation                                                          | リン酸化                         | 5          | Standard               |
| BS-015     | Glycosylation                                                     | 糖基化                   | гликозилирование                                                      | Glykosylierung                                         | Glycosylation                                                            | 糖鎖付加                         | 5          | Standard               |
| BS-016     | Hydroxylation                                                     | 羟基化                   | гидроксилирование                                                     | Hydroxylierung                                         | Hydroxylation                                                            | ヒドロキシ化                     | 5          | Standard               |
| BS-017     | Acetylation                                                       | 乙酰化                   | ацетилирование                                                        | Acetylierung                                           | Acétylation                                                              | アセチル化                       | 5          | Standard               |
| BS-018     | Amidation                                                         | 酰胺化                   | амидирование                                                          | Amidierung                                             | Amidation                                                                | アミド化                         | 5          | Standard               |
| BS-019     | Disulfide bond formation                                          | 二硫键形成               | образование дисульфидных связей                                       | Disulfidbrückenbildung                                 | Formation de ponts disulfures                                            | ジスルフィド結合形成             | 5          | Standard               |
| BS-020     | Ribosomally synthesized and post-translationally modified peptide | 核糖体合成的翻译后修饰肽 | рибосомально синтезированный пептид с посттрансляционной модификацией | Ribosomales und posttranslational modifiziertes Peptid | Peptide synthétisé par les ribosomes et modifié post-traductionnellement | リボソーム合成翻訳後修飾ペプチド | 4          | Arnison et al. (2013)  |

---

## 7. Educational Framework Concepts

| Concept ID | EN                           | ZH           | RU                               | DE                               | FR                              | JP                 | Confidence | Source                      |
| ---------- | ---------------------------- | ------------ | -------------------------------- | -------------------------------- | ------------------------------- | ------------------ | ---------- | --------------------------- |
| ED-001     | Spaced repetition            | 间隔重复     | интервальное повторение          | Abständiges Wiederholen          | Répétition espacée              | 間隔反復           | 4          | Ebbinghaus (1885)           |
| ED-002     | Forgetting curve             | 遗忘曲线     | кривая забывания                 | Vergessenskurve                  | Courbe de l'oubli               | 忘却曲線           | 5          | Ebbinghaus (1885)           |
| ED-003     | Cognitive load               | 认知负荷     | когнитивная нагрузка             | Kognitive Belastung              | Charge cognitive                | 課題負荷           | 4          | Sweller (2011)              |
| ED-004     | Intrinsic cognitive load     | 内在认知负荷 | внутренняя когнитивная нагрузка  | Intrinsische kognitive Belastung | Charge cognitive intrinsèque    | 内的課題負荷       | 4          | Sweller (2011)              |
| ED-005     | Extraneous cognitive load    | 外在认知负荷 | внешняя когнитивная нагрузка     | Extrinsische kognitive Belastung | Charge cognitive extrinsèque    | 外的課題負荷       | 4          | Sweller (2011)              |
| ED-006     | Germane cognitive load       | 关联认知负荷 | релевантная когнитивная нагрузка | Germane kognitive Belastung      | Charge cognitive germane        | 有関課題負荷       | 3          | Sweller (2011)              |
| ED-007     | Learning objective           | 学习目标     | учебная цель                     | Lernziel                         | Objectif d'apprentissage        | 学習目標           | 5          | Bloom (1956)                |
| ED-008     | Prerequisite                 | 先决条件     | предварительное требование       | Voraussetzung                    | Prérequis                       | 前提条件           | 5          | Standard                    |
| ED-009     | Bloom's taxonomy             | 布鲁姆分类学 | таксономия Блума                 | Bloom-Taxonomie                  | Taxonomie de Bloom              | ブルームの分類法   | 4          | Anderson & Krathwohl (2001) |
| ED-010     | Item response theory         | 项目反应理论 | теория отклика элементов         | Item-Response-Theorie            | Théorie de réponse à l'item     | 項目反応理論       | 3          | de Ayala (2009)             |
| ED-011     | Zone of proximal development | 最近发展区   | зона ближайшего развития         | Zone der proximalen Entwicklung  | Zone proximale de développement | 発達の近接領域     | 5          | Vygotsky (1978)             |
| ED-012     | Formative assessment         | 形成性评估   | формативная оценка               | Formatives Assessment            | Évaluation formative            | 診断的評価         | 4          | Standard                    |
| ED-013     | Summative assessment         | 总结性评估   | суммативная оценка               | Summatives Assessment            | Évaluation sommative            | 総合的評価         | 4          | Standard                    |
| ED-014     | Active recall                | 主动回忆     | активное вспоминание             | Aktives Abrufen                  | Rappel actif                    | 能動的想起         | 4          | Roediger & Karpicke (2006)  |
| ED-015     | Schema construction          | 图式构建     | конструирование схем             | Schema-Konstruktion              | Construction de schéma          | スキーマ構築       | 4          | Piaget (Standard)           |
| ED-016     | Desirable difficulties       | 忧性困难     | желательные трудности            | Erwünschte Schwierigkeiten       | Difficultés souhaitables        | 望ましい困難       | 4          | Bjork (1994)                |
| ED-017     | Multimedia principle         | 多媒体原理   | принцип мультимедиа              | Multimedia-Prinzip               | Principe multimédia             | マルチメディア原理 | 4          | Mayer (2009)                |
| ED-018     | Spacing effect               | 间隔效应     | эффект интервалов                | Abstandseffekt                   | Effet d'espacement              | 間隔効果           | 5          | Cepeda et al. (2006)        |
| ED-019     | Testing effect               | 测试效应     | эффект тестирования              | Testeffekt                       | Effet de test                   | テスト効果         | 5          | Roediger & Karpicke (2006)  |
| ED-020     | Retrieval practice           | 检索练习     | практика извлечения              | Abrufübung                       | Pratique de rappel              | 想起練習           | 5          | Standard                    |

---

## 8. Technology Concepts

| Concept ID | EN                       | ZH           | RU                                         | DE                             | FR                             | JP                             | Confidence | Source                       |
| ---------- | ------------------------ | ------------ | ------------------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ | ---------- | ---------------------------- |
| TC-001     | Static site generation   | 静态站点生成 | статическая генерация сайтов               | Statische Seitengenerierung    | Génération de site statique    | 静的サイト生成                 | 4          | Standard                     |
| TC-002     | Server-side rendering    | 服务端渲染   | серверный рендеринг                        | Serverseitige Rendition        | Rendu côté serveur             | サーバーサイドレンダリング     | 5          | Standard                     |
| TC-003     | Client-side rendering    | 客户端渲染   | клиентский рендеринг                       | Clientseitige Rendition        | Rendu côté client              | クライアントサイドレンダリング | 5          | Standard                     |
| TC-004     | Islands architecture     | 岛屿架构     | островная архитектура                      | Inselarchitektur               | Architecture en îles           | アーキテクチャ                 | 3          | Astro (2024)                 |
| TC-005     | Selective hydration      | 选择性水合   | избирательная гидратация                   | Selektive Hydrierung           | Hydratation sélective          | 選択的ハイドレーション         | 3          | Astro (2024)                 |
| TC-006     | Content collections      | 内容集合     | коллекции контента                         | Inhaltskollektionen            | Collections de contenu         | コンテンツコレクション         | 3          | Astro (2024)                 |
| TC-007     | Fine-grained reactivity  | 细粒度响应式 | реактивность мелкого гранулярного масштаба | Feingranulare Reaktivität      | Réactivité à granularité fine  | 細粒度リアクティビティ         | 4          | SolidJS (2024)               |
| TC-008     | Signal                   | 信号         | сигнал                                     | Signal                         | Signal                         | シグナル                       | 5          | SolidJS (2024)               |
| TC-009     | Memo                     | 记忆         | мемо                                       | Memo                           | Memo                           | メモ                           | 5          | SolidJS (2024)               |
| TC-010     | Effect                   | 效应         | эффект                                     | Effekt                         | Effet                          | エフェクト                     | 5          | SolidJS (2024)               |
| TC-011     | Store                    | 存储         | хранилище                                  | Speicher                       | Magasin                        | ストア                         | 5          | SolidJS (2024)               |
| TC-012     | Edge computing           | 边缘计算     | граничные вычисления                       | Edge-Computing                 | Informatique en périphérie     | エッジコンピューティング       | 4          | Standard                     |
| TC-013     | Key-value store          | 键值存储     | хранилище ключ-значение                    | Schlüssel-Wert-Speicher        | Magasin clé-valeur             | キーバリューストレージ         | 4          | Standard                     |
| TC-014     | Object storage           | 对象存储     | объектное хранилище                        | Objektspeicher                 | Magasin d'objets               | オブジェクトストレージ         | 5          | Standard                     |
| TC-015     | Content delivery network | 内容分发网络 | сеть доставки контента                     | Inhaltsbereitstellungsnetzwerk | Réseau de diffusion de contenu | コンテンツ配信ネットワーク     | 5          | Standard                     |
| TC-016     | Core Web Vitals          | 核心网页指标 | основные веб-показатели                    | Core Web Vitals                | Core Web Vitals                | コアウェブバイタル             | 5          | Google (Invariant)           |
| TC-017     | Bundle splitting         | 打包拆分     | разделение сборки                          | Bundle-Aufteilung              | Découpage de bundle            | バンドル分割                   | 3          | Standard                     |
| TC-018     | Search index             | 搜索索引     | поисковый индекс                           | Suchindex                      | Index de recherche             | 検索インデックス               | 5          | Standard                     |
| TC-019     | Inverted index           | 倒排索引     | инвертированный индекс                     | Invertierter Index             | Index inversé                  | 転置索引                       | 5          | Standard                     |
| TC-020     | BM25                     | BM25         | BM25                                       | BM25                           | BM25                           | BM25                           | 5          | Robertson (2009) — Invariant |
| TC-021     | Internationalization     | 国际化       | интернационализация                        | Internationalisierung          | Internationalisation           | 国際化                         | 5          | Standard                     |
| TC-022     | Locale                   | 区域设置     | локаль                                     | Gebietsschema                  | Paramètre régional             | ロケール                       | 5          | Standard                     |
| TC-023     | View transition          | 视图转换     | переход вида                               | Übergangsansicht               | Transition de vue              | ビュー遷移                     | 3          | Web Standard                 |
| TC-024     | Accessibility            | 无障碍       | доступность                                | Barrierefreiheit               | Accessibilité                  | バリアフリー                   | 5          | WCAG 2.1                     |
| TC-025     | Responsive design        | 响应式设计   | адаптивный дизайн                          | Responsives Design             | Design réactif                 | レスポンシブデザイン           | 5          | Standard                     |

---

## 9. Concept Dependency Graph

### 9.1 Cross-Domain Dependencies

```
Amino Acids (AA)
    └── depends on → Nothing (leaf concepts)

Peptide Bond (PB)
    └── depends on → Amino Acids (AA)

Receptor Binding (RB)
    └── depends on → Peptide Bond (PB)

Pharmacokinetics (PK)
    └── depends on → Receptor Binding (RB)

Biosynthesis (BS)
    └── depends on → Peptide Bond (PB)

Educational Framework (ED)
    └── depends on → All domain concepts (content source)

Technology (TC)
    └── depends on → Educational Framework (ED) (algorithm implementation)
    └── depends on → All domain concepts (content rendering)
```

### 9.2 Implementation Priority

| Priority | Concept Group | Rationale                                     |
| -------- | ------------- | --------------------------------------------- |
| P0       | AA (001-020)  | Foundation for all other concepts             |
| P0       | PB (001-040)  | Core structural chemistry                     |
| P0       | RB (001-020)  | Core pharmacology                             |
| P0       | PK (001-028)  | Core pharmacology                             |
| P1       | BS (001-020)  | Important for advanced content                |
| P1       | ED (001-020)  | Required for educational features             |
| P2       | TC (001-025)  | Implementation-specific; less domain-critical |

---

## 10. Implementation Notes

### 10.1 i18n Integration

All concept IDs in this document should be used as keys in the i18n translation files. Example:

```json
{
  "CONCEPT_AA-001": {
    "en": "Glycine (G, Gly)",
    "zh": "甘氨酸 (G, Gly)",
    "ru": "Глицин (G, Gly)",
    "de": "Glycin (G, Gly)",
    "fr": "Glycine (G, Gly)",
    "ja": "グリシン (G, Gly)"
  }
}
```

### 10.2 Invariant Elements

The following elements must remain in their original form regardless of display language:

- One-letter amino acid codes (G, A, V, L, I, P, F, W, M, S, T, C, Y, H, D, E, N, Q, K, R)
- Three-letter amino acid codes (Gly, Ala, Val, etc.)
- Chemical formulas (C₂H₅NO₂, etc.)
- SI units (Da, Å, kJ/mol, etc.)
- Database identifiers (UniProt, PDB, ChEMBL)
- Mathematical symbols (Kd, IC₅₀, EC₅₀, ΔG, etc.)
- IUPAC nomenclature for peptide sequences

### 10.3 Glossary File Format

The complete glossary should be maintained as a TOML file for easy parsing:

```toml
[concepts.AA-001]
en = "Glycine (G, Gly)"
zh = "甘氨酸 (G, Gly)"
ru = "Глицин (G, Gly)"
de = "Glycin (G, Gly)"
fr = "Glycine (G, Gly)"
ja = "グリシン (G, Gly)"
confidence = 5
source = "IUPAC-IUB (1991)"
invariant_elements = ["G", "Gly"]
category = "amino_acid"
```
