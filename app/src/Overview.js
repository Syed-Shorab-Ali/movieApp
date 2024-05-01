import { useParams } from "react-router-dom";

const Overview = ({movies, IMGPATH}) => {
  const {id} = useParams()
  const movie = movies.find(m => (m.id) == id)
    return (
      <main className="overview">
            <figure>
              <img 
                src= {IMGPATH + movie.poster_path}
                alt= {movie.title}
                width= "194"
                height= "291"
                loading="lazy"
              />
              <figcaption 
                className="offscreen"
              >
                {movie.title}
              </figcaption>
            </figure>
            <section>
            {!movie.title ?
              <h1 
                style= {{ 
                  color: 'red', 
                  padding: '0.2rem 0',
                  fontWeight: 'bold', 
                  whiteSpace: "nowrap",
                }}
              >
                Title unavailable
              </h1> :
              <h1 
                className="overview_title"
              >
                {movie.title}
              </h1>
            }
            {!movie.release_date ?
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
                {(movie.release_date).slice(0, 4)}
              </p> 
            }
            <p>
              {movie.overview}
            </p>
            </section>
      </main>
    );
  };
  
  export default Overview;
  