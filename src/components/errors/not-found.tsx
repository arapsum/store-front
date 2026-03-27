import { Link } from "@tanstack/react-router";

const NotFoundError = () => {
  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center py-8 px-4 text-center">
        <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
        <p className="mb-6 max-w-sm text-muted-foreground">
          The page you&apos;re looking for isn&apos;t found, we suggest you back to home.
        </p>
        <Link
          to="/"
          className="flex justify-center items-center py-4 px-6 w-60 h-14 text-base text-white bg-black rounded-sm"
        >
          <span>Back to home page</span>
        </Link>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative p-2 w-full max-h-screen max-lg:hidden">
        <div className="w-full h-full bg-black rounded-2xl"></div>
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
          alt="404 illustration"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[clamp(260px,25vw,406px)]"
        />
      </div>
    </div>
  );
};

export default NotFoundError;
