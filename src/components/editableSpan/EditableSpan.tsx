import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanType) {
    console.log('EditableSpan is called')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
        ? <TextField
                 value={title}
                 onBlur={activateViewMode}
                 autoFocus
                 onChange={onChangeTitleHandler}
            />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
} )