'use client';
import Todo from '@/Components/Todo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [todoData, setTodoDate] = useState([]);

  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoDate(response.data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({
      ...form,
      [name]: value,
    }));
    // console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // api
      const response = await axios.post('/api', formData);

      toast.success(response.data.msg);
      setFormData({
        title: '',
        description: '',
      });
      await fetchTodos();
    } catch (error) {
      toast.error('Error');
    }
  };
  return (
    <>
      <ToastContainer theme='dark' />
      <form
        onSubmit={onSubmitHandler}
        className='flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto'
      >
        <input
          value={formData.title}
          onChange={onChangeHandler}
          className='px-3 py-2 border-2 w-full'
          type='text'
          name='title'
          placeholder='Enter Title'
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          className='px-3 py-2 border-2 w-full'
          name='description'
          placeholder='Enter Description'
        ></textarea>
        <button className='bg-orange-600 py-3 px-11 text-white' type='submit'>
          Add Todo
        </button>
      </form>

      <div className='relative overflow-x-auto mt-24 w-[60%] mx-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Description
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  id={index}
                />
              );
            })}
            {/* <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo /> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
