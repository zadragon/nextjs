import NavBar from "../components/NavBar";
import Seo from "../components/Seo";
import Link from "next/link";
import {useEffect, useState} from "react";

const API_KEY = "8ae094c58fd51942547548792dae285d"

export default function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        (async () => {
            const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)).json();
            console.log(results);
            setMovies(results)
        })();
    }, [])
    return (
        <div className="container">
            <Seo title="Home"></Seo>
            {!movies && <h4>Loading...</h4>}
            {movies?.map((movie) => (
                <div key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <h4>
                        <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                            <a>{movie.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))}
            <style jsx>{`
                .container {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  padding: 20px;
                  gap: 20px;
                }
                .movie {
                  cursor: pointer;
                }
                .movie img {
                  max-width: 100%;
                  border-radius: 12px;
                  transition: transform 0.2s ease-in-out;
                  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                  transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                  font-size: 18px;
                  text-align: center;
                }
              `}
            </style>
        </div>
    )
}
