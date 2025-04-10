interface FeatureCardProps {
    feature: string;
    description: string;
}

export default function FeatureCard({ feature, description }: FeatureCardProps) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600">{feature}</h3>
            <p className="text-gray-700 mt-2">
                {description}
            </p>
        </div>
    )
}
