function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-white/50">{label}</div>
      <div className="text-sm font-medium text-white mt-1">{value}</div>
    </div>
  )
}

export default Metric