// import Image from 'next/image';

import Container from "@/components/Container/Container";

export default function Home() {
  return (
    <main className="flex-1 py-8">
     <Container>
        {/* <div className="w-[90%] max-w-7xl mx-auto px-4 pt-0 pb-4"> */}
        <div>
          <h1 className="text-4xl font-bold text-center text-[#1a1a1a] mb-15">Welcome to NoteHub</h1>
          <p className="text-[18px] text-[#444444]leading-7 mb-4">
            NoteHub is a simple and efficient application designed for managing personal notes. It
            helps keep your thoughts organized and accessible in one place, whether you are at home or
            on the go
          </p>
          <p className="text-[18px] text-[#444444] leading-7 mb-4">
            The app provides a clean interface for writing, editing, and browsing notes. With support
            for keyword search and structured organization, NoteHub offers a streamlined experience
            for anyone who values clarity and productivity.
          </p>
        </div>
     </Container>
    </main>
  );
}
