import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className='bg-slate-900 p-4 sm:p-5 rounded-lg shadow-lg text-indigo-300 flex flex-col gap-3 hover:shadow-indigo-500/20 hover:shadow-lg transition-all duration-300 w-full'>
      
      <h3 className='text-white font-semibold text-base sm:text-lg truncate'>{note.title}</h3>
      
      <p className='text-gray-400 text-xs sm:text-sm line-clamp-3'>{note.content}</p>
      
      <div className='flex justify-between items-center mt-auto pt-2 border-t border-slate-700'>
        <span className='text-xs text-green-500'>
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <div className='flex gap-2'>
          <button
            onClick={() => onEdit(note)}
            className='p-1.5 rounded-full hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer'
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className='p-1.5 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer'
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default NoteCard