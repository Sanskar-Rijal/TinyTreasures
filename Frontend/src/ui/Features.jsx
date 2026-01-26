function Features() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* 1st column */}
      <div className="rounded-xl bg-purple-50 p-6 text-center">
        {/* making circle then inside emoji */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
          <span className="text-2xl text-white">🚚</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
          Free Shipping
        </h3>
        <p className="text-sm text-gray-600">On all orders above Rs 1500</p>
      </div>
      {/* 2nd col */}
      <div className="rounded-xl bg-purple-50 p-6 text-center">
        {/* making circle then inside emoji */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
          <span className="text-2xl text-white">🔒</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
          Secure Payment
        </h3>
        <p className="text-sm text-gray-600">100% secure transactions</p>
      </div>
      {/* 3rd column */}
      <div className="rounded-xl bg-purple-50 p-6 text-center">
        {/* making circle then inside emoji */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
          <span className="text-2xl text-white">↩️</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
          Easy Return
        </h3>
        <p className="text-sm text-gray-600">7-day return policy</p>
      </div>
    </div>
  );
}

export default Features;
