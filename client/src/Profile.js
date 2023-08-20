import React from 'react'
import styled from 'styled-components'
import Loading from './component/Loading';
import { useAccountContext } from './context/accountcontext';
import profile from './image/profile.png'

const Profile = () => {

    const {user_Data} = useAccountContext();


   

    if(Object.keys(user_Data).length == 0)
    {
        return <Loading />
    }

    const fname = user_Data.name.substring(0,(user_Data.name.indexOf(" ")));

    window.scrollTo({ top: 0, left: 0 });

    return (
        <>
            <Wrapper>
                <div className='main'>
                    <div className='card'>
                        <div className='profilediv'>
                            <div className='innerprodiv'>
                                <img src={profile} />
                                <p>Hello {fname}</p>
                            </div>
                        </div>
                        <div className='infobox'>
                            <div className='info'>
                                <p className='label'>Name:</p>
                                <p className='txt'>{user_Data.name}</p>
                            </div>

                            <div className='info'>
                                <p className='label'>Email:</p>
                                <p className='txt'>{user_Data.email}</p>
                            </div>

                            <div className='info'>
                                <p className='label'>Mobile:</p>
                                <p className='txt'>{user_Data.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>

        </>
    )
}

const Wrapper = styled.section`

.main{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 30px 0px;
    background-color: #ededed;
    
}

.card{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;


}

.profilediv{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; 

}

.innerprodiv{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    background-color: #ff3e87;

}

img{
    width: 50%;
}

.innerprodiv p{
    font-weight: 500;
    font-size: 35px;
    color: white;
    margin-bottom: 20px;
}

.infobox{
    text-align: center;
    width: 100%;
    padding: 30px 0px;

}

.info{
    display: flex;
    flex-direction: column;
    align-items: center;
   
    
}

.label{
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 18px;
    width: 50%;
    padding: 0px 5px;
    color: #fa4388;
}

.edit{
    margin-left: 10px;
    color: rgb(0, 95, 255);
    font-size: 15px;
}

.edit:hover{
    cursor: pointer;
}

.txt{
    border: 1px solid #bababa;
    color: #fa4388;
    background-color: #ededed;
    padding: 10px;
    width: 50%;
    margin-bottom: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}




@media (max-width: 1024px)
{
    .card{
        width: 65%;
    }

    img{
        width: 40%;
    }



}

@media (max-width: 600px)
{
    .card{
        width: 90%;
    }

    .innerprodiv p{
        font-size: 23px;
    }

    .label{
        font-size: 16px;
        width: 80%;
    }

    .txt{
        width: 80%;
        font-size: 15px;
        padding: 5px;
    }
    
}





`


export default Profile