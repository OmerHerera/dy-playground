import { useState, createContext, useEffect, lazy, Suspense, useMemo } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import DYHolder from './components/DYHolder'
import { setRecommendationContext } from "./utils/dy-utils";
import { getValue } from "./utils/browser-utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home =lazy(()=> import("./pages/Home"))
const Shop =lazy(()=> import("./pages/Shop"))
const Cart =lazy(()=> import("./pages/Cart"))
const Other =lazy(()=> import("./pages/Other"))
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
export const DataContainer = createContext();
function App() {
  function useSectionId() {
    return useMemo(() => getValue('sectionId'), [window.location.search]);
  }

  const [CartItem, setCartItem] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  // eslint-disable-next-line
  const [context, setContext] = useState(DY.recommendationContext.type);
  const [data, setData] = useState('');
  const [language, setLanguage] = useState('');
  const setRecommendationContextApp = async({ type, extra, data }) => {
    const res = await setRecommendationContext({ type, extra, data });
    if (res.data) {
      setData(res.data);
    }
    if (res.lng) {
      setLanguage(res.lng);
    }
    setContext(res.type);
    return true;
  }

  const addToCart = (product, num = 1) => {    
    const addToCartObj = {
      name: 'Add to Cart',
      properties: {
        dyType: 'add-to-cart-v1',
        value: product.price,
        currency: 'USD',
        productId: product.id,
        quantity: 1,
        cart: CartItem,
      }
    };
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + num } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: num }])
    }
    // eslint-disable-next-line
    DY.API('event', addToCartObj);
  }

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    // If product quantity == 1 then we have to remove it
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    }
    //else we just decrease the quantity 
    else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  const deleteProduct = (product)=> {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
  }
  useEffect(()=> {
    localStorage.setItem("cartItem", JSON.stringify(CartItem));
  },[CartItem]);
  
  return (
    <DataContainer.Provider value={{CartItem,setCartItem,addToCart,decreaseQty,deleteProduct,selectedProduct,setSelectedProduct, setRecommendationContextApp: setRecommendationContextApp}}>
      <Suspense fallback={<Loader/>}>
        <Router>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
          <NavBar sectionId={ useSectionId() } context={context} data={data} language={language} setRecommendationContextApp={setRecommendationContextApp} />
          <DYHolder />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/shop/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/other' element={<Other/>}/>
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </DataContainer.Provider>
  )
}

export default App
