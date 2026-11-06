import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const AddNoteBtn = ({text}) => {
    return (
        <Link to={"/new"} className="btn btn-outline hover:bg-amber-800 hover:text-[#ece3ca]">
            <PlusIcon className="size-5" />
            <span>{text || "Add Note"}</span>
        </Link>
    )
}

export default AddNoteBtn
