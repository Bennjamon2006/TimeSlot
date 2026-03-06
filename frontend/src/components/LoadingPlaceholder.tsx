import { Box, Skeleton, Stack } from "@mui/material";

interface LoadingPlaceholderProps {
  variant?: "page" | "list" | "detail";
}

export default function LoadingPlaceholder({
  variant = "page",
}: LoadingPlaceholderProps) {
  if (variant === "list") {
    return (
      <Stack spacing={2}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={80} />
        ))}
      </Stack>
    );
  }

  if (variant === "detail") {
    return (
      <Box>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rounded" height={200} sx={{ mt: 2 }} />
      </Box>
    );
  }

  // home default
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" width={200} height={50} />
      <Skeleton variant="rounded" width={200} height={50} />
      <Skeleton variant="rounded" width={200} height={50} />
    </Stack>
  );
}
