type RequestBody = {
  completionName: string;
  message: string;
};

type ResponseBody = {
  message: string;
};

type Model = "text-davinci-003" | "code-davinci-002";

type Completion = {
  name: string;
  description: string;
  model: Model;
  temperature: number;
  prompt: string;
};
