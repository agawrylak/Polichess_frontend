import { AnimationControls } from "framer-motion";

export enum SidebarState {
  VISIBLE = "VISIBLE",
  HIDDEN = "HIDDEN",
}

export async function animateMenu(
  animation: AnimationControls,
  action: AnimationAction,
  orientation: string
) {
  if (action == AnimationAction.SHOW) {
    if (orientation === "vertical") {
      await animation.start({
        display: "block",
        y: [-250, 0],
        transition: { duration: 0.4 },
      });
    }
    if (orientation === "horizontal") {
      await animation.start({
        display: "block",
        x: [-500, 0],
        transition: { duration: 0.4 },
      });
    }
  }
  if (action == AnimationAction.HIDE) {
    if (orientation === "vertical") {
      await animation.start({
        y: [0, -250],
        transition: { duration: 0.4 },
      });
      await animation.start({
        display: "none",
      });
    }
    if (orientation === "horizontal") {
      await animation.start({
        x: [0, -500],
        transition: { duration: 0.4 },
      });
      await animation.start({
        display: "none",
      });
    }
  }
}

export interface SidebarInfo {
  name: string;
  placementId: number; // objects with same placementID collide with each other, so one has to be hidden
  // before you can show the other one
  childOf: string; // child of a sidebar will hide whenever parent is to be hidden
  state: SidebarState;
}

export interface AnimationInfo {
  action: AnimationAction;
  animation: AnimationControls;
  orientation: string; // either vertical or horizontal
}

export enum AnimationAction {
  SHOW = "SHOW",
  HIDE = "HIDE",
  DO_NOTHING = "DO NOTHING",
}

export interface AnimatedObject {
  sidebar: SidebarInfo;
  animation: AnimationInfo;
}

function setActionBasedOnState(animatedObjects: AnimatedObject[]) {
  function setChildren(
    animatedObject: AnimatedObject,
    action: AnimationAction
  ) {
    for (const animatedObject2 of animatedObjects) {
      const isNotSameObject =
        animatedObject.sidebar.name !== animatedObject2.sidebar.name;
      const isChildOf =
        animatedObject2.sidebar.childOf === animatedObject.sidebar.name;
      const isNotAlreadyHidden =
        animatedObject.animation.action === AnimationAction.HIDE &&
        animatedObject2.sidebar.state != SidebarState.HIDDEN;
      if (isNotSameObject && isChildOf && isNotAlreadyHidden) {
        animatedObject2.animation.action = action;
      }
    }
  }
  for (const animatedObject of animatedObjects) {
    //find elements who want to hide and then set their action to hide
    if (animatedObject.animation.action == AnimationAction.HIDE) {
      //find other elements that are children of that element and hide them too
      setChildren(animatedObject, AnimationAction.HIDE);
      //find elements who want to show
    } else if (animatedObject.animation.action == AnimationAction.SHOW) {
      //find elements that are placed in the same spot and hide them
      for (const animatedObject2 of animatedObjects) {
        const isNotSameObject =
          animatedObject.sidebar.name !== animatedObject2.sidebar.name;

        const isPlacementIdEqual =
          animatedObject.sidebar.placementId ===
          animatedObject2.sidebar.placementId;
        if (isNotSameObject && isPlacementIdEqual) {
          if (animatedObject2.sidebar.state == SidebarState.VISIBLE) {
            animatedObject2.animation.action = AnimationAction.HIDE;
          }
          //find children of these elements and hide them
          setChildren(animatedObject2, AnimationAction.HIDE);
        }
      }
    } else {
      animatedObject.animation.action = AnimationAction.DO_NOTHING;
    }
  }
}

async function proceedWithAnimations(animatedObjects: AnimatedObject[]) {
  for (const animatedObject of animatedObjects) {
    if (animatedObject.animation.action != AnimationAction.DO_NOTHING) {
      await animateMenu(
        animatedObject.animation.animation,
        animatedObject.animation.action,
        animatedObject.animation.orientation
      );
    }
  }
}

export async function playAnimations(animatedObjects: AnimatedObject[]) {
  setActionBasedOnState(animatedObjects);
  const sortedObjects = sort(animatedObjects);
  await proceedWithAnimations(sortedObjects);
}

function sort(animatedObjects: AnimatedObject[]) {
  // @ts-ignore
  // TODO: FIX THIS
  return animatedObjects.sort((a: AnimatedObject, b: AnimatedObject) => {
    //first deal with children
    const isSidebarChild = a.sidebar.placementId < b.sidebar.placementId;
    const isSidebarParent = a.sidebar.placementId > b.sidebar.placementId;
    if (isSidebarChild) {
      return 1;
    } else if (isSidebarParent) {
      return -1;
    } else {
      //then prioritize hiding
      const isSidebarEqual = a.sidebar.placementId === b.sidebar.placementId;
      if (isSidebarEqual) {
        const isAHiding = a.animation.action == AnimationAction.HIDE;
        if (isAHiding) {
          return -1;
        }
        const isBHiding = b.animation.action == AnimationAction.HIDE;
        if (isBHiding) {
          return 1;
        }
        return 0;
      }
    }
  });
}
