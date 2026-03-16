import { DatabaseSync } from "node:sqlite"

const db_path="./db.sqlite"
const database= new DatabaseSync(db_path)


const database_operations = {

    get_entries: database.prepare("SELECT * FROM entries; "),
    get_entry: database.prepare("SELECT title,body FROM entries WHERE id = ?; "),
    post_entry: database.prepare("INSERT INTO entries(title,body) VALUES (?,?) "),
    delete_entry: database.prepare('DELETE FROM entries WHERE id=?;'),
    update_entry: database.prepare('UPDATE entries SET title=?, body=? WHERE id=? ;')
}

export function checkEntry(entry)
{
    if (!entry.hasOwnProperty("body") || !entry.hasOwnProperty("title")){return "brakuje pola"; }
    else {
        if (typeof entry.body != "string"||typeof entry.title != "string")
            return "pola muszą być stringiem";
        else {
            if (  (entry.title.length < 1 || entry.title.length > 50 ))
                return "tytuł nie poprawnej wielkości"
      }
    }
    return ""
}
export function postEntry(entry)
{
    database_operations.post_entry.run(entry.title,entry.body)
}

export function getEntries()
{
    
    return database_operations.get_entries.all()
}

export function getEntry(id)
{
 return database_operations.get_entry.get(id)
}

export function hasEntry(id)
{
     return database_operations.get_entry.get(id)!=null
}

export function deleteEntry(id)
{
    if(hasEntry(id))
    {
        database_operations.delete_entry.run(id)
        return true
    }
    return false
}

export function modifyEntry(id,entry_change)
{

    database_operations.update_entry.run(entry_change.title,entry_change.body,id)
}

export default  {
    checkEntry,
    getEntries,
    hasEntry,
    getEntry,
    postEntry,
    modifyEntry,
    deleteEntry
}