let theme= localStorage.getItem("theme");
var toggle;

function ThemeToggleUpdate()
{
        if (theme === "dark") { 
        toggle.innerHTML="<strong>Ciemny</strong> | Jasny"
        } else { 
        toggle.innerHTML="Ciemny | <strong>Jasny</strong>"
        } 
}

addEventListener("DOMContentLoaded", (event) => { 
    
    if(theme==null)
    {
        localStorage.setItem("theme","light")
        theme="light";
        return
    }
    document.documentElement.dataset["theme"]=theme
    toggle=document.getElementById("theme_toggle")
    ThemeToggleUpdate()
    toggle.addEventListener("click",(event)=>
    {
        event.preventDefault()
        if(theme=="light")
        {
            theme="dark"
        }
        else
        {
            theme="light"
        }
        window.localStorage.setItem("theme",theme)
        ThemeToggleUpdate()
        document.documentElement.dataset["theme"]=theme
    })

})
