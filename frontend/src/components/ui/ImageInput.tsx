import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

interface ImageInputProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  existingUrl?: string;
  required?: boolean;
}

export function ImageInput({ label, value, onChange, existingUrl, required }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null);

  useEffect(() => {
    if (!value) {
      setPreview(existingUrl ?? null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value, existingUrl]);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-ink-300 bg-ink-50 dark:border-ink-700 dark:bg-ink-800">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus size={20} className="text-ink-300 dark:text-ink-600" />
          )}
        </div>
        <input
          required={required && !existingUrl}
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="flex-1 text-sm text-ink-500 dark:text-ink-400"
        />
      </div>
    </div>
  );
}
