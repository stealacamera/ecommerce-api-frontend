import { useState } from 'react';
import axiosInstance from '../axios';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function AccountInfo() {
    const [newUsername, setNewUsername] = useState();
    const [passwordForm, updatePasswordForm] = useState({
        current_password: '',
        new_password: '',
    })
    const [addressForm, updateAddressForm] = useState({
        country: '',
        city: '',
        street_address: '',
        zip_code: '',
    })
    const [errors, setErrors] = useState({
        new_username: '',
        current_password: '',
        country: '',
        city: '',
        street_address: '',
        zip_code: '',
    })


    const handleUsername = (e) => {
        setNewUsername(e.target.value.trim());
    }

    const handlePassword = (e) => {
        updatePasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleAddress = (e) => {
        updateAddressForm({
            ...addressForm,
            [e.target.name]: e.target.value.trim()
        });
    };


    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        
        axiosInstance
        .put('account/profile/', {new_username: newUsername})
        .then((res) => {
            if (res.status == 200) {
                window.location.reload();
            }
        })
        .catch((err) => {
            console.log(err.response.data);
            setErrors(err.response.data);
        });
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        axiosInstance
        .put('account/change-password/', {
            current_password: passwordForm.current_password,
            new_password: passwordForm.new_password,
            refresh: localStorage.getItem('refresh_token')
        })
        .then((res) => {
            if (res.status == 200) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/user/login';
            }
        })
        .catch((err) => {
            setErrors(err.response.data);
        });
    }

    const handleAddressSubmit = (e) => {
        e.preventDefault();

        axiosInstance
        .put('account/change-address/', {
            country: addressForm.country,
            city: addressForm.city,
            street_address: addressForm.street_address,
            zip_code: addressForm.zip_code,
        })
        .then((res) => {
            if (res.status == 200) {
                window.location.reload();
            }
        })
        .catch((err) => {
            setErrors(err.response.data);
        });
    }


    return (
        <Stack className='w-50'>
            <Container>
                <h6>Change username</h6>

                <FloatingLabel controlId='floatingUsername' label='New username'>
                    <Form.Control 
                    required 
                    type='text' 
                    name='new_username'
                    placeholder='New Username' 
                    onChange={handleUsername}
                    isInvalid={!!errors.new_username || !!errors.refresh}/>

                    <Form.Control.Feedback type='invalid'>{errors.new_username}</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.refresh}</Form.Control.Feedback>
                </FloatingLabel>

                <Button className='mt-3' onClick={handleUsernameSubmit}>Confirm new username</Button>
            </Container>
            
            <Container className='my-5'>
                <h6>Change password</h6>

                <Row sm={2} className='g-2'>
                    <FloatingLabel controlId='floatingCurrentPassword' label='Current password'>
                        <Form.Control 
                        required  
                        type='password' 
                        name='current_password'
                        placeholder='Current password' 
                        onChange={handlePassword}
                        isInvalid={!!errors.current_password}/>
                        <Form.Control.Feedback type='invalid'>{errors.current_password}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId='floatingNewPassword' label='New password'>
                        <Form.Control 
                        required 
                        type='password' 
                        name='new_password'
                        placeholder='New password' 
                        onChange={handlePassword}
                        isInvalid={!!errors.new_password}/>
                        <Form.Control.Feedback type='invalid'>{errors.new_password}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>

                <Button className='mt-3' onClick={handlePasswordSubmit}>Confirm new password</Button>
            </Container>

            <Container>
                <h6>Change address info</h6>

                <Row sm={2} className='g-2'>
                    <FloatingLabel controlId='floatingCountry' label='New country'>
                        <Form.Control 
                        required 
                        type='text' 
                        name='country'
                        placeholder='New country' 
                        onChange={handleAddress}
                        isInvalid={!!errors.country}/>
                        <Form.Control.Feedback type='invalid'>{errors.country}</Form.Control.Feedback>
                    </FloatingLabel>
                    
                    <FloatingLabel controlId='floatingCity' label='New city'>
                        <Form.Control 
                        required 
                        type='text' 
                        name='city'
                        placeholder='New city' 
                        onChange={handleAddress}
                        isInvalid={!!errors.city}/>
                        <Form.Control.Feedback type='invalid'>{errors.city}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>

                <FloatingLabel controlId='floatingStreetAddress' label='New street address'>
                    <Form.Control 
                    required 
                    type='text' 
                    name='street_address'
                    placeholder='New street address' 
                    onChange={handleAddress}
                    isInvalid={!!errors.street_address}/>
                    <Form.Control.Feedback type='invalid'>{errors.street_address}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId='floating' label='New zip code'>
                    <Form.Control 
                    required 
                    type='text' 
                    name='zip_code'
                    placeholder='New zip code' 
                    onChange={handleAddress}
                    isInvalid={!!errors.zip_code}/>
                    <Form.Control.Feedback type='invalid'>{errors.zip_code}</Form.Control.Feedback>
                </FloatingLabel>

                <Button className='mt-3' onClick={handleAddressSubmit}>Confirm new address</Button>
            </Container>
        </Stack>
    )
}

export default AccountInfo;