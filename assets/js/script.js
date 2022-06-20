var todo = {}
//create a todo for tourish
var createtodo = function (todoText, todoList) {
    var todoLi = $("<li>").addClass("todolist-container-item");
    var todoP = $("<p>")
        .text(todoText)
    //Now add the p to the list parent
    todoLi.append(todoP);

    //now append to the ul on the html
    $("#todolist-container" + todoList).append(todoLi);

};
//get the list from local storage
var loadtodo = function () {
    todo = JSON.parse(localStorage.getitem("todo"));
    if (!todo) {
        todo = {
            todo: []
        };
    }
};
// loop over object properties
$.each(todo, function (list, arr) {
    //then loop over sub array
    arr.forEach(function (todo) {
        createtodo(todo.text, list);
    });
})
//save to local storage
var savetodo = function () {
    localStorage.setItem("todo", JSON.stringify(todo));
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
                savetodo();
            }
    }
})
//modal was clicked have to figure out how to do it wihtout bootstrap
$("#todo-form-modal").modal()(function () {
    //clear values
    $("#modaltodoDescription").val("")
});
$("#todo-form-modal .save-button").click(function () {
    //get the value of the text form
    var todoText = $("modaltodoDescription").val();

    if (todoText, "todo") {
        createtodo(todoText, "todo");

        //close modal
    }
})