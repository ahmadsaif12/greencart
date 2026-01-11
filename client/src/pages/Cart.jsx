import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";

const Cart = () => {
  const [cartArray, setCartArray] = useState([]);
  const [addresses] = useState(dummyAddress);
  const [selectAddress, setSelectAddress] = useState(dummyAddress[0]);
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
  } = useAppContext();

  const getCart = () => {
    const temp = [];
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        temp.push({
          ...product,
          quantity: cartItems[id],
        });
      }
    }
    setCartArray(temp);
  };

  useEffect(() => {
    if (products.length && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = () => {
    if (!selectAddress) {
      alert("Please select an address");
      return;
    }
    if (payment === "COD") {
      alert("Order placed successfully!");
    } else {
      alert("Redirecting to payment gateway...");
    }
  };

  if (!products.length || !cartItems) return null;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
      {/* ================= CART ITEMS ================= */}
      <div className="flex-1">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-indigo-500">({getCartCount()})</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-4"
          >
            {/* IMAGE AND PRODUCT INFO */}
            <div className="flex gap-4 items-center">
              <div
                onClick={() =>
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  )
                }
                className="w-24 h-24 border rounded cursor-pointer flex-shrink-0"
              >
                <img
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">Weight: {product.weight || "N/A"}</p>

                {/* QUANTITY */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">Qty:</span>
                  <select
                    value={cartItems[product._id] ?? 1}
                    onChange={(e) =>
                      updateCartItems(product._id, Number(e.target.value))
                    }
                    className="border border-gray-300 px-2 py-1 rounded text-sm outline-none"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SUBTOTAL */}
            <p className="text-center font-medium">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            {/* ACTION - CROSS BUTTON */}
            <button
              onClick={() => deleteCartItems(product._id)}
              className="mx-auto text-red-500 font-bold text-xl hover:text-red-700"
            >
              ×
            </button>

            {/* TOP BORDER ONLY */}
            <hr className="col-span-3 border-t border-gray-300 mt-4" />
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="mt-8 flex items-center gap-2 text-indigo-500 font-medium"
        >
          Continue Shopping
        </button>
      </div>

      {/* ================= ORDER SUMMARY ================= */}
      <div className="w-full max-w-[360px] bg-gray-100 p-5 border">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-t border-gray-300 mt-4" />

        {/* ADDRESS */}
        <p className="text-sm font-medium uppercase mt-4">Delivery Address</p>
        <div className="relative mt-2">
          <p className="text-gray-600 text-sm">
            {selectAddress
              ? `${selectAddress.street}, ${selectAddress.city}, ${selectAddress.country}`
              : "No address selected"}
          </p>

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-indigo-500 text-sm mt-1"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute bg-white border w-full mt-2 z-10">
              {addresses.map((addr, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setSelectAddress(addr);
                    setShowAddress(false);
                  }}
                  className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {addr.street}, {addr.city}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-indigo-500 text-center text-sm p-2 cursor-pointer"
              >
                + Add address
              </p>
            </div>
          )}
        </div>

        {/* PAYMENT */}
        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full border px-3 py-2 mt-2 outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        {/* TOTAL */}
        <div className="space-y-2 text-gray-600 text-sm mt-6">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          {payment === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
