/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext/ShopContext'
import Title from '../LatesCollection/Title'
import ProductItem from '../Product/ProductItem';
const RelatedProducts = ({category, subCategory}) => {
    const {products,formatPrice} = useContext(ShopContext);
    const [related,setRelated] = useState([]);
    useEffect(()=>{
        if (products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((item)=> category === item.category);
            productCopy = productCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productCopy.slice(0,5))
            
        }
    },[products])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"SẢN PHẨM"} text2={'LIÊN QUAN'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
            related.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={formatPrice(item.price)}/>
            ))
        }
        </div> 
    </div>
  )
}

export default RelatedProducts
