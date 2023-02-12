import { CreateCompletionRequest } from "openai";

export const generateAnimalCompletion = (animal: string): CreateCompletionRequest => {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  const model: Model = "text-davinci-003";
  const temperature = 0.6;
  const prompt =
    // rome-ignore lint/style/useTemplate: <explanation>
    "Suggest three names for an animal that is a superhero.\n\n" +
    "Animal: Cat\n" +
    "Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline\n" +
    "Animal: Dog\n" +
    "Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot\n" +
    `Animal: ${capitalizedAnimal}\n` +
    "Names:";

  return {
    model,
    prompt,
    temperature,
  };
};
