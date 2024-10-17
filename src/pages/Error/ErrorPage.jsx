export default function ErrorPage() {
  return (
    <section className="h-screen w-full bg-background">
      <div className="container mx-auto flex h-screen w-full flex-col items-center justify-center gap-3 px-6 text-textPrimary">
        <h1 className="text-[70px] font-bold lg:text-[100px]">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-center text-textSecondary">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable
        </p>

        <a
          href="/"
          className="mt-5 w-fit rounded-full bg-primary px-10 py-4 font-medium text-black transition-colors duration-300 ease-in-out hover:bg-primaryDark"
        >
          Go to Home
        </a>
      </div>
    </section>
  );
}
