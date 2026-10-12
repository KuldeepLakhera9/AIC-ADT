'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';

export interface MediaAssetItem {
  id: string;
  originalName: string;
  storageKey: string;
  publicUrl: string | null;
  mimeType: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  fileExtension: string;
  checksumSha256: string;
  mediaType: 'IMAGE' | 'DOCUMENT' | 'VIDEO' | 'OTHER';
  visibility: 'PUBLIC' | 'PRIVATE' | 'ARCHIVED';
  width: number | null;
  height: number | null;
  altTextEn: string | null;
  altTextMr: string | null;
  caption: string | null;
  attribution: string | null;
  documentType: string | null;
  reportingPeriod: string | null;
  isStatutory: boolean;
  usageCount: number;
  uploaderId: string | null;
  uploader?: { id: string; fullName: string; email: string } | null;
  createdAt: string;
  updatedAt: string;
}

export function MediaManager() {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState<string>('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('ALL');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [editingAsset, setEditingAsset] = useState<MediaAssetItem | null>(null);
  const [deletingAsset, setDeletingAsset] = useState<MediaAssetItem | null>(null);

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadVisibility, setUploadVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [altTextEn, setAltTextEn] = useState<string>('');
  const [altTextMr, setAltTextMr] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [attribution, setAttribution] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [reportingPeriod, setReportingPeriod] = useState<string>('');
  const [isStatutory, setIsStatutory] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Edit Form State
  const [editAltTextEn, setEditAltTextEn] = useState<string>('');
  const [editAltTextMr, setEditAltTextMr] = useState<string>('');
  const [editCaption, setEditCaption] = useState<string>('');
  const [editAttribution, setEditAttribution] = useState<string>('');
  const [editVisibility, setEditVisibility] = useState<'PUBLIC' | 'PRIVATE' | 'ARCHIVED'>('PUBLIC');
  const [editDocumentType, setEditDocumentType] = useState<string>('');
  const [editReportingPeriod, setEditReportingPeriod] = useState<string>('');
  const [editIsStatutory, setEditIsStatutory] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  // Deletion State
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Stable IDs for accessibility
  const uploadFileInputId = useId();
  const searchInputId = useId();
  const mediaTypeSelectId = useId();
  const visibilitySelectId = useId();

  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [retryTrigger, setRetryTrigger] = useState<number>(0);

  const triggerReload = useCallback(() => {
    setRetryTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchMedia() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('limit', '12');

        if (appliedSearch.trim()) params.set('search', appliedSearch.trim());
        if (mediaTypeFilter !== 'ALL') params.set('mediaType', mediaTypeFilter);
        if (visibilityFilter !== 'ALL') params.set('visibility', visibilityFilter);

        const res = await fetch(`/api/media?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to load media assets from repository.');

        const json = await res.json();
        if (isMounted) {
          if (json.success && json.data) {
            setAssets(json.data.items || []);
            setTotalPages(json.data.totalPages || 1);
            setTotalCount(json.data.total || 0);
          } else {
            setAssets([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error loading media.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchMedia();

    return () => {
      isMounted = false;
    };
  }, [page, appliedSearch, mediaTypeFilter, visibilityFilter, retryTrigger]);

  // Handle Client File Selection with Security Pre-checks
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.pdf'];

    if (!allowed.includes(ext)) {
      setUploadError(`Invalid extension '${ext}'. Permitted: .jpg, .jpeg, .png, .webp, .svg, .pdf`);
      e.target.value = '';
      return;
    }

    if (ext === '.pdf') {
      if (file.size > 50 * 1024 * 1024) {
        setUploadError('PDF document exceeds maximum limit of 50 MB.');
        e.target.value = '';
        return;
      }
    } else {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('Image file exceeds maximum limit of 10 MB.');
        e.target.value = '';
        return;
      }
    }

    setSelectedFile(file);
  };

  // Submit Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('visibility', uploadVisibility);
      if (altTextEn) formData.append('altTextEn', altTextEn);
      if (altTextMr) formData.append('altTextMr', altTextMr);
      if (caption) formData.append('caption', caption);
      if (attribution) formData.append('attribution', attribution);
      if (documentType) formData.append('documentType', documentType);
      if (reportingPeriod) formData.append('reportingPeriod', reportingPeriod);
      formData.append('isStatutory', isStatutory ? 'true' : 'false');

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Server rejected file upload.');
      }

      setSuccessMessage(`File '${selectedFile.name}' was successfully uploaded and registered.`);
      setTimeout(() => setSuccessMessage(null), 5000);
      setIsUploadOpen(false);
      resetUploadForm();
      triggerReload();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setUploadVisibility('PUBLIC');
    setAltTextEn('');
    setAltTextMr('');
    setCaption('');
    setAttribution('');
    setDocumentType('');
    setReportingPeriod('');
    setIsStatutory(false);
    setUploadError(null);
  };

  // Open Edit Modal
  const openEditModal = (asset: MediaAssetItem) => {
    setEditingAsset(asset);
    setEditAltTextEn(asset.altTextEn || '');
    setEditAltTextMr(asset.altTextMr || '');
    setEditCaption(asset.caption || '');
    setEditAttribution(asset.attribution || '');
    setEditVisibility(asset.visibility);
    setEditDocumentType(asset.documentType || '');
    setEditReportingPeriod(asset.reportingPeriod || '');
    setEditIsStatutory(asset.isStatutory || false);
  };

  // Submit Edit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAsset) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/media/${editingAsset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altTextEn: editAltTextEn,
          altTextMr: editAltTextMr,
          caption: editCaption,
          attribution: editAttribution,
          visibility: editVisibility,
          documentType: editDocumentType || undefined,
          reportingPeriod: editReportingPeriod || undefined,
          isStatutory: editIsStatutory,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to update metadata.');
      }

      setSuccessMessage(`Metadata for '${editingAsset.originalName}' updated.`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setEditingAsset(null);
      triggerReload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed.');
    } finally {
      setUpdating(false);
    }
  };

  // Submit Deletion
  const handleDeleteSubmit = async () => {
    if (!deletingAsset) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);

      const res = await fetch(`/api/media/${deletingAsset.id}`, {
        method: 'DELETE',
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Deletion failed.');
      }

      setSuccessMessage(`Media file '${deletingAsset.originalName}' was deleted.`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setDeletingAsset(null);
      triggerReload();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Deletion failed.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Media & Asset Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            Secure asset repository with verified file signatures, path isolation, and content reference protection.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetUploadForm();
            setIsUploadOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Media File
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-lg flex items-center justify-between text-emerald-200 text-xs">
          <span>{successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-400 hover:text-white ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Global Error Banner */}
      {error && (
        <div className="p-3 bg-rose-950/70 border border-rose-800/80 rounded-lg text-rose-200 text-xs">
          {error}
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <label htmlFor={searchInputId} className="sr-only">Search media by title</label>
            <input
              id={searchInputId}
              type="text"
              placeholder="Search filename, alt text, or caption..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setAppliedSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor={mediaTypeSelectId} className="sr-only">Filter by media type</label>
            <select
              id={mediaTypeSelectId}
              value={mediaTypeFilter}
              aria-label="Filter by media type"
              onChange={(e) => {
                setMediaTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Types</option>
              <option value="IMAGE">Images (JPG, PNG, WebP, SVG)</option>
              <option value="DOCUMENT">Documents (PDF)</option>
            </select>

            <label htmlFor={visibilitySelectId} className="sr-only">Filter by visibility</label>
            <select
              id={visibilitySelectId}
              value={visibilityFilter}
              aria-label="Filter by visibility"
              onChange={(e) => {
                setVisibilityFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Visibility</option>
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Confidential / Private</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border border-slate-800 rounded-lg p-0.5 bg-slate-950 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Content Rendering: Loading / Empty / Grid / Table */}
      {loading ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
          <div className="inline-block animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full mb-3" />
          <p className="text-xs text-slate-400">Loading media assets from storage repository...</p>
        </div>
      ) : assets.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
          <svg className="w-10 h-10 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-base font-bold text-white">No Media Assets Found</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
            {search || mediaTypeFilter !== 'ALL' || visibilityFilter !== 'ALL'
              ? 'No media assets match the selected filter criteria. Try resetting your search query.'
              : 'The media repository is empty. Upload verified photography, diagrams, or official documents.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
            >
              {/* Thumbnail / Preview Area */}
              <div className="h-36 bg-slate-950 relative flex items-center justify-center p-2 border-b border-slate-800/80">
                {asset.mediaType === 'IMAGE' && asset.publicUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={asset.publicUrl}
                    alt={asset.altTextEn || asset.originalName}
                    className="max-h-full max-w-full object-contain rounded"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <svg className="w-10 h-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[10px] uppercase font-bold tracking-wider">{asset.fileExtension.replace('.', '')}</span>
                  </div>
                )}

                {/* Visibility Badge */}
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${
                    asset.visibility === 'PUBLIC'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80'
                      : asset.visibility === 'PRIVATE'
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-800/80'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {asset.visibility}
                </span>

                {/* Usage count badge */}
                {asset.usageCount > 0 && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] bg-sky-950/80 text-sky-400 border border-sky-800/80 font-mono">
                    {asset.usageCount} in use
                  </span>
                )}
              </div>

              {/* Metadata Details */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white truncate" title={asset.originalName}>
                    {asset.originalName}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{asset.fileSizeFormatted}</span>
                    {asset.width && asset.height && (
                      <span>• {asset.width}×{asset.height}px</span>
                    )}
                  </div>

                  {asset.altTextEn && (
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 italic">
                      &quot;{asset.altTextEn}&quot;
                    </p>
                  )}

                  {asset.documentType && (
                    <span className="inline-block mt-1 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                      {asset.documentType}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`/api/media/${asset.id}/download`}
                      download={asset.originalName}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium"
                      title="Download file"
                    >
                      Download
                    </a>
                    {asset.publicUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(asset.publicUrl || '');
                          alert('Public URL copied to clipboard.');
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium"
                        title="Copy public URL"
                      >
                        Copy URL
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(asset)}
                      className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                      title="Edit metadata"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteError(null);
                        setDeletingAsset(asset);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete asset"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">File & Type</th>
                <th className="py-3 px-4 font-semibold">Size / Dimensions</th>
                <th className="py-3 px-4 font-semibold">Alt Text (English)</th>
                <th className="py-3 px-4 font-semibold">Visibility</th>
                <th className="py-3 px-4 font-semibold">References</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{asset.originalName}</div>
                    <div className="text-[11px] text-slate-400">{asset.mimeType}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{asset.fileSizeFormatted}</div>
                    {asset.width && asset.height && (
                      <div className="text-[11px] text-slate-400">{asset.width}×{asset.height}px</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                    {asset.altTextEn || <span className="text-slate-500 italic">None</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        asset.visibility === 'PUBLIC'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : asset.visibility === 'PRIVATE'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {asset.visibility}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {asset.usageCount > 0 ? (
                      <span className="text-emerald-400 font-mono text-[11px]">{asset.usageCount} reference(s)</span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Unreferenced</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={`/api/media/${asset.id}/download`}
                        download={asset.originalName}
                        className="text-slate-300 hover:text-white transition-colors"
                        title="Download"
                      >
                        Download
                      </a>
                      <button
                        type="button"
                        onClick={() => openEditModal(asset)}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError(null);
                          setDeletingAsset(asset);
                        }}
                        className="text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
          <span>
            Showing page {page} of {totalPages} ({totalCount} total assets)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-white transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Upload Media Asset</h2>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            {uploadError && (
              <div className="p-3 bg-rose-950/70 border border-rose-800/80 rounded-lg text-rose-200 text-xs">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {/* File Dropzone */}
              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-5 text-center transition-colors">
                <input
                  id={uploadFileInputId}
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.webp,.svg,.pdf"
                  className="hidden"
                />
                <label
                  htmlFor={uploadFileInputId}
                  className="cursor-pointer flex flex-col items-center justify-center space-y-1"
                >
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-semibold text-white">Click to select file or drag & drop</span>
                  <span className="text-[11px] text-slate-400">
                    JPG, PNG, WebP, SVG (up to 10MB) • PDF (up to 50MB)
                  </span>
                </label>
                {selectedFile && (
                  <div className="mt-3 p-2 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-mono text-[11px]">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>

              {/* Visibility Setting */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Storage Visibility</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadVisibility('PUBLIC')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      uploadVisibility === 'PUBLIC'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-emerald-400">Public Asset</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Static web delivery via CDN/Nginx</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadVisibility('PRIVATE')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      uploadVisibility === 'PRIVATE'
                        ? 'border-amber-500 bg-amber-950/40 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-amber-400">Confidential / Private</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Isolated, authenticated downloads only</div>
                  </button>
                </div>
              </div>

              {/* Alt Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Alternative Text (English)</label>
                  <input
                    type="text"
                    value={altTextEn}
                    onChange={(e) => setAltTextEn(e.target.value)}
                    placeholder="Descriptive text for accessibility"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Alternative Text (Marathi)</label>
                  <input
                    type="text"
                    value={altTextMr}
                    onChange={(e) => setAltTextMr(e.target.value)}
                    placeholder="मराठी वर्णन"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Caption and Attribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Caption</label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Optional public caption"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Attribution / Photographer</label>
                  <input
                    type="text"
                    value={attribution}
                    onChange={(e) => setAttribution(e.target.value)}
                    placeholder="Source attribution"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Document Specific Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Document Type (If PDF)</label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">None / General Attachment</option>
                    <option value="ANNUAL_REPORT">Annual Report</option>
                    <option value="FINANCIAL_AUDIT">Financial Audit</option>
                    <option value="POLICY_REGULATION">Policy / Regulation</option>
                    <option value="PITCH_DECK">Pitch Deck</option>
                    <option value="EVENT_BROCHURE">Event Brochure</option>
                    <option value="OTHER">Other Official Document</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Reporting Period</label>
                  <input
                    type="text"
                    value={reportingPeriod}
                    onChange={(e) => setReportingPeriod(e.target.value)}
                    placeholder="e.g. 2024-2025"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isStatutoryCheck"
                  checked={isStatutory}
                  onChange={(e) => setIsStatutory(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-emerald-600 focus:ring-0"
                />
                <label htmlFor="isStatutoryCheck" className="text-slate-300 font-medium cursor-pointer">
                  Statutory / Mandatory Compliance Document
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center gap-2"
                >
                  {uploading ? 'Validating & Uploading...' : 'Upload Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Edit Media Metadata</h2>
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Original Filename (Read-only)</label>
                <div className="font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                  {editingAsset.originalName}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Storage Visibility</label>
                <select
                  value={editVisibility}
                  onChange={(e) =>
                    setEditVisibility(
                      e.target.value as 'PUBLIC' | 'PRIVATE' | 'ARCHIVED',
                    )
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Confidential / Private</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Alt Text (English)</label>
                <input
                  type="text"
                  value={editAltTextEn}
                  onChange={(e) => setEditAltTextEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Alt Text (Marathi)</label>
                <input
                  type="text"
                  value={editAltTextMr}
                  onChange={(e) => setEditAltTextMr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Caption</label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingAsset(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold transition-colors"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white">Confirm Asset Deletion</h2>

            {deleteError ? (
              <div className="p-3 bg-rose-950/70 border border-rose-800/80 rounded-lg text-rose-200 text-xs">
                {deleteError}
              </div>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-white">&apos;{deletingAsset.originalName}&apos;</span>?
                This will purge the file from physical storage. If this file is referenced by active news or events, deletion will be blocked.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setDeletingAsset(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Close
              </button>
              {!deleteError && (
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteSubmit}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold transition-colors"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
