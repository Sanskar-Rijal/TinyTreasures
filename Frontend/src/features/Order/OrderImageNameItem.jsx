function OrderImageNameItem({ item }) {
  return (
    <div className="flex gap-4" key={item.id}>
      <img
        className="h-20 w-20 rounded-lg bg-white object-contain"
        src={item.image}
        alt={item.name}
      />
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        <p className="mt-1 text-sm text-gray-900">Price: Rs {item.price}</p>
      </div>
    </div>
  );
}

export default OrderImageNameItem;
