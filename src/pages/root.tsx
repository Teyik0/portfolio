import "./globals.css";
import { defineRootRoute, HeadContent, Scripts } from "@teyik0/furin";

// Runs before first paint: lets CSS hide scroll-reveal content only when JS will reveal it,
// so crawlers and no-JS visitors always get the full page.
const JS_FLAG_SCRIPT = 'document.documentElement.classList.add("js")';

export const route = defineRootRoute()
  .config({ mode: "ssg" })
  .layout(({ children }) => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, application-owned flag script.
          dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  ));
