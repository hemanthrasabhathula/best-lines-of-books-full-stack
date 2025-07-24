import Logo from "@/assets/logo/Blob_logo.png";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center ">
      <div className="flex flex-col items-center max-w-7xl p-4 w-full">
        <Link to="/">
          <img
            src={Logo}
            alt="BLOB Logo"
            className="w-32 h-32 sm:w-48 sm:h-48 mb-4 rounded-full shadow-md"
          />
        </Link>
        <h2 className="text-lg sm:text-2xl font-bold mb-4">
          Best Lines of Books
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-2 text-left ">
          BLOB (Best Lines of Books) is a platform dedicated to celebrating the
          best lines from your favorite books. Whether you're an avid reader or
          just looking for inspiration, BLOB provides a curated collection of
          memorable quotes and excerpts.
        </p>
        <p className="text-gray-500 self-end mt-4">
          — Designed by{" "}
          <span className="italic underline">
            <a
              href="https://www.linkedin.com/in/hemanth-rasabhathula"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hemanth Rasabhathula
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};
