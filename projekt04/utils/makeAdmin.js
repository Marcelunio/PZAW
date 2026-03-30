import user from "../model/users.js"
const SECRET = process.env.SECRET;
user.createAdmin("admin","admin",-1)