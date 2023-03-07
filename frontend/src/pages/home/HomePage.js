import React from "react";
import style from "./homePage.module.css";
import Sidebar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";

export default function HomePage() {
  return (
    <div>
      <Sidebar />
      <div className={style.mainContainer}>
        <Header />
      </div>
    </div>
  );
}
