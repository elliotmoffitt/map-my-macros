import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import "./LoggedToday.css";
import { useDispatch } from "react-redux";
import { getMenuItemsTodayThunk } from "../../../redux/menuItems";

const LoggedToday = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const menuItems = useAppSelector((state) => state.menuItems.allMenuItems);
  const dispatch = useDispatch();
  console.log(menuItems);

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
          {/* {menuItems.map((menuItem, i) => {})} */}
        </div>
      </div>
    );
  } else return <h2>Loading...</h2>;
};

export default LoggedToday;
