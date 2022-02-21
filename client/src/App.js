import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/home/Home'
import PokemonCreate from './components/PokemonCreate/PokemonCreate'
import Detail from './components/Detail/Detail'



function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <Routes>  
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/pokemons" element={<PokemonCreate />} />
        <Route path="/pokemon/:id" element={<Detail />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
