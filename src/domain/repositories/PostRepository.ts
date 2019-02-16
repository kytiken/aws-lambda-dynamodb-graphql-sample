import BaseRepository from "../../base/Repository";
import PostEntity from "../entities/PostEntity";
import PostCreateParams from "../inputParams/PostCreateParams";
import PostUpdateParams from "../inputParams/PostUpdateParams";
import PostDeleteParams from "../inputParams/PostDeleteParams";

export default class PostRepository extends BaseRepository {
  findBy(id: string): Promise<PostEntity> {
    return super.findBy(id).then(item => {
      const post: PostEntity = {
        id: item.id,
        title: item.title,
        contents: item.contents
      };
      return post;
    });
  }

  all(): Promise<Array<PostEntity>> {
    return super.all().then(items => {
      return items.map(item => {
        const post: PostEntity = {
          id: item.id,
          title: item.title,
          contents: item.contents
        };
        return post;
      });
    });
  }

  create(postCreateParams: PostCreateParams): Promise<PostEntity> {
    return super.create(postCreateParams).then(() => {
      const post: PostEntity = {
        id: postCreateParams.id,
        title: postCreateParams.title,
        contents: postCreateParams.contents
      };
      return post;
    });
  }

  update(postUpdateParams: PostUpdateParams): Promise<PostEntity> {
    return super.update(postUpdateParams).then(() => {
      const post: PostEntity = {
        id: postUpdateParams.id,
        title: postUpdateParams.title,
        contents: postUpdateParams.contents
      };
      return post;
    });
  }

  delete(postDeleteParams: PostDeleteParams): Promise<Boolean> {
    return super.delete(postDeleteParams).then(() => {
      return true;
    });
  }
}
