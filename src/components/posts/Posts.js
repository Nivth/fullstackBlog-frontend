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
        {/* <Post img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        <Post img="https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        <Post img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        <Post img="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        <Post img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" /> */}
      </div>
    </PostsStyle>
  );
}
