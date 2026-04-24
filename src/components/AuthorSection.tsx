import Image from 'next/image';
import Link from 'next/link';

import { AUTHOR_PROFILE } from '@/lib/authorProfile';

const AuthorSection = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mt-12 mb-8 flex flex-col md:flex-row items-center gap-8">
      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-50/50">
        <Image
          src={AUTHOR_PROFILE.avatarUrl}
          alt={`Foto de perfil de ${AUTHOR_PROFILE.fullName}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Revisado por {AUTHOR_PROFILE.name}</h3>
        <p className="text-slate-500 font-medium text-sm mb-4">
          {AUTHOR_PROFILE.role}
        </p>
        <p className="text-slate-600 leading-relaxed text-sm">
          Raúl cuenta con más de 10 años de experiencia desarrollando utilidades web que simplifican la vida digital.
          Cada herramienta y contenido en CajaUtil.com es revisado meticulosamente para asegurar precisión, seguridad y la mejor experiencia de usuario,
          cumpliendo con altos estándares de transparencia y utilidad.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-blue-600 md:justify-start">
          <Link href="/sobre-nosotros" className="hover:underline">Conoce nuestra metodología</Link>
          <Link href={AUTHOR_PROFILE.githubUrl} className="hover:underline" target="_blank" rel="noreferrer">GitHub de Raubreak</Link>
          <Link href="/contacto" className="hover:underline">Contactar con el equipo</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorSection;
