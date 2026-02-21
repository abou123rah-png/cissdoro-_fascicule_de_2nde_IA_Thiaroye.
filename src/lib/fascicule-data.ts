// Types for the fascicule content
export interface PageData {
  page: number;
  text: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  part: 'chimie' | 'physique';
  startPage: number;
  endPage: number;
  objectives: string[];
  courseContent: string;
  exercises: string;
  corrections: string;
  images: string[];
}

// Chapter definitions with page ranges
export const chapterDefinitions = [
  // PREMIERE PARTIE: EXERCICES DE CHIMIE
  { id: 'c1', number: 'C1', title: 'Mélanges et corps purs', part: 'chimie' as const, startPage: 6, endPage: 10 },
  { id: 'c2', number: 'C2', title: 'Éléments, atomes, classification périodique', part: 'chimie' as const, startPage: 11, endPage: 16 },
  { id: 'c3', number: 'C3', title: 'Liaisons chimiques', part: 'chimie' as const, startPage: 17, endPage: 20 },
  { id: 'c4', number: 'C4', title: 'Mole, grandeurs molaires', part: 'chimie' as const, startPage: 20, endPage: 24 },
  { id: 'c5', number: 'C5', title: 'Réactions chimiques. Equation-bilan', part: 'chimie' as const, startPage: 25, endPage: 30 },
  { id: 'c6', number: 'C6', title: 'Généralités sur les solutions aqueuses', part: 'chimie' as const, startPage: 31, endPage: 33 },
  { id: 'c7', number: 'C7', title: 'Solution aqueuse acide', part: 'chimie' as const, startPage: 34, endPage: 39 },
  { id: 'c8', number: 'C8', title: 'Solution aqueuse basique', part: 'chimie' as const, startPage: 40, endPage: 43 },
  { id: 'c9', number: 'C9', title: 'Notion de pH – Indicateurs colorés', part: 'chimie' as const, startPage: 44, endPage: 47 },
  { id: 'c10', number: 'C10', title: 'Identification des ions', part: 'chimie' as const, startPage: 48, endPage: 51 },
  // DEUXIEME PARTIE: EXERCICES DE PHYSIQUE
  { id: 'p1', number: 'P1', title: "Phénomènes d'électrisation", part: 'physique' as const, startPage: 53, endPage: 56 },
  { id: 'p2', number: 'P2', title: 'Généralités sur le courant électrique', part: 'physique' as const, startPage: 57, endPage: 59 },
  { id: 'p3', number: 'P3', title: 'Intensité du courant électrique', part: 'physique' as const, startPage: 60, endPage: 63 },
  { id: 'p4', number: 'P4', title: 'Tension électrique', part: 'physique' as const, startPage: 64, endPage: 67 },
  { id: 'p5', number: 'P5', title: 'Dipôles passifs', part: 'physique' as const, startPage: 68, endPage: 73 },
  { id: 'p6', number: 'P6', title: 'Dipôles actifs', part: 'physique' as const, startPage: 74, endPage: 79 },
  { id: 'p8', number: 'P8', title: 'Généralités sur le mouvement', part: 'physique' as const, startPage: 80, endPage: 85 },
  { id: 'p9', number: 'P9', title: 'Généralités sur les forces', part: 'physique' as const, startPage: 86, endPage: 90 },
  { id: 'p10', number: 'P10', title: 'Le poids – La masse', part: 'physique' as const, startPage: 91, endPage: 95 },
  { id: 'p11', number: 'P11', title: "Équilibre d'un solide", part: 'physique' as const, startPage: 96, endPage: 102 },
  { id: 'p12', number: 'P12', title: "Équilibre d'un solide mobile", part: 'physique' as const, startPage: 103, endPage: 110 },
  { id: 'p13', number: 'P13', title: 'Propagation rectiligne de la lumière', part: 'physique' as const, startPage: 111, endPage: 115 },
  { id: 'p14', number: 'P14', title: 'Réflexion de la lumière- Réfraction', part: 'physique' as const, startPage: 116, endPage: 120 },
];

// Get all chapter page numbers
export function getAllPageNumbers(): number[] {
  const pages = new Set<number>();
  chapterDefinitions.forEach(ch => {
    for (let p = ch.startPage; p <= ch.endPage; p++) {
      pages.add(p);
    }
  });
  return Array.from(pages).sort((a, b) => a - b);
}
