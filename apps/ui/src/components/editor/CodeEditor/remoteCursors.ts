import {
  Extension,
  WidgetType,
  Decoration,
  DecorationSet,
  RangeSetBuilder,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from '@uiw/react-codemirror';
import { Collaborator } from '../../../store/usePresenceStore';

class RemoteCursorWidget extends WidgetType {
  constructor(
    readonly name: string,
    readonly color: string,
    readonly glowColor: string
  ) {
    super();
  }

  toDOM() {
    const wrap = document.createElement('span');
    wrap.className = 'cm-remote-cursor-wrap';
    wrap.style.position = 'relative';
    wrap.style.display = 'inline-block';
    wrap.style.width = '0';
    wrap.style.height = '0';
    wrap.style.verticalAlign = 'baseline';
    wrap.style.userSelect = 'none';
    wrap.style.pointerEvents = 'none';
    wrap.style.zIndex = '30';

    // 1. Caret Line
    const caret = document.createElement('span');
    caret.className = 'cm-remote-cursor-caret';
    caret.style.position = 'absolute';
    caret.style.top = '-2px';
    caret.style.left = '-1px';
    caret.style.width = '2px';
    caret.style.height = '1.3em';
    caret.style.backgroundColor = this.color;
    caret.style.boxShadow = `0 0 8px ${this.color}, 0 0 16px ${this.glowColor}`;
    caret.style.borderRadius = '1px';

    // 2. Cursor Flag / Pointer (angled arrow matching the mockup)
    const pointer = document.createElement('span');
    pointer.className = 'cm-remote-cursor-pointer';
    pointer.style.position = 'absolute';
    pointer.style.top = '-8px';
    pointer.style.left = '-4px';
    pointer.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 16 16" fill="${this.color}" style="filter: drop-shadow(0 0 4px ${this.glowColor});">
        <path d="M0 0 L13 5 L7 7 L5 13 Z" />
      </svg>
    `;

    // 3. Name Tag
    const tag = document.createElement('span');
    tag.className = 'cm-remote-cursor-tag';
    tag.innerText = this.name;
    tag.style.position = 'absolute';
    tag.style.top = '-22px';
    tag.style.left = '8px';
    tag.style.backgroundColor = this.color;
    tag.style.color = '#21222c';
    tag.style.fontWeight = '700';
    tag.style.fontSize = '11px';
    tag.style.fontFamily = 'var(--font-family-code, monospace)';
    tag.style.lineHeight = '1.2';
    tag.style.padding = '2px 6px';
    tag.style.borderRadius = '4px';
    tag.style.whiteSpace = 'nowrap';
    tag.style.boxShadow = `0 0 10px ${this.glowColor}`;

    wrap.appendChild(caret);
    wrap.appendChild(pointer);
    wrap.appendChild(tag);
    return wrap;
  }

  ignoreEvent() {
    return true;
  }
}

export function createRemoteCursorsExtension(
  collaborators: Collaborator[],
  activeFileId: string
): Extension {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view);
        }
      }

      buildDecorations(view: EditorView): DecorationSet {
        const builder = new RangeSetBuilder<Decoration>();
        const doc = view.state.doc;
        const totalLines = doc.lines;

        if (totalLines === 0) return builder.finish();

        // Filter and compute document offsets
        const items: { pos: number; collaborator: Collaborator }[] = [];

        for (const c of collaborators) {
          if (c.activeFileId && c.activeFileId !== activeFileId) continue;
          if (!c.cursor) continue;

          const lineNum = Math.min(Math.max(c.cursor.line, 1), totalLines);
          const line = doc.line(lineNum);
          const ch = Math.min(Math.max(c.cursor.ch, 0), line.length);
          const pos = line.from + ch;

          items.push({ pos, collaborator: c });
        }

        // Must sort by pos strictly ascending for RangeSetBuilder
        items.sort((a, b) => a.pos - b.pos);

        for (const item of items) {
          builder.add(
            item.pos,
            item.pos,
            Decoration.widget({
              widget: new RemoteCursorWidget(
                item.collaborator.name,
                item.collaborator.color,
                item.collaborator.glowColor
              ),
              side: 1,
            })
          );
        }

        return builder.finish();
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
}

