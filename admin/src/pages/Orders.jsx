import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl,formatVND } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const statusHandler = async (event, orderId) =>{
    try {
      const response = await axios.post(backendUrl+ '/api/order/status',{orderId, status:event.target.value},{headers:{token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Danh sách đơn hàng</h3>
      <div>
        {orders.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index} >
            <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <div>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return (
                      <p className='py-0.5' key={idx}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    )
                  } else {
                    return <p className='py-0.5' key={idx}>
                      {item.name} x {item.quantity} <span>{item.size}</span>,
                    </p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.fullname + ""}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Số lượng: {order.items.length} </p>
              <p className='mt-3'>Phương thức thanh toán : {order.paymentMethod}</p>
              <p>Thanh toán : {order.payment ? 'Đã thanh toán':'Đang chờ'}</p>
              <p> Ngày đặt : {new Date(order.date).toLocaleDateString('vi-VN')}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{formatVND(order.amount)}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} className='p-2 font-semibold' value={order.status}>
              <option  value="Đã đặt hàng">Đã đặt hàng</option>
              <option value="Đóng gói">Đóng gói</option>
              <option value="Đã vận chuyển">Đã vận chuyển</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Đã giao hàng">Đã giao hàng</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
