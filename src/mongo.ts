import mongoose from "mongoose";
import { MongoURL, MongoPassword } from "./config";
import { log } from "./logger";

import i18next from "i18next";

mongoose.connect(MongoURL.replace('<password>', MongoPassword)).then(() => {
    log(i18next.t('system:database.connected'), "Database");
}).catch((err) => {
    log(i18next.t('system:database.error'), "Database", err);
});