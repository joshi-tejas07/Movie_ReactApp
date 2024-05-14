import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const { id } = useParams();
    const [popularPeople, setPopularPeople] = useState([]);

    useEffect(() => {
        getData();
        getPopularPeople();

        window.scrollTo(0, 0);
    }, [id]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(error => console.error("Error fetching movie details:", error));
    };

    const getPopularPeople = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
            .then(res => res.json())
            .then(data => {
                if (data && data.cast) {
                    // Store only a subset of popular people (e.g., top 6-7)
                    setPopularPeople(data.cast.slice(0, 7));
                }
            })
            .catch(error => console.error("Error fetching popular people:", error));
    };

    return (
        <>
            <div className="movie">
                <div className="movie__intro">
                    <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="Backdrop" />
                </div>
                <div className="movie__detail">
                    <div className="movie__detailLeft">
                        <div className="movie__posterBox">
                            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="Poster" />
                        </div>
                    </div>
                    <div className="movie__detailRight">
                        <div className="movie__detailRightTop">
                            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                            <div className="movie__rating">
                                {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                                <span className="movie__voteCount">{currentMovieDetail ? `(${currentMovieDetail.vote_count} votes)` : ""}</span>
                            </div>
                            <div className="movie__runtime">{currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}</div>
                            <div className="movie__releaseDate">{currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}</div>
                            <div className="movie__genres">
                                {currentMovieDetail && currentMovieDetail.genres ? (
                                    currentMovieDetail.genres.map(genre => (
                                        <span key={genre.id} className="movie__genre">{genre.name}</span>
                                    ))
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="movie__detailRightBottom">
                            <div className="synopsisText">Synopsis</div>
                            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie__popularPeople">
                <div className="movie__heading">Cast</div>
                <div className="movie__peopleList">
                    {popularPeople.map(person => (
                        <div key={person.id} className="movie__person">
                            <img className="movie__personImage" src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt={person.name} />
                            <span className="movie__personName">{person.name}</span>
                            <span className="movie__personCharacter">{person.character}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Movie;
