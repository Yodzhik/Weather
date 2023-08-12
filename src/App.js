import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=39b2f7865704c46a89117f4aaef142f1&units=metric`
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
  }

  const weatherIcon = (condition) => {
    switch (condition) {
      case 'Clear sky':
      case 'Sun':
        return <i className="bi bi-sun"></i>;
      case 'Clouds':
        return <i className="bi bi-cloud-sun-fill"></i>;
      case 'Shower rain':
      case 'Rain':
      case 'Thunderstorm':
        return <i className="bi bi-cloud-drizzle-fill"></i>;
      case 'Snow':
        return <i className="bi bi-snow2"></i>;
      case 'Mist':
        return <i className="bi bi-cloud-fog2"></i>;
      default:
        return null;
    }
  }

  return (
    <div className="app">
      <Container>
        <Row>
          <Col xs={12} lg={6} xl={3}>
            <Card>
              <Card.Body id='weather'>
                <Row className='row row-cols-1'>
                  <Col className='d-flex justify-content-center mb-5'>
                    <h6>{data.name}</h6>
                  </Col>
                  <Col className='d-flex justify-content-center mb-5 mt-2'>
                    {weatherIcon(data.weather ? data.weather[0].main : null)} 
                  </Col>
                  <Col className='d-flex justify-content-center mt-2'>
                    {data.main ? <h1>{data.main.temp}°C</h1> : null}
                  </Col>
                  <Col className='d-flex justify-content-center mb-5 '>
                    {data.main ? <h6>FeelLike {data.main.feels_like}</h6> : null}
                  </Col>
                  <Col className='d-flex justify-content-center mb-5'>
                    <h4>{dayOfWeek}</h4>
                  </Col>
                  <Col className='d-flex justify-content-center'>
                    <input
                      value={location}
                      onChange={event => setLocation(event.target.value)}
                      onKeyUp={searchLocation}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Введите город"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
