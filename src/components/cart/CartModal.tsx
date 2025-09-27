import React from "react"
import CartSidebar from "./CartSidebar"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="flex justify-end p-2">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 px-2 py-1"
            >
              Close
            </button>
          </div>

          <CartSidebar
            onCheckout={() => {
              onCheckout()
              onClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CartModal
