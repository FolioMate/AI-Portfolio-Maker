export async function uploadProfilePicture(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "prifile_picture"); // Set up in Cloudinary
    formData.append("folder", "profile_pictures"); // Optional
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/duhuo3cs4/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  }
  