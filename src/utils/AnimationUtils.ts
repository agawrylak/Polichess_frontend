import { AnimationControls } from "framer-motion";

export async function showVerticalMenuDropdown(animation: AnimationControls) {
  await animation.start({
    display: "block",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.2 },
  });
}

export async function hideVerticalMenuDropdown(animation: AnimationControls) {
  await animation.start({
    opacity: 0,
    rotateX: -15,
    transition: { duration: 0.2 },
  });
  await animation.start({
    display: "none",
  });
}

export async function showVerticalMenu(animation: AnimationControls) {
  await animation.start({
    display: "block",
    y: [-300, 0],
    transition: { duration: 0.4 },
  });
}

export async function hideVerticalMenu(animation: AnimationControls) {
  await animation.start({
    y: [0, -300],
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
