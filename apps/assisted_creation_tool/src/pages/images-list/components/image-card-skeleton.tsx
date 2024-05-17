import { Box, Card, CardContent, CircularProgress } from '@mui/material';

export const ImageCardSkeleton = () => {
  return (
    <Card>
      <Box
        sx={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <CircularProgress />
      </Box>
      <CardContent>
        <Box
          sx={{
            height: 20,
            backgroundColor: '#f0f0f0',
            borderRadius: 1,
          }}
        ></Box>
      </CardContent>
    </Card>
  );
};
