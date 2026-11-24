import React from "react";

export const routeHref = (href) => {
  if (href === "/R28") return "#/";
  if (href.startsWith("/rxx/R28/"))
    return "#/" + href.slice("/rxx/R28/".length);
  return href;
};
export default function Link({ href, children, ...props }) {
  return (
    <a href={routeHref(href)} {...props}>
      {children}
    </a>
  );
}
