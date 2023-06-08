import { FC } from "react";

import Layout from "../../components/layout";
import Posts from "../../components/posts";

const Home: FC = () => {
  return (
    <Layout>
      <div className="list">
        <span className="fw-medium fs-medium list-header">Home</span>
        <Posts />
      </div>
    </Layout>
  );
};

export default Home;
