const fileUploadInput = document.getElementById("fileUploadInput");
const fileUploadBtn = document.getElementById("fileUploadBtn");
const fileUploadTarget = document.getElementById("fileUploadTarget");

if (fileUploadBtn && fileUploadInput && fileUploadTarget) {
  console.log("Upload enabled");
  fileUploadBtn.onclick = async (e) => {
    e.preventDefault();
    if (!fileUploadInput.files.length) return;

    fileUploadBtn.disabled = true;
    fileUploadTarget.placeholder = "Uploading ...";

    fileUploadTarget.value = await uploadImageToCloudinary(fileUploadInput.files[0]);
  };
}


async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_BUCKETID}/upload`;
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'example');

  const fetched = await fetch(url, {
    method: "post",
    body: data,
  });

  if (fetched.ok) {
    const parsed = await fetched.json()
    return parsed.url;
  }

  return "";
}

//Update options with selected attribute
document.querySelectorAll("select").forEach((x) => {
  const value = x.getAttribute("data-select");
  const option = document.querySelector(`option[value='${value}']`);
  if (option) option.selected = true;
  else console.log("option not found", x.value);
});
