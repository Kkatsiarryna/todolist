import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "../../api/todolists-api";


type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    //changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistID);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistID);
    }, [props.changeTaskTitle, props.task.id, props.todolistID])

    // const onChangeStatusHandeler = (isDone: boolean) => {
    //     props.changeTaskStatus(props.task.id, isDone, props.todolistID)
    // }

    const onChangeStatusHandeler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)

    }, [props.task.id, props.todolistID])

    return (<div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox onChange={onChangeStatusHandeler}
                      checked={props.task.status === TaskStatuses.Completed}/>

            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton aria-label='delete' onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})