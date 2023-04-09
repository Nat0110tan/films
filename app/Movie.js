import Link from "next/link"
import Image from "next/image"
export default function Movie({title,key, id, poster_path, release_date}) {
  const imgPath = "https://image.tmdb.org/t/p/original" + poster_path
  return (
    <div>
      <h1>{title}</h1>
      <h2>Release date: {release_date}</h2>
      <Link href={`/${id}`}>
        <Image src={imgPath} width={1500} alt={title} height={800} />
      </Link>
    </div>
  )
}
