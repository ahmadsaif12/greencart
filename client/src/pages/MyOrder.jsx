import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrder = () => {
  const [myorders, setOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mb-16 mt-10 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col items-start mb-10">
        <p className="text-2xl font-medium uppercase text-gray-800">My Orders</p>
        <div className="w-16 h-0.5 bg-orange-500 rounded-full mt-1"></div>
      </div>

      <div className="space-y-8">
        {myorders.map((order, index) => (
          <div key={order._id || index} className="border border-gray-200 rounded-lg p-6 max-w-5xl shadow-sm">
            
            {/* Main Row: 3 Columns */}
            <div className="flex justify-between items-start">
              
              {/* Column 1: Order ID & Product Info (Left) */}
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-4">OrderId : <span className="text-gray-600 font-medium">{order._id}</span></p>
                
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="bg-green-50/50 rounded-lg p-2 border border-green-100">
                      <img src={item.product.image[0]} alt="" className="w-16 h-16 object-contain" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                      <p className="text-sm text-gray-400">Category: {item.product.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Payment & Details (Center) */}
              <div className="flex-1 flex flex-col items-center">
                <p className="text-sm text-gray-500">Payment : <span className="text-gray-800 font-medium">{order.paymentMethod || 'Online'}</span></p>
                
                {/* Nested vertical stack for Quantity, Status, Date */}
                <div className="mt-4 text-sm space-y-1 text-gray-400">
                   {order.items.map((item, idx) => (
                     <p key={idx}>Quantity: <span className="text-gray-600 font-medium">{item.quantity}</span></p>
                   ))}
                   <p>Status: <span className="text-gray-600 font-medium">{order.status}</span></p>
                   <p>Date: <span className="text-gray-600 font-medium">{new Date(order.date || order.createdAt).toLocaleDateString()}</span></p>
                </div>
              </div>

              {/* Column 3: Totals & Price (Right) */}
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500 mb-8">Total Amount : <span className="text-gray-800 font-semibold">{currency}{order.amount}</span></p>
                
                {order.items.map((item, idx) => (
                  <div key={idx} className="mt-4">
                    <span className="text-xl font-bold text-emerald-600">
                      Amount: {currency}{item.product.offerPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;