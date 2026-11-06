import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import NoteCard from '../components/NoteCard'
import NoteNotFound from '../components/NoteNotFound'
import {api} from '../lib/axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { LoaderIcon } from 'lucide-react'

const Home = () => {
  
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error while fetching notes");
        if(error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false);
      }
    } 

    fetchNotes();
  },[]);

  if(loading) {
    return (
      <div>
        <Navbar />
        <div className="main-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className='animate-spin size-10' />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimited />}

      <div className="mx-auto p-4 max-w-7xl">
          {notes.length === 0 && !isRateLimited && <NoteNotFound />}
          {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default Home
