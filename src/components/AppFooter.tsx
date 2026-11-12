type AppFooterProps = {
  className?: string;
};

export default function AppFooter({ className = '' }: AppFooterProps) {
  return (
    <footer
      className={`mx-auto flex w-full max-w-[1440px] flex-col gap-3 border-t editorial-rule px-5 py-8 text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 ${className}`}
    >
      <p className="text-xs tracking-[0.08em] sm:mb-0">
        © {new Date().getFullYear()} Purla Gallery. All rights reserved.
      </p>
      <p className="text-xs tracking-[0.08em]">
        An independent jewelry portfolio
      </p>
    </footer>
  );
}
