import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import StudentProfileModal from './StudentProfileModal';

export default function StudentsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data: students = [], isLoading, refetch } = useQuery({
    queryKey: ['adminStudents'],
    queryFn: async () => {
      const res = await axios.get('/admin/students');
      return res.data;
    }
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.child_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.parent_phone.includes(searchTerm);
    const matchesGrade = gradeFilter ? student.grade === gradeFilter : true;
    return matchesSearch && matchesGrade;
  });

  if (isLoading) return <div className="p-8 text-center">Загрузка базы учеников...</div>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ученики (Официальные)</h1>
          <p className="text-on-surface-variant">База учеников, с которыми заключен договор.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Поиск по ФИО или телефону..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-surface-container p-3 rounded-xl outline-none min-w-[250px]"
          />
          <select 
            value={gradeFilter} 
            onChange={(e) => setGradeFilter(e.target.value)}
            className="bg-surface-container p-3 rounded-xl outline-none border-none"
          >
            <option value="">Все классы</option>
            {[...Array(11)].map((_, i) => (
              <option key={i+1} value={String(i+1)}>{i+1} класс</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-surface-container rounded-3xl overflow-hidden border border-outline/20">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high text-on-surface-variant text-sm">
            <tr>
              <th className="p-4 font-semibold">ФИО Ученика / Класс</th>
              <th className="p-4 font-semibold">ФИО Родителя / Контакты</th>
              <th className="p-4 font-semibold">Договор</th>
              <th className="p-4 font-semibold text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-on-surface-variant">Учеников не найдено.</td>
              </tr>
            )}
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-t border-outline/10 hover:bg-surface-container-high/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-lg">{student.child_name}</div>
                  <div className="text-sm text-on-surface-variant">{student.grade} класс</div>
                </td>
                <td className="p-4">
                  <div className="font-medium">{student.parent_name}</div>
                  <div className="text-sm text-on-surface-variant">{student.parent_phone}</div>
                </td>
                <td className="p-4">
                  {student.contract ? (
                    <>
                      <div className="font-medium">№ {student.contract.contract_number}</div>
                      <div className="text-sm text-on-surface-variant">{new Date(student.contract.contract_date).toLocaleDateString()}</div>
                    </>
                  ) : (
                    <span className="text-red-500 text-sm">Нет договора</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setSelectedStudent(student)}
                    className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-xl font-bold transition-colors"
                  >
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <StudentProfileModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
          onUpdate={refetch}
        />
      )}
    </div>
  );
}
