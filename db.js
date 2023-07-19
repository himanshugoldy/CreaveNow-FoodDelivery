const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://CraveNow:<password>@cluster0.gs1vvll.mongodb.net/CraveNow?retryWrites=true&w=majority"
const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("food_items");
      let data=await fetched_data.find({}).toArray() 
      global.food_items = data;
      global.foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    } catch (error) {
      console.log('err: ', error);
    }
  };




module.exports = mongoDB;



