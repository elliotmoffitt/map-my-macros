import './Search.css';

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
                <input className='search-input' placeholder='MAX' type='number' step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Protein</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Carbs</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' step={10}></input>
            </div>
          </div>
          <div className='search-input-title-container'>
            <h4 className='search-input-title'>Fat</h4>
            <div className='search-input-container'>
                <input className='search-input' placeholder='MIN' type='number' min={0} step={10}></input>
                <h4>—</h4>
                <input className='search-input' placeholder='MAX' type='number' step={10}></input>
            </div>
          </div>
        </div>
    )
}

export default Search;
