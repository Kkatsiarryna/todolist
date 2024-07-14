import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from '../../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,  todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void

}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const keyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value) // элемент с которым произошло событие. значение
    }

    const onClickHandlerAddTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required');
            setNewTaskTitle("");
            return;
        }
        props.addTask(newTaskTitle.trim(), props.id)
        setNewTaskTitle("");
    }

      const onAllClickHandler = () => props.changeFilter('all', props.id);
      const onActiveClickHandler = () => props.changeFilter('active', props.id);
      const onCompletedClickHandler = () => props.changeFilter('completed', props.id);


    const onChangeCheckboxHandeler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={keyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickHandlerAddTask}>+
                </button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={(e) => onChangeCheckboxHandeler(t.id, e.currentTarget.checked)}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ""}
                >all
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ""}
                >active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ""}
                >completed
                </button>
            </div>
        </div>

    )
}


/////////////////////////////////////////////////////////////////////////////////////////////



// const onChangeCheckboxHandeler = (taskId: string, isDone: ChangeEvent<HTMLInputElement> ) => {
//     props.changeTaskStatus(taskId, isDone.currentTarget.checked)
// }

// const onChangeCheckboxHandeler = (e : ChangeEvent<HTMLInputElement>) => {
//     props.changeTaskStatus(t.id, e.currentTarget.checked)
// }


// {/*                <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
//                 <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
//                 <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
//
//
// {/*          <div>


// <button onClick={() => {
//     changeFilterTasksHandler('all')
// }}
//         className={filterClassName === 'all' ? 'active-filter' : ""}
// >all</button>
// <button onClick={() => {
//     changeFilterTasksHandler('active')
// }}
//         className={filterClassName === 'active' ? 'active-filter' : ""}
// >active</button>
// <button onClick={() => {
//     changeFilterTasksHandler('completed')
// }} className={filterClassName === 'completed' ? 'active-filter' : ""}
// >completed</button>

// const changeFilterTasksHandler = (filter: FilterValuesType) => {
//     props.changeFilter(filter)
//     setFilterClassName(filter)
// }

//let [filterClassName, setFilterClassName] = useState<FilterValuesType>('all')