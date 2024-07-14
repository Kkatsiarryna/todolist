import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './components/TodoList/TodoList';
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"


function App() {
    console.log("App ren");

    type TodolistType ={
        id: string
        title: string
        filter: FilterValuesType
    }

    function removeTask(id: string, todolistId: string) { //callback
        let tasks = tasksObj[todolistId] // достать один массив из объекта
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj}); //измени в state таски, вызывается после логич обработки
    }

    function addTask(title: string, todolistId: string) { // придет из todolist

        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let updatedTasks = tasks.map(task => task.id === taskId ? { ...task, isDone: isDone } : task);
        tasksObj[todolistId] = updatedTasks;
        setTasks({ ...tasksObj });
    }

    function changeFilter(value: FilterValuesType, todolistID: string) { // педадам ее callback-ом в todolist
        let todolist = todolists.find((tl) => tl.id === todolistID);
        if (todolist){
            todolist.filter = value;
            setTodolist([...todolists]);
        }
    }

    let removeTodolist = (todolistID: string) => {
        let filteredTodolist = todolists.filter ( tl => tl.id !== todolistID);
        setTodolist(filteredTodolist);

        delete tasksObj[todolistID];
        setTasks({...tasksObj});
    }

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: 'active'},
        {id: todolistID2, title: "What to by", filter: 'completed'},
    ] );


    let [ tasksObj, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "CSS1", isDone: true},
            {id: v1(), title: "CSS2", isDone: true},
            {id: v1(), title: "CSS3", isDone: true},
            {id: v1(), title: "CSS4", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Chocolate", isDone: false}
        ],
    });

    return (
        <div className="App">
            {
                todolists.map( tl => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                        return (
                            <TodoList
                                      key = {tl.id}
                                      id = {tl.id}
                                      title={tl.title}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      filter={tl.filter}
                                      removeTodolist={removeTodolist}/>
                        )
                    }
                )
            }

        </div>
    );
}

export default App;









////////////////////////////////////

// let arr = useState(initTasks);
/*  let tasks = arr[0];
  let setTasks = arr[1];*/ // функция кот меняет данные

// function changeStatus(taskId: string, isDone: boolean) {
//    let task =  tasks.find( t => t.id === taskId);
//        if (task){
//            task.isDone = isDone;
//        }
//        setTasks([...tasks]); }

// <TodoList title="What to learn"
//           tasks={tasksForTodolist}
//           removeTask={removeTask}
//           changeFilter={changeFilter}
//           addTask={addTask}
//           changeTaskStatus={changeStatus}
//           filter={filter}/>


//  let [filter, setFilter] = useState<FilterValuesType>('all')
// let tasksForTodolist = tasks;
// if (filter === 'completed') {
//     tasksForTodolist = tasks.filter(t => t.isDone === true);
// }
// if (filter === 'active') {
//     tasksForTodolist = tasks.filter(t => t.isDone === false);
// }

//setTasks(tasks.map(el => taskId === el.id ? {...el, isDone: isDone} : el))