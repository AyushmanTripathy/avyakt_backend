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

    /*
    const formData = new FormData();
    formData.append("file", fileUploadInput.files[0]);
    const res = await fetch("https://0x0.st", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
    if (res.ok) console.log(await res.text());
    */
    fileUploadTarget.value = "https://placehold.co/600x600?text=Event+Pic";
  };
}

//Update options with selected attribute
document.querySelectorAll("select").forEach((x) => {
  const value = x.getAttribute("data-select");
  const option = document.querySelector(`option[value='${value}']`);
  if (option) option.selected = true;
  else console.log("option not found", x.value);
});
