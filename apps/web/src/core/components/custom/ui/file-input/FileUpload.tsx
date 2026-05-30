"use client";
import { cn } from "@/core/utils/shadcn/utils";
import { CheckCircle2, File, Upload, X } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../../../shadcn/ui/button/button";
import { ImgNormalCustom } from "../image/ImgNormalCustom";
import { TypographyMuted, TypographySpan } from "../typography/Typography";

interface UploadedFile {
  file: File;
  preview?: string;
}

function FileUpload({
  label = "آپلود فایل",
  accept = "image/*",
  placeholder = "فایل خود را اینجا بکشید یا کلیک کنید",
  onFileSelect,
  className,
  currentFileUrl,
}: {
  label?: string;
  accept?: string;
  placeholder?: string;
  onFileSelect?: (file: File | null) => void;
  className?: string;
  currentFileUrl?: string;
}) {
  const [localFile, setLocalFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = localFile?.preview || currentFileUrl;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }

  function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم فایل نباید بیشتر از 5 مگابایت باشد.");
      return;
    }
    const fileData: UploadedFile = {
      file,
      preview: URL.createObjectURL(file),
    };
    setLocalFile(fileData);
    if (onFileSelect) {
      onFileSelect(file);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleRemoveFile() {
    setLocalFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      {!localFile && !currentFileUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer transition-all duration-300 ease-in-out bg-slate-50 dark:bg-slate-900/50",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-muted dark:hover:bg-foreground",
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <div
              className={cn(
                "p-3 rounded-full transition-colors",
                isDragging
                  ? "bg-primary text-white"
                  : "bg-slate-200 dark:bg-foreground text-slate-500 dark:text-slate-400",
              )}
            >
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <TypographySpan className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {placeholder}
              </TypographySpan>
              <TypographyMuted className="text-xs">
                JPG, PNG یا PDF (حداکثر 5MB)
              </TypographyMuted>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-foreground rounded-sm p-4  transition-all ">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted dark:bg-foreground border border-slate-200 dark:border-slate-700">
              {displayUrl ? (
                <ImgNormalCustom
                  src={displayUrl}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <File className="w-8 h-8" />
                </div>
              )}
              {localFile && (
                <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <TypographySpan className="block text-sm font-medium text-slate-900 dark:text-white truncate">
                {localFile ? localFile.file.name : "گواهینامه آپلود شده"}
              </TypographySpan>
              <TypographyMuted className="text-xs">
                {localFile
                  ? `(انتخاب شده - آماده ارسال)`
                  : "فایل از قبل موجود است"}
              </TypographyMuted>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
