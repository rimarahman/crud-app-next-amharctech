import { Note } from "@/ts/interfaces";
import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3000/api";

export const getAllNotes = async (): Promise<Note[]> => {
  const response: AxiosResponse<Note[]> = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const addNote = async (note: Note): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(
    `${API_URL}/notes`,
    note
  );
  return response.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.put(
    `${API_URL}/notes/${note.id}`,
    note
  );
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<number> => {
  await axios.delete(`${API_URL}/notes/${noteId}`);
  return noteId;
};
