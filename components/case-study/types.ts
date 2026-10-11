export interface MetaField {
  label: string;
  value: string;
}

export interface CaseStudySectionData {
  title: string;
  body: string;
  metaFields: MetaField[];
}

export interface MediaAsset {
  type: 'image' | 'video';
  asset: string;
  poster?: string;
  externalVideoUrl?: string;
  alt?: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  /** Short copy shown on the homepage and /work cards */
  cardDescription: string;
  contextParagraph1: string;
  contextParagraph2: string;
  liveProjectUrl: string;
  thumbnail: MediaAsset;
  section1: CaseStudySectionData;
  gallery: (string | MediaAsset)[];
  section2: CaseStudySectionData;
}
