import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { Note } from "@/ts/interfaces";
import { API_URL } from "@/variables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const response: AxiosResponse<Note[]> = await axios.get(
          `${API_URL}/notes`
        );
        const notes = response.data;
        res.status(200).json(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Unable to fetch notes" });
      }
      break;

    case "POST":
      const { title, content } = req.body;
      const newNote: Note = { title, content };

      try {
        const response: AxiosResponse<Note> = await axios.post(
          `${API_URL}/notes`,
          newNote
        );
        const addedNote = response.data;
        res.status(201).json(addedNote);
      } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Unable to add note" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
