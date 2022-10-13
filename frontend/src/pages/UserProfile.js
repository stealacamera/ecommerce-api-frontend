import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function UserProfile() {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState();


    useEffect(() => {
        const fetchUserProfile = () => {
            axiosInstance
            .get(`account/profile/${username}/`)
            .then((res) => {
                setUserProfile(res.data); 
            })
        };
        
        fetchUserProfile();
    }, []);


    if (!userProfile) return <div>Receiving data...</div>

    return (
        <Container className='w-50 text-start'>
            <h4 className='mt-3'>{userProfile.username}</h4>
            <p className='my-0'><span className='fw-bold'>Email:</span> {userProfile.email}</p>
            <br />

            <h6 className='fw-bold'>Products</h6>
            <Row sm={3}>
                {userProfile.products.map((product, index) => {
                    return (
                        <Col key={index}>
                            <Link to={`/${product.replace('http://127.0.0.1:8000/api/', '')}`}>
                                Product {index + 1}
                            </Link>
                        </Col>
                        
                    )
                })}
            </Row>
        </Container>
    )
}

export default UserProfile;