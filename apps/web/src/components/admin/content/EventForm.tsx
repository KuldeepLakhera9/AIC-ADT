'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface EventFormData {
  slug: string;
  category: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  timeRange: string;
  venueType: string;
  organizer: string;
  registrationUrl?: string;
  registrationDeadline?: string;
  isExternal: boolean;
  locale: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  venueName: string;
  venueAddress: string;
  targetAudience: string;
  agendaHighlights: string;
}

export interface EventInitialData {
  id: string;
  slug: string;
  category: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  timeRange: string;
  venueType: string;
  organizer: string;
  registrationUrl?: string | null;
  registrationDeadline?: string | null;
  isExternal: boolean;
  translations: Array<{
    locale: string;
    title: string;
    shortDescription: string;
    fullDescription?: unknown;
    venueName: string;
    venueAddress: string;
    targetAudience?: string[];
    agendaHighlights?: string[];
    status: string;
  }>;
}

interface EventFormProps {
  initialData?: EventInitialData;
  onSubmit: (data: EventFormData, submitForReview: boolean) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export default function EventForm({
  initialData,
  onSubmit,
  loading,
  error,
}: EventFormProps) {
  const currentTranslation = initialData?.translations?.[0];

  const [formData, setFormData] = useState<EventFormData>({
    slug: initialData?.slug || '',
    category: initialData?.category || 'TECHNICAL_WORKSHOP',
    eventStatus: initialData?.eventStatus || 'UPCOMING',
    startDate: initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    endDate: initialData?.endDate
      ? new Date(initialData.endDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    timeRange: initialData?.timeRange || '09:30 AM - 05:00 PM IST',
    venueType: initialData?.venueType || 'IN_PERSON',
    organizer: initialData?.organizer || 'AIC-ADT Baramati Foundation',
    registrationUrl: initialData?.registrationUrl || '',
    registrationDeadline: initialData?.registrationDeadline
      ? new Date(initialData.registrationDeadline).toISOString().split('T')[0]
      : '',
    isExternal: initialData?.isExternal ?? false,
    locale: currentTranslation?.locale || 'en',
    title: currentTranslation?.title || '',
    shortDescription: currentTranslation?.shortDescription || '',
    fullDescription: Array.isArray(currentTranslation?.fullDescription)
      ? currentTranslation.fullDescription.join('\n\n')
      : typeof currentTranslation?.fullDescription === 'string'
      ? currentTranslation.fullDescription
      : '',
    venueName: currentTranslation?.venueName || 'Baramati Incubation Campus',
    venueAddress:
      currentTranslation?.venueAddress ||
      'Sharadanagar, Baramati, Maharashtra 413115',
    targetAudience: Array.isArray(currentTranslation?.targetAudience)
      ? currentTranslation.targetAudience.join(', ')
      : '',
    agendaHighlights: Array.isArray(currentTranslation?.agendaHighlights)
      ? currentTranslation.agendaHighlights.join(', ')
      : '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.slug.trim()) {
      errs.slug = 'Slug is required.';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug.trim())) {
      errs.slug = 'Slug must contain only lowercase letters, numbers, and hyphens.';
    }

    if (!formData.title.trim()) {
      errs.title = 'Title is required (minimum 5 characters).';
    } else if (formData.title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters long.';
    }

    if (!formData.shortDescription.trim()) {
      errs.shortDescription = 'Short description is required.';
    } else if (formData.shortDescription.trim().length < 10) {
      errs.shortDescription = 'Short description must be at least 10 characters long.';
    }

    if (!formData.startDate) {
      errs.startDate = 'Start date is required.';
    }
    if (!formData.endDate) {
      errs.endDate = 'End date is required.';
    }
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        errs.endDate = 'End date cannot precede the start date.';
      }
    }

    if (formData.registrationDeadline && formData.endDate) {
      if (new Date(formData.registrationDeadline) > new Date(formData.endDate)) {
        errs.registrationDeadline = 'Registration deadline cannot be after the event end date.';
      }
    }

    if (!formData.venueName.trim()) {
      errs.venueName = 'Venue name is required.';
    }
    if (!formData.venueAddress.trim()) {
      errs.venueAddress = 'Venue address is required.';
    }
    if (!formData.organizer.trim()) {
      errs.organizer = 'Organizer is required.';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleFormSubmit = async (
    e: React.FormEvent,
    submitForReview: boolean,
  ) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData, submitForReview);
    setIsDirty(false);
  };

  return (
    <form className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs">
          <strong>Validation / Submission Error:</strong> {error}
        </div>
      )}

      {isDirty && (
        <div className="p-3 bg-amber-950/40 border border-amber-800/80 rounded-lg text-amber-200 text-xs flex items-center justify-between">
          <span>You have unsaved changes in this event draft.</span>
          <span className="font-mono text-[10px] uppercase text-amber-400">
            Unsaved Changes
          </span>
        </div>
      )}

      {/* Top Header & Workflow Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {initialData ? 'Edit Event Schedule' : 'Schedule New Event'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Author incubator workshops, hackathons, and cohort application deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            disabled={loading}
            onClick={(e) => handleFormSubmit(e, false)}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={(e) => handleFormSubmit(e, true)}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-5">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
              Event Overview & Content
            </h2>

            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Event Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Precision Agricultural Drone Telemetry Workshop"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
              {validationErrors.title && (
                <p className="text-[11px] text-red-400 mt-1">
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="shortDescription"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Short Summary / Teaser *
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary displayed on cards and search results..."
                className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
              {validationErrors.shortDescription && (
                <p className="text-[11px] text-red-400 mt-1">
                  {validationErrors.shortDescription}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="fullDescription"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Full Agenda & Curriculum (Paragraphs or Markdown)
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                rows={6}
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Detailed session breakdowns, speaker bios, and topics..."
                className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="venueName"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Venue Name *
                </label>
                <input
                  id="venueName"
                  name="venueName"
                  type="text"
                  value={formData.venueName}
                  onChange={handleChange}
                  placeholder="e.g. AIC-ADT Innovation Hall"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
                {validationErrors.venueName && (
                  <p className="text-[11px] text-red-400 mt-1">
                    {validationErrors.venueName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="venueAddress"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Venue Address *
                </label>
                <input
                  id="venueAddress"
                  name="venueAddress"
                  type="text"
                  value={formData.venueAddress}
                  onChange={handleChange}
                  placeholder="e.g. Sharadanagar, Baramati 413115"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
                {validationErrors.venueAddress && (
                  <p className="text-[11px] text-red-400 mt-1">
                    {validationErrors.venueAddress}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="targetAudience"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Target Audience (comma-separated)
                </label>
                <input
                  id="targetAudience"
                  name="targetAudience"
                  type="text"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="Agritech Startups, Researchers, Farmers"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="agendaHighlights"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Key Highlights (comma-separated)
                </label>
                <input
                  id="agendaHighlights"
                  name="agendaHighlights"
                  type="text"
                  value={formData.agendaHighlights}
                  onChange={handleChange}
                  placeholder="Flight Demos, Sensor Calibration, Grants"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls & Metadata */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
              Schedule & Logistics
            </h2>

            <div>
              <label
                htmlFor="startDate"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Start Date *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
              {validationErrors.startDate && (
                <p className="text-[10px] text-red-400 mt-0.5">
                  {validationErrors.startDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                End Date *
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
              {validationErrors.endDate && (
                <p className="text-[10px] text-red-400 mt-0.5">
                  {validationErrors.endDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="timeRange"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Time Range *
              </label>
              <input
                id="timeRange"
                name="timeRange"
                type="text"
                value={formData.timeRange}
                onChange={handleChange}
                placeholder="09:30 AM - 05:00 PM IST"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label
                htmlFor="venueType"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Venue Format
              </label>
              <select
                id="venueType"
                name="venueType"
                value={formData.venueType}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="IN_PERSON">In-Person Campus</option>
                <option value="ONLINE">Online Portal</option>
                <option value="HYBRID">Hybrid Event</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="eventStatus"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Event Schedule Status
              </label>
              <select
                id="eventStatus"
                name="eventStatus"
                value={formData.eventStatus}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="REGISTRATION_CLOSED">Registration Closed</option>
                <option value="CONCLUDED">Concluded</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="POSTPONED">Postponed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="TECHNICAL_WORKSHOP">Technical Workshop</option>
                <option value="INTAKE_DEADLINE">Intake Deadline</option>
                <option value="FIELD_SHOWCASE">Field Showcase</option>
                <option value="ECOSYSTEM_CONCLAVE">Ecosystem Conclave</option>
                <option value="TRAINING_BOOTCAMP">Training Bootcamp</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="organizer"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Organizer *
              </label>
              <input
                id="organizer"
                name="organizer"
                type="text"
                value={formData.organizer}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
              {validationErrors.organizer && (
                <p className="text-[10px] text-red-400 mt-0.5">
                  {validationErrors.organizer}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="registrationUrl"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Registration URL (Optional)
              </label>
              <input
                id="registrationUrl"
                name="registrationUrl"
                type="url"
                value={formData.registrationUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label
                htmlFor="registrationDeadline"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Registration Deadline (Optional)
              </label>
              <input
                id="registrationDeadline"
                name="registrationDeadline"
                type="date"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              />
              {validationErrors.registrationDeadline && (
                <p className="text-[10px] text-red-400 mt-0.5">
                  {validationErrors.registrationDeadline}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label
                htmlFor="slug"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                URL Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. drone-telemetry-workshop"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
              />
              {validationErrors.slug && (
                <p className="text-[10px] text-red-400 mt-0.5">
                  {validationErrors.slug}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="locale"
                className="block text-[11px] font-semibold text-slate-400 mb-1"
              >
                Target Locale
              </label>
              <select
                id="locale"
                name="locale"
                value={formData.locale}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
              >
                <option value="en">English (en)</option>
                <option value="mr">Marathi (mr)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
