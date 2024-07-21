import React from "react";
import {FilterValuesType} from '../../App';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const onChangeStatusHandeler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChangeTitleHandler = (taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle( props.id, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={(e) => onChangeStatusHandeler(t.id, e.currentTarget.checked)}
                                       checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                              onChange={ (newValue) => onChangeTitleHandler(t.id, newValue)
                                              }/>
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

//////////

// {/*            <div>
//                 <input value={newTaskTitle}
//                        onChange={onChangeHandler}
//                        onKeyDown={keyDownHandler}
//                        className={error ? 'error' : ''}
//                 />
//                 <button onClick={onClickHandlerAddTask}>+
//                 </button>
//                 {error && <div className='error-message'>{error}</div>}
//             </div>*/}