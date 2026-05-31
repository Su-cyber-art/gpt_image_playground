import { useStore } from '../store'
import Select from './Select'
import { ChevronLeftIcon, CollectionManageIcon, FavoriteIcon } from './icons'

export default function SearchBar() {
  const searchQuery = useStore((s) => s.searchQuery)
  const setSearchQuery = useStore((s) => s.setSearchQuery)
  const filterStatus = useStore((s) => s.filterStatus)
  const setFilterStatus = useStore((s) => s.setFilterStatus)
  const filterFavorite = useStore((s) => s.filterFavorite)
  const setFilterFavorite = useStore((s) => s.setFilterFavorite)
  const activeFavoriteCollectionId = useStore((s) => s.activeFavoriteCollectionId)
  const setActiveFavoriteCollectionId = useStore((s) => s.setActiveFavoriteCollectionId)
  const openManageCollectionsModal = useStore((s) => s.openManageCollectionsModal)
  const inCollectionOverview = filterFavorite && !activeFavoriteCollectionId

  const handleFavoriteClick = () => {
    if (activeFavoriteCollectionId) {
      setActiveFavoriteCollectionId(null)
      return
    }
    setFilterFavorite(!filterFavorite)
  }

  return (
    <div data-no-drag-select className="mb-4 mt-3 flex flex-col gap-2 sm:flex-row">
      <div className="z-20 flex gap-2 sm:flex-shrink-0">
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
            filterFavorite
              ? 'border-amber-400 bg-amber-50 text-amber-500 dark:bg-amber-400/10'
              : 'border-gray-200 bg-white/80 text-gray-400 hover:bg-gray-50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]'
          }`}
          title={activeFavoriteCollectionId ? '返回收藏夹' : filterFavorite ? '退出收藏视图' : '收藏夹'}
        >
          {activeFavoriteCollectionId ? <ChevronLeftIcon className="h-5 w-5" /> : <FavoriteIcon filled={filterFavorite} className="h-5 w-5" />}
        </button>
        {inCollectionOverview && (
          <button
            type="button"
            onClick={openManageCollectionsModal}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/80 text-gray-400 transition-all hover:bg-gray-50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            title="管理收藏夹"
          >
            <CollectionManageIcon className="h-5 w-5" />
          </button>
        )}
        {!inCollectionOverview && (
          <div className="relative min-w-0 flex-1 sm:w-32 sm:flex-none">
            <Select
              value={filterStatus}
              onChange={(val) => setFilterStatus(val as any)}
              options={[
                { label: '全部状态', value: 'all' },
                { label: '已完成', value: 'done' },
                { label: '进行中', value: 'running' },
                { label: '失败', value: 'error' },
              ]}
              className="h-9 rounded-lg border border-gray-200 bg-white/80 px-3 text-sm transition hover:bg-gray-50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            />
          </div>
        )}
      </div>
      <div className="relative z-10 flex-1">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder={inCollectionOverview ? '搜索收藏夹名称...' : '搜索提示词、参数、模型...'}
          className="h-9 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 pr-4 text-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/[0.08] dark:bg-white/[0.03]"
        />
      </div>
    </div>
  )
}
