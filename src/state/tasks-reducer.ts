import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        taskId: string
        todolistId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        taskId: string
        isDone: boolean
        todolistId: string
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        taskId: string
        title: string
        todolistId: string
    }
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {
    // [todolistID1]: [
    //     {id: v1(), title: "CSS1", isDone: true},
    //     {id: v1(), title: "CSS2", isDone: true},
    //     {id: v1(), title: "CSS3", isDone: true},
    //     {id: v1(), title: "CSS4", isDone: false}
    // ],
    // [todolistID2]: [
    //     {id: v1(), title: "Book", isDone: true},
    //     {id: v1(), title: "Milk", isDone: true},
    //     {id: v1(), title: "Chocolate", isDone: false}
    // ],
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK' :
            let tasks = state[action.payload.todolistId] || []
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...tasks]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
            }
        case 'ADD-TODOLIST' : {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {taskId: taskId, todolistId: todolistId}}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {title: title, todolistId: todolistId}}
}

export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId: taskId, isDone: isDone, todolistId: todolistId}}
}

export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId: taskId, title: title, todolistId: todolistId}
    }
}


