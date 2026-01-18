import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [payment, setPayment] = useState("COD");
  const [showAddress, setShowAddress] = useState(false);

  const {
    currency,
    products,
    getCartAmount,
    getCartCount,
    cartItems,
    updateCartItems,
    deleteCartItems,
    navigate,
    axios,
    user,
    setCartItems
  } = useAppContext();

  // Sync Local Cart State
  useEffect(() => {
    const temp = [];
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product && cartItems[id] > 0) {
        temp.push({ ...product, quantity: cartItems[id] });
      }
    }
    setCartArray(temp);
  }, [products, cartItems]);

  // Fetch User Addresses
  useEffect(() => {
    const getuserAddress = async () => {
      try {
        const { data } = await axios.get("/api/address/get");
        if (data.success) {
          setAddress(data.addresses);
          if (data.addresses.length > 0) setSelectAddress(data.addresses[0]);
        }
      } catch (error) {
        console.error("Address fetch error:", error.message);
      }
    };
    if (user) getuserAddress();
  }, [user, axios]);

  const placeOrder = async () => {
    if (!selectAddress) return toast.error("Please select an address");
    if (cartArray.length === 0) return toast.error("Your cart is empty");

    try {
      const orderData = {
        items: cartArray.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        address: selectAddress._id,
      };

      if (payment === "COD") {
        const { data } = await axios.post("/api/order/cod", orderData);
        if (data.success) {
          toast.success(data.message);
          setCartItems({}); 
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } 
      // --- STRIPE PAYMENT LOGIC ---
      else if (payment === "Online") {
        const { data } = await axios.post("/api/order/stripe", {
          ...orderData,
          origin: window.location.origin // Sends http://localhost:5173 for redirects
        });

        if (data.success) {
          const { session_url } = data;
          window.location.replace(session_url); // Redirect to Stripe Checkout
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    }
  };

  if (!products.length) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
      <div className="flex-1">
        <h1 className="text-3xl font-medium mb-6">Shopping Cart ({getCartCount()})</h1>
        {cartArray.map((product) => (
          <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b">
            <div className="flex gap-4 items-center">
              <img src={Array.isArray(product.image) ? product.image[0] : product.image} className="w-20 h-20 object-cover rounded" alt="" />
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <select 
                  value={product.quantity} 
                  onChange={(e) => updateCartItems(product._id, Number(e.target.value))} 
                  className="border rounded px-1 mt-1 text-sm outline-none"
                >
                  {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                </select>
              </div>
            </div>
            <p className="text-center font-medium">{currency}{product.offerPrice * product.quantity}</p>
            <button onClick={() => deleteCartItems(product._id)} className="text-red-500 text-2xl hover:scale-110 transition">×</button>
          </div>
        ))}
        <button onClick={() => navigate("/products")} className="mt-8 text-indigo-600 font-medium">← Continue Shopping</button>
      </div>

      <div className="w-full max-w-[350px] bg-gray-50 p-6 border rounded-xl h-fit">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="space-y-3 text-sm border-b pb-4">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{currency}{getCartAmount()}</span></div>
          <div className="flex justify-between text-gray-600"><span>Tax (2%)</span><span>{currency}{Math.floor(getCartAmount() * 0.02)}</span></div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2"><span>Total</span><span>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</span></div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase text-gray-400 mb-2">Shipping To</p>
          <div className="p-3 bg-white border rounded-lg relative text-sm shadow-sm">
            <p className="font-medium text-gray-800">{selectAddress ? `${selectAddress.street}, ${selectAddress.city}` : "No address selected"}</p>
            <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-600 text-xs mt-2 font-bold hover:underline">CHANGE ADDRESS</button>
            {showAddress && (
              <div className="absolute top-full left-0 w-full bg-white border shadow-2xl z-50 rounded-b-lg overflow-hidden">
                {addresses.map((addr, i) => (
                  <div key={i} onClick={() => {setSelectAddress(addr); setShowAddress(false)}} className="p-3 hover:bg-indigo-50 cursor-pointer border-b text-gray-700">{addr.street}, {addr.city}</div>
                ))}
                <div onClick={() => navigate("/add-address")} className="p-3 text-indigo-600 text-center font-bold cursor-pointer hover:bg-gray-100">+ Add New Address</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase text-gray-400 mb-2">Payment Method</p>
          <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white outline-none text-sm">
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment (Stripe)</option>
          </select>
        </div>

        <button onClick={placeOrder} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg mt-8 hover:bg-indigo-700 shadow-md transition-all active:scale-[0.98]">
          {payment === "COD" ? "PLACE ORDER" : "PROCEED TO PAYMENT"}
        </button>
      </div>
    </div>
  );
};

export default Cart;