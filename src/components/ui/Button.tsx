import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

const variantClass = {
  primary: "bg-navy text-ivory hover:bg-navy-deep active:scale-[0.98]",
  outline:
    "border border-gold text-navy hover:bg-gold hover:text-navy active:scale-[0.98]",
  ghost: "text-navy/70 hover:text-navy underline underline-offset-4",
} as const;

type Variant = keyof typeof variantClass;

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  variant?: Variant;
}

interface ButtonAsLink extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
  variant?: Variant;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`;

  if (props.as === "a") {
    const { as, ...anchorProps } = props;
    void as;
    return <a className={classes} {...anchorProps} />;
  }

  const { as, ...buttonProps } = props;
  void as;
  return <button className={classes} {...buttonProps} />;
}
