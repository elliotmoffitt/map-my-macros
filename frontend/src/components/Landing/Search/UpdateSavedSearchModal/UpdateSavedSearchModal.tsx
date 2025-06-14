import "./UpdateSavedSearchModal.css";
// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaBookmark, FaExclamationCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveSearchThunk, updateSavedSearchThunk } from "../../../../redux/savedSearches";
import { useAppSelector } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { ISearchErrors } from "../../../../../types/menuItems";

// const UpdateSavedSearchModal = ({ disabled }: { disabled: boolean }) => {
const UpdateSavedSearchModal = ({ open, handleClose, savedSearch, onUpdatedSearch }) => {
  const {
    id,
    name,
    food,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    minCarbs,
    maxCarbs,
    minFat,
    maxFat,
  } = savedSearch;
  // const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedFood, setUpdatedFood] = useState(food);
  const [calories, setCalories] = useState([minCalories, maxCalories]);
  const [protein, setProtein] = useState([minProtein, maxProtein]);
  const [carbs, setCarbs] = useState([minCarbs, maxCarbs]);
  const [fat, setFat] = useState([minFat, maxFat]);
  const [errors, setErrors] = useState<ISearchErrors>({});
  const [disabled, setDisabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useAppSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const newErrors: ISearchErrors = {};
    const macros = { calories, protein, carbs, fat };

    for (const [name, macro] of Object.entries(macros) as [
      keyof ISearchErrors,
      string[]
    ][]) {
      if (macro[1] && macro[1].length && Number(macro[0]) > Number(macro[1])) {
        newErrors[
          name
        ] = `Fields can be empty, but minimum ${name} cannot be greater than maximum ${name}`;
      }
    }
    setErrors(newErrors);
    if (
      newErrors.calories ||
      newErrors.protein ||
      newErrors.carbs ||
      newErrors.fat
    ) {
      setDisabled(true);
    } else setDisabled(false);
  }, [calories, protein, carbs, fat]);

  useEffect(() => {
    if (!isLoaded) {
    }
    setIsLoaded(true);
  }, calories);

  const handleUpdateSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedSearch = await dispatch(
      updateSavedSearchThunk({
        id: id,
        name: updatedName,
        food: updatedFood,
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
    console.log(updatedSearch)
    if (updatedSearch) {
      onUpdatedSearch(updatedSearch);
      handleClose(true);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="update-search-box">
        {/* <Typography id="modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
        <input id='update-search-name' value={updatedName ? updatedName : ''} onChange={(e) => setUpdatedName(e.target.value)}></input>
        <hr id='update-search-line'></hr>
        <div className="update-search-input-title-container">
          <div className="update-search-input-title-error-container">
            <div className="update-search-error-icon-message">
              {errors.calories && (
                <p className="update-search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="update-search-error-message">{errors.calories}</p>
            </div>
            <label className="update-search-input-title">Calories</label>
          </div>
          <div className="update-search-input-container">
            <input
              className="update-search-input"
              placeholder="min"
              type="number"
              min={0}
              step={10}
              onChange={(e) => setCalories([e.target.value, calories[1]])}
              value={calories[0] ? calories[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="update-search-input"
              placeholder="max"
              type="number"
              min={0}
              step={10}
              onChange={(e) => setCalories([calories[0], e.target.value])}
              value={calories[1] ? calories[1] : ""}
            ></input>
          </div>
        </div>
        <div className="update-search-input-title-container">
          <div className="update-search-input-title-error-container">
            <div className="update-search-error-icon-message">
              {errors.protein && (
                <p className="update-search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="update-search-error-message">{errors.protein}</p>
            </div>
            <label className="update-search-input-title">Protein</label>
          </div>
          <div className="update-search-input-container">
            <input
              className="update-search-input"
              placeholder="min (g)"
              type="number"
              min={0}
              onChange={(e) => setProtein([e.target.value, protein[1]])}
              value={protein[0] ? protein[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="update-search-input"
              placeholder="max (g)"
              type="number"
              min={0}
              onChange={(e) => setProtein([protein[0], e.target.value])}
              value={protein[1] ? protein[1] : ""}
            ></input>
          </div>
        </div>
        <div className="update-search-input-title-container">
          <div className="update-search-input-title-error-container">
            <div className="update-search-error-icon-message">
              {errors.carbs && (
                <p className="update-search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="update-search-error-message">{errors.carbs}</p>
            </div>
            <label className="update-search-input-title">Carbs</label>
          </div>
          <div className="update-search-input-container">
            <input
              className="update-search-input"
              placeholder="min (g)"
              type="number"
              min={0}
              onChange={(e) => setCarbs([e.target.value, carbs[1]])}
              value={carbs[0] ? carbs[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="update-search-input"
              placeholder="max (g)"
              type="number"
              min={0}
              onChange={(e) => setCarbs([carbs[0], e.target.value])}
              value={carbs[1] ? carbs[1] : ""}
            ></input>
          </div>
        </div>
        <div className="update-search-input-title-container">
          <div className="update-search-input-title-error-container">
            <div className="update-search-error-icon-message">
              {errors.fat && (
                <p className="update-search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="update-search-error-message">{errors.fat}</p>
            </div>
            <label className="update-search-input-title">Fat</label>
          </div>
          <div className="update-search-input-container">
            <input
              className="update-search-input"
              placeholder="min (g)"
              type="number"
              min={0}
              onChange={(e) => setFat([e.target.value, fat[1]])}
              value={fat[0] ? fat[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="update-search-input"
              placeholder="max (g)"
              type="number"
              min={0}
              onChange={(e) => setFat([fat[0], e.target.value])}
              value={fat[1] ? fat[1] : ""}
            ></input>
          </div>
        </div>
        <div className="update-search-input-title-container">
          <h4 id="update-search-input-title-food">Food</h4>
          <input
            id="update-search-input-food"
            required
            onChange={(e) => setUpdatedFood(e.target.value)}
            value={updatedFood ? updatedFood : ""}
          ></input>
        </div>
        <div id="update-search-cancel-save">
          <Button id="update-search-cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            id={
              nameEmpty
                ? "update-search-save-disabled"
                : "update-search-save"
            }
            onClick={handleUpdateSearch}
            type="submit"
            disabled={nameEmpty}
            formNoValidate
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal >
  );
};

export default UpdateSavedSearchModal;
