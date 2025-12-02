/*
Main.tsx (aka main entrance)

starting point of app

Purpose: It defines the HTML element where a React component should be displayed.
*/

//Imports: Brings in necessary tools and the main App
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//createRoot: Creates a place for the app to live on the webpage
//StrictMode: Used to debug 
createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <App />
  </StrictMode>,
)

