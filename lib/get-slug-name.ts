// Remove spaces with - and always lowercase
// returned by Algolia
// 'AR optics' => 'ar-optics'
const getSlugName = (path: string) => String(path).replace(/\s/g, '').toLocaleLowerCase();

export default getSlugName;
