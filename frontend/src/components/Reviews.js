import { memo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../style.css'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Stack from 'react-bootstrap/esm/Stack';
import Button from 'react-bootstrap/esm/Button';
import BeautyStars from 'beauty-stars';


function Reviews(){
    const { productId } = useParams();
    const limit = 4;

    const [reviews, setReviews] = useState([]);
    const [previousPage, setPreviousPage] = useState([]);
    const [nextPage, setNextPage] = useState([]);
    const [count, setCount] = useState([]);

    let [pageNumber, setPageNumber] = useState([1]);
    const handleNextPage = () => {setPageNumber(++pageNumber)};
    const handlePreviousPage = () => {setPageNumber(--pageNumber)};


    useEffect(() => {
        const fetchReviews = () => {
            axios
            .get(`http://127.0.0.1:8000/api/${productId}/reviews/?limit=${limit}&offset=${(pageNumber - 1) * limit}`)
            .then((res) => {
                setCount(res.data.count);
                setNextPage(res.data.next);
                setPreviousPage(res.data.previous);
                setReviews(res.data.results);
            })
            .catch((err) => console.log(err));
        };

        fetchReviews();
    }, [pageNumber]);

    
    return (
        <Container className='my-5 review-container'>
            <h5>{count} product reviews</h5>
            <hr className=''/>

            <Row sm={1} className='g-4'>
                {reviews.map((review) => {
                    return (
                        <Stack key={review.id} gap={3}>
                            <BeautyStars 
                                value={review.rating}
                                editable='false'
                                size='1.1em'
                                gap='5px'
                                activeColor='#171717'
                                inactiveColor='#999ca3'/>

                            <div>
                                <p className='text-start m-0 fw-bold '>{review.title}</p>
                                <p className='text-start m-0'>{review.text}</p>
                            </div>
                            
                            
                            <div className='d-flex gap-3'>
                                <Link className='review-user'>{review.user}</Link>
                                <p className='review-date'>{review.date}</p>
                            </div>
                        </Stack>
                    )
                })}
            </Row>

            {!!previousPage && (<Button onClick={handlePreviousPage} className='mx-1'>Previous Page</Button>)}
            {(count > limit) && <Button disabled>{pageNumber}</Button>}
            {!!nextPage && (<Button onClick={handleNextPage} className='mx-1'>Next Page</Button>)}
        </Container>
    )
}

export default memo(Reviews);