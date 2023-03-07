import React from "react";
import style from "./header.module.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.buttons}>
        <button type="button">
          <GrFormPrevious />
        </button>
        <button type="button">
          <GrFormNext />
        </button>
      </div>

      <div className={style.navbar}>
        <ul>
          <li>
            <a href="/premium">Premium</a>
          </li>
          <li>
            <a href="/support">Support</a>
          </li>
          <li>
            <a href="/download">Download</a>
          </li>
          <li className={style.divider}>|</li>
          <li>
            <a href="/signup">Sign up</a>
          </li>
          <button type="button">Log in</button>
        </ul>
      </div>
    </div>
  );
}
