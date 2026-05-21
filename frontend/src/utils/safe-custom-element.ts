/** HA-safe custom element registration (idempotent when bundle loads twice). */
export function safeCustomElement(tag: string) {
  return <T extends CustomElementConstructor>(
    cls: T,
    _context?: ClassDecoratorContext
  ): T => {
    if (!customElements.get(tag)) {
      customElements.define(tag, cls);
    }
    return cls;
  };
}
