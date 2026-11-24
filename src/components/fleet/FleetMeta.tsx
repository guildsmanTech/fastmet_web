import { Helmet } from "react-helmet-async";

interface FleetMetaProps {
  title: string;
  description: string;
  path: string;
}

export default function FleetMeta({ title, description, path }: Readonly<FleetMetaProps>) {
  const url = `https://fastmet.com.ph${path}`;
  return (
    <Helmet>
      <title>{title} | FastMet</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={`${title} | FastMet`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
