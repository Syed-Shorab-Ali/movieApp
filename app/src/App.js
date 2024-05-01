import Header from "./Header";
import Main from "./Main";
import Overview from "./Overview";
import Missing from "./Missing";
import Footer from "./Footer";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/get";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const APIurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  const GenresURL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const searchAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
  const GenreMovies =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&with_genres="

  const [genreItems, setGenreItems] = useState([]);
  const [movie, setmovie] = useState([])
  const [search, setSearch] = useState('');

  const history = useHistory();

  const {data : genreData, isLoading : genreLoading} = useAxiosFetch(GenresURL)
  const {data : itemsData, fetchError: itemsError} = useAxiosFetch(APIurl)

  useEffect(() => {
    if (genreData && genreData.genres) {
      setGenreItems(genreData.genres);
    } 
  }, [genreData])

  useEffect(() => {
    if (!itemsError && itemsData.results) {
      setmovie(itemsData.results)
    }
  }, [itemsData])

  const headerClick = () => {
    if (!itemsError && itemsData.results) setmovie(itemsData.results)
    history.push('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fetchmovies = async () => {
      try {
        const response = await api.get(searchAPI + search)
        if (response && response.data.results) setmovie(response.data.results)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    
    fetchmovies()
    setSearch('')
    history.push('/')
  }  

  const handleClick = (id) => {

    const fetchmovies = async () => {
      try {
        const response = await api.get(GenreMovies + id)
        if (response && response.data.results) setmovie(response.data.results)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    
    fetchmovies()
    history.push('/')
  }

  return (
    <div className="App">
      <Header 
        title="movies.co" 
        genreItems={genreItems} 
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
        genreLoading={genreLoading}
        handleClick={handleClick}
        headerClick={headerClick}
      />
      <Switch>
        <Route exact path="/">
          <Main
            movie={movie}
            IMGPATH={IMGPATH}
          />
        </Route>
        <Route path="/overview/:id">
          <Overview 
            IMGPATH={IMGPATH}
            movies={movie}
          />
        </Route>
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;