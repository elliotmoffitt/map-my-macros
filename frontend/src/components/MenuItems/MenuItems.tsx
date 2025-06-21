import "./MenuItems.css";
import { useAppSelector } from "../../redux/store";
import MenuItemCard from "./MenuItemCard";
import { IMenuItem } from "../../../types/menuItems";
import { useState } from "react";

const MenuItems = (): JSX.Element => {
  const menuItems = useAppSelector((state) => state.menuItems.allMenuItems);
  // CHECK FOR IF SPOONACUAR SPOONACULAR.ALLMENUITEMS
  return (
    <div id="menu-items">
      <h2 id="menu-items-results-title">Results</h2>
      <hr id="menu-items-line"></hr>
      <div id="menu-items-results">
        {menuItems.length
          ? menuItems.map((menuItem: IMenuItem, i: number) => {
              return menuItem.nutrition ? (
                <MenuItemCard menuItem={menuItem} key={`${menuItem.id}-${i}`} />
              ) : (
                ""
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default MenuItems;
