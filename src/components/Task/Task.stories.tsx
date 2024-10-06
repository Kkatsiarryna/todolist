import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Task Component',
    component: Task,
}

// const changeTaskStatus = action("status chenged");
// const changeTaskTitle = action("title canched");
// const removeTask = action("task removed")
//
// export const TaskBaseExample = () => {
//     return <>
//         <Task
//             task={{id: '1', isDone: true, title: "CSS"}}
//             changeTaskStatus={changeTaskStatus}
//             changeTaskTitle={changeTaskTitle}
//             removeTask={removeTask}
//             todolistID={"todolistId1"}
//         />
//         <Task
//             task={{id: '1', isDone: false, title: "JS"}}
//             changeTaskStatus={changeTaskStatus}
//             changeTaskTitle={changeTaskTitle}
//             removeTask={removeTask}
//             todolistID={"todolistID2"}
//         />
//         </>
// }