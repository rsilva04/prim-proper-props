import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GuestList from '../GuestList/GuestList';
import DinnerSupplies from '../DinnerSupplies/DinnerSupplies';
import GuestForm from '../GuestForm/GuestForm';

function App() {
  let [guestList, setGuestList] = useState([]);
  // let [newGuestName, setNewGuestName] = useState('');
  // let [newGuestMeal, setNewGuestMeal] = useState('false');

  //On load, get guests
  useEffect(() => {
    getGuests()
  }, [])

  const getGuests = () => {
    axios.get('/guests')
      .then(response => {
        setGuestList(response.data)
      })
      .catch(err => {
        alert('error getting guests');
        console.log(err);
      })
  }


  const addGuest = (newGuest) => {
    axios.post('/guests', { name: newGuest.name, kidsMeal: newGuest.meal })
      .then(response => {
        getGuests();
      })
      .catch(err => {
        alert('Error Adding Guest');
        console.log(err);
      })
  };

  return (
    <div className="App">
      <Header />
      <h2>Party Leader</h2>
      {guestList[0] && <h3>{guestList[0].name}</h3>}
      <GuestForm addGuest={addGuest}/>
      <GuestList list={guestList}/>
      <DinnerSupplies list={guestList}/>
      <Footer />
    </div>
  );
}

export default App;

