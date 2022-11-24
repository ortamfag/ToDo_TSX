import React, {FC, ChangeEvent, useState} from 'react';
import './App.scss'
import TodoTask from './Components/TodoTask/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {

  const [task, setTask] = useState<string>('')
  const [deadline, setDeadLine] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) :void => {
    if (event.target.name === 'task') {
      setTask(event.target.value)
    } else if (event.target.name === 'deadline') {
      setDeadLine(Number(event.target.value))
    }


    setTask(event.target.value)
  }

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline }
    setTodoList([...todoList, newTask])
    console.log(todoList)
    setTask("")
    setDeadLine(0)
  }

  const completeTask = (TaskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== TaskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input type="text" placeholder='task' name='task' value={task} onChange={handleChange} />
          <input type="number" placeholder='deadline (in days)' name='deadline' value={deadline} onChange={handleChange}/>
        </div>
        <button onClick={addTask}>Add task</button>
      </div>
      <div className='todoList'>
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask}/>;
        })}
      </div>
    </div>
  );
}

export default App;
