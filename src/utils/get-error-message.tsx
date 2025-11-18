import type { AxiosError } from "axios";

export const getErrorMessage = (error: AxiosError): string => {
  if (!error.response)
    return "Oops! It seems you're offline. Please check your internet connection.";

  if (error.response.status === 404) {
    return "We couldn't find what you're looking for.";
  }

  if (error.response.status >= 500) {
    return "Something went wrong on our side. Please try again later.";
  }

  return error.message || "Oops! Something went wrong. Please try again.";
};
