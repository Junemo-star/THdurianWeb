// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  //เก็บโรลว่าเป็นโรลอะไร
  const [userRole, setUserRole] = useState(() => {
    // ใช้ callback ในการกำหนดค่าเริ่มต้นจาก Local Storage
    const storedRole = localStorage.getItem('userRole');
    return storedRole || null;
  });

  const setRole = (role) => {
    setUserRole(role);
    // เมื่อมีการเปลี่ยนแปลง userRole, บันทึกลง Local Storage
    localStorage.setItem('userRole', role);
  };

  // ตรวจสอบ Local Storage เมื่อ App โหลด
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
