import mongoose from "mongoose";
import { MongoURL, MongoPassword } from "./config";
import { log } from "./logger";
import { Database } from "./utils/logs";


mongoose.connect(MongoURL.replace('<password>', MongoPassword)).then(() => {
    log(Database.CONNECTED, "Database");
}).catch((err) => {
    log(Database.ERROR, "Database", err);
});