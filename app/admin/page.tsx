import { getTitlePrefix } from "#/app/metadata";
import { fetchLandingPage } from "#/lib/databases/cms";
import mongoClientPromise from "#/lib/databases/mongodb";
import { LandingPage, PageSection } from "#/lib/types/cms";
import BlurbSection from "#/ui/modules/LandingPages/BlurbSection/BlurbSection";
import FooterSection from "#/ui/modules/LandingPages/FooterSection/FooterSection";
import HeroSection from "#/ui/modules/LandingPages/HeroSection/HeroSection";
import { MediaSection } from "#/ui/modules/LandingPages/MediaSection/MediaSection";
import { RichTextSection } from "#/ui/modules/LandingPages/RichTextSection/RichTextSection";
import { TeamSection } from "#/ui/modules/LandingPages/TeamSection/TeamSection";
import { TestimonialsSection } from "#/ui/modules/LandingPages/TestimonialsSection/TestimonialsSection";

export type LandingPagePageProps = {
  params: {
    slug: LandingPage["slug"];
  };
  searchParams: {
    query: string;
  };
};

// export const revalidate = 0;
// export const runtime = "edge";

async function getData() {
  try {
    const client = await mongoClientPromise;
    // console.log("client", client);
    const db = client.db("sample_mflix");
    // console.log("db", db);

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return JSON.parse(JSON.stringify(movies));
  } catch (e) {
    console.error(e);
  }
}

export default async function AdminPage() {
  const movies = (await getData()) as any;
  console.log("movies", movies);
  if (!movies || movies.length === 0) {
    return <div>No movies</div>;
  }

  return movies.map((movie: any, index: number) => <h1 key={index}>{movie.title}</h1>);
}
