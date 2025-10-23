import {v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

//function for add product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, bestseller, category, subCategory,sizes} = req.body

        const image1 = req.files.image1 &&  req.files.image1[0]
        const image2 = req.files.image2 &&   req.files.image2[0]
        const image3 = req.files.image3 &&  req.files.image3[0]
        const image4 = req.files.image4 &&   req.files.image4[0]
        
        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)
        let imagesUrl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true :false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
       
       const product = new productModel(productData)
       await product.save()
       res.json({success: true,message:"Thêm thành công"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
   
}


//function for list product
const listProduct = async (req,res) =>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//function for removing product
const removeProduct = async (req,res) =>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Xóa thành công"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//function for single product info 
const singleProduct = async (req,res) =>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
const updateProduct = async (req, res) => {
    try {
    const { id } = req.body;
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Tạo object dữ liệu cập nhật
    const updatedData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : undefined,
      bestseller,
    };

    // Xóa các field undefined (nếu client không gửi)
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) delete updatedData[key];
    });

    // Cập nhật trong MongoDB
    const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct)
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });

    res.json({
      success: true,
      message: "Cập nhật thông tin sản phẩm thành công",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {listProduct,addProduct,removeProduct,singleProduct, updateProduct}
