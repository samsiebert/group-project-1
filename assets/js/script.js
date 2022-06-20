var toDo = {}
//create a todo for tourish
var createToDo = function (toDoText, toDoList) {
    var toDoLi = $("<li>").addClass("todolist-container-item");
    var toDoP = $("<p>")
        .text(toDoText)
    //Now add the p to the list parent
    toDoLi.append(toDoP);

    //now append to the ul on the html
    $("#todolist-container" + toDoList).append(toDoLi);

};
//get the list from local storage
var loadTodo = function () {
    toDo = JSON.parse(localStorage.getitem("toDo"));
    if (!toDo) {
        toDo = {
            toDo: []
        };
    }
};
//save to local storage
var saveToDo = function () {
    localStorage.setItem("todo", JSON.stringify(toDo));
};
//enable the sorting of the to do list tasks
$(".right-col .todolist-container").sortable({
    connectWith: $(".right-col .todolist-container"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function () {
        //for if we want to animate the list sorter later
        $(this).addClass("moving-todo"),
            update = function () {
                var tempArr = [];
                //loop over the children
                $(this)
                    .children()
                    .each(function () {
                        //save the value of the text in an array
                        tempArr.push({
                            text: $(this)
                                .find("p")
                                .text()
                                .trim()
                        });
                    });

                var arrName = $(this)
                    .attr("id");

                todo[arrName] = tempArr
                saveToDo();
            }
    }
})
//modal was clicked
$("#todo-form-modal")