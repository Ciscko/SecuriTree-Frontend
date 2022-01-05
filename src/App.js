import './App.css';
import Home from './components/Home';
import Hierarchy from './components/Hierarchy';
import Manage from './components/Manage'
import Dataupload from './components/DataUpload';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='view' element={<Hierarchy/>}/>
            <Route path='manage' element={<Manage/>}/>
            <Route path='upload' element={<Dataupload/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
