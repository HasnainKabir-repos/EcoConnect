const mongoose = require('mongoose');
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect("mongodb+srv://mahdinmukit248:hotWt8eAh3VL8MWd@cluster0.hhwsgtj.mongodb.net/?retryWrites=true&w=majority", connectionParams);
        console.log('Connected to database')
    }
    catch(error){
        console.log(error);
        console.log('Error connecting to database');
    }   
}