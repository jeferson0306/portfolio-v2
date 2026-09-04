import { contact } from "@/lib/content";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

/**
 * Structured data for the person, not the page. `sameAs` is what lets search
 * engines connect this site to the GitHub and LinkedIn profiles rather than
 * treating all three as unrelated.
 */
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    jobTitle: "Senior Full Stack Engineer",
    description: siteDescription,
    email: `mailto:${contact.email}`,
    sameAs: [contact.linkedin, contact.github],
    knowsAbout: [
      "Java",
      "Kotlin",
      "Quarkus",
      "Spring Boot",
      "Microservices",
      "AWS",
      "Kubernetes",
      "Terraform",
      "React",
      "Next.js",
    ],
    worksFor: { "@type": "Organization", name: "Aubay" },
    address: { "@type": "PostalAddress", addressCountry: "PT" },
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from an object literal we control, so there is no untrusted
      // input to escape here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
