import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from '../../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType

}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const keyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value) // элемент с которым произошло событие. значение
    }
    const onClickHandlerAddTask = () => {
        if(newTaskTitle.trim() === ''){
            setError('Title is required');
            setNewTaskTitle("");
            return;
        }
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle("");

    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');



    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onRemoveHandler = () => props.removeTask(t.id);
                        const onChangeCheckboxHandeler = (e : ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        return (<li key={t.id} className={t.isDone ? 'is-done' : ''} >
                                    <input type="checkbox"
                                           onChange={onChangeCheckboxHandeler}
                                           checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>

                        )
                    })
                }
                {/*                <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ""}
                >all</button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ""}
                >active</button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ""}
                >completed</button>
            </div>
        </div>

    )
}