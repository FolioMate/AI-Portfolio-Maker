import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border bg-white shadow-md p-4 ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`mb-4 font-semibold text-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className = "", ...props }, ref) => (
    <h2
      ref={ref}
      className={`text-xl font-bold ${className}`}
      {...props}
    >
      {children}
    </h2>
  )
);
CardTitle.displayName = "CardTitle";

export { Card, CardHeader, CardContent, CardTitle };
