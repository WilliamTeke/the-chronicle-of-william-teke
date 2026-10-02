export const easeApple = [0.25, 0.4, 0.25, 1] as const;

export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeApple } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easeApple } },
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

