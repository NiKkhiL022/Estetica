import React, { useState } from "react"
import { CreditCard as Edit3, Trash2, Plus, Minus } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { updateQuantity, removeFromCart } from "../../store/slices/cartSlice"
import { BillingSummary } from "../../types"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface OrderCompletionProps {
  onBack: () => void
}

const OrderCompletion: React.FC<OrderCompletionProps> = ({ onBack }) => {
  const { items } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  const [submitted, setSubmitted] = useState(false)

  const schema = yup.object({
    clientName: yup.string().required("Client name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    address: yup.string().max(500, "Max 500 characters").notRequired(),
  })

  // Declare the form value shape explicitly to satisfy resolver typing.
  type FormValues = {
    clientName: string
    email: string
    address: string | undefined
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) as any })

  const onSubmit = (data: FormValues) => {
    // For now we just set a submitted flag and log the data. Integration (e.g., Supabase) can be added later.
    console.log("Billing form submitted:", data)
    setSubmitted(true)
  }

  const calculateBilling = (): BillingSummary => {
    const serviceTotal = 1800 // Fixed service total as shown in design
    const productTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    const orderDiscount = 0 // No discount in this case
    const taxRate = 18 // 18% tax
    const taxAmount = (productTotal * taxRate) / 100
    const finalTotal = serviceTotal + productTotal + taxAmount - orderDiscount

    return {
      serviceTotal,
      productTotal,
      orderDiscount,
      taxRate,
      finalTotal: finalTotal,
    }
  }

  const billing = calculateBilling()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-purple-600 hover:text-purple-700 mb-4 text-sm sm:text-base"
        >
          ← Back to Products
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Order Completion
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Booking Summary - APT-001
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Products Used Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">⚙</span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Products Used
              </h2>
            </div>

            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Quantity</p>
                      <div className="flex items-center space-x-2 justify-start sm:justify-start">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Unit Price</p>
                      <p className="font-medium text-sm sm:text-base">
                        ₹{item.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Total</p>
                      <p className="font-medium text-sm sm:text-base">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button className="flex items-center text-xs sm:text-sm text-purple-600 hover:text-purple-700">
                      <span className="mr-1">⚡</span>
                      Special Discount
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={onBack}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors duration-200 text-sm sm:text-base flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Extra Products</span>
              </button>
            </div>
          </div>
        </div>

        {/* Billing Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
              Billing Summary
            </h2>

            {/* Billing form */}
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                      {...register("clientName")}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Full name"
                    />
                    {errors.clientName && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.clientName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      {...register("email")}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <textarea
                      {...register("address")}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                      placeholder="Address"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Service Total</span>
                      <span className="font-medium">
                        ₹{billing.serviceTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Product Total</span>
                      <span className="font-medium">
                        ₹{billing.productTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">
                        Tax ({billing.taxRate}%)
                      </span>
                      <span className="font-medium">
                        ₹
                        {(
                          (billing.productTotal * billing.taxRate) /
                          100
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base sm:text-lg font-semibold mt-3">
                      <span>Final Total</span>
                      <span>₹{billing.finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium mt-4 transition-colors duration-200"
                  >
                    <span className="text-sm sm:text-base">
                      ✨ Complete Payment
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment completed
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Thank you — the order has been processed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletion
