import Image, { ImageProps } from "next/image";

type ImageNormalCustomProps = ImageProps & {
  src?: string;
  alt?: string;
  className?: string;
  preload?: boolean;
  loading?: "lazy" | "eager";
};

function ImgNormalCustom({
  src = "/placeholder.svg",
  alt = "defult alt",
  className,
  preload = false,
  loading,
  width,
  height,
  ...rest
}: ImageNormalCustomProps) {
  if (!src) {
    return null;
  }
  const finalLoading = loading ?? (preload ? "eager" : "lazy");
  const placeholder = rest.blurDataURL ? "blur" : "empty";
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      placeholder={placeholder}
      width={width}
      height={height}
      {...rest}
      loading={finalLoading}
    />
  );
}

export { ImgNormalCustom };
