import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  getFoodHistoryThunk,
  updateFoodHistoryThunk,
} from "../../../../redux/foodHistory";
import { useDispatch } from "react-redux";
import { IMenuItem } from "../../../../../types/menuItems";
import { IFoodHistory } from "../../../../../types/foodHistory";

const FoodHistoryLogMenuItem = ({
  foodHistoryLog,
  menuItem,
}: {
  foodHistoryLog: IFoodHistory;
  menuItem: IMenuItem;
}) => {
  const [calories, setCalories] = useState(menuItem.calories);
  const [protein, setProtein] = useState(menuItem.protein);
  const [carbs, setCarbs] = useState(menuItem.carbs);
  const [fat, setFat] = useState(menuItem.fat);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedFoodArray = foodHistoryLog?.food?.filter(
      (item: IMenuItem) => item.id !== menuItem.id
    );

    const updatedFoodHistory = {
      ...foodHistoryLog,
      food: updatedFoodArray,
    };

    await dispatch(updateFoodHistoryThunk(updatedFoodHistory));
    await dispatch(getFoodHistoryThunk());
  };

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false);
    const updatedFoodArray = foodHistoryLog?.food?.map((item) =>
      item.id === menuItem.id
        ? {
            ...item,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat,
          }
        : item
    );
    await dispatch(
      updateFoodHistoryThunk({
        id: foodHistoryLog.id,
        food: updatedFoodArray,
      })
    );
  };

  return (
    <TableRow>
      <TableCell>{menuItem.name}</TableCell>
      {isEditing ? (
        <TableCell>
          <input
            className="food-history-log-macro-input"
            type="number"
            disabled={!isEditing}
            onChange={(e) => setCalories(e.target.value)}
            value={calories}
          ></input>
        </TableCell>
      ) : (
        <TableCell className="food-history-log-macro">{calories}</TableCell>
      )}
      {isEditing ? (
        <TableCell>
          <input
            className="food-history-log-macro-input"
            type="number"
            disabled={!isEditing}
            onChange={(e) => setProtein(e.target.value)}
            value={protein}
          ></input>
        </TableCell>
      ) : (
        <TableCell className="food-history-log-macro">{protein}</TableCell>
      )}
      {isEditing ? (
        <TableCell>
          <input
            className="food-history-log-macro-input"
            type="number"
            disabled={!isEditing}
            onChange={(e) => setCarbs(e.target.value)}
            value={carbs}
          ></input>
        </TableCell>
      ) : (
        <TableCell className="food-history-log-macro">{carbs}</TableCell>
      )}
      {isEditing ? (
        <TableCell>
          <input
            className="food-history-log-macro-input"
            type="number"
            disabled={!isEditing}
            onChange={(e) => setFat(e.target.value)}
            value={fat}
          ></input>
        </TableCell>
      ) : (
        <TableCell className="food-history-log-macro">{fat}</TableCell>
      )}
      <TableCell>
        <button
          style={{ margin: ".4rem 0 0 1rem" }}
          className="food-history-log-button"
          id="food-history-log-button-delete"
          onClick={(e) => handleDelete(e)}
        >
          <FaTrash />
        </button>
      </TableCell>
      {isEditing ? (
        <TableCell>
          <button
            style={{ marginTop: ".5rem" }}
            className="food-history-log-button"
            id="food-history-log-button-edit"
            onClick={(e) => handleEdit(e)}
          >
            <FaCheck />
          </button>
        </TableCell>
      ) : (
        <TableCell>
          <button
            style={{ marginTop: ".5rem" }}
            className="food-history-log-button"
            id="food-history-log-button-edit"
            onClick={() => setIsEditing(true)}
          >
            <FaPencil />
          </button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default FoodHistoryLogMenuItem;
