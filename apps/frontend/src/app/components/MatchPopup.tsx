import { Box, Button } from "@mui/material";
import StarburstMatch from "./StarburstMatch";

const MatchPopup = ({
  onClose,
  isLoading,
}: {
  onClose: () => void;
  isLoading: boolean;
}) => (
  <>
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
      data-testid="overlay"
    />
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 2,
      }}
    >
      <Button
        data-testid="match-okay-btn"
        variant="outlined"
        onClick={onClose}
        disabled={isLoading}
        sx={{
          bottom: 16,
          right: 0,
          position: "absolute",
          zIndex: 2,
          borderRadius: "12px",
          width: "46%",
          fontSize: "1.1rem",
          bgcolor: "#e1ecf7",
          borderColor: "#222",
          color: "#000",
          py: 1.2,
          letterSpacing: "1px",
        }}
      >
        Okay
      </Button>
      <StarburstMatch text="You got match!" />
    </Box>
  </>
);

export default MatchPopup;