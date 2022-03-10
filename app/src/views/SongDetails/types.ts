export type Lyric = {
  id: string;
  content: string;
  likes: number;
};

export type Song = {
  id: string;
  title: string;
  lyrics: Lyric[];
};
