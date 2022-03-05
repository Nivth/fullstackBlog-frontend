import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const SidebarStyled = styled.div`
  .sidebar {
    flex: 3;
    margin: 20px;
    padding-bottom: 30px;
    background-color: #fdfbfb;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sidebarItem {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sidebarTitle {
    margin: 10px;
    padding: 5px;
    width: 80%;
    border-top: 1px solid #a7a4a4;
    border-bottom: 1px solid #a7a4a4;
    font-family: "Varela Round", sans-serif;
    font-size: 12px;
    color: #222;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
  }

  .sidebarItem > img {
    margin-top: 15px;
  }

  .sidebarItem > p {
    padding: 30px;
  }

  .sidebarList {
    list-style: none;
    margin-bottom: 30px;
  }

  .sidebarListItem {
    display: inline-block;
    width: 50%;
    margin-top: 15px;
    cursor: pointer;
  }

  .sidebarSocial {
    margin-top: 15px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebarIcon {
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <SidebarStyled>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
            alt=""
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            qui necessitatibus nostrum illum reprehenderit.
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cats.map((c) => (
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    </SidebarStyled>
  );
}
