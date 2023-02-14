import './style.css'
import ProductCard from '../../molecules/productCard/ProductCard'
import React from 'react'

const ProductsContainer = (props) => {
  return (
    <div className='products-container'>
      {props.products.map((product) => {
        return (
          <ProductCard
            key={product.product_id}
            productImg={product.product_img}
            productName={product.product_name}
            productPrice={product.product_price}
            productId={product.product_id}
            productDescription={product.product_description}
            onAddToCart={props.handleAddToCart}
          />
        )
      })}
    </div>
  )
}

export default ProductsContainer
