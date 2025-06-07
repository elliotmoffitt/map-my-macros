import './Landing.css';
import { getMenuItemsThunk } from '../../redux/menuItems.ts';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Search from './Search/Search.tsx';


const Landing = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
      const getMenuItems = async() => {
        await dispatch(getMenuItemsThunk(
          {food: "burgers", minCalories: "0", maxCalories: "500",
            minProtein: "0", maxProtein: "50",
            minCarbs: "0", maxCarbs:"300",
            minFat: "0", maxFat: "70"}
        ));
        setIsLoaded(true);
      }
      if (!isLoaded) {
          getMenuItems()
      }
    })
    return (
        <div id='landing'>
          <div id='landing-title-text'>
            <h1 id='landing-title'>Keep your goals consistent, no matter where you go</h1>
            <p id='landing-text'>Set your calories and macros to find restaurants near you that fit your needs.</p>
          </div>
          <div id='landing-search-form'>
            <Search />
          </div>
        </div>
    )
}

export default Landing;
