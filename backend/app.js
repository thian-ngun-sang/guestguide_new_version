require('dotenv').config();
const express = require("express");
const cors = require("cors");
// const multer = require('multer');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const serviceRoute = require("./routes/service");

const notFound = require("./middlewares/not-found");
const { authenticate, authorize } = require("./middlewares/auth");
const {connectDB} = require("./db/connect");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// for parsing multipart/form-data
// app.use(express.static('public'));
app.use(express.static('uploads')); // use 'uploads' as source "/" for static files

// const upload = multer();
// app.use(upload.array());
// app.use(upload.array('file'));
/* app.use(upload.fields([ // Use upload.fields() to handle multiple files with different field names
    { name: 'file1' }, // Specify the field name for the first file
    { name: 'file2' }, // Specify the field name for the second file
  ])); */

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use('/api', authenticate);// authenticate middleware
app.use('/api/auth', authRoute);
app.use('/api/v1', authorize);// authorize middleware
app.use('/api/v1/user', userRoute);
app.use('/api/v1/service', serviceRoute);

app.use(notFound);

const PORT = process.env.PORT || 3000;
const start = async () => {
    try{
        // await connectDB(process.env.MONGO_URI);
        await connectDB("mongodb://127.0.0.1:27017/guestguide?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1");
        app.listen(PORT, () => {
            console.log("Sever is listening on port http://127.0.0.1:" + PORT)
        })
    }catch(error){
        console.log(error);
    }
}

start();