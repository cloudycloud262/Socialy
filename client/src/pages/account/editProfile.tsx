import { FC, FormEvent, useState, useEffect } from "react";
import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "../../store/authApi";

import styles from "./index.module.css";

type EditProfileProps = {
  showEditForm: boolean;
};

const EditProfile: FC<EditProfileProps> = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
  });

  const currentUser = useGetCurrentUserQuery();
  const [updateProfile, updateStatus] = useUpdateProfileMutation();

  useEffect(() => {
    if (currentUser.isSuccess) {
      setEmail(currentUser.data.email);
      setUsername(currentUser.data.username);
    }
  }, [currentUser.isSuccess]);
  useEffect(() => {
    if (updateStatus.isError && "data" in updateStatus.error) {
      setErrors({ ...errors, ...(updateStatus.error.data as {}) });
    }
  }, [updateStatus.isError]);

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile({ email, username });
  };

  return (
    <div
      className={`${styles.editProfile} ${
        props.showEditForm ? styles.editProfileActive : ""
      }`}
    >
      <form onSubmit={updateProfileHandler}>
        <div>
          <input
            type="text"
            className="filled-input"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              errors.email && setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          <span className="fs-small fw-medium error">{errors.email}</span>
        </div>
        <div>
          <input
            type="text"
            className="filled-input"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              errors.username &&
                setErrors((prev) => ({ ...prev, username: "" }));
            }}
          />
          <span className="fs-small fw-medium error">{errors.username}</span>
        </div>
        <button className="contained-btn icon-btn">
          <span className="material-icons-outlined">edit</span>
          <span className="fs-small fw-medium">Update</span>
        </button>
      </form>
      <form>
        <span className="fs-small fw-medium">
          To delete this account, enter the current password
        </span>
        <input
          type="text"
          className="filled-input"
          placeholder="Current Password"
        />
        <button className="outlined-btn danger-btn icon-btn">
          <span className="material-icons-outlined">delete</span>
          <span className="fs-small fw-medium">Delete</span>
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
