import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


type Vibe = 'adventure' | 'romantic' | 'relaxing' | 'family-friendly';

interface Itinerary {
  _id: string;
  destination: string;
  photo?: string;
  startDate: Date;
  endDate: Date;
  days: string[]; 
  vibe?: Vibe;
  createdBy?: string; 
}


const ViewMyEscapes = () => {

  const [ itineraryData, setItineraryData ]= useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);

 // for DRY purposes:
 const fetchData = async () => {
  try {
    const{data} = await axios.get('/itinerary')
    setItineraryData(data)
  } catch (error) {
    console.error(error)
  }}

  useEffect(() => {
      fetchData();
  }, []);
      
    const confirmDelete = async (itineraryId:string) => {
      try {
        await axios.delete(`itinerary/${itineraryId}`)
          console.log(`Deleted itinerary with ID ${itineraryId}`);
          fetchData()
          setModalShow(false);
      } catch (error){
          console.error(error);
        }
    }    
  
  //Different image urls according to vibes
  const vibeImages:{[key in 'adventure' | 'romantic' | 'relaxing' | 'family-friendly']?: string} = {
    'adventure': ' https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    romantic: 'https://images.pexels.com/photos/4352151/pexels-photo-4352151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relaxing: 'https://images.unsplash.com/photo-1455906876003-298dd8c44ec8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'family-friendly': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const formatDate = (dateString:Date):string => {
    const date = new Date(dateString);
    //Intl.DateTimeFormatOptions: This is the interface provided by TypeScript that defines the structure of the options object that can be passed to toLocaleDateString.
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const renderItineraries = () => {
    if (itineraryData.length === 0) {
      return <p>Loading... </p>; 
    }
    return itineraryData.map((itinerary:Itinerary)=>{
      
      let vibeImage; 
      if (itinerary.photo) {
        vibeImage = itinerary.photo;
      } else {
        vibeImage = vibeImages[itinerary.vibe!] || 'https://placehold.co/10x10';
      }
      
      const cardStyle = {
        width: '30%',
        margin:'1%'
      }

      const handleDelete = (itinerary:Itinerary) => {
        setSelectedItinerary(itinerary);
        setModalShow(true);
      };

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
                <Card.Body>
                  <Button variant="info" style={{margin:'5px'}} href={`/escapes/${itinerary._id}/update`}>Update</Button>
                  <Button variant="danger" style={{margin:'5px'}} onClick= {()=> handleDelete(itinerary)}>Delete</Button>
                </Card.Body>
              </Card>
          </React.Fragment>
      );
    });
  }

  // Define the FlexWrap enum
  enum FlexWrap {
    Nowrap = 'nowrap',
    Wrap = 'wrap',
    WrapReverse = 'wrap-reverse'
  }

  const divStyle = {
    display:'flex',
    flexWrap: FlexWrap.Wrap,
    margin:'5%',
    paddingBottom: '5%'
  }

  return (
  <div style={divStyle}>
    {renderItineraries()}
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
      onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedItinerary && selectedItinerary.destination}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Delete this itinerary ?</h4>
        <p>
          This itinerary can't be recovered after the deletion. Click confirm
          to delete. Close the conversation to cancel.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setModalShow(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (selectedItinerary != null){confirmDelete(selectedItinerary._id); setModalShow(false)}
            }
          }
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
}

export default ViewMyEscapes;