import users from "./data/users.json";

export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 1000);
  });
};
