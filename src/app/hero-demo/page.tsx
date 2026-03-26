import { Hero3DStudio } from '@/app/_sections/hero-3d-studio';

export const metadata = {
  title: '3D Studio Hero | Demo',
  description: 'Luxury minimalist hero section for 3D animation studio',
};

export default function HeroDemo() {
  return (
    <main className="w-full">
      <Hero3DStudio />
    </main>
  );
}
