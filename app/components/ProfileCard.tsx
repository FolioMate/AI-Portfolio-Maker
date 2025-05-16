import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const ProfileCard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-center text-gray-500">Please log in to view your profile.</p>;
  }

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
      {/* Profile Image */}
      <div className="relative w-24 h-24">
        <Image
          src={session.user?.image || "/default-avatar.png"} // Fallback image
          alt="Profile Picture"
          fill
          className="rounded-full border-4 border-indigo-500 shadow-md object-cover"
        />
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-xl font-semibold text-gray-900">{session.user?.name}</h2>
      <p className="text-gray-500 text-sm">{session.user?.email}</p>

      {/* Extra Info */}
      <p className="mt-2 text-gray-600 text-xs">Joined: {new Date().toLocaleDateString()}</p>

      {/* Logout Button */}
      <button
        onClick={() => signOut()}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;
