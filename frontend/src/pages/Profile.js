import Account from '../components/Account';
import AccountInfo from '../components/AccountInfo';
import Orders from '../components/Orders';
import Sales from '../components/Sales';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Profile() {
    
    return (
        <Container className='text-start'>
            <h4 className='text-uppercase my-3'>Your profile</h4>

            <Tab.Container defaultActiveKey='account'>
                <Row className='d-flex'>
                    <Col sm={3}>
                        <Nav className='flex-column p-3 bg-secondary'>
                            <Nav.Item>
                                <Nav.Link eventKey='account' className='text-white'>Account</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='change-info' className='text-white'>Change Info</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey='sales' className='text-white'>Sales</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey='orders' className='text-white'>Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='open-orders' className='text-white'>Open Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='cancelled-orders' className='text-white'>Cancelled Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey='account'>
                            <Account />
                        </Tab.Pane>

                        <Tab.Pane eventKey='change-info'>
                            <AccountInfo />
                        </Tab.Pane>

                        <Tab.Pane eventKey='orders'>
                            <Orders orderStatus={'Shipped'} />
                        </Tab.Pane>

                        <Tab.Pane eventKey='open-orders'>
                            <Orders orderStatus={'Ordered'} />
                        </Tab.Pane>

                        <Tab.Pane eventKey='cancelled-orders'>
                            <Orders orderStatus={'Refunded'} />
                        </Tab.Pane>

                        <Tab.Pane eventKey='sales'>
                            <Sales />
                        </Tab.Pane>
                    </Tab.Content>
                        
                    </Col>
                </Row>
            </Tab.Container>
            
            
        </Container>
    )
}

export default Profile;