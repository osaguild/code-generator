"use client";
import { Textarea, Button, Container } from "@chakra-ui/react";
import { useState } from "react";

export default function AiComponent() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleChange = (text: string) => {
    setQuestion(text);
  };

  const submit = async () => {
    try {
      const requestBody: RequestBody = { question: question };
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        const data: SuccessResponseBody = await response.json();
        setAnswer(data.answer);
      } else {
        const data: ErrorResponseBody = await response.json();
        throw new Error(`Request failed with status ${response.status}, message: ${data.message}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Textarea value={question} onChange={(e) => handleChange(e.target.value)} placeholder="question" size="sm" />
      <Button onClick={submit}>Submit</Button>
      <Textarea defaultValue={answer} placeholder="answer" size="sm" />
    </Container>
  );
}
