import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import {api} from '../lib/axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'react-hot-toast'

const Edit = () => {
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!note.title.trim() || !note.body.trim()) {
      toast.error("Titles or Body cannot be blank");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {title: note.title, body:note.body});
      toast.success("Edited successfully");
      navigate("/");
    } catch (error) {
      console.log("Error on note update:", error);
      toast.error("Failed to edit note!");
    } finally {
      setSaving(false);
    }
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
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="title" className='label block'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text"
                    placeholder='Note Title'
                    id='title'
                    value={note.title}
                    className='input w-full input-bordered'
                    onChange={(e) => setNote({...note, title: e.target.value})}
                  />
                </div>
                
                <div className="form-control mb-4">
                  <label htmlFor="body" className='label block'>
                    <span className='label-text'>Body</span>
                  </label>
                  <textarea
                    placeholder='Write your note here...'
                    id='body'
                    value={note.body}
                    className='textarea w-full textarea-bordered h-32'
                    onChange={(e) => setNote({...note, body: e.target.value})}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn hover:bg-amber-800 hover:text-[#ece3ca]' disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default Edit
