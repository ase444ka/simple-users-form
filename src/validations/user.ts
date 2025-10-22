export const tagsErrorMessage = (tags: string) => {
  if (tags.length > 50) {
    return "До 50 символов!";
  }
  return "";
};

export const nameErrorMessage = (name: string) => {
  if (!name) {
    return "Обязательное поле!";
  }
  if (name.length > 100) {
    return "До 100 символов.";
  }
  return "";
};

export const passwordErrorMessage = (user: User, password: string | null) => {
  if (user.type === "local" && !user.password) {
    return "Обязательное поле!";
  }

  if (user.password && user.password.length > 100) {
    return "До 100 символов";
  }
  return "";
};

export const isValid = (user: User) => {
  if (tagsErrorMessage(user.tags.map((t) => t.text).join(";"))) {
    return false;
  }
  if (nameErrorMessage(user.name)) {
    return false;
  }
  if (passwordErrorMessage(user, user.password))
  {
    return false;
  }
  return true;
};
