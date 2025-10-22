export const isValid = (user: User) => {
  if (user.tags.map((t) => t.text).join(";").length > 50) {
    return false;
  }
  if (!user.name || user.name.length > 100) {
    return false;
  }
  if (
    (user.type === "local" && !user.password) ||
    (user.password && user.password.length > 100)
  ) {
    return false;
  }
  return true;
};
