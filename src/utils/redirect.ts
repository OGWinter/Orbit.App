/**
 * Validates and sanitizes internal redirect paths to prevent open redirect vulnerabilities.
 * External URLs, protocol-relative paths, and malformed paths will be rejected and fall back
 * to the default internal path (defaults to '/workspace').
 */
export const getSafeRedirectPath = (target: unknown, fallback: string = '/workspace'): string => {
  if (typeof target !== 'string') return fallback;
  const trimmed = target.trim();
  if (!trimmed) return fallback;

  // Must begin with a single '/' and not with '//' (protocol-relative) or contain backslashes
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.includes('\\')) {
    return fallback;
  }

  // Reject URLs containing a protocol scheme (e.g., http:, https:, javascript:, data:)
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return fallback;
  }

  return trimmed;
};

export default getSafeRedirectPath;
