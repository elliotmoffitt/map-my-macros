import "./UpdateSavedSearchModal.css";
// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveSearchThunk } from "../../../../redux/savedSearches";

// const UpdateSavedSearchModal = ({ disabled }: { disabled: boolean }) => {
const UpdateSavedSearchModal = ({ open, handleClose, savedSearch }) => {
  // const [food, calories, protein, carbs, fat] = savedSearch;
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const [open, setOpen] = useState(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateSavedSearchModal;
