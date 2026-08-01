import { Mail } from 'lucide-react';
import { FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import type { SocialIconName } from '../../types';

const icons: Record<SocialIconName, IconType> = {
  github: FaGithub,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  mail: Mail,
};

export const SocialIcon = ({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) => {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
};
