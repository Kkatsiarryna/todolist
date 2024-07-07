import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, TodoList} from './components/TodoList/TodoList';
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"


function App() {
    console.log("App ren");
    // let arr = useState(initTasks);
    /*  let tasks = arr[0];
      let setTasks = arr[1];*/ // функция кот меняет данные

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS1", isDone: true},
        {id: v1(), title: "CSS2", isDone: true},
        {id: v1(), title: "CSS3", isDone: true},
        {id: v1(), title: "CSS4", isDone: false}]);

    console.log(tasks);

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) { //callback
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks); //измени в state таски, вызывается после логич обработки
    }

    function addTask(title: string) { // придет из todolist
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }



    function changeStatus(taskId: string, isDone: boolean) {
       let task =  tasks.find( t => t.id === taskId);
       if (task){
           task.isDone = isDone;
       }
       setTasks([...tasks]);
    }

    function changeFilter(value: FilterValuesType) { // педадам ее callback-ом в todolist
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);

    }

    return (
        <div className="App">

            <TodoList title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask = {addTask}
                      changeTaskStatus = {changeStatus}
                      filter={filter}/>

        </div>
    );
}

export default App;
