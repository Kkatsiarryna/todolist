import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, TodoList} from './components/TodoList/TodoList';

export type FilterValuesType = "all" | "completed" | "active"


function App() {
  console.log("App ren");

/*  let initTasks = [
    {id:1, title: "CSS1", isDone: true},
    {id:2, title: "CSS2", isDone: true},
    {id:3, title: "CSS3", isDone: true},
    {id:4, title: "CSS4", isDone: false},
  ]*/
  let task2 : Array<TaskType> = [
    {id:1, title: "HTML1", isDone: false},
    {id:2, title: "HTML2", isDone: true},
    {id:3, title: "HTML3", isDone: true}
  ]
  let task3 = [
    {id:1, title: "REACT1", isDone: true},
    {id:2, title: "REACT2", isDone: false},
    {id:3, title: "REACT3", isDone: true}
  ]
 // let arr = useState(initTasks);
/*  let tasks = arr[0];
  let setTasks = arr[1];*/ // функция кот меняет данные

  let [tasks, setTasks] = useState<Array<TaskType>>([
        {id:1, title: "CSS1", isDone: true},
        {id:2, title: "CSS2", isDone: true},
        {id:3, title: "CSS3", isDone: true},
        {id:4, title: "CSS4", isDone: false}]);

  let [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: number){ //callback
   let filteredTasks = tasks.filter( t => t.id !== id )
    setTasks(filteredTasks); //измени в state таски, вызывается после логич обработки
  }

  function changeFilter(value: FilterValuesType){ // педадам ее callback-ом в todolist
      setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === 'completed'){
      tasksForTodolist = tasks.filter(t => t.isDone === true);
  }
 if (filter === 'active'){
      tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  return (
      <div className="App">

        <TodoList title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
{/*        <TodoList title="Movies" tasks={task2}/>
        <TodoList title="Songs" tasks={task3}/>*/}

      </div>
  );
}

export default App;
