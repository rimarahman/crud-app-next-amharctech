import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import notesSlice, { addNote, updateNote, deleteNote } from '../redux/notesSlice';

import * as noteService from '../lib/noteServices';
import { Note } from '../ts/interfaces';

const useNotes = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Fetch all notes using React Query
  const { data: notes = [], isLoading, isError } = useQuery<Note[]>(
    'notes',
    noteService.getAllNotes
  );

  const createNoteMutation = useMutation(
    noteService.addNote,
    {
      onSuccess: (newNote) => {
        // Dispatch the addNote action from the notesSlice
        dispatch(addNote(newNote));
        queryClient.invalidateQueries('notes');
      },
      onError: (error) => {
        // Handle error if needed
      },
    }
  );

  const updateNoteMutation = useMutation(
    noteService.updateNote,
    {
      onSuccess: (updatedNote) => {
        dispatch(updateNote(updatedNote));
        queryClient.invalidateQueries('notes');
      },
      onError: (error) => {
      },
    }
  );

  const deleteNoteMutation = useMutation(
    noteService.deleteNote,
    {
      onSuccess: (deletedNoteId) => {
        dispatch(deleteNote(deletedNoteId));
        queryClient.invalidateQueries('notes');
      },
      onError: (error) => {
        // Handle error if needed
      },
    }
  );

  const createNewNote = async (newNoteData: Note) => {
    await createNoteMutation.mutateAsync(newNoteData);
  };

  const updateExistingNote = async (updatedData: Note) => {
    await updateNoteMutation.mutateAsync({ id: updatedData.id, ...updatedData });
  };

  const deleteExistingNote = async (noteId: number) => {
    await deleteNoteMutation.mutateAsync(noteId);
  };

  return {
    notes,
    isLoading,
    isError,
    createNewNote,
    updateExistingNote,
    deleteExistingNote,
  };
};

export default useNotes;
