import { React } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import Table from './Components/Table';
import Test3 from './Components/Test3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/dashboard" element={<Landingpage />} />
        <Route path="/Payment" element={<Landingpage />} />
        <Route path="/ShipmentRequest" element={<Landingpage />} />
        <Route path="/table" element={<Table />} />
        <Route path="/test" element={<Test3 />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
