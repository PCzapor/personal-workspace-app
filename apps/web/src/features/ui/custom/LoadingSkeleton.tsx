import React from "react"
import { cn } from "@/lib/helpers"

interface SkeletonLineProps {
  width?: "full" | "3/4" | "1/2" | "1/3"
  height?: "xs" | "sm" | "base"
  className?: string
}

export function SkeletonLine({
  width = "full",
  height = "sm",
  className,
}: SkeletonLineProps) {
  const widthClass =
    {
      full: "w-full",
      "3/4": "w-3/4",
      "1/2": "w-1/2",
      "1/3": "w-1/3",
    }[width] ?? "w-full"

  const heightClass =
    {
      xs: "h-2",
      sm: "h-3",
      base: "h-4",
    }[height] ?? "h-3"

  return (
    <div
      className={cn(
        widthClass,
        heightClass,
        "rounded-full bg-white/8 animate-pulse",
        className
      )}
    />
  )
}

interface SkeletonBoxProps {
  height?: string
  width?: string
  rounded?: string
  className?: string
}

export function SkeletonBox({
  height = "h-10",
  width = "w-full",
  rounded = "rounded-xl",
  className,
}: SkeletonBoxProps) {
  return (
    <div
      className={cn(
        width,
        height,
        rounded,
        "bg-white/5 animate-pulse",
        className
      )}
    />
  )
}

export function PanelSkeleton() {
  return (
    <div className='space-y-4'>
      <SkeletonLine height='base' width='1/2' />
      <SkeletonLine height='sm' width='full' />
      <SkeletonLine height='sm' width='3/4' />
    </div>
  )
}

interface CardSkeletonProps {
  count?: number
}

export function CardSkeleton({ count = 3 }: CardSkeletonProps) {
  return (
    <div className='space-y-3 p-4'>
      <SkeletonLine height='sm' width='1/2' />
      <div className='space-y-2'>
        <SkeletonLine width='3/4' />
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonLine key={i} />
        ))}
      </div>
    </div>
  )
}

interface GridSkeletonProps {
  count?: number
}

export function GridSkeleton({ count = 3 }: GridSkeletonProps) {
  return (
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-3'>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='rounded-2xl bg-white/4 border border-white/10 p-4'
        >
          <CardSkeleton />
        </div>
      ))}
    </div>
  )
}

interface SplitViewSkeletonProps {
  showSidebar?: boolean
}

export function SplitViewSkeleton({
  showSidebar = true,
}: SplitViewSkeletonProps) {
  return (
    <div className='grid md:grid-cols-[320px_1fr] gap-4 h-full'>
      {showSidebar && (
        <div className='bg-white/4 border border-white/10 rounded-3xl backdrop-blur p-4 space-y-3'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='h-12 rounded-2xl bg-white/8 animate-pulse'
            />
          ))}
        </div>
      )}

      <div className='bg-white/4 border border-white/10 rounded-3xl backdrop-blur p-6 space-y-4'>
        <SkeletonLine height='base' width='1/2' />
        <div className='space-y-3'>
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine width='3/4' />
        </div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='rounded-2xl bg-white/4 border border-white/10 p-4'
          >
            <SkeletonLine height='base' width='1/2' />
            <div className='mt-4 space-y-3'>
              <SkeletonBox height='h-8' />
              <SkeletonBox height='h-8' />
              <SkeletonBox height='h-6' width='w-3/4' />
            </div>
          </div>
        ))}
      </div>

      <div className='rounded-2xl bg-white/4 border border-white/10 p-4'>
        <SkeletonLine height='base' width='1/3' />
        <div className='mt-4 grid gap-3 md:grid-cols-2'>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className='rounded-2xl bg-white/5 p-4 space-y-2'>
              <SkeletonBox height='h-5' width='w-3/4' />
              <SkeletonBox height='h-4' width='w-1/2' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function NoteListItemSkeleton() {
  return (
    <div className='space-y-2 px-3'>
      <div className='h-10 bg-white/5 rounded-xl animate-pulse' />
      <div className='h-8 bg-white/5 rounded-xl animate-pulse' />
    </div>
  )
}

export function NotesListSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='h-10 bg-white/5 rounded-2xl animate-pulse px-3' />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='px-3'>
          <NoteListItemSkeleton />
        </div>
      ))}
    </div>
  )
}

export function NoteEditorSkeleton() {
  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='h-12 bg-white/5 rounded-2xl animate-pulse' />
      <div className='flex-1 space-y-3'>
        <div className='h-40 bg-white/5 rounded-2xl animate-pulse' />
        <div className='h-40 bg-white/5 rounded-2xl animate-pulse' />
      </div>
    </div>
  )
}

export function NotesSplitViewSkeleton() {
  return (
    <div className='grid md:grid-cols-[320px_1fr] gap-4 h-full'>
      <div className='bg-white/4 border border-white/10 rounded-3xl p-4 backdrop-blur overflow-hidden'>
        <NotesListSkeleton />
      </div>
      <div className='bg-white/4 border border-white/10 rounded-3xl backdrop-blur overflow-hidden'>
        <NoteEditorSkeleton />
      </div>
    </div>
  )
}

interface LinkSkeletonProps {
  count?: number
}

export function LinkSkeleton({ count = 6 }: LinkSkeletonProps) {
  return (
    <div className='grid gap-3'>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='p-4 rounded-2xl bg-white/4 border border-white/10 animate-pulse'
        >
          <div className='h-5 bg-white/10 rounded-lg w-2/3 mb-2' />
          <div className='h-3 bg-white/5 rounded-lg w-1/2' />
        </div>
      ))}
    </div>
  )
}
