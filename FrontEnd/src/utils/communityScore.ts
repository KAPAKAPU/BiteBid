export const calculateCommunityScore = (
  likes: number,
  comments: number,
  followers: number,
): number => {
  return likes + comments * 2 + followers * 3;
};
