import React, {useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const Login = () => {
  const [currenState,setCurrenState] = useState('Đăng nhập')
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext)
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      if (currenState === 'Đăng ký') {
        const response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
        
      }else{
        const response = await axios.post(backendUrl+'/api/user/login',{email,password})
        if (response.data.success) {
          if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
            window.location.href = 'localhost:5173';
          }
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token, navigate])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currenState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currenState === 'Đăng nhập' ? '':  <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Tên đăng nhập'/>}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Mật khẩu' />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className=' cursor-pointer'>Quên mật khẩu?</p>
          {
            currenState === 'Đăng nhập'
            ? <p onClick={()=>setCurrenState('Đăng ký')} className='cursor-pointer'>Tạo tài khoản</p>
            : <p onClick={()=>setCurrenState('Đăng nhập')} className='cursor-pointer'>Đăng nhập tại đây</p>
          }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currenState === 'Đăng nhập' ? 'Đăng nhập' :'Đăng ký'}</button>
    </form>
  )
}

export default Login
