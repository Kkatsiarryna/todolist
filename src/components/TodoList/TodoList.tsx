import React from "react";
import {FilterValuesType} from '../../App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void

}

export function TodoList(props:PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( (t )=> {
                        return (<li><input type="checkbox"
                                           checked={t.isDone}/><span>{t.title}</span>
                                <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                            </li>

                        )
                    })
                }
{/*                <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick = { () => {props.changeFilter('all')}}>all</button> {/*вызову функцию из пропс со значением*/}
                <button onClick = { () => {props.changeFilter('active')}}>active</button>
                <button onClick = { () => {props.changeFilter('completed')}}>completed</button>
            </div>
        </div>

    )
}