import { useEffect, useState } from "react";
import "./MenuItemCard.css";
// import {IMenuItem}
import {
  FaFire,
  FaDumbbell,
  FaBreadSlice,
  FaTint,
  FaBookmark,
  FaLocationArrow,
  FaPencilAlt,
  FaCheck,
} from "react-icons/fa";

const MenuItemCard = (menuItem: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSpoonacular, setIsSpoonacular] = useState(false);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    if (menuItem.menuItem.nutrition) setIsSpoonacular(true);
    else setIsSpoonacular(false);
  });

  const round = (macro: number | string) => {
    if (typeof macro !== "number") {
      return Math.ceil(Number(macro.slice(0, -1))).toString();
    } else return Math.ceil(Number(macro)).toString();
  };
  const result = menuItem.menuItem;
  return (
    <div className="menu-item-card">
      <h2 className="menu-item-restaurant">
        {isSpoonacular ? result.restaurantChain : result.restaurantName}
      </h2>
      <p className="menu-item-name">
        {isSpoonacular ? result.title : result.name}
      </p>
      {result.image ? (
        <img src={result.image} className="menu-item-card-image" />
      ) : (
        "No Preview Image"
      )}

      <div className="menu-item-nutrition-container">
        {isEditing && !isSpoonacular ? (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaFire />
            </span>
            <input
              // value={result.calories}
              className="menu-item-nutrition-input"
              placeholder="Calories"
              type="number"
            ></input>
          </span>
        ) : (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaFire />
            </span>
            {isSpoonacular ? round(result.nutrition.calories) : result.calories}{" "}
            Calories
          </span>
        )}

        <span className="menu-item-nutrition">
          <span className="menu-item-nutrition-icon">
            <FaDumbbell />
          </span>
          {isSpoonacular ? round(result.nutrition.protein) : result.protein}g
          Protein
        </span>
        <span className="menu-item-nutrition">
          <span className="menu-item-nutrition-icon">
            <FaBreadSlice />
          </span>
          {isSpoonacular ? round(result.nutrition.carbs) : result.carbs}g Carbs
        </span>
        <span className="menu-item-nutrition">
          <span className="menu-item-nutrition-icon">
            <FaTint />
          </span>
          {isSpoonacular ? round(result.nutrition.fat) : result.fat}g Fat
        </span>
      </div>

      {isSpoonacular ? (
        <div className="menu-item-card-save-directions">
          <button className="menu-item-card-save">
            Save
            <p className="menu-item-card-icon">
              <FaBookmark />
            </p>
          </button>
          <button
            className="menu-item-card-directions"
            onClick={() =>
              window.open(
                `https://google.com/maps/search/${result.restaurantChain}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Directions
            <FaLocationArrow />
          </button>
        </div>
      ) : (
        <div className="menu-item-card-edit-wrapper">
          {isEditing ? (
            <button
              className="daily-goals-save-button"
              onClick={() => setIsEditing(false)}
            >
              Save
              <FaCheck />
            </button>
          ) : (
            <button
              className="daily-goals-edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
              <FaPencilAlt />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
