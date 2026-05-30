import FileUpload from "@/core/components/custom/ui/file-input/FileUpload";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProfileDriverTs } from "../../../assets/types/profileDriverTs";
function UploadFileProfileDriver({
  data,
  license,
}: {
  data: ProfileDriverTs;
  license: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${BASE_URL}/profile-driver/license-file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${license}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        return toast.error(result.message || "خطا در آپلود فایل");
      }

      toast.success(result.message || "گواهینامه با موفقیت آپلود شد");
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.message || "مشکل در آپلود فایل");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full md:w-2/4">
      <FileUpload
        label="آپلود تصویر گواهینامه"
        accept="image/*"
        onFileSelect={handleFileSelect}
        currentFileUrl={data.certificateUrl}
      />

      {selectedFile && (
        <div className="mt-4">
          <Button
            onClick={handleUploadSubmit}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                در حال ارسال...
              </>
            ) : (
              "ارسال گواهینامه"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default UploadFileProfileDriver;
