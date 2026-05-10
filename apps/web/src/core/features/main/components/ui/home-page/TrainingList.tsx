import { getTrainingsByLicenseType } from "@/core/features/main/actions/training";

interface TrainingListProps {
  licenseType: string;
}

export async function TrainingList({ licenseType }: TrainingListProps) {
  const trainings = await getTrainingsByLicenseType(licenseType);

  if (trainings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>آموزشی برای این نوع گواهینامه یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {trainings.map((training) => (
        <TrainingCard key={training.id} training={training} />
      ))}
    </div>
  );
}
