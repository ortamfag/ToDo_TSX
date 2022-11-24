import React from 'react'
import { ITask } from '../../Interfaces'
import './TodoTask.scss'

interface Props {
    task: ITask;
    completeTask(TaskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className='task'>
        <div className='task__content'>
            <span>{task.taskName}</span>
            <span>{task.deadline}</span>
        </div>

        <button onClick={() => {completeTask(task.taskName)}}>Выполнено</button>
    </div>
  )
}

export default TodoTask;