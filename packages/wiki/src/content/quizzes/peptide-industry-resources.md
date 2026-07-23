---
date: 2026-06-15
author: "Wikipept Contributors"
title: "Peptide Industry & Career Resources Quiz"
description: "Test your knowledge on peptide industry companies, key resources, market trends, industry analysis, and career opportunities in peptide science."
category: "peptides"
difficulty: "mixed"
totalQuestions: 20
---

import Quiz from "@/components/Quiz";

<Quiz
  client:load
  questions={[
    {
      question: "Which company developed and markets semaglutide (Ozempic/Wegovy)?",
      options: [
        "Eli Lilly",
        "Novo Nordisk",
        "Pfizer",
        "Amgen"
      ],
      correctIndex: 1,
      explanation: "Novo Nordisk developed semaglutide, marketed as Ozempic for type 2 diabetes and Wegovy for obesity. It became one of the best-selling drugs in history, generating over $20 billion in annual sales by 2024.",
      difficulty: "beginner",
      tags: ["companies", "Novo-Nordisk", "semaglutide", "GLP-1"]
    },
    {
      question: "Which company developed tirzepatide (Mounjaro/Zepbound), a dual GIP/GLP-1 receptor agonist?",
      options: [
        "Sanofi",
        "Novo Nordisk",
        "Eli Lilly",
        "AstraZeneca"
      ],
      correctIndex: 2,
      explanation: "Eli Lilly developed tirzepatide, marketed as Mounjaro for diabetes and Zepbound for obesity. As a dual GIP/GLP-1 agonist, it showed superior weight loss and glycemic control compared to GLP-1-only agonists in clinical trials.",
      difficulty: "beginner",
      tags: ["companies", "Eli-Lilly", "tirzepatide", "GLP-1"]
    },
    {
      question: "Which CDMO is one of the largest contract manufacturers of peptide APIs globally?",
      options: [
        "Catalent",
        "Bachem",
        "Lonza",
        "Samsung Biologics"
      ],
      correctIndex: 1,
      explanation: "Bachem, headquartered in Switzerland, is one of the world's leading CDMOs specializing in peptide manufacturing. They produce peptide APIs for pharmaceutical companies and have decades of expertise in both solid-phase and solution-phase peptide synthesis at commercial scale.",
      difficulty: "intermediate",
      tags: ["companies", "CDMO", "Bachem", "manufacturing"]
    },
    {
      question: "What is the primary focus of the Peptide Therapeutics Society (PTS)?",
      options: [
        "Regulating peptide drug approvals",
        "Promoting peptide science research and education",
        "Manufacturing generic peptides",
        "Filing peptide patents"
      ],
      correctIndex: 1,
      explanation: "The Peptide Therapeutics Society is a scientific organization dedicated to advancing peptide science through conferences, workshops, and networking. It brings together academic and industry researchers to share findings on peptide design, synthesis, and therapeutic applications.",
      difficulty: "beginner",
      tags: ["resources", "organizations", "PTS"]
    },
    {
      question: "Which database is the primary repository for peptide sequences and structures used in research?",
      options: [
        "GenBank",
        "UniProt",
        "PDB",
        "PubChem"
      ],
      correctIndex: 1,
      explanation: "UniProt (Universal Protein Resource) is the primary database for protein and peptide sequences, functional information, and annotations. It combines Swiss-Prot (curated), TrEMBL (automatically annotated), and PIR databases, serving as the standard reference for peptide and protein research.",
      difficulty: "intermediate",
      tags: ["resources", "databases", "UniProt", "bioinformatics"]
    },
    {
      question: "What does the term 'peptide CDMO' stand for?",
      options: [
        "Central Drug Manufacturing Office",
        "Contract Development and Manufacturing Organization",
        "Clinical Development and Marketing Organization",
        "Certified Drug Manufacturing Operator"
      ],
      correctIndex: 1,
      explanation: "CDMO stands for Contract Development and Manufacturing Organization. Peptide CDMOs provide outsourced services for peptide drug development and manufacturing, including process development, scale-up, GMP manufacturing, analytical testing, and regulatory support.",
      difficulty: "beginner",
      tags: ["industry", "CDMO", "outsourcing", "manufacturing"]
    },
    {
      question: "Which region has seen the fastest growth in peptide API manufacturing capacity since 2020?",
      options: [
        "North America",
        "Europe",
        "Asia-Pacific (especially China and India)",
        "Latin America"
      ],
      correctIndex: 2,
      explanation: "The Asia-Pacific region, particularly China and India, has seen the fastest growth in peptide API manufacturing capacity. Companies like PolyPeptide, CPC Scientific, and Chinese CDMOs have expanded significantly to meet global demand driven by GLP-1 agonist production.",
      difficulty: "intermediate",
      tags: ["market", "manufacturing", "Asia-Pacific", "trends"]
    },
    {
      question: "What is the approximate global peptide synthesis market size (including research reagents and therapeutics)?",
      options: [
        "$5 billion",
        "$15 billion",
        "$50 billion",
        "$100 billion"
      ],
      correctIndex: 2,
      explanation: "The combined global peptide market (therapeutics, research reagents, cosmetics, and CDMO services) was approximately $50-55 billion in 2023. The therapeutics segment alone accounts for the majority, driven by blockbuster GLP-1 agonists and expanding peptide drug pipelines.",
      difficulty: "intermediate",
      tags: ["market", "market-size", "global"]
    },
    {
      question: "Which company acquired the peptide-focused CDMO PolyPeptide Group in 2022?",
      options: [
        "It was not acquired; it went public via IPO",
        "Novo Nordisk acquired it",
        "Thermo Fisher acquired it",
        "Lonza acquired it"
      ],
      correctIndex: 0,
      explanation: "PolyPeptide Group completed its IPO on the SIX Swiss Exchange in 2021, not an acquisition. It remains an independent, publicly traded peptide CDMO. This IPO highlighted the growing investor interest in peptide manufacturing infrastructure driven by demand for GLP-1 agonists.",
      difficulty: "advanced",
      tags: ["companies", "PolyPeptide", "IPO", "finance"]
    },
    {
      question: "What major trend is driving pharmaceutical companies to invest in oral peptide delivery?",
      options: [
        "Reduced manufacturing costs",
        "Patient preference for oral dosing over injections",
        "Regulatory requirements for oral formulations",
        "Improved peptide stability in solid form"
      ],
      correctIndex: 1,
      explanation: "Patient preference for oral dosing over injections is the primary driver. Companies like Novo Nordisk (oral semaglutide/Rybelsus) and others are investing heavily in permeation enhancers, nanocarriers, and formulation technologies to overcome the oral bioavailability challenge of peptides.",
      difficulty: "beginner",
      tags: ["trends", "oral-delivery", "patient-preference"]
    },
    {
      question: "Which journal is considered the leading publication for peptide science research?",
      options: [
        "Nature",
        "Journal of Peptide Science",
        "Peptides (Elsevier)",
        "Journal of Medicinal Chemistry"
      ],
      correctIndex: 2,
      explanation: "Peptides (published by Elsevier) is one of the leading journals dedicated to peptide science, covering synthesis, structure, function, and therapeutics. The Journal of Peptide Science (Wiley) is also prominent. Both are key resources for staying current in the field.",
      difficulty: "intermediate",
      tags: ["resources", "journals", "publications"]
    },
    {
      question: "What skill set is most critical for a career in peptide medicinal chemistry?",
      options: [
        "Bioinformatics and computational biology only",
        "Organic synthesis, SAR analysis, and peptide chemistry",
        "Clinical trial management exclusively",
        "Marketing and sales experience"
      ],
      correctIndex: 1,
      explanation: "Peptide medicinal chemistry requires strong organic chemistry and peptide synthesis skills, structure-activity relationship (SAR) analysis, understanding of pharmacokinetics, and familiarity with analytical techniques. Combined with computational tools, these skills enable design and optimization of peptide drug candidates.",
      difficulty: "beginner",
      tags: ["career", "skills", "medicinal-chemistry"]
    },
    {
      question: "What is the projected CAGR for the peptide therapeutics market from 2023 to 2030?",
      options: [
        "3-5%",
        "6-8%",
        "9-12%",
        "15-20%"
      ],
      correctIndex: 2,
      explanation: "The peptide therapeutics market is projected to grow at a CAGR of approximately 9-12% through 2030, driven by GLP-1 agonist expansion, new peptide approvals in oncology and rare diseases, oral delivery breakthroughs, and increasing global healthcare access.",
      difficulty: "intermediate",
      tags: ["market", "CAGR", "projections", "growth"]
    },
    {
      question: "Which career path in the peptide industry typically requires a PharmD or PhD with regulatory affairs specialization?",
      options: [
        "Peptide synthesis technician",
        "Regulatory affairs manager for peptide drugs",
        "Peptide sales representative",
        "Laboratory animal caretaker"
      ],
      correctIndex: 1,
      explanation: "Regulatory affairs managers for peptide drugs typically hold advanced degrees (PharmD, PhD, or JD) with specialized knowledge of FDA/EMA regulations, CMC requirements for peptides, biosimilar pathways, and drug approval processes. They bridge science and regulatory strategy.",
      difficulty: "beginner",
      tags: ["career", "regulatory", "qualifications"]
    },
    {
      question: "Which company is a major supplier of amino acids and peptide building blocks for research and manufacturing?",
      options: [
        "Sigma-Aldrich (Merck Millipore)",
        "Amazon",
        "Meta",
        "Tesla"
      ],
      correctIndex: 0,
      explanation: "Sigma-Aldrich (now part of Merck Millipore) is one of the largest suppliers of Fmoc-amino acids, coupling reagents, resins, and other peptide synthesis reagents. Other major suppliers include CEM Corporation, AAPPTec, and Gyros Protein Technologies for equipment and reagents.",
      difficulty: "beginner",
      tags: ["companies", "suppliers", "reagents", "research"]
    },
    {
      question: "What is the primary challenge driving consolidation in the peptide CDMO industry?",
      options: [
        "Lack of demand for peptide drugs",
        "Need for large-scale GMP capacity to meet GLP-1 demand",
        "Government mandates for CDMO mergers",
        "Declining interest in peptide therapeutics"
      ],
      correctIndex: 1,
      explanation: "The explosive demand for GLP-1 receptor agonists has created a capacity bottleneck, driving CDMO consolidation and expansion. Companies are merging or investing billions to build large-scale GMP peptide manufacturing facilities, as single-source CDMOs struggle to meet production requirements.",
      difficulty: "advanced",
      tags: ["trends", "CDMO", "consolidation", "GLP-1"]
    },
    {
      question: "Which professional skill is increasingly important for peptide scientists due to AI-driven drug discovery?",
      options: [
        "Machine learning and computational modeling",
        "Wet lab skills only",
        "Accounting and finance",
        "Graphic design"
      ],
      correctIndex: 0,
      explanation: "Machine learning and computational modeling are increasingly essential for peptide scientists. AI tools are used for peptide sequence design, property prediction, binding affinity estimation, and ADMET optimization. Scientists who combine wet lab expertise with computational skills are highly sought after.",
      difficulty: "intermediate",
      tags: ["career", "AI", "skills", "computational"]
    },
    {
      question: "What regulatory designation can significantly accelerate peptide drug development for rare diseases?",
      options: [
        "Generic drug designation",
        "Orphan drug designation",
        "Over-the-counter switch",
        "Cosmetic ingredient listing"
      ],
      correctIndex: 1,
      explanation: "Orphan drug designation provides incentives for developing drugs for rare diseases (affecting <200,000 people in the US), including 7-year market exclusivity, tax credits for clinical trials, fee waivers, and potential for expedited review. Many peptide drugs targeting rare diseases use this pathway.",
      difficulty: "intermediate",
      tags: ["regulatory", "orphan-drug", "rare-disease"]
    },
    {
      question: "Which market analysis firm or report type is commonly used to assess peptide industry trends?",
      options: [
        "SEC 10-K filings only",
        "Market research reports from firms like Grand View Research, MarketsandMarkets, or Evaluate Pharma",
        "Social media sentiment analysis exclusively",
        "Wikipedia articles"
      ],
      correctIndex: 1,
      explanation: "Market research firms like Grand View Research, MarketsandMarkets, Evaluate Pharma, and IQVIA publish comprehensive peptide industry reports covering market size, growth projections, competitive landscapes, pipeline analysis, and regional trends. These are standard resources for industry analysis.",
      difficulty: "beginner",
      tags: ["resources", "market-research", "analysis"]
    },
    {
      question: "What emerging career role combines peptide science with data science in the pharmaceutical industry?",
      options: [
        "Peptide bioinformatician / computational peptide scientist",
        "Peptide patent attorney",
        "Peptide equipment sales",
        "Peptide warehouse manager"
      ],
      correctIndex: 0,
      explanation: "Peptide bioinformaticians / computational peptide scientists combine peptide chemistry knowledge with data science, machine learning, and bioinformatics. They design peptide libraries, predict properties, optimize sequences, and analyze high-throughput screening data — a rapidly growing role at the intersection of AI and peptide drug discovery.",
      difficulty: "intermediate",
      tags: ["career", "bioinformatics", "data-science", "AI"]
    }
  ]}
/>
