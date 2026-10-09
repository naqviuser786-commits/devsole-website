export function WebGLFallback() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden bg-navy-950"
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0 opacity-40" />
      <img
        src="/images/devsole-logo-reference.png"
        alt="DEVSOLE 3D Brand Mark"
        width={420}
        height={420}
        loading="eager"
        className="max-h-[45vh] w-auto opacity-70 blur-[1px] object-contain transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/40 to-navy-950" />
    </div>
  );
}