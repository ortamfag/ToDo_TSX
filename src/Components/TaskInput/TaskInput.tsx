import React, { ChangeEvent } from 'react'
import './TaskInput.scss'

interface Props {
    task: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TaskInput({task, handleChange}: Props) {
  return (
    <input 
        className='task_input'
        type='text'
        name='Task'
        placeholder='Your task'
        value={task}
        onChange={handleChange}/>
  )
}

export default TaskInput