import express from "express"
import forum from "./controllers/forum.js";
import cookieParser from "cookie-parser";
import settings from "./model/settings.js";
import entries from "./model/entries.js";
import auth from "./controllers/auth.js";
import sessions from "./model/sessions.js";


const port = process.env.PORT || 8000;
const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_MONTH = 30 * ONE_DAY;
const SECRET = process.env.SECRET;

if (SECRET == null) {
  console.error(
    "SECRET environment variable missing. Please create an env file or provide SECRET via environment variables."
  );
  process.exit(1);
}

const app=express()

app.set("view engine","ejs")

app.use(express.static("public"))
app.use(express.urlencoded())
app.use(cookieParser(SECRET));
app.use(settings.settingsHandler);
app.use(sessions.sessionHandler);


const settingsRouter = express.Router();

settingsRouter.use("/toggle-theme",settings.themeToggle);
settingsRouter.use("/accept-cookie",settings.acceptCookies);
settingsRouter.use("/decline-cookie",settings.declineCookies);
app.use("/settings",settingsRouter)

function settingsLocals(req,res,next)
{
  res.locals.app= settings.getSettings(req);
  res.locals.page = req.path;
  next();
}

app.use(settingsLocals);

const userRouter = express.Router()

app.use("/user",userRouter)
userRouter.get("/login",auth.login_get)
userRouter.post("/login",auth.login_post)
userRouter.get("/register",auth.register_get)
userRouter.post("/register",auth.register_post)
userRouter.get("/logout",auth.logout)






const forumRouter = express.Router()
forumRouter.get("/",(req,res)=>{res.redirect('/')})
forumRouter.get("/:post",forum.getPost)
forumRouter.post("/new_entry",auth.login_required,forum.newEntry)
forumRouter.get("/:post/edit",forum.editEntryGet)
forumRouter.post("/:post/edit",forum.editEntryPost)
forumRouter.post("/:post/delete",forum.deleteEntry)

app.use("/entries",forumRouter)



app.get("/",(req,res)=>
{
    res.render("Index",{title:"Obiektywnie",entries:entries.getEntries()});
})

app.listen(port,()=>
{
    console.log(`Serwer na http://localhost:${port}`)
})  