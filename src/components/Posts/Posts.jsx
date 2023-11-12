'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { PostCard } from "./Posts.card"
import { AiOutlineLoading } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer'
import { Fragment, useEffect } from 'react';

export function Posts({query}){
  const { ref, inView } = useInView()
  const { data: session } = useSession();
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({pageParam}) => {
      const data = await fetch(`/api/posts?page=${pageParam}&${query}`).then(res => res.json())
      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
          return undefined
      }
      return lastPageParam + 1
    }
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (status === "error") {
    console.error(error);
    return (
      <section className="grid place-content-center py-10">
        <b>Hubo un error al cargar los posts.</b>
      </section>
    )
  }

  return (
    <>
    {
      status === 'pending'?
      <section className="grid place-content-center py-10">
        <AiOutlineLoading size={24} className="animate-spin" />
      </section>
      :
      <>
      {
        data.pages.map((page, i) => (
          <Fragment key={i}>
          {
            page?.map(e => (
              <PostCard key={e._id} data={e} session={session?.user} />
            ))
          }
          </Fragment>
        ))
      }
      <span ref={ref}></span>
      {
        isFetchingNextPage?
        <section className="grid place-content-center py-10">
          <AiOutlineLoading size={24} className="animate-spin" />
        </section>
        :
        hasNextPage?
        null
        :
        <strong className='mx-auto mt-4'>No hay mas posts</strong>
      }
      </>
    }
    </>
  )
}