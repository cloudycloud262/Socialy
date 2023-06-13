import { FC, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../store/authApi";
import {
  useFollowMutation,
  useGetUserQuery,
  useUnfollowMutation,
} from "../../store/userApi";

import Loading from "../../components/loading";

import styles from "./index.module.css";

type ProfileProps = {
  showEditForm: boolean;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  setShowPosts: Dispatch<SetStateAction<boolean>>;
  setNav: Dispatch<SetStateAction<string>>;
};

const Profile: FC<ProfileProps> = (props) => {
  const { id } = useParams();

  const getUser = id ? useGetUserQuery(id) : useGetCurrentUserQuery();
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  return (
    <>
      <div className={styles.dpContainer}>
        {getUser.isFetching || getUser.isLoading ? <Loading /> : null}
        <img src="/placeholderCover.jpg" alt="" className={styles.cover} />
        <img src="/placeholderDp.png" alt="" className={styles.dp} />
        <div className={`btn-grp ${styles.profileActionBtn}`}>
          {id ? (
            <div className="btn-grp">
              <button className="outlined-btn">Chat</button>
              {getUser.data &&
              "isFollowing" in getUser.data &&
              getUser.data.isFollowing ? (
                <button className="contained-btn" onClick={() => unfollow(id)}>
                  Unfollow
                </button>
              ) : (
                <button className="contained-btn" onClick={() => follow(id)}>
                  Follow
                </button>
              )}
            </div>
          ) : props.showEditForm ? (
            <button
              className="outlined-btn icon-btn danger-btn"
              onClick={() => props.setShowEditForm(false)}
            >
              <span className="material-icons-outlined">close</span>
              <span className="fs-small fw-medium">Cancel</span>
            </button>
          ) : (
            <button
              className="contained-btn icon-btn"
              onClick={() => props.setShowEditForm(true)}
            >
              <span className="material-icons-outlined">edit</span>
              <span className="fs-small fw-medium">Edit Profile</span>
            </button>
          )}
        </div>
      </div>
      <div className="fw-medium fs-medium">{getUser.data?.username}</div>
      <div className={styles.connections}>
        <button
          onClick={() => {
            props.setShowPosts(true);
            props.setNav("Followers");
          }}
        >
          <span className="fs-medium fw-medium">
            {getUser.data?.followersCount}
          </span>
          <span className="fs-small fw-thin">Followers</span>
        </button>
        <button
          onClick={() => {
            props.setShowPosts(true);
            props.setNav("Following");
          }}
        >
          <span className="fs-medium fw-medium">
            {getUser.data?.followingCount}
          </span>
          <span className="fs-small fw-thin">Following</span>
        </button>
        <button
          onClick={() => {
            props.setShowPosts(true);
            props.setNav("Posts");
          }}
        >
          <span className="fs-medium fw-medium">150</span>
          <span className="fs-small fw-thin">Posts</span>
        </button>
      </div>
    </>
  );
};

export default Profile;
