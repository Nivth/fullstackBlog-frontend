import Post from "../post/Post";
import styled from "styled-components";

const PostsStyle = styled.div`
  .posts {
    flex: 9;
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
  }
`;
export default function Posts({posts}) {
  return (
    <PostsStyle>
      <div className="posts">
        {posts.map(p=>(
          <Post post={p} />
        ))}
      </div>
    </PostsStyle>
  );
}
