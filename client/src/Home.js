//rafce

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import SingleCard from './component/SingleCard'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading  from "./component/Loading";
import { useProductContext } from './context/productcontext';




const Home = () => {

  const { saree, blouse, lehanga } = useProductContext();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1263, min: 464 },
      items: 5
    },

    minitablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },

    tablet768: {
      breakpoint: { max: 768, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 621, min: 0 },
      items: 2
    }
  };

  const responsivecour = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    } 
  };
  

  //If any of the Product is not loaded then page only return Loading Component
  if(saree.length == 0 || blouse.length == 0 || lehanga.length == 0 )
  {
    return <Loading />
  }

 else{

  //It stores first 8 product
    let featuresaree=[];

    for(let i=0;i<8;i++)
    {
      featuresaree[i]= saree[i];
    }


    let featureblouse=[];

    for(let i=0;i<8;i++)
    {
      featureblouse[i]= blouse[i];
    }

    let featurelehanga=[];

    for(let i=0;i<8;i++)
    {
      featurelehanga[i]= lehanga[i];
    }

    //Whenever visit this page window will be at top
    window.scrollTo({ top: 0, left: 0 });

  return (


    <>
      <Wrapper>


          <Carousel swipeable={true} draggable={true} showDots={true} responsive={responsivecour} >
          <div className="courselimage" ><img src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/fermion/images/category_slider/img/tr:w-1500,/Classic%20Staples-desktop.jpg?rnd=20200526195200" alt="" />
          </div>

          <div className="courselimage"><img src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/fermion/images/category_slider/img/tr:w-1500,/Organza%20sarees-desktop.jpg?rnd=20200526195200" alt="" />
          </div>

          <div className="courselimage"><img src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/fermion/images/category_slider/img/tr:w-1500,/Wrap%20in%20celebration-desktop.jpg?rnd=20200526195200" alt="" />
          </div>

          <div className="courselimage"><img src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/fermion/images/category_slider/img/tr:w-1500,/Indian%20weaves%20to%20cherish-desktop.jpg?rnd=20200526195200" alt="" />
          </div>
          </Carousel>

        <div className='ourpro'><p>Our Products</p></div>
        <div className='saree' ><b>Sarees</b></div>
          <Carousel swipeable={true} draggable={true} responsive={responsive} >
                  
            {featuresaree.map((curElem) => {
                return <div className='sareeproddiv'> <SingleCard key={curElem._id} {...curElem} hover={true} product = "Saree" index = "0" /></div>;
              })}

              <NavLink to="saree">
              <div className='viewMorebox'><img src='https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/e/tr:w-480,/0e35503SW656_1.jpg?rnd=20200526195200'/>
              <div className='viewMoreblack'></div><div className='viewmoretxt'><p>View More</p></div></div></NavLink>

          </Carousel>


          

          <div className='saree' ><b>Blouse</b></div>
          <Carousel swipeable={true} draggable={true} responsive={responsive} >
                  
                  {featureblouse.map((curElem) => {
                      return <div className='sareeproddiv'> <SingleCard key={curElem._id} {...curElem} hover={true} product = "Blouse" index = "0" /></div>;
                    })}
      
                    <NavLink to="blouse">
                    <div className='viewMorebox'><img src='https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/b/tr:w-480,/1b74193NG_HOUAX00001368_7.jpg?rnd=20200526195200'/>
                    <div className='viewMoreblack'></div><div className='viewmoretxt'><p>View More</p></div></div></NavLink>
      
                </Carousel>

          <div className='saree' ><b>Lehanga</b></div>

          
          <Carousel swipeable={true} draggable={true} responsive={responsive} >
                  
                  {featurelehanga.map((curElem) => {
                      return <div className='sareeproddiv'> <SingleCard key={curElem._id} {...curElem} hover={true} product = "Lehanga" index = "0" /></div>;
                    })}
      
                    <NavLink to="lehanga">
                    <div className='viewMorebox'><img src='https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/9/tr:w-480,/192a6c5PE1700_1.jpg?rnd=20200526195200'/>
                    <div className='viewMoreblack'></div><div className='viewmoretxt'><p>View More</p></div></div></NavLink>
      
                </Carousel>




        <div className='contact'>
          <p>For any help you may call us at</p>
          <p>+91 7903036472   +91 9308102372</p>
          <p>(Monday to Saturday, 8AM to 10PM and Sunday, 10AM to 7PM)</p>
        </div>

        <div className='serv'>
          <div className='service'>
            <div className='servimg'>
              <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Free-shipping.svg" alt='' />
            </div>

            <div className='sertext'>
              <div className='ftext'>
                FREE SHIPPING
              </div>

              <div className='stext'>
                On Orders Above 299
              </div>
            </div>
          </div>

          <div className='service'>
            <div className='servimg'>
              <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/return_accepted.svg" alt='' />
            </div>

            <div className='sertext'>
              <div className='ftext'>
                EASY RETURNS
              </div>

              <div className='stext'>
                15-day Return Policy
              </div>
            </div>
          </div>

          <div className='service'>
            <div className='servimg'>
              <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Authenticity.svg" alt='' />
            </div>

            <div className='sertext'>
              <div className='ftext'>
                100% AUTHENTIC
              </div>

              <div className='stext'>
                Products Sourced Directly
              </div>
            </div>
          </div>

          <div className='service'>
            <div className='servimg'>
              <img src="https://adn-static2.nykaa.com/media/wysiwyg/2021/Brands.svg" alt='' />
            </div>

            <div className='sertext'>
              <div className='ftext'>
                100+ BRANDS
              </div>

              <div className='stext'>
                1.2 Lakhs+ Products
              </div>
            </div>
          </div>

        </div>

        <div className='footer'>
          <div>
            <NavLink className="footnav">
              Terms & Conditions
            </NavLink>

            <NavLink className="footnav">
              shipping Policy
            </NavLink>

            <NavLink className="footnav">
              Cancellation Policy
            </NavLink>

            <NavLink className="footnav">
              Privacy Policy
            </NavLink>
          </div>
          2023 Dinesh Textiles E-Retail Pvt. Ltd. All Rights Reserved.
        </div>

      </Wrapper>

    </>
  )

 }

}



const Wrapper = styled.section`

.react-multiple-carousel__arrow{
  z-index: 0;
}

.sareeproddiv{
  margin: 10px 0px 50px 25px;
  width: 200px;
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,1);
  transition: all 0.2s;
}

.sareeproddiv:hover{
  transform: scale(1.1);
  box-shadow: none;

}



.saree{
  padding:0px 40px;
  font-size: 30px;
  color: #652483;
}



.viewMorebox{
  overflow:hidden;
  margin: 10px 0px 50px 20px;
  width:200px;
  height: 345px;
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,1);
  position:relative;
}

.viewMorebox img{
  filter: blur(3px);
  width: 128%;
}

.viewMoreblack {
  position:absolute;
  width: 100%;
  height:100%;
  background-color: rgb(53, 53, 53, 0.3);
  top:0px;
}

.viewmoretxt{
  position:absolute;
  top:0px;
  color: white;
  display: flex;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 100%;
}

.viewmoretxt p{
  font-size: 15px;
  padding: 8px 11px;
  background-color: rgb(219, 106, 106, 0.3);
  border-radius: 20px;
  box-shadow: 0px 0px 6px -2px black;
}

.viewmoretxt p:hover{
  background-color: rgb(219, 106, 106, 0.5);

}



.courselimage{
  padding: 10px 0px 20px 0px;
}

.courselimage img{
  width: 100%;
}




${'' /* #coursel{
            width: 100%;
            padding: 1% 5% 1% 5%;
            
        

        #courselimage{
             position: absolute; 
            width: 100%;
            padding: 1% 5% 1% 5%;
                      
        

        #coursel img{
            width: 100%;
         */}

        .ourpro{
          font-size: 40px;
          font-weight: bold;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top:20px;
          color: rgb(150, 49, 115);
 
        }

        .ourpro > p{
          font-family: 'Playfair bold', serif;
          border-bottom: 1px solid rgb(215, 238, 238);
          padding: 0px 30px;

        }

        .ourproimag{
          display:flex;
          padding:0px 40px;
          border-bottom: 1px solid rgb(197, 197, 197);
          
        }

        .navimag{
          display:flex;
          flex-direction:column;
          align-items: center;
          width:270px;
          margin: 20px 30px;
        }

        .navimag img{
          width: 100%;
        }

        .contact{
          padding:8px 0px;
          display:flex;
          flex-direction:column;
          align-items: center;
          background-color:rgb(38, 38, 38);
          color:white;
        }

        .contact > :nth-child(2){
            font-size: 13px;
            margin: 2px 0px 3px 0px;
        }

        .contact > :nth-child(3){
            font-size: 13px;
        }

        .serv{
          display:flex;
          justify-content:space-between;
          padding:50px 10%;
        }

        .service{
          display:flex;
        }

        .sertext{
          margin-left: 10px;
        }

        .ftext{
          padding-bottom: 8px;
          border-bottom: 1px solid rgb(197, 197, 197);
        }

        .stext{
          padding-top:10px;
          font-size:13px;
        }

        .footer{
          background-color:rgb(224, 0, 217);
          display:flex;
          flex-direction:column;
          align-items:center;
          padding:14px 0px;
          margin-bottom:20px;
          fomt-size: 14px;
        }

        .footer :nth-child(1){
          font-size: 13px;
          margin-bottom:4px;
        }

        .footnav{
          margin:0px 20px;
          color: white;
        } 



        @media (max-width: 1024px ){

          .serv{
            padding: 50px 3%;
          }
          
        }

        @media (max-width: 768px){

          .ourpro{
            font-size: 30px;
            border-bottom: 1px solid rgb(215,238,238);

          }

          .saree{
            padding: 9px 40px;
            font-size: 25px;
            text-align: center;
          }

            
          .serv{
            display:grid;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 7px 0px;
            padding: 25px 10%;
          }

          .service{
            flex-direction: column;
            align-items:center;
          }

          .sertext{
            margin:0px;
          }

          .ftext{
            font-size:13px;
            text-align:center;
            padding-bottom: 3px;
          }

          .stext{
            font-size:8px;
            text-align:center;
            padding-top:5px;
          }

          .footer{
            text-align: center;
            font-size:8px;
          }

          .footnav{
            margin:0px 10px;
            padding: 10px 0px;
          }
        }



        @media (max-width: 378px ){


          #coursel{
            padding: 1% 2%;
          }

          .ourpro{
            font-size: 30px;
            border-bottom: 1px solid rgb(215,238,238);

          }

          .ourproimag{
            flex-direction: column;
          }


          .saree{
            padding: 9px 40px;
            font-size: 25px;
            text-align: center;
          }

          .sareeproddiv{
            margin:10px 0px 50px 4px;
            width: 180px;
          }

          .navimag{
            width:250px;
          }

          .contact{
            padding:10px 0px;
            text-align: center;
          }

          .contact > :nth-child(2){
            margin-bottom: 5px;
          }

          .serv{
            display:grid;
            grid-template-columns: repeat(2,1fr);
            grid-gap: 7px 0px;
            padding: 25px 10%;
          }

          .service{
            flex-direction: column;
            align-items:center;
          }

          .sertext{
            margin:0px;
          }

          .ftext{
            font-size:13px;
            text-align:center;
            padding-bottom: 3px;
          }

          .stext{
            font-size:8px;
            text-align:center;
            padding-top:5px;
          }

          .footer{
            text-align: center;
            font-size:8px;
          }

          .footnav{
            margin:0px 10px;
            padding: 10px 0px;
          }



        }



`







export default Home
