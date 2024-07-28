import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './components/TodoList/TodoList';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active"


function App() {

    type TodolistType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    type TasksStateType = {
        [key: string]: TaskType[]
    }

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: 'all'},
        {id: todolistID2, title: "What to by", filter: 'all'},
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        let updatedTasks = tasks.map(task => task.id === taskId ? {...task, isDone: isDone} : task);
        tasksObj[todolistId] = updatedTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistID: string) { // педадам ее callback-ом в todolist
        let todolist = todolists.find((tl) => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists]);
        }
    }

    const removeTodolist = (todolistID: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistID);
        setTodolist(filteredTodolist);

        delete tasksObj[todolistID];
        setTasks({...tasksObj});
    }

    function addTodolist(title: string) {
        let newTodolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolist([newTodolist, ...todolists])
        setTasks({
            ...tasksObj,
            [newTodolist.id]: []
        })
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        })
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        setTodolist(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl));
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge={"start"} color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                                let tasksForTodolist = tasksObj[tl.id];
                                if (tl.filter === 'completed') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                                }
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                                }
                                return (<Grid item>
                                        <Paper style={{padding: "10px"}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </Container>
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