import { CreateCompletionRequest } from "openai";

export const generateCompletion = (completionName: string, message: string): CreateCompletionRequest => {
  const completion = supportedCompletions.find((e) => e.name === completionName);
  if (completion === undefined) {
    throw new Error(`Completion ${name} is not supported`);
  }

  const prompt =
    completion.name === "default"
      ? message
      : completion.name === "animal"
      ? completion.prompt.replace("{message}", message[0].toUpperCase() + message.slice(1).toLowerCase())
      : completion.prompt.replace("{message}", message);

  return {
    model: completion.model,
    prompt,
    temperature: completion.temperature,
    max_tokens: 1000,
  };
};

export const supportedCompletions: Completion[] = [
  {
    name: "default",
    description: "no template",
    model: "text-davinci-003",
    temperature: 0,
    prompt: "",
  },
  {
    name: "animal",
    description: "Suggest three names for an animal that is a superhero",
    model: "text-davinci-003",
    temperature: 0.6,
    prompt:
      "Suggest three names for an animal that is a superhero.\n\nAnimal: Cat\nNames: Captain Sharpclaw, Agent Fluffball, The Incredible Feline\nAnimal: Dog\nNames: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot\nAnimal: {message}\nNames:",
  },
];
