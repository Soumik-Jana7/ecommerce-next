import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId : 'mpz3i68u',
    dataset : 'production',
    apiVersion : '2023-01-17',
    useCdn : true,
    token : process.env.NEXT_SANITY_PUBLIC_TOKEN
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);