import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseBody | ErrorResponseBody>
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    res.status(500).json({
      message: "OpenAI API key not configured",
    });
    return;
  }

  const question = req.body.question || "";
  if (question.trim().length === 0) {
    res.status(400).json({
      message: "Please enter question",
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question),
      temperature: 0.6,
    });
    res.status(200).json({ answer: completion.data.choices[0].text! });
  } catch (e) {
    console.error(`Error with OpenAI API request: ${e}`);
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
}

function generatePrompt(question: string) {
  const capitalizedAnimal = question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
