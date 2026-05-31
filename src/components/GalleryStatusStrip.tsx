import { useMemo } from 'react'
import { useStore } from '../store'

function statTone(tone: 'blue' | 'green' | 'red' | 'amber' | 'zinc') {
  switch (tone) {
    case 'blue':
      return 'border-blue-500/25 bg-blue-50/70 text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200'
    case 'green':
      return 'border-emerald-500/25 bg-emerald-50/70 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200'
    case 'red':
      return 'border-red-500/25 bg-red-50/70 text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200'
    case 'amber':
      return 'border-amber-500/25 bg-amber-50/80 text-amber-700 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-200'
    default:
      return 'border-gray-200 bg-white/70 text-gray-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-gray-200'
  }
}

export default function GalleryStatusStrip() {
  const tasks = useStore((s) => s.tasks)
  const selectedTaskIds = useStore((s) => s.selectedTaskIds)
  const filterStatus = useStore((s) => s.filterStatus)
  const filterFavorite = useStore((s) => s.filterFavorite)
  const searchQuery = useStore((s) => s.searchQuery)

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      running: tasks.filter((task) => task.status === 'running').length,
      done: tasks.filter((task) => task.status === 'done').length,
      error: tasks.filter((task) => task.status === 'error').length,
      favorite: tasks.filter((task) => task.isFavorite).length,
    }
  }, [tasks])

  const items = [
    { label: '全部', value: stats.total, tone: 'zinc' as const },
    { label: '进行中', value: stats.running, tone: 'blue' as const },
    { label: '已完成', value: stats.done, tone: 'green' as const },
    { label: '失败', value: stats.error, tone: 'red' as const },
    { label: '收藏', value: stats.favorite, tone: 'amber' as const },
  ]

  const activeContext = [
    filterStatus !== 'all' ? `状态: ${filterStatus}` : null,
    filterFavorite ? '仅收藏' : null,
    searchQuery.trim() ? '搜索中' : null,
    selectedTaskIds.length ? `已选 ${selectedTaskIds.length}` : null,
  ].filter(Boolean)

  return (
    <section data-no-drag-select className="mt-3 border-y border-gray-200/80 py-2 dark:border-white/[0.08] sm:mt-4 sm:py-3">
      <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_3px_rgba(37,99,235,0.14)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Workbench
            </p>
          </div>
          <p className="mt-1 truncate text-sm font-medium text-gray-800 dark:text-gray-100">
            <span className="hidden sm:inline">图像任务工作台</span>
            <span className="sm:hidden">任务工作台</span>
            {activeContext.length > 0 && (
              <span className="ml-2 font-normal text-gray-400 dark:text-gray-500">
                {activeContext.join(' / ')}
              </span>
            )}
          </p>
        </div>
        <dl className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0 sm:pb-0 lg:min-w-[560px]">
          {items.map((item) => (
            <div key={item.label} className={`min-w-[96px] rounded-lg border px-3 py-2 ${statTone(item.tone)}`}>
              <dt className="text-[11px] font-medium text-current/70">{item.label}</dt>
              <dd className="mt-0.5 font-mono text-lg font-semibold leading-none">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
