import { createBrowserRouter } from "react-router";
import { HomeScreen } from "./components/HomeScreen";
import { LemonCard } from "./components/LemonCard";
import { LemonDrops } from "./components/LemonDrops";
import { GentleSqueezesScreen } from "./components/GentleSqueezesScreen";
import { LemonLibrary } from "./components/LemonLibrary";
import { YouScreen } from "./components/YouScreen";
import { FriendsScreen } from "./components/FriendsScreen";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "lemon-card", Component: LemonCard },
      { path: "lemon-drops", Component: LemonDrops },
      { path: "gentle-squeezes", Component: GentleSqueezesScreen },
      { path: "lemon-library", Component: LemonLibrary },
      { path: "friends", Component: FriendsScreen },
      { path: "profile", Component: YouScreen },
    ],
  },
]);
