import { useEffect, useState } from "react";
import "./DailyGoals.css";
import LoggedToday from "./LoggedToday";
import { FaBookmark, FaCheck, FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  createDailyGoalThunk,
  getDailyGoalsThunk,
} from "../../redux/dailyGoals";

const DailyGoals = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditingToday, setIsEditingToday] = useState(false);
  const [isEditingDaily, setIsEditingDaily] = useState(false);
  const [caloriesToday, setCaloriesToday] = useState("");
  const [proteinToday, setProteinToday] = useState("");
  const [carbsToday, setCarbsToday] = useState("");
  const [fatToday, setFatToday] = useState("");
  const [caloriesDaily, setCaloriesDaily] = useState("");
  const [proteinDaily, setProteinDaily] = useState("");
  const [carbsDaily, setCarbsDaily] = useState("");
  const [fatDaily, setFatDaily] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDailyGoals = async () => {
      const dailyGoals = await dispatch(getDailyGoalsThunk());
      if (dailyGoals) {
        setCaloriesToday(dailyGoals.caloriesToday);
        setProteinToday(dailyGoals.proteinToday);
        setCarbsToday(dailyGoals.carbsToday);
        setFatToday(dailyGoals.fatToday);
        setCaloriesDaily(dailyGoals.caloriesDaily);
        setProteinDaily(dailyGoals.proteinDaily);
        setCarbsDaily(dailyGoals.carbsDaily);
        setFatDaily(dailyGoals.fatDaily);
      }
    };
    if (!isLoaded) {
      fetchDailyGoals();
      setIsLoaded(true);
    }
  }, [dispatch, isLoaded]);

  const handleSaveToday = () => {};
  const handleSaveDaily = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditingDaily(false);
    await dispatch(
      createDailyGoalThunk({
        caloriesDaily: caloriesDaily,
        proteinDaily: proteinDaily,
        carbsDaily: carbsDaily,
        fatDaily: fatDaily,
      })
    );
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
              value={caloriesToday}
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
              value={proteinToday}
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
              value={carbsToday}
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
              value={fatToday}
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
