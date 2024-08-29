import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemPropstype = {
    addItem: (title: string) => void
}

export const  AddItemForm = React.memo((props: AddItemPropstype) => {
    console.log('AddItemForm is called');
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value) // элемент с которым произошло событие. значение
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        if( error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const onClickHandlerAddTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required');
            setNewTaskTitle("");
            return;
        }
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle("");
    }

    return (
        <div>
            {/*<input value={newTaskTitle}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={keyDownHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}

            <TextField variant={"outlined"}
                       label={'Type value'}
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={keyDownHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={onClickHandlerAddTask} color={'primary'}>
                <ControlPoint/>
            </IconButton>
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    )
});