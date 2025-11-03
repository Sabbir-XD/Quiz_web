import { CONFIG_STATIC } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

// import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {

  if (CONFIG_STATIC.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    // <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    //  </AuthGuard> 
  );
}
