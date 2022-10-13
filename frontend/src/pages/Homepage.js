import { memo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Products from './Products';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function Homepage() {
  const params = useParams();
  const pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 1;

  let apiUrl = 'http://127.0.0.1:8000/api/?';
  let buttonLink = '/page';

  if (params.categoryId){
    apiUrl += `categories=${params.categoryId}&`;
    buttonLink = `/collections/${params.categoryId}` + buttonLink;
  }
  
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState([]);

  const hasPrevious = pageNumber > 1;
  const hasNext = !!nextPage;

  useEffect(() => {
    const fetchProducts = () => {
      axios
      .get(`${apiUrl}offset=${(pageNumber - 1) * 15}`)
      .then((res) => {
          setNextPage(res.data.next);
          setProducts(res.data.results);
      })
      .catch((err) => console.log(err));
    };

    fetchProducts();
  }, [pageNumber]);


  return (
    <Container>
      <Products data={products} />

      <br/>
      <Container>
        {hasPrevious && (
          <Button className='mx-1' as={Link} to={`${buttonLink}/${pageNumber - 1}`}>Previous Page</Button>
        )}
        {hasNext && (
        <Button className='mx-1' as={Link} to={`${buttonLink}/${pageNumber + 1}`}>Next Page</Button>
        )}
      </Container>
    </Container>
    
  )
}

export default memo(Homepage);