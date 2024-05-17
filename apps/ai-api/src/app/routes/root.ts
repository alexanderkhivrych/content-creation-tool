import { FastifyInstance, FastifyRequest } from 'fastify';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-Lj6jvurTQjmOsJeGHkhtT3BlbkFJ5hLfiWeZ44JDQ96IFhqR',
}); // INFO: this my key for this demo

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/ai-image-summary',
    async function (
      req: FastifyRequest<{ Querystring: { imageUrl: string } }>
    ) {
      const imageUrl = req.query.imageUrl;

      if (!imageUrl) {
        throw new Error(`Image not found`);
      }
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant, to help disabled people edit images',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `
Provide short description for this image for people with disability who can not see, also include information that can be use-full for image editing
Response should follow this format:
##### Summary

A brief summary of the image

##### How can it be improved

A short list of bullet points explaining why this job is a good fit for the candidate
            `,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        temperature: 0,
        max_tokens: 3000,
        model: 'gpt-4o',
      });

      return {
        summary: completion.choices[0].message.content,
      };
    }
  );
}
