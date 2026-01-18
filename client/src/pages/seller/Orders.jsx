import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
    const { currency, axios } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchorders = async () => {
        try {
            const { data } = await axios.get("/api/order/seller");
            if (data.success) {
                // Showing newest orders at the top
                setOrders(data.orders.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchorders();
    }, []); // Added empty dependency array to prevent infinite loop

    return (
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-200 text-gray-800 bg-white">
                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-contain" src={assets.box_icon} alt="boxIcon" />
                        <div>
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <p className="font-medium text-sm">
                                        {/* Added ?. to prevent crash if product is deleted */}
                                        {item.product?.name} <span className="text-orange-600">x{item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FIXED: Changed order.address to order.addresses to match your Schema */}
                    <div className="text-sm text-gray-600">
                        <p className='font-bold text-gray-800 mb-1'>
                            {order.addresses?.firstName} {order.addresses?.lastName}
                        </p>
                        <p>{order.addresses?.street}, {order.addresses?.city}</p> 
                        <p>{order.addresses?.state}, {order.addresses?.zipcode}</p>
                        <p className="mt-1 font-medium">{order.addresses?.phone}</p>
                    </div>

                    {/* FIXED: Changed order.amount to order.Amount (Capital A) */}
                    <p className="font-bold text-lg my-auto text-emerald-600">
                        {currency}{order.Amount}
                    </p>

                    <div className="flex flex-col text-xs text-gray-500">
                        <p><span className="font-semibold">Method:</span> {order.paymentType}</p>
                        <p><span className="font-semibold">Date:</span> {new Date(order.date || order.createdAt).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Payment:</span> {order.isPaid ? "✅ Paid" : "⏳ Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;