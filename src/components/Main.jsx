import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../store/reducer/todoReducer';
import {getTodo} from '../store/reducer/todoReducer'

const Main = () => {
    const dispatch = useDispatch();

    const getTodoHandler = () => {
        dispatch(getTodo());
    }

    const isLoading = useSelector(state => state.todo.isLoading);
    const isError = useSelector(state => state.todo.isError);
    const todos = useSelector(state => state.todo.data);

  return (
    <div className='box'>
        <button onClick={getTodoHandler}>Get Todo</button>
        {!isLoading && todos.length < 1 && !isError && <p>Click button to get data.</p>}
        {isLoading && <p>Data is loading...</p>}
        {isError != "" && !isLoading && todos.length < 1 &&
            <p>Sorry, data not found!</p>
        }
        {!isLoading && isError == "" && 
            todos.map(todo => (
                <p>{todo.title}</p>
            ))    
        }
        

    </div>
  )
}

export default Main