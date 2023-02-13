type AiRequestBody = {
  completionName: string;
  message: string;
};

type DeeplRequestBody = {
  translationType: TranslationType;
  message: string;
};

type ResponseBody = {
  message: string;
};

type TranslationType = "en-ja" | "ja-en";

type Model = "text-davinci-003" | "code-davinci-002";

type Completion = {
  name: string;
  description: string;
  model: Model;
  temperature: number;
  prompt: string;
};
