const mongoose = require("mongoose");

// UserName:makodelakshya101
// Password: d2UtQBnMTdzitBpm

async function ConnectMongoose() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://makodelakshya101:d2UtQBnMTdzitBpm@medilinkcluter.tjdqngq.mongodb.net/?retryWrites=true&w=majority&appName=MedilinkCluter"
      )
      .then((res) => {
        console.log("MongoDB Atlas is Connected");
      })
      .catch((err) => {
        console.log(`Error Connecting to MongoDB Atlas: ${err}`);
      });
  } catch (error) {
    console.log("An error in the ConnectMongoose Function");
  }
}

module.exports = ConnectMongoose;
