import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: "EditableSpan Component",
    component: EditableSpan,
}

export const EditableSpanBaseExample = () => {
    const changeCallback = action("value changed");

    return <>
        <EditableSpan title={"start value"} onChange={changeCallback} />
    </>
    
}