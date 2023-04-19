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
        <Route path="/dashboard" element={<Landingpage />} />
        <Route path="/Payment" element={<Landingpage />} />
        <Route path="/ShipmentRequest" element={<Landingpage />} />
        <Route path="/table" element={<Table />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
