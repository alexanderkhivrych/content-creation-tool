import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import { StyledImageEditPreviewCanvas } from './styled-image-edit-preview-canvas';

export const ImageEditPreview = memo(
  ({
    width,
    height,
    grayscale,
    blur,
    imageUrl,
    isLoading,
  }: {
    isLoading: boolean;
    width: number;
    height: number;
    blur: number;
    imageUrl?: string;
    grayscale: boolean;
  }) => {
    const [isImageReady, setIsImageReady] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef(new Image());

    const drawImage = useCallback(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = width;
          canvas.height = height;

          const aspectRatio = imgRef.current.width / imgRef.current.height;
          const newAspectRatio = width / height;

          let drawWidth, drawHeight;
          if (aspectRatio > newAspectRatio) {
            drawWidth = height * aspectRatio;
            drawHeight = height;
          } else {
            drawWidth = width;
            drawHeight = width / aspectRatio;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.filter = `${grayscale ? 'grayscale(100%) ' : ''}blur(${blur}px)`;
          ctx.drawImage(
            imgRef.current,
            (canvas.width - drawWidth) / 2,
            (canvas.height - drawHeight) / 2,
            drawWidth,
            drawHeight
          );
        }
      }
    }, [width, height, grayscale, blur]);

    const loading = isLoading || !isImageReady;

    useEffect(() => {
      if (!isImageReady && imageUrl) {
        setIsImageReady(false);
        imgRef.current.src = imageUrl;

        imgRef.current.onload = () => {
          setIsImageReady(true);
        };
      }
    }, [imageUrl, isImageReady, loading]);

    useEffect(() => {
      if (!loading) {
        drawImage();
      }
    }, [drawImage, loading]);

    return (
      <Card sx={{ height: '100%' }}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '70vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading && (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <StyledImageEditPreviewCanvas ref={canvasRef} $loading={loading} />
          </Box>
        </CardContent>
      </Card>
    );
  }
);
