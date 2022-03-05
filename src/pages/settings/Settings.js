import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import styled from "styled-components";

const SettingsStyle = styled.div`
  .settings {
    display: flex;
  }

  .settingsWrapper {
    flex: 9;
    padding: 20px;
  }

  .settingsTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .settingsTitleUpdate {
    font-size: 30px;
    margin-bottom: 20px;
    color: lightcoral;
  }

  .settingsTitleDelete {
    color: red;
    font-size: 12px;
    cursor: pointer;
  }

  .settingsForm {
    display: flex;
    flex-direction: column;
  }

  .settingsPP {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .settingsPP > img {
    height: 70px;
    width: 70px;
    border-radius: 20px;
    object-fit: cover;
  }

  .settingsPPIcon {
    width: 25px;
    height: 25px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    margin-left: 10px;
    color: white;
    background-color: lightcoral;
    cursor: pointer;
  }

  .settingsPPButton:focus {
    outline-style: none;
  }

  .settingsForm > label {
    font-size: 20px;
    margin-top: 20px;
  }

  .settingsPPInput {
    width: 30%;
  }

  .settingsForm > input {
    color: gray;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30px;
    border: none;
    border-bottom: 1px solid lightgray;
  }

  .settingsSubmitButton {
    align-self: center;
    width: 150px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: teal;
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settingsSubmitButton:hover {
    background-color: rgb(1, 114, 114);
  }
`;
export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://backend-fullstack-blog.herokuapp.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <SettingsStyle>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingsSubmit" type="submit">
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
        <Sidebar />
      </div>
    </SettingsStyle>
  );
}
