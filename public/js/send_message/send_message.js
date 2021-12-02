function $(id)
{
    return(document.getElementById(id)) ; 
}

window.onload = function()
{
    generate() ; 
    // $("button").addEventListener("click",check) ; 
    $("result").addEventListener("",check) ; 
    $("result").oninput = check  ;
    $("button").onclick = send ; 
}
var answer ; 


function check ()
{
    if($("result").value==answer) 
    {
       $("error").innerHTML = "Correct" ; 
       $("error").style.color = "green" ; 
    }   
    else
    {
        $("error").innerHTML = "Incorrect" ; 
        $("error").style.color = "red" ; 
    }
}
function generate()
{
    var alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "1","2","3","4","5","6","7","8","9"
                ]
    
    var r1  = alpha[Math.floor(Math.random()*60)] ; 
    var r2  = alpha[Math.floor(Math.random()*60)] ; 
    var r3  = alpha[Math.floor(Math.random()*60)] ; 
    var r4  = alpha[Math.floor(Math.random()*60)] ; 
    var r5  = alpha[Math.floor(Math.random()*60)] ; 
    var r6  = alpha[Math.floor(Math.random()*60)] ; 

    answer = r1+r2+r3+r4+r5+r6 ; 
    

    $("captcha").innerHTML = answer ; 

}

function send()
{
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if($("result").value!= answer) return 

    if(!($("email").value.match(regexEmail))) {$("error").innerHTML = "Incorrect Email" ;  $("error").style.color = "red" ; return ;  } 
   
    if($("message").value.trim()=="")  { $("error").innerHTML = "Please enter a message " ;  $("error").style.color = "red" ; return ; }

    var email = $("email").value ; 
    var message = $("message").value ; 

    var data = { "email" : email , "message": message} ; 


    // fetch("/send_message", {
    //     method: "POST", 
    //     // JSON.stringify(data) 
    //     data: data
    //   }).then(res => {
    //     console.log("Request complete! response:");
    //   });

    var ajax = new XMLHttpRequest() ; 
    var data = new FormData() ; 
    data.append("email",email) ; 
    data.append("message",message) ; 
    ajax.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200)
        {
            window.location = "/" ; 
        }
    }
   
    ajax.open("Get","/sendy?email="+email+"&message="+message) ; 
    ajax.send(data) ; 

}