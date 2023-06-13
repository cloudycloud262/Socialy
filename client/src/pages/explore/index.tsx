import { FC } from "react";
import { useGetPostsQuery } from "../../store/postApi";

import Layout from "../../components/layout";
import Post from "../../components/post";
import Loading from "../../components/loading";

const Explore: FC = () => {
  const getPosts = useGetPostsQuery({ page: "explore" });

  return (
    <Layout>
      <div className="list">
        {getPosts.isFetching || getPosts.isLoading ? <Loading /> : null}
        {getPosts.data?.map((post, index) => (
          <Post key={index} post={post} index={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Explore;
