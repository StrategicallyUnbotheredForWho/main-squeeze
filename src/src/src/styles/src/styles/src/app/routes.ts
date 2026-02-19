import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import LemonCards from "./pages/LemonCards";
import LemonDrops from "./pages/LemonDrops";
import JuiceLevels from "./pages/JuiceLevels";
import GentleSqueezes from "./pages/GentleSqueezes";
import LemonLibrary from "./pages/LemonLibrary";
import MoodCheckIn from "./pages/MoodCheckIn";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "cards", Component: LemonCards },
      { path: "drops", Component: LemonDrops },
      { path: "juice", Component: JuiceLevels },
      { path: "squeezes", Component: GentleSqueezes },
      { path: "library", Component: LemonLibrary },
      { path: "mood", Component: MoodCheckIn },
      { path: "settings", Component: Settings },
    ],
  },
]);
