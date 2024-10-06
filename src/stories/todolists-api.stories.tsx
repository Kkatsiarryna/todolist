import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then( (res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'NEXT JS'
        todolistAPI.createTodolist(title)
            .then( (res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f4968eff-c797-432d-91ff-1b4863a21382'
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '986bfb9a-c86b-4289-8396-9a915f0302f4'
        const title = 'NEXT-----JS'
        todolistAPI.updateTodolist(todolistId, title)
            .then( (res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       const todolistId = '97ab30b8-ec61-402e-841a-bb3804fabf3f'
        todolistAPI.getTasks(todolistId)
            .then( (res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const createTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '97ab30b8-ec61-402e-841a-bb3804fabf3f'
        const title = 'useMemo'
        todolistAPI.createTask(todolistId, title)
            .then( (res) => {
                setState(res.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    // useEffect(() => {
    //     const todolistId = '97ab30b8-ec61-402e-841a-bb3804fabf3f'
    //     const taskId = '7627cf9d-f1db-4901-8e64-8ab81d3c76a7'
    //     todolistAPI.deleteTask(todolistId, taskId)
    //         .then( (res) => {
    //             setState(res.data)
    //         })
    // }, [])
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then( (res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"}
                   value={todolistId}
                   onChange={ (e) => {setTodolistId(e.currentTarget.value)}}
            />
            <input placeholder={"taskId"}
                   value={taskId}
                   onChange={ (e) => {setTaskId(e.currentTarget.value)}}
            />
            <button onClick={deleteTask}>deleteTask</button>
        </div>

    </div>
}

// export const updateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '97ab30b8-ec61-402e-841a-bb3804fabf3f'
//         const taskId = 'da794778-70ed-49b6-83d4-2ba73cca2b23'
//         const title = 'useCallback'
//         todolistAPI.updateTask(todolistId, taskId, title)
//             .then( (res) => {
//                 setState(res.data)
//             })
//     }, []);
//     return <div>{JSON.stringify(state)}</div>
// }
