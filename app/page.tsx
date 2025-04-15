"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="p-4 grid gap-4">
      <Card className="bg-yellow-100">
        <CardContent>
          <h2 className="text-lg font-bold mb-2">📢 공지사항</h2>
          <Textarea value={notice} onChange={(e) => setNotice(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-2">🧪 재고 목록</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border p-2 rounded mb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">위치: {item.location}</p>
                <p className="text-sm text-gray-500">비고: {item.note}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                <span className="font-bold w-6 text-center">{item.quantity}</span>
                <Button size="sm" onClick={() => updateQuantity(item.id, 1)}>+</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-2">➕ 재고 추가</h2>
          <div className="grid gap-2">
            <Input placeholder="품목명" name="name" value={newItem.name} onChange={handleChange} />
            <Input placeholder="수량" name="quantity" value={newItem.quantity} onChange={handleChange} type="number" />
            <Input placeholder="위치" name="location" value={newItem.location} onChange={handleChange} />
            <Input placeholder="비고" name="note" value={newItem.note} onChange={handleChange} />
            <Button onClick={addItem}>추가</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
