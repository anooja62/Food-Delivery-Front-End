//import axios from './axios';
//import {useEffect, useState} from 'react'
import Layout from './Components/Layout/Layout';

function App() {

  /*const [state, setState] = useState("")
  
  console.log(state)
  useEffect(() => {
    axios.get('/mes')
    .then(res =>{
      setState(res.data)
      
    })
   }, []);

   useEffect(() => {
    axios.post('/post',{
      message:"hello"
    })
    .then(response =>{
      setState(response.data)
    })
   }, []);*/

  return (
  <div className="App">
    
    <Layout/>
    </div>
  );
}

export default App;
