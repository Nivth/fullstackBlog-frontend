import { Link } from "react-router-dom";
import styled from "styled-components";

const PostStyle = styled.div`
  .post {
    width: 385px;
    margin: 0px 25px 40px 25px;
  }

  .postImg {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 7px;
  }

  .postInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .postCat {
    font-family: "Varela Round", sans-serif;
    font-size: 11px;
    color: #be9656;
    line-height: 20px;
    margin-top: 15px;
    margin-right: 10px;
    cursor: pointer;
  }

  .postTitle {
    font-family: "Josefin Sans", sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-top: 15px;
    cursor: pointer;
  }

  .postDate {
    font-family: "Lora", serif;
    font-style: italic;
    font-size: 13px;
    color: #999;
    margin-top: 15px;
  }

  .postDesc {
    font-family: "Varela Round", sans-serif;
    font-size: 14px;
    color: #444;
    line-height: 24px;
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;
export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <PostStyle>
      <div className="post">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>
          <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    </PostStyle>
  );
}