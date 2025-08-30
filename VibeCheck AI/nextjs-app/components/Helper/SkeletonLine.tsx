function SkeletonLine({ width = '100%' }: { width?: string }) {
  return <div className="h-3 rounded bg-white/10 animate-pulse" style={{ width }} />
}
export default SkeletonLine