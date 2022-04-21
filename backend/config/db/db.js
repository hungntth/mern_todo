const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/todo-app'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        console.log("succesfully")
    } catch (error) {
        console.log("fail")
    }

}

module.exports = { connect };