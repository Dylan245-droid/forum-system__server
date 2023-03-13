require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const users = []
const threadList = []

const generateId = () => Math.random().toString(36).substring(2, 10)

app.get("/api", (req, res) => {
    res.json({
        message: "Hello World"
    })
})

app.post("/api/register", async (req, res) => {
    const { email, username, password } = req.body
    const id = generateId()

    const result = users.filter(
        (user) => user.email === email && user.password === password
    )

    if (result.length === 0) {
        const newUser = { id, email, password, username }
        users.push(newUser)
        return res.json({
            message: "Account created successfully!",
        })
    }

    res.json({
        error_message: "User already exists",
    })

    console.log({ email, password, username, id });
})

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body

    let result = users.filter(
        (user) => user.email === email && user.password === password
    )

    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect Credentials"
        })
    }

    res.json({
        message: "Login Successfully",
        id: result[0].id
    })
})

app.get("/api/all/thread", async (req, res) => {
    res.json({
        threads: threadList
    })
})

app.post("/api/create/thread", async (req, res) => {
    const { thread, userId } = req.body
    const threadId = generateId()

    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: []
    })

    res.json({
        message: "Thread created successfully!",
        threads: threadList
    })

    console.log({ thread, userId, threadId });
})


app.listen(port, () => {
    console.log(users);
    console.log(`Server listening on port ${port}`);
})