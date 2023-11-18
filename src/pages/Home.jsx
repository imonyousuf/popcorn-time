import { useEffect, useState } from 'react';
import { api } from '../api';
import MoviePoster from '../components/MoviePoster';
import TVPoster from '../components/TVPoster';

const Home = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popularTv, setPopularTv] = useState([]);

    useEffect(() => {
        api.request({
            method: 'GET',
            url: '/movie/now_playing?language=en-US&page=1',
            headers: {
                accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.data.results) {
                    setNowPlaying(response.data.results);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        api.request({
            method: 'GET',
            url: 'movie/top_rated?language=en-US&page=1',
            headers: {
                accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.data.results) {
                    setTopRated(response.data.results);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        api.request({
            method: 'GET',
            url: '/tv/popular?language=en-US&page=1',
            headers: {
                accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.data.results) {
                    setPopularTv(response.data.results);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='bg-stone-950 text-white h-full pb-14 pt-20'>
            <div className='pt-24 px-10' name='nowPlaying'>
                <h2 className='font-bold text-5xl mb-14'>Now Playing in Theatres</h2>

                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-5 gap-y-12'>
                    {nowPlaying.map((movie) => {
                        return <MoviePoster key={movie.id} movie={movie} />;
                    })}
                </div>
            </div>

            <div className='pt-24 px-10' name='topRated'>
                <h2 className='font-bold text-5xl mb-14'>Top Rated</h2>

                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-5 gap-y-12'>
                    {topRated.map((movie) => {
                        return <MoviePoster key={movie.id} movie={movie} />;
                    })}
                </div>
            </div>

            <div className='pt-24 px-10' id='#popularTvShows' name='popularTvShows'>
                <h2 className='font-bold text-5xl mb-14'>Popular TV Shows</h2>

                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-5 gap-y-12'>
                    {popularTv.map((show) => {
                        return <TVPoster key={show.id} show={show} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
