import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
} from '@tanstack/react-table'
import { Input } from '@/components/ui'

interface FilterableDataTableProps<TData> {
  title?: string
  columns: ColumnDef<TData>[]
  data: TData[]
  loading?: boolean
  searchPlaceholder?: string
  searchKeys?: (keyof TData)[]
  onRowClick?: (row: TData) => void
}

export const FilterableDataTable = <TData,>({
  title,
  columns,
  data,
  loading = false,
  searchPlaceholder = 'Search...',
  searchKeys,
  onRowClick,
}: FilterableDataTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState('')

  const filteredData = useMemo(() => {
    if (!globalFilter || !searchKeys) return data

    const filterLower = globalFilter.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((key) => {
        const value = row[key]
        return value?.toString().toLowerCase().includes(filterLower)
      })
    )
  }, [data, globalFilter, searchKeys])

  const table = useReactTable<TData>({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        {title && (
          <h3 className="text-lg font-bold text-[#03318C]">{title}</h3>
        )}
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm border border-[#EFF6FF]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#EFF6FF]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-[#EFF6FF] text-left px-4 py-3 text-[#03318C] font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-[#8AA3C4]"
                >
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFF]'
                  } ${onRowClick ? 'cursor-pointer hover:bg-blue-50' : ''}`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-[#03318C] border-b border-[#FAFCFF]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && filteredData.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#03318C]">
            Showing{' '}
            <strong>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </strong>{' '}
            to{' '}
            <strong>
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                filteredData.length
              )}
            </strong>{' '}
            of <strong>{filteredData.length}</strong> entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-[#B3C9E6] text-[#03318C] text-xs font-bold bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-xs text-[#03318C]">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-[#B3C9E6] text-[#03318C] text-xs font-bold bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


