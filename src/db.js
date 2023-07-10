import mongoose from "mongoose";
import config from "./config.js";

const { dbUser, dbName, dbPassword } = config;

const database = {
  connect: async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://lucas00gomez:jhVWUong4BKakOhh@clustercoderhouseecomme.itfiapq.mongodb.net/?retryWrites=true&w=majority`
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default database;
