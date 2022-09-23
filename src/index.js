import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NavBar from './components/organisms/navBar/NavBar'
import Home from './components/routes/home/Home'
import Shop from './components/routes/shop/Shop'
import Cart from './components/routes/cart/Cart'
import Auth from './components/routes/auth/Auth'
import About from './components/routes/about/About'
import reportWebVitals from './reportWebVitals'
import { Routes, Route, HashRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD3mMTAK_FPQSvUW8SQ9sgVUchhl60QWEI',
  authDomain: 'e-commerce-95ec0.firebaseapp.com',
  projectId: 'e-commerce-95ec0',
  storageBucket: 'e-commerce-95ec0.appspot.com',
  messagingSenderId: '423491911419',
  appId: '1:423491911419:web:2fc906ccef3da115b83a5e',
}

const app = initializeApp(firebaseConfig)
getAuth(app)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Shop' element={<Shop />} />
          <Route path='Cart' element={<Cart />} />
          <Route path='Log%20in/Sign%20Up' element={<Auth />} />
          <Route path='/About' element={<About />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
