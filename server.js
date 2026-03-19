import app from "./src/app.js"
import ConnectDB from "./src/config/DB.js"

ConnectDB()

app.listen(3000, () => {
    console.log("server is listing in port 3000")
})
