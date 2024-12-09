export const imageUpload = async (image) => {
  let img = {
    public_id: "",
    url: "",
  };
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "bjgz0dbx");
  formData.append("cloud_name", "dckbuxoof");

  const res = await fetch("https://api.cloudinary.com/v1_1/dckbuxoof/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  img.public_id = data.public_id;
  img.url = data.secure_url;
  console.log(data);

  return img;
};
