import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch seller authentication
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch user and cart info
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch {
      setUser(null);
    }
  };

  // Cart operations
  const addToCart = (ItemId) => {
    const cartData = structuredClone(cartItems);
    cartData[ItemId] = (cartData[ItemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItems = (ItemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[ItemId] = quantity;
    setCartItems(cartData);
    toast.success("Updated cart");
  };

  const deleteCartItems = (ItemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[ItemId]) {
      cartData[ItemId] -= 1;
      if (cartData[ItemId] === 0) delete cartData[ItemId];
    }
    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, val) => acc + val, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      const product = products.find((p) => p._id === item);
      if (product) total += product.offerPrice * cartItems[item];
    }
    return Math.floor(total * 100) / 100;
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  // Update cart on server whenever cartItems changes
  useEffect(() => {
    if (!user) return;

    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    updateCart();
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    fetchSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItems,
    deleteCartItems,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    fetchProducts,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
