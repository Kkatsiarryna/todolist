import {
    addTodolistAC, changeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from 'uuid';


// test('correct todolist should be removed', () => {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     // 1. Стартовый state
//     const startState: TodolistType[] = [
//         { id: todolistId1, title: 'What to learn', filter: 'all' },
//         { id: todolistId2, title: 'What to buy', filter: 'all' },
//     ]
//
//     // 2. Действие
//     // const action = {
//     //     type: 'REMOVE-TODOLIST',
//     //     payload: {
//     //         id: todolistId1,
//     //     },
//     // } as const
//
//     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
//
//     // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
//     // в массиве останется один тудулист
//     expect(endState.length).toBe(1)
//     // удалится нужный тудулист, а не любой
//     expect(endState[0].id).toBe(todolistId2)
// })
//
//
// test('correct todolist should be added', () => {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     const startState: TodolistType[] = [
//         { id: todolistId1, title: 'What to learn', filter: 'all' },
//         { id: todolistId2, title: 'What to buy', filter: 'all' },
//     ]
//
//     const action = {
//         type: 'ADD-TODOLIST',
//         payload: {
//             title: 'New Todolist',
//         },
//     } as const
//     const endState = todolistsReducer(startState, addTodolistAC('New Todolist'));
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe(action.payload.title)
// })
//
// test('correct todolist should change its name', () => {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     const startState: TodolistType[] = [
//         { id: todolistId1, title: 'What to learn', filter: 'all' },
//         { id: todolistId2, title: 'What to buy', filter: 'all' },
//     ]
//
//     const action = {
//         type: 'CHANGE-TODOLIST-TITLE',
//         payload: {
//             id: todolistId2,
//             title: 'New Todolist',
//         },
//     } as const
//     const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'New Todolist'))
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(action.payload.title)
// })
//
// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     const startState: TodolistType[] = [
//         { id: todolistId1, title: 'What to learn', filter: 'all' },
//         { id: todolistId2, title: 'What to buy', filter: 'all' },
//     ]
//
//     const action: ChangeTodolistFilterActionType = {
//         type: 'CHANGE-TODOLIST-FILTER',
//         payload: {
//             id: todolistId2,
//             filter: 'completed',
//         },
//     }
//     const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(action.payload.filter)
// })