import React, { useState } from 'react';

function OnlineDeliveryExperienceForm() {
  const [restaurantName, setRestaurantName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [foodQuality, setFoodQuality] = useState('');
  const [deliveryPerson, setDeliveryPerson] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Restaurant Name:', restaurantName);
    console.log('Order Number:', orderNumber);
    console.log('Delivery Time:', deliveryTime);
    console.log('Food Quality:', foodQuality);
    console.log('Delivery Person:', deliveryPerson);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Restaurant Name:
        <input type="text" value={restaurantName} onChange={e => setRestaurantName(e.target.value)} />
      </label>
      <br />
      <label>
        Order Number:
        <input type="text" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Delivery Time:
        <input type="text" value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)} />
      </label>
      <br />
      <label>
        Food Quality:
        <input type="text" value={foodQuality} onChange={e => setFoodQuality(e.target.value)} />
      </label>
      <br />
      <label>
        Delivery Person:
        <input type="text" value={deliveryPerson} onChange={e => setDeliveryPerson(e.target.value)} />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
export default OnlineDeliveryExperienceForm;