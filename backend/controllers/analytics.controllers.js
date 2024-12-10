import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
export const getAnalytics = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();
    } catch (error) {
        
    }
};

const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([{
        $group: {
            _id: null, //Group all documents together
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" }
        }
    }])
    const { totalSales, totalRevenue } = salesData[0] || {totalSales: 0, totalRevenue: 0};

    return {
        users: totalUsers,
        products: totalProducts,
        sales: totalSales,
        revenue: totalRevenue
    }
};