export async function fetchHomeData() {
  const response = await fetch("https://verbose-cornhusk-aptitude.ngrok-free.dev/home", {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`errorT: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}