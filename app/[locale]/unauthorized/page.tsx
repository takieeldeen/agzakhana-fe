import React from "react";
// import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-forbidden-bg">
      <div className="container max-w-lg px-4 py-8 md:py-12">
        <div className="relative z-10 grid gap-6">
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-forbidden-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-forbidden-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>

          {/* Main content */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-forbidden-primary/30 animate-spin-slow">
                <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-transparent border-t-forbidden-primary"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldX
                  size={42}
                  className="text-forbidden-primary animate-pulse-slow"
                />
              </div>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold text-forbidden-primary mb-2 animate-float">
              403
            </h1>

            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Access Forbidden
              </h2>
              <div className="absolute -inset-0.5 bg-forbidden-primary/20 blur opacity-30 animate-glitch"></div>
            </div>

            <p className="text-forbidden-muted mb-8 max-w-md">
              You dont have permission to access this resource. Please check
              your credentials or contact the administrator if you believe this
              is a mistake.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                // asChild
                className="bg-forbidden-primary text-black hover:bg-forbidden-primary/90 transition-all"
              >
                <Link href="/">Return to Home</Link>
              </Button>

              <Button
                variant="outline"
                // asChild
                className="border-forbidden-primary/30 text-forbidden-primary hover:bg-forbidden-primary/10 transition-all"
              >
                <Link href="/">Contact Support</Link>
              </Button>
            </div>
          </div>

          {/* Code grid background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="absolute text-sm text-forbidden-primary"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.4 + 0.1,
                  }}
                >
                  {Math.random() > 0.5 ? "403" : "FORBIDDEN"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
