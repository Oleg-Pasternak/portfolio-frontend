export const triggerPageTransition = () => {
  document.documentElement.animate(
    [
      {
        transform: "translateY(0)",
        opacity: 1,
        scale: 1,
      },
      {
        transform: "translateY(-100px)",
        opacity: 0.5,
        scale: 0.9,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      pseudoElement: "::view-transition-old(root)",
      fill: "forwards",
    }
  );
  document.documentElement.animate(
    [
      {
        transform: "translateY(100%)",
      },
      {
        transform: "translateY(0)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      pseudoElement: "::view-transition-new(root)",
      fill: "forwards",
    }
  );
};
