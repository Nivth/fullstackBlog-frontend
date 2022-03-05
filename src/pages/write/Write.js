import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

const HomepageStyle = styled.div`
  .write {
    padding-top: 50px;
  }

  .writeImg {
    margin-left: 150px;
    width: 70vw;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
  }

  .writeForm {
    position: relative;
  }

  .writeFormGroup {
    margin-left: 150px;
    display: flex;
    align-items: center;
  }

  .writeIcon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: rgb(121, 118, 118);
    cursor: pointer;
  }

  .writeInput {
    font-size: 30px;
    border: none;
    padding: 20px;
    width: 70vw;
  }

  .writeInput:focus {
    outline: none;
  }

  .writeText {
    font-size: 20px;
    height: 100vh;
  }

  .writeSubmit {
    position: absolute;
    top: 20px;
    right: 50px;
    color: white;
    background-color: teal;
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
  }
`;
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <HomepageStyle>
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Tell your story..."
              type="text"
              className="writeInput writeText"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </HomepageStyle>
  );
}
