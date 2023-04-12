import { React } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import Table from './Components/Table';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Landingpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
