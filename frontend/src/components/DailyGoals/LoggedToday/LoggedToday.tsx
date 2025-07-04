import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import "./LoggedToday.css";
import { useDispatch } from "react-redux";
import { getMenuItemsTodayThunk } from "../../../redux/menuItems";
import MenuItemCard from "../../MenuItems/MenuItemCard";
import { IMenuItem } from "../../../../types/menuItems";

const LoggedToday = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const menuItems = useAppSelector((state) => state.menuItems.allMenuItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMenuItems = async () => {
      await dispatch(getMenuItemsTodayThunk());
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getMenuItems();
    }
  }, [dispatch, isLoaded, menuItems]);

  if (isLoaded) {
    return (
      <div id="logged-today">
        <h2 id="logged-today-title">Food Logged Today</h2>
        <hr id="logged-today-line" />
        <div id="logged-today-menu-items">
          {menuItems.length ? menuItems.map((menuItem: IMenuItem, i: number) => {
            return (
              <MenuItemCard menuItem={menuItem} key={`${menuItem.id}-${i}`} />
            );
          }) : <h4 style={{textAlign: 'center'}}>Nothing logged yet...</h4>}
        </div>
      </div>
    );
  } else return <h2>Loading...</h2>;
};

export default LoggedToday;
