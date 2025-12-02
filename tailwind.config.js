/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
      },
      colors: {
        'balance': {
          'brown-900': '#291C0E', // بني داكن جداً
          'copper': '#6E473B', // بني متوسط يميل للنحاسي
          'beige-brown': '#A78D78', // بيج بني فاتح
          'beige-gray': '#BEB5A9', // رمادي مائل للبيج
          'beige-50': '#E1D4C2', // بيج فاتح جداً
          'blue-900': '#10232A', // أزرق داكن جداً
          'blue-gray': '#3D4D55', // رمادي مزرق أنيق
          'pink-gray': '#A79E9C', // رمادي فاتح مائل للوردي
          'sandy-beige': '#D3C3B9', // بيج رملي ناعم
          'accent': '#B58863', // لون نحاسي/برونزي
          'dark-900': '#161616', // أسود داكن جداً
        }
      }
    },
  },
  plugins: [],
}
