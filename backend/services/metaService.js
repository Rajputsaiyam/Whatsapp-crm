export const simulateMetaVerification = () => {
  const statuses = ["Approved", "Pending", "Failed"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};