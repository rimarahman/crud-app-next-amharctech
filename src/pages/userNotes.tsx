import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Card,
  Avatar,
  Box,
  Dialog,
  Button,
} from "@radix-ui/themes";
import useNotes from "@/hooks/notes";
import { useSession } from "next-auth/react";
import { Note } from "@/ts/interfaces";
import Navbar from "@/components/navBar";
import { useRouter } from "next/router";

export default function UserNotes() {
  const { data: session, status } = useSession();

  const {
    updateExistingNote: updateNote,
    createNewNote: createNote,
    deleteExistingNote: deleteNote,
  } = useNotes();
  const router = useRouter();
  const [editingNoteId, setEditingNoteId] = useState<number>();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<Note>();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");

  const { notes: notesData } = useNotes();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(notesData.length / itemsPerPage);

  const visibleNotes = notesData.slice(startIndex, endIndex);

  useEffect(() => {
    if (status==="unauthenticated") {
      router.push("/login");
    }
  });

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (note: any) => {
    setEditingNoteId(note.id);
    setEditedTitle(note.title);
    setEditedDescription(note.content);
    setPopupVisible(true);
  };
  const handleCreateClick = () => {
    setIsCreating(true);
    setPopupVisible(true);
  };
  const handleSaveClick = () => {
    const updatedNote: Note = {
      id: editingNoteId,
      title: editedTitle,
      content: editedDescription,
    };
    isCreating ? createNote(updatedNote) : updateNote(updatedNote);
    setIsCreating(false);
    setPopupVisible(false);
    setEditingNoteId(undefined);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleCancelClick = () => {
    setIsCreating(false);
    setPopupVisible(false);
    setEditingNoteId(undefined);
    setEditedTitle("");
    setEditedDescription("");
  };
  const handleDeleteClick = (note: any) => {
    setNoteToDelete(note);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (noteToDelete) {
      deleteNote(Number(noteToDelete.id));
      setNoteToDelete(undefined);
      setShowDeleteDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setNoteToDelete(undefined);
    setShowDeleteDialog(false);
  };
  console.log("status", status);
  return status === ("loading" || "unauthenticated") ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
    </div>
  ) : (
    <Box>
      <Navbar />
      <Box mt="6" className="overflow-y-auto min-h-screen">
        <Box className="w-4/6 m-auto h-9 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="absolute  right-0 w-8 cursor-pointer"
            onClick={() => handleCreateClick()}
          >
            <path
              d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
              fill="blue"
            ></path>
          </svg>
        </Box>
        {visibleNotes.map((note, index) => (
          <Box m="auto" className=" w-4/6" key={index}>
            <Card
              className="relative"
              mt="3"
              mb="3"
              style={{ padding: "10px" }}
            >
              <Flex gap="3">
                <Avatar
                  size="3"
                  src={session?.user?.image || undefined}
                  radius="full"
                  fallback="N"
                  className="mt-1"
                />
                <Box>
                  <Flex className={`items-center gap-6`} justify="between">
                    <Text as="div" size="6" weight="bold" mb="3">
                      {note.title}
                    </Text>
                    <Flex>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="absolute top-2 right-9 cursor-pointer mt-2"
                        onClick={() => handleDeleteClick(note)}
                      >
                        {" "}
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                          fill="red"
                        ></path>{" "}
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          fill="red"
                        ></path>{" "}
                      </svg>
                      <Dialog.Root open={showDeleteDialog}>
                        <Dialog.Content>
                          <Dialog.Title>Delete Note</Dialog.Title>
                          <Dialog.Description>
                            Are you sure you want to delete this note?
                          </Dialog.Description>
                          <Flex gap="3" mt="4" justify="end">
                            <Button
                              variant="soft"
                              color="gray"
                              onClick={handleCancelDelete}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirm}>
                              Delete
                            </Button>
                          </Flex>
                        </Dialog.Content>
                      </Dialog.Root>
                      <div className="absolute top-2 right-2 cursor-pointer mt-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleEditClick(note)}
                        >
                          <path
                            d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </Flex>
                  </Flex>
                  <Text as="div" size="2">
                    {note.content}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        ))}

        <Dialog.Root open={popupVisible}>
          <Dialog.Content>
            {isCreating && (
              <input
                type="number"
                placeholder="Enter Id"
                value={editingNoteId}
                onChange={(e) => setEditingNoteId(Number(e.target.value))}
                className="block w-full p-2 mb-2 border rounded"
              />
            )}
            <input
              type="text"
              placeholder={isCreating ? "Enter Title" : "Edit Title"}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="block w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder={isCreating ? "Enter Content" : "Edit Content"}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 mb-2 border rounded h-60"
              rows={4}
            />
            <Flex gap="3" mt="4" justify="end">
              <Button onClick={() => handleSaveClick()}>Save</Button>
              <Button
                onClick={() => handleCancelClick()}
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        <div className="flex justify-center mt-4 mb-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePagination(i + 1)}
              className={`mx-1 py-1 px-3 rounded-full ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Box>
    </Box>
  );
}
