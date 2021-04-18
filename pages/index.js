import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { fas, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Link from 'next/link'

library.add(fas, faHeart)

const API1 = "https://rickandmortyapi.com/api/character";

export async function getServerSideProps(context) {
  const res = await fetch(API1);
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: API1
  })

  const { current } = page;

  useEffect(() => {
    if (current === API1) return;

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info
      });

      if ( !nextData.info?.prev ) {
        updateResults(nextData.results);
        return;
      }

      updateResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ];

      })
    }

    request();

  }, [current]);

  function handleLoadMore() {
    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    })
  }

  function handleSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name == 'query');

    const value = fieldQuery.value || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint
    })
  }
  return (
    <Layout title="Belajar Next JS">
      <div className="container my-12 mx-auto px-4 md:px-12">
        <h1 className="text-blue-600 text-center font-bold text-4xl">Next JS Fetch API</h1>

          <div className="font-sans text-black bg-white flex items-center justify-center mt-6">
            <form onSubmit={handleSearch}>
              <div className="border rounded overflow-hidden flex">
                  <input name="query" type="search" className="px-4 py-2" placeholder="Search..."/>
                  <button type="submit" className="flex items-center justify-center px-4 border-l">
                  <svg className="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
                  </button>
              </div>
            </form>
          </div>

        <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-5">

        {results.map(result => {
          const {id, name, image} = result;

          return(
            <div key={id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 mb-3">
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <Link href="/character/[id]" as={`/character/${id}`}>
                  <a>
                    <img src={ image } className="block h-auto w-full" alt={`${name} Thumb`}/>

                    <header className="flex items-center justify-center leading-tight p-2 md:p-4">
                      <h1 className="text-2xl text-center text-blue-500 font-bold">
                        { name }
                      </h1>
                    </header>
                  </a>
                  </Link>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <a className="flex items-center no-underline hover:underline text-black" href="https://github.com/ajid2" target="_blank">
                      <img src="https://avatars.githubusercontent.com/u/35151406?v=4" className="block object-cover w-8 h-8 rounded-full" alt="author avatar"/>
                      <p className="ml-2 text-sm">
                        Ajid Stark
                      </p>
                    </a>
                    <a className="no-underline text-gray-500 hover:text-red-700" href="#">
                      <span className="hidden">Like</span>
                      <FontAwesomeIcon icon="heart"/>
                    </a>
                  </footer>
                </article>
            </div>
          )
        })}
        </div>

        <div className="block mx-auto mt-4 text-center">
          <button className="text-white bg-blue-500 py-1 px-3 hover:bg-blue-600 border-gray-500" onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    </Layout>
  )
}
