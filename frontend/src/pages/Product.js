import { memo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axios';
import '../style.css'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Image from 'react-bootstrap/esm/Image';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import BeautyStars from 'beauty-stars';
import Reviews from '../components/Reviews';
import Alert from 'react-bootstrap/esm/Alert';


function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [quantity, updateQuantity] = useState(1);
    const [error, setError] = useState();


    const handleChange = (e) => {
        updateQuantity(e.target.value.trim());
    }

    const handleAddCart = () => {
        if (localStorage.getItem('access_token')) {
            axiosInstance
            .post(`cart/add/${productId}/`, {quantity: quantity})
            .then((res) => {
                if (res.status == 201) {
                    window.location.href = '/cart';
                }
            })
            .catch((err) => {
                setError(err.response.data.non_field_errors);
            });
        } else {
            window.location.href = '/user/register';
        }
    }
    
    useEffect(() => {
        const fetchProduct = () => {
            axios
            .get(`http://127.0.0.1:8000/api/${productId}/`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
        };

        fetchProduct();
    }, []);


    if (!product) return <div>Retrieving data...</div>

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <Image src={product.image} className='product-image' />
                    <Reviews />
                </Col>

                <Col>
                    <Container >
                        <Row sm={2}>
                            <Link to={`/user/${product.seller}`} className='product-seller'>{product.seller}</Link>
                            <BeautyStars 
                            value={product.rating}
                            editable='false'
                            size='1.1em'
                            gap='5px'
                            activeColor='#171717'
                            inactiveColor='#999ca3'/>
                        </Row>
                    </Container>
                    
                    <h2>{product.name}</h2>
                    <hr />
                    
                    <h4>${product.price}</h4>
                    <p className='text-start'>{product.description}</p>

                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm='4'>Quantity</Form.Label>
                            <Col sm='8'>
                                <Form.Control 
                                type='number' 
                                min={1}
                                max={product.stock}
                                defaultValue={1}
                                onChange={handleChange} />
                            </Col>
                        </Form.Group>
                    </Form>

                    <br />
                    <Button 
                    size='lg' 
                    disabled={product.stock ? false : true} 
                    className='w-100' 
                    onClick={handleAddCart}>Add to Cart</Button>
                    
                    {!product.stock && (<Alert className='mt-3'>Out of stock</Alert>)}
                    {error && (<Alert variant='danger' className='mt-3'>{error}</Alert>)}
                </Col>
            </Row>
        </Container>
    )
}

export default memo(Product);