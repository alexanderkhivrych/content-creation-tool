import {
  useState,
  useDeferredValue,
  useCallback,
  ChangeEvent,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { skipToken, useQuery } from '@tanstack/react-query';
import { ImageInfo } from '../../types/image';
import { getImageInfo } from '../../api/images-service';
import { ImageEditPreview } from './components/image-edit-preview';
import ErrorPage from '../../components/error-page';
import { setImageInfoToPersistance } from '../../persistence/images';
import { buildUrlWithQueryParams } from '../../utils/build-url-with-query-params/build-url-with-query-params';
import { parseQueryParams } from '../../utils/parse-query-params/parse-query-params';
import {
  AiSuggestionApiResponse,
  getAiSuggestions,
} from '../../api/ai-service';
import { AiSummary } from './components/ai-summary';

const MIN_SIZE = 1;
const MAX_SIZE = 10000;

export const ImageEditPage = () => {
  const { id } = useParams();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [grayscale, setGreyScale] = useState(false);
  const [blur, setBlur] = useState(0);

  const deferredWidth = useDeferredValue(width);
  const deferredHeight = useDeferredValue(height);
  const deferredBlur = useDeferredValue(blur);
  const deferredGreyScale = useDeferredValue(grayscale);

  const { data, isLoading, isError } = useQuery<ImageInfo>({
    queryKey: ['images', id],
    retry: 0,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!id) {
        throw new Error('No image');
      }
      const imageInfo = await getImageInfo(id);

      setWidth(imageInfo.width);
      setHeight(imageInfo.height);

      const params = parseQueryParams<{
        blur: number;
        grayscale: boolean;
      }>(imageInfo.download_url);

      setGreyScale(!!params.grayscale || false);
      setBlur(params.blur || 0);

      return imageInfo;
    },
  });

  const {
    data: aiSummary,
    isLoading: isLoadingAiSummary,
    isError: isAiSummaryError,
  } = useQuery<AiSuggestionApiResponse>({
    queryKey: ['aiSummary', data?.download_url],
    retry: 0,
    refetchOnWindowFocus: false,
    queryFn: data?.download_url
      ? async () => {
          const res = await getAiSuggestions(data?.download_url);

          return res;
        }
      : skipToken,
  });

  const handleWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);

    if (newWidth <= MAX_SIZE && newWidth >= MIN_SIZE) {
      setWidth(newWidth);
    }
  }, []);

  const handleHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value, 10);

    if (newHeight <= MAX_SIZE && newHeight >= MIN_SIZE) {
      setHeight(newHeight);
    }
  }, []);

  const handleBlurChange = (_: Event, newBlur: number | number[]) => {
    if (typeof newBlur === 'number') {
      setBlur(newBlur);
    }
  };

  const handleGrayScaleChange = useCallback(() => {
    setGreyScale((newGrayScale) => !newGrayScale);
  }, []);

  const downloadUrl = buildUrlWithQueryParams(
    `https://picsum.photos/id/${id}/${width}/${height}`,
    { grayscale, blur }
  );

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = `image-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image', error);
    }
  }, [downloadUrl, id]);

  useEffect(() => {
    if (data && width && height) {
      setImageInfoToPersistance({
        ...data,
        download_url: downloadUrl,
        width,
        height,
      });
    }
  }, [blur, data, grayscale, height, id, width, downloadUrl]);

  if (isError) return <ErrorPage />;

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: 2,
        padding: 1,
      }}
    >
      <Typography variant="h1" gutterBottom>
        Edit Image
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8} sx={{ maxHeight: '100%' }}>
          <ImageEditPreview
            width={deferredWidth}
            height={deferredHeight}
            isLoading={isLoading}
            grayscale={deferredGreyScale}
            blur={deferredBlur}
            imageUrl={
              data
                ? `https://picsum.photos/id/${id}/${data.width}/${data.height}`
                : undefined
            }
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} sx={{ maxHeight: '100%' }}>
          <Card
            sx={{
              maxHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Width"
                  type="number"
                  InputProps={{ inputProps: { min: MIN_SIZE, max: MAX_SIZE } }}
                  value={width}
                  disabled={isLoading}
                  onChange={handleWidthChange}
                  fullWidth
                />
                <TextField
                  label="Height"
                  type="number"
                  value={height}
                  InputProps={{ inputProps: { min: MIN_SIZE, max: MAX_SIZE } }}
                  disabled={isLoading}
                  onChange={handleHeightChange}
                  fullWidth
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>Grayscale</Typography>
                  <Switch
                    checked={grayscale}
                    disabled={isLoading}
                    onChange={handleGrayScaleChange}
                  />
                </Box>
                <Box>
                  <Typography>Blur</Typography>
                  <Slider
                    value={blur}
                    onChange={handleBlurChange}
                    aria-labelledby="blur-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    disabled={isLoading}
                    marks
                    min={0}
                    max={10}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleDownload}
                  disabled={isLoading}
                >
                  Download
                </Button>
                <AiSummary
                  isLoading={isLoadingAiSummary && !isAiSummaryError}
                  aiSummary={aiSummary?.summary}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
