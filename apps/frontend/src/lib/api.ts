import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!; // "!" means we’re sure it's defined

export async function sendAction(
  userId: number,
  recipientId: string,
  action: "LIKE" | "DISLIKE"
) {
  const response = await fetch(`${API_URL}/api/v1/actions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, recipientId, action }),
  });

  if (!response.ok) throw new Error("Failed to send action");
  return response.json() as Promise<{ match: boolean }>;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/api/v1/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}
