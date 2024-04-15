import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const getEquipment = async () => {
      const res = await fetch("/api/equipment/FLN752") 
      const data = await res.json()
      console.log(data, "this is a json from database")
    } 
    getEquipment()
  }, [])
  return <div>HomePage</div>;
};

export default HomePage;
