import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { updateQuantity, removeFromCart } from "../../store/slices/cartSlice"

const CartSidebar: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { items } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find(item => item.id === id)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity > 0) {
        dispatch(updateQuantity({ id, quantity: newQuantity }))
      }
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    onCheckout()
  }

  return (
    <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col lg:h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Product Cart
          </h2>
          <button className="p-1 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-64 lg:max-h-none">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-xs sm:text-sm">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                    >
                      <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                    </button>

                    <span className="w-6 sm:w-8 text-center font-medium text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                    >
                      <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 hover:bg-gray-200 rounded-lg"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Button */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-200">
            <div className="mb-4">
              <div className="flex justify-between text-base sm:text-lg font-semibold">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSidebar
