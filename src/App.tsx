import React, {FC, ChangeEvent, useState} from 'react';
import './App.scss'
import { ITask } from './Interfaces';
import TaskInput from './Components/TaskInput/TaskInput';
import TodoTask from './Components/TodoTask/TodoTask';
import CompleteTask from './Components/CompleteTask/CompleteTask';


const App: FC = () => {

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const [task, setTask] = useState<string>('');
	const [deadline, setDeadLine] = useState<number>(0);
	const [todoList, setTodoList] = useState<ITask[]>([]);
	const [completeList, setCompleteList] = useState<ITask[]>([]);

	const toggleModal = () => {
		setIsModalVisible(wasModalVisible => !wasModalVisible) 
	}

	//дата
	const todayDate = new Date()
	const dayOfDate = todayDate.getDate()
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const monthOfDate = todayDate.getMonth()
	const weekDayOfDate = todayDate.toLocaleString(
		'en-En', {weekday: 'long'}
	)

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
    	setTask("")
    	setDeadLine(0)
		toggleModal()
  	}

  	const completeTask = (TaskNameToDelete: string) => {
    	const completeTask = { taskName: TaskNameToDelete, deadline: deadline }
    	setCompleteList([...completeList, completeTask].reverse())

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
        		<div className={isModalVisible === true ? 'input_modalWrapper input_modalWrapper__active' : 'input_modalWrapper'}>
          			<div className='bg' onClick={toggleModal}></div>
					<div className='input_modalWrapper__body'>
						<div className='input_modalWrapper__content'>
							<img onClick={toggleModal} src="./img/exit.svg" alt="Exit" />
							<h2>Create a new task</h2>
							<div className="input_container">
								<TaskInput
									task={task}
									inputName={"Task"}
									handleChange={handleChange}/>

								<TaskInput
									deadline={deadline}
									inputName={"Deadline"}
									handleChange={handleChange}/>
							</div>

							<button onClick={addTask} className='addTask createTask'>
								<p>Create</p>
							</button>
						</div>
					</div>
				</div>
				
				<h1>{`Hello, today is ${dayOfDate} ${month[monthOfDate]}, ${weekDayOfDate}`}</h1>
				<h2>What are we going <span className='title_span'>ToDo</span>?</h2>

        		<button onClick={toggleModal} className='addTask'>
          			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            			<path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="black"/>
          			</svg>

          			<p>Add a task</p>
        		</button>
        
        		<div className="todoList">
          			<h3>Tasks - {todoList.length}</h3>
          			{todoList.map((task: ITask, key: number) => {
            			return (
              				<TodoTask key={key} task={task} completeTask={completeTask} />
            			);
          			})}
        		</div>

        		<div className='completeList'>
					<h3>Complete tasks - {completeList.length}</h3>
					{completeList.map((task: ITask, key: number) => {
						return (
							<CompleteTask key={key} task={task} />
						)
					})}
        		</div>
      		</main>
    	</div>
  	);
}

export default App;
