import Image from 'next/image';
import Link from 'next/link';

import s from './Hero.module.css';

interface Props {
  variant?: 'slim' | 'to-r' | string;
  data?: any;
  priority?: boolean;
}

const Hero: React.FC<Props> = ({ data, variant, priority = false }) => {
  const image =
    data.background_image && data.background_image.url
      ? data.background_image.url
      : '/placeholder.png';

  if (variant === 'to-r') {
    return (
      <div className={s.toR} style={{ height: '467px' }}>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            alt="img"
            className="object-fill"
            fill
            priority={priority}
            quality="75"
            sizes="100vw"
            src={image}
          />
        </div>
        <div className="flex-1" />
        <div className="flex flex-1 flex-col items-center justify-center z-10 bg-gray-50 md:bg-transparent px-6 m-6 md:p-0 md:m-0">
          {data.title && (
            <h2 className="mb-2 text-2xl font-bold tracking-wide text-center">{data.title}</h2>
          )}
          <div className="max-w-md py-4" dangerouslySetInnerHTML={{ __html: data.description }} />
          {data.link && (
            <Link
              className="uppercase font-semibold tracking-wide text-xs text-slate-100 bg-slate-900 rounded-full px-4 py-3 hover:bg-black transition-colors ease-in duration-150"
              href={data?.link.url ? data?.link?.url : '/'}
            >
              {data?.link?.title}
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'slim') {
    const styleProps = data.background_image
      ? {
          minHeight: '220px',
        }
      : {};

    return (
      <div
        className="py-10 relative flex items-center justify-center mb-4 text-white bg-gradient-to-r from-red-dark to-red-light"
        style={styleProps}
      >
        {data.background_image ? (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              alt="img"
              className="object-fill"
              fill
              priority={priority}
              quality="75"
              sizes="100vw"
              src={image}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center text-center mb-4 bg-red"
      style={{ minHeight: '467px' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image alt="img" className="object-cover" fill priority sizes="100vw" src={image} />
      </div>
      <div className="bg-white bg-opacity-90 p-10 m-6 max-w-2xl z-10">
        <h2 className="text-2xl font-bold px-12 mb-2">{data.title}</h2>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: data.description }} />
        <Link
          className="uppercase font-semibold tracking-wide text-xs text-slate-100 bg-slate-900 rounded-full px-4 py-3 hover:bg-black transition-colors ease-in duration-150"
          href={data?.link?.url ? data.link.url : '/'}
        >
          {data?.link?.title}
        </Link>
      </div>
    </div>
  );
};

export default Hero;
