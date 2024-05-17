import { z } from 'zod';

import { axiosInstance } from '../config/axios';
import { ImageInfo, imageInfoSchema, isImageInfo } from '../types/image';
import { parseLinkHeader } from '../utils/parse-pagination-header/parse-pagination-header';
import { getImageInfoFromPersistance } from '../persistence/images';

export const imagesResponseSchema = z.array(imageInfoSchema);

export type ImagesApiResponse = z.infer<typeof imagesResponseSchema>;

export type ImageResponseWithPagination = {
  list: ImagesApiResponse;
  prevPage: number | null;
  nextPage: number | null;
};
export const isImageValidResponse = (
  imageResponse: unknown
): imageResponse is ImagesApiResponse =>
  imagesResponseSchema.safeParse(imageResponse).success;

const mergeWithPersistence = (imageInfo: ImageInfo) => {
  const persistanceValue = getImageInfoFromPersistance(imageInfo.id);

  if (persistanceValue) {
    return {
      ...imageInfo,
      ...persistanceValue,
    };
  }

  return imageInfo;
};

export const getImages = async ({
  limit = 20,
  page = 1,
}: {
  limit: number;
  page: number;
}) => {
  const response = await axiosInstance.get(
    `/v2/list?page=${page}&limit=${limit}`
  );

  if (!isImageValidResponse(response.data)) {
    throw new Error('Invalid response');
  }

  const { prev, next } = parseLinkHeader(response.headers['link']);

  return {
    list: response.data.map(mergeWithPersistence),
    prevPage: prev || null,
    nextPage: next || null,
  };
};

export const getImageInfo = async (id: string) => {
  const response = await axiosInstance.get(`/id/${id}/info`);

  if (!isImageInfo(response.data)) {
    throw new Error('Invalid response');
  }

  return mergeWithPersistence(response.data);
};
