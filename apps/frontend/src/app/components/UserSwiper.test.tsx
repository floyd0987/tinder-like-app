import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import '@testing-library/jest-dom';
import UserSwiper from "./UserSwiper";
import { User } from "@/types/user";


import * as api from "@/lib/api";

// Mock users
const userAlice: User = { id: 1, name: "Alice", age: 25, photoUrl: "alice.jpg" };
const userBob: User = { id: 2, name: "Bob", age: 30, photoUrl: "bob.jpg" };

// Mock API functions
jest.mock("@/lib/api", () => ({
  getRandomUser: jest.fn(),
  sendAction: jest.fn(),
}));

describe("UserSwiper", () => {
  const loggedInUserId = 999;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the initial user correctly", () => {
    render(<UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />);
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
  });

  it("shows 'No more users available.' when initialUser is null", () => {
    render(<UserSwiper initialUser={null} loggedInUserId={loggedInUserId} />);
    expect(screen.getByText(/No more users available/i)).toBeInTheDocument();
  });

  it("fetches next user on LIKE with no match", async () => {
    (api.getRandomUser as jest.Mock).mockResolvedValueOnce(userBob);
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: false });

    render(<UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />);

    const likeButton = screen.getAllByRole("button", { name: /like/i })[0];
    fireEvent.click(likeButton);

    await waitFor(() => expect(screen.getByText(/Bob/i)).toBeInTheDocument());
  });

  it("fetches next user on DISLIKE", async () => {
  (api.getRandomUser as jest.Mock).mockResolvedValueOnce(userBob);
  (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: false }); // FIX

  render(<UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />);

  const dislikeButton = screen.getAllByRole("button", { name: /dislike/i })[0];
  fireEvent.click(dislikeButton);

  await waitFor(() => expect(screen.getByText(/Bob/i)).toBeInTheDocument());
});


  it("shows match message on LIKE with match", async () => {
  (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: true });

  render(<UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />);

  const likeButton = screen.getAllByRole("button", { name: /like/i })[0];
  fireEvent.click(likeButton);

  const matchPopup = await screen.findByText(/You got a match!/i);
  const popupContainer = matchPopup.closest('div');
  expect(within(popupContainer!).getByText(/Alice/i)).toBeInTheDocument();
});


  it("hides match message and fetches next user when 'Okay' clicked", async () => {
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: true });
    (api.getRandomUser as jest.Mock).mockResolvedValueOnce(userBob);

    render(<UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />);

    const likeButton = screen.getAllByRole("button", { name: /like/i })[0];
    fireEvent.click(likeButton);

    await waitFor(() => screen.getByText(/You got a match!/i));

    const okayButton = screen.getByRole("button", { name: /okay/i });
    fireEvent.click(okayButton);

    await waitFor(() => expect(screen.getByText(/Bob/i)).toBeInTheDocument());
  });

  it("shows 'No more users available.' if getRandomUser fails", async () => {
    (api.getRandomUser as jest.Mock).mockRejectedValueOnce(new Error("API error"));
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: false });

    render(<UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />);

    const likeButton = screen.getAllByRole("button", { name: /like/i })[0];
    fireEvent.click(likeButton);

    await waitFor(() =>
      expect(screen.getByText(/No more users available/i)).toBeInTheDocument()
    );
  });
});
