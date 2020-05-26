require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://yagnesh:" + process.env.MONGO_ATLAS_PW + "@cluster0-qnsln.mongodb.net/test?retryWrites=true&w=majority", {
    keepAlive: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(e => e);

module.exports.User = require("./user");
module.exports.Message = require("./message");