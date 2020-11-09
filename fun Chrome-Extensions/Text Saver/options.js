chrome.storage.sync.get(['text'], function(result) {
    if(result.text != null){
        var ul = document.querySelector("ul");
        for(var i in result.text){
            document.getElementById("notif").style.display="none";
            var topping = result.text[i];

            var listItem = document.createElement("li");
            listItem.setAttribute("id",i);
            listItem.setAttribute("class","w3-display-container w3-row");  
            listItem.setAttribute("style","min-width:400px");
            

            var savetext = document.createElement("p");
            savetext.setAttribute("id",i);
            savetext.setAttribute("class","w3-display-container w3-col m10 s12 l10 w3-margin-right");
            savetext.setAttribute("style","min-width:200px");
            savetext.innerHTML = topping;

            var edit = document.createElement("button");
            edit.setAttribute("id",i);
            edit.setAttribute("class","w3-button w3-blue w3-col m1 l1 s6 w3-margin-left");
            edit.setAttribute("style","min-width:50px");
            edit.innerHTML = "edit";

            var span = document.createElement("span");
            span.setAttribute("id",i);
            span.setAttribute("class","w3-button w3-transparent w3-col m1 l1 s6 w3-margin-left");
            span.setAttribute("style","min-width:50px");
            span.innerHTML = "&times;";

            span.onclick = function(){
                this.parentElement.style.display='none';
                console.log(this.parentElement.children[0].getAttribute("id"));
                const index = this.parentElement.children[0].getAttribute("id");
                console.log(index);
                if (index > -1) {
                    result.text.splice(index, 1);
                    console.log(result.text);
                }
                chrome.storage.sync.set({text : result.text}, function(){

                });
                location.reload();
            }
            // var d = new Date();
            // var date = document.createElement("p");
            // date.setAttribute("id",i);
            // date.setAttribute("class","w3-display-container w3-margin-right w3-display-right");
            // date.innerHTML = d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear();

            // listItem.appendChild(date);
            listItem.appendChild(savetext);
            listItem.appendChild(edit);
            listItem.appendChild(span);

            
            
            ul.appendChild(listItem);
        }
    }
});

