import React, { ChangeEvent } from 'react'
import './TaskInput.scss'

interface Props {
    inputName: string;
    task?: string;
    deadline?: number;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TaskInput({inputName, task, deadline, handleChange}: Props) {
    let inputPlaceholder
    switch(inputName) {
        case 'Task':
            inputPlaceholder = 'Your task'
            break
        case 'Deadline':
            inputPlaceholder = 'Deadline (in days)'
    }
  return (
    <input 
        className='task_input'
        type={inputName === 'Task' ? 'text' : 'number'}
        name={inputName}
        placeholder={inputPlaceholder}
        value={inputName === 'Task' ? task : deadline}
        onChange={handleChange}/>
  )
}

export default TaskInput