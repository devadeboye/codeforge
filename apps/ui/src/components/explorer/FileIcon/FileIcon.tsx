import { 
  FileCode, 
  FileText, 
  Braces, 
  Palette, 
  Globe, 
  File 
} from 'lucide-react';

interface FileIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function FileIcon({ name, className = '', size = 16 }: FileIconProps) {
  const extension = name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'ts':
    case 'tsx':
      return <FileCode size={size} className={`${className} text-accent-cyan`} />;
    case 'js':
    case 'jsx':
      return <FileCode size={size} className={`${className} text-accent-yellow`} />;
    case 'json':
      return <Braces size={size} className={`${className} text-accent-orange`} />;
    case 'md':
      return <FileText size={size} className={`${className} text-fg-secondary`} />;
    case 'css':
      return <Palette size={size} className={`${className} text-accent-pink`} />;
    case 'html':
      return <Globe size={size} className={`${className} text-accent-orange`} />;
    default:
      return <File size={size} className={`${className} text-fg-muted`} />;
  }
}
