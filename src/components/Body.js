import { useEffect, useState, useContext } from 'react';
import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import Loader from './Loader';
import resList from '../utils/mockData';

const Body = () => {
  // * React Hook -> A normal JavaScript function which is given to us by React (or) Normal JS utility functions
  // * useState() - Super Powerful variable
  // * useEffect() -

  // * State Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState('');

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const data = await fetch(
    //   'https://www.swiggy.com/mapi/homepage/getCards?lat=20.2960587&lng=85.8245398'
    // );

    // const json = await data.json();

    // console.log(json);
    // * optional chaining
    
    setListOfRestaurants(
      resList?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants
    );

    setFilteredRestaurant(
      resList?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
        Looks like you're offline! Please check your internet connection
      </h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Loader />
  ) : (
    <div className="body">
      {/* <div className="search-container">
        <input type="text" placeholder="Search Food or Restaurant" />
        <button>Search</button>
      </div> */}
      <div className="flex justify-between">
        <div className="p-4 m-4 search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              data-testid="searchInput"
              placeholder="Search a restaurant you want..."
              className="px-4 py-2 border-0 border-transparent shadow-md font-medium bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[300px] placeholder:font-medium focus:border-b-2 focus:border-green-500"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 m-4 bg-green-100 rounded-lg shadow-md hover:bg-green-300 duration-[.3s] font-medium"
              onClick={() => {
                // * Filter the restaurant cards and update the UI
                // * searchText
                // console.log(searchText);

                const filteredRestaurant = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );

                setFilteredRestaurant(filteredRestaurant);
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center p-4 m-4 search">
          <button
            className="px-4 py-2 m-4 bg-gray-100 shadow-md hover:bg-gray-200 duration-[.3s] rounded-lg font-medium"
            onClick={() => {
              // * Filter logic
              const filteredList = listOfRestaurants.filter(
                (res) => parseFloat(res.info.avgRating) > 4
              );

              setFilteredRestaurant(filteredList);
              console.log(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        
      </div>
      <div className="flex flex-wrap justify-center">
        {/* // * looping through the <RestaurentCard /> components Using Array.map() method */}

        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info.id}
            to={'/restaurants/' + restaurant?.info.id}
          >
            {restaurant?.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant?.info} />
            ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;