const mongoose = require("mongoose");

const taskSchema  = new mongoose.Schema({
    task : {
        required : true,
        type  : String
    }
})
 
const taskModel = mongoose.model("taskModel", taskSchema);

module.exports = { taskModel };