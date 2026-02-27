import { forwardRef, type SVGProps } from "react";
import { iconRegistry, type IconDefinition, type IconName } from "./icons";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number | string;
  title?: string;
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 20, title, className = "", ...props }, ref) => {
    const icon = (iconRegistry as Record<string, IconDefinition>)[name];

    if (!icon) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[Icon] "${name}" iconRegistry icinde bulunamadi.`);
      }
      return null;
    }

    const viewBox = icon.viewBox ?? `0 0 ${icon.width ?? 24} ${icon.height ?? 24}`;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        role={title ? "img" : "presentation"}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        focusable="false"
        className={`inline-block shrink-0 align-middle ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: icon.body }}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
