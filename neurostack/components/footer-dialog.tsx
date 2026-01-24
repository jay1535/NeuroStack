"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FooterDialogProps {
  title: string;
  content: React.ReactNode;
  storageKey: string;
}

export default function FooterDialog({
  title,
  content,
  storageKey,
}: FooterDialogProps) {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // 🔐 Check acceptance when dialog opens
  useEffect(() => {
    if (open) {
      setAccepted(localStorage.getItem(storageKey) === "accepted");
    }
  }, [open, storageKey]);

  const handleAccept = () => {
    localStorage.setItem(storageKey, "accepted");
    setAccepted(true);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="transition hover:text-purple-600"
      >
        {title}
      </button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-3xl
            bg-white text-black
            dark:bg-black dark:text-white
            border border-black/10
            dark:border-white/10
          "
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">
              {title}
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable content */}
          <div
            className="
              mt-4 max-h-[60vh] overflow-y-auto
              text-sm leading-relaxed space-y-4
              text-black dark:text-gray-300
            "
          >
            {content}
          </div>

          <DialogFooter className="mt-6 flex gap-3">
            {/* Close button */}
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="
                bg-black text-white
                hover:bg-black/10
                dark:bg-white/30 dark:text-white
                dark:hover:bg-white/20
              "
            >
              Close
            </Button>

            {/* Accept button (only if not accepted) */}
            {!accepted && (
              <Button
                onClick={handleAccept}
                className="
                  bg-purple-600 text-white
                  hover:bg-purple-700
                "
              >
                Accept
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
