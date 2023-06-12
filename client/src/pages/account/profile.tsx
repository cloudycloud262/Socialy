import { FC, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../store/authApi";

import styles from "./index.module.css";

type ProfileProps = {
  showEditForm: boolean;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  setShowPosts: Dispatch<SetStateAction<boolean>>;
  setNav: Dispatch<SetStateAction<string>>;
};

const Profile: FC<ProfileProps> = (props) => {
  const { id } = useParams();

  const currentUser = useGetCurrentUserQuery();

  return (
    <>
      <div className={styles.dpContainer}>
        <img src="/placeholderCover.jpg" alt="" className={styles.cover} />
        <img src="/placeholderDp.png" alt="" className={styles.dp} />
        <div className={`btn-grp ${styles.profileActionBtn}`}>
          {id ? (
            <div className="btn-grp">
              <button className="outlined-btn">Chat</button>
              <button className="contained-btn">Follow</button>
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
      <div className="fw-medium fs-medium">{currentUser.data?.username}</div>
      <div className={styles.connections}>
        <button
          onClick={() => {
            props.setShowPosts(true);
            props.setNav("Followers");
          }}
        >
          <span className="fs-medium fw-medium">200</span>
          <span className="fs-small fw-thin">Followers</span>
        </button>
        <button
          onClick={() => {
            props.setShowPosts(true);
            props.setNav("Following");
          }}
        >
          <span className="fs-medium fw-medium">150</span>
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
