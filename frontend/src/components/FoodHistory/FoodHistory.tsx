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
      {foodHistoryLogs.length ? (
        <div id="food-history-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F1F1F1" }}>
                  <TableCell />
                  <TableCell
                    sx={{ fontFamily: "var(--title-font)", fontSize: "1.5rem" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "var(--title-font)", fontSize: "1.5rem" }}
                  >
                    Calories
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "var(--title-font)", fontSize: "1.5rem" }}
                  >
                    Protein
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "var(--title-font)", fontSize: "1.5rem" }}
                  >
                    Carbs
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "var(--title-font)", fontSize: "1.5rem" }}
                  >
                    Fat
                  </TableCell>
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
      ) : (
        <h4>No History</h4>
      )}
    </div>
  );
};

export default FoodHistory;
