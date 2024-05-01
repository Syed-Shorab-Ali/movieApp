import { Link } from "react-router-dom";
import { SlArrowUp } from "react-icons/sl";

const Header = ({ title, genreItems, search, setSearch, handleSubmit, genreLoading, handleClick, headerClick }) => {
  return (
    <header className="header">
        <h1
          style={{
            cursor: "pointer"
          }}
          onClick={headerClick}
        >
          {title}
        </h1>

      <section className="header__section">
        <div className="inner__div">
          <button
            className="header__button"
            type="button"
            aria-label="genres"
          >
            Genres
          </button>
          <div><SlArrowUp /></div>
          <nav>
            {genreLoading && <p>Loading genres..</p>}
            {!genreLoading && 
              <ul>
                {genreItems.map(genre => (
                  <li 
                    onClick={() => handleClick(genre.id)}
                    className="nowrap" 
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            }
          </nav>
        </div>
        <form 
          className="searchForm" 
          onSubmit={handleSubmit}
        >
          <label 
            htmlFor="search" 
            className="offscreen"
          >
            Search Posts
          </label>
          <input 
            type="text" 
            id="search" 
            autoComplete="off"
            placeholder="Quick search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </section>
    </header>
  );
};

export default Header;
