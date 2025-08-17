import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext/ShopContext'
import Title from '../LatesCollection/Title';

const CartTotal = () => {
    const {currency ,delivery_fee,getCartAmount, formatPrice} = useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'Tổng'} text2={'tiền'}/>
      </div>
      <div className='flex flex-col gap-2 text-sm'>
        <div className='flex justify-between'>
            <p>Tạm tính</p>
            <p>{currency}{formatPrice(getCartAmount())}</p>
        </div>
        <div className='flex justify-between'>
            <p>Phí giao hàng</p>
            <p>{currency}{formatPrice(delivery_fee)}</p>
        </div>
        <div className='flex justify-between'>
            <b>Tổng tiền</b>
            <b>{currency}{formatPrice(getCartAmount() === 0?0:getCartAmount() + delivery_fee)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
