type AppFooterProps = {
  className?: string;
};

export default function AppFooter({ className = '' }: AppFooterProps) {
  return (
    <footer className={`flex justify-between items-center w-full p-4 bg-bg-secondary ${className}`}>
      <p className="text-sm text-text">
        © {new Date().getFullYear()} Purla Gallery. All rights reserved.
      </p>
      <p className="text-sm text-text">
        Made with <span className="text-primary">❤️</span> by Purla Index
      </p>
    </footer>
  );
}
