import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import InfoCard from "@/components/InfoCard";
import { getAllBooks } from "@/modules/fetch";
import { SimpleGrid } from "@chakra-ui/react";

// CSR
export default function Homepage() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const { books } = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Layout>
      <SimpleGrid columns={2} spacing={3} justifyContent="center" m={6}>
        {books?.map((book, idx) => (
          <InfoCard key={idx} {...book} />
        ))}
      </SimpleGrid>
    </Layout>
  );
}
