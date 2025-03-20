import Link from "next/link";

interface ActionCardProps {
    call: string;
    action: string;
}

export default function ActionCard({call, action}: ActionCardProps) {
    return (
        <div className="flex flex-col items-center gap-2 bg-white rounded-lg p-4 max-w-60">
            <p className="text-lg text-slate-600">{call}</p>
            <Link href="/editais">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded-lg">
                    {action}
                </button>
            </Link>
        </div>
    )
}
