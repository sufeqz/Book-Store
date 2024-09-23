import React from 'react'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateBooks = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState(new Date())
  const [loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  const handleSaveBook = () => {
    const data= {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
      .post('http://localhost:5000/books', data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('Failed to save book')
        console.log(error)
       })
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen flex flex-col items-center'>
      <BackButton />
      <h1 className='text-4xl font-semibold text-gray-800 my-4'>Create Book</h1>
      {loading ? (
        <Spinner />
      ) : null}
      <div className='flex flex-col bg-white border-2 border-sky-400 rounded-xl shadow-lg w-[600px] p-6 mx-auto'>
        <div className='my-4'>
          <label className='text-xl font-medium text-gray-600'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-sky-500 transition'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl font-medium text-gray-600'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-sky-500 transition'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl font-medium text-gray-600'>Publish Year</label>
          <DatePicker
            selected={publishYear}
            onChange={(date) => setPublishYear(date)}
            className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-sky-500 transition'
            placeholderText='Select a date'
          />
        </div>
        <div className='flex justify-center'>
          <button className='p-3 bg-sky-800 text-white font-semibold rounded-lg shadow hover:bg-sky-700 transition'
          onClick={handleSaveBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateBooks