export default function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-white/5 text-center">
      <div className="container mx-auto px-6">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Devanshi Vashistha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
