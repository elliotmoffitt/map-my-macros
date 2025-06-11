import "./SavedSearches.css";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../../../../redux/store";
import { getSavedSearchesThunk } from "../../../../redux/savedSearches";
import { useDispatch } from "react-redux";

const SavedSearches = ({ onSavedSearchSelect }) => {
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
  }, [dispatch, isLoaded, savedSearches]);
  if (isLoaded) {
    return (
      <div id="saved-searches">
        <h4 id="saved-searches-title">Saved Searches</h4>
        <Autocomplete
          id="saved-searches-dropdown"
          disablePortal
          options={savedSearches}
          getOptionLabel={(savedSearch: any) => savedSearch.name}
          renderOption={(savedSearches, savedSearch) => (
            <li {...savedSearches} key={savedSearch.id}>
              {savedSearch.name}
            </li>
          )}
          onChange={(_e, selectedSearch) => {
            onSavedSearchSelect(selectedSearch);
          }}
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
