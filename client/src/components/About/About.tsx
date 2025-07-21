import Logo from "@/assets/logo/Blob_logo.png";

export const About = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center max-w-7xl p-4 w-full">
        <img
          src={Logo}
          alt="BLOB Logo"
          className="w-48 h-48 mb-4 rounded-full shadow-md"
        />
        <h2 className="text-2xl font-bold mb-4">Best Lines of Books</h2>
        <p className="text-gray-700 mb-2 text-center">
          BLOB (Best Lines of Books) is a platform dedicated to celebrating the
          best lines from your favorite books. Whether you're an avid reader or
          just looking for inspiration, BLOB provides a curated collection of
          memorable quotes and excerpts.
        </p>
        <p className="text-gray-500 self-end mt-4">
          Designed by{" "}
          <span className="italic hover:underline">
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
