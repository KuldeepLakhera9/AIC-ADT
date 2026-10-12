import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "../ui/Button.tsx";
import { Badge } from "../ui/Badge.tsx";
import { Alert } from "../ui/Alert.tsx";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card.tsx";
import { FormGroup } from "../ui/FormGroup.tsx";
import { Input } from "../ui/Input.tsx";
import { Header } from "../layout/Header.tsx";
import { Footer } from "../layout/Footer.tsx";
import { Container } from "../layout/Container.tsx";
import NotFound from "../../app/not-found.tsx";
import ErrorBoundary from "../../app/error.tsx";

describe("Frontend Quality Gates: Component & Layout Verification", () => {
  describe("Root Layout & Navigation Primitives", () => {
    it("renders Container with responsive max width and auto margins", () => {
      const html = renderToStaticMarkup(
        <Container className="custom-test-class">
          <span>Test Container Content</span>
        </Container>,
      );
      expect(html).toContain("max-w-[1240px]");
      expect(html).toContain("mx-auto");
      expect(html).toContain("custom-test-class");
      expect(html).toContain("Test Container Content");
    });

    it("renders Header with institutional branding, navigation pillars, and bilingual switcher", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain("header");
      expect(html).toContain("AIC-ADT Baramati Foundation");
      expect(html).toContain("Atal Innovation Mission (NITI Aayog)");
      expect(html).toContain("About");
      expect(html).toContain("Programs");
      expect(html).toContain("Startups");
      expect(html).toContain("Apply for Incubation");
    });

    it("renders Footer with copyright and campus address", () => {
      const html = renderToStaticMarkup(<Footer />);
      expect(html).toContain("footer");
      expect(html).toContain("AIC-ADT Baramati Foundation");
      expect(html).toContain("Agricultural Development Trust, Baramati");
      expect(html).toContain("Sharadanagar");
      expect(html).toContain("Baramati");
      expect(html).toContain("All rights reserved.");
    });
  });

  describe("Shared UI Component Variants & Accessibility", () => {
    it("renders Button variants with accessible attributes and minimum touch targets (>= 44px)", () => {
      const primaryHtml = renderToStaticMarkup(
        <Button variant="primary" size="md">
          Submit Application
        </Button>,
      );
      expect(primaryHtml).toContain("bg-[#004B2A]");
      expect(primaryHtml).toContain("min-h-[44px]");
      expect(primaryHtml).toContain("Submit Application");

      const outlineHtml = renderToStaticMarkup(
        <Button variant="outline" size="sm" aria-label="Explore Agri-Tech">
          Explore
        </Button>,
      );
      expect(outlineHtml).toContain("border-[#004B2A]");
      expect(outlineHtml).toContain('aria-label="Explore Agri-Tech"');
    });

    it("renders Badge variants with semantic feedback styling", () => {
      const successHtml = renderToStaticMarkup(
        <Badge variant="success">Incubated</Badge>,
      );
      expect(successHtml).toContain("bg-[#EAF5EE]");
      expect(successHtml).toContain("text-[#1B7340]");
      expect(successHtml).toContain("Incubated");

      const botanicalHtml = renderToStaticMarkup(
        <Badge variant="botanical">Agri-Tech</Badge>,
      );
      expect(botanicalHtml).toContain("bg-[#E8F0D9]");
      expect(botanicalHtml).toContain("Agri-Tech");
    });

    it("renders Alert with role=status or role=alert and semantic styling", () => {
      const warningHtml = renderToStaticMarkup(
        <Alert variant="warning" title="Deadline Approaching">
          Applications for SISFS Batch 2026 close soon.
        </Alert>,
      );
      expect(warningHtml).toContain('role="status"');
      expect(warningHtml).toContain("Deadline Approaching");
      expect(warningHtml).toContain(
        "Applications for SISFS Batch 2026 close soon.",
      );
      expect(warningHtml).toContain("bg-[#FFFBEB]");

      const errorHtml = renderToStaticMarkup(
        <Alert variant="error" title="Validation Error">
          Submission failed.
        </Alert>,
      );
      expect(errorHtml).toContain('role="alert"');
      expect(errorHtml).toContain("Validation Error");
      expect(errorHtml).toContain("bg-[#FEF2F2]");
    });

    it("renders Card compound structure with header, title, and content", () => {
      const cardHtml = renderToStaticMarkup(
        <Card variant="default">
          <CardHeader>
            <CardTitle>Agri-Tech Incubation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access prototyping labs and seed funding.</p>
          </CardContent>
        </Card>,
      );
      expect(cardHtml).toContain("bg-white");
      expect(cardHtml).toContain("rounded-lg");
      expect(cardHtml).toContain("Agri-Tech Incubation");
      expect(cardHtml).toContain("Access prototyping labs and seed funding.");
    });
  });

  describe("Accessible Form Controls & Label Associations", () => {
    it("renders FormGroup, FormLabel, and Input with error state and aria-describedby", () => {
      const formHtml = renderToStaticMarkup(
        <FormGroup
          id="startup-name"
          label="Startup Legal Name"
          required
          error="Startup name is required."
        >
          {({ id, isInvalid, errorId }) => (
            <Input
              id={id}
              name="startupName"
              isInvalid={isInvalid}
              errorId={errorId}
              placeholder="e.g. KrishiVikas Tech Pvt Ltd"
            />
          )}
        </FormGroup>,
      );
      expect(formHtml).toContain('for="startup-name"');
      expect(formHtml).toContain("Startup Legal Name");
      expect(formHtml).toContain('id="startup-name"');
      expect(formHtml).toContain('aria-invalid="true"');
      expect(formHtml).toContain('aria-describedby="startup-name-error"');
      expect(formHtml).toContain("border-[#DC2626]");
      expect(formHtml).toContain("Startup name is required.");
    });
  });

  describe("Error and Not-Found Pages", () => {
    it("renders branded 404 Not Found page with return call-to-action", () => {
      const notFoundHtml = renderToStaticMarkup(<NotFound />);
      expect(notFoundHtml).toContain("404");
      expect(notFoundHtml).toContain("Page Not Found");
      expect(notFoundHtml).toContain("Return to Overview");
      expect(notFoundHtml).toContain('href="/"');
    });

    it("renders ErrorBoundary with descriptive error banner and retry action", () => {
      const mockError = new Error("Diagnostic Test Error");
      const mockReset = () => {};
      const errorHtml = renderToStaticMarkup(
        <ErrorBoundary error={mockError} reset={mockReset} />,
      );
      expect(errorHtml).toContain("Application Error Encountered");
      expect(errorHtml).toContain("Try Again");
    });
  });
});
