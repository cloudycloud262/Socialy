import { FC, Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { PostCacheKey } from ".";
import { numberFormatter, relTimeFormatter } from "../../utils/formatters";

import styles from "./index.module.css";

export interface Post {
  _id: string;
  body: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  __v: number;
}

type PostProps = {
  post: Post;
  currentUserPost?: boolean;
  setEditPostIndex?: Dispatch<SetStateAction<number>>;
  index?: number;
  deletePost?: Function;
  likePost: Function;
  unlikePost: Function;
  navigate?: NavigateFunction;
  postMenuIndex?: number;
  setPostMenuIndex?: React.Dispatch<React.SetStateAction<number>>;
  postMenuRef?: React.MutableRefObject<HTMLDivElement | null>;
  cacheKey: PostCacheKey;
  insideComment?: boolean;
};

const Post: FC<PostProps> = (props) => {
  return (
    <div className={styles.postWrapper}>
      <img src="/placeholderDp.png" alt="" className="dp-icon" />
      <div className={styles.postBody}>
        <div
          className={`${styles.postHeader} disabled-text fs-small fw-medium`}
        >
          <span
            onClick={() => {
              if (props.navigate) {
                props.currentUserPost
                  ? props.navigate(`/account`)
                  : props.navigate(`/user/${props.post.userId}`);
              }
            }}
          >
            {props.post.username}
          </span>
          <span>•</span>
          <span>{relTimeFormatter(props.post.createdAt)}</span>
          {props.currentUserPost ? (
            <div
              className="menu-wrapper"
              ref={props.postMenuRef}
              onClick={(e) => {
                const eventTarget = e.target as HTMLDivElement;
                if (eventTarget.classList.contains("material-icons-outlined")) {
                  if (props.postMenuRef) {
                    props.postMenuRef.current = e.currentTarget;
                  }
                }
              }}
            >
              <span
                className="material-icons-outlined"
                onClick={() => {
                  if (
                    props.setPostMenuIndex &&
                    typeof props.index === "number" &&
                    props?.index >= 0 &&
                    typeof props?.postMenuIndex === "number" &&
                    props?.postMenuIndex >= -1
                  ) {
                    props.setPostMenuIndex(
                      props.postMenuIndex === props.index ? -1 : props.index
                    );
                  }
                }}
              >
                more_vert
              </span>
              <div
                className={`menu ${
                  props.postMenuIndex === props.index ? "menu-active " : ""
                }number`}
              >
                <button
                  className="menu-item transparent-btn icon-btn disabled-text"
                  onClick={() => {
                    if (
                      props.setEditPostIndex &&
                      props.index &&
                      props.postMenuRef &&
                      props.setPostMenuIndex
                    ) {
                      props.setEditPostIndex(props.index);
                      props.postMenuRef.current = null;
                      props.setPostMenuIndex(-1);
                    }
                  }}
                >
                  <span className="material-icons-outlined">edit</span>
                  <span className="fw-medium fs-small">Update Post</span>
                </button>
                <button
                  className="menu-item danger-btn transparent-btn icon-btn"
                  onClick={() => {
                    if (
                      props.deletePost &&
                      props.postMenuRef &&
                      props.setPostMenuIndex
                    ) {
                      props.deletePost(props.post._id);
                      props.postMenuRef.current = null;
                      props.setPostMenuIndex(-1);
                    }
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
            <span>{numberFormatter(props.post.likesCount)}</span>
          </div>
          {props.insideComment ? null : (
            <div
              onClick={() => {
                if (props.navigate) {
                  props.navigate(`/post/${props.post._id}`);
                }
              }}
            >
              <span className="material-icons-outlined">rate_review</span>
              <span>{numberFormatter(props.post.commentsCount)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
