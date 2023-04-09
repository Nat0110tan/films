import Image from "next/image"
export async function generateStaticParams() {
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
  const res = await data.json()
  console.log(res);
  return res.results.map((movie)=>({
    movie: toString(movie.id),
  }))
}
export default async function MovieDetail({params}) {
  const {movie} = params;
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`, {next:{revalidate:10}}
  );
  const res = await data.json();
  const imgPath = "https://image.tmdb.org/t/p/original" + res.backdrop_path;
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2 className="bg-green-600 text-sm inline-block my-2 py-2 px-2 rounded-md">
          {res.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imgPath}
          width={1000}
          height={1000}
          priority
        ></Image>
        <p>{res.overview}</p>
      </div>
    </div>
  );
}


// export default async function MovieDetail({params}) {
//   const {movie} = params;
//   console.log(params);
//   const data = await fetch(
//     `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`, {next:{revalidate:10}}
//   );
//   const res = await data.json();
//   const imgPath = "https://image.tmdb.org/t/p/original" + res.backdrop_path;
//   return (
//     <div>
//       <div>
//         <h2 className="text-2xl">{res.title}</h2>
//         <h2 className="text-lg">{res.release_date}</h2>
//         <h2>Runtime: {res.runtime} minutes</h2>
//         <h2 className="bg-green-600 text-sm inline-block my-2 py-2 px-2 rounded-md">
//           {res.status}
//         </h2>
//         <Image
//           className="my-12 w-full"
//           src={imgPath}
//           width={1000}
//           height={1000}
//           priority
//         ></Image>
//         <p>{res.overview}</p>
//       </div>
//     </div>
//   );
// }