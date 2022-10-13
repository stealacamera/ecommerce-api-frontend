import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function ReviewForm() {
    const { productId } = useParams();
    const [productName, setProductName] = useState();
    const [reviewForm, updateReviewForm] = useState({
        title: '',
        text: '',
        rating: '',
    })
    const [errors, setErrors] = useState(reviewForm)


    const handleChange = (e) => {
        updateReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = () => {
        axiosInstance
        .post(`${productId}/reviews/`, {
            title: reviewForm.title,
            text: reviewForm.text,
            rating: reviewForm.rating,
        })
        .then((res) => {
            if (res.status === 201){
                window.location.href = `/${productId}`;
            }
        })
        .catch((err) => {
            setErrors(err.response.data);
        })
    }

    useEffect(() => {
        const fetchProduct = () => {
            axiosInstance
            .get(`http://127.0.0.1:8000/api/${productId}/`)
            .then((res) => {
                setProductName(res.data.name);
            })
            .catch((err) => console.log(err));
        };

        fetchProduct();
    }, []);


    return (
        <Container className='text-start w-50'>
            <h4>Create Review</h4>

            <h6 className='mt-5'>{productName}</h6>
            <hr  />

            <FloatingLabel controlId='floatingRating' label='Rating'>
                <Form.Control 
                required 
                type='number' 
                min={1}
                max={5} 
                name='rating'
                placeholder='Rating' 
                onChange={handleChange}
                isInvalid={!!errors.rating}/>
                <Form.Control.Feedback type='invalid'>{errors.rating}</Form.Control.Feedback>
            </FloatingLabel>
            
            <FloatingLabel controlId='floatingTitle' label='Title'>
                <Form.Control 
                className='my-3'
                required 
                type='text' 
                name='title'
                placeholder='Title' 
                onChange={handleChange}
                isInvalid={!!errors.title}/>
                <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId='floatingText' label='Why did you like or dislike this product?'>
                <Form.Control 
                required 
                as='textarea' 
                name='text' 
                placeholder='Text' 
                onChange={handleChange}
                isInvalid={!!errors.text}/>
                <Form.Control.Feedback type='invalid'>{errors.text}</Form.Control.Feedback>
            </FloatingLabel>

            <Button size='lg' className='mt-3' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default ReviewForm;