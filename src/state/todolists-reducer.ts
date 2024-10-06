
import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


const initialState: Array<TodolistDomainType> = [
    // {id: todolistID1, title: "What to learn", filter: 'all'},
    // {id: todolistID2, title: "What to by", filter: 'all'},
];

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}




export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            // return [{
            //     id: action.payload.todolistId,
            //     title: action.payload.title,
            //     filter: "all"
            // }, ...state]

            return [{
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find((tl) => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
            return [...state]
        }
    default:
        return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: id, title: title } }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id: id, filter: filter } }
}