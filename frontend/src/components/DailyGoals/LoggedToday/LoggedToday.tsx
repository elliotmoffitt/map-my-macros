import "./LoggedToday.css";

const LoggedToday = () => {
  return (
    <div id="logged-today">
      <h2 id="logged-today-title">Food Logged Today</h2>
      <hr id="logged-today-line" />
      <div id="logged-today-menu-items">
        {/* {menuItems.map((menuItem, i) => {})} */}
      </div>
    </div>
  );
};

export default LoggedToday;
