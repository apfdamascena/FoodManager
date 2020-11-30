import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import { useCookies } from "react-cookie";

import BoxInformation from '../../BoxInformation/BoxInformation';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import Updates from '../../Updates/Updates';

import './MainPage.css';

function MainPage() {
  const [cookies, setCookies] = useCookies(['id']); // aqui já tem o email e a senha 
  const [data, setData] = useState({})

  useEffect(() => {
    const id = cookies.id
    const token = cookies.token
  
    const domain = `api/restaurant/${id}`;
    API.get(domain, { headers: {"x-access-token": token }}).then((response) => {
       const { data } = response;
       console.log(data)
       setData(data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div>
      <NavBar gerente={data.username} />
      <Updates restaurantData={data} />
      <div className="box-information">
        <BoxInformation restaurantData={data} />
      </div>
      <Footer restaurantData={data} />
    </div>
  );
}

export default MainPage;