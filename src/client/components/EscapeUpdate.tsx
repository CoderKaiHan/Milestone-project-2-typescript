import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isAfter } from 'date-fns';
import axios from 'axios';


const EscapeUpdate = () => {
    
    const navigate=useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ itineraryData, setItineraryData ]= useState([]);
    let { id } = useParams();
    const [formData, setFormData] = useState({
        destination: itineraryData.destination,
        vibe: itineraryData.vibe,
        startDate: itineraryData.startDate,
        endDate: itineraryData.endDate,
        photo: itineraryData.photo,
    });

    useEffect(() => {
    
      const fetchItinerariesData = async (id) => {

        const response = await axios.get(`/itinerary/${id}`)
        const data  = response.data;
        setItineraryData(data);   
      }
      fetchItinerariesData(id);  
    }, [id]);


    // Function to handle end date change
    const isSameDate = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    const handleEndDateChange = (date) => {
        if (!startDate || isAfter(date, startDate) || isSameDate(date, startDate)) {
        setEndDate(date); 
        setFormData({
          ...formData,
          endDate: date.toISOString()
      }); 
        } else {
          alert('End Date needs to be the same or after the Start Date');
        }
    }

    // const handleStartDateChange = (date) => {
        
    // }
    
    const divStyle = {
        display:'flex',
        justifyContent:'center',
        flexWrap: 'wrap',
        margin:'5%'
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/itinerary/${id}`, formData);
            navigate(`/my_escapes/`);
        } catch (error) {
            console.error('Error updating itinerary:', error);
        }
    };

    const handleInput = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    console.log(itineraryData);
    console.log(startDate);
    console.log(endDate);

    return (
      <div style={divStyle}>
        <Form onSubmit={handleSubmit} style={{width:'50em'}}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>
                    Destination
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" name="destination" defaultValue={itineraryData.destination} onChange={handleInput}/>
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>
                    Vibe
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select aria-label="Default select example" name='vibe' defaultValue={itineraryData.vibe} onChange={handleInput}>
                    <option value={itineraryData.vibe}>{itineraryData.vibe}</option>
                      <option value="adventure">adventure</option>
                      <option value="relaxing">relaxing</option>
                      <option value="romantic">romantic</option>
                      <option value="family-friendly">family-friendly</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>
                    Start Date
                  </Form.Label>
                  <Col sm={10}>
                    <DatePicker
                      name="startDate"
                      selected={startDate}
                      onChange={(date) =>{
                        setStartDate(date);
                        setFormData({
                          ...formData,
                          startDate: date.toISOString()
                        });
                      }}
                      placeholderText={`${new Date(itineraryData.startDate).getFullYear()}-${new Date(itineraryData.startDate).getMonth() + 1}-${new Date(itineraryData.startDate).getDate()}`}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date(1900,0,1)}
                      maxDate={new Date(3000,11,31)}
                    />
                  </Col>
                </Form.Group>
                 <br/>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>
                    End Date
                  </Form.Label>
                  <Col sm={10}>
                    <DatePicker
                      name='endDate'
                      selected={endDate}
                      onChange={handleEndDateChange}
                      placeholderText={`${new Date(itineraryData.endDate).getFullYear()}-${new Date(itineraryData.endDate).getMonth() + 1}-${new Date(itineraryData.endDate).getDate()}`}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date(1900,0,1)}
                      maxDate={new Date(3000,11,31)}
                    />
                  </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" >
                  <Form.Label column sm={2}>
                    Image
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" name="photo" onChange={handleInput} placeholder='Please provide your image url here' />
                  </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" variant="info">Update</Button>
                  </Col>
                </Form.Group> 
        </Form>    
      </div>
    )
}

export default EscapeUpdate;