"use client";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  onLike: () => void;
  onDislike: () => void;
  isLoading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onLike,
  onDislike,
  isLoading,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Card
      sx={{
        width: 420,
        height: 680,
        
        // borderRadius: "10px",
        boxShadow: "none",
        background: "transparent",
        p: 0,
        position: "relative",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Image section */}
      <Box
        sx={{
          width: "100%",
          height: 680,
          background: "#e97ffb",
          position: "relative",
          // borderTopLeftRadius: "10px",
          // borderTopRightRadius: "10px",
          overflow: "hidden",
          border: "1.5px solid #222",
        }}
      >
        <CardMedia
          component="img"
          image={user.photoUrl}
          alt={`${user.name} user`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            background: "#e97ffb",
          }}
        />
        {/* Name box overlays the button area */}
        <Paper
          elevation={2}
          sx={{
            position: "absolute",
            bottom: 15,
            left: 16,
            width: "92%",
            borderRadius: "12px",
            bgcolor: "#e1ecf7",
            padding: "5px 20px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.09)",
            zIndex: 2,
            border: "1.5px solid #222",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#222",
              fontWeight: 500,
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {user.name}, {user.age}
          </Typography>
        </Paper>
      </Box>


      {/* Buttons area */}

      <Box
        sx={{
          width: "100%",
          minHeight: 70,
          background: "#f9fbfc",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderTop: "1px solid #e3e7ec",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pt: 3,
          pb: 2,
          px: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Button
          aria-label="Like"
          variant="outlined"
          onClick={onLike}
          disabled={isLoading}
          sx={{
            borderRadius: "12px",
            width: "46%",
            fontSize: "1.1rem",
            bgcolor: "#e1ecf7",
            borderColor: "#000",
            color: "#000",
            // fontWeight: 700,
            py: 1.2,
            letterSpacing: "1px",
          }}
        >
          LIKE
        </Button>
        <Button
          aria-label="Dislike"
          variant="outlined"
          onClick={onDislike}
          disabled={isLoading}
          sx={{
            borderRadius: "12px",
            width: "46%",
            fontSize: "1.1rem",
            bgcolor: "#e1ecf7",
            borderColor: "#000",
            color: "#000",
            // fontWeight: 700,
            py: 1.2,
            letterSpacing: "1px",
          }}
        >
          DISLIKE
        </Button>
      </Box>
    </Card>
  </Box>
);

export default UserCard;