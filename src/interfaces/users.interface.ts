// import { CommentEntity, PostEntity } from "@/entities";
import { CommentEntity } from "@/entities"

export interface User {
  comments: CommentEntity[];
  // posts: PostEntity[];
  id: number;
  email: string;
  password: string;
}
