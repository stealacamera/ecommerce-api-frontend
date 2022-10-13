import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


function Orders({orderStatus}) {
    const [count, setCount] = useState();
    const [orderHistory, setOrderHistory] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [nextPage, setNextPage] = useState();
    const limit = 10;

    let [pageNumber, setPageNumber] = useState(1);
    const handleNextPage = () => {setPageNumber(++pageNumber)};
    const handlePreviousPage = () => {setPageNumber(--pageNumber)};

    
    useEffect(() => {
        const fetchCart = () => {
            axiosInstance
            .get(`orders/history/?limit=${limit}&offset=${(pageNumber - 1) * limit}&status=${orderStatus}`)
            .then((res) => {
                setCount(res.data.count);
                setPreviousPage(res.data.previous);
                setNextPage(res.data.next);
                setOrderHistory(res.data.results);
            })
            .catch((err) => console.log(err));
        };
    
        fetchCart();
    }, [pageNumber]);


    if (!orderHistory) return <div>Retrieving data...</div>

    return (
        <Container>
            <h6>{count} items</h6>
            <hr />

            {orderHistory.map((order) => {
                return (
                    <Row key={order.id} className='mb-3'>
                        <Col className='d-flex'>
                            <Image src={order.product.image} className='order-image' />

                            <Col className='ms-3'>
                                <p className='fw-bold m-auto'>{order.product.name}</p>
                                <p className='m-auto text-black-50'>Seller: {order.seller}</p>
                                <p className='m-auto'>
                                    <span className='text-black-50'>Quantity:</span> {order.quantity}
                                </p>

                                <Button 
                                size='sm' 
                                className='mt-3' 
                                as={Link} 
                                to={`/${order.product.id}`}>
                                    Buy again
                                </Button>
                            </Col>

                            <Col>
                                {(orderStatus == 'Shipped') && (
                                <Button
                                size='sm'
                                as={Link}
                                to={`/${order.product.id}/create-review`}>
                                    Leave a review
                                </Button>
                                )}
                            </Col>
                        </Col>
                    </Row>
                )
            })}

            <Container className='d-flex justify-content-center'>
                {!!previousPage && (<Button onClick={handlePreviousPage} className='mx-1'>Previous Page</Button>)}
                {!!nextPage && (<Button onClick={handleNextPage} className='mx-1'>Next Page</Button>)}
            </Container>
            
        </Container>
    )
}

export default Orders;