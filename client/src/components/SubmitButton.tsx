import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  loading: boolean;
};

export const SubmitButton: React.FC<Props> = ({ loading }) => {
  return (
    <LoadingButton
      type="submit"
      fullWidth
      loading={loading} // <-- enables built-in circular spinner
      loadingPosition="start" // spinner on the left, like in docs
      variant="contained"
      sx={{
        backgroundColor: "var(--accent)",
        "&:hover": { backgroundColor: "var(--accent-strong)" },
        textTransform: "none",
        fontWeight: 600,
        py: 1.5,
        color: "white",
        borderRadius: "8px",
        "&.Mui-disabled": { color: "white", opacity: 0.7 },
      }}
    >
      {loading ? "Working…" : "Get Gist"}
    </LoadingButton>
  );
};
