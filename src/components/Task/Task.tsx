import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import React from "react";
import {TaskType} from "../TodoList/TodoList";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    onChangeStatusHandeler: (taskId: string, isDone: boolean) => void
    onChangeTitleHandler: (taskId: string, newTitle: string) => void
    task: TaskType
    todolistID: string
}
export const Task = (props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistID);
    return (<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={(e) => props.onChangeStatusHandeler(props.task.id, e.currentTarget.checked)}
                      checked={props.task.isDone}/>

            <EditableSpan title={props.task.title}
                          onChange={(newValue) => props.onChangeTitleHandler(props.task.id, newValue)
                          }/>
            <IconButton aria-label='delete' onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
}