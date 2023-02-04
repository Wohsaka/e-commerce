import Filter from '../../organisms/filter/Filter'
import ProductsContainer from '../../organisms/productsContainer/ProductsContainer'
import './style.css'
import React, { useState, useEffect } from 'react'
import { fetchInventory } from '../../../redux/slices/inventory/inventorySlice'
import { addToCart } from '../../../redux/slices/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import CustomSnackbar from '../../customSnackbar/CustomSnackbar'

const Shop = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [lastCategory, setLastCategory] = useState('All')
  const [inventory, setInventory] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)

  //Redux
  const isLogged = useSelector((state) => state.user.isLogged)
  const dispatch = useDispatch()

  const handleAddToCart = (item) => {
    if (isLogged) {
      dispatch(addToCart(item))
      setOpenSnackbar(true)
    } else {
      alert('You need to be logged in to add items to your cart')
    }
  }

  const handleSearch = () => {
    if (lastCategory !== '') {
      const lastClicked = document.getElementById(lastCategory)
      lastClicked.classList.remove('filter-category-button-active')
      lastClicked.classList.add('filter-category-button')
    }
    const newArray = inventory.filter((item) => {
      return item.productName.toLowerCase().includes(searchText.toLowerCase())
    })
    console.log(newArray)
    setFilteredProducts(newArray)
  }

  const filterByCategorie = (category) => {
    if (lastCategory !== '') {
      const lastClicked = document.getElementById(lastCategory)
      lastClicked.classList.remove('filter-category-button-active')
      lastClicked.classList.add('filter-category-button')
    }
    const buttonClicked = document.getElementById(category)
    buttonClicked.classList.remove('filter-category-button')
    buttonClicked.classList.add('filter-category-button-active')
    const newArray = inventory.filter((item) => {
      if (category === 'All') {
        return true
      } else if (item.category === category) {
        return true
      }
      return false
    })
    setLastCategory(category)
    setFilteredProducts(newArray)
  }

  useEffect(() => {
    dispatch(fetchInventory()).then((inv) => {
      setInventory(inv.payload.data)
      setFilteredProducts(inv.payload.data)
    })
    if (window.innerWidth >= 768) {
      setShowCategories(true)
    }
  }, [])

  return (
    <div className='shop-container'>
      <div className='shop-filter-products-container'>
        <Filter
          showCategories={showCategories}
          filter={filterByCategorie}
          search={handleSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <ProductsContainer
          products={filteredProducts}
          handleAddToCart={handleAddToCart}
        />
      </div>
      <CustomSnackbar
        open={openSnackbar}
        text='Item added to your cart!'
        setOpen={setOpenSnackbar}
      />
    </div>
  )
}

export default Shop
