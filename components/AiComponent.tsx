"use client";
import { Textarea, Button, Container, RadioGroup, Stack, Radio, Text } from "@chakra-ui/react";
import { useState } from "react";
import { supportedCompletions } from "@/completion";

export const AiComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [completionName, setCompletionName] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const handleMessageChange = (message: string) => {
    const completion = supportedCompletions.find((e) => e.name === completionName)!;
    if (message.length === 0) {
      setPrompt(completion.prompt);
    } else {
      setPrompt(completion.prompt.replace("{message}", message));
    }
    setMessage(message);
  };

  const handleCompletionChange = (completionName: string) => {
    setCompletionName(completionName);
    const completion = supportedCompletions.find((e) => e.name === completionName)!;
    if (message.length === 0) {
      setPrompt(completion.prompt);
    } else {
      setPrompt(completion.prompt.replace("{message}", message));
    }
  };

  const submit = async () => {
    try {
      const requestBody: AiRequestBody = { completionName, message };
      const response = await fetch("/api/ai", {
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
      <RadioGroup onChange={handleCompletionChange} value={completionName}>
        <Stack direction="row">
          {supportedCompletions.map((e) => (
            <Radio key={e.name} value={e.name}>
              {e.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Textarea
        value={message}
        onChange={(e) => handleMessageChange(e.target.value)}
        placeholder="question"
        size="sm"
      />
      <Text>{prompt}</Text>
      <Button onClick={submit}>Submit</Button>
      <Textarea defaultValue={result} placeholder="answer" size="sm" />
    </Container>
  );
};
