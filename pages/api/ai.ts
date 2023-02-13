import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateCompletion } from "@/completion";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
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

  const completionName = req.body.completionName || "";
  const message = req.body.message || "";
  if (completionName.trim().length === 0) {
    res.status(400).json({
      message: "Please select completion",
    });
    return;
  } else if (message.trim().length === 0) {
    res.status(400).json({
      message: "Please enter message",
    });
    return;
  }

  try {
    const completion = await openai.createCompletion(generateCompletion(completionName, message));
    res.status(200).json({ message: completion.data.choices[0].text! });
  } catch (e) {
    console.error(`Error with OpenAI API request: ${e}`);
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
}
