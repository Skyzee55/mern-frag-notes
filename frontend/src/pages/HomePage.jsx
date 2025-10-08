import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi'
import toast from "react-hot-toast"
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotFoundPage from './NotFoundPage'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const res = await api.get("/notes/all")
        console.log(res.data)
        setNotes(res.data)
      } catch (error) {
        console.log("Error Fetching Notes")
        if(error.response.status === 429) {
          setIsRateLimited(true)
        }else {
          toast.error("Failed Load Notes")
        }
      }finally{
        setLoading(false)
      }
    }

    fetchNotes()
  },[])
  return (
    <div className='min-h-screen'>
        <Navbar/>

        {isRateLimited && <RateLimitedUi/> }
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

          {notes.length === 0 && !isRateLimited && <NotFoundPage/>}

          {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard note={note} key={note._id} setNotes={setNotes}/>
            ))}
          </div>
          )}
        </div>
    </div>
  )
}

export default HomePage

// 2:8:21