import { FC, Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { PostsArgs } from ".";

import styles from "./index.module.css";

export interface Post {
  _id: string;
  body: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked: boolean;
  __v: number;
}

type PostProps = {
  post: Post;
  currentUserPost: boolean;
  setEditPostIndex: Dispatch<SetStateAction<number>>;
  index: number;
  deletePost: Function;
  likePost: Function;
  unlikePost: Function;
  navigate: NavigateFunction;
  showPostMenu: boolean;
  setPostMenuIndex: React.Dispatch<React.SetStateAction<number>>;
  postMenuRef: React.MutableRefObject<HTMLDivElement | null>;
  cacheKey: PostsArgs;
};

const Post: FC<PostProps> = (props) => {
  return (
    <div className={styles.postWrapper}>
      <img src="/placeholderDp.png" alt="" className="dp-icon" />
      <div className={styles.postBody}>
        <div
          className={`${styles.postHeader} disabled-text fs-small fw-medium`}
        >
          <span>{props.post.username}</span>
          <span>•</span>
          <span>5h</span>
          {props.currentUserPost ? (
            <div
              className="menu-wrapper"
              ref={props.postMenuRef}
              onClick={(e) => {
                const eventTarget = e.target as HTMLDivElement;
                if (eventTarget.classList.contains("material-icons-outlined")) {
                  props.postMenuRef.current = e.currentTarget;
                }
              }}
            >
              <span
                className="material-icons-outlined"
                onClick={() => {
                  props.setPostMenuIndex((prev) =>
                    prev === props.index ? -1 : props.index
                  );
                }}
              >
                more_vert
              </span>
              <div
                className={`menu ${props.showPostMenu ? "menu-active " : ""}`}
              >
                <button
                  className="menu-item transparent-btn icon-btn disabled-text"
                  onClick={() => {
                    if (props.setEditPostIndex) {
                      props.setEditPostIndex(props.index);
                    }
                    props.postMenuRef.current = null;
                    props.setPostMenuIndex(-1);
                  }}
                >
                  <span className="material-icons-outlined">edit</span>
                  <span className="fw-medium fs-small">Update Post</span>
                </button>
                <button
                  className="menu-item danger-btn transparent-btn icon-btn"
                  onClick={() => {
                    props.deletePost(props.post._id);
                    props.postMenuRef.current = null;
                    props.setPostMenuIndex(-1);
                  }}
                >
                  <span className="material-icons-outlined">delete</span>
                  <span className="fw-medium fs-small">Delete Post</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="fs-medium fw-medium">{props.post.body}</div>
        <div
          className={`${styles.engagement} disabled-text fs-small fw-medium`}
        >
          <div>
            {props.post.isLiked ? (
              <span
                className="material-icons"
                onClick={() =>
                  props.unlikePost({
                    id: props.post._id,
                    cacheKey: props.cacheKey,
                  })
                }
              >
                star
              </span>
            ) : (
              <span
                className="material-icons-outlined"
                onClick={() =>
                  props.likePost({
                    id: props.post._id,
                    cacheKey: props.cacheKey,
                  })
                }
              >
                star_border
              </span>
            )}
            <span>{props.post.likesCount}</span>
          </div>
          <div onClick={() => props.navigate(`/post/id`)}>
            <span className="material-icons-outlined">rate_review</span>
            <span>150</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
