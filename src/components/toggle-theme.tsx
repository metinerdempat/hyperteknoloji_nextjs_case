import { FC } from 'react';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

type Props = {};

const ToggleTheme: FC<Props> = ({}) => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <Button type="button" onClick={toggleTheme} size="icon" className="bg-white hover:bg-white dark:bg-blue-500">
      {theme !== 'light' ? (
        <SunIcon size={24} className="text-black dark:text-white" />
      ) : (
        <MoonIcon size={24} className="text-black dark:text-white" />
      )}
    </Button>
  );
};

export default ToggleTheme;
