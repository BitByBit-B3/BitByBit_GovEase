export async function generateStaticParams() {
  // Generate ALL service IDs from the user's database
  return [
    // Demo services (complete list)
    { serviceId: 'demo-service-birth-certificate' },
    { serviceId: 'demo-service-death-certificate' },
    { serviceId: 'demo-service-driving-license' },
    { serviceId: 'demo-service-license-renewal' },
    { serviceId: 'demo-service-marriage-certificate' },
    { serviceId: 'demo-service-passport-application' },
    { serviceId: 'demo-service-passport-renewal' },
    { serviceId: 'demo-service-tax-clearance' },
    { serviceId: 'demo-service-tax-filing' },
    { serviceId: 'demo-service-tax-registration' },
    { serviceId: 'demo-service-vehicle-registration' },
    { serviceId: 'demo-service-visa-extension' },
    
    // Regular services (complete list)
    { serviceId: 'service-birth-certificate' },
    { serviceId: 'service-character-certificate' },
    { serviceId: 'service-grama-certificate' },
    { serviceId: 'service-income-certificate' },
    { serviceId: 'service-land-permit' },
    { serviceId: 'service-marriage-certificate' },
    { serviceId: 'service-passport-application' },
    { serviceId: 'service-passport-renewal' },
    { serviceId: 'service-police-clearance' },
    { serviceId: 'service-samurdhi-application' },
    
    // Original services (backward compatibility)
    { serviceId: 'driving-license-new' },
    { serviceId: 'driving-license-renewal' },
    { serviceId: 'vehicle-registration' },
    { serviceId: 'passport-new' },
    { serviceId: 'passport-renewal' },
    { serviceId: 'birth-certificate' },
    { serviceId: 'marriage-certificate' },
    { serviceId: 'tax-return-filing' },
    
    // Fallback
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