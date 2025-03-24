import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FaCreditCard, FaUser, FaPhone, FaIdCard, FaArrowLeft, FaLock } from 'react-icons/fa';

function PaymentForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const product = JSON.parse(localStorage.getItem('productToPay'));
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    cedula: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (!user || !product) {
      navigate('/dashboard/user');
    }
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validCard = formData.cardNumber.replace(/\s/g, '') === '9946685421144000' &&
                     formData.expiryDate === '06/28' &&
                     formData.cvv === '986';

    try {
      const saleData = {
        userId: user._id,
        productName: product.productName,
        amount: product.amount,
        status: validCard ? 'accepted' : 'rejected',
        customerInfo: formData
      };

      await api.createSale(saleData);
      localStorage.removeItem('productToPay');
      
      if (validCard) {
        alert('Payment successful!');
      } else {
        alert('Payment rejected. Please check your card details.');
      }
      
      navigate('/dashboard/user');
    } catch (error) {
      alert('Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate('/dashboard/user')}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            <FaCreditCard className="h-8 w-8 text-blue-600" />
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Product:</span>
              <span className="font-semibold">{product?.productName}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Amount:</span>
              <span className="text-xl font-bold text-blue-600">${product?.amount}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="relative">
              <FaIdCard className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Cedula"
                required
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute top-3 left-3 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="relative">
              <FaCreditCard className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="9946 6854 2114 4000"
                maxLength="19"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="form-input pl-10"
                  placeholder="CVV"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full flex items-center justify-center ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FaCreditCard className="mr-2" />
                  Process Payment
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;