import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {useCallback} from "react";
import {TaskType} from "../TodoList/TodoList";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistID);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistID);
    }, [props.changeTaskTitle, props.task.id, props.todolistID])

    const onChangeStatusHandeler = (isDone: boolean) => {
        props.changeTaskStatus(props.task.id, isDone, props.todolistID)
    }

    return (<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={(e) => onChangeStatusHandeler(e.currentTarget.checked)}
                      checked={props.task.isDone}/>

            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton aria-label='delete' onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})