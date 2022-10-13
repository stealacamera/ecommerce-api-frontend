import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Product from '../pages/Product';
import ProductForm from '../pages/ProductForm';
import ReviewForm from '../pages/ReviewForm';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Profile from '../pages/Profile';
import UserProfile from '../pages/UserProfile';
import Cart from '../pages/Cart';


const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/page/:pageNumber' element={<Homepage />} />

            <Route path='/:productId' element={<Product />} />
            <Route path='/:productId/create-review' element={<ReviewForm />} />
            <Route path='/create-product' element={<ProductForm />} />

            <Route path='/collections/:categoryId' element={<Homepage />} />
            <Route path='/collections/:categoryId/page/:pageNumber' element={<Homepage />} />

            <Route path='/user'>
                <Route path='register' element={<Registration />} />
                <Route path='login' element={<Login />} />
                <Route path='logout' element={<Logout />} />
                <Route path='profile' element={<Profile />} />
                <Route path=':username' element={<UserProfile />} />
            </Route>

            <Route path='/cart' element={<Cart />} />
        </Routes>
    );
  }

export default Main;