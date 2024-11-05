import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const { t } = useTranslation("errorPage");
  return (
    <section className="h-screen w-full bg-background">
      <div className="container mx-auto flex h-screen w-full flex-col items-center justify-center gap-3 px-6 text-textPrimary">
        <h1 className="text-[70px] font-bold lg:text-8xl">404</h1>
        <h2 className="mb-5 text-3xl font-semibold lg:text-4xl">
          {t("notFound")}
        </h2>
        <p className="text-center text-textSecondary">{t("description")}</p>

        <a
          href="/"
          className="mt-5 w-fit rounded-full bg-primary px-10 py-4 text-sm font-medium text-black transition-colors duration-300 ease-in-out hover:bg-primaryDark"
        >
          {t("backToHome")}
        </a>
      </div>
    </section>
  );
}
