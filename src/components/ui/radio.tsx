import React from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center">
          <input
            type="radio"
            id={inputId}
            ref={ref}
            className={cn(
              // Hide default radio
              "sr-only",
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              // Base styles
              "relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200",
              // Default state
              "border-gray-300 bg-white hover:border-gray-400",
              // Focus state
              "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
              // Checked state (using peer selector)
              "peer-checked:border-blue-600 peer-checked:bg-blue-600",
              // Disabled state
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            )}
          >
            {/* Inner circle - only visible when checked */}
            <div
              className={cn(
                "h-2 w-2 rounded-full bg-white transition-all duration-200",
                // Hide by default, show when checked
                "scale-0 peer-checked:scale-100"
              )}
            />
          </label>
        </div>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

// Alternative approach using CSS custom properties for more control
export const CustomRadio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start space-x-3">
        <div className="relative">
          <input
            type="radio"
            id={inputId}
            ref={ref}
            className={cn(
              // Custom radio styling
              "h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-white transition-all duration-200",
              "hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "checked:border-blue-600 checked:bg-blue-600",
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Inner circle using pseudo-element
              "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
              "checked:after:h-2 checked:after:w-2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
              "checked:after:rounded-full checked:after:bg-white checked:after:content-['']",
              className
            )}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

CustomRadio.displayName = "CustomRadio";

// Radio Group component for managing multiple radios
interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  onValueChange,
  name,
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioProps>(child)) {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === value,
            onChange: () => {
              if (typeof child.props.value === 'string') {
                onValueChange?.(child.props.value);
              }
            },
          });
        }
        return child;
      })}
    </div>
  );
};

// Usage Example
export const RadioExample = () => {
  const [paymentMethod, setPaymentMethod] = React.useState('credit-card');

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        name="payment-method"
      >
        <Radio
          value="credit-card"
          label="Credit Card"
          description="Pay with your credit or debit card"
        />
        <Radio
          value="paypal"
          label="PayPal"
          description="Pay with your PayPal account"
        />
        <Radio
          value="bank-transfer"
          label="Bank Transfer"
          description="Direct bank transfer"
        />
      </RadioGroup>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm">Selected: {paymentMethod}</p>
      </div>
    </div>
  );
};