type RequestBody = {
  question: string;
};

type SuccessResponseBody = {
  answer: string;
};

type ErrorResponseBody = {
  message: string;
};

type Model = "text-davinci-003" | "code-davinci-002";
