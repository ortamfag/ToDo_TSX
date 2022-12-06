import { ChangeEvent } from 'react';
import './TaskInput.scss';

interface Props {
    task: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TaskInput = ({ task, handleChange }: Props) => (
    <input
        className='task_input'
        type='text'
        name='Task'
        placeholder='Your task'
        value={task}
        onChange={handleChange}
    />
);

export default TaskInput;
