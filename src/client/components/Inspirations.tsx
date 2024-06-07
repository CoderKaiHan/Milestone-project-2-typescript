import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const BrowseEscapes = () => {

  const [ itineraryData, setItineraryData ]= useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try{
        const{data} = await axios.get('/itinerary')
        console.log('Fetched data:', data);//trying to figure out why Vercel throw an error:TypeError e.map is not a function RESULT:An array of objects
        console.log('Data type:', typeof data);//Check data type RESULT:OBJECT
        console.log('Is data an array:', Array.isArray(data));//Check if data is an array  RESULT:TRUE
        setItineraryData(data)
      } catch (err){
        console.error('Error fetching itinerary data:', err);
        return[];
      }
    }
    fetchData();
  }, []);
    
    
    //Different image urls according to vibes
    const vibeImages = {
      adventure: ' https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      romantic: 'https://images.pexels.com/photos/4352151/pexels-photo-4352151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      relaxing: 'https://images.unsplash.com/photo-1455906876003-298dd8c44ec8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'family-friendly': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
    const renderItineraries = () => {

      if (itineraryData.length === 0) {
        return <p>Loading...</p>; 
      }
      return itineraryData.map((itinerary)=>{

      let vibeImage; 
        if (itinerary.photo) {
          vibeImage = itinerary.photo;
        } else {
          vibeImage = vibeImages[itinerary.vibe] || 'https://placehold.co/10x10';
        }

        const cardStyle = {
          width: '30%',
          margin:'1%'
        }

        return (
            < React.Fragment key={itinerary._id}>
               <Card style={cardStyle}>
                <div style={{padding:'1em', height: '500px', overflow:'hidden', display:'flex', alignItems:'center'}}>
                 <Card.Img variant="top" src={vibeImage} />
                </div>
                 <Card.Body>
                 <Card.Title>
                   <Link to={`/escapes/${itinerary._id}`}>{itinerary.destination}</Link>
                 </Card.Title>
                   <Card.Text>
                     Description data goes here
                   </Card.Text>
                 </Card.Body>
                 <ListGroup className="list-group-flush">
                   <ListGroup.Item>Vibe: {itinerary.vibe}</ListGroup.Item>
                   <ListGroup.Item>{`${formatDate(itinerary.startDate)} ~ ${formatDate(itinerary.endDate)}`}</ListGroup.Item>
                 </ListGroup>
               </Card>
            </React.Fragment>
        );
      });
    }

    const divStyle = {
      display:'flex',
      flexWrap: 'wrap',
      margin:'5%',
      paddingBottom: '5%'
    }

    return (
    <div style={divStyle}>
      {renderItineraries()}
    </div>
    );
}

export default BrowseEscapes;