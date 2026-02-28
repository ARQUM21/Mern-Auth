import noteModel from '../models/noteModel.js';

// Note Add Karo
export const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      return res.json({ success: false, message: "Title and Content are required" });
    }

    const note = new noteModel({
      user: userId,
      title,
      content
    });

    await note.save();
    res.json({ success: true, message: "Note added successfully!", note });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Sirf Logged In User Ke Notes Lao
export const getNotes = async (req, res) => {
  try {
    const userId = req.userId;

    const notes = await noteModel.find({ user: userId }).sort({ createdAt: -1 });

    res.json({ success: true, notes });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Note Delete Karo
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await noteModel.findById(id);

    if (!note) {
      return res.json({ success: false, message: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized! This note does not belong to you" });
    }

    await noteModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Note deleted successfully!" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Note Update Karo
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await noteModel.findById(id);

    if (!note) {
      return res.json({ success: false, message: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized! This note does not belong to you" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
    res.json({ success: true, message: "Note updated successfully!", note });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};