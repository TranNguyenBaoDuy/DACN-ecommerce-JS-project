import React from 'react'
import Title from '../../components/LatesCollection/Title'
import {assets} from '../../assets/assets'
import NewsletterBox from '../../components/Newletter/NewsletterBox'
const Contacts = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title  text1={'LIÊN HỆ VỚI'} text2={'CHÚNG TÔI'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Cửa hàng của chúng tôi</p>
          <p className=' text-gray-500'>HCM City<br/> </p>
          <p className=' text-gray-500'> SĐT: 0359351279 <br/> Email: 2200010150@nttu.edu.vn</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contacts
