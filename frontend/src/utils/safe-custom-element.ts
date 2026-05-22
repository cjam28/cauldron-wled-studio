/** HA-safe custom element registration (idempotent when bundle loads twice). */
export function safeCustomElement(tag: string) {
  return <T extends CustomElementConstructor>(
    cls: T,
    _context?: ClassDecoratorContext
  ): T => {
    const existing = customElements.get(tag);
    if (existing) {
      // Lovelace resource cache-bust can re-execute the module while the tag
      // stays registered — always use the registry constructor.
      return existing as T;
    }
    customElements.define(tag, cls);
    return cls;
  };
}

/** Define a top-level tag once; return the registered constructor. */
export function defineCustomElement(
  tag: string,
  cls: CustomElementConstructor
): CustomElementConstructor {
  const existing = customElements.get(tag);
  if (existing) {
    return existing;
  }
  customElements.define(tag, cls);
  return cls;
}
