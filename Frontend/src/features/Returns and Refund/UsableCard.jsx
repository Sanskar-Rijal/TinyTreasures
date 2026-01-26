function UsableCard({ title, description, index }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      {/* card title  */}
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
          {index !== undefined && `${index + 1}. `}
          {title}
        </h3>
      </div>
      <p className="mb-4 leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

export default UsableCard;
