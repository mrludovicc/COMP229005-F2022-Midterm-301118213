// create a reference to the model
const todo = require('../models/todo');

let TodoModel = require('../models/todo');


module.exports.todoList = function(req, res, next) {  

    TodoModel.find((err, todoList) => {
        //console.log(todoList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('todo/list', {
                title: 'To-Do List', 
                TodoList: todoList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a todo by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    TodoModel.findById(id, (err, todoToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('todo/details', {
                title: 'To-Do Details', 
                todo: todoToShow
            })
        }
    });
}

// Gets a todo by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async(req, res, next) => {
    const id = req.params.id;
 TodoModel.findById(id, (err, todoToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
         
            
            //show the edit view
            res.render("todo/edit_to_do.ejs",{title:"Edit Page",  todo: todoToShow}) 
        }
    });
  
   
   
   
    
    // ADD YOUR CODE HERE

}

// Processes the data submitted from the Edit form to update a todo
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id
    
    console.log(req.body);

    let updatedTodo = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });
    console.log(updatedTodo);
    
 
    todo.findByIdAndUpdate(id,updatedTodo, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.redirect("/todo/list");
        }
    // ADD YOUR CODE HERE

})
}
// Deletes a todo based on its id.
module.exports.performDelete = (req, res, next) => {
  const id =req.params.id
    todo.remove({_id: id}, function(err) {
        if(err) {
              // If error exists display it
            console.log("Delete  Error", err);
        }
        else {
            console.log(" deleted!");
            res.redirect("/todo/list");
        }
      
    

})
}
// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    // res.render("dreams/index", {
    //     dreams,
    //   });  
    res.render("todo/add_edit", {title:"Add Page" ,  });  
    console.log(req.user);

}

// Processes the data submitted from the Add form to create a new todo
module.exports.processAddPage = async(req, res, next) => {

    TodoModel.create({ id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false})
    .then(result => {
        res.redirect("/todo/list");
    })
    
    
}