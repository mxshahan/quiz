export const JWT_TOKEN = "quize-auth-token";
export const USER_COOKIE = "quize-user-auth";

export function getDefaultStore() {
  const AuthData = localStorage.getItem(USER_COOKIE);

  if (typeof AuthData === "string") return JSON.parse(AuthData);
  else return {};

  // const auth =userCookie;

  // return { auth, jwt };
}

export function setDefaultStore(auth) {
  const strState = JSON.stringify(auth);
  localStorage.setItem(USER_COOKIE, strState);
}
