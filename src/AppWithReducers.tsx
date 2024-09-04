import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: 'all'},
        {id: todolistID2, title: "What to by", filter: 'all'},
    ]);

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        const action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action);
    }

    function addTask(title: string, todolistId: string) { // придет из todolist
        const action = addTaskAC(title, todolistId);
        dispatchToTasksReducer(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTasksReducer(action);
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
          dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
    }


    function changeFilter(value: FilterValuesType, todolistID: string) { // педадам ее callback-ом в todolist
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistID, value));
    }

    const removeTodolist = (todolistID: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistID));
        dispatchToTasksReducer(removeTodolistAC(todolistID));

    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle));
    }

    function addTodolist(title: string) {
        dispatchToTodolistsReducer(addTodolistAC(title));
        dispatchToTasksReducer(addTodolistAC(title));
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
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                                }
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone );
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

export default AppWithReducers;


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