import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { Note } from '@/ts/interfaces';

const API_URL = 'http://localhost:3001';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const noteId = parseInt(req.query.id as string, 10);

  if (!isNaN(noteId)) {
    switch (req.method) {
      case 'PUT':
        try {
          const newNote: Note = { id: noteId, ...req.body };
          const response: AxiosResponse<Note> = await axios.put(`${API_URL}/notes/${noteId}`, newNote);
          const updatedNote = response.data;
          res.status(200).json(updatedNote);
        } catch (error) {
          res.status(500).json({ error: 'Could not update the note.' });
        }
        break;

      case 'DELETE':
        try {
          await axios.delete(`${API_URL}/notes/${noteId}`);
          res.status(204).end();
        } catch (error) {
          res.status(500).json({ error: 'Could not delete the note.' });
        }
        break;

      default:
        res.status(405).json({ error: 'Method not allowed.' });
        break;
    }
  } else {
    res.status(400).json({ error: 'Invalid note ID.' });
  }
}
