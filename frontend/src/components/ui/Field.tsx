import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

const inputClasses =
  "w-full rounded-none border border-ink-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-600 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100";

interface FieldWrapperProps {
  label: string;
  children: ReactNode;
}

function FieldWrapper({ label, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">{label}</label>
      {children}
    </div>
  );
}

export function TextField({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label}>
      <input className={inputClasses} {...props} />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label}>
      <textarea className={inputClasses} rows={3} {...props} />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label}>
      <select className={inputClasses} {...props}>
        {children}
      </select>
    </FieldWrapper>
  );
}
