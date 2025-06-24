import "./FoodHistory.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { getFoodHistoryThunk } from "../../redux/foodHistory";
import { useDispatch } from "react-redux";
import { IFoodHistory } from "../../../types/foodHistory";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FoodHistoryLog from "./FoodHistoryLog";

const FoodHistory = () => {
  const foodHistoryLogs = useAppSelector(
    (state) => state.foodHistory.allFoodHistory
  );

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFoodHistory = async () => {
      await dispatch(getFoodHistoryThunk());
    };
    if (!isLoaded) {
      getFoodHistory();
      setIsLoaded(true);
    }
  });

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div id="food-history">
      <h1 id="food-history-title">History</h1>
      <hr id="food-history-line" />
      <div id="food-history-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Date</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Carbs</TableCell>
                <TableCell align="right">Fat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodHistoryLogs.map(
                (foodHistoryLog: IFoodHistory, i: number) => (
                  <FoodHistoryLog
                    foodHistoryLog={foodHistoryLog}
                    key={`${FoodHistoryLog.id}-${i}`}
                  />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FoodHistory;
