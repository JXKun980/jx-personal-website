import React from "react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

export function TextField({ label, value, onChange, multiline, placeholder }: TextFieldProps) {
  const inputClasses =
    "bg-(--color-surface) border border-(--color-surface-lighter) rounded-lg px-3 py-2 text-(--color-text) text-sm w-full focus:outline-none focus:border-(--color-primary) transition-colors";

  return (
    <div className="mb-4">
      <label className="text-xs font-medium text-(--color-text-muted) uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="text-xs font-medium text-(--color-text-muted) uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-(--color-surface) border border-(--color-surface-lighter) rounded-lg px-3 py-2 text-(--color-text) text-sm w-full focus:outline-none focus:border-(--color-primary) transition-colors appearance-none pr-8"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-(--color-text-muted)">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface StringArrayFieldProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function StringArrayField({ label, items, onChange, placeholder }: StringArrayFieldProps) {
  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  return (
    <div className="mb-4">
      <label className="text-xs font-medium text-(--color-text-muted) uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="bg-(--color-surface) border border-(--color-surface-lighter) rounded-lg px-3 py-2 text-(--color-text) text-sm w-full focus:outline-none focus:border-(--color-primary) transition-colors"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-(--color-text-muted)/50 hover:text-red-400 transition-colors shrink-0"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-sm text-(--color-primary) hover:text-(--color-primary-light) mt-3 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Add
      </button>
    </div>
  );
}

interface ObjectArrayFieldProps {
  label: string;
  items: any[];
  onChange: (items: any[]) => void;
  itemLabel: (item: any) => string;
  defaultItem: Record<string, any>;
  renderFields: (item: any, index: number, updateItem: (updated: any) => void) => React.ReactNode;
}

export function ObjectArrayField({
  label,
  items,
  onChange,
  itemLabel,
  defaultItem,
  renderFields,
}: ObjectArrayFieldProps) {
  const updateItem = (index: number, updated: any) => {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const next = [...items];
    const target = index + direction;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { ...defaultItem }]);
  };

  return (
    <div className="mb-4">
      <label className="text-xs font-medium text-(--color-text-muted) uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-(--color-surface)/80 border border-(--color-surface-lighter)/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-(--color-text)">
                {itemLabel(item)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="text-xs text-(--color-text-muted)/50 hover:text-(--color-text-muted) disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-1"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="text-xs text-(--color-text-muted)/50 hover:text-(--color-text-muted) disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-1"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-(--color-text-muted)/50 hover:text-red-400 transition-colors ml-1"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>
            {renderFields(item, index, (updated) => updateItem(index, updated))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-sm text-(--color-primary) hover:text-(--color-primary-light) mt-3 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Add
      </button>
    </div>
  );
}
