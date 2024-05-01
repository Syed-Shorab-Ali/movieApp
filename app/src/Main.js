import { Link } from "react-router-dom";

const Main = ({movie, IMGPATH}) => {
    return (
      <main>
        {movie.map(item => (
          <div 
            className="main__div"
            key={item.id}
          >
            <figure>
              <img 
                src= {IMGPATH + item.poster_path}
                alt= {item.title}
                width= "194"
                height= "291"
                loading="lazy"
              />
              <figcaption 
                className="offscreen"
              >
                {item.title}
              </figcaption>
            </figure>
            <section className="div__section">
              {!item.vote_average ?
                <h4
                  style={{ color: 'red', fontWeight: 'bold' }}
                >
                  Rating Unavailable
                </h4>     :
                <h2
                  className="rating"
                >
                  {item.vote_average.toFixed(1)}
                </h2>
              }
              <Link to={`/overview/${item.id}`} >
                <button
                  className="div__button"
                  type="button"
                  aria-label="view details"
                >
                  view Details
                </button>
              </Link>
            </section>
            {!item.title ?
              <p 
                style= {{ 
                  color: 'red', 
                  padding: '0.2rem 0',
                  fontWeight: 'bold', 
                  whiteSpace: "nowrap",
                  fontSize: '0.95rem'
                }}
              >
                Title unavailable
              </p> :
              <p 
                className="title nowrap"
              >
                {item.title}
              </p>
            }
            {!item.release_date ?
              <p
                style={{
                  color: 'red', 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  fontSize: '0.85em'
                }}
              >
                Date unavailable
              </p> :
              <p
                className="release_date"
              >
                {(item.release_date).slice(0, 4)}
              </p> 
            }
          </div> 
        ))}
      </main>
    );
  };
  
  export default Main;
  