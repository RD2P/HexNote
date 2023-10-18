import React, { useState, useRef, useEffect } from 'react'
import { hexToString, stringToHex } from '../js/functions.js'
import { v4 as uuidv4 } from 'uuid'
import HexedOutput from './HexedOutput.jsx'
import './App.css'


function App() {
  
  const [hexed, setHexed] = useState([])  //array of hexed lines of notes
  const [notes, setNotes] = useState([])  //array of note files, will be fetched from server
  const [sendButtonClicked, setSendbuttonClicked] = useState(false)
  const textareaRef = useRef(null)


  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await response.json()
        setNotes(data)
        if (response.ok) {
          console.log('Fetch successful')
        } else {
          console.log('Something went wrong')
        }
        console.log("notes rendered")
      } catch (err) {
        console.log(err)
      }
    }
    getNotes()
  },[sendButtonClicked])


  const handleKey = (e) => {
    if (e.key === "Enter"){
      const hex = stringToHex(textareaRef.current.value)
      setHexed([...hexed, hex])
      textareaRef.current.value = ''
    }
  }

  const handleSend = () => {
    if (hexed.length) {    //if hexed array has items, execute code below, otherwise do nothing
      const sendData = async () => {
        try {
          //POST the hexed array to the server using fetch
          const response = await fetch('http://localhost:3001/api/test', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(hexed)
          })
          if (response.ok) {
            console.log('Data sent successfully')
          } else {
            console.log('Failed to send')
          }
        } catch (err){
          console.log(err)
        }
      }
      
      sendData()
      setHexed([]) //reset the hexed array for a fresh note
      setSendbuttonClicked(prevState => !prevState)
    }
  }

  return (
    <>
        <h1>Hexer</h1>
        <div className="body">
          <div className="sidebar">
            <div className="notes-container">
              {
                notes.map(note => (
                  <p id={note}>{note}</p>
                ))
              }
            </div>
          </div>
                <div className="container">
          <main>
            <div className="textoutput">
              {
                hexed.map((item) => <HexedOutput key={uuidv4()} hexed={item}/>)
              }
            </div>
            <div className="textarea-wrapper">
              <textarea className="textarea"  rows="3" ref={textareaRef} onKeyDown={handleKey}/>
            </div>
              <div className="button-wrapper">
                <button className="send-button" onClick={handleSend}>Send to notebook</button>
              </div>
          </main>
                </div>
        </div></>
  
  )
}

export default App
