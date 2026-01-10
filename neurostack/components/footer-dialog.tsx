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
        className="hover:text-rose-500 transition"
      >
        {title}
      </button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-black text-white border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-rose-500">
              {title}
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable content */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto text-sm text-gray-300 leading-relaxed space-y-4">
            {content}
          </div>

          <DialogFooter className="mt-6 flex gap-3">
            {/* Close always visible */}
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Close
            </Button>

            {/* ✅ Accept ONLY if not already accepted */}
            {!accepted && (
              <Button
                onClick={handleAccept}
                className="bg-rose-600 hover:bg-rose-700 text-white"
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
