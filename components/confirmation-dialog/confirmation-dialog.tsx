import {
  cloneElement,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ConfirmationContentProps,
  ConfirmationContextProps,
  ConfirmationTitleProps,
} from "./types";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
  children: ReactNode;
  open?: boolean;
  onClose?: Function;
}

export const ConfirmationDialogContext = createContext<
  ConfirmationContextProps | undefined
>(undefined);
///////////////////////////////////////////////////
// Confirmation Container
///////////////////////////////////////////////////
function Confirmation({
  children,
  open = false,
  onClose = () => {},
}: ConfirmationDialogProps) {
  const [opened, setOpened] = useState<boolean>(open);
  const openDialog = useCallback(() => {
    setOpened(false);
  }, []);
  const closeDialog = useCallback(() => {
    setOpened(false);
    onClose();
  }, [onClose]);
  const toggleDialog = useCallback(() => setOpened((prev) => !prev), []);
  useEffect(() => {
    if (open) setOpened(open);
  }, [open]);
  return (
    <ConfirmationDialogContext.Provider
      value={{ opened, setOpened, openDialog, closeDialog, toggleDialog }}
    >
      {children}
    </ConfirmationDialogContext.Provider>
  );
}
///////////////////////////////////////////////////
// Confirmation Trigger
///////////////////////////////////////////////////
function ConfirmationTrigger({ children }: { children: any }) {
  const confirmationContext = useContext(ConfirmationDialogContext);

  const openConfirmation = useCallback(() => {
    if (confirmationContext) confirmationContext.setOpened((prev) => !prev);
  }, [confirmationContext]);

  return cloneElement(children, { onClick: openConfirmation });
}
///////////////////////////////////////////////////
// Confirmation Title
///////////////////////////////////////////////////
function ConfirmationTitle({ children, ...other }: ConfirmationTitleProps) {
  const baseStyles = "text-lg text-white";
  if (typeof children === "string")
    return (
      <h2 {...other} className={`${baseStyles} ${other?.className ?? ""}`}>
        {children}
      </h2>
    );
  return cloneElement(children as any, {
    className: `${baseStyles} ${other?.className ?? ""}`,
  });
}
///////////////////////////////////////////////////
// Confirmation Description
///////////////////////////////////////////////////
function ConfirmationDescription({
  children,
  ...other
}: ConfirmationTitleProps) {
  const baseStyles = "text-base text-gray-300";
  if (typeof children === "string")
    return (
      <h2 {...other} className={`${baseStyles} ${other?.className ?? ""}`}>
        {children}
      </h2>
    );
  return cloneElement(children as any, {
    className: `${baseStyles} ${other?.className ?? ""}`,
  });
}
///////////////////////////////////////////////////
// Confirmation Content
///////////////////////////////////////////////////
function ConfirmationClose({ children }: { children: any }) {
  const confirmationContext = useContext(ConfirmationDialogContext);

  const closeConfirmation = useCallback(() => {
    if (confirmationContext) confirmationContext.closeDialog();
  }, [confirmationContext]);

  return cloneElement(children, { onClick: closeConfirmation });
}
///////////////////////////////////////////////////
// Confirmation Content
///////////////////////////////////////////////////
function ConfirmationContent({ children, ...other }: ConfirmationContentProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmationContext = useContext(ConfirmationDialogContext);
  // Callbacks /////////////////////////////////////
  const handleEscapePress = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        confirmationContext?.closeDialog();
      }
    },
    [confirmationContext]
  );
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef?.current && !modalRef?.current?.contains(e.target as any)) {
        confirmationContext?.closeDialog();
      }
    },
    [confirmationContext]
  );
  // document.addEventListener('keydown',(ev:KeyboardEvent))
  useEffect(() => {
    document.addEventListener("keydown", handleEscapePress);
    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [handleEscapePress]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [confirmationContext, handleOutsideClick]);

  if (!confirmationContext?.opened) return null;
  return createPortal(
    <div className=" h-full w-full z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed p-2 flex items-center justify-center backdrop-blur-md animate-in ">
      <div
        {...other}
        className={cn("dark:bg-modal-dark p-2 rounded-md", other?.className)}
        ref={modalRef}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Confirmation.Trigger = ConfirmationTrigger;
Confirmation.Title = ConfirmationTitle;
Confirmation.Description = ConfirmationDescription;
Confirmation.Content = ConfirmationContent;
Confirmation.Close = ConfirmationClose;

export default Confirmation;
