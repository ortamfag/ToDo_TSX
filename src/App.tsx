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
      <nav className="nav">
        <div className="nav_active">
          <img src="./img/dashboard.svg" alt="Dashboard icon" />
          <p>Dashboard</p>
        </div>
      </nav>

      <main className="main">
        <div className="inputContainer">
          <TaskInput
            task={task}
            inputName={"Task"}
            handleChange={handleChange}/>

          <TaskInput
            deadline={deadline}
            inputName={"Deadline"}
            handleChange={handleChange}/>
        </div>

        <button onClick={addTask} className='addTask'>
          <img src="./img/addTask.svg" alt="addTask"/>
          <p>Add a task</p>
        </button>
        
        <div className="todoList">
          {todoList.map((task: ITask, key: number) => {
            return (
              <TodoTask key={key} task={task} completeTask={completeTask} />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
