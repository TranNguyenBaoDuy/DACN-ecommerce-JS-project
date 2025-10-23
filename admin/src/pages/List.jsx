import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, formatVND } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  // State cho edit
  const [editingProduct, setEditingProduct] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: ''
  })

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      setLoading(false)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Mở form edit với dữ liệu product
  const openEdit = (product) => {
    setEditingProduct(product)
    setEditForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      subCategory: product.subCategory || ''
    })
  }

  const closeEdit = () => {
    setEditingProduct(null)
    setEditForm({ name: '', description: '', price: '', category: '', subCategory: '' })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  // Gửi request update (simple JSON body). Backend phải support /api/product/update POST.
  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    if (!editingProduct) return
    try {
      const body = {
        id: editingProduct._id,
        name: editForm.name,
        description: editForm.description,
        price: Number(editForm.price),
        category: editForm.category,
        subCategory: editForm.subCategory
      }
      const response = await axios.post(backendUrl + '/api/product/update', body, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message || 'Cập nhật thành công')
        await fetchList()
        closeEdit()
      } else {
        toast.error(response.data.message || 'Cập nhật thất bại')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <p className='mb-2'>Tất cả sản phẩm</p>
      {loading ? <p>Loading...</p> : null}
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text:sm'>
          <b>Hình ảnh</b>
          <b>Tên</b>
          <b>Mô tả</b>
          <b>Giá</b>
          <b className='text-center'>Hoạt động</b>
        </div>

        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={item._id || index}
          >
            <img className='w-12' src={item.image?.[0]} alt={item.name} />
            <p>{item.name}</p>
            <p className='truncate'>{item.category}</p>
            <p>{formatVND(item.price)}</p>
            <div className='flex justify-end md:justify-center gap-3'>
              <button
                onClick={() => openEdit(item)}
                className='text-blue-600 hover:underline text-sm'
              >
                Sửa
              </button>
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) removeProduct(item._id)
                }}
                className='text-red-600 hover:underline text-sm'
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal đơn giản sửa sản phẩm */}
      {editingProduct && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='bg-white p-4 rounded w-[90%] max-w-2xl'>
            <div className='flex justify-between items-center mb-3'>
              <h3 className='text-lg font-semibold'>Sửa sản phẩm</h3>
              <button onClick={closeEdit} className='text-gray-500'>Đóng</button>
            </div>

            <form onSubmit={handleUpdateProduct} className='space-y-2'>
              <div>
                <label className='block text-sm'>Tên</label>
                <input name='name' value={editForm.name} onChange={handleEditChange}
                  className='w-full border p-2 rounded' />
              </div>

              <div>
                <label className='block text-sm'>Mô tả</label>
                <textarea name='description' value={editForm.description} onChange={handleEditChange}
                  className='w-full border p-2 rounded' rows={3} />
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <label className='block text-sm'>Giá</label>
                  <input name='price' type='number' value={editForm.price} onChange={handleEditChange}
                    className='w-full border p-2 rounded' />
                </div>
                <div>
                  <label className='block text-sm'>Danh mục</label>
                  <input name='category' value={editForm.category} onChange={handleEditChange}
                    className='w-full border p-2 rounded' />
                </div>
              </div>

              <div>
                <label className='block text-sm'>Phân loại (subCategory)</label>
                <input name='subCategory' value={editForm.subCategory} onChange={handleEditChange}
                  className='w-full border p-2 rounded' />
              </div>

              <div className='flex gap-2 justify-end'>
                <button type='button' onClick={closeEdit} className='px-4 py-2 border rounded'>Hủy</button>
                <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default List
