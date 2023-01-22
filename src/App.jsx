import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import MoviePage from './pages/MoviePage';

function App() {
    return (
        <div className='bg-[#000000]'>
            <Router>
                <Navbar />

                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/:id' Component={(props) => <MoviePage {...props} />}></Route>
                </Routes>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
