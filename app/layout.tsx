import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/provider";
import { Theme } from "@/components/providers/theme";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { AmbientBackground } from "@/components/motion/ambient-background";
import { Navbar } from "@/components/ui/navbar";
import { Cursor } from "@/components/ui/cursor";
import { Preloader } from "@/components/ui/preloader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SectionRail } from "@/components/ui/section-rail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeferson0306.github.io/portfolio-v2";
const title = "Jeferson Siqueira — Senior Full Stack Engineer";
const description =
  "Senior Full Stack Engineer & Interactive UI Specialist. Cloud-native architectures, microservices and high-impact interfaces for BMW Group, Banco do Brasil, Lufthansa Group and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Jeferson Siqueira", url: "https://github.com/jeferson0306" }],
  keywords: [
    "Jeferson Siqueira",
    "Senior Full Stack Engineer",
    "Java",
    "Kotlin",
    "Quarkus",
    "Spring Boot",
    "AWS",
    "Kubernetes",
    "React",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Jeferson Siqueira",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `suppressHydrationWarning`: next-themes writes `data-theme` on the html
  // element before hydration, so the server and client markup differ by design.
  return (
    <html lang="pt" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Theme>
          <MotionConfig reducedMotion="user">
            <I18nProvider>
              {/* Fixed chrome lives outside the smooth wrapper: ScrollSmoother
              transforms its content, which would break `position: fixed`. */}
              <Preloader />
              <Cursor />
              <AmbientBackground />
              <ScrollProgress />
              <Navbar />
              <SectionRail />

              <SmoothScroll>
                <main>{children}</main>
              </SmoothScroll>
            </I18nProvider>
          </MotionConfig>
        </Theme>
      </body>
    </html>
  );
}
