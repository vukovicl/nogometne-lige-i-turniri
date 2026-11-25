import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface TabDefinition {
  id: string;
  label: string;
  badge?: string;
  content: ReactNode;
}

interface AccessibleTabsProps {
  ariaLabel: string;
  tabs: TabDefinition[];
  activeId: string;
  onChange: (id: string) => void;
}

export function AccessibleTabs({ ariaLabel, tabs, activeId, onChange }: AccessibleTabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // Sinkronizacija hidden="until-found" i beforematch događaja za traženje na stranici (Ctrl+F)
    const cleanups: (() => void)[] = [];
    for (const tab of tabs) {
      const panel = panelRefs.current[tab.id];
      if (!panel) continue;

      if (tab.id === activeId) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', 'until-found');
      }

      const handleBeforeMatch = () => {
        onChange(tab.id);
      };
      panel.addEventListener('beforematch', handleBeforeMatch);
      cleanups.push(() => panel.removeEventListener('beforematch', handleBeforeMatch));
    }
    return () => cleanups.forEach((fn) => fn());
  }, [activeId, onChange, tabs]);

  const selectAndFocus = (id: string) => {
    onChange(id);
    const btn = tabRefs.current[id];
    btn?.focus();
    btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Fallback tipkovničke navigacije ako preglednik još nema nativni `focusgroup`
    if ('focusGroup' in HTMLElement.prototype) return;
    const currentIndex = tabs.findIndex((t) => t.id === activeId);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = tabs[(currentIndex + 1) % tabs.length];
      selectAndFocus(next.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
      selectAndFocus(prev.id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectAndFocus(tabs[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      selectAndFocus(tabs[tabs.length - 1].id);
    }
  };

  return (
    <div className="nlt-tabs">
      <div
        role="tablist"
        aria-label={ariaLabel}
        {...({ focusgroup: 'tablist nomemory' } as Record<string, string>)}
        className="nlt-tablist"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              {...(selected ? ({ focusgroupstart: '' } as Record<string, string>) : {})}
              className="nlt-tab"
              onClick={() => {
                onChange(tab.id);
                tabRefs.current[tab.id]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
              }}
            >
              <span>{tab.label}</span>
              {tab.badge && <span className="nlt-tab__badge">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      <div className="nlt-tabpanels">
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <div
              key={tab.id}
              ref={(el) => {
                panelRefs.current[tab.id] = el;
              }}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              hidden={!selected ? true : undefined}
              className="nlt-tabpanel"
            >
              {/* Stilovi obruba i razmaka idu na unutarnji omotač kako hidden="until-found" ne bi crtao prazan okvir */}
              <div className="nlt-tabpanel__inner">{tab.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
