import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (nextPage: number) => void;
}

export default function Pagination({ totalPages, currentPage, setPage }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={currentPage - 1}
      nextLabel="→"
      previousLabel="←"
      breakLabel="..."
      containerClassName="my-4 flex list-none justify-center gap-1.5 p-0"
      pageClassName="h-10 w-10 rounded border border-slate-300"
      pageLinkClassName="flex h-full w-full cursor-pointer items-center justify-center text-foreground dark:text-slate-200 transition-transform active:scale-[0.98]"
      activeClassName="border-blue-600 bg-blue-600"
      activeLinkClassName="font-bold text-white"
      previousClassName="h-10 w-10 rounded border border-slate-300 transition-colors"
      nextClassName="h-10 w-10 rounded border border-slate-300 transition-colors"
      previousLinkClassName="flex h-full w-full cursor-pointer items-center justify-center text-foreground dark:text-slate-200 transition-transform active:scale-[0.98]"
      nextLinkClassName="flex h-full w-full cursor-pointer items-center justify-center text-foreground dark:text-slate-200 transition-transform active:scale-[0.98]"
      breakClassName="h-10 w-10"
      breakLinkClassName="flex h-full w-full items-center justify-center text-slate-500"
      disabledClassName="cursor-not-allowed border-slate-200 bg-slate-100 dark:bg-slate-700 opacity-50"
      disabledLinkClassName="pointer-events-none cursor-not-allowed text-slate-400"
    />
  );
}
