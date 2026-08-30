import { FiEdit2, FiCheck } from "react-icons/fi";

export default function ProfileCard({ title, icon: Icon, iconBg, iconColor, fields, data, onEdit, readonly }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F1F0EF] bg-[#FAFAF9] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon size={20} className={iconColor} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111827]">{title}</h2>
          </div>
        </div>
        {!readonly && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E7E5E4] bg-white px-3 py-2 text-xs font-semibold text-[#6B7280] transition-all hover:border-[#1677C8] hover:text-[#1677C8]"
          >
            <FiEdit2 size={13} />
            Edit
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="divide-y divide-[#F1F0EF]">
        {fields.map((field) => {
          const value = data?.[field.key] || "—";
          const isEmpty = !data?.[field.key];

          return (
            <div key={field.key} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isEmpty ? "bg-[#F9FAFB]" : iconBg}`}>
                  <field.icon size={15} className={isEmpty ? "text-[#D1D5DB]" : iconColor} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">{field.label}</p>
                  <p className={`mt-0.5 text-sm font-semibold ${isEmpty ? "text-[#D1D5DB]" : "text-[#374151]"}`}>
                    {value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
