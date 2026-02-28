import React, { useEffect, useState } from 'react'

const NoteModal = ({ isOpen, onClose, onSubmit, editNote }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title)
      setContent(editNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [editNote, isOpen])

  const handleSubmit = () => {
    if (!title || !content) return
    onSubmit(title, content)
    setTitle('')
    setContent('')
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4'>
      <div className='bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-indigo-300'>
        
        <h2 className='text-xl sm:text-2xl font-semibold text-white text-center mb-5 sm:mb-6'>
          {editNote ? 'Update Note' : 'Add Note'}
        </h2>

        <div className='mb-4 flex items-center gap-3 w-full px-4 sm:px-5 py-2.5 rounded-full bg-[#333A5C] focus-within:ring-2 focus-within:ring-indigo-500'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='bg-transparent outline-none text-white w-full text-sm sm:text-base'
            type='text'
            placeholder='Note Title'
          />
        </div>

        <div className='mb-5 sm:mb-6 flex gap-3 w-full px-4 sm:px-5 py-3 rounded-2xl bg-[#333A5C] focus-within:ring-2 focus-within:ring-indigo-500'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='bg-transparent outline-none text-white w-full resize-none h-28 sm:h-32 text-sm sm:text-base'
            placeholder='Note Content'
          />
        </div>

        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='w-full py-2 sm:py-2.5 text-sm sm:text-base rounded-full border border-slate-600 text-gray-400 hover:bg-slate-800 transition-all duration-300 cursor-pointer'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='w-full py-2 sm:py-2.5 text-sm sm:text-base rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:from-indigo-600 hover:to-indigo-950 transition-all duration-300 cursor-pointer'
          >
            {editNote ? 'Update' : 'Add Note'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default NoteModal