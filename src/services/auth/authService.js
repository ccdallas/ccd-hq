export async function signIn(email, password) {
  console.log("Authentication request", email);
  return {
    id: "demo-user",
    email
  };
}

export async function signOut() {
  console.log("User signed out");
}
