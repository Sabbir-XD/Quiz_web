import { CONFIG_STATIC } from 'src/config-global';

export const metadata = {
  title: `Hero List | Dashboard - ${CONFIG_STATIC.appName}`,
};

export default function Layout({ children }) {
  return children;
}
