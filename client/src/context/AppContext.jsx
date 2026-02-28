import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    const [notes, setNotes] = useState([])
    const [notesLoading, setNotesLoading] = useState(false)

    const getAuthState = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                await getUserData()
                await getNotes()
            }
        } catch (error) {   
            console.log("Auth check failed:", error.response?.data?.message || error.message) 
        }
    }
    
    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data')
            if (data.success) {
                setUserData(data.userData)
            } else {
                setUserData(false)  
            }
        } catch (error) {
            console.log("Error fetching user data:", error.message)    
        }
    }

    const getNotes = async () => {
        try {
            setNotesLoading(true)
            const { data } = await axios.get(backendUrl + '/api/notes/get')
            if (data.success) {
                setNotes(data.notes)
            }
        } catch (error) {
            console.log("Error fetching notes:", error.message)
        } finally {
            setNotesLoading(false)
        }
    }

    const addNote = async (title, content) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/notes/add', { title, content })
            if (data.success) {
                await getNotes()
            }
            return data
        } catch (error) {
            console.log("Error adding note:", error.message)
        }
    }

    const deleteNote = async (id) => {
        try {
            const { data } = await axios.delete(backendUrl + `/api/notes/delete/${id}`)
            if (data.success) {
                await getNotes()
            }
            return data
        } catch (error) {
            console.log("Error deleting note:", error.message)
        }
    }

    const updateNote = async (id, title, content) => {
        try {
            const { data } = await axios.put(backendUrl + `/api/notes/update/${id}`, { title, content })
            if (data.success) {
                await getNotes()
            }
            return data
        } catch (error) {
            console.log("Error updating note:", error.message)
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
       backendUrl,
       isLoggedin, setIsLoggedin,
       userData, setUserData,
       getUserData,
       notes, notesLoading,
       getNotes, addNote, deleteNote, updateNote
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}