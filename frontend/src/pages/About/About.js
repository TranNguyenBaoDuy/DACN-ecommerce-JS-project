import React from 'react'
import Title from '../../components/LatesCollection/Title'
import {assets} from '../../assets/assets'
import NewsletterBox from '../../components/Newletter/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'VỀ'} text2={'VỚ VẨN STORE'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p> Chào mừng đến với Vui Vẻ Shop – Nơi quần áo cũng biết chọc cười! 😂
Bạn đang tìm kiếm một chiếc áo khiến người đối diện phải phì cười? Hay một cái quần đủ "mặn" để khiến bạn bè phải xin link? Chúc mừng bạn đã đến đúng nơi rồi đó! Tại Vui Vẻ Shop, chúng tôi không chỉ bán quần áo – chúng tôi bán nụ cười kèm theo từng sản phẩm. Từ áo thun "chế cháo", hoodie "mặn hơn muối biển", đến tất in meme và đồ ngủ lầy lội – bạn mặc lên là vui, người khác nhìn là cười!</p>
          <p> Đến với chúng tôi nếu bạn:<br/>
Muốn nổi bật giữa đám đông (nhưng theo kiểu "trời ơi đất hỡi")<br/>
Yêu thời trang nhưng không quên "mặn mà" <br/>
Thích mua đồ mà được tặng kèm niềm vui miễn phí!</p>
          <b className='text-gray-800'>Sứ mệnh của chúng tôi</b>
          <p>Tại Vui Vẻ Shop, sứ mệnh của chúng tôi rất đơn giản:
Làm cho tủ đồ của bạn bớt nhàm chán – và cuộc sống của bạn thêm... mặn! </p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'TẠI SAO '} text2={'CHỌN CHÚNG TÔI'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Đảm bảo chất lượng:</b>
          <p>Chúng tôi lựa chọn và kiểm tra kỹ lưỡng từng sản phẩm để đảm bảo chúng đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Sự tiện lợi:</b>
          <p>Với giao diện thân thiện với người dùng và quy trình đặt hàng đơn giản, việc mua sắm chưa bao giờ dễ dàng đến thế.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Sự mới mẻ cho cuộc sống nhàm chán</b>
          <p>Chúng tôi mang đến sự mới mẻ cho cuộc sống nhàm chán – từng cái quần, cái áo, cái nụ cười.</p>
        </div>
      </div>
    
        <NewsletterBox/>
      
    </div>
  )
}

export default About
