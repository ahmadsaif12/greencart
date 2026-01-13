import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency=import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin,setShowUserLogin]=useState(false);
  const[products,setProducts]=useState([]);
  const[cartItems,setCartItems]=useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts=async()=>{
    setProducts(dummyProducts);
  };
  //added items in cart
  const addToCart = (ItemId) => {
  const cartData = structuredClone(cartItems);

  if (cartData[ItemId]) {
    cartData[ItemId] += 1;
  } else {
    cartData[ItemId] = 1;
  }

  setCartItems(cartData);
  toast.success("Added to cart");
};

  //update cart items
  const updateCartItems=(ItemId,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[ItemId]=quantity;
    setCartItems(cartData);
    toast.success("updated cart data");
  };

  //delete cart data
  const deleteCartItems=(ItemId)=>{
    let cartData=structuredClone(cartItems);
    if(cartData[ItemId]){
      cartData[ItemId]-=1;
      if(cartData[ItemId]===0){
        delete cartData[ItemId];
      }
    }
    toast.success("remove cart data");
    setCartItems(cartData);

  }
  //total cart items
  const getCartCount=()=>{
    let total=0;
    for(const item in cartItems){
      total += cartItems[item];
    }
    return total
  }
  //get carts total amount
  const getCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      let itemInfo=products.find(((product)=>product._id === item))
      if(cartItems[item] >0){
        totalAmount += itemInfo.offerPrice * cartItems[item]
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
