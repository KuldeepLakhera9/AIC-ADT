"use client";

import React, { useState } from "react";
import {
  Button,
  LinkButton,
  Heading,
  Text,
  Overline,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  StatusIndicator,
  SectionHeader,
  Breadcrumbs,
  Input,
  Textarea,
  Select,
  Checkbox,
  FormGroup,
  Alert,
  Skeleton,
  CardSkeleton,
  EmptyState,
  Grid,
  Section,
  Tabs,
  Accordion,
  MediaContainer,
} from "@/components/ui";
import { Container } from "@/components/layout/Container";

export default function DesignSystemPage() {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "agritech",
    notes: "",
    agree: true,
  });

  const colorSwatches = [
    {
      name: "Primary Forest",
      hex: "#004B2A",
      text: "#FFFFFF",
      desc: "Primary brand, primary buttons, key accents",
    },
    {
      name: "Dark Institutional",
      hex: "#063D27",
      text: "#FFFFFF",
      desc: "Deep header, footer, institutional anchor",
    },
    {
      name: "Leaf Green",
      hex: "#73992A",
      text: "#FFFFFF",
      desc: "Vibrant highlight, focus rings, badges",
    },
    {
      name: "Hover Green",
      hex: "#00643A",
      text: "#FFFFFF",
      desc: "Hover state for primary interactions",
    },
    {
      name: "Pale Botanical",
      hex: "#E8F0D9",
      text: "#17231D",
      desc: "Subtle container, badge fills, active tabs",
    },
    {
      name: "Light Botanical",
      hex: "#F3F7EC",
      text: "#17231D",
      desc: "Alternating section background, subtle tint",
    },
    {
      name: "Main Background",
      hex: "#F8FAF7",
      text: "#17231D",
      desc: "Default canvas background",
    },
    {
      name: "Surface White",
      hex: "#FFFFFF",
      text: "#17231D",
      desc: "Cards, inputs, modals",
    },
    {
      name: "Text Primary",
      hex: "#17231D",
      text: "#FFFFFF",
      desc: "High-contrast headings and body text",
    },
    {
      name: "Text Secondary",
      hex: "#647067",
      text: "#FFFFFF",
      desc: "Subtitles, secondary information",
    },
    {
      name: "Border Default",
      hex: "#DDE5DC",
      text: "#17231D",
      desc: "Cards, inputs, table dividers",
    },
  ];

  return (
    <main className="py-12 bg-[#F8FAF7] min-h-screen">
      <Container>
        {/* Top Header */}
        <div className="pb-8 border-b border-[#DDE5DC] mb-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Internal Review", href: "#" },
              { label: "Design System Showcase" },
            ]}
          />
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Overline>AIC-ADT Internal Architecture</Overline>
              <Heading level={1} size="h1" className="mt-1">
                Production Design System Showcase
              </Heading>
              <Text variant="lead" className="mt-2 max-w-2xl">
                Authoritative reference and interactive component verification
                for the AIC-ADT Baramati Foundation web platform.
              </Text>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="botanical">Phase 3 Task 3</Badge>
              <StatusIndicator
                status="active"
                label="Production Tokens Ready"
              />
            </div>
          </div>
        </div>

        {/* 1. Color Palette */}
        <section className="mb-16">
          <SectionHeader
            overline="Tokens & Foundation"
            title="Approved Brand Palette"
            description="Strict adherence to Phase 2 brand specifications and WCAG 2.2 AA contrast ratios."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {colorSwatches.map((swatch) => (
              <div
                key={swatch.name}
                className="rounded-lg border border-[#DDE5DC] overflow-hidden bg-white shadow-xs"
              >
                <div
                  className="h-20 w-full flex items-end p-2.5 font-mono text-xs font-semibold"
                  style={{ backgroundColor: swatch.hex, color: swatch.text }}
                >
                  {swatch.hex}
                </div>
                <div className="p-3">
                  <div className="font-semibold text-xs text-[#17231D]">
                    {swatch.name}
                  </div>
                  <div className="text-[11px] text-[#59665D] mt-0.5">
                    {swatch.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography & Multilingual Support */}
        <section className="mb-16">
          <SectionHeader
            overline="Typography"
            title="Type Scale & Multilingual Stack"
            description="Editorial Outfit for headings, Inter for high-legibility body, and Noto Sans Devanagari for Marathi."
          />
          <div className="mt-6 p-6 border border-[#DDE5DC] rounded-xl bg-white space-y-6">
            <div className="space-y-3 pb-6 border-b border-[#DDE5DC]">
              <Heading level={1} size="h1">
                Display Heading 1 (36px / 44px)
              </Heading>
              <Heading level={2} size="h2">
                Section Heading 2 (28px / 36px)
              </Heading>
              <Heading level={3} size="h3">
                Card Title Heading 3 (22px / 28px)
              </Heading>
              <Heading level={4} size="h4">
                Feature Title Heading 4 (18px / 24px)
              </Heading>
            </div>
            <div className="space-y-3 pb-6 border-b border-[#DDE5DC]">
              <Text variant="lead">
                Lead Body Text: Empowering agricultural innovation and rural
                entrepreneurship through world-class incubation facilities at
                Baramati.
              </Text>
              <Text variant="body">
                Standard Body Text: AIC-ADT Baramati Foundation provides
                early-stage agritech startups with specialized pilot testing
                farms, precision agriculture labs, and seed funding access.
              </Text>
              <Text variant="muted">
                Muted Secondary Text: Application deadline: November 30, 2026.
                Submissions evaluated on rolling basis.
              </Text>
            </div>
            {/* Marathi Font Test */}
            <div className="p-4 rounded-lg bg-[#F3F7EC] border border-[#73992A]/30">
              <Overline>मराठी भाषा आधार (Devanagari Fallback Test)</Overline>
              <h3
                className="text-xl font-bold text-[#004B2A] mt-1 font-heading"
                lang="mr"
              >
                अटल इन्क्युबेशन सेंटर - ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट, बारामती
              </h3>
              <p
                className="text-sm text-[#17231D] mt-2 leading-relaxed"
                lang="mr"
              >
                शेतकऱ्यांचे उत्पन्न वाढवण्यासाठी आणि कृषी क्षेत्रात नवसंशोधनाला
                चालना देण्यासाठी आधुनिक तंत्रज्ञानावर आधारित स्टार्टअप्सना
                सर्वसमावेशक सहकार्य.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Buttons & Links */}
        <section className="mb-16">
          <SectionHeader
            overline="Interactive Controls"
            title="Buttons & Link Variants"
            description="Keyboard accessible, min 44px touch targets, standard hover/focus states, and icon support."
          />
          <div className="mt-6 p-6 border border-[#DDE5DC] rounded-xl bg-white space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider mb-3">
                Variants
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Forest</Button>
                <Button variant="secondary">Secondary Leaf</Button>
                <Button variant="institutional">Dark Institutional</Button>
                <Button variant="botanical">Pale Botanical</Button>
                <Button variant="outline">Outline Border</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="destructive">Destructive Red</Button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE5DC]">
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider mb-3">
                Sizes & States
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (36px)</Button>
                <Button size="md">Medium (44px)</Button>
                <Button size="lg">Large (52px)</Button>
                <Button isLoading>Processing...</Button>
                <Button disabled>Disabled Action</Button>
                <LinkButton href="#test" variant="primary">
                  Next.js Link Button
                </LinkButton>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Badges & Status Indicators */}
        <section className="mb-16">
          <SectionHeader
            overline="Data Indicators"
            title="Badges & Status Dots"
            description="Non-color-reliant status communication compliant with WCAG 1.4.1."
          />
          <div className="mt-6 p-6 border border-[#DDE5DC] rounded-xl bg-white space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider mb-3">
                Badge Variants
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Primary Forest</Badge>
                <Badge variant="botanical">Botanical Pale</Badge>
                <Badge variant="success">Cohort Selected</Badge>
                <Badge variant="warning">Application Pending</Badge>
                <Badge variant="error">Verification Failed</Badge>
                <Badge variant="info">Upcoming Webinar</Badge>
                <Badge variant="neutral">General Tag</Badge>
              </div>
            </div>
            <div className="pt-4 border-t border-[#DDE5DC]">
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider mb-3">
                Status Indicators
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <StatusIndicator status="active" label="Incubating (Active)" />
                <StatusIndicator status="warning" label="Review In Progress" />
                <StatusIndicator status="error" label="Applications Closed" />
                <StatusIndicator status="neutral" label="Graduated Alumni" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Form Controls */}
        <section className="mb-16">
          <SectionHeader
            overline="Inputs & Data Entry"
            title="Form Components"
            description="Accessible labels, input addons, inline error validation, and custom selects."
          />
          <div className="mt-6 p-6 border border-[#DDE5DC] rounded-xl bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup
                id="founder-name"
                label="Lead Founder Name"
                required
                helperText="Enter full legal name as per institutional records."
              >
                {({ id, isInvalid, errorId }) => (
                  <Input
                    id={id}
                    placeholder="e.g. Dr. Rajesh Shinde"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    isInvalid={isInvalid}
                    errorId={errorId}
                  />
                )}
              </FormGroup>

              <FormGroup
                id="startup-email"
                label="Official Email Address"
                required
                error={
                  formData.email.length > 0 && !formData.email.includes("@")
                    ? "Please provide a valid institutional email address."
                    : undefined
                }
              >
                {({ id, isInvalid, errorId }) => (
                  <Input
                    id={id}
                    type="email"
                    placeholder="founder@agristartup.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    isInvalid={isInvalid}
                    errorId={errorId}
                  />
                )}
              </FormGroup>

              <FormGroup
                id="sector-category"
                label="Primary Innovation Sector"
                required
              >
                {({ id, isInvalid, errorId }) => (
                  <Select
                    id={id}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    isInvalid={isInvalid}
                    errorId={errorId}
                    options={[
                      { value: "agritech", label: "Precision AgriTech & IoT" },
                      { value: "biotech", label: "Soil Health & AgriBiotech" },
                      {
                        value: "postharvest",
                        label: "Post-Harvest & Cold Chain",
                      },
                      { value: "fintech", label: "Rural Agri-FinTech" },
                    ]}
                  />
                )}
              </FormGroup>

              <FormGroup
                id="project-synopsis"
                label="Technology Synopsis"
                optionalText="(Max 300 words)"
              >
                {({ id, isInvalid, errorId }) => (
                  <Textarea
                    id={id}
                    rows={3}
                    placeholder="Briefly describe your agricultural technology innovation..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    isInvalid={isInvalid}
                    errorId={errorId}
                  />
                )}
              </FormGroup>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDE5DC]">
              <Checkbox
                id="terms-check"
                label="I confirm all technical claims are verifiable through pilot testing."
                description="AIC-ADT incubates early-stage ventures with rigorous validation on test farms."
                checked={formData.agree}
                onChange={(e) =>
                  setFormData({ ...formData, agree: e.target.checked })
                }
              />
            </div>
          </div>
        </section>

        {/* 6. Alerts & Feedback */}
        <section className="mb-16">
          <SectionHeader
            overline="Notifications"
            title="Alerts & System Feedback"
            description="Polite and assertive ARIA live notifications across four severity levels."
          />
          <div className="mt-6 space-y-4">
            {!alertDismissed && (
              <Alert
                variant="info"
                title="Cohort 6 Applications Open"
                onDismiss={() => setAlertDismissed(true)}
              >
                Applications for the Winter 2026 AgTech Accelerator are now
                being accepted. Funding up to ₹25 Lakhs available.
              </Alert>
            )}
            <Alert variant="success" title="Application Submitted Successfully">
              Your institutional proposal has been registered under reference
              #AIC-2026-089. An acknowledgement email was sent.
            </Alert>
            <Alert variant="warning" title="Document Verification Incomplete">
              Please upload audited balance sheets for the prior financial year
              before final screening committee review.
            </Alert>
            <Alert variant="error" title="Submission Deadline Passed">
              The window for Stage 1 grant disbursement has concluded for this
              quarter. Next cycle opens January 2027.
            </Alert>
          </div>
        </section>

        {/* 7. Cards & Layout Primitives */}
        <section className="mb-16">
          <SectionHeader
            overline="Content Containers"
            title="Cards & Grid Layouts"
            description="Modular composable card containers with subtle elevation and hover states."
          />
          <Grid cols={3} gap="lg" className="mt-6">
            <Card isHoverable>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="botanical">Precision Farming</Badge>
                  <StatusIndicator status="active" label="Incubated" />
                </div>
                <CardTitle>KrishiDrishti Sensors</CardTitle>
                <CardDescription>
                  IoT soil moisture and nutrient monitoring platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small">
                  Deployed across 420 hectares in Baramati region, helping
                  sugarcane farmers reduce irrigation water usage by 32%.
                </Text>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-[#59665D]">Cohort 2025</span>
                <Button size="sm" variant="outline">
                  View Case Study
                </Button>
              </CardFooter>
            </Card>

            <Card isHoverable>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="info">AgriBiotech</Badge>
                  <StatusIndicator status="active" label="Incubated" />
                </div>
                <CardTitle>BioFlora Organics</CardTitle>
                <CardDescription>
                  Microbial bio-fertilizers and bio-pesticides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small">
                  Developing indigenous bio-stimulants certified for
                  residue-free pomegranate and grape export cultivation.
                </Text>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-[#59665D]">Cohort 2024</span>
                <Button size="sm" variant="outline">
                  View Case Study
                </Button>
              </CardFooter>
            </Card>

            <Card variant="botanical">
              <CardHeader>
                <Badge variant="default" className="self-start mb-2">
                  Special Facility
                </Badge>
                <CardTitle>Center of Excellence</CardTitle>
                <CardDescription>
                  Precision farming testbeds & lab access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small">
                  110 acres of live test farms with automated micro-irrigation,
                  drone demonstration airstrips, and sensor grids.
                </Text>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="institutional">
                  Explore Facilities
                </Button>
              </CardFooter>
            </Card>
          </Grid>
        </section>

        {/* 8. Skeletons & Empty States */}
        <section className="mb-16">
          <SectionHeader
            overline="Loading & Zero-Data"
            title="Skeletons & Empty States"
            description="Graceful progressive loading with reduced-motion compliance and informative fallback states."
          />
          <Grid cols={3} gap="lg" className="mt-6">
            <CardSkeleton />
            <div className="p-6 border border-[#DDE5DC] rounded-xl bg-white space-y-4">
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider">
                Skeleton Primitives
              </div>
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="space-y-2 flex-1">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              <Skeleton variant="rectangular" height={80} />
              <div className="space-y-1.5">
                <Skeleton variant="text" />
                <Skeleton variant="text" width="85%" />
              </div>
            </div>
            <EmptyState
              title="No Startups Match Selected Filters"
              description="Try adjusting your sector or cohort filters to view incubatees in our agritech directory."
              action={
                <Button variant="outline" size="sm">
                  Reset Filter Selections
                </Button>
              }
            />
          </Grid>
        </section>

        {/* Section Layout Primitive Demo */}
        <Section
          background="botanical"
          spacing="sm"
          className="mb-16 rounded-xl border border-[#73992A]/30 px-6"
        >
          <SectionHeader
            overline="Layout Primitives"
            title="Semantic Section Component"
            description="Configurable section spacing (none, sm, md, lg) and backgrounds (main, botanical, white, dark, forest)."
          />
          <div className="mt-4 text-xs text-[#59665D]">
            Rendered with <code>background=&quot;botanical&quot;</code> and{" "}
            <code>spacing=&quot;sm&quot;</code>.
          </div>
        </Section>

        {/* 9. Disclosures: Tabs & Accordion */}
        <section className="mb-16">
          <SectionHeader
            overline="Information Architecture"
            title="Accessible Tabs & Accordion"
            description="Full WAI-ARIA tablist pattern with arrow-key navigation and collapsible disclosures."
          />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border border-[#DDE5DC] rounded-xl bg-white">
            <div>
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider mb-4">
                Tabs Component
              </div>
              <Tabs
                ariaLabel="Program Information Tabs"
                items={[
                  {
                    id: "overview",
                    label: "Program Overview",
                    content: (
                      <Text variant="small">
                        The AIC-ADT incubation initiative is supported by AIM,
                        NITI Aayog. We offer deep agritech mentorship, seed
                        grant assistance, and access to the Baramati Krishi
                        Vigyan Kendra ecosystem.
                      </Text>
                    ),
                  },
                  {
                    id: "eligibility",
                    label: "Eligibility Criteria",
                    content: (
                      <Text variant="small">
                        Registered Indian startups (DPIIT recognized) with a
                        validated prototype or minimum viable product (TRL 4+)
                        addressing agriculture, food processing, or rural
                        livelihoods.
                      </Text>
                    ),
                  },
                  {
                    id: "benefits",
                    label: "Incubation Benefits",
                    content: (
                      <Text variant="small">
                        Subsidized testing infrastructure, IP registration
                        assistance, legal and secretarial compliance support,
                        and demo days with institutional agri-investors.
                      </Text>
                    ),
                  },
                ]}
              />
            </div>

            <div>
              <div className="text-xs font-semibold text-[#59665D] uppercase tracking-wider mb-4">
                Accordion Component
              </div>
              <Accordion
                items={[
                  {
                    id: "faq-1",
                    title: "What seed funding support is provided?",
                    content:
                      "Selected incubatees can access seed grants up to ₹25 Lakhs under various government schemes (SISFS, NIDHI-EIR, NIDHI-PRAYAS) subject to screening committee approvals.",
                  },
                  {
                    id: "faq-2",
                    title: "Is physical residency required at Baramati?",
                    content:
                      "Both residential and virtual incubation programs are offered. Hardware and biotech startups typically benefit from physical access to the 110-acre demonstration farms.",
                  },
                  {
                    id: "faq-3",
                    title: "How long does the evaluation process take?",
                    content:
                      "The selection process typically spans 3 to 4 weeks from initial screening to pitch presentation before the advisory committee.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 10. Media Containers */}
        <section className="mb-16">
          <SectionHeader
            overline="Media Presentation"
            title="Image & Media Containers"
            description="Standard aspect ratios (16:9, 4:3, 1:1) with semantic figure and figcaption markup."
          />
          <Grid cols={3} gap="lg" className="mt-6">
            <MediaContainer
              aspectRatio="16/9"
              caption="16:9 Aspect Ratio: Baramati Krishi Vigyan Kendra demonstration fields"
            >
              <div className="w-full h-full bg-[#E8F0D9] flex items-center justify-center text-[#004B2A] font-semibold text-sm">
                16:9 Demonstration Testbed
              </div>
            </MediaContainer>
            <MediaContainer
              aspectRatio="4/3"
              caption="4:3 Aspect Ratio: Precision biotech laboratory equipment"
            >
              <div className="w-full h-full bg-[#F3F7EC] flex items-center justify-center text-[#004B2A] font-semibold text-sm">
                4:3 Precision Lab Setup
              </div>
            </MediaContainer>
            <MediaContainer
              aspectRatio="1/1"
              caption="1:1 Aspect Ratio: Founder showcase portrait frame"
            >
              <div className="w-full h-full bg-[#EAEFE8] flex items-center justify-center text-[#004B2A] font-semibold text-sm">
                1:1 Founder Portrait
              </div>
            </MediaContainer>
          </Grid>
        </section>
      </Container>
    </main>
  );
}
