"use client";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const path = usePathname();

  // Filter out empty segments
  const segments = path.split("/").filter(Boolean);

  console.log(segments);

  return (
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    {/* Add separator after Home */}
    {segments.length > 0 && <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>}
    {segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;

      return (
        <React.Fragment key={`${segment}-${index}`}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{segment}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {/* Render the separator only if not the last item */}
          {!isLast && <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>}
        </React.Fragment>
      );
    })}
  </BreadcrumbList>
</Breadcrumb>
  );
}
