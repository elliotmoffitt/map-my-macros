import "./SavedSearches.css";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../../../../redux/store";
import {
  deleteSavedSearchThunk,
  getSavedSearchesThunk,
} from "../../../../redux/savedSearches";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

const SavedSearches = ({ onSavedSearchSelect, newSavedSearch }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const savedSearches = useAppSelector(
    (state) => state.savedSearches.savedSearches
  );
  console.log(savedSearches);

  useEffect(() => {
    const getAllSavedSearches = async () => {
      await dispatch(getSavedSearchesThunk());
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getAllSavedSearches();
    }
  }, [dispatch, isLoaded, savedSearches, newSavedSearch]);

  const handleDeleteSavedSearch = async (e, savedSearchId: number) => {
    e.preventDefault();
    e.stopPropagation();
    onSavedSearchSelect(true);
    await dispatch(deleteSavedSearchThunk(savedSearchId));
  };

  if (isLoaded) {
    return (
      <div id="saved-searches">
        <h4 id="saved-searches-title">Saved Searches</h4>
        <Autocomplete
          id="saved-searches-dropdown"
          disablePortal
          options={savedSearches}
          getOptionLabel={(savedSearch: any) => savedSearch.name}
          renderOption={(props, savedSearch) => (
            <li
              {...props}
              className="saved-searches-option"
              key={`${savedSearch.id}-${Date.now()}`}
            >
              <span className="saved-searches-option-text">
                {savedSearch.name}
              </span>
              <button
                className="saved-searches-option-delete"
                onClick={(e) => {
                  handleDeleteSavedSearch(e, savedSearch.id);
                }}
                formNoValidate
              >
                <FaTrash />
              </button>
            </li>
          )}
          sx={{ width: 300 }}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 4],
                  },
                },
              ],
            },
            paper: {
              sx: {
                "& .MuiAutocomplete-option": {
                  fontFamily: "var(--primary-font)",
                  fontSize: "14px",
                },
              },
            },
          }}
          renderInput={(params) => (
            <TextField className="saved-searches-text-field" {...params} />
          )}
        />
      </div>
    );
  } else return <h2>Loading...</h2>;
};

export default SavedSearches;
