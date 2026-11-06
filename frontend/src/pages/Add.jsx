import { ArrowLeftIcon } from 'lucide-react'
import {api} from '../lib/axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'

const Add = () => {
  
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        body
      })
      toast.success("Created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error on note creation:", error);
      if(error.response.status === 429) {
        toast.error("Too many requests", {
          duration: 4000,
          icon: "💀"
        });
      } else {
        toast.error("Failed to create note!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5' />
          Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="title" className='label block'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text"
                    placeholder='Note Title'
                    id='title'
                    value={title}
                    className='input w-full input-bordered'
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="form-control mb-4">
                  <label htmlFor="body" className='label block'>
                    <span className='label-text'>Body</span>
                  </label>
                  <textarea
                    placeholder='Write your note here...'
                    id='body'
                    value={body}
                    className='textarea w-full textarea-bordered h-32'
                    onChange={(e) => setBody(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn hover:bg-amber-800 hover:text-[#ece3ca]' disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
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

export default Add
