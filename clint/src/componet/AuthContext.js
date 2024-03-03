import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //เก็บโรลว่าเป็นโรลอะไร
  const [userRole, setUserRole] = useState(() => {
    // ใช้ callback ในการกำหนดค่าเริ่มต้นจาก Local Storage
    const storedRole = localStorage.getItem('userRole');
    return storedRole || null;
  });

  // const [userRole, setUserRole] = useState();

  const token = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
    }
  }

  const setRole = (role) => {
    setUserRole(role);
    // เมื่อมีการเปลี่ยนแปลง userRole, บันทึกลง Local Storage
    // localStorage.setItem('userRole', role);
  };

  // ตรวจสอบ Local Storage เมื่อ App โหลด
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
    if (localStorage.getItem('cart')) { //ถ้ามีก็ไม่ต้องทำอะไร
      console.log("eee")
    } else { //ถ้าใน localStorage.getItem('cart') ไม่มีให้สร้างลิสเปล่าขึ้นมา (ทำแบบนี้เพื่อกันเวลาเลือกของใส่ cart แล้วรีเฟรชหน้าจอแล้วของใน cart หาย)
      const duriann = []
      const Arrdurian = JSON.stringify(duriann);
      localStorage.setItem('cart', Arrdurian)
    }
  }, []);

  const Addcart = (addcart) => {
    const iddurian = addcart
    const existing = localStorage.getItem('cart');
    const existingDataArray = JSON.parse(existing);
    existingDataArray.push(iddurian)
    const updatedDataAsString = JSON.stringify(existingDataArray);
    localStorage.setItem('cart', updatedDataAsString);
  }

  return (
    <AuthContext.Provider value={{ userRole, setRole, token, Addcart}}>
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
