
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from "axios";

function Activities() {
  // to retrieve the id from the url
  let {id}= useParams()
  
  const [ itineraryData, setItineraryData ]= useState([]);
  const [daysData, setDaysData] = useState([])

  const fetchData = async (id) => {
    try {
      const {data} = await axios.get(`/itinerary/${id}`)
      setItineraryData(data)
      
    } catch (error) {
      console.log(error);
    }
  }
  // to fetch the itinerary based on id when the id is changed.
  useEffect(() => { 
    fetchData(id);
  }, [id]);


// promise.all waits for all items to be retrieved inside .map function before rendering
const fetchDates = async () => {
  try {
    const tempDayDataArray = await Promise.all(itineraryData.days.map(async (item) => { 
      const { data } = await axios.get(`/day/${item}`);
      return data;
    }));
    setDaysData(tempDayDataArray);
  } catch (error) {
    console.error('Error fetching dates:', error);
  }
};

// runs when the itinerary data is updated to ensure data is available for the fetchDates
useEffect(() => {
  fetchDates();
}, [itineraryData]);

// changes the dates to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
const renderDates = () => {
  if (daysData.length === 0) {
    return <div><p>Loading...</p></div>; // Display a loading indicator while data is being fetched
  }
  let itinerary = itineraryData
  return ( <div><Card>
    <Card.Header>
      <Nav variant="tabs" defaultActiveKey="#first">
        
        {daysData.map((day)=>{
          return (<Nav.Item><Nav.Link key={day._id}>{formatDate(day.date)}</Nav.Link></Nav.Item>)
        })}
         
      </Nav>
    </Card.Header>
    <Card.Body>
      <Card.Title>Special title treatment</Card.Title>
      <Card.Text>
        With supporting text below as a natural lead-in to additional content.
      </Card.Text>
      <Button variant="primary">Save</Button>
    </Card.Body>
  </Card> </div>)
  }


const divStyle = {
  display:'flex',
  flexWrap: 'wrap',
  margin:'5%',
  paddingBottom: '5%',
  justifyContent: 'center',
  alignItems: 'center'
}

return (
  <div style={divStyle}>
      <h4>This is the create escape activity details page</h4>
      {renderDates()}
      
      
  </div>
)
}

export default Activities;