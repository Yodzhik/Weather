import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { getWeatherAPI } from './service/api';


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [change, setChange] = useState(false)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setChange(true)
      setLocation('')
      getWeatherAPI(event.target.value).then(res => {
        if (res) {
          setData(res)
        } else {
          setData('notFound')
          setLocation('')
        }
      })
    }
  }

  const weatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <i className="bi bi-sun"></i>;
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
        <Row className='justify-content-center p-5'>
          <Col xs={12} lg={6} xl={3}>
            <Card>
              <Card.Body id='weather' className={'d-flex flex-column'}>
                <div style={{minHeight: '400px'}}>
                {data.name ?
                <div>
                  <h6>{data?.name}</h6>
                  <div className='d-flex justify-content-center mb-5 mt-2'>
                    {weatherIcon(data.weather ? data.weather[0].main : null)}
                  </div>
                  <div className='d-flex justify-content-center mt-2'>
                    {data.main ? <h1>{Math.floor(data.main.temp)}°C</h1> : null}
                  </div>
                  <div className='d-flex justify-content-center mb-5 '>
                    {data.main ? <h6>Ощущается как {Math.floor(data.main.feels_like)}°C</h6> : null}
                  </div>
                  <div className='d-flex justify-content-center mb-5'>
                    <h4>{dayOfWeek}</h4>
                  </div>
                </div>
                : data === 'notFound' &&
                  <h4>Город не найден</h4>
                }
                </div>
                <div className='d-flex justify-content-center'>
                  {!change ?
                    <Form.Control
                      value={location}
                      onChange={event => setLocation(event.target.value)}
                      onKeyUp={searchLocation}
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Введите город"
                    />
                    :
                    <Button variant={'outline-warning rounded-pill'} onClick={() => setChange(false)}>Изменить</Button>
                  }
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
