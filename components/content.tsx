import HomeClient from "@/app/components/home/HomeClient";
import ProjectsSection from "@/app/components/projects/ProjectsSection";
import ServicesSection from "@/app/components/services/ServicesSection";
import SkillsSection from "@/app/components/skills/SkillsSection";
import AboutHero from "@/app/components/about/AboutHero";
import AboutFacts from "@/app/components/about/AboutFacts";
import AboutSkills from "@/app/components/about/AboutSkills";
import AboutTimeline from "@/app/components/about/AboutTimeline";
import AboutAskAI from "@/app/components/about/AboutAskAI";
import ContactForm from "@/app/components/contact/ContactForm";
import ContactInfo from "@/app/components/contact/ContactInfo";
import {
  about,
  contact,
  presentationSkills as skills,
  presentationServices as services,
  presentationProjects as projects,
} from "@/lib/presentation";
import Link from "next/link";

export function Home() {
  return (
    <HomeClient
      about={about}
      skills={skills}
      services={services}
      projects={projects}
    />
  );
}
export function Content({ section }: { section: string }) {
  if (section === "projects")
    return <ProjectsSection projects={projects} titleAs="h1" showCta />;
  if (section === "services")
    return (
      <ServicesSection services={services} titleAs="h1" showProcess showCta />
    );
  if (section === "skills") return <SkillsSection skills={skills} />;
  if (section === "experience")
    return (
      <>
        <h1 className="sr-only">Professional experience</h1>
        <AboutTimeline about={about} />
        <Awards />
      </>
    );
  if (section === "about")
    return (
      <>
        <AboutHero
          about={about}
          contact={contact}
          stats={[
            { label: "Years building", value: "4+" },
            {
              label: "Projects contributed to",
              value: String(projects.length),
            },
            { label: "Technologies", value: String(skills.length) },
          ]}
        />
        <AboutFacts about={about} contact={contact} />
        <AboutSkills about={about} skills={skills} />
        <AboutTimeline about={about} />
        <Awards />
        <ProjectsSection projects={projects} compact />
        <AboutAskAI firstName="Zahidul" />
      </>
    );
  if (section === "contact")
    return (
      <section
        aria-labelledby="contact-heading"
        className="mx-auto mt-4 w-full max-w-6xl md:mt-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-soft px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-accent ">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
            Contact
          </span>
          <h1
            id="contact-heading"
            className="mt-4 font-poppins text-4xl font-bold text-brand-text md:text-5xl lg:text-6xl"
          >
            Let’s build something{" "}
            <span className="brand-highlight">together</span>
          </h1>
          <p className="mt-4 text-base text-brand-muted md:text-lg">
            Have a role, a project or an idea? Send a message and let’s start a
            conversation.
          </p>
        </div>
        <div className="mt-10 grid gap-8 min-[1024px]:grid-cols-[2fr_3fr] min-[1024px]:gap-10">
          <ContactInfo contact={contact} />
          <ContactForm />
        </div>
      </section>
    );
  if (section === "ask")
    return (
      <>
        <h1 className="sr-only">Ask Zahidul’s AI</h1>
        <AboutAskAI firstName="Zahidul" />
      </>
    );
  return (
    <section className="mx-auto mt-10 max-w-6xl text-center">
      <span className="text-xs uppercase tracking-widest text-brand-accent ">
        Notes & perspectives
      </span>
      
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-brand-border bg-brand-surface p-10 dark:border-brand-border dark:bg-brand-surface">
        <p className="mt-3 text-brand-muted ">
          Explore the projects and technologies behind my work while this
          notebook takes shape.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-flex rounded-full brand-action px-6 py-2.5 text-white"
        >
          Explore my projects ↗
        </Link>
      </div>
    </section>
  );
}
function Awards() {
  return (
    <section className="mx-auto mt-16 max-w-6xl">
      <h2 className="text-2xl font-bold">Certifications & awards</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          [
            "ITEE FE Certification",
            "Bangladesh IT-Engineers Examination Center (BD-ITEC), 2022",
          ],
          ["Vice-Chancellor Award", "Uttara University"],
        ].map(([title, detail]) => (
          <article
            key={title}
            className="rounded-2xl border border-brand-border bg-brand-surface p-6 dark:border-brand-border dark:bg-brand-surface"
          >
            <h3 className="font-semibold text-brand-accent ">{title}</h3>
            <p className="mt-2 text-sm text-brand-muted ">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
