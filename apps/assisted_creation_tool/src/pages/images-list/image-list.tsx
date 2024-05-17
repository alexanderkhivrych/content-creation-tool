import { useSearchParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';
import {
  ImageResponseWithPagination,
  getImages,
} from '../../api/images-service';
import { ImageCardSkeleton } from './components/image-card-skeleton';
import { ImageCard } from './components/image-card';
import ErrorPage from '../../components/error-page';

const PAGE_SIZE = 12;

export const ImageListPage = () => {
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);

  const { data, isLoading, isError } = useQuery<ImageResponseWithPagination>({
    queryKey: ['images', page],
    retry: 0,
    queryFn: () => {
      return getImages({ page, limit: PAGE_SIZE });
    },
  });

  if (isError || data?.list?.length === 0) {
    return <ErrorPage />;
  }

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h1" gutterBottom>
        Image Gallery
      </Typography>
      <Grid container spacing={2}>
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <ImageCardSkeleton />
              </Grid>
            ))
          : data?.list.map((image) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={image.id}>
                <ImageCard
                  url={image.download_url}
                  author={image.author}
                  id={image.id}
                />
              </Grid>
            ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          disabled={!data?.prevPage}
          component={RouterLink}
          to={{
            pathname: '/',
            search: `?page=${data?.prevPage || 0}`,
          }}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          disabled={!data?.nextPage}
          component={RouterLink}
          sx={{ ml: 2 }}
          to={{
            pathname: '/',
            search: `?page=${data?.nextPage || 0}`,
          }}
        >
          Next Page
        </Button>
      </Box>
    </Box>
  );
};
