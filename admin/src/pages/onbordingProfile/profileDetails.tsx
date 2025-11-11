import { formatDate } from "../../utils";




// Define the OnboardingProfile interface
interface OnboardingProfile {
  _id: string;
  userId: {
    _id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    status?: string;
    image?: string;
    createdAt: string;
    onboardingStatus?: string;
  };
  applicationFormData: Array<{
    sectionName: string;
    data?: Record<string, any>;
  }>;
  completionStatus: Record<string, boolean>;
  progressStatus: Record<string, number>;
  isComplete?: boolean;
  selectedSection?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BrandProfileDetails({ profile }: { profile: OnboardingProfile }) {
  if (!profile) return null;

  // Helper function to find section data by name
  const getSectionData = (sectionName: string) => {
    return profile.applicationFormData.find(
      (section: { sectionName: string }) => section.sectionName === sectionName
    )?.data || {};
  };

  // Extract all section data
  const identityData = getSectionData('identity');
  const goalsIntentData = getSectionData('goalsIntent');
  const ecommerceData = getSectionData('ecommerceExperience');
  const challengesData = getSectionData('challengesSupport');
  const readinessData = getSectionData('readinessExpectations');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <section>
        <header>
          <div className="flex justify-between items-center">
            <h2>Profile Overview</h2>
            {/* <Badge 
              variant={profile.userId.isVerified ? "default" : "secondary"}
              className="capitalize"
            >
              {profile.userId.isVerified ? "Verified" : "Not Verified"}
            </Badge> */}
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{profile.userId.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Onboarding Status</p>
            <p className="font-medium capitalize">{profile.userId.onboardingStatus || 'Not Started'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Profile Created</p>
            <p className="font-medium">{formatDate(profile.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-medium">{formatDate(profile.updatedAt)}</p>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      {identityData && Object.keys(identityData).length > 0 && (
        <SectionCard title="Identity Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(identityData).map(([key, value]) => (
              <InfoField key={key} label={key} value={value} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Goals & Intent Section */}
      {goalsIntentData && Object.keys(goalsIntentData).length > 0 && (
        <SectionCard title="Goals & Intent">
          <div className="space-y-4">
            {Object.entries(goalsIntentData).map(([key, value]) => (
              <InfoField key={key} label={key} value={value} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* E-commerce Experience */}
      {ecommerceData && Object.keys(ecommerceData).length > 0 && (
        <SectionCard title="E-commerce Experience">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ecommerceData).map(([key, value]) => (
              <InfoField key={key} label={key} value={value} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Challenges & Support */}
      {challengesData && Object.keys(challengesData).length > 0 && (
        <SectionCard title="Challenges & Support">
          <div className="space-y-4">
            {Object.entries(challengesData).map(([key, value]) => (
              <InfoField key={key} label={key} value={value} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Readiness Expectations */}
      {readinessData && Object.keys(readinessData).length > 0 && (
        <SectionCard title="Readiness & Expectations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(readinessData).map(([key, value]) => (
              <InfoField key={key} label={key} value={value} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Progress Status */}
      <SectionCard title="Progress Status">
        <div className="space-y-4">
          {Object.entries(profile.progressStatus).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span>{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// Helper Components
function SectionCard({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode 
}) {
  return (
    <section>
      <header className="pb-2">
        <h2 className="text-lg bg-blue-800 text-white px-4 py-2">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

function InfoField({ 
  label, 
  value 
}: { 
  label: string; 
  value: any 
}) {
  const formatLabel = (str: string) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const formatValue = (val: any): string => {
    if (val === null || val === undefined) return 'N/A';
    if (typeof val === 'boolean') return val ? 'Yes' : 'No';
    if (Array.isArray(val)) return val.join(', ');
    // if (val instanceof Date) return formatDateTime(val);
    return String(val);
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground">{formatLabel(label)}</p>
      <p className="font-medium">{formatValue(value)}</p>
    </div>
  );
}
