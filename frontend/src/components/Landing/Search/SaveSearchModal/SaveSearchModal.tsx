import "./SaveSearchModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveSearchThunk } from "../../../../redux/savedSearches";

const SaveSearchModal = ({ disabled, macros }:
  { disabled: boolean, macros: [string, string[], string[], string[], string[]] }): JSX.Element => {
  const [food, calories, protein, carbs, fat] = macros;
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleSaveSearch = async () => {
    await dispatch(
      saveSearchThunk({
        name: name,
        food: food,
        minCalories: calories[0],
        maxCalories: calories[1],
        minProtein: protein[0],
        maxProtein: protein[1],
        minCarbs: carbs[0],
        maxCarbs: carbs[1],
        minFat: fat[0],
        maxFat: fat[1],
      })
    );
    handleClose();
  };

  useEffect(() => {
    name.length > 0 ? setNameEmpty(false) : setNameEmpty(true);
  }, [name, nameEmpty]);

  return (
    <>
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
    </>
  );
};

export default SaveSearchModal;
