import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, FileImage, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { NoticeBanner } from '../common/NoticeBanner';

interface ImageDetails {
  name: string;
  originalSize: number;
  originalType: string;
  width: number;
  height: number;
  pngBlobUrl: string | null;
  pngSize: number | null;
}

export const ImageToPngTool: React.FC = () => {
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB limit for browser performance

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate mime type and extension
    const validMimes = ['image/jpeg', 'image/jpg', 'image/webp'];
    const validExtensions = ['.jpg', '.jpeg', '.webp'];
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = validExtensions.some((ext) => fileNameLower.endsWith(ext));

    if (!validMimes.includes(file.type) && !hasValidExt) {
      setErrorMessage(
        `Unsupported file type (${file.type || 'unknown'}). Please upload a JPG, JPEG, or WebP image.`
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        `File is too large (${formatFileSize(file.size)}). To prevent browser tab crashes, the maximum supported size is 25 MB.`
      );
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onerror = () => {
      setLoading(false);
      setErrorMessage('Failed to read the selected file. Please try another image.');
    };

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        setLoading(false);
        setErrorMessage('Failed to decode the image. The file may be corrupted.');
      };

      img.onload = () => {
        try {
          // Create in-memory canvas
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setLoading(false);
            setErrorMessage('Unable to initialize HTML5 Canvas 2D context.');
            return;
          }

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Convert to PNG blob
          canvas.toBlob(
            (blob) => {
              setLoading(false);
              if (!blob) {
                setErrorMessage('Failed to generate PNG blob from canvas.');
                return;
              }

              const pngUrl = URL.createObjectURL(blob);
              setImageDetails({
                name: file.name.replace(/\.[^/.]+$/, ''),
                originalSize: file.size,
                originalType: file.type || 'image/jpeg',
                width: canvas.width,
                height: canvas.height,
                pngBlobUrl: pngUrl,
                pngSize: blob.size,
              });
            },
            'image/png',
            1.0
          );
        } catch (err) {
          setLoading(false);
          setErrorMessage(
            err instanceof Error ? err.message : 'An error occurred during canvas conversion.'
          );
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleReset = () => {
    if (imageDetails?.pngBlobUrl) {
      URL.revokeObjectURL(imageDetails.pngBlobUrl);
    }
    setImageDetails(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Educational Notice Banner (Transparency Warning) */}
      <NoticeBanner
        type="warning"
        title="Important Notice Regarding Image Transparency"
      >
        Converting a JPG, JPEG, or WebP image with an opaque background to PNG does <strong>not</strong> automatically erase or isolate the background. The PNG file format supports transparency (alpha channels), but it will accurately preserve whichever background pixels (e.g. white, black, or scenery) exist in your original uploaded image. To obtain a transparent background, the background must be clipped or removed using editing software first.
      </NoticeBanner>

      {/* Main Conversion Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {!imageDetails ? (
          <div>
            {/* Drag & Drop Upload Box */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
                  : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50/80'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label="Upload JPG, JPEG, or WebP image to convert to PNG"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.webp,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Upload className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Choose an image or drag & drop here
              </h3>
              <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
                Supports JPG, JPEG, and WebP files up to 25 MB. Entirely converted client-side using HTML5 Canvas.
              </p>
              <button
                type="button"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
              >
                Browse Image File
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Privacy Guarantee Pill / Assurance */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Your files remain 100% private. Zero bytes are uploaded to remote servers.</span>
            </div>
          </div>
        ) : (
          /* Converted Result View */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Conversion Complete</h3>
                  <p className="text-xs text-slate-500">
                    PNG file rendered locally at {imageDetails.width} × {imageDetails.height} px
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Convert Another</span>
                </button>
                {imageDetails.pngBlobUrl && (
                  <a
                    href={imageDetails.pngBlobUrl}
                    download={`${imageDetails.name}-converted.png`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </a>
                )}
              </div>
            </div>

            {/* Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Image Preview Box with checkerboard background */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  PNG Result Preview
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100 flex items-center justify-center min-h-[260px] p-4">
                  {imageDetails.pngBlobUrl && (
                    <img
                      src={imageDetails.pngBlobUrl}
                      alt="Converted PNG preview"
                      className="max-h-[340px] max-w-full object-contain rounded shadow-sm"
                    />
                  )}
                </div>
              </div>

              {/* Technical Comparison Specs */}
              <div className="space-y-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  File Metadata & Metrics
                </span>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3.5 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">File Name</span>
                    <span className="font-mono text-xs font-medium text-slate-900 truncate max-w-[200px]">
                      {imageDetails.name}.png
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">Original Type</span>
                    <span className="font-mono text-xs font-medium text-slate-700">
                      {imageDetails.originalType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">Dimensions</span>
                    <span className="font-mono text-xs font-semibold text-slate-900 tabular-nums">
                      {imageDetails.width} × {imageDetails.height} px
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">Original File Size</span>
                    <span className="font-mono text-xs text-slate-600 tabular-nums">
                      {formatFileSize(imageDetails.originalSize)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 text-xs">Converted PNG Size</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 tabular-nums">
                      {imageDetails.pngSize ? formatFileSize(imageDetails.pngSize) : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100/70 text-xs text-slate-600 leading-relaxed border border-slate-200">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                    <FileImage className="w-3.5 h-3.5" />
                    <span>Why did the file size change?</span>
                  </div>
                  PNG is a lossless compression algorithm (DEFLATE). When converting lossy JPG or WebP images with complex gradients, PNG may produce a larger file because it stores full pixel accuracy without compression artifacts.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
