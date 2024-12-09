import mongoose from "mongoose";
import sendMailProcess from "../queue/sendMail/sendMail.process";
import sendMailQueue from "../queue/sendMail/sendMail.queue";

const connectString =
  "mongodb+srv://nguyenminhtri:200420022015tT@cluster0.elutv7g.mongodb.net/";

class Databasse {
  static instance: any;

  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    // mongoose.connect(connectString).then(() =>  sendMailQueue.process('TbookingSendEmailQueue', sendMailProcess))
    mongoose
      .connect(connectString)
      .then(() => console.log("Connect Sucessfully"))
      .catch((err) => console.log("Error: " + err));
  }

  static getInstance() {
    if (!Databasse.instance) {
      Databasse.instance = new Databasse();
    }
    return Databasse.instance;
  }
}

export default Databasse.getInstance();
