import { ReactNode } from 'react'
import { useT } from '../../i18n'
import { clsx } from '../../lib/format'

interface EmptyStateProps {
  /** Omitted by `compact`, which has no tile to put one in. */
  icon?: ReactNode
  title: string
  message: string
  action?: ReactNode
  /**
   * For a slot inside a screen rather than a whole screen.
   *
   * The full variant centres a 56px glyph tile in the height of a pane, which
   * is right when the pane is the emptiness and wrong when it is one shelf of
   * a screen that has other things on it. Without this variant those shelves
   * each grew a grammar of their own — a left-aligned line with an inline icon
   * in one, a bare uncontained sentence in another — so the product read as
   * assembled rather than designed at precisely the moment a new user is
   * looking at it. Same component, same three parts, no tile.
   */
  compact?: boolean
}

/**
 * The one place every "nothing here yet" message is translated.
 *
 * Both props are translated HERE rather than at the ~50 call sites, and that is
 * a decision this component's shape makes safe rather than a shortcut. The key
 * of a translation is its English source, so `t` on a string that is not in the
 * catalogue returns it untouched — which means the handful of callers that pass
 * something dynamic (a folder's name, a server's) come through unchanged
 * instead of rendering as an empty line, and the ones that pass a sentence get
 * translated without every one of them having to remember to ask.
 *
 * It is also idempotent, which is what makes it safe to leave in place while
 * callers are converted around it: `t` of an already-Chinese string finds no
 * entry and hands it back.
 */
export function EmptyState({
  icon,
  title,
  message,
  action,
  compact
}: EmptyStateProps): React.JSX.Element {
  const t = useT()
  return (
    <div className={clsx('empty', compact && 'compact')}>
      {!compact && icon && <div className="empty-icon">{icon}</div>}
      <h3>{t(title)}</h3>
      <p>{t(message)}</p>
      {action}
    </div>
  )
}
