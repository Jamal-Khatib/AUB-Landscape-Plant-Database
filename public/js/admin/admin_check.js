function $(id)
{ return document.getElementById(id); }


window.onload = function() {
    $("myButton").addEventListener("click", check) ; 
}

function check() 
{
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function()
    {
        if(this.readyState==4 && this.status==200)
        {
            showCheckAnswer(this);
        }
    }
    ajax.open("POST","/adminCheck",true) ; 
    var name = $("name").value; 
    var password = $("password").value;
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("name="+`${name}`+"&password="+`${password}`+"") ; 
}

function showCheckAnswer(answer)
{
    var text = JSON.parse(answer.responseText);
    var isAdmin = text.answer ; 

    if(isAdmin=="yes") 
    { 
        $("answer").innerHTML = "" ; 
        //Make a get request (using ajax or fetch) to get the admin_options page (siiiiii)
        window.location.href = "/adminOptions" ; //no fetch or ajax!
        // fetch("/admin_options",{method:"GET"})
        
    }
    else 
    {
        $("answer").innerHTML = "Wrong Info" ; 
    }
}

