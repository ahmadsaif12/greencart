import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrder = () => {
  const [myorders, setOrders] = useState([]);
  const { currency, user, axios } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        // Show newest orders first
        setOrders(data.orders.reverse());
      }
    } catch (error) {
      toast.error("Could not load orders");
    }
  };

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  return (
    <div className="mb-16 mt-10 px-4 md:px-0 max-w-5xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col items-start mb-10">
        <p className="text-2xl font-bold uppercase text-gray-800 tracking-tight">My Orders</p>
        <div className="w-16 h-1 bg-orange-500 rounded-full mt-2"></div>
      </div>

      <div className="space-y-6">
        {myorders.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
             <p className="text-gray-500 italic">No orders found in your history.</p>
          </div>
        ) : (
          myorders.map((order) => (
            <div 
              key={order._id} 
              className="p-6 bg-white transition-all duration-300 hover:shadow-md rounded-2xl border border-gray-100"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                
                {/* Column 1: Order ID & Product Details */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID:</span>
                    <span className="text-xs font-mono text-gray-600 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">{order._id}</span>
                  </div>

                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 mb-4 last:mb-0">
                      <div className="bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                        <img 
                          src={item.product?.image?.[0] || ""} 
                          alt={item.product?.name} 
                          className="w-16 h-16 object-cover" 
                        />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-gray-800 line-clamp-1 uppercase tracking-tight">
                          {item.product?.name || "Product Unavailable"}
                        </h2>
                        <p className="text-xs text-gray-500 font-semibold mt-0.5 uppercase">
                          Quantity: <span className="text-gray-900">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: Status & Payment Information */}
                <div className="flex-1 flex flex-col items-start md:items-center justify-center">
                  <div className="space-y-4">
                    <div className="bg-gray-50 px-4 py-2 rounded-xl">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 text-center">Payment Method</p>
                       <p className="text-sm font-black text-gray-800 text-center uppercase tracking-tighter italic">
                         {order.paymentType}
                       </p>
                    </div>

                    <div className="flex items-center gap-2 justify-center">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <p className="text-xs font-black text-gray-700 uppercase tracking-[0.1em]">
                        {order.status || "Processing"}
                      </p>
                    </div>
                    
                    <p className="text-[10px] text-gray-400 font-bold uppercase text-center tracking-wider">
                      {new Date(order.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </p>
                  </div>
                </div>

                {/* Column 3: Pricing Section */}
                <div className="flex-1 text-left md:text-right flex flex-col justify-center gap-3">
                  <div>
                    <p className="text-[10px] font-black text-gray-300 uppercase mb-1 tracking-widest">Total Amount</p>
                    <p className="text-3xl font-black text-emerald-600 tracking-tighter">
                      {currency}{order.Amount?.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter italic opacity-60">Inclusive of Taxes</p>
                  </div>
                  
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;