import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import User from './user.model.js';
import Role from "./role.model.js";
import Work from "./work.model.js";
import Preference from "./preference.model.js";
db.role = Role;
db.user = User;
db.work = Work;
db.preference = Preference;
db.ROLES = ["user", "admin", "moderator"];

export default db;