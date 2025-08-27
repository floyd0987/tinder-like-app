"use client";
import { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "@/types/user";
import { getRandomUser, sendAction } from "@/lib/api";
import MatchPopup from "./MatchPopup";

interface UserSwiperProps {
  initialUser: User | null;
  loggedInUserId: number;
}

const UserSwiper: React.FC<UserSwiperProps> = ({
  initialUser,
  loggedInUserId,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);
  const [seenUserIds, setSeenUserIds] = useState<Set<number>>(
    new Set([Number(loggedInUserId)])
  );
  const [isMatch, setIsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getNextUser = async () => {
    try {
      // console.log("Current User:", currentUser);
      // console.log("Seen User IDs:", seenUserIds);

      const currentUserId = Number(currentUser?.id);
      const seenIds = Array.from(seenUserIds) as number[];

      const next = await getRandomUser(currentUserId, seenIds);

      setCurrentUser(next);
      if (next?.id) {
        setSeenUserIds((prev) => new Set(prev).add(Number(next.id)));
      }
    } catch (error) {
      console.error("Failed to fetch a random user:", error);
      setCurrentUser(null);
    }
  };

  const handleAction = async (action: "LIKE" | "DISLIKE") => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const result = await sendAction(loggedInUserId, currentUser.id, action);
      if (result.match) {
        setIsMatch(true);
      } else {
        await getNextUser();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchOkay = () => {
    setIsMatch(false);
    getNextUser();
  };

  if (!currentUser) {
    return (
      <Typography variant="h5" data-testid="no-users">
        No more users available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <UserCard
          user={currentUser}
          onLike={() => handleAction("LIKE")}
          onDislike={() => handleAction("DISLIKE")}
          isLoading={isLoading}
        />

        {isMatch && (
          <MatchPopup onClose={handleMatchOkay} isLoading={isLoading} />
        )}
      </Box>
    </Box>
  );
};

export default UserSwiper;
