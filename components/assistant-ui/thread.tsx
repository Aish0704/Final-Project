"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  Square,
} from "lucide-react";

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";

import type { FC } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { ToolFallback } from "@/components/assistant-ui/tool-fallback";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import {
  ComposerAddAttachment,
  ComposerAttachments,
  UserMessageAttachments,
} from "@/components/assistant-ui/attachment";

import { cn } from "@/lib/utils";

export const Thread: FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ThreadPrimitive.Root
          className="aui-root aui-thread-root @container flex h-full flex-col bg-[#050816] text-white"
          style={{
            ["--thread-max-width" as string]: "56rem",
          }}
        >
          {/* Top nav like the screenshot */}
          <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div className="text-xl font-semibold tracking-tight text-[#4EC9E1]">
              Perfect AI
            </div>

            <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
              <button className="border-b border-transparent pb-1 text-white">
                Home
              </button>
              <button className="hover:text-white">AI Tools</button>
              <button className="hover:text-white">How It Works</button>
              <button className="hover:text-white">Pricing</button>
            </nav>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4EC9E1] text-base font-semibold text-black">
              K
            </div>
          </header>

          <ThreadPrimitive.Viewport className="aui-thread-viewport relative flex flex-1 flex-col overflow-y-auto">
            <div className="mx-auto flex w-full max-w-[var(--thread-max-width)] flex-1 flex-col px-4 pt-10 pb-28">
              {/* Hero when there are no messages */}
              <ThreadPrimitive.If empty>
                <LandingHero />
              </ThreadPrimitive.If>

              {/* Messages */}
              <ThreadPrimitive.Messages
                components={{
                  UserMessage,
                  EditComposer,
                  AssistantMessage,
                }}
              />

              <ThreadPrimitive.If empty={false}>
                <div className="aui-thread-viewport-spacer min-h-8 grow" />
              </ThreadPrimitive.If>
            </div>

            {/* Composer pinned at bottom */}
            <Composer />
          </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>
      </MotionConfig>
    </LazyMotion>
  );
};

/* ---------------- HERO (screenshot style) ---------------- */

const LandingHero: FC = () => {
  const suggestions = [
    {
      title: "Write a blog post",
      label: "about sustainable energy",
      prompt: "Write a detailed blog post about sustainable energy.",
    },
    {
      title: "Create a marketing slogan",
      label: "for a coffee shop",
      prompt:
        "Create 10 creative, short marketing slogans for a cozy coffee shop.",
    },
    {
      title: "Generate Python code",
      label: "for a sorting algorithm",
      prompt:
        "Write Python code for an efficient sorting algorithm with comments.",
    },
    {
      title: "Design a logo concept",
      label: "for a tech startup",
      prompt:
        "Describe a modern, minimal logo concept for a new AI tech startup.",
    },
  ];

  return (
    <div className="aui-thread-landing mx-auto flex w-full max-w-4xl flex-col items-center text-center">
      <m.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
      >
        One Prompt,{" "}
        <span className="text-[#4EC9E1]">Multiple AI Tools</span>
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base"
      >
        Enter your prompt once and get results from the best AI tools selected
        by our intelligent matching system.
      </m.p>

      {/* Suggestion pill card similar to screenshot */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="mt-10 w-full rounded-3xl border border-white/7 bg-[#080b11] px-5 py-6 shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_30px_80px_rgba(15,23,42,0.85)]"
      >
        <p className="mb-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Try one of these prompts
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {suggestions.map((s, idx) => (
            <m.div
              key={s.prompt}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.04 }}
            >
              <ThreadPrimitive.Suggestion prompt={s.prompt} send asChild>
                <Button
                  variant="ghost"
                  className="flex h-auto w-full flex-col items-start gap-0.5 rounded-2xl border border-white/10 bg-[#0b1018] px-4 py-3 text-left text-xs text-slate-200 hover:bg-[#101726]"
                >
                  <span className="text-[13px] font-medium">{s.title}</span>
                  <span className="text-[11px] text-slate-400">
                    {s.label}
                  </span>
                </Button>
              </ThreadPrimitive.Suggestion>
            </m.div>
          ))}
        </div>
      </m.div>
    </div>
  );
};

/* ---------------- Scroll to bottom button ---------------- */

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="aui-thread-scroll-to-bottom absolute -top-10 z-10 self-center rounded-full border border-white/10 bg-[#050816] p-3 shadow-lg disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

/* ---------------- Composer (prompt bar) ---------------- */

const Composer: FC = () => {
  return (
    <div className="aui-composer-outer pointer-events-none sticky bottom-0 flex w-full justify-center bg-gradient-to-t from-[#050816] via-[#050816]/95 to-transparent px-3 pb-4 pt-8">
      <div className="pointer-events-auto w-full max-w-[var(--thread-max-width)]">
        <ThreadScrollToBottom />
        <ComposerPrimitive.Root className="aui-composer-root relative flex w-full flex-col rounded-3xl border border-white/10 bg-[#080b11] px-2 pt-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <ComposerAttachments />

          <ComposerPrimitive.Input
            placeholder="Describe what you want to create or ask..."
            className="aui-composer-input mb-1 max-h-32 min-h-[3.5rem] w-full resize-none bg-transparent px-4 pt-2 pb-3 text-[15px] leading-relaxed outline-none placeholder:text-slate-500"
            rows={1}
            autoFocus
            aria-label="Message input"
          />

          <div className="aui-composer-footer mb-2 mt-1 flex items-center justify-between px-1">
            <ComposerAddAttachment />

            <div className="flex items-center gap-2">
              <ThreadPrimitive.If running={false}>
                <ComposerPrimitive.Send asChild>
                  <Button
                    type="submit"
                    variant="default"
                    size="icon"
                    className="aui-composer-send inline-flex h-11 w-28 items-center justify-center rounded-2xl bg-[#4EC9E1] text-sm font-semibold text-black hover:bg-[#3db5cc]"
                    aria-label="Send message"
                  >
                    <span className="mr-2 hidden sm:inline">Generate</span>
                    <ArrowUpIcon className="size-4" />
                  </Button>
                </ComposerPrimitive.Send>
              </ThreadPrimitive.If>

              <ThreadPrimitive.If running>
                <ComposerPrimitive.Cancel asChild>
                  <Button
                    type="button"
                    size="icon"
                    className="aui-composer-cancel h-11 w-11 rounded-2xl border border-slate-500/60 bg-transparent hover:bg-slate-800"
                    aria-label="Stop generating"
                  >
                    <Square className="size-3.5" />
                  </Button>
                </ComposerPrimitive.Cancel>
              </ThreadPrimitive.If>
            </div>
          </div>
        </ComposerPrimitive.Root>
      </div>
    </div>
  );
};

/* ---------------- Error ---------------- */

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="aui-message-error-root mt-2 rounded-md border border-red-500/70 bg-red-500/10 p-3 text-xs text-red-200">
        <ErrorPrimitive.Message className="aui-message-error-message line-clamp-2" />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

/* ---------------- Assistant message ---------------- */

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <div
        className="aui-assistant-message-root relative mx-auto w-full max-w-[var(--thread-max-width)] animate-in py-4 duration-150 ease-out fade-in slide-in-from-bottom-1 last:mb-24"
        data-role="assistant"
      >
        <div className="aui-assistant-message-content mx-2 rounded-3xl bg-[#0b1018] px-5 py-4 leading-7 text-slate-50 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <MessagePrimitive.Parts
            components={{
              Text: MarkdownText,
              tools: { Fallback: ToolFallback },
            }}
          />
          <MessageError />
        </div>

        <div className="aui-assistant-message-footer mt-2 ml-4 flex items-center gap-1 text-xs text-slate-400">
          <BranchPicker />
          <AssistantActionBar />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="aui-assistant-action-bar-root flex gap-1 text-slate-400"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Regenerate">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

/* ---------------- User message ---------------- */

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <div
        className="aui-user-message-root mx-auto grid w-full max-w-[var(--thread-max-width)] animate-in auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 px-2 py-4 duration-150 ease-out fade-in slide-in-from-bottom-1 first:mt-4 last:mb-5 [&:where(>*)]:col-start-2"
        data-role="user"
      >
        <UserMessageAttachments />

        <div className="aui-user-message-content-wrapper relative col-start-2 min-w-0">
          <div className="aui-user-message-content rounded-3xl bg-[#111827] px-5 py-3 text-slate-50 shadow-lg">
            <MessagePrimitive.Parts />
          </div>
          <div className="aui-user-action-bar-wrapper absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 pr-2">
            <UserActionBar />
          </div>
        </div>

        <BranchPicker className="aui-user-branch-picker col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
      </div>
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="aui-user-action-bar-root flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit" className="aui-user-action-edit p-4">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

/* ---------------- Edit composer ---------------- */

const EditComposer: FC = () => {
  return (
    <div className="aui-edit-composer-wrapper mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 px-2 first:mt-4">
      <ComposerPrimitive.Root className="aui-edit-composer-root ml-auto flex w-full max-w-[80%] flex-col rounded-2xl bg-[#020617] border border-white/10">
        <ComposerPrimitive.Input
          className="aui-edit-composer-input flex min-h-[60px] w-full resize-none bg-transparent p-4 text-sm text-slate-50 outline-none"
          autoFocus
        />

        <div className="aui-edit-composer-footer mx-3 mb-3 flex items-center justify-center gap-2 self-end">
          <ComposerPrimitive.Cancel asChild>
            <Button variant="ghost" size="sm" aria-label="Cancel edit">
              Cancel
            </Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button size="sm" aria-label="Update message">
              Update
            </Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
};

/* ---------------- Branch picker ---------------- */

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "aui-branch-picker-root inline-flex items-center gap-1 text-[11px] text-slate-500",
        className,
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon className="size-3.5" />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="aui-branch-picker-state font-medium">
        <BranchPickerPrimitive.Number /> /{" "}
        <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon className="size-3.5" />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};
