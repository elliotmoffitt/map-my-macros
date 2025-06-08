import './MenuItemCard.css';
// import {IMenuItem}
import { FaFire,
         FaDumbbell,
         FaBreadSlice,
         FaTint,
         FaBookmark,
         FaLocationArrow } from 'react-icons/fa';

const MenuItemCard = (menuItem: any) => {
    const round = (macro: number|string) => {
         if (typeof(macro) !== 'number') {
            return Math.ceil(Number(macro.slice(0, -1))).toString();
         } else return Math.ceil(Number(macro)).toString();

    }
    console.log(menuItem.menuItem)
    const result = menuItem.menuItem;
        return (
            <div className='menu-item-card'>
                <h2 className='menu-item-restaurant'>{result.restaurantChain}</h2>
                <p className='menu-item-name'>{result.title}</p>
                {result.image ? <img src={result.image} className='menu-item-card-image'/> : 'No Preview Image'}
                <div className='menu-item-nutrition-container'>
                    <span className='menu-item-nutrition'>
                        <span className='menu-item-nutrition-icon'><FaFire/></span>
                        {round(result.nutrition.calories)} Calories</span>
                    <span className='menu-item-nutrition'>
                        <span className='menu-item-nutrition-icon'><FaDumbbell/></span>
                        {round(result.nutrition.protein)}g Protein</span>
                    <span className='menu-item-nutrition'>
                        <span className='menu-item-nutrition-icon'><FaBreadSlice/></span>
                        {round(result.nutrition.carbs)}g Carbs</span>
                    <span className='menu-item-nutrition'>
                        <span className='menu-item-nutrition-icon'><FaTint/></span>
                        {round(result.nutrition.fat)}g Fat</span>
                </div>
                <div className='menu-item-card-save-directions'>
                <button className='menu-item-card-save'>Save
                    <p className='menu-item-card-icon'><FaBookmark/></p>
                </button>
                <button className='menu-item-card-directions'
                        onClick={() => window.open(`https://google.com/maps/search/${result.restaurantChain}`, '_blank', 'noopener,noreferrer')}>
                            Directions<FaLocationArrow/></button>
                </div>
            </div>
        )
}

export default MenuItemCard;
