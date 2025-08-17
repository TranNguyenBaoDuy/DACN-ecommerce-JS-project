import React, { useContext, useState } from 'react'
import Title from '../../components/LatesCollection/Title'
import CartTotal from '../../components/CartTotal/CartTotal'
import { ShopContext } from '../../context/ShopContext/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    city: '',
    street: '',
    phone: ''

  })

  const onChangeHandler = (even) => {
    const name = even.target.name
    const value = even.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() +delivery_fee
      }
      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;
        default:
          break;
      }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'THÔNG TIN'} text2={'GIAO HÀNG'} />
        </div>
        <input required onChange={onChangeHandler} name='fullname' value={formData.fullname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Họ và tên' />
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Email' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Thành phố' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Số nhà,tên đường' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Số điện thoại' />
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PHƯƠNG THỨC'} text2={' THANH TOÁN'} />
        </div>
        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
          <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
          <p className='text-gray-500 text-sm font-medium mx-4'>Thanh toán khi nhận hàng</p>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Đặt hàng</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
