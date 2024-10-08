// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // استيراد ملف CSS

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة لتخزين نص البحث

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('https://new-e-learning-edecs-default-rtdb.firebaseio.com/vendors.json');
        const vendorsData = Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data.vendorInfo // الوصول إلى خصائص vendorInfo
        }));
        setVendors(vendorsData);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
      }
    };

    fetchVendors();
  }, []);

  // تصفية الموردين بناءً على نص البحث
  const filteredVendors = vendors.filter(vendor =>
    vendor.vendorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>قائمة الموردين</h1>
      <input
        type="text"
        placeholder="ابحث عن مورد..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)} // تحديث نص البحث
        className="search-input"
      />
      <ul>
        {filteredVendors.map(vendor => (
          <li key={vendor.id}>
            <Link to={`/vendor/${vendor.id}`}>{vendor.vendorName || 'لا يوجد اسم'}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
