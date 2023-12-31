import { Fragment, useContext, useEffect } from "react"
import Wrapper from "../components/wrapper/Wrapper"
import Section from "../components/Section"
import {products ,discoutProducts } from "../utils/products"
import { DataContainer } from "../App"
import SliderHome from "../components/Slider"

const Home = () => {
  const {addToCart, setRecommendationContextApp} = useContext(DataContainer);
  const newArrivalData = products.filter(item => item.category ==="mobile" || item.category ==="wireless");
  const bestSales = products.filter(item => item.category ==="sofa");
  useEffect(()=> {
    window.scrollTo(0, 0);
    setRecommendationContextApp({ type: 'HOMEPAGE' });
  }, [])
  return (
    <Fragment>
      <SliderHome/>
      <Wrapper />
      <Section title="Big Discount" bgColor="#f6f9fc" productItems={discoutProducts} addToCart={addToCart} setRecommendationContextApp={setRecommendationContextApp} />
      <Section title="New Arrivals" bgColor="white" productItems={newArrivalData} addToCart={addToCart} setRecommendationContextApp={setRecommendationContextApp}/>
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} addToCart={addToCart} setRecommendationContextApp={setRecommendationContextApp}/>
    </Fragment>
  )
}

export default Home
