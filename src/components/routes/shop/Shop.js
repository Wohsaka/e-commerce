import Filter from '../../organisms/filter/Filter'
import ProductsContainer from '../../organisms/productsContainer/ProductsContainer'
import './style.css'
import React, { useState, useEffect } from 'react'
import { fetchInventory } from '../../../redux/slices/inventory/inventorySlice'
import { addToCart } from '../../../redux/slices/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import CustomSnackbar from '../../customSnackbar/CustomSnackbar'
import CustomDialog from '../../custom-dialog/CustomDialog'

const Shop = () => {
  const [errorMsg, setErrorMsg] = React.useState('Error')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [lastCategory, setLastCategory] = useState('All')
  const [inventory, setInventory] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)

  //Redux
  const isLogged = useSelector((state) => state.user.isLogged)
  const dispatch = useDispatch()

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleAddToCart = (item) => {
    if (isLogged) {
      dispatch(addToCart(item))
      setOpenSnackbar(true)
    } else {
      setErrorMsg('You need to be logged in to add items to your cart')
      handleOpenDialog()
    }
  }

  const handleSearch = async () => {
    if (lastCategory !== '') {
      const lastClicked = document.getElementById(lastCategory)
      lastClicked.classList.remove('filter-category-button-active')
      lastClicked.classList.add('filter-category-button')
    }
    try {
      let responseJson = {}
      let response = {}
      if (lastCategory === 'All') {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/items?query=${searchText}`
        )
      } else if (lastCategory !== 'All') {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/items?category=${lastCategory}&query=${searchText}`
        )
      }
      responseJson = await response.json()
      if (!responseJson.success) {
        setLastCategory(lastCategory)
        setFilteredProducts([])
        return
      }
      setFilteredProducts(responseJson.data)
    } catch (error) {
      console.log(error)
    }
  }

  const filterByCategory = async (category) => {
    if (lastCategory !== '') {
      const lastClicked = document.getElementById(lastCategory)
      lastClicked.classList.remove('filter-category-button-active')
      lastClicked.classList.add('filter-category-button')
    }
    const buttonClicked = document.getElementById(category)
    buttonClicked.classList.remove('filter-category-button')
    buttonClicked.classList.add('filter-category-button-active')

    try {
      let responseJson = {}
      let response = {}
      if (category === 'All') {
        response = await fetch(process.env.REACT_APP_API_URL + '/items')
      } else if (category !== 'All') {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/items?category=${category}`
        )
      }
      responseJson = await response.json()
      if (!responseJson.success) {
        setLastCategory(category)
        setFilteredProducts([])
        return
      }
      setLastCategory(category)
      setFilteredProducts(responseJson.data)
    } catch (error) {
      console.log(error)
    }
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
          filter={filterByCategory}
          search={handleSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {filteredProducts.length === 0 ? (
          <div id='no-results' className='shop-no-results-container'>
            No results for Your search!
          </div>
        ) : (
          <ProductsContainer
            products={filteredProducts}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
      <CustomSnackbar
        open={openSnackbar}
        text='Item added to your cart!'
        setOpen={setOpenSnackbar}
      />
      <CustomDialog
        open={openDialog}
        text={errorMsg}
        onClose={handleCloseDialog}
      />
    </div>
  )
}

export default Shop
