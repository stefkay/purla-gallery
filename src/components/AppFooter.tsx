type AppFooterProps = {
  className?: string;
};

export default function AppFooter({ className = '' }: AppFooterProps) {
  return (
    <footer className={`site-footer ${className}`}>
      <p className="text-xs tracking-[0.08em] sm:mb-0">
        © {new Date().getFullYear()} Purla Gallery. All rights reserved.
      </p>
      <p className="text-xs tracking-[0.08em]">An independent jewelry portfolio</p>
    </footer>
  );
}
