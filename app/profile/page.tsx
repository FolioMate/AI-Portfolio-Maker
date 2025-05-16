"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const ProfileCard = () => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState(session?.user?.image || "/images/default-avatar.png");
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profile_picture");

      const response = await fetch("https://api.cloudinary.com/v1_1/duhuo3cs4/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const secureUrl = data.secure_url;

      await fetch("/api/user/update-profile-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: secureUrl }),
      });

      setImageUrl(secureUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-white">
          <p className="text-gray-700">You are not signed in</p>
          <button
            onClick={() => signIn()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const user = session.user as typeof session.user & { createdAt?: string | Date };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      <div
        className={`
          w-[90%] max-w-xl sm:w-[70%] md:w-[60%] lg:w-[50%]
          p-8 border rounded-2xl shadow-2xl bg-white
          flex flex-col items-center text-center space-y-4
        `}
      >
        {/* Profile Picture with Upload */}
        <label htmlFor="fileInput" className="relative w-32 h-32 sm:w-36 sm:h-36 cursor-pointer">
          <Image
            src={imageUrl}
            alt="Profile"
            width={144}
            height={144}
            className="rounded-full object-cover border-4 border-indigo-500 shadow-md transition-transform hover:scale-105 w-full h-full"
          />
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
          />
          {uploading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-full">
              <Loader2 className="animate-spin text-indigo-600 w-6 h-6" />
            </div>
          )}
        </label>

        {/* User Info */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm sm:text-base text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-400">
          Joined: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
        </p>

        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
