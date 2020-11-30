
import { useEffect, useState } from 'react';
import './App.css';
import { Button , FormControl , InputLabel, Input} from '@material-ui/core';
import Message from "./Message";
import db from './firebase';
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [input , setInput] = useState("");
  const [messages , setMessages] = useState([]);
  
    const [username, setUsername] = useState("");

  //useState = variable in REACT
  //useEffect = run code on a condition
  useEffect(() => {
      db.collection("messages").orderBy("timestamp","desc").onSnapshot( snapshot => {
        setMessages(snapshot.docs.map( doc => ({id: doc.id , text: doc.data()})))
      });
    }
  , []);


  useEffect(() =>{
    const name = prompt("please enter your name");
    setUsername(name);
  },[]);

  const sendMessage = (event) => {
    //all the logic to send a message goes here
    db.collection("messages").add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
    event.preventDefault();
  }

  return (
    <div className="App">
     <img src="https://miro.medium.com/max/325/1*KWCHeliXsgXdUrn1qV1XCA.png" alt="messenger" />
     <h1>WELCOME TO GROUP CHAT</h1>
     <h2>welcome <u>{username}</u></h2>
    
    <form className="app_form">
     <FormControl className="app_formControl">
        <InputLabel>Enter a message</InputLabel>
        <Input className="app_input" value={input} onChange={event => setInput(event.target.value)}  />

        <IconButton  className="app_iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage} ><SendIcon/></IconButton>

      </FormControl>
     </form>
     
     <FlipMove>
      {
        messages.map(({id , text}) => (
          <Message key={id} username={username} name={text.username} text={text.text}/>
        ))
      }
     </FlipMove>
     
    
    </div>
  );
}

export default App;
