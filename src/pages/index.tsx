import Notes from "@/components/notes";
import Navbar from "@/components/navBar";
import { Box } from "@radix-ui/themes";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <main className=" overflow-y-auto min-h-screen">
        <Notes />
      </main>
    </Box>
  );
}
