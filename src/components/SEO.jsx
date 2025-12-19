import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Agro Soil Assistant - Free AI Crop Recommendations",
  description = "Get instant AI-powered crop recommendations based on your soil type, location, and climate. Free tool for Nigerian farmers.",
  url = "https://agrosoilassistant.vercel.app/",
  image = "https://agrosoilassistant.vercel.app/agrosoilassistant.png",
  type = "website",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
