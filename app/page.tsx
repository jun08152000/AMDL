"use client";
import { useState } from "react";

const initialItems = [
  { id: 1, name: "IPA", quantity: 2, location: "Shelf A", note: "Used for cleaning" },
  { id: 2, name: "Acetone", quantity: 1, location: "Shelf B", note: "For PMMA removal" },
];

export default function LabInventory() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", location: "", note: "" });
  const [notice, setNotice] = useState("실험실 사용 후 항상 정리해주세요. 재고는 부족할 경우 즉시 기록 바랍니다.");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (!newItem.name || !newItem.quantity) return;
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
    setNewItem({ name: "", quantity: "", location: "", note: "" });
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, Number(item.quantity) + delta) } : item
      )
    );
  };

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      <section className="bg-yellow-100 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">📢 공지사항</h2>
        <textarea
          className="w-full p-2 rounded border"
          rows={3}
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
        />
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">🧪 재고 목록</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-3 rounded mb-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">위치: {item.location}</p>
              <p className="text-sm text-gray-600">비고: {item.note}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span className="w-6 text-center font-bold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
        ))}
      </section>

      <section className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">➕ 재고 추가</h2>
        <div className="grid gap-2">
          <input className="border p-2 rounded" placeholder="품목명" name="name" value={newItem.name} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="수량" name="quantity" value={newItem.quantity} onChange={handleChange} type="number" />
          <input className="border p-2 rounded" placeholder="위치" name="location" value={newItem.location} onChange={handleChange} />
          <input className="border p-2 rounded" placeholder="비고" name="note" value={newItem.note} onChange={handleChange} />
          <button onClick={addItem} className="p-2 bg-blue-500 text-white rounded">추가</button>
        </div>
      </section>
    </main>
  );
}
