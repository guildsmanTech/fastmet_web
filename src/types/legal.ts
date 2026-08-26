export type ContentBlock =
  | {type: "p"; text: string}
  | {type: "subheading"; text: string}
  | {type: "list"; items: string[]};

export interface LegalSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface LegalContent {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}
