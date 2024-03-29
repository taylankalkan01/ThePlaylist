import React from "react";
import style from "./sidebar.module.css";
import { BiLibrary, BiHeartSquare } from "react-icons/bi";
import { MdOutlineAddBox } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { NavLink } from "react-router-dom";

const constantTest = [
  { id: 1, playlist: "playlist1" },
  { id: 2, playlist: "playlist2" },
  { id: 3, playlist: "playlist3" },
  { id: 4, playlist: "playlist4" },
  { id: 5, playlist: "playlist5" },
];

export default function SideBar() {
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <a href="/">
          {/* <img src="" alt="logo" /> */}
          <span>The Playlist</span>
        </a>
      </div>

      <div className={style.navigation}>
        <ul>
          <li>
            <a href="/">
              <SlHome
                className={style.icon}
                // style={{ backgroundColor: "white" }}
              />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/">
              <CiSearch className={style.icon} />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a href="/">
              <BiLibrary className={style.icon} />
              <span>Library</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={style.navigation}>
        <ul>
          <li>
            <a href="/">
              <MdOutlineAddBox className={style.icon} />
              <span>Create Playlist</span>
            </a>
          </li>
          <li>
            <a href="/">
              <BiHeartSquare className={style.icon} />
              <span>Liked Songs</span>
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <hr />

      {/* if user is logged in show them playlist */}
      <div className={style.playlists}>
        {constantTest.map((c, id) => {
          return (
            <div key={id}>
              <ul>
                <li>
                  <NavLink to={"/playlist/" + c.id}>{c.playlist}</NavLink>
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <div className={style.policies}>
        <ul>
          <li>
            <a href="/">Legal</a>
          </li>
          <li>
            <a href="/">Privacy</a>
          </li>
          <li>
            <a href="/">Cookies</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
