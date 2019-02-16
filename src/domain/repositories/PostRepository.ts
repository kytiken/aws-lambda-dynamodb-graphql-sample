import BaseRepository from "../../base/Repository";
import PostEntity from "../entities/PostEntity";
import PostCreateParams from "../inputParams/PostCreateParams";
import PostUpdateParams from "../inputParams/PostUpdateParams";
import PostDeleteParams from "../inputParams/PostDeleteParams";

export default class PostRepository extends BaseRepository {
  findBy(id: string): Promise<PostEntity> {
    return super.findBy(id).then(data => {
      const post: PostEntity = {
        id: data.Item.id,
        title: data.Item.title,
        contents: data.Item.contents
      };
      return post;
    });
  }

  all(): Promise<Array<PostEntity>> {
    return super.all().then(data => {
      return data.Items.map(item => {
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
    return super.create(postCreateParams).then(data => {
      const post: PostEntity = {
        id: postCreateParams.id,
        title: postCreateParams.title,
        contents: postCreateParams.contents
      };
      return post;
    });
  }

  update(postUpdateParams: PostUpdateParams): Promise<PostEntity> {
    return super.update(postUpdateParams).then(data => {
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
