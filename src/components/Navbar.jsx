import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [didScroll, setDidScroll] = useState(true);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            setDidScroll(window.scrollY < 60);
        });

        return () => {
            document.removeEventListener('scroll', () => {
                setDidScroll(window.scrollY < 60);
            });
        };
    }, []);

    return (
        <header className='text-gray-200 body-font fixed z-50 w-full'>
            <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
                <RouterLink
                    to={'/'}
                    className={
                        'flex font-medium items-center text-white md:mb-0 transition-all  ' +
                        (didScroll ? '' : ' bg-yellow-400 text-stone-900 px-3 py-2 rounded-xl shadow-lg')
                    }>
                    <img src={logo} className='w-[50px] aspect-square' />
                    <span className='ml-2.5 text-2xl font-bold font-sans'>Popcorn Time</span>
                </RouterLink>
                {window.location.pathname === '/' && (
                    <nav
                        className={
                            'md:ml-auto text-gray-200 font-bold flex flex-wrap gap-5 items-center text-base justify-center transition-all' +
                            (didScroll ? '' : ' bg-yellow-400 text-stone-900 px-4 p-3 rounded-xl shadow-lg')
                        }>
                        <Link smooth spy duration={250} to='nowPlaying' className='cursor-pointer'>
                            Now Playing
                        </Link>
                        <Link smooth spy duration={250} to='topRated' className='cursor-pointer'>
                            Top Rated
                        </Link>
                        <Link smooth spy duration={250} to='popularTvShows' className='cursor-pointer'>
                            Popular TV Shows
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;
