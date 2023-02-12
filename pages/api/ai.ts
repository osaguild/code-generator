import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateAnimalCompletion } from "@/core/completion/text/animal";

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
    const completion = await openai.createCompletion(generateAnimalCompletion(question));
    res.status(200).json({ answer: completion.data.choices[0].text! });
  } catch (e) {
    console.error(`Error with OpenAI API request: ${e}`);
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
}
