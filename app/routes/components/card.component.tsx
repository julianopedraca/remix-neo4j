import { ICardProps } from "interfaces/card-props.interface";

export default function Card({title, content}:ICardProps) {
    return (
        <div className="w-full bg-white rounded-lg border border-[#E2E2E4] p-6 mt-6">
            <div className="h-6">
                <p className="text-lg font-semibold text-left text-[#110C22]">{title}</p>
            </div>
            <div className="mt-2">
                <p className="text-base font-medium text-left text-[#4F4B5C]">{content}</p>
            </div>
        </div>
    );
}

