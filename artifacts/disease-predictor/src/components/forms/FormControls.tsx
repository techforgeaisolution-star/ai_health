import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  tooltip?: string;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, tooltip, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
            {label}
            {tooltip && (
              <div className="group relative flex items-center justify-center">
                <Info size={14} className="text-muted-foreground cursor-help" />
                <div className="absolute bottom-full mb-2 hidden w-48 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-xl border border-border group-hover:block z-50">
                  {tooltip}
                </div>
              </div>
            )}
          </label>
        </div>
        <input
          ref={ref}
          className={cn(
            "flex w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-sm transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10",
            "hover:border-border",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[13px] font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  tooltip?: string;
  options: { label: string; value: string | number }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, tooltip, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
            {label}
            {tooltip && (
              <div className="group relative flex items-center justify-center">
                <Info size={14} className="text-muted-foreground cursor-help" />
                <div className="absolute bottom-full mb-2 hidden w-48 p-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-xl border border-border group-hover:block z-50">
                  {tooltip}
                </div>
              </div>
            )}
          </label>
        </div>
        <select
          ref={ref}
          className={cn(
            "flex w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-sm transition-all duration-200 appearance-none",
            "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10",
            "hover:border-border cursor-pointer",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10",
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
          {...props}
        >
          <option value="" disabled>Select an option...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-[13px] font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";

export const SubmitButton = ({ 
  isPending, 
  children,
  className
}: { 
  isPending: boolean, 
  children: React.ReactNode,
  className?: string 
}) => (
  <button
    type="submit"
    disabled={isPending}
    className={cn(
      "w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base",
      "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground",
      "shadow-lg shadow-primary/25 border border-primary/20",
      "hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
      "active:translate-y-0 active:shadow-md",
      "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",
      "transition-all duration-200 ease-out flex items-center justify-center gap-2",
      className
    )}
  >
    {isPending ? (
      <>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Analyzing Data...
      </>
    ) : (
      children
    )}
  </button>
);
