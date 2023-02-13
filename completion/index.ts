import { CreateCompletionRequest } from "openai";

export const generateCompletion = (completionName: string, message: string): CreateCompletionRequest => {
  const completion = supportedCompletions.find((e) => e.name === completionName);
  if (completion === undefined) {
    throw new Error(`Completion ${name} is not supported`);
  }

  let prompt: string;
  if (completion.name === "animal") {
    const capitalizedAnimal = message[0].toUpperCase() + message.slice(1).toLowerCase();
    prompt = completion.prompt.replace("{message}", capitalizedAnimal);
  } else {
    prompt = completion.prompt.replace("{message}", message);
  }

  return {
    model: completion.model,
    prompt,
    temperature: completion.temperature,
  };
};

export const supportedCompletions: Completion[] = [
  {
    name: "animal",
    description: "Suggest three names for an animal that is a superhero",
    model: "text-davinci-003",
    temperature: 0.6,
    prompt:
      "Suggest three names for an animal that is a superhero.\n\nAnimal: Cat\nNames: Captain Sharpclaw, Agent Fluffball, The Incredible Feline\nAnimal: Dog\nNames: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot\nAnimal: {message}\nNames:",
  },
  {
    name: "hoge",
    description: "hoge",
    model: "text-davinci-003",
    temperature: 1,
    prompt: "hoge {message} hoge",
  },
];
