import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useContext, useEffect, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";

const Shop = () => {
    const {addToCart, setRecommendationContextApp} =useContext(DataContainer);
    const [filterList,setFilterList] = useState(products.filter(item => item.category ==="sofa"));
    useEffect(() => {
        const url = new URL(window.location);
        const cat = url.searchParams.get("category", );
        // only if we arrive ti the component without category in the URL set PRODUCT context
        !cat && setRecommendationContextApp({ type: 'PRODUCT' });
        window.scrollTo(0,0);
    }, [])
    return ( 
        <Fragment>
            <Banner title="product"/>
            <section className="filter-bar">
                <Container className="filter-bar-contianer">
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <FilterSelect setFilterList={setFilterList} setRecommendationContextApp={ setRecommendationContextApp} />
                        </Col>
                        <Col md={8}>
                            <SearchBar setFilterList={setFilterList}/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <ShopList productItems={filterList} addToCart={addToCart} setRecommendationContextApp={setRecommendationContextApp} />
                </Container>
            </section>
        </Fragment>
    );
}

export default Shop;