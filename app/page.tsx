"use client";
import { SimpleGrid } from "@chakra-ui/react";
import { AiComponent } from "../components/AiComponent";

export default function Home() {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <AiComponent />
    </SimpleGrid>
  );
}
