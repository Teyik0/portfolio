import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";
import { Magnetic } from "./magnetic";

export function CopyCommand({ command }: { command: string }) {
  "use no memo";
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      window.clearTimeout(timer.current);
      setCopied(true);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context or permissions): the command stays selectable.
    }
  }, [command]);

  return (
    <div className="command">
      <code className="command__text">
        <span aria-hidden="true" className="command__prompt">
          $
        </span>{" "}
        <span className="select-all">{command}</span>
      </code>
      <Magnetic strength={0.2}>
        <button
          aria-label={
            copied ? "Copied to clipboard" : `Copy command: ${command}`
          }
          className="command__copy"
          data-copied={copied ? "" : undefined}
          onClick={copy}
          type="button"
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          <span aria-hidden="true" className="command__copy-label">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </Magnetic>
      <span aria-live="polite" className="sr-only">
        {copied ? "Command copied" : ""}
      </span>
    </div>
  );
}
