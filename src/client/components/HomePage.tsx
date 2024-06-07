import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import HomePicture1 from '../assets/pexels-photo-1796727.jpeg';
import HomePicture2 from '../assets/colin-watts-M1ObxvsWVhY-unsplash.jpg'
import HomePicture3 from '../assets/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg'

function HomePage() {
  return (
    <Carousel fade>
      <Carousel.Item>
      <img className="d-block w-100" src={HomePicture1} alt="First slide" style={{height:'80vh'}}/>
        <Carousel.Caption>
          <h3 className='home-text'>Discover Alpine Serenity</h3>
          <p className='home-text'>Embrace the Tranquility of Alpine Living</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" src={HomePicture2} alt="Second slide" style={{height:'80vh'}}/>
        <Carousel.Caption>
          <h3 className='home-text'>Find your Paradise</h3>
          <p className='home-text'>Savor the Sun, Sand, and Serenity</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" src={HomePicture3} alt="Third slide" style={{height:'80vh'}}/>
        <Carousel.Caption>
          <h3 className='home-text'>Journey Through the Peaks</h3>
          <p className='home-text'>Explore the Heights of Nature's Splendor</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    //First iteration, card based design
    // <Card className="bg-dark text-white" >
    //   <Card.Img src={HomePageImage} alt="Card image" />
    //   <Card.ImgOverlay>
    //     <div class='home-text'>
    //       <Card.Title>Card title</Card.Title>
    //       <Card.Text>
    //         This is a wider card with supporting text below as a natural lead-in
    //         to additional content. This content is a little bit longer.
    //       </Card.Text>
    //       <Card.Text style={{position:'relative',top:'15px',left:'15px'}}>Last updated 3 mins ago</Card.Text>
    //     </div>
    //   </Card.ImgOverlay>
    // </Card>
  );
}

export default HomePage;