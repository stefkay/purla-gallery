type AppFooterProps = {
  className?: string;
};

export default function AppFooter({ className = '' }: AppFooterProps) {
  return (
    <footer
      className={`flex flex-col sm:flex-row sm:justify-between w-full p-4 bg-bg-secondary ${className}`}
    >
      <p className="text-sm text-text mb-2 sm:mb-0">
        © {new Date().getFullYear()} Purla Gallery. All rights reserved.
      </p>
      <p className="text-sm text-text">
        Made with <span className="text-primary">❤️</span> by Purla Index
      </p>
    </footer>
  );
}
