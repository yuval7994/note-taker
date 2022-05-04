const express = require("express")
const path = require("path")
const fs = require("fs")
let notes = require("./db/db.json")

const app = express()

app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

app.post("/api/notes", (req, res) => {
  const newNote = req.body
  newNote.id = notes.length.toString()
  notes.push(newNote)
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes))
  res.json(newNote)
})

app.delete("/api/notes/:id", (req, res) => {
  const deletedNote = notes.find((note) => note.id === req.params.id)
  notes = notes.filter((note) => note.id !== deletedNote.id)
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes))
  res.json(deletedNote)
})

app.listen(3001, () => {
  console.log(`API server now on port 3001!`)
})
