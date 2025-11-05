'use client';

import { useLocale } from 'next-intl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useRouter, usePathname } from '../../i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Debug: ensure MUI imports resolved
  // Remove or comment out after verifying in the browser console
  // console.log('LocaleSwitcher MUI components', { Select, MenuItem, InputLabel, FormControl });

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
        onChange={(e) => switchLocale(e.target.value)}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="bn">বাংলা</MenuItem>
      </Select>
    </FormControl>
  );
}
