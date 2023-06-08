import { FC } from "react";

import Post from "./post";

const Posts: FC = () => {
  return (
    <div className="list">
      {[...Array(40)].map((_d, index) => (
        <Post key={index} />
      ))}
    </div>
  );
};

export default Posts;
