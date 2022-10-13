import { useState } from 'react';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';


function Registration() {
    const [formData, updateFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        country: '',
        city: '',
        street_address: '',
        zip_code: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        address: {
            country: '',
            city: '',
            street_address: '',
            zip_code: '',
        },
    });
    

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
        .post('account/register/', {
            username: formData.username,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            address: {
                country: formData.country,
                city: formData.city,
                street_address: formData.street_address,
                zip_code: formData.zip_code,
            }
        })
        .then((res) => {
            localStorage.setItem('refresh_token', res.data.tokens.refresh);
            localStorage.setItem('access_token', res.data.tokens.access);

            axiosInstance.defaults.headers['Authorization'] = 
                'Bearer ' + localStorage.getItem('access_token');
            
            window.location.href = '/';
        })
        .catch((err) => {
            setErrors(err.response.data);
        });
    }

    return (
        <Stack gap={4} className='mx-auto registration'>
            <h4>Registration</h4>

            <Stack gap={2}>
                <h6 className='d-flex fst-italic'>User information</h6>

                <FloatingLabel controlId='floatingUsername' label='Username'>
                    <Form.Control 
                    required 
                    type='text' 
                    name='username'
                    placeholder='Username' 
                    onChange={handleChange}
                    isInvalid={!!errors.username}/>
                    <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                </FloatingLabel>

                <Row sm={2} className='g-2'>
                    <FloatingLabel controlId='floatingFirstName' label='First name'>
                        <Form.Control 
                        required 
                        type='text' 
                        name='first_name'
                        placeholder='Name' 
                        onChange={handleChange}
                        isInvalid={!!errors.first_name}/>
                        <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId='floatingLastName' label='Last name'>
                        <Form.Control 
                        required 
                        type='text' 
                        name='last_name'
                        placeholder='Surname' 
                        onChange={handleChange}
                        isInvalid={!!errors.last_name}/>
                        <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>            

                <FloatingLabel controlId='floatingEmail' label='Email address'>
                    <Form.Control 
                    required 
                    type='email' 
                    name='email'
                    placeholder='name@example.com' 
                    onChange={handleChange}
                    isInvalid={!!errors.email}/>
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </FloatingLabel>

                <Row sm={2} className='g-2'>
                    <FloatingLabel controlId='floatingPassword' label='Password'>
                        <Form.Control 
                        required 
                        type='password' 
                        name='password'
                        placeholder='Password' 
                        onChange={handleChange}
                        isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId='floatingPassword2' label='Password again'>
                        <Form.Control 
                        required 
                        type='password' 
                        name='password2'
                        placeholder='Password again' 
                        onChange={handleChange}
                        isInvalid={!!errors.password2}/>
                        <Form.Control.Feedback type='invalid'>{errors.password2}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
            </Stack>

            <Stack gap={2}>
                <h6 className='d-flex fst-italic'>Adress information</h6>

                <Row sm={2} className='g-2'>
                    <FloatingLabel controlId='floatingCountry' label='Country'>
                        <Form.Control 
                        required 
                        type='text' 
                        name='country'
                        placeholder='Country' 
                        onChange={handleChange}
                        isInvalid={!!errors.address.country}/>
                        <Form.Control.Feedback type='invalid'>{errors.address.country}</Form.Control.Feedback>
                    </FloatingLabel>
                    
                    <FloatingLabel controlId='floatingCity' label='City'>
                        <Form.Control 
                        required 
                        type='text' 
                        name='city'
                        placeholder='City' 
                        onChange={handleChange}
                        isInvalid={!!errors.address.city}/>
                        <Form.Control.Feedback type='invalid'>{errors.address.city}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>

                <FloatingLabel controlId='floatingStreetAddress' label='Street address'>
                    <Form.Control 
                    required 
                    type='text' 
                    name='street_address'
                    placeholder='Street address' 
                    onChange={handleChange}
                    isInvalid={!!errors.address.street_address}/>
                    <Form.Control.Feedback type='invalid'>{errors.address.street_address}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId='floating' label='Zip code'>
                    <Form.Control 
                    required 
                    type='text' 
                    name='zip_code'
                    placeholder='Zip code' 
                    onChange={handleChange}
                    isInvalid={!!errors.address.zip_code}/>
                    <Form.Control.Feedback type='invalid'>{errors.address.zip_code}</Form.Control.Feedback>
                </FloatingLabel>
            </Stack>
            
            <Container>
                <Button size='lg' className='w-50' onClick={handleSubmit}>Submit</Button>
            </Container>
            
        </Stack>
    )
}

export default Registration;