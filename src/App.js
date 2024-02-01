import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './interface/Layout';

function App() {
  return (
    ReactDOM.render(
        <BrowserRouter>
          <Layout />
        </BrowserRouter>,
      document.getElementById('root')
    )
  );
}

export default App;
