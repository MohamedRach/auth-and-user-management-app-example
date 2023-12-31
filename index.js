//const e = require("express");
const express = require("express");
const app = express()

app.use(express.json())
const resourceName = "https://auth-user-management.onrender.com"
const YourApiKey = "YourApiKey"
const YourRedirectUrl = "http://localhost:8080" /// replace with your redirect url

// authentification/signup
// a user = {
// email: string
// username: string
// password: string
//}
app.post("/auth/signup", async (req, res) => {
    const response = await fetch(`${resourceName}/auth-users/signup`, {
        method: "POST",
        headers: {
            "api-key": "YourApiKey",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
    })
    const token = await response.json()
    // you can either return the jwt token and store it in local storage o set an http only cookie with it 
    res.send(token)
})
// authentification/login
// a user = {
// email: string
// password: string
//}
app.post("/auth/login", async (req, res) => {
    const response = await fetch(`${resourceName}/auth-users/login`, {
        method: "POST",
        headers: {
            "api-key": "YourApiKey",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
    })
    const token = await response.json()
    // you can either return the jwt token and store it in local storage o set an http only cookie with it 
    res.send(token)
})
app.get("/auth/google", async (req, res) => {
    res.redirect(`${resourceName}/auth-users/google/signup?api-key=${YourApiKey}&redirect=${YourRedirectUrl}`)
})
// get all users
app.get("/user", async (req, res) => {
    const response = await fetch(`${resourceName}/users/`, {
        method: "GET",
        headers: {
            "api-key": "YourApiKey"
        }
    })
    const users = await response.json()
    //console.log(users)
    res.send(users)
})

// Add User = {
//    username: string,
//    email: string,
//    password: string
//}
app.post("/user", async (req, res) => {
    console.log(req.body)
    
    const response = await fetch(`${resourceName}/users/`, {
        method: "POST",
        headers: {
            "api-key": "YourApiKey",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
    })
    const user = await response.json()
    res.send(user)
    
})
//get Single User
app.get("/user/:id", async (req, res) => {
    const response = await fetch(`${resourceName}/users/${req.params.id}`, {
        method: "GET",
        headers: {
            "api-key": "YourApiKey"
        }
    })
    const user = await response.json()
    res.send(user)
})


//Update User
app.patch("/user/:id", async (req, res) => {
    const response = await fetch(`${resourceName}/users/update/${req.params.id}`, {
        method: "PATCH",
        headers: {
            "api-key": "YourApiKey",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
    })
    const user = await response.json()
    res.send(user)
})
// delete a user
app.delete("/user/:id", async (req, res) => {
    const response = await fetch(`${resourceName}/users/delete/${req.params.id}`, {
        method: "DELETE",
        headers: {
            "api-key": "YourApiKey",
            "Content-Type": "application/json",
        }
    })
    const user = await response.json()
    res.send(user)

})
app.listen(9090, () => {
    console.log("now listening on port 9090")
})
