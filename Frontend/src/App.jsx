import React from 'react'
import Style from "./App.module.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from './Component/loginPage';
import PatientPage from './Component/patientPage';
import CreateAccountPage from './Component/createAccount';
import DoctorPage from './Component/doctorPage';
import PatientAccountPage from './CreateAccountDoctorAndPatient/patientAccountPage';
import DoctorAccountPage from './CreateAccountDoctorAndPatient/doctorAccountPage';

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/createAccount' element={<CreateAccountPage/>}/>
    <Route path='/patientPage' element={<PatientPage/>}/>
    <Route path='/doctorPage' element={<DoctorPage/>}/>
    <Route path='/patientAccountPage' element={<PatientAccountPage/>}/>
    <Route path='/doctorAccountPage' element={<DoctorAccountPage/>}/>
  </Routes>
  </BrowserRouter>

  
  </>
}

export default App;