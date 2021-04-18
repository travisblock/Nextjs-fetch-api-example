import Layout from '../../../components/Layout'
import Link from 'next/link'

const API1 = "https://rickandmortyapi.com/api/character";

export async function getServerSideProps({query}) {
  const { id } = query;
  const res = await fetch(`${API1}/${id}`);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Character({ data }) {
  const { name, gender, location, image, species, status } = data;

  return (
    <Layout title="Belajar Next JS">
      <div className="container my-12 mx-auto px-4 md:px-12">
        <h1 className="text-blue-600 text-center font-bold text-4xl">{name}</h1>
        <div className="flex justify-center -mx-1 lg:-mx-4 mt-5">
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 mb-3">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img src={image} className="block h-auto w-full" />
                </div>
            <h3 className="font-bold text-3xl mt-4 text-center">Details</h3>
            <div className="mx-auto flex content-center">
              <table className="table-auto mt-4">
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>:</td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>:</td>
                  <td>{location.name}</td>
                </tr>
                <tr>
                  <td>Species</td>
                  <td>:</td>
                  <td>{species}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>{status}</td>
                </tr>
              </table>
              </div>
            </div>
        </div>

        <div className="block mx-auto mt-4 text-center">
          <Link href="/">
            <a className="text-white bg-blue-500 py-1 px-3 hover:bg-blue-600 border-gray-500">BACK</a>
          </Link>
        </div>

      </div>
    </Layout>
  )
}
