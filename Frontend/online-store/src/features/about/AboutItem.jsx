function AboutItem({ item }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          {item.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}

export default AboutItem;
