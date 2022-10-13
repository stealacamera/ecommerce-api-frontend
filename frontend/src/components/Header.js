import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';


function Header() {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [categories, setCategories] = useState();


    useEffect(() => {
    const fetchCategories = () => {
        axios
        .get('http://127.0.0.1:8000/api/category/')
        .then((res) => {
            setCategories(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchCategories();
    }, []);


    if (!categories) return
    
    return (
        <header>
            <Navbar bg='light' expand='sm'>
                <Container>
                    <Navbar.Brand href='/'>Shop Name</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse>
                        <Nav className='ms-auto'>
                            {!localStorage.getItem('access_token') && [
                                <Button as={Link} to='/user/register' variant='outline-secondary' className='me-2'>Register</Button>,
                                <Button as={Link} to='/user/login' variant='outline-secondary'>Log in</Button>
                            ]}

                            {localStorage.getItem('access_token') && [
                                <Button as={Link} to='/user/profile' variant='outline-secondary' className='me-2'>Profile</Button>,
                                <Button as={Link} to='/cart' variant='outline-secondary' className='me-2'>Cart</Button>,
                                <Button as={Link} to='/user/logout' variant='outline-secondary'>Log out</Button>]
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Navbar bg='light'>
                <Container>
                    <Nav>
                        <Nav.Link onClick={handleShow}>All Products</Nav.Link>

                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Product Categories</Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <Nav className='flex-column'>
                                    {categories.map((category) => {
                                        return (
                                            <Nav.Link
                                            key={category.id}                                             
                                            as={Link} 
                                            reloadDocument 
                                            to={`/collections/${category.id}`}>
                                                {category.name}
                                            </Nav.Link>
                                        )
                                    })}
                                </Nav>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default memo(Header);