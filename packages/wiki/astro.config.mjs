import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import starlight from "@astrojs/starlight";
import remarkKatex from "./src/lib/remark-katex.ts";
import rehypeKatex from "./src/lib/rehype-katex.ts";

export default defineConfig({
  site: "https://wikipept.com",
  output: "static",
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
          ],
        },
        {
          label: "Tools",
          items: [
            { label: "MW Calculator", link: "/tools/molecular-weight-calculator" },
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
