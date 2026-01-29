import { FiTrash } from "react-icons/fi";
import Button from "../../ui/Button";
import QuantitySelector from "../../ui/QuantitySelector";
import { useDispatch } from "react-redux";
import { removeItem } from "../../ReduxSlices/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeItem(item.product));
  }

  return (
    <div
      key={item.product}
      className="mx-4 rounded-lg border border-gray-200 bg-white/80"
    >
      <div className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="mb-5 h-55 overflow-hidden sm:h-34 sm:w-34">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-center">
              <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900 sm:text-xl">
                {item.name}
              </h3>
              <p className="mb-5 text-sm text-gray-600">{item.category}</p>
              {/* Increase or Decrease Quantity */}
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="self-start">
                  <QuantitySelector
                    product={item.product}
                    quantity={item.quantity}
                  />
                </div>

                <div className="flex w-full items-center justify-between gap-3 sm:justify-end">
                  <div>
                    <p className="text-lg text-purple-600">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.price.toFixed(2)} each
                    </p>
                  </div>
                  {/* Delete Product  */}
                  <Button
                    onClick={handleDelete}
                    size="lg"
                    className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:text-red-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    variant="ghost"
                  >
                    <FiTrash className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
