const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const date = require('date-and-time');

const app = express()
app.use(cors())
app.use(express.json())

const dataFolder = path.join(__dirname, 'data')

//reads files in the data folder, where encoded notes are stored, and serves to client
app.get('/api/notes', (req, res) => {
  let notes = []
  fs.readdir(dataFolder, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      const notename = file.substring(0, file.lastIndexOf('.'))
      notes.push(notename)
    })
    res.send(notes)
  })
})

//handles POST, makes new file for encoded note with date as title and saves to data/
app.post('/api/notes', (req, res) => {
  const receivedData = JSON.stringify(req.body);
  const title = date.format(new Date(), 'DD MMM HH-mm-ss')
  fs.writeFile(path.join(__dirname, 'data', `${String(title)}.txt`), receivedData, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.send('Data received');
});

const port = process.env.PORT || 3001

app.listen(3001, () => console.log(`Listening on port ${port}`))