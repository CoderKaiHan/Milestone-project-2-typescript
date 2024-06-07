import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const EscapeDetails = () => {

  const [ itineraryData, setItineraryData ]= useState([]);
  let { id } = useParams();

  useEffect(() => {
    
    const fetchItinerariesData = async (id) => {

      const response = await axios.get(`/itinerary/${id}`)
      const data  = response.data;
      console.log(`1:${data}`);
      setItineraryData(data)     
    }
    fetchItinerariesData(id);  
  }, [id]);


  //Different image urls according to vibes
  const vibeImages = {
    adventure: ' https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    romantic: 'https://images.pexels.com/photos/4352151/pexels-photo-4352151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relaxing: 'https://images.unsplash.com/photo-1455906876003-298dd8c44ec8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'family-friendly': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const renderEscapeDetails = () => {
    if (itineraryData.length === 0) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ); 
    }
    
    const vibeImage = vibeImages[itineraryData.vibe] || 'https://placehold.co/10x10';

    const handleActivities = () => {
      return (
        <div>
          <br/>
          <h4>Activity : DEFAULT</h4>
          <h4>Location : DEFAULT</h4>
          <h4>Time : DEFAULT</h4>
          <h4>Cost : DEFAULT</h4>
          <br/>
            <div style={{paddingLeft:'3em', paddingRight:'3em'}}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptate sint illo nobis, explicabo eos commodi ducimus repudiandae quod, aperiam corrupti pariatur voluptas a aut similique quas repellat id ut nihil. Unde nemo eius eos aliquam aperiam odio ipsam, veritatis, animi illo sunt accusantium beatae debitis nesciunt facilis, odit inventore rem magnam. Velit nemo culpa suscipit quod illum quo maxime voluptas eligendi aliquid voluptatum esse distinctio quasi, laboriosam pariatur sit dolorum voluptatem dolore ipsam explicabo asperiores porro autem. Eos ipsum rerum laboriosam nulla maiores. Laborum deleniti at eligendi, vel labore expedita. Enim, atque porro eos tempore repellat perferendis, assumenda commodi odio hic minus distinctio praesentium nostrum ab harum quisquam quis consectetur. Nemo, adipisci! Placeat voluptas sapiente aliquid ipsa consequatur deleniti tempore illo veritatis, ab nemo alias aspernatur ipsam tenetur reiciendis odio a quisquam hic mollitia sit? Harum nostrum provident placeat magnam voluptatibus nobis nam voluptate quasi, temporibus consectetur, ipsum animi delectus laudantium deserunt ex accusamus fugit sint voluptatum nemo sed cupiditate, aut veritatis tempora! Consequuntur reiciendis corrupti repudiandae impedit iusto quisquam eligendi! Voluptate rerum libero maxime, eius dolore sint at hic nisi, sequi quibusdam eos sit cupiditate distinctio natus ullam saepe alias error accusantium modi perferendis et. In id repellat repellendus aut minima quas, soluta animi assumenda at reprehenderit beatae. Facere voluptatibus voluptate officiis optio placeat enim facilis totam suscipit ad quam unde non nostrum quisquam quas rem vero porro dolorum magnam illum error vel, tempore vitae. Modi sunt fugit voluptates temporibus inventore quam magnam neque, dolorem quaerat ab eveniet nisi doloribus odit praesentium? Repellendus ipsam deserunt fugit reiciendis maiores inventore minima vel ratione voluptatem quae quas nostrum saepe neque hic excepturi ut illum porro nulla, dolore, dolorem dolor architecto fugiat? Pariatur explicabo error nesciunt hic fuga voluptatum quis dolorum atque blanditiis facilis provident, labore aliquam necessitatibus aspernatur? Maxime, excepturi?
              </p>
            </div>
        </div>
      );
    }

    return (
      <div>
      <Card>
        <div style={{width:'100%', padding: '2em', height: '30%', overflow:'hidden', display:'flex', alignItems:'center'}}>
          <img src={vibeImage} alt='beautiful_view' style={{ display:'block', width:'80%', margin:'auto'}}/>
        </div>
        <div>
        <div style={{display:'flex', justifyContent:'center', margin: '1em'}}>
          <div>Destination:</div>
          <div>{itineraryData.destination}</div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin: '1em'}}>
          <div>Vibe:</div>
          <div>{itineraryData.vibe}</div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin: '1em'}}>
          <div>Start Date:</div>
          <div>{new Date(itineraryData.startDate).getFullYear()}-{new Date(itineraryData.startDate).getMonth() + 1}-{new Date(itineraryData.startDate).getDate()}</div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin: '1em'}}>
          <div>End Date:</div>
          <div>{new Date(itineraryData.endDate).getFullYear()}-{new Date(itineraryData.endDate).getMonth() + 1}-{new Date(itineraryData.endDate).getDate()}</div>
        </div>
        </div>
        <div>
        <Tabs defaultActiveKey="day-1">
        <Tab eventKey="day-1" title="Day1">
          {handleActivities()}
        </Tab>
        <Tab eventKey="day-2" title="Day2">
          {handleActivities()}
        </Tab>
        <Tab eventKey="day-3" title="Day3">
          {handleActivities()}
        </Tab>
      </Tabs>
      </div>
    </Card>
    </div>
    );
  };

    const divStyle = {
        display:'flex',
        flexWrap: 'wrap',
        margin:'5%',
        paddingBottom: '5%'
    }
      
    return (
      <div style={divStyle}>
        {renderEscapeDetails()} 
      </div>
    )
  }
  
  export default EscapeDetails;