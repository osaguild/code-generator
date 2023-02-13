import * as deepl from "deepl-node";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  const authKey = process.env.DEEPL_API_KEY;
  if (!authKey) {
    res.status(500).json({
      message: "DeepL API key not configured",
    });
    return;
  }

  const completionName = req.body.translationType || "";
  const message = req.body.message || "";
  if (completionName.trim().length === 0) {
    res.status(400).json({
      message: "Please select translation type",
    });
    return;
  } else if (message.trim().length === 0) {
    res.status(400).json({
      message: "Please enter message",
    });
    return;
  }

  try {
    const translator = new deepl.Translator(authKey);
    const sourceLang = completionName === "en-ja" ? "en" : "ja";
    const targetLang = completionName === "en-ja" ? "ja" : "en-US";
    const result = await translator.translateText<string>(message, sourceLang, targetLang);
    res.status(200).json({ message: result.text });
  } catch (e) {
    console.error(`Error with Deepl API request: ${e}`);
    res.status(500).json({
      message: "An error occurred during your request.",
    });
  }
}
