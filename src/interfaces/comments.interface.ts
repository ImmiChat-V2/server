// import { UserEntity, PostEntity } from "@/entities";
import { UserEntity } from "@/entities"

export interface Comments {
    id: number;
    // post: PostEntity;
    user: UserEntity;
    media?: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}