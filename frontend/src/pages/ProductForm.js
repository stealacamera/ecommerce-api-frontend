import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ProductForm() {
    const [categories, setCategories] = useState();
    const [productForm, updateProductForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });
    const [categoriesForm, updateCategoriesForm] = useState([]);
    const [imageForm, updateImageForm] = useState();
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        stock: '',
        categories: '',
    });

    
    const handleCategoryChange = (e) => {
        updateCategoriesForm((prev) => 
            categoriesForm.includes(e.target.name)
            ? prev.filter((cur) => cur !== e.target.name)
            : [...prev, e.target.name]
        )
    }

    const handleImageChange = (e) => {
        updateImageForm(e.target.files[0])
    }

    const handleChange = (e) => {
        updateProductForm({
            ...productForm,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = async () => {
        let newProductId = 0;

        const createProduct = await axiosInstance
                                    .post('', {
                                        name: productForm.name,
                                        description: productForm.description,
                                        image: imageForm,
                                        price: productForm.price,
                                        stock: productForm.stock,
                                        categories: categoriesForm
                                    }, {
                                        headers: {'Content-Type': 'multipart/form-data'}
                                    })
                                    .then((res) => {
                                        if (res.status === 201) {
                                            newProductId = res.data.id;
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        setErrors(err.response.data);
                                    });

        const addCategories = axiosInstance
                            .patch(`${newProductId}/`, {categories: categoriesForm})
                            .then((res) => {
                                if (res.status === 200) {
                                    window.location.href = `/${res.data.id}`
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                setErrors(err.response.data);
                            });
    }

    useEffect(() => {
        const fetchCategories = () => {
            axiosInstance
            .get('category')
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err))
        };

        fetchCategories();
    }, [])


    if (!categories) return <div>Retrieving data...</div>

    return (
        <Container className='w-75 text-start'>
            <h4>Create product</h4>

            <FloatingLabel controlId='floatingName' label='Name'>
                <Form.Control 
                className='my-3'
                required 
                type='text' 
                name='name'
                placeholder='Name' 
                onChange={handleChange}
                isInvalid={!!errors.name}/>
                <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId='floatingDescription' label='Description'>
                <Form.Control 
                className='my-3'
                required 
                as='textarea' 
                rows={3}
                name='description'
                placeholder='Description' 
                onChange={handleChange}
                isInvalid={!!errors.description}/>
                <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
            </FloatingLabel>

            <Form.Group controlId='formImage'>
                <Form.Label>Upload an image of the product</Form.Label>
                <Form.Control 
                className='mb-3' 
                type='file'
                onChange={handleImageChange}
                isInvalid={!!errors.image} />
                <Form.Control.Feedback type='invalid'>{errors.image}</Form.Control.Feedback>
            </Form.Group>

            <Row sm={2}>
                <Col>
                    <FloatingLabel controlId='floatingPrice' label='Price'>
                        <Form.Control 
                        className='my-3'
                        required 
                        type='number' 
                        name='price'
                        placeholder='Price' 
                        onChange={handleChange}
                        isInvalid={!!errors.price}/>
                        <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                
                <Col>
                    <FloatingLabel controlId='floatingStock' label='Stock'>
                        <Form.Control 
                        className='my-3'
                        required 
                        type='number' 
                        name='stock'
                        placeholder='Stock' 
                        onChange={handleChange}
                        isInvalid={!!errors.stock}/>
                        <Form.Control.Feedback type='invalid'>{errors.stock}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
            
            <Form.Label>Product categories</Form.Label>
            <Row sm={4}>
                {categories.map((category) => {
                    return (
                        <Col key={category.id}>
                            <Form.Check
                            type='checkbox'
                            name={category.name}
                            label={category.name}
                            onClick={handleCategoryChange}
                            isInvalid={!!errors.categories} />
                        </Col>
                    )
                })}
            </Row>
                

            <Button size='lg' className='my-3' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default ProductForm;