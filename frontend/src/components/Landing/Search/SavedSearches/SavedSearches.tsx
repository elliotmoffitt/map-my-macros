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
import { FaPencil } from "react-icons/fa6";
import UpdateSavedSearchModal from "../UpdateSavedSearchModal";
import { ISearch } from "../../../../redux/types/search";

const SavedSearches = ({ onSavedSearchSelect, onUpdatedSearch }:
  { onSavedSearchSelect: CallableFunction, onUpdatedSearch: CallableFunction }): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState<ISearch | null>(null);
  const [selectedSearchToEdit, setSelectedSearchToEdit] = useState<ISearch | null>(null);
  const dispatch = useDispatch();
  const savedSearches = useAppSelector(
    (state) => state.savedSearches.allSavedSearches
  );

  useEffect(() => {
    const getAllSavedSearches = async () => {
      await dispatch(getSavedSearchesThunk());
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getAllSavedSearches();
    }
  }, [dispatch, isLoaded, savedSearches]);

  const handleDeleteSavedSearch = async (e: React.MouseEvent<HTMLButtonElement>, savedSearchId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSearch(null);
    await dispatch(deleteSavedSearchThunk(savedSearchId));
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>, search: ISearch) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSearchToEdit(search);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSearchToEdit(null);
  };

  const handleUpdatedSearch = (updatedSearch: ISearch) => {
    setSelectedSearch(updatedSearch);
    onUpdatedSearch?.(updatedSearch);
  }

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div id="saved-searches">
      <h4 id="saved-searches-title">Saved Searches</h4>
      {selectedSearchToEdit && (
        <UpdateSavedSearchModal
          open={modalOpen}
          handleClose={handleCloseModal}
          savedSearch={selectedSearchToEdit}
          onUpdatedSearch={handleUpdatedSearch}
        />
      )}

      <Autocomplete
        id="saved-searches-dropdown"
        disablePortal
        value={selectedSearch}
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
            <div className="saved-searches-option-buttons">
              <button
                className="saved-searches-option-button saved-searches-option-edit"
                onClick={(e) => handleOpenModal(e, savedSearch)}
                formNoValidate
              >
                <FaPencil />
              </button>
              <button
                className="saved-searches-option-button saved-searches-option-delete"
                onClick={(e) => handleDeleteSavedSearch(e, savedSearch.id!)}
                formNoValidate
              >
                <FaTrash />
              </button>
            </div>
          </li>
        )}
        onChange={(_e, selectedSearch) => {
          setSelectedSearch(selectedSearch)
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
};

export default SavedSearches;
