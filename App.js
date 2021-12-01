import React, { useEffect, useState } from 'react';
import api from './src/api/api';
import Home from "./src/home/HomePage";

export default function App() {
  const [expositor, setExpositor] = useState(null);
  
  const getExpositor = async () =>{ 
    const response = await api();
    setExpositor(response.expositor);
  }

  useEffect(()=> {
    getExpositor()
  },[])

  return expositor && <Home expositor={expositor}></Home>;
};

