import Search from './components/Search';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Details from './components/Details';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Search />}/>
        <Route path="/details" element={<Details />} />
      </Routes>

   
    </div>
  )
}

export default App
