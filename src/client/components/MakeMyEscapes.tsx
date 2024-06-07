import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate} from 'react-router-dom';
// import Activities from './Activities';


function newEscape() {
  

  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    vibe: ''
  })

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDate = (e) => {
    const { name, value } = e.target;
    // Formatting the date value to match the format expected by input type="date"
    const formattedDate = new Date(value).toISOString().split('T')[0];
    setFormData({
      ...formData,
      [name]: formattedDate,
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // submit to server here
    
    try {
      const {data} = await axios.post(`/itinerary/new`, formData)
      console.log(data)
      navigate(`/my_new_escapes/${data._id}/activities`)
    } catch (error) {console.log(error)}
    
  }

  // from chatgpt to handle authentication of user
//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     // Get JWT token from local storage or other storage mechanism
//     const token = localStorage.getItem('token');
//     console.log('token',token)
//     // Set JWT token in request headers
//     const headers = {
//         "Authorization": `Bearer ${token}`
//     };

//     try {
//         // Make POST request with form data and JWT token included in headers
//         await axios.post('/itinerary/new', formData, {headers:headers} );
//     } catch (error) {
//         console.error('Error creating itinerary:', error);
//     }
// };


  return (
    <div className="create">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="destination">
        <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInput} />
        </Form.Group>
        <br />
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Upload an image for your experience</Form.Label>
          <Form.Control type="file" size="sm" />
        </Form.Group>
        <br />
        <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleDate} />
        </Form.Group>
        <br />
        <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleDate} />
        </Form.Group>
        <br />
        <Form.Group controlId="vibe">
        <Form.Label>Vibe</Form.Label>
          <Form.Select aria-label="Select a vibe" 
          onChange={handleInput}
          name="vibe" >
            <option defaultValue>Select one...</option>
            <option value="Adventure">Adventure</option>
            <option value="Romantic">Romantic</option>
            <option value="Relaxing">Relaxing</option>
            <option value="Family-friendly">Family-friendly</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default newEscape;