import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";
import NotFound from "./pages/NotFound";
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/react-ecommerce/" element={<Home />} />
      <Route index path="/react-ecommerce/" element={<Home />} />
      <Route path="/react-ecommerce/:id" element={<Show />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
