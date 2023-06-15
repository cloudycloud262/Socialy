import { useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useLikeMutation,
  useUnLikeMutation,
} from "../../store/postApi";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { useGetCurrentUserQuery } from "../../store/authApi";
import { useGetUserQuery } from "../../store/userApi";

import Loading from "../loading";
import Post from "./post";
import PostForm from "./postForm";

import styles from "./index.module.css";

export interface PostsArgs {
  userId?: string;
  page?: string;
  postId?: string;
}
type PostsProps = {
  query: PostsArgs;
};

const Posts: React.FC<PostsProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [postMenuIndex, setPostMenuIndex] = useState(-1);
  const [editPostIndex, setEditPostIndex] = useState(-1);
  const postMenuRef = useRef<HTMLDivElement | null>(null);

  useCloseOnOutsideClick(postMenuRef, () => setPostMenuIndex(-1));

  const getUser = id ? useGetUserQuery(id) : useGetCurrentUserQuery();
  const getPosts = useGetPostsQuery(props.query, {
    skip:
      !getUser.isSuccess ||
      (getUser.data?.isPrivate &&
        "isFollowing" in getUser.data &&
        !getUser.data?.isFollowing),
  });
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikeMutation();
  const [unlikePost] = useUnLikeMutation();

  return (
    <div className={`list ${styles.posts}`}>
      {getPosts.isFetching || getPosts.isLoading ? <Loading /> : null}
      {getPosts.data?.map((post, index) =>
        editPostIndex === index ? (
          <PostForm
            type="update"
            post={post}
            key={index}
            setEditPostIndex={setEditPostIndex}
          />
        ) : (
          <Post
            key={index}
            post={post}
            index={index}
            currentUserPost={location.pathname === "/account"}
            deletePost={deletePost}
            likePost={likePost}
            unlikePost={unlikePost}
            navigate={navigate}
            cacheKey={props.query}
            postMenuIndex={postMenuIndex}
            setPostMenuIndex={setPostMenuIndex}
            postMenuRef={postMenuRef}
            setEditPostIndex={setEditPostIndex}
          />
        )
      )}
    </div>
  );
};

export default Posts;
