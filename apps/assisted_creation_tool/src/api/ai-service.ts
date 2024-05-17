import { z } from 'zod';
import axios from 'axios';

export const aiSuggestionResponse = z.object({
  summary: z.string(),
});

export type AiSuggestionApiResponse = z.infer<typeof aiSuggestionResponse>;

export const isValidAiSuggestionResponse = (
  response: unknown
): response is AiSuggestionApiResponse =>
  aiSuggestionResponse.safeParse(response).success;

const API_URL = '/api';

export const getAiSuggestions = async (imageUrl: string) => {
  const response = await axios.get(
    `${API_URL}/ai-image-summary?imageUrl=${encodeURIComponent(imageUrl)}`
  );

  if (!isValidAiSuggestionResponse(response.data)) {
    throw new Error('Invalid response');
  }

  return response.data;
};
