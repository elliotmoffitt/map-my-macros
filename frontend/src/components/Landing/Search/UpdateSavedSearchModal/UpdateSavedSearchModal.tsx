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
import { useAppSelector } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { ISearchErrors } from "../../../../../types/menuItems";

// const UpdateSavedSearchModal = ({ disabled }: { disabled: boolean }) => {
const UpdateSavedSearchModal = ({ open, handleClose, savedSearch }) => {
  console.log(savedSearch);
  const {
    selectedFood,
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
  const [food, setFood] = useState(selectedFood);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   const getMenuItems = await dispatch(
    //     getMenuItemsThunk({
    //       food: food,
    //       minCalories: calories[0],
    //       maxCalories: calories[1],
    //       minProtein: protein[0],
    //       maxProtein: protein[1],
    //       minCarbs: carbs[0],
    //       maxCarbs: carbs[1],
    //       minFat: fat[0],
    //       maxFat: fat[1],
    //     })
    //   );
    //   if (getMenuItems) {
    //     navigate("/results");
    //   }
    // };
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid white",
    boxShadow: 24,
    p: 4,

    // const [open, setOpen] = useState(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="update-search-modal-box">
        <p style={{ color: "white" }}>{name}</p>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        <div className="search-input-title-container">
          <div className="search-input-title-error-container">
            <div className="search-error-icon-message">
              {errors.calories && (
                <p className="search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="search-error-message">{errors.calories}</p>
            </div>
            <label className="search-input-title">Calories</label>
          </div>
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="min"
              type="number"
              min={0}
              step={10}
              onChange={(e) => setCalories([e.target.value, calories[1]])}
              value={calories[0] ? calories[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="search-input"
              placeholder="max"
              type="number"
              min={0}
              step={10}
              onChange={(e) => setCalories([calories[0], e.target.value])}
              value={calories[1] ? calories[1] : ""}
            ></input>
          </div>
        </div>
        <div className="search-input-title-container">
          <div className="search-input-title-error-container">
            <div className="search-error-icon-message">
              {errors.protein && (
                <p className="search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="search-error-message">{errors.protein}</p>
            </div>
            <label className="search-input-title">Protein</label>
          </div>
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="min (g)"
              type="number"
              min={0}
              onChange={(e) => setProtein([e.target.value, protein[1]])}
              value={protein[0] ? protein[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="search-input"
              placeholder="max (g)"
              type="number"
              min={0}
              onChange={(e) => setProtein([protein[0], e.target.value])}
              value={protein[1] ? protein[1] : ""}
            ></input>
          </div>
        </div>
        <div className="search-input-title-container">
          <div className="search-input-title-error-container">
            <div className="search-error-icon-message">
              {errors.carbs && (
                <p className="search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="search-error-message">{errors.carbs}</p>
            </div>
            <label className="search-input-title">Carbs</label>
          </div>
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="min (g)"
              type="number"
              min={0}
              onChange={(e) => setCarbs([e.target.value, carbs[1]])}
              value={carbs[0] ? carbs[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="search-input"
              placeholder="max (g)"
              type="number"
              min={0}
              onChange={(e) => setCarbs([carbs[0], e.target.value])}
              value={carbs[1] ? carbs[1] : ""}
            ></input>
          </div>
        </div>
        <div className="search-input-title-container">
          <div className="search-input-title-error-container">
            <div className="search-error-icon-message">
              {errors.fat && (
                <p className="search-error-icon">
                  <FaExclamationCircle />
                </p>
              )}
              <p className="search-error-message">{errors.fat}</p>
            </div>
            <label className="search-input-title">Fat</label>
          </div>
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="min (g)"
              type="number"
              min={0}
              onChange={(e) => setFat([e.target.value, fat[1]])}
              value={fat[0] ? fat[0] : ""}
            ></input>
            <h4>—</h4>
            <input
              className="search-input"
              placeholder="max (g)"
              type="number"
              min={0}
              onChange={(e) => setFat([fat[0], e.target.value])}
              value={fat[1] ? fat[1] : ""}
            ></input>
          </div>
        </div>
        <div className="search-input-title-container">
          <h4 id="search-input-title-food">Food</h4>
          <input
            id="search-input-food"
            required
            onChange={(e) => setFood(e.target.value)}
            value={food ? food : ""}
          ></input>
        </div>
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
            // onClick={handleUpdateSearch}
            type="submit"
            disabled={nameEmpty}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateSavedSearchModal;
