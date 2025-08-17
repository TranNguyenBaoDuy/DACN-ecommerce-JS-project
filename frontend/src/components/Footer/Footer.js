import React from 'react'
import {assets} from '../../assets/assets'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm pt-20'>
        <div>
            <img className='mb-5 w-32' src={assets.logo1} alt="" />
            <p className='w-full md:w-3/2 text-gray-600'>
              Làm cho tủ đồ của bạn bớt nhàm chán – và cuộc sống của bạn thêm... mặn!</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>SHOP</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Trang Chủ</li>
                <li>Thông Tin</li>
                <li>Vận Chuyển</li>
                <li>Chính Sách Bảo Mật</li>
            </ul>
        </div>
        <div>
        <p className='text-xl font-medium mb-5'>LIÊN HỆ</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>0359351279</li>
                <li>2200010150@nttu.edu.vn</li>
            </ul>
        </div>
      </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>© 2025 Bảo Duy 2200010150@nttu.edu.vn  * All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
