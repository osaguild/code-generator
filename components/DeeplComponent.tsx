"use client";
import { Textarea, Button, Container, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useState } from "react";

export const DeeplComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [translationType, setTranslationType] = useState<TranslationType>("en-ja");

  const submit = async () => {
    try {
      const requestBody: DeeplRequestBody = { translationType, message };
      const response = await fetch("/api/deepl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        const data: ResponseBody = await response.json();
        setResult(data.message);
      } else {
        const data: ResponseBody = await response.json();
        throw new Error(`Request failed with status ${response.status}, message: ${data.message}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <RadioGroup
        onChange={(e: TranslationType) => {
          setTranslationType(e);
        }}
        value={translationType}
      >
        <Stack direction="row">
          <Radio value="en-ja">en-ja</Radio>
          <Radio value="ja-en">ja-en</Radio>
        </Stack>
      </RadioGroup>
      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="question" size="sm" />
      <Button onClick={submit}>Submit</Button>
      <Textarea defaultValue={result} placeholder="answer" size="sm" />
    </Container>
  );
};
