import { CONFIG_STATIC } from 'src/config-global';

export const metadata = {
  title: `Instruction page | Dashboard - ${CONFIG_STATIC.appName}`,
};

export default function Layout({ children }) {
  return children;
}
