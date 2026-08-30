import { useState, useEffect } from "react";
import { FiX, FiCheck, FiLoader } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

export default function ProfileEditForm({ title, fields, apiFetch, apiSave, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch();
        setFormData(data || {});
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [apiFetch]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white p-12 text-center shadow-sm">
        <FiLoader className="mx-auto mb-3 h-6 w-6 animate-spin text-[#1677C8]" />
        <p className="text-sm text-[#9CA3AF]">Memuat data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F1F0EF] bg-[#FAFAF9] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <LuGraduationCap size={20} className="text-[#1677C8]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111827]">{title}</h2>
            <p className="text-xs text-[#9CA3AF]">Perbarui informasi profil Anda</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] transition hover:bg-[#F3F4F6] hover:text-[#374151]"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Fields */}
      <div className="divide-y divide-[#F1F0EF]">
        {fields.map((field) => {
          const value = formData[field.key] || "";
          return (
            <div key={field.key} className="grid grid-cols-1 gap-2 px-6 py-4 md:grid-cols-[200px_1fr] md:items-center">
              <div className="flex items-center gap-2">
                <field.icon size={15} className="text-[#9CA3AF]" />
                <label htmlFor={field.key} className="text-xs font-semibold text-[#6B7280]">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
              </div>
              <input
                id={field.key}
                type="text"
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1677C8] focus:ring-2 focus:ring-[#1677C8]/10"
              />
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-[#F1F0EF] bg-[#FAFAF9] px-6 py-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-xl border border-[#E7E5E4] bg-white px-5 py-2.5 text-sm font-semibold text-[#6B7280] transition hover:border-[#D1D5DB] hover:text-[#111827] disabled:opacity-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1677C8] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#1677C8]/25 transition hover:bg-[#1268B2] disabled:opacity-50"
        >
          {saving ? (
            <>
              <FiLoader className="animate-spin" size={14} />
              Menyimpan...
            </>
          ) : (
            <>
              <FiCheck size={14} />
              Simpan Perubahan
            </>
          )}
        </button>
      </div>
    </form>
  );
}
