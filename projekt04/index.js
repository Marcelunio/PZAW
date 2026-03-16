import express from "express"
import forum, { hasEntry } from './model/entries.js';
import cookieParser from "cookie-parser";
import settings from "./model/settings.js";

const port = process.env.PORT || 8000;

const app=express()
app.set("view engine","ejs")

app.use(express.static("public"))
app.use(express.urlencoded())
app.use(cookieParser());

const settingsRouter = express.Router();

settingsRouter.use("/toggle-theme",settings.themeToggle);
app.use("/settings",settingsRouter)

function settingsLocals(req,res,next)
{
  res.locals.app= settings.getSettings(req);
  res.locals.page = req.path;
  next();
}

app.use(settingsLocals);


app.get("/",(req,res)=>
{
    res.render("Index",{title:"Obiektywnie",entries:forum.getEntries()});
})
app.get("/entries/:post", (req, res) => {

    if(forum.hasEntry(req.params.post))
    {
        const post = forum.getEntry(req.params.post);
        res.render("Entry",{title:`Obiektywnie - ${post.title}`,entry:post, id: req.params.post})
  } else {
    res.sendStatus(404);
  }
});

app.post("/new_entry", (req, res) => { 
    let entry = {
      title: req.body.title,
      body: req.body.body,
    };
    var errors=forum.checkEntry(entry)
    if(errors==="")
    {
        forum.postEntry(entry)
        res.redirect(`/`);
    }
    else {
      res.status(400);
      res.render("Index", {
        error: errors,
        title: "Obiektywnie",
        entries: forum.getEntries()
      });
    }
  });
app.get("/entries/:post/edit",(req,res)=>{
   if(forum.hasEntry(req.params.post))
    {
        const post = forum.getEntry(req.params.post);
        res.render("Entry_edit",{title:`Obiektywnie - ${post.title} - edytuj`,entry:post, id: req.params.post})
  } else {
    res.sendStatus(404);
  }
})
app.post("/entries/:post/edit",(req,res)=>
{
  let entry_change =
  {
    title: req.body.title,
    body: req.body.body,
  };
  var exist= hasEntry(req.params.post)
  var errors= forum.checkEntry(entry_change)
  if( exist && errors=="" )
  {
    forum.modifyEntry(req.params.post,entry_change);
    res.redirect(`/entries/${req.params.post}`)
  }
  else
  {
      if(exist)
      {
       res.status(400);
      const post = forum.getEntry(req.params.post);
       res.render("Entry_edit",{title:`Obiektywnie - ${post.title} - edytuj`,entry:post, id: req.params.post,error: errors})
      }
      else
      {
        res.sendStatus(404);
      }
  }
})

app.post("/entries/:post/delete",(req,res)=>
{
  if(forum.hasEntry(req.params.post))
  {
    forum.deleteEntry(req.params.post);
    res.redirect('/')
  }
  else
  {
    res.status(400);
      res.render("Index", {
        error: "nie udało się usunąć postu ( on nie istnieje :( )",
        title: "Obiektywnie",
        entries: forum.getEntries()
      });
  }
})


app.get('/entries/',(req,res)=>{res.redirect('/')})

app.listen(port,()=>
{
    console.log(`Serwer na http://localhost:${port}`)
})  