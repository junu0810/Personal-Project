//front_End Page
const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open" , () => {
    console.log("Connected to Server 🔔")
})

socket.addEventListener("message" , (message) => {
    console.log(`New message: ${message.data}`)
})

socket.addEventListener("close" , () => {
    console.log("Close the WebSite 🔕")
})

setTimeout(() => {
    socket.send("hello from the Browser!")
}, 1000)