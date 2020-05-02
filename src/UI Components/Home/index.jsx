import React, { useState, useEffect } from 'react';
import { Jumbotron, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCities, getRestaurants, filterRestaurants } from '../../Redux Files/Actions & Constants'
import Select from 'react-select';
import Spinner from 'react-bootstrap/Spinner'

export const Home = () => {
  const cities = useSelector(state => state.home.Cities);
  const address = useSelector(state => state.home.Address);
  const restaurants = useSelector(state => state.home.Restaurants);
  const showLoader = useSelector(state => state.home.loading);
  const dispatch = useDispatch();
  const [filtered, setFlag] = useState(false);

  // const [mapObj, setMap] = useState({});

  useEffect(() => {
    dispatch(getCities());
  }, [])
  const handleCityChange = (value) => {
    if (value != null) {
      dispatch(getRestaurants(value.value))
    } else {
      setFlag(false)
      dispatch(filterRestaurants(null))
    }
  }
  const handleAddressChange = (value) => {
    if (value != null) {
      setFlag(true)
      dispatch(filterRestaurants(value.value))
    } else {
      setFlag(false)
      dispatch(filterRestaurants(''))
    }
  }
  return (
    <div className="home-container">
      <Jumbotron>
        <h1 className='text-center'>Find restaurants closer to you </h1>
      </Jumbotron>
      <Row className="justify-content-md-center margin0">
        <Col xs={12} md={8}>
          <Select
            placeholder="Search and Select your City"
            isClearable={true}
            isSearchable={true}
            options={cities}
            onChange={handleCityChange}
          />
        </Col>
      </Row>
      {(restaurants.length > 5 || filtered) &&
        <Row className="justify-content-md-center mt-3 margin0">
          <Col xs={12} md={8}>
            <Select
              placeholder="Search for a Closest address"
              isClearable={true}
              isSearchable={true}
              options={address}
              onChange={handleAddressChange}
            />
          </Col>
        </Row>
      }
      {showLoader &&
        <Row className="justify-content-center margin0">
          <Spinner className='m-3' animation="border" variant="secondary" />
        </Row>
      }
      <Row className="justify-content-md-center margin0">
        {restaurants.map((restaurant, index) =>
          <Col key={index} xs={12} md={4} lg={3}>
            <Card style={{ margin: '1rem' }}>
              <Card.Img variant="top" style={{ height: '170px' }} src={restaurant.image_url} />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                  Address: {restaurant.address}, {restaurant.area}, {restaurant.city} {restaurant.country}
                </Card.Text>
                <Card.Text>   Contact: {restaurant.phone}
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        )}

      </Row>

    </div>
  );
}