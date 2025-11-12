'use client';

import React from 'react';

import { usePaths } from 'src/routes/paths';

import { CONFIG_STATIC } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${CONFIG_STATIC.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const paths = usePaths();

  return [
    {
      subheader: 'Overview',
      items: [
        {
          title: 'Dashboard',
          path: paths.dashboard.root,
          icon: ICONS.dashboard,
        },
        {
          title: 'Home Page',
          path: paths.dashboard.home.root,
          icon: ICONS.dashboard,
          children: [
            { title: 'Banner Create', path: paths.dashboard.home.root },
            { title: 'Banner List', path: paths.dashboard.home.heroList },
            { title: 'Instruction Create', path: paths.dashboard.home.instruction },
            { title: 'Success part', path: paths.dashboard.home.success },
            { title: 'Membership part', path: paths.dashboard.home.membership },
            { title: 'Service part', path: paths.dashboard.home.services },
          ],
        },
        {
          title: 'Pricing page',
          path: paths.dashboard.two,
          icon: ICONS.ecommerce,
        },
        {
          title: 'Terms & Cond Page',
          path: paths.dashboard.three,
          icon: ICONS.analytics,
        },
      ],
    },
    {
      subheader: 'Management',
      items: [
        {
          title: 'Projects',
          path: '/dashboard/projects',
          icon: ICONS.folder,
          children: [
            { title: 'Active', path: '/dashboard/projects/active' },
            { title: 'Archived', path: '/dashboard/projects/archived' },
          ],
        },
        {
          title: 'Users',
          path: paths.dashboard.group.root,
          icon: ICONS.user,
          children: [
            { title: 'User List', path: paths.dashboard.group.root },
            { title: 'Create User', path: paths.dashboard.group.five },
            { title: 'User Roles', path: paths.dashboard.group.six },
          ],
        },

        {
          title: 'Invoices',
          path: '/dashboard/invoices',
          icon: ICONS.invoice,
        },
        {
          title: 'Products',
          path: '/dashboard/products',
          icon: ICONS.product,
        },
      ],
    },
    {
      subheader: 'Settings',
      items: [
        {
          title: 'System Settings',
          path: '/dashboard/settings',
          icon: ICONS.parameter,
        },
        {
          title: 'Security',
          path: '/dashboard/security',
          icon: ICONS.lock,
        },
      ],
    },
  ];
}
