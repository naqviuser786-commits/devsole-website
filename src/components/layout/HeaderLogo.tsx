export function HeaderLogo() {
  return (
    <div
      className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center transition-transform duration-200 hover:scale-105"
      aria-label="DEVSOLE Soft Logo"
    >
      {/* Pure Transparent Logo (Zero borders, zero background box) */}
      <img
        src="/images/devsole-logo-reference.png"
        alt="DEVSOLE Soft"
        width={36}
        height={36}
        className="h-full w-full object-contain select-none bg-transparent"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.indexOf('devsole-logo-reference.png') === -1) {
            target.src = '/images/devsole-logo-reference.png';
          }
        }}
      />
    </div>
  );
}

export default HeaderLogo;