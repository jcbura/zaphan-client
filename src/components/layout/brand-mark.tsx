import { H1, P } from '@/components';

export const BrandMark = () => {
  return (
    <div className="flex items-center">
      <H1 className="peer text-2xl md:text-4xl">zaphan</H1>
      <P className="pointer-events-none p-2 italic opacity-0 blur-sm transition-all delay-700 duration-500 peer-hover:pointer-events-auto peer-hover:opacity-100 peer-hover:blur-none peer-hover:delay-0 hover:pointer-events-auto hover:opacity-100 hover:blur-none hover:delay-0">
        to hide · store up · treasure
      </P>
    </div>
  );
};
