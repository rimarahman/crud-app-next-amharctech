import { Note } from "@/ts/interfaces";
import axios, { AxiosResponse } from "axios";

export const getAllNotes = async (): Promise<Note[]> => {
  const response: AxiosResponse<Note[]> = await axios.get(`api/notes`);
  return response.data;
};

export const addNote = async (note: Note): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(
    `api/notes`,
    note
  );
  return response.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.put(
    `api/notes/${note.id}`,
    note
  );
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<number> => {
  await axios.delete(`api/notes/${noteId}`);
  return noteId;
};
