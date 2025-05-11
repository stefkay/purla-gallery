import { tagStyles, TagVariant, TagSize } from './styles/tag';
import { cn } from '@/utils/cn';

interface TagProps {
  children: string;
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
}

export default function Tag({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  className 
}: TagProps) {
  return (
    <span 
      className={cn(
        tagStyles.base,
        tagStyles.variants[variant],
        tagStyles.sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
