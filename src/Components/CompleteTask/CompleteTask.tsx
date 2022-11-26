import React from 'react'
import { ITask } from '../../Interfaces'
import './CompleteTask.scss'

interface Props {
    task: ITask;
}

const TodoTask = ({ task }: Props) => {
  return (
    <div className='task'>
        <button className='task_check'>
          <svg className='task_complete__svg' width="26" height="26" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.9998 13.6L15.8998 7.69999C16.0831 7.51665 16.3165 7.42499 16.5998 7.42499C16.8831 7.42499 17.1165 7.51665 17.2998 7.69999C17.4831 7.88332 17.5748 8.11665 17.5748 8.39999C17.5748 8.68332 17.4831 8.91665 17.2998 9.09999L10.6998 15.7C10.4998 15.9 10.2665 16 9.9998 16C9.73314 16 9.4998 15.9 9.2998 15.7L6.6998 13.1C6.51647 12.9167 6.4248 12.6833 6.4248 12.4C6.4248 12.1167 6.51647 11.8833 6.6998 11.7C6.88314 11.5167 7.11647 11.425 7.3998 11.425C7.68314 11.425 7.91647 11.5167 8.0998 11.7L9.9998 13.6Z" fill="white"/>
          </svg>
        </button>

        <div className='task_content'>
            <span><s>{task.taskName}</s></span>
            <span><s>{task.deadline} days</s></span>
        </div>
    </div>
  )
}

export default TodoTask;