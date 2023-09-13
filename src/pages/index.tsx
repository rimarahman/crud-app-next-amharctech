import Notes from "@/components/notes";
import Navbar from "@/components/navBar";
import { Box } from "@radix-ui/themes";
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <Box>
      <Navbar />
      <main className=" overflow-y-auto min-h-screen">
        <Notes />
      </main>
    </Box>
  );
}
