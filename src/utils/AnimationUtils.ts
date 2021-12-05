import { AnimationControls } from "framer-motion";

export async function showVerticalMenu(animation: AnimationControls) {
  await animation.start({
    display: "block",
    y: [-100, 0],
    transition: { duration: 0.4 },
  });
}

export async function hideVerticalMenu(animation: AnimationControls) {
  await animation.start({
    y: [0, -100],
    transition: { duration: 0.4 },
  });
  await animation.start({
    display: "none",
  });
}

export async function showHorizontalMenu(animation: AnimationControls) {
  await animation.start({
    display: "block",
    x: [-500, 0],
    transition: { duration: 0.4 },
  });
}

export async function hideHorizontalMenu(animation: AnimationControls) {
  await animation.start({
    x: [0, -500],
    transition: { duration: 0.4 },
  });
  await animation.start({
    display: "none",
  });
}
