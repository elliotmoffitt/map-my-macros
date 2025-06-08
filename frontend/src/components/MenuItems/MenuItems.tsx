import './MenuItems.css';
import { useAppSelector } from '../../redux/store';
import MenuItemCard from './MenuItemCard';

const MenuItems = () => {
    const menuItems = useAppSelector(state => state.menuItems.menuItems);
    // console.log(menuItems)
    return (
        <div id='menu-items'>
            <h2 id='menu-items-results-title'>Results</h2>
            <hr id='menu-items-line'></hr>
            <div id='menu-items-results'>
                {menuItems.length ? menuItems.map((menuItem: any, i: number) => {
                    return (
                        <MenuItemCard menuItem={menuItem} key={`${menuItem.id}-${i}`}/>
                    )
                }): ''}
            </div>
        </div>
    )
}

export default MenuItems;
