import { useState } from "react";

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

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FoodHistoryLog = ({
  foodHistoryLog,
}: {
  foodHistoryLog: IFoodHistory;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {Date(foodHistoryLog.createdAt).split(" ").slice(0, 4).join(" ")}
        </TableCell>
        <TableCell>{foodHistoryLog.calories}</TableCell>
        <TableCell>{foodHistoryLog.protein}</TableCell>
        <TableCell>{foodHistoryLog.carbs}</TableCell>
        <TableCell>{foodHistoryLog.fat}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodHistoryLog.food?.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.calories}</TableCell>
                      <TableCell>{item.protein}</TableCell>
                      <TableCell>{item.carbs}</TableCell>
                      <TableCell>{item.fat}</TableCell>
                    </TableRow>
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
