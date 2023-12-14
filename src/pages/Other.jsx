import { useContext, useEffect } from "react"
import { DataContainer } from "../App"
import { Col, Container, Row } from "react-bootstrap";

const Other = () => {
  const { CartItem, setCartItem, addToCart, decreaseQty, deleteProduct, setRecommendationContextApp } = useContext(DataContainer);
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
  useEffect(() => {
    window.scrollTo(0, 0);
    setRecommendationContextApp({ type: 'OTHER' });
  }, [])
  return (
    <section className='cart-items'>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className='no-items product'>🚀 You are in Other Section 🚀</h1>
            {['📱', '🪖', '⛑️', '🔋', '⏳', '🪝', '🔋', '💸', '✂️', '🕥', '⚗️', '🧶', '🔦', '🪣'].map((item, index) => {
              const productQty = item.price * item.qty
              return (
                <div className='cart-list' key={index}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      {item}
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            <span>Emoji{item}</span>
                          </h4>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              )
            })}
          </Col>
          <Col md={4}>
            <div className='cart-total'>
              <h2>Other Summary</h2>
              <div className=' d_flex'>
                <h4>List :</h4>
                <h3>📱 🪖 ⛑️ 🔋 ⏳ 🪝 🔋 💸 ✂️ 🕥 ⚗️ 🧶 🔦 🪣 </h3>
                <h3>📱 🪖 ⛑️ 🔋 ⏳ 🪝 🔋 💸 ✂️ 🕥 ⚗️ 🧶 🔦 🪣 </h3>
                <h3>📱 🪖 ⛑️ 🔋 ⏳ 🪝 🔋 💸 ✂️ 🕥 ⚗️ 🧶 🔦 🪣 </h3>
                <h3>📱 🪖 ⛑️ 🔋 ⏳ 🪝 🔋 💸 ✂️ 🕥 ⚗️ 🧶 🔦 🪣 </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Other