'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLanguage } from '@/store/features/sandbox/sandboxSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
];

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.sandbox.currentSandbox.language);

  return (
    <Select
      value={language}
      onValueChange={(value) => dispatch(setLanguage(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
