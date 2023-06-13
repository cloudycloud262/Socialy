import { FC, useState, useRef, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { useDeletePostMutation } from "../../store/postApi";

import styles from "./index.module.css";

export interface Post {
  _id: string;
  body: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type PostProps = {
  post: Post;
  currentUserPost?: boolean;
  setEditPostIndex?: Dispatch<SetStateAction<number>>;
  index: number;
};

const Post: FC<PostProps> = (props) => {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const postMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();

  useCloseOnOutsideClick(postMenuRef, () => setShowPostMenu(false));

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
            <div className="menu-wrapper" ref={postMenuRef}>
              <span
                className="material-icons-outlined"
                onClick={() => setShowPostMenu((prev) => !prev)}
              >
                more_vert
              </span>
              <div className={`menu ${showPostMenu ? "menu-active " : ""}`}>
                <button
                  className="menu-item transparent-btn icon-btn disabled-text"
                  onClick={() => {
                    if (props.setEditPostIndex) {
                      props.setEditPostIndex(props.index);
                    }
                    setShowPostMenu(false);
                  }}
                >
                  <span className="material-icons-outlined">edit</span>
                  <span className="fw-medium fs-small">Update Post</span>
                </button>
                <button
                  className="menu-item danger-btn transparent-btn icon-btn"
                  onClick={() => {
                    deletePost(props.post._id);
                    setShowPostMenu(false);
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
            <span className="material-icons-outlined">star_border</span>
            <span>80</span>
          </div>
          <div onClick={() => navigate(`/post/id`)}>
            <span className="material-icons-outlined">rate_review</span>
            <span>150</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
