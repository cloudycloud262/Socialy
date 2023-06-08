import { FC } from "react";

import Layout from "../../components/layout";
import Posts from "../../components/posts";

const Explore: FC = () => {
  return (
    <Layout>
      <div className="list">
        <span className="fw-medium fs-medium list-header">Explore</span>
        <Posts />
      </div>
    </Layout>
  );
};

export default Explore;
