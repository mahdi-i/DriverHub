import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/shadcn/ui/dialog/dialog";
import { cn } from "@/core/utils/shadcn/utils";
function Modal({
  children,
  title,
  description,
  open,
  onOpenChange,
  trigger,
  showCloseButton = true,
  footer,
  className,
  hideDefaultFooter = false,
}: Readonly<{
  trigger?: React.ReactNode;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  hideDefaultFooter?: boolean;
}>) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className={cn("sm:max-w-2xl", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="mt-4">{children}</div>
          {!hideDefaultFooter && (
            <DialogFooter className="mt-6">
              {footer ? (
                footer
              ) : (
                <>
                  <DialogClose asChild>
                    <Button variant="outline">لغو کردن</Button>
                  </DialogClose>
                  <Button type="submit" form="modal-form">
                    تایید
                  </Button>
                </>
              )}
            </DialogFooter>
          )}
          {showCloseButton && (
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <span className="sr-only">لغو کردن</span>×
            </DialogClose>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modal;
