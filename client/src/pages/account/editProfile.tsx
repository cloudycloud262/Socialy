import { FC, FormEvent, useState, useEffect } from "react";
import {
  useDeleteAccountMutation,
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
  const [currPassword, setCurrPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    currPassword: "",
  });

  const currentUser = useGetCurrentUserQuery();
  const [updateProfile, updateStatus] = useUpdateProfileMutation();
  const [deleteAccount, deleteStatus] = useDeleteAccountMutation();
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
  useEffect(() => {
    if (deleteStatus.isError && "data" in deleteStatus.error) {
      setErrors({ ...errors, ...(deleteStatus.error.data as {}) });
    }
  }, [deleteStatus.isError]);

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile({ email, username });
  };
  const deleteAccountHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteAccount(currPassword);
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
      <form onSubmit={deleteAccountHandler}>
        <span className="fs-small fw-medium">
          To delete this account, enter the current password
        </span>
        <div>
          <input
            type="text"
            className="filled-input"
            placeholder="Current Password"
            value={currPassword}
            onChange={(e) => {
              setCurrPassword(e.target.value);
              errors.currPassword &&
                setErrors((prev) => ({ ...prev, currPassword: "" }));
            }}
          />
          <span className="fs-small fw-medium error">
            {errors.currPassword}
          </span>
        </div>
        <button className="outlined-btn danger-btn icon-btn">
          <span className="material-icons-outlined">delete</span>
          <span className="fs-small fw-medium">Delete</span>
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
