import React from 'react';
import Link from 'next/link';
import { Box } from '@radix-ui/themes';
import { useSession, signOut } from 'next-auth/react'

function Navbar() {
  const {data: session} = useSession();
  return (
    <nav className="bg-blue-500 p-4 sticky top-0 z-50">
      <Box className="container mx-auto flex justify-between items-center">
        <Box>
          <a href="/" className="text-white text-xl font-semibold">
            NOTES BOOK
          </a>
        </Box>
        <Box>
          {session ? <button className="bg-white text-blue-500 px-4 py-2 rounded-full mr-4" onClick={()=> signOut()}>Logout</button> : 
          <Link href="/login" legacyBehavior>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-full mr-4">Login</button>
          </Link>
          }
        </Box>

      </Box>
    </nav>
  );
}

export default Navbar;
