export const REVIEW_RATE = [1, 2, 3, 4, 5] as const;
export type ReviewRate = (typeof REVIEW_RATE)[number];
