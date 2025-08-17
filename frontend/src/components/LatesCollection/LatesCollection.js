/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../../context/ShopContext/ShopContext'
import Title from './Title';
import ProductItem from '../Product/ProductItem';
const LatesCollection = () => {
    const {products,formatPrice} = useContext(ShopContext);
    const [latesProducts,setLatesProducts] = useState([]);
    useEffect(()=>{
        setLatesProducts(products.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BỘ SƯU TẬP'}  text2={"MỚI NHẤT"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        </p>
      </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latesProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={formatPrice(item.price)}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatesCollection
