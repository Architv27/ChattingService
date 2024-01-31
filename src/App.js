import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './interface/Layout';
import { Provider } from 'react-redux';
import { store } from './server/store';

function App() {
  return (
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  );
}

export default App;
