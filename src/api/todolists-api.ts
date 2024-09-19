import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'ea242654-cb8f-4f9d-ad91-6077977d20a3',
    },
})


export const todolistAPI = {
    getTodolist(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            { title: title },
        )
        return promise
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}


type TaskType = {
    "id": string
    "title": string
    "description": string | null
    "todoListId": string
    "order": number
    "status": number
    "priority": number
    "startDate": string | null
    "deadline": string | null
    "addedDate": string | null
}

type GetTasksResponseType = {
    totalCount: number
    error: string | null
    items : TaskType[]
}

type UpdateTaskType = {
    "id": "da794778-70ed-49b6-83d4-2ba73cca2b23",
    "title": "useCallback",
    "description": null,
    "todoListId": "97ab30b8-ec61-402e-841a-bb3804fabf3f",
    "order": -1,
    "status": 0,
    "priority": 1,
    "startDate": null,
    "deadline": null,
    "addedDate": "2024-09-18T21:25:10.453"
}