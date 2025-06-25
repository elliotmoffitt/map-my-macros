import React, { useState } from "react";

import "./FoodHistoryLog.css";

import { IFoodHistory } from "../../../../types/foodHistory";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { FaCheck, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  deleteFoodHistoryThunk,
  updateFoodHistoryThunk,
} from "../../../redux/foodHistory";
import { useDispatch } from "react-redux";
import FoodHistoryLogMenuItem from "./FoodHistoryLogMenuItem";

const FoodHistoryLog = ({
  foodHistoryLog,
}: {
  foodHistoryLog: IFoodHistory;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [caloriesLog, setCaloriesLog] = useState(foodHistoryLog.calories);
  const [proteinLog, setProteinLog] = useState(foodHistoryLog.protein);
  const [carbsLog, setCarbsLog] = useState(foodHistoryLog.carbs);
  const [fatLog, setFatLog] = useState(foodHistoryLog.fat);
  const [isEditingLog, setIsEditingLog] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteLog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(deleteFoodHistoryThunk(Number(foodHistoryLog.id)));
  };

  const handleEditLog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditingLog(false);
    await dispatch(
      updateFoodHistoryThunk({
        id: foodHistoryLog.id,
        calories: caloriesLog,
        protein: proteinLog,
        carbs: carbsLog,
        fat: fatLog,
      })
    );
  };

  const convertedDate = foodHistoryLog.createdAt
    ? new Date(foodHistoryLog.createdAt)
        .toDateString()
        .split(" ")
        .slice(0, 4)
        .join(" ")
    : "";

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>{convertedDate}</TableCell>
        {isEditingLog ? (
          <TableCell>
            <input
              className="food-history-log-macro-input"
              type="number"
              disabled={!isEditingLog}
              onChange={(e) => setCaloriesLog(e.target.value)}
              value={caloriesLog}
            ></input>
          </TableCell>
        ) : (
          <TableCell className="food-history-log-macro">
            {caloriesLog}
          </TableCell>
        )}
        {isEditingLog ? (
          <TableCell>
            <input
              className="food-history-log-macro-input"
              type="number"
              disabled={!isEditingLog}
              onChange={(e) => setProteinLog(e.target.value)}
              value={proteinLog}
            ></input>
          </TableCell>
        ) : (
          <TableCell className="food-history-log-macro">{proteinLog}</TableCell>
        )}
        {isEditingLog ? (
          <TableCell>
            <input
              className="food-history-log-macro-input"
              type="number"
              disabled={!isEditingLog}
              onChange={(e) => setCarbsLog(e.target.value)}
              value={carbsLog}
            ></input>
          </TableCell>
        ) : (
          <TableCell className="food-history-log-macro">{carbsLog}</TableCell>
        )}
        {isEditingLog ? (
          <TableCell>
            <input
              className="food-history-log-macro-input"
              type="number"
              disabled={!isEditingLog}
              onChange={(e) => setFatLog(e.target.value)}
              value={fatLog}
            ></input>
          </TableCell>
        ) : (
          <TableCell className="food-history-log-macro">{fatLog}</TableCell>
        )}
        <TableCell>
          <button
            style={{ margin: ".4rem 0 0 1rem" }}
            className="food-history-log-button"
            id="food-history-log-button-delete"
            onClick={(e) => handleDeleteLog(e)}
          >
            <FaTrash />
          </button>
        </TableCell>
        {isEditingLog ? (
          <TableCell>
            <button
              style={{ marginTop: ".5rem" }}
              className="food-history-log-button"
              id="food-history-log-button-edit"
              onClick={(e) => handleEditLog(e)}
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
              onClick={() => setIsEditingLog(true)}
            >
              <FaPencil />
            </button>
          </TableCell>
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Foods
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell>Protein</TableCell>
                    <TableCell>Carbs</TableCell>
                    <TableCell>Fat</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodHistoryLog.food?.map((item, i) => (
                    <FoodHistoryLogMenuItem
                      foodHistoryLog={foodHistoryLog}
                      menuItem={item}
                      key={i}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default FoodHistoryLog;
