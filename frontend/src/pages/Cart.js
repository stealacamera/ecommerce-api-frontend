import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/esm/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


function Cart() {
    const [subtotal, setSubtotal] = useState();
    const [cart, setCart] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [nextPage, setNextPage] = useState();
    const limit = 10;

    let [pageNumber, setPageNumber] = useState(1);
    const handleNextPage = () => {setPageNumber(++pageNumber)};
    const handlePreviousPage = () => {setPageNumber(--pageNumber)};

    const [checkoutSuccess, setCheckoutSuccess] = useState();
    const [checkoutErrors, setCheckoutErros] = useState();
    const errorsDiv = checkoutErrors?.map((error) => {
                        return (
                            <div key={error.id}>
                                {error.map((message) => {
                                    return (
                                        <Alert key={message.id} variant='danger'>{message}</Alert>
                                    )
                                })}
                            </div>)
                        });


    const handleChange = (e, cartItemId) => {
        axiosInstance
        .put(`cart/${cartItemId}/`, {quantity: e.target.value.trim()})
        .then()
        .catch((err) => {
            --e.target.value;
            alert('There\'s not enough stock');
        });
    };

    const handleRemove = (cartItemId) => {
        axiosInstance
        .delete(`cart/${cartItemId}/`)
        .then(window.location.reload());
    };

    const handleCheckout = () => {
        axiosInstance
        .post('orders/checkout/')
        .then((res) => {
            if (res.status === 201){
                setCheckoutSuccess('Your order was placed successfully!');
            }
        })
        .catch((err) => {
            setCheckoutErros(err.response.data);
        })
    };

    useEffect(() => {
        const fetchCart = () => {
            axiosInstance
            .get(`cart/?limit=${limit}&offset=${(pageNumber - 1) * limit}`)
            .then((res) => {
                setSubtotal(res.data.subtotal);
                setPreviousPage(res.data.previous);
                setNextPage(res.data.next);
                setCart(res.data.results);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        };

        fetchCart();
    }, [pageNumber]);

    
    if (!cart) return <div>Retrieving data...</div>

    return (
        <Container>
            {checkoutSuccess && (<Alert>{checkoutSuccess}</Alert>)}
            {checkoutErrors && (errorsDiv)}

            <h4 className='d-flex text-uppercase mt-5'>Your cart</h4>

            <Row className='gx-5 d-flex align-items-start'>
                <Col sm={8} className='w-75'>

                    <Row className='mb-3 fw-bold'>
                        <Col sm={{offset: 8}}>Quantity</Col>
                        <Col>Price</Col>
                    </Row>

                    {cart.map((cartItem) => {
                        return (    
                            <Row key={cartItem.id} className='bg-light mb-2 py-4'>
                                <Col sm={8} className='d-flex ps-4'>
                                    <Image src={cartItem.product.image} className='w-25' />
                                    
                                    <Col className='ms-4 text-start'>
                                        <Link to={`/${cartItem.product.id}`} className='fw-bold'>
                                            {cartItem.product.name}
                                        </Link>

                                        <p>${cartItem.product.price}</p>
                                        <Button size='sm' onClick={() => handleRemove(cartItem.id)}>Remove</Button>
                                    </Col>
                                </Col>

                                <Col>
                                    <Form>
                                        <Form.Control 
                                        type='number' 
                                        min={1} 
                                        defaultValue={cartItem.quantity} 
                                        onChange={(e) => handleChange(e, cartItem.id)} />
                                    </Form>
                                </Col>
                                
                                <Col>
                                    <p>${cartItem.total}</p>
                                </Col>
                            </Row>
                        )
                    })}

                    {previousPage && (<Button onClick={handlePreviousPage} className='mx-1'>Previous Page</Button>)}
                    {nextPage && (<Button onClick={handleNextPage} className='mx-1'>Next Page</Button>)}
                </Col>

                <Col className='border border-primary py-3 d-flex flex-column'>
                    <h4 className='mb-3'>Subtotal: ${subtotal}</h4>

                    <Button size='lg' onClick={handleCheckout}>Checkout</Button>
                    <Button as={Link} to='/' size='lg' variant='outline-primary'>Continue shopping</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default memo(Cart);