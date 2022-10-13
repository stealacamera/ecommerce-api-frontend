import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


function Sales() {
    const [salesHistory, setSalesHistory] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [nextPage, setNextPage] = useState();
    const limit = 10;

    let [pageNumber, setPageNumber] = useState([1]);
    const handleNextPage = () => {setPageNumber(++pageNumber)};
    const handlePreviousPage = () => {setPageNumber(--pageNumber)};


    useEffect(() => {
        const fetchSales = async () => {
            axiosInstance
            .get(`orders/sales/?limit=${limit}&offset=${(pageNumber - 1) * limit}`)
            .then((res) => {
                setPreviousPage(res.data.previous);
                setNextPage(res.data.next);
                setSalesHistory(res.data.results);
            })
            .catch((err) => console.log(err));
        };
    
        fetchSales();
    }, [pageNumber]);


    if (!salesHistory) return <div>Retrieving data...</div>

    return (
        <Container>
            {salesHistory.map((sale) => {
                return (
                    <Row key={sale.id} className='mb-3'>
                        <Col className='d-flex'>
                            <Image src={sale.product.image} className='order-image' />

                            <Col className='ms-3'>
                                <Link 
                                className='fw-bold m-auto' 
                                to={`/${sale.product.id}`}>
                                    {sale.product.name}
                                </Link>

                                <p className='m-auto'>Quantity: {sale.quantity}</p>
                                <p className='m-auto'>
                                    Status: <span className='fw-bold'>{sale.status}</span>
                                </p>
                            </Col>

                            <Col>
                                <p className='fw-bold m-auto'>Customer</p>
                                <hr className='mt-0' />

                                <p className='m-auto'>{sale.customer.first_name} {sale.customer.last_name}</p>
                                <p>{sale.customer.email}</p>

                                <p className='m-auto'>{sale.customer.address.city}, {sale.customer.address.country}</p>
                                <p className='m-auto'>{sale.customer.address.street_address}</p>
                                <p className='m-auto'>{sale.customer.address.zip_code}</p>
                            </Col>
                        </Col>
                    </Row>
                )
            })}

            <Container className='d-flex justify-content-center'>
                {!!previousPage && (<Button onClick={handlePreviousPage} className='mx-1'>Previous Page</Button>)}
                {!!nextPage && [
                <Button disabled>{pageNumber}</Button>,
                <Button onClick={handleNextPage} className='mx-1'>Next Page</Button>]}
            </Container>
        </Container>
    )
}

export default Sales;