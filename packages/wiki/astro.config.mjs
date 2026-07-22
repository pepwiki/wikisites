import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import starlight from "@astrojs/starlight";
import remarkKatex from "./src/lib/remark-katex.ts";
import rehypeKatex from "./src/lib/rehype-katex.ts";

export default defineConfig({
  site: "https://wikipept.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkKatex],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: "Wikipept",
      description: "Interactive, community-driven platform for learning oligopeptide biology",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "Wikipept",
      },
      social: [],
      sidebar: [
        {
          label: "Learn",
          items: [
            { label: "Overview", slug: "learn" },
            { label: "20 Standard Amino Acids", slug: "learn/amino-acids" },
            { label: "Peptide Bond Chemistry", slug: "learn/peptide-bonds" },
            { label: "Protein Structure", slug: "learn/structure" },
            { label: "Peptide Signaling", slug: "learn/signaling" },
            { label: "Receptor Binding", slug: "learn/receptors" },
            { label: "Therapeutic Peptides", slug: "learn/pharmacology" },
            { label: "Solid-Phase Synthesis", slug: "learn/spps" },
            { label: "Purification Methods", slug: "learn/purification" },
            { label: "Computational Design", slug: "learn/computational" },
            { label: "Drug Delivery", slug: "learn/drug-delivery" },
            { label: "Clinical Trials", slug: "learn/clinical-trials" },
            { label: "Regulatory Pathways", slug: "learn/regulatory" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Peptide Database", slug: "reference/peptides" },
            { label: "Glossary", slug: "reference/glossary" },
            { label: "Comprehensive Glossary", slug: "reference/peptide-glossary-comprehensive" },
          ],
        },
        {
          label: "Interactive",
          items: [
            { label: "Quizzes", link: "/quizzes" },
            { label: "Daily Challenge", link: "/daily" },
            { label: "Flashcards", link: "/flashcards" },
            { label: "Review", link: "/review" },
          ],
        },
        {
          label: "Practical",
          items: [
            { label: "Reconstitution", slug: "learn/reconstitution" },
            { label: "Storage & Handling", slug: "learn/peptide-storage" },
            { label: "Safety", slug: "learn/peptide-safety" },
            { label: "Calculations", slug: "learn/peptide-calculations" },
            { label: "Impurities", slug: "learn/peptide-impurities" },
            { label: "Peptide Half-Life", slug: "learn/peptide-half-life" },
            { label: "Amino Acid Properties", slug: "learn/amino-acid-properties" },
            { label: "Peptide Drug Pipeline", slug: "learn/peptide-drug-pipeline" },
            { label: "Semaglutide vs Tirzepatide", slug: "learn/semaglutide-vs-tirzepatide" },
            { label: "Semaglutide vs Liraglutide", slug: "learn/semaglutide-vs-liraglutide" },
            { label: "Tirzepatide vs Semaglutide (Weight Loss)", slug: "learn/tirzepatide-vs-semaglutide-weight-loss" },
            { label: "Mounjaro vs Ozempic", slug: "learn/mounjaro-vs-ozempic" },
            { label: "Retatrutide vs Tirzepatide", slug: "learn/retatrutide-vs-tirzepatide" },
            { label: "Glutathione vs NAC", slug: "learn/glutathione-vs-nac" },
            { label: "PT-141 vs Sildenafil", slug: "learn/pt-141-vs-viagra" },
            { label: "BPC-157 vs Thymosin Beta-4", slug: "learn/bpc-157-vs-thymosin-beta-4" },
            { label: "GHK-Cu vs BPC-157", slug: "learn/ghk-cu-vs-bpc-157" },
            { label: "Ipamorelin vs MK-677", slug: "learn/ipamorelin-vs-mk-677" },
            { label: "CJC-1295 vs Ipamorelin", slug: "learn/cjc-1295-vs-ipamorelin" },
            { label: "Insulin Glargine vs Detemir", slug: "learn/insulin-glargine-vs-detemir" },
            { label: "CJC-1295 vs Sermorelin", slug: "learn/cjc-1295-vs-sermorelin" },
            { label: "TB-500 vs BPC-157 (Recovery)", slug: "learn/tb-500-vs-bpc-157-recovery" },
            { label: "Melanotan I vs Melanotan II", slug: "learn/melanotan-i-vs-melanotan-ii" },
            { label: "Oxytocin vs Vasopressin", slug: "learn/oxytocin-vs-vasopressin" },
            { label: "NADH vs NADPH", slug: "learn/nadh-vs-nadph" },
            { label: "Heparin vs Enoxaparin", slug: "learn/heparin-vs-enoxaparin" },
            { label: "Testosterone vs GHRP-6", slug: "learn/testosterone-vs-ghrp-6" },
            { label: "BPC-157 Oral vs Injectable", slug: "learn/bpc-157-orally-vs-injectable" },
            { label: "CJC-1295 DAC vs No-DAC", slug: "learn/cjc-1295-dac-vs-no-dac" },
            { label: "Peptide Interactions", slug: "learn/peptide-interactions" },
          ],
        },
        {
          label: "Tools",
          items: [
            { label: "MW Calculator", link: "/tools/molecular-weight-calculator" },
            { label: "Reconstitution Calculator", link: "/tools/reconstitution-calculator" },
          ],
        },
        {
          label: "Topics",
          items: [
            { label: "Amino Acids", link: "/topics/amino-acids" },
            { label: "Peptide Structure", link: "/topics/peptide-structure" },
            { label: "Peptide Synthesis", link: "/topics/peptide-synthesis" },
            { label: "Pharmacology", link: "/topics/pharmacology" },
            { label: "Receptors & Signaling", link: "/topics/receptors" },
            { label: "Drug Discovery", link: "/topics/drug-discovery" },
          ],
        },
        {
          label: "Community",
          items: [
            { label: "Get Involved", slug: "community" },
          ],
        },
      ],
      customCss: [
        "./src/styles/starlight.css",
      ],
    }),
    solid(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "solid-js": ["solid-js"],
          },
        },
      },
    },
  },
});
