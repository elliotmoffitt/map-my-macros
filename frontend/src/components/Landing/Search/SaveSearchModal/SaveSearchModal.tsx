import "./SaveSearchModal.css";
// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveSearchThunk } from "../../../../redux/savedSearches";

// const SaveSearchModal = ({ disabled }: { disabled: boolean }) => {
const SaveSearchModal = ({ disabled, macros, onSavedSearch }) => {
  const [food, calories, protein, carbs, fat] = macros;
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleSaveSearch = async () => {
    const savedSearch = await dispatch(
      saveSearchThunk([
        name,
        food,
        calories[0],
        calories[1],
        protein[0],
        protein[1],
        carbs[0],
        carbs[1],
        fat[0],
        fat[1],
      ])
    );
    // if (savedSearch) onSavedSearch(savedSearch);
    handleClose();
  };

  useEffect(() => {
    name.length > 0 ? setNameEmpty(false) : setNameEmpty(true);
  }, [name, nameEmpty]);

  useEffect(() => {
    // if ()
  }, [name, food, calories, protein, carbs, fat]);

  return (
    <div>
      <Button
        onClick={handleOpen}
        id={
          disabled
            ? "save-search-modal-save-search-disabled"
            : "save-search-modal-save-search"
        }
        disabled={disabled}
      >
        Save Search
        <FaBookmark />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="save-search-modal-modal">
          <h2 id="save-search-modal-title">Save Search</h2>
          <hr id="save-search-modal-line" />
          <label id="save-search-modal-input-title">Name</label>
          <input
            id="save-search-modal-input"
            required
            onChange={(e) => {
              setName(e.target.value);
              setNameEmpty(false);
            }}
          ></input>
          <div id="save-search-modal-cancel-save">
            <Button id="save-search-modal-cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              id={
                nameEmpty
                  ? "save-search-modal-save-disabled"
                  : "save-search-modal-save"
              }
              onClick={handleSaveSearch}
              type="submit"
              disabled={nameEmpty}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SaveSearchModal;
