import mongoose from "mongoose";

const mongoPath =
  "mongodb+srv://khanhng3009:Catqov123@cluster0.jdsgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const initDB = () => {
  mongoose
    .connect(mongoPath)
    .then((db) => console.log("Connected DB"))
    .catch((err) => console.log(err));
};
