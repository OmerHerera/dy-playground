import { useContext, useEffect, useState } from "react"
import { Container, Nav, Navbar, Button, Form, Accordion } from "react-bootstrap";
import { DYModal, ModalTypes } from './../DYModal/DYModal';
import "./navbar.css";
import { DataContainer } from "../../App";
import { goToNavigation } from './../../utils/browser-utils';
import { login, optIn, optOut, manager } from './../../utils/dy-utils';
import { Link } from "react-router-dom";
const home = goToNavigation('/');
const shop = goToNavigation('shop');
const cart = goToNavigation('cart');
const NavBar = () => {
  const { CartItem, setCartItem } = useContext(DataContainer);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [scripVer, setScriptVer] = useState(window?.DYO?.version);
  const [dyId, setDyId] = useState(window?.DY?.dyid);
  const [show, setShow] = useState(false);
  const [handlers, setHandlers] = useState({});
  const [consent, setConsent] = useState(false);
  // eslint-disable-next-line
  const [context, setContext] = useState(DY?.recommendationContext?.type);
  // eslint-disable-next-line
  const [language, setLanguage] = useState(DY?.recommendationContext?.lng);
  // eslint-disable-next-line
  const [data, setData] = useState(DY?.recommendationContext?.data);
  const [modalType, setModalType] = useState('');
  
  function toggleConsentStatus() {
    const newStatus = !consent;
    localStorage.setItem('dy_playground_consent_status', newStatus);
    setConsent(newStatus);
    // eslint-disable-next-line
    DY.userActiveConsent = { accepted: newStatus };
    // eslint-disable-next-line
    DYO.ActiveConsent.updateConsentAcceptedStatus(newStatus);
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (type, handler, optOutHandler) => {
    setShow(true);
    setModalType(type);
    if (optOutHandler) {
      setHandlers({
        [ModalTypes.optIn]: handler,
        [ModalTypes.optOut]: optOutHandler,
      });
    } else {
      setHandlers({ [type]: handler });
    }
  }
  
  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  useEffect(() => {
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem("cartItem");
      setCartItem(JSON.parse(storedCart));
    }
    setTimeout(() => {
      setScriptVer(window?.DYO?.version)
      setDyId(window?.DY?.dyid)
    }, 3000)
  }, []);
  
  useEffect(() => {
    const isConsent = localStorage.getItem('dy_playground_consent_status') === 'true';
    setConsent(!!isConsent);
  }, []);
  
  useEffect(() => {
    // eslint-disable-next-line
    setContext(DY?.recommendationContext?.type || '');
    // eslint-disable-next-line
    setLanguage(DY?.recommendationContext?.lng || '');
    // eslint-disable-next-line
    setData(DY?.recommendationContext?.data || '');
    // eslint-disable-next-line
  }, [DY?.recommendationContext?.type, DY?.recommendationContext?.lng, DY?.recommendationContext?.data]);
  return (
    <>
      <DYModal show={show} type={modalType} handleClose={handleClose} handlers={handlers} />
      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container className="navbar-container">
          {/* <Navbar.Brand to={home}>
            <ion-icon name="bag"></ion-icon>
            <h1 className="logo">Multimart</h1>
          </Navbar.Brand> */}
          {/* Media cart and toggle */}
          <div className="d-flex">
            <div className="media-cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
              <Link aria-label="Go to Cart Page" to={cart} className='cart' data-num={CartItem.length}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => {
                setExpand(expand ? false : "expanded");
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Link aria-label="Go to Home Page" className="navbar-link" to={home} onClick={() => setExpand(false)}>
                  <span className="nav-link-label">Home</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link aria-label="Go to Shop Page" className="navbar-link" to={shop} onClick={() => setExpand(false)}>
                  <span className="nav-link-label">Shop</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link aria-label="Go to Cart Page" className="navbar-link" to={cart} onClick={() => setExpand(false)}>
                  <span className="nav-link-label">Cart</span>
                </Link>
              </Nav.Item>
              <Nav.Item className="expanded-cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                <Link aria-label="Go to Cart Page" to={cart} className='cart' data-num={CartItem.length}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="secondary"
                  onClick={() => { handleShow(ModalTypes.manager, manager); }}>Controller</Button>
              </Nav.Item>
              <Nav.Item>
                <Button variant="secondary"
                  onClick={() => { handleShow(ModalTypes.login, login); }}>Login</Button>
              </Nav.Item>
              <Nav.Item>
                <Button variant="secondary"
                  onClick={() => { handleShow(ModalTypes.optIn, optIn, optOut); }}>Opt In/Out</Button>
              </Nav.Item>
              <Nav.Item>
                <Form.Check // prettier-ignore
                  checked={consent}
                  type="switch"
                  id="custom-switch"
                  label="Consent"
                  onChange={() => {
                    toggleConsentStatus()
                  }}
                />
              </Nav.Item>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>🇮 🇳 🇫 🇴 - 🇩 🇾 🇳 🇦 🇲 🇮 🇨</Accordion.Header>
                  <Accordion.Body>
                    {
                      scripVer ?
                        <span>
                          #️⃣ Version: {scripVer}
                        </span> : null
                    }
                    {
                      dyId ?
                        <>
                          <br />
                          <span>
                          #️⃣ dyId: {dyId}
                          </span>
                        </>
                        : null
                    }
                    {
                      context ?
                        <>
                          <br />
                          <span>
                          ⚓ Context: {context}
                          </span>
                        </>
                        : null
                    }
                    {
                      language ?
                        <>
                          <br />
                          <span>
                          🌍 Lang: {language}
                          </span>
                        </>
                        : null
                    }
                    {
                      data ?
                        <>
                          <br />
                          <span>
                          💾 Data: {data}
                          </span>
                        </>
                        : null
                    }
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
      
  )
}

export default NavBar
