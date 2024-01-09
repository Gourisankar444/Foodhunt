import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector } from 'react-redux';

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState('Login');

  const onlineStatus = useOnlineStatus();

  // * Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <header className="flex justify-between sm:bg-yellow-200 lg:bg-green-200 font-[500] shadow-md">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3655/3655682.png"
            alt="Logo"
            className="w-16 mx-6 mt-2"
          />
        </Link>
      </div>
      <div className="flex items-center ">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? '✅' : '⛔'}</li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 hover:text-green-500 duration-[.3s]">
            <Link to="/cart">
              🛒 (
              {cartItems.length === 1
                ? `${cartItems.length} item`
                : `${cartItems.length} items`}
              )
            </Link>
          </li>
          <button
            className="px-4 hover:text-green-500 duration-[.3s]"
            onClick={() => {
              //   btnName = 'Logout';
              btnNameReact === 'Login'
                ? setBtnNameReact('Logout')
                : setBtnNameReact('Login');
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
