import { FC, useState } from "react";
import { useGetUsersQuery } from "../../store/userApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../store/authApi";

import Profile from "./profile";
import EditProfile from "./editProfile";
import Posts from "../../components/posts";

import styles from "./index.module.css";

const Account: FC = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [nav, setNav] = useState("Posts");
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(nav);

  const currentUser = useGetCurrentUserQuery();
  const getUsers = useGetUsersQuery(
    {
      type: nav as "Followers" | "Following",
      id: id || currentUser.data?._id,
    },
    {
      skip:
        (nav !== "Followers" && nav !== "Following") ||
        (!id && !currentUser.data?._id),
    }
  );

  if (id === currentUser.data?._id) {
    return <Navigate to="/account" />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <Profile
          setNav={setNav}
          setShowEditForm={setShowEditForm}
          showEditForm={showEditForm}
          setShowPosts={setShowPosts}
        />
        <EditProfile showEditForm={showEditForm} />
      </div>
      <div
        className={`${styles.posts} ${
          showPosts ? styles.postsActive : ""
        } list`}
      >
        <div className="list-header">
          <span className="fs-medium fw-medium">{nav}</span>
          <span
            className="material-icons-outlined"
            onClick={() => setShowPosts(false)}
          >
            close
          </span>
        </div>
        <div className="list">
          {nav === "Followers" ? (
            getUsers.data?.map((user, index) => (
              <div
                className="user-card user-card-hover"
                key={index}
                onClick={() => {
                  user._id === currentUser.data?._id
                    ? navigate(`/account`)
                    : navigate(`/user/${user._id}`);
                }}
              >
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <span className="fw-medium fs-medium">{user.username}</span>
              </div>
            ))
          ) : nav === "Following" ? (
            getUsers.data?.map((user, index) => (
              <div
                className="user-card user-card-hover"
                key={index}
                onClick={() => {
                  user._id === currentUser.data?._id
                    ? navigate(`/account`)
                    : navigate(`/user/${user._id}`);
                }}
              >
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <span className="fw-medium fs-medium">{user.username}</span>
              </div>
            ))
          ) : nav === "Posts" ? (
            <Posts />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Account;
