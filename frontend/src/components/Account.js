import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Account() {
    const [profile, setProfile] = useState();

    
    const handleDeleteProduct = (e, productLink) => {
        const productId = productLink.replace('http://127.0.0.1:8000/api/', '');

        axiosInstance
        .delete(`${productId}`)
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        const fetchProfile = async () => {
            await axiosInstance
            .get('account/profile/')
            .then((res) => {
                setProfile(res.data);
            })
            .catch((err) => console.log(err));
        };

        fetchProfile();
    }, [handleDeleteProduct]);

    
    if (!profile) return <div>Retrieving data...</div>
    
    return (
        <Container>
            <Row sm={2}>
                <Col className='my-0'>
                    <p className='my-0'>
                        <span className='fw-bold'>Username:</span> {profile.username}
                    </p>
                    <p className='my-0'>
                        <span className='fw-bold'>Full name:</span> {profile.first_name} {profile.last_name}
                    </p>
                    <p className='my-0'>
                        <span className='fw-bold'>Email:</span> {profile.email}
                    </p>
                </Col>
                <br />

                <Col>
                    <h6 className='fw-bold'>Address information</h6>

                    <p className='my-0'>{profile.address.city}, {profile.address.country}</p>
                    <p className='my-0'>{profile.address.street_address}</p>
                    <p className='my-0'>{profile.address.zip_code}</p>
                </Col>
            </Row>
            
            <br />

            <h6 className='fw-bold'>Your products</h6>
            <Link to={'/create-product'}>Add new product</Link>
            <Row sm={3}>
                {profile.products.map((product, index) => {
                    return (
                        <Col key={index} className='d-flex flex-column'>
                            <Link to={`/${product.replace('http://127.0.0.1:8000/api/', '')}`}>
                                Product {index + 1}
                            </Link>

                            <Button 
                            size='sm'
                            className='w-50' 
                            onClick={(e) => handleDeleteProduct(e, product)}>
                                Delete
                            </Button>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Account;