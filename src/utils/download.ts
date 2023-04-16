export async function downloadImage(id: string, url: string, user_name: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileURL = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = fileURL;
  link.download = `${user_name.replace(" ", "-")}-${id}-unsplash.jpg`;
  link.click();
}
