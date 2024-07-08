import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
// import connectToPostgres from './config/database.config'
const port = process.env.PORT
import Authrouter from './route/auth.route'
import Orgrouter from  './route/org.route'
import cors from 'cors'



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));


app.use("/", Authrouter);
app.use("/api", Orgrouter);
// app.use("/api/v1", Authrouter);
app.use('/', (req, res) => {
    res.send('Hello, Welcome to SkillHub')
});


app.use("/", Authrouter);
// app.use("/api/v1", Authrouter);

(async () => {
    try {
        // await connectToPostgres();
        app.listen(port, () => {
            console.log(`server is started on ${port}`)
        })
    } catch (error: any) {
        console.log(error.message)
    }
})();
