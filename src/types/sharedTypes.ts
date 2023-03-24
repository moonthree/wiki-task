export interface wiki {
  id: string;
  title: string;
  content: string;
}

export interface WikiResponse {
  wikis: wiki[];
  totalPages: number;
}
