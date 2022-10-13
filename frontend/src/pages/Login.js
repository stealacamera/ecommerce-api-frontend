import { useState } from 'react';
import axiosInstance from '../axios';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Login() {
    const [formData, updateFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        detail: '',
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
        .post('account/login/', {
            username: formData.username,
            password: formData.password,
        })
        .then((res) => {
            localStorage.setItem('refresh_token', res.data.refresh);
            localStorage.setItem('access_token', res.data.access);
            
            axiosInstance.defaults.headers['Authorization'] = 
                'Bearer ' + localStorage.getItem('access_token');

            window.location.href = '/';
        })
        .catch((err) => {
            setErrors(err.response.data);
        });
    }


    return (
        <Stack gap={3} className='m-auto w-25'>
            <h4>Log in</h4>

            <FloatingLabel controlId='floatingUsername' label='Username'>
                <Form.Control 
                required 
                type='text' 
                name='username'
                placeholder='Username' 
                onChange={handleChange}
                isInvalid={!!errors.username}/>
                <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback>
            </FloatingLabel>
            
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

            {errors.detail && (<Alert variant='danger'>{errors.detail}</Alert>)}

            <Container>
                <Button size='lg' className='w-50' onClick={handleSubmit}>Submit</Button>
            </Container>
        </Stack>
    )
}

export default Login;