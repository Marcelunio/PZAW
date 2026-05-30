import { createSession, deleteSession } from "./../model/sessions.js";
import { createUser, validatePassword } from "./../model/users.js";

const ADMIN_USERNAME= "admin"
const ADMIN_PASSWORD = "admin"
export function registerGet(req, res) {
  res.render("User_register", { title: "Rejestracja",  });
}

export async function registerPost(req, res) {
  
  let registration=
  {
    username: req.body.username,
    password: req.body.password,
    check: req.body.password_again,
  }


  let errors = validateRegistrationForm(registration);

  if (errors == "") {
    let user = await createUser(registration.username, registration.password);
    if (user != null) { 
      createSession(user.id, res);
      res.redirect("/");
      return;
    } else {
      errors += "Użytkownik o podanej nazwie już istnieje";
    }
  }
    res.status(400);
    res.render("User_register", {
      error: errors,
      title: "Rejestracja",
    });
}

export function loginGet(req, res) {
  res.render("User_login", { title: "Logowanie"});
}

export async function loginPost(req, res) {
  
  let login=
  {
    username: req.body.username,
    password: req.body.password
  }

  let errors = validateLoginForm(login);

  if (errors == "") {
    let user_id = await validatePassword(
      login.username,
      login.password
    );
    if (user_id == null) {
      errors+= "Niepoprawna nazwa użytkownika lub hasło";
    } else {
      createSession(user_id, res);
      res.redirect("/");
      return;
    }
  }
    res.status(400);
    res.render("User_login", {
      error: errors,
      title: "Rejestracja",
    });
}

function logout(req, res) {
  if (res.locals.user != null) {
    deleteSession(res);
  }
  res.redirect("/");
}

function loginRequired(req, res, next) {
  if (res.locals.user == null) {
    res.redirect("/")
    return;
  }
  next();
}

export default {
  loginGet,
  loginPost,
  registerGet,
  registerPost,
  logout,
  loginRequired,
};


function validateRegistrationForm(values) {
  let errors = "";

    if (!values.hasOwnProperty("username") || !values.hasOwnProperty("password")|| !values.hasOwnProperty("check")){errors+= "brakuje pola"; }
    else {
        if (typeof( values.username) != "string"||typeof(values.password) != "string" || typeof(values.check) != "string")
           {errors+="pola muszą być stringiem "} ;
        if (  (values.username.length < 3 || values.username.length > 50 ))
            {errors+="username nie poprawnej długości nie poprawnej wielkości"}
        if ((values.password.length <8))
            {errors+="hasło nie poprawnej długości: przynajmniej 8 znaków"}
        else if(values.password != values.check)
        {
          errors+="hasła się niezgadzają"
        }
}
  return errors;
} 
function validateLoginForm(values) {
  let errors = "";

    if (!values.hasOwnProperty("username") || !values.hasOwnProperty("password")){errors+= "brakuje pola"; }
    else {
        if (typeof(values.username) != "string"||typeof(values.password) != "string")
           errors+="pola muszą być stringiem ";
        else {
            if ((values.username.length < 3 || values.username.length > 50 ))
                errors+="username nie poprawnej długości nie poprawnej wielkości"
            if ((values.password.length <8))
              {errors+="hasło nie poprawnej długości: przynajmniej 8 znaków"}
      }
}
  return errors;
} 
