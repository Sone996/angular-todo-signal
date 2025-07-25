export type Variant = {
  id: string;
  name: string;
  gene: string;
  location: string;
  variantType: string;
  frequency: string;
  pathogenicity: string;
  exon?: number;
  clinicalSignificance?: string;
  references?: string[];
  classification?: Classification;
};

export type Classification = 'Benign' | 'Likely Benign' | 'Uncertain Significance' | 'Likely Pathogenic' | 'Pathogenic';
