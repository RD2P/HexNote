const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const date = require('date-and-time');

const app = express()
app.use(cors())
app.use(express.json())

const dataFolder = path.join(__dirname, 'data')

//reads files in the data folder, where encoded notes are stored, an serves to client
app.get('/api/notes', (req,res) => {
  let notes = []
  fs.readdir(dataFolder, (err, files) => {
    if (err) throw err
    files.forEach(file => notes.push(file))
    res.send(notes)
  })
})

//handles POST, makes new file for encoded note with date as title and saves to data/
app.post('/api/test', (req, res) => {
  const receivedData = JSON.stringify(req.body);
  const title = date.format(new Date(), 'DD MMM HH-mm-ss')
  fs.writeFile(path.join(__dirname, 'data', `${String(title)}.txt`), receivedData, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.send('Data received');
});

app.listen(3001, () => console.log("Listening on port 3001"))