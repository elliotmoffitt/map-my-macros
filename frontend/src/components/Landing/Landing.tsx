import "./Landing.css";
import { getMenuItemsThunk } from "../../redux/spoonacularMenuItems.ts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Search from "./Search/Search.tsx";

const Landing = () => {
  return (
    <div id="landing">
      <div id="landing-title-text">
        <h1 id="landing-title">Keep your goals consistent, wherever you go</h1>
        <p id="landing-text">
          Set your calories and macros to find restaurants near you that fit
          your needs.
        </p>
      </div>
      <div id="landing-search-form">
        <Search />
      </div>
    </div>
  );
};

export default Landing;
