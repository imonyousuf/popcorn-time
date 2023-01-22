import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const MoviePoster = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/${movie.id}`, { state: { id: movie.id } });
    };

    return (
        <div
            onClick={handleOnClick}
            className='aspect-[2/3] max-h-[400px] flex-grow cursor-pointer'
            onMouseOver={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}>
            <div className='relative w-full h-full'>
                <img className='w-full h-full outline outline-[.5px] outline-gray-600' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                <p className={'bg-red-600 duration-300 h-1 w-full -mt-2 bottom-0 absolute z-10 ' + (isHovered ? 'opacity-100' : 'opacity-0')}></p>
            </div>

            <p className='text-xl mt-5'>{movie.title}</p>
        </div>
    );
};

export default MoviePoster;
