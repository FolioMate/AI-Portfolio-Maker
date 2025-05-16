export default function Footer() { 
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-[#ffffff] text-center p-4 border-t border-gray-700">
      © {new Date().getFullYear()} AI Portfolio Builder. All rights reserved.
    </footer>
  );
}
