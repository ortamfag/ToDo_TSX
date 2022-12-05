import React, { ChangeEvent, useState } from 'react';
import './App.scss';
import TaskInput from './Components/TaskInput/TaskInput';
import TodoTask from './Components/TodoTask/TodoTask';
import CompleteTask from './Components/CompleteTask/CompleteTask';
import DatePicker from './Components/DatePicker/DatePicker';

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [task, setTask] = useState<string>('');
    const [todoList, setTodoList] = useState<string[]>([]);
    const [completeList, setCompleteList] = useState<string[]>([]);

    const toggleModal = () => {
        setIsModalVisible((wasModalVisible) => !wasModalVisible);
    };

    // дата
    const todayDate = new Date();
    const dayOfDate = todayDate.getDate();
    const months: string[] = [
        'January', 'February',
        'March', 'April', 'May',
        'June', 'July', 'August',
        'September', 'October', 'November',
        'December'];
    const monthOfDate = todayDate.getMonth();
    const weekDayOfDate = todayDate.toLocaleString('en-En', {
        weekday: 'long',
    });
    const yearOfDate = todayDate.getFullYear();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const typeNameEventVal = event.currentTarget.value;
        setTask(typeNameEventVal);
    };

    const addTask = (): void => {
        if (task.length !== 0) {
            setTodoList([...todoList, task]);
            setTask('');
            toggleModal();
        } else {
            // eslint-disable-next-line no-alert
            alert("Task can't be empty");
        }
    };

    const completeTask = (TaskNameToDelete: string) => {
        setCompleteList([...completeList, TaskNameToDelete].reverse());
        setTodoList(
            todoList.filter((task) => task !== TaskNameToDelete),
        );
    };

    return (
        <div className="App">
            <nav className="nav">
                <div className="nav_active">
                    <img src="./img/dashboard.svg" alt="Dashboard icon" />
                    <p>Dashboard</p>
                </div>
            </nav>

            <main className="main">
                <div className={
                    isModalVisible === true ? 'input_modalWrapper input_modalWrapper__active' : 'input_modalWrapper'
                    }
                >
                    <div className="bg" onClick={toggleModal} />
                    <div className="input_modalWrapper__body">
                        <div className="input_modalWrapper__content">
                            <img onClick={toggleModal} src="./img/exit.svg" alt="Exit" />
                            <h2>Create a new task</h2>
                            <div className="input_container">
                                <TaskInput task={task} handleChange={handleChange} />
                                <p className="input_container__about">Choose the deadline date</p>
                                <DatePicker
                                    todayDate={todayDate}
                                    dayOfDate={dayOfDate}
                                    monthOfDate={monthOfDate}
                                    yearOfDate={yearOfDate}
                                    months={months}
                                />
                            </div>

                            <button type="button" onClick={addTask} className="addTask createTask">
                                <p>Create</p>
                            </button>
                        </div>
                    </div>
                </div>
                    <h1>{`Hello, today is ${dayOfDate} ${months[monthOfDate]}, ${weekDayOfDate}`}</h1>
                    <h2>
                        What are we going
                        <span className="title_span">ToDo</span>
                        ?
                    </h2>
                    <button type="button" onClick={toggleModal} className="addTask">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="black" />
                    </svg>

                    <p>Add a task</p>
                    </button>
                    <div className="todoList">
                        <h3>
                            Tasks -
                            {todoList.length}
                        </h3>
                        {todoList.map((task: string) => <TodoTask task={task} completeTask={completeTask} />)}
                    </div>
                    <div className="completeList">
                        <h3>
                            Complete tasks -
                            {completeList.length}
                        </h3>
                        {completeList.map((task: string) => <CompleteTask task={task} />)}
                    </div>
            </main>
        </div>
    );
};

export default App;
