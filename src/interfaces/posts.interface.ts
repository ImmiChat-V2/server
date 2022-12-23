export interface Post {
  id: number;
  media?: string;
  user_id: number;
  content: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}
