import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filtercontext'
import { SlArrowDown, SlArrowUp, SlRefresh } from "react-icons/sl";

const Sidebar = () => {

    const [sort, setsort] = useState(" ");
    const [size, setsize] = useState(" ");
    const [price, setprice] = useState(" ");
    const [color, setcolor] = useState(" ");
    const [sortop, setsortop] = useState(" ");
    const [mobfilter, setmobfilter] = useState("none");




    const { setFilter, remfilter, resfilter, filter } = useFilterContext();


    const cat = window.location.href.substring((window.location.href.lastIndexOf("/")) + 1, (window.location.href.length));




    





    const reset = () => {
        setsort(" ");
        setsortop(" ");
        var x = document.getElementsByTagName("input");
        for (let i = 0; i < x.length; i++) {
            x[i].checked = false;
        }
        resfilter();
    }



    const sizefilter = (e, s, fname) => {

        if (e.target.checked) {

            setFilter(s, cat, fname)
        }

        else {

            remfilter(s, cat, fname)
        }






    }


    useEffect(()=>{
        resfilter();
    },[])




    const show = (id) => {

        switch (id) {

            case "sort":
                if (sort == " ") {
                    setsort(id)
                }

                else {
                    setsort(" ")
                }

                break;

            case "size":
                if (size == " ") {
                    setsize(id)
                }

                else {
                    setsize(" ")
                }

                break;

            case "price":
                if (price == " ") {
                    setprice(id)
                }

                else {
                    setprice(" ")
                }

                break;

            case "color":
                if (color == " ") {
                    setcolor(id)
                }

                else {
                    setcolor(" ")
                }

                break;

            default:
                alert("error");
        }
    }





    return (
        <>
            <Wrapper sort={sort} size={size} price={price} color={color} sortop={sortop} mob={mobfilter}>
                <div className="filter">
                    <div>
                        {mobfilter == "none" ? <p onClick={() => { setmobfilter("block") }}>Filter <span className='mobfilter'><SlArrowDown /></span></p> : <p onClick={() => { setmobfilter("none") }}>Filter <span className='mobfilter'><SlArrowUp /></span></p>}
                        <span className='res' onClick={() => { reset() }} ><span>Reset</span> <SlRefresh /></span>
                    </div>

                    <ul className='key'>
                        <li className='list'>

                            <div className='main' onClick={() => { show("sort") }}>
                                <div>Sort</div> {sort == " " ? <SlArrowDown /> : <SlArrowUp />}
                            </div>

                            <div id='sort' className='optionbox' >
                                <div className='option' onClick={() => { setsortop("none"); setFilter("none", cat, "sort") }} >
                                    <div class="tick" id='none' ></div><div>none</div>
                                </div>

                                <div className='option' onClick={() => { setsortop("lh"); setFilter("lh", cat, "sort") }} >
                                    <div class="tick" id='lh'></div><div>Price(low to high)</div>
                                </div>

                                <div className='option' onClick={() => { setsortop("hl"); setFilter("hl", cat, "sort") }} >
                                    <div class="tick" id='hl'></div><div>Price(high to low)</div>
                                </div>

                                <div className='option' onClick={() => { setsortop("az"); setFilter("az", cat, "sort") }} >
                                    <div class="tick" id='az'></div><div>A-Z</div>
                                </div>

                                <div className='option' onClick={() => { setsortop("za"); setFilter("za", cat, "sort") }}>
                                    <div class="tick" id='za'></div><div>Z-A</div>
                                </div>

                            </div>

                        </li>

                        {cat === "saree" ? "" : <li className='list'>

                            <div className='main' onClick={() => { show("size") }}>
                                <div>Size</div>{size == " " ? <SlArrowDown /> : <SlArrowUp />}
                            </div>

                            <div id='size' className='optionbox' >

                                <div className='option' >

                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "S", "size") }} /><div>S</div>

                                </div>

                                <div className='option' >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "M", "size") }} /><div>M</div>
                                </div>

                                <div className='option' >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "L", "size") }} /><div>L</div>
     
                                </div>

                                <div className='option'>
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "XL", "size") }} /><div>XL</div>
                                </div>

                            </div>

                        </li>}

                        <li className='list'>

                            <div className='main' onClick={() => { show("price") }}>
                                <div>Price</div>{price == " " ? <SlArrowDown /> : <SlArrowUp />}
                            </div>

                            <div id='price' className='optionbox' >

                                <div className='option'>
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "<500", "price") }} /><div>Below 500</div>
                                </div>
                                <div className='option'>
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "500-1500", "price") }} /><div>Above 500 && Below 1500</div>
                                </div>

                                <div className='option'>
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "1500-3000", "price") }} /><div>Above 1500 && Below 3000</div>
                                </div>

                                <div className='option'  >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "3000-5000", "price") }} /><div>Above 3000 && Below 5000</div>
                                </div>

                                <div className='option'  >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, ">5000", "price") }} /><div>Above 5000</div>
                                </div>

                            </div>

                        </li>

                        <li className='list'>

                            <div className='main' onClick={() => { show("color") }}>
                                <div>Colour</div>{color == " " ? <SlArrowDown /> : <SlArrowUp />}
                            </div>

                            <div id='color' className='optionbox' >

                                <div className='option' >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "red", "color") }} /><div>Red</div>
                                </div>

                                <div className='option' >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "pink", "color") }} /><div>Pink</div>
                                </div>

                                <div className='option' >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "yellow", "color") }} /><div>Yellow</div>
                                </div>

                                <div className='option' >
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "green", "color") }} /><div>Green</div>
                                </div>

                                <div className='option'>
                                    <input type='checkbox' class="tick" onClick={(e) => { sizefilter(e, "white", "color") }} /><div>White</div>
                                </div>

                            </div>

                        </li>

                    </ul>

                </div>
            </Wrapper>
        </>
    )
}



const Wrapper = styled.section`


        .filter > div{
            display: flex;
            justify-content: space-between;
            padding: 10px 5px 10px 0px;
            border-bottom: 1px solid #e8e8e8;
            align-items: baseline;
        }

        .filter p{
            font-weight: 500;
            font-size: 20px;
            
        }

        .mobfilter{
            display: none;
        }

        .res{
            display:flex;
            align-items:center;
            font-size: 17px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 3px;
            padding: 8px 12px;
            font-weight: 500;
        }

        .res > span{
            font-size: 12px;
            margin-right: 5px;
           
        }
        .res:hover{
            cursor: pointer;
            background-color: #f5f5f5;
        }


        section{
            font-size:20px;
            margin-top:20px;
            margin-left:5px;
        }

        .main{
            font-size: 13px;
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 13px 5px 13px;
        }

        .main:hover{
            cursor:pointer;
        }



        .main > div{
            font-weight: 400;
            font-size: 15px;

        }

        .key{
            height: 70vh;
            overflow-y: auto;
        }

        .optionbox{
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 20px;
            margin-right: 5px;
            display:none;
        }

        #${(props) => props.sort}{
            display:block;
        }

        #${(props) => props.size}{
            display:block;
        }

        #${(props) => props.price}{
            display:block;
        }

        #${(props) => props.color}{
            display:block;
        }

        

        .option{
            display:flex;
            padding: 7px 0px 5px 27px;
            align-items:center;
            font-size: 14px;
        }

        .tick{
            width: 15px;
            height: 15px;
            border: 1px solid rgb(190, 182, 182);
            margin-right: 7px;
            border-radius: 20px;
            background-color: #e5e5e5;
        }

        #${(props) => props.sortop}{
           background-color: #ff007f;
           border: none;
        }


        .option:hover{
            cursor: pointer;
           
        }

       
        

        .select{
            width:100%;
            font-size: 16px;
            padding:5px 0px;
            border:none;
            border-bottom:1px solid rgb(188, 188, 188);
        }

        @media (max-width: 768px)
        {
            .mobfilter{
            display: inline-block;
            font-size: 14px;
            position: absolute;
            bottom: 18px;
            left: 13%;
            
            }

            .key{
                display: ${(props) => props.mob};
                position: absolute;
                background-color: white;
                width: 100%;
                z-index: 100; 
            }

            .list{
                z-index: 100;
            }
        }

        @media (max-width: 425px ){

            .mobfilter{
            left: 17%;
            
            }

        }





`

export default Sidebar