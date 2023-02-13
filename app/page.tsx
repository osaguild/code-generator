"use client";
import { SimpleGrid } from "@chakra-ui/react";
import { AiComponent } from "@/components/AiComponent";
import { DeeplComponent } from "@/components/DeeplComponent";


export default function Home() {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <AiComponent />
      <DeeplComponent/>
    </SimpleGrid>
  );
}
