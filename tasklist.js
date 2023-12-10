window.onload=function(){
    console.log("Hello");
    document.getElementById("new_task").addEventListener("change",getInput);
    document.getElementById("btn1").addEventListener("click",addTask);
    document.getElementById("btn2").addEventListener("click",clearTasks);
    document.getElementById("filter_task").addEventListener("input",filterTasks);
    loadtasks();

    
}
let inptask="";
function getInput(event){
    inptask=document.getElementById("new_task").value.trim();
    console.log(inptask);
}
function addTask(){
    if(inptask=="")
        return;
    setTimeout(function(){
         document.getElementById("new_task").value="";
    },400);
    let taskarr;
    if(!localStorage.getItem("tasks"))
        taskarr=[];
    else
        taskarr=JSON.parse(localStorage.getItem("tasks"));
    taskarr.push(inptask);
    localStorage.setItem("tasks",JSON.stringify(taskarr));
    let newnode=document.createElement("P");
    newnode.className="taskdisplay";
    newnode.innerHTML=inptask+"<span class=\"cross\">&#10060;</span>";
    let node=document.getElementById("tasklist");
    node.appendChild(newnode);
    document.getElementById("tasklist").querySelectorAll(".cross").forEach((elem)=>elem.addEventListener("click",deleteTask));
    inptask="";
    //Alternative method
   /* document.getElementById("tasklist").innerHTML=`<p class="taskdisplay">${inptask}<span class="cross">&#10060;</span></p>`;
      Now we can use Event Delegation. We can add a single event listner to tasklist and then use event.target to verify if the click happened
      on the cross mark. If the click happens on cross mark, then we can proceed to delete that task*/
}
function deleteTask(event){
    let tasknode=event.target.parentNode;
    let task=tasknode.childNodes[0].textContent;
    let taskarr=JSON.parse(localStorage.getItem("tasks"));
    let i=taskarr.indexOf(task);
    console.log(task);
    taskarr.splice(i,1);
    console.log(taskarr);
    localStorage.setItem("tasks",JSON.stringify(taskarr));
    tasknode.remove();
}
function filterTasks(event){
    let userinp=document.getElementById("filter_task").value;
    console.log("hi");
    document.getElementById("tasklist").querySelectorAll(".taskdisplay").forEach(function(elem){
        if(elem.firstChild.textContent.indexOf(userinp)!=-1)
            elem.style.display="block";
        else
            elem.style.display="none";
    });
}
function loadtasks(){
    let taskarr;
    if(!localStorage.getItem("tasks"))
        taskarr=[];
    else
        taskarr=JSON.parse(localStorage.getItem("tasks"));
    taskarr.forEach(function(val){
        let newnode=document.createElement("P");
        newnode.className="taskdisplay";
        newnode.innerHTML=val+"<span class=\"cross\">&#10060;</span>";
       
        let node=document.getElementById("tasklist");
        node.appendChild(newnode);
        document.getElementById("tasklist").querySelectorAll(".cross").forEach((elem)=>elem.addEventListener("click",deleteTask));

    });
}
function clearTasks(){
    document.getElementById("tasklist").innerHTML="";
    localStorage.removeItem("tasks");
}