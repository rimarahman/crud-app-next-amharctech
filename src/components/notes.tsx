import React, { useState } from "react";
import { Flex, Text, Card, Avatar, Box } from "@radix-ui/themes";
import useNotes from "@/hooks/notes";

export default function Notes() {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { notes: notesData } = useNotes();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(notesData.length / itemsPerPage);

  const visibleNotes = notesData.slice(startIndex, endIndex);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box mt="6">
      {visibleNotes.map((note, index) => (
        <Box m="auto" className=" w-4/6" key={index}>
          <Card className="relative" mt="3" mb="3" style={{ padding: "10px" }}>
            <Flex gap="3">
              <Avatar
                size="3"
                src={undefined}
                radius="full"
                fallback="N"
                className="mt-1"
              />
              <Box>
                <Text as="div" size="6" weight="bold" mb="3">
                  {note.title}
                </Text>
                <Text as="div" size="2">
                  {note.content}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      ))}
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
  );
}
