import React, {FC, ChangeEvent, useState} from 'react';
import './App.scss'
import TaskInput from './Components/TaskInput/TaskInput';
import TodoTask from './Components/TodoTask/TodoTask';
import { ITask } from './Interfaces';

// interface IApp {
//   testFunc: (e:number) => void
// }

const App: FC = () => {

  const [task, setTask] = useState<string>('');
  const [deadline, setDeadLine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let typeNameEvent = event.currentTarget.name;
    let typeNameEventVal = event.currentTarget.value;

    switch(typeNameEvent){
      case 'Task':
        setTask(typeNameEventVal)
        break;
      case 'Deadline':
        setDeadLine(Number(typeNameEventVal))
        break;        
    }
  }

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline }
    setTodoList([...todoList, newTask])
    console.log(todoList)
    setTask("")
    setDeadLine(0)
  }

  const completeTask = (TaskNameToDelete: string) => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== TaskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <TaskInput task={task} inputName={'Task'} handleChange={handleChange}/>
          <TaskInput deadline={deadline} inputName={'Deadline'} handleChange={handleChange}/>
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
