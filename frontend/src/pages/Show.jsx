import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import {api} from '../lib/axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'react-hot-toast'
import { formatDate } from '../lib/utils'

const Show = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching node", error);
        toast.error("Failed to fetch the note.");
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id])

  if(loading) {
    return (
      <div className="main-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  const handleDelete = async () => {
        // confirm using window confirm check
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Deleted Successfully");
            navigate('/'); 
        } catch (error) {
            console.log("Error deleting note", error);
            toast.error("Cannot delete note.");
        }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-start justify-between mb-3'>
            <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-5' />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
                <h1 className='font-bold text-xl border-b-1 border-b-amber-900/25 pb-2'>{note.title}</h1>
                <h2 className='text-[1rem] pb-5 border-b-1 border-b-amber-900/10'>{note.body}</h2>
                <h3 className='font-md italic text-red-600'>Created At: {formatDate(note.createdAt, false)}</h3>
                <h3 className='font-md italic text-red-600'>Updated At: {formatDate(note.updatedAt, false)}</h3>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default Show