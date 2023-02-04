import './style.css'
import ProductCard from '../../molecules/productCard/ProductCard'
import React from 'react'

const ProductsContainer = (props) => {
  return (
    <div className='products-container'>
      {props.products.map((product) => {
        return (
          <ProductCard
            productImg={product.product_Img}
            productName={product.product_Name}
            productPrice={product.product_Price}
            productId={product.product_Id}
            productDescription={product.product_Description}
            onAddToCart={props.handleAddToCart}
          />
        )
      })}
    </div>
  )
}

export default ProductsContainer
