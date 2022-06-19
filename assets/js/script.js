var toDo={}
//create a todo for tourish
var createToDo = function (toDoText, toDoList) {
    var toDoLi = $("<li>").addClass("checklist-container-item");
    var toDoP = $("<p>")
        .text(toDoText)
    //Now add the p to the list parent
    toDoLi.append(toDoP);

    //now append to the ul on the html
    $("#checklist-container" + toDoList).append(toDoLi);

};
var loadTodo = function(){
toDo = JSON.parse(localStorage.getitem("toDo"));
if(!tasks){
    tasks = {
        toDo:[]
    };
}
}
//enable the sorting of the to do list tasks
$(".right-col .checklist-container").sortable({
    connectWith: $(".right-col .checklist-container"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function () {
        //for if we want to animate the list sorter later
        $(this).addClass("moving-todo");
    }
})