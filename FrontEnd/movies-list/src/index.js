import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, ThemeProvider } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
import './assets/style/globalStyle.scss'
import { ToastContainer } from 'react-toastify';
// ** React Toastify
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Provider store={store}>
        <Suspense fallback={<Spinner animation="border" variant="primary" className='global-spinner' />}>
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
            />
            <App />
          </BrowserRouter>
        </Suspense>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)

