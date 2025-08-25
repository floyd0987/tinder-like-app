'use client';
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  onLike: () => void;
  onDislike: () => void;
  isLoading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onDislike, isLoading }) => (
  <Card sx={{ maxWidth: 345, position: "relative" }}>
    <CardMedia component="img" height="400" image={user.photoUrl} alt={`${user.name} user`} />
    <CardContent>
      <Typography variant="h5">{user.name}, {user.age} (ID: {user.id})</Typography>
    </CardContent>
    <Box sx={{ display: "flex", justifyContent: "space-around", padding: "16px" }}>
      <Button aria-label="Like" variant="contained" color="success" onClick={onLike} disabled={isLoading}>Like</Button>
      <Button aria-label="Dislike" variant="contained" color="error" onClick={onDislike} disabled={isLoading}>Dislike</Button>
    </Box>
  </Card>
);

export default UserCard;
