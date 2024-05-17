import { z } from 'zod';

export const imageInfoSchema = z.object({
  id: z.string(),
  author: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  download_url: z.string(),
});

export type ImageInfo = z.infer<typeof imageInfoSchema>;

export const isImageInfo = (image: unknown): image is Image =>
  imageInfoSchema.safeParse(image).success;
