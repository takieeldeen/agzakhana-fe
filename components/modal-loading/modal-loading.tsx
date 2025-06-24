import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function ModalLoadingView() {
  return (
    <Dialog open>
      <DialogContent
        style={{ maxWidth: "unset" }}
        className="flex flex-col w-[32rem] max-w-96"
      >
        <DialogTitle className="p-2 rtl:text-right text-left text-3xl font-bold flex flex-col gap-2">
          <Skeleton className="w-64 h-8" />
          <div className="flex flex-row gap-2 text-base font-normal dark:text-gray-400">
            <Skeleton className="w-24 h-6" />
            <span>-</span>
            <Skeleton className="w-24 h-6" />
          </div>
        </DialogTitle>
        <Skeleton className="h-96 w-96 rounded-md" />
        <section className="flex flex-col gap-2">
          <h5 className="font-bold text-xl mb-4">
            <Skeleton className="w-64 h-8" />
          </h5>
          <div className="flex flex-row gap-2 text-gray-400">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-48 h-6" />
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-36 h-6" />
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-72 h-6" />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
