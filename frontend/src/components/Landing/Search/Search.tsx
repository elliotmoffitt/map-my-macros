import './Search.css';
import { FaSearch, FaBookmark, FaBook } from 'react-icons/fa';


const Search = () => {
    return (
        <div id='search'>
          <h3 id='search-title'>Find your favorite foods</h3>
          <hr id='search-line'/>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Calories</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' min={0} step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Protein</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' min={0} step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Carbs</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' min={0} step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Fat</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' min={0} step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 id='search-input-title-food'>Food</h4>
                <input id='search-input-food' required></input>
          </div>
         <button id='search-search-button'><span className='search-search-buttons-text'>Search<FaSearch/></span></button>
         <button id='search-save-search-button'><span className='search-search-buttons-text'>Save Search<FaBookmark/></span></button>
        </div>
    )
}

export default Search;
