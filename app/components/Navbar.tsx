"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { FaRegFileAlt, FaBookOpen, FaHeadset } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { name: "Templates", href: "/templates", icon: <FaRegFileAlt /> },
    { name: "Resources", href: "/resources", icon: <FaBookOpen /> },
    { name: "Support", href: "/support", icon: <FaHeadset /> },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full border-2 border-white rounded-lg p-4 shadow-md text-gray-900 transition-all duration-300 bg-gray-900 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile View */}
        <div className="w-full flex md:hidden items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="FolioMate Logo" width={35} height={35} />
            <span className="text-lg sm:text-xl font-bold hover:text-[#7B61FF] transition">
              FolioMate
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {!session ? (
              <button
                onClick={() => signIn()}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-[#7B61FF] text-white text-sm sm:text-base rounded-md hover:bg-[#5a4bbd] transition"
              >
                Login
              </button>
            ) : (
              <Link href="/profile">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={35}
                  height={35}
                  className="rounded-full border-2 border-purple-500 object-cover"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-between w-full items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="FolioMate Logo" width={40} height={40} />
            <span className="text-xl md:text-2xl lg:text-3xl font-bold hover:text-[#7B61FF] transition">
              FolioMate
            </span>
          </Link>

          <div className="md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-lg md:text-base lg:text-lg hover:text-[#7B61FF] transition px-4 py-2"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {!session ? (
              <button
                onClick={() => signIn()}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-[#7B61FF] text-white text-sm sm:text-base rounded-md hover:bg-[#5a4bbd] transition"
              >
                Login
              </button>
            ) : (
              <Link href="/profile">
                <Image
                  src={session.user?.image || "/images/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  quality={75}
                  className="rounded-full border-2 border-purple-500 object-cover"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-y-auto left-0 top-20 w-3/4 max-w-xs bg-gray-900 shadow-lg p-6 flex flex-col space-y-4 md:hidden z-50"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 border-2 border-white rounded-lg text-white bg-gray-800 text-lg px-4 py-2 hover:text-[#7B61FF] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
