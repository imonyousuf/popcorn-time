import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../api';

const MoviePage = () => {
    const [data, setData] = useState();
    const [reviews, setReviews] = useState([]);
    const { state } = useLocation();

    useEffect(() => {
        if (state.id) {
            api.request({
                method: 'GET',
                url: `movie/${state.id}?language=en-US`,
                headers: {
                    accept: 'application/json',
                },
            })
                .then((response) => {
                    if (response.data) {
                        setData(response.data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            api.request({
                method: 'GET',
                url: `movie/${state.id}/reviews?language=en-US&page=1`,
                headers: {
                    accept: 'application/json',
                },
            })
                .then((response) => {
                    if (response.data.results) {
                        setReviews(response.data.results);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [state]);

    if (!data) {
        return (
            <div>
                <p>Unknown Error</p>
            </div>
        );
    }

    return (
        <div className='bg-stone-900 text-white h-full pb-14'>
            <div className='relative bg-transparent h-[700px]'>
                <div className='absolute w-full h-full flex flex-col justify-center'>
                    <img className='w-full h-[75%] blur-[8px]' src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt='' />
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-80'></div>
                </div>

                <div className='z-20 absolute w-full h-full flex flex-col justify-center'>
                    <div className='container mx-auto px-28 flex justify-center gap-10'>
                        <img className='max-h-[400px] aspect-[2/3]' src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt='' />

                        <div>
                            <div className='mt-5'>
                                <h1 className='text-5xl'>{data.title}</h1>

                                <div className='flex gap-5 my-5 text-gray-200'>
                                    <p>{new Date(data.release_date).getFullYear()}</p>

                                    <p>
                                        {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                                    </p>

                                    <p>{data.vote_average} ★</p>
                                </div>

                                <p className='mb-5'>{data.overview}</p>

                                <div className='flex gap-5 my-5 text-gray-200'>
                                    {data.genres.map((genre) => {
                                        return (
                                            <p key={genre.id} className='px-4  pb-1 border border-gray-200 rounded-xl flex items-center'>
                                                {genre.name}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {reviews && (
                <div className='container mx-auto px-28 mt-10'>
                    <h2 className='text-4xl'>Reviews</h2>

                    <div className='mt-10 flex flex-col gap-5'>
                        {reviews.map((review) => {
                            return (
                                <Link
                                    to={review.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    key={review.id}
                                    className='border text-stone-200 py-3 px-5 rounded-xl cursor-pointer'>
                                    <div className='flex items-center gap-2.5 mb-2.5'>
                                        <p className='font-bold text-xl'>{review.author}</p>
                                        {review.author_details.rating && (
                                            <>
                                                <p>-</p>
                                                <p>{review.author_details.rating}/10</p>
                                            </>
                                        )}
                                    </div>

                                    <div className='overflow-hidden text-ellipsis break-words line-clamp-3'>
                                        <p>{review.content}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoviePage;
