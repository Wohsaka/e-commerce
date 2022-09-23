import './style.css'
import ProductCard from '../../molecules/productCard/ProductCard'
import React from 'react'

const ProductsContainer = (props) => {
  return (
    <div className='products-container'>
      {props.products.map((product) => {
        return (
          <ProductCard
            productImg={product.productImg}
            productName={product.productName}
            productPrice={product.productPrice}
            productId={product.productId}
            productDescription={product.productDescription}
            onAddToCart={props.handleAddToCart}
          />
        )
      })}
    </div>
  )
}

export default ProductsContainer
