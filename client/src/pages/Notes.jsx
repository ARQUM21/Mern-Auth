import React, { useContext, useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { MdAdd } from 'react-icons/md'

const Notes = () => {
  const { notes, notesLoading, getNotes, addNote, deleteNote, updateNote } = useContext(AppContent)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editNote, setEditNote] = useState(null)

  useEffect(() => {
    getNotes()
  }, [])

  const handleAddOrUpdate = async (title, content) => {
    if (editNote) {
      const data = await updateNote(editNote._id, title, content)
      if (data?.success) {
        toast.success('Note updated successfully!')
      } else {
        toast.error('Failed to update note')
      }
    } else {
      const data = await addNote(title, content)
      if (data?.success) {
        toast.success('Note added successfully!')
      } else {
        toast.error('Failed to add note')
      }
    }
    setIsModalOpen(false)
    setEditNote(null)
  }

  const handleDelete = async (id) => {
    const data = await deleteNote(id)
    if (data?.success) {
      toast.success('Note deleted successfully!')
    } else {
      toast.error('Failed to delete note')
    }
  }

  const handleEdit = (note) => {
    setEditNote(note)
    setIsModalOpen(true)
  }

  const handleOpenModal = () => {
    setEditNote(null)
    setIsModalOpen(true)
  }

  return (
    <div className='min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>

      <div className='pt-6 sm:pt-8 px-4 sm:px-10 md:px-16 pb-10'>

        {/* Header */}
        <div className='flex justify-between items-center mb-6 sm:mb-8'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800'>My Notes</h1>
          <button
            onClick={handleOpenModal}
            className='flex items-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-4 sm:px-6 text-sm sm:text-base rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:from-indigo-600 hover:to-indigo-950 transition-all duration-300 cursor-pointer'
          >
            <MdAdd size={18} />
            <span className='hidden sm:inline'>Add Note</span>
            <span className='inline sm:hidden'>Add</span>
          </button>
        </div>

        {/* Loading */}
        {notesLoading && (
          <div className='flex justify-center items-center mt-20'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        {/* No Notes */}
        {!notesLoading && notes.length === 0 && (
          <div className='flex flex-col items-center justify-center mt-20 text-slate-700'>
            <p className='text-lg sm:text-xl font-medium'>No notes yet!</p>
            <p className='text-xs sm:text-sm mt-2 text-center'>Click "Add Note" to create your first note</p>
          </div>
        )}

        {/* Notes Grid */}
        {!notesLoading && notes.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditNote(null) }}
        onSubmit={handleAddOrUpdate}
        editNote={editNote}
      />

    </div>
  )
}

export default Notes