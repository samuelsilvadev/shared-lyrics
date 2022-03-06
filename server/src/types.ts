export type Song = {
  id: string;
  title: String;
};

export type Lyric = {
  id: string;
  likes: number;
  content: string;
  songId: string;
};
