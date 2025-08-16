export async function generateStaticParams() {
  // Generate some dummy params for static build
  return [
    { serviceId: 'placeholder' },
  ];
}

export default function BookServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}