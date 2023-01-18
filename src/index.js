import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NavBar from './components/organisms/navBar/NavBar'
import Home from './components/routes/home/Home'
import Shop from './components/routes/shop/Shop'
import Cart from './components/routes/cart/Cart'
import Auth from './components/routes/auth/Auth'
import About from './components/routes/about/About'
import ShoppingRecord from './components/routes/shopping-record/ShoppingRecord'
import reportWebVitals from './reportWebVitals'
import { Routes, Route, HashRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'

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
          <Route path='Shopping%20History' element={<ShoppingRecord />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
