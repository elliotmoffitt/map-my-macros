import './Landing.css';
import { getMenuItemsThunk } from '../../redux/menuItems.ts';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


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
            hello
        </div>
    )
}

export default Landing;
