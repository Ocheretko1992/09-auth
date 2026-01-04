'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NotesPage.module.css';
import { LoaderLoading } from '@/components/Loader/Loader';

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
    placeholderData: prev => prev,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <div className={css.sidebar}></div>
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </header>
      {isLoading && <LoaderLoading />}
      {isError && <ErrorMessage message={(error as Error).message} />}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
