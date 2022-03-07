import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useState } from "react";
import { useContext } from "react";

const SinglePostStyles = styled.div`
  .singlePost {
    flex: 9;
  }

  .singlePostWrapper {
    padding: 20px;
    padding-right: 0;
    display: flex;
    flex-direction: column;
  }

  .singlePostImg {
    width: 100%;
    height: 300px;
    border-radius: 5px;
    object-fit: cover;
  }

  .singlePostTitle {
    text-align: center;
    margin: 10px;
    font-family: "Lora", serif;
    font-size: 28px;
  }

  .singlePostTitleInput {
    margin: 10px;
    font-family: "Lora", serif;
    font-size: 28px;
    text-align: center;
    border: none;
    color: gray;
    border-bottom: 1px solid lightgray;
  }

  .singlePostTitleInput:focus {
    outline: none;
  }

  .singlePostEdit {
    float: right;
    font-size: 16px;
  }

  .singlePostIcon {
    margin-left: 10px;
    cursor: pointer;
  }

  .singlePostIcon:first-child {
    color: teal;
  }

  .singlePostIcon:last-child {
    color: tomato;
  }

  .singlePostInfo {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-family: "Varela Round", sans-serif;
    color: #b39656;
  }

  .singlePostDesc {
    color: #666;
    font-size: 18px;
    line-height: 25px;
  }

  .singlePostDesc::first-letter {
    margin-left: 20px;
    font-size: 30px;
    font-weight: 600;
  }

  .singlePostDescInput {
    border: none;
    color: #666;
    font-size: 18px;
    line-height: 25px;
  }

  .singlePostDescInput:focus {
    outline: none;
  }
  .singlePostButton {
    width: 100px;
    border: none;
    background-color: teal;
    padding: 5px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end;
    margin-top: 20px;
  }
`;
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://backend-fullstack-blog.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SinglePostStyles>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                <b> {post.username}</b>
              </Link>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
    </SinglePostStyles>
  );
}
