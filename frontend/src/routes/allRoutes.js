import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<HomePage />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}
