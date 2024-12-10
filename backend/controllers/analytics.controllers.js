import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
export const getAnalytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); //7 days

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.status(200).json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("Get analytics error", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, //Group all documents together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProducts,
    sales: totalSales,
    revenue: totalRevenue,
  };
};

//Get daily sales
const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySales = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            sales: { $sum: 1 },
            revenue: { $sum: "$totalAmount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
      const dates = getDatesInRange(startDate, endDate);
      return dates.map((date) => {
        const foundData = dailySales.find((item) => item._id === date);
        return {
            date,
            sales: foundData?.sales || 0,
            revenue: foundData?.revenue || 0
        }
      });
  } catch (error) {
    throw error;
  }
};

//Get dates between start date and end date
function getDatesInRange(startDate, endDate) {
  const date = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    date.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return date;
}
