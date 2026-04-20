import forum, { hasEntry } from '../model/entries.js';
function getPost(req, res){

    if(forum.hasEntry(req.params.post))
    {
        const post = forum.getEntry(req.params.post);
        res.render("Entry",{title:`Obiektywnie - ${post.title}`,entry:post, id: req.params.post})
  } else {
    res.sendStatus(404);
  }
};

function newEntry(req, res){ 

    let entry = {
      title: req.body.title,
      body: req.body.body,
      author_id:res.locals.user.id
    };
    var errors=forum.checkEntry(entry)
        if(res.locals.user==null)
    {
      res.redirect("/")
      return
    }
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
  };
function editEntryGet(req,res){
   if(forum.hasEntry(req.params.post))
    {
        const post = forum.getEntry(req.params.post);
        res.render("Entry_edit",{title:`Obiektywnie - ${post.title} - edytuj`,entry:post, id: req.params.post})
  } else {
    res.sendStatus(404);
  }
}
function editEntryPost(req,res)
{
  const post = forum.getEntry(req.params.post);
  let entry_change =
  {
    title: req.body.title,
    body: req.body.body,
  };
  var exist= hasEntry(req.params.post)
  var errors= forum.checkEntry(entry_change)
  if(res.locals.user==null)
  { 
    errors="You have to be logged in" 
    res.status(400);
    res.render("Entry_edit",{title:`Obiektywnie - ${post.title} - edytuj`,entry:post, id: req.params.post,error: errors})
    return
  }
  if((res.locals.user.id != post.author_id) && (res.locals.user.id >=0))
  {
     errors="You can't change others posts" 
    res.status(400);
    res.render("Entry_edit",{title:`Obiektywnie - ${post.title} - edytuj`,entry:post, id: req.params.post,error: errors})
    return
  }
  if( exist && errors=="")
  {
    forum.modifyEntry(req.params.post,entry_change);
    res.redirect(`/entries/${req.params.post}`)
  }
  else
  {
      if(exist)
      {
       res.status(400);
       res.render("Entry_edit",{title:`Obiektywnie - ${post.title} - edytuj`,entry:post, id: req.params.post,error: errors})
      }
      else
      {
        res.sendStatus(404);
      }
  }
}

function deleteEntry(req,res)
{
  let errors=""
  const post = forum.getEntry(req.params.post);
  if(forum.hasEntry(req.params.post))
  {
    if(res.locals.user==null)
  { 
    errors+="You have to be logged in to delete a post" 
    res.status(400);
    res.render("Index",{title:`Obiektywnie - ${post.title} - edytuj`,entries: forum.getEntries(), id: req.params.post,error: errors})
    return
  }
  if((res.locals.user.id != post.author_id) && (res.locals.user.id >=0))
  {
     errors+="You can't change others posts" 
    res.status(400);
    res.render("Index",{title:`Obiektywnie - ${post.title} - edytuj`,entries: forum.getEntries(), id: req.params.post,error: errors})
    return
  }
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
}





export default
{
    getPost,
    newEntry,
    editEntryGet,
    editEntryPost,
    deleteEntry
}