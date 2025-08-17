/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext/ShopContext'
import { assets } from '../../assets/assets';
import RelatedProducts from '../../components/LatesCollection/RelatedProducts';
const Product = () => {
  const { productId } = useParams();
  const { products, currency,formatPrice,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size,setSize] = useState('')

  const fetchProductData = async () =>{
    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} key={index} alt='' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
            <div className='flex-1'>
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2'>
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                <p className='pl-2'>(500)</p>
              </div>
              <p className='mt-5 text-3xl font-medium'>{currency}{formatPrice(productData.price)}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {
                    productData.sizes.map((item, index) => (
                      <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size? 'border-orange-600':''}`} key={index}>{item}</button>
                    ))
                    
                  }
                </div>
              </div>
              <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Thêm vào giỏ hàng</button>
              <hr className='mt-5 sm:w-4/5'/>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>Sản phẩm chính hãng 100%.</p>
                <p>Sản phẩm này có thể thanh toán bằng tiền mặt khi nhận hàng.</p>
                <p>Chính sách đổi trả dễ dàng trong vòng 7 ngày.</p>
              </div>
            </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Mô tả</b>
          <p className='border px-5 py-3 text-sm'>Đánh giá (500)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500' >
          <p>Trang web thương mại điện tử là một nền tảng trực tuyến tạo điều kiện thuận lợi cho việc mua và bán sản phẩm hoặc dịch vụ qua internet. Nó đóng vai trò như một thị trường ảo nơi các doanh nghiệp và cá nhân có thể giới thiệu sản phẩm của mình, tương tác với khách hàng và thực hiện giao dịch mà không cần phải có mặt trực tiếp. Các trang web thương mại điện tử đã trở nên vô cùng phổ biến do tính tiện lợi, khả năng tiếp cận và phạm vi tiếp cận toàn cầu mà chúng mang lại.</p>
          <p>Các trang web thương mại điện tử thường hiển thị sản phẩm hoặc dịch vụ cùng với mô tả chi tiết, hình ảnh, giá cả và bất kỳ biến thể nào có sẵn (ví dụ: kích thước, màu sắc). Mỗi sản phẩm thường có trang riêng với thông tin liên quan.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;
