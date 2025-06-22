import React, { useEffect, useState } from "react";
import "./MenuItemCard.css";
import {
  FaFire,
  FaDumbbell,
  FaBreadSlice,
  FaTint,
  FaLocationArrow,
  FaPencilAlt,
  FaCheck,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import {
  createMenuItemThunk,
  deleteMenuItemThunk,
  updateMenuItemThunk,
} from "../../../redux/menuItems";
import { useDispatch } from "react-redux";
import {
  createDailyGoalThunk,
  getDailyGoalsThunk,
  getDailyGoalsTodayThunk,
  updateDailyGoalThunk,
  updateTodaysProgressThunk,
} from "../../../redux/dailyGoals";

const MenuItemCard = (menuItem: any) => {
  const round = (macro: number | string | null | undefined) => {
    const value = Number(macro);
    return isNaN(value) ? "0" : Math.ceil(value).toString();
  };
  const [isEditing, setIsEditing] = useState(false);
  const [isSpoonacular, setIsSpoonacular] = useState(
    menuItem.menuItem.nutrition ? true : false
  );
  const [calories, setCalories] = useState(
    !isSpoonacular ? menuItem.menuItem.calories : ""
  );
  const [protein, setProtein] = useState(
    !isSpoonacular ? round(menuItem.menuItem.protein) : ""
  );
  const [carbs, setCarbs] = useState(
    !isSpoonacular ? round(menuItem.menuItem.carbs) : ""
  );
  const [fat, setFat] = useState(
    !isSpoonacular ? round(menuItem.menuItem.fat) : ""
  );
  const [isAdded, setIsAdded] = useState(false);
  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (menuItem.menuItem.nutrition) setIsSpoonacular(true);
    else setIsSpoonacular(false);
  });

  const result = menuItem.menuItem;

  const handleAddMenuItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAdded(true);
    setIsEditing(false);
    await dispatch(
      createMenuItemThunk({
        restaurantName: result.restaurantChain,
        name: result.title,
        imageUrl: result.image,
        calories: result.nutrition.calories,
        protein: result.nutrition.protein.slice(0, -1),
        carbs: result.nutrition.carbs.slice(0, -1),
        fat: result.nutrition.fat.slice(0, -1),
      })
    );
    if (id === 0) {
      const dailyGoal = await dispatch(
        createDailyGoalThunk({
          caloriesToday: calories,
          proteinToday: protein,
          carbsToday: carbs,
          fatToday: fat,
        })
      );
      // setId(dailyGoal[0].id);
      // setCalories(dailyGoal.calories);
      // setProtein(dailyGoal.protein);
      // setCarbs(dailyGoal.carbs);
      // setFat(dailyGoal.fat);
    } else {
      const dailyGoal = await dispatch(getDailyGoalsTodayThunk()[0]);

      await dispatch(
        updateTodaysProgressThunk({
          id: dailyGoal.id,
          caloriesToday: dailyGoal.calories,
          proteinToday: dailyGoal.protein,
          carbsToday: dailyGoal.carbs,
          fatToday: dailyGoal.fat,
        })
      );
    }
  };

  const handleLoggedSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false);
    const updatedMenuItem = await dispatch(
      updateMenuItemThunk({
        id: result.id,
        restaurantName: result.restaurantName,
        name: result.name,
        calories: calories ? calories : 0,
        protein: protein ? protein : "0",
        carbs: carbs ? carbs : "0",
        fat: fat ? fat : "0",
      })
    );
    setCalories(updatedMenuItem.calories);
    setProtein(updatedMenuItem.protein);
    setCarbs(updatedMenuItem.carbs);
    setFat(updatedMenuItem.fat);
  };

  const handleDeleteMenuItem = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await dispatch(deleteMenuItemThunk(result.id));
  };

  return (
    <div className="menu-item-card">
      <h2 className="menu-item-restaurant">
        {isSpoonacular ? result.restaurantChain : result.restaurantName}
      </h2>
      <p className="menu-item-name">
        {isSpoonacular ? result.title : result.name}
      </p>
      {result.image || result.imageUrl ? (
        <img
          src={result.image || result.imageUrl}
          className="menu-item-card-image"
        />
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
              value={calories}
              className="menu-item-nutrition-input"
              placeholder="Calories"
              type="number"
              onChange={(e) => setCalories(e.target.value)}
              min={0}
              step={10}
            ></input>
          </span>
        ) : (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaFire />
            </span>
            {isSpoonacular ? round(result.nutrition.calories) : calories}{" "}
            Calories
          </span>
        )}
        {isEditing && !isSpoonacular ? (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaDumbbell />
            </span>
            <input
              value={protein}
              className="menu-item-nutrition-input"
              placeholder="Protein"
              type="number"
              onChange={(e) => setProtein(round(e.target.value))}
              min={0}
            ></input>
          </span>
        ) : (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaDumbbell />
            </span>
            {isSpoonacular ? result.nutrition.protein.slice(0, -1) : protein}g
            Protein
          </span>
        )}
        {isEditing && !isSpoonacular ? (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaBreadSlice />
            </span>
            <input
              value={carbs}
              className="menu-item-nutrition-input"
              placeholder="Carbs"
              type="number"
              onChange={(e) => setCarbs(e.target.value)}
              min={0}
            ></input>
          </span>
        ) : (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaBreadSlice />
            </span>
            {isSpoonacular ? result.nutrition.carbs.slice(0, -1) : carbs}g Carbs
          </span>
        )}
        {isEditing && !isSpoonacular ? (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaTint />
            </span>
            <input
              value={fat}
              className="menu-item-nutrition-input"
              placeholder="Fat"
              type="number"
              onChange={(e) => setFat(e.target.value)}
              min={0}
            ></input>
          </span>
        ) : (
          <span className="menu-item-nutrition">
            <span className="menu-item-nutrition-icon">
              <FaTint />
            </span>
            {isSpoonacular ? result.nutrition.fat.slice(0, -1) : fat}g Fat
          </span>
        )}
      </div>
      {isSpoonacular ? (
        <div className="menu-item-card-save-directions">
          {isAdded ? (
            <button className="menu-item-card-added" disabled>
              Added
              <p className="menu-item-card-icon">
                <FaCheck />
              </p>
            </button>
          ) : (
            <button
              className="menu-item-card-add"
              onClick={(e) => handleAddMenuItem(e)}
            >
              Add
              <p className="menu-item-card-icon">
                <FaPlus />
              </p>
            </button>
          )}
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
              onClick={(e) => handleLoggedSave(e)}
            >
              Save
              <FaCheck />
            </button>
          ) : (
            <div className="menu-item-card-edit-delete">
              <button
                className="daily-goals-edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
                <FaPencilAlt />
              </button>
              <button
                className="daily-goals-delete-button"
                onClick={(e) => handleDeleteMenuItem(e)}
              >
                Delete
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
