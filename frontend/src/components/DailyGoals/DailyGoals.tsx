import { useEffect, useState } from "react";
import "./DailyGoals.css";
import LoggedToday from "./LoggedToday";
import { FaBookmark, FaCheck, FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  createDailyGoalThunk,
  getDailyGoalsThunk,
  updateDailyGoalThunk,
  updateTodaysProgressThunk,
} from "../../redux/dailyGoals";
import { useAppSelector } from "../../redux/store";
import {
  createFoodHistoryThunk,
  updateFoodHistoryThunk,
} from "../../redux/foodHistory";
import { getMenuItemsTodayThunk } from "../../redux/menuItems";

const DailyGoals = (): JSX.Element => {
  const dailyGoal = useAppSelector(
    (state) => state.dailyGoals.allDailyGoals
  )[0];
  const menuItemsToday = useAppSelector(
    (state) => state.menuItems.allMenuItems
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditingToday, setIsEditingToday] = useState(false);
  const [isEditingDaily, setIsEditingDaily] = useState(false);
  const [caloriesToday, setCaloriesToday] = useState("");
  const [proteinToday, setProteinToday] = useState("");
  const [carbsToday, setCarbsToday] = useState("");
  const [fatToday, setFatToday] = useState("");
  const [id, setId] = useState(0);
  const [caloriesDaily, setCaloriesDaily] = useState("");
  const [proteinDaily, setProteinDaily] = useState("");
  const [carbsDaily, setCarbsDaily] = useState("");
  const [fatDaily, setFatDaily] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getDailyGoals = async () => {
      const dailyGoals = await dispatch(getDailyGoalsThunk());
      await dispatch(getMenuItemsTodayThunk());
      if (dailyGoals) {
        setId(dailyGoals[0].id);
        setCaloriesDaily(dailyGoals[0].caloriesDaily);
        setProteinDaily(dailyGoals[0].proteinDaily);
        setCarbsDaily(dailyGoals[0].carbsDaily);
        setFatDaily(dailyGoals[0].fatDaily);
        setCaloriesToday(dailyGoals[0].caloriesToday);
        setProteinToday(dailyGoals[0].proteinToday);
        setCarbsToday(dailyGoals[0].carbsToday);
        setFatToday(dailyGoals[0].fatToday);
      }
    };
    if (!isLoaded) {
      getDailyGoals();
      setIsLoaded(true);
    }
  }, [dispatch, isLoaded]);

  // useEffect(() => {

  // }, [dispatch])

  const handleSaveDaily = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditingDaily(false);
    let dailyGoal;
    if (id === 0) {
      dailyGoal = await dispatch(
        createDailyGoalThunk({
          caloriesDaily: caloriesDaily,
          proteinDaily: proteinDaily,
          carbsDaily: carbsDaily,
          fatDaily: fatDaily,
        })
      );
    } else {
      await dispatch(
        updateDailyGoalThunk({
          id: id,
          caloriesDaily: caloriesDaily,
          proteinDaily: proteinDaily,
          carbsDaily: carbsDaily,
          fatDaily: fatDaily,
        })
      );
    }
  };
  const handleSaveToday = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditingToday(false);
    await dispatch(
      updateTodaysProgressThunk({
        id: id,
        caloriesToday: caloriesToday,
        proteinToday: proteinToday,
        carbsToday: carbsToday,
        fatToday: fatToday,
      })
    );
  };

  const handleCloseProgress = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await dispatch(
      createFoodHistoryThunk({
        calories: caloriesToday,
        protein: proteinToday,
        carbs: carbsToday,
        fat: fatToday,
        food: menuItemsToday,
      })
    );
    // UPDATE HISTORY
    // updateHistory
    // UPDATE DAILY GOALS TODAY PROGRESS
    // updateDailyGoalThunk();
  };

  return (
    <div id="daily-goals">
      <h1 id="daily-goals-title">Daily Goals</h1>
      <div id="daily-goals-forms">
        <div className="daily-goals-form">
          <h2 className="daily-goals-form-title">Today's Progress</h2>
          <hr className="daily-goals-form-line" />
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Calories</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingToday}
              onChange={(e) => setCaloriesToday(e.target.value)}
              value={dailyGoal?.caloriesToday || ""}
            ></input>
          </div>
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Protein</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingToday}
              placeholder="(g)"
              onChange={(e) => setProteinToday(e.target.value)}
              value={dailyGoal?.proteinToday || ""}
            ></input>
          </div>
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Carbs</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingToday}
              placeholder="(g)"
              onChange={(e) => setCarbsToday(e.target.value)}
              value={dailyGoal?.carbsToday || ""}
            ></input>
          </div>
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Fat</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingToday}
              placeholder="(g)"
              onChange={(e) => setFatToday(e.target.value)}
              value={dailyGoal?.fatToday || ""}
            ></input>
          </div>
          {isEditingToday ? (
            <button
              className="daily-goals-save-button"
              onClick={(e) => handleSaveToday(e)}
            >
              Save
              <FaCheck />
            </button>
          ) : (
            <button
              className="daily-goals-edit-button"
              onClick={() => setIsEditingToday(true)}
            >
              Edit
              <FaPencilAlt />
            </button>
          )}
          <button
            id="daily-goals-close-button"
            onClick={(e) => handleCloseProgress(e)}
          >
            Close <FaCheck />
          </button>
        </div>

        <div className="daily-goals-form">
          <h2 className="daily-goals-form-title">Daily Goals</h2>
          <hr className="daily-goals-form-line" />
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Calories</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingDaily}
              onChange={(e) => setCaloriesDaily(e.target.value)}
              value={caloriesDaily}
            ></input>
          </div>
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Protein</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingDaily}
              placeholder="(g)"
              onChange={(e) => setProteinDaily(e.target.value)}
              value={proteinDaily}
            ></input>
          </div>
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Carbs</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingDaily}
              placeholder="(g)"
              onChange={(e) => setCarbsDaily(e.target.value)}
              value={carbsDaily}
            ></input>
          </div>
          <div className="daily-goals-input-label-container">
            <label className="daily-goals-label">Fat</label>
            <input
              className="daily-goals-input"
              type="number"
              disabled={!isEditingDaily}
              placeholder="(g)"
              onChange={(e) => setFatDaily(e.target.value)}
              value={fatDaily}
            ></input>
          </div>
          {isEditingDaily ? (
            <button
              className="daily-goals-save-button"
              onClick={(e) => handleSaveDaily(e)}
            >
              Save
              <FaCheck />
            </button>
          ) : (
            <button
              className="daily-goals-edit-button"
              onClick={() => setIsEditingDaily(true)}
            >
              Edit
              <FaPencilAlt />
            </button>
          )}
        </div>
      </div>
      <LoggedToday />
    </div>
  );
};

export default DailyGoals;
