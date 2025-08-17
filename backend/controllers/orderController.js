import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Thanh toán khi nhận hàng",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Đặt hàng thành công" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const userOrders = async (req, res) => {

    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Cập nhật thành công' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, allOrders, userOrders, updateStatus }
