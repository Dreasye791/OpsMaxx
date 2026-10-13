// Turns an access group's raw capability map into a sentence a person can read
// and check against what they meant to configure.
//
// This is deliberately derived from the live `capabilities` object rather than
// written per built-in group: a user who edits "Read Only" until it can write
// must get a summary that says so. A hard-coded blurb would keep claiming the
// group is read-only, which is worse than showing no summary at all.
//
// The same rule is why the file path rules are folded in below rather than
// reported as a count off to one side. `evaluateFilePath` returns the most
// specific matching rule BEFORE it consults the blanket capability, so a rule
// can move a file capability in either direction — including upward, past a
// denial. A clause that says "Cannot read files" next to a rule granting
// /var/log/** is not a shorter description of the policy, it is a false one.

import { AI_CAPABILITIES } from '../../../../shared/mcp'
import { interpolate } from '../../i18n'
import type { TFunction } from '../../i18n'
import type {
  AccessGroup,
  AiCapability,
  AiCapabilityPolicy,
  FilePathRule,
  PermissionValue
} from '../../../../shared/mcp'

/**
 * Why the translator arrives as an argument rather than being imported.
 *
 * This module composes sentences — the verbs in PHRASING, the glue that joins
 * them, and the clause each result lands in. Importing `t` would be shorter and
 * would make the English sentence unreachable, and
 * tests/accessGroupSummary.test.ts asserts those sentences word for word: it is
 * the one place the policy engine's behaviour and the card's claim are checked
 * against each other, so it has to keep reading English.
 *
 * Identity is therefore the default — and it is not quite `(s) => s`, because
 * these templates carry placeholders. It has to do what `t` does on a
 * catalogue miss, which is substitute and keep the source wording; sharing
 * `interpolate` is what keeps the two paths through one sentence from
 * disagreeing.
 */
const identity: TFunction = (source, vars) => interpolate(source, vars)

interface Phrasing {
  /** Bare infinitive — "Can run commands", "Cannot run commands". */
  verb: string
  /** Gerund — "Asks before running commands". */
  gerund: string
}

// Short verb phrases, not the grid's noun labels: "Execute terminal commands,
// Read files" is a column header, "run commands and read files" is a sentence.
const PHRASING: Record<AiCapability, Phrasing> = {
  viewServer: { verb: 'see server details', gerund: 'showing server details' },
  terminal: { verb: 'run commands', gerund: 'running commands' },
  readFiles: { verb: 'read files', gerund: 'reading files' },
  writeFiles: { verb: 'write files', gerund: 'writing files' },
  sftpDownload: { verb: 'download files', gerund: 'downloading files' },
  sftpUpload: { verb: 'upload files', gerund: 'uploading files' },
  sshTunnel: { verb: 'define and open SSH tunnels', gerund: 'defining and opening SSH tunnels' },
  databaseAccess: { verb: 'query databases', gerund: 'querying databases' },
  sudo: { verb: 'use sudo', gerund: 'using sudo' },
  containers: { verb: 'list containers and read their logs', gerund: 'reading containers' },
  containerControl: { verb: 'start and stop containers', gerund: 'controlling containers' },
  ciRead: { verb: 'read CI pipelines and build output', gerund: 'reading CI pipelines and build output' },
  // No internal comma: these phrases are joined into a comma list, and one
  // that contains its own commas cannot be told apart from its neighbours.
  ciTrigger: { verb: 'start and cancel CI pipelines', gerund: 'starting and cancelling CI pipelines' },
  fleetRead: { verb: 'read across the fleet', gerund: 'reading across the fleet' },
  backupRead: { verb: 'see backup health', gerund: 'reading backup health' },
  serverMetrics: { verb: 'read server metrics', gerund: 'reading server metrics' },
  hostFacts: {
    verb: 'read the server inventory and its pending security updates',
    gerund: 'reading the server inventory and its pending security updates'
  },
  // "collect", not "read": no agent can read these at all, and the verb has to
  // survive being read quickly. What the grant does is let OpsMaxx's own
  // hourly posture probe ASK the host for its rule lines.
  sudoersRead: {
    verb: 'collect this server’s sudoers rules',
    gerund: 'collecting this server’s sudoers rules'
  },
  firewallRules: {
    verb: 'collect this server’s firewall rule list',
    gerund: 'collecting this server’s firewall rule list'
  },
  // All three verbs, matching the capability's own detail. The card is what
  // most people read instead of the grid, so a summary that still said only
  // "add servers" would be the last place the old, narrower promise survived.
  manageServers: {
    verb: 'add, change and remove servers in the workspace',
    gerund: 'adding, changing and removing servers in the workspace'
  },
  // Says what it grants and what it does not, matching the capability's own
  // detail. "Control VPNs and reverse proxies" reads as a power over both, and
  // no value of this setting grants the second: an frp proxy makes a port on
  // the operator's own machine reachable from the internet, so `set_vpn`
  // refuses one at any setting and no access group can permit it. A summary
  // that names a power the code refuses is how somebody ends up believing they
  // granted less than they did — or more.
  vpnControl: {
    verb: 'start and stop VPNs, and list reverse proxies',
    gerund: 'starting and stopping VPNs, and listing reverse proxies'
  }
}

// The three that do not merely act on a server the user already trusts: sudo is
// root, manageServers writes a new credential into OpsMaxx itself, and
// vpnControl decides which network every later session travels over. They are
// listed first inside whichever clause they land in, so a summary can never
// bury "can use sudo" behind six mundane capabilities.
export const ELEVATED_CAPABILITIES: AiCapability[] = ['sudo', 'manageServers', 'vpnControl', 'ciTrigger']

// With Confirm risky actions on, starting a VPN or a pipeline and changing or
// removing a server still ask at Allow. What is left with no prompt: sudo, and
// ADDING a server.
const ELEVATED_WHEN_CONFIRMING: AiCapability[] = ['sudo', 'manageServers']

// The two capabilities a path rule can override. `evaluateFilePath` maps
// mode -> capability exactly this way.
const FILE_CAPABILITIES: { id: AiCapability; mode: 'read' | 'write' }[] = [
  { id: 'readFiles', mode: 'read' },
  { id: 'writeFiles', mode: 'write' }
]

const DECLARATION_ORDER = AI_CAPABILITIES.map((c) => c.id)

// Same ordering policyEngine.mostRestrictive uses. Duplicated rather than
// imported because this is renderer code and policyEngine is main's; the
// duplication is the point at which the two could drift, so the tests below
// pin the behaviour that matters (a rule above the capability widens it).
const RANK: Record<PermissionValue, number> = { deny: 0, ask: 1, allow: 2 }

const PERMISSION_VALUES: PermissionValue[] = ['allow', 'ask', 'deny']

const isPermissionValue = (v: unknown): v is PermissionValue =>
  typeof v === 'string' && (PERMISSION_VALUES as string[]).includes(v)

/**
 * What the engine does with a stored permission that is not one of the three.
 *
 * `policyStore.read()` validates only that `groups` is an array, so a
 * hand-edited or half-migrated policy file can carry anything here. `gate()`
 * tests `=== 'deny'`, then `=== 'ask'`, then proceeds — so an unrecognised
 * value is enforced as ALLOW. The summary has to say the same thing; the one
 * outcome that would be indefensible is describing it as a denial, or (as
 * before) matching none of the three filters and vanishing from the sentence
 * entirely while the agent acts on it.
 */
const UNRECOGNISED_EFFECT: PermissionValue = 'allow'

/** Long enough to identify what is in the file, short enough not to run the card. */
const shortValue = (v: unknown): string => {
  const text = typeof v === 'string' ? v : JSON.stringify(v) ?? String(v)
  return text.length > 24 ? `${text.slice(0, 24)}…` : text
}

export interface CapabilityDecision {
  id: AiCapability
  label: string
  /** What the policy engine would actually enforce. */
  value: PermissionValue
  /**
   * Set when the stored value was neither allow, ask nor deny — the literal
   * text found, for a summary that can name it. `value` is then the engine's
   * effective behaviour, not the stored text.
   */
  unrecognised?: string
}

/**
 * Every capability with the value the policy engine would actually use.
 *
 * `evaluateCapability` reads `capabilities[id] ?? 'deny'` so that a group saved
 * before a capability existed is not silently granted it on upgrade. The
 * summary has to make the same substitution or it will describe an upgraded
 * install as permitting something the engine refuses.
 *
 * Absent and unrecognised are opposite failures and get opposite answers:
 * absent is denied by `?? 'deny'`, present-but-invalid falls through `gate()`
 * to allow. Collapsing them would misreport one of the two.
 */
export function capabilityDecisions(group: AccessGroup): CapabilityDecision[] {
  return AI_CAPABILITIES.map(({ id, label }) => {
    const stored = group.capabilities?.[id] as unknown
    if (stored === undefined || stored === null) return { id, label, value: 'deny' as const }
    if (isPermissionValue(stored)) return { id, label, value: stored }
    return { id, label, value: UNRECOGNISED_EFFECT, unrecognised: shortValue(stored) }
  })
}

/** A rule's value for one mode, as the engine would read it. */
function ruleValue(rule: FilePathRule, mode: 'read' | 'write'): PermissionValue | null {
  const raw = (mode === 'read' ? rule.read : rule.write) as unknown
  // `evaluateFilePath` filters on `!== undefined`, so a rule with an explicit
  // null still matches and still wins over the blanket capability — and then
  // falls through gate() to allow, exactly like an unrecognised capability.
  if (raw === undefined) return null
  return isPermissionValue(raw) ? raw : UNRECOGNISED_EFFECT
}

export interface FileRuleException {
  /** The permission those rules resolve to. */
  value: PermissionValue
  count: number
}

/**
 * The path rules that would not agree with the blanket capability.
 *
 * Grouped by the value they resolve to and ordered most-permissive first, so a
 * rule that widens a denial is always the first exception a reader meets.
 * Rules that merely restate the capability are not exceptions and are left out
 * — counting them would inflate the number the card asks the reader to trust.
 *
 * Which paths each rule covers is not knowable from here (that is a glob match
 * against a path the agent has not asked for yet), which is why the summary
 * says "except N path rules that allow it" rather than claiming to know the
 * outcome for any particular file.
 */
export function fileRuleExceptions(
  rules: FilePathRule[],
  mode: 'read' | 'write',
  capability: PermissionValue
): FileRuleException[] {
  const counts = new Map<PermissionValue, number>()
  for (const rule of rules) {
    const value = ruleValue(rule, mode)
    if (value === null || value === capability) continue
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => RANK[b.value] - RANK[a.value])
}

function sortForSentence(ids: AiCapability[]): AiCapability[] {
  const rank = (id: AiCapability): number =>
    (ELEVATED_CAPABILITIES.includes(id) ? 0 : 100) + DECLARATION_ORDER.indexOf(id)
  return [...ids].sort((a, b) => rank(a) - rank(b))
}

/**
 * "a", "a and b", "a, b, and c" — Oxford comma, matching the app's copy.
 *
 * The three pieces of glue are catalogue entries rather than literals, because
 * a joined list cannot be translated as a whole: the items are translated
 * phrases and the way they are strung together is grammar. English keeps the
 * Oxford comma (`,` before `and`), which is why the last two items use a
 * different key from the middle of a longer list — a language that separates
 * with 、 and joins with 和 needs that split to end up with `a、b和c` rather
 * than `a、b、和c`.
 */
function join(items: string[], conjunction: 'and' | 'or', t: TFunction): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) {
    return t(conjunction === 'and' ? '{a} and {b}' : '{a} or {b}', { a: items[0], b: items[1] })
  }
  const head = items
    .slice(0, -1)
    .reduce((acc, item, i) => (i === 0 ? item : t('{a}, {b}', { a: acc, b: item })), '')
  return t(conjunction === 'and' ? '{a}, and {b}' : '{a}, or {b}', {
    a: head,
    b: items[items.length - 1]
  })
}

// "1 path rule that allows it and 3 that block it" — the noun is carried by the
// first part only, and the verb agrees with its own count.
const EXCEPTION_VERB: Record<PermissionValue, { one: string; many: string }> = {
  allow: { one: 'allows it', many: 'allow it' },
  ask: { one: 'asks you first', many: 'ask you first' },
  deny: { one: 'blocks it', many: 'block it' }
}

function exceptionTail(exceptions: FileRuleException[], t: TFunction): string {
  return join(
    exceptions.map(({ value, count }, i) => {
      const verb = t(count === 1 ? EXCEPTION_VERB[value].one : EXCEPTION_VERB[value].many)
      // The count with the noun is the first part only; later parts read
      // "19 that block it", which is why only the first one names what is
      // being counted. Both forms are separate keys for the same reason the
      // glue is: English marks the plural and a reader of the translation
      // needs the full phrase in their own grammar.
      if (i === 0) {
        return t(count === 1 ? '{count} path rule that {verb}' : '{count} path rules that {verb}', {
          count,
          verb
        })
      }
      return t('{count} that {verb}', { count, verb })
    }),
    'and',
    t
  )
}

function fileCapabilityClause(
  id: AiCapability,
  value: PermissionValue,
  exceptions: FileRuleException[],
  t: TFunction
): string {
  const { verb, gerund } = PHRASING[id]
  const base =
    value === 'allow'
      ? t('Can {verb} without asking', { verb: t(verb) })
      : value === 'ask'
        ? t('Asks you first before {gerund}', { gerund: t(gerund) })
        : t('Cannot {verb}', { verb: t(verb) })
  return t('{base} — except {exceptions}.', { base, exceptions: exceptionTail(exceptions, t) })
}

function unrecognisedClause(items: CapabilityDecision[], t: TFunction): string {
  const named = items.map((d) =>
    t('{label} ("{value}")', { label: t(d.label), value: d.unrecognised ?? '' })
  )
  return items.length === 1
    ? t(
        '{names} is set to a value OpsMaxx does not recognise, so the policy engine allows it. Set it again below.',
        { names: named[0] }
      )
    : t(
        '{names} are set to values OpsMaxx does not recognise, so the policy engine allows them. Set them again below.',
        { names: join(named, 'and', t) }
      )
}

/** The card's word for RISKY_ACTIONS, qualifying every "without asking" above it. */
export const RISKY_CLAUSE =
  'Still confirms risky actions it allows — destructive commands, database writes, tunnels, server changes, VPNs and CI runs.'

export interface AccessGroupSummary {
  /** The whole thing, ready to render or assert on. */
  sentence: string
  /** The same text split by decision, so the UI can style each clause. */
  clauses: string[]
  /** Elevated capabilities granted with no prompt — worth a visible warning.
   *  With Confirm risky actions on, only those it does not cover. */
  elevated: AiCapability[]
  /** Capabilities whose stored value is not a permission, and so are allowed. */
  unrecognised: AiCapability[]
  /** File capabilities a path rule contradicts, so the card's own claim is qualified. */
  overriddenByPath: AiCapability[]
  counts: Record<PermissionValue, number>
}

/**
 * A plain-English description of what an access group permits.
 *
 * Deliberately complete rather than abbreviated: there are only a dozen or so
 * capabilities, and "and 3 more" in a security summary invites exactly the
 * distrust this screen is trying to remove.
 *
 * A file capability that any path rule contradicts is lifted out of the flat
 * allow/ask/deny lists and given its own clause, because the flat clause has no
 * room for the exception and reads as absolute without it. That is what made
 * the shipped "Read Only" group misdescribe itself: `writeFiles: 'deny'` with
 * two seeded `write: 'ask'` rules produced "Cannot ... write files" on the same
 * card as "2 asking first".
 *
 * `t` translates the verbs, the glue and the clause templates; the shape of
 * the sentence is decided here either way. See `identity` for why it is a
 * parameter rather than an import.
 */
export function summariseAccessGroup(group: AccessGroup, t: TFunction = identity): AccessGroupSummary {
  const decisions = capabilityDecisions(group)
  const byId = new Map(decisions.map((d) => [d.id, d]))
  const rules = group.filePolicies ?? []

  const overridden = FILE_CAPABILITIES.map(({ id, mode }) => ({
    id,
    value: byId.get(id)?.value ?? 'deny',
    exceptions: fileRuleExceptions(rules, mode, byId.get(id)?.value ?? 'deny')
  })).filter((o) => o.exceptions.length > 0)
  const overriddenIds = new Set(overridden.map((o) => o.id))

  // Counts describe the capability grid, which still shows exactly these
  // values — the path rules qualify what they mean, they do not change what is
  // set. So the chips stay in step with the rows they sit above.
  const counts = {
    allow: decisions.filter((d) => d.value === 'allow').length,
    ask: decisions.filter((d) => d.value === 'ask').length,
    deny: decisions.filter((d) => d.value === 'deny').length
  }

  // The flat clauses cover everything the path rules do not qualify.
  const idsBy = (v: PermissionValue): AiCapability[] =>
    sortForSentence(
      decisions.filter((d) => d.value === v && !overriddenIds.has(d.id)).map((d) => d.id)
    )
  const allowed = idsBy('allow')
  const asked = idsBy('ask')
  const denied = idsBy('deny')

  const unprompted = group.confirmRisky === false ? ELEVATED_CAPABILITIES : ELEVATED_WHEN_CONFIRMING
  const elevated = decisions
    .filter((d) => d.value === 'allow' && unprompted.includes(d.id))
    .map((d) => d.id)
  const unrecognised = decisions.filter((d) => d.unrecognised !== undefined)

  const clauses: string[] = []

  // First, not last: a capability being enforced as allow because its stored
  // value is unreadable outranks anything the rest of the sentence says.
  if (unrecognised.length > 0) clauses.push(unrecognisedClause(unrecognised, t))

  if (counts.deny === decisions.length) {
    // The state a brand-new install is in until a group is assigned, and the
    // one that makes an agent look broken rather than restricted.
    clauses.push(
      overridden.length > 0
        ? t(
            'Allows nothing except the file paths below — every other AI request against the server is refused.'
          )
        : t('Allows nothing — every AI request against the server is refused.')
    )
  } else if (counts.allow === decisions.length) {
    // Listing all twelve here reads as a wall of text at the exact moment the
    // reader most needs to notice one fact, so name the dangerous three.
    const including = join(
      ELEVATED_CAPABILITIES.map((id) => t(PHRASING[id].gerund)),
      'and',
      t
    )
    clauses.push(
      overridden.length > 0
        ? t(
            'Can do everything without asking except the file paths below — including {including}.',
            { including }
          )
        : t('Can do everything without asking — including {including}.', { including })
    )
  } else {
    if (allowed.length > 0) {
      clauses.push(
        t('Can {verbs} without asking.', {
          verbs: join(allowed.map((id) => t(PHRASING[id].verb)), 'and', t)
        })
      )
    }
    if (asked.length > 0) {
      clauses.push(
        t('Asks you first before {gerunds}.', {
          gerunds: join(asked.map((id) => t(PHRASING[id].gerund)), 'and', t)
        })
      )
    }
    if (denied.length > 0) {
      clauses.push(
        t('Cannot {verbs}.', {
          verbs: join(denied.map((id) => t(PHRASING[id].verb)), 'or', t)
        })
      )
    }
  }

  for (const o of overridden) clauses.push(fileCapabilityClause(o.id, o.value, o.exceptions, t))

  // Absent reads as ON, as it does to the policy engine (confirmsRisky). Only
  // said when something is allowed: it qualifies an Allow and nothing else.
  if (group.confirmRisky !== false && counts.allow > 0) clauses.push(t(RISKY_CLAUSE))

  return {
    sentence: clauses.join(' '),
    clauses,
    elevated,
    unrecognised: unrecognised.map((d) => d.id),
    overriddenByPath: overridden.map((o) => o.id),
    counts
  }
}

export interface FilePolicySummary {
  sentence: string
  total: number
  denying: number
  asking: number
  /** Rules that resolve above the blanket capability, and so widen it. */
  widening: number
}

/**
 * The path-rule list one line shorter than reading it.
 *
 * A rule counts as denying if either its read or its write is 'deny' — the two
 * are separate settings and a rule that blocks writes to /etc while still
 * allowing reads is a deny rule from the reader's point of view.
 *
 * Given the group's capabilities it also counts the rules that GRANT more than
 * the capability above them does. Without that, this header is a list of
 * blocks and prompts, which is the reassuring half of the truth: the same list
 * is where a `read: allow` on /var/log/** lives, and that rule beats
 * `Read files = DENY` in `evaluateFilePath`.
 */
export function summariseFilePolicies(
  rules: FilePathRule[],
  capabilities?: Partial<AiCapabilityPolicy>,
  t: TFunction = identity
): FilePolicySummary {
  const has = (r: FilePathRule, v: PermissionValue): boolean => r.read === v || r.write === v
  const denying = rules.filter((r) => has(r, 'deny')).length
  const asking = rules.filter((r) => !has(r, 'deny') && has(r, 'ask')).length

  const blanket = (id: AiCapability): PermissionValue => {
    const stored = capabilities?.[id] as unknown
    if (stored === undefined || stored === null) return 'deny'
    return isPermissionValue(stored) ? stored : UNRECOGNISED_EFFECT
  }
  const widening = capabilities
    ? rules.filter((r) =>
        FILE_CAPABILITIES.some(({ id, mode }) => {
          const value = ruleValue(r, mode)
          return value !== null && RANK[value] > RANK[blanket(id)]
        })
      ).length
    : 0

  if (rules.length === 0) {
    return {
      sentence: t('No path rules — every file follows the read and write settings above.'),
      total: 0,
      denying: 0,
      asking: 0,
      widening: 0
    }
  }

  const parts: string[] = []
  if (denying > 0) parts.push(t('{count} blocking access', { count: denying }))
  if (asking > 0) parts.push(t('{count} asking first', { count: asking }))
  const detail = parts.length > 0 ? t(' — {parts}', { parts: join(parts, 'and', t) }) : ''
  const widened =
    widening > 0
      ? t(
          widening === 1
            ? ' {count} grants more than the capabilities above, and the path rule wins.'
            : ' {count} grant more than the capabilities above, and the path rule wins.',
          { count: widening }
        )
      : ''
  const count = t(rules.length === 1 ? '{count} path rule' : '{count} path rules', {
    count: rules.length
  })
  // The full stop belongs to the template rather than to the concatenation:
  // the sentence is the same shape in every language, but the mark that ends a
  // clause is not.
  return {
    sentence: t('{head}.{tail}', { head: `${count}${detail}`, tail: widened }),
    total: rules.length,
    denying,
    asking,
    widening
  }
}
