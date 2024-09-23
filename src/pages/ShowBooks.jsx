import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBooks = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => {
        setBook(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
<div className='p-6 bg-gray-100 min-h-screen'>
  <BackButton />
  <h1 className='text-4xl font-bold my-6 text-center text-sky-600'>Show Book</h1>
  {loading ? (
    <Spinner />
  ) : (
    <div className='flex flex-col border-2 border-sky-400 rounded-lg shadow-lg w-fit mx-auto p-6 bg-white'>
      <div className='my-4'>
        <span className='text-lg font-semibold text-gray-700'>Id:</span>
        <span className='text-lg text-gray-900 ml-2'>{book.id}</span>
      </div>
      <div className='my-4'>
        <span className='text-lg font-semibold text-gray-700'>Title:</span>
        <span className='text-lg text-gray-900 ml-2'>{book.title}</span>
      </div>
      <div className='my-4'>
        <span className='text-lg font-semibold text-gray-700'>Author:</span>
        <span className='text-lg text-gray-900 ml-2'>{book.author}</span>
      </div>
      <div className='my-4'>
        <span className='text-lg font-semibold text-gray-700'>Publish Year:</span>
        <span className='text-lg text-gray-900 ml-2'>                        
                          {new Date(book.publishYear).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
      </div>
    </div>
  )}
</div>

  )
}

export default ShowBooks