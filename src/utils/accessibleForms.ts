import { useEffect, type RefObject } from 'react';

const supportsUserInvalid = () =>
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:user-invalid)');

function linkFieldError(el: HTMLElement, shown: boolean) {
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter((id) => id && id !== errorId);
  if (shown) ids.push(errorId);
  if (ids.length > 0) {
    el.setAttribute('aria-describedby', ids.join(' '));
  } else {
    el.removeAttribute('aria-describedby');
  }
}

function getSpokenText(node: HTMLElement): string {
  const copy = node.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
    const label = n.getAttribute('aria-label') || '';
    n.replaceWith(`${label}: `);
  });
  return (copy.textContent || '').replace(/\s+/g, ' ').trim();
}

/**
 * Sinkronizira CSS `:user-invalid` s `aria-invalid`, dinamičkim `aria-describedby`
 * te jednim pristupačnim `aria-live="polite"` područjem za čitače zaslona.
 */
export function useAccessibleFormValidation(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let announcer = document.getElementById('nlt-form-live-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'nlt-form-live-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'visually-hidden';
      document.body.append(announcer);
    }

    const nativeSupported = supportsUserInvalid();
    const flagged = new WeakSet<HTMLElement>();
    const announced = new WeakSet<HTMLElement>();
    const dirtyFallback = new WeakMap<HTMLElement, { hasInteracted: boolean; hasBlurred: boolean }>();
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: HTMLElement | null = null;

    const isControl = (target: EventTarget | null): target is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      target instanceof HTMLElement && target.matches('input, select, textarea');

    const announceError = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
      const errorId = el.dataset.error;
      if (!errorId || !announcer) return;
      const errorNode = document.getElementById(errorId);
      if (!errorNode) return;
      const labelNode = el.labels?.[0];
      const prefix = labelNode ? `${getSpokenText(labelNode)}: ` : '';
      if (announceTimer) clearTimeout(announceTimer);
      announcer.textContent = '';
      announcedField = el;
      announceTimer = setTimeout(() => {
        if (announcer) announcer.textContent = `${prefix}${getSpokenText(errorNode)}`;
      }, 500);
    };

    const syncAria = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, shouldAnnounce = false) => {
      let invalid = false;
      if (nativeSupported) {
        invalid = el.matches(':user-invalid');
      } else {
        const st = dirtyFallback.get(el);
        const committed = Boolean(st?.hasInteracted && st?.hasBlurred);
        invalid = committed && !el.validity.valid;
        el.classList.toggle('user-invalid-fallback', invalid);
        el.classList.toggle('user-valid-fallback', committed && el.validity.valid);
      }

      if (invalid) {
        if (shouldAnnounce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute('aria-invalid', 'true');
        linkFieldError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
        el.setAttribute('aria-invalid', 'false');
        linkFieldError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el && announcer) {
          if (announceTimer) clearTimeout(announceTimer);
          announcer.textContent = '';
        }
      }
    };

    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea').forEach((el) => {
      syncAria(el, false);
    });

    const onBlur = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!nativeSupported) {
        const st = dirtyFallback.get(e.target) || { hasInteracted: false, hasBlurred: false };
        st.hasBlurred = true;
        dirtyFallback.set(e.target, st);
      }
      syncAria(e.target, true);
    };

    const onInput = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!nativeSupported) {
        const st = dirtyFallback.get(e.target) || { hasInteracted: false, hasBlurred: false };
        st.hasInteracted = true;
        dirtyFallback.set(e.target, st);
      }
      if (e.target.hasAttribute('aria-invalid')) syncAria(e.target, false);
    };

    const onChange = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!nativeSupported) {
        const st = dirtyFallback.get(e.target) || { hasInteracted: true, hasBlurred: true };
        st.hasInteracted = true;
        st.hasBlurred = true;
        dirtyFallback.set(e.target, st);
      }
      syncAria(e.target, true);
    };

    const onInvalid = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!nativeSupported) {
        dirtyFallback.set(e.target, { hasInteracted: true, hasBlurred: true });
      }
      announced.add(e.target);
      syncAria(e.target, false);
    };

    const onReset = () => {
      setTimeout(() => {
        form
          .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')
          .forEach((el) => {
            dirtyFallback.delete(el);
            el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
            syncAria(el, false);
          });
      }, 0);
    };

    form.addEventListener('blur', onBlur, true);
    form.addEventListener('input', onInput);
    form.addEventListener('change', onChange, true);
    form.addEventListener('invalid', onInvalid, true);
    form.addEventListener('reset', onReset, true);

    return () => {
      if (announceTimer) clearTimeout(announceTimer);
      form.removeEventListener('blur', onBlur, true);
      form.removeEventListener('input', onInput);
      form.removeEventListener('change', onChange, true);
      form.removeEventListener('invalid', onInvalid, true);
      form.removeEventListener('reset', onReset, true);
    };
  }, [formRef]);
}
