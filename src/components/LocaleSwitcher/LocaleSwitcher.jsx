'use client';

import { useLocale } from 'next-intl';

import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useRouter, usePathname } from '../../i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <FormControl size="small" variant="outlined" sx={{ minWidth: 100 }}>
      <InputLabel id="locale-select-label">Language</InputLabel>
      <Select
        labelId="locale-select-label"
        value={locale}
        label="Language"
        onChange={e => switchLocale(e.target.value)}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="bn">বাংলা</MenuItem>
      </Select>
    </FormControl>
  );
}
