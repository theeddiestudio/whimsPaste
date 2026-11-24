import { NotebookDotIcon } from 'lucide-react'
import AddNoteBtn from './AddNoteBtn'

const NoteNotFound = () => {
  return (
    <div className='mx-auto max-w-6xl px-4 mt-8'>
      <div className='w-full py-6 px-12 rounded-3xl flex items-center justify-center gap-9'>
        <div className='flex flex-col justify-center items-center'>
            <div className='rounded-xl bg-base-300 p-5 mb-3'>
              <NotebookDotIcon className='size-15' />
            </div>
            <h1 className='font-bold text-2xl font-mono tracking-tight'>No Notes Found</h1>
            <h2 className='text-md tracking-tighter mb-3'>Ready to create your first note?</h2>
            <AddNoteBtn text={"Add First Note"} />
        </div>
      </div>
    </div>
  )
}

export default NoteNotFound