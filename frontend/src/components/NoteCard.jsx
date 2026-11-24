import { SquarePenIcon, TrashIcon } from 'lucide-react'
import {api} from "../lib/axios"
import {toast} from 'react-hot-toast'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'

const NoteCard = ({note , setNotes}) => {

    const handleDelete = async (event, id) => {
        event.preventDefault();

        // confirm using window confirm check
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(n => n._id !== id));
            toast.success("Deleted Successfully"); 
        } catch (error) {
            console.log("Error deleting note", error);
            toast.error("Cannot delete note.");
        }
    }

    return (
        <Link to={`/notes/${note._id}`}>
            <div className="card bg-base-100 w-full sm:w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">
                    <span className='truncate min-w-0'>{note.title}</span>
                    <div className="badge badge-secondary">{formatDate(note.updatedAt)}</div>
                    </h2>
                    <p className='line-clamp-4'>{note.body}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/notes/${note._id}/edit`} className='btn btn-ghost btn-xs'>
                            <SquarePenIcon className='size-4' />
                        </Link>
                        <button className='btn btn-ghost btn-xs text-error hover:bg-error hover:text-[#ece3ca]' onClick={(e) => handleDelete(e, note._id)}>
                            <TrashIcon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard
