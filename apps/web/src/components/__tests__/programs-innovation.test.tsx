import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProgramsOverviewPage from "../../app/programs/page";
import PreIncubationPage from "../../app/programs/pre-incubation/page";
import IncubationPage from "../../app/programs/incubation/page";
import AccelerationPage from "../../app/programs/acceleration/page";
import StartupIndiaSchemePage from "../../app/programs/schemes/startup-india/page";
import MeityGenesisPage from "../../app/programs/schemes/meity-genesis/page";
import CsrSchemesPage from "../../app/programs/schemes/csr/page";
import MentorshipPage from "../../app/programs/mentorship/page";
import TrainingPage from "../../app/programs/training/page";
import ApplyInstructionsPage from "../../app/programs/apply-instructions/page";
import StartupsDirectoryPage from "../../app/startups/page";
import StartupProfilePage, {
  generateStaticParams as generateStartupParams,
} from "../../app/startups/[slug]/page";
import SuccessStoriesPage from "../../app/startups/success-stories/page";
import InnovationOverviewPage from "../../app/innovation/page";
import AgriTechDomainPage from "../../app/innovation/agri-tech/page";
import SmartFarmingDomainPage from "../../app/innovation/smart-farming/page";
import FoodProcessingDomainPage from "../../app/innovation/food-processing/page";
import AgribusinessDomainPage from "../../app/innovation/agribusiness/page";
import ClimateTechDomainPage from "../../app/innovation/climate-tech/page";
import DigitalAgriAiDomainPage from "../../app/innovation/digital-agri-ai/page";
import {
  PROGRAMS_CONTINUUM,
  SCHEMES_DATA,
  MENTORS_DATA,
  TRAINING_MODULES,
  APPLICATION_STEPS,
  APPLICATION_FAQS,
} from "../../data/programs";
import {
  VERIFIED_STARTUPS_DIRECTORY,
  SUCCESS_STORIES,
} from "../../data/startups";
import { INNOVATION_DOMAINS } from "../../data/innovation";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&#x27;")
    .replace(/"/g, "&quot;");
}

describe("Programs, Agritech & Startup Ecosystem Pages (Phase 4 Task 5)", () => {
  describe("1. Programs Overview Page (/programs)", () => {
    const html = renderToStaticMarkup(<ProgramsOverviewPage />);

    it("renders page header and three-tier continuum", () => {
      expect(html).toContain("Agri-Innovation Programs");
      expect(html).toContain("The AIC-ADT Incubation Continuum");
      PROGRAMS_CONTINUUM.forEach((prog) => {
        expect(html).toContain(escapeHtml(prog.name));
        expect(html).toContain(`href="/programs/${prog.slug}"`);
      });
    });

    it("renders government and CSR funding schemes banner", () => {
      expect(html).toContain("Government Schemes");
      SCHEMES_DATA.forEach((scheme) => {
        expect(html).toContain(escapeHtml(scheme.name));
        expect(html).toContain(`href="/programs/schemes/${scheme.slug}"`);
      });
    });

    it("renders links to mentorship, training, and apply instructions", () => {
      expect(html).toContain('href="/programs/mentorship"');
      expect(html).toContain('href="/programs/training"');
      expect(html).toContain('href="/programs/apply-instructions"');
    });
  });

  describe("2. Incubation Continuum Detail Pages", () => {
    it("renders Pre-Incubation page with fast facts and audience", () => {
      const html = renderToStaticMarkup(<PreIncubationPage />);
      expect(html).toContain("Pre-Incubation Program");
      expect(html).toContain("Ideation to Proof of Concept");
      expect(html).toContain("Who Should Apply?");
      expect(html).toContain('href="/programs/apply-instructions"');
    });

    it("renders Comprehensive Incubation page with living farm testbed mentions", () => {
      const html = renderToStaticMarkup(<IncubationPage />);
      expect(html).toContain("Comprehensive Incubation Program");
      expect(html).toContain("Flagship Incubation");
      expect(html).toContain("110-Acre Living Farm Testbeds");
    });

    it("renders Acceleration page with venture capital focus", () => {
      const html = renderToStaticMarkup(<AccelerationPage />);
      expect(html).toContain("Growth Acceleration Program");
      expect(html).toContain("Pre-Series A / Series A");
      expect(html).toContain("Scaling Agritech Beyond Proof of Concept");
    });
  });

  describe("3. Government & CSR Schemes Pages", () => {
    it("renders Startup India Seed Fund Scheme (SISFS) page", () => {
      const html = renderToStaticMarkup(<StartupIndiaSchemePage />);
      expect(html).toContain("Startup India Seed Fund Scheme (SISFS)");
      expect(html).toContain("Up to ₹20 Lakhs Grant");
      expect(html).toContain("GramHeet Solutions Pvt Ltd");
      expect(html).toContain('href="https://seedfund.startupindia.gov.in/"');
    });

    it("renders MeitY GENESIS page with EiR and pilot terms", () => {
      const html = renderToStaticMarkup(<MeityGenesisPage />);
      expect(html).toContain("MeitY GENESIS (EiR &amp; Pilot Scheme)");
      expect(html).toContain("Up to ₹10 Lakhs EiR Fellowship");
      expect(html).toContain("Innosapien Agro Technologies");
    });

    it("renders Corporate CSR page with corporate partners", () => {
      const html = renderToStaticMarkup(<CsrSchemesPage />);
      expect(html).toContain("Corporate CSR Innovation Partnerships");
      expect(html).toContain("Capgemini, HDFC Bank, ED&amp;F Man");
      expect(html).toContain("Baramati Agribiotics Pvt Ltd");
    });
  });

  describe("4. Mentorship & Training Pages", () => {
    it("renders Mentorship page with verified mentors", () => {
      const html = renderToStaticMarkup(<MentorshipPage />);
      expect(html).toContain("Multidisciplinary Mentor Network");
      expect(html).toContain("69+");
      MENTORS_DATA.forEach((mentor) => {
        expect(html).toContain(escapeHtml(mentor.name));
      });
    });

    it("renders Training page with structured modules", () => {
      const html = renderToStaticMarkup(<TrainingPage />);
      expect(html).toContain("Hands-On Agritech Bootcamps");
      TRAINING_MODULES.forEach((mod) => {
        expect(html).toContain(escapeHtml(mod.title));
      });
    });
  });

  describe("5. Application Instructions & FAQs Page (/programs/apply-instructions)", () => {
    const html = renderToStaticMarkup(<ApplyInstructionsPage />);

    it("renders all 6 admission roadmap steps", () => {
      expect(html).toContain("Six Steps from Application to Induction");
      APPLICATION_STEPS.forEach((step) => {
        expect(html).toContain(escapeHtml(step.title));
      });
    });

    it("renders required document checklist and scoring rubric", () => {
      expect(html).toContain("Required Document Checklist");
      expect(html).toContain("Evaluation Scoring Rubric");
      expect(html).toContain("25%");
    });

    it("renders official FAQs", () => {
      expect(html).toContain("Frequently Asked Questions");
      APPLICATION_FAQS.forEach((faq) => {
        expect(html).toContain(escapeHtml(faq.question));
      });
    });
  });

  describe("6. Startups Directory & Profile Pages", () => {
    it("renders Startup Directory landing page with stats and portfolio cards", () => {
      const html = renderToStaticMarkup(<StartupsDirectoryPage />);
      expect(html).toContain(
        "Verified AgriTech &amp; Rural Innovation Ventures",
      );
      expect(html).toContain("71+");
      VERIFIED_STARTUPS_DIRECTORY.forEach((startup) => {
        expect(html).toContain(escapeHtml(startup.name));
      });
    });

    it("returns static params for all verified startups", async () => {
      const params = await generateStartupParams();
      expect(params.length).toBe(VERIFIED_STARTUPS_DIRECTORY.length);
      expect(params.map((p) => p.slug)).toContain("gramheet");
      expect(params.map((p) => p.slug)).toContain("innosapien");
    });

    it("renders individual startup profile page for GramHeet", async () => {
      const jsx = await StartupProfilePage({
        params: Promise.resolve({ slug: "gramheet" }),
      });
      const html = renderToStaticMarkup(jsx);

      expect(html).toContain("GramHeet Solutions Pvt Ltd");
      expect(html).toContain("35,000+ Smallholder Farmers");
      expect(html).toContain("Pankaj Mahalle &amp; Shweta Thakare");
      expect(html).toContain("Agricultural Challenge Addressed");
      expect(html).toContain("Proprietary Innovation");
    });

    it("renders Success Stories page with in-depth narrative case studies", () => {
      const html = renderToStaticMarkup(<SuccessStoriesPage />);
      expect(html).toContain("Startup Success Stories");
      SUCCESS_STORIES.forEach((story) => {
        expect(html).toContain(escapeHtml(story.title));
        expect(html).toContain(escapeHtml(story.heroMetric));
      });
    });
  });

  describe("7. Innovation Domains & Technology Showcases", () => {
    it("renders Innovation Overview page with all 6 technological domains", () => {
      const html = renderToStaticMarkup(<InnovationOverviewPage />);
      expect(html).toContain(
        "Six Technological Domains Driving Rural Transformation",
      );
      INNOVATION_DOMAINS.forEach((domain) => {
        expect(html).toContain(escapeHtml(domain.title));
        expect(html).toContain(`href="/innovation/${domain.slug}"`);
      });
    });

    it("renders Agri-Tech domain showcase page", () => {
      const html = renderToStaticMarkup(<AgriTechDomainPage />);
      expect(html).toContain("Autonomous Electric Inter-Row Weeding Rover");
      expect(html).toContain(
        "Drift-Controlled Electrostatic Drone Spray Implement",
      );
    });

    it("renders Smart Farming domain showcase page", () => {
      const html = renderToStaticMarkup(<SmartFarmingDomainPage />);
      expect(html).toContain("Micro-Weather Canopy Telemetry Tower Network");
      expect(html).toContain(
        "Multi-Depth Soil Moisture &amp; EC Capacitance Probe",
      );
    });

    it("renders Food Processing domain showcase page", () => {
      const html = renderToStaticMarkup(<FoodProcessingDomainPage />);
      expect(html).toContain("Low-Temperature Vacuum Dehydration Pilot Line");
      expect(html).toContain(
        "Decentralized Phase-Change Solar Micro-Cold Room",
      );
    });

    it("renders Agribusiness domain showcase page", () => {
      const html = renderToStaticMarkup(<AgribusinessDomainPage />);
      expect(html).toContain(
        "Integrated Village-Level Post-Harvest Micro-Warehouse Model",
      );
    });

    it("renders Climate Tech domain showcase page", () => {
      const html = renderToStaticMarkup(<ClimateTechDomainPage />);
      expect(html).toContain("Mobile Farm-Gate Agricultural Residue Pyrolyzer");
      expect(html).toContain(
        "Saline-Rhizosphere Halotolerant Microbial Consortium",
      );
    });

    it("renders Digital Agri & AI domain showcase page", () => {
      const html = renderToStaticMarkup(<DigitalAgriAiDomainPage />);
      expect(html).toContain(
        "Edge Computer-Vision Red Rot &amp; Rust Canopy Classifier",
      );
    });
  });
});
