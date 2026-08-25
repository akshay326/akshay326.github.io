export interface ReadingItem {
  title: string;
  author: string;
  status: 'reading' | 'finished';
}

export const reading: ReadingItem[] = [];
