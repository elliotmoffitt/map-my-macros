import React, { useEffect, useState } from 'react';
import './Search.css';
import { FaSearch, FaBookmark, FaExclamationCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getMenuItemsThunk } from '../../../redux/menuItems';
import { ISearchErrors } from '../../../../types/menuItems';
import { useNavigate } from 'react-router-dom';
import SavedSearches from './SavedSearches';

const Search = (): JSX.Element => {
    const [food, setFood] = useState('')
    const [calories, setCalories] = useState(['', ''])
    const [protein, setProtein] = useState(['', ''])
    const [carbs, setCarbs] = useState(['', ''])
    const [fat, setFat] = useState(['', ''])
    const [errors, setErrors] = useState<ISearchErrors>({})
    const [disabled, setDisabled] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const newErrors:ISearchErrors = {};
        const macros = {calories, protein, carbs, fat}

        for (const [name, macro] of Object.entries(macros) as [keyof ISearchErrors, string[]][]) {
            if (macro[1] && macro[1].length && Number(macro[0]) > Number(macro[1])) {
                newErrors[name] = `Fields can be empty, but minimum ${name} cannot be greater than maximum ${name}`
            }
        }
        setErrors(newErrors)
        if (newErrors.calories || newErrors.protein || newErrors.carbs || newErrors.fat) {
            setDisabled(true);
        }
        else setDisabled(false)
    }, [calories, protein, carbs, fat])

    useEffect(() => {

        if (!isLoaded) {
        }
        setIsLoaded(true);
    }, calories)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getMenuItems = await dispatch(
            getMenuItemsThunk({
                food: food,
                minCalories: calories[0], maxCalories: calories[1],
                minProtein: protein[0], maxProtein: protein[1],
                minCarbs: carbs[0], maxCarbs: carbs[1],
                minFat: fat[0], maxFat: fat[1]
            }));
            if (getMenuItems) {
                navigate('/results')
            }
        }

    const handleSaveSearch = async () => {
        const saveSearch = await dispatch(
            saveSearchThunk({
                food: food,
                minCalories: calories[0], maxCalories: calories[1],
                minProtein: protein[0], maxProtein: protein[1],
                minCarbs: carbs[0], maxCarbs: carbs[1],
                minFat: fat[0], maxFat: fat[1]
            })
        )
    }

    if (isLoaded) {

        return (
        <form onSubmit={handleSubmit} id='search'>
          <h3 id='search-title'>Find your favorite foods</h3>
          <hr id='search-line'/>
          <SavedSearches />
          <div className='search-input-title-container'>
            <div className='search-input-title-error-container'>
                <div className='search-error-icon-message'>
                {errors.calories && <p className='search-error-icon'><FaExclamationCircle/></p>}
                <p className='search-error-message'>{errors.calories}</p>
                </div>
                <h4 className='search-input-title'>Calories</h4>
            </div>
            <div className='search-input-container'>
                <input className='search-input'
                       placeholder='min'
                       type='number'
                       min={0} step={10}
                       onChange={(e) => setCalories([e.target.value, calories[1]])}>
                </input>
                <h4>—</h4>
                <input className='search-input'
                       placeholder='max'
                       type='number'
                       min={0} step={10}
                       onChange={(e) => setCalories([calories[0], e.target.value])}>
                </input>
            </div>
          </div>
        <div className='search-input-title-container'>
            <div className='search-input-title-error-container'>
                <div className='search-error-icon-message'>
                {errors.protein && <p className='search-error-icon'><FaExclamationCircle/></p>}
                <p className='search-error-message'>{errors.protein}</p>
                </div>
                <h4 className='search-input-title'>Protein</h4>
            </div>
            <div className='search-input-container'>
                <input className='search-input'
                       placeholder='min (g)'
                       type='number'
                       min={0}
                       onChange={(e) => setProtein([e.target.value, protein[1]])}>
                </input>
                <h4>—</h4>
                <input className='search-input'
                       placeholder='max (g)'
                       type='number'
                       min={0}
                       onChange={(e) => setProtein([protein[0], e.target.value])}>
                </input>
            </div>
          </div>
            <div className='search-input-title-container'>
            <div className='search-input-title-error-container'>
                <div className='search-error-icon-message'>
                {errors.carbs && <p className='search-error-icon'><FaExclamationCircle/></p>}
                <p className='search-error-message'>{errors.carbs}</p>
                </div>
                <h4 className='search-input-title'>Carbs</h4>
            </div>
            <div className='search-input-container'>
                <input className='search-input'
                       placeholder='min (g)'
                       type='number'
                       min={0}
                       onChange={(e) => setCarbs([e.target.value, carbs[1]])}>
                </input>
                <h4>—</h4>
                <input className='search-input'
                       placeholder='max (g)'
                       type='number'
                       min={0}
                       onChange={(e) => setCarbs([carbs[0], e.target.value])}>
                </input>
            </div>
          </div>
           <div className='search-input-title-container'>
            <div className='search-input-title-error-container'>
                <div className='search-error-icon-message'>
                {errors.fat && <p className='search-error-icon'><FaExclamationCircle/></p>}
                <p className='search-error-message'>{errors.fat}</p>
                </div>
                <h4 className='search-input-title'>Fat</h4>
            </div>
            <div className='search-input-container'>
                <input className='search-input'
                       placeholder='min (g)'
                       type='number'
                       min={0}
                       onChange={(e) => setFat([e.target.value, fat[1]])}>
                </input>
                <h4>—</h4>
                <input className='search-input'
                       placeholder='max (g)'
                       type='number'
                       min={0}
                       onChange={(e) => setFat([fat[0], e.target.value])}>
                </input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 id='search-input-title-food'>Food</h4>
                <input id='search-input-food'
                required
                onChange={(e) => setFood(e.target.value)}>
                </input>
          </div>
         <button id={disabled ? 'search-search-button-disabled' : 'search-search-button'} type='submit'
                 disabled={disabled}>
            <span className='search-search-buttons-text'>Search<FaSearch/></span>
            </button>
         <button id={disabled ? 'search-save-search-button-disabled' : 'search-save-search-button'}
                 disabled={disabled}
                 onClick={() => handleSaveSearch()}>
                    <span className='search-search-buttons-text'>Save Search<FaBookmark/></span>
        </button>
        </form>
    )
  }
  else return <h2>Loading...</h2>
}

export default Search;
