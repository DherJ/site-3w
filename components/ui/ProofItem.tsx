export default function ProofItem({
    icon: Icon,
    title,
    desc,
}: {
    icon: any;
    title: string;
    desc: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-brandLine">
                <Icon className="h-5 w-5 text-brandNavy" />
            </div>
            <div>
                <div className="text-sm font-extrabold text-brandNavy">{title}</div>
                <div className="mt-1 text-sm text-brandMuted">{desc}</div>
            </div>
        </div>
    );
}