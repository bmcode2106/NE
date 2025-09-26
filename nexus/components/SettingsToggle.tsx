// file: components/SettingsToggle.tsx
"use client";

interface SettingsToggleProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  colorClass?: string;
}

export const SettingsToggle = ({ 
  label, 
  description, 
  icon, 
  checked, 
  onCheckedChange,
  colorClass = 'bg-purple-600'
}: SettingsToggleProps) => {
  return (
    <div className="flex items-center justify-between p-2.5 bg-zinc-800/30 rounded-lg border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-7 h-7 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <label className="text-sm font-medium text-zinc-200 cursor-pointer block truncate">
            {label}
          </label>
          <p className="text-xs text-zinc-500 truncate">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${checked ? colorClass : 'bg-zinc-600'}`}
        role="switch"
        aria-checked={checked}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};
