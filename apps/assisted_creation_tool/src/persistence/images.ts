import { ImageInfo, isImageInfo } from '../types/image';

const LOCAL_STORAGE_PREFIX = 'image-';
export const setImageInfoToPersistance = (imageInfo: ImageInfo) => {
  localStorage.setItem(
    `${LOCAL_STORAGE_PREFIX}${imageInfo.id}`,
    JSON.stringify(imageInfo)
  );
};

export const getImageInfoFromPersistance = (id: string): ImageInfo | null => {
  const result = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`);

  if (!result) {
    return null;
  }

  try {
    const parsedImageInfo = JSON.parse(result);
    if (isImageInfo(parsedImageInfo)) {
      return parsedImageInfo;
    }
  } catch (error) {
    console.error('Error parsing image info from persistance', error);
  }

  return null;
};
