import { memo } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const Products = (props) => {
    const { data } = props;

    if (!data) return <p>No products are live</p>;
    
    return (
        <Container>
            <Row md={5} className='g-5'>
                {data.map((product) => {
                    return (
                        <Col key={product.id}>
                            <Link to={`/${product.id}`} className='card-link'>
                                <Card key={product.id} className='card'>
                                    <Card.Img src={product.image} className='card-image'/>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default memo(Products);